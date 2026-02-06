'use client'

/**
 * ColorPreferenceStep (Step 9)
 *
 * Color preference selection with 6 color options.
 */

import { useOnboardingV2Store } from '@/store/onboarding-v2'
import type { ColorPreference } from '@/types/onboarding-v2'
import { COLOR_OPTIONS } from '@/types/onboarding-v2'
import { TopBanner } from '../shared/TopBanner'

export function ColorPreferenceStep() {
  const { colorPreference, setColorPreference, goToNextStep } = useOnboardingV2Store()

  const handleSelect = (color: ColorPreference) => {
    setColorPreference(color)
    setTimeout(() => goToNextStep(), 200)
  }

  return (
    <div className="flex-1 flex flex-col items-center px-6 py-8">
      <TopBanner variant="feature" startIndex={2} className="mb-6" />

      <h1 className="text-2xl font-serif font-semibold text-white text-center mb-2">
        Which color speaks to your soul?
      </h1>
      <p className="text-white/60 text-center mb-8">
        Your color preference reveals hidden aspects of your personality
      </p>

      <div className="grid grid-cols-3 gap-4 w-full max-w-sm">
        {COLOR_OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => handleSelect(option.value)}
            className={`
              aspect-square rounded-2xl border-2 transition-all duration-200
              flex flex-col items-center justify-center gap-2
              ${
                colorPreference === option.value
                  ? 'border-white scale-[0.95] shadow-lg'
                  : 'border-transparent hover:scale-[0.98]'
              }
            `}
            style={{
              backgroundColor: option.color,
              boxShadow: colorPreference === option.value ? `0 0 30px ${option.color}60` : undefined,
            }}
          >
            <span
              className="text-sm font-medium drop-shadow-md"
              style={{
                color: option.value === 'yellow' ? '#1a1a2e' : 'white',
              }}
            >
              {option.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
