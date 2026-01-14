/**
 * Astrology Data Provider Interface
 *
 * Abstract interface for astrology calculations.
 * Phase 1: Implemented via external API
 * Phase 2: Implemented via Swiss Ephemeris
 */

import type { BirthData, NatalChart, TransitSignal, SynastryData, DateRange } from '@/types'

export interface AstrologyProvider {
  /**
   * Calculate natal chart for given birth data
   */
  getNatalChart(birthData: BirthData): Promise<NatalChart>

  /**
   * Get transit signals for user within date range
   */
  getTransits(natalChart: NatalChart, dateRange: DateRange): Promise<TransitSignal[]>

  /**
   * Calculate synastry aspects between two natal charts
   */
  getSynastry(chartA: NatalChart, chartB: NatalChart): Promise<SynastryData>
}

export interface AstrologyProviderError {
  code: AstrologyErrorCode
  message: string
  retryable: boolean
}

export type AstrologyErrorCode =
  | 'INVALID_BIRTH_DATA'
  | 'CALCULATION_ERROR'
  | 'PROVIDER_UNAVAILABLE'
  | 'RATE_LIMITED'

export function isAstrologyProviderError(error: unknown): error is AstrologyProviderError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    'message' in error &&
    'retryable' in error
  )
}
