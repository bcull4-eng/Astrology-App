'use client'

/**
 * ForecastAccuracy34Step (Step 6)
 *
 * Shows 34% forecast accuracy with animated orb and astrologer bubble.
 */

import { useState } from 'react'
import { useOnboardingV2Store } from '@/store/onboarding-v2'
import { ForecastAccuracyOrb } from '../ForecastAccuracyOrb'
import { AstrologerBubble } from '../AstrologerBubble'

export function ForecastAccuracy34Step() {
  const { goToNextStep } = useOnboardingV2Store()
  const [showBubble, setShowBubble] = useState(false)
  const [showButton, setShowButton] = useState(false)

  const handleOrbComplete = () => {
    setShowBubble(true)
    setTimeout(() => setShowButton(true), 1000)
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
      <h1 className="text-2xl font-serif font-semibold text-white text-center mb-2">
        Your Reading Progress
      </h1>
      <p className="text-white/60 text-center mb-8">
        Based on your birth chart analysis
      </p>

      {/* Accuracy orb */}
      <div className="mb-8">
        <ForecastAccuracyOrb percentage={34} onComplete={handleOrbComplete} />
      </div>

      {/* Astrologer bubble */}
      {showBubble && (
        <div className="w-full max-w-sm mb-6">
          <AstrologerBubble
            message="We have a good start with your birth chart! To unlock more accurate predictions, I need to understand your current life situation better."
            highlightedText="more accurate predictions"
          />
        </div>
      )}

      {/* Continue button */}
      {showButton && (
        <button
          onClick={goToNextStep}
          className="w-full max-w-sm py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90 transition-all animate-fade-in-up"
        >
          Continue to Personalization
        </button>
      )}
    </div>
  )
}
