'use client'

/**
 * Dashboard Main Page
 *
 * Displays the primary theme, intensity timeline, daily guidance,
 * secondary influences, and upcoming preview.
 */

import { useState } from 'react'
import {
  ThemeHeader,
  PrimaryInsightCard,
  IntensityTimeline,
  DailyGuidance,
  SecondaryInfluences,
  UpcomingPreview,
} from '@/components/dashboard'
import {
  mockPrimaryTheme,
  mockSecondaryThemes,
  mockDailyGuidance,
  mockUpcomingWindows,
} from '@/lib/mock-data'
import type { FocusArea } from '@/types'

const filterOptions: { value: FocusArea | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'career', label: 'Career' },
  { value: 'relationships', label: 'Relationships' },
  { value: 'money', label: 'Money' },
  { value: 'growth', label: 'Growth' },
]

export default function DashboardPage() {
  const [activeFilter, setActiveFilter] = useState<FocusArea | 'all'>('all')

  // Filter secondary themes based on active filter
  const filteredSecondaryThemes =
    activeFilter === 'all'
      ? mockSecondaryThemes
      : mockSecondaryThemes.filter(
          (theme) => theme.primary_focus_area === activeFilter
        )

  // Filter upcoming windows based on active filter
  const filteredUpcomingWindows =
    activeFilter === 'all'
      ? mockUpcomingWindows
      : mockUpcomingWindows.filter((window) => window.key_focus === activeFilter)

  return (
    <div>
      {/* Theme Header */}
      <ThemeHeader theme={mockPrimaryTheme} />

      {/* Life Area Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setActiveFilter(option.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeFilter === option.value
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Primary Insight Card */}
      <PrimaryInsightCard theme={mockPrimaryTheme} guidance={mockDailyGuidance} />

      {/* Intensity Timeline */}
      <IntensityTimeline theme={mockPrimaryTheme} />

      {/* Daily Guidance */}
      <DailyGuidance guidance={mockDailyGuidance} />

      {/* Secondary Influences */}
      <SecondaryInfluences themes={filteredSecondaryThemes} />

      {/* Upcoming Preview */}
      <UpcomingPreview windows={filteredUpcomingWindows} />
    </div>
  )
}
