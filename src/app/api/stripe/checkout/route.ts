/**
 * Stripe Checkout Session API
 *
 * Creates a checkout session for subscriptions or one-time purchases.
 * Includes intro offer eligibility check for weekly_intro plan.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { checkoutLimiter } from '@/lib/rate-limit'
import { createClient as createAdminClient } from '@supabase/supabase-js'
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

// Service role client for querying subscriptions (bypasses RLS)
const supabaseAdmin = createAdminClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  const limited = checkoutLimiter(request)
  if (limited) return limited

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
    let { planType } = body
    const { productType, productId } = body

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    // Intro offer eligibility check
    if (planType === 'weekly_intro') {
      const { data: subscription } = await supabaseAdmin
        .from('subscriptions')
        .select('intro_offer_used')
        .eq('user_id', user.id)
        .single()

      if (subscription?.intro_offer_used) {
        // User already used intro offer — fall back to regular weekly price
        planType = 'weekly'
      }
    }

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
        'single-report': STRIPE_PRICES.singleReport,
        'report-bundle-3': STRIPE_PRICES.reportBundle3,
        'report-bundle-6': STRIPE_PRICES.reportBundle6,
        'course': STRIPE_PRICES.course,
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

    // Determine success URL based on purchase type
    let successUrl: string
    if (planType) {
      successUrl = `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`
    } else if (productId === 'course') {
      successUrl = `${appUrl}/learn/purchase-success?session_id={CHECKOUT_SESSION_ID}`
    } else {
      successUrl = `${appUrl}/reports/purchase-success?session_id={CHECKOUT_SESSION_ID}&product=${productId}`
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
      successUrl,
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
