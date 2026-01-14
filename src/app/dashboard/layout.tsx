/**
 * Dashboard Layout
 *
 * Shared layout for dashboard screens.
 * Includes navigation, subscription status check.
 */

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b p-4">
        {/* Navigation will go here */}
      </header>
      <main className="flex-1 p-4">
        {children}
      </main>
    </div>
  )
}
