'use client'

/**
 * Daily Insights Locked Component
 *
 * Premium daily insights feature - 300 words with various sections and visuals.
 * Shows a compelling preview to encourage subscription upgrades.
 */

import Link from 'next/link'

// Mock preview data to show what users will get
const previewSections = [
  {
    id: 'cosmic-energy',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Cosmic Energy Reading',
    preview: 'Today brings a powerful surge of...',
    color: 'from-amber-500/20 to-orange-500/20',
    textColor: 'text-amber-400',
  },
  {
    id: 'timing',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Best Times Today',
    preview: 'Morning: Creative work  •  Afternoon: Important conversations',
    color: 'from-emerald-500/20 to-teal-500/20',
    textColor: 'text-emerald-400',
  },
  {
    id: 'focus',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: 'Focus Areas',
    preview: 'Priority: Career decisions  •  Watch: Communication',
    color: 'from-violet-500/20 to-purple-500/20',
    textColor: 'text-violet-400',
  },
  {
    id: 'avoid',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    title: 'What to Avoid',
    preview: 'Hold off on major financial decisions and...',
    color: 'from-rose-500/20 to-pink-500/20',
    textColor: 'text-rose-400',
  },
]

const lifeAreaPreviews = [
  { area: 'Love', score: 85, color: 'bg-rose-500' },
  { area: 'Career', score: 72, color: 'bg-amber-500' },
  { area: 'Money', score: 68, color: 'bg-emerald-500' },
  { area: 'Health', score: 90, color: 'bg-blue-500' },
]

export function DailyInsightsLocked() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="relative mb-8 overflow-hidden rounded-2xl">
      {/* Content Preview (blurred) */}
      <div className="bg-indigo-950/30 p-6 blur-[2px] select-none pointer-events-none">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 text-xs font-medium">Updated today</span>
            </div>
            <h2 className="text-2xl font-bold text-white">Your Daily Insights</h2>
            <p className="text-indigo-200/50 text-sm">{today}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-white">78</div>
            <div className="text-indigo-200/50 text-xs">Cosmic Score</div>
          </div>
        </div>

        {/* Main Insight */}
        <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl p-5 mb-6">
          <p className="text-white leading-relaxed">
            Today&apos;s celestial alignment brings a powerful opportunity for transformation in your career sector.
            With Venus harmonizing with your natal Mars, creative projects receive a significant boost.
            The morning hours are particularly favorable for important conversations...
          </p>
        </div>

        {/* Section Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {previewSections.map((section) => (
            <div key={section.id} className={`bg-gradient-to-br ${section.color} rounded-xl p-4`}>
              <div className={`${section.textColor} mb-2`}>{section.icon}</div>
              <div className="text-white font-medium text-sm mb-1">{section.title}</div>
              <div className="text-indigo-200/60 text-xs">{section.preview}</div>
            </div>
          ))}
        </div>

        {/* Life Area Scores */}
        <div className="bg-indigo-950/40 rounded-xl p-4 mb-6">
          <div className="text-white font-medium mb-3">Today&apos;s Life Area Forecast</div>
          <div className="space-y-3">
            {lifeAreaPreviews.map((item) => (
              <div key={item.area} className="flex items-center gap-3">
                <div className="w-16 text-indigo-200/70 text-sm">{item.area}</div>
                <div className="flex-1 h-2 bg-indigo-900/50 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full`}
                    style={{ width: `${item.score}%` }}
                  />
                </div>
                <div className="w-8 text-right text-white text-sm font-medium">{item.score}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Items */}
        <div className="bg-indigo-950/40 rounded-xl p-4">
          <div className="text-white font-medium mb-3">Today&apos;s Action Items</div>
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-sm">
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <svg className="w-3 h-3 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-indigo-200/70">Schedule important meetings before 2pm</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <svg className="w-3 h-3 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-indigo-200/70">Focus on creative projects this morning</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-5 h-5 rounded-full bg-rose-500/20 flex items-center justify-center">
                <svg className="w-3 h-3 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <span className="text-indigo-200/70">Avoid major financial decisions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lock Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-[#1a1a2e]/95 via-[#1a1a2e]/80 to-[#1a1a2e]/60 rounded-2xl">
        <div className="text-center px-6 max-w-md">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Daily Cosmic Insights</h3>
          <p className="text-indigo-200/60 text-sm mb-4">
            Get personalized 300-word daily guidance with timing tips, focus areas, action items, and life area forecasts. Updated fresh every morning.
          </p>

          <div className="flex items-center justify-center gap-4 text-xs text-indigo-300/50 mb-5">
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Daily email reminders
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Updated at 6am
            </div>
          </div>

          <Link
            href="/paywall"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            Unlock Daily Insights
          </Link>
          <p className="text-indigo-300/40 text-xs mt-3">
            Try for just £2
          </p>
        </div>
      </div>
    </div>
  )
}
