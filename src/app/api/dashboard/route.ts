/**
 * Dashboard API Route
 *
 * Returns personalized themes and guidance based on natal chart.
 * GET /api/dashboard
 */

import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
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
import type { NatalChart } from '@/types'

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
      // For now, check if user is authenticated
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

      // Future: Fetch user's stored natal chart from Supabase
      // const { data: birthData } = await supabase
      //   .from('birth_data')
      //   .select('*')
      //   .eq('user_id', user.id)
      //   .single()
    }

    // If we have a chart, generate real data
    if (chart) {
      const primaryTheme = generatePrimaryTheme(chart)
      const secondaryThemes = generateSecondaryThemes(chart)
      const dailyGuidance = generateDailyGuidance(chart)
      const upcomingWindows = generateUpcomingWindows(chart)

      return NextResponse.json({
        primaryTheme,
        secondaryThemes,
        dailyGuidance,
        upcomingWindows,
        source: 'calculated',
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
