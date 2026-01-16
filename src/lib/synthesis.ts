/**
 * Theme Synthesis Service
 *
 * Generates personalized themes and guidance from natal chart data.
 * Deterministic business logic - no AI.
 */

import { addDays, subDays } from 'date-fns'
import type {
  NatalChart,
  NatalPlacement,
  Planet,
  ZodiacSign,
} from '@/types'
import type {
  SynthesisedTheme,
  DailyGuidance,
  UpcomingWindow,
  IntensityLevel,
  GuidanceTone,
} from '@/types'
import type { FocusArea } from '@/types'

// Planet meanings for theme generation
const planetThemes: Record<Planet, {
  themes: string[]
  focusArea: FocusArea
  keywords: string[]
}> = {
  sun: {
    themes: ['Identity Evolution', 'Self-Expression', 'Vitality Focus'],
    focusArea: 'growth',
    keywords: ['confidence', 'purpose', 'creativity', 'leadership'],
  },
  moon: {
    themes: ['Emotional Processing', 'Nurturing Needs', 'Inner Security'],
    focusArea: 'relationships',
    keywords: ['feelings', 'comfort', 'home', 'intuition'],
  },
  mercury: {
    themes: ['Communication Shift', 'Mental Clarity', 'Learning Phase'],
    focusArea: 'career',
    keywords: ['communication', 'thinking', 'planning', 'decisions'],
  },
  venus: {
    themes: ['Relationship Recalibration', 'Values Alignment', 'Pleasure Principle'],
    focusArea: 'relationships',
    keywords: ['love', 'beauty', 'harmony', 'values'],
  },
  mars: {
    themes: ['Action Required', 'Energy Surge', 'Assertiveness Training'],
    focusArea: 'career',
    keywords: ['action', 'courage', 'drive', 'competition'],
  },
  jupiter: {
    themes: ['Expansion Opportunity', 'Growth Window', 'Lucky Break'],
    focusArea: 'money',
    keywords: ['growth', 'luck', 'opportunity', 'abundance'],
  },
  saturn: {
    themes: ['Discipline Required', 'Structure Building', 'Responsibility Check'],
    focusArea: 'career',
    keywords: ['discipline', 'boundaries', 'commitment', 'maturity'],
  },
  uranus: {
    themes: ['Unexpected Change', 'Liberation Time', 'Innovation Spark'],
    focusArea: 'growth',
    keywords: ['change', 'freedom', 'innovation', 'surprise'],
  },
  neptune: {
    themes: ['Spiritual Growth', 'Creative Inspiration', 'Boundary Dissolving'],
    focusArea: 'growth',
    keywords: ['dreams', 'intuition', 'creativity', 'spirituality'],
  },
  pluto: {
    themes: ['Deep Transformation', 'Power Dynamics', 'Rebirth Process'],
    focusArea: 'growth',
    keywords: ['transformation', 'power', 'depth', 'renewal'],
  },
  north_node: {
    themes: ['Destiny Calling', 'Growth Direction', 'Soul Purpose'],
    focusArea: 'growth',
    keywords: ['purpose', 'growth', 'destiny', 'evolution'],
  },
  chiron: {
    themes: ['Healing Journey', 'Wound to Wisdom', 'Teaching Moment'],
    focusArea: 'growth',
    keywords: ['healing', 'wisdom', 'teaching', 'vulnerability'],
  },
}

// Sign descriptions for personalization
const signDescriptions: Record<ZodiacSign, {
  style: string
  approach: string
}> = {
  aries: { style: 'bold and direct', approach: 'taking initiative' },
  taurus: { style: 'steady and grounded', approach: 'building security' },
  gemini: { style: 'curious and adaptable', approach: 'gathering information' },
  cancer: { style: 'nurturing and protective', approach: 'creating emotional safety' },
  leo: { style: 'confident and expressive', approach: 'shining your light' },
  virgo: { style: 'analytical and helpful', approach: 'refining the details' },
  libra: { style: 'balanced and diplomatic', approach: 'seeking harmony' },
  scorpio: { style: 'intense and transformative', approach: 'going deep' },
  sagittarius: { style: 'adventurous and optimistic', approach: 'expanding horizons' },
  capricorn: { style: 'ambitious and disciplined', approach: 'climbing steadily' },
  aquarius: { style: 'innovative and independent', approach: 'thinking differently' },
  pisces: { style: 'intuitive and compassionate', approach: 'flowing with life' },
}

