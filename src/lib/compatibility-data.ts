/**
 * Zodiac Compatibility Data
 *
 * Data for all 78 unique zodiac sign pairs.
 */

export const ZODIAC_SIGNS = [
  'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
  'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
] as const

export type ZodiacSign = typeof ZODIAC_SIGNS[number]

export const SIGN_DISPLAY_NAMES: Record<ZodiacSign, string> = {
  aries: 'Aries',
  taurus: 'Taurus',
  gemini: 'Gemini',
  cancer: 'Cancer',
  leo: 'Leo',
  virgo: 'Virgo',
  libra: 'Libra',
  scorpio: 'Scorpio',
  sagittarius: 'Sagittarius',
  capricorn: 'Capricorn',
  aquarius: 'Aquarius',
  pisces: 'Pisces',
}

export const SIGN_SYMBOLS: Record<ZodiacSign, string> = {
  aries: '♈',
  taurus: '♉',
  gemini: '♊',
  cancer: '♋',
  leo: '♌',
  virgo: '♍',
  libra: '♎',
  scorpio: '♏',
  sagittarius: '♐',
  capricorn: '♑',
  aquarius: '♒',
  pisces: '♓',
}

export const SIGN_ELEMENTS: Record<ZodiacSign, 'fire' | 'earth' | 'air' | 'water'> = {
  aries: 'fire',
  taurus: 'earth',
  gemini: 'air',
  cancer: 'water',
  leo: 'fire',
  virgo: 'earth',
  libra: 'air',
  scorpio: 'water',
  sagittarius: 'fire',
  capricorn: 'earth',
  aquarius: 'air',
  pisces: 'water',
}

export interface CompatibilityData {
  sign1: ZodiacSign
  sign2: ZodiacSign
  overallScore: number
  loveScore: number
  friendshipScore: number
  communicationScore: number
  trustScore: number
  summary: string
  strengths: string[]
  challenges: string[]
  loveAdvice: string
  famousCouples?: string[]
}

// Element compatibility base scores
const ELEMENT_COMPATIBILITY: Record<string, number> = {
  'fire-fire': 85,
  'fire-air': 90,
  'fire-earth': 55,
  'fire-water': 50,
  'earth-earth': 85,
  'earth-water': 88,
  'earth-air': 60,
  'air-air': 82,
  'air-water': 55,
  'water-water': 90,
}

function getElementCompatibility(sign1: ZodiacSign, sign2: ZodiacSign): number {
  const el1 = SIGN_ELEMENTS[sign1]
  const el2 = SIGN_ELEMENTS[sign2]
  const key = [el1, el2].sort().join('-')
  return ELEMENT_COMPATIBILITY[key] || 70
}

