/**
 * Astrology Service Types
 *
 * Internal types for the astrology service layer
 * that wraps the provider abstraction.
 */

import type { BirthData, NatalChart, TransitSignal, SynastryData, DateRange } from '@/types'

/**
 * Cache entry for natal chart
 */
export interface CachedNatalChart {
  chart: NatalChart
  cachedAt: Date
  birthDataHash: string
}

/**
 * Cache entry for transits
 */
export interface CachedTransits {
  transits: TransitSignal[]
  cachedAt: Date
  dateRange: DateRange
}

/**
 * Cache entry for synastry
 */
export interface CachedSynastry {
  synastry: SynastryData
  cachedAt: Date
  chartAHash: string
  chartBHash: string
}

/**
 * Astrology Service Interface (wraps provider with caching)
 */
export interface AstrologyService {
  /**
   * Get natal chart (with caching)
   */
  getNatalChart(birthData: BirthData): Promise<NatalChart>

  /**
   * Get transits for date range (with caching)
   */
  getTransits(userId: string, dateRange: DateRange): Promise<TransitSignal[]>

  /**
   * Get synastry between two users (with caching)
   */
  getSynastry(userAId: string, userBId: string): Promise<SynastryData>

  /**
   * Invalidate cached data for a user
   */
  invalidateCache(userId: string): Promise<void>
}

/**
 * Hash function for cache keys
 */
export type HashFunction = (data: unknown) => string
