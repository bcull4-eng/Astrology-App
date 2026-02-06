import { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, Moon } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Moon Phase Calendar 2025 - Full Moon, New Moon Dates | Orbli',
  description: 'Track moon phases with our 2025 moon calendar. Find dates for full moons, new moons, and all lunar phases. Plan rituals and activities by the moon.',
  keywords: 'moon calendar, moon phases, full moon calendar 2025, new moon 2025, lunar calendar, moon phase calendar',
}

interface MoonPhase {
  date: Date
  phase: 'new' | 'first-quarter' | 'full' | 'last-quarter'
  name?: string
}

// Moon phases for 2025 and 2026
const MOON_PHASES_2025: MoonPhase[] = [
  { date: new Date('2025-01-06'), phase: 'first-quarter' },
  { date: new Date('2025-01-13'), phase: 'full', name: 'Wolf Moon' },
  { date: new Date('2025-01-21'), phase: 'last-quarter' },
  { date: new Date('2025-01-29'), phase: 'new' },
  { date: new Date('2025-02-05'), phase: 'first-quarter' },
  { date: new Date('2025-02-12'), phase: 'full', name: 'Snow Moon' },
  { date: new Date('2025-02-20'), phase: 'last-quarter' },
  { date: new Date('2025-02-28'), phase: 'new' },
  { date: new Date('2025-03-06'), phase: 'first-quarter' },
  { date: new Date('2025-03-14'), phase: 'full', name: 'Worm Moon' },
  { date: new Date('2025-03-22'), phase: 'last-quarter' },
  { date: new Date('2025-03-29'), phase: 'new' },
  { date: new Date('2025-04-05'), phase: 'first-quarter' },
  { date: new Date('2025-04-13'), phase: 'full', name: 'Pink Moon' },
  { date: new Date('2025-04-21'), phase: 'last-quarter' },
  { date: new Date('2025-04-27'), phase: 'new' },
  { date: new Date('2025-05-04'), phase: 'first-quarter' },
  { date: new Date('2025-05-12'), phase: 'full', name: 'Flower Moon' },
  { date: new Date('2025-05-20'), phase: 'last-quarter' },
  { date: new Date('2025-05-26'), phase: 'new' },
  { date: new Date('2025-06-03'), phase: 'first-quarter' },
  { date: new Date('2025-06-11'), phase: 'full', name: 'Strawberry Moon' },
  { date: new Date('2025-06-18'), phase: 'last-quarter' },
  { date: new Date('2025-06-25'), phase: 'new' },
  { date: new Date('2025-07-02'), phase: 'first-quarter' },
  { date: new Date('2025-07-10'), phase: 'full', name: 'Buck Moon' },
  { date: new Date('2025-07-18'), phase: 'last-quarter' },
  { date: new Date('2025-07-24'), phase: 'new' },
  { date: new Date('2025-08-01'), phase: 'first-quarter' },
  { date: new Date('2025-08-09'), phase: 'full', name: 'Sturgeon Moon' },
  { date: new Date('2025-08-16'), phase: 'last-quarter' },
  { date: new Date('2025-08-23'), phase: 'new' },
  { date: new Date('2025-08-31'), phase: 'first-quarter' },
  { date: new Date('2025-09-07'), phase: 'full', name: 'Harvest Moon' },
  { date: new Date('2025-09-14'), phase: 'last-quarter' },
  { date: new Date('2025-09-21'), phase: 'new' },
  { date: new Date('2025-09-29'), phase: 'first-quarter' },
  { date: new Date('2025-10-06'), phase: 'full', name: "Hunter's Moon" },
  { date: new Date('2025-10-13'), phase: 'last-quarter' },
  { date: new Date('2025-10-21'), phase: 'new' },
  { date: new Date('2025-10-29'), phase: 'first-quarter' },
  { date: new Date('2025-11-05'), phase: 'full', name: 'Beaver Moon' },
  { date: new Date('2025-11-12'), phase: 'last-quarter' },
  { date: new Date('2025-11-20'), phase: 'new' },
  { date: new Date('2025-11-28'), phase: 'first-quarter' },
  { date: new Date('2025-12-04'), phase: 'full', name: 'Cold Moon' },
  { date: new Date('2025-12-11'), phase: 'last-quarter' },
  { date: new Date('2025-12-19'), phase: 'new' },
  { date: new Date('2025-12-27'), phase: 'first-quarter' },
]

