/**
 * Calculator Types for SEO Astrology Calculators
 */

import type { Planet, ZodiacSign, NatalChart } from './astrology'

// Calculator input types
export type CalculatorInputType = 'single' | 'compatibility'

// Output display types
export type CalculatorOutputType =
  | 'single-sign'      // Shows one sign result (e.g., Moon Sign Calculator)
  | 'multiple-signs'   // Shows multiple placements (e.g., Big 3, Big 6)
  | 'chart'            // Shows full natal chart
  | 'compatibility'    // Shows two-person comparison
  | 'date-based'       // Shows date/time result (e.g., Saturn Return)
  | 'moon-phase'       // Shows moon phase result

// SEO content structure
export interface SEOContentSection {
  title: string
  content: string
  subsections?: { title: string; content: string }[]
}

export interface KeyTakeaway {
  text: string
}

export interface FAQ {
  question: string
  answer: string
}

export interface SEOContent {
  intro: string
  keyTakeaways?: KeyTakeaway[]
  sections: SEOContentSection[]
  howItWorks?: {
    steps: { title: string; description: string }[]
    benefits: string[]
  }
  faqs?: FAQ[]
  conclusion?: string
}

// Calculator configuration
export interface Calculator {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  h1: string
  description: string
  inputType: CalculatorInputType
  requiresTime: boolean
  requiresExactTime?: boolean
  outputType: CalculatorOutputType
  placements: Planet[]
  includeAscendant?: boolean
  includeMidheaven?: boolean
  seoContent: SEOContent
  relatedCalculators: string[]
  tier: 1 | 2 | 3 | 4
}

// Form data structure
export interface CalculatorFormData {
  birthDate: string
  birthTime: string
  birthTimeConfidence: 'exact' | 'approximate' | 'unknown'
  birthPlace: string
  // For compatibility calculators
  partnerBirthDate?: string
  partnerBirthTime?: string
  partnerBirthTimeConfidence?: 'exact' | 'approximate' | 'unknown'
  partnerBirthPlace?: string
}

// Sign result with interpretation
export interface SignResult {
  planet: Planet | 'ascendant' | 'midheaven' | 'part_of_fortune' | 'lilith'
  sign: ZodiacSign
  degree: number
  house?: number
  isRetrograde?: boolean
  interpretation: SignInterpretation
}

export interface SignInterpretation {
  title: string
  summary: string
  traits: string[]
  strengths: string[]
  challenges: string[]
}

// Saturn Return specific result
export interface SaturnReturnResult {
  saturnSign: ZodiacSign
  saturnDegree: number
  firstReturn: {
    startDate: Date
    exactDate: Date
    endDate: Date
    age: number
  }
  secondReturn?: {
    startDate: Date
    exactDate: Date
    endDate: Date
    age: number
  }
  currentPhase: 'pre-return' | 'approaching' | 'in-return' | 'post-return'
  interpretation: string
}

// Solar Return specific result
export interface SolarReturnResult {
  solarReturnDate: Date
  solarReturnChart: NatalChart
  yearTheme: string
  keyAreas: string[]
}

// Moon Phase result
export interface MoonPhaseResult {
  phase: MoonPhase
  illumination: number
  nextNewMoon: Date
  nextFullMoon: Date
  interpretation: string
}

export type MoonPhase =
  | 'new-moon'
  | 'waxing-crescent'
  | 'first-quarter'
  | 'waxing-gibbous'
  | 'full-moon'
  | 'waning-gibbous'
  | 'last-quarter'
  | 'waning-crescent'

// Part of Fortune calculation
export interface PartOfFortuneResult {
  sign: ZodiacSign
  degree: number
  house: number
  interpretation: string
}

// Lilith (Black Moon) result
export interface LilithResult {
  sign: ZodiacSign
  degree: number
  house: number
  interpretation: string
}

// Compatibility result
export interface CompatibilityResult {
  overallScore: number
  sunCompatibility: CompatibilityAspect
  moonCompatibility: CompatibilityAspect
  venusCompatibility: CompatibilityAspect
  marsCompatibility: CompatibilityAspect
  categories: {
    emotional: number
    communication: number
    passion: number
    values: number
    longTerm: number
  }
  strengths: string[]
  challenges: string[]
  advice: string
}

export interface CompatibilityAspect {
  person1Sign: ZodiacSign
  person2Sign: ZodiacSign
  compatibility: 'excellent' | 'good' | 'moderate' | 'challenging'
  description: string
}

// Calculator result union type
export type CalculatorResult = {
  calculator: Calculator
  chart?: NatalChart
  partnerChart?: NatalChart
  signResults?: SignResult[]
  saturnReturn?: SaturnReturnResult
  solarReturn?: SolarReturnResult
  moonPhase?: MoonPhaseResult
  partOfFortune?: PartOfFortuneResult
  lilith?: LilithResult
  compatibility?: CompatibilityResult
}
