'use client'

/**
 * OnboardingFlow
 *
 * Main step machine for onboarding V2.
 * Renders the current step with CSS slide transitions.
 * All 20 steps render inside this component - no route changes.
 */

import { useEffect, useRef, useState } from 'react'
import { useOnboardingV2Store } from '@/store/onboarding-v2'
import type { OnboardingStep } from '@/types/onboarding-v2'
import { OnboardingHeader } from './OnboardingHeader'
import { SocialProofNotification } from './SocialProofNotification'

// Quiz steps (1-14)
import { GenderStep } from './steps/GenderStep'
import { BirthdayStep } from './steps/BirthdayStep'
import { BirthTimeStep } from './steps/BirthTimeStep'
import { BirthPlaceStep } from './steps/BirthPlaceStep'
import { ChartMappingStep } from './steps/ChartMappingStep'
import { ForecastAccuracy34Step } from './steps/ForecastAccuracy34Step'
import { RelationshipStep } from './steps/RelationshipStep'
import { FutureGoalsStep } from './steps/FutureGoalsStep'
import { ColorPreferenceStep } from './steps/ColorPreferenceStep'
import { ElementStep } from './steps/ElementStep'
import { ProfileRevealStep } from './steps/ProfileRevealStep'
import { ForecastAccuracy67Step } from './steps/ForecastAccuracy67Step'
import { PalmReadingStep } from './steps/PalmReadingStep'
import { ForecastAccuracy100Step } from './steps/ForecastAccuracy100Step'

// Post-quiz conversion steps (15-20)
import { EmailCaptureStep } from './post-quiz/EmailCaptureStep'
import { LoadingScreensStep } from './post-quiz/LoadingScreensStep'
import { ResultsReadyStep } from './post-quiz/ResultsReadyStep'
import { PaymentStep } from './post-quiz/PaymentStep'
import { ResultsRevealStep } from './post-quiz/ResultsRevealStep'
import { ForecastUpsellStep } from './post-quiz/ForecastUpsellStep'

// Step component mapping
const STEP_COMPONENTS: Record<OnboardingStep, React.ComponentType> = {
  'gender': GenderStep,
  'birthday': BirthdayStep,
  'birth-time': BirthTimeStep,
  'birth-place': BirthPlaceStep,
  'chart-mapping': ChartMappingStep,
  'forecast-34': ForecastAccuracy34Step,
  'relationship': RelationshipStep,
  'future-goals': FutureGoalsStep,
  'color-preference': ColorPreferenceStep,
  'element': ElementStep,
  'profile-reveal': ProfileRevealStep,
  'forecast-67': ForecastAccuracy67Step,
  'palm-reading': PalmReadingStep,
  'forecast-100': ForecastAccuracy100Step,
  'email-capture': EmailCaptureStep,
  'loading-screens': LoadingScreensStep,
  'results-ready': ResultsReadyStep,
  'payment': PaymentStep,
  'results-reveal': ResultsRevealStep,
  'forecast-upsell': ForecastUpsellStep,
}

export function OnboardingFlow() {
  const { currentStep, direction } = useOnboardingV2Store()
  const [displayedStep, setDisplayedStep] = useState<OnboardingStep>(currentStep)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Handle step transitions
  useEffect(() => {
    if (currentStep !== displayedStep) {
      setIsTransitioning(true)

      // Wait for exit animation, then switch step and play enter animation
      const timer = setTimeout(() => {
        setDisplayedStep(currentStep)
        setIsTransitioning(false)
      }, 300) // Match animation duration

      return () => clearTimeout(timer)
    }
  }, [currentStep, displayedStep])

  // Get current step component
  const StepComponent = STEP_COMPONENTS[displayedStep]

  // Determine animation classes based on transition state and direction
  const getAnimationClass = () => {
    if (isTransitioning) {
      // Exiting
      return direction === 'forward'
        ? 'animate-slide-out-left'
        : 'animate-slide-out-right'
    }
    // Entering (or idle after enter)
    if (currentStep === displayedStep) {
      return direction === 'forward'
        ? 'animate-slide-in-right'
        : 'animate-slide-in-left'
    }
    return ''
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SocialProofNotification />
      <OnboardingHeader />

      {/* Step container with transitions */}
      <div
        ref={containerRef}
        className="flex-1 flex flex-col overflow-hidden"
      >
        <div
          className={`flex-1 flex flex-col ${getAnimationClass()}`}
          key={displayedStep}
        >
          <StepComponent />
        </div>
      </div>
    </div>
  )
}
