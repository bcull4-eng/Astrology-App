/**
 * Dashboard State Types
 */

import type { FocusArea, BirthData } from './user'
import type { SynthesisedTheme, DailyGuidance, UpcomingWindow, SynthesisedSynastry } from './insights'

export interface DashboardState {
  user_id: string
  active_theme: SynthesisedTheme | null
  secondary_influences: SynthesisedTheme[] // max 3
  daily_guidance: DailyGuidance | null
  upcoming_windows: UpcomingWindow[] // 90 days rolling
  active_filter: FocusArea | 'all'
  last_fetched_at: Date
}

export interface FreeInsightState {
  user_id: string
  primary_theme_name: string
  primary_theme_explanation: string
  theme_end_date: Date
  has_seen_paywall: boolean
}

export interface SynastryDashboardState {
  user_id: string
  partner_birth_data: BirthData | null
  synthesised_synastry: SynthesisedSynastry | null
  is_loading: boolean
}

export interface UpdateDecision {
  primary_theme: boolean
  intensity_meter: boolean
  daily_guidance: boolean
  secondary_influences: boolean
  upcoming_forecast: boolean
}

export type DashboardElement =
  | 'primary_theme'
  | 'intensity_meter'
  | 'daily_guidance'
  | 'secondary_influences'
  | 'upcoming_forecast'
