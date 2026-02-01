/**
 * Stripe Webhook Handler
 *
 * Handles: checkout.session.completed, subscription events, payment events,
 * and subscription_schedule events for weekly intro → weekly transitions.
 */

import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { constructWebhookEvent, stripe, STRIPE_PRICES } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'

// Use service role client for database operations (bypasses RLS)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  const body = await request.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')

  if (!signature) {
    console.error('Missing stripe-signature header')
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = constructWebhookEvent(body, signature)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  console.log(`[Stripe Webhook] Received event: ${event.type}`)

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        console.log('[Stripe Webhook] Processing checkout.session.completed')
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session)
        break

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription)
        break

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription)
        break

      case 'invoice.payment_failed':
        await handlePaymentFailed(event.data.object as Stripe.Invoice)
        break

      case 'subscription_schedule.updated':
      case 'subscription_schedule.completed':
        await handleSubscriptionScheduleEvent(event.data.object as Stripe.SubscriptionSchedule, event.type)
        break

      default:
        console.log(`[Stripe Webhook] Unhandled event type: ${event.type}`)
    }

    console.log(`[Stripe Webhook] Successfully processed: ${event.type}`)
    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('[Stripe Webhook] Handler error:', error)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}

/**
 * Handle successful checkout
 */
async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.user_id
  const planType = session.metadata?.plan_type
  const productType = session.metadata?.product_type
  const productId = session.metadata?.product_id

  console.log('[Stripe Webhook] Checkout session metadata:', {
    userId,
    planType,
    productType,
    productId,
    mode: session.mode,
    sessionId: session.id,
  })

  if (!userId) {
    console.error('[Stripe Webhook] No user_id in checkout session metadata')
    return
  }

  const customerId = session.customer as string

  if (session.mode === 'subscription') {
    // Handle subscription checkout
    const subscriptionId = session.subscription as string
    const subscription = await stripe.subscriptions.retrieve(subscriptionId) as Stripe.Subscription
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sub = subscription as any

    await upsertSubscription(userId, customerId, subscription, planType || 'weekly')

    // Build metadata update - include report credits for annual plans
    const userMetadata: Record<string, unknown> = {
      subscription_status: 'pro',
      subscription_plan: planType || 'weekly',
      subscription_expires_at: new Date((sub.current_period_end as number) * 1000).toISOString(),
      subscribed_at: new Date().toISOString(),
    }

    // Grant free report credits for annual subscription
    if (planType === 'annual') {
      console.log('[Stripe Webhook] Granting 2 report credits for annual subscription')
      userMetadata.report_credits = 2
      userMetadata.report_credits_granted_at = new Date().toISOString()
    }

    await supabaseAdmin.auth.admin.updateUserById(userId, {
      user_metadata: userMetadata,
    })

    // If this is a weekly_intro checkout, create a Subscription Schedule
    // to transition from intro price to regular weekly price after 1 cycle
    if (planType === 'weekly_intro') {
      await createIntroToWeeklySchedule(userId, subscriptionId)
    }
  } else if (session.mode === 'payment') {
    // Handle one-time payment
    if (planType === 'lifetime') {
      // Lifetime subscription (one-time payment)
      await supabaseAdmin.from('subscriptions').upsert({
        user_id: userId,
        stripe_customer_id: customerId,
        stripe_subscription_id: null,
        stripe_price_id: session.metadata?.price_id || null,
        plan_type: 'lifetime',
        status: 'active',
        current_period_start: new Date().toISOString(),
        current_period_end: null, // Never expires
      }, { onConflict: 'user_id' })

      // Grant all 6 reports free for lifetime subscription - update all metadata in one call
      console.log('[Stripe Webhook] Granting 6 report credits for lifetime subscription')
      await supabaseAdmin.auth.admin.updateUserById(userId, {
        user_metadata: {
          subscription_status: 'pro',
          subscription_plan: 'lifetime',
          subscription_expires_at: null,
          subscribed_at: new Date().toISOString(),
          report_credits: 6,
          report_credits_granted_at: new Date().toISOString(),
        },
      })
    } else if (productType && productId) {
      // One-time product purchase (report, course)
      console.log('[Stripe Webhook] Inserting purchase record:', { userId, productType, productId })

      const { error: insertError } = await supabaseAdmin.from('purchases').insert({
        user_id: userId,
        stripe_customer_id: customerId,
        stripe_payment_intent_id: session.payment_intent as string,
        stripe_checkout_session_id: session.id,
        product_type: productType,
        product_id: productId,
        amount_paid: session.amount_total || 0,
        currency: session.currency || 'gbp',
        status: 'completed',
      })

      if (insertError) {
        console.error('[Stripe Webhook] Failed to insert purchase:', insertError)
      } else {
        console.log('[Stripe Webhook] Purchase record inserted successfully')
      }

      // If purchasing report bundle, update metadata with credits
      if (productType === 'report_bundle_3' || productType === 'report_bundle_6') {
        const credits = productType === 'report_bundle_3' ? 3 : 6
        console.log('[Stripe Webhook] Updating user metadata with credits:', { userId, credits })

        const { error: metadataError } = await supabaseAdmin.auth.admin.updateUserById(userId, {
          user_metadata: {
            report_credits: credits,
            report_bundle_purchased_at: new Date().toISOString(),
          },
        })

        if (metadataError) {
          console.error('[Stripe Webhook] Failed to update user metadata:', metadataError)
        } else {
          console.log('[Stripe Webhook] User metadata updated successfully')
        }
      }
    }
  }

  console.log(`Checkout completed for user ${userId}`)
}