const MOON_PHASES_2026: MoonPhase[] = [
  { date: new Date('2026-01-03'), phase: 'full', name: 'Wolf Moon' },
  { date: new Date('2026-01-10'), phase: 'last-quarter' },
  { date: new Date('2026-01-18'), phase: 'new' },
  { date: new Date('2026-01-25'), phase: 'first-quarter' },
  { date: new Date('2026-02-01'), phase: 'full', name: 'Snow Moon' },
  { date: new Date('2026-02-09'), phase: 'last-quarter' },
  { date: new Date('2026-02-17'), phase: 'new' },
  { date: new Date('2026-02-24'), phase: 'first-quarter' },
  { date: new Date('2026-03-03'), phase: 'full', name: 'Worm Moon' },
  { date: new Date('2026-03-11'), phase: 'last-quarter' },
  { date: new Date('2026-03-19'), phase: 'new' },
  { date: new Date('2026-03-26'), phase: 'first-quarter' },
]

const PHASE_ICONS = {
  new: '🌑',
  'first-quarter': '🌓',
  full: '🌕',
  'last-quarter': '🌗',
}

const PHASE_NAMES = {
  new: 'New Moon',
  'first-quarter': 'First Quarter',
  full: 'Full Moon',
  'last-quarter': 'Last Quarter',
}

