/**
 * Supabase Admin Client
 *
 * Use this client for server-side operations that need to bypass RLS.
 * Only use in trusted server contexts (API routes, webhooks).
 * Never expose this to the client.
 */

import { createClient } from '@supabase/supabase-js'

export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}
