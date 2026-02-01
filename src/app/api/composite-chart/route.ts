/**
 * Composite Chart API Route
 *
 * Calculates a composite chart between two people using real
 * Swiss Ephemeris calculations via Astrology-API.io.
 * POST /api/composite-chart
 */

import { NextRequest, NextResponse } from 'next/server'
import { getAstrologyClient } from '@/lib/astrology-api'
import { locationToBirthPlace } from '@/lib/geocoding'
import type { BirthData, BirthTimeConfidence } from '@/types'

interface CompositeChartRequest {
  userBirthDate: string
  userBirthTime: string | null
  userBirthTimeConfidence: BirthTimeConfidence
  userBirthPlace: string
  partnerBirthDate: string
  partnerBirthTime: string | null
  partnerBirthTimeConfidence: BirthTimeConfidence
  partnerBirthPlace: string
}

export async function POST(request: NextRequest) {
  try {
    const body: CompositeChartRequest = await request.json()

    if (!body.userBirthDate || !body.userBirthPlace || !body.partnerBirthDate || !body.partnerBirthPlace) {
      return NextResponse.json(
        { error: 'Birth date and birth place are required for both people' },
        { status: 400 }
      )
    }

    const [userBirthPlace, partnerBirthPlace] = await Promise.all([
      locationToBirthPlace(body.userBirthPlace),
      locationToBirthPlace(body.partnerBirthPlace),
    ])

    if (!userBirthPlace) {
      return NextResponse.json(
        { error: 'Could not find user birth location' },
        { status: 400 }
      )
    }

    if (!partnerBirthPlace) {
      return NextResponse.json(
        { error: 'Could not find partner birth location' },
        { status: 400 }
      )
    }

    const userBirthData: BirthData = {
      user_id: 'user',
      birth_date: new Date(body.userBirthDate),
      birth_time: body.userBirthTime,
      birth_time_confidence: body.userBirthTimeConfidence || 'unknown',
      birth_place: userBirthPlace,
    }

    const partnerBirthData: BirthData = {
      user_id: 'partner',
      birth_date: new Date(body.partnerBirthDate),
      birth_time: body.partnerBirthTime,
      birth_time_confidence: body.partnerBirthTimeConfidence || 'unknown',
      birth_place: partnerBirthPlace,
    }

    const client = getAstrologyClient()
    const compositeChart = await client.getCompositeChart(userBirthData, partnerBirthData)

    return NextResponse.json({
      success: true,
      compositeChart,
    })
  } catch (error) {
    console.error('Composite chart calculation error:', error)
    return NextResponse.json(
      { error: 'Failed to calculate composite chart' },
      { status: 500 }
    )
  }
}
