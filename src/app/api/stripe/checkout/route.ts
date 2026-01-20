/**
 * Stripe Checkout Session API
 *
 * Creates a checkout session for subscriptions or one-time purchases.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import {
  createCheckoutSession,
  STRIPE_PRICES,
  type PlanType,
  type ProductType,
} from '@/lib/stripe'

interface CheckoutRequest {
  planType?: PlanType
  productType?: ProductType
  productId?: string
}

export async function POST(request: NextRequest) {
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

    const body: CheckoutRequest = await request.json()
    const { planType, productType, productId } = body

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    // Determine checkout mode and price
    let priceId: string
    let mode: 'subscription' | 'payment'

    if (planType) {
      // Subscription checkout
      mode = planType === 'lifetime' ? 'payment' : 'subscription'
      priceId = STRIPE_PRICES[planType]

      if (!priceId || priceId.includes('placeholder')) {
        return NextResponse.json(
          { error: `Price not configured for plan: ${planType}. Please set up Stripe prices.` },
          { status: 400 }
        )
      }
    } else if (productType && productId) {
      // One-time purchase checkout
      mode = 'payment'

      // Map product IDs to price IDs
      const productPriceMap: Record<string, string> = {
        'birth-chart-report': STRIPE_PRICES.birthChartReport,
        'year-ahead-report': STRIPE_PRICES.yearAheadReport,
        'relationship-report': STRIPE_PRICES.relationshipReport,
        'report-bundle': STRIPE_PRICES.reportBundle,
        'astrology-certification': STRIPE_PRICES.astrologyCourse,
      }

      priceId = productPriceMap[productId]

      if (!priceId || priceId.includes('placeholder')) {
        return NextResponse.json(
          { error: `Price not configured for product: ${productId}. Please set up Stripe prices.` },
          { status: 400 }
        )
      }
    } else {
      return NextResponse.json(
        { error: 'Invalid request: must specify planType or productType + productId' },
        { status: 400 }
      )
    }

    // Create checkout session
    const session = await createCheckoutSession({
      userId: user.id,
      userEmail: user.email!,
      priceId,
      mode,
      planType,
      productType,
      productId,
      successUrl: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${appUrl}/checkout/cancel`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
