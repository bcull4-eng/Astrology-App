'use client'

/**
 * ForecastAccuracy100Step (Step 14)
 *
 * Shows 100% forecast accuracy with animated orb and "Get the Results!" CTA.
 */

import { useState } from 'react'
import { useOnboardingV2Store } from '@/store/onboarding-v2'
import { ForecastAccuracyOrb } from '../ForecastAccuracyOrb'
import { AstrologerBubble } from '../AstrologerBubble'
import { Sparkles } from 'lucide-react'

export function ForecastAccuracy100Step() {
  const { goToNextStep, palmReadingData } = useOnboardingV2Store()
  const [showBubble, setShowBubble] = useState(false)
  const [showButton, setShowButton] = useState(false)

  const handleOrbComplete = () => {
    setShowBubble(true)
    setTimeout(() => setShowButton(true), 1200)
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
      <h1 className="text-2xl font-serif font-semibold text-white text-center mb-2">
        Your Reading is Complete!
      </h1>
      <p className="text-white/60 text-center mb-8">
        Maximum accuracy achieved
      </p>

      {/* Accuracy orb */}
      <div className="mb-8">
        <ForecastAccuracyOrb percentage={100} onComplete={handleOrbComplete} />
      </div>

      {/* Palm reading mini preview */}
      {palmReadingData?.imageUrl && (
        <div className="w-20 h-20 rounded-xl overflow-hidden mb-6 opacity-80 border border-white/20">
          <img
            src={palmReadingData.imageUrl}
            alt="Your palm"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Astrologer bubble */}
      {showBubble && (
        <div className="w-full max-w-sm mb-6">
          <AstrologerBubble
            message="I've analyzed everything - your birth chart, preferences, and palm lines. Your personalized cosmic report is ready with life-changing insights!"
            highlightedText="life-changing insights"
          />
        </div>
      )}

      {/* Get Results button */}
      {showButton && (
        <button
          onClick={goToNextStep}
          className="w-full max-w-sm py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:opacity-90 transition-all animate-fade-in-up flex items-center justify-center gap-2"
        >
          <Sparkles className="w-5 h-5" />
          Get My Results!
        </button>
      )}
    </div>
  )
}
