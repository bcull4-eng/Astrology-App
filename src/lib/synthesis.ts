/**
 * Theme Synthesis Service
 *
 * Generates personalized themes and guidance from natal chart data.
 * When real transit data is available (from astrology-api.io), themes
 * and guidance are based on actual planetary transits. Otherwise
 * falls back to deterministic logic based on natal placements.
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
import type { DailySkyData, TransitAspect } from './astrology-api'

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

// Aspect descriptions for transit-based themes
const aspectDescriptions: Record<string, {
  nature: string
  action: string
}> = {
  conjunction: { nature: 'intensifying', action: 'Focus on the combined energy' },
  opposition: { nature: 'polarizing', action: 'Seek balance between opposing forces' },
  trine: { nature: 'flowing', action: 'Leverage this natural ease' },
  square: { nature: 'tension-building', action: 'Use this friction as fuel for growth' },
  sextile: { nature: 'opportunity-creating', action: 'Take advantage of this opening' },
  quincunx: { nature: 'adjusting', action: 'Make small but meaningful changes' },
}

/**
 * Generate primary theme from natal chart and optional real transits
 */
export function generatePrimaryTheme(
  chart: NatalChart,
  dailySky?: DailySkyData,
  userTransits?: TransitAspect[]
): SynthesisedTheme {
  const today = new Date()

  // If we have real transit data, use the strongest transit to drive the theme
  if (userTransits && userTransits.length > 0) {
    return generateTransitBasedTheme(chart, userTransits, today)
  }

  // Fallback: natal-chart-only logic
  const sunPlacement = chart.placements.find(p => p.planet === 'sun')
  const moonPlacement = chart.placements.find(p => p.planet === 'moon')
  const ascendantSign = chart.ascendant.sign

  const chartRuler = getChartRuler(ascendantSign)
  const rulerPlacement = chart.placements.find(p => p.planet === chartRuler)

  const focalPlanet = rulerPlacement || sunPlacement || moonPlacement

  if (!focalPlanet) {
    return createDefaultTheme(today)
  }

  const planetInfo = planetThemes[focalPlanet.planet]
  const signInfo = signDescriptions[focalPlanet.sign]
  const themeName = planetInfo.themes[0]

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
 * Generate a theme from real transit aspects
 */
function generateTransitBasedTheme(
  chart: NatalChart,
  transits: TransitAspect[],
  today: Date
): SynthesisedTheme {
  // Sort transits by significance: tight orb + outer planets first
  const sorted = [...transits].sort((a, b) => {
    const outerPlanets = ['saturn', 'uranus', 'neptune', 'pluto']
    const aIsOuter = outerPlanets.includes(a.transitingPlanet) ? 1 : 0
    const bIsOuter = outerPlanets.includes(b.transitingPlanet) ? 1 : 0
    if (aIsOuter !== bIsOuter) return bIsOuter - aIsOuter
    return a.orb - b.orb // Tighter orb = more significant
  })

  const primary = sorted[0]
  const planetInfo = planetThemes[primary.transitingPlanet]
  const natalPlanetInfo = planetThemes[primary.natalPlanet]
  const natalPlacement = chart.placements.find(p => p.planet === primary.natalPlanet)
  const aspectInfo = aspectDescriptions[primary.aspect] || aspectDescriptions['conjunction']

  // Build theme name from transit
  const transitingName = primary.transitingPlanet.charAt(0).toUpperCase() + primary.transitingPlanet.slice(1)
  const natalName = primary.natalPlanet.charAt(0).toUpperCase() + primary.natalPlanet.slice(1)
  const themeName = planetInfo.themes[0]

  // Build description from real transit
  const signName = natalPlacement
    ? natalPlacement.sign.charAt(0).toUpperCase() + natalPlacement.sign.slice(1)
    : ''
  const houseArea = natalPlacement ? getHouseArea(natalPlacement.house) : 'your chart'

  const description = `${transitingName} is currently ${primary.aspect} your natal ${natalName}${signName ? ` in ${signName}` : ''} in ${houseArea}. This ${aspectInfo.nature} energy brings themes of ${planetInfo.keywords.slice(0, 2).join(' and ')} into your ${natalPlanetInfo.keywords[0]} area. ${aspectInfo.action}.${primary.isApplying ? ' This aspect is still building in strength.' : ' This aspect is now separating.'}`

  // Determine intensity from orb
  let intensity: IntensityLevel
  if (primary.orb < 1) intensity = 5
  else if (primary.orb < 2) intensity = 4
  else if (primary.orb < 4) intensity = 3
  else if (primary.orb < 6) intensity = 2
  else intensity = 1

  return {
    id: `theme-transit-${primary.transitingPlanet}-${primary.natalPlanet}-${Date.now()}`,
    theme_name: themeName,
    description,
    start_date: subDays(today, 7),
    peak_window: {
      start: primary.isApplying ? addDays(today, 1) : subDays(today, 1),
      end: primary.isApplying ? addDays(today, 7) : addDays(today, 3),
    },
    end_date: addDays(today, 21),
    intensity_today: intensity,
    primary_focus_area: planetInfo.focusArea,
    contributing_transits: sorted.slice(0, 3).map(t => `${t.transitingPlanet}-${t.aspect}-${t.natalPlanet}`),
    last_updated_at: today,
  }
}

/**
 * Generate secondary themes from natal chart and optional transits
 */
export function generateSecondaryThemes(
  chart: NatalChart,
  dailySky?: DailySkyData,
  userTransits?: TransitAspect[]
): SynthesisedTheme[] {
  const today = new Date()
  const themes: SynthesisedTheme[] = []

  // If we have real transits, use the 2nd and 3rd strongest
  if (userTransits && userTransits.length > 1) {
    const sorted = [...userTransits].sort((a, b) => a.orb - b.orb)
    const secondary = sorted.slice(1, 3)

    secondary.forEach((transit, index) => {
      const planetInfo = planetThemes[transit.transitingPlanet]
      const aspectInfo = aspectDescriptions[transit.aspect] || aspectDescriptions['conjunction']
      const natalName = transit.natalPlanet.charAt(0).toUpperCase() + transit.natalPlanet.slice(1)
      const transitName = transit.transitingPlanet.charAt(0).toUpperCase() + transit.transitingPlanet.slice(1)

      let intensity: IntensityLevel
      if (transit.orb < 2) intensity = 4
      else if (transit.orb < 4) intensity = 3
      else intensity = 2

      themes.push({
        id: `theme-transit-secondary-${transit.transitingPlanet}-${Date.now()}`,
        theme_name: planetInfo.themes[Math.min(index + 1, planetInfo.themes.length - 1)],
        description: `${transitName} ${transit.aspect} your natal ${natalName} brings ${aspectInfo.nature} energy to your ${planetInfo.keywords[0]} area. ${aspectInfo.action}.`,
        start_date: subDays(today, 3 + index * 5),
        peak_window: {
          start: addDays(today, 10 + index * 7),
          end: addDays(today, 17 + index * 7),
        },
        end_date: addDays(today, 35 + index * 10),
        intensity_today: intensity,
        primary_focus_area: planetInfo.focusArea,
        contributing_transits: [`${transit.transitingPlanet}-${transit.aspect}-${transit.natalPlanet}`],
        last_updated_at: today,
      })
    })

    return themes
  }

  // Fallback: natal-chart-only logic
  const significantPlanets = chart.placements.filter(p =>
    [1, 4, 7, 10].includes(p.house) ||
    ['mercury', 'venus', 'mars'].includes(p.planet)
  )

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
 * Generate daily guidance from natal chart and optional real data
 */
export function generateDailyGuidance(
  chart: NatalChart,
  dailySky?: DailySkyData,
  userTransits?: TransitAspect[]
): DailyGuidance {
  const today = new Date()

  const moonPlacement = chart.placements.find(p => p.planet === 'moon')
  const mercuryPlacement = chart.placements.find(p => p.planet === 'mercury')
  const marsPlacement = chart.placements.find(p => p.planet === 'mars')

  const moonSign = moonPlacement?.sign || 'aries'

  // Determine tone: use real transit data if available
  let tone: GuidanceTone
  if (dailySky && userTransits && userTransits.length > 0) {
    tone = getToneFromTransits(dailySky, userTransits)
  } else {
    tone = getToneFromSign(moonSign)
  }

  // Generate do/avoid lists: enhance with real data if available
  const doList = generateDoList(chart, dailySky, userTransits)
  const avoidList = generateAvoidList(chart, dailySky)

  // Generate advice: enhance with real data
  const shortAdvice = generateShortAdvice(moonSign, mercuryPlacement, marsPlacement, dailySky, userTransits)

  return {
    date: today,
    tone,
    short_advice: shortAdvice,
    do_list: doList,
    avoid_list: avoidList,
    intensity_level: dailySky && userTransits
      ? calculateTransitIntensity(userTransits)
      : calculateOverallIntensity(chart),
  }
}

/**
 * Generate upcoming windows - enhanced with real sky data when available
 */
export function generateUpcomingWindows(
  chart: NatalChart,
  dailySky?: DailySkyData
): UpcomingWindow[] {
  const today = new Date()
  const windows: UpcomingWindow[] = []

  const focusAreas: FocusArea[] = ['relationships', 'career', 'growth', 'money']

  focusAreas.forEach((area, index) => {
    const startOffset = 3 + index * 7
    windows.push({
      start_date: addDays(today, startOffset),
      end_date: addDays(today, startOffset + 6),
      summary: generateWindowSummary(area, chart, dailySky),
      key_focus: area,
      intensity_trend: index === 0 ? 'peaking' : index === 1 ? 'rising' : 'easing',
    })
  })

  return windows
}

// ---------- Helper functions ----------

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
  let intensity = 3

  if ([1, 4, 7, 10].includes(placement.house)) intensity += 1
  if (['sun', 'moon', 'mars'].includes(placement.planet)) intensity += 1
  if (placement.is_retrograde) intensity -= 1

  return Math.max(1, Math.min(5, intensity)) as IntensityLevel
}

function calculateTransitIntensity(transits: TransitAspect[]): IntensityLevel {
  if (transits.length === 0) return 3

  let score = 0
  for (const t of transits) {
    // Outer planet transits are more significant
    const outerPlanets = ['saturn', 'uranus', 'neptune', 'pluto']
    const isOuter = outerPlanets.includes(t.transitingPlanet)
    const weight = isOuter ? 2 : 1

    // Tighter orb = stronger
    const orbFactor = Math.max(0, 5 - t.orb) / 5
    score += weight * orbFactor

    // Challenging aspects add more intensity
    if (t.nature === 'challenging') score += 0.5
  }

  const avg = score / transits.length
  if (avg >= 2) return 5
  if (avg >= 1.5) return 4
  if (avg >= 1) return 3
  if (avg >= 0.5) return 2
  return 1
}

function getToneFromSign(sign: ZodiacSign): GuidanceTone {
  const fireSign = ['aries', 'leo', 'sagittarius'].includes(sign)
  const earthSigns = ['taurus', 'virgo', 'capricorn'].includes(sign)
  const airSigns = ['gemini', 'libra', 'aquarius'].includes(sign)

  if (fireSign) return 'action_oriented'
  if (earthSigns) return 'cautious'
  if (airSigns) return 'encouraging'
  return 'reflective'
}

function getToneFromTransits(dailySky: DailySkyData, transits: TransitAspect[]): GuidanceTone {
  // Void of course moon = restorative
  if (dailySky.voidOfCourse.isVoid) return 'restorative'

  // Count harmonious vs challenging transits
  const harmonious = transits.filter(t => t.nature === 'harmonious').length
  const challenging = transits.filter(t => t.nature === 'challenging').length

  if (harmonious > challenging + 1) return 'encouraging'
  if (challenging > harmonious + 1) return 'cautious'

  // Check for major retrogrades
  const majorRetrogrades = dailySky.retrogrades.filter(p =>
    ['mercury', 'venus', 'mars'].includes(p)
  )
  if (majorRetrogrades.length > 0) return 'reflective'

  return 'action_oriented'
}

function generateDoList(
  chart: NatalChart,
  dailySky?: DailySkyData,
  transits?: TransitAspect[]
): string[] {
  const sunSign = chart.placements.find(p => p.planet === 'sun')?.sign || 'aries'

  const baseDos = [
    'Honor your natural rhythms today',
    'Make time for activities that energize you',
    'Connect with someone who understands you',
  ]

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

  const doList = [...baseDos, signAdvice[sunSign]]

  // Add transit-specific advice
  if (transits && transits.length > 0) {
    const harmonious = transits.find(t => t.nature === 'harmonious')
    if (harmonious) {
      const planetName = harmonious.transitingPlanet.charAt(0).toUpperCase() + harmonious.transitingPlanet.slice(1)
      doList.push(`Leverage the supportive ${planetName} energy for ${planetThemes[harmonious.transitingPlanet]?.keywords[0] || 'growth'}`)
    }
  }

  // Add moon-phase advice
  if (dailySky) {
    const phase = dailySky.moonPhase.name.toLowerCase()
    if (phase.includes('new')) doList.push('Set intentions and plant seeds for new beginnings')
    else if (phase.includes('full')) doList.push('Celebrate progress and release what no longer serves you')
    else if (phase.includes('waxing')) doList.push('Build momentum on projects already in motion')
  }

  return doList
}

function generateAvoidList(
  chart: NatalChart,
  dailySky?: DailySkyData
): string[] {
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

  // Add real sky data warnings
  if (dailySky) {
    if (dailySky.voidOfCourse.isVoid) {
      baseAvoids.push('Starting important new projects (Moon is void-of-course)')
    }

    if (dailySky.retrogrades.includes('mercury')) {
      baseAvoids.push('Signing contracts or making major communications without double-checking')
    }
  }

  return baseAvoids
}

function generateShortAdvice(
  moonSign: ZodiacSign,
  mercury: NatalPlacement | undefined,
  mars: NatalPlacement | undefined,
  dailySky?: DailySkyData,
  transits?: TransitAspect[]
): string {
  const moonInfo = signDescriptions[moonSign]

  let advice = `Today favors ${moonInfo.approach}. `

  // Add real transit context if available
  if (transits && transits.length > 0) {
    const primary = transits[0]
    const aspectInfo = aspectDescriptions[primary.aspect]
    if (aspectInfo) {
      advice += `${aspectInfo.action}. `
    }
  } else {
    if (mercury?.is_retrograde) {
      advice += 'Review communications carefully before sending. '
    }

    if (mars?.is_retrograde) {
      advice += 'Channel energy into reflection rather than action.'
    } else {
      advice += 'Your instincts are a reliable guide.'
    }
  }

  // Add moon phase context
  if (dailySky) {
    const phase = dailySky.moonPhase.name
    advice += ` The ${phase} supports ${phase.toLowerCase().includes('waxing') ? 'building and growing' : phase.toLowerCase().includes('waning') ? 'releasing and reflecting' : phase.toLowerCase().includes('full') ? 'culmination and celebration' : 'new beginnings and intention-setting'}.`
  }

  return advice.trim()
}

function calculateOverallIntensity(chart: NatalChart): IntensityLevel {
  const personalPlanets = chart.placements.filter(p =>
    ['sun', 'moon', 'mercury', 'venus', 'mars'].includes(p.planet)
  )

  const totalIntensity = personalPlanets.reduce((sum, p) => sum + calculateIntensity(p), 0)
  const avgIntensity = Math.round(totalIntensity / personalPlanets.length)

  return Math.max(1, Math.min(5, avgIntensity)) as IntensityLevel
}

function generateWindowSummary(area: FocusArea, chart: NatalChart, dailySky?: DailySkyData): string {
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

  // Add real context if available
  if (dailySky) {
    const retroPlanets = dailySky.retrogrades
    if (area === 'career' && retroPlanets.includes('mercury')) {
      return 'Mercury retrograde advises revisiting career plans rather than launching new ones. Review and refine.'
    }
    if (area === 'relationships' && retroPlanets.includes('venus')) {
      return 'Venus retrograde brings past relationship themes to the surface for healing. Reflect before acting.'
    }
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
