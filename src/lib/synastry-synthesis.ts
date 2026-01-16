/**
 * Synastry Synthesis Service
 *
 * Calculates relationship compatibility by comparing two natal charts.
 * Generates insights based on planetary aspects between charts.
 */

import type {
  NatalChart,
  NatalPlacement,
  Planet,
  ZodiacSign,
  AspectType,
  AspectNature,
} from '@/types'
import type { SynastryInsight } from '@/types'

interface SynastryResult {
  overall_dynamic: string
  supportive_connections: SynastryInsight[]
  friction_points: SynastryInsight[]
  growth_lesson: SynastryInsight
  practical_guidance: string[]
}

interface ChartAspect {
  planetA: Planet
  signA: ZodiacSign
  planetB: Planet
  signB: ZodiacSign
  aspect: AspectType
  nature: AspectNature
  orb: number
}

// Aspect definitions (degrees and orbs)
const aspectDefinitions: Record<AspectType, { degrees: number; orb: number }> = {
  conjunction: { degrees: 0, orb: 8 },
  opposition: { degrees: 180, orb: 8 },
  trine: { degrees: 120, orb: 8 },
  square: { degrees: 90, orb: 7 },
  sextile: { degrees: 60, orb: 6 },
  quincunx: { degrees: 150, orb: 3 },
}

// Planet interpretations for synastry
const planetSynastryMeanings: Record<Planet, {
  represents: string
  inRelationship: string
}> = {
  sun: {
    represents: 'core identity and ego',
    inRelationship: 'how you shine together and support each other\'s self-expression',
  },
  moon: {
    represents: 'emotional needs and comfort',
    inRelationship: 'emotional understanding and domestic harmony',
  },
  mercury: {
    represents: 'communication style',
    inRelationship: 'how you talk, think, and understand each other',
  },
  venus: {
    represents: 'love language and values',
    inRelationship: 'romantic attraction, affection, and shared pleasures',
  },
  mars: {
    represents: 'drive and desire',
    inRelationship: 'physical chemistry, how you handle conflict, and motivation',
  },
  jupiter: {
    represents: 'growth and optimism',
    inRelationship: 'how you expand each other\'s horizons and bring luck',
  },
  saturn: {
    represents: 'commitment and boundaries',
    inRelationship: 'longevity, responsibility, and potential restrictions',
  },
  uranus: {
    represents: 'freedom and uniqueness',
    inRelationship: 'excitement, unpredictability, and independence needs',
  },
  neptune: {
    represents: 'spirituality and dreams',
    inRelationship: 'spiritual connection, idealization, and potential illusions',
  },
  pluto: {
    represents: 'transformation and power',
    inRelationship: 'deep bonding, intensity, and potential power struggles',
  },
  north_node: {
    represents: 'destiny and growth direction',
    inRelationship: 'karmic connection and shared life purpose',
  },
  chiron: {
    represents: 'wounds and healing',
    inRelationship: 'how you heal each other and trigger growth through vulnerability',
  },
}

/**
 * Calculate synastry between two natal charts
 */
export function calculateSynastry(
  chartA: NatalChart,
  chartB: NatalChart,
  partnerName: string = 'Your Partner'
): SynastryResult {
  // Find aspects between the two charts
  const aspects = findInterChartAspects(chartA.placements, chartB.placements)

  // Categorize aspects
  const harmonious = aspects.filter(a => a.nature === 'harmonious')
  const challenging = aspects.filter(a => a.nature === 'challenging')
  const neutral = aspects.filter(a => a.nature === 'neutral')

  // Generate supportive connections (top 3 harmonious)
  const supportiveConnections = harmonious
    .slice(0, 3)
    .map(aspect => generateSupportiveInsight(aspect))

  // Generate friction points (top 2 challenging)
  const frictionPoints = challenging
    .slice(0, 2)
    .map(aspect => generateFrictionInsight(aspect))

  // Generate growth lesson from the most significant challenging aspect
  const growthLesson = generateGrowthLesson(challenging[0] || harmonious[0], chartA, chartB)

  // Generate overall dynamic
  const overallDynamic = generateOverallDynamic(
    chartA,
    chartB,
    harmonious.length,
    challenging.length,
    partnerName
  )

  // Generate practical guidance
  const practicalGuidance = generatePracticalGuidance(aspects, chartA, chartB)

  return {
    overall_dynamic: overallDynamic,
    supportive_connections: supportiveConnections,
    friction_points: frictionPoints,
    growth_lesson: growthLesson,
    practical_guidance: practicalGuidance,
  }
}

