/**
 * Supabase Client Exports
 *
 * Usage:
 * - Browser (Client Components): import { createClient } from '@/lib/supabase/client'
 * - Server (Server Components, Route Handlers): import { createClient } from '@/lib/supabase/server'
 * - Admin (bypass RLS): import { createAdminClient } from '@/lib/supabase/admin'
 */

// Re-export for convenience, but prefer direct imports for clarity
export { createClient as createBrowserClient } from './client'
export { createClient as createServerClient } from './server'
export { createAdminClient } from './admin'