/**
 * Generate primary theme from natal chart
 */
export function generatePrimaryTheme(chart: NatalChart): SynthesisedTheme {
  const today = new Date()

  // Find the most prominent planet (sun, moon, or chart ruler)
  const sunPlacement = chart.placements.find(p => p.planet === 'sun')
  const moonPlacement = chart.placements.find(p => p.planet === 'moon')
  const ascendantSign = chart.ascendant.sign

  // Get chart ruler based on ascendant
  const chartRuler = getChartRuler(ascendantSign)
  const rulerPlacement = chart.placements.find(p => p.planet === chartRuler)

  // Choose focal planet based on current transits (simplified)
  const focalPlanet = rulerPlacement || sunPlacement || moonPlacement

  if (!focalPlanet) {
    // Fallback
    return createDefaultTheme(today)
  }

  const planetInfo = planetThemes[focalPlanet.planet]
  const signInfo = signDescriptions[focalPlanet.sign]
  const themeName = planetInfo.themes[0]

  // Generate description
  const description = generateThemeDescription(focalPlanet, signInfo, planetInfo)

  return {
    id: `theme-${focalPlanet.planet}-${Date.now()}`,
    theme_name: themeName,
    description,
    start_date: subDays(today, 7),
    peak_window: {
      start: addDays(today, 3),
      end: addDays(today, 10),
    },
    end_date: addDays(today, 28),
    intensity_today: calculateIntensity(focalPlanet),
    primary_focus_area: planetInfo.focusArea,
    contributing_transits: [`${focalPlanet.planet}-transit`],
    last_updated_at: today,
  }
}

/**
 * Generate secondary themes from natal chart
 */
export function generateSecondaryThemes(chart: NatalChart): SynthesisedTheme[] {
  const today = new Date()
  const themes: SynthesisedTheme[] = []

  // Get planets in angular houses (1, 4, 7, 10) or personal planets
  const significantPlanets = chart.placements.filter(p =>
    [1, 4, 7, 10].includes(p.house) ||
    ['mercury', 'venus', 'mars'].includes(p.planet)
  )

  // Generate themes for up to 2 secondary planets
  const secondaryPlanets = significantPlanets
    .filter(p => p.planet !== 'sun' && p.planet !== 'moon')
    .slice(0, 2)

  secondaryPlanets.forEach((placement, index) => {
    const planetInfo = planetThemes[placement.planet]
    const signInfo = signDescriptions[placement.sign]
    const themeIndex = Math.min(index + 1, planetInfo.themes.length - 1)

    themes.push({
      id: `theme-${placement.planet}-${Date.now()}`,
      theme_name: planetInfo.themes[themeIndex],
      description: generateThemeDescription(placement, signInfo, planetInfo),
      start_date: subDays(today, 3 + index * 5),
      peak_window: {
        start: addDays(today, 10 + index * 7),
        end: addDays(today, 17 + index * 7),
      },
      end_date: addDays(today, 35 + index * 10),
      intensity_today: Math.max(1, calculateIntensity(placement) - 1) as IntensityLevel,
      primary_focus_area: planetInfo.focusArea,
      contributing_transits: [`${placement.planet}-transit`],
      last_updated_at: today,
    })
  })

  return themes
}

/**
 * Generate daily guidance from natal chart
 */
export function generateDailyGuidance(chart: NatalChart): DailyGuidance {
  const today = new Date()

  const moonPlacement = chart.placements.find(p => p.planet === 'moon')
  const mercuryPlacement = chart.placements.find(p => p.planet === 'mercury')
  const marsPlacement = chart.placements.find(p => p.planet === 'mars')

  const moonSign = moonPlacement?.sign || 'aries'
  const moonInfo = signDescriptions[moonSign]

  // Determine tone based on moon sign element
  const tone = getToneFromSign(moonSign)

  // Generate do/avoid lists based on planetary positions
  const doList = generateDoList(chart)
  const avoidList = generateAvoidList(chart)

  return {
    date: today,
    tone,
    short_advice: generateShortAdvice(moonSign, mercuryPlacement, marsPlacement),
    do_list: doList,
    avoid_list: avoidList,
    intensity_level: calculateOverallIntensity(chart),
  }
}

