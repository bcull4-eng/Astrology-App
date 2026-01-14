'use client'

/**
 * Secondary Influences Component
 *
 * Collapsible list of secondary themes affecting the user.
 */

import { useState } from 'react'
import { format } from 'date-fns'
import type { SynthesisedTheme, IntensityLevel } from '@/types'

interface SecondaryInfluencesProps {
  themes: SynthesisedTheme[]
}

const focusAreaIcons: Record<string, string> = {
  career: '💼',
  relationships: '❤️',
  money: '💰',
  growth: '🌱',
}

export function SecondaryInfluences({ themes }: SecondaryInfluencesProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  if (themes.length === 0) return null

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 mb-6">
      <h2 className="text-white font-semibold mb-4">Secondary Influences</h2>

      <div className="space-y-3">
        {themes.map((theme) => (
          <div
            key={theme.id}
            className="bg-slate-900/50 border border-slate-700/50 rounded-xl overflow-hidden"
          >
            <button
              onClick={() =>
                setExpandedId(expandedId === theme.id ? null : theme.id)
              }
              className="w-full p-4 flex items-center gap-3 text-left"
            >
              <span className="text-xl">
                {focusAreaIcons[theme.primary_focus_area]}
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-white font-medium truncate">
                  {theme.theme_name}
                </div>
                <div className="text-slate-400 text-sm">
                  Until {format(theme.end_date, 'MMM d')}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {/* Mini intensity */}
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={`w-1.5 h-1.5 rounded-full ${
                        level <= theme.intensity_today
                          ? 'bg-indigo-500'
                          : 'bg-slate-700'
                      }`}
                    />
                  ))}
                </div>
                <svg
                  className={`w-5 h-5 text-slate-400 transition-transform ${
                    expandedId === theme.id ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </button>

            {expandedId === theme.id && (
              <div className="px-4 pb-4 pt-0">
                <p className="text-slate-300 text-sm leading-relaxed">
                  {theme.description}
                </p>
                <div className="mt-3 flex items-center gap-4 text-xs text-slate-500">
                  <span>
                    Peak: {format(theme.peak_window.start, 'MMM d')} –{' '}
                    {format(theme.peak_window.end, 'MMM d')}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