/**
 * Create a Subscription Schedule that transitions from intro price to regular weekly price.
 * Phase 1: intro price (current cycle)
 * Phase 2: regular weekly price (ongoing)
 */
async function createIntroToWeeklySchedule(userId: string, subscriptionId: string) {
  try {
    console.log('[Stripe Webhook] Creating intro → weekly subscription schedule for', subscriptionId)

    // Create a schedule from the existing subscription
    const schedule = await stripe.subscriptionSchedules.create({
      from_subscription: subscriptionId,
    })

    // Now update the schedule with two phases:
    // Phase 1 is the current intro phase (already set by from_subscription)
    // Phase 2 transitions to regular weekly pricing
    const currentPhase = schedule.phases[0]

    // Calculate end of intro phase (1 week from start)
    const introEndDate = currentPhase.start_date + (7 * 24 * 60 * 60)

    await stripe.subscriptionSchedules.update(schedule.id, {
      end_behavior: 'release', // After schedule completes, subscription continues normally
      phases: [
        {
          items: [{ price: STRIPE_PRICES.weekly_intro, quantity: 1 }],
          start_date: currentPhase.start_date,
          end_date: introEndDate,
        },
        {
          items: [{ price: STRIPE_PRICES.weekly, quantity: 1 }],
          // No end_date = ongoing at regular price
        },
      ],
    })

    // Mark intro_offer_used and store schedule ID in our database
    await supabaseAdmin
      .from('subscriptions')
      .update({
        intro_offer_used: true,
        stripe_schedule_id: schedule.id,
      })
      .eq('user_id', userId)

    console.log('[Stripe Webhook] Subscription schedule created:', schedule.id)
  } catch (error) {
    console.error('[Stripe Webhook] Failed to create subscription schedule:', error)
    // Non-fatal: the subscription still works, just without the auto-transition
    // Mark intro as used anyway to prevent double use
    await supabaseAdmin
      .from('subscriptions')
      .update({ intro_offer_used: true })
      .eq('user_id', userId)
  }
}

/**
 * Handle subscription schedule events (intro → weekly transition)
 */
async function handleSubscriptionScheduleEvent(
  schedule: Stripe.SubscriptionSchedule,
  eventType: string
) {
  console.log(`[Stripe Webhook] Processing ${eventType} for schedule ${schedule.id}`)

  // Find the subscription record by schedule ID
  const { data: subscriptionRecord } = await supabaseAdmin
    .from('subscriptions')
    .select('user_id, plan_type')
    .eq('stripe_schedule_id', schedule.id)
    .single()

  if (!subscriptionRecord) {
    console.log('[Stripe Webhook] No subscription found for schedule:', schedule.id)
    return
  }

  // When the schedule completes or updates, check if we've moved to the weekly phase
  if (subscriptionRecord.plan_type === 'weekly_intro') {
    // Check current phase - if the schedule has progressed past the intro phase
    const currentPhaseIndex = schedule.phases.findIndex(
      (phase) => {
        const now = Math.floor(Date.now() / 1000)
        return phase.start_date <= now && (phase.end_date === null || phase.end_date > now)
      }
    )

    // If we're on phase 2+ (regular weekly), update the plan type
    if (currentPhaseIndex > 0 || eventType === 'subscription_schedule.completed') {
      console.log('[Stripe Webhook] Transitioning plan from weekly_intro to weekly')

      await supabaseAdmin
        .from('subscriptions')
        .update({ plan_type: 'weekly' })
        .eq('stripe_schedule_id', schedule.id)

      // Update user metadata
      await supabaseAdmin.auth.admin.updateUserById(subscriptionRecord.user_id, {
        user_metadata: {
          subscription_plan: 'weekly',
        },
      })
    }
  }
}

/**
 * Handle subscription updates
 */
