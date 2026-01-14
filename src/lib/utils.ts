/**
 * Utility Functions
 */

// Note: Install clsx and tailwind-merge for the cn() helper
// npm install clsx tailwind-merge
// Then uncomment:
// import { type ClassValue, clsx } from 'clsx'
// import { twMerge } from 'tailwind-merge'
// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs))
// }

/**
 * Generate a hash for caching purposes
 */
export function hashObject(obj: unknown): string {
  return Buffer.from(JSON.stringify(obj)).toString('base64')
}

/**
 * Check if a date is today
 */
export function isToday(date: Date): boolean {
  const today = new Date()
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  )
}

/**
 * Get days between two dates
 */
export function daysBetween(date1: Date, date2: Date): number {
  const oneDay = 24 * 60 * 60 * 1000
  return Math.round(Math.abs((date1.getTime() - date2.getTime()) / oneDay))
}

/**
 * Format date for display
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  })
}

/**
 * Format date range for display
 */
export function formatDateRange(start: Date, end: Date): string {
  return `${formatDate(start)} - ${formatDate(end)}`
}