/**
 * Generate upcoming windows
 */
export function generateUpcomingWindows(chart: NatalChart): UpcomingWindow[] {
  const today = new Date()
  const windows: UpcomingWindow[] = []

  // Generate 4 upcoming windows based on planetary emphasis
  const focusAreas: FocusArea[] = ['relationships', 'career', 'growth', 'money']

  focusAreas.forEach((area, index) => {
    const startOffset = 3 + index * 7
    windows.push({
      start_date: addDays(today, startOffset),
      end_date: addDays(today, startOffset + 6),
      summary: generateWindowSummary(area, chart),
      key_focus: area,
      intensity_trend: index === 0 ? 'peaking' : index === 1 ? 'rising' : 'easing',
    })
  })

  return windows
}

// Helper functions

function getChartRuler(ascendant: ZodiacSign): Planet {
  const rulers: Record<ZodiacSign, Planet> = {
    aries: 'mars',
    taurus: 'venus',
    gemini: 'mercury',
    cancer: 'moon',
    leo: 'sun',
    virgo: 'mercury',
    libra: 'venus',
    scorpio: 'pluto',
    sagittarius: 'jupiter',
    capricorn: 'saturn',
    aquarius: 'uranus',
    pisces: 'neptune',
  }
  return rulers[ascendant]
}

function generateThemeDescription(
  placement: NatalPlacement,
  signInfo: { style: string; approach: string },
  planetInfo: { keywords: string[] }
): string {
  const signName = placement.sign.charAt(0).toUpperCase() + placement.sign.slice(1)
  const houseArea = getHouseArea(placement.house)

  return `With ${placement.planet.charAt(0).toUpperCase() + placement.planet.slice(1)} in ${signName} in your ${houseArea}, this period emphasizes ${planetInfo.keywords.slice(0, 2).join(' and ')}. Your ${signInfo.style} approach to ${signInfo.approach} is highlighted now. ${placement.is_retrograde ? 'The retrograde motion suggests reflection and revision rather than new initiatives.' : 'Direct planetary motion supports forward movement and new beginnings.'}`
}

function getHouseArea(house: number): string {
  const houseAreas: Record<number, string> = {
    1: 'house of self and identity',
    2: 'house of money and values',
    3: 'house of communication',
    4: 'house of home and family',
    5: 'house of creativity and pleasure',
    6: 'house of health and work',
    7: 'house of partnerships',
    8: 'house of transformation',
    9: 'house of expansion and philosophy',
    10: 'house of career and public image',
    11: 'house of community and hopes',
    12: 'house of spirituality and solitude',
  }
  return houseAreas[house] || 'chart'
}

function calculateIntensity(placement: NatalPlacement): IntensityLevel {
  // Higher intensity for angular houses and personal planets
  let intensity = 3

  if ([1, 4, 7, 10].includes(placement.house)) intensity += 1
  if (['sun', 'moon', 'mars'].includes(placement.planet)) intensity += 1
  if (placement.is_retrograde) intensity -= 1

  return Math.max(1, Math.min(5, intensity)) as IntensityLevel
}

function getToneFromSign(sign: ZodiacSign): GuidanceTone {
  const fireSign = ['aries', 'leo', 'sagittarius'].includes(sign)
  const earthSigns = ['taurus', 'virgo', 'capricorn'].includes(sign)
  const airSigns = ['gemini', 'libra', 'aquarius'].includes(sign)
  const waterSigns = ['cancer', 'scorpio', 'pisces'].includes(sign)

  if (fireSign) return 'action_oriented'
  if (earthSigns) return 'cautious'
  if (airSigns) return 'encouraging'
  if (waterSigns) return 'reflective'
  return 'reflective'
}

