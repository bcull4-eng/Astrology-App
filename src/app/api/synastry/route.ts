/**
 * Synastry API Route
 *
 * Calculates relationship compatibility between two natal charts.
 * POST /api/synastry
 */

import { NextRequest, NextResponse } from 'next/server'
import { getAstrologyClient } from '@/lib/astrology-api'
import { locationToBirthPlace } from '@/lib/geocoding'
import { calculateSynastry } from '@/lib/synastry-synthesis'
import type { BirthData, BirthTimeConfidence, NatalChart } from '@/types'

interface SynastryRequest {
  // User's chart (from session) or birth data
  userChart?: NatalChart
  userBirthData?: {
    birthDate: string
    birthTime: string | null
    birthTimeConfidence: BirthTimeConfidence
    birthPlace: string
  }
  // Partner's birth data
  partnerName: string
  partnerBirthDate: string
  partnerBirthTime: string | null
  partnerBirthTimeConfidence: BirthTimeConfidence
  partnerBirthPlace: string
}

export async function POST(request: NextRequest) {
  try {
    const body: SynastryRequest = await request.json()

    // Validate required fields
    if (!body.partnerBirthDate || !body.partnerBirthPlace) {
      return NextResponse.json(
        { error: 'Partner birth date and birth place are required' },
        { status: 400 }
      )
    }

    const client = getAstrologyClient()

    // Get user's natal chart
    let userChart: NatalChart

    if (body.userChart) {
      // Use provided chart
      userChart = body.userChart
    } else if (body.userBirthData) {
      // Calculate chart from birth data
      const userBirthPlace = await locationToBirthPlace(body.userBirthData.birthPlace)
      if (!userBirthPlace) {
        return NextResponse.json(
          { error: 'Could not find your birth location' },
          { status: 400 }
        )
      }

      const userBirthData: BirthData = {
        user_id: 'user',
        birth_date: new Date(body.userBirthData.birthDate),
        birth_time: body.userBirthData.birthTime,
        birth_time_confidence: body.userBirthData.birthTimeConfidence,
        birth_place: userBirthPlace,
      }

      userChart = await client.getNatalChart(userBirthData)
    } else {
      return NextResponse.json(
        { error: 'User chart or birth data required' },
        { status: 400 }
      )
    }

    // Calculate partner's natal chart
    const partnerBirthPlace = await locationToBirthPlace(body.partnerBirthPlace)
    if (!partnerBirthPlace) {
      return NextResponse.json(
        { error: 'Could not find partner birth location. Try a different format (e.g., "London, UK")' },
        { status: 400 }
      )
    }

    const partnerBirthData: BirthData = {
      user_id: 'partner',
      birth_date: new Date(body.partnerBirthDate),
      birth_time: body.partnerBirthTime,
      birth_time_confidence: body.partnerBirthTimeConfidence || 'unknown',
      birth_place: partnerBirthPlace,
    }

    const partnerChart = await client.getNatalChart(partnerBirthData)

    // Calculate synastry
    const synastryResult = calculateSynastry(
      userChart,
      partnerChart,
      body.partnerName || 'Your Partner'
    )

    return NextResponse.json({
      success: true,
      synastry: {
        id: `synastry-${Date.now()}`,
        user_a_id: userChart.user_id,
        user_b_id: partnerChart.user_id,
        ...synastryResult,
        calculated_at: new Date(),
      },
      partnerChart,
    })
  } catch (error) {
    console.error('Synastry calculation error:', error)
    return NextResponse.json(
      { error: 'Failed to calculate synastry' },
      { status: 500 }
    )
  }
}
