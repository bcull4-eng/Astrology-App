'use client'

/**
 * Paywall Screen
 *
 * Displays: Weekly Intro (£2 first week), Annual (£99 + 2 reports), Lifetime (£149 + all reports)
 * Actions: subscribe (triggers payment flow), dismiss/skip
 */

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { StatsBar } from '@/components/social-proof/stats-bar'
import { TestimonialCard } from '@/components/social-proof/testimonial-card'
import { getTestimonialsByFeature } from '@/components/social-proof/testimonials-data'

type PlanType = 'weekly_intro' | 'weekly' | 'annual' | 'lifetime'

const plans: { type: PlanType; name: string; price: number; period: string; billingNote: string; features: string[]; badge?: string; highlight?: boolean; freeReports?: number }[] = [
  {
    type: 'weekly_intro',
    name: 'Weekly',
    price: 2,
    period: 'first week',
    billingNote: 'Then £4.99/week, cancel anytime',
    badge: 'Try It',
    features: [
      'AI Astrologist chat',
      'Daily personalized insights',
      'Weekly & monthly forecasts',
      'Synastry relationship analysis',
      'Learning courses access',
      'Unlimited chart comparisons',
    ],
  },
  {
    type: 'annual',
    name: 'Annual',
    price: 99,
    period: '/year',
    billingNote: 'Best value for committed users',
    badge: 'Most Popular',
    freeReports: 2,
    features: [
      'Everything in Weekly',
      '2 free personalized reports',
      '12 months full access',
      'Priority email support',
    ],
  },
  {
    type: 'lifetime',
    name: 'Lifetime',
    price: 149,
    period: 'one-time',
    billingNote: 'Pay once, yours forever',
    badge: 'Best Value',
    highlight: true,
    freeReports: 6,
    features: [
      'Everything in Annual',
      'All 6 reports included free',
      'Lifetime access forever',
      'Early access to new features',
      'Priority support',
      'All future updates included',
    ],
  },
]

const allFeatures = [
  {
    title: 'AI Astrologist Chat',
    description: 'Get personalized guidance from AI astrologers',
  },
  {
    title: 'Daily Personalized Insights',
    description: 'Know what to do and avoid each day',
  },
  {
    title: 'Monthly Forecast Reports',
    description: 'Comprehensive monthly astrological guidance',
  },
  {
    title: 'Synastry Analysis',
    description: 'Understand your relationship dynamics in depth',
  },
  {
    title: 'Learning Courses',
    description: 'Master astrology with personalized lessons',
  },
  {
    title: 'Unlimited Charts',
    description: 'Compare charts with anyone, anytime',
  },
]

export default function PaywallPage() {
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('weekly_intro')
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async () => {
    setLoading(true)

    try {
      // Create Stripe checkout session
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planType: selectedPlan,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session')
      }

      // Redirect to Stripe checkout
      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error('No checkout URL returned')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      setLoading(false)
      // Could show error toast here
    }
  }

  const handleSkip = () => {
    router.push('/dashboard')
  }

  const selectedPlanData = plans.find(p => p.type === selectedPlan)

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-400 text-sm font-medium px-3 py-1 rounded-full mb-4">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          Pro Access
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">
          Unlock your full cosmic potential
        </h1>
        <p className="text-indigo-200/60">
          Get personalized daily guidance, AI chat, and deep astrological insights
        </p>

        {/* Social Proof Stats */}
        <div className="mt-6">
          <StatsBar variant="minimal" />
        </div>
      </div>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {plans.map((plan) => (
          <button
            key={plan.type}
            onClick={() => setSelectedPlan(plan.type)}
            className={`relative text-left p-5 rounded-2xl transition-all ${
              selectedPlan === plan.type
                ? plan.highlight
                  ? 'bg-indigo-500/20 ring-2 ring-indigo-500'
                  : 'bg-indigo-950/50 ring-2 ring-indigo-500'
                : 'bg-indigo-950/30 hover:bg-indigo-950/40'
            }`}
          >
            {plan.badge && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {plan.badge}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between mb-3">
              <span className="text-white font-semibold text-lg">{plan.name}</span>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedPlan === plan.type
                    ? 'border-indigo-500 bg-indigo-500'
                    : 'border-indigo-500/30'
                }`}
              >
                {selectedPlan === plan.type && (
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-white">£{plan.price}</span>
                <span className="text-indigo-200/50 text-sm">{plan.period}</span>
              </div>
              <p className="text-indigo-300/40 text-xs mt-1">{plan.billingNote}</p>
            </div>

            <ul className="space-y-2">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-sm">
                  <svg
                    className={`w-4 h-4 flex-shrink-0 ${
                      plan.highlight ? 'text-indigo-400' : 'text-indigo-300/50'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className={
                    (plan.freeReports && feature.includes('report'))
                      ? 'text-indigo-300 font-medium'
                      : 'text-indigo-200/70'
                  }>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {plan.freeReports && (
              <div className="mt-4 pt-3 border-t border-indigo-500/10">
                <div className="flex items-center gap-2 text-indigo-400 text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                    />
                  </svg>
                  <span>
                    {plan.freeReports === 6
                      ? 'All 6 reports included (£174 value)'
                      : `${plan.freeReports} free reports included (£58 value)`}
                  </span>
                </div>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={handleSubscribe}
        disabled={loading}
        className="w-full py-4 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all text-lg shadow-lg shadow-indigo-500/25"
      >
        {loading
          ? 'Redirecting to checkout...'
          : `Get ${selectedPlan === 'lifetime' ? 'Lifetime' : selectedPlan === 'annual' ? 'Annual' : 'Weekly'} Access`}
      </button>

      <button
        onClick={handleSkip}
        disabled={loading}
        className="w-full mt-3 py-3 px-4 text-indigo-200/50 hover:text-indigo-200/70 font-medium transition-colors"
      >
        Continue with free dashboard
      </button>

      {/* What's Included */}
      <div className="mt-10 pt-8 border-t border-indigo-500/10">
        <h2 className="text-lg font-semibold text-white mb-4 text-center">
          What&apos;s included in Pro
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allFeatures.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-8 h-8 bg-indigo-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-white font-medium text-sm">{feature.title}</p>
                <p className="text-indigo-200/50 text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Testimonial */}
      <div className="mt-8">
        <TestimonialCard
          testimonial={getTestimonialsByFeature('dashboard')[0]}
          variant="featured"
        />
      </div>

      {/* Trust signals */}
      <div className="mt-8 pt-6 border-t border-indigo-500/10">
        <div className="flex items-center justify-center gap-6 text-indigo-300/40 text-xs">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            Secure payment
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
            Powered by Stripe
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            30-day guarantee
          </div>
        </div>
      </div>
    </div>
  )
}
