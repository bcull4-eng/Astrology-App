/**
 * Admin API: Revoke Pro Access
 *
 * Revokes pro subscription access from a user by email.
 * Protected by ADMIN_SECRET_KEY environment variable.
 *
 * Usage:
 *   curl -X POST http://localhost:3000/api/admin/revoke-pro \
 *     -H "Content-Type: application/json" \
 *     -H "Authorization: Bearer YOUR_ADMIN_SECRET_KEY" \
 *     -d '{"email": "friend@example.com"}'
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { adminLimiter } from '@/lib/rate-limit'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  const limited = adminLimiter(request)
  if (limited) return limited

  try {
    // Verify admin secret
    const authHeader = request.headers.get('authorization')
    const adminSecret = process.env.ADMIN_SECRET_KEY

    if (!adminSecret) {
      console.error('[Admin] ADMIN_SECRET_KEY not configured')
      return NextResponse.json(
        { error: 'Admin endpoint not configured' },
        { status: 500 }
      )
    }

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Missing authorization header' },
        { status: 401 }
      )
    }

    const providedSecret = authHeader.replace('Bearer ', '')
    if (providedSecret !== adminSecret) {
      return NextResponse.json(
        { error: 'Invalid admin secret' },
        { status: 403 }
      )
    }

    // Parse request body
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Find user by email
    const { data: users, error: listError } = await supabaseAdmin.auth.admin.listUsers()

    if (listError) {
      console.error('[Admin] Error listing users:', listError)
      return NextResponse.json(
        { error: 'Failed to search for user' },
        { status: 500 }
      )
    }

    const user = users.users.find(u => u.email?.toLowerCase() === email.toLowerCase())

    if (!user) {
      return NextResponse.json(
        { error: `User not found with email: ${email}` },
        { status: 404 }
      )
    }

    // Revoke pro access
    const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(user.id, {
      user_metadata: {
        subscription_status: 'free',
        subscription_plan: null,
        subscription_expires_at: null,
        report_credits: 0,
        granted_by_admin: false,
      },
    })

    if (updateError) {
      console.error('[Admin] Error updating user:', updateError)
      return NextResponse.json(
        { error: 'Failed to update user' },
        { status: 500 }
      )
    }

    // Remove subscription record
    await supabaseAdmin
      .from('subscriptions')
      .delete()
      .eq('user_id', user.id)

    console.log(`[Admin] Pro access revoked from ${email} (${user.id})`)

    return NextResponse.json({
      success: true,
      message: `Pro access revoked from ${email}`,
      user: {
        id: user.id,
        email: user.email,
        subscription_status: 'free',
      },
    })
  } catch (error) {
    console.error('[Admin] Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
