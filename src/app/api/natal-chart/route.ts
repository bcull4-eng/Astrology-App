/**
 * Natal Chart API Route
 *
 * Calculates natal chart from birth data.
 * POST /api/natal-chart
 */

import { NextRequest, NextResponse } from 'next/server'
import { getAstrologyClient } from '@/lib/astrology-api'
import { locationToBirthPlace } from '@/lib/geocoding'
import type { BirthData, BirthTimeConfidence } from '@/types'

interface NatalChartRequest {
  birthDate: string // ISO date string
  birthTime: string | null
  birthTimeConfidence?: BirthTimeConfidence
  birthPlace: string | {
    city: string
    country: string
    latitude: number
    longitude: number
    timezone: string
  }
  userId?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: NatalChartRequest = await request.json()

    // Validate required fields
    if (!body.birthDate || !body.birthPlace) {
      return NextResponse.json(
        { error: 'Birth date and birth place are required' },
        { status: 400 }
      )
    }

    // Handle birthPlace - either already geocoded object or string to geocode
    let birthPlace
    if (typeof body.birthPlace === 'object' && body.birthPlace.latitude && body.birthPlace.longitude) {
      // Already geocoded from onboarding
      birthPlace = {
        city: body.birthPlace.city,
        country: body.birthPlace.country,
        latitude: body.birthPlace.latitude,
        longitude: body.birthPlace.longitude,
        timezone: body.birthPlace.timezone,
      }
    } else {
      // Geocode the birth place string
      birthPlace = await locationToBirthPlace(body.birthPlace as string)
    }

    if (!birthPlace) {
      return NextResponse.json(
        { error: 'Could not find location. Please try a different format (e.g., "London, UK")' },
        { status: 400 }
      )
    }

    // Build birth data
    const birthData: BirthData = {
      user_id: body.userId || 'anonymous',
      birth_date: new Date(body.birthDate),
      birth_time: body.birthTime,
      birth_time_confidence: body.birthTimeConfidence || 'unknown',
      birth_place: birthPlace,
    }

    // Calculate natal chart
    const client = getAstrologyClient()
    const natalChart = await client.getNatalChart(birthData)

    return NextResponse.json({
      success: true,
      chart: natalChart,
      location: birthPlace,
    })
  } catch (error) {
    console.error('Natal chart calculation error:', error)
    return NextResponse.json(
      { error: 'Failed to calculate natal chart' },
      { status: 500 }
    )
  }
}
