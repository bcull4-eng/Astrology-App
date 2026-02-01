/**
 * Daily Horoscope Generation
 *
 * Generates personalized daily horoscopes based on natal chart placements
 * and the current date. When real transit data is available (from astrology-api.io),
 * it uses actual planetary positions, moon phase, and retrogrades. Otherwise
 * falls back to template-based content with date-seeded randomness.
 */

import type { NatalChart } from '@/types'
import type { DailySkyData, TransitAspect } from './astrology-api'

// Display sign type with capitalized names (for UI display)
type Sign = 'Aries' | 'Taurus' | 'Gemini' | 'Cancer' | 'Leo' | 'Virgo' |
            'Libra' | 'Scorpio' | 'Sagittarius' | 'Capricorn' | 'Aquarius' | 'Pisces'

export interface DailyHoroscope {
  date: string
  sunSign: Sign
  moonPhase: string
  overallEnergy: 'high' | 'moderate' | 'low'
  headline: string
  summary: string
  loveInsight: string
  careerInsight: string
  wellnessInsight: string
  luckyNumber: number
  luckyColor: string
  affirmation: string
  // New fields from real transit data (optional for backward compat)
  retrogrades?: string[]
  voidOfCourse?: boolean
  transitHighlights?: string[]
}

const SIGN_ORDER: Sign[] = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
]

// Daily themes that rotate through the week
const DAILY_THEMES = [
  { day: 0, planet: 'Sun', theme: 'self-expression', energy: 'high' as const },
  { day: 1, planet: 'Moon', theme: 'emotions', energy: 'moderate' as const },
  { day: 2, planet: 'Mars', theme: 'action', energy: 'high' as const },
  { day: 3, planet: 'Mercury', theme: 'communication', energy: 'moderate' as const },
  { day: 4, planet: 'Jupiter', theme: 'expansion', energy: 'high' as const },
  { day: 5, planet: 'Venus', theme: 'love', energy: 'moderate' as const },
  { day: 6, planet: 'Saturn', theme: 'discipline', energy: 'low' as const },
]

