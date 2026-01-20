'use client'

/**
 * Checkout Cancel Page
 *
 * Shown when user cancels Stripe checkout.
 */

import Link from 'next/link'

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="w-20 h-20 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-indigo-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-white mb-3">
          Checkout Cancelled
        </h1>

        <p className="text-indigo-200/70 mb-8">
          No worries! Your payment was cancelled and you haven&apos;t been charged. You can always upgrade later when you&apos;re ready.
        </p>

        {/* What they're missing */}
        <div className="bg-indigo-950/30 rounded-xl p-6 mb-8 text-left">
          <h2 className="text-white font-semibold mb-4">Pro features you&apos;re missing:</h2>
          <ul className="space-y-3">
            {[
              'Unlimited AI Astrologist chats',
              'Daily personalized insights',
              'Monthly forecast reports',
              'Full synastry analysis',
            ].map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-indigo-200/50">
                <svg className="w-5 h-5 text-indigo-400/50 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <Link
            href="/paywall"
            className="inline-flex items-center justify-center w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors"
          >
            Try Again
          </Link>

          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center w-full py-3 px-4 text-indigo-200/70 hover:text-white font-medium transition-colors"
          >
            Continue with Free Account
          </Link>
        </div>
      </div>
    </div>
  )
}
