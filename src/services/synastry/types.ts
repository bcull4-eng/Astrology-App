/**
 * Synastry Scoring Service Types
 */

import type {
  SynastryData,
  NatalChart,
  ScoredSynastryAspect,
  SynthesisedSynastry,
  SynastryInsight,
  SynastryAspect,
  SynastryCategory,
  Planet,
} from '@/types'

/**
 * Configuration for synastry scoring weights
 */
export interface SynastryWeights {
  planetPairWeights: Record<string, number> // e.g., "venus-mars": 10
  aspectNatureWeights: Record<string, number>
  orbTightnessMaxBonus: number
}

/**
 * Synastry Scoring Service Interface
 */
export interface SynastryScoringService {
  scoreSynastryAspects(
    synastry: SynastryData,
    chartA: NatalChart,
    chartB: NatalChart
  ): ScoredSynastryAspect[]

  calculatePlanetPairWeight(planetA: Planet, planetB: Planet): number

  categoriseAspect(aspect: SynastryAspect, score: number): SynastryCategory

  synthesiseSynastry(
    scoredAspects: ScoredSynastryAspect[],
    synastryData: SynastryData
  ): SynthesisedSynastry

  selectTopSupportive(
    aspects: ScoredSynastryAspect[],
    limit: number
  ): ScoredSynastryAspect[]

  selectTopFriction(
    aspects: ScoredSynastryAspect[],
    limit: number
  ): ScoredSynastryAspect[]

  deriveGrowthLesson(challengingAspects: ScoredSynastryAspect[]): SynastryInsight

  generateOverallDynamic(scoredAspects: ScoredSynastryAspect[]): string

  generatePracticalGuidance(frictionPoints: ScoredSynastryAspect[]): string[]

  generateLifeAreaManifestation(aspect: ScoredSynastryAspect): string
}

/**
 * Limits for synastry insights
 */
export const MAX_SUPPORTIVE_CONNECTIONS = 3
export const MAX_FRICTION_POINTS = 2
