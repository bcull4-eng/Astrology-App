/**
 * Daily Guidance Generator Types
 */

import type {
  SynthesisedTheme,
  DailyGuidance,
  GuidanceTone,
  ThemeType,
  IntensityLevel,
  IntensityTrend,
} from '@/types'

/**
 * Mapping of theme + intensity to guidance tone
 */
export interface ToneMapping {
  themeType: ThemeType
  intensityRange: [IntensityLevel, IntensityLevel]
  tone: GuidanceTone
}

/**
 * Predefined guidance content for themes
 */
export interface ThemeGuidanceContent {
  themeType: ThemeType
  doItems: Record<IntensityLevel, string[]>
  avoidItems: Record<IntensityLevel, string[]>
  adviceTemplates: Record<IntensityTrend, string>
}

/**
 * Daily Guidance Service Interface
 */
export interface DailyGuidanceService {
  generateDailyGuidance(primaryTheme: SynthesisedTheme, currentDate: Date): DailyGuidance

  deriveTone(themeType: ThemeType, intensity: IntensityLevel): GuidanceTone

  generateDoList(themeType: ThemeType, intensity: IntensityLevel): string[]

  generateAvoidList(themeType: ThemeType, intensity: IntensityLevel): string[]

  generateShortAdvice(theme: SynthesisedTheme, currentDate: Date): string

  determinePhase(theme: SynthesisedTheme, currentDate: Date): IntensityTrend
}
