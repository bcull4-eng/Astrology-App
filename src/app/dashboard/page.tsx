'use client'

/**
 * Dashboard Main Page
 *
 * Displays the primary theme, intensity timeline, daily guidance,
 * secondary influences, and upcoming preview.
 */

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  ThemeHeader,
  PrimaryInsightCard,
  IntensityTimeline,
  DailyGuidance,
  SecondaryInfluences,
  UpcomingPreview,
  NatalChartWheel,
  DailyHoroscope,
} from '@/components/dashboard'
import { generateDailyHoroscope } from '@/lib/daily-horoscope'
import type { DailyHoroscope as DailyHoroscopeType } from '@/lib/daily-horoscope'
import {
  mockPrimaryTheme,
  mockSecondaryThemes,
  mockDailyGuidance,
  mockUpcomingWindows,
} from '@/lib/mock-data'
import type { FocusArea, SynthesisedTheme, DailyGuidance as DailyGuidanceType, UpcomingWindow, NatalChart } from '@/types'

const filterOptions: { value: FocusArea | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'career', label: 'Career' },
  { value: 'relationships', label: 'Relationships' },
  { value: 'money', label: 'Money' },
  { value: 'growth', label: 'Growth' },
]

export default function DashboardPage() {
  const [activeFilter, setActiveFilter] = useState<FocusArea | 'all'>('all')
  const [loading, setLoading] = useState(true)
  const [natalChart, setNatalChart] = useState<NatalChart | null>(null)
  const [primaryTheme, setPrimaryTheme] = useState<SynthesisedTheme>(mockPrimaryTheme)
  const [secondaryThemes, setSecondaryThemes] = useState<SynthesisedTheme[]>(mockSecondaryThemes)
  const [dailyGuidance, setDailyGuidance] = useState<DailyGuidanceType>(mockDailyGuidance)
  const [upcomingWindows, setUpcomingWindows] = useState<UpcomingWindow[]>(mockUpcomingWindows)
  const [dataSource, setDataSource] = useState<'mock' | 'calculated'>('mock')
  const [dailyHoroscope, setDailyHoroscope] = useState<DailyHoroscopeType | null>(null)

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // First try to load from database (persisted data)
        let chartData = sessionStorage.getItem('natal-chart')

        try {
          const birthDataResponse = await fetch('/api/user/birth-data')
          if (birthDataResponse.ok) {
            const { birthData } = await birthDataResponse.json()
            if (birthData?.natalChart) {
              // Use persisted data and update sessionStorage
              chartData = JSON.stringify(birthData.natalChart)
              sessionStorage.setItem('natal-chart', chartData)
            }
          }
        } catch {
          // Database fetch failed, fall back to sessionStorage
        }

        if (chartData) {
          const chart = JSON.parse(chartData)
          setNatalChart(chart)
          // Generate personalized daily horoscope
          setDailyHoroscope(generateDailyHoroscope(chart))
        } else {
          // Generate sample horoscope for users without a chart yet
          const sampleChart: NatalChart = {
            user_id: 'sample',
            calculated_at: new Date(),
            placements: [{ planet: 'sun', sign: 'leo', degree: 15, house: 1, is_retrograde: false }],
            houses: [],
            ascendant: { sign: 'leo', degree: 15 },
            midheaven: { sign: 'taurus', degree: 10 },
          }
          setDailyHoroscope(generateDailyHoroscope(sampleChart))
        }

        let url = '/api/dashboard'
        if (chartData) {
          url += `?chart=${encodeURIComponent(chartData)}`
        }

        const response = await fetch(url)
        const data = await response.json()

        if (response.ok) {
          setPrimaryTheme(data.primaryTheme)
          setSecondaryThemes(data.secondaryThemes)
          setDailyGuidance(data.dailyGuidance)
          setUpcomingWindows(data.upcomingWindows)
          setDataSource(data.source)
        }
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
        // Keep using mock data on error
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  // Filter secondary themes based on active filter
  const filteredSecondaryThemes =
    activeFilter === 'all'
      ? secondaryThemes
      : secondaryThemes.filter(
          (theme) => theme.primary_focus_area === activeFilter
        )

  // Filter upcoming windows based on active filter
  const filteredUpcomingWindows =
    activeFilter === 'all'
      ? upcomingWindows
      : upcomingWindows.filter((window) => window.key_focus === activeFilter)

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Loading your insights...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Top action bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {dataSource === 'calculated' && (
            <div className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
              <span className="text-emerald-400 text-xs font-medium">Live data from your chart</span>
            </div>
          )}
          {dataSource === 'mock' && (
            <div className="px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-lg">
              <span className="text-amber-400 text-xs font-medium">Sample data - add birth details for personalized insights</span>
            </div>
          )}
        </div>
        <Link
          href="/birth-details"
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
          {natalChart ? 'Update Birth Details' : 'Add Birth Details'}
        </Link>
      </div>

      {/* Natal Chart Visualization */}
      {natalChart && <NatalChartWheel chart={natalChart} />}

      {/* Daily Horoscope */}
      {dailyHoroscope && (
        <DailyHoroscope horoscope={dailyHoroscope} isPersonalized={!!natalChart} />
      )}

      {/* Theme Header */}
      <ThemeHeader theme={primaryTheme} />

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
      <PrimaryInsightCard theme={primaryTheme} guidance={dailyGuidance} />

      {/* Intensity Timeline */}
      <IntensityTimeline theme={primaryTheme} />

      {/* Daily Guidance */}
      <DailyGuidance guidance={dailyGuidance} />

      {/* Secondary Influences */}
      <SecondaryInfluences themes={filteredSecondaryThemes} />

      {/* Upcoming Preview */}
      <UpcomingPreview windows={filteredUpcomingWindows} />
    </div>
  )
}
