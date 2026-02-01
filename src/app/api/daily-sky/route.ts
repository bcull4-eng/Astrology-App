/**
 * Daily Sky API Route
 *
 * Returns global planetary positions and lunar metrics for today.
 * Shared across all users, cached for 24 hours.
 * GET /api/daily-sky
 */

import { NextResponse } from 'next/server'
import { getCachedDailySky } from '@/lib/transit-cache'

export async function GET() {
  try {
    const dailySky = await getCachedDailySky()

    return NextResponse.json({
      success: true,
      data: dailySky,
    })
  } catch (error) {
    console.error('Daily sky API error:', error)

    // Return a degraded response so the frontend can still function
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch daily sky data',
        data: null,
      },
      { status: 500 }
    )
  }
}
