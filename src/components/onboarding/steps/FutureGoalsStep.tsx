'use client'

/**
 * FutureGoalsStep (Step 8)
 *
 * Future goals multi-select (up to 3) with chip-style options.
 */

import { useOnboardingV2Store } from '@/store/onboarding-v2'
import type { FutureGoal } from '@/types/onboarding-v2'
import { FUTURE_GOAL_OPTIONS } from '@/types/onboarding-v2'
import { TopBanner } from '../shared/TopBanner'

export function FutureGoalsStep() {
  const { futureGoals, toggleFutureGoal, goToNextStep } = useOnboardingV2Store()

  const isComplete = futureGoals.length > 0

  const handleToggle = (goal: FutureGoal) => {
    toggleFutureGoal(goal)
  }

  const handleContinue = () => {
    if (isComplete) {
      goToNextStep()
    }
  }

  return (
    <div className="flex-1 flex flex-col items-center px-6 py-8">
      <TopBanner variant="stat" className="mb-6" />

      <h1 className="text-2xl font-serif font-semibold text-white text-center mb-2">
        What do you want to focus on?
      </h1>
      <p className="text-white/60 text-center mb-8">
        Select up to 3 areas for your personalized insights
      </p>

      <div className="grid grid-cols-2 gap-3 w-full max-w-sm mb-8">
        {FUTURE_GOAL_OPTIONS.map((option) => {
          const isSelected = futureGoals.includes(option.value)
          const isDisabled = !isSelected && futureGoals.length >= 3

          return (
            <button
              key={option.value}
              onClick={() => handleToggle(option.value)}
              disabled={isDisabled}
              className={`
                p-4 rounded-xl border-2 transition-all duration-200
                flex items-center gap-3
                ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-500/20'
                    : isDisabled
                    ? 'border-white/10 bg-white/5 opacity-50 cursor-not-allowed'
                    : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10'
                }
              `}
            >
              <span className="text-xl">{option.emoji}</span>
              <span className="text-sm text-white font-medium">{option.label}</span>
            </button>
          )
        })}
      </div>

      {/* Selection counter */}
      <p className="text-white/40 text-sm mb-4">
        {futureGoals.length}/3 selected
      </p>

      <button
        onClick={handleContinue}
        disabled={!isComplete}
        className={`
          w-full max-w-sm py-4 rounded-xl font-semibold text-lg transition-all
          ${
            isComplete
              ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90'
              : 'bg-white/10 text-white/40 cursor-not-allowed'
          }
        `}
      >
        Continue
      </button>
    </div>
  )
}
