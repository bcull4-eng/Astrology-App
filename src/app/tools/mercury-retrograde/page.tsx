import { Metadata } from 'next'
import Link from 'next/link'
import { AlertTriangle, CheckCircle, Calendar, ChevronRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Mercury Retrograde 2025 - Dates, Effects & Survival Guide | Orbli',
  description: 'Is Mercury in retrograde? Check current Mercury retrograde dates for 2025, learn what it means, and get tips for surviving retrograde periods.',
  keywords: 'mercury retrograde, mercury retrograde 2025, mercury retrograde dates, is mercury in retrograde, mercury retrograde effects',
}

// Mercury retrograde periods for 2025
const RETROGRADE_PERIODS_2025 = [
  { start: new Date('2025-03-14'), end: new Date('2025-04-07'), sign: 'Aries/Pisces' },
  { start: new Date('2025-07-18'), end: new Date('2025-08-11'), sign: 'Leo' },
  { start: new Date('2025-11-09'), end: new Date('2025-11-29'), sign: 'Sagittarius' },
]

// Mercury retrograde periods for 2026
const RETROGRADE_PERIODS_2026 = [
  { start: new Date('2026-02-25'), end: new Date('2026-03-20'), sign: 'Pisces' },
  { start: new Date('2026-06-29'), end: new Date('2026-07-23'), sign: 'Cancer' },
  { start: new Date('2026-10-24'), end: new Date('2026-11-13'), sign: 'Scorpio' },
]

