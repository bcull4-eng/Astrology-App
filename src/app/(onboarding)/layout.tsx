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
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <main className="flex items-center justify-center min-h-screen p-4">
        {children}
      </main>
    </div>
  )
}
