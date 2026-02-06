'use client'

/**
 * ForecastUpsellStep (Step 20)
 *
 * 2026 Forecast upsell and CTA to continue to dashboard.
 */

import { useRouter } from 'next/navigation'
import { useOnboardingV2Store } from '@/store/onboarding-v2'
import { Calendar, Star, ArrowRight, Sparkles } from 'lucide-react'

export function ForecastUpsellStep() {
  const router = useRouter()
  const { profileData, reset } = useOnboardingV2Store()

  const handleGetForecast = () => {
    // Redirect to forecast purchase page
    router.push('/reports?highlight=annual-forecast')
  }

  const handleGoToDashboard = () => {
    // Clear onboarding state and go to dashboard
    router.push('/dashboard')
  }

  return (
    <div className="flex-1 flex flex-col px-6 py-8">
      {/* Celebration header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
          <Sparkles className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-2xl font-serif font-semibold text-white mb-2">
          Congratulations, {profileData?.sign}!
        </h1>
        <p className="text-white/60">
          Your cosmic journey has just begun
        </p>
      </div>

      {/* 2026 Forecast card */}
      <div className="relative rounded-2xl overflow-hidden mb-6">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600" />

        {/* Content */}
        <div className="relative p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-white/80 text-sm">Exclusive Offer</p>
              <h2 className="text-white font-serif font-bold text-xl">
                Your 2026 Forecast
              </h2>
            </div>
          </div>

          <p className="text-white/90 mb-4">
            Get a complete month-by-month breakdown of what the stars have in store for you in 2026. Includes:
          </p>

          <ul className="space-y-2 mb-6">
            {[
              'Monthly horoscope predictions',
              'Lucky dates for major decisions',
              'Love & relationship timeline',
              'Career & financial outlook',
              'Personal growth milestones',
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-white/90 text-sm">
                <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                {item}
              </li>
            ))}
          </ul>

          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-white/60 line-through text-lg">£29.99</span>
            <span className="text-white font-bold text-3xl">£14.99</span>
            <span className="text-white/60 text-sm">one-time</span>
          </div>

          <button
            onClick={handleGetForecast}
            className="w-full py-4 rounded-xl font-semibold text-lg bg-white text-purple-600 hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
          >
            Get My 2026 Forecast
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Dashboard CTA */}
      <button
        onClick={handleGoToDashboard}
        className="w-full py-4 rounded-xl font-semibold text-lg border-2 border-white/20 text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
      >
        Continue to Dashboard
        <ArrowRight className="w-5 h-5" />
      </button>

      {/* Stats footer */}
      <div className="mt-8 pt-6 border-t border-white/10">
        <p className="text-center text-white/40 text-sm mb-4">
          Join over 1 million users who discovered their cosmic path
        </p>
        <div className="flex justify-center gap-8">
          <div className="text-center">
            <p className="text-white font-bold text-xl">4.9★</p>
            <p className="text-white/40 text-xs">App Rating</p>
          </div>
          <div className="text-center">
            <p className="text-white font-bold text-xl">1M+</p>
            <p className="text-white/40 text-xs">Reports Generated</p>
          </div>
          <div className="text-center">
            <p className="text-white font-bold text-xl">98%</p>
            <p className="text-white/40 text-xs">Satisfaction</p>
          </div>
        </div>
      </div>
    </div>
  )
}
