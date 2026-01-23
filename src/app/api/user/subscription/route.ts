/**
 * User Subscription API
 *
 * Returns and syncs subscription data from Stripe for accurate cancel status.
 */

import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { stripe } from '@/lib/stripe'

export async function GET() {
  try {
    const supabase = await createClient()

    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Fetch subscription from database
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (!subscription) {
      return NextResponse.json({ subscription: null })
    }

    // If there's a Stripe subscription ID, sync from Stripe for accurate data
    if (subscription.stripe_subscription_id) {
      try {
        const stripeSubscription = await stripe.subscriptions.retrieve(
          subscription.stripe_subscription_id
        )

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const stripeSub = stripeSubscription as any

        console.log('[Subscription API] Stripe response:', {
          id: stripeSubscription.id,
          status: stripeSubscription.status,
          cancel_at_period_end: stripeSub.cancel_at_period_end,
          cancel_at: stripeSub.cancel_at,
          canceled_at: stripeSub.canceled_at,
        })

        const periodEnd = stripeSub.current_period_end
          || stripeSubscription.items.data[0]?.current_period_end
          || null

        // Update database with current Stripe data
        const { error: updateError } = await supabase
          .from('subscriptions')
          .update({
            status: stripeSubscription.status,
            cancel_at_period_end: stripeSub.cancel_at_period_end || false,
            current_period_end: periodEnd
              ? new Date(periodEnd * 1000).toISOString()
              : null,
          })
          .eq('user_id', user.id)

        if (updateError) {
          console.error('Error updating subscription:', updateError)
        }

        return NextResponse.json({
          subscription: {
            ...subscription,
            status: stripeSubscription.status,
            cancel_at_period_end: stripeSub.cancel_at_period_end || false,
            current_period_end: periodEnd
              ? new Date(periodEnd * 1000).toISOString()
              : subscription.current_period_end,
          },
        })
      } catch (stripeError) {
        console.error('Error fetching from Stripe:', stripeError)
        // Fall back to database data
        return NextResponse.json({ subscription })
      }
    }

    // For lifetime subscriptions (no Stripe subscription ID)
    return NextResponse.json({ subscription })
  } catch (error) {
    console.error('Subscription API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
