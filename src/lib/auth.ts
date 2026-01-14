/**
 * Server-side Auth Helpers
 *
 * Use these in Server Components and Route Handlers.
 */

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

/**
 * Get the current authenticated user.
 * Returns null if not authenticated.
 */
export async function getUser() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

/**
 * Get the current user or redirect to onboarding.
 * Use this in protected pages.
 */
export async function requireUser() {
  const user = await getUser()
  if (!user) {
    redirect('/birth-details')
  }
  return user
}

/**
 * Get the current session.
 */
export async function getSession() {
  const supabase = await createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return session
}
