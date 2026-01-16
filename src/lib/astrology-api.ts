/**
 * AstrologyAPI.com Client
 *
 * Western astrology API integration for natal charts, transits, and synastry.
 * Uses Basic Auth with user_id:api_key
 */

import type {
  BirthData,
  NatalChart,
  NatalPlacement,
  HouseCusp,
  TransitSignal,
  SynastryData,
  SynastryAspect,
  DateRange,
  Planet,
  ZodiacSign,
  AspectType,
  AspectNature,
} from '@/types'
import type { AstrologyProvider } from '@/providers/astrology'
import { getTimezoneOffset } from './geocoding'

// API Response Types (from AstrologyAPI.com - actual response format)
interface APIPlanetData {
  name: string
  fullDegree: number
  normDegree: number
  speed: number
  isRetro: string
  sign: string
  house: number
}

interface APIHouseData {
  house: number
  sign: string
  degree: number
}

interface APIHousesResponse {
  houses: APIHouseData[]
  ascendant: number
  midheaven: number
  vertex: number
}

interface APIAspectData {
  aspecting_planet: string
  aspected_planet: string
  type: string
  orb: number
}

interface APITransitResponse {
  transit_relation: Array<{
    transit_planet: string
    natal_planet: string
    aspect: string
    orb: number
  }>
}

interface APISynastryResponse {
  aspects: APIAspectData[]
}

export class AstrologyAPIClient implements AstrologyProvider {
  private baseUrl: string
  private authHeader: string

  constructor() {
    const userId = process.env.ASTROLOGY_API_USER_ID
    const apiKey = process.env.ASTROLOGY_API_KEY
    const baseUrl = process.env.ASTROLOGY_API_BASE_URL

    if (!userId || !apiKey || !baseUrl) {
      throw new Error('Astrology API credentials not configured')
    }

    this.baseUrl = baseUrl
    // Basic Auth: base64(userId:apiKey)
    this.authHeader = 'Basic ' + Buffer.from(`${userId}:${apiKey}`).toString('base64')
  }

  private async request<T>(endpoint: string, body: Record<string, unknown>): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Authorization': this.authHeader,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw new Error(`AstrologyAPI error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  private birthDataToParams(birthData: BirthData): Record<string, number> {
    const date = new Date(birthData.birth_date)
    const [hours, minutes] = birthData.birth_time
      ? birthData.birth_time.split(':').map(Number)
      : [12, 0] // Default to noon if unknown

