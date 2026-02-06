'use client'

/**
 * ProfileRevealStep (Step 11)
 *
 * Profile card reveal showing sign, modality, polarity, ruling planet,
 * and compatible signs.
 */

import { useState, useEffect } from 'react'
import { useOnboardingV2Store } from '@/store/onboarding-v2'
import { ProfileCard } from '../ProfileCard'
import { AstrologerBubble } from '../AstrologerBubble'

export function ProfileRevealStep() {
  const { profileData, goToNextStep } = useOnboardingV2Store()
  const [showCard, setShowCard] = useState(false)
  const [showBubble, setShowBubble] = useState(false)
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    // Staggered reveal
    setTimeout(() => setShowCard(true), 300)
    setTimeout(() => setShowBubble(true), 1200)
    setTimeout(() => setShowButton(true), 2000)
  }, [])

  if (!profileData) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-white/60">Loading profile...</p>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
      <h1 className="text-2xl font-serif font-semibold text-white text-center mb-2">
        Your Cosmic Profile
      </h1>
      <p className="text-white/60 text-center mb-8">
        Based on your birth chart and preferences
      </p>

      {/* Profile card */}
      <div
        className={`w-full max-w-sm mb-6 transition-all duration-700 ${
          showCard ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <ProfileCard profile={profileData} />
      </div>

      {/* Astrologer bubble */}
      {showBubble && (
        <div className="w-full max-w-sm mb-6">
          <AstrologerBubble
            message={`As a ${profileData.sign}, you have incredible potential. Your ${profileData.element} nature combined with ${profileData.modality} energy creates a powerful combination!`}
            highlightedText="incredible potential"
          />
        </div>
      )}

      {/* Continue button */}
      {showButton && (
        <button
          onClick={goToNextStep}
          className="w-full max-w-sm py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90 transition-all animate-fade-in-up"
        >
          Continue
        </button>
      )}
    </div>
  )
}