// Headlines by sign and theme
const HEADLINES: Record<string, Record<Sign, string>> = {
  'self-expression': {
    Aries: 'Your natural leadership shines through today',
    Taurus: 'Ground yourself in your authentic values',
    Gemini: 'Your curiosity opens unexpected doors',
    Cancer: 'Nurturing energy flows from your heart',
    Leo: 'Step into the spotlight with confidence',
    Virgo: 'Your attention to detail pays dividends',
    Libra: 'Harmony emerges from balanced choices',
    Scorpio: 'Transform challenges into opportunities',
    Sagittarius: 'Adventure awaits those who seek it',
    Capricorn: 'Your persistence builds lasting foundations',
    Aquarius: 'Innovation sparks from your unique perspective',
    Pisces: 'Trust your intuition to guide the way',
  },
  'emotions': {
    Aries: 'Channel passion into purposeful action',
    Taurus: 'Comfort comes from simple pleasures',
    Gemini: 'Share your feelings through conversation',
    Cancer: 'Deep emotional connections strengthen bonds',
    Leo: 'Express your heart with dramatic flair',
    Virgo: 'Analyze feelings without overthinking',
    Libra: 'Seek emotional equilibrium in relationships',
    Scorpio: 'Dive deep into your emotional truth',
    Sagittarius: 'Freedom and feelings find harmony',
    Capricorn: 'Structure supports emotional growth',
    Aquarius: 'Detachment offers fresh perspective',
    Pisces: 'Emotional waves carry creative inspiration',
  },
  'action': {
    Aries: 'Bold moves bring breakthrough moments',
    Taurus: 'Steady progress wins the race',
    Gemini: 'Multitasking serves your momentum',
    Cancer: 'Protect what matters with fierce love',
    Leo: 'Courage fuels your ambitious drive',
    Virgo: 'Methodical action achieves results',
    Libra: 'Strategic moves maintain balance',
    Scorpio: 'Focused intensity transforms obstacles',
    Sagittarius: 'Leap before you overthink',
    Capricorn: 'Disciplined effort builds empires',
    Aquarius: 'Revolutionary action sparks change',
    Pisces: 'Flow with circumstances, adapt wisely',
  },
  'communication': {
    Aries: 'Speak boldly, but listen too',
    Taurus: 'Words carry weight when chosen carefully',
    Gemini: 'Your verbal agility dazzles today',
    Cancer: 'Heart-to-heart talks deepen bonds',
    Leo: 'Your voice commands natural attention',
    Virgo: 'Precision in speech prevents confusion',
    Libra: 'Diplomatic words smooth rough edges',
    Scorpio: 'Unspoken truths demand expression',
    Sagittarius: 'Honest words inspire others',
    Capricorn: 'Communicate with authority and care',
    Aquarius: 'Unconventional ideas find receptive ears',
    Pisces: 'Poetry flows from your imagination',
  },
  'expansion': {
    Aries: 'New horizons call to your pioneer spirit',
    Taurus: 'Abundance grows from patient cultivation',
    Gemini: 'Learning opens limitless possibilities',
    Cancer: 'Expand your circle of care',
    Leo: 'Generosity multiplies your influence',
    Virgo: 'Growth comes through service to others',
    Libra: 'Partnerships expand your world',
    Scorpio: 'Transformation brings unexpected gifts',
    Sagittarius: 'The universe conspires in your favor',
    Capricorn: 'Ambition reaches new heights',
    Aquarius: 'Collective vision amplifies impact',
    Pisces: 'Spiritual expansion illuminates your path',
  },
  'love': {
    Aries: 'Passion ignites in unexpected moments',
    Taurus: 'Sensual delights await your appreciation',
    Gemini: 'Flirtatious energy sparkles around you',
    Cancer: 'Love deepens through vulnerability',
    Leo: 'Romance deserves dramatic gestures',
    Virgo: 'Love shows in thoughtful details',
    Libra: 'Partnership harmony reaches new levels',
    Scorpio: 'Intense connections reveal soul truths',
    Sagittarius: 'Love adventures expand your heart',
    Capricorn: 'Commitment strengthens loving bonds',
    Aquarius: 'Friendship forms the basis of love',
    Pisces: 'Romantic dreams weave into reality',
  },
  'discipline': {
    Aries: 'Patience tempers impulsive energy',
    Taurus: 'Persistence through challenges builds strength',
    Gemini: 'Focus scattered energy for impact',
    Cancer: 'Boundaries protect your sensitive heart',
    Leo: 'Humble effort earns lasting respect',
    Virgo: 'Your natural discipline finds reward',
    Libra: 'Balance requires conscious maintenance',
    Scorpio: 'Control your intensity strategically',
    Sagittarius: 'Freedom comes through responsibility',
    Capricorn: 'Your expertise reaches mastery',
    Aquarius: 'Structure enables innovation',
    Pisces: 'Grounding practices anchor your dreams',
  },
}

// Summaries based on energy level and sign element
const SUMMARIES: Record<'high' | 'moderate' | 'low', Record<string, string>> = {
  high: {
    fire: 'Today brings dynamic energy that fuels your natural enthusiasm. Channel this powerful current into meaningful action rather than scattered activity. Your passion is magnetic - use it wisely.',
    earth: 'Productive energy supports your practical goals today. The universe backs your efforts to build something lasting. Trust your instincts about material matters and take concrete steps forward.',
    air: 'Mental clarity and social connections flourish today. Your ideas find receptive audiences and conversations flow easily. Use this momentum to advance projects requiring collaboration.',
    water: 'Emotional intensity runs high, bringing deep insights and creative inspiration. Trust your intuition - it\'s especially accurate now. Channel feelings into artistic or healing pursuits.',
  },
  moderate: {
    fire: 'Steady warmth sustains your endeavors today. While not a day for dramatic leaps, consistent effort moves you forward. Tend to ongoing projects rather than starting new ventures.',
    earth: 'A grounded, stable energy supports careful progress. Focus on maintenance and refinement rather than expansion. Small improvements compound into significant results over time.',
    air: 'Thoughtful contemplation serves you better than rapid communication today. Take time to process ideas before sharing them. Quality connections matter more than quantity.',
    water: 'Gentle emotional currents invite reflection and restoration. Honor your need for quiet time. Insights emerge naturally when you create space for inner listening.',
  },
  low: {
    fire: 'Conserve your energy today rather than pushing through resistance. Rest and recovery now prevents burnout later. Trust that your natural vitality will return stronger.',
    earth: 'Patience is your ally when external progress slows. Use this time for planning and preparation. Solid foundations matter more than visible advancement.',
    air: 'Mental fog may cloud your usual clarity. Postpone important decisions if possible. Routine tasks that don\'t require sharp thinking are favored.',
    water: 'Emotional sensitivity requires extra self-care today. Create protective boundaries and avoid energy-draining situations. Solitude can be deeply restorative.',
  },
}