function generateDoList(chart: NatalChart): string[] {
  const sunSign = chart.placements.find(p => p.planet === 'sun')?.sign || 'aries'
  const moonSign = chart.placements.find(p => p.planet === 'moon')?.sign || 'aries'

  const baseDos = [
    'Honor your natural rhythms today',
    'Make time for activities that energize you',
    'Connect with someone who understands you',
  ]

  // Add sign-specific advice
  const signAdvice: Record<ZodiacSign, string> = {
    aries: 'Take initiative on something important',
    taurus: 'Create comfort and stability in your space',
    gemini: 'Engage in stimulating conversations',
    cancer: 'Nurture yourself and your loved ones',
    leo: 'Express yourself creatively',
    virgo: 'Organize and refine your systems',
    libra: 'Seek balance in your relationships',
    scorpio: 'Go deeper into what matters',
    sagittarius: 'Explore new ideas or places',
    capricorn: 'Focus on your long-term goals',
    aquarius: 'Connect with your community',
    pisces: 'Trust your intuition',
  }

  return [...baseDos, signAdvice[sunSign]]
}

function generateAvoidList(chart: NatalChart): string[] {
  const marsPlacement = chart.placements.find(p => p.planet === 'mars')
  const saturnPlacement = chart.placements.find(p => p.planet === 'saturn')

  const baseAvoids = [
    'Overcommitting your energy',
    'Ignoring your boundaries',
  ]

  if (marsPlacement?.is_retrograde) {
    baseAvoids.push('Starting new confrontations')
  }

  if (saturnPlacement?.is_retrograde) {
    baseAvoids.push('Taking on new major responsibilities')
  }

  return baseAvoids
}

function generateShortAdvice(
  moonSign: ZodiacSign,
  mercury: NatalPlacement | undefined,
  mars: NatalPlacement | undefined
): string {
  const moonInfo = signDescriptions[moonSign]

  let advice = `Today favors ${moonInfo.approach}. `

  if (mercury?.is_retrograde) {
    advice += 'Review communications carefully before sending. '
  }

  if (mars?.is_retrograde) {
    advice += 'Channel energy into reflection rather than action.'
  } else {
    advice += 'Your instincts are a reliable guide.'
  }

  return advice.trim()
}

function calculateOverallIntensity(chart: NatalChart): IntensityLevel {
  // Average intensity across personal planets
  const personalPlanets = chart.placements.filter(p =>
    ['sun', 'moon', 'mercury', 'venus', 'mars'].includes(p.planet)
  )

  const totalIntensity = personalPlanets.reduce((sum, p) => sum + calculateIntensity(p), 0)
  const avgIntensity = Math.round(totalIntensity / personalPlanets.length)

  return Math.max(1, Math.min(5, avgIntensity)) as IntensityLevel
}

function generateWindowSummary(area: FocusArea, chart: NatalChart): string {
  const summaries: Record<FocusArea, string[]> = {
    relationships: [
      'Important conversations and connections highlighted.',
      'Time to evaluate your closest partnerships.',
      'Social energy increases - reach out to others.',
    ],
    career: [
      'Professional opportunities may emerge.',
      'Focus on long-term career goals.',
      'Your work ethic is noticed by others.',
    ],
    money: [
      'Financial matters require attention.',
      'Good time to review budgets and investments.',
      'Opportunities for increased income possible.',
    ],
    growth: [
      'Personal development takes center stage.',
      'Time for reflection and self-improvement.',
      'Learning and expansion are favored.',
    ],
  }

  const options = summaries[area]
  return options[Math.floor(Math.random() * options.length)]
}

function createDefaultTheme(today: Date): SynthesisedTheme {
  return {
    id: 'default-theme',
    theme_name: 'Personal Awareness',
    description: 'A period of heightened self-awareness and reflection. Pay attention to what emerges.',
    start_date: subDays(today, 7),
    peak_window: {
      start: addDays(today, 3),
      end: addDays(today, 10),
    },
    end_date: addDays(today, 28),
    intensity_today: 3,
    primary_focus_area: 'growth',
    contributing_transits: [],
    last_updated_at: today,
  }
}
