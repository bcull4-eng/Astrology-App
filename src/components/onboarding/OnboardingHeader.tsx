'use client'

/**
 * OnboardingHeader
 *
 * Header component for onboarding V2 flow.
 * Shows back arrow, Orbli branding, step counter (X/14), and progress bar.
 */

import { ChevronLeft } from 'lucide-react'
import { useOnboardingV2Store, getStepNumber, isQuizStep } from '@/store/onboarding-v2'
import { QUIZ_STEP_COUNT } from '@/types/onboarding-v2'

export function OnboardingHeader() {
  const { currentStep, goToPreviousStep } = useOnboardingV2Store()

  const stepNumber = getStepNumber(currentStep)
  const isQuiz = isQuizStep(currentStep)
  const showProgress = isQuiz

  // Calculate progress percentage (only for quiz steps 1-14)
  const progressPercent = isQuiz ? (stepNumber / QUIZ_STEP_COUNT) * 100 : 100

  // Don't show back arrow on first step
  const showBackArrow = stepNumber > 1

  return (
    <header className="sticky top-0 z-50 w-full px-4 py-3 bg-[#1a1a2e]/80 backdrop-blur-md">
      <div className="flex items-center justify-between max-w-lg mx-auto">
        {/* Back arrow */}
        <button
          onClick={goToPreviousStep}
          className={`p-2 -ml-2 rounded-full transition-opacity ${
            showBackArrow
              ? 'text-white/80 hover:text-white hover:bg-white/10'
              : 'opacity-0 pointer-events-none'
          }`}
          aria-label="Go back"
          disabled={!showBackArrow}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Orbli branding */}
        <span className="text-lg font-semibold text-white tracking-wide">
          Orbli
        </span>

        {/* Step counter (only for quiz steps) */}
        <div className="w-12 text-right">
          {showProgress && (
            <span className="text-sm text-white/60 tabular-nums">
              {stepNumber}/{QUIZ_STEP_COUNT}
            </span>
          )}
        </div>
      </div>

      {/* Progress bar (only for quiz steps) */}
      {showProgress && (
        <div className="mt-2 max-w-lg mx-auto">
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}
    </header>
  )
}