const PHASE_COLORS = {
  new: 'bg-slate-700 border-slate-600',
  'first-quarter': 'bg-indigo-500/20 border-indigo-500/30',
  full: 'bg-yellow-500/20 border-yellow-500/30',
  'last-quarter': 'bg-purple-500/20 border-purple-500/30',
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

function getUpcomingPhases(phases: MoonPhase[], count: number): MoonPhase[] {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return phases.filter((p) => p.date >= today).slice(0, count)
}

function getCurrentMoonPhase(phases: MoonPhase[]): { phase: string; description: string } {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Find the most recent phase
  const pastPhases = phases.filter((p) => p.date <= today)
  if (pastPhases.length === 0) {
    return { phase: 'Waxing Crescent', description: 'The moon is growing toward first quarter.' }
  }

  const lastPhase = pastPhases[pastPhases.length - 1]
  const daysSince = Math.floor((today.getTime() - lastPhase.date.getTime()) / (1000 * 60 * 60 * 24))

  // Determine current phase based on days since last major phase
  if (daysSince < 2) {
    return { phase: PHASE_NAMES[lastPhase.phase], description: `The moon is in its ${PHASE_NAMES[lastPhase.phase].toLowerCase()} phase.` }
  }

  switch (lastPhase.phase) {
    case 'new':
      return { phase: 'Waxing Crescent', description: 'The moon is growing, building energy toward the first quarter.' }
    case 'first-quarter':
      return { phase: 'Waxing Gibbous', description: 'The moon is more than half lit and growing toward fullness.' }
    case 'full':
      return { phase: 'Waning Gibbous', description: 'The moon is beginning to decrease after its peak fullness.' }
    case 'last-quarter':
      return { phase: 'Waning Crescent', description: 'The moon is fading toward the new moon, a time for release.' }
    default:
      return { phase: 'Unknown', description: '' }
  }
}

export default function MoonCalendarPage() {
  const allPhases = [...MOON_PHASES_2025, ...MOON_PHASES_2026]
  const upcomingPhases = getUpcomingPhases(allPhases, 8)
  const currentPhase = getCurrentMoonPhase(allPhases)

  // Group 2025 phases by month
  const phasesByMonth: Record<string, MoonPhase[]> = {}
  MOON_PHASES_2025.forEach((phase) => {
    const monthKey = phase.date.toLocaleString('default', { month: 'long', year: 'numeric' })
    if (!phasesByMonth[monthKey]) {
      phasesByMonth[monthKey] = []
    }
    phasesByMonth[monthKey].push(phase)
  })

  return (
    <div className="min-h-screen bg-[#1a1a2e]">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Moon Phase Calendar
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Track lunar phases for 2025 and 2026. Plan rituals, gardening, and activities aligned with the moon.
          </p>
        </div>

        {/* Current Moon Phase */}
        <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-2xl p-8 mb-12 text-center">
          <div className="flex justify-center mb-4">
            <Moon className="w-16 h-16 text-yellow-400" />
          </div>
          <p className="text-white/60 mb-1">Current Moon Phase</p>
          <h2 className="text-3xl font-bold text-white mb-2">{currentPhase.phase}</h2>
          <p className="text-white/70">{currentPhase.description}</p>
        </div>

        {/* Upcoming Phases */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">Upcoming Moon Phases</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {upcomingPhases.map((phase, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border ${PHASE_COLORS[phase.phase]} text-center`}
              >
                <span className="text-4xl block mb-2">{PHASE_ICONS[phase.phase]}</span>
                <p className="text-white font-semibold">{PHASE_NAMES[phase.phase]}</p>
                {phase.name && <p className="text-white/60 text-sm">{phase.name}</p>}
                <p className="text-white/50 text-sm mt-1">{formatDate(phase.date)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Full Year Calendar */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">2025 Moon Calendar</h2>
          <div className="space-y-6">
            {Object.entries(phasesByMonth).map(([month, phases]) => (
              <div key={month} className="bg-white/5 border border-white/10 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-4">{month}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {phases.map((phase, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm">
                      <span className="text-2xl">{PHASE_ICONS[phase.phase]}</span>
                      <div>
                        <p className="text-white">{PHASE_NAMES[phase.phase]}</p>
                        <p className="text-white/50">{formatDate(phase.date)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Full Moon Names */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">Full Moon Names 2025</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {MOON_PHASES_2025.filter((p) => p.phase === 'full' && p.name).map((moon, idx) => (
              <div key={idx} className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl text-center">
                <span className="text-3xl block mb-2">🌕</span>
                <p className="text-white font-semibold">{moon.name}</p>
                <p className="text-white/50 text-sm">{formatDate(moon.date)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Moon Phase Meanings */}
        <section className="prose prose-invert max-w-none mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4">Moon Phase Meanings</h2>

          <div className="grid md:grid-cols-2 gap-6 not-prose">
            <div className="p-5 bg-slate-700/50 border border-slate-600 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">🌑</span>
                <h3 className="text-white font-semibold">New Moon</h3>
              </div>
              <p className="text-white/70 text-sm">
                Time for new beginnings, setting intentions, and planting seeds for what you want to manifest.
              </p>
            </div>

            <div className="p-5 bg-indigo-500/10 border border-indigo-500/30 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">🌓</span>
                <h3 className="text-white font-semibold">First Quarter</h3>
              </div>
              <p className="text-white/70 text-sm">
                Time to take action on your intentions. Overcome obstacles and push forward with your plans.
              </p>
            </div>

            <div className="p-5 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">🌕</span>
                <h3 className="text-white font-semibold">Full Moon</h3>
              </div>
              <p className="text-white/70 text-sm">
                Peak energy and illumination. Time for celebration, gratitude, and releasing what no longer serves you.
              </p>
            </div>

            <div className="p-5 bg-purple-500/10 border border-purple-500/30 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">🌗</span>
                <h3 className="text-white font-semibold">Last Quarter</h3>
              </div>
              <p className="text-white/70 text-sm">
                Time for reflection, forgiveness, and letting go. Prepare for the new cycle ahead.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-semibold text-white mb-2">Discover Your Moon Sign</h3>
          <p className="text-white/60 mb-4">
            Your Moon sign reveals your emotional nature and inner self.
          </p>
          <Link
            href="/charts/moon-sign-calculator"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
          >
            Calculate Your Moon Sign
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
