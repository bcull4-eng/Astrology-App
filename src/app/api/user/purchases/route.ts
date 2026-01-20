/**
 * User Purchases API
 *
 * Returns the user's report purchases from the database.
 */

import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()

    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Fetch user's purchases
    const { data: purchases, error: purchasesError } = await supabase
      .from('purchases')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'completed')
      .order('created_at', { ascending: false })

    if (purchasesError) {
      console.error('Error fetching purchases:', purchasesError)
      return NextResponse.json(
        { error: 'Failed to fetch purchases' },
        { status: 500 }
      )
    }

    // Also check subscription for report credits
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .single()

    // Determine purchased report slugs
    const purchasedReports: string[] = []
    let reportCredits = 0

    for (const purchase of purchases || []) {
      if (purchase.product_type === 'report') {
        // Single report - the specific report slug should be stored
        // For now, we track that they bought a single report credit
        reportCredits += 1
      } else if (purchase.product_type === 'report_bundle_3') {
        reportCredits += 3
      } else if (purchase.product_type === 'report_bundle_6') {
        reportCredits += 6
      }
    }

    // Check user metadata for report credits (set by webhook)
    const userCredits = user.user_metadata?.report_credits || 0
    reportCredits = Math.max(reportCredits, userCredits)

    return NextResponse.json({
      purchases: purchases || [],
      reportCredits,
      subscription: subscription || null,
    })
  } catch (error) {
    console.error('Purchases API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
