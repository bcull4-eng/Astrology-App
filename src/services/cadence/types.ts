/**
 * Update Cadence Resolver Types
 */

import type { DashboardState, UpdateDecision, DashboardElement } from '@/types'

/**
 * Cadence configuration for each dashboard element
 */
export interface CadenceConfig {
  primaryTheme: CadenceRule
  intensityMeter: CadenceRule
  dailyGuidance: CadenceRule
  secondaryInfluences: CadenceRule
  upcomingForecast: CadenceRule
}

/**
 * Single cadence rule
 */
export interface CadenceRule {
  minDays: number
  maxDays: number
}

/**
 * Update Cadence Service Interface
 */
export interface UpdateCadenceService {
  resolveUpdatesNeeded(state: DashboardState, currentDate: Date): UpdateDecision

  shouldUpdatePrimaryTheme(lastUpdated: Date, currentDate: Date): boolean

  shouldUpdateIntensity(lastUpdated: Date, currentDate: Date): boolean

  shouldUpdateDailyGuidance(guidanceDate: Date, currentDate: Date): boolean

  shouldUpdateSecondaryInfluences(lastUpdated: Date, currentDate: Date): boolean

  shouldUpdateUpcomingForecast(lastUpdated: Date, currentDate: Date): boolean

  calculateNextUpdateTime(element: DashboardElement, lastUpdated: Date): Date
}

/**
 * Default cadence configuration (from PRD)
 */
export const DEFAULT_CADENCE_CONFIG: CadenceConfig = {
  primaryTheme: { minDays: 7, maxDays: 14 },
  intensityMeter: { minDays: 1, maxDays: 2 },
  dailyGuidance: { minDays: 1, maxDays: 1 },
  secondaryInfluences: { minDays: 5, maxDays: 10 },
  upcomingForecast: { minDays: 7, maxDays: 7 },
}
