'use client'

/**
 * Theme Header Component
 *
 * Shows the current primary theme name, intensity, and active dates.
 */

import { format } from 'date-fns'
import type { SynthesisedTheme, IntensityLevel } from '@/types'

interface ThemeHeaderProps {
  theme: SynthesisedTheme
}

const intensityLabels: Record<IntensityLevel, string> = {
  1: 'Low',
  2: 'Mild',
  3: 'Moderate',
  4: 'High',
  5: 'Intense',
}

export function ThemeHeader({ theme }: ThemeHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
        <span>Today</span>
        <span>•</span>
        <span>Updated {format(new Date(theme.last_updated_at), 'MMM d')}</span>
      </div>

      <h1 className="text-3xl font-bold text-white mb-3">{theme.theme_name}</h1>

      <div className="flex items-center gap-4 flex-wrap">
        {/* Intensity */}
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((level) => (
              <div
                key={level}
                className={`w-2.5 h-2.5 rounded-full ${
                  level <= theme.intensity_today ? 'bg-indigo-500' : 'bg-slate-700'
                }`}
              />
            ))}
          </div>
          <span className="text-slate-400 text-sm">
            {intensityLabels[theme.intensity_today]}
          </span>
        </div>

        {/* Date range */}
        <div className="text-slate-400 text-sm">
          Active until {format(new Date(theme.end_date), 'MMM d')}
        </div>
      </div>
    </div>
  )
}
