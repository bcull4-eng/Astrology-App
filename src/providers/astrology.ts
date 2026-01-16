/**
 * Astrology Provider Interface
 *
 * Abstract interface for astrology API providers.
 * Allows swapping implementations (e.g., for testing or different APIs).
 */

import type {
  BirthData,
  NatalChart,
  TransitSignal,
  SynastryData,
  DateRange,
} from '@/types'

export interface AstrologyProvider {
  /**
   * Calculate natal chart from birth data
   */
  getNatalChart(birthData: BirthData): Promise<NatalChart>

  /**
   * Get transits for a natal chart within a date range
   */
  getTransits(natalChart: NatalChart, dateRange: DateRange): Promise<TransitSignal[]>

  /**
   * Calculate synastry between two natal charts
   */
  getSynastry(chartA: NatalChart, chartB: NatalChart): Promise<SynastryData>
}

/**
 * Error codes for astrology provider errors
 */
export type AstrologyErrorCode =
  | 'INVALID_BIRTH_DATA'
  | 'GEOCODING_FAILED'
  | 'API_ERROR'
  | 'RATE_LIMITED'
  | 'NETWORK_ERROR'
  | 'UNKNOWN'

/**
 * Structured error for astrology provider operations
 */
export interface AstrologyProviderError {
  code: AstrologyErrorCode
  message: string
  details?: unknown
}

/**
 * Type guard for AstrologyProviderError
 */
export function isAstrologyProviderError(error: unknown): error is AstrologyProviderError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    'message' in error &&
    typeof (error as AstrologyProviderError).code === 'string' &&
    typeof (error as AstrologyProviderError).message === 'string'
  )
}