const LOVE_INSIGHTS: Record<Sign, string[]> = {
  Aries: [
    'Your directness in love is refreshing - someone appreciates your honesty.',
    'Slow down and let your partner lead occasionally.',
    'Passion runs high - channel it into romantic gestures.',
  ],
  Taurus: [
    'Physical affection strengthens your bonds today.',
    'Plan a sensory experience - good food, soft textures, beautiful surroundings.',
    'Stubbornness may create friction - flexibility opens hearts.',
  ],
  Gemini: [
    'Stimulating conversation deepens romantic connection.',
    'Your wit attracts attention - enjoy the playful energy.',
    'Commit to being present rather than multitasking in love.',
  ],
  Cancer: [
    'Create a cozy nest for intimate connection.',
    'Share your vulnerable side - it builds trust.',
    'Past patterns may surface - heal old wounds with compassion.',
  ],
  Leo: [
    'Grand romantic gestures make lasting impressions.',
    'Let your partner shine too - shared spotlight strengthens bonds.',
    'Your warmth draws admirers - enjoy the attention mindfully.',
  ],
  Virgo: [
    'Acts of service speak louder than words today.',
    'Release perfectionism in relationships - embrace beautiful imperfection.',
    'Health and wellness activities with a partner strengthen connection.',
  ],
  Libra: [
    'Partnership harmony peaks when you voice your needs.',
    'Aesthetic experiences enhance romantic bonds.',
    'Balance giving and receiving in equal measure.',
  ],
  Scorpio: [
    'Intensity in love creates profound moments.',
    'Trust builds through vulnerable truth-telling.',
    'Jealousy signals areas needing healing attention.',
  ],
  Sagittarius: [
    'Adventure with your partner creates lasting memories.',
    'Honest communication, even when uncomfortable, builds trust.',
    'Freedom within commitment is possible - discuss boundaries.',
  ],
  Capricorn: [
    'Demonstrate love through reliable presence.',
    'Career focus shouldn\'t overshadow relationship needs.',
    'Long-term planning with a partner strengthens your bond.',
  ],
  Aquarius: [
    'Friendship forms the foundation of lasting love.',
    'Unconventional expressions of affection feel authentic.',
    'Give partners space while remaining emotionally available.',
  ],
  Pisces: [
    'Romantic fantasies can manifest into reality today.',
    'Artistic collaboration with a loved one inspires both.',
    'Boundaries prevent losing yourself in another.',
  ],
}

const CAREER_INSIGHTS: Record<Sign, string[]> = {
  Aries: [
    'Initiative opens doors - propose that bold idea.',
    'Competition motivates your best work today.',
    'Leadership opportunities arise - step forward confidently.',
  ],
  Taurus: [
    'Steady progress outpaces rushed efforts.',
    'Financial negotiations favor your patient approach.',
    'Build on existing strengths rather than starting over.',
  ],
  Gemini: [
    'Networking expands professional possibilities.',
    'Written communication advances your agenda.',
    'Versatility is an asset - showcase multiple skills.',
  ],
  Cancer: [
    'Intuition guides wise business decisions.',
    'Nurturing work relationships pays dividends.',
    'Home-based work or projects flourish.',
  ],
  Leo: [
    'Creative projects deserve your full attention.',
    'Recognition comes to those who contribute generously.',
    'Present ideas with confidence and flair.',
  ],
  Virgo: [
    'Detail-oriented work yields excellent results.',
    'Systems and processes benefit from your refinement.',
    'Health-related career matters progress positively.',
  ],
  Libra: [
    'Partnerships and collaborations advance mutual goals.',
    'Diplomatic skills resolve workplace tensions.',
    'Design and aesthetic projects thrive.',
  ],
  Scorpio: [
    'Research and investigation reveal valuable insights.',
    'Strategic power moves advance your position.',
    'Financial matters require careful attention.',
  ],
  Sagittarius: [
    'Educational pursuits or teaching opportunities arise.',
    'International connections expand your reach.',
    'Publishing or broadcasting efforts gain traction.',
  ],
  Capricorn: [
    'Authority figures take notice of your dedication.',
    'Long-term career planning pays off.',
    'Structure and organization create efficiency.',
  ],
  Aquarius: [
    'Innovation distinguishes your contributions.',
    'Technology and digital projects advance.',
    'Group projects benefit from your unique perspective.',
  ],
  Pisces: [
    'Creative and artistic work flows effortlessly.',
    'Helping professions bring fulfillment.',
    'Intuitive insights guide career decisions.',
  ],
}

