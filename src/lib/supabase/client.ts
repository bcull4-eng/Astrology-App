/**
 * Supabase Browser Client
 *
 * Use this client in Client Components (components with 'use client').
 * This client runs in the browser and uses the anon key.
 */

import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
