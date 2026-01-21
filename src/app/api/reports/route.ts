/**
 * Generated Reports API
 *
 * GET: Fetch user's generated reports (or specific report by slug)
 * POST: Save a newly generated report
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')

    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (slug) {
      // Fetch specific report
      const { data: report, error } = await supabase
        .from('generated_reports')
        .select('*')
        .eq('user_id', user.id)
        .eq('report_slug', slug)
        .single()

      if (error && error.code !== 'PGRST116') {
        // PGRST116 = no rows returned (not an error, just no report yet)
        console.error('Error fetching report:', error)
        return NextResponse.json({ error: 'Failed to fetch report' }, { status: 500 })
      }

      return NextResponse.json({ report: report || null })
    } else {
      // Fetch all user's generated reports
      const { data: reports, error } = await supabase
        .from('generated_reports')
        .select('id, report_slug, report_title, word_count, partner_name, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching reports:', error)
        return NextResponse.json({ error: 'Failed to fetch reports' }, { status: 500 })
      }

      return NextResponse.json({ reports: reports || [] })
    }
  } catch (error) {
    console.error('Reports API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { reportSlug, reportTitle, reportContent, wordCount, partnerName } = body

    if (!reportSlug || !reportTitle || !reportContent) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Check if report already exists (shouldn't happen, but be safe)
    const { data: existingReport } = await supabase
      .from('generated_reports')
      .select('id')
      .eq('user_id', user.id)
      .eq('report_slug', reportSlug)
      .single()

    if (existingReport) {
      return NextResponse.json({ error: 'Report already exists', reportId: existingReport.id }, { status: 409 })
    }

    // Get current credits from user metadata
    const currentCredits = user.user_metadata?.report_credits || 0

    if (currentCredits <= 0) {
      return NextResponse.json({ error: 'No report credits available' }, { status: 403 })
    }

    // Save the report
    const { data: newReport, error: insertError } = await supabase
      .from('generated_reports')
      .insert({
        user_id: user.id,
        report_slug: reportSlug,
        report_title: reportTitle,
        report_content: reportContent,
        word_count: wordCount || null,
        partner_name: partnerName || null,
      })
      .select()
      .single()

    if (insertError) {
      console.error('Error saving report:', insertError)
      return NextResponse.json({ error: 'Failed to save report' }, { status: 500 })
    }

    // Decrement report credits
    const { error: updateError } = await supabase.auth.updateUser({
      data: {
        report_credits: currentCredits - 1,
      },
    })

    if (updateError) {
      console.error('Error updating credits:', updateError)
      // Report saved but credits not decremented - log but don't fail
    }

    return NextResponse.json({
      success: true,
      reportId: newReport.id,
      remainingCredits: currentCredits - 1,
    })
  } catch (error) {
    console.error('Reports API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
