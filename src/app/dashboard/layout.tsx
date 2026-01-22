import Link from 'next/link'
import Image from 'next/image'
import { requireUser } from '@/lib/auth'
import { StaticStarfield } from '@/components/ui/starfield-background'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await requireUser()

  return (
    <div className="min-h-screen bg-[#1a1a2e] relative">
      {/* Gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#1a1a2e] via-[#1e1e3a] to-[#16162a] z-0" />

      {/* Starfield */}
      <StaticStarfield />

      {/* Content wrapper */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-indigo-900/30 bg-[#1a1a2e]/80 backdrop-blur-md sticky top-0 z-20">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center">
              <Image src="/orbli-logo.png" alt="Orbli" width={80} height={28} className="h-7 w-auto" />
            </Link>
            <nav className="flex items-center gap-6">
              <Link
                href="/dashboard"
                className="text-indigo-200/70 hover:text-white transition-colors text-sm"
              >
                Dashboard
              </Link>
              <Link
                href="/learn"
                className="text-indigo-200/70 hover:text-white transition-colors text-sm"
              >
                Learn
              </Link>
              <Link
                href="/reports"
                className="text-indigo-200/70 hover:text-white transition-colors text-sm"
              >
                Reports
              </Link>
              <Link
                href="/charts"
                className="text-indigo-200/70 hover:text-white transition-colors text-sm"
              >
                Calculators
              </Link>
              <Link
                href="/synastry"
                className="text-indigo-200/70 hover:text-white transition-colors text-sm"
              >
                Synastry
              </Link>
              <Link
                href="/astrologist"
                className="text-indigo-200/70 hover:text-white transition-colors text-sm"
              >
                AI Astrologist
              </Link>
              <Link
                href="/tarot"
                className="text-indigo-200/70 hover:text-white transition-colors text-sm"
              >
                Tarot
              </Link>
              <Link
                href="/birth-details"
                className="text-indigo-200/70 hover:text-white transition-colors text-sm"
              >
                Birth Details
              </Link>
              <Link
                href="/settings"
                className="text-indigo-200/70 hover:text-white transition-colors text-sm"
              >
                Account
              </Link>
            </nav>
          </div>
        </header>

        {/* Main content */}
        <main className="max-w-4xl mx-auto px-4 py-8">{children}</main>
      </div>
    </div>
  )
}