    return {
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
      hour: hours,
      min: minutes,
      lat: birthData.birth_place.latitude,
      lon: birthData.birth_place.longitude,
      tzone: this.getTimezoneOffsetValue(birthData.birth_place.timezone),
    }
  }

  private getTimezoneOffsetValue(timezone: string): number {
    return getTimezoneOffset(timezone)
  }

  async getNatalChart(birthData: BirthData): Promise<NatalChart> {
    const params = this.birthDataToParams(birthData)

    // Fetch planets and houses
    const [planetsResponse, housesResponse] = await Promise.all([
      this.request<APIPlanetData[]>('/planets/tropical', params),
      this.request<APIHousesResponse>('/house_cusps/tropical', params),
    ])

    // Map API response to our types (API uses camelCase)
    const placements: NatalPlacement[] = planetsResponse
      .filter(p => this.mapPlanetName(p.name) !== null)
      .map(p => ({
        planet: this.mapPlanetName(p.name)!,
        sign: this.mapSignName(p.sign),
        degree: p.normDegree,
        house: p.house,
        is_retrograde: p.isRetro === 'true',
      }))

    const houses: HouseCusp[] = housesResponse.houses.map(h => ({
      house: h.house,
      sign: this.mapSignName(h.sign),
      degree: h.degree % 30, // Normalize to 0-30 within sign
    }))

    // Get ascendant and midheaven signs from houses
    const ascendantHouse = houses.find(h => h.house === 1)
    const midheavenHouse = houses.find(h => h.house === 10)

    return {
      user_id: birthData.user_id,
      calculated_at: new Date(),
      placements,
      houses,
      ascendant: {
        sign: ascendantHouse?.sign ?? 'aries',
        degree: housesResponse.ascendant % 30,
      },
      midheaven: {
        sign: midheavenHouse?.sign ?? 'aries',
        degree: housesResponse.midheaven % 30,
      },
    }
  }

  async getTransits(natalChart: NatalChart, dateRange: DateRange): Promise<TransitSignal[]> {
    // Get birth data params from natal chart placements
    // For transits, we need the natal chart info plus the transit date
    const transitDate = dateRange.start

    // Build transit params
    const params = {
      day: transitDate.getDate(),
      month: transitDate.getMonth() + 1,
      year: transitDate.getFullYear(),
      // We need natal data too - the API should have this from the original chart
      // For now, we'll use daily transits endpoint
    }

    const response = await this.request<APITransitResponse>('/tropical_transits/daily', params)

    // Map to our transit signal format
    const transits: TransitSignal[] = response.transit_relation?.map((t, index) => ({
      id: `transit-${index}-${Date.now()}`,
      transiting_planet: this.mapPlanetName(t.transit_planet) ?? 'sun',
      natal_target: {
        type: 'planet' as const,
        planet: this.mapPlanetName(t.natal_planet) ?? 'sun',
      },
      aspect: this.mapAspectType(t.aspect),
      orb: t.orb,
      start_date: dateRange.start,
      peak_date: new Date((dateRange.start.getTime() + dateRange.end.getTime()) / 2),
      end_date: dateRange.end,
    })) ?? []

    return transits
  }

  async getSynastry(chartA: NatalChart, chartB: NatalChart): Promise<SynastryData> {
    // Note: The synastry endpoint needs birth data for both people
    // For now, we'll return the aspects between the two charts
    // In production, we'd call the synastry_horoscope endpoint

    const response = await this.request<APISynastryResponse>('/synastry_horoscope', {
      // Person A birth data would go here
      // Person B birth data would go here
      // We need to store birth data with the chart
    })

    const aspects: SynastryAspect[] = response.aspects?.map((a, index) => ({
      id: `synastry-${index}`,
      planet_a: this.mapPlanetName(a.aspecting_planet) ?? 'sun',
      planet_b: this.mapPlanetName(a.aspected_planet) ?? 'sun',
      aspect: this.mapAspectType(a.type),
      orb: a.orb,
      nature: this.getAspectNature(a.type),
    })) ?? []

    return {
      user_a_id: chartA.user_id,
      user_b_id: chartB.user_id,
      calculated_at: new Date(),
      aspects,
    }
  }

  private mapPlanetName(name: string): Planet | null {
    const mapping: Record<string, Planet> = {
      'Sun': 'sun',
      'Moon': 'moon',
      'Mercury': 'mercury',
      'Venus': 'venus',
      'Mars': 'mars',
      'Jupiter': 'jupiter',
      'Saturn': 'saturn',
      'Uranus': 'uranus',
      'Neptune': 'neptune',
      'Pluto': 'pluto',
      'Node': 'north_node',
      'North Node': 'north_node',
      'Chiron': 'chiron',
    }
    return mapping[name] ?? null
  }

  private mapSignName(sign: string): ZodiacSign {
    const mapping: Record<string, ZodiacSign> = {
      'Aries': 'aries',
      'Taurus': 'taurus',
      'Gemini': 'gemini',
      'Cancer': 'cancer',
      'Leo': 'leo',
      'Virgo': 'virgo',
      'Libra': 'libra',
      'Scorpio': 'scorpio',
      'Sagittarius': 'sagittarius',
      'Capricorn': 'capricorn',
      'Aquarius': 'aquarius',
      'Pisces': 'pisces',
    }
    return mapping[sign] ?? 'aries'
  }

  private mapAspectType(type: string): AspectType {
    const mapping: Record<string, AspectType> = {
      'Conjunction': 'conjunction',
      'Opposition': 'opposition',
      'Trine': 'trine',
      'Square': 'square',
      'Sextile': 'sextile',
      'Quincunx': 'quincunx',
      'conjunction': 'conjunction',
      'opposition': 'opposition',
      'trine': 'trine',
      'square': 'square',
      'sextile': 'sextile',
    }
    return mapping[type] ?? 'conjunction'
  }

  private getAspectNature(type: string): AspectNature {
    const harmonious = ['Trine', 'Sextile', 'trine', 'sextile']
    const challenging = ['Square', 'Opposition', 'square', 'opposition']

    if (harmonious.includes(type)) return 'harmonious'
    if (challenging.includes(type)) return 'challenging'
    return 'neutral'
  }
}

// Singleton instance
let astrologyClient: AstrologyAPIClient | null = null

export function getAstrologyClient(): AstrologyAPIClient {
  if (!astrologyClient) {
    astrologyClient = new AstrologyAPIClient()
  }
  return astrologyClient
}