// Generate compatibility data for a pair
function generateCompatibilityData(sign1: ZodiacSign, sign2: ZodiacSign): CompatibilityData {
  const baseScore = getElementCompatibility(sign1, sign2)
  const name1 = SIGN_DISPLAY_NAMES[sign1]
  const name2 = SIGN_DISPLAY_NAMES[sign2]
  const el1 = SIGN_ELEMENTS[sign1]
  const el2 = SIGN_ELEMENTS[sign2]

  // Vary scores slightly for different categories
  const variation = () => Math.floor(Math.random() * 10) - 5
  const loveScore = Math.min(100, Math.max(40, baseScore + variation()))
  const friendshipScore = Math.min(100, Math.max(40, baseScore + variation() + 5))
  const communicationScore = Math.min(100, Math.max(40, baseScore + variation()))
  const trustScore = Math.min(100, Math.max(40, baseScore + variation()))
  const overallScore = Math.round((loveScore + friendshipScore + communicationScore + trustScore) / 4)

  const sameSign = sign1 === sign2
  const sameElement = el1 === el2
  const opposites = Math.abs(ZODIAC_SIGNS.indexOf(sign1) - ZODIAC_SIGNS.indexOf(sign2)) === 6

  let summary = ''
  let strengths: string[] = []
  let challenges: string[] = []
  let loveAdvice = ''

  if (sameSign) {
    summary = `When two ${name1}s come together, they understand each other on a deep, intuitive level. This pairing shares the same strengths, desires, and ways of approaching life - for better or worse. The connection can be incredibly validating, but may also amplify shared weaknesses.`
    strengths = [
      'Deep mutual understanding',
      'Shared values and priorities',
      'Natural emotional attunement',
      'Similar communication styles',
    ]
    challenges = [
      'May amplify negative traits',
      'Can lack balancing perspectives',
      'Competition may arise',
      'Blind spots go unchecked',
    ]
    loveAdvice = `Two ${name1}s can build something beautiful together by celebrating your similarities while consciously developing the traits your sign typically lacks. Bring in outside perspectives and support each other's growth in weaker areas.`
  } else if (sameElement) {
    summary = `${name1} and ${name2} share the ${el1} element, creating a natural harmony and mutual understanding. You speak the same emotional language and approach life with similar energy. This elemental bond forms a strong foundation for lasting connection.`
    strengths = [
      `Shared ${el1} element creates natural flow`,
      'Intuitive understanding of each other',
      'Compatible life approaches',
      'Easy emotional connection',
    ]
    challenges = [
      'May lack balancing energies',
      'Similar weaknesses can compound',
      'Need to actively cultivate growth',
      'Can become too comfortable',
    ]
    loveAdvice = `Your ${el1} element connection gives you a head start, but don't let comfort breed complacency. Challenge each other to grow and bring in the qualities your element sometimes lacks.`
  } else if (opposites) {
    summary = `${name1} and ${name2} sit opposite each other on the zodiac wheel, creating one of astrology's most magnetic and challenging pairings. You're drawn together like magnets, each possessing what the other lacks. This relationship offers profound growth potential.`
    strengths = [
      'Powerful magnetic attraction',
      'Each completes what the other lacks',
      'Opportunities for deep growth',
      'Never boring - always dynamic',
    ]
    challenges = [
      'Fundamental differences in approach',
      'Power struggles possible',
      'Requires conscious compromise',
      'Can feel like opposites repelling',
    ]
    loveAdvice = `Your opposite sign connection is one of astrology's greatest teachers. Embrace what makes you different rather than trying to change each other. The goal is integration, not conversion.`
  } else {
    summary = `${name1} and ${name2} bring different elemental energies together - ${el1} meets ${el2}. This combination requires understanding and patience, but can create a beautifully balanced partnership where each person contributes unique strengths.`
    strengths = [
      'Complementary differences',
      'Opportunity to learn from each other',
      'Balanced perspectives',
      'Room for individual growth',
    ]
    challenges = [
      'Different communication styles',
      'May need to bridge elemental gaps',
      'Patience required for understanding',
      'Different emotional needs',
    ]
    loveAdvice = `Your elemental differences (${el1} and ${el2}) mean you'll need to learn each other's language. What seems obvious to you may be foreign to them. Practice patience and curiosity rather than judgment.`
  }

  return {
    sign1,
    sign2,
    overallScore,
    loveScore,
    friendshipScore,
    communicationScore,
    trustScore,
    summary,
    strengths,
    challenges,
    loveAdvice,
  }
}

// Generate all 78 unique pairs
export function getAllCompatibilityPairs(): string[] {
  const pairs: string[] = []
  for (let i = 0; i < ZODIAC_SIGNS.length; i++) {
    for (let j = i; j < ZODIAC_SIGNS.length; j++) {
      pairs.push(`${ZODIAC_SIGNS[i]}-${ZODIAC_SIGNS[j]}`)
    }
  }
  return pairs
}

// Normalize pair order (aries-leo and leo-aries both become aries-leo)
export function normalizePair(sign1: string, sign2: string): string {
  const s1 = sign1.toLowerCase() as ZodiacSign
  const s2 = sign2.toLowerCase() as ZodiacSign
  const idx1 = ZODIAC_SIGNS.indexOf(s1)
  const idx2 = ZODIAC_SIGNS.indexOf(s2)
  if (idx1 === -1 || idx2 === -1) return ''
  return idx1 <= idx2 ? `${s1}-${s2}` : `${s2}-${s1}`
}

// Get compatibility data for a pair
export function getCompatibilityData(pair: string): CompatibilityData | null {
  const parts = pair.toLowerCase().split('-')
  if (parts.length !== 2) return null

  const sign1 = parts[0] as ZodiacSign
  const sign2 = parts[1] as ZodiacSign

  if (!ZODIAC_SIGNS.includes(sign1) || !ZODIAC_SIGNS.includes(sign2)) {
    return null
  }

  return generateCompatibilityData(sign1, sign2)
}

// Check if a pair string is valid
export function isValidPair(pair: string): boolean {
  const parts = pair.toLowerCase().split('-')
  if (parts.length !== 2) return false
  return ZODIAC_SIGNS.includes(parts[0] as ZodiacSign) && ZODIAC_SIGNS.includes(parts[1] as ZodiacSign)
}