/**
 * Find aspects between two sets of placements
 */
function findInterChartAspects(
  placementsA: NatalPlacement[],
  placementsB: NatalPlacement[]
): ChartAspect[] {
  const aspects: ChartAspect[] = []

  // Key planets to compare
  const keyPlanets: Planet[] = ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn']

  for (const pA of placementsA.filter(p => keyPlanets.includes(p.planet))) {
    for (const pB of placementsB.filter(p => keyPlanets.includes(p.planet))) {
      const degreeA = getAbsoluteDegree(pA.sign, pA.degree)
      const degreeB = getAbsoluteDegree(pB.sign, pB.degree)

      const aspect = findAspect(degreeA, degreeB)
      if (aspect) {
        aspects.push({
          planetA: pA.planet,
          signA: pA.sign,
          planetB: pB.planet,
          signB: pB.sign,
          aspect: aspect.type,
          nature: aspect.nature,
          orb: aspect.orb,
        })
      }
    }
  }

  // Sort by tightness of orb (more exact aspects first)
  return aspects.sort((a, b) => a.orb - b.orb)
}

/**
 * Get absolute degree (0-360) from sign and degree
 */
function getAbsoluteDegree(sign: ZodiacSign, degree: number): number {
  const signOrder: ZodiacSign[] = [
    'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
    'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
  ]
  const signIndex = signOrder.indexOf(sign)
  return signIndex * 30 + degree
}

/**
 * Find aspect between two degrees
 */
function findAspect(degreeA: number, degreeB: number): {
  type: AspectType
  nature: AspectNature
  orb: number
} | null {
  let diff = Math.abs(degreeA - degreeB)
  if (diff > 180) diff = 360 - diff

  for (const [type, def] of Object.entries(aspectDefinitions)) {
    const orb = Math.abs(diff - def.degrees)
    if (orb <= def.orb) {
      return {
        type: type as AspectType,
        nature: getAspectNature(type as AspectType),
        orb,
      }
    }
  }
  return null
}

/**
 * Get aspect nature
 */
function getAspectNature(type: AspectType): AspectNature {
  if (['trine', 'sextile'].includes(type)) return 'harmonious'
  if (['square', 'opposition'].includes(type)) return 'challenging'
  return 'neutral'
}

/**
 * Generate supportive connection insight
 */
function generateSupportiveInsight(aspect: ChartAspect): SynastryInsight {
  const planetAInfo = planetSynastryMeanings[aspect.planetA]
  const planetBInfo = planetSynastryMeanings[aspect.planetB]
  const aspectName = aspect.aspect.charAt(0).toUpperCase() + aspect.aspect.slice(1)

  const titles: Record<string, string> = {
    'sun-moon': 'Natural Understanding',
    'sun-venus': 'Mutual Admiration',
    'moon-venus': 'Emotional Attunement',
    'venus-mars': 'Magnetic Attraction',
    'mercury-mercury': 'Intellectual Spark',
    'jupiter-sun': 'Shared Optimism',
    'jupiter-moon': 'Emotional Growth',
  }

  const key = `${aspect.planetA}-${aspect.planetB}`
  const reverseKey = `${aspect.planetB}-${aspect.planetA}`
  const title = titles[key] || titles[reverseKey] || `${capitalize(aspect.planetA)}-${capitalize(aspect.planetB)} Harmony`

  return {
    title,
    explanation: `Your ${capitalize(aspect.planetA)} forms a ${aspectName.toLowerCase()} with their ${capitalize(aspect.planetB)}, creating natural flow between ${planetAInfo.represents} and ${planetBInfo.represents}. This supports ${planetAInfo.inRelationship}.`,
    real_life_manifestation: generateManifestation(aspect, 'supportive'),
    contributing_aspects: [`${aspect.planetA}-${aspect.planetB}-${aspect.aspect}`],
  }
}

