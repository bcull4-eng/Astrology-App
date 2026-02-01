/**
 * Astrology-API.io Client
 *
 * Western astrology API integration for natal charts, transits, and synastry.
 * Uses Bearer token authentication with a single API key.
 *
 * Endpoint schemas based on OpenAPI spec at:
 * https://api.astrology-api.io/api/v3/openapi.json
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

// ---------- API Response Types (astrology-api.io v3 OpenAPI spec) ----------

// Shared chart data structure (natal, transit, synastry responses all use this)
interface APIChartData {
  planetary_positions: APIPlanetPosition[]
  house_cusps: APIHouseCusp[]
  aspects: APIAspect[]
  fixed_stars?: Record<string, unknown> | null
}

interface APIPlanetPosition {
  name: string                // e.g. "Sun", "Moon", "Sun_transit", "Venus_1"
  sign: string                // 3-letter code: "Ari", "Tau", etc.
  degree: number              // degree within sign (0-29.99)
  absolute_longitude: number  // absolute degree (0-360)
  house: number | null        // 1-12 or null (heliocentric)
  is_retrograde: boolean
  speed: number | null        // degrees/day
}

interface APIHouseCusp {
  house: number               // 1-12
  sign: string                // 3-letter or full name
  degree: number
  absolute_longitude: number
  retrograde?: null
}

interface APIAspect {
  point1: string              // e.g. "Sun", "Sun_transit", "Venus_1"
  point2: string              // e.g. "Moon", "Moon_natal", "Mars_2"
  aspect_type: string         // "conjunction", "trine", "square", "opposition", "sextile"
  orb: number                 // deviation in degrees
  peak_activations?: unknown[] | null
}

// Natal response
interface APINatalResponse {
  subject_data: Record<string, unknown>
  chart_data: APIChartData
}

// Transit response
interface APITransitResponse {
  subject_data: {
    natal_subject: Record<string, unknown>
    transit_subject: Record<string, unknown>
  }
  chart_data: APIChartData
}

// Synastry response
interface APISynastryResponse {
  subject_data: {
    subject1: Record<string, unknown>
    subject2: Record<string, unknown>
  }
  chart_data: APIChartData
}

// Global positions response (flat, no wrapper)
export interface APIGlobalPositionsResponse {
  datetime_utc: string
  zodiac_type: string
  positions: APIPlanetPosition[]
}

// Lunar metrics response (flat, no wrapper)
export interface APILunarMetricsResponse {
  date: string
  within_perigee_range: boolean
  distance: number
  within_apogee_range: boolean
  apogee_distance: number
  moon_sign: string           // 3-letter code
  moon_phase: string          // e.g. "Waxing Crescent", "Full Moon"
  moon_age_in_days: number
  moon_day: number
  moon_illumination: number   // percentage 0-100
}

// ---------- Public data types for consumption ----------

export interface GlobalPlanetPosition {
  planet: Planet
  sign: ZodiacSign
  degree: number
  retrograde: boolean
}

export interface MoonPhaseData {
  name: string
  illumination: number
}

export interface VoidOfCourseData {
  isVoid: boolean
  startsAt: string | null
  endsAt: string | null
}

export interface DailySkyData {
  date: string
  planets: GlobalPlanetPosition[]
  moonPhase: MoonPhaseData
  retrogrades: Planet[]
  voidOfCourse: VoidOfCourseData
  nextFullMoon: string | null
  nextNewMoon: string | null
}

export interface TransitAspect {
  transitingPlanet: Planet
  natalPlanet: Planet
  aspect: AspectType
  orb: number
  isApplying: boolean
  nature: AspectNature
}

export interface UserTransitData {
  date: string
  transits: TransitAspect[]
}

// ---------- Sign code mapping ----------

const SIGN_CODE_MAP: Record<string, ZodiacSign> = {
  'Ari': 'aries',
  'Tau': 'taurus',
  'Gem': 'gemini',
  'Can': 'cancer',
  'Leo': 'leo',
  'Vir': 'virgo',
  'Lib': 'libra',
  'Sco': 'scorpio',
  'Sag': 'sagittarius',
  'Cap': 'capricorn',
  'Aqu': 'aquarius',
  'Pis': 'pisces',
  // Also accept full names (for flexibility)
  'Aries': 'aries',
  'Taurus': 'taurus',
  'Gemini': 'gemini',
  'Cancer': 'cancer',
  // 'Leo' already mapped above (3-letter code == full name)
  'Virgo': 'virgo',
  'Libra': 'libra',
  'Scorpio': 'scorpio',
  'Sagittarius': 'sagittarius',
  'Capricorn': 'capricorn',
  'Aquarius': 'aquarius',
  'Pisces': 'pisces',
}

const PLANET_NAME_MAP: Record<string, Planet> = {
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
  'North Node': 'north_node',
  'True_Node': 'north_node',
  'True Node': 'north_node',
  'Mean_Node': 'north_node',
  'Node': 'north_node',
  'Chiron': 'chiron',
}

// ---------- Client ----------

export class AstrologyAPIClient implements AstrologyProvider {
  private baseUrl = 'https://api.astrology-api.io'
  private apiKey: string

  constructor() {
    const apiKey = process.env.ASTROLOGY_IO_API_KEY

    if (!apiKey) {
      throw new Error(
        'ASTROLOGY_IO_API_KEY is not configured. ' +
        'Set it in your environment variables.'
      )
    }

    this.apiKey = apiKey
  }

  private async request<T>(endpoint: string, body: Record<string, unknown>): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const text = await response.text().catch(() => '')
      throw new Error(
        `Astrology API error: ${response.status} ${response.statusText}${text ? ` - ${text}` : ''}`
      )
    }

    // All API responses are wrapped in {success, data, metadata} envelope
    const envelope = await response.json() as {
      success: boolean
      data: T | null
      error?: { message?: string; error_code?: string; code?: string }
    }

    if (!envelope.success || !envelope.data) {
      const errorMsg = envelope.error?.message ?? 'Unknown API error'
      throw new Error(`Astrology API error: ${errorMsg}`)
    }

    return envelope.data
  }

  private buildSubject(birthData: BirthData): Record<string, unknown> {
    const date = new Date(birthData.birth_date)
    const [hours, minutes] = birthData.birth_time
      ? birthData.birth_time.split(':').map(Number)
      : [12, 0] // Default to noon if unknown

    return {
      birth_data: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        hour: hours,
        minute: minutes,
        latitude: birthData.birth_place.latitude,
        longitude: birthData.birth_place.longitude,
        timezone: birthData.birth_place.timezone,
      },
    }
  }

  // ---------- Natal Chart ----------

  async getNatalChart(birthData: BirthData): Promise<NatalChart> {
    const subject = this.buildSubject(birthData)

    const response = await this.request<APINatalResponse>('/api/v3/charts/natal', {
      subject,
      options: {
        house_system: 'P',      // Placidus
        zodiac_type: 'Tropic',  // Tropical
      },
    })

    const { chart_data } = response

    const placements: NatalPlacement[] = chart_data.planetary_positions
      .filter(p => this.mapPlanetName(p.name) !== null)
      .map(p => ({
        planet: this.mapPlanetName(p.name)!,
        sign: this.mapSignCode(p.sign),
        degree: p.degree,
        house: p.house ?? 1,
        is_retrograde: p.is_retrograde,
      }))

    const houses: HouseCusp[] = chart_data.house_cusps.map(h => ({
      house: h.house,
      sign: this.mapSignCode(h.sign),
      degree: h.degree,
    }))

    // Ascendant = house cusp 1, Midheaven (MC) = house cusp 10
    const ascCusp = chart_data.house_cusps.find(h => h.house === 1)
    const mcCusp = chart_data.house_cusps.find(h => h.house === 10)

    return {
      user_id: birthData.user_id,
      calculated_at: new Date(),
      placements,
      houses,
      ascendant: {
        sign: this.mapSignCode(ascCusp?.sign ?? 'Ari'),
        degree: ascCusp?.degree ?? 0,
      },
      midheaven: {
        sign: this.mapSignCode(mcCusp?.sign ?? 'Ari'),
        degree: mcCusp?.degree ?? 0,
      },
    }
  }

  // ---------- Transits ----------

  async getTransits(_natalChart: NatalChart, _dateRange: DateRange): Promise<TransitSignal[]> {
    // The transit endpoint requires full birth data (not just a chart).
    // This method exists to satisfy the AstrologyProvider interface.
    // Use getTransitAspects() with birthData directly instead.
    return []
  }

  /**
   * Get transit aspects for a user's natal chart on a specific date.
   * This is the preferred method for personalized transit data.
   */
  async getTransitAspects(birthData: BirthData, transitDate: Date = new Date()): Promise<UserTransitData> {
    const subject = this.buildSubject(birthData)

    const response = await this.request<APITransitResponse>('/api/v3/charts/transit', {
      subject,
      transit_time: {
        datetime: {
          year: transitDate.getFullYear(),
          month: transitDate.getMonth() + 1,
          day: transitDate.getDate(),
          hour: transitDate.getHours(),
          minute: transitDate.getMinutes(),
          latitude: birthData.birth_place.latitude,
          longitude: birthData.birth_place.longitude,
          timezone: birthData.birth_place.timezone,
        },
      },
    })

    // Filter to cross-aspects only (transit planet -> natal planet)
    const transits: TransitAspect[] = response.chart_data.aspects
      .filter(a => {
        const p1Transit = a.point1.endsWith('_transit')
        const p2Natal = a.point2.endsWith('_natal')
        if (!p1Transit || !p2Natal) return false
        const transitName = this.stripPlanetSuffix(a.point1)
        const natalName = this.stripPlanetSuffix(a.point2)
        return this.mapPlanetName(transitName) !== null && this.mapPlanetName(natalName) !== null
      })
      .map(a => {
        const transitName = this.stripPlanetSuffix(a.point1)
        const natalName = this.stripPlanetSuffix(a.point2)
        return {
          transitingPlanet: this.mapPlanetName(transitName)!,
          natalPlanet: this.mapPlanetName(natalName)!,
          aspect: this.mapAspectType(a.aspect_type),
          orb: a.orb,
          isApplying: a.orb < 1, // Tight orb approximates applying aspect
          nature: this.getAspectNature(a.aspect_type),
        }
      })

    return {
      date: transitDate.toISOString().split('T')[0],
      transits,
    }
  }

  // ---------- Global Daily Data ----------

  /**
   * Fetch current planetary positions (shared for all users).
   * Uses flat request body per OpenAPI spec (no subject wrapper).
   */
  async getGlobalPositions(date: Date = new Date()): Promise<APIGlobalPositionsResponse> {
    return this.request<APIGlobalPositionsResponse>('/api/v3/data/global-positions', {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: 0,
      options: {
        zodiac_type: 'Tropic',
        active_points: [
          'Sun', 'Moon', 'Mercury', 'Venus', 'Mars',
          'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto',
          'True_Node', 'Chiron',
        ],
      },
    })
  }

  /**
   * Fetch lunar metrics (moon phase, illumination, sign, etc.).
   * Uses subject wrapper per OpenAPI spec.
   */
  async getLunarMetrics(date: Date = new Date()): Promise<APILunarMetricsResponse> {
    return this.request<APILunarMetricsResponse>('/api/v3/data/lunar-metrics', {
      subject: {
        birth_data: {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate(),
          hour: date.getHours(),
          minute: date.getMinutes(),
          second: 0,
          latitude: 51.5074,
          longitude: -0.1278,
        },
      },
    })
  }

  /**
   * Convenience method: fetch both global positions and lunar metrics,
   * then combine into a DailySkyData object.
   */
  async getDailySkyData(date: Date = new Date()): Promise<DailySkyData> {
    const [positionsRes, lunarRes] = await Promise.all([
      this.getGlobalPositions(date),
      this.getLunarMetrics(date),
    ])

    const planets: GlobalPlanetPosition[] = positionsRes.positions
      .filter(p => this.mapPlanetName(p.name) !== null)
      .map(p => ({
        planet: this.mapPlanetName(p.name)!,
        sign: this.mapSignCode(p.sign),
        degree: p.degree,
        retrograde: p.is_retrograde,
      }))

    const retrogrades = planets.filter(p => p.retrograde).map(p => p.planet)

    return {
      date: date.toISOString().split('T')[0],
      planets,
      moonPhase: {
        name: lunarRes.moon_phase,
        illumination: lunarRes.moon_illumination,
      },
      retrogrades,
      // Void-of-course and next moon dates not available from lunar-metrics endpoint
      voidOfCourse: {
        isVoid: false,
        startsAt: null,
        endsAt: null,
      },
      nextFullMoon: null,
      nextNewMoon: null,
    }
  }

  // ---------- Synastry ----------

  async getSynastry(chartA: NatalChart, chartB: NatalChart): Promise<SynastryData> {
    // The synastry endpoint requires full birth data for both subjects.
    // Since we only have NatalChart objects, use getSynastryFromBirthData() instead.
    return {
      user_a_id: chartA.user_id,
      user_b_id: chartB.user_id,
      calculated_at: new Date(),
      aspects: [],
    }
  }

  /**
   * Get synastry aspects between two people using their birth data.
   * This is the preferred method when birth data is available.
   */
  async getSynastryFromBirthData(birthDataA: BirthData, birthDataB: BirthData): Promise<SynastryData> {
    const subject1 = this.buildSubject(birthDataA)
    const subject2 = this.buildSubject(birthDataB)

    const response = await this.request<APISynastryResponse>('/api/v3/charts/synastry', {
      subject1,
      subject2,
      options: {
        house_system: 'P',
        zodiac_type: 'Tropic',
      },
    })

    const aspects: SynastryAspect[] = response.chart_data.aspects
      .filter(a => {
        const p1Is1 = a.point1.endsWith('_1')
        const p2Is2 = a.point2.endsWith('_2')
        if (!p1Is1 || !p2Is2) return false
        const name1 = this.stripPlanetSuffix(a.point1)
        const name2 = this.stripPlanetSuffix(a.point2)
        return this.mapPlanetName(name1) !== null && this.mapPlanetName(name2) !== null
      })
      .map((a, index) => {
        const name1 = this.stripPlanetSuffix(a.point1)
        const name2 = this.stripPlanetSuffix(a.point2)
        return {
          id: `synastry-${index}`,
          planet_a: this.mapPlanetName(name1)!,
          planet_b: this.mapPlanetName(name2)!,
          aspect: this.mapAspectType(a.aspect_type),
          orb: a.orb,
          nature: this.getAspectNature(a.aspect_type),
        }
      })

    return {
      user_a_id: birthDataA.user_id,
      user_b_id: birthDataB.user_id,
      calculated_at: new Date(),
      aspects,
    }
  }

  // ---------- Mapping helpers ----------

  private mapPlanetName(name: string): Planet | null {
    return PLANET_NAME_MAP[name] ?? null
  }

  private mapSignCode(code: string): ZodiacSign {
    return SIGN_CODE_MAP[code] ?? 'aries'
  }

  private stripPlanetSuffix(name: string): string {
    return name.replace(/_(transit|natal|1|2)$/, '')
  }

  private mapAspectType(type: string): AspectType {
    const normalized = type.toLowerCase()
    const mapping: Record<string, AspectType> = {
      'conjunction': 'conjunction',
      'opposition': 'opposition',
      'trine': 'trine',
      'square': 'square',
      'sextile': 'sextile',
      'quincunx': 'quincunx',
      'inconjunct': 'quincunx',
    }
    return mapping[normalized] ?? 'conjunction'
  }

  private getAspectNature(type: string): AspectNature {
    const normalized = type.toLowerCase()
    if (['trine', 'sextile'].includes(normalized)) return 'harmonious'
    if (['square', 'opposition'].includes(normalized)) return 'challenging'
    return 'neutral'
  }
}

// ---------- Singleton ----------

let astrologyClient: AstrologyAPIClient | null = null

export function getAstrologyClient(): AstrologyAPIClient {
  if (!astrologyClient) {
    astrologyClient = new AstrologyAPIClient()
  }
  return astrologyClient
}
