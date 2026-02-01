/**
 * Lunar Return API Route
 *
 * Calculates a Lunar Return chart for the given birth data.
 * POST /api/lunar-return
 */

import { NextRequest, NextResponse } from 'next/server'
import { locationToBirthPlace } from '@/lib/geocoding'
import { calculateLunarReturnFromAPI } from '@/lib/calculators'
import type { BirthData, BirthTimeConfidence } from '@/types'

interface LunarReturnRequest {
  birthDate: string
  birthTime: string | null
  birthTimeConfidence: BirthTimeConfidence
  birthPlace: string
}

export async function POST(request: NextRequest) {
  try {
    const body: LunarReturnRequest = await request.json()

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

    const result = await calculateLunarReturnFromAPI(birthData)

    return NextResponse.json({
      success: true,
      lunarReturn: result,
    })
  } catch (error) {
    console.error('Lunar return calculation error:', error)
    return NextResponse.json(
      { error: 'Failed to calculate lunar return' },
      { status: 500 }
    )
  }
}
