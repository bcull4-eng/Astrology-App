/**
 * Onboarding V2 Types
 */

export type Gender = 'female' | 'male' | 'non-binary'

export type RelationshipStatusV2 =
  | 'single'
  | 'dating'
  | 'in_relationship'
  | 'engaged'
  | 'married'
  | 'complicated'
  | 'prefer_not_to_say'

export type FutureGoal =
  | 'love'
  | 'career'
  | 'wealth'
  | 'health'
  | 'family'
  | 'travel'
  | 'spirituality'
  | 'creativity'

export type ColorPreference = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple'

export type ElementOfNature = 'earth' | 'water' | 'fire' | 'air'

export type OnboardingStep =
  | 'gender' | 'birthday' | 'birth-time' | 'birth-place' | 'chart-mapping'
  | 'forecast-34' | 'relationship' | 'future-goals' | 'color-preference' | 'element'
  | 'profile-reveal' | 'forecast-67' | 'palm-reading' | 'forecast-100'
  | 'email-capture' | 'loading-screens' | 'results-ready' | 'payment' | 'results-reveal' | 'forecast-upsell'

export const ONBOARDING_STEPS: OnboardingStep[] = [
  'gender', 'birthday', 'birth-time', 'birth-place', 'chart-mapping',
  'forecast-34', 'relationship', 'future-goals', 'color-preference', 'element',
  'profile-reveal', 'forecast-67', 'palm-reading', 'forecast-100',
  'email-capture', 'loading-screens', 'results-ready', 'payment', 'results-reveal', 'forecast-upsell',
]

export const QUIZ_STEP_COUNT = 14

export interface BirthPlaceInputV2 {
  city: string
  country: string
  latitude: number | null
  longitude: number | null
  timezone: string
}

export interface NatalChartData {
  sunSign: string
  moonSign: string
  ascendant: string
  planets: Record<string, { sign: string; degree: number; retrograde?: boolean }>
  houses: Record<string, { sign: string; degree: number }>
  aspects: Array<{ planet1: string; planet2: string; aspect: string; orb: number }>
}

export interface ProfileData {
  sign: string
  modality: 'cardinal' | 'fixed' | 'mutable'
  polarity: 'positive' | 'negative'
  element: 'fire' | 'earth' | 'air' | 'water'
  rulingPlanet: string
  compatibleSigns: string[]
}

export interface PalmReadingData {
  imageUrl: string | null
  lifeLineScore: number
  heartLineScore: number
  headLineScore: number
  fateLineScore: number
  predictions: { marriage: string; children: string; bigChange: string; money: string }
}

export interface OnboardingV2State {
  currentStep: OnboardingStep
  gender: Gender | null
  birthMonth: number | null
  birthDay: number | null
  birthYear: number | null
  birthHour: number | null
  birthMinute: number | null
  birthAmPm: 'AM' | 'PM' | null
  birthTimeKnown: boolean
  birthPlace: BirthPlaceInputV2
  natalChartData: NatalChartData | null
  relationshipStatus: RelationshipStatusV2 | null
  futureGoals: FutureGoal[]
  colorPreference: ColorPreference | null
  elementPreference: ElementOfNature | null
  profileData: ProfileData | null
  palmReadingData: PalmReadingData | null
  email: string
  direction: 'forward' | 'backward'
  completedSteps: OnboardingStep[]
  isAuthenticated: boolean
  userId: string | null
}

export const RELATIONSHIP_OPTIONS: Array<{ value: RelationshipStatusV2; emoji: string; label: string }> = [
  { value: 'single', emoji: '💫', label: 'Single' },
  { value: 'dating', emoji: '💕', label: 'Dating' },
  { value: 'in_relationship', emoji: '💑', label: 'In a relationship' },
  { value: 'engaged', emoji: '💍', label: 'Engaged' },
  { value: 'married', emoji: '💒', label: 'Married' },
  { value: 'complicated', emoji: '🌀', label: "It's complicated" },
  { value: 'prefer_not_to_say', emoji: '🤐', label: 'Prefer not to say' },
]

export const FUTURE_GOAL_OPTIONS: Array<{ value: FutureGoal; emoji: string; label: string }> = [
  { value: 'love', emoji: '❤️', label: 'Love & Romance' },
  { value: 'career', emoji: '💼', label: 'Career & Success' },
  { value: 'wealth', emoji: '💰', label: 'Wealth & Prosperity' },
  { value: 'health', emoji: '🌿', label: 'Health & Wellness' },
  { value: 'family', emoji: '👨‍👩‍👧', label: 'Family & Home' },
  { value: 'travel', emoji: '✈️', label: 'Travel & Adventure' },
  { value: 'spirituality', emoji: '🧘', label: 'Spirituality' },
  { value: 'creativity', emoji: '🎨', label: 'Creativity & Art' },
]

