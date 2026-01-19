'use client'

/**
 * Dashboard Main Page
 *
 * FREE: Natal chart visualization + Daily horoscope
 * PREMIUM: Daily insights, Weekly forecast, Monthly forecast
 */

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  NatalChartWheel,
  DailyHoroscope,
  DailyInsightsLocked,
  WeeklyForecastLocked,
  MonthlyForecastLocked,
  DailyInsights,
  WeeklyForecast,
} from '@/components/dashboard'
import { useSubscription } from '@/hooks/use-subscription'
import { generateDailyHoroscope } from '@/lib/daily-horoscope'
import type { DailyHoroscope as DailyHoroscopeType } from '@/lib/daily-horoscope'
import type { NatalChart } from '@/types'

export default function DashboardPage() {
  const [loading, setLoading] = useState(true)
  const [natalChart, setNatalChart] = useState<NatalChart | null>(null)
  const [dailyHoroscope, setDailyHoroscope] = useState<DailyHoroscopeType | null>(null)
  const [dataSource, setDataSource] = useState<'mock' | 'calculated'>('mock')
  const { isPro, loading: subscriptionLoading } = useSubscription()

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
          setDataSource('calculated')
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
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-indigo-200/50">Loading your cosmic insights...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Top action bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {dataSource === 'calculated' && natalChart && (
            <div className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
              <span className="text-emerald-400 text-xs font-medium">Personalized insights from your chart</span>
            </div>
          )}
          {(!natalChart || dataSource === 'mock') && (
            <div className="px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-lg">
              <span className="text-amber-400 text-xs font-medium">Add birth details for personalized insights</span>
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

      {/* ===== FREE SECTION ===== */}

      {/* Natal Chart Visualization (FREE) */}
      {natalChart && <NatalChartWheel chart={natalChart} />}

      {/* Daily Horoscope - "What this means for you" (FREE) */}
      {dailyHoroscope && (
        <DailyHoroscope horoscope={dailyHoroscope} isPersonalized={!!natalChart} />
      )}

      {/* ===== PREMIUM SECTION ===== */}

      {/* Section Divider */}
      <div className="relative my-10">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-indigo-500/20"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="px-4 bg-[#1a1a2e] text-indigo-300/50 text-sm font-medium flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            {isPro ? 'Premium Insights' : 'Premium Insights (Upgrade to unlock)'}
          </span>
        </div>
      </div>

      {/* Daily Insights */}
      {isPro && natalChart ? (
        <DailyInsights chart={natalChart} />
      ) : (
        <DailyInsightsLocked />
      )}

      {/* Weekly Forecast */}
      {isPro && natalChart ? (
        <WeeklyForecast chart={natalChart} />
      ) : (
        <WeeklyForecastLocked />
      )}

      {/* Monthly Forecast (PREMIUM - Locked for now, uses report system) */}
      <MonthlyForecastLocked />

      {/* Upgrade CTA - only show for non-pro users */}
      {!isPro && (
        <div className="bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-pink-600/10 rounded-2xl p-6 text-center mb-8">
          <h3 className="text-xl font-bold text-white mb-2">Unlock Your Full Cosmic Potential</h3>
          <p className="text-indigo-200/60 mb-4 max-w-md mx-auto">
            Get daily insights, weekly forecasts, and monthly reports delivered fresh to your inbox. Plus access to AI Astrologist, courses, and synastry analysis.
          </p>
          <Link
            href="/paywall"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Upgrade to Pro
          </Link>
          <div className="flex items-center justify-center gap-4 mt-4 text-xs text-indigo-300/40">
            <span>From £14.99/month</span>
            <span>•</span>
            <span>Cancel anytime</span>
            <span>•</span>
            <span>30-day guarantee</span>
          </div>
        </div>
      )}
    </div>
  )
}
