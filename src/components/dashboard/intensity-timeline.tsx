'use client'

/**
 * Intensity Timeline Component
 *
 * Visual curve showing rise, peak, and easing of intensity.
 */

import { useState, useEffect } from 'react'
import { format, isToday, isAfter } from 'date-fns'
import type { SynthesisedTheme } from '@/types'
import { generateIntensityCurve } from '@/lib/mock-data'

interface IntensityTimelineProps {
  theme: SynthesisedTheme
}

export function IntensityTimeline({ theme }: IntensityTimelineProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Ensure dates are Date objects (API returns strings after JSON serialization)
  const startDate = new Date(theme.start_date)
  const peakStart = new Date(theme.peak_window.start)
  const peakEnd = new Date(theme.peak_window.end)
  const endDate = new Date(theme.end_date)

  const curveData = generateIntensityCurve(
    startDate,
    peakStart,
    peakEnd,
    endDate
  )

  // Use a stable date for SSR, then update on client
  const today = mounted ? new Date() : startDate
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

  // Get phase - only calculate on client to avoid hydration mismatch
  let phase: 'rising' | 'peaking' | 'easing' = 'rising'
  if (mounted) {
    if (isAfter(today, peakEnd)) {
      phase = 'easing'
    } else if (
      isAfter(today, peakStart) ||
      isToday(peakStart)
    ) {
      phase = 'peaking'
    }
  }

  const phaseLabels = {
    rising: { label: 'Rising', color: 'text-amber-400' },
    peaking: { label: 'Peaking', color: 'text-red-400' },
    easing: { label: 'Easing', color: 'text-emerald-400' },
  }

  return (
    <div className="bg-indigo-950/30 rounded-2xl p-6 mb-6">
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
      <div className="flex justify-between text-indigo-300/40 text-xs">
        <span>{format(startDate, 'MMM d')}</span>
        <span className="text-indigo-400">Today</span>
        <span>{format(endDate, 'MMM d')}</span>
      </div>
    </div>
  )
}
