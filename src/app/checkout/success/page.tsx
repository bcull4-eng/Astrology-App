'use client'

/**
 * Checkout Success Page
 *
 * Shown after successful Stripe checkout.
 * For new users (guest checkout): tells them to check email for password setup
 * For existing users: redirects to dashboard
 */

import { Suspense, useEffect, useState, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Mail } from 'lucide-react'
import { trackSubscription } from '@/lib/analytics'
import { createClient } from '@/lib/supabase/client'

function SuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const plan = searchParams.get('plan') as 'weekly_intro' | 'weekly' | 'annual' | 'lifetime' | null
  const isReportIntro = searchParams.get('plan') === 'report_intro'
  const [countdown, setCountdown] = useState(5)
  const [isNewUser, setIsNewUser] = useState<boolean | null>(null)
  const tracked = useRef(false)
  const checkedSession = useRef(false)

  useEffect(() => {
    // Check if user has an existing session (existing user vs new guest)
    const checkSession = async () => {
      if (checkedSession.current) return
      checkedSession.current = true

      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()

      // If no session, this was a guest checkout - they need to set password
      setIsNewUser(!session)
    }

    checkSession()
  }, [])

  useEffect(() => {
    // Track conversion (only once)
    if (!tracked.current && (plan || isReportIntro)) {
      tracked.current = true
      if (plan) {
        const values = { weekly_intro: 2, weekly: 4.99, annual: 99, lifetime: 199 }
        trackSubscription(plan, values[plan] || 0)
      }
      // report_intro tracked separately or skip tracking for now
    }

    // Only auto-redirect for existing users
    if (isNewUser === false) {
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
    }
  }, [router, plan, isNewUser])

  // Still checking session
  if (isNewUser === null) {
    return (
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <div className="w-8 h-8 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
        </div>
        <p className="text-indigo-200/70">Processing your payment...</p>
      </div>
    )
  }

  // New user - needs to set password via email
  if (isNewUser) {
    return (
      <div className="max-w-md w-full text-center">
        {/* Email Icon */}
        <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Mail className="w-10 h-10 text-emerald-400" />
        </div>

        <h1 className="text-3xl font-bold text-white mb-3">
          Payment Successful!
        </h1>

        <p className="text-indigo-200/70 mb-6">
          We&apos;ve sent you an email to set up your account password.
        </p>

        <div className="bg-indigo-950/30 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-indigo-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-indigo-400 font-bold">1</span>
            </div>
            <p className="text-white text-left">Check your email inbox</p>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-indigo-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-indigo-400 font-bold">2</span>
            </div>
            <p className="text-white text-left">Click the link to set your password</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-indigo-400 font-bold">3</span>
            </div>
            <p className="text-white text-left">Access your cosmic report anytime</p>
          </div>
        </div>

        <p className="text-indigo-300/50 text-sm mb-6">
          Can&apos;t find the email? Check your spam folder or{' '}
          <Link href="/auth/sign-in" className="text-indigo-400 hover:underline">
            sign in here
          </Link>
        </p>

        {/* What's included */}
        <div className="bg-white/5 rounded-xl p-4 text-left">
          <p className="text-white/60 text-xs uppercase tracking-wider mb-3">Your report includes:</p>
          <ul className="space-y-2">
            {[
              'Complete birth chart analysis',
              'Personality & destiny insights',
              'Palm reading results',
              'Daily horoscopes (after trial)',
            ].map((feature, i) => (
              <li key={i} className="flex items-center gap-2 text-white/80 text-sm">
                <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  // Existing user - redirect to dashboard
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
