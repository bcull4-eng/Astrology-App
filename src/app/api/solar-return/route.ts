/**
 * Solar Return API Route
 *
 * Calculates a Solar Return chart for the given birth data.
 * POST /api/solar-return
 */

import { NextRequest, NextResponse } from 'next/server'
import { locationToBirthPlace } from '@/lib/geocoding'
import { calculateSolarReturnFromAPI } from '@/lib/calculators'
import type { BirthData, BirthTimeConfidence } from '@/types'

interface SolarReturnRequest {
  birthDate: string
  birthTime: string | null
  birthTimeConfidence: BirthTimeConfidence
  birthPlace: string
  year?: number
}

export async function POST(request: NextRequest) {
  try {
    const body: SolarReturnRequest = await request.json()

    if (!body.birthDate || !body.birthPlace) {
      return NextResponse.json(
        { error: 'Birth date and birth place are required' },
        { status: 400 }
      )
    }

    const birthPlace = await locationToBirthPlace(body.birthPlace)
    if (!birthPlace) {
      return NextResponse.json(
        { error: 'Could not find birth location. Try a different format (e.g., "London, UK")' },
        { status: 400 }
      )
    }

    const birthData: BirthData = {
      user_id: 'calculator-user',
      birth_date: new Date(body.birthDate),
      birth_time: body.birthTime,
      birth_time_confidence: body.birthTimeConfidence || 'unknown',
      birth_place: birthPlace,
    }

    const result = await calculateSolarReturnFromAPI(birthData, body.year)

    return NextResponse.json({
      success: true,
      solarReturn: result,
    })
  } catch (error) {
    console.error('Solar return calculation error:', error)
    return NextResponse.json(
      { error: 'Failed to calculate solar return' },
      { status: 500 }
    )
  }
}
