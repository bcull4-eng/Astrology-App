/**
 * Stripe Webhook Handler
 *
 * Handles: checkout.completed, subscription.created/updated/cancelled, payment.failed
 */

import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  // Implementation pending
  // Will use PaymentProvider.handleWebhookEvent()

  return NextResponse.json({ received: true })
}
