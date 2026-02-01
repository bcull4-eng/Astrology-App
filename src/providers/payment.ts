/**
 * Payment Provider Interface
 *
 * Abstract interface for subscription payments.
 * Implemented via Stripe.
 */

import type { SubscriptionStatus } from '@/types'

export interface PaymentProvider {
  /**
   * Create checkout session for subscription
   */
  createCheckoutSession(
    userId: string,
    plan: SubscriptionPlan,
    successUrl: string,
    cancelUrl: string
  ): Promise<CheckoutSession>

  /**
   * Get subscription status for user
   */
  getSubscriptionStatus(userId: string): Promise<SubscriptionInfo>

  /**
   * Cancel subscription
   */
  cancelSubscription(subscriptionId: string): Promise<CancellationResult>

  /**
   * Handle webhook event from payment provider
   */
  handleWebhookEvent(payload: unknown, signature: string): Promise<WebhookResult>

  /**
   * Create customer portal session for subscription management
   */
  createPortalSession(userId: string, returnUrl: string): Promise<PortalSession>
}

export interface SubscriptionPlan {
  id: string
  name: string
  priceInPence: number // £20/month = 2000
  interval: 'week' | 'month' | 'year'
}

export interface CheckoutSession {
  sessionId: string
  checkoutUrl: string
}

export interface SubscriptionInfo {
  status: SubscriptionStatus
  currentPeriodEnd: Date | null
  cancelAtPeriodEnd: boolean
  plan: SubscriptionPlan | null
}

export interface CancellationResult {
  success: boolean
  effectiveDate: Date
}

export interface WebhookResult {
  eventType: WebhookEventType
  userId?: string
  handled: boolean
}

export type WebhookEventType =
  | 'checkout.completed'
  | 'subscription.created'
  | 'subscription.updated'
  | 'subscription.cancelled'
  | 'payment.failed'

export interface PortalSession {
  sessionId: string
  portalUrl: string
}
