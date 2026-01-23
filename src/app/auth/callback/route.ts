/**
 * Auth Callback Handler
 *
 * Handles the redirect from Supabase after OAuth or email confirmation.
 * Exchanges the code for a session and redirects appropriately.
 */

import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next')

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // Successfully exchanged code for session
      // Check if user already has birth data (returning user)
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        const hasBirthData = user.user_metadata?.birth_date || user.user_metadata?.birthDate

        // If explicit next param, use it
        if (next) {
          return NextResponse.redirect(`${origin}${next}`)
        }

        // Returning user with birth data -> dashboard
        if (hasBirthData) {
          return NextResponse.redirect(`${origin}/dashboard`)
        }

        // New user without birth data -> onboarding
        return NextResponse.redirect(`${origin}/birth-details`)
      }
    }
  }

  // Return to sign-up page with error if something went wrong
  return NextResponse.redirect(`${origin}/auth/sign-up?error=Could not verify email`)
}