const WELLNESS_INSIGHTS: Record<Sign, string[]> = {
  Aries: [
    'High-intensity exercise channels excess energy productively.',
    'Impatience may cause tension headaches - practice deep breathing.',
    'Competitive sports satisfy your need for challenge.',
  ],
  Taurus: [
    'Indulge senses mindfully - quality over quantity nourishes.',
    'Neck and throat areas need gentle attention.',
    'Nature walks ground scattered energy.',
  ],
  Gemini: [
    'Mental stimulation is as important as physical exercise.',
    'Breathing exercises calm an overactive mind.',
    'Variety in workout routines prevents boredom.',
  ],
  Cancer: [
    'Emotional eating patterns may surface - notice triggers.',
    'Water-based activities soothe and restore.',
    'Home cooking nourishes body and soul.',
  ],
  Leo: [
    'Heart-healthy activities support your vital organ.',
    'Creative expression is a form of self-care.',
    'Posture awareness prevents back issues.',
  ],
  Virgo: [
    'Digestive health benefits from mindful eating.',
    'Don\'t let perfectionism create stress - good enough is enough.',
    'Detailed health tracking reveals useful patterns.',
  ],
  Libra: [
    'Balance is key - don\'t neglect rest for productivity.',
    'Kidney health benefits from adequate hydration.',
    'Partner workouts make exercise more enjoyable.',
  ],
  Scorpio: [
    'Intense emotions may manifest physically - address root causes.',
    'Detox practices support your transformative nature.',
    'Deep rest regenerates your powerful energy.',
  ],
  Sagittarius: [
    'Outdoor adventures satisfy your need for freedom.',
    'Hip and thigh areas benefit from stretching.',
    'Optimism is medicine - cultivate positive perspectives.',
  ],
  Capricorn: [
    'Joint health requires attention - don\'t ignore stiffness.',
    'Structure supports healthy habits.',
    'Work-life balance prevents burnout.',
  ],
  Aquarius: [
    'Circulation benefits from regular movement.',
    'Unconventional wellness practices may resonate.',
    'Community wellness activities satisfy social needs.',
  ],
  Pisces: [
    'Feet need care and attention today.',
    'Boundaries protect sensitive energy.',
    'Spiritual practices restore depleted reserves.',
  ],
}

