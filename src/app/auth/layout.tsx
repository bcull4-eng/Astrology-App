/**
 * Auth Layout
 *
 * Shared layout for sign-in and sign-up pages.
 */

import { StaticStarfield } from '@/components/ui/starfield-background'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a2e] p-4 relative overflow-hidden">
      <StaticStarfield />
      <div className="w-full max-w-md relative z-10">
        {children}
      </div>
    </div>
  )
}
