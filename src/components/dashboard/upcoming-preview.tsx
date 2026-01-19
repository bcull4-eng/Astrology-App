'use client'

/**
 * Upcoming Preview Component
 *
 * Shows a brief preview of upcoming windows with link to full view.
 */

import Link from 'next/link'
import { format } from 'date-fns'
import type { UpcomingWindow } from '@/types'

interface UpcomingPreviewProps {
  windows: UpcomingWindow[]
}

const focusAreaColors: Record<string, string> = {
  career: 'bg-blue-500',
  relationships: 'bg-pink-500',
  money: 'bg-emerald-500',
  growth: 'bg-purple-500',
}

const trendIcons: Record<string, string> = {
  rising: '↗',
  peaking: '●',
  easing: '↘',
}

export function UpcomingPreview({ windows }: UpcomingPreviewProps) {
  return (
    <div className="bg-indigo-950/30 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-semibold">Coming Up</h2>
        <Link
          href="/dashboard/upcoming"
          className="text-indigo-400 hover:text-indigo-300 text-sm"
        >
          See all →
        </Link>
      </div>

      <div className="space-y-3">
        {windows.slice(0, 3).map((window, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-3 bg-indigo-950/40 rounded-xl"
          >
            <div
              className={`w-2 h-2 rounded-full mt-1.5 ${
                focusAreaColors[window.key_focus]
              }`}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-white text-sm font-medium">
                  {format(new Date(window.start_date), 'MMM d')} –{' '}
                  {format(new Date(window.end_date), 'MMM d')}
                </span>
                <span className="text-indigo-300/40 text-xs">
                  {trendIcons[window.intensity_trend]}
                </span>
              </div>
              <p className="text-indigo-200/50 text-sm truncate">{window.summary}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
