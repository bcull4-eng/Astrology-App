import Link from 'next/link'
import { requireUser } from '@/lib/auth'

export default async function ReportsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await requireUser()

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="text-white font-semibold text-xl">
            Astro
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/dashboard"
              className="text-slate-300 hover:text-white transition-colors text-sm"
            >
              Dashboard
            </Link>
            <Link
              href="/learn"
              className="text-slate-300 hover:text-white transition-colors text-sm"
            >
              Learn
            </Link>
            <Link
              href="/reports"
              className="text-white transition-colors text-sm font-medium"
            >
              Reports
            </Link>
            <Link
              href="/synastry"
              className="text-slate-300 hover:text-white transition-colors text-sm"
            >
              Synastry
            </Link>
            <Link
              href="/settings"
              className="text-slate-300 hover:text-white transition-colors text-sm"
            >
              Account
            </Link>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
