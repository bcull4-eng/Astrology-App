/**
 * Application Constants
 */

/**
 * Subscription pricing
 */
export const SUBSCRIPTION_PRICES = {
  MONTHLY_PENCE: 1499, // £14.99/month
  ANNUAL_PENCE: 9900, // £99/year
  LIFETIME_PENCE: 14900, // £149 one-time
} as const

/**
 * Report pricing
 */
export const REPORT_PRICES = {
  SINGLE_PRICE: 29, // £29 per report
  BUNDLE_PRICE: 49, // £49 for all 3 reports
} as const

/**
 * Subscription benefits
 */
export const SUBSCRIPTION_BENEFITS = {
  ANNUAL_FREE_REPORTS: 2, // Annual includes 2 free reports
  LIFETIME_FREE_REPORTS: 3, // Lifetime includes all 3 reports
} as const

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