/**
 * Generate friction point insight
 */
function generateFrictionInsight(aspect: ChartAspect): SynastryInsight {
  const planetAInfo = planetSynastryMeanings[aspect.planetA]
  const planetBInfo = planetSynastryMeanings[aspect.planetB]
  const aspectName = aspect.aspect.charAt(0).toUpperCase() + aspect.aspect.slice(1)

  const titles: Record<string, string> = {
    'sun-saturn': 'Authority Dynamics',
    'moon-saturn': 'Emotional Caution',
    'mars-saturn': 'Action vs. Restriction',
    'venus-pluto': 'Intensity in Love',
    'mars-pluto': 'Power Struggles',
    'sun-pluto': 'Control Issues',
  }

  const key = `${aspect.planetA}-${aspect.planetB}`
  const reverseKey = `${aspect.planetB}-${aspect.planetA}`
  const title = titles[key] || titles[reverseKey] || `${capitalize(aspect.planetA)}-${capitalize(aspect.planetB)} Tension`

  return {
    title,
    explanation: `The ${aspectName.toLowerCase()} between your ${capitalize(aspect.planetA)} and their ${capitalize(aspect.planetB)} creates friction between ${planetAInfo.represents} and ${planetBInfo.represents}. This requires conscious attention to ${planetAInfo.inRelationship}.`,
    real_life_manifestation: generateManifestation(aspect, 'friction'),
    contributing_aspects: [`${aspect.planetA}-${aspect.planetB}-${aspect.aspect}`],
  }
}

/**
 * Generate real-life manifestation text
 */
function generateManifestation(aspect: ChartAspect, type: 'supportive' | 'friction'): string {
  const manifestations: Record<string, Record<string, string>> = {
    supportive: {
      'sun-moon': 'You feel seen and understood. Domestic life flows naturally together.',
      'venus-mars': 'Strong physical chemistry. You enjoy pursuing shared pleasures.',
      'mercury-mercury': 'Conversations flow easily. You finish each other\'s thoughts.',
      'jupiter-sun': 'You make each other more optimistic. Adventures feel natural.',
      default: 'This connection feels easy and supportive in daily life.',
    },
    friction: {
      'mars-saturn': 'Disagreements about timing and action. One feels held back.',
      'venus-pluto': 'Intense attachment that can become possessive if unchecked.',
      'sun-saturn': 'One may feel criticized or restricted by the other.',
      default: 'This requires patience and conscious effort to navigate.',
    },
  }

  const key = `${aspect.planetA}-${aspect.planetB}`
  const reverseKey = `${aspect.planetB}-${aspect.planetA}`

  return manifestations[type][key] ||
    manifestations[type][reverseKey] ||
    manifestations[type].default
}

/**
 * Generate growth lesson
 */
function generateGrowthLesson(
  aspect: ChartAspect | undefined,
  chartA: NatalChart,
  chartB: NatalChart
): SynastryInsight {
  if (!aspect) {
    return {
      title: 'Mutual Growth',
      explanation: 'This relationship offers opportunities for both of you to grow and evolve together.',
      real_life_manifestation: 'You challenge each other to become better versions of yourselves.',
      contributing_aspects: [],
    }
  }

  const lessons: Record<AspectNature, { title: string; lesson: string }> = {
    challenging: {
      title: 'Embracing Differences',
      lesson: 'Learning to honor different approaches and finding middle ground.',
    },
    harmonious: {
      title: 'Building on Strengths',
      lesson: 'Leveraging your natural compatibility to create something greater.',
    },
    neutral: {
      title: 'Conscious Connection',
      lesson: 'Bringing awareness and intention to how you relate.',
    },
  }

  const { title, lesson } = lessons[aspect.nature]

  return {
    title,
    explanation: `This relationship teaches you both about ${lesson} The ${aspect.aspect} between ${capitalize(aspect.planetA)} and ${capitalize(aspect.planetB)} is a key teacher here.`,
    real_life_manifestation: aspect.nature === 'challenging'
      ? 'Growth comes through working through differences, not avoiding them.'
      : 'Growth comes through building on what works naturally between you.',
    contributing_aspects: [`${aspect.planetA}-${aspect.planetB}-${aspect.aspect}`],
  }
}

