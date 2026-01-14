/**
 * Auth Callback Handler
 *
 * Handles the redirect from Supabase after email confirmation.
 * Exchanges the code for a session and redirects to onboarding.
 */

import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/birth-details'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // Successfully exchanged code for session
      // Redirect to onboarding (birth details)
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // Return to sign-up page with error if something went wrong
  return NextResponse.redirect(`${origin}/auth/sign-up?error=Could not verify email`)
}
