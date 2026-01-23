/**
 * Stripe Webhook Handler
 *
 * Handles: checkout.session.completed, subscription events, payment events
 */

import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { constructWebhookEvent, stripe } from '@/lib/stripe'
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

    await upsertSubscription(userId, customerId, subscription, planType || 'monthly')

    // Build metadata update - include report credits for annual plans
    const userMetadata: Record<string, unknown> = {
      subscription_status: 'pro',
      subscription_plan: planType || 'monthly',
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
 * Handle subscription updates
 */
async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const userId = subscription.metadata?.user_id

  if (!userId) {
    console.error('No user_id in subscription metadata')
    return
  }

  const customerId = subscription.customer as string
  const planType = subscription.metadata?.plan_type || 'monthly'

  await upsertSubscription(userId, customerId, subscription, planType)

  // Update user metadata based on subscription status
  const periodEnd = (subscription as Stripe.Subscription & { current_period_end: number }).current_period_end
  if (subscription.status === 'active' || subscription.status === 'trialing') {
    await updateUserMetadata(userId, 'pro', planType, periodEnd)
  } else if (subscription.status === 'past_due') {
    await updateUserMetadata(userId, 'pro', planType, periodEnd)
  }

  console.log(`Subscription updated for user ${userId}: ${subscription.status}`)
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

  await supabaseAdmin.from('subscriptions').upsert({
    user_id: userId,
    stripe_customer_id: customerId,
    stripe_subscription_id: subscription.id,
    stripe_price_id: priceId,
    plan_type: planType,
    status: subscription.status === 'active' ? 'active' :
            subscription.status === 'trialing' ? 'trialing' :
            subscription.status === 'past_due' ? 'past_due' :
            subscription.status === 'canceled' ? 'canceled' : 'expired',
    current_period_start: new Date(sub.current_period_start * 1000).toISOString(),
    current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
    cancel_at_period_end: sub.cancel_at_period_end,
  }, { onConflict: 'user_id' })
}

/**
 * Update user metadata with subscription status
 */
async function updateUserMetadata(
  userId: string,
  status: 'pro' | 'free' | 'expired',
  planType: string,
  periodEnd: number | null
) {
  await supabaseAdmin.auth.admin.updateUserById(userId, {
    user_metadata: {
      subscription_status: status,
      subscription_plan: planType,
      subscription_expires_at: periodEnd ? new Date(periodEnd * 1000).toISOString() : null,
      subscribed_at: new Date().toISOString(),
    },
  })
}
