import Link from 'next/link'

export default function ChartsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Navigation Header */}
      <nav className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6">
              <Link href="/" className="text-xl font-bold text-white">
                Astrology App
              </Link>
              <Link
                href="/charts"
                className="text-sm text-slate-400 hover:text-white transition-colors"
              >
                Calculators
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="text-sm text-slate-400 hover:text-white transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/auth/login"
                className="text-sm px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold text-white mb-4">Calculators</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/charts/sun-moon-rising-calculator" className="text-slate-400 hover:text-white">Sun, Moon & Rising</Link></li>
                <li><Link href="/charts/birth-chart-calculator" className="text-slate-400 hover:text-white">Birth Chart</Link></li>
                <li><Link href="/charts/moon-sign-calculator" className="text-slate-400 hover:text-white">Moon Sign</Link></li>
                <li><Link href="/charts/rising-sign-calculator" className="text-slate-400 hover:text-white">Rising Sign</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Planet Signs</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/charts/venus-sign-calculator" className="text-slate-400 hover:text-white">Venus Sign</Link></li>
                <li><Link href="/charts/mars-sign-calculator" className="text-slate-400 hover:text-white">Mars Sign</Link></li>
                <li><Link href="/charts/mercury-sign-calculator" className="text-slate-400 hover:text-white">Mercury Sign</Link></li>
                <li><Link href="/charts/saturn-sign-calculator" className="text-slate-400 hover:text-white">Saturn Sign</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Special</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/charts/saturn-return-calculator" className="text-slate-400 hover:text-white">Saturn Return</Link></li>
                <li><Link href="/charts/north-node-calculator" className="text-slate-400 hover:text-white">North Node</Link></li>
                <li><Link href="/charts/love-compatibility-calculator" className="text-slate-400 hover:text-white">Compatibility</Link></li>
                <li><Link href="/charts/moon-phase-calculator" className="text-slate-400 hover:text-white">Moon Phase</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Explore</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/dashboard" className="text-slate-400 hover:text-white">Dashboard</Link></li>
                <li><Link href="/reports" className="text-slate-400 hover:text-white">Reports</Link></li>
                <li><Link href="/learn" className="text-slate-400 hover:text-white">Learn Astrology</Link></li>
                <li><Link href="/astrologist" className="text-slate-400 hover:text-white">AI Astrologist</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
            <p>Free astrology calculators for everyone. Accurate, instant results.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
