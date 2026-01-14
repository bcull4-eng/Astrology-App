/**
 * Onboarding Layout
 *
 * Shared layout for all onboarding screens.
 * Provides consistent styling and navigation state.
 */

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex items-center justify-center p-4">
        {children}
      </main>
    </div>
  )
}
