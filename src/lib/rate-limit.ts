/**
 * In-memory sliding window rate limiter
 *
 * Tracks request counts per IP within a configurable time window.
 * Suitable for single-instance deployments (Vercel serverless, single Node process).
 */

import { NextRequest, NextResponse } from 'next/server'

interface RateLimitEntry {
  count: number
  resetAt: number
}

const stores = new Map<string, Map<string, RateLimitEntry>>()

interface RateLimitConfig {
  /** Max requests allowed within the window */
  limit: number
  /** Window size in seconds */
  windowSeconds: number
}

function getStore(name: string): Map<string, RateLimitEntry> {
  let store = stores.get(name)
  if (!store) {
    store = new Map()
    stores.set(name, store)
  }
  return store
}

function getClientIP(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  )
}

/**
 * Creates a rate limiter for a specific route or group of routes.
 *
 * Usage:
 * ```ts
 * const limiter = rateLimit({ limit: 10, windowSeconds: 60 })
 *
 * export async function POST(request: NextRequest) {
 *   const limited = limiter(request)
 *   if (limited) return limited
 *   // ... handle request
 * }
 * ```
 */
export function rateLimit(config: RateLimitConfig) {
  const storeName = `rl_${config.limit}_${config.windowSeconds}_${Math.random().toString(36).slice(2, 6)}`

  return function check(request: NextRequest): NextResponse | null {
    const store = getStore(storeName)
    const ip = getClientIP(request)
    const now = Date.now()

    const entry = store.get(ip)

    // Clean expired entry
    if (entry && now > entry.resetAt) {
      store.delete(ip)
    }

    const current = store.get(ip)

    if (!current) {
      store.set(ip, {
        count: 1,
        resetAt: now + config.windowSeconds * 1000,
      })
      return null
    }

    if (current.count >= config.limit) {
      const retryAfter = Math.ceil((current.resetAt - now) / 1000)
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(retryAfter),
            'X-RateLimit-Limit': String(config.limit),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(current.resetAt),
          },
        }
      )
    }

    current.count++
    return null
  }
}

// Pre-configured limiters for different route types
/** Strict: 5 requests per minute (support/feedback forms) */
export const strictLimiter = rateLimit({ limit: 5, windowSeconds: 60 })

/** Standard: 20 requests per minute (AI chat, tarot, etc.) */
export const standardLimiter = rateLimit({ limit: 20, windowSeconds: 60 })

/** Checkout: 10 requests per minute (payment flows) */
export const checkoutLimiter = rateLimit({ limit: 10, windowSeconds: 60 })

/** Admin: 30 requests per minute */
export const adminLimiter = rateLimit({ limit: 30, windowSeconds: 60 })

// Periodic cleanup of expired entries (every 5 minutes)
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    for (const store of stores.values()) {
      for (const [key, entry] of store) {
        if (now > entry.resetAt) {
          store.delete(key)
        }
      }
    }
  }, 5 * 60 * 1000)
}
