'use client'

/**
 * ElementStep (Step 10)
 *
 * Element of nature selection (Earth/Water/Fire/Air).
 */

import { useOnboardingV2Store } from '@/store/onboarding-v2'
import type { ElementOfNature } from '@/types/onboarding-v2'
import { ELEMENT_OPTIONS } from '@/types/onboarding-v2'
import { TopBanner } from '../shared/TopBanner'

export function ElementStep() {
  const { elementPreference, setElementPreference, goToNextStep } = useOnboardingV2Store()

  const handleSelect = (element: ElementOfNature) => {
    setElementPreference(element)
    setTimeout(() => goToNextStep(), 200)
  }

  return (
    <div className="flex-1 flex flex-col items-center px-6 py-8">
      <TopBanner variant="testimonial" className="mb-6" />

      <h1 className="text-2xl font-serif font-semibold text-white text-center mb-2">
        Which element calls to you?
      </h1>
      <p className="text-white/60 text-center mb-8">
        Choose the element that resonates most with your spirit
      </p>

      <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
        {ELEMENT_OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => handleSelect(option.value)}
            className={`
              p-6 rounded-2xl border-2 transition-all duration-200
              flex flex-col items-center gap-3
              ${
                elementPreference === option.value
                  ? 'border-indigo-500 bg-indigo-500/20 scale-[0.98]'
                  : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10'
              }
            `}
          >
            <span className="text-4xl">{option.emoji}</span>
            <span className="text-lg text-white font-semibold">{option.label}</span>
            <span className="text-sm text-white/60">{option.description}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
