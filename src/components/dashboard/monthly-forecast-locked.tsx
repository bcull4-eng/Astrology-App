'use client'

/**
 * Monthly Forecast Locked Component
 *
 * Shows a preview of the monthly forecast feature with a lock overlay
 * indicating it requires a premium subscription.
 */

import Link from 'next/link'

const mockForecastHighlights = [
  {
    week: 'Week 1',
    title: 'New Beginnings',
    description: 'Career opportunities align with your ambitions...',
  },
  {
    week: 'Week 2',
    title: 'Emotional Depth',
    description: 'Venus enters your 7th house bringing...',
  },
  {
    week: 'Week 3',
    title: 'Creative Surge',
    description: 'Mercury trine Neptune enhances your intuition...',
  },
  {
    week: 'Week 4',
    title: 'Transformation',
    description: 'Pluto aspects reveal hidden strengths...',
  },
]

export function MonthlyForecastLocked() {
  const currentMonth = new Date().toLocaleString('default', { month: 'long' })

  return (
    <div className="relative mb-8 overflow-hidden">
      {/* Content Preview (blurred) */}
      <div className="bg-indigo-950/30 rounded-2xl p-6 blur-[2px] select-none pointer-events-none">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-white">{currentMonth} Forecast</h2>
            <p className="text-indigo-200/50 text-sm">Your personalized monthly outlook</p>
          </div>
          <div className="flex items-center gap-2 text-indigo-300/50 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Updated monthly
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {mockForecastHighlights.map((item, index) => (
            <div key={index} className="bg-indigo-900/30 rounded-xl p-4">
              <div className="text-indigo-400 text-xs font-medium mb-1">{item.week}</div>
              <div className="text-white font-medium mb-1">{item.title}</div>
              <div className="text-indigo-200/50 text-xs line-clamp-2">{item.description}</div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-indigo-500/10">
          <div className="flex items-center gap-4 text-sm text-indigo-200/50">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              Key transit dates
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Energy peaks
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Relationship windows
            </div>
          </div>
        </div>
      </div>

      {/* Lock Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-[#1a1a2e]/90 via-[#1a1a2e]/70 to-transparent rounded-2xl">
        <div className="text-center px-6">
          <div className="w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="text-white font-semibold text-lg mb-2">Monthly Forecast</h3>
          <p className="text-indigo-200/60 text-sm mb-4 max-w-xs">
            Get detailed weekly breakdowns, key transit dates, and personalized guidance for the month ahead.
          </p>
          <Link
            href="/paywall"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            Unlock with Pro
          </Link>
          <p className="text-indigo-300/40 text-xs mt-3">
            Try for just £2
          </p>
        </div>
      </div>
    </div>
  )
}
