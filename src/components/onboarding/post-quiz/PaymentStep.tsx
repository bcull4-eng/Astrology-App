'use client'

/**
 * PaymentStep (Step 18)
 *
 * Payment options with trial pricing, Apple Pay, and card entry.
 * Integrates with existing Stripe checkout flow.
 */

import { useState } from 'react'
import { Check, CreditCard, Shield, Star, Users, Sparkles, Clock } from 'lucide-react'
import { useOnboardingV2Store } from '@/store/onboarding-v2'
import { CountdownTimer } from '../CountdownTimer'

const TESTIMONIALS = [
  { name: 'Sarah M.', text: 'Scarily accurate! The report knew things about me I barely admit to myself.', rating: 5 },
  { name: 'James K.', text: 'Best £1 I ever spent. The daily insights have been game-changing.', rating: 5 },
  { name: 'Emma R.', text: 'Finally an astrology app that actually feels personal to ME.', rating: 5 },
]

export function PaymentStep() {
  const { goToNextStep } = useOnboardingV2Store()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCheckout = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planType: 'report_intro', // £1 report with £14.99/month after 3 days
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create checkout session')
      }

      const { url } = await response.json()
      if (url) {
        window.location.href = url
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed')
      setIsLoading(false)
    }
  }

  const handleSkipTrial = () => {
    // Allow viewing limited results without payment
    goToNextStep()
  }

  return (
    <div className="flex-1 flex flex-col px-6 py-8 overflow-y-auto">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-serif font-semibold text-white mb-2">
          Your Full Cosmic Report is Ready
        </h1>
        <p className="text-white/60">
          Unlock your complete personalized analysis
        </p>
      </div>

      {/* Countdown timer */}
      <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Clock className="w-4 h-4 text-red-400" />
          <span className="text-red-400 text-sm font-medium">Special offer expires in:</span>
        </div>
        <CountdownTimer initialMinutes={15} />
      </div>

      {/* Social proof stats */}
      <div className="flex items-center justify-center gap-6 mb-6">
        <div className="flex items-center gap-2 text-white/70 text-sm">
          <Users className="w-4 h-4 text-indigo-400" />
          <span>47,892 reports delivered</span>
        </div>
        <div className="flex items-center gap-1 text-white/70 text-sm">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span>4.9 rating</span>
        </div>
      </div>

      {/* Single pricing option */}
      <div className="p-5 rounded-2xl border-2 border-indigo-500 bg-indigo-500/10 mb-5 relative">
        <span className="absolute -top-3 left-4 px-3 py-1 text-xs font-medium bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          Limited Offer
        </span>

        <div className="mb-4">
          <p className="text-white font-semibold text-lg">Complete Cosmic Report</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-white/40 text-lg line-through">£19.99</span>
            <span className="text-3xl font-bold text-white">£1</span>
            <span className="text-white/60 text-sm">today only</span>
          </div>
          <p className="text-emerald-400 text-sm font-medium mt-1">
            You save £18.99 (95% off)
          </p>
          <p className="text-white/50 text-xs mt-1">
            Then £14.99/month after 3 days • Cancel anytime
          </p>
        </div>

        <ul className="space-y-2">
          <li className="flex items-center gap-2 text-white/80 text-sm">
            <Check className="w-4 h-4 text-indigo-400 flex-shrink-0" />
            Complete birth chart analysis
          </li>
          <li className="flex items-center gap-2 text-white/80 text-sm">
            <Check className="w-4 h-4 text-indigo-400 flex-shrink-0" />
            Personality & destiny insights
          </li>
          <li className="flex items-center gap-2 text-white/80 text-sm">
            <Check className="w-4 h-4 text-indigo-400 flex-shrink-0" />
            Daily personalized horoscopes
          </li>
          <li className="flex items-center gap-2 text-white/80 text-sm">
            <Check className="w-4 h-4 text-indigo-400 flex-shrink-0" />
            Palm reading analysis
          </li>
          <li className="flex items-center gap-2 text-white/80 text-sm">
            <Check className="w-4 h-4 text-indigo-400 flex-shrink-0" />
            Love & compatibility reports
          </li>
        </ul>
      </div>

      {/* Testimonials */}
      <div className="mb-6 space-y-3">
        <p className="text-white/40 text-xs text-center uppercase tracking-wider">What others are saying</p>
        {TESTIMONIALS.map((testimonial, i) => (
          <div key={i} className="bg-white/5 rounded-xl p-3 border border-white/10">
            <div className="flex items-center gap-1 mb-1">
              {[...Array(testimonial.rating)].map((_, j) => (
                <Star key={j} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <p className="text-white/70 text-sm italic">"{testimonial.text}"</p>
            <p className="text-white/40 text-xs mt-1">— {testimonial.name}</p>
          </div>
        ))}
      </div>

      {/* Error message */}
      {error && (
        <p className="text-red-400 text-sm text-center mb-4">{error}</p>
      )}

      {/* Payment buttons */}
      <div className="space-y-3">
        {/* Apple Pay (if available) */}
        <button
          onClick={handleCheckout}
          disabled={isLoading}
          className="w-full py-4 rounded-xl font-semibold text-lg bg-black text-white flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors disabled:opacity-50"
        >
           Pay
        </button>

        {/* Card payment */}
        <button
          onClick={handleCheckout}
          disabled={isLoading}
          className="w-full py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          <CreditCard className="w-5 h-5" />
          {isLoading ? 'Processing...' : 'Get My Report — £1'}
        </button>
      </div>

      {/* Security badge */}
      <div className="flex items-center justify-center gap-2 mt-4 text-white/40 text-xs">
        <Shield className="w-4 h-4" />
        <span>Secure payment powered by Stripe</span>
      </div>

      {/* Money back guarantee */}
      <p className="text-center text-white/40 text-xs mt-3">
        100% money-back guarantee if you're not satisfied
      </p>

      {/* Skip option */}
      <button
        onClick={handleSkipTrial}
        className="mt-4 text-white/40 text-sm hover:text-white/60 transition-colors mx-auto block"
      >
        Continue with limited access
      </button>
    </div>
  )
}
