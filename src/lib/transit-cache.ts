/**
 * Transit Data Cache
 *
 * In-memory TTL cache for astrology API responses.
 * Reduces API calls by caching:
 * - Global daily data: 24h (shared across all users, ~30 calls/month)
 * - Per-user transits: 24h (~15k calls/month at 500 DAU)
 * - Lunar returns: 30 days (~500/month)
 * - Solar returns: 1 year (negligible)
 *
 * For production at scale, swap this for Redis.
 */

import { getAstrologyClient } from './astrology-api'
import type { DailySkyData, UserTransitData } from './astrology-api'
import type { BirthData, NatalChart } from '@/types'

// ---------- Cache entry ----------

interface CacheEntry<T> {
  data: T
  expiresAt: number
}

// ---------- TTL durations ----------

const TTL = {
  DAILY_SKY: 24 * 60 * 60 * 1000,     // 24 hours
  USER_TRANSITS: 24 * 60 * 60 * 1000,  // 24 hours
  LUNAR_RETURN: 30 * 24 * 60 * 60 * 1000, // 30 days
  SOLAR_RETURN: 365 * 24 * 60 * 60 * 1000, // 1 year
} as const

// ---------- Cache stores ----------

const dailySkyCache = new Map<string, CacheEntry<DailySkyData>>()
const userTransitCache = new Map<string, CacheEntry<UserTransitData>>()
const lunarReturnCache = new Map<string, CacheEntry<NatalChart>>()

// ---------- Cache key helpers ----------

function dailySkyKey(date: Date): string {
  return date.toISOString().split('T')[0]
}

function userTransitKey(userId: string, date: Date): string {
  return `${userId}:${date.toISOString().split('T')[0]}`
}

// ---------- Cache operations ----------

function getFromCache<T>(cache: Map<string, CacheEntry<T>>, key: string): T | null {
  const entry = cache.get(key)
  if (!entry) return null

  if (Date.now() > entry.expiresAt) {
    cache.delete(key)
    return null
  }

  return entry.data
}

function setInCache<T>(cache: Map<string, CacheEntry<T>>, key: string, data: T, ttl: number): void {
  cache.set(key, {
    data,
    expiresAt: Date.now() + ttl,
  })
}

// ---------- Periodic cleanup to prevent memory leaks ----------

function cleanExpiredEntries(): void {
  const now = Date.now()

  for (const [key, entry] of dailySkyCache) {
    if (now > entry.expiresAt) dailySkyCache.delete(key)
  }

  for (const [key, entry] of userTransitCache) {
    if (now > entry.expiresAt) userTransitCache.delete(key)
  }

  for (const [key, entry] of lunarReturnCache) {
    if (now > entry.expiresAt) lunarReturnCache.delete(key)
  }
}

// Run cleanup every hour
if (typeof setInterval !== 'undefined') {
  setInterval(cleanExpiredEntries, 60 * 60 * 1000)
}

// ---------- Public API ----------

/**
 * Get daily sky data (global planetary positions + lunar metrics).
 * Cached for 24 hours. Shared across all users.
 */
export async function getCachedDailySky(date: Date = new Date()): Promise<DailySkyData> {
  const key = dailySkyKey(date)

  const cached = getFromCache(dailySkyCache, key)
  if (cached) return cached

  const client = getAstrologyClient()
  const data = await client.getDailySkyData(date)

  setInCache(dailySkyCache, key, data, TTL.DAILY_SKY)
  return data
}

/**
 * Get personalized transit data for a specific user.
 * Cached for 24 hours per user.
 */
export async function getCachedUserTransits(
  birthData: BirthData,
  date: Date = new Date()
): Promise<UserTransitData> {
  const key = userTransitKey(birthData.user_id, date)

  const cached = getFromCache(userTransitCache, key)
  if (cached) return cached

  const client = getAstrologyClient()
  const data = await client.getTransitAspects(birthData, date)

  setInCache(userTransitCache, key, data, TTL.USER_TRANSITS)
  return data
}

/**
 * Get cached Lunar Return chart for a user.
 * Cached for 30 days per user.
 */
export async function getCachedLunarReturn(
  birthData: BirthData,
  date: Date = new Date()
): Promise<NatalChart> {
  const key = `lunar-return:${birthData.user_id}`

  const cached = getFromCache(lunarReturnCache, key)
  if (cached) return cached

  const client = getAstrologyClient()
  const data = await client.getLunarReturn(birthData, date)

  setInCache(lunarReturnCache, key, data, TTL.LUNAR_RETURN)
  return data
}

/**
 * Invalidate daily sky cache (e.g., after midnight).
 */
export function invalidateDailySkyCache(): void {
  dailySkyCache.clear()
}

/**
 * Invalidate transit cache for a specific user.
 */
export function invalidateUserTransitCache(userId: string): void {
  for (const key of userTransitCache.keys()) {
    if (key.startsWith(`${userId}:`)) {
      userTransitCache.delete(key)
    }
  }
}
