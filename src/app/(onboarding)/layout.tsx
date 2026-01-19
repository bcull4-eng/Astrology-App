/**
 * Onboarding Layout
 *
 * Shared layout for all onboarding screens.
 * Provides consistent styling and navigation state.
 */

import { StaticStarfield } from '@/components/ui/starfield-background'

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#1a1a2e] relative overflow-hidden">
      <StaticStarfield />
      <main className="flex items-center justify-center min-h-screen p-4 relative z-10">
        {children}
      </main>
    </div>
  )
}
