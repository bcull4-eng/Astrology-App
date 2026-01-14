import Link from 'next/link'
import { getUser } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function Home() {
  const user = await getUser()

  // If already logged in, redirect to dashboard
  if (user) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <header className="flex justify-between items-center mb-24">
          <div className="text-white font-semibold text-xl">Astro</div>
          <Link
            href="/auth/sign-in"
            className="text-slate-300 hover:text-white transition-colors"
          >
            Sign in
          </Link>
        </header>

        {/* Hero */}
        <main className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Understand what&apos;s happening
            <br />
            <span className="text-indigo-400">in your life right now</span>
          </h1>

          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
            Not a horoscope. A personalised timing tool that tells you what&apos;s
            active, when it peaks, and what to do about it.
          </p>

          <Link
            href="/auth/sign-up"
            className="inline-block px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors text-lg"
          >
            Get started free
          </Link>

          <p className="mt-4 text-slate-500 text-sm">
            See your current life theme for free
          </p>
        </main>

        {/* Features */}
        <section className="mt-32 grid md:grid-cols-3 gap-8">
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6">
            <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-2">What&apos;s happening now</h3>
            <p className="text-slate-400 text-sm">
              See your primary life theme and why it&apos;s active, explained in plain English.
            </p>
          </div>

          <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6">
            <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-2">When it peaks & ends</h3>
            <p className="text-slate-400 text-sm">
              Clear timelines show you exactly when intensity rises and falls.
            </p>
          </div>

          <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6">
            <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-2">What to do about it</h3>
            <p className="text-slate-400 text-sm">
              Daily guidance with specific actions to take and pitfalls to avoid.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
