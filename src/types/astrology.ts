/**
 * Core Astrology Entity Types
 */

export interface NatalChart {
  user_id: string
  calculated_at: Date
  placements: NatalPlacement[]
  houses: HouseCusp[]
  ascendant: ZodiacPosition
  midheaven: ZodiacPosition
}

export interface NatalPlacement {
  planet: Planet
  sign: ZodiacSign
  degree: number
  house: number
  is_retrograde: boolean
}

export type Planet =
  | 'sun'
  | 'moon'
  | 'mercury'
  | 'venus'
  | 'mars'
  | 'jupiter'
  | 'saturn'
  | 'uranus'
  | 'neptune'
  | 'pluto'
  | 'north_node'
  | 'chiron'

export type ZodiacSign =
  | 'aries'
  | 'taurus'
  | 'gemini'
  | 'cancer'
  | 'leo'
  | 'virgo'
  | 'libra'
  | 'scorpio'
  | 'sagittarius'
  | 'capricorn'
  | 'aquarius'
  | 'pisces'

export interface ZodiacPosition {
  sign: ZodiacSign
  degree: number
}

export interface HouseCusp {
  house: number
  sign: ZodiacSign
  degree: number
}

export interface TransitSignal {
  id: string
  transiting_planet: Planet
  natal_target: NatalTarget
  aspect: AspectType
  orb: number
  start_date: Date
  peak_date: Date
  end_date: Date
}

export interface NatalTarget {
  type: 'planet' | 'angle' | 'house_cusp'
  planet?: Planet
  angle?: 'ascendant' | 'midheaven' | 'descendant' | 'ic'
  house?: number
}

export type AspectType =
  | 'conjunction'
  | 'opposition'
  | 'trine'
  | 'square'
  | 'sextile'
  | 'quincunx'

export interface SynastryData {
  user_a_id: string
  user_b_id: string
  calculated_at: Date
  aspects: SynastryAspect[]
}

export interface SynastryAspect {
  id: string
  planet_a: Planet
  planet_b: Planet
  aspect: AspectType
  orb: number
  nature: AspectNature
}

export type AspectNature = 'harmonious' | 'challenging' | 'neutral'

export interface DateRange {
  start: Date
  end: Date
}

export interface DateWindow {
  start: Date
  end: Date
}
