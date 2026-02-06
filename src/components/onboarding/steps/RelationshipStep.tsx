'use client'

/**
 * RelationshipStep (Step 7)
 *
 * Relationship status selection with 7 emoji options.
 */

import { useOnboardingV2Store } from '@/store/onboarding-v2'
import type { RelationshipStatusV2 } from '@/types/onboarding-v2'
import { RELATIONSHIP_OPTIONS } from '@/types/onboarding-v2'

export function RelationshipStep() {
  const { relationshipStatus, setRelationshipStatus, goToNextStep } = useOnboardingV2Store()

  const handleSelect = (status: RelationshipStatusV2) => {
    setRelationshipStatus(status)
    setTimeout(() => goToNextStep(), 200)
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
      <h1 className="text-2xl font-serif font-semibold text-white text-center mb-2">
        What&apos;s your relationship status?
      </h1>
      <p className="text-white/60 text-center mb-8">
        This helps us personalize your love insights
      </p>

      <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
        {RELATIONSHIP_OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => handleSelect(option.value)}
            className={`
              p-4 rounded-xl border-2 transition-all duration-200
              flex flex-col items-center gap-2
              ${
                relationshipStatus === option.value
                  ? 'border-indigo-500 bg-indigo-500/20 scale-[0.98]'
                  : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10'
              }
            `}
          >
            <span className="text-2xl">{option.emoji}</span>
            <span className="text-sm text-white font-medium text-center">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
