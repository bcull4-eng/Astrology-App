/**
 * Transit Scoring Engine Types
 */

import type {
  TransitSignal,
  NatalChart,
  UserPreferences,
  ScoredTransit,
  Planet,
  AspectType,
  NatalTarget,
  FocusArea,
  ThemeType,
} from '@/types'

/**
 * Input for scoring a single transit
 */
export interface ScoreTransitInput {
  transit: TransitSignal
  natalChart: NatalChart
  preferences: UserPreferences
}

/**
 * Configuration for scoring weights
 */
export interface ScoringWeights {
  planetWeights: Record<Planet, number>
  aspectWeights: Record<AspectType, number>
  angleWeight: number
  luminaryWeight: number
  outerPlanetMultiplier: number
  orbTightnessMaxBonus: number
}

/**
 * Result of theme derivation
 */
export interface DerivedThemes {
  primary: ThemeType
  secondary: ThemeType[]
}

/**
 * Transit Scoring Service Interface
 */
export interface TransitScoringService {
  scoreTransit(
    transit: TransitSignal,
    natalChart: NatalChart,
    preferences: UserPreferences
  ): ScoredTransit

  calculatePlanetWeight(planet: Planet): number

  calculateTargetWeight(target: NatalTarget, natalChart: NatalChart): number

  calculateAspectWeight(aspect: AspectType): number

  calculateOrbScore(orb: number, aspect: AspectType): number

  calculateHouseRelevance(house: number, focusAreas: FocusArea[]): number

  deriveThemes(transit: TransitSignal, natalChart: NatalChart): DerivedThemes

  filterBelowThreshold(transits: ScoredTransit[], threshold: number): ScoredTransit[]
}

/**
 * Default score threshold for surfacing transits
 */
export const SCORE_THRESHOLD = 40
