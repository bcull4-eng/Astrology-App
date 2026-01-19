'use client'

/**
 * Weekly Forecast Locked Component
 *
 * Premium weekly forecast feature showing 7-day outlook.
 * Shows a compelling preview to encourage subscription upgrades.
 */

import Link from 'next/link'

// Get the next 7 days
function getWeekDays() {
  const days = []
  const today = new Date()
  for (let i = 0; i < 7; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    days.push({
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      date: date.getDate(),
      isToday: i === 0,
      energy: ['high', 'moderate', 'high', 'low', 'moderate', 'high', 'moderate'][i],
      score: [85, 72, 88, 55, 68, 92, 75][i],
    })
  }
  return days
}

const weeklyHighlights = [
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    title: 'Power Day',
    value: 'Thursday',
    description: 'Best day for major decisions',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: 'Romance Peak',
    value: 'Saturday',
    description: 'Venus favors love connections',
    color: 'text-rose-400',
    bg: 'bg-rose-500/10',
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    title: 'Caution Day',
    value: 'Wednesday',
    description: 'Avoid contracts & commitments',
    color: 'text-rose-400',
    bg: 'bg-rose-500/10',
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Money Day',
    value: 'Friday',
    description: 'Financial opportunities arise',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
  },
]

export function WeeklyForecastLocked() {
  const weekDays = getWeekDays()

  const getEnergyColor = (energy: string) => {
    switch (energy) {
      case 'high':
        return 'bg-emerald-500'
      case 'moderate':
        return 'bg-amber-500'
      case 'low':
        return 'bg-rose-500'
      default:
        return 'bg-indigo-500'
    }
  }

  return (
    <div className="relative mb-8 overflow-hidden rounded-2xl">
      {/* Content Preview (blurred) */}
      <div className="bg-indigo-950/30 p-6 blur-[2px] select-none pointer-events-none">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">Weekly Forecast</h2>
            <p className="text-indigo-200/50 text-sm">Your 7-day cosmic outlook</p>
          </div>
          <div className="flex items-center gap-2 text-indigo-300/50 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Updated weekly
          </div>
        </div>

        {/* 7-Day Energy Bars */}
        <div className="grid grid-cols-7 gap-2 mb-6">
          {weekDays.map((day, index) => (
            <div key={index} className="text-center">
              <div className="text-indigo-300/50 text-xs mb-1">{day.day}</div>
              <div className={`text-sm font-medium mb-2 ${day.isToday ? 'text-indigo-400' : 'text-white'}`}>
                {day.date}
              </div>
              <div className="h-20 bg-indigo-900/30 rounded-lg flex flex-col-reverse overflow-hidden">
                <div
                  className={`${getEnergyColor(day.energy)} transition-all`}
                  style={{ height: `${day.score}%` }}
                />
              </div>
              <div className="text-white text-xs mt-1 font-medium">{day.score}</div>
            </div>
          ))}
        </div>

        {/* Weekly Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {weeklyHighlights.map((highlight, index) => (
            <div key={index} className={`${highlight.bg} rounded-xl p-3`}>
              <div className={`${highlight.color} mb-2`}>{highlight.icon}</div>
              <div className="text-indigo-200/50 text-xs">{highlight.title}</div>
              <div className="text-white font-semibold">{highlight.value}</div>
              <div className="text-indigo-200/40 text-xs mt-1">{highlight.description}</div>
            </div>
          ))}
        </div>

        {/* Key Transits */}
        <div className="bg-indigo-950/40 rounded-xl p-4">
          <div className="text-white font-medium mb-3">Key Transits This Week</div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-sm">☿</span>
              </div>
              <div>
                <div className="text-white text-sm font-medium">Mercury enters Aquarius</div>
                <div className="text-indigo-200/50 text-xs">Innovative thinking and communication breakthroughs</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-rose-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-sm">♀</span>
              </div>
              <div>
                <div className="text-white text-sm font-medium">Venus trine Mars</div>
                <div className="text-indigo-200/50 text-xs">Harmonious energy for relationships and creativity</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lock Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-[#1a1a2e]/95 via-[#1a1a2e]/80 to-[#1a1a2e]/60 rounded-2xl">
        <div className="text-center px-6 max-w-md">
          <div className="w-16 h-16 bg-gradient-to-br from-violet-500/20 to-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Weekly Forecast</h3>
          <p className="text-indigo-200/60 text-sm mb-4">
            Plan your week with confidence. See your 7-day energy forecast, power days, caution periods, and key planetary transits.
          </p>

          <div className="flex items-center justify-center gap-4 text-xs text-indigo-300/50 mb-5">
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              7-day energy bars
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              Power days
            </div>
          </div>

          <Link
            href="/paywall"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Unlock Weekly Forecast
          </Link>
          <p className="text-indigo-300/40 text-xs mt-3">
            Starting at £14.99/month
          </p>
        </div>
      </div>
    </div>
  )
}
