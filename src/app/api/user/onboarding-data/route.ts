/**
 * API Route: Save Onboarding Data
 *
 * POST /api/user/onboarding-data
 * Saves all quiz data collected during onboarding V2 flow.
 */

import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()

    // Get authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const {
      gender,
      birthDate,
      birthTime,
      birthTimeKnown,
      birthPlace,
      natalChartData,
      relationshipStatus,
      futureGoals,
      colorPreference,
      elementPreference,
      palmReadingData,
    } = body

    // Save birth data to user_birth_data table
    if (birthDate && birthPlace) {
      const { error: birthError } = await supabase
        .from('user_birth_data')
        .upsert({
          user_id: user.id,
          birth_date: birthDate,
          birth_time: birthTime || null,
          birth_time_confidence: birthTimeKnown ? 'exact' : 'unknown',
          birth_place_city: birthPlace.city,
          birth_place_country: birthPlace.country,
          birth_place_latitude: birthPlace.latitude,
          birth_place_longitude: birthPlace.longitude,
          birth_place_timezone: birthPlace.timezone,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'user_id',
        })

      if (birthError) {
        console.error('Error saving birth data:', birthError)
      }
    }

    // Save natal chart data if available
    if (natalChartData) {
      const { error: chartError } = await supabase
        .from('user_natal_charts')
        .upsert({
          user_id: user.id,
          sun_sign: natalChartData.sunSign,
          moon_sign: natalChartData.moonSign,
          ascendant: natalChartData.ascendant,
          chart_data: natalChartData,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'user_id',
        })

      if (chartError) {
        console.error('Error saving natal chart:', chartError)
      }
    }

    // Save onboarding profile data
    const { error: profileError } = await supabase
      .from('user_onboarding_profile')
      .upsert({
        user_id: user.id,
        gender,
        relationship_status: relationshipStatus,
        future_goals: futureGoals || [],
        color_preference: colorPreference,
        element_preference: elementPreference,
        palm_reading_data: palmReadingData || null,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id',
      })

    if (profileError) {
      console.error('Error saving onboarding profile:', profileError)
      // Don't fail the request - the data is in localStorage as backup
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in onboarding data API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
