import Link from 'next/link'
import Image from 'next/image'
import { requireUser } from '@/lib/auth'
import { createClient } from '@/lib/supabase/server'
import { StaticStarfield } from '@/components/ui/starfield-background'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await requireUser()

  // Check if user has birth data
  let hasBirthData = false
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('user_birth_data')
      .select('id')
      .eq('user_id', user.id)
      .single()
    hasBirthData = !!data
  } catch {
    // No birth data found
  }

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
              <Image src="/orbli-logo.png" alt="Orbli" width={288} height={87} style={{ width: '105px', height: 'auto' }} />
            </Link>
            <nav className="flex items-center gap-4 overflow-x-auto scrollbar-hide whitespace-nowrap pl-4">
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
              {!hasBirthData && (
                <Link
                  href="/birth-details"
                  className="text-amber-400 hover:text-amber-300 transition-colors text-sm font-medium"
                >
                  Add Birth Details
                </Link>
              )}
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