export const COLOR_OPTIONS: Array<{ value: ColorPreference; color: string; label: string }> = [
  { value: 'red', color: '#ef4444', label: 'Red' },
  { value: 'orange', color: '#f97316', label: 'Orange' },
  { value: 'yellow', color: '#eab308', label: 'Yellow' },
  { value: 'green', color: '#22c55e', label: 'Green' },
  { value: 'blue', color: '#3b82f6', label: 'Blue' },
  { value: 'purple', color: '#a855f7', label: 'Purple' },
]

export const ELEMENT_OPTIONS: Array<{ value: ElementOfNature; emoji: string; label: string; description: string }> = [
  { value: 'earth', emoji: '🌍', label: 'Earth', description: 'Grounded & Stable' },
  { value: 'water', emoji: '🌊', label: 'Water', description: 'Intuitive & Emotional' },
  { value: 'fire', emoji: '🔥', label: 'Fire', description: 'Passionate & Dynamic' },
  { value: 'air', emoji: '💨', label: 'Air', description: 'Intellectual & Free' },
]

export const GENDER_OPTIONS: Array<{ value: Gender; emoji: string; label: string }> = [
  { value: 'female', emoji: '♀️', label: 'Female' },
  { value: 'male', emoji: '♂️', label: 'Male' },
  { value: 'non-binary', emoji: '⚧️', label: 'Non-binary' },
]

export const ZODIAC_DATA: Record<string, {
  element: 'fire' | 'earth' | 'air' | 'water'
  modality: 'cardinal' | 'fixed' | 'mutable'
  polarity: 'positive' | 'negative'
  rulingPlanet: string
  compatible: string[]
}> = {
  aries: { element: 'fire', modality: 'cardinal', polarity: 'positive', rulingPlanet: 'Mars', compatible: ['Leo', 'Sagittarius', 'Gemini', 'Aquarius'] },
  taurus: { element: 'earth', modality: 'fixed', polarity: 'negative', rulingPlanet: 'Venus', compatible: ['Virgo', 'Capricorn', 'Cancer', 'Pisces'] },
  gemini: { element: 'air', modality: 'mutable', polarity: 'positive', rulingPlanet: 'Mercury', compatible: ['Libra', 'Aquarius', 'Aries', 'Leo'] },
  cancer: { element: 'water', modality: 'cardinal', polarity: 'negative', rulingPlanet: 'Moon', compatible: ['Scorpio', 'Pisces', 'Taurus', 'Virgo'] },
  leo: { element: 'fire', modality: 'fixed', polarity: 'positive', rulingPlanet: 'Sun', compatible: ['Aries', 'Sagittarius', 'Gemini', 'Libra'] },
  virgo: { element: 'earth', modality: 'mutable', polarity: 'negative', rulingPlanet: 'Mercury', compatible: ['Taurus', 'Capricorn', 'Cancer', 'Scorpio'] },
  libra: { element: 'air', modality: 'cardinal', polarity: 'positive', rulingPlanet: 'Venus', compatible: ['Gemini', 'Aquarius', 'Leo', 'Sagittarius'] },
  scorpio: { element: 'water', modality: 'fixed', polarity: 'negative', rulingPlanet: 'Pluto', compatible: ['Cancer', 'Pisces', 'Virgo', 'Capricorn'] },
  sagittarius: { element: 'fire', modality: 'mutable', polarity: 'positive', rulingPlanet: 'Jupiter', compatible: ['Aries', 'Leo', 'Libra', 'Aquarius'] },
  capricorn: { element: 'earth', modality: 'cardinal', polarity: 'negative', rulingPlanet: 'Saturn', compatible: ['Taurus', 'Virgo', 'Scorpio', 'Pisces'] },
  aquarius: { element: 'air', modality: 'fixed', polarity: 'positive', rulingPlanet: 'Uranus', compatible: ['Gemini', 'Libra', 'Aries', 'Sagittarius'] },
  pisces: { element: 'water', modality: 'mutable', polarity: 'negative', rulingPlanet: 'Neptune', compatible: ['Cancer', 'Scorpio', 'Taurus', 'Capricorn'] },
}
