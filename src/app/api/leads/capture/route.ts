/**
 * API Route: Capture Lead Data
 *
 * POST /api/leads/capture
 * Saves email and onboarding data for leads (no auth required).
 * Called when user provides email during onboarding.
 */

import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Use service role to bypass RLS for lead capture
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      email,
      gender,
      birthDate,
      birthTime,
      birthTimeKnown,
      birthPlace,
      relationshipStatus,
      futureGoals,
      colorPreference,
      elementPreference,
      palmReadingData,
      natalChartData,
      profileData,
    } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Save lead data
    const { error } = await supabaseAdmin
      .from('leads')
      .upsert({
        email: email.toLowerCase().trim(),
        gender,
        birth_date: birthDate || null,
        birth_time: birthTime || null,
        birth_time_known: birthTimeKnown ?? true,
        birth_place: birthPlace || null,
        relationship_status: relationshipStatus || null,
        future_goals: futureGoals || [],
        color_preference: colorPreference || null,
        element_preference: elementPreference || null,
        palm_reading_data: palmReadingData || null,
        natal_chart_data: natalChartData || null,
        profile_data: profileData || null,
        source: 'onboarding_v2',
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'email',
      })

    if (error) {
      console.error('Error saving lead:', error)
      // Don't expose internal errors to client
      return NextResponse.json(
        { error: 'Failed to save data' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in lead capture API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