const AFFIRMATIONS: Record<Sign, string[]> = {
  Aries: [
    'I channel my passion into purposeful action.',
    'My courage inspires others to be brave.',
    'I lead with confidence and compassion.',
  ],
  Taurus: [
    'I am worthy of abundance and comfort.',
    'My steady presence creates stability for others.',
    'I trust the timing of my life.',
  ],
  Gemini: [
    'My curiosity is a gift that opens doors.',
    'I communicate with clarity and kindness.',
    'I embrace all aspects of my multifaceted nature.',
  ],
  Cancer: [
    'My sensitivity is a strength, not a weakness.',
    'I create safe spaces for myself and others.',
    'My intuition guides me wisely.',
  ],
  Leo: [
    'I shine my light without dimming others.',
    'My creativity enriches the world.',
    'I am worthy of love and recognition.',
  ],
  Virgo: [
    'I release perfectionism and embrace progress.',
    'My attention to detail serves a greater purpose.',
    'I am enough exactly as I am.',
  ],
  Libra: [
    'I create harmony while honoring my needs.',
    'My relationships reflect my inner balance.',
    'I make decisions with confidence.',
  ],
  Scorpio: [
    'I transform challenges into opportunities.',
    'My intensity is a source of power.',
    'I release what no longer serves my growth.',
  ],
  Sagittarius: [
    'My optimism attracts positive experiences.',
    'I expand my horizons with every step.',
    'Freedom and responsibility coexist in my life.',
  ],
  Capricorn: [
    'My ambition serves the greater good.',
    'I build lasting foundations with patience.',
    'Success is my birthright.',
  ],
  Aquarius: [
    'My uniqueness contributes to collective evolution.',
    'I innovate while honoring tradition.',
    'I connect authentically while maintaining independence.',
  ],
  Pisces: [
    'My dreams have the power to manifest.',
    'I set boundaries while remaining compassionate.',
    'My sensitivity is my superpower.',
  ],
}

const COLORS = ['deep red', 'emerald green', 'royal blue', 'golden yellow', 'soft pink', 'rich purple', 'ocean teal', 'sunset orange', 'silver gray', 'forest green', 'coral', 'indigo']

// Fallback moon phases (used only when real data unavailable)
const MOON_PHASES = ['New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous', 'Full Moon', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent']

function getElement(sign: Sign): 'fire' | 'earth' | 'air' | 'water' {
  const elements: Record<Sign, 'fire' | 'earth' | 'air' | 'water'> = {
    Aries: 'fire', Leo: 'fire', Sagittarius: 'fire',
    Taurus: 'earth', Virgo: 'earth', Capricorn: 'earth',
    Gemini: 'air', Libra: 'air', Aquarius: 'air',
    Cancer: 'water', Scorpio: 'water', Pisces: 'water',
  }
  return elements[sign]
}

function seededRandom(seed: number): () => number {
  return () => {
    seed = (seed * 9301 + 49297) % 233280
    return seed / 233280
  }
}

function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0)
  const diff = date.getTime() - start.getTime()
  const oneDay = 1000 * 60 * 60 * 24
  return Math.floor(diff / oneDay)
}

// ---------- Transit-aware energy calculation ----------

function calculateEnergyFromTransits(
  sunSign: Sign,
  dailySky: DailySkyData,
  transits?: TransitAspect[]
): 'high' | 'moderate' | 'low' {
  let score = 50 // Base score

  // Factor in retrogrades (lower energy when more planets retrograde)
  const retroCount = dailySky.retrogrades.length
  score -= retroCount * 5

  // Factor in moon phase (full moon = high energy, new moon = low)
  const phaseName = (dailySky.moonPhase?.name ?? '').toLowerCase()
  if (phaseName.includes('full')) score += 15
  else if (phaseName.includes('new')) score -= 5
  else if (phaseName.includes('waxing')) score += 8
  else if (phaseName.includes('waning')) score -= 3

  // Void-of-course moon reduces productive energy
  if (dailySky.voidOfCourse?.isVoid) score -= 10

  // Factor in personal transits if available
  if (transits && transits.length > 0) {
    for (const transit of transits) {
      if (transit.nature === 'harmonious') score += 6
      else if (transit.nature === 'challenging') score -= 4
      // Tight orbs amplify effect
      if (transit.orb < 2) score += (transit.nature === 'harmonious' ? 3 : -2)
    }
  }

  if (score >= 65) return 'high'
  if (score >= 40) return 'moderate'
  return 'low'
}

// ---------- Transit highlight descriptions ----------

const PLANET_DISPLAY: Record<string, string> = {
  sun: 'the Sun', moon: 'the Moon', mercury: 'Mercury', venus: 'Venus',
  mars: 'Mars', jupiter: 'Jupiter', saturn: 'Saturn', uranus: 'Uranus',
  neptune: 'Neptune', pluto: 'Pluto', north_node: 'the North Node', chiron: 'Chiron',
}

const ASPECT_DISPLAY: Record<string, string> = {
  conjunction: 'conjunct', opposition: 'opposite', trine: 'trine',
  square: 'square', sextile: 'sextile', quincunx: 'quincunx',
}

