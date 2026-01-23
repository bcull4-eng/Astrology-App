'use client'

/**
 * Checkout Success Page
 *
 * Shown after successful Stripe checkout.
 * Verifies the session and redirects to dashboard.
 */

import { Suspense, useEffect, useState, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { trackSubscription } from '@/lib/analytics'

function SuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const plan = searchParams.get('plan') as 'monthly' | 'annual' | 'lifetime' | null
  const [countdown, setCountdown] = useState(5)
  const tracked = useRef(false)

  useEffect(() => {
    // Track conversion (only once)
    if (!tracked.current && plan) {
      tracked.current = true
      const values = { monthly: 14.99, annual: 99, lifetime: 199 }
      trackSubscription(plan, values[plan] || 0)
    }

    // Auto-redirect to dashboard after countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          router.push('/dashboard')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router, plan])

  return (
    <div className="max-w-md w-full text-center">
      {/* Success Icon */}
      <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg
          className="w-10 h-10 text-emerald-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <h1 className="text-3xl font-bold text-white mb-3">
        Welcome to Pro!
      </h1>

      <p className="text-indigo-200/70 mb-8">
        Your payment was successful. You now have full access to all premium features including AI Astrologist, daily insights, and detailed reports.
      </p>

      {/* What's unlocked */}
      <div className="bg-indigo-950/30 rounded-xl p-6 mb-8 text-left">
        <h2 className="text-white font-semibold mb-4">You now have access to:</h2>
        <ul className="space-y-3">
          {[
            'Unlimited AI Astrologist chats',
            'Daily personalized insights',
            'Monthly forecast reports',
            'Full synastry analysis',
            'Learning courses',
          ].map((feature, i) => (
            <li key={i} className="flex items-center gap-3 text-indigo-200/80">
              <svg className="w-5 h-5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Auto-redirect notice */}
      <p className="text-indigo-300/50 text-sm mb-4">
        Redirecting to your dashboard in {countdown} seconds...
      </p>

      <Link
        href="/dashboard"
        className="inline-flex items-center justify-center w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors"
      >
        Go to Dashboard Now
      </Link>
    </div>
  )
}

function LoadingFallback() {
  return (
    <div className="max-w-md w-full text-center">
      <div className="w-20 h-20 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
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
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <p className="text-indigo-200/70">Loading...</p>
    </div>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center p-4">
      <Suspense fallback={<LoadingFallback />}>
        <SuccessContent />
      </Suspense>
    </div>
  )
}
