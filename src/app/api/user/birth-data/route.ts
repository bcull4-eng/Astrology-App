/**
 * User Birth Data API Route
 *
 * GET - Retrieve user's saved birth data and natal chart
 * POST - Save/update user's birth data and natal chart
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { NatalChart } from '@/types'

interface BirthDataRecord {
  id: string
  user_id: string
  birth_date: string
  birth_time: string | null
  birth_time_confidence: string
  birth_city: string
  birth_country: string
  birth_latitude: number
  birth_longitude: number
  birth_timezone: string
  natal_chart: NatalChart | null
  created_at: string
  updated_at: string
}

// GET - Retrieve user's birth data
export async function GET() {
  try {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { data, error } = await supabase
      .from('user_birth_data')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (error && error.code !== 'PGRST116') {
      // PGRST116 = no rows found, which is OK
      console.error('Error fetching birth data:', error)
      return NextResponse.json(
        { error: 'Failed to fetch birth data' },
        { status: 500 }
      )
    }

    if (!data) {
      return NextResponse.json({ birthData: null })
    }

    // Transform database record to API response
    const birthData = {
      birthDate: data.birth_date,
      birthTime: data.birth_time,
      birthTimeConfidence: data.birth_time_confidence,
      birthPlace: {
        city: data.birth_city,
        country: data.birth_country,
        latitude: data.birth_latitude,
        longitude: data.birth_longitude,
        timezone: data.birth_timezone,
      },
      natalChart: data.natal_chart,
      updatedAt: data.updated_at,
    }

    return NextResponse.json({ birthData })
  } catch (error) {
    console.error('Birth data GET error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

interface SaveBirthDataRequest {
  birthDate: string
  birthTime: string | null
  birthTimeConfidence: string
  birthPlace: {
    city: string
    country: string
    latitude: number
    longitude: number
    timezone: string
  }
  natalChart: NatalChart
}

// POST - Save/update user's birth data
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body: SaveBirthDataRequest = await request.json()

    // Validate required fields
    if (!body.birthDate || !body.birthPlace || !body.natalChart) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const record = {
      user_id: user.id,
      birth_date: body.birthDate,
      birth_time: body.birthTime,
      birth_time_confidence: body.birthTimeConfidence || 'unknown',
      birth_city: body.birthPlace.city,
      birth_country: body.birthPlace.country,
      birth_latitude: body.birthPlace.latitude,
      birth_longitude: body.birthPlace.longitude,
      birth_timezone: body.birthPlace.timezone,
      natal_chart: body.natalChart,
    }

    // Upsert - insert or update if exists
    const { data, error } = await supabase
      .from('user_birth_data')
      .upsert(record, {
        onConflict: 'user_id',
        ignoreDuplicates: false,
      })
      .select()
      .single()

    if (error) {
      console.error('Error saving birth data:', error)
      return NextResponse.json(
        { error: 'Failed to save birth data' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Birth data saved successfully',
    })
  } catch (error) {
    console.error('Birth data POST error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
