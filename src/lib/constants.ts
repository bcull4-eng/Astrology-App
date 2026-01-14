/**
 * Application Constants
 */

/**
 * Subscription pricing
 */
export const SUBSCRIPTION_PRICE_PENCE = 2000 // £20/month

/**
 * Dashboard element update cadences (in days)
 */
export const CADENCE = {
  PRIMARY_THEME_MIN: 7,
  PRIMARY_THEME_MAX: 14,
  INTENSITY_METER_MIN: 1,
  INTENSITY_METER_MAX: 2,
  DAILY_GUIDANCE: 1,
  SECONDARY_INFLUENCES_MIN: 5,
  SECONDARY_INFLUENCES_MAX: 10,
  UPCOMING_FORECAST: 7,
} as const

/**
 * Transit scoring thresholds
 */
export const SCORING = {
  THRESHOLD: 40, // Minimum score to surface a transit
  MAX_SECONDARY_THEMES: 3,
  MAX_SUPPORTIVE_CONNECTIONS: 3,
  MAX_FRICTION_POINTS: 2,
} as const

/**
 * Forecast window
 */
export const FORECAST_DAYS = 90

/**
 * Maximum items to display
 */
export const MAX_INSIGHTS = 5
