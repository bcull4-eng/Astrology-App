'use client'

/**
 * Dashboard Main Page
 *
 * FREE: Natal chart visualization + Daily horoscope
 * PREMIUM: Daily insights, Weekly forecast, Monthly forecast
 */

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  NatalChartWheel,
  DailyHoroscope,
  DailyInsightsLocked,
  WeeklyForecastLocked,
  MonthlyForecastLocked,
  DailyInsights,
  WeeklyForecast,
  MonthlyForecast,
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
      {/* Welcome Section */}
      <div className="bg-gradient-to-br from-indigo-900/30 via-purple-900/20 to-slate-900/30 rounded-2xl p-6 mb-8 border border-indigo-500/20">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-shrink-0">
            <Image
              src="/orbli-logo.png"
              alt="Orbli"
              width={200}
              height={200}
              style={{ width: '200px', height: '200px' }}
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-xl font-semibold text-white mb-2">Welcome to Orbli</h1>
            <p className="text-indigo-200/70 text-sm leading-relaxed">
              Your personal cosmic guide. Get daily insights, explore your birth chart, chat with our AI astrologist,
              and discover what the stars have in store for you.
            </p>
          </div>
          <div className="flex-shrink-0">
            {!natalChart ? (
              <Link
                href="/birth-details"
                className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Birth Details
              </Link>
            ) : (
              <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-emerald-400 text-sm font-medium">Chart Active</span>
              </div>
            )}
          </div>
        </div>
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

      {/* Monthly Forecast */}
      {isPro && natalChart ? (
        <MonthlyForecast chart={natalChart} />
      ) : (
        <MonthlyForecastLocked />
      )}

      {/* Upgrade CTA - only show for non-pro users */}
      {!isPro && (
        <div className="bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-pink-600/10 rounded-2xl p-6 mb-8">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-white mb-2">Unlock Your Full Cosmic Potential</h3>
            <p className="text-indigo-200/60 max-w-md mx-auto">
              Choose the plan that works best for you
            </p>
          </div>

          {/* Pricing Options */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {/* Monthly */}
            <Link
              href="/paywall"
              className="bg-indigo-950/50 hover:bg-indigo-950/70 border border-indigo-500/20 hover:border-indigo-500/40 rounded-xl p-5 transition-all block"
            >
              <div className="text-center mb-4">
                <div className="text-white font-semibold mb-1">Monthly</div>
                <div className="text-3xl font-bold text-white">£14.99</div>
                <div className="text-indigo-300/50 text-sm">/month</div>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2 text-indigo-200/70">
                  <svg className="w-4 h-4 text-indigo-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Daily personalized insights
                </li>
                <li className="flex items-center gap-2 text-indigo-200/70">
                  <svg className="w-4 h-4 text-indigo-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Weekly & monthly forecasts
                </li>
                <li className="flex items-center gap-2 text-indigo-200/70">
                  <svg className="w-4 h-4 text-indigo-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  AI Astrologist chat
                </li>
                <li className="flex items-center gap-2 text-indigo-200/70">
                  <svg className="w-4 h-4 text-indigo-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Learning courses
                </li>
                <li className="flex items-center gap-2 text-indigo-200/70">
                  <svg className="w-4 h-4 text-indigo-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Synastry analysis
                </li>
              </ul>
            </Link>

            {/* Annual - Popular */}
            <Link
              href="/paywall"
              className="bg-indigo-600/20 hover:bg-indigo-600/30 border-2 border-indigo-500/50 hover:border-indigo-500/70 rounded-xl p-5 transition-all relative block"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-indigo-500 text-white text-xs font-bold rounded-full">
                MOST POPULAR
              </div>
              <div className="text-center mb-4">
                <div className="text-white font-semibold mb-1">Annual</div>
                <div className="text-3xl font-bold text-white">£99</div>
                <div className="text-indigo-300/50 text-sm">/year</div>
                <div className="text-emerald-400 text-sm font-medium">Save 45%</div>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2 text-indigo-200/70">
                  <svg className="w-4 h-4 text-indigo-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Everything in Monthly
                </li>
                <li className="flex items-center gap-2 text-indigo-200">
                  <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-emerald-400 font-medium">2 free reports (£58 value)</span>
                </li>
                <li className="flex items-center gap-2 text-indigo-200/70">
                  <svg className="w-4 h-4 text-indigo-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  12 months full access
                </li>
                <li className="flex items-center gap-2 text-indigo-200/70">
                  <svg className="w-4 h-4 text-indigo-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Priority email support
                </li>
              </ul>
            </Link>

            {/* Lifetime - Best Value */}
            <Link
              href="/paywall"
              className="bg-purple-600/20 hover:bg-purple-600/30 border-2 border-purple-500/50 hover:border-purple-500/70 rounded-xl p-5 transition-all relative block"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-purple-500 text-white text-xs font-bold rounded-full">
                BEST VALUE
              </div>
              <div className="text-center mb-4">
                <div className="text-white font-semibold mb-1">Lifetime</div>
                <div className="text-3xl font-bold text-white">£149</div>
                <div className="text-indigo-300/50 text-sm">one-time</div>
                <div className="text-purple-400 text-sm font-medium">Pay once, yours forever</div>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2 text-indigo-200/70">
                  <svg className="w-4 h-4 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Everything in Annual
                </li>
                <li className="flex items-center gap-2 text-indigo-200">
                  <svg className="w-4 h-4 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-purple-400 font-medium">All 3 reports free (£87 value)</span>
                </li>
                <li className="flex items-center gap-2 text-indigo-200/70">
                  <svg className="w-4 h-4 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Lifetime access forever
                </li>
                <li className="flex items-center gap-2 text-indigo-200/70">
                  <svg className="w-4 h-4 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  All future updates included
                </li>
                <li className="flex items-center gap-2 text-indigo-200/70">
                  <svg className="w-4 h-4 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Priority support
                </li>
              </ul>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-4 text-xs text-indigo-300/40">
            <span>Cancel anytime</span>
            <span>•</span>
            <span>30-day guarantee</span>
            <span>•</span>
            <span>Secure payment via Stripe</span>
          </div>
        </div>
      )}
    </div>
  )
}