async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  console.log('[Stripe Webhook] Processing subscription update/create')

  const userId = subscription.metadata?.user_id

  if (!userId) {
    console.error('[Stripe Webhook] No user_id in subscription metadata')
    return
  }

  console.log('[Stripe Webhook] Subscription data:', {
    userId,
    subscriptionId: subscription.id,
    status: subscription.status,
    planType: subscription.metadata?.plan_type,
  })

  const customerId = subscription.customer as string
  const planType = subscription.metadata?.plan_type || 'weekly'

  try {
    await upsertSubscription(userId, customerId, subscription, planType)
    console.log('[Stripe Webhook] Subscription upserted successfully')
  } catch (error) {
    console.error('[Stripe Webhook] Failed to upsert subscription:', error)
    throw error
  }

  // Get period end from subscription or items
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sub = subscription as any
  const periodEnd = sub.current_period_end
    || subscription.items.data[0]?.current_period_end
    || null

  // Update user metadata based on subscription status
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cancelAtPeriodEnd = (subscription as any).cancel_at_period_end || false

  if (subscription.status === 'active' || subscription.status === 'trialing' || subscription.status === 'past_due') {
    try {
      await updateUserMetadata(userId, 'pro', planType, periodEnd, cancelAtPeriodEnd)
      console.log('[Stripe Webhook] User metadata updated successfully, cancelAtPeriodEnd:', cancelAtPeriodEnd)
    } catch (error) {
      console.error('[Stripe Webhook] Failed to update user metadata:', error)
      throw error
    }
  }

  console.log(`[Stripe Webhook] Subscription updated for user ${userId}: ${subscription.status}`)
}

/**
 * Handle subscription cancellation/deletion
 */
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const userId = subscription.metadata?.user_id

  if (!userId) {
    console.error('No user_id in subscription metadata')
    return
  }

  // Update subscription status in database
  await supabaseAdmin
    .from('subscriptions')
    .update({
      status: 'canceled',
      canceled_at: new Date().toISOString(),
    })
    .eq('stripe_subscription_id', subscription.id)

  // Update user metadata
  await supabaseAdmin.auth.admin.updateUserById(userId, {
    user_metadata: {
      subscription_status: 'expired',
    },
  })

  console.log(`Subscription deleted for user ${userId}`)
}

/**
 * Handle payment failure
 */
async function handlePaymentFailed(invoice: Stripe.Invoice) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const subscriptionId = (invoice as any).subscription as string

  if (!subscriptionId) return

  const subscription = await stripe.subscriptions.retrieve(subscriptionId) as Stripe.Subscription
  const userId = subscription.metadata?.user_id

  if (!userId) return

  // Update subscription status
  await supabaseAdmin
    .from('subscriptions')
    .update({ status: 'past_due' })
    .eq('stripe_subscription_id', subscriptionId)

  console.log(`Payment failed for user ${userId}`)
}

/**
 * Upsert subscription record
 */
async function upsertSubscription(
  userId: string,
  customerId: string,
  subscription: Stripe.Subscription,
  planType: string
) {
  const priceId = subscription.items.data[0]?.price.id
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sub = subscription as any

  // Get period dates - try subscription level first, then fall back to item level
  const periodStart = sub.current_period_start
    || subscription.items.data[0]?.current_period_start
    || sub.start_date
    || Math.floor(Date.now() / 1000)

  const periodEnd = sub.current_period_end
    || subscription.items.data[0]?.current_period_end
    || null

  const upsertData: Record<string, unknown> = {
    user_id: userId,
    stripe_customer_id: customerId,
    stripe_subscription_id: subscription.id,
    stripe_price_id: priceId,
    plan_type: planType,
    status: subscription.status === 'active' ? 'active' :
            subscription.status === 'trialing' ? 'trialing' :
            subscription.status === 'past_due' ? 'past_due' :
            subscription.status === 'canceled' ? 'canceled' : 'expired',
    current_period_start: new Date(periodStart * 1000).toISOString(),
    cancel_at_period_end: sub.cancel_at_period_end || false,
  }

  // Only set period end if we have a valid value
  if (periodEnd) {
    upsertData.current_period_end = new Date(periodEnd * 1000).toISOString()
  }

  await supabaseAdmin.from('subscriptions').upsert(upsertData, { onConflict: 'user_id' })
}

/**
 * Update user metadata with subscription status
 */
async function updateUserMetadata(
  userId: string,
  status: 'pro' | 'free' | 'expired',
  planType: string,
  periodEnd: number | null,
  cancelAtPeriodEnd: boolean = false
) {
  await supabaseAdmin.auth.admin.updateUserById(userId, {
    user_metadata: {
      subscription_status: status,
      subscription_plan: planType,
      subscription_expires_at: periodEnd ? new Date(periodEnd * 1000).toISOString() : null,
      subscription_cancel_at_period_end: cancelAtPeriodEnd,
      subscribed_at: new Date().toISOString(),
    },
  })
}
