/**
 * Onboarding V2 Page
 *
 * Single-page step machine for the new 20-step onboarding flow.
 * Renders OnboardingFlow component which handles all step transitions.
 */

import { OnboardingFlow } from '@/components/onboarding/OnboardingFlow'

export default function OnboardingPage() {
  return <OnboardingFlow />
}
