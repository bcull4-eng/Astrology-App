import Link from 'next/link'
import { requireUser } from '@/lib/auth'
import { StaticStarfield } from '@/components/ui/starfield-background'

export default async function LearnLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await requireUser()

  return (
    <div className="min-h-screen bg-[#1a1a2e] relative overflow-hidden">
      <StaticStarfield />
      {/* Header */}
      <header className="border-b border-indigo-500/10 bg-[#1a1a2e]/80 backdrop-blur-md relative z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="text-white font-semibold text-xl">
            Astro
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/dashboard"
              className="text-indigo-200/50 hover:text-white transition-colors text-sm"
            >
              Dashboard
            </Link>
            <Link
              href="/learn"
              className="text-white transition-colors text-sm"
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
              href="/synastry"
              className="text-indigo-200/50 hover:text-white transition-colors text-sm"
            >
              Synastry
            </Link>
            <Link
              href="/astrologist"
              className="text-indigo-200/50 hover:text-white transition-colors text-sm"
            >
              Astrologist
            </Link>
            <Link
              href="/settings"
              className="text-indigo-200/50 hover:text-white transition-colors text-sm"
            >
              Account
            </Link>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10">{children}</main>
    </div>
  )
}
