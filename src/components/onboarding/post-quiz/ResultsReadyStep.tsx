'use client'

/**
 * ResultsReadyStep (Step 17)
 *
 * Locked predictions display with social proof notifications and countdown timer.
 * Previews locked content to encourage subscription.
 */

import { useOnboardingV2Store } from '@/store/onboarding-v2'
import { Lock, Star } from 'lucide-react'
import { SocialProofNotification } from '../SocialProofNotification'
import { CountdownTimer } from '../CountdownTimer'

const LOCKED_PREDICTIONS = [
  { title: 'Love & Relationships', icon: '💕', preview: 'Your Venus placement reveals...' },
  { title: 'Career & Success', icon: '💼', preview: 'Jupiter in your chart suggests...' },
  { title: 'Financial Outlook', icon: '💰', preview: 'Your 2nd house indicates...' },
  { title: 'Health & Wellness', icon: '🌿', preview: 'Mars energy shows...' },
  { title: 'Life Purpose', icon: '✨', preview: 'Your North Node points to...' },
  { title: 'Palm Reading Results', icon: '🖐️', preview: 'Your life line score reveals...' },
]

export function ResultsReadyStep() {
  const { goToNextStep, profileData, natalChartData } = useOnboardingV2Store()

  return (
    <div className="flex-1 flex flex-col px-6 py-8">
      {/* Social proof notifications */}
      <SocialProofNotification />

      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-serif font-semibold text-white mb-2">
          Your Results Are Ready!
        </h1>
        <p className="text-white/60">
          {profileData?.sign || 'Your'} personalized cosmic report
        </p>
      </div>

      {/* Stats summary */}
      <div className="flex justify-center gap-4 mb-6">
        {natalChartData && (
          <>
            <div className="text-center">
              <span className="text-2xl">☉</span>
              <p className="text-xs text-white/40">Sun</p>
              <p className="text-white text-sm">{natalChartData.sunSign}</p>
            </div>
            <div className="text-center">
              <span className="text-2xl">☽</span>
              <p className="text-xs text-white/40">Moon</p>
              <p className="text-white text-sm">{natalChartData.moonSign}</p>
            </div>
            <div className="text-center">
              <span className="text-2xl">↑</span>
              <p className="text-xs text-white/40">Rising</p>
              <p className="text-white text-sm">{natalChartData.ascendant}</p>
            </div>
          </>
        )}
      </div>

      {/* Locked predictions */}
      <div className="space-y-3 mb-6">
        {LOCKED_PREDICTIONS.map((prediction, index) => (
          <div
            key={index}
            className="relative bg-white/5 border border-white/10 rounded-xl p-4 overflow-hidden"
          >
            {/* Blur overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1a1a2e]/50 to-[#1a1a2e] backdrop-blur-sm z-10" />

            <div className="flex items-center gap-3">
              <span className="text-2xl">{prediction.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium">{prediction.title}</p>
                <p className="text-white/40 text-sm truncate">{prediction.preview}</p>
              </div>
              <Lock className="w-5 h-5 text-white/40 relative z-20" />
            </div>
          </div>
        ))}
      </div>

      {/* Reviews section */}
      <div className="bg-white/5 rounded-xl p-4 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <span className="text-white text-sm font-medium">4.9</span>
          <span className="text-white/40 text-sm">• 12,847 reviews</span>
        </div>
        <p className="text-white/80 text-sm italic">
          &quot;The most accurate reading I&apos;ve ever received. The palm analysis was spot on!&quot;
        </p>
        <p className="text-white/40 text-xs mt-1">- Sarah M., verified user</p>
      </div>

      {/* Countdown */}
      <div className="text-center mb-6">
        <p className="text-white/60 text-sm mb-2">Special offer expires in:</p>
        <CountdownTimer initialMinutes={15} />
      </div>

      {/* CTA button */}
      <button
        onClick={goToNextStep}
        className="w-full py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:opacity-90 transition-all"
      >
        Unlock Full Report - 50% Off
      </button>

      <p className="text-center text-white/40 text-xs mt-3">
        Cancel anytime • 7-day money back guarantee
      </p>
    </div>
  )
}
