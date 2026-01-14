/**
 * Scored and Synthesised Insight Types
 */

import type { FocusArea } from './user'
import type { DateWindow } from './astrology'

export interface ScoredTransit {
  transit_signal_id: string
  score: number // 0-100
  primary_theme: ThemeType
  secondary_themes: ThemeType[]
  intensity_curve: IntensityPoint[]
}

export type ThemeType =
  | 'relationship_recalibration'
  | 'career_transformation'
  | 'financial_restructuring'
  | 'identity_evolution'
  | 'communication_shift'
  | 'emotional_processing'
  | 'expansion_opportunity'
  | 'discipline_required'
  | 'unexpected_change'
  | 'spiritual_growth'
  | 'healing_journey'
  | 'power_dynamics'

export interface IntensityPoint {
  date: Date
  intensity: number // 1-5
}

export type IntensityLevel = 1 | 2 | 3 | 4 | 5

export interface SynthesisedTheme {
  id: string
  theme_name: string
  description: string
  start_date: Date
  peak_window: DateWindow
  end_date: Date
  intensity_today: IntensityLevel
  primary_focus_area: FocusArea
  contributing_transits: string[] // transit_signal_ids
  last_updated_at: Date
}

export interface DailyGuidance {
  date: Date
  tone: GuidanceTone
  short_advice: string
  do_list: string[]
  avoid_list: string[]
  intensity_level: IntensityLevel
}

export type GuidanceTone =
  | 'encouraging'
  | 'cautious'
  | 'reflective'
  | 'action_oriented'
  | 'restorative'

export interface UpcomingWindow {
  start_date: Date
  end_date: Date
  summary: string
  key_focus: FocusArea
  intensity_trend: IntensityTrend
}

export type IntensityTrend = 'rising' | 'peaking' | 'easing'

export interface ScoredSynastryAspect {
  synastry_aspect_id: string
  score: number // 0-100
  category: SynastryCategory
  life_area_manifestation: string
}

export type SynastryCategory =
  | 'supportive_connection'
  | 'friction_point'
  | 'growth_lesson'

export interface SynthesisedSynastry {
  id: string
  user_a_id: string
  user_b_id: string
  overall_dynamic: string
  supportive_connections: SynastryInsight[] // max 3
  friction_points: SynastryInsight[] // max 2
  growth_lesson: SynastryInsight
  practical_guidance: string[]
  calculated_at: Date
}

export interface SynastryInsight {
  title: string
  explanation: string
  real_life_manifestation: string
  contributing_aspects: string[] // synastry_aspect_ids
}