/**
 * Generate overall dynamic description
 */
function generateOverallDynamic(
  chartA: NatalChart,
  chartB: NatalChart,
  harmoniousCount: number,
  challengingCount: number,
  partnerName: string
): string {
  const sunA = chartA.placements.find(p => p.planet === 'sun')
  const sunB = chartB.placements.find(p => p.planet === 'sun')
  const moonA = chartA.placements.find(p => p.planet === 'moon')
  const moonB = chartB.placements.find(p => p.planet === 'moon')

  const elementA = getElement(sunA?.sign || 'aries')
  const elementB = getElement(sunB?.sign || 'aries')

  let dynamic = ''

  if (elementA === elementB) {
    dynamic = `You share the same elemental energy (${elementA}), creating natural understanding. `
  } else if (areCompatibleElements(elementA, elementB)) {
    dynamic = `Your ${elementA} and ${elementB} energies complement each other well. `
  } else {
    dynamic = `Your ${elementA} meets their ${elementB}, creating dynamic contrast. `
  }

  if (harmoniousCount > challengingCount) {
    dynamic += `With more harmonious aspects (${harmoniousCount}) than challenging ones (${challengingCount}), this connection flows naturally. `
  } else if (challengingCount > harmoniousCount) {
    dynamic += `The ${challengingCount} challenging aspects between your charts suggest intensity and growth potential. `
  } else {
    dynamic += `The balance of harmonious and challenging aspects creates a well-rounded dynamic. `
  }

  dynamic += `This relationship offers both comfort and catalysts for growth.`

  return dynamic
}

/**
 * Generate practical guidance
 */
function generatePracticalGuidance(
  aspects: ChartAspect[],
  chartA: NatalChart,
  chartB: NatalChart
): string[] {
  const guidance: string[] = []

  // Check for Mercury aspects
  const mercuryAspects = aspects.filter(a =>
    a.planetA === 'mercury' || a.planetB === 'mercury'
  )
  if (mercuryAspects.length > 0) {
    const nature = mercuryAspects[0].nature
    if (nature === 'harmonious') {
      guidance.push('Your communication styles align well - use this for important conversations')
    } else {
      guidance.push('Be patient with different communication styles - clarify before assuming')
    }
  }

  // Check for Venus-Mars aspects
  const venusMarss = aspects.find(a =>
    (a.planetA === 'venus' && a.planetB === 'mars') ||
    (a.planetA === 'mars' && a.planetB === 'venus')
  )
  if (venusMarss) {
    guidance.push('Physical connection is important - make time for intimacy and shared pleasures')
  }

  // Check for Saturn aspects
  const saturnAspects = aspects.filter(a =>
    a.planetA === 'saturn' || a.planetB === 'saturn'
  )
  if (saturnAspects.length > 0) {
    guidance.push('Build structure together - shared goals and routines strengthen your bond')
  }

  // General guidance
  guidance.push('Schedule regular check-ins to discuss how you both feel about the relationship')
  guidance.push('Celebrate your differences as much as your similarities')

  return guidance.slice(0, 5)
}

/**
 * Get element from sign
 */
function getElement(sign: ZodiacSign): string {
  const elements: Record<ZodiacSign, string> = {
    aries: 'fire', leo: 'fire', sagittarius: 'fire',
    taurus: 'earth', virgo: 'earth', capricorn: 'earth',
    gemini: 'air', libra: 'air', aquarius: 'air',
    cancer: 'water', scorpio: 'water', pisces: 'water',
  }
  return elements[sign]
}

/**
 * Check element compatibility
 */
function areCompatibleElements(a: string, b: string): boolean {
  const compatible: Record<string, string[]> = {
    fire: ['air'],
    air: ['fire'],
    earth: ['water'],
    water: ['earth'],
  }
  return compatible[a]?.includes(b) || false
}

/**
 * Capitalize string
 */
function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
