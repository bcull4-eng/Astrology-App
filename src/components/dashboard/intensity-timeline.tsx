'use client'

/**
 * Intensity Timeline Component
 *
 * Visual curve showing rise, peak, and easing of intensity.
 */

import { format, isToday, isBefore, isAfter } from 'date-fns'
import type { SynthesisedTheme } from '@/types'
import { generateIntensityCurve } from '@/lib/mock-data'

interface IntensityTimelineProps {
  theme: SynthesisedTheme
}

export function IntensityTimeline({ theme }: IntensityTimelineProps) {
  const curveData = generateIntensityCurve(
    theme.start_date,
    theme.peak_window.start,
    theme.peak_window.end,
    theme.end_date
  )

  const today = new Date()
  const todayIndex = curveData.findIndex(
    (point) =>
      point.date.toDateString() === today.toDateString()
  )

  // Calculate SVG path
  const width = 100
  const height = 40
  const points = curveData.map((point, index) => {
    const x = (index / (curveData.length - 1)) * width
    const y = height - ((point.intensity - 1) / 4) * (height - 8) - 4
    return { x, y }
  })

  const pathD = points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ')

  // Get phase
  let phase: 'rising' | 'peaking' | 'easing' = 'rising'
  if (isAfter(today, theme.peak_window.end)) {
    phase = 'easing'
  } else if (
    isAfter(today, theme.peak_window.start) ||
    isToday(theme.peak_window.start)
  ) {
    phase = 'peaking'
  }

  const phaseLabels = {
    rising: { label: 'Rising', color: 'text-amber-400' },
    peaking: { label: 'Peaking', color: 'text-red-400' },
    easing: { label: 'Easing', color: 'text-emerald-400' },
  }

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-semibold">Intensity Timeline</h2>
        <span className={`text-sm font-medium ${phaseLabels[phase].color}`}>
          {phaseLabels[phase].label}
        </span>
      </div>

      {/* Chart */}
      <div className="relative h-24 mb-4">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          {/* Gradient fill */}
          <defs>
            <linearGradient id="intensityGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgb(99, 102, 241)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="rgb(99, 102, 241)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Fill area */}
          <path
            d={`${pathD} L ${width} ${height} L 0 ${height} Z`}
            fill="url(#intensityGradient)"
          />

          {/* Line */}
          <path
            d={pathD}
            fill="none"
            stroke="rgb(99, 102, 241)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />

          {/* Today marker */}
          {todayIndex >= 0 && (
            <>
              <circle
                cx={points[todayIndex].x}
                cy={points[todayIndex].y}
                r="4"
                fill="white"
                stroke="rgb(99, 102, 241)"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
            </>
          )}
        </svg>
      </div>

      {/* Date labels */}
      <div className="flex justify-between text-slate-500 text-xs">
        <span>{format(theme.start_date, 'MMM d')}</span>
        <span className="text-indigo-400">Today</span>
        <span>{format(theme.end_date, 'MMM d')}</span>
      </div>
    </div>
  )
}