function describeTransit(transit: TransitAspect): string {
  const transiting = PLANET_DISPLAY[transit.transitingPlanet] || transit.transitingPlanet
  const natal = PLANET_DISPLAY[transit.natalPlanet] || transit.natalPlanet
  const aspect = ASPECT_DISPLAY[transit.aspect] || transit.aspect
  return `${transiting} ${aspect} your natal ${natal}`
}

// ---------- Main generation function ----------

export function generateDailyHoroscope(
  chart: NatalChart,
  date: Date = new Date(),
  dailySky?: DailySkyData,
  userTransits?: TransitAspect[]
): DailyHoroscope {
  const sunPlacement = chart.placements.find(p => p.planet.toLowerCase() === 'sun')
  const sunSign = (sunPlacement?.sign ?
    sunPlacement.sign.charAt(0).toUpperCase() + sunPlacement.sign.slice(1).toLowerCase() :
    'Aries') as Sign

  // Create deterministic randomness based on date and sun sign
  const dayOfYear = getDayOfYear(date)
  const signIndex = SIGN_ORDER.indexOf(sunSign)
  const seed = dayOfYear * 1000 + signIndex + date.getFullYear()
  const random = seededRandom(seed)

  // Get daily theme based on day of week
  const dayOfWeek = date.getDay()
  const dailyTheme = DAILY_THEMES[dayOfWeek]

  // Moon phase: use real data if available, otherwise approximate
  let moonPhase: string
  if (dailySky?.moonPhase?.name) {
    moonPhase = dailySky.moonPhase.name
  } else {
    const lunarCycle = 29.5
    const knownNewMoon = new Date('2024-01-11').getTime()
    const daysSinceNewMoon = (date.getTime() - knownNewMoon) / (1000 * 60 * 60 * 24)
    const moonPhaseIndex = Math.floor((daysSinceNewMoon % lunarCycle) / (lunarCycle / 8))
    moonPhase = MOON_PHASES[moonPhaseIndex % 8]
  }

  // Overall energy: use real transit data if available
  let overallEnergy: 'high' | 'moderate' | 'low'
  if (dailySky) {
    overallEnergy = calculateEnergyFromTransits(sunSign, dailySky, userTransits)
  } else {
    overallEnergy = dailyTheme.energy
  }

  // Get headline based on theme
  const headline = HEADLINES[dailyTheme.theme][sunSign]

  // Get summary based on energy and element
  const element = getElement(sunSign)
  const summary = SUMMARIES[overallEnergy][element]

  // Select insights based on seeded randomness
  const loveIndex = Math.floor(random() * LOVE_INSIGHTS[sunSign].length)
  const careerIndex = Math.floor(random() * CAREER_INSIGHTS[sunSign].length)
  const wellnessIndex = Math.floor(random() * WELLNESS_INSIGHTS[sunSign].length)
  const affirmationIndex = Math.floor(random() * AFFIRMATIONS[sunSign].length)

  // Lucky number (1-99) and color
  const luckyNumber = Math.floor(random() * 99) + 1
  const colorIndex = Math.floor(random() * COLORS.length)

  // Build transit highlights if real data available
  const transitHighlights = userTransits
    ?.slice(0, 3) // Top 3 most relevant
    .map(describeTransit)

  // Build retrograde list if real data available
  const retrogrades = dailySky?.retrogrades.map(
    p => (PLANET_DISPLAY[p] || p).replace(/^the /, '')
  )

  return {
    date: date.toISOString().split('T')[0],
    sunSign,
    moonPhase,
    overallEnergy,
    headline,
    summary,
    loveInsight: LOVE_INSIGHTS[sunSign][loveIndex],
    careerInsight: CAREER_INSIGHTS[sunSign][careerIndex],
    wellnessInsight: WELLNESS_INSIGHTS[sunSign][wellnessIndex],
    luckyNumber,
    luckyColor: COLORS[colorIndex],
    affirmation: AFFIRMATIONS[sunSign][affirmationIndex],
    retrogrades,
    voidOfCourse: dailySky?.voidOfCourse?.isVoid,
    transitHighlights,
  }
}
