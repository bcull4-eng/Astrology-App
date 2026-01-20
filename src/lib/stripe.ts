/**
 * Stripe Integration
 *
 * Handles checkout sessions, subscriptions, and one-time purchases.
 */

import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  typescript: true,
})

// Price IDs for subscription plans
// These need to be created in your Stripe Dashboard
export const STRIPE_PRICES = {
  // Subscription plans
  monthly: process.env.STRIPE_PRICE_MONTHLY || 'price_monthly_placeholder',
  annual: process.env.STRIPE_PRICE_ANNUAL || 'price_annual_placeholder',
  lifetime: process.env.STRIPE_PRICE_LIFETIME || 'price_lifetime_placeholder',

  // One-time purchases (reports)
  singleReport: process.env.STRIPE_PRICE_SINGLE_REPORT || 'price_single_report_placeholder',
  reportBundle3: process.env.STRIPE_PRICE_REPORT_BUNDLE_3 || 'price_bundle_3_placeholder',
  reportBundle6: process.env.STRIPE_PRICE_REPORT_BUNDLE_6 || 'price_bundle_6_placeholder',

  // Course
  course: process.env.STRIPE_PRICE_COURSE || 'price_course_placeholder',
} as const

export type PlanType = 'monthly' | 'annual' | 'lifetime'
export type ProductType = 'report' | 'report_bundle_3' | 'report_bundle_6' | 'course'

interface CreateCheckoutParams {
  userId: string
  userEmail: string
  priceId: string
  mode: 'subscription' | 'payment'
  planType?: PlanType
  productType?: ProductType
  productId?: string
  successUrl: string
  cancelUrl: string
}

/**
 * Create a Stripe Checkout session
 */
export async function createCheckoutSession({
  userId,
  userEmail,
  priceId,
  mode,
  planType,
  productType,
  productId,
  successUrl,
  cancelUrl,
}: CreateCheckoutParams): Promise<Stripe.Checkout.Session> {
  // Check if customer already exists
  const existingCustomers = await stripe.customers.list({
    email: userEmail,
    limit: 1,
  })

  let customerId: string

  if (existingCustomers.data.length > 0) {
    customerId = existingCustomers.data[0].id
  } else {
    // Create new customer
    const customer = await stripe.customers.create({
      email: userEmail,
      metadata: {
        supabase_user_id: userId,
      },
    })
    customerId = customer.id
  }

  // Build checkout session params
  const sessionParams: Stripe.Checkout.SessionCreateParams = {
    customer: customerId,
    mode,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      user_id: userId,
      plan_type: planType || '',
      product_type: productType || '',
      product_id: productId || '',
    },
    allow_promotion_codes: true,
  }

  // Add subscription-specific options
  if (mode === 'subscription') {
    sessionParams.subscription_data = {
      metadata: {
        user_id: userId,
        plan_type: planType || '',
      },
    }
  }

  // Add payment-specific options
  if (mode === 'payment') {
    sessionParams.payment_intent_data = {
      metadata: {
        user_id: userId,
        product_type: productType || '',
        product_id: productId || '',
      },
    }
  }

  const session = await stripe.checkout.sessions.create(sessionParams)

  return session
}

/**
 * Get or create Stripe customer for a user
 */
export async function getOrCreateCustomer(
  userId: string,
  email: string
): Promise<string> {
  const existingCustomers = await stripe.customers.list({
    email,
    limit: 1,
  })

  if (existingCustomers.data.length > 0) {
    return existingCustomers.data[0].id
  }

  const customer = await stripe.customers.create({
    email,
    metadata: {
      supabase_user_id: userId,
    },
  })

  return customer.id
}

/**
 * Create a customer portal session for managing subscriptions
 */
export async function createPortalSession(
  customerId: string,
  returnUrl: string
): Promise<Stripe.BillingPortal.Session> {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  })

  return session
}

/**
 * Cancel a subscription
 */
export async function cancelSubscription(
  subscriptionId: string,
  cancelImmediately = false
): Promise<Stripe.Subscription> {
  if (cancelImmediately) {
    return stripe.subscriptions.cancel(subscriptionId)
  }

  return stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: true,
  })
}

/**
 * Verify webhook signature
 */
export function constructWebhookEvent(
  payload: string | Buffer,
  signature: string
): Stripe.Event {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!webhookSecret) {
    throw new Error('STRIPE_WEBHOOK_SECRET is not set')
  }

  return stripe.webhooks.constructEvent(payload, signature, webhookSecret)
}
