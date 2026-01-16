/**
 * Geocoding Service
 *
 * Converts city/country to latitude, longitude, and timezone.
 * Uses OpenStreetMap Nominatim API (free, no key required).
 */

import type { BirthPlace } from '@/types'

interface NominatimResult {
  lat: string
  lon: string
  display_name: string
}

interface TimezoneResult {
  timezone: string
  offset: number
}

/**
 * Geocode a location string to get coordinates
 */
export async function geocodeLocation(query: string): Promise<{
  latitude: number
  longitude: number
  displayName: string
} | null> {
  try {
    const encoded = encodeURIComponent(query)
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encoded}&limit=1`,
      {
        headers: {
          'User-Agent': 'AstroApp/1.0',
        },
      }
    )

    if (!response.ok) {
      console.error('Geocoding failed:', response.status)
      return null
    }

    const results: NominatimResult[] = await response.json()

    if (results.length === 0) {
      return null
    }

    return {
      latitude: parseFloat(results[0].lat),
      longitude: parseFloat(results[0].lon),
      displayName: results[0].display_name,
    }
  } catch (error) {
    console.error('Geocoding error:', error)
    return null
  }
}

/**
 * Get timezone for coordinates
 * Uses a simple timezone estimation based on longitude
 * For production, use a proper timezone API
 */
export function getTimezoneFromCoords(latitude: number, longitude: number): string {
  // Simple timezone mapping based on major regions
  // This is approximate - for production use a proper timezone API

  // Americas
  if (longitude >= -170 && longitude < -100) {
    if (latitude > 50) return 'America/Anchorage'
    return 'America/Los_Angeles'
  }
  if (longitude >= -100 && longitude < -85) {
    return 'America/Chicago'
  }
  if (longitude >= -85 && longitude < -65) {
    return 'America/New_York'
  }
  if (longitude >= -65 && longitude < -30) {
    return 'America/Sao_Paulo'
  }

  // Europe
  if (longitude >= -15 && longitude < 5) {
    return 'Europe/London'
  }
  if (longitude >= 5 && longitude < 20) {
    return 'Europe/Paris'
  }
  if (longitude >= 20 && longitude < 40) {
    return 'Europe/Moscow'
  }

  // Asia
  if (longitude >= 40 && longitude < 70) {
    return 'Asia/Dubai'
  }
  if (longitude >= 70 && longitude < 90) {
    return 'Asia/Kolkata'
  }
  if (longitude >= 90 && longitude < 120) {
    return 'Asia/Shanghai'
  }
  if (longitude >= 120 && longitude < 145) {
    return 'Asia/Tokyo'
  }

  // Australia
  if (longitude >= 145 && longitude < 180 && latitude < 0) {
    return 'Australia/Sydney'
  }

  return 'UTC'
}

/**
 * Convert a location string (e.g., "London, UK") to full BirthPlace data
 */
export async function locationToBirthPlace(locationString: string): Promise<BirthPlace | null> {
  const geocoded = await geocodeLocation(locationString)

  if (!geocoded) {
    return null
  }

  // Extract city and country from display name
  const parts = geocoded.displayName.split(', ')
  const city = parts[0]
  const country = parts[parts.length - 1]

  const timezone = getTimezoneFromCoords(geocoded.latitude, geocoded.longitude)

  return {
    city,
    country,
    latitude: geocoded.latitude,
    longitude: geocoded.longitude,
    timezone,
  }
}

/**
 * Get numeric timezone offset from timezone string
 */
export function getTimezoneOffset(timezone: string): number {
  const offsets: Record<string, number> = {
    'America/Anchorage': -9,
    'America/Los_Angeles': -8,
    'America/Denver': -7,
    'America/Chicago': -6,
    'America/New_York': -5,
    'America/Sao_Paulo': -3,
    'Europe/London': 0,
    'Europe/Paris': 1,
    'Europe/Berlin': 1,
    'Europe/Moscow': 3,
    'Asia/Dubai': 4,
    'Asia/Kolkata': 5.5,
    'Asia/Shanghai': 8,
    'Asia/Tokyo': 9,
    'Australia/Sydney': 10,
    'UTC': 0,
  }
  return offsets[timezone] ?? 0
}