function isInRetrograde(date: Date, periods: typeof RETROGRADE_PERIODS_2025): { inRetrograde: boolean; currentPeriod?: typeof RETROGRADE_PERIODS_2025[0]; nextPeriod?: typeof RETROGRADE_PERIODS_2025[0] } {
  for (const period of periods) {
    if (date >= period.start && date <= period.end) {
      return { inRetrograde: true, currentPeriod: period }
    }
  }

  // Find next retrograde
  const futurePeriods = periods.filter(p => p.start > date)
  const nextPeriod = futurePeriods[0]

  return { inRetrograde: false, nextPeriod }
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

function getDaysUntil(futureDate: Date, fromDate: Date): number {
  const diffTime = futureDate.getTime() - fromDate.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export default function MercuryRetrogradePage() {
  const today = new Date()
  const currentYear = today.getFullYear()
  const periods = currentYear === 2025 ? RETROGRADE_PERIODS_2025 : RETROGRADE_PERIODS_2026
  const allPeriods = [...RETROGRADE_PERIODS_2025, ...RETROGRADE_PERIODS_2026]
  const { inRetrograde, currentPeriod, nextPeriod } = isInRetrograde(today, allPeriods)

  return (
    <div className="min-h-screen bg-[#1a1a2e]">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Mercury Retrograde Tracker
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Track Mercury retrograde periods and learn how to navigate these cosmic challenges.
          </p>
        </div>

        {/* Current Status */}
        <div className={`rounded-2xl p-8 mb-8 text-center ${
          inRetrograde
            ? 'bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/30'
            : 'bg-gradient-to-br from-emerald-500/20 to-green-500/20 border border-emerald-500/30'
        }`}>
          <div className="flex justify-center mb-4">
            {inRetrograde ? (
              <AlertTriangle className="w-16 h-16 text-red-400" />
            ) : (
              <CheckCircle className="w-16 h-16 text-emerald-400" />
            )}
          </div>
          <h2 className={`text-3xl font-bold mb-2 ${inRetrograde ? 'text-red-400' : 'text-emerald-400'}`}>
            {inRetrograde ? 'Mercury is in Retrograde' : 'Mercury is Direct'}
          </h2>
          {inRetrograde && currentPeriod ? (
            <p className="text-white/70">
              Retrograde in {currentPeriod.sign} until {formatDate(currentPeriod.end)}
            </p>
          ) : nextPeriod ? (
            <p className="text-white/70">
              Next retrograde begins in {getDaysUntil(nextPeriod.start, today)} days ({formatDate(nextPeriod.start)})
            </p>
          ) : null}
        </div>

        {/* 2025 Dates */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-indigo-400" />
            Mercury Retrograde Dates 2025
          </h2>
          <div className="space-y-4">
            {RETROGRADE_PERIODS_2025.map((period, idx) => {
              const isPast = today > period.end
              const isCurrent = today >= period.start && today <= period.end
              return (
                <div
                  key={idx}
                  className={`p-6 rounded-xl border ${
                    isCurrent
                      ? 'bg-red-500/20 border-red-500/30'
                      : isPast
                      ? 'bg-white/5 border-white/10 opacity-60'
                      : 'bg-white/5 border-white/10'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className={`text-lg font-semibold ${isCurrent ? 'text-red-400' : 'text-white'}`}>
                        {formatDate(period.start)} - {formatDate(period.end)}
                      </p>
                      <p className="text-white/60">Mercury retrograde in {period.sign}</p>
                    </div>
                    {isCurrent && (
                      <span className="px-3 py-1 bg-red-500/30 text-red-400 rounded-full text-sm font-medium">
                        Current
                      </span>
                    )}
                    {isPast && (
                      <span className="px-3 py-1 bg-white/10 text-white/40 rounded-full text-sm">
                        Passed
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* 2026 Dates */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-indigo-400" />
            Mercury Retrograde Dates 2026
          </h2>
          <div className="space-y-4">
            {RETROGRADE_PERIODS_2026.map((period, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl border bg-white/5 border-white/10"
              >
                <p className="text-lg font-semibold text-white">
                  {formatDate(period.start)} - {formatDate(period.end)}
                </p>
                <p className="text-white/60">Mercury retrograde in {period.sign}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What is Mercury Retrograde */}
        <section className="prose prose-invert max-w-none mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4">What is Mercury Retrograde?</h2>
          <p className="text-white/70">
            Mercury retrograde is an optical illusion where Mercury appears to move backward in its orbit
            from our perspective on Earth. While the planet isn't actually moving in reverse, astrologers
            believe this period affects communication, technology, travel, and contracts.
          </p>

          <h3 className="text-xl font-semibold text-white mt-8 mb-3">What Gets Affected</h3>
          <ul className="text-white/70 space-y-2">
            <li><strong className="text-white">Communication:</strong> Misunderstandings, emails going astray, miscommunication</li>
            <li><strong className="text-white">Technology:</strong> Computer crashes, software glitches, data loss</li>
            <li><strong className="text-white">Travel:</strong> Delays, cancellations, lost luggage</li>
            <li><strong className="text-white">Contracts:</strong> Hidden clauses, renegotiations needed</li>
            <li><strong className="text-white">Ex-partners:</strong> Past relationships may resurface</li>
          </ul>

          <h3 className="text-xl font-semibold text-white mt-8 mb-3">Survival Tips</h3>
          <ul className="text-white/70 space-y-2">
            <li><strong className="text-emerald-400">DO:</strong> Back up your data, double-check details, review contracts carefully</li>
            <li><strong className="text-emerald-400">DO:</strong> Use this time for reflection, revisiting old projects, and reconnecting</li>
            <li><strong className="text-emerald-400">DO:</strong> Allow extra travel time and have backup plans</li>
            <li><strong className="text-red-400">DON'T:</strong> Sign major contracts without careful review</li>
            <li><strong className="text-red-400">DON'T:</strong> Buy new electronics unless necessary</li>
            <li><strong className="text-red-400">DON'T:</strong> Start new major projects (finish existing ones instead)</li>
          </ul>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-semibold text-white mb-2">Check Your Birth Chart</h3>
          <p className="text-white/60 mb-4">
            See how Mercury retrograde affects you personally based on your natal chart.
          </p>
          <Link
            href="/charts/mercury-sign-calculator"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
          >
            Find Your Mercury Sign
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
