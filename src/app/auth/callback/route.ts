/**
 * Auth Callback Handler
 *
 * Handles the redirect from Supabase after OAuth or email confirmation.
 * Exchanges the code for a session and redirects appropriately.
 */

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next')

  if (code) {
    const cookieStore = await cookies()

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          },
        },
      }
    )

    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // Successfully exchanged code for session
      // Check if user already has birth data (returning user)
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        const hasBirthData = user.user_metadata?.birth_date || user.user_metadata?.birthDate

        // Determine redirect destination
        let redirectTo = '/birth-details'

        if (next) {
          redirectTo = next
        } else if (hasBirthData) {
          redirectTo = '/dashboard'
        }

        // Use 303 See Other to ensure browser follows redirect properly
        return NextResponse.redirect(`${origin}${redirectTo}`, { status: 303 })
      }
    }
  }

  // Return to sign-up page with error if something went wrong
  return NextResponse.redirect(`${origin}/auth/sign-up?error=Could not verify email`, { status: 303 })
}
