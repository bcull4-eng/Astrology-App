/**
 * Dashboard API Route
 *
 * Returns personalized themes and guidance based on natal chart.
 * When transit data is available, themes reflect real planetary positions.
 * GET /api/dashboard
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import {
  generatePrimaryTheme,
  generateSecondaryThemes,
  generateDailyGuidance,
  generateUpcomingWindows,
} from '@/lib/synthesis'
import {
  mockPrimaryTheme,
  mockSecondaryThemes,
  mockDailyGuidance,
  mockUpcomingWindows,
} from '@/lib/mock-data'
import { getCachedDailySky } from '@/lib/transit-cache'
import type { NatalChart } from '@/types'
import type { DailySkyData } from '@/lib/astrology-api'

export async function GET(request: NextRequest) {
  try {
    // Get natal chart from query param or session
    const chartParam = request.nextUrl.searchParams.get('chart')

    let chart: NatalChart | null = null

    if (chartParam) {
      // Chart passed as query param (from session storage on client)
      try {
        chart = JSON.parse(chartParam)
      } catch {
        // Invalid chart data
      }
    }

    // If no chart, try to get from user's stored data (future: Supabase)
    if (!chart) {
      const supabase = await createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        // Return mock data for unauthenticated users
        return NextResponse.json({
          primaryTheme: mockPrimaryTheme,
          secondaryThemes: mockSecondaryThemes,
          dailyGuidance: mockDailyGuidance,
          upcomingWindows: mockUpcomingWindows,
          source: 'mock',
        })
      }
    }

    // If we have a chart, generate real data
    if (chart) {
      // Try to fetch daily sky data for enhanced content
      let dailySky: DailySkyData | undefined
      try {
        dailySky = await getCachedDailySky()
      } catch {
        // API unavailable - will fall back to template-based content
      }

      const primaryTheme = generatePrimaryTheme(chart, dailySky)
      const secondaryThemes = generateSecondaryThemes(chart, dailySky)
      const dailyGuidance = generateDailyGuidance(chart, dailySky)
      const upcomingWindows = generateUpcomingWindows(chart, dailySky)

      return NextResponse.json({
        primaryTheme,
        secondaryThemes,
        dailyGuidance,
        upcomingWindows,
        source: dailySky ? 'live' : 'calculated',
        dailySky: dailySky ?? null,
      })
    }

    // Fallback to mock data
    return NextResponse.json({
      primaryTheme: mockPrimaryTheme,
      secondaryThemes: mockSecondaryThemes,
      dailyGuidance: mockDailyGuidance,
      upcomingWindows: mockUpcomingWindows,
      source: 'mock',
    })
  } catch (error) {
    console.error('Dashboard API error:', error)
    return NextResponse.json(
      { error: 'Failed to generate dashboard data' },
      { status: 500 }
    )
  }
}
