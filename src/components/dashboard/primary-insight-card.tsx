'use client'

/**
 * Primary Insight Card Component
 *
 * Shows the main theme explanation with peak window and guidance.
 */

import { format } from 'date-fns'
import type { SynthesisedTheme, DailyGuidance } from '@/types'

interface PrimaryInsightCardProps {
  theme: SynthesisedTheme
  guidance: DailyGuidance
}

export function PrimaryInsightCard({ theme, guidance }: PrimaryInsightCardProps) {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 mb-6">
      {/* Description */}
      <p className="text-slate-300 leading-relaxed mb-6">{theme.description}</p>

      {/* Peak window */}
      <div className="bg-slate-900/50 rounded-xl p-4 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-amber-500 rounded-full" />
          <span className="text-amber-400 text-sm font-medium">Peak Window</span>
        </div>
        <p className="text-white">
          {format(theme.peak_window.start, 'MMM d')} – {format(theme.peak_window.end, 'MMM d')}
        </p>
        <p className="text-slate-400 text-sm mt-1">
          Expect the highest intensity during this period
        </p>
      </div>

      {/* Do / Avoid lists */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Do list */}
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
          <h3 className="text-emerald-400 font-medium text-sm mb-3">Best Use</h3>
          <ul className="space-y-2">
            {guidance.do_list.slice(0, 3).map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-slate-300 text-sm">
                <svg
                  className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Avoid list */}
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
          <h3 className="text-red-400 font-medium text-sm mb-3">Avoid</h3>
          <ul className="space-y-2">
            {guidance.avoid_list.slice(0, 3).map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-slate-300 text-sm">
                <svg
                  className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
