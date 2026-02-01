/**
 * User Transits API Route
 *
 * Returns personalized transit aspects for the authenticated user.
 * Requires birth data (passed as JSON body or fetched from user profile).
 * Cached for 24 hours per user.
 * POST /api/transits
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getCachedUserTransits } from '@/lib/transit-cache'
import type { BirthData } from '@/types'

interface TransitRequest {
  birthData?: BirthData
}

export async function POST(request: NextRequest) {
  try {
    const body: TransitRequest = await request.json()

    let birthData = body.birthData

    // If no birth data provided, try to get from authenticated user
    if (!birthData) {
      const supabase = await createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        return NextResponse.json(
          { success: false, error: 'Authentication required' },
          { status: 401 }
        )
      }

      // Future: fetch birth data from Supabase
      // const { data } = await supabase
      //   .from('birth_data')
      //   .select('*')
      //   .eq('user_id', user.id)
      //   .single()
      // birthData = data

      return NextResponse.json(
        { success: false, error: 'Birth data required' },
        { status: 400 }
      )
    }

    const transits = await getCachedUserTransits(birthData)

    return NextResponse.json({
      success: true,
      data: transits,
    })
  } catch (error) {
    console.error('Transits API error:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch transit data',
        data: null,
      },
      { status: 500 }
    )
  }
}
