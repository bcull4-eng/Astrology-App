import Link from 'next/link'
import Image from 'next/image'
import { requireUser } from '@/lib/auth'
import { createClient } from '@/lib/supabase/server'
import { StaticStarfield } from '@/components/ui/starfield-background'

export default async function AstrologistLayout({
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
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center">
            <Image src="/orbli-logo.png" alt="Orbli" width={288} height={87} style={{ width: '105px', height: 'auto' }} />
          </Link>
          <nav className="flex items-center gap-4 overflow-x-auto scrollbar-hide whitespace-nowrap pl-4">
            <Link
              href="/dashboard"
              className="text-indigo-200/50 hover:text-white transition-colors text-sm"
            >
              Dashboard
            </Link>
            <Link
              href="/learn"
              className="text-indigo-200/50 hover:text-white transition-colors text-sm"
            >
              Learn
            </Link>
            <Link
              href="/reports"
              className="text-indigo-200/50 hover:text-white transition-colors text-sm"
            >
              Reports
            </Link>
            <Link
              href="/charts"
              className="text-indigo-200/50 hover:text-white transition-colors text-sm"
            >
              Calculators
            </Link>
            <Link
              href="/synastry"
              className="text-indigo-200/50 hover:text-white transition-colors text-sm"
            >
              Synastry
            </Link>
            <Link
              href="/astrologist"
              className="text-white transition-colors text-sm"
            >
              AI Astrologist
            </Link>
            <Link
              href="/tarot"
              className="text-indigo-200/50 hover:text-white transition-colors text-sm"
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
              className="text-indigo-200/50 hover:text-white transition-colors text-sm"
            >
              Account
            </Link>
          </nav>
        </div>
      </header>

      {/* Main content - full height for chat */}
      <main className="h-[calc(100vh-65px)] relative z-10">{children}</main>
    </div>
  )
}
