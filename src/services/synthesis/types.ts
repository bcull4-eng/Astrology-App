/**
 * Theme Synthesis Engine Types
 */

import type {
  ScoredTransit,
  UserPreferences,
  SynthesisedTheme,
  ThemeType,
  DateWindow,
  IntensityLevel,
  FocusArea,
} from '@/types'

/**
 * Result of theme synthesis
 */
export interface SynthesisResult {
  primary: SynthesisedTheme
  secondary: SynthesisedTheme[]
}

/**
 * Composite date range from multiple transits
 */
export interface CompositeDateRange {
  start: Date
  peak: DateWindow
  end: Date
}

/**
 * Theme Synthesis Service Interface
 */
export interface ThemeSynthesisService {
  synthesiseThemes(
    scoredTransits: ScoredTransit[],
    currentDate: Date,
    preferences: UserPreferences
  ): SynthesisResult

  groupTransitsByTheme(transits: ScoredTransit[]): Map<ThemeType, ScoredTransit[]>

  calculateGroupScore(transits: ScoredTransit[]): number

  selectPrimaryTheme(groupedThemes: Map<ThemeType, ScoredTransit[]>): ThemeType

  calculateCompositeDateRange(transits: ScoredTransit[]): CompositeDateRange

  calculateIntensityToday(transits: ScoredTransit[], currentDate: Date): IntensityLevel

  generateThemeDescription(themeType: ThemeType, contributingTransits: ScoredTransit[]): string

  mapThemeToFocusArea(themeType: ThemeType): FocusArea
}

/**
 * Maximum number of secondary themes to surface
 */
export const MAX_SECONDARY_THEMES = 3
