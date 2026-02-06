'use client'

/**
 * GenderStep (Step 1)
 *
 * Welcome screen with branding + gender selection
 */

import Image from 'next/image'
import { Star, Users } from 'lucide-react'
import { useOnboardingV2Store } from '@/store/onboarding-v2'
import type { Gender } from '@/types/onboarding-v2'
import { GENDER_OPTIONS } from '@/types/onboarding-v2'

export function GenderStep() {
  const { gender, setGender, goToNextStep } = useOnboardingV2Store()

  const handleSelect = (selectedGender: Gender) => {
    setGender(selectedGender)
    // Small delay for selection animation
    setTimeout(() => {
      goToNextStep()
    }, 200)
  }

  return (
    <div className="flex-1 flex flex-col items-center px-6 py-8">
      {/* Welcome branding section */}
      <div className="text-center mb-8">
        <div className="mb-4">
          <Image
            src="/orbli-logo.png"
            alt="Orbli"
            width={288}
            height={87}
            style={{ width: '160px', height: 'auto' }}
            className="mx-auto"
            priority
          />
        </div>
        <h1 className="text-2xl font-serif font-semibold text-white mb-2">
          Welcome to Your Cosmic Journey
        </h1>
        <p className="text-white/60 max-w-xs mx-auto">
          Discover your personalized astrological insights in just 2 minutes
        </p>

        {/* Social proof stats */}
        <div className="flex items-center justify-center gap-4 mt-4">
          <div className="flex items-center gap-1.5 text-white/50 text-sm">
            <Users className="w-4 h-4" />
            <span>47,892 readings</span>
          </div>
          <div className="flex items-center gap-1 text-white/50 text-sm">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span>4.9 rating</span>
          </div>
        </div>
      </div>

      {/* Gender question */}
      <div className="w-full max-w-sm">
        <h2 className="text-lg font-medium text-white text-center mb-2">
          What&apos;s your gender?
        </h2>
        <p className="text-white/50 text-sm text-center mb-6">
          This helps personalize your reading
        </p>

        <div className="grid grid-cols-1 gap-3">
          {GENDER_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`
                p-5 rounded-2xl border-2 transition-all duration-200
                flex items-center gap-4
                ${
                  gender === option.value
                    ? 'border-indigo-500 bg-indigo-500/20 scale-[0.98]'
                    : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10'
                }
              `}
            >
              <span className="text-2xl">{option.emoji}</span>
              <span className="text-white font-medium">{option.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
