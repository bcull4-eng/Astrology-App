'use client'

/**
 * Upcoming View Page
 *
 * Shows the full 90-day rolling forecast.
 */

import Link from 'next/link'
import { format } from 'date-fns'
import { mockUpcomingWindows } from '@/lib/mock-data'

const focusAreaColors: Record<string, { bg: string; text: string; label: string }> = {
  career: { bg: 'bg-blue-500/20', text: 'text-blue-400', label: 'Career' },
  relationships: { bg: 'bg-pink-500/20', text: 'text-pink-400', label: 'Relationships' },
  money: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', label: 'Money' },
  growth: { bg: 'bg-purple-500/20', text: 'text-purple-400', label: 'Growth' },
}

const trendLabels: Record<string, { label: string; color: string }> = {
  rising: { label: 'Rising', color: 'text-amber-400' },
  peaking: { label: 'Peaking', color: 'text-red-400' },
  easing: { label: 'Easing', color: 'text-emerald-400' },
}

export default function UpcomingPage() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/dashboard"
          className="text-slate-400 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Upcoming Windows</h1>
          <p className="text-slate-400">Your 90-day forecast</p>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        {mockUpcomingWindows.map((window, index) => {
          const colors = focusAreaColors[window.key_focus]
          const trend = trendLabels[window.intensity_trend]

          return (
            <div
              key={index}
              className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6"
            >
              {/* Date and trend */}
              <div className="flex items-center justify-between mb-3">
                <div className="text-white font-semibold">
                  {format(new Date(window.start_date), 'MMM d')} – {format(new Date(window.end_date), 'MMM d')}
                </div>
                <span className={`text-sm font-medium ${trend.color}`}>
                  {trend.label}
                </span>
              </div>

              {/* Summary */}
              <p className="text-slate-300 mb-4">{window.summary}</p>

              {/* Focus area tag */}
              <div
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${colors.bg}`}
              >
                <span className={`text-sm font-medium ${colors.text}`}>
                  {colors.label}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* More coming */}
      <div className="mt-8 text-center">
        <p className="text-slate-500 text-sm">
          Forecast updates weekly as new transits come into focus
        </p>
      </div>
    </div>
  )
}
