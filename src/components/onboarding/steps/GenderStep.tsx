'use client'

/**
 * GenderStep (Step 1)
 *
 * Gender selection with three card options: Female, Male, Non-binary
 */

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
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
      <h1 className="text-2xl font-serif font-semibold text-white text-center mb-2">
        What&apos;s your gender?
      </h1>
      <p className="text-white/60 text-center mb-8">
        This helps personalize your astrological insights
      </p>

      <div className="grid grid-cols-1 gap-4 w-full max-w-sm">
        {GENDER_OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => handleSelect(option.value)}
            className={`
              p-6 rounded-2xl border-2 transition-all duration-200
              flex items-center gap-4
              ${
                gender === option.value
                  ? 'border-indigo-500 bg-indigo-500/20 scale-[0.98]'
                  : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10'
              }
            `}
          >
            <span className="text-3xl">{option.emoji}</span>
            <span className="text-lg text-white font-medium">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
