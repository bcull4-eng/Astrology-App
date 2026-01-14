'use client'

/**
 * Paywall Screen
 *
 * Displays: Pro subscription offer (£20/month), feature list
 * Actions: subscribe (triggers payment flow), dismiss/skip
 */

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const features = [
  {
    title: 'Full Personal Transit Dashboard',
    description: 'See all active themes and how they interact',
  },
  {
    title: 'Daily Guidance',
    description: 'What to do and avoid each day based on current transits',
  },
  {
    title: 'Intensity Tracking',
    description: 'Visual timelines showing when things peak and ease',
  },
  {
    title: 'Synastry Analysis',
    description: 'Understand your relationship dynamics in depth',
  },
  {
    title: 'Upcoming Windows',
    description: '90-day forecast of what\'s coming',
  },
  {
    title: 'Early Access',
    description: 'Be first to try new features like Saturn Return Guide',
  },
]

export default function PaywallPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async () => {
    setLoading(true)

    // TODO: Implement Stripe checkout
    // For now, just redirect to dashboard
    // In production:
    // 1. Call API to create Stripe checkout session
    // 2. Redirect to Stripe checkout
    // 3. Handle success/cancel redirects

    // Simulate checkout for now
    await new Promise(resolve => setTimeout(resolve, 1000))
    router.push('/dashboard')
  }

  const handleSkip = () => {
    // In production, this might show a limited dashboard
    // or prompt them to subscribe later
    router.push('/dashboard')
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-400 text-sm font-medium px-3 py-1 rounded-full mb-4">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          Pro Access
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">
          Unlock your full dashboard
        </h1>
        <p className="text-slate-400">
          Get daily guidance and see exactly what to do
        </p>
      </div>

      {/* Price */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 mb-6">
        <div className="flex items-baseline justify-center gap-1 mb-4">
          <span className="text-4xl font-bold text-white">£20</span>
          <span className="text-slate-400">/month</span>
        </div>
        <p className="text-center text-slate-400 text-sm">
          Cancel anytime. No commitment.
        </p>
      </div>

      {/* Features */}
      <div className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="w-5 h-5 bg-indigo-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-3 h-3 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-white font-medium text-sm">{feature.title}</p>
              <p className="text-slate-400 text-sm">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTAs */}
      <div className="space-y-3">
        <button
          onClick={handleSubscribe}
          disabled={loading}
          className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-600/50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
        >
          {loading ? 'Redirecting to checkout...' : 'Start Pro Access'}
        </button>
        <button
          onClick={handleSkip}
          disabled={loading}
          className="w-full py-3 px-4 text-slate-400 hover:text-slate-300 font-medium transition-colors"
        >
          Maybe later
        </button>
      </div>

      {/* Trust signals */}
      <div className="mt-8 pt-6 border-t border-slate-700/50">
        <div className="flex items-center justify-center gap-6 text-slate-500 text-xs">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Secure payment
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Cancel anytime
          </div>
        </div>
      </div>
    </div>
  )
}
