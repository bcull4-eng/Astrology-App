import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { requireUser } from '@/lib/auth'
import { createClient } from '@/lib/supabase/server'
import { StaticStarfield } from '@/components/ui/starfield-background'

export const metadata: Metadata = {
  title: 'Synastry Chart Calculator | Relationship Compatibility | Orbli',
  description: 'Free synastry chart calculator to analyze relationship compatibility. Compare birth charts and discover your romantic, emotional, and spiritual connections.',
  openGraph: {
    title: 'Synastry Chart Calculator | Orbli',
    description: 'Free synastry chart calculator to analyze relationship compatibility between two people.',
    type: 'website',
  },
}

export default async function SynastryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await requireUser()

  let hasBirthData = false
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('user_birth_data')
      .select('id')
      .eq('user_id', user.id)
      .single()
    hasBirthData = !!data
  } catch {}

  return (
    <div className="min-h-screen bg-[#1a1a2e] relative overflow-x-hidden">
      <StaticStarfield />
      {/* Header */}
      <header className="border-b border-indigo-500/10 bg-[#1a1a2e]/80 backdrop-blur-md relative z-10">
        <div className="max-w-4xl mx-auto px-4 py-3">
          {/* Desktop: logo and nav inline */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="flex items-center flex-shrink-0">
              <Image src="/orbli-logo.png" alt="Orbli" width={288} height={87} style={{ width: '90px', height: 'auto' }} />
            </Link>
            <nav className="flex items-center gap-4">
              <Link href="/dashboard" className="text-indigo-200/50 hover:text-white transition-colors text-sm">
                Dashboard
              </Link>
              <Link href="/learn" className="text-indigo-200/50 hover:text-white transition-colors text-sm">
                Learn <span className="text-emerald-400 text-[10px]">new</span>
              </Link>
              <Link href="/reports" className="text-indigo-200/50 hover:text-white transition-colors text-sm">
                Reports <span className="text-emerald-400 text-[10px]">new</span>
              </Link>
              <Link href="/charts" className="text-indigo-200/50 hover:text-white transition-colors text-sm">
                Calculators
              </Link>
              <Link href="/synastry" className="text-white transition-colors text-sm">
                Synastry
              </Link>
              <Link href="/astrologist" className="text-indigo-200/50 hover:text-white transition-colors text-sm">
                AI Astrologist
              </Link>
              <Link href="/tarot" className="text-indigo-200/50 hover:text-white transition-colors text-sm">
                Tarot <span className="text-emerald-400 text-[10px]">new</span>
              </Link>
              {!hasBirthData && (
                <Link href="/birth-details" className="text-amber-400 hover:text-amber-300 transition-colors text-sm font-medium">
                  Add Birth Details
                </Link>
              )}
              <Link href="/settings" className="text-indigo-200/50 hover:text-white transition-colors text-sm">
                Account
              </Link>
              <Link href="/paywall" className="text-indigo-200/50 hover:text-white transition-colors text-sm">
                Pricing
              </Link>
            </nav>
          </div>
          {/* Mobile: logo row */}
          <div className="flex md:hidden items-center justify-between">
            <Link href="/dashboard" className="flex items-center flex-shrink-0">
              <Image src="/orbli-logo.png" alt="Orbli" width={288} height={87} style={{ width: '90px', height: 'auto' }} />
            </Link>
            <Link href="/settings" className="text-indigo-200/50 hover:text-white transition-colors text-sm">
              Account
            </Link>
          </div>
        </div>
        {/* Mobile nav - scrollable row */}
        <div className="md:hidden overflow-x-auto scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch' }}>
          <nav className="flex items-center gap-4 px-4 pb-3 whitespace-nowrap min-w-max">
            <Link href="/dashboard" className="text-indigo-200/50 hover:text-white transition-colors text-sm">
              Dashboard
            </Link>
            <Link href="/learn" className="text-indigo-200/50 hover:text-white transition-colors text-sm">
              Learn <span className="text-emerald-400 text-[10px]">new</span>
            </Link>
            <Link href="/reports" className="text-indigo-200/50 hover:text-white transition-colors text-sm">
              Reports <span className="text-emerald-400 text-[10px]">new</span>
            </Link>
            <Link href="/charts" className="text-indigo-200/50 hover:text-white transition-colors text-sm">
              Calculators
            </Link>
            <Link href="/synastry" className="text-white transition-colors text-sm">
              Synastry
            </Link>
            <Link href="/astrologist" className="text-indigo-200/50 hover:text-white transition-colors text-sm">
              AI Astrologist
            </Link>
            <Link href="/tarot" className="text-indigo-200/50 hover:text-white transition-colors text-sm">
              Tarot <span className="text-emerald-400 text-[10px]">new</span>
            </Link>
            {!hasBirthData && (
              <Link href="/birth-details" className="text-amber-400 hover:text-amber-300 transition-colors text-sm font-medium">
                Add Birth Details
              </Link>
            )}
            <Link href="/paywall" className="text-indigo-200/50 hover:text-white transition-colors text-sm">
              Pricing
            </Link>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-4 py-8 relative z-10">{children}</main>
    </div>
  )
}
