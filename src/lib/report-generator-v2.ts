/**
 * Report Generator V2
 *
 * Generates comprehensive, educational astrology reports with
 * rich personalized content, visual data, and interactive elements.
 */

import type { NatalChart, ReportSlug, NatalPlacement } from '@/types'

// Display sign type with capitalized names
type Sign = 'Aries' | 'Taurus' | 'Gemini' | 'Cancer' | 'Leo' | 'Virgo' |
            'Libra' | 'Scorpio' | 'Sagittarius' | 'Capricorn' | 'Aquarius' | 'Pisces'

// Extended report types for visual and interactive content
export interface ReportVisual {
  type: 'chart-wheel' | 'element-balance' | 'modality-balance' | 'aspect-grid' | 'house-emphasis' | 'planetary-strength' | 'compatibility-meter' | 'yearly-timeline' | 'birth-chart-wheel'
  title: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, number | string> | any[]
}

export interface ReportTerm {
  term: string
  definition: string
}

export interface ReportSectionV2 {
  id: string
  title: string
  icon?: string
  subsections: {
    title: string
    content: string
    visual?: ReportVisual
    terms?: ReportTerm[]
    tip?: string
  }[]
}

export interface GeneratedReportV2 {
  id: string
  slug: ReportSlug
  title: string
  generatedAt: string
  userName: string
  partnerName?: string
  birthData: {
    date: string
    time?: string
    place: string
    sunSign: string
    moonSign: string
    risingSign: string
  }
  partnerBirthData?: {
    date: string
    time?: string
    place: string
  }
  summary: {
    headline: string
    overview: string
    keyStrengths: string[]
    growthAreas: string[]
  }
  visuals: ReportVisual[]
  sections: ReportSectionV2[]
  glossary: ReportTerm[]
  wordCount: number
}

// Helper functions
function capitalizeSign(sign: string): Sign {
  return (sign.charAt(0).toUpperCase() + sign.slice(1).toLowerCase()) as Sign
}

function getPlacement(chart: NatalChart, planet: string): NatalPlacement | undefined {
  return chart.placements.find((p) => p.planet.toLowerCase() === planet.toLowerCase())
}

// Sign data with extensive descriptions
export const signData: Record<Sign, {
  element: 'Fire' | 'Earth' | 'Air' | 'Water'
  modality: 'Cardinal' | 'Fixed' | 'Mutable'
  ruler: string
  symbol: string
  keywords: string[]
  strengths: string[]
  challenges: string[]
  archetype: string
  lifeLesson: string
  shadowSide: string
  giftToWorld: string
}> = {
  Aries: {
    element: 'Fire',
    modality: 'Cardinal',
    ruler: 'Mars',
    symbol: 'The Ram',
    keywords: ['pioneering', 'courageous', 'independent', 'direct', 'competitive'],
    strengths: ['Natural leadership', 'Courage under pressure', 'Quick decision-making', 'Infectious enthusiasm'],
    challenges: ['Impatience', 'Impulsiveness', 'Difficulty with follow-through', 'Can be self-centered'],
    archetype: 'The Warrior/Pioneer',
    lifeLesson: 'Learning to channel raw courage into sustained action while considering others',
    shadowSide: 'Aggression, selfishness, and recklessness when unbalanced',
    giftToWorld: 'The courage to begin, to fight for what matters, and to lead others into new territory',
  },
  Taurus: {
    element: 'Earth',
    modality: 'Fixed',
    ruler: 'Venus',
    symbol: 'The Bull',
    keywords: ['stable', 'sensual', 'patient', 'determined', 'practical'],
    strengths: ['Reliability', 'Patience', 'Appreciation of beauty', 'Strong values', 'Physical stamina'],
    challenges: ['Stubbornness', 'Resistance to change', 'Possessiveness', 'Over-indulgence'],
    archetype: 'The Builder/Stabilizer',
    lifeLesson: 'Learning that true security comes from within, not from possessions',
    shadowSide: 'Greed, laziness, and rigid attachment to comfort zones',
    giftToWorld: 'Creating lasting beauty and stability, showing the value of patience',
  },
  Gemini: {
    element: 'Air',
    modality: 'Mutable',
    ruler: 'Mercury',
    symbol: 'The Twins',
    keywords: ['curious', 'versatile', 'communicative', 'witty', 'adaptable'],
    strengths: ['Mental agility', 'Communication skills', 'Adaptability', 'Youthful energy', 'Networking'],
    challenges: ['Inconsistency', 'Superficiality', 'Nervousness', 'Difficulty with commitment'],
    archetype: 'The Messenger/Storyteller',
    lifeLesson: 'Learning to integrate diverse interests into wisdom rather than scattered knowledge',
    shadowSide: 'Manipulation through words, duplicity, and mental anxiety',
    giftToWorld: 'Connecting people and ideas, making complex concepts accessible',
  },
  Cancer: {
    element: 'Water',
    modality: 'Cardinal',
    ruler: 'Moon',
    symbol: 'The Crab',
    keywords: ['nurturing', 'protective', 'intuitive', 'emotional', 'domestic'],
    strengths: ['Emotional intelligence', 'Nurturing ability', 'Strong intuition', 'Loyalty', 'Memory'],
    challenges: ['Moodiness', 'Over-sensitivity', 'Clinginess', 'Living in the past'],
    archetype: 'The Nurturer/Mother',
    lifeLesson: 'Learning to nurture without smothering, and to feel without drowning',
    shadowSide: 'Emotional manipulation, victim mentality, and fear-based protection',
    giftToWorld: 'Creating emotional safety, preserving memories and traditions',
  },
  Leo: {
    element: 'Fire',
    modality: 'Fixed',
    ruler: 'Sun',
    symbol: 'The Lion',
    keywords: ['confident', 'creative', 'generous', 'dramatic', 'loyal'],
    strengths: ['Natural charisma', 'Creativity', 'Generosity', 'Courage', 'Leadership'],
    challenges: ['Pride', 'Need for attention', 'Stubbornness', 'Dramatic reactions'],
    archetype: 'The King/Queen/Performer',
    lifeLesson: 'Learning to shine authentically without needing external validation',
    shadowSide: 'Ego inflation, attention-seeking, and inability to share the spotlight',
    giftToWorld: 'Inspiring others through creative self-expression and generous leadership',
  },
  Virgo: {
    element: 'Earth',
    modality: 'Mutable',
    ruler: 'Mercury',
    symbol: 'The Virgin/Maiden',
    keywords: ['analytical', 'practical', 'helpful', 'detail-oriented', 'modest'],
    strengths: ['Analytical mind', 'Attention to detail', 'Service orientation', 'Health consciousness', 'Reliability'],
    challenges: ['Perfectionism', 'Over-criticism', 'Worry', 'Difficulty seeing big picture'],
    archetype: 'The Healer/Analyst',
    lifeLesson: 'Learning that imperfection is part of wholeness, and that being is as valuable as doing',
    shadowSide: 'Harsh self-criticism, anxiety, and using criticism as a defense',
    giftToWorld: 'Improving systems, healing through practical care, and humble service',
  },
  Libra: {
    element: 'Air',
    modality: 'Cardinal',
    ruler: 'Venus',
    symbol: 'The Scales',
    keywords: ['diplomatic', 'harmonious', 'fair', 'social', 'aesthetic'],
    strengths: ['Diplomacy', 'Aesthetic sense', 'Fairness', 'Charm', 'Partnership ability'],
    challenges: ['Indecision', 'People-pleasing', 'Avoiding conflict', 'Superficiality'],
    archetype: 'The Diplomat/Artist',
    lifeLesson: 'Learning to find inner balance rather than seeking it through others',
    shadowSide: 'Codependency, passive-aggression, and sacrificing self for harmony',
    giftToWorld: 'Creating beauty and harmony, mediating conflicts, celebrating partnership',
  },
  Scorpio: {
    element: 'Water',
    modality: 'Fixed',
    ruler: 'Pluto',
    symbol: 'The Scorpion',
    keywords: ['intense', 'transformative', 'passionate', 'perceptive', 'powerful'],
    strengths: ['Emotional depth', 'Determination', 'Psychological insight', 'Loyalty', 'Regenerative power'],
    challenges: ['Jealousy', 'Secretiveness', 'Vindictiveness', 'Control issues'],
    archetype: 'The Transformer/Detective',
    lifeLesson: 'Learning to transform pain into power without wielding power destructively',
    shadowSide: 'Manipulation, obsession, and using emotional intensity as a weapon',
    giftToWorld: 'Deep healing, uncovering truth, and guiding others through transformation',
  },
  Sagittarius: {
    element: 'Fire',
    modality: 'Mutable',
    ruler: 'Jupiter',
    symbol: 'The Archer',
    keywords: ['adventurous', 'optimistic', 'philosophical', 'honest', 'freedom-loving'],
    strengths: ['Optimism', 'Vision', 'Honesty', 'Adventurousness', 'Teaching ability'],
    challenges: ['Over-promise', 'Tactlessness', 'Restlessness', 'Preachy tendencies'],
    archetype: 'The Explorer/Philosopher',
    lifeLesson: 'Learning that true freedom comes with responsibility and commitment',
    shadowSide: 'Dogmatism, escapism, and using brutal honesty as an excuse for insensitivity',
    giftToWorld: 'Expanding horizons, sharing wisdom, and maintaining faith in possibility',
  },
  Capricorn: {
    element: 'Earth',
    modality: 'Cardinal',
    ruler: 'Saturn',
    symbol: 'The Sea-Goat',
    keywords: ['ambitious', 'disciplined', 'practical', 'responsible', 'traditional'],
    strengths: ['Ambition', 'Discipline', 'Patience', 'Strategic thinking', 'Integrity'],
    challenges: ['Workaholism', 'Pessimism', 'Rigidity', 'Emotional suppression'],
    archetype: 'The Elder/CEO',
    lifeLesson: 'Learning that success without joy is hollow, and that vulnerability is strength',
    shadowSide: 'Cold ambition, using status as identity, and inability to rest',
    giftToWorld: 'Building lasting structures, modeling integrity, and wise leadership',
  },
  Aquarius: {
    element: 'Air',
    modality: 'Fixed',
    ruler: 'Uranus',
    symbol: 'The Water Bearer',
    keywords: ['innovative', 'humanitarian', 'independent', 'unconventional', 'intellectual'],
    strengths: ['Originality', 'Humanitarian vision', 'Objectivity', 'Friendship', 'Progressive thinking'],
    challenges: ['Detachment', 'Rebelliousness', 'Unpredictability', 'Emotional aloofness'],
    archetype: 'The Visionary/Revolutionary',
    lifeLesson: 'Learning to balance individuality with belonging, and intellect with emotion',
    shadowSide: 'Coldness, contrarianism for its own sake, and alienation from feelings',
    giftToWorld: 'Innovation for collective benefit, championing equality, and original thinking',
  },
  Pisces: {
    element: 'Water',
    modality: 'Mutable',
    ruler: 'Neptune',
    symbol: 'The Fish',
    keywords: ['compassionate', 'intuitive', 'artistic', 'spiritual', 'empathetic'],
    strengths: ['Compassion', 'Artistic ability', 'Spiritual connection', 'Imagination', 'Healing presence'],
    challenges: ['Escapism', 'Victim mentality', 'Boundary issues', 'Confusion'],
    archetype: 'The Mystic/Artist',
    lifeLesson: 'Learning to maintain boundaries while staying open, and to ground spiritual gifts',
    shadowSide: 'Addiction, martyrdom, and using sensitivity as an excuse for irresponsibility',
    giftToWorld: 'Unconditional compassion, artistic inspiration, and spiritual connection',
  },
}

// House meanings with detailed descriptions
const houseData: Record<number, {
  name: string
  theme: string
  keywords: string[]
  questions: string[]
  bodyPart: string
}> = {
  1: {
    name: 'House of Self',
    theme: 'Identity, appearance, and how you meet the world',
    keywords: ['self-image', 'personality', 'physical body', 'first impressions', 'beginnings'],
    questions: ['Who am I?', 'How do I present myself?', 'What is my approach to life?'],
    bodyPart: 'Head and face',
  },
  2: {
    name: 'House of Value',
    theme: 'Resources, money, and self-worth',
    keywords: ['finances', 'possessions', 'values', 'self-esteem', 'material security'],
    questions: ['What do I value?', 'How do I earn money?', 'What makes me feel secure?'],
    bodyPart: 'Throat and neck',
  },
  3: {
    name: 'House of Communication',
    theme: 'Mind, learning, and immediate environment',
    keywords: ['communication', 'siblings', 'short trips', 'early education', 'neighbors'],
    questions: ['How do I think and learn?', 'How do I communicate?', 'What is my mental style?'],
    bodyPart: 'Arms, hands, and lungs',
  },
  4: {
    name: 'House of Home',
    theme: 'Roots, family, and emotional foundation',
    keywords: ['home', 'family', 'ancestry', 'emotional security', 'private life'],
    questions: ['Where do I come from?', 'What is my emotional foundation?', 'What feels like home?'],
    bodyPart: 'Chest and stomach',
  },
  5: {
    name: 'House of Creativity',
    theme: 'Self-expression, romance, and joy',
    keywords: ['creativity', 'romance', 'children', 'pleasure', 'self-expression'],
    questions: ['What brings me joy?', 'How do I express creatively?', 'What do I create?'],
    bodyPart: 'Heart and upper back',
  },
  6: {
    name: 'House of Service',
    theme: 'Health, work, and daily routines',
    keywords: ['health', 'work', 'service', 'routines', 'pets'],
    questions: ['How do I serve?', 'What are my daily habits?', 'How do I maintain health?'],
    bodyPart: 'Digestive system',
  },
  7: {
    name: 'House of Partnership',
    theme: 'Relationships, marriage, and significant others',
    keywords: ['marriage', 'partnerships', 'contracts', 'open enemies', 'the other'],
    questions: ['Who do I attract?', 'What do I seek in partnership?', 'How do I relate one-on-one?'],
    bodyPart: 'Kidneys and lower back',
  },
  8: {
    name: 'House of Transformation',
    theme: 'Shared resources, intimacy, and rebirth',
    keywords: ['death', 'rebirth', 'shared resources', 'intimacy', 'psychology'],
    questions: ['What must I transform?', 'How do I handle shared power?', 'What lies beneath?'],
    bodyPart: 'Reproductive organs',
  },
  9: {
    name: 'House of Philosophy',
    theme: 'Higher learning, travel, and meaning',
    keywords: ['higher education', 'philosophy', 'long journeys', 'beliefs', 'publishing'],
    questions: ['What do I believe?', 'What gives life meaning?', 'Where do I seek expansion?'],
    bodyPart: 'Hips and thighs',
  },
  10: {
    name: 'House of Career',
    theme: 'Public life, reputation, and life direction',
    keywords: ['career', 'reputation', 'authority', 'public image', 'achievement'],
    questions: ['What is my calling?', 'How am I seen publicly?', 'What do I achieve?'],
    bodyPart: 'Knees and skeletal system',
  },
  11: {
    name: 'House of Community',
    theme: 'Friends, groups, and hopes for the future',
    keywords: ['friends', 'groups', 'hopes', 'wishes', 'social causes'],
    questions: ['What are my hopes?', 'Who are my people?', 'How do I contribute to the collective?'],
    bodyPart: 'Ankles and circulatory system',
  },
  12: {
    name: 'House of the Unconscious',
    theme: 'Spirituality, hidden matters, and transcendence',
    keywords: ['unconscious', 'spirituality', 'hidden enemies', 'solitude', 'endings'],
    questions: ['What is hidden?', 'How do I connect to the divine?', 'What must I release?'],
    bodyPart: 'Feet and lymphatic system',
  },
}

// Planet meanings
const planetData: Record<string, {
  name: string
  symbol: string
  keywords: string[]
  represents: string
  question: string
}> = {
  sun: { name: 'Sun', symbol: '☉', keywords: ['identity', 'ego', 'vitality', 'purpose'], represents: 'Your core self, vitality, and life purpose', question: 'Who am I at my core?' },
  moon: { name: 'Moon', symbol: '☽', keywords: ['emotions', 'instincts', 'needs', 'mother'], represents: 'Your emotional nature, needs, and instinctive reactions', question: 'What do I need to feel safe?' },
  mercury: { name: 'Mercury', symbol: '☿', keywords: ['mind', 'communication', 'learning', 'perception'], represents: 'How you think, communicate, and process information', question: 'How do I think and communicate?' },
  venus: { name: 'Venus', symbol: '♀', keywords: ['love', 'beauty', 'values', 'pleasure'], represents: 'What you find beautiful, how you love, and what you value', question: 'What do I love and value?' },
  mars: { name: 'Mars', symbol: '♂', keywords: ['action', 'desire', 'anger', 'drive'], represents: 'How you assert yourself, pursue goals, and handle conflict', question: 'How do I go after what I want?' },
  jupiter: { name: 'Jupiter', symbol: '♃', keywords: ['growth', 'luck', 'wisdom', 'expansion'], represents: 'Where you find growth, abundance, and meaning', question: 'Where do I find expansion and luck?' },
  saturn: { name: 'Saturn', symbol: '♄', keywords: ['discipline', 'limits', 'mastery', 'time'], represents: 'Your challenges, fears, and areas of eventual mastery', question: 'What must I work hard to master?' },
  uranus: { name: 'Uranus', symbol: '♅', keywords: ['change', 'innovation', 'rebellion', 'freedom'], represents: 'Where you break from convention and seek freedom', question: 'Where do I need to break free?' },
  neptune: { name: 'Neptune', symbol: '♆', keywords: ['dreams', 'spirituality', 'illusion', 'transcendence'], represents: 'Your spiritual connection, imagination, and potential blind spots', question: 'What is my spiritual calling?' },
  pluto: { name: 'Pluto', symbol: '♇', keywords: ['transformation', 'power', 'death', 'rebirth'], represents: 'Where you experience deep transformation and reclaim power', question: 'What must I transform?' },
  north_node: { name: 'North Node', symbol: '☊', keywords: ['destiny', 'growth', 'life path', 'future'], represents: 'Your soul\'s growth direction and life purpose', question: 'What am I growing toward?' },
  chiron: { name: 'Chiron', symbol: '⚷', keywords: ['wound', 'healing', 'teaching', 'wisdom'], represents: 'Your deepest wound that becomes your greatest gift', question: 'What wound do I carry that I can help others heal?' },
}

function calculateElementBalance(chart: NatalChart): Record<string, number> {
  const elements: Record<string, number> = { Fire: 0, Earth: 0, Air: 0, Water: 0 }
  const mainPlanets = ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn']

  for (const placement of chart.placements) {
    if (mainPlanets.includes(placement.planet)) {
      const sign = capitalizeSign(placement.sign)
      const element = signData[sign]?.element
      if (element) {
        // Weight personal planets more heavily
        const weight = ['sun', 'moon'].includes(placement.planet) ? 3 :
                       ['mercury', 'venus', 'mars'].includes(placement.planet) ? 2 : 1
        elements[element] += weight
      }
    }
  }
  return elements
}

function calculateModalityBalance(chart: NatalChart): Record<string, number> {
  const modalities: Record<string, number> = { Cardinal: 0, Fixed: 0, Mutable: 0 }
  const mainPlanets = ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn']

  for (const placement of chart.placements) {
    if (mainPlanets.includes(placement.planet)) {
      const sign = capitalizeSign(placement.sign)
      const modality = signData[sign]?.modality
      if (modality) {
        const weight = ['sun', 'moon'].includes(placement.planet) ? 3 :
                       ['mercury', 'venus', 'mars'].includes(placement.planet) ? 2 : 1
        modalities[modality] += weight
      }
    }
  }
  return modalities
}

function getDominantElement(elements: Record<string, number>): string {
  return Object.entries(elements).sort((a, b) => b[1] - a[1])[0][0]
}

function getDominantModality(modalities: Record<string, number>): string {
  return Object.entries(modalities).sort((a, b) => b[1] - a[1])[0][0]
}

function getHouseEmphasis(chart: NatalChart): Record<number, number> {
  const houses: Record<number, number> = {}
  for (let i = 1; i <= 12; i++) houses[i] = 0

  for (const placement of chart.placements) {
    if (placement.house >= 1 && placement.house <= 12) {
      const weight = ['sun', 'moon'].includes(placement.planet) ? 3 :
                     ['mercury', 'venus', 'mars'].includes(placement.planet) ? 2 : 1
      houses[placement.house] += weight
    }
  }
  return houses
}

export function generatePersonalityReportV2(chart: NatalChart, userName: string): GeneratedReportV2 {
  const sun = getPlacement(chart, 'sun')
  const moon = getPlacement(chart, 'moon')
  const mercury = getPlacement(chart, 'mercury')
  const venus = getPlacement(chart, 'venus')
  const mars = getPlacement(chart, 'mars')
  const jupiter = getPlacement(chart, 'jupiter')
  const saturn = getPlacement(chart, 'saturn')
  const uranus = getPlacement(chart, 'uranus')
  const neptune = getPlacement(chart, 'neptune')
  const pluto = getPlacement(chart, 'pluto')
  const northNode = getPlacement(chart, 'north_node')
  const chiron = getPlacement(chart, 'chiron')

  const sunSign = capitalizeSign(sun?.sign || 'leo')
  const moonSign = capitalizeSign(moon?.sign || 'cancer')
  const risingSign = capitalizeSign(chart.ascendant?.sign || sun?.sign || 'leo')
  const mercurySign = capitalizeSign(mercury?.sign || sun?.sign || 'leo')
  const venusSign = capitalizeSign(venus?.sign || 'libra')
  const marsSign = capitalizeSign(mars?.sign || 'aries')
  const jupiterSign = capitalizeSign(jupiter?.sign || 'sagittarius')
  const saturnSign = capitalizeSign(saturn?.sign || 'capricorn')

  const sunHouse = sun?.house || 1
  const moonHouse = moon?.house || 4
  const mercuryHouse = mercury?.house || 3
  const venusHouse = venus?.house || 7
  const marsHouse = mars?.house || 1

  const sunData = signData[sunSign]
  const moonData = signData[moonSign]
  const risingData = signData[risingSign]
  const mercuryData = signData[mercurySign]
  const venusData = signData[venusSign]
  const marsData = signData[marsSign]

  const elements = calculateElementBalance(chart)
  const modalities = calculateModalityBalance(chart)
  const dominantElement = getDominantElement(elements)
  const dominantModality = getDominantModality(modalities)
  const houseEmphasis = getHouseEmphasis(chart)

  // Find most emphasized houses
  const sortedHouses = Object.entries(houseEmphasis).sort((a, b) => b[1] - a[1])
  const strongestHouse = parseInt(sortedHouses[0][0])

  // Create comprehensive sections
  const sections: ReportSectionV2[] = [
    {
      id: 'introduction',
      title: 'Welcome to Your Cosmic Blueprint',
      icon: '🌟',
      subsections: [
        {
          title: 'What is a Birth Chart?',
          content: `${userName}, welcome to your personalized astrological portrait. This report explores your birth chart - a map of the sky at the exact moment you were born. Think of it as a cosmic snapshot that captures the positions of the Sun, Moon, and planets against the backdrop of the zodiac signs and houses.

Unlike sun sign horoscopes that describe one-twelfth of the population, your birth chart is as unique as your fingerprint. The specific combination of planetary positions in your chart has never existed before and will never exist again. This is YOUR cosmic DNA.

Throughout this report, we'll decode this celestial language to reveal insights about your personality, emotional needs, communication style, love nature, ambitions, challenges, and life purpose. You'll discover not just who you are, but why you are the way you are - and how to work with your cosmic gifts rather than against them.`,
          terms: [
            { term: 'Birth Chart (Natal Chart)', definition: 'A map of the sky at the moment of your birth, showing the positions of the Sun, Moon, and planets in the zodiac signs and houses.' },
            { term: 'Zodiac Signs', definition: 'The 12 constellations the Sun appears to pass through over a year. Each sign has distinct characteristics and energies.' },
            { term: 'Houses', definition: 'The 12 sections of the birth chart representing different areas of life, from identity to relationships to career.' },
          ],
        },
        {
          title: 'Your Astrological Summary',
          content: `At a glance, here's your cosmic profile:

**Your Big Three:**
- **Sun Sign:** ${sunSign} - Your core identity and life force
- **Moon Sign:** ${moonSign} - Your emotional nature and inner self
- **Rising Sign:** ${risingSign} - Your outward personality and first impressions

**Elemental Balance:**
Your chart is dominated by ${dominantElement} energy, which means you primarily process life through ${dominantElement === 'Fire' ? 'action, inspiration, and enthusiasm' : dominantElement === 'Earth' ? 'practical application and tangible results' : dominantElement === 'Air' ? 'ideas, communication, and analysis' : 'emotions, intuition, and deep feeling'}.

**Modal Quality:**
With ${dominantModality} energy prominent, you approach life by ${dominantModality === 'Cardinal' ? 'initiating action and leading the way' : dominantModality === 'Fixed' ? 'maintaining, building, and seeing things through' : 'adapting, changing, and going with the flow'}.

This unique combination shapes everything from how you make decisions to what motivates you to how you love.`,
          visual: {
            type: 'element-balance',
            title: 'Your Elemental Balance',
            data: elements,
          },
          tip: 'Your elemental balance shows which type of energy is strongest in your chart. Most people have an imbalance - that\'s normal and actually gives your personality its unique flavor.',
        },
      ],
    },
    {
      id: 'sun-sign',
      title: 'Your Sun Sign: The Core of Who You Are',
      icon: '☀️',
      subsections: [
        {
          title: `Understanding Your ${sunSign} Sun`,
          content: `The Sun is the center of our solar system, and in astrology, it represents the center of YOU. Your Sun sign reveals your fundamental nature - your core identity, your sense of purpose, and the life force that drives you. It's who you are when you're most authentically yourself.

${userName}, with your Sun in ${sunSign}, you are at your core ${sunData.keywords.slice(0, 3).join(', ')}. ${sunSign} is a ${sunData.element} sign with ${sunData.modality} energy, ruled by ${sunData.ruler}. The symbol of ${sunSign} is ${sunData.symbol}.

**What This Means for You:**

As a ${sunData.element} sign, you experience life primarily through ${sunData.element === 'Fire' ? 'action and inspiration. You need excitement, challenge, and creative outlets to feel alive. You have a natural warmth and enthusiasm that others find magnetic' : sunData.element === 'Earth' ? 'your senses and practical application. You value what you can see, touch, and build. Stability and material security are important to you, and you have a gift for making things real' : sunData.element === 'Air' ? 'ideas and communication. You need mental stimulation, social connection, and intellectual exchange. Your gift is seeing multiple perspectives and connecting concepts' : 'feelings and intuition. You navigate the world emotionally and have a natural ability to sense undercurrents that others miss. Deep connection and emotional authenticity are essential to you'}.

As a ${sunData.modality} sign, you ${sunData.modality === 'Cardinal' ? 'are an initiator - someone who starts things, leads the way, and isn\'t content to sit back while life happens. You prefer to be at the forefront of action' : sunData.modality === 'Fixed' ? 'are a sustainer - someone who maintains, builds, and sees things through to completion. Your determination and persistence are remarkable strengths' : 'are an adapter - someone who thrives on change and variety. Your flexibility allows you to navigate life\'s transitions with grace that others envy'}.`,
          terms: [
            { term: 'Sun Sign', definition: 'The zodiac sign the Sun was in at your birth. It represents your core identity, ego, and life purpose.' },
            { term: sunData.element + ' Signs', definition: `The four ${sunData.element} signs share an elemental quality. ${sunData.element} signs are ${sunData.element === 'Fire' ? 'Aries, Leo, and Sagittarius - known for passion, action, and enthusiasm' : sunData.element === 'Earth' ? 'Taurus, Virgo, and Capricorn - known for practicality, reliability, and groundedness' : sunData.element === 'Air' ? 'Gemini, Libra, and Aquarius - known for intellect, communication, and social connection' : 'Cancer, Scorpio, and Pisces - known for emotional depth, intuition, and sensitivity'}.` },
          ],
        },
        {
          title: 'The Archetype You Embody',
          content: `Every Sun sign embodies an archetype - a universal pattern of human experience. As a ${sunSign}, your archetype is ${sunData.archetype}.

**Your Archetype in Action:**

${sunSign === 'Aries' ? 'The Warrior/Pioneer archetype appears throughout mythology and story - from ancient heroes to modern-day entrepreneurs. You embody the courage to begin, to fight for what matters, and to venture where others fear to go. Think of figures like Amelia Earhart or Steve Jobs - people who said "I\'ll go first" and meant it.' : sunSign === 'Taurus' ? 'The Builder/Stabilizer archetype has been essential to human civilization - the farmers, craftsmen, and stewards who create lasting value. You embody the patience to cultivate, the wisdom to appreciate beauty, and the strength to endure. Think of figures who built lasting legacies through steady effort.' : sunSign === 'Gemini' ? 'The Messenger/Storyteller archetype appears as the communicator, the trickster, the eternal student. You embody the power of words, the joy of learning, and the gift of making connections others miss. Think of writers, journalists, and teachers who translate complex ideas for others.' : sunSign === 'Cancer' ? 'The Nurturer/Mother archetype represents the protective, caring force that creates safe spaces for growth. You embody the power of emotional intelligence, the importance of roots and belonging, and the fierce protectiveness of love. Think of those who create home wherever they go.' : sunSign === 'Leo' ? 'The King/Queen/Performer archetype represents the creative force that inspires others. You embody the courage to be seen, the generosity to share your gifts, and the warmth that makes others feel special. Think of performers, leaders, and artists who light up every room.' : sunSign === 'Virgo' ? 'The Healer/Analyst archetype represents the sacred service of improvement and care. You embody the power of attention to detail, the gift of practical help, and the wisdom that comes from humble service. Think of healers, craftspeople, and those who make things work better.' : sunSign === 'Libra' ? 'The Diplomat/Artist archetype represents the force of harmony and beauty in the world. You embody the power of balance, the gift of seeing all sides, and the ability to create peace. Think of mediators, artists, and those who bring people together.' : sunSign === 'Scorpio' ? 'The Transformer/Detective archetype represents the power of depth and rebirth. You embody the courage to face darkness, the gift of seeing through illusion, and the ability to rise renewed. Think of psychologists, investigators, and those who facilitate profound change.' : sunSign === 'Sagittarius' ? 'The Explorer/Philosopher archetype represents the quest for meaning and truth. You embody the spirit of adventure, the gift of optimism, and the wisdom to see the bigger picture. Think of teachers, travelers, and seekers who expand our horizons.' : sunSign === 'Capricorn' ? 'The Elder/CEO archetype represents the wisdom of time and the power of achievement. You embody the discipline to climb mountains, the integrity to lead, and the patience to build empires. Think of statesmen, executives, and those who create lasting institutions.' : sunSign === 'Aquarius' ? 'The Visionary/Revolutionary archetype represents the force of progress and innovation. You embody the courage to be different, the vision to see what could be, and the commitment to collective evolution. Think of inventors, activists, and those who change the world.' : 'The Mystic/Artist archetype represents the transcendent and the creative. You embody the gift of imagination, the wisdom of compassion, and the ability to dissolve boundaries. Think of artists, healers, and spiritual guides who remind us of our connection to something greater.'}

**Your Core Life Lesson:**
${sunData.lifeLesson}

This doesn't mean you'll struggle with this forever - rather, it's the area where your growth creates the most profound transformation. As you master this lesson, you become a model for others facing similar challenges.`,
          tip: `Your Sun sign represents your growth edge - the qualities you're developing throughout life. Even if some ${sunSign} traits don't feel natural yet, you're growing into them.`,
        },
        {
          title: `Your ${sunSign} Strengths & Gifts`,
          content: `Every Sun sign comes with superpowers - natural gifts that come easily to you and that others often admire. As a ${sunSign}, your core strengths include:

${sunData.strengths.map((s, i) => `**${i + 1}. ${s}**`).join('\n')}

**How These Show Up in Your Life:**

${sunSign === 'Aries' ? 'Your courage isn\'t just physical - it\'s the willingness to be first, to try new things, to put yourself out there when others hesitate. People look to you when action is needed because they know you\'ll actually do something, not just talk about it.' : sunSign === 'Taurus' ? 'Your patience is a genuine superpower in an impatient world. You understand that good things take time, and you\'re willing to put in the steady effort that creates real results. Your appreciation for beauty also elevates ordinary experiences into something special.' : sunSign === 'Gemini' ? 'Your mental agility means you can learn anything quickly and explain it to anyone. You\'re the person who makes connections others miss, who keeps conversations interesting, and who can adapt to any social situation.' : sunSign === 'Cancer' ? 'Your emotional intelligence is profound - you sense what others feel before they know it themselves. Your nurturing creates spaces where people feel safe to be vulnerable, and your memory for meaningful moments makes others feel truly seen.' : sunSign === 'Leo' ? 'Your natural charisma isn\'t about ego - it\'s a genuine warmth that makes others feel special. Your creativity isn\'t just artistic - it\'s the ability to see possibility and make life more colorful. Your generosity inspires others to give more too.' : sunSign === 'Virgo' ? 'Your analytical mind catches details that would escape anyone else. Your helpfulness isn\'t about being subservient - it\'s about the genuine satisfaction of making things work better. Your standards raise the bar for everyone around you.' : sunSign === 'Libra' ? 'Your diplomatic skills create peace where there was conflict. Your aesthetic sense creates beauty in everyday life. Your ability to see all sides makes you invaluable in any situation requiring fairness or negotiation.' : sunSign === 'Scorpio' ? 'Your emotional depth allows for connections that others never experience. Your determination means you finish what you start, no matter how hard. Your psychological insight sees through pretense to truth.' : sunSign === 'Sagittarius' ? 'Your optimism is contagious - you help others see possibility where they saw obstacles. Your honesty is refreshing in a world of spin. Your vision helps others see beyond their immediate circumstances.' : sunSign === 'Capricorn' ? 'Your discipline allows you to achieve what others only dream about. Your strategic thinking sees steps ahead. Your integrity means your word actually means something in a world where that\'s rare.' : sunSign === 'Aquarius' ? 'Your originality sees solutions invisible to conventional thinking. Your humanitarian vision reminds us of our shared humanity. Your independence gives you the freedom to be truly yourself.' : 'Your compassion is boundless and genuine. Your artistic sensitivity creates beauty that moves people. Your spiritual connection accesses wisdom beyond the ordinary mind.'}

Remember: these aren't just nice traits - they're your gifts to the world. Using them fully is part of your life purpose.`,
        },
        {
          title: 'Growth Areas & Shadows',
          content: `Every sign also has its shadow side - tendencies that emerge when you're stressed, unaware, or operating from fear rather than love. Knowing your shadows isn't about self-criticism; it's about self-awareness.

**Your ${sunSign} Challenges:**

${sunData.challenges.map((c, i) => `**${i + 1}. ${c}**`).join('\n')}

**Understanding Your Shadow:**

${sunData.shadowSide}

**How to Work With This:**

The key isn't to eliminate these tendencies (that's impossible and would cost you your strengths). Instead, it's about awareness and choice. When you notice yourself ${sunSign === 'Aries' ? 'rushing impulsively or getting frustrated with others\' pace' : sunSign === 'Taurus' ? 'digging in stubbornly or clinging to comfort' : sunSign === 'Gemini' ? 'scattering your energy or staying surface-level' : sunSign === 'Cancer' ? 'withdrawing into your shell or manipulating through emotions' : sunSign === 'Leo' ? 'needing attention or taking things personally' : sunSign === 'Virgo' ? 'criticizing yourself or others harshly' : sunSign === 'Libra' ? 'avoiding necessary conflict or losing yourself in others' : sunSign === 'Scorpio' ? 'holding grudges or trying to control situations' : sunSign === 'Sagittarius' ? 'over-promising or being tactlessly blunt' : sunSign === 'Capricorn' ? 'working yourself to exhaustion or being too rigid' : sunSign === 'Aquarius' ? 'detaching emotionally or being contrarian for its own sake' : 'escaping reality or playing the victim'}, you can pause and choose differently.

This awareness transforms shadow into fuel for growth.`,
          tip: 'Everyone has shadow qualities - they\'re the flip side of our strengths. The goal isn\'t perfection but awareness.',
        },
        {
          title: `Sun in the ${sunHouse}${sunHouse === 1 ? 'st' : sunHouse === 2 ? 'nd' : sunHouse === 3 ? 'rd' : 'th'} House: Where You Shine`,
          content: `Your Sun isn't just in ${sunSign} - it's also in the ${sunHouse}${sunHouse === 1 ? 'st' : sunHouse === 2 ? 'nd' : sunHouse === 3 ? 'rd' : 'th'} House of your chart, the ${houseData[sunHouse].name}. This tells us WHERE in life your ${sunSign} energy expresses most strongly - where you seek to shine and find your sense of purpose.

**The ${houseData[sunHouse].name}:**
${houseData[sunHouse].theme}

**What This Means for You:**

With your Sun in the ${sunHouse}${sunHouse === 1 ? 'st' : sunHouse === 2 ? 'nd' : sunHouse === 3 ? 'rd' : 'th'} House, you find your sense of identity and purpose through ${houseData[sunHouse].keywords.slice(0, 3).join(', ')}. This is the area of life where your ${sunSign} qualities shine most brightly and where you're meant to develop confidence.

**Key Questions This Placement Asks:**
${houseData[sunHouse].questions.map(q => `- ${q}`).join('\n')}

${sunHouse === 1 ? 'Your Sun in the 1st House means your identity and self-expression are front and center in your life. You\'re meant to be seen, to develop a strong sense of self, and to lead by example. You probably made an impression on people from an early age.' : sunHouse === 5 ? 'Your Sun in the 5th House means creativity, self-expression, and joy are central to your life purpose. You\'re meant to create, to play, and to inspire others through your authentic self-expression.' : sunHouse === 10 ? 'Your Sun in the 10th House means career and public recognition are important to your sense of identity. You\'re meant to achieve, to be seen as an authority, and to leave a lasting mark on the world.' : `Your Sun here means that ${houseData[sunHouse].theme.toLowerCase()} is central to your sense of identity and purpose.`}`,
          terms: [
            { term: 'Astrological Houses', definition: 'The 12 sections of the birth chart, each representing a different area of life. The house your Sun is in shows where you seek to express your core self.' },
          ],
        },
      ],
    },
    {
      id: 'moon-sign',
      title: 'Your Moon Sign: The Soul Beneath the Surface',
      icon: '🌙',
      subsections: [
        {
          title: `Your ${moonSign} Moon: Understanding Your Inner World`,
          content: `If your Sun is who you are, your Moon is how you feel. The Moon represents your emotional nature, your deepest needs, your instinctive reactions, and the part of you that comes out when you're not performing for the world. It's the "you" that your closest people know.

${userName}, with your Moon in ${moonSign}, your emotional world is characterized by ${moonData.keywords.slice(0, 3).join(', ')} tendencies. While your ${sunSign} Sun shows how you shine outwardly, your ${moonSign} Moon reveals what you need to feel safe, nurtured, and emotionally fulfilled.

**Understanding Your Emotional Nature:**

A ${moonSign} Moon experiences emotions through the filter of ${moonData.element} energy. This means you ${moonData.element === 'Water' ? 'feel deeply, intuitively, and absorbently. Your emotions flow and merge; you pick up on the emotional atmosphere of any room. This sensitivity is both a gift (you understand feelings profoundly) and a challenge (you may need to learn what\'s yours versus what you\'ve absorbed from others)' : moonData.element === 'Fire' ? 'feel quickly and expressively. Your emotions rise fast, burn bright, and often need an outlet. You don\'t hold onto feelings for long - you process by expressing. This gives you emotional resilience but can mean you move on before others have processed their feelings' : moonData.element === 'Earth' ? 'feel steadily and practically. You prefer to deal with emotions in concrete ways - through action, through touch, through creating security. You may not always verbalize feelings, but you show them through reliability and presence' : 'feel intellectually and objectively. You often process emotions by understanding them - analyzing why you feel what you feel. This gives you perspective but can sometimes create distance from raw feeling'}.`,
          terms: [
            { term: 'Moon Sign', definition: 'The zodiac sign the Moon was in at your birth. It represents your emotional nature, instincts, and inner needs.' },
            { term: 'Inner Planet', definition: 'The Sun, Moon, Mercury, Venus, and Mars are called "inner" or "personal" planets because they move quickly and shape individual personality strongly.' },
          ],
        },
        {
          title: 'What You Need to Feel Safe',
          content: `The Moon sign reveals our core emotional needs - what we require to feel secure, nurtured, and "at home" in our lives. Understanding this is crucial for self-care and for teaching others how to love you well.

**Your ${moonSign} Moon Needs:**

${moonSign === 'Aries' ? '- **Independence**: You need freedom to feel and express without restraint\n- **Action**: When upset, you need to DO something, not just talk about it\n- **Directness**: You need people to be straight with you emotionally\n- **Challenge**: Emotional stagnation makes you restless; you need passion' : moonSign === 'Taurus' ? '- **Stability**: You need to know your world is secure before you can relax\n- **Physical comfort**: Touch, good food, beautiful surroundings soothe you\n- **Routine**: Predictability helps you feel safe\n- **Time**: You need to process emotions at your own pace, without being rushed' : moonSign === 'Gemini' ? '- **Communication**: You need to talk about feelings to process them\n- **Variety**: Emotional monotony is deadening; you need stimulation\n- **Understanding**: You need to know WHY you feel what you feel\n- **Mental connection**: Intellectual rapport is as important as emotional connection' : moonSign === 'Cancer' ? '- **Emotional safety**: You need to know it\'s safe to be vulnerable\n- **Nurturing**: Both giving and receiving care is essential to you\n- **Belonging**: You need to feel you have a "home" - people who are yours\n- **Memory**: You need your feelings and experiences to be remembered and honored' : moonSign === 'Leo' ? '- **Recognition**: You need to feel seen, appreciated, and special\n- **Warmth**: Cold emotional environments make you wilt\n- **Expression**: You need outlets for your feelings - creative, dramatic, playful\n- **Loyalty**: You need to know people are genuinely on your side' : moonSign === 'Virgo' ? '- **Order**: Chaos is emotionally disturbing; you need things to make sense\n- **Usefulness**: You feel best when you\'re helping or improving something\n- **Health**: Physical wellbeing and emotional wellbeing are linked for you\n- **Appreciation**: Genuine recognition of your efforts (not flattery) matters' : moonSign === 'Libra' ? '- **Harmony**: Conflict is emotionally destabilizing; you need peace\n- **Partnership**: You process emotions best in relationship, not alone\n- **Beauty**: Aesthetically pleasing environments soothe you\n- **Fairness**: Injustice is personally upsetting, even when it doesn\'t affect you directly' : moonSign === 'Scorpio' ? '- **Depth**: Surface-level emotional connection leaves you hungry\n- **Truth**: You need emotional honesty, even when it\'s uncomfortable\n- **Intensity**: Passion and profound feeling make you feel alive\n- **Privacy**: You need control over who has access to your inner world' : moonSign === 'Sagittarius' ? '- **Freedom**: You need space to feel without being trapped\n- **Meaning**: You need to understand the bigger picture of your feelings\n- **Adventure**: New experiences and growth lift your spirits\n- **Optimism**: You need hope and possibility to feel emotionally well' : moonSign === 'Capricorn' ? '- **Achievement**: You feel best when you\'re accomplishing something\n- **Respect**: Dignity and being taken seriously matter deeply\n- **Structure**: Clear expectations help you feel emotionally stable\n- **Solitude**: You often need time alone to process feelings' : moonSign === 'Aquarius' ? '- **Intellectual connection**: You need your feelings to make logical sense\n- **Independence**: Emotional demands or clinginess suffocate you\n- **Friendship**: You need emotional relationships that respect your autonomy\n- **Uniqueness**: You need room to be emotionally different from the norm' : '- **Spiritual connection**: You need to feel connected to something transcendent\n- **Compassion**: Both giving and receiving kindness feeds your soul\n- **Solitude**: You need time alone to recharge from absorbing others\' emotions\n- **Creative expression**: Art, music, and imagination are emotional necessities'}

When these needs are met, you thrive. When they're not, you feel emotionally unsettled, anxious, or drained. Learning to communicate these needs - and to meet them yourself - is essential for your emotional wellbeing.`,
          tip: 'Your Moon sign shows how you were (or needed to be) nurtured in childhood. It also shows what you naturally provide for others emotionally.',
        },
        {
          title: 'Your Emotional Patterns & Triggers',
          content: `The Moon also reveals our instinctive reactions - the patterns we fall into without thinking, especially when stressed. Knowing these patterns helps you respond to life more consciously rather than reactively.

**When Stressed, Your ${moonSign} Moon Tends To:**

${moonSign === 'Aries' ? 'React with anger or impatience. You might pick fights, become impulsive, or need to "blow off steam." You may also become self-focused, forgetting others\' needs in the heat of emotion.' : moonSign === 'Taurus' ? 'Dig in stubbornly or seek comfort through physical indulgence (food, spending, etc.). You might resist necessary change or become possessive of people and things.' : moonSign === 'Gemini' ? 'Overthink, analyze obsessively, or scatter your energy. You might talk excessively about feelings without actually feeling them, or become nervously distracted.' : moonSign === 'Cancer' ? 'Withdraw into your shell, become moody or clingy, or retreat into the past. You might use guilt or emotional manipulation to get needs met indirectly.' : moonSign === 'Leo' ? 'Become dramatic, demand attention, or take things personally. You might need reassurance that you\'re still loved and special, or become prideful and defensive.' : moonSign === 'Virgo' ? 'Become critical (of self and others), anxious, or focused on what\'s wrong. You might try to "fix" emotional situations rather than simply feeling them.' : moonSign === 'Libra' ? 'Avoid conflict at all costs, become indecisive, or lose yourself in trying to please others. You might suppress your own needs to maintain harmony.' : moonSign === 'Scorpio' ? 'Become secretive, suspicious, or emotionally intense. You might hold grudges, seek to control situations, or test others\' loyalty.' : moonSign === 'Sagittarius' ? 'Escape through travel, philosophy, or excess. You might become preachy, over-promise, or use humor to avoid deeper feelings.' : moonSign === 'Capricorn' ? 'Shut down emotionally, retreat into work, or become pessimistic. You might become cold, controlling, or overly focused on status and achievement.' : moonSign === 'Aquarius' ? 'Detach emotionally, intellectualize feelings, or become contrary and rebellious. You might use aloofness as a defense against vulnerability.' : 'Escape into fantasy, victimhood, or confusion. You might lose boundaries, turn to addictive behaviors, or become passive and helpless.'}

**How to Work With These Patterns:**

1. **Notice without judgment**: Simply observing "I\'m doing the ${moonSign} stress thing" creates space for choice
2. **Meet the underlying need**: Ask yourself what you actually need (from the list above) and find a healthy way to get it
3. **Self-soothe consciously**: Learn what genuinely calms your ${moonSign} Moon vs. what\'s escapism

Your Moon patterns aren't flaws - they're protective strategies that developed for good reasons. As you become more conscious of them, they become choices rather than compulsions.`,
        },
        {
          title: `Moon in the ${moonHouse}${moonHouse === 1 ? 'st' : moonHouse === 2 ? 'nd' : moonHouse === 3 ? 'rd' : 'th'} House`,
          content: `Your Moon in the ${moonHouse}${moonHouse === 1 ? 'st' : moonHouse === 2 ? 'nd' : moonHouse === 3 ? 'rd' : 'th'} House (${houseData[moonHouse].name}) reveals WHERE your emotional nature expresses most strongly and what life areas most affect your feelings.

**This Placement Suggests:**

- Your emotional wellbeing is closely tied to matters of ${houseData[moonHouse].keywords.slice(0, 3).join(', ')}
- You may have fluctuating experiences in this life area (the Moon is changeable)
- Your mother or primary caregiver may have modeled how you approach ${houseData[moonHouse].theme.toLowerCase()}
- You nurture others primarily through this life arena

${moonHouse === 4 ? 'Your Moon is in its natural house, strengthening your need for home, family, and emotional roots. Home is exceptionally important to your wellbeing.' : moonHouse === 7 ? 'Your Moon in the partnership house means relationships are essential to your emotional security. You may feel incomplete without a close partner.' : moonHouse === 10 ? 'Your Moon in the career house means your emotions are visible publicly. Your professional life significantly impacts your emotional state.' : `This placement means ${houseData[moonHouse].theme.toLowerCase()} significantly affects your emotional state and needs.`}

**Nurturing Your Moon:**

To keep your ${moonSign} Moon happy in the ${moonHouse}${moonHouse === 1 ? 'st' : moonHouse === 2 ? 'nd' : moonHouse === 3 ? 'rd' : 'th'} House, make sure you're tending to matters of ${houseData[moonHouse].keywords[0]} with the same care you'd give to your closest relationships. This life area isn't optional for you - it's emotionally essential.`,
        },
      ],
    },
    {
      id: 'rising-sign',
      title: 'Your Rising Sign: The Mask You Wear',
      icon: '🌅',
      subsections: [
        {
          title: `${risingSign} Rising: How the World Sees You`,
          content: `Your Rising sign (also called the Ascendant) is the sign that was rising on the eastern horizon at your exact moment of birth. It represents your "mask" - not in a fake way, but as the interface between your inner self and the outer world. It's your front door, your first impression, and the lens through which you approach all new experiences.

${userName}, with ${risingSign} Rising, you project ${risingData.keywords.slice(0, 3).join(', ')} energy to others. When people first meet you, they're meeting your ${risingSign} qualities - even if your ${sunSign} Sun feels more like the "real you" inside.

**Why Your Rising Sign Matters:**

1. **First Impressions**: It determines how you come across to strangers
2. **Life Approach**: It's how you instinctively approach new situations
3. **Physical Appearance**: It influences your look and body language
4. **Life Path**: The Rising sign ruler shows key themes in your life journey

**The Difference Between Your Sun and Rising:**

Your ${sunSign} Sun is who you ARE. Your ${risingSign} Rising is how you APPROACH life. Someone with a ${sunSign} Sun might feel ${sunData.keywords[0]} inside, but if they have ${risingSign} Rising, they'll move through the world with ${risingData.keywords[0]} energy.`,
          terms: [
            { term: 'Ascendant (Rising Sign)', definition: 'The zodiac sign rising on the eastern horizon at your birth time. It represents your outward personality and approach to life.' },
            { term: 'Chart Ruler', definition: 'The planet that rules your Rising sign. Its position shows important themes in your life journey.' },
          ],
        },
        {
          title: 'How Others Experience You',
          content: `With ${risingSign} Rising, people tend to perceive you as:

${risingSign === 'Aries' ? '**Bold, direct, and energetic**. You may come across as someone who knows what they want and isn\'t afraid to go after it. People might see you as competitive, impatient, or "always on the go." You probably move quickly, speak directly, and make an immediate impression.' : risingSign === 'Taurus' ? '**Calm, reliable, and perhaps reserved**. You project an aura of stability and groundedness. People might see you as steady, sensual, or stubborn. You likely move deliberately, appreciate quality, and have a soothing presence.' : risingSign === 'Gemini' ? '**Curious, talkative, and mentally quick**. You seem adaptable, interested in many topics, and socially at ease. People might see you as clever, scattered, or hard to pin down. You likely gesture expressively and shift topics easily.' : risingSign === 'Cancer' ? '**Nurturing, approachable, and emotionally aware**. You project caring, protective energy. People might see you as sensitive, moody, or maternal/paternal. You likely have a soft demeanor that makes others feel safe.' : risingSign === 'Leo' ? '**Confident, warm, and perhaps dramatic**. You have a natural presence that draws attention. People might see you as charismatic, proud, or theatrical. You likely have good posture, expressive features, and a memorable look.' : risingSign === 'Virgo' ? '**Modest, helpful, and detail-oriented**. You come across as someone who has things together. People might see you as analytical, critical, or health-conscious. You likely have a neat appearance and attentive manner.' : risingSign === 'Libra' ? '**Charming, diplomatic, and aesthetically aware**. You project grace and a desire for harmony. People might see you as pleasant, indecisive, or relationship-focused. You likely have balanced features and graceful movements.' : risingSign === 'Scorpio' ? '**Intense, mysterious, and powerful**. You have a penetrating presence that others find magnetic. People might see you as secretive, intimidating, or deeply perceptive. You likely have intense eyes and a contained manner.' : risingSign === 'Sagittarius' ? '**Optimistic, friendly, and adventurous**. You seem open to new experiences and eager to learn. People might see you as honest, restless, or philosophical. You likely have an open smile and enthusiastic manner.' : risingSign === 'Capricorn' ? '**Serious, ambitious, and mature**. You project competence and responsibility, perhaps beyond your years. People might see you as successful, reserved, or authoritative. You likely have a dignified bearing.' : risingSign === 'Aquarius' ? '**Unique, independent, and perhaps eccentric**. You don\'t seem to follow the crowd. People might see you as progressive, aloof, or friendly but detached. You likely have an unconventional style or manner.' : '**Dreamy, compassionate, and somewhat elusive**. You have an otherworldly quality. People might see you as artistic, spacey, or deeply kind. You likely have soft features and a gentle manner.'}

**The Gap Between Perception and Reality:**

If your Sun sign is quite different from your Rising sign, you might feel misunderstood. People meet your ${risingSign} Rising but the "real you" is your ${sunSign} Sun. This can feel frustrating ("but that's not who I really am!") or useful (your Rising can be a protective buffer for your more private Sun nature).

Over time, you'll likely integrate both - using your ${risingSign} approach consciously while staying connected to your ${sunSign} core.`,
        },
        {
          title: 'Your Physical Presence',
          content: `The Rising sign also influences physical appearance and body language. Of course, genetics are the primary factor, but the Rising sign adds an overlay that astrologers have noted for centuries.

**${risingSign} Rising Physical Traits:**

${risingSign === 'Aries' ? 'Often has an athletic or wiry build, prominent brows or forehead, quick and decisive movements, and a direct gaze. May have reddish tones in coloring or a noticeable scar (Mars rules Aries and cuts/wounds).' : risingSign === 'Taurus' ? 'Often has a sturdy or solid build, pleasant rounded features, strong neck or shoulders, and a graceful yet deliberate way of moving. May have a pleasing voice (Taurus rules the throat).' : risingSign === 'Gemini' ? 'Often has a youthful appearance regardless of age, expressive hands and face, quick animated gestures, and mobile features. May have a tall or lanky build.' : risingSign === 'Cancer' ? 'Often has a round or moon-like face, nurturing demeanor, protective body language, and soft features. May have a noticeable chest or stomach area.' : risingSign === 'Leo' ? 'Often has a mane-like head of hair, proud posture, dramatic gestures, and warm coloring. May have a noticeable presence that draws the eye even in a crowd.' : risingSign === 'Virgo' ? 'Often has a neat, clean appearance, attentive expression, precise movements, and youthful features that age well. May have a delicate or refined look.' : risingSign === 'Libra' ? 'Often has balanced, symmetrical features, pleasant smile, graceful movements, and an aesthetic sensibility in dress. May have dimples or a particularly charming expression.' : risingSign === 'Scorpio' ? 'Often has intense, penetrating eyes, magnetic presence, controlled movements, and strong features. May have dark coloring or a powerful gaze that others find hypnotic.' : risingSign === 'Sagittarius' ? 'Often has a tall or athletic build, open friendly face, expansive gestures, and a walk that covers ground. May have prominent hips or thighs.' : risingSign === 'Capricorn' ? 'Often has a mature appearance, strong bone structure, measured movements, and dignified bearing. May have prominent cheekbones, knees, or skeletal features.' : risingSign === 'Aquarius' ? 'Often has unusual or asymmetrical features, friendly but detached expression, quirky gestures, and an unconventional style. May have notable ankles or calves.' : 'Often has soft, dreamy features, artistic or otherworldly appearance, fluid movements, and large expressive eyes. May have sensitive feet.'}

Remember: these are tendencies, not rules. Many factors influence appearance. But noticing these patterns can be a fun way to see astrology in action.`,
        },
      ],
    },
    {
      id: 'mercury',
      title: 'Your Mind: How You Think & Communicate',
      icon: '☿️',
      subsections: [
        {
          title: `Mercury in ${mercurySign}: Your Mental Operating System`,
          content: `Mercury is the planet of mind, communication, and learning. Its sign in your chart reveals HOW you think, process information, and express your ideas. It's your mental operating system.

${userName}, with Mercury in ${mercurySign}, your mind works with ${mercuryData.keywords.slice(0, 3).join(', ')} qualities. You think ${mercuryData.element === 'Fire' ? 'quickly, intuitively, and with enthusiasm. You grasp concepts fast, prefer the big picture to details, and communicate with passion' : mercuryData.element === 'Earth' ? 'practically, methodically, and thoroughly. You learn best through hands-on experience and prefer information with real-world applications' : mercuryData.element === 'Air' ? 'logically, objectively, and with curiosity. You enjoy exchanging ideas, see multiple perspectives easily, and communicate articulately' : 'intuitively, imaginatively, and with emotional color. You absorb information through feeling, may think in images rather than words, and communicate with poetry'}.

**Your Learning Style:**

${mercurySign === 'Aries' ? 'You learn fast but may miss details. You prefer direct information, hands-on learning, and competition. Reading long texts may frustrate you - you\'d rather discover through trial and error.' : mercurySign === 'Taurus' ? 'You learn slowly but retain thoroughly. You prefer practical information, step-by-step instruction, and time to absorb. You may need to hear things multiple times before they stick.' : mercurySign === 'Gemini' ? 'You learn quickly through variety and discussion. You\'re curious about everything, pick up languages easily, and need mental stimulation. You may start many books but finish few.' : mercurySign === 'Cancer' ? 'You learn through emotional connection to material. You remember what touched you, learn well from nurturing teachers, and may have an excellent memory for personal details.' : mercurySign === 'Leo' ? 'You learn through creative engagement and performance. You remember what you taught others, prefer dramatic presentation, and think with confidence (sometimes overconfidence).' : mercurySign === 'Virgo' ? 'You learn through analysis and application. You notice details others miss, prefer organized information, and may be critical of imprecise thinking (including your own).' : mercurySign === 'Libra' ? 'You learn through discussion and comparison. You see multiple viewpoints easily, prefer balanced presentations, and think best in partnership or dialogue.' : mercurySign === 'Scorpio' ? 'You learn by going deep. Surface information bores you; you want to understand root causes. You\'re perceptive, skeptical, and excellent at research.' : mercurySign === 'Sagittarius' ? 'You learn through exploration and meaning-making. You prefer philosophy to facts, think in big pictures, and may be more interested in understanding than remembering.' : mercurySign === 'Capricorn' ? 'You learn through structure and practical application. You prefer organized information, respect expert sources, and think strategically and long-term.' : mercurySign === 'Aquarius' ? 'You learn through unconventional methods and independent study. You prefer revolutionary ideas to traditional knowledge, think originally, and may be ahead of your time.' : 'You learn through imagination and intuition. Strict logic may bore you; you absorb information atmospherically and think in images, music, and feeling.'}`,
          terms: [
            { term: 'Mercury', definition: 'The planet of communication, thinking, and learning. Its sign shows how you process and share information.' },
            { term: 'Mercury Retrograde', definition: 'A period (3 times yearly) when Mercury appears to move backward. Often associated with communication mishaps and good for review rather than new starts.' },
          ],
        },
        {
          title: 'Your Communication Style',
          content: `Mercury also governs how you express yourself - your speaking and writing style, how you listen, and what you communicate about.

**How You Communicate:**

${mercurySign === 'Aries' ? 'You speak directly, sometimes bluntly. You prefer to get to the point, may interrupt when excited, and communicate with enthusiasm and confidence. Your words can inspire but sometimes cut.' : mercurySign === 'Taurus' ? 'You speak thoughtfully and deliberately. You choose words carefully, have a pleasant voice, and prefer substance over flash. Others find your communication soothing but sometimes slow.' : mercurySign === 'Gemini' ? 'You speak quickly, wittily, and versatilely. You can talk about anything, use humor skillfully, and keep conversations lively. Others find you entertaining but sometimes scattered.' : mercurySign === 'Cancer' ? 'You speak from the heart with emotional intelligence. You remember what others shared, communicate nurturingly, and may be protective of your ideas. Others find you caring but sometimes moody.' : mercurySign === 'Leo' ? 'You speak with warmth, creativity, and flair. You\'re a natural storyteller, communicate confidently, and enjoy an audience. Others find you entertaining but sometimes dominating.' : mercurySign === 'Virgo' ? 'You speak precisely and analytically. You notice errors, communicate helpfully, and prefer accuracy to charm. Others find you knowledgeable but sometimes critical.' : mercurySign === 'Libra' ? 'You speak diplomatically and pleasantly. You consider your audience, communicate with grace, and avoid offensive statements. Others find you charming but sometimes evasive.' : mercurySign === 'Scorpio' ? 'You speak with intensity and perception. You ask probing questions, communicate powerfully, and notice what\'s left unsaid. Others find you fascinating but sometimes intimidating.' : mercurySign === 'Sagittarius' ? 'You speak honestly and expansively. You share your beliefs freely, communicate with enthusiasm, and may say more than intended. Others find you inspiring but sometimes tactless.' : mercurySign === 'Capricorn' ? 'You speak with authority and purpose. You respect communication protocols, prefer efficient exchanges, and speak less but with weight. Others find you credible but sometimes cold.' : mercurySign === 'Aquarius' ? 'You speak originally and objectively. You share unusual ideas freely, communicate to provoke thought, and enjoy debate. Others find you brilliant but sometimes contrarian.' : 'You speak poetically and intuitively. You communicate through implication and image, may trail off mid-thought, and sense more than you say. Others find you creative but sometimes confusing.'}

**Communication Tips:**

Given your Mercury in ${mercurySign}, you communicate best when:
- ${mercuryData.element === 'Fire' ? 'You\'re enthusiastic about the topic and allowed to be direct' : mercuryData.element === 'Earth' ? 'You\'ve had time to think and the discussion is practical' : mercuryData.element === 'Air' ? 'You\'re intellectually engaged and have room for dialogue' : 'You feel emotionally safe and can communicate authentically'}
- Your listener ${mercuryData.element === 'Fire' ? 'keeps pace with your energy' : mercuryData.element === 'Earth' ? 'values substance over speed' : mercuryData.element === 'Air' ? 'engages intellectually' : 'is emotionally present'}`,
        },
      ],
    },
    {
      id: 'venus',
      title: 'Your Heart: How You Love & What You Value',
      icon: '♀️',
      subsections: [
        {
          title: `Venus in ${venusSign}: Your Love Nature`,
          content: `Venus is the planet of love, beauty, pleasure, and values. Its sign reveals what you find attractive, how you show affection, what you value, and your style in romance and friendship.

${userName}, with Venus in ${venusSign}, you love with ${venusData.keywords.slice(0, 3).join(', ')} energy. Your ideal relationship involves ${venusData.element === 'Fire' ? 'passion, adventure, and independence. You want a partner who excites you and gives you freedom' : venusData.element === 'Earth' ? 'stability, sensuality, and commitment. You want a partner who shows up reliably and shares physical affection' : venusData.element === 'Air' ? 'intellectual connection, social engagement, and communication. You want a partner who stimulates your mind and respects your independence' : 'emotional depth, intuitive connection, and soul-level bonding. You want a partner who truly understands your inner world'}.

**What You Find Attractive:**

${venusSign === 'Aries' ? 'You\'re attracted to confidence, directness, and independence. You like the chase, admire those who know what they want, and may be drawn to athletes or competitors. Passivity turns you off.' : venusSign === 'Taurus' ? 'You\'re attracted to stability, sensuality, and good taste. You appreciate beauty in all forms, admire those who are reliable, and may be drawn to artists or craftspeople. Flashiness without substance turns you off.' : venusSign === 'Gemini' ? 'You\'re attracted to intelligence, wit, and versatility. You love good conversation, admire quick minds, and may be drawn to writers or communicators. Boring or predictable people turn you off.' : venusSign === 'Cancer' ? 'You\'re attracted to nurturing, emotional availability, and family values. You love feeling cared for, admire those who are protective, and may be drawn to homebodies. Emotional coldness turns you off.' : venusSign === 'Leo' ? 'You\'re attracted to confidence, generosity, and creativity. You love being adored, admire those who shine, and may be drawn to performers or leaders. Stinginess or coldness turns you off.' : venusSign === 'Virgo' ? 'You\'re attracted to intelligence, helpfulness, and modesty. You love acts of service, admire competence, and may be drawn to healers or skilled professionals. Sloppiness or arrogance turns you off.' : venusSign === 'Libra' ? 'You\'re attracted to beauty, charm, and good manners. You love romance, admire those with aesthetic sense, and may be drawn to artists or diplomats. Crudeness or unfairness turns you off.' : venusSign === 'Scorpio' ? 'You\'re attracted to intensity, depth, and authenticity. You love passionate connection, admire those who are real, and may be drawn to transformative personalities. Superficiality turns you off.' : venusSign === 'Sagittarius' ? 'You\'re attracted to adventurousness, honesty, and wisdom. You love freedom within relationship, admire those who expand your world, and may be drawn to travelers or teachers. Possessiveness turns you off.' : venusSign === 'Capricorn' ? 'You\'re attracted to success, maturity, and stability. You love being with someone you respect, admire achievement, and may be drawn to accomplished professionals. Flakiness or irresponsibility turns you off.' : venusSign === 'Aquarius' ? 'You\'re attracted to uniqueness, intelligence, and independence. You love friendship-based romance, admire originality, and may be drawn to unconventional types. Possessiveness or conventional expectations turn you off.' : 'You\'re attracted to sensitivity, creativity, and spirituality. You love soulmate connections, admire artistic souls, and may be drawn to artists or healers. Coldness or excessive materialism turns you off.'}`,
          terms: [
            { term: 'Venus', definition: 'The planet of love, beauty, and values. Its sign shows what you find attractive and how you show affection.' },
            { term: 'Venus Return', definition: 'When Venus returns to its birth position (yearly). A good time for love, beauty treatments, and pursuing pleasure.' },
          ],
        },
        {
          title: 'Your Love Language',
          content: `Understanding your Venus sign helps you recognize how you naturally give and want to receive love. This is your astrological love language.

**How You Show Love:**

${venusSign === 'Aries' ? 'You show love through pursuit and protection. You take initiative, fight for your partner, and express affection energetically. You may be physically demonstrative and prefer action over words.' : venusSign === 'Taurus' ? 'You show love through presence and gifts. You\'re physically affectionate, remember special occasions, and create beautiful, comfortable experiences. You\'re consistent and reliable in affection.' : venusSign === 'Gemini' ? 'You show love through communication and attention. You talk, text, share interesting things, and keep things mentally stimulating. You express affection through wit and engagement.' : venusSign === 'Cancer' ? 'You show love through nurturing and protection. You cook, care for, remember important details, and create emotional safety. You may express affection through food and home-making.' : venusSign === 'Leo' ? 'You show love through generosity and praise. You give gifts, compliments, and grand gestures. You make your partner feel special and enjoy showing them off.' : venusSign === 'Virgo' ? 'You show love through acts of service and attention to detail. You help, improve, notice what needs doing, and express love through practical support.' : venusSign === 'Libra' ? 'You show love through partnership and romance. You make time for togetherness, create beautiful dates, and ensure fairness in the relationship.' : venusSign === 'Scorpio' ? 'You show love through intensity and loyalty. You\'re all-in once committed, share your depths, and protect your partner fiercely.' : venusSign === 'Sagittarius' ? 'You show love through adventure and honesty. You plan exciting experiences, share your philosophies, and support your partner\'s freedom and growth.' : venusSign === 'Capricorn' ? 'You show love through commitment and support. You build a stable life together, help your partner succeed, and express love through reliability.' : venusSign === 'Aquarius' ? 'You show love through acceptance and friendship. You value your partner\'s uniqueness, give them space, and express affection through intellectual and social engagement.' : 'You show love through devotion and empathy. You sense your partner\'s needs, create romantic magic, and express affection through artistic gestures and spiritual connection.'}

**What Makes You Feel Loved:**

To feel truly loved, you need your partner to ${venusSign === 'Aries' ? 'pursue you actively, give you independence, and match your passion' : venusSign === 'Taurus' ? 'be reliable, physically affectionate, and create beautiful experiences with you' : venusSign === 'Gemini' ? 'engage you mentally, communicate frequently, and keep things interesting' : venusSign === 'Cancer' ? 'be emotionally present, nurture you, and make you feel safe' : venusSign === 'Leo' ? 'adore you, appreciate you openly, and treat you as special' : venusSign === 'Virgo' ? 'notice your efforts, help you practically, and accept you as you are' : venusSign === 'Libra' ? 'prioritize the relationship, create romantic moments, and be fair and considerate' : venusSign === 'Scorpio' ? 'be completely loyal, emotionally deep, and give you their full intensity' : venusSign === 'Sagittarius' ? 'respect your freedom, share adventures, and grow with you' : venusSign === 'Capricorn' ? 'show commitment, respect your ambitions, and build something lasting with you' : venusSign === 'Aquarius' ? 'value your individuality, be your friend, and give you space to be yourself' : 'understand you intuitively, connect spiritually, and love unconditionally'}.`,
        },
      ],
    },
    {
      id: 'mars',
      title: 'Your Drive: How You Take Action',
      icon: '♂️',
      subsections: [
        {
          title: `Mars in ${marsSign}: Your Warrior Energy`,
          content: `Mars is the planet of action, desire, anger, and physical energy. Its sign reveals how you pursue what you want, how you handle conflict, and what motivates you to act.

${userName}, with Mars in ${marsSign}, you take action with ${marsData.keywords.slice(0, 3).join(', ')} energy. You're motivated by ${marsData.element === 'Fire' ? 'challenge, excitement, and the desire to prove yourself. You need goals that inspire you' : marsData.element === 'Earth' ? 'practical results and material outcomes. You work hard for tangible rewards' : marsData.element === 'Air' ? 'ideas, social impact, and intellectual challenges. Mental stimulation drives your actions' : 'emotional meaning and intuitive guidance. You act from feeling rather than logic'}.

**How You Go After What You Want:**

${marsSign === 'Aries' ? 'You pursue goals directly, competitively, and immediately. You don\'t wait, plan excessively, or ask permission. You prefer to take action and deal with consequences later.' : marsSign === 'Taurus' ? 'You pursue goals steadily, persistently, and practically. You\'re not fast but you\'re unstoppable once committed. You build momentum gradually and finish what you start.' : marsSign === 'Gemini' ? 'You pursue goals cleverly, variably, and communicatively. You adapt strategies quickly, use your wit, and may pursue multiple goals simultaneously.' : marsSign === 'Cancer' ? 'You pursue goals protectively, indirectly, and emotionally. You may not appear aggressive but you\'re determined when something matters to you emotionally.' : marsSign === 'Leo' ? 'You pursue goals dramatically, confidently, and proudly. You want to be seen succeeding and may be motivated by recognition. You lead rather than follow.' : marsSign === 'Virgo' ? 'You pursue goals methodically, precisely, and helpfully. You plan carefully, perfect your approach, and serve larger purposes through your efforts.' : marsSign === 'Libra' ? 'You pursue goals diplomatically, cooperatively, and strategically. You prefer to achieve through partnership and may have trouble with direct confrontation.' : marsSign === 'Scorpio' ? 'You pursue goals intensely, strategically, and relentlessly. Once you want something, you don\'t stop. You can be patient when strategy requires it.' : marsSign === 'Sagittarius' ? 'You pursue goals enthusiastically, optimistically, and expansively. You take risks, aim high, and don\'t let obstacles discourage you.' : marsSign === 'Capricorn' ? 'You pursue goals ambitiously, disciplined, and strategically. You play the long game, respect structures of power, and climb steadily toward achievements.' : marsSign === 'Aquarius' ? 'You pursue goals unconventionally, independently, and idealistic ally. You may fight for causes, rebel against restrictions, and insist on doing things your own way.' : 'You pursue goals subtly, adaptably, and intuitively. You flow around obstacles, act on inspiration, and may achieve through apparent non-action.'}`,
          terms: [
            { term: 'Mars', definition: 'The planet of action, desire, and drive. Its sign shows how you pursue goals and handle conflict.' },
          ],
        },
        {
          title: 'How You Handle Conflict',
          content: `Mars also governs anger and conflict - how you fight, what triggers you, and how you can use this energy constructively.

**Your Anger Style:**

${marsSign === 'Aries' ? 'You anger quickly and explosively, but you also cool down fast. You prefer direct confrontation, may raise your voice, and don\'t hold grudges. Your anger is honest - what you see is what you get.' : marsSign === 'Taurus' ? 'You anger slowly and deeply. You have long patience, but when pushed too far, your anger is formidable and long-lasting. You may become stubborn rather than openly angry.' : marsSign === 'Gemini' ? 'You anger through words. You may argue, debate, or become cutting with language. You can be nervous when angry and may scatter your anger across multiple smaller annoyances.' : marsSign === 'Cancer' ? 'You anger defensively and emotionally. You may withdraw, sulk, or use passive aggression. Your anger often masks hurt. You remember emotional wounds.' : marsSign === 'Leo' ? 'You anger dramatically and pridefully. Disrespect triggers you. Your anger can be impressive but is usually generous - you want to be admired even in conflict.' : marsSign === 'Virgo' ? 'You anger precisely and critically. You notice everything that\'s wrong and may express anger through criticism, nitpicking, or anxiety. You\'re harder on yourself than others.' : marsSign === 'Libra' ? 'You anger reluctantly and indirectly. You hate conflict and may suppress anger to maintain peace. When you do get angry, it\'s often about unfairness.' : marsSign === 'Scorpio' ? 'You anger intensely and controllably. You may not show anger immediately - you process, strategize, and then act decisively. You don\'t forget transgressions.' : marsSign === 'Sagittarius' ? 'You anger righteously and honestly. Injustice and dishonesty trigger you. Your anger is usually short-lived and you\'d rather move on than hold grudges.' : marsSign === 'Capricorn' ? 'You anger coldly and controllably. You may become distant rather than explosive. Your anger is often related to disrespect or incompetence.' : marsSign === 'Aquarius' ? 'You anger ideologically and detachedly. Threats to freedom or violations of principle trigger you. You may become contrarian when angry.' : 'You anger confusingly and adaptively. You may become passive, escape, or cry rather than confront directly. Your anger often turns inward.'}

**Constructive Use of Your Mars Energy:**

${marsSign} Mars energy is best channeled through ${marsSign === 'Aries' ? 'physical exercise, competition, entrepreneurship, and any activity requiring courage or initiative' : marsSign === 'Taurus' ? 'building, crafting, gardening, or any sustained physical effort that creates lasting results' : marsSign === 'Gemini' ? 'writing, debating, learning, or any activity requiring mental agility and quick thinking' : marsSign === 'Cancer' ? 'nurturing, cooking, home improvement, or protecting those you love' : marsSign === 'Leo' ? 'creative performance, leadership, athletics, or any activity where you can shine' : marsSign === 'Virgo' ? 'detailed work, health and fitness routines, service, or improving systems' : marsSign === 'Libra' ? 'artistic creation, legal work, mediation, or any activity requiring balance and strategy' : marsSign === 'Scorpio' ? 'research, investigation, transformation work, or activities requiring intensity and depth' : marsSign === 'Sagittarius' ? 'travel, sports, teaching, publishing, or any activity that expands horizons' : marsSign === 'Capricorn' ? 'business building, career advancement, mountain climbing, or ambitious long-term goals' : marsSign === 'Aquarius' ? 'activism, technology, innovation, or any activity that serves collective progress' : 'artistic creation, spiritual practice, healing work, or compassionate service'}.`,
        },
      ],
    },
    {
      id: 'jupiter',
      title: 'Jupiter: Your Path to Growth & Abundance',
      icon: '♃',
      subsections: [
        {
          title: `Jupiter in ${jupiterSign}: Where Fortune Finds You`,
          content: `Jupiter is the largest planet in our solar system, and astrologically it represents expansion, growth, luck, and abundance. Where Jupiter sits in your chart shows how you grow, what brings you opportunities, and where you naturally attract good fortune. It's often called the "Great Benefic" because its influence tends to be supportive and expansive.

${userName}, with Jupiter in ${jupiterSign}, your path to growth and abundance flows through ${signData[jupiterSign].keywords.slice(0, 3).join(', ')} experiences. This placement suggests that you expand and prosper when you embrace ${signData[jupiterSign].element} qualities and approach life with ${signData[jupiterSign].keywords[0]} energy.

**How You Experience Growth:**

Jupiter in ${jupiterSign} means you grow best through ${jupiterSign === 'Aries' ? 'taking bold risks, being a pioneer, and trusting your independent instincts. Fortune favors your courage - when you take initiative, the universe tends to support you. You expand through new beginnings and brave ventures' : jupiterSign === 'Taurus' ? 'patient accumulation, sensory experiences, and building lasting value. You attract abundance through reliability and appreciation of quality. Slow, steady growth brings you the greatest rewards' : jupiterSign === 'Gemini' ? 'learning, communication, and making connections. You expand through curiosity - every new piece of information, every conversation, every short journey brings opportunities. Mental flexibility is your fortune' : jupiterSign === 'Cancer' ? 'nurturing others, honoring family and roots, and trusting your intuition. You attract abundance through emotional generosity and creating safe spaces. Home and family are sources of growth for you' : jupiterSign === 'Leo' ? 'creative self-expression, generosity, and stepping into the spotlight. You expand through confidence - when you share your talents openly, recognition and opportunities follow. Joy attracts your fortune' : jupiterSign === 'Virgo' ? 'service, attention to detail, and continuous improvement. You attract abundance through being useful and competent. Your ability to refine and perfect brings opportunities others miss' : jupiterSign === 'Libra' ? 'partnerships, diplomacy, and creating harmony. You expand through relationships - collaboration brings you opportunities that solo efforts wouldn\'t. Beauty and fairness attract your fortune' : jupiterSign === 'Scorpio' ? 'transformation, depth, and facing life\'s mysteries. You attract abundance through intensity and psychological insight. Crises can become your greatest opportunities for growth' : jupiterSign === 'Sagittarius' ? 'adventure, philosophy, and expanding your horizons. Jupiter is at home in Sagittarius, making this a powerful placement for growth through travel, education, and big-picture thinking. Optimism is your fortune' : jupiterSign === 'Capricorn' ? 'ambition, discipline, and building structures. You attract abundance through hard work and strategic planning. Success comes through respecting rules and climbing steadily toward goals' : jupiterSign === 'Aquarius' ? 'innovation, community, and humanitarian causes. You expand through original thinking and working toward collective progress. Being different attracts your unique opportunities' : 'spirituality, creativity, and compassionate service. You attract abundance through faith and artistic expression. Surrender brings you more than striving. Dreams and intuition guide your fortune'}.

**Your Abundance Mindset:**

Jupiter reveals your natural relationship with abundance and optimism. With Jupiter in ${jupiterSign}, you believe that ${signData[jupiterSign].element === 'Fire' ? 'life rewards those who take action, that opportunities come to the bold, and that enthusiasm creates its own luck' : signData[jupiterSign].element === 'Earth' ? 'steady effort pays off, that resources should be wisely managed, and that practical application of wisdom brings results' : signData[jupiterSign].element === 'Air' ? 'ideas have power, that connections open doors, and that understanding brings freedom' : 'feelings matter, that generosity returns multiplied, and that faith and intuition guide us toward what we need'}.

**Potential Pitfalls:**

Jupiter's expansive nature can sometimes go too far. With your Jupiter in ${jupiterSign}, watch for tendencies toward ${jupiterSign === 'Aries' ? 'recklessness, overconfidence, or starting too many things at once without follow-through' : jupiterSign === 'Taurus' ? 'excessive materialism, indulgence, or resistance to change even when growth requires it' : jupiterSign === 'Gemini' ? 'scattered interests, superficial learning, or promising more than you can deliver' : jupiterSign === 'Cancer' ? 'emotional overprotection, clinging to the past, or using family as an excuse not to grow' : jupiterSign === 'Leo' ? 'egotism, excessive need for recognition, or dramatic gestures that overshadow substance' : jupiterSign === 'Virgo' ? 'perfectionism that prevents action, excessive worry, or being too critical of opportunities' : jupiterSign === 'Libra' ? 'over-reliance on partners, indecision about opportunities, or valuing appearance over substance' : jupiterSign === 'Scorpio' ? 'excessive intensity, power struggles, or using insight manipulatively rather than wisely' : jupiterSign === 'Sagittarius' ? 'over-promising, tactless truth-telling, or believing you know best without evidence' : jupiterSign === 'Capricorn' ? 'excessive focus on status, pessimism about possibilities, or sacrificing joy for achievement' : jupiterSign === 'Aquarius' ? 'stubbornness about unconventional approaches, emotional detachment, or rebellion without cause' : 'escapism, excessive idealism, or giving too much without maintaining boundaries'}.

**Activating Your Jupiter Gifts:**

To maximize your Jupiter blessings, regularly engage with ${jupiterSign} activities and environments. For you, this means prioritizing ${signData[jupiterSign].element === 'Fire' ? 'adventure, creative projects, and situations that require courage' : signData[jupiterSign].element === 'Earth' ? 'building tangible things, spending time in nature, and developing practical skills' : signData[jupiterSign].element === 'Air' ? 'learning, social activities, and intellectual exploration' : 'emotional connection, creative expression, and spiritual practice'}. When you feel stuck, returning to your Jupiter sign's energy often unlocks new growth.`,
          terms: [
            { term: 'Jupiter', definition: 'The planet of expansion, growth, luck, and abundance. Its sign shows how you naturally attract opportunities and where you experience the most growth.' },
            { term: 'Benefic Planet', definition: 'A planet considered to bring positive influences. Jupiter is the "Great Benefic" while Venus is the "Lesser Benefic."' },
          ],
        },
        {
          title: 'Jupiter and Your Life Philosophy',
          content: `Jupiter also represents your belief system, philosophy of life, and relationship with meaning, faith, and truth. It shows what you believe in and how you find purpose beyond day-to-day existence.

**Your Philosophical Approach:**

With Jupiter in ${jupiterSign}, your life philosophy tends toward ${jupiterSign === 'Aries' ? 'believing in individual potential and the power of courage. You have faith that action creates results, that life rewards the brave, and that everyone has the right to forge their own path. Your philosophy emphasizes authenticity and self-determination' : jupiterSign === 'Taurus' ? 'valuing stability, sensory beauty, and the wisdom of nature. You have faith in the material world, in the value of patience, and in the rewards of consistent effort. Your philosophy emphasizes appreciation and stewardship' : jupiterSign === 'Gemini' ? 'the power of ideas, curiosity, and connection. You have faith in learning, in the value of multiple perspectives, and in the ability of communication to solve problems. Your philosophy emphasizes mental exploration' : jupiterSign === 'Cancer' ? 'the importance of roots, emotional bonds, and nurturing. You have faith in family (biological or chosen), in the wisdom of feelings, and in the power of care to create growth. Your philosophy emphasizes belonging' : jupiterSign === 'Leo' ? 'the value of self-expression, creativity, and joy. You have faith in the human heart, in the importance of play, and in the power of generosity to transform lives. Your philosophy emphasizes authentic living' : jupiterSign === 'Virgo' ? 'the virtue of service, improvement, and practical wisdom. You have faith in effort, in the value of getting things right, and in the power of humble work to make a difference. Your philosophy emphasizes useful contribution' : jupiterSign === 'Libra' ? 'harmony, justice, and the power of relationship. You have faith in fairness, in the value of beauty, and in the ability of collaboration to achieve more than competition. Your philosophy emphasizes balance and connection' : jupiterSign === 'Scorpio' ? 'transformation, depth, and the power of facing truth. You have faith in rebirth, in the value of psychological honesty, and in the strength that comes from surviving difficulty. Your philosophy emphasizes evolution through crisis' : jupiterSign === 'Sagittarius' ? 'the quest for meaning, truth, and expansion. You have faith in the universe\'s benevolence, in the value of exploration, and in the existence of higher truths worth seeking. Your philosophy is optimistic and expansive' : jupiterSign === 'Capricorn' ? 'achievement, responsibility, and the wisdom of time. You have faith in effort, in the value of structure, and in the power of discipline to overcome obstacles. Your philosophy emphasizes earned success' : jupiterSign === 'Aquarius' ? 'progress, innovation, and collective evolution. You have faith in humanity\'s potential, in the value of original thinking, and in the power of working toward a better future. Your philosophy emphasizes contribution to the whole' : 'unity, compassion, and spiritual reality. You have faith in something beyond the material, in the value of surrender, and in the ultimate goodness behind apparent chaos. Your philosophy emphasizes transcendence'}.

**Teaching and Learning:**

Jupiter is connected to higher education, teaching, and the transmission of wisdom. Your Jupiter in ${jupiterSign} suggests you learn best through ${signData[jupiterSign].element === 'Fire' ? 'experiential, hands-on approaches that keep you engaged and inspired. Lecturing bores you; demonstration excites you' : signData[jupiterSign].element === 'Earth' ? 'practical, applicable instruction that produces tangible skills. Abstract theory without application frustrates you' : signData[jupiterSign].element === 'Air' ? 'discussion, reading, and intellectual exchange. You process through articulating ideas and hearing different perspectives' : 'immersive, emotionally engaging experiences that feel meaningful. Dry facts don\'t stick; stories and felt connections do'}. Similarly, you teach others best by sharing ${signData[jupiterSign].keywords[0]} wisdom in your own authentic style.`,
          tip: 'Jupiter transits (when Jupiter in the sky aspects your natal planets) often bring periods of growth and opportunity. Knowing your Jupiter sign helps you recognize and maximize these windows.',
        },
      ],
    },
    {
      id: 'saturn',
      title: 'Saturn: Your Challenges & Path to Mastery',
      icon: '♄',
      subsections: [
        {
          title: `Saturn in ${saturnSign}: Where You Build Strength`,
          content: `If Jupiter represents expansion and ease, Saturn represents contraction and challenge. But this isn't punishment - it's the universe's personal trainer. Saturn shows where you face your greatest challenges, but also where you can build your most enduring strengths. It's often called the "Great Teacher" because its lessons, though difficult, create lasting wisdom and character.

${userName}, with Saturn in ${saturnSign}, your life lessons center around ${signData[saturnSign].keywords.slice(0, 3).join(', ')} themes. This placement often creates early difficulties or a sense of inadequacy in these areas, but through conscious effort, you can develop exceptional ${signData[saturnSign].strengths[0].toLowerCase()} that becomes one of your greatest assets.

**Your Core Life Lesson:**

Saturn in ${saturnSign} teaches you to ${saturnSign === 'Aries' ? 'balance independence with interdependence, courage with caution. You may have early experiences that make you doubt your assertiveness or right to lead. The lesson is learning to take initiative while respecting consequences - to be brave and wise' : saturnSign === 'Taurus' ? 'find security within rather than through possessions alone. You may experience early financial instability or learn hard lessons about material attachment. The lesson is developing true self-worth and sustainable abundance' : saturnSign === 'Gemini' ? 'communicate with precision and take your ideas seriously. You may struggle early with learning, speaking, or being heard. The lesson is developing intellectual rigor and learning to say less but mean more' : saturnSign === 'Cancer' ? 'build emotional security independently of family patterns. You may experience early home instability or emotional coldness. The lesson is becoming your own nurturing parent and creating the safety you need' : saturnSign === 'Leo' ? 'find authentic confidence rather than seeking external validation. You may struggle with self-doubt, creative blocks, or fear of being seen. The lesson is shining your light regardless of audience response' : saturnSign === 'Virgo' ? 'accept imperfection while still striving for excellence. You may struggle with harsh self-criticism, health anxieties, or feeling never good enough. The lesson is useful service without destructive perfectionism' : saturnSign === 'Libra' ? 'maintain balance and fairness including toward yourself. You may struggle with relationships, finding that partnership brings challenges and lessons. The lesson is healthy interdependence based on mutual respect' : saturnSign === 'Scorpio' ? 'face the darkness without being consumed by it. You may encounter early experiences with loss, betrayal, or the shadow side of life. The lesson is transformative power that heals rather than destroys' : saturnSign === 'Sagittarius' ? 'ground your philosophy in practical reality. You may struggle with faith, finding your optimism tested by experience. The lesson is developing wisdom that integrates hope with reality' : saturnSign === 'Capricorn' ? 'achieve success while maintaining humanity. Saturn is at home in Capricorn, amplifying both discipline and pressure. The lesson is building structures that serve rather than imprison' : saturnSign === 'Aquarius' ? 'honor both your individuality and your need for community. You may feel isolated by your differentness or rejected for unconventional views. The lesson is being yourself while finding your people' : 'ground your spiritual life in everyday reality. You may struggle with boundaries, escapism, or feeling lost in the world. The lesson is bringing transcendent awareness into practical living'}.

**Your Saturn Fears:**

Saturn often represents our deepest fears and insecurities - the areas where we feel most vulnerable and most motivated to develop defenses. With Saturn in ${saturnSign}, you may harbor fears around ${saturnSign === 'Aries' ? 'not being strong enough, capable enough, or brave enough to succeed on your own terms' : saturnSign === 'Taurus' ? 'not having enough resources, losing what you have, or being fundamentally unworthy of abundance' : saturnSign === 'Gemini' ? 'not being smart enough, saying the wrong thing, or having your ideas dismissed or misunderstood' : saturnSign === 'Cancer' ? 'being abandoned, emotionally unsafe, or unable to create the home and family you need' : saturnSign === 'Leo' ? 'being insignificant, untalented, or unloved for who you truly are' : saturnSign === 'Virgo' ? 'making mistakes, being imperfect, or failing to be useful enough to justify your existence' : saturnSign === 'Libra' ? 'being alone, unfair treatment, or being fundamentally unlovable in partnership' : saturnSign === 'Scorpio' ? 'betrayal, loss of control, or having your vulnerabilities used against you' : saturnSign === 'Sagittarius' ? 'a meaningless life, being trapped, or having your faith proven wrong' : saturnSign === 'Capricorn' ? 'failure, loss of status, or being seen as incompetent or unworthy of respect' : saturnSign === 'Aquarius' ? 'being rejected for your true self, belonging nowhere, or your uniqueness being worthless' : 'being lost, overwhelmed, or unable to maintain the boundaries needed to survive'}.

Understanding these fears helps you work with them consciously rather than being unconsciously controlled by them.

**Saturn Returns: Your Cosmic Coming of Age:**

Saturn returns to its birth position approximately every 29.5 years. These Saturn Return periods (around ages 28-30, 57-59, and 86-88) are major life transitions. With your Saturn in ${saturnSign}, your Saturn Returns will focus on ${signData[saturnSign].keywords[0]} themes - expect significant growth, restructuring, and maturation in these areas during those ages.`,
          terms: [
            { term: 'Saturn', definition: 'The planet of discipline, challenges, and mastery. Its sign shows where you face your greatest lessons and can build your most enduring strengths.' },
            { term: 'Saturn Return', definition: 'When Saturn returns to its position at your birth (around ages 29-30, 58-59, 87-88). Major life transitions focused on maturation and responsibility.' },
          ],
        },
        {
          title: 'Working With Your Saturn',
          content: `Saturn responds to respect, effort, and patience. Unlike Jupiter's easy gifts, Saturn's rewards must be earned - but once earned, they cannot be taken away.

**Your Saturn Strengths (When Developed):**

Through facing Saturn in ${saturnSign} challenges, you can develop exceptional ${saturnSign === 'Aries' ? 'leadership ability, courage that comes from facing fear, and the capacity to take initiative when others hesitate. You become a model of authentic self-direction' : saturnSign === 'Taurus' ? 'financial wisdom, unshakeable values, and the ability to build lasting security. You become a model of sustainable abundance and genuine self-worth' : saturnSign === 'Gemini' ? 'mental discipline, precise communication, and the ability to think deeply about what matters. You become a model of intellectual integrity and effective expression' : saturnSign === 'Cancer' ? 'emotional maturity, the ability to nurture without losing yourself, and the creation of genuine security. You become a model of healthy emotional boundaries' : saturnSign === 'Leo' ? 'authentic confidence, creative discipline, and the ability to shine without needing applause. You become a model of self-validation and genuine creative expression' : saturnSign === 'Virgo' ? 'practical excellence, healing abilities, and the capacity to serve without self-destruction. You become a model of useful contribution and healthy standards' : saturnSign === 'Libra' ? 'relational wisdom, fairness in action, and the ability to maintain balance under pressure. You become a model of healthy partnership and justice' : saturnSign === 'Scorpio' ? 'psychological depth, transformative power, and the ability to face any darkness. You become a model of resurrection and healing through truth' : saturnSign === 'Sagittarius' ? 'grounded wisdom, teaching ability, and faith that has been tested and proven. You become a model of meaningful philosophy put into practice' : saturnSign === 'Capricorn' ? 'achievement, integrity, and the ability to build lasting structures. You become a model of disciplined success and responsible authority' : saturnSign === 'Aquarius' ? 'innovative thinking, community building, and the courage to be yourself regardless of convention. You become a model of authentic individuality in service to the collective' : 'spiritual depth, compassionate boundaries, and the ability to bring transcendence into daily life. You become a model of grounded spirituality'}.

**Practical Saturn Work:**

To work constructively with your Saturn in ${saturnSign}:

1. **Acknowledge the difficulty**: Don't pretend Saturn areas are easy. They're not - and pretending creates shame.

2. **Commit to gradual improvement**: Saturn rewards patience. Small, consistent efforts over years create mastery.

3. **Find mentors**: People who have mastered what Saturn challenges you in can accelerate your growth.

4. **Embrace structure**: Saturn loves discipline. Creating routines around your ${saturnSign} challenges helps you develop competence.

5. **Celebrate progress**: Saturn's timeline is long. Notice and honor how far you've come.

**Saturn's Gift:**

The ultimate Saturn gift is authority - not power over others, but genuine expertise that allows you to guide others through what you've mastered. Your Saturn in ${saturnSign} challenges you to become a genuine ${signData[saturnSign].archetype.toLowerCase()} through lived experience, not theory.`,
          tip: 'Saturn is not your enemy but your most demanding teacher. What Saturn restricts, it eventually strengthens. Trust the process.',
        },
      ],
    },
    {
      id: 'outer-planets',
      title: 'The Outer Planets: Generational Influences',
      icon: '🌌',
      subsections: [
        {
          title: 'Uranus, Neptune & Pluto in Your Chart',
          content: `The outer planets (Uranus, Neptune, and Pluto) move slowly through the zodiac, spending years or even decades in each sign. This means everyone born around the same time shares these placements - they're generational signatures rather than individual traits.

However, while the SIGN of your outer planets is shared with your generation, the HOUSE placement and aspects to personal planets are uniquely yours, showing how these generational themes play out in your individual life.

**Uranus: The Revolutionary**

Uranus represents innovation, rebellion, sudden change, and the desire for freedom. It shows where you (and your generation) break from tradition and seek to do things differently.

Your Uranus placement indicates where you:
- Resist conformity and seek authentic self-expression
- Experience sudden insights or unexpected changes
- Bring innovative approaches that surprise others
- Feel the need for freedom and independence

Uranus themes in your life may manifest as sudden changes, brilliant insights, or a strong need for independence in certain areas. When Uranus is active by transit, expect the unexpected.

**Neptune: The Mystic**

Neptune represents spirituality, dreams, imagination, and transcendence - but also illusion, confusion, and escapism. It shows where you (and your generation) seek to dissolve boundaries and connect with something greater.

Your Neptune placement indicates where you:
- Access creativity, imagination, and spiritual sensitivity
- May experience confusion, deception, or idealistic illusions
- Seek to transcend ordinary reality
- Feel compassion and the desire to serve

Neptune areas of life require discernment - the ability to tell the difference between genuine inspiration and wishful thinking. Beauty, art, and spirituality flourish here, but so can addiction and avoidance.

**Pluto: The Transformer**

Pluto represents deep transformation, power, death and rebirth, and the exposure of hidden truths. It shows where you (and your generation) experience profound change and confront the shadowy aspects of human nature.

Your Pluto placement indicates where you:
- Experience intense transformation and regeneration
- Confront power dynamics and your own shadow
- Develop psychological depth and research abilities
- Face the cycles of death and rebirth metaphorically

Pluto areas of life don't do anything halfway. Superficiality is impossible here - you're drawn into depth whether you choose it or not. Pluto transits often coincide with life-changing transformations.`,
          terms: [
            { term: 'Outer Planets', definition: 'Uranus, Neptune, and Pluto. They move slowly and represent generational themes, but their house placement shows how these themes manifest individually.' },
            { term: 'Generational Influence', definition: 'Astrological themes shared by everyone born within a certain time period due to slow-moving planets occupying the same sign.' },
          ],
        },
        {
          title: 'Integrating All Your Planetary Energies',
          content: `Your birth chart is a symphony of all these planetary voices - from the Sun's core identity to Pluto's transformative depths. Understanding how they work together is the key to using astrology practically.

**The Inner vs. Outer Planet Dynamic:**

Your personal planets (Sun through Mars) describe your individual psychology and daily experience. Your social planets (Jupiter and Saturn) describe how you relate to society, opportunity, and limitation. Your outer planets (Uranus, Neptune, Pluto) describe the larger evolutionary currents affecting your generation and how they manifest in your life.

**How They Work Together:**

In your chart:
- Your ${sunSign} Sun is the conductor - your core identity orchestrating everything else
- Your ${moonSign} Moon provides the emotional foundation from which you experience life
- Your ${risingSign} Rising is the instrument through which you play your cosmic music
- Mercury, Venus, and Mars are your primary tools for thinking, loving, and acting
- Jupiter and Saturn set the parameters of growth and challenge
- The outer planets connect you to forces larger than individual psychology

**Your Unique Integration:**

${userName}, with your particular combination of placements, you're learning to:
1. Express your ${sunSign} identity in the world
2. Honor your ${moonSign} emotional needs
3. Develop your ${risingSign} approach to life
4. Communicate with ${mercurySign} style
5. Love with ${venusSign} values
6. Act with ${marsSign} drive
7. Grow through ${jupiterSign} expansion
8. Master ${saturnSign} challenges

This is a lifelong journey of integration. No one masters all their chart energies quickly - but understanding them consciously accelerates growth and reduces unnecessary suffering.`,
          tip: 'Your chart is a process, not a fixed portrait. You grow into your chart potentials over a lifetime. Trust your timing.',
        },
      ],
    },
    {
      id: 'life-purpose',
      title: 'Your Life Purpose & Soul\'s Journey',
      icon: '✨',
      subsections: [
        {
          title: 'Synthesizing Your Cosmic Blueprint',
          content: `Now that we\'ve explored the major players in your chart, let\'s weave them together to understand your life purpose and soul\'s journey.

${userName}, your chart tells the story of someone learning to integrate ${sunData.element} identity (your ${sunSign} Sun) with ${moonData.element} emotions (your ${moonSign} Moon), expressed through a ${risingData.element} approach to life (your ${risingSign} Rising).

**Your Core Purpose:**

Your ${sunSign} Sun in the ${sunHouse}${sunHouse === 1 ? 'st' : sunHouse === 2 ? 'nd' : sunHouse === 3 ? 'rd' : 'th'} House suggests your life purpose centers on ${houseData[sunHouse].theme.toLowerCase()}. You're here to express your ${sunData.keywords[0]} nature through ${houseData[sunHouse].keywords[0]}.

**Your Emotional Journey:**

Your ${moonSign} Moon indicates that emotional fulfillment comes through ${moonData.keywords[0]} experiences. Your soul craves ${moonSign === 'Aries' ? 'independence and fresh starts' : moonSign === 'Taurus' ? 'stability and sensory pleasure' : moonSign === 'Gemini' ? 'mental stimulation and variety' : moonSign === 'Cancer' ? 'nurturing and belonging' : moonSign === 'Leo' ? 'creative expression and recognition' : moonSign === 'Virgo' ? 'useful service and continuous improvement' : moonSign === 'Libra' ? 'harmony and partnership' : moonSign === 'Scorpio' ? 'depth and transformation' : moonSign === 'Sagittarius' ? 'adventure and meaning' : moonSign === 'Capricorn' ? 'achievement and respect' : moonSign === 'Aquarius' ? 'freedom and uniqueness' : 'transcendence and spiritual connection'}.

**Your Growth Edge:**

The combination of ${sunSign} Sun and ${moonSign} Moon creates a ${sunData.element === moonData.element ? 'harmonious resonance, but you may need to consciously develop ' + (sunData.element === 'Fire' ? 'grounding and patience' : sunData.element === 'Earth' ? 'emotional expression and spontaneity' : sunData.element === 'Air' ? 'emotional depth and follow-through' : 'intellectual objectivity and action') : 'creative tension'} that fuels your evolution. You're learning to ${sunData.element === 'Fire' && moonData.element === 'Water' ? 'balance action with feeling, courage with sensitivity' : sunData.element === 'Fire' && moonData.element === 'Earth' ? 'ground your inspiration in practical reality' : sunData.element === 'Fire' && moonData.element === 'Air' ? 'channel your enthusiasm into effective communication' : sunData.element === 'Earth' && moonData.element === 'Water' ? 'honor both practical needs and emotional depths' : sunData.element === 'Earth' && moonData.element === 'Fire' ? 'take inspired risks while maintaining stability' : sunData.element === 'Earth' && moonData.element === 'Air' ? 'bridge the practical and the conceptual' : sunData.element === 'Air' && moonData.element === 'Water' ? 'integrate thinking with feeling' : sunData.element === 'Air' && moonData.element === 'Fire' ? 'transform ideas into inspired action' : sunData.element === 'Air' && moonData.element === 'Earth' ? 'manifest concepts into tangible form' : sunData.element === 'Water' && moonData.element === 'Fire' ? 'express emotions through creative action' : sunData.element === 'Water' && moonData.element === 'Earth' ? 'give practical form to your intuitions' : 'deepen your emotional and intuitive nature'}.`,
          visual: {
            type: 'modality-balance',
            title: 'Your Modal Balance',
            data: modalities,
          },
        },
        {
          title: 'Your Gift to the World',
          content: `Every chart has something unique to offer the world - a combination of talents and perspectives that only you possess.

**Your ${sunSign} Gift:**

${sunData.giftToWorld}

**Your Unique Combination:**

With ${sunSign} Sun, ${moonSign} Moon, and ${risingSign} Rising, you offer the world:
- The ${sunData.keywords[0]} drive of ${sunSign}
- The ${moonData.keywords[0]} sensitivity of ${moonSign}
- The ${risingData.keywords[0]} approach of ${risingSign}

This specific combination is rare and valuable. When you're living authentically, you naturally benefit others through your unique blend of energies.

**Advice for Fulfilling Your Purpose:**

1. **Honor your Sun**: Make time for activities that let your ${sunSign} nature shine. This isn't selfish - it's essential.

2. **Nurture your Moon**: Meet your ${moonSign} emotional needs consistently. Self-care isn't optional; it's the foundation.

3. **Use your Rising**: Let your ${risingSign} approach be your vehicle into the world. It's not a mask but a genuine part of you.

4. **Integrate opposites**: Where your chart has tension, there's creative potential. Don't try to eliminate half of yourself.

5. **Trust the timing**: Your chart unfolds over a lifetime. You don't need to master everything at once.

${userName}, your chart reveals someone with genuine gifts to offer. The more you understand and accept your cosmic nature, the more fully you can live your purpose.`,
          tip: 'Your chart is a lifelong journey of integration. Every decade reveals new layers of meaning in the same positions.',
        },
      ],
    },
    {
      id: 'conclusion',
      title: 'Embracing Your Cosmic Self',
      icon: '🌟',
      subsections: [
        {
          title: 'Your Personalized Affirmations',
          content: `Based on your chart, here are affirmations aligned with your cosmic nature:

**For Your ${sunSign} Sun:**
"I embrace my ${sunData.keywords[0]} nature and shine my light without apology."

**For Your ${moonSign} Moon:**
"I honor my need for ${moonSign === 'Aries' ? 'independence and fresh beginnings' : moonSign === 'Taurus' ? 'stability and sensory pleasure' : moonSign === 'Gemini' ? 'mental stimulation and variety' : moonSign === 'Cancer' ? 'nurturing and emotional safety' : moonSign === 'Leo' ? 'recognition and creative expression' : moonSign === 'Virgo' ? 'order and meaningful service' : moonSign === 'Libra' ? 'harmony and beautiful surroundings' : moonSign === 'Scorpio' ? 'depth and authentic connection' : moonSign === 'Sagittarius' ? 'freedom and meaningful adventure' : moonSign === 'Capricorn' ? 'achievement and respect' : moonSign === 'Aquarius' ? 'independence and intellectual stimulation' : 'spiritual connection and creative expression'}."

**For Your ${risingSign} Rising:**
"I trust my ${risingData.keywords[0]} approach to life as my genuine way of meeting the world."

**For Integration:**
"I am a unique expression of the cosmos - my combination of ${sunSign} Sun, ${moonSign} Moon, and ${risingSign} Rising serves a purpose only I can fulfill."

**Daily Practice:**
Read these affirmations each morning, or write your own based on what you've learned about your chart. The goal isn't to change yourself but to more fully become yourself.`,
        },
        {
          title: 'Moving Forward',
          content: `${userName}, this report has covered the major elements of your birth chart, but there's always more to explore. Astrology is a language that deepens the more you use it.

**What You've Learned:**

- Your ${sunSign} Sun represents your core identity and life purpose
- Your ${moonSign} Moon reveals your emotional nature and deepest needs
- Your ${risingSign} Rising shows how you approach life and how others see you
- Your Mercury, Venus, and Mars add nuance to how you think, love, and act
- The houses show where these energies express in your life

**What Comes Next:**

1. **Live with this information**: Don't just read it once. Return to relevant sections when you need guidance.

2. **Observe yourself**: Notice when your ${sunSign}, ${moonSign}, and ${risingSign} energies are active. Self-observation makes astrology practical.

3. **Extend grace**: Use this understanding for self-compassion. Your challenges are part of your design, not failures.

4. **Share thoughtfully**: Understanding others' charts builds empathy. But astrology is best used for understanding, not judging.

5. **Continue learning**: This report covers natal astrology basics. Transits, progressions, and other techniques add layers of timing and evolution.

**A Final Thought:**

Your birth chart is a map, not a cage. It shows your terrain - the hills and valleys of your psychological landscape - but you choose where to walk. The most fulfilled people aren't those with "easy" charts; they're those who work consciously with whatever chart they have.

You were born at exactly the right moment to be exactly who you need to be. Trust your cosmic design, ${userName}. The stars believe in you.`,
        },
      ],
    },
  ]

  // Create glossary from all terms
  const allTerms: ReportTerm[] = []
  for (const section of sections) {
    for (const subsection of section.subsections) {
      if (subsection.terms) {
        allTerms.push(...subsection.terms)
      }
    }
  }

  // Calculate word count
  let wordCount = 0
  for (const section of sections) {
    for (const subsection of section.subsections) {
      wordCount += subsection.content.split(/\s+/).length
    }
  }

  return {
    id: `personality-v2-${Date.now()}`,
    slug: 'personality-deep-dive',
    title: 'Personality Deep Dive',
    generatedAt: new Date().toISOString(),
    userName,
    birthData: {
      date: '',
      time: '',
      place: '',
      sunSign,
      moonSign,
      risingSign,
    },
    summary: {
      headline: `${sunSign} Sun, ${moonSign} Moon, ${risingSign} Rising`,
      overview: `You are a ${dominantElement}-dominant individual with ${dominantModality} energy, expressing through the lens of ${sunSign}'s ${sunData.keywords[0]} nature.`,
      keyStrengths: [sunData.strengths[0], moonData.strengths[0], risingData.strengths[0]],
      growthAreas: [sunData.challenges[0], moonData.challenges[0]],
    },
    visuals: [
      { type: 'chart-wheel', title: 'Your Birth Chart', data: { sun: sunSign, moon: moonSign, rising: risingSign } },
      { type: 'element-balance', title: 'Elemental Balance', data: elements },
      { type: 'modality-balance', title: 'Modal Balance', data: modalities },
      { type: 'house-emphasis', title: 'House Emphasis', data: houseEmphasis },
    ],
    sections,
    glossary: allTerms,
    wordCount,
  }
}

// Relationship Compatibility Report Generator
export function generateRelationshipReportV2(
  chart1: NatalChart,
  userName1: string,
  chart2: NatalChart,
  userName2: string
): GeneratedReportV2 {
  // Get key placements for both people
  const sun1 = getPlacement(chart1, 'sun')
  const moon1 = getPlacement(chart1, 'moon')
  const venus1 = getPlacement(chart1, 'venus')
  const mars1 = getPlacement(chart1, 'mars')
  const mercury1 = getPlacement(chart1, 'mercury')

  const sun2 = getPlacement(chart2, 'sun')
  const moon2 = getPlacement(chart2, 'moon')
  const venus2 = getPlacement(chart2, 'venus')
  const mars2 = getPlacement(chart2, 'mars')
  const mercury2 = getPlacement(chart2, 'mercury')

  const sunSign1 = capitalizeSign(sun1?.sign || 'Aries')
  const moonSign1 = capitalizeSign(moon1?.sign || 'Cancer')
  const venusSign1 = capitalizeSign(venus1?.sign || 'Libra')
  const marsSign1 = capitalizeSign(mars1?.sign || 'Aries')
  const mercurySign1 = capitalizeSign(mercury1?.sign || 'Gemini')
  const risingSign1 = capitalizeSign(chart1.ascendant?.sign || 'Aries')

  const sunSign2 = capitalizeSign(sun2?.sign || 'Libra')
  const moonSign2 = capitalizeSign(moon2?.sign || 'Pisces')
  const venusSign2 = capitalizeSign(venus2?.sign || 'Leo')
  const marsSign2 = capitalizeSign(mars2?.sign || 'Scorpio')
  const mercurySign2 = capitalizeSign(mercury2?.sign || 'Virgo')
  const risingSign2 = capitalizeSign(chart2.ascendant?.sign || 'Libra')

  const sunData1 = signData[sunSign1]
  const sunData2 = signData[sunSign2]
  const moonData1 = signData[moonSign1]
  const moonData2 = signData[moonSign2]
  const venusData1 = signData[venusSign1]
  const venusData2 = signData[venusSign2]
  const marsData1 = signData[marsSign1]
  const marsData2 = signData[marsSign2]

  // Calculate element compatibility
  const element1 = sunData1.element
  const element2 = sunData2.element
  const elementCompatibility = getElementCompatibility(element1, element2)

  // Calculate modality compatibility
  const modality1 = sunData1.modality
  const modality2 = sunData2.modality
  const modalityCompatibility = getModalityCompatibility(modality1, modality2)

  const sections: ReportSectionV2[] = [
    {
      id: 'introduction',
      title: 'Your Cosmic Connection',
      icon: '💫',
      subsections: [
        {
          title: 'Understanding Synastry',
          content: `Welcome to your relationship compatibility report for ${userName1} and ${userName2}. This report uses synastry - the astrological technique of comparing two birth charts - to reveal the cosmic dynamics at play in your relationship.

Synastry doesn't determine whether a relationship will "work" or not. Free will and conscious effort always trump astrology. What synastry DOES reveal is the natural dynamics between two people - where connection flows easily, where friction might arise, and how you can work with your cosmic blueprint rather than against it.

Think of this report as a relationship user manual. It won't tell you the destination, but it will help you understand the vehicle you're driving together.

**Important to Remember:**
Every combination of signs has strengths and challenges. There's no such thing as "incompatible" signs - only different dynamics that require different approaches. The most challenging aspects often indicate the most transformative relationships, while the easiest connections might lack the friction needed for growth.`,
          terms: [
            { term: 'Synastry', definition: 'The astrological technique of comparing two birth charts to understand relationship dynamics, compatibility, and potential challenges.' },
            { term: 'Aspect', definition: 'The angular relationship between planets in two charts. Conjunctions, trines, and sextiles are generally harmonious; squares and oppositions create tension but also attraction.' },
          ],
        },
        {
          title: 'Your Compatibility at a Glance',
          content: `**${userName1}'s Core Energy:**
- Sun in ${sunSign1}: ${sunData1.keywords.slice(0, 3).join(', ')}
- Moon in ${moonSign1}: Emotional nature is ${moonData1.keywords.slice(0, 2).join(' and ')}
- Venus in ${venusSign1}: Loves through ${venusData1.keywords.slice(0, 2).join(' and ')}
- Mars in ${marsSign1}: Asserts through ${marsData1.keywords.slice(0, 2).join(' and ')}

**${userName2}'s Core Energy:**
- Sun in ${sunSign2}: ${sunData2.keywords.slice(0, 3).join(', ')}
- Moon in ${moonSign2}: Emotional nature is ${moonData2.keywords.slice(0, 2).join(' and ')}
- Venus in ${venusSign2}: Loves through ${venusData2.keywords.slice(0, 2).join(' and ')}
- Mars in ${marsSign2}: Asserts through ${marsData2.keywords.slice(0, 2).join(' and ')}

**Elemental Compatibility:** ${elementCompatibility.rating}
${elementCompatibility.description}

**Modal Compatibility:** ${modalityCompatibility.rating}
${modalityCompatibility.description}`,
          tip: 'Remember that compatibility isn\'t about finding someone identical to you - differences create growth opportunities and keep things interesting.',
        },
      ],
    },
    {
      id: 'sun-connection',
      title: 'Core Identity Connection (Sun-Sun)',
      icon: '☀️',
      subsections: [
        {
          title: `${sunSign1} Meets ${sunSign2}: Your Essential Dynamic`,
          content: `The Sun-Sun connection reveals how your core identities interact. This is about who you fundamentally ARE and whether those essential selves harmonize, clash, or somewhere in between.

**${userName1}'s ${sunSign1} Sun:**
${userName1} is at their core ${sunData1.keywords.slice(0, 3).join(', ')}. As a ${element1} sign, ${userName1} processes life through ${element1 === 'Fire' ? 'action and inspiration' : element1 === 'Earth' ? 'practical application' : element1 === 'Air' ? 'ideas and communication' : 'emotion and intuition'}. Their life force is expressed through ${sunData1.archetype.toLowerCase()} energy.

**${userName2}'s ${sunSign2} Sun:**
${userName2} is at their core ${sunData2.keywords.slice(0, 3).join(', ')}. As a ${element2} sign, ${userName2} processes life through ${element2 === 'Fire' ? 'action and inspiration' : element2 === 'Earth' ? 'practical application' : element2 === 'Air' ? 'ideas and communication' : 'emotion and intuition'}. Their life force is expressed through ${sunData2.archetype.toLowerCase()} energy.

**How Your Suns Interact:**

${getSunSunCompatibility(sunSign1, sunSign2)}

**Working With This Dynamic:**

${getSunSunAdvice(sunSign1, sunSign2, userName1, userName2)}`,
          terms: [
            { term: 'Sun Sign Compatibility', definition: 'How two people\'s core identities and life purposes interact. The Sun represents the ego, vitality, and fundamental nature.' },
          ],
        },
        {
          title: 'Strengths of Your Sun Connection',
          content: `Every Sun sign combination brings unique gifts. Here's what ${sunSign1} and ${sunSign2} bring out in each other:

**What ${userName1} Brings to ${userName2}:**
${sunSign1 === 'Aries' ? 'Courage to take action, infectious enthusiasm, directness that cuts through indecision' : sunSign1 === 'Taurus' ? 'Grounding stability, sensual appreciation, patience that creates security' : sunSign1 === 'Gemini' ? 'Mental stimulation, variety and fun, ability to see multiple perspectives' : sunSign1 === 'Cancer' ? 'Emotional depth, nurturing care, a sense of home and belonging' : sunSign1 === 'Leo' ? 'Warmth and generosity, creative inspiration, the courage to be seen' : sunSign1 === 'Virgo' ? 'Practical help, attention to detail, improvement and refinement' : sunSign1 === 'Libra' ? 'Harmony and balance, aesthetic appreciation, diplomatic perspective' : sunSign1 === 'Scorpio' ? 'Emotional intensity, transformative depth, unwavering loyalty' : sunSign1 === 'Sagittarius' ? 'Optimism and vision, philosophical perspective, adventure and growth' : sunSign1 === 'Capricorn' ? 'Structure and ambition, long-term vision, dependable commitment' : sunSign1 === 'Aquarius' ? 'Fresh perspective, intellectual stimulation, freedom to be unique' : 'Compassion and imagination, spiritual depth, unconditional acceptance'}

**What ${userName2} Brings to ${userName1}:**
${sunSign2 === 'Aries' ? 'Courage to take action, infectious enthusiasm, directness that cuts through indecision' : sunSign2 === 'Taurus' ? 'Grounding stability, sensual appreciation, patience that creates security' : sunSign2 === 'Gemini' ? 'Mental stimulation, variety and fun, ability to see multiple perspectives' : sunSign2 === 'Cancer' ? 'Emotional depth, nurturing care, a sense of home and belonging' : sunSign2 === 'Leo' ? 'Warmth and generosity, creative inspiration, the courage to be seen' : sunSign2 === 'Virgo' ? 'Practical help, attention to detail, improvement and refinement' : sunSign2 === 'Libra' ? 'Harmony and balance, aesthetic appreciation, diplomatic perspective' : sunSign2 === 'Scorpio' ? 'Emotional intensity, transformative depth, unwavering loyalty' : sunSign2 === 'Sagittarius' ? 'Optimism and vision, philosophical perspective, adventure and growth' : sunSign2 === 'Capricorn' ? 'Structure and ambition, long-term vision, dependable commitment' : sunSign2 === 'Aquarius' ? 'Fresh perspective, intellectual stimulation, freedom to be unique' : 'Compassion and imagination, spiritual depth, unconditional acceptance'}

**Together, You Create:**
A dynamic where ${element1} meets ${element2}, creating ${elementCompatibility.togetherCreate}.`,
        },
      ],
    },
    {
      id: 'emotional-connection',
      title: 'Emotional Bond (Moon-Moon)',
      icon: '🌙',
      subsections: [
        {
          title: `${moonSign1} Moon Meets ${moonSign2} Moon`,
          content: `The Moon-Moon connection is arguably the most important for long-term relationships. While Sun signs determine attraction and identity compatibility, Moon signs determine emotional compatibility - whether you can truly LIVE with someone day to day.

Your Moon signs reveal how you process emotions, what you need to feel secure, and how you nurture and want to be nurtured. When Moon signs are compatible, you feel "at home" with each other. When they clash, daily life can feel like an emotional minefield.

**${userName1}'s ${moonSign1} Moon Needs:**
${moonData1.element === 'Water' ? `Emotional depth, intuitive connection, and space to feel deeply. ${userName1} processes through emotion and needs to feel safe to be vulnerable. Their feelings run deep and they need a partner who honors that depth.` : moonData1.element === 'Fire' ? `Enthusiasm, spontaneity, and emotional honesty. ${userName1} processes through action and expression - they need to feel their emotions, express them, and move on. Dwelling or brooding feels toxic to them.` : moonData1.element === 'Earth' ? `Stability, practical demonstrations of care, and physical comfort. ${userName1} feels most secure with routine, tangible expressions of love, and a partner who shows up consistently.` : `Space to process, intellectual understanding of feelings, and emotional freedom. ${userName1} may need to think about feelings before expressing them and values a partner who doesn't pressure emotional intensity.`}

**${userName2}'s ${moonSign2} Moon Needs:**
${moonData2.element === 'Water' ? `Emotional depth, intuitive connection, and space to feel deeply. ${userName2} processes through emotion and needs to feel safe to be vulnerable. Their feelings run deep and they need a partner who honors that depth.` : moonData2.element === 'Fire' ? `Enthusiasm, spontaneity, and emotional honesty. ${userName2} processes through action and expression - they need to feel their emotions, express them, and move on. Dwelling or brooding feels toxic to them.` : moonData2.element === 'Earth' ? `Stability, practical demonstrations of care, and physical comfort. ${userName2} feels most secure with routine, tangible expressions of love, and a partner who shows up consistently.` : `Space to process, intellectual understanding of feelings, and emotional freedom. ${userName2} may need to think about feelings before expressing them and values a partner who doesn't pressure emotional intensity.`}

**Your Emotional Dynamic:**
${getMoonMoonCompatibility(moonSign1, moonSign2, userName1, userName2)}`,
          terms: [
            { term: 'Moon Sign', definition: 'The zodiac sign the Moon was in at birth, representing emotional needs, instinctive reactions, and what makes someone feel secure.' },
          ],
        },
        {
          title: 'Creating Emotional Safety Together',
          content: `For your specific Moon combination to thrive, you'll want to understand and honor each other's emotional languages.

**How ${userName1} Shows Care (${moonSign1} Moon Style):**
${getMoonCareStyle(moonSign1)}

**How ${userName2} Shows Care (${moonSign2} Moon Style):**
${getMoonCareStyle(moonSign2)}

**Potential Emotional Friction:**
${getMoonFriction(moonSign1, moonSign2, userName1, userName2)}

**Bridge-Building Strategies:**
1. ${getMoonBridge1(moonSign1, moonSign2)}
2. ${getMoonBridge2(moonSign1, moonSign2)}
3. Recognize that different doesn't mean wrong - ${userName1}'s ${moonSign1} way of processing emotions is just as valid as ${userName2}'s ${moonSign2} way.`,
          tip: 'The Moon rules our unconscious patterns. You may not even realize you\'re doing something that triggers your partner until it\'s discussed openly.',
        },
      ],
    },
    {
      id: 'love-style',
      title: 'Love Languages (Venus-Venus)',
      icon: '💕',
      subsections: [
        {
          title: `How You Love: ${venusSign1} Meets ${venusSign2}`,
          content: `Venus rules how we give and receive love, what we find beautiful, and what we value in relationships. Understanding each other's Venus signs is key to making your partner feel truly loved.

**${userName1}'s Venus in ${venusSign1}:**
${getVenusLoveStyle(venusSign1, userName1)}

**${userName2}'s Venus in ${venusSign2}:**
${getVenusLoveStyle(venusSign2, userName2)}

**Your Romantic Chemistry:**
${getVenusVenusCompatibility(venusSign1, venusSign2, userName1, userName2)}

**Making Each Other Feel Loved:**

For ${userName1} to feel loved, ${userName2} should:
${getVenusTips(venusSign1)}

For ${userName2} to feel loved, ${userName1} should:
${getVenusTips(venusSign2)}`,
          terms: [
            { term: 'Venus Sign', definition: 'The zodiac sign Venus was in at birth, revealing how someone expresses love, what they find beautiful, and their romantic style.' },
          ],
        },
        {
          title: 'Values & What You Build Together',
          content: `Venus also rules values - what you consider important in life. When Venus signs align on values, building a life together is easier. When they differ, conscious compromise becomes essential.

**${userName1}'s Core Values (${venusSign1} Venus):**
${getVenusValues(venusSign1)}

**${userName2}'s Core Values (${venusSign2} Venus):**
${getVenusValues(venusSign2)}

**Where Your Values Align:**
${getVenusValuesAlignment(venusSign1, venusSign2)}

**Where You May Need to Compromise:**
${getVenusValuesCompromise(venusSign1, venusSign2, userName1, userName2)}`,
        },
      ],
    },
    {
      id: 'passion-conflict',
      title: 'Passion & Conflict (Mars-Mars)',
      icon: '🔥',
      subsections: [
        {
          title: `${marsSign1} Mars Meets ${marsSign2} Mars`,
          content: `Mars rules passion, drive, anger, and how we go after what we want. In relationships, Mars shows up in the bedroom, in conflicts, and in how you motivate each other. This is the raw, primal energy of your connection.

**${userName1}'s Mars in ${marsSign1}:**
${getMarsStyle(marsSign1, userName1)}

**${userName2}'s Mars in ${marsSign2}:**
${getMarsStyle(marsSign2, userName2)}

**Your Passion Dynamic:**
${getMarsMarsChemistry(marsSign1, marsSign2, userName1, userName2)}`,
          terms: [
            { term: 'Mars Sign', definition: 'The zodiac sign Mars was in at birth, revealing how someone pursues goals, expresses anger, and approaches physical intimacy.' },
          ],
        },
        {
          title: 'Navigating Conflict Together',
          content: `Every couple fights. What matters is HOW you fight. Your Mars signs reveal your conflict styles and how to resolve disagreements more constructively.

**${userName1}'s Conflict Style (${marsSign1} Mars):**
${getMarsConflictStyle(marsSign1)}

**${userName2}'s Conflict Style (${marsSign2} Mars):**
${getMarsConflictStyle(marsSign2)}

**Where Friction May Arise:**
${getMarsFriction(marsSign1, marsSign2, userName1, userName2)}

**Healthy Conflict Resolution for Your Combination:**
${getMarsResolution(marsSign1, marsSign2, userName1, userName2)}`,
          tip: 'Mars energy needs an outlet. If you\'re not fighting about real issues, suppressed Mars energy can emerge as passive-aggression, resentment, or loss of passion.',
        },
      ],
    },
    {
      id: 'communication',
      title: 'Communication Styles (Mercury)',
      icon: '💬',
      subsections: [
        {
          title: `How You Think & Talk: ${mercurySign1} and ${mercurySign2}`,
          content: `Mercury rules communication, thinking patterns, and how we process information. When Mercury signs click, conversations flow easily. When they clash, misunderstandings abound - not from bad intentions, but from genuinely different ways of thinking.

**${userName1}'s Mercury in ${mercurySign1}:**
${getMercuryStyle(mercurySign1, userName1)}

**${userName2}'s Mercury in ${mercurySign2}:**
${getMercuryStyle(mercurySign2, userName2)}

**Your Communication Dynamic:**
${getMercuryMercuryDynamic(mercurySign1, mercurySign2, userName1, userName2)}

**Communication Tips for Your Combination:**
1. ${getMercuryTip1(mercurySign1, mercurySign2, userName1, userName2)}
2. ${getMercuryTip2(mercurySign1, mercurySign2, userName1, userName2)}
3. Remember that ${userName1} thinks in a ${signData[mercurySign1].element} way while ${userName2} thinks in a ${signData[mercurySign2].element} way - neither is right or wrong.`,
          terms: [
            { term: 'Mercury Sign', definition: 'The zodiac sign Mercury was in at birth, revealing communication style, learning preferences, and thinking patterns.' },
          ],
        },
      ],
    },
    {
      id: 'strengths',
      title: 'Your Relationship Superpowers',
      icon: '✨',
      subsections: [
        {
          title: 'What Makes Your Connection Special',
          content: `Every relationship has unique gifts - qualities that make YOUR connection unlike any other. Based on your combined charts, here are your relationship superpowers:

**1. ${getRelationshipStrength1(sunSign1, sunSign2, moonSign1, moonSign2)}**

**2. ${getRelationshipStrength2(venusSign1, venusSign2)}**

**3. ${getRelationshipStrength3(element1, element2)}**

**4. ${getRelationshipStrength4(marsSign1, marsSign2)}**

**Your Combined Purpose:**
${getRelationshipPurpose(sunSign1, sunSign2, moonSign1, moonSign2)}`,
        },
        {
          title: 'Growth You Catalyze in Each Other',
          content: `The best relationships make both people better. Here's how you help each other grow:

**How ${userName1} Helps ${userName2} Grow:**
${getGrowthCatalyst(sunSign1, sunSign2, userName1, userName2, true)}

**How ${userName2} Helps ${userName1} Grow:**
${getGrowthCatalyst(sunSign1, sunSign2, userName1, userName2, false)}

**Together, You're Learning:**
${getJointLesson(sunSign1, sunSign2, moonSign1, moonSign2)}`,
          tip: 'Growth isn\'t always comfortable. The places where your partner challenges you most are often the places where you need to grow most.',
        },
      ],
    },
    {
      id: 'challenges',
      title: 'Growth Areas & Challenges',
      icon: '🌱',
      subsections: [
        {
          title: 'Where You May Struggle',
          content: `Every relationship has challenges. Knowing them in advance isn't pessimistic - it's practical. When you understand potential friction points, you can address them consciously rather than being blindsided.

**Challenge 1: ${getRelationshipChallenge1(sunSign1, sunSign2, userName1, userName2)}**

**Challenge 2: ${getRelationshipChallenge2(moonSign1, moonSign2, userName1, userName2)}**

**Challenge 3: ${getRelationshipChallenge3(venusSign1, venusSign2, marsSign1, marsSign2, userName1, userName2)}**

**Remember:** These aren't dealbreakers - they're areas that require conscious attention. The couples who thrive aren't those without challenges; they're those who face challenges together.`,
        },
        {
          title: 'Practical Strategies for Your Specific Combination',
          content: `Based on your unique chart combination, here are tailored strategies for navigating your challenges:

**For Better Communication:**
${getCommunicationStrategy(mercurySign1, mercurySign2, userName1, userName2)}

**For Emotional Harmony:**
${getEmotionalStrategy(moonSign1, moonSign2, userName1, userName2)}

**For Maintaining Passion:**
${getPassionStrategy(marsSign1, marsSign2, venusSign1, venusSign2)}

**For Long-term Success:**
${getLongtermStrategy(sunSign1, sunSign2, modality1, modality2)}`,
        },
      ],
    },
    {
      id: 'intimacy',
      title: 'Intimacy & Physical Connection',
      icon: '💋',
      subsections: [
        {
          title: 'Your Physical Chemistry',
          content: `Physical intimacy is where Venus (what you desire and find beautiful) meets Mars (how you pursue and express desire). Your specific combination creates a unique intimate dynamic.

**${userName1}'s Intimate Nature:**

With Venus in ${venusSign1} and Mars in ${marsSign1}, ${userName1} approaches intimacy with a ${venusData1.element}/${marsData1.element} energy blend. They desire ${venusSign1 === 'Aries' ? 'excitement, spontaneity, and a partner who matches their enthusiasm. They are turned on by confidence and directness' : venusSign1 === 'Taurus' ? 'sensuality, slow buildup, and physical comfort. They are turned on by touch, beautiful surroundings, and taking time to savor the experience' : venusSign1 === 'Gemini' ? 'mental stimulation, variety, and playful communication. They are turned on by words, humor, and keeping things interesting' : venusSign1 === 'Cancer' ? 'emotional safety, tenderness, and deep connection. They are turned on by feeling nurtured and knowing the emotional bond is secure' : venusSign1 === 'Leo' ? 'admiration, romance, and feeling special. They are turned on by being desired and appreciated, with generous expressions of affection' : venusSign1 === 'Virgo' ? 'attention to detail, cleanliness, and genuine helpfulness. They are turned on by competence and a partner who notices the little things' : venusSign1 === 'Libra' ? 'romance, beauty, and harmony. They are turned on by aesthetic experiences and a partner who creates an atmosphere of elegance' : venusSign1 === 'Scorpio' ? 'intensity, depth, and complete surrender. They are turned on by power dynamics, mystery, and transformative experiences' : venusSign1 === 'Sagittarius' ? 'adventure, humor, and freedom. They are turned on by spontaneity, philosophical connection, and a spirit of exploration' : venusSign1 === 'Capricorn' ? 'respect, ambition, and earned intimacy. They are turned on by competence, success, and partners who take relationships seriously' : venusSign1 === 'Aquarius' ? 'uniqueness, friendship, and intellectual connection. They are turned on by unconventional approaches and respecting their need for space' : 'romance, imagination, and spiritual connection. They\'re turned on by creativity, tenderness, and transcendent experiences'}.

**${userName2}'s Intimate Nature:**

With Venus in ${venusSign2} and Mars in ${marsSign2}, ${userName2} approaches intimacy with a ${venusData2.element}/${marsData2.element} energy blend. They desire ${venusSign2 === 'Aries' ? 'excitement, spontaneity, and a partner who matches their enthusiasm. They are turned on by confidence and directness' : venusSign2 === 'Taurus' ? 'sensuality, slow buildup, and physical comfort. They are turned on by touch, beautiful surroundings, and taking time to savor the experience' : venusSign2 === 'Gemini' ? 'mental stimulation, variety, and playful communication. They are turned on by words, humor, and keeping things interesting' : venusSign2 === 'Cancer' ? 'emotional safety, tenderness, and deep connection. They are turned on by feeling nurtured and knowing the emotional bond is secure' : venusSign2 === 'Leo' ? 'admiration, romance, and feeling special. They are turned on by being desired and appreciated, with generous expressions of affection' : venusSign2 === 'Virgo' ? 'attention to detail, cleanliness, and genuine helpfulness. They are turned on by competence and a partner who notices the little things' : venusSign2 === 'Libra' ? 'romance, beauty, and harmony. They are turned on by aesthetic experiences and a partner who creates an atmosphere of elegance' : venusSign2 === 'Scorpio' ? 'intensity, depth, and complete surrender. They are turned on by power dynamics, mystery, and transformative experiences' : venusSign2 === 'Sagittarius' ? 'adventure, humor, and freedom. They are turned on by spontaneity, philosophical connection, and a spirit of exploration' : venusSign2 === 'Capricorn' ? 'respect, ambition, and earned intimacy. They are turned on by competence, success, and partners who take relationships seriously' : venusSign2 === 'Aquarius' ? 'uniqueness, friendship, and intellectual connection. They are turned on by unconventional approaches and respecting their need for space' : 'romance, imagination, and spiritual connection. They\'re turned on by creativity, tenderness, and transcendent experiences'}.

**Your Combined Chemistry:**

The interplay between your Venus and Mars signs creates ${getVenusMarsChemistry(venusSign1, marsSign1, venusSign2, marsSign2)} chemistry. ${userName1}'s Mars in ${marsSign1} ${marsData1.element === venusData2.element ? 'naturally harmonizes with' : marsData1.element === 'Fire' && venusData2.element === 'Air' ? 'excites and stimulates' : marsData1.element === 'Earth' && venusData2.element === 'Water' ? 'provides grounding security for' : 'creates interesting tension with'} ${userName2}'s Venus in ${venusSign2}, while ${userName2}'s Mars in ${marsSign2} ${marsData2.element === venusData1.element ? 'naturally harmonizes with' : 'brings a different energy to'} ${userName1}'s Venus in ${venusSign1}.`,
          terms: [
            { term: 'Venus-Mars Chemistry', definition: 'The interplay between one person\'s Venus (what they desire) and their partner\'s Mars (how they pursue), creating the foundation of physical attraction.' },
          ],
        },
        {
          title: 'Keeping the Spark Alive',
          content: `Every relationship requires attention to maintain passion over time. For your specific combination:

**What Ignites ${userName1} (${venusSign1} Venus / ${marsSign1} Mars):**
${getIgnitesTips(venusSign1, marsSign1)}

**What Ignites ${userName2} (${venusSign2} Venus / ${marsSign2} Mars):**
${getIgnitesTips(venusSign2, marsSign2)}

**Creating Your Ideal Intimate Atmosphere:**

Based on your combined Venus signs, your ideal intimate setting includes:
${getIdealIntimateAtmosphere(venusSign1, venusSign2)}

**Maintaining Long-Term Passion:**

To keep your physical connection alive over the years:

1. **Honor your different tempos**: ${marsData1.modality === marsData2.modality ? 'You share similar energy levels, which helps synchronization' : 'Your different energy rhythms mean you\'ll need to consciously meet in the middle'}

2. **Speak each other's desire language**: ${userName1} needs ${venusData1.keywords[0].toLowerCase()} expressions of desire, while ${userName2} needs ${venusData2.keywords[0].toLowerCase()} ones

3. **Create regular romance**: ${getRegularRomanceTips(venusSign1, venusSign2)}

4. **Address issues quickly**: With your Mars combination, unresolved tension can ${marsData1.element === 'Fire' || marsData2.element === 'Fire' ? 'explode into arguments' : marsData1.element === 'Water' || marsData2.element === 'Water' ? 'create emotional distance' : marsData1.element === 'Air' || marsData2.element === 'Air' ? 'lead to mental games' : 'build into stubborn standoffs'}`,
          tip: 'Physical intimacy often reflects the emotional state of the relationship. If passion fades, check in emotionally first.',
        },
      ],
    },
    {
      id: 'home-family',
      title: 'Home, Family & Shared Life',
      icon: '🏠',
      subsections: [
        {
          title: 'Building a Life Together',
          content: `Your Moon signs reveal what you each need from a home environment and how you approach domesticity and family.

**${userName1}'s Ideal Home (${moonSign1} Moon):**

${moonSign1 === 'Aries' ? `${userName1} needs a home that supports action and independence. They may prefer a minimalist space that doesn't tie them down, with room for active pursuits. They need autonomy within the domestic sphere and may get restless with too much "nesting."` : moonSign1 === 'Taurus' ? `${userName1} needs a home that provides comfort, beauty, and stability. Quality furnishings, good food, and a peaceful atmosphere are essential. They want the home to be a sanctuary of sensory pleasure and security.` : moonSign1 === 'Gemini' ? `${userName1} needs a home that stimulates the mind. Books, technology, varied spaces, and good communication flow matter. They may enjoy a home that accommodates visitors and conversation.` : moonSign1 === 'Cancer' ? `${userName1} needs a home that feels emotionally safe and nurturing. Family connections, memories, and traditions are important. They likely want a home that feels like a true sanctuary from the world.` : moonSign1 === 'Leo' ? `${userName1} needs a home they can take pride in. Entertaining space, creative areas, and a certain flair in the decor matter. They want a home that reflects their identity and welcomes joyful gatherings.` : moonSign1 === 'Virgo' ? `${userName1} needs a home that's organized, clean, and functional. Practical systems, healthy living support, and everything in its place create their sense of security. They may be particular about how things are done.` : moonSign1 === 'Libra' ? `${userName1} needs a home that's beautiful and harmonious. Aesthetic considerations, balance, and a peaceful atmosphere are essential. They want a home suitable for partnership and entertaining.` : moonSign1 === 'Scorpio' ? `${userName1} needs a home that provides privacy and intensity. Deep emotional space, perhaps a private retreat within the home, and room for transformation matter. Surface-level living won't satisfy.` : moonSign1 === 'Sagittarius' ? `${userName1} needs a home that doesn't feel confining. Space for books, global influences, and room to roam (or easy access to travel) are important. They may resist too much domestic routine.` : moonSign1 === 'Capricorn' ? `${userName1} needs a home that represents achievement and respectability. Quality over quantity, traditional elements, and a space that supports ambition matter. They take domestic responsibilities seriously.` : moonSign1 === 'Aquarius' ? `${userName1} needs a home that allows for individuality and perhaps unconventional arrangements. Freedom within the domestic sphere, room for community or causes, and space for their unique interests are essential.` : `${userName1} needs a home that supports creativity and spiritual life. Artistic elements, peaceful retreats, and perhaps water features or oceanic themes create their sense of security.`}

**${userName2}'s Ideal Home (${moonSign2} Moon):**

${moonSign2 === 'Aries' ? `${userName2} needs a home that supports action and independence. They may prefer a minimalist space that doesn't tie them down, with room for active pursuits. They need autonomy within the domestic sphere.` : moonSign2 === 'Taurus' ? `${userName2} needs a home that provides comfort, beauty, and stability. Quality furnishings, good food, and a peaceful atmosphere are essential. They want the home to be a sanctuary.` : moonSign2 === 'Gemini' ? `${userName2} needs a home that stimulates the mind. Books, technology, varied spaces, and good communication flow matter. They may enjoy a home that accommodates visitors.` : moonSign2 === 'Cancer' ? `${userName2} needs a home that feels emotionally safe and nurturing. Family connections, memories, and traditions are important. They want a true sanctuary from the world.` : moonSign2 === 'Leo' ? `${userName2} needs a home they can take pride in. Entertaining space, creative areas, and flair in the decor matter. They want a home that reflects their identity.` : moonSign2 === 'Virgo' ? `${userName2} needs a home that's organized, clean, and functional. Practical systems and everything in its place create their sense of security.` : moonSign2 === 'Libra' ? `${userName2} needs a home that's beautiful and harmonious. Aesthetic considerations, balance, and a peaceful atmosphere are essential.` : moonSign2 === 'Scorpio' ? `${userName2} needs a home that provides privacy and intensity. Deep emotional space and room for transformation matter.` : moonSign2 === 'Sagittarius' ? `${userName2} needs a home that doesn't feel confining. Space for books, global influences, and easy access to travel are important.` : moonSign2 === 'Capricorn' ? `${userName2} needs a home that represents achievement. Quality over quantity and traditional elements matter.` : moonSign2 === 'Aquarius' ? `${userName2} needs a home that allows for individuality. Freedom within the domestic sphere and space for unique interests are essential.` : `${userName2} needs a home that supports creativity and spiritual life. Artistic elements and peaceful retreats create their sense of security.`}

**Creating Your Shared Home:**

With your Moon combination, your ideal shared home would incorporate:
${getSharedHomeTips(moonSign1, moonSign2)}`,
        },
        {
          title: 'Family & Future Vision',
          content: `Your Sun and Moon signs influence your attitudes toward family, children, and legacy.

**${userName1}'s Family Approach (${sunSign1} Sun / ${moonSign1} Moon):**

${userName1} approaches family with ${sunData1.element} Sun and ${moonData1.element} Moon energy. This suggests ${getFamilyApproach(sunSign1, moonSign1)}.

**${userName2}'s Family Approach (${sunSign2} Sun / ${moonSign2} Moon):**

${userName2} approaches family with ${sunData2.element} Sun and ${moonData2.element} Moon energy. This suggests ${getFamilyApproach(sunSign2, moonSign2)}.

**If Children Are Part of Your Vision:**

Your combined parenting style would likely be ${getCombinedParentingStyle(sunSign1, sunSign2, moonSign1, moonSign2)}. ${userName1} would naturally take on the ${moonData1.element === 'Fire' || moonData1.element === 'Air' ? 'stimulating, teaching' : 'nurturing, grounding'} role, while ${userName2} would bring ${moonData2.element === 'Fire' || moonData2.element === 'Air' ? 'excitement and mental engagement' : 'emotional depth and practical care'}.

**Long-Term Vision Alignment:**

For long-term happiness, discuss:
1. Your individual definitions of family (biological, chosen, or both)
2. How you'll balance career ambitions with domestic life
3. Where you want to live and what kind of community you want to be part of
4. How you'll handle extended family relationships

Your ${modality1}/${modality2} modal combination suggests you'll approach these discussions with ${modality1 === modality2 ? 'similar pacing and decision-making style' : 'different approaches to timing and change - be patient with each other'}.`,
          tip: 'Having aligned visions for the future is more important than having identical ones. Focus on shared values rather than identical details.',
        },
      ],
    },
    {
      id: 'couple-world',
      title: 'You As a Couple in the World',
      icon: '🌍',
      subsections: [
        {
          title: 'How Others See Your Relationship',
          content: `Your Rising signs and Sun signs determine how you present as a couple to the outside world.

**Your Combined Presence:**

${userName1}'s ${risingSign1} Rising and ${userName2}'s ${risingSign2} Rising create a couple that appears ${getCoupleAppearance(risingSign1, risingSign2)} to others. People likely see you as ${getCouplePublicImage(sunSign1, sunSign2, risingSign1, risingSign2)}.

**Social Life as a Couple:**

With your elemental combination (${element1} and ${element2}), you likely prefer ${getSocialPreferences(element1, element2)} social activities. You're energized by ${getSocialEnergizers(element1, element2)} and may be drained by ${getSocialDrains(element1, element2)}.

**Supporting Each Other's Public Lives:**

${userName1}'s ${sunSign1} nature thrives publicly when ${getPublicThriving(sunSign1)}. ${userName2} can support this by ${getSupportingPartnerPublicly(sunSign2, sunSign1)}.

${userName2}'s ${sunSign2} nature thrives publicly when ${getPublicThriving(sunSign2)}. ${userName1} can support this by ${getSupportingPartnerPublicly(sunSign1, sunSign2)}.

**Your Combined Impact:**

Together, you have the potential to ${getCombinedImpact(sunSign1, sunSign2, element1, element2)}. Your relationship models ${getRelationshipModels(sunSign1, sunSign2)} for others around you.`,
        },
        {
          title: 'Shared Activities & Adventures',
          content: `Finding activities you both enjoy strengthens your bond. Based on your charts:

**Activities That Suit You Both:**

${getSharedActivityRecommendations(sunSign1, sunSign2, marsSign1, marsSign2, venusSign1, venusSign2)}

**Travel Compatibility:**

${userName1}'s ${sunSign1} nature enjoys travel that involves ${getTravelPreference(sunSign1)}, while ${userName2}'s ${sunSign2} nature prefers ${getTravelPreference(sunSign2)}. Your ideal trip together would combine ${getIdealTrip(sunSign1, sunSign2)}.

**Learning & Growing Together:**

With your Mercury signs (${mercurySign1} and ${mercurySign2}), you can learn together through ${getLearningTogether(mercurySign1, mercurySign2)}. Consider taking classes or workshops in ${getClassRecommendations(element1, element2)}.

**Creating Shared Rituals:**

Every strong couple benefits from rituals. For your specific combination:
- **Daily:** ${getDailyRitual(moonSign1, moonSign2)}
- **Weekly:** ${getWeeklyRitual(venusSign1, venusSign2)}
- **Annually:** ${getAnnualRitual(sunSign1, sunSign2)}`,
          tip: 'The couple that plays together stays together. Make time for shared joy - it\'s not a luxury but a relationship necessity.',
        },
      ],
    },
    {
      id: 'summary',
      title: 'Your Relationship Summary',
      icon: '💝',
      subsections: [
        {
          title: 'The Heart of Your Connection',
          content: `${userName1} and ${userName2}, your charts reveal a relationship with genuine potential and specific areas for conscious attention.

**Your Greatest Strength:** ${getGreatestStrength(sunSign1, sunSign2, moonSign1, moonSign2, venusSign1, venusSign2)}

**Your Core Challenge:** ${getCoreChallenge(sunSign1, sunSign2, moonSign1, moonSign2)}

**Your Growth Edge:** ${getGrowthEdge(sunSign1, sunSign2)}

**What Makes This Work:** ${getWhatMakesItWork(element1, element2, modality1, modality2)}

**Daily Practice:**
The stars may set the stage, but you write the script. Here's a daily practice for your specific combination:

${getDailyPractice(moonSign1, moonSign2, venusSign1, venusSign2)}

Remember: The best relationships aren't those with "perfect" compatibility - they're those where both people commit to growing together. Your charts show tremendous potential. The rest is up to you.`,
          tip: 'Come back to this report when you hit rough patches. Often, challenges make more sense through the lens of your cosmic blueprint.',
        },
      ],
    },
  ]

  // Collect all terms for glossary
  const allTerms: ReportTerm[] = []
  sections.forEach(section => {
    section.subsections.forEach(subsection => {
      if (subsection.terms) {
        allTerms.push(...subsection.terms)
      }
    })
  })

  // Calculate word count
  let wordCount = 0
  sections.forEach(section => {
    section.subsections.forEach(subsection => {
      wordCount += subsection.content.split(/\s+/).length
    })
  })

  return {
    id: `relationship-${Date.now()}`,
    slug: 'relationship-compatibility',
    title: `Relationship Compatibility: ${userName1} & ${userName2}`,
    generatedAt: new Date().toISOString(),
    userName: userName1,
    partnerName: userName2,
    birthData: {
      date: '',
      place: '',
      sunSign: sunSign1,
      moonSign: moonSign1,
      risingSign: risingSign1,
    },
    summary: {
      headline: `${sunSign1} Sun + ${sunSign2} Sun | ${moonSign1} Moon + ${moonSign2} Moon`,
      overview: `A ${elementCompatibility.rating.toLowerCase()} elemental connection with ${modalityCompatibility.rating.toLowerCase()} modal energy.`,
      keyStrengths: [
        getRelationshipStrength1(sunSign1, sunSign2, moonSign1, moonSign2).split(':')[0],
        getRelationshipStrength2(venusSign1, venusSign2).split(':')[0],
        getRelationshipStrength3(element1, element2).split(':')[0],
      ],
      growthAreas: [
        getRelationshipChallenge1(sunSign1, sunSign2, userName1, userName2).split(':')[0],
        getRelationshipChallenge2(moonSign1, moonSign2, userName1, userName2).split(':')[0],
      ],
    },
    visuals: [
      { type: 'element-balance', title: `${userName1}'s Elements`, data: calculateElements(chart1) },
      { type: 'element-balance', title: `${userName2}'s Elements`, data: calculateElements(chart2) },
    ],
    sections,
    glossary: allTerms,
    wordCount,
  }
}

// Helper functions for relationship report
function getElementCompatibility(e1: string, e2: string): { rating: string; description: string; togetherCreate: string } {
  if (e1 === e2) {
    return {
      rating: 'Very High',
      description: `Both of you are ${e1} signs, meaning you process life similarly. You understand each other intuitively.`,
      togetherCreate: `amplified ${e1} energy - you reinforce each other's natural tendencies`,
    }
  }
  const compatible = {
    Fire: ['Air'],
    Air: ['Fire'],
    Earth: ['Water'],
    Water: ['Earth'],
  }
  if (compatible[e1 as keyof typeof compatible]?.includes(e2)) {
    return {
      rating: 'High',
      description: `${e1} and ${e2} are naturally compatible elements. ${e1 === 'Fire' || e1 === 'Air' ? 'Fire fuels Air and Air feeds Fire' : 'Earth contains Water and Water nourishes Earth'}.`,
      togetherCreate: `a complementary dynamic where each element supports the other`,
    }
  }
  return {
    rating: 'Moderate',
    description: `${e1} and ${e2} approach life differently, which creates both friction and fascination. You'll need to bridge your different processing styles.`,
    togetherCreate: `a balancing dynamic - you each bring what the other lacks`,
  }
}

function getModalityCompatibility(m1: string, m2: string): { rating: string; description: string } {
  if (m1 === m2) {
    return {
      rating: 'Moderate',
      description: `Both ${m1} signs can lead to power struggles (who leads?) but also deep understanding of each other's pace.`,
    }
  }
  if ((m1 === 'Cardinal' && m2 === 'Fixed') || (m1 === 'Fixed' && m2 === 'Cardinal')) {
    return {
      rating: 'Complementary',
      description: 'Cardinal initiates and Fixed sustains - a natural division of labor that can work beautifully.',
    }
  }
  return {
    rating: 'Dynamic',
    description: `${m1} and ${m2} have different rhythms but can learn from each other's approach.`,
  }
}

function getSunSunCompatibility(s1: Sign, s2: Sign): string {
  const same = s1 === s2
  const e1 = signData[s1].element
  const e2 = signData[s2].element

  if (same) {
    return `With both Suns in ${s1}, you understand each other's core nature intuitively. You share the same fundamental drives, values, and ways of expressing yourselves. The gift is deep understanding; the challenge is that you may reinforce each other's blind spots.`
  }
  if (e1 === e2) {
    return `Both ${e1} signs, you have a natural affinity. You process life similarly and share core values around ${e1 === 'Fire' ? 'action and enthusiasm' : e1 === 'Earth' ? 'practicality and stability' : e1 === 'Air' ? 'ideas and communication' : 'emotion and intuition'}. You "get" each other in fundamental ways.`
  }
  return `${s1} and ${s2} have different elements (${e1} vs ${e2}), which means you approach life differently. This creates both the attraction of opposites and the friction of different operating systems. You'll need to appreciate these differences rather than trying to change each other.`
}

function getSunSunAdvice(s1: Sign, s2: Sign, n1: string, n2: string): string {
  const e1 = signData[s1].element
  const e2 = signData[s2].element

  if (e1 === e2) {
    return `Since you share the same element, your work is to avoid getting stuck in that element's shadow. For ${e1} signs, watch out for ${e1 === 'Fire' ? 'burnout and impulsiveness' : e1 === 'Earth' ? 'getting too stuck in routine' : e1 === 'Air' ? 'staying too much in your heads' : 'drowning in emotions'}. Consciously cultivate the elements you both lack.`
  }
  return `Honor what each person brings. ${n1}'s ${e1} energy offers ${e1 === 'Fire' ? 'enthusiasm and courage' : e1 === 'Earth' ? 'stability and practicality' : e1 === 'Air' ? 'perspective and ideas' : 'depth and intuition'}. ${n2}'s ${e2} energy offers ${e2 === 'Fire' ? 'enthusiasm and courage' : e2 === 'Earth' ? 'stability and practicality' : e2 === 'Air' ? 'perspective and ideas' : 'depth and intuition'}. Neither is better - both are needed.`
}

function getMoonMoonCompatibility(m1: Sign, m2: Sign, n1: string, n2: string): string {
  const e1 = signData[m1].element
  const e2 = signData[m2].element

  if (m1 === m2) {
    return `With both Moons in ${m1}, you process emotions identically. This creates profound emotional understanding but can also amplify emotional patterns - you may both withdraw when one withdraws, or both escalate when one escalates.`
  }
  if (e1 === e2) {
    return `Your Moons share the same element (${e1}), creating natural emotional compatibility. You both need ${e1 === 'Water' ? 'depth and emotional safety' : e1 === 'Fire' ? 'excitement and expression' : e1 === 'Earth' ? 'stability and tangible comfort' : 'space and intellectual understanding'}. This makes daily life together flow more easily.`
  }
  return `Your Moons are in different elements (${e1} vs ${e2}), which means you have different emotional needs and processing styles. ${n1}'s ${m1} Moon needs ${getMoonNeeds(m1)}, while ${n2}'s ${m2} Moon needs ${getMoonNeeds(m2)}. Learning to meet each other's emotional needs despite the difference is your work.`
}

function getMoonNeeds(m: Sign): string {
  const data = signData[m]
  return data.element === 'Water' ? 'emotional depth and safe spaces to feel' :
         data.element === 'Fire' ? 'enthusiasm and freedom to express' :
         data.element === 'Earth' ? 'stability and practical demonstrations of care' :
         'mental space and intellectual understanding'
}

function getMoonCareStyle(m: Sign): string {
  const styles: Record<Sign, string> = {
    Aries: 'Protective action, solving problems, energizing you when you\'re down',
    Taurus: 'Physical comfort, cooking, creating a cozy environment, steady presence',
    Gemini: 'Talking through problems, distraction, bringing lightness and variety',
    Cancer: 'Nurturing, cooking, creating emotional safety, remembering what matters to you',
    Leo: 'Grand gestures, making you feel special, loyalty, unwavering support',
    Virgo: 'Practical help, fixing things, acts of service, remembering details',
    Libra: 'Creating harmony, compromise, making the environment beautiful, balance',
    Scorpio: 'Intense loyalty, deep presence, protecting you fiercely, emotional depth',
    Sagittarius: 'Optimism, adventure, philosophical perspective, freedom to grow',
    Capricorn: 'Providing structure, practical support, long-term planning, reliability',
    Aquarius: 'Intellectual support, giving space, accepting uniqueness, friendship',
    Pisces: 'Unconditional acceptance, spiritual support, creative expression, empathy',
  }
  return styles[m]
}

function getMoonFriction(m1: Sign, m2: Sign, n1: string, n2: string): string {
  const e1 = signData[m1].element
  const e2 = signData[m2].element

  if (e1 === 'Fire' && e2 === 'Water') {
    return `${n1}'s ${m1} Moon wants to express and move on; ${n2}'s ${m2} Moon wants to process deeply. ${n1} may feel ${n2} dwells too long on feelings; ${n2} may feel ${n1} dismisses emotional depth.`
  }
  if (e1 === 'Earth' && e2 === 'Air') {
    return `${n1}'s ${m1} Moon wants practical solutions; ${n2}'s ${m2} Moon wants to discuss and analyze. ${n1} may feel ${n2} is too abstract; ${n2} may feel ${n1} doesn't want to talk things through.`
  }
  return `Different Moon signs mean different comfort zones. Friction arises when one person's need feels threatening to the other's security.`
}

function getMoonBridge1(m1: Sign, m2: Sign): string {
  return `Acknowledge out loud when you notice different emotional needs: "I can see you need X right now, even though I'd naturally give Y"`
}

function getMoonBridge2(m1: Sign, m2: Sign): string {
  return `Create rituals that honor both emotional styles - perhaps one person's style for certain situations and the other's for different ones`
}

function getVenusLoveStyle(v: Sign, name: string): string {
  const styles: Record<Sign, string> = {
    Aries: `${name} loves passionately, directly, and with full enthusiasm. Love should be exciting and never boring. They pursue what they want and appreciate a partner who can match their energy.`,
    Taurus: `${name} loves steadily, sensually, and with great loyalty. Love should be comfortable and secure. They show love through physical affection, quality time, and creating beautiful environments.`,
    Gemini: `${name} loves with wit, variety, and mental connection. Love should be intellectually stimulating and never stagnant. They show love through communication, curiosity, and keeping things interesting.`,
    Cancer: `${name} loves deeply, protectively, and with emotional attunement. Love should feel like home. They show love through nurturing, remembering important details, and creating emotional safety.`,
    Leo: `${name} loves dramatically, generously, and with whole-hearted devotion. Love should feel special and celebratory. They show love through grand gestures, unwavering loyalty, and making their partner feel like royalty.`,
    Virgo: `${name} loves practically, attentively, and with quiet devotion. Love should be useful and improving. They show love through acts of service, remembering preferences, and helping their partner be their best.`,
    Libra: `${name} loves harmoniously, aesthetically, and with grace. Love should be balanced and beautiful. They show love through compromise, creating harmony, and sharing beautiful experiences.`,
    Scorpio: `${name} loves intensely, completely, and with transformative depth. Love should be all-consuming and real. They show love through emotional depth, fierce loyalty, and total commitment.`,
    Sagittarius: `${name} loves freely, optimistically, and with expansive generosity. Love should be an adventure. They show love through experiences, philosophical connection, and encouraging growth.`,
    Capricorn: `${name} loves seriously, committedly, and with long-term vision. Love should be building toward something. They show love through reliability, providing stability, and practical support.`,
    Aquarius: `${name} loves uniquely, intellectually, and with freedom. Love should be friendship-based and non-possessive. They show love through acceptance, intellectual connection, and respecting individuality.`,
    Pisces: `${name} loves romantically, spiritually, and with boundless compassion. Love should be transcendent. They show love through emotional attunement, creative expression, and unconditional acceptance.`,
  }
  return styles[v]
}

function getVenusVenusCompatibility(v1: Sign, v2: Sign, n1: string, n2: string): string {
  const e1 = signData[v1].element
  const e2 = signData[v2].element

  if (v1 === v2) {
    return `With Venus in the same sign, you love in the same language. You intuitively know what makes the other feel loved because it's what makes you feel loved too. The ease here is a gift - just don't assume you don't need to put in effort.`
  }
  if (e1 === e2) {
    return `Your Venus signs share an element, creating natural romantic compatibility. You both value ${e1 === 'Fire' ? 'excitement and passion' : e1 === 'Earth' ? 'stability and sensuality' : e1 === 'Air' ? 'mental connection and communication' : 'emotional depth and romance'} in love.`
  }
  return `Different Venus elements mean different love languages. ${n1} expresses love in ${v1} style (${e1}) while ${n2} expresses love in ${v2} style (${e2}). You'll need to consciously speak each other's love language rather than defaulting to your own.`
}

function getVenusTips(v: Sign): string {
  const tips: Record<Sign, string> = {
    Aries: '- Keep things exciting and spontaneous\n- Be direct about feelings\n- Show enthusiasm and passion',
    Taurus: '- Physical affection and quality time\n- Create comfort and security\n- Appreciate their loyalty',
    Gemini: '- Engage mentally and keep conversations interesting\n- Variety in activities and discussions\n- Give them social freedom',
    Cancer: '- Create emotional safety and consistency\n- Remember important dates and details\n- Show that you need them',
    Leo: '- Make them feel special and appreciated\n- Give genuine compliments\n- Be proud of them publicly',
    Virgo: '- Notice and appreciate their efforts\n- Acts of service and practical help\n- Don\'t criticize their helpfulness',
    Libra: '- Create beautiful experiences together\n- Be fair and harmonious\n- Appreciate their aesthetic sensibility',
    Scorpio: '- Emotional depth and honesty\n- Complete loyalty and trustworthiness\n- Don\'t be superficial or flaky',
    Sagittarius: '- Adventure and new experiences\n- Philosophical conversations\n- Give them freedom to grow',
    Capricorn: '- Respect their goals and ambitions\n- Be reliable and consistent\n- Show long-term commitment',
    Aquarius: '- Intellectual stimulation\n- Respect their individuality\n- Be their best friend first',
    Pisces: '- Romantic gestures and emotional presence\n- Creative and spiritual connection\n- Accept them unconditionally',
  }
  return tips[v]
}

function getVenusValues(v: Sign): string {
  const values: Record<Sign, string> = {
    Aries: 'Independence, honesty, courage, authenticity, action over words',
    Taurus: 'Security, comfort, loyalty, beauty, quality over quantity',
    Gemini: 'Communication, variety, learning, social connection, mental stimulation',
    Cancer: 'Family, emotional security, traditions, nurturing, roots',
    Leo: 'Creativity, loyalty, generosity, recognition, celebration of life',
    Virgo: 'Improvement, health, service, precision, practical application',
    Libra: 'Harmony, fairness, beauty, partnership, social grace',
    Scorpio: 'Truth, depth, loyalty, transformation, emotional authenticity',
    Sagittarius: 'Freedom, truth, adventure, growth, optimism',
    Capricorn: 'Achievement, tradition, responsibility, long-term planning, integrity',
    Aquarius: 'Individuality, progress, humanitarian ideals, friendship, innovation',
    Pisces: 'Compassion, spirituality, creativity, unconditional love, transcendence',
  }
  return values[v]
}

function getVenusValuesAlignment(v1: Sign, v2: Sign): string {
  const e1 = signData[v1].element
  const e2 = signData[v2].element

  if (e1 === e2) {
    return `You both value ${e1 === 'Fire' ? 'authenticity, passion, and living fully' : e1 === 'Earth' ? 'stability, quality, and practical matters' : e1 === 'Air' ? 'ideas, communication, and social connection' : 'emotional depth, spirituality, and compassion'}. Building a life together has a strong foundation of shared priorities.`
  }
  return `You find common ground in any universal values - honesty, respect, growth - while bringing different emphases. This can create a more balanced life together than either would have alone.`
}

function getVenusValuesCompromise(v1: Sign, v2: Sign, n1: string, n2: string): string {
  return `${n1}'s ${v1} Venus prioritizes different things than ${n2}'s ${v2} Venus. Compromise means sometimes doing things one person's way, sometimes the other's, and finding creative solutions that honor both.`
}

function getMarsStyle(m: Sign, name: string): string {
  const styles: Record<Sign, string> = {
    Aries: `${name} has direct, fiery Mars energy. They go after what they want without hesitation, express anger openly, and have high physical energy. In intimacy, they're passionate and initiating.`,
    Taurus: `${name} has steady, sensual Mars energy. They pursue goals persistently, express anger slowly (but watch out when they do), and value physical pleasure. In intimacy, they're sensual and grounded.`,
    Gemini: `${name} has mental, versatile Mars energy. They pursue goals through communication and strategy, express anger through words, and need mental stimulation. In intimacy, they need variety and verbal connection.`,
    Cancer: `${name} has protective, emotional Mars energy. They pursue goals to create security, express anger indirectly, and are motivated by emotional needs. In intimacy, they need emotional safety.`,
    Leo: `${name} has dramatic, proud Mars energy. They pursue goals with confidence and flair, express anger dramatically, and are motivated by recognition. In intimacy, they want to feel special.`,
    Virgo: `${name} has precise, service-oriented Mars energy. They pursue goals methodically, express anger through criticism, and are motivated by improvement. In intimacy, they're attentive to details.`,
    Libra: `${name} has diplomatic, balanced Mars energy. They pursue goals through partnership, avoid expressing anger directly, and are motivated by harmony. In intimacy, they value mutual pleasure.`,
    Scorpio: `${name} has intense, powerful Mars energy. They pursue goals with determination, express anger intensely, and are motivated by depth. In intimacy, they're intense and transformative.`,
    Sagittarius: `${name} has enthusiastic, freedom-loving Mars energy. They pursue goals with optimism, express anger openly but briefly, and are motivated by adventure. In intimacy, they're playful and adventurous.`,
    Capricorn: `${name} has disciplined, ambitious Mars energy. They pursue goals strategically, express anger with control, and are motivated by achievement. In intimacy, they're focused and enduring.`,
    Aquarius: `${name} has unconventional, intellectual Mars energy. They pursue goals uniquely, express anger coolly, and are motivated by ideals. In intimacy, they need mental connection.`,
    Pisces: `${name} has fluid, creative Mars energy. They pursue goals intuitively, express anger passively, and are motivated by inspiration. In intimacy, they're romantic and imaginative.`,
  }
  return styles[m]
}

function getMarsMarsChemistry(m1: Sign, m2: Sign, n1: string, n2: string): string {
  const e1 = signData[m1].element
  const e2 = signData[m2].element

  if (m1 === m2) {
    return `With Mars in the same sign, you have similar drives and physical energy. You understand each other's approach to passion and conflict intuitively. The challenge is you might clash directly without anyone backing down.`
  }
  if ((e1 === 'Fire' && e2 === 'Fire') || (e1 === 'Air' && e2 === 'Air')) {
    return `Both ${e1 === 'Fire' ? 'Fire' : 'Air'} Mars signs create high energy chemistry. There's natural spark and mutual stimulation. Keep channeling this energy constructively.`
  }
  if ((e1 === 'Earth' && e2 === 'Water') || (e1 === 'Water' && e2 === 'Earth')) {
    return `${e1} and ${e2} Mars create a deep, sustaining chemistry. It may not be explosive but it's enduring. You complement each other's approach to desire.`
  }
  return `Different Mars elements create an interesting dynamic - you arouse and challenge each other. The friction itself can be attractive.`
}

function getMarsConflictStyle(m: Sign): string {
  const styles: Record<Sign, string> = {
    Aries: 'Direct confrontation, quick anger that passes quickly, needs to address issues immediately',
    Taurus: 'Slow to anger but stubborn when upset, may stonewall, needs time to process',
    Gemini: 'Argues with logic and words, may deflect with humor, needs to talk things out',
    Cancer: 'Indirect expression, may withdraw or get passive-aggressive, needs emotional safety to engage',
    Leo: 'Dramatic expressions, takes things personally, needs to feel respected even in conflict',
    Virgo: 'Critical and analytical, may nitpick, needs to solve the problem practically',
    Libra: 'Avoids direct conflict, seeks compromise, needs to maintain harmony even while disagreeing',
    Scorpio: 'Intense and penetrating, may hold grudges, needs complete honesty and resolution',
    Sagittarius: 'Blunt and honest, moves on quickly, needs freedom even in conflict',
    Capricorn: 'Controlled and strategic, may shut down, needs to maintain dignity',
    Aquarius: 'Detached and logical, may seem cold, needs space to process',
    Pisces: 'Avoids direct conflict, may play victim, needs gentleness and understanding',
  }
  return styles[m]
}

function getMarsFriction(m1: Sign, m2: Sign, n1: string, n2: string): string {
  return `${n1}'s ${m1} Mars and ${n2}'s ${m2} Mars may clash when their different conflict styles meet. Understanding that you fight differently can prevent escalation.`
}

function getMarsResolution(m1: Sign, m2: Sign, n1: string, n2: string): string {
  return `For your combination: acknowledge different styles openly, create space for both approaches, and remember that the goal is resolution, not winning. ${n1} should try to ${getMarsTipFor(m2)} and ${n2} should try to ${getMarsTipFor(m1)}.`
}

function getMarsTipFor(m: Sign): string {
  const tips: Record<Sign, string> = {
    Aries: 'engage directly rather than avoiding',
    Taurus: 'give time and space to process',
    Gemini: 'talk things through verbally',
    Cancer: 'create emotional safety before addressing issues',
    Leo: 'acknowledge their feelings and show respect',
    Virgo: 'focus on practical solutions',
    Libra: 'seek fair compromise',
    Scorpio: 'be completely honest and go deep',
    Sagittarius: 'keep perspective and don\'t dwell',
    Capricorn: 'stay calm and solution-focused',
    Aquarius: 'give space and stay logical',
    Pisces: 'be gentle and compassionate',
  }
  return tips[m]
}

function getMercuryStyle(m: Sign, name: string): string {
  const data = signData[m]
  return `${name} thinks and communicates in a ${data.element} way - ${data.element === 'Fire' ? 'quick, direct, and enthusiastic' : data.element === 'Earth' ? 'practical, methodical, and grounded' : data.element === 'Air' ? 'analytical, curious, and social' : 'intuitive, emotional, and imaginative'}. Their ${m} Mercury means they ${m === 'Aries' ? 'speak directly and decide quickly' : m === 'Taurus' ? 'think carefully and speak deliberately' : m === 'Gemini' ? 'love variety in conversation and learn quickly' : m === 'Cancer' ? 'communicate emotionally and remember everything' : m === 'Leo' ? 'speak with confidence and flair' : m === 'Virgo' ? 'analyze details and communicate precisely' : m === 'Libra' ? 'seek balance in discussions and consider all sides' : m === 'Scorpio' ? 'probe deeply and communicate intensely' : m === 'Sagittarius' ? 'see the big picture and speak honestly' : m === 'Capricorn' ? 'think strategically and communicate with authority' : m === 'Aquarius' ? 'think originally and communicate ideas' : 'think intuitively and communicate imaginatively'}.`
}

function getMercuryMercuryDynamic(m1: Sign, m2: Sign, n1: string, n2: string): string {
  const e1 = signData[m1].element
  const e2 = signData[m2].element

  if (e1 === e2) {
    return `Both ${e1} Mercury signs, you think in similar ways. Conversations flow naturally and you understand each other's logic intuitively.`
  }
  return `Different Mercury elements (${e1} vs ${e2}) mean different thinking styles. This can create fascinating conversations as you expose each other to different perspectives, but also misunderstandings when you assume the other thinks like you do.`
}

function getMercuryTip1(m1: Sign, m2: Sign, n1: string, n2: string): string {
  return `When explaining something important, try to translate it into your partner's Mercury style`
}

function getMercuryTip2(m1: Sign, m2: Sign, n1: string, n2: string): string {
  return `If you feel misunderstood, pause and ask "What did you hear me say?" before assuming bad intent`
}

function getRelationshipStrength1(s1: Sign, s2: Sign, m1: Sign, m2: Sign): string {
  return `Complementary Energies: Your ${signData[s1].element}/${signData[s2].element} Sun combination and ${signData[m1].element}/${signData[m2].element} Moon combination create a dynamic where you each bring something the other needs.`
}

function getRelationshipStrength2(v1: Sign, v2: Sign): string {
  return `Love Expression: Your Venus signs give you ${v1 === v2 ? 'identical love languages - you intuitively know how to please each other' : 'complementary ways of loving that expand both your capacities for giving and receiving love'}.`
}

function getRelationshipStrength3(e1: string, e2: string): string {
  return `Elemental Balance: Together, your ${e1} and ${e2} energies create ${e1 === e2 ? 'amplified power in that element' : 'a more complete approach to life than either would have alone'}.`
}

function getRelationshipStrength4(m1: Sign, m2: Sign): string {
  return `Passion & Drive: Your Mars combination creates ${signData[m1].element === signData[m2].element ? 'simpatico desire and motivation' : 'an intriguing dynamic of different but complementary drives'}.`
}

function getRelationshipPurpose(s1: Sign, s2: Sign, m1: Sign, m2: Sign): string {
  return `Together, you're here to learn the balance between ${signData[s1].keywords[0]} and ${signData[s2].keywords[0]}, while creating emotional safety through both ${signData[m1].keywords[0]} and ${signData[m2].keywords[0]} approaches.`
}

function getGrowthCatalyst(s1: Sign, s2: Sign, n1: string, n2: string, firstToSecond: boolean): string {
  if (firstToSecond) {
    return `${n1}'s ${s1} energy encourages ${n2} to develop more ${signData[s1].keywords[0]} qualities - something ${s2} might naturally resist but ultimately benefits from.`
  }
  return `${n2}'s ${s2} energy encourages ${n1} to develop more ${signData[s2].keywords[0]} qualities - something ${s1} might naturally resist but ultimately benefits from.`
}

function getJointLesson(s1: Sign, s2: Sign, m1: Sign, m2: Sign): string {
  return `Your joint lesson is integrating seemingly opposite approaches: the ${signData[s1].element} and ${signData[s2].element} ways of being, the ${signData[m1].element} and ${signData[m2].element} ways of feeling.`
}

function getRelationshipChallenge1(s1: Sign, s2: Sign, n1: string, n2: string): string {
  const e1 = signData[s1].element
  const e2 = signData[s2].element
  if (e1 === e2) {
    return `Same-Element Blind Spots: Both being ${e1} signs, you might reinforce each other's ${e1 === 'Fire' ? 'impulsiveness' : e1 === 'Earth' ? 'resistance to change' : e1 === 'Air' ? 'overthinking' : 'emotional overwhelm'} instead of balancing it.`
  }
  return `Different Operating Systems: ${n1}'s ${e1} approach vs ${n2}'s ${e2} approach means you process life differently. What feels natural to one can feel foreign to the other.`
}

function getRelationshipChallenge2(m1: Sign, m2: Sign, n1: string, n2: string): string {
  return `Emotional Needs: ${n1}'s ${m1} Moon needs ${getMoonNeeds(m1).split(' and ')[0]}, while ${n2}'s ${m2} Moon needs ${getMoonNeeds(m2).split(' and ')[0]}. Meeting both needs requires conscious effort.`
}

function getRelationshipChallenge3(v1: Sign, v2: Sign, m1: Sign, m2: Sign, n1: string, n2: string): string {
  return `Love vs Desire: ${n1} loves in ${v1} style and desires in ${m1} style; ${n2} loves in ${v2} style and desires in ${m2} style. These may not always align naturally.`
}

function getCommunicationStrategy(m1: Sign, m2: Sign, n1: string, n2: string): string {
  return `Given ${n1}'s ${m1} Mercury and ${n2}'s ${m2} Mercury: schedule regular check-ins, don't assume your partner understood what you meant, and when in doubt, over-communicate rather than under-communicate.`
}

function getEmotionalStrategy(m1: Sign, m2: Sign, n1: string, n2: string): string {
  return `For your ${m1}/${m2} Moon combination: create rituals of emotional connection, learn to recognize each other's "off" signals, and remember that emotional needs are legitimate even when they differ from yours.`
}

function getPassionStrategy(m1: Sign, m2: Sign, v1: Sign, v2: Sign): string {
  return `Your Mars (${m1}/${m2}) and Venus (${v1}/${v2}) combination needs: regular date nights, physical affection outside of intimacy, and open conversations about desire and what makes you feel loved.`
}

function getLongtermStrategy(s1: Sign, s2: Sign, m1: string, m2: string): string {
  return `For lasting success with ${s1}/${s2} Sun and ${m1}/${m2} modality: build shared goals, maintain individual identities, regularly reassess and adjust your dynamic, and never stop learning about each other.`
}

function getGreatestStrength(s1: Sign, s2: Sign, m1: Sign, m2: Sign, v1: Sign, v2: Sign): string {
  return `The combination of ${s1}'s ${signData[s1].keywords[0]} with ${s2}'s ${signData[s2].keywords[0]} creates a relationship that can ${signData[s1].giftToWorld.split(',')[0].toLowerCase()} while also ${signData[s2].giftToWorld.split(',')[0].toLowerCase()}.`
}

function getCoreChallenge(s1: Sign, s2: Sign, m1: Sign, m2: Sign): string {
  return `Learning to honor both ${signData[s1].keywords[0]} needs and ${signData[s2].keywords[0]} needs, especially when they seem to conflict.`
}

function getGrowthEdge(s1: Sign, s2: Sign): string {
  return `Integrating the best of ${s1} (${signData[s1].strengths[0].toLowerCase()}) with the best of ${s2} (${signData[s2].strengths[0].toLowerCase()}).`
}

function getWhatMakesItWork(e1: string, e2: string, m1: string, m2: string): string {
  return `Your ${e1}/${e2} elemental combination with ${m1}/${m2} modality creates a dynamic where mutual respect, conscious communication, and appreciation of differences will be key.`
}

function getDailyPractice(m1: Sign, m2: Sign, v1: Sign, v2: Sign): string {
  return `Each morning, share one thing you appreciate about each other. This simple practice keeps the Venus (love) energy flowing and reminds both of you why you chose each other. When conflict arises, remember your Moon signs and give each other what you need, not what you would need.`
}

// New helper functions for expanded relationship report

function getVenusMarsChemistry(v1: Sign, m1: Sign, v2: Sign, m2: Sign): string {
  const vElement1 = signData[v1].element
  const mElement1 = signData[m1].element
  const vElement2 = signData[v2].element
  const mElement2 = signData[m2].element

  if ((mElement1 === vElement2) || (mElement2 === vElement1)) {
    return 'naturally harmonious'
  }
  if ((mElement1 === 'Fire' && vElement2 === 'Air') || (mElement1 === 'Air' && vElement2 === 'Fire') ||
      (mElement2 === 'Fire' && vElement1 === 'Air') || (mElement2 === 'Air' && vElement1 === 'Fire')) {
    return 'exciting and stimulating'
  }
  if ((mElement1 === 'Earth' && vElement2 === 'Water') || (mElement1 === 'Water' && vElement2 === 'Earth') ||
      (mElement2 === 'Earth' && vElement1 === 'Water') || (mElement2 === 'Water' && vElement1 === 'Earth')) {
    return 'deeply nurturing'
  }
  return 'dynamic and growth-oriented'
}

function getIgnitesTips(venus: Sign, mars: Sign): string {
  const element = signData[venus].element
  return element === 'Fire' ? '- Spontaneity and adventure\n- Enthusiasm and excitement\n- Bold gestures and confidence' :
         element === 'Earth' ? '- Sensual experiences and touch\n- Quality time and undivided attention\n- Practical acts of service' :
         element === 'Air' ? '- Intellectual stimulation and witty banter\n- Variety and novelty\n- Communication and verbal appreciation' :
         '- Emotional depth and connection\n- Romantic gestures and tenderness\n- Creating intimate, private moments'
}

function getIdealIntimateAtmosphere(v1: Sign, v2: Sign): string {
  const e1 = signData[v1].element
  const e2 = signData[v2].element
  return `- ${e1 === 'Fire' || e2 === 'Fire' ? 'Warmth and passionate energy' : 'Calm, pressure-free environment'}
- ${e1 === 'Earth' || e2 === 'Earth' ? 'Physical comfort and beautiful surroundings' : 'Emotional safety above all'}
- ${e1 === 'Air' || e2 === 'Air' ? 'Playful conversation and laughter' : 'Deep presence and connection'}
- ${e1 === 'Water' || e2 === 'Water' ? 'Romantic ambiance and emotional intimacy' : 'Clear communication about desires'}`
}

function getRegularRomanceTips(v1: Sign, v2: Sign): string {
  const e1 = signData[v1].element
  const e2 = signData[v2].element
  if (e1 === e2) {
    return `Plan regular ${e1 === 'Fire' ? 'exciting adventures' : e1 === 'Earth' ? 'sensory experiences' : e1 === 'Air' ? 'social or intellectual outings' : 'emotionally meaningful dates'} that honor your shared element`
  }
  return `Alternate between ${signData[v1].keywords[0].toLowerCase()} dates (for ${v1} Venus) and ${signData[v2].keywords[0].toLowerCase()} dates (for ${v2} Venus)`
}

function getSharedHomeTips(m1: Sign, m2: Sign): string {
  const e1 = signData[m1].element
  const e2 = signData[m2].element
  return `- ${e1 === 'Fire' || e2 === 'Fire' ? 'Space for activity and individual projects' : 'Cozy, nest-like atmosphere'}
- ${e1 === 'Earth' || e2 === 'Earth' ? 'Quality furnishings and creature comforts' : 'Flexible arrangements that can evolve'}
- ${e1 === 'Air' || e2 === 'Air' ? 'Good communication zones and intellectual stimulation' : 'Private spaces for emotional processing'}
- ${e1 === 'Water' || e2 === 'Water' ? 'Emotionally nurturing and memory-filled spaces' : 'Balance between togetherness and independence'}`
}

function getFamilyApproach(sun: Sign, moon: Sign): string {
  const element = signData[moon].element
  return element === 'Fire' ? 'enthusiasm for shared activities, teaching through adventure, and encouraging independence' :
         element === 'Earth' ? 'stability, providing materially, and teaching practical skills' :
         element === 'Air' ? 'intellectual engagement, communication, and teaching through ideas' :
         'deep emotional bonds, intuitive understanding, and creating emotional safety'
}

function getCombinedParentingStyle(s1: Sign, s2: Sign, m1: Sign, m2: Sign): string {
  const elements = [signData[s1].element, signData[s2].element, signData[m1].element, signData[m2].element]
  const hasAllElements = new Set(elements).size >= 3
  if (hasAllElements) {
    return 'well-rounded, able to meet children from multiple angles'
  }
  return `emphasizing ${elements[0]}-style approaches with complementary ${elements[1]} support`
}

function getCoupleAppearance(r1: Sign, r2: Sign): string {
  const e1 = signData[r1].element
  const e2 = signData[r2].element
  if (e1 === e2) {
    return `distinctly ${e1} - ${e1 === 'Fire' ? 'energetic and attention-grabbing' : e1 === 'Earth' ? 'grounded and established' : e1 === 'Air' ? 'social and intellectually engaged' : 'emotionally attuned and intuitive'}`
  }
  return `interestingly balanced between ${signData[r1].keywords[0].toLowerCase()} and ${signData[r2].keywords[0].toLowerCase()} energies`
}

function getCouplePublicImage(s1: Sign, s2: Sign, r1: Sign, r2: Sign): string {
  return `a couple that ${signData[s1].keywords[0].toLowerCase()} and ${signData[s2].keywords[0].toLowerCase()}, presenting ${signData[r1].keywords[0].toLowerCase()} combined with ${signData[r2].keywords[0].toLowerCase()} energy to the world`
}

function getSocialPreferences(e1: string, e2: string): string {
  if (e1 === e2) {
    return e1 === 'Fire' ? 'active, exciting' : e1 === 'Earth' ? 'comfortable, quality' : e1 === 'Air' ? 'intellectually stimulating, varied' : 'intimate, meaningful'
  }
  return 'a balance of different types of'
}

function getSocialEnergizers(e1: string, e2: string): string {
  return `${e1 === 'Fire' ? 'adventure and excitement' : e1 === 'Earth' ? 'quality experiences and good food' : e1 === 'Air' ? 'interesting conversation' : 'emotional connection'} combined with ${e2 === 'Fire' ? 'spontaneity' : e2 === 'Earth' ? 'comfort' : e2 === 'Air' ? 'variety' : 'intimacy'}`
}

function getSocialDrains(e1: string, e2: string): string {
  return `${e1 === 'Fire' ? 'boring routines' : e1 === 'Earth' ? 'chaos and instability' : e1 === 'Air' ? 'heavy emotional demands' : 'superficial interactions'} and ${e2 === 'Fire' ? 'restriction' : e2 === 'Earth' ? 'unpredictability' : e2 === 'Air' ? 'isolation' : 'coldness'}`
}

function getPublicThriving(sun: Sign): string {
  return signData[sun].element === 'Fire' ? 'in the spotlight, leading and inspiring' :
         signData[sun].element === 'Earth' ? 'contributing practically and building tangible results' :
         signData[sun].element === 'Air' ? 'connecting, communicating, and sharing ideas' :
         'creating meaningful emotional impact and connection'
}

function getSupportingPartnerPublicly(supporter: Sign, supported: Sign): string {
  return `bringing ${signData[supporter].keywords[0].toLowerCase()} support to ${signData[supported].keywords[0].toLowerCase()} endeavors`
}

function getCombinedImpact(s1: Sign, s2: Sign, e1: string, e2: string): string {
  return `combine ${signData[s1].giftToWorld.split(',')[0].toLowerCase()} with ${signData[s2].giftToWorld.split(',')[0].toLowerCase()}, creating unique value in your community`
}

function getRelationshipModels(s1: Sign, s2: Sign): string {
  return `how ${signData[s1].keywords[0].toLowerCase()} and ${signData[s2].keywords[0].toLowerCase()} energies can complement each other`
}

function getSharedActivityRecommendations(s1: Sign, s2: Sign, m1: Sign, m2: Sign, v1: Sign, v2: Sign): string {
  const elements = [signData[s1].element, signData[s2].element]
  return `Based on your combined elements (${elements.join(' and ')}):
- ${elements.includes('Fire') ? 'Active adventures: hiking, dancing, sports, travel' : 'Creative projects: art, music, cooking together'}
- ${elements.includes('Earth') ? 'Sensory experiences: wine tasting, spa days, gardening' : 'Learning experiences: classes, workshops, museums'}
- ${elements.includes('Air') ? 'Social activities: hosting dinners, game nights, cultural events' : 'Intimate activities: movie nights, reading together, deep conversations'}
- ${elements.includes('Water') ? 'Emotional bonding: volunteering together, spiritual practices, water activities' : 'Goal-oriented activities: working out together, building something, renovating'}`
}

function getTravelPreference(sun: Sign): string {
  return signData[sun].element === 'Fire' ? 'adventure, exploration, and active experiences' :
         signData[sun].element === 'Earth' ? 'comfort, luxury, and natural beauty' :
         signData[sun].element === 'Air' ? 'cultural experiences and social opportunities' :
         'emotionally meaningful destinations and romantic getaways'
}

function getIdealTrip(s1: Sign, s2: Sign): string {
  return `${signData[s1].keywords[0].toLowerCase()} elements (for ${s1}) with ${signData[s2].keywords[0].toLowerCase()} experiences (for ${s2})`
}

function getLearningTogether(m1: Sign, m2: Sign): string {
  const e1 = signData[m1].element
  const e2 = signData[m2].element
  return `${e1 === e2 ? `${e1}-style approaches that suit you both` : `both ${e1}-style (hands-on, ${e1 === 'Fire' ? 'experiential' : e1 === 'Earth' ? 'practical' : e1 === 'Air' ? 'discussion-based' : 'intuitive'}) and ${e2}-style approaches`}`
}

function getClassRecommendations(e1: string, e2: string): string {
  const recommendations: string[] = []
  if (e1 === 'Fire' || e2 === 'Fire') recommendations.push('fitness, dance, or adventure sports')
  if (e1 === 'Earth' || e2 === 'Earth') recommendations.push('cooking, crafting, or gardening')
  if (e1 === 'Air' || e2 === 'Air') recommendations.push('languages, writing, or technology')
  if (e1 === 'Water' || e2 === 'Water') recommendations.push('art, music, or meditation')
  return recommendations.join(' or ')
}

function getDailyRitual(m1: Sign, m2: Sign): string {
  return `Morning connection (${signData[m1].element === 'Water' || signData[m2].element === 'Water' ? 'emotional check-in' : 'quick appreciation exchange'})`
}

function getWeeklyRitual(v1: Sign, v2: Sign): string {
  return `Date night that honors both ${v1} and ${v2} love languages`
}

function getAnnualRitual(s1: Sign, s2: Sign): string {
  return `Relationship review and goal-setting around your shared ${signData[s1].keywords[0].toLowerCase()} and ${signData[s2].keywords[0].toLowerCase()} values`
}

function calculateElements(chart: NatalChart): Record<string, number> {
  const elements: Record<string, number> = { Fire: 0, Earth: 0, Air: 0, Water: 0 }
  const elementMap: Record<string, string> = {
    Aries: 'Fire', Leo: 'Fire', Sagittarius: 'Fire',
    Taurus: 'Earth', Virgo: 'Earth', Capricorn: 'Earth',
    Gemini: 'Air', Libra: 'Air', Aquarius: 'Air',
    Cancer: 'Water', Scorpio: 'Water', Pisces: 'Water',
  }

  chart.placements.forEach(p => {
    const sign = capitalizeSign(p.sign)
    const element = elementMap[sign]
    if (element) elements[element]++
  })

  return elements
}

// Year Ahead Forecast Generator
export function generateYearAheadReportV2(
  chart: NatalChart,
  userName: string
): GeneratedReportV2 {
  const sun = getPlacement(chart, 'sun')
  const moon = getPlacement(chart, 'moon')

  const sunSign = capitalizeSign(sun?.sign || 'Aries')
  const moonSign = capitalizeSign(moon?.sign || 'Cancer')
  const risingSign = capitalizeSign(chart.ascendant?.sign || 'Aries')

  const sunData = signData[sunSign]
  const currentYear = new Date().getFullYear()

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  const sections: ReportSectionV2[] = [
    {
      id: 'overview',
      title: `Your ${currentYear} Overview`,
      icon: '🔮',
      subsections: [
        {
          title: 'The Year at a Glance',
          content: `${userName}, welcome to your personalized forecast for ${currentYear}. This report maps the major astrological influences affecting YOUR chart specifically over the coming twelve months.

Unlike general horoscopes, this forecast is calculated from your exact birth chart. The transiting planets form specific relationships with YOUR natal planets, creating a unique landscape of opportunities and challenges that no one else will experience in quite the same way.

**Your Astrological Profile:**
- Sun Sign: ${sunSign} - Your core identity and life force
- Moon Sign: ${moonSign} - Your emotional nature and inner needs
- Rising Sign: ${risingSign} - How you meet the world

**Major Themes for ${currentYear}:**
${getYearThemes(sunSign, moonSign, risingSign, currentYear)}

**What to Expect:**
This year invites you to focus on ${getYearFocus(sunSign, sunData)}. The planetary movements support growth in areas of ${getGrowthAreas(sunSign, moonSign)}, while challenging you to work on ${getChallengeAreas(sunSign, moonSign)}.`,
          terms: [
            { term: 'Transit', definition: 'When a planet\'s current position forms an aspect to a planet in your birth chart, activating that area of your life.' },
            { term: 'Solar Return', definition: 'The moment each year when the Sun returns to its exact position at your birth - your astrological birthday.' },
          ],
          visual: {
            type: 'element-balance',
            title: 'Your Elemental Energy This Year',
            data: {
              Fire: sunData.element === 'Fire' ? 35 : signData[moonSign].element === 'Fire' ? 25 : 15,
              Earth: sunData.element === 'Earth' ? 35 : signData[moonSign].element === 'Earth' ? 25 : 15,
              Air: sunData.element === 'Air' ? 35 : signData[moonSign].element === 'Air' ? 25 : 15,
              Water: sunData.element === 'Water' ? 35 : signData[moonSign].element === 'Water' ? 25 : 15,
            },
          },
          tip: `Save this report and revisit it at the start of each month to see what themes are emerging. The insights become more meaningful as the year unfolds.`,
        },
        {
          title: 'Key Dates & Power Periods',
          content: `**Your Most Powerful Months:**
${getPowerMonths(sunSign, moonSign, currentYear)}

**Dates to Watch:**
${getKeyDates(sunSign, currentYear)}

**Eclipse Influences:**
Eclipses are cosmic wildcards that accelerate change. In ${currentYear}, the eclipses will affect you most strongly in:
${getEclipseInfluence(sunSign, moonSign, risingSign, currentYear)}

**Retrograde Awareness:**
Mercury retrograde periods (${getMercuryRetrogrades(currentYear)}) will particularly affect your ${getMercuryRetroEffect(sunSign)} area. Use these times for review, not new initiatives.`,
          tip: 'Mark your power months and key dates in your calendar now. Knowing when cosmic energy supports you helps you time important decisions.',
        },
      ],
    },
    {
      id: 'career',
      title: 'Career & Professional Life',
      icon: '💼',
      subsections: [
        {
          title: 'Your Professional Path in ' + currentYear,
          content: `**Career Overview:**
${getCareerOverview(sunSign, moonSign, currentYear)}

**Best Months for Career Moves:**
${getCareerBestMonths(sunSign, currentYear)}

**Professional Opportunities:**
${getCareerOpportunities(sunSign, sunData, currentYear)}

**Challenges to Navigate:**
${getCareerChallenges(sunSign, moonSign)}

**Advice for Your Sign:**
As a ${sunSign}, your professional superpowers include ${sunData.strengths.slice(0, 2).join(' and ')}. Lean into these strengths while being mindful of ${sunData.challenges[0].toLowerCase()}.`,
          tip: `Your Sun sign energy is strongest when the Sun transits ${sunSign} (around your birthday). Use this annual power boost for major career initiatives.`,
          visual: {
            type: 'modality-balance',
            title: 'Your Professional Energy Style',
            data: {
              Cardinal: sunData.modality === 'Cardinal' ? 45 : 20,
              Fixed: sunData.modality === 'Fixed' ? 45 : 20,
              Mutable: sunData.modality === 'Mutable' ? 45 : 20,
            },
          },
        },
        {
          title: 'Navigating Workplace Dynamics',
          content: `**Your Natural Work Style:**
As a ${sunSign}, you bring ${sunData.archetype.toLowerCase()} energy to everything you do professionally. You thrive in environments that allow you to express ${sunData.keywords.slice(0, 2).join(' and ')}, and you naturally gravitate toward roles that utilise your ${sunData.strengths[0].toLowerCase()}.

**Working With Others in ${currentYear}:**
Your ${moonSign} Moon influences how you connect with colleagues on an emotional level. This year, you may find yourself drawn to team members who appreciate your ${signData[moonSign].keywords[0]} approach. ${currentYear} is an excellent year to:

• Build alliances with people who complement your ${sunSign} energy
• Address any workplace relationships that have become strained
• Find mentors who can help you develop in areas where you tend toward ${sunData.challenges[0].toLowerCase()}
• Practice patience with colleagues whose working styles differ from yours

**Leadership and Responsibility:**
${sunSign} individuals are natural ${sunData.element === 'Fire' ? 'initiators who inspire others through passion and enthusiasm' : sunData.element === 'Earth' ? 'builders who lead through reliability and practical wisdom' : sunData.element === 'Air' ? 'communicators who lead through ideas and strategic thinking' : 'nurturers who lead through emotional intelligence and intuition'}. In ${currentYear}, opportunities for increased responsibility may arise during ${getCareerBestMonths(sunSign, currentYear).split('.')[0]}.

**Handling Career Stress:**
When work becomes overwhelming, your ${moonSign} Moon needs ${signData[moonSign].element === 'Fire' ? 'physical activity and time to process emotions through action' : signData[moonSign].element === 'Earth' ? 'stability, routine, and connection with nature' : signData[moonSign].element === 'Air' ? 'space to think, talk things through, and change of scenery' : 'solitude, creative expression, and emotional validation'}. Make sure to honour these needs, especially during high-pressure periods.`,
        },
        {
          title: 'Career Growth Strategies for ' + currentYear,
          content: `**Skills to Develop:**
Based on your ${sunSign} Sun and ${moonSign} Moon combination, ${currentYear} is an excellent year to focus on developing:

1. **${getSkillDevelopment(sunSign, 1)}** - This aligns with your natural strengths while pushing you to grow
2. **${getSkillDevelopment(sunSign, 2)}** - Helps balance your tendency toward ${sunData.challenges[0].toLowerCase()}
3. **${getSkillDevelopment(moonSign, 3)}** - Supports your emotional intelligence at work

**Strategic Career Moves:**
The planetary alignments in ${currentYear} support ${sunSign} individuals making bold moves during the first half of the year. Consider:

• Updating your CV or professional profiles during your power months
• Having important career conversations when Mercury is direct
• Launching new initiatives after the New Moon in your Sun sign
• Reviewing and negotiating salary or benefits during Venus transits to your career houses

**Long-Term Career Vision:**
${currentYear} offers you a chance to step back and consider where you want to be professionally in 5-10 years. Your ${sunSign} nature suggests you would find fulfillment in careers that allow you to ${sunData.giftToWorld.split(',')[0].toLowerCase()}. Consider whether your current path aligns with this deeper calling.

**Networking and Visibility:**
Your ${risingSign} Rising shapes how you present professionally. In ${currentYear}, focus on ${signData[risingSign].element === 'Fire' ? 'making bold first impressions and taking visible leadership roles' : signData[risingSign].element === 'Earth' ? 'building your reputation through consistent, quality work' : signData[risingSign].element === 'Air' ? 'expanding your professional network and sharing your ideas' : 'deepening authentic connections and building trust over time'}.`,
          tip: `Mercury retrograde periods are excellent for revisiting old professional contacts, reviewing contracts, and refining your career strategy rather than launching new initiatives.`,
        },
      ],
    },
    {
      id: 'love',
      title: 'Love & Relationships',
      icon: '💕',
      subsections: [
        {
          title: 'Your Heart in ' + currentYear,
          content: `**Relationship Overview:**
${getRelationshipOverview(sunSign, moonSign, currentYear)}

**Best Months for Love:**
${getLoveBestMonths(sunSign, currentYear)}

**For Singles:**
${getSinglesAdvice(sunSign, moonSign, currentYear)}

**For Those in Relationships:**
${getCouplesAdvice(sunSign, moonSign, currentYear)}

**Venus Influences:**
Venus, planet of love, will particularly affect your chart when it ${getVenusInfluence(sunSign, currentYear)}. Mark these dates for important relationship conversations or romantic gestures.`,
          tip: `Venus retrograde (happening every 18 months) is a time to review relationships, not start new ones. Use these periods for deepening existing bonds or healing past relationship wounds.`,
          visual: {
            type: 'chart-wheel',
            title: 'Your Relationship Planets',
            data: { sun: sunSign, moon: moonSign, rising: risingSign },
          },
        },
        {
          title: 'Understanding Your Love Nature',
          content: `**How You Love as a ${sunSign}:**
Your ${sunSign} Sun expresses love through ${sunData.element === 'Fire' ? 'grand gestures, passionate declarations, and constant enthusiasm for your partner' : sunData.element === 'Earth' ? 'practical support, consistent presence, and building a stable future together' : sunData.element === 'Air' ? 'intellectual connection, meaningful conversation, and shared ideas and adventures' : 'deep emotional bonding, intuitive understanding, and nurturing care'}. You need a partner who appreciates your ${sunData.keywords[0]} nature and can match your ${sunData.strengths[0].toLowerCase()}.

**Your Emotional Needs in Partnership:**
With your Moon in ${moonSign}, you feel most loved when your partner provides ${signData[moonSign].element === 'Fire' ? 'excitement, admiration, and the freedom to be yourself' : signData[moonSign].element === 'Earth' ? 'security, reliability, and physical affection' : signData[moonSign].element === 'Air' ? 'mental stimulation, respect for your independence, and open communication' : 'emotional depth, loyalty, and genuine understanding'}.

In ${currentYear}, you may find yourself drawn to partners or deepening connections with those who can offer ${signData[moonSign].keywords.slice(0, 2).join(' and ')} in relationship. Trust these instincts - your Moon knows what your heart needs.

**Your Attraction Style:**
Your ${risingSign} Rising is the first thing potential partners notice about you. You attract others through your ${signData[risingSign].keywords[0]} presence and ${signData[risingSign].giftToWorld.split(',')[0].toLowerCase()}. In ${currentYear}, lean into these natural assets when meeting new people.

**Love Languages to Explore:**
Based on your chart, you likely appreciate:
• ${getLoveLanguage(sunSign, 1)}
• ${getLoveLanguage(moonSign, 2)}
• ${getLoveLanguage(risingSign, 3)}

This year is excellent for communicating these needs more clearly to your partner, or seeking partners who naturally speak these love languages.`,
        },
        {
          title: 'Relationship Challenges and Growth',
          content: `**Potential Relationship Challenges in ${currentYear}:**
Every zodiac combination has its growth edges. For ${sunSign} Sun with ${moonSign} Moon, watch out for:

• **${sunData.challenges[0]}** - This tendency can create friction in relationships, especially when you feel stressed or unappreciated
• **${signData[moonSign].challenges[0]}** - Your emotional patterns may surface more strongly during difficult periods
• **Compatibility tension** - ${sunData.element !== signData[moonSign].element ? `Your ${sunData.element} Sun and ${signData[moonSign].element} Moon sometimes pull in different directions` : 'Even harmonious Sun-Moon combinations face their challenges'}

**Turning Challenges into Growth:**
${currentYear} offers opportunities to transform these patterns. The planetary transits support:

1. Having honest conversations during Mercury direct periods
2. Processing emotions more constructively during the Full Moons
3. Setting healthier boundaries when Mars aspects your natal planets
4. Deepening intimacy during Venus transits to your relationship houses

**Past Relationship Patterns:**
As a ${sunSign}, you may have a history of ${sunData.element === 'Fire' ? 'rushing into relationships or losing interest once the initial excitement fades' : sunData.element === 'Earth' ? 'staying in relationships longer than healthy or prioritising security over passion' : sunData.element === 'Air' ? 'intellectualising emotions or struggling with commitment when things get too intense' : 'absorbing your partner\'s emotions or losing yourself in relationships'}. ${currentYear} invites you to recognise these patterns and make different choices.

**Healing and Forgiveness:**
If you are carrying wounds from past relationships, ${currentYear}'s planetary alignments support healing work. Consider:
• Journaling about relationship patterns during the reflective retrograde periods
• Seeking support from a counsellor or trusted friend during challenging transits
• Practicing self-compassion when old patterns resurface`,
        },
        {
          title: 'Deepening Connection in ' + currentYear,
          content: `**For Long-Term Partnerships:**
If you are in a committed relationship, ${currentYear} offers opportunities to deepen your bond through:

• **Shared Adventures:** Your ${sunSign} nature thrives when you experience ${sunData.element === 'Fire' ? 'new, exciting experiences together' : sunData.element === 'Earth' ? 'building projects or achieving goals as a team' : sunData.element === 'Air' ? 'learning new things or travelling to new places together' : 'emotional and creative experiences that bond you more deeply'}.

• **Quality Time:** With your ${moonSign} Moon, you feel closest to your partner when you ${signData[moonSign].element === 'Fire' ? 'are actively doing things together and celebrating each other' : signData[moonSign].element === 'Earth' ? 'share quiet, comfortable moments and physical closeness' : signData[moonSign].element === 'Air' ? 'have deep conversations and respect each other\'s need for space' : 'share vulnerable moments and truly see each other'}.

• **Handling Conflict:** When disagreements arise (and they will), remember that your ${sunSign} way of handling conflict is ${sunData.element === 'Fire' ? 'direct and immediate - you prefer to clear the air quickly' : sunData.element === 'Earth' ? 'slow and methodical - you need time to process before discussing' : sunData.element === 'Air' ? 'logical and fair - you want to understand all perspectives' : 'emotional and intuitive - you need to feel heard first'}. Communicate this to your partner.

**Relationship Milestones:**
${currentYear} is particularly favourable for:
${getRelationshipMilestones(sunSign, moonSign, currentYear)}

**Keeping the Spark Alive:**
Your ${sunSign} passion needs ${sunData.element === 'Fire' ? 'regular excitement and novelty' : sunData.element === 'Earth' ? 'sensual experiences and quality time' : sunData.element === 'Air' ? 'mental stimulation and playful banter' : 'deep emotional connection and romantic gestures'}. Make conscious effort to nurture this, especially during busy periods.`,
        },
      ],
    },
    {
      id: 'finance',
      title: 'Finances & Abundance',
      icon: '💰',
      subsections: [
        {
          title: 'Your Financial Year Ahead',
          content: `**Financial Overview for ${currentYear}:**
As a ${sunSign}, your relationship with money reflects your ${sunData.element} nature. You tend to ${sunData.element === 'Fire' ? 'be generous and sometimes impulsive with spending, following your passions' : sunData.element === 'Earth' ? 'be practical and security-focused, building wealth steadily over time' : sunData.element === 'Air' ? 'value experiences and ideas over material goods, sometimes forgetting to save' : 'follow emotional impulses with money, spending on things that make you feel secure or loved'}.

**Best Months for Financial Decisions:**
${getFinanceBestMonths(sunSign, currentYear)}

**Income Opportunities:**
${currentYear} brings opportunities to increase your income through ${sunData.element === 'Fire' ? 'bold initiatives, entrepreneurship, and leveraging your natural leadership' : sunData.element === 'Earth' ? 'consistent effort, asking for raises, and smart investments' : sunData.element === 'Air' ? 'networking, new ideas, and multiple income streams' : sunData.element === 'Water' ? 'creative work, helping professions, and following your intuition about opportunities' : 'your natural talents'}.

**Financial Cautions:**
Watch out for ${sunData.element === 'Fire' ? 'impulsive purchases, especially during enthusiastic periods' : sunData.element === 'Earth' ? 'being too conservative and missing growth opportunities' : sunData.element === 'Air' ? 'forgetting to track spending and overspending on experiences' : 'emotional spending, especially when stressed or sad'}. Mercury retrograde periods are particularly important times to avoid signing major financial contracts or making large purchases.

**Building Long-Term Wealth:**
Your ${moonSign} Moon influences your sense of financial security. You feel most stable when you have ${signData[moonSign].element === 'Fire' ? 'freedom to spend on what excites you while knowing basics are covered' : signData[moonSign].element === 'Earth' ? 'substantial savings, property, or tangible assets' : signData[moonSign].element === 'Air' ? 'flexibility and multiple options, not tied down to rigid budgets' : 'emotional connection to your resources and security for loved ones'}.`,
        },
        {
          title: 'Abundance Mindset for ' + sunSign,
          content: `**Your Natural Relationship with Abundance:**
Every sign has unique gifts that can generate abundance. As a ${sunSign}, your path to prosperity flows through ${sunData.giftToWorld.split(',')[0].toLowerCase()}. When you are fully expressing your ${sunData.archetype.toLowerCase()} nature, money tends to follow naturally.

**Blocks to Abundance:**
Your ${sunData.challenges[0].toLowerCase()} tendency can sometimes block the flow of abundance. Notice when this pattern arises in financial situations, and consciously choose a different response.

**Affirmations for ${sunSign} Prosperity:**
• "My ${sunData.strengths[0].toLowerCase()} naturally attracts abundance."
• "I deserve prosperity while honouring my ${sunSign} nature."
• "Money flows to me easily when I express my authentic gifts."

**Practical Steps for ${currentYear}:**
1. Review your budget during the New Moon in your money houses
2. Have salary negotiations during your power months
3. Start savings or investment plans when Jupiter aspects your chart favourably
4. Avoid major purchases during Mercury retrograde periods
5. Trust your ${moonSign} Moon's instincts about financial opportunities`,
        },
      ],
    },
    {
      id: 'health',
      title: 'Health & Wellness',
      icon: '💪',
      subsections: [
        {
          title: 'Vitality in ' + currentYear,
          content: `**Health Overview:**
${getHealthOverview(sunSign, moonSign, currentYear)}

**Energy Rhythms:**
Your ${sunSign} Sun gives you ${sunData.element} element energy, which means you thrive when ${getElementWellness(sunData.element)}.

**Best Practices for Your Sign:**
${getHealthPractices(sunSign, moonSign)}

**Challenging Periods:**
Watch your energy levels during ${getHealthChallenges(sunSign, currentYear)}. During these times, prioritize rest and stress management.

**Wellness Goals:**
${currentYear} is an excellent year to focus on ${getWellnessGoals(sunSign, moonSign)}.`,
        },
        {
          title: 'Body, Mind & Spirit Balance',
          content: `**Physical Health for ${sunSign}:**
Your ${sunData.element} element Sun rules certain areas of physical health. ${sunData.element === 'Fire' ? 'Fire signs tend to run hot and may experience inflammation, fevers, or burnout when stressed' : sunData.element === 'Earth' ? 'Earth signs connect strongly to the physical body and may experience tension, digestive issues, or weight fluctuations under stress' : sunData.element === 'Air' ? 'Air signs often carry stress in the nervous system, potentially experiencing anxiety, respiratory issues, or restlessness' : 'Water signs are sensitive and may experience water retention, immune issues, or emotional eating when out of balance'}.

**Exercise That Works for You:**
Your ideal ${currentYear} fitness routine should include:
• ${getExerciseRecommendation(sunSign, 1)}
• ${getExerciseRecommendation(moonSign, 2)}
• ${getExerciseRecommendation(risingSign, 3)}

**Mental Wellness:**
Your ${moonSign} Moon influences your emotional wellbeing significantly. In ${currentYear}, support your mental health by:
• Practicing ${signData[moonSign].element === 'Fire' ? 'physical outlets for emotions and celebration of achievements' : signData[moonSign].element === 'Earth' ? 'grounding exercises, nature connection, and routine' : signData[moonSign].element === 'Air' ? 'journaling, talking with friends, and mental stimulation' : 'creative expression, water-based activities, and emotional processing'}
• Recognising your ${signData[moonSign].challenges[0].toLowerCase()} tendency and developing healthy coping strategies
• Seeking support during challenging transits rather than isolating

**Sleep and Rest:**
${sunSign} individuals often ${sunData.element === 'Fire' ? 'struggle to wind down and may need active relaxation like evening walks' : sunData.element === 'Earth' ? 'do well with consistent sleep schedules and comfortable sleep environments' : sunData.element === 'Air' ? 'have active minds at night and benefit from reading or meditation before bed' : 'are affected by the Moon phases in their sleep and may need extra rest around Full Moons'}. Pay attention to your sleep quality during major transits.

**Nutrition Insights:**
Based on your elemental balance, you may benefit from ${sunData.element === 'Fire' ? 'cooling foods, adequate hydration, and anti-inflammatory ingredients' : sunData.element === 'Earth' ? 'warming foods, variety in diet, and mindful eating practices' : sunData.element === 'Air' ? 'grounding foods, regular meal times, and nerve-supporting nutrients' : 'warming, grounding foods and limiting excessive fluids'}.`,
        },
        {
          title: 'Stress Management & Self-Care',
          content: `**Your Stress Signature:**
When stressed, ${sunSign} individuals typically ${sunData.element === 'Fire' ? 'become irritable, impulsive, or burn themselves out trying to push through' : sunData.element === 'Earth' ? 'become rigid, stubborn, or develop physical tension and health complaints' : sunData.element === 'Air' ? 'become anxious, scattered, or escape into mental activity to avoid feelings' : 'become moody, withdrawn, or absorb the stress of those around them'}. Your ${moonSign} Moon adds a layer of ${signData[moonSign].challenges[0].toLowerCase()} when you are under pressure.

**Self-Care Essentials for ${currentYear}:**
Build these practices into your routine:

**Daily:**
• ${getDailySelfCare(sunSign)}
• ${getDailySelfCare(moonSign)}

**Weekly:**
• ${getWeeklySelfCare(sunSign)}
• Time for ${signData[moonSign].element === 'Fire' ? 'passion projects and physical activity' : signData[moonSign].element === 'Earth' ? 'nature, comfort, and grounding activities' : signData[moonSign].element === 'Air' ? 'social connection and mental stimulation' : 'solitude, water, and creative expression'}

**Monthly:**
• Align activities with Moon phases - start projects at New Moon, complete at Full Moon
• During your power months, invest extra energy in health and wellness goals
• During challenging transit periods, prioritise rest over productivity

**Crisis Self-Care:**
When ${currentYear} throws challenges your way, remember:
• Your ${sunSign} strength is ${sunData.strengths[0].toLowerCase()} - rely on it
• Your ${moonSign} Moon finds comfort in ${signData[moonSign].keywords[0].toLowerCase()} - seek it out
• Reach out to ${sunData.element === 'Fire' ? 'people who uplift and energise you' : sunData.element === 'Earth' ? 'stable, reliable people who offer practical support' : sunData.element === 'Air' ? 'friends who listen and help you process mentally' : 'people who create safe emotional space'}`,
        },
      ],
    },
    {
      id: 'growth',
      title: 'Personal Growth & Spirituality',
      icon: '🌱',
      subsections: [
        {
          title: 'Your Evolution in ' + currentYear,
          content: `**Growth Overview:**
${getGrowthOverview(sunSign, moonSign, currentYear)}

**Your Growth Edge:**
As a ${sunSign}, your ongoing life lesson is ${sunData.lifeLesson.toLowerCase()}. In ${currentYear}, you'll have opportunities to make significant progress on this front.

**Recommended Practices:**
${getGrowthPractices(sunSign, moonSign)}

**Books/Topics to Explore:**
Based on your chart, you would benefit from exploring topics related to ${getGrowthTopics(sunSign, moonSign)}.

**Shadow Work This Year:**
${sunData.shadowSide} are tendencies to watch. ${currentYear} offers opportunities to transform these patterns.`,
        },
        {
          title: 'Your Soul\'s Journey This Year',
          content: `**Understanding Your Life Purpose:**
Your ${sunSign} Sun represents your core life purpose - to embody ${sunData.archetype.toLowerCase()} energy and share your ${sunData.giftToWorld.toLowerCase()} with the world. In ${currentYear}, the planetary alignments support you in taking significant steps toward this purpose.

**The Three Pillars of Your ${currentYear} Growth:**

**1. Sun Sign Mastery:**
This year invites you to more fully embody the positive expression of ${sunSign}:
• Develop your ${sunData.strengths.slice(0, 2).join(' and ').toLowerCase()}
• Transform your ${sunData.challenges[0].toLowerCase()} into a strength
• Share your ${sunData.keywords[0]} gifts more boldly with the world

**2. Moon Sign Integration:**
Your ${moonSign} Moon represents your inner world and emotional needs. ${currentYear}'s growth includes:
• Honouring your need for ${signData[moonSign].keywords.slice(0, 2).join(' and ')}
• Healing patterns related to ${signData[moonSign].challenges[0].toLowerCase()}
• Developing greater ${signData[moonSign].strengths[0].toLowerCase()}

**3. Rising Sign Refinement:**
Your ${risingSign} Rising is your interface with the world. This year focus on:
• Presenting your ${signData[risingSign].keywords[0]} qualities more authentically
• Balancing your Rising sign persona with your Sun sign truth
• Using your ${risingSign} first impression to open doors aligned with your purpose

**Karmic Themes:**
Every chart carries karmic lessons. For ${sunSign} with ${moonSign} Moon, ${currentYear} offers opportunities to work on ${sunData.lifeLesson.toLowerCase()} while integrating ${signData[moonSign].lifeLesson.toLowerCase()}.`,
        },
        {
          title: 'Spiritual Practices for ' + currentYear,
          content: `**Meditation Suited to Your Chart:**
Your ${sunData.element}-${signData[moonSign].element} Sun-Moon combination thrives with:
• ${getMeditationStyle(sunSign)}
• ${getMeditationStyle(moonSign)}
• Practices that balance your ${sunData.element} fire with ${signData[moonSign].element === sunData.element ? 'deeper immersion in this element' : signData[moonSign].element + ' receptivity'}

**Moon Rituals:**
As someone with Moon in ${moonSign}, you are particularly sensitive to lunar cycles. In ${currentYear}, enhance your connection to the Moon through:

**New Moon Practices:**
• Set intentions aligned with your ${sunSign} goals
• Journal about ${sunData.keywords[0]} themes
• Plant seeds for new ${signData[moonSign].keywords[0]} experiences

**Full Moon Practices:**
• Release ${sunData.challenges[0].toLowerCase()} patterns
• Celebrate ${sunData.strengths[0].toLowerCase()} achievements
• Allow ${signData[moonSign].keywords[0]} emotions to surface and clear

**Spiritual Reading List for ${currentYear}:**
Based on your chart, you would benefit from exploring:
• ${getBookRecommendation(sunSign)}
• ${getBookRecommendation(moonSign)}
• Topics related to ${sunData.archetype.toLowerCase()} wisdom

**Sacred Spaces and Practices:**
Your ${sunData.element} Sun finds the sacred in ${sunData.element === 'Fire' ? 'movement, passion, and creative expression' : sunData.element === 'Earth' ? 'nature, the body, and tangible rituals' : sunData.element === 'Air' ? 'ideas, conversation, and mental exploration' : 'emotional connection, water, and intuitive practices'}. Create or visit spaces that nourish this connection throughout ${currentYear}.`,
        },
        {
          title: 'Transformation and Shadow Work',
          content: `**Understanding Your Shadow:**
Every zodiac sign has a shadow side - the unconscious patterns that emerge when we are stressed, triggered, or unaware. For ${sunSign}, the shadow includes ${sunData.shadowSide.toLowerCase()}.

Your ${moonSign} Moon adds another layer: when emotionally triggered, you may also experience ${signData[moonSign].shadowSide.toLowerCase()}.

**Shadow Work Opportunities in ${currentYear}:**
The planetary transits this year will likely bring these shadow patterns to the surface, particularly during:
• Eclipse seasons (opportunities for rapid transformation)
• Saturn transits (confronting limitations and responsibilities)
• Pluto aspects (deep psychological transformation)

**Working with Your Shadow:**
Rather than suppressing these tendencies, ${currentYear} invites you to:

1. **Notice without judgment** - When you see yourself acting from shadow, simply observe
2. **Trace to the root** - What fear or wound drives this pattern?
3. **Find the gift** - Every shadow contains a hidden strength. Your ${sunData.challenges[0].toLowerCase()} contains ${getHiddenGift(sunSign)}
4. **Integrate consciously** - Practice expressing this energy in healthy ways

**Journal Prompts for ${currentYear}:**
• "When does my ${sunData.challenges[0].toLowerCase()} tendency emerge, and what am I really needing in those moments?"
• "How can my ${sunData.strengths[0].toLowerCase()} serve others while honouring my ${moonSign} emotional needs?"
• "What would my ${sunSign} self look like at its highest expression?"

**Support for Deep Work:**
Some transits in ${currentYear} may bring intense transformational experiences. During these times, consider:
• Working with a therapist or coach who understands your growth edge
• Joining groups focused on ${sunData.archetype.toLowerCase()} development
• Practicing extra self-compassion as old patterns surface for healing`,
        },
      ],
    },
    {
      id: 'monthly',
      title: 'Month-by-Month Breakdown',
      icon: '📅',
      subsections: months.map((month, i) => ({
        title: month + ' ' + currentYear,
        content: getDetailedMonthForecast(month, i, sunSign, moonSign, risingSign, sunData, currentYear),
      })),
    },
    {
      id: 'summary',
      title: 'Your Year in Summary',
      icon: '✨',
      subsections: [
        {
          title: 'Key Takeaways',
          content: `**${userName}, as you move through ${currentYear}, remember:**

1. **Your Greatest Opportunity:** ${getGreatestOpportunity(sunSign, moonSign, currentYear)}

2. **Your Main Challenge:** ${getMainChallenge(sunSign, moonSign, currentYear)}

3. **Your Growth Theme:** ${getGrowthTheme(sunSign, moonSign, currentYear)}

4. **Your Power Move:** ${getPowerMove(sunSign, sunData, currentYear)}

**Final Wisdom:**
The planets don't make things happen - they create conditions. ${currentYear} offers you ${getYearOffer(sunSign, moonSign)}. What you do with these opportunities is always in your hands.

Your ${sunSign} courage, ${moonSign} intuition, and ${risingSign} presence are perfectly designed for the journey ahead. Trust your chart, trust yourself, and make ${currentYear} a year of meaningful growth.`,
          tip: 'Revisit this report at the start of each month to remind yourself of the themes and opportunities ahead.',
        },
        {
          title: 'Your ${currentYear} Action Plan',
          content: `**Quarterly Overview:**

**Q1 (January - March):**
Focus on ${getQuarterFocus(sunSign, moonSign, 1)}. This is an excellent time to ${getQuarterAction(sunSign, 1)}.

**Q2 (April - June):**
Energy shifts toward ${getQuarterFocus(sunSign, moonSign, 2)}. Prioritise ${getQuarterAction(sunSign, 2)}.

**Q3 (July - September):**
The middle of the year brings ${getQuarterFocus(sunSign, moonSign, 3)}. Use this time for ${getQuarterAction(sunSign, 3)}.

**Q4 (October - December):**
The year closes with ${getQuarterFocus(sunSign, moonSign, 4)}. Complete ${getQuarterAction(sunSign, 4)}.

**Your Top 5 Priorities for ${currentYear}:**
Based on your unique ${sunSign}-${moonSign}-${risingSign} combination, make these your non-negotiables:

1. ${getTopPriority(sunSign, moonSign, 1)}
2. ${getTopPriority(sunSign, moonSign, 2)}
3. ${getTopPriority(sunSign, moonSign, 3)}
4. ${getTopPriority(sunSign, moonSign, 4)}
5. ${getTopPriority(sunSign, moonSign, 5)}

**Power Dates to Mark in Your Calendar:**
${getPowerDates(sunSign, moonSign, currentYear)}

**Monthly Check-In Questions:**
At the start of each month, ask yourself:
• Am I honouring my ${sunSign} need for ${sunData.keywords[0]}?
• Am I meeting my ${moonSign} emotional need for ${signData[moonSign].keywords[0]}?
• Am I growing in my ${sunData.lifeLesson.toLowerCase()} journey?
• What cosmic support is available to me this month?`,
        },
        {
          title: 'Closing Blessing for ' + currentYear,
          content: `**A Message for Your Year Ahead:**

Dear ${userName},

As ${currentYear} unfolds, remember that you carry within you the combined wisdom of your ${sunSign} Sun, the emotional depth of your ${moonSign} Moon, and the worldly presence of your ${risingSign} Rising. This unique combination has been preparing you for exactly this year.

The challenges you may face are not punishments but opportunities dressed in difficult clothing. Your ${sunData.challenges[0].toLowerCase()} tendency, which sometimes feels like a burden, is actually your growth edge - the place where your greatest evolution awaits.

Your ${sunData.strengths[0].toLowerCase()} is not just a personal gift but something the world needs from you. When you express your ${sunData.archetype.toLowerCase()} nature authentically, you give permission to others to do the same.

**Trust your ${moonSign} Moon** when it tells you something feels right or wrong. Your emotional intelligence is more accurate than you sometimes believe.

**Lean into your ${risingSign} Rising** when you need to make an impression or start something new. The world responds to this energy from you.

**Express your ${sunSign} Sun** fully this year. Do not dim your light to make others comfortable.

The planets are aligned to support your journey. May ${currentYear} bring you closer to the person you came here to become.

With cosmic blessings for your path ahead,
*Your Astrological Guide*`,
        },
      ],
    },
  ]

  const allTerms: ReportTerm[] = []
  sections.forEach(section => {
    section.subsections.forEach(subsection => {
      if (subsection.terms) {
        allTerms.push(...subsection.terms)
      }
    })
  })

  let wordCount = 0
  sections.forEach(section => {
    section.subsections.forEach(subsection => {
      wordCount += subsection.content.split(/\s+/).length
    })
  })

  return {
    id: `year-ahead-${Date.now()}`,
    slug: 'year-ahead-forecast',
    title: `${currentYear} Forecast for ${userName}`,
    generatedAt: new Date().toISOString(),
    userName,
    birthData: {
      date: '',
      place: '',
      sunSign,
      moonSign,
      risingSign,
    },
    summary: {
      headline: `${sunSign} Sun | ${moonSign} Moon | ${risingSign} Rising`,
      overview: `Your personalized guide to ${currentYear}`,
      keyStrengths: [
        getGreatestOpportunity(sunSign, moonSign, currentYear).split(':')[0],
        getPowerMove(sunSign, signData[sunSign], currentYear).split(':')[0],
      ],
      growthAreas: [
        getMainChallenge(sunSign, moonSign, currentYear).split(':')[0],
      ],
    },
    visuals: [
      { type: 'chart-wheel', title: 'Your Birth Chart', data: { sun: sunSign, moon: moonSign, rising: risingSign } },
    ],
    sections,
    glossary: allTerms,
    wordCount,
  }
}

// Year Ahead Helper Functions
function getYearThemes(sun: Sign, moon: Sign, rising: Sign, year: number): string {
  return `1. **Personal Growth:** Expanding your ${signData[sun].keywords[0]} nature into new areas
2. **Emotional Evolution:** Deepening your ${signData[moon].keywords[0]} emotional intelligence
3. **World Interface:** Refining how your ${signData[rising].keywords[0]} presence meets the world`
}

function getYearFocus(sun: Sign, data: typeof signData[Sign]): string {
  return `${data.keywords.slice(0, 2).join(', ')} - the core qualities of your ${sun} nature`
}

function getGrowthAreas(sun: Sign, moon: Sign): string {
  return `${signData[sun].strengths[0].toLowerCase()}, ${signData[moon].strengths[0].toLowerCase()}`
}

function getChallengeAreas(sun: Sign, moon: Sign): string {
  return `${signData[sun].challenges[0].toLowerCase()}`
}

function getPowerMonths(sun: Sign, moon: Sign, year: number): string {
  const element = signData[sun].element
  const months = element === 'Fire' ? 'March, July, November' :
                 element === 'Earth' ? 'April, August, December' :
                 element === 'Air' ? 'January, May, September' :
                 'February, June, October'
  return `${months} - when the Sun transits fellow ${element} signs, amplifying your natural energy.`
}

function getKeyDates(sun: Sign, year: number): string {
  return `- Your Solar Return (birthday month): The start of your personal new year
- New Moon in ${sun}: Time to set intentions aligned with your core nature
- Full Moon in ${sun}: Culmination of projects and relationships`
}

function getEclipseInfluence(sun: Sign, moon: Sign, rising: Sign, year: number): string {
  return `The ${year} eclipses will activate transformation in your chart. Stay flexible during eclipse seasons (typically April/May and October/November).`
}

function getMercuryRetrogrades(year: number): string {
  return 'approximately three times per year, lasting about three weeks each'
}

function getMercuryRetroEffect(sun: Sign): string {
  const element = signData[sun].element
  return element === 'Fire' ? 'action and initiative' :
         element === 'Earth' ? 'practical and financial' :
         element === 'Air' ? 'communication and learning' :
         'emotional and intuitive'
}

function getCareerOverview(sun: Sign, moon: Sign, year: number): string {
  return `For ${sun} in ${year}, career energy focuses on ${signData[sun].keywords[0]} expression. Your ${moon} Moon supports this through ${signData[moon].keywords[0]} intuition. Expect opportunities to showcase your ${signData[sun].strengths[0].toLowerCase()}.`
}

function getCareerBestMonths(sun: Sign, year: number): string {
  return `Spring and early fall are particularly powerful for career advancement. Watch for opportunities when planets transit your Sun sign.`
}

function getCareerOpportunities(sun: Sign, data: typeof signData[Sign], year: number): string {
  return `As ${sun} (${data.archetype}), you'll find opportunities in areas requiring ${data.strengths.slice(0, 2).join(' and ').toLowerCase()}. Look for roles that let you express your ${data.giftToWorld.split(',')[0].toLowerCase()}.`
}

function getCareerChallenges(sun: Sign, moon: Sign): string {
  return `Watch for ${signData[sun].challenges[0].toLowerCase()} tendencies that might hold you back. Your ${moon} Moon's ${signData[moon].challenges[0].toLowerCase()} could also surface under work stress.`
}

function getRelationshipOverview(sun: Sign, moon: Sign, year: number): string {
  return `${year} offers ${sun} Suns opportunities for deeper connection. Your ${moon} Moon will guide emotional decisions. Venus transits through your sign will be particularly romantic periods.`
}

function getLoveBestMonths(sun: Sign, year: number): string {
  return `When Venus transits your Sun sign and fellow ${signData[sun].element} signs, romantic energy peaks. Also watch for the New Moon in your 7th house area for new relationship beginnings.`
}

function getSinglesAdvice(sun: Sign, moon: Sign, year: number): string {
  return `Your ${sun} Sun attracts partners through your ${signData[sun].keywords[0]} nature. Be authentically yourself - the right people will be drawn to your ${signData[sun].giftToWorld.split(',')[0].toLowerCase()}. Your ${moon} Moon knows who feels right - trust those instincts.`
}

function getCouplesAdvice(sun: Sign, moon: Sign, year: number): string {
  return `Deepen your bond by sharing your ${signData[moon].keywords[0]} emotional nature more fully. Your partner benefits from understanding your ${sun} need for ${signData[sun].keywords[0]} expression. Plan special experiences during your power months.`
}

function getVenusInfluence(sun: Sign, year: number): string {
  return `transits your Sun sign and makes aspects to your natal Venus. These are heightened times for love, beauty, and pleasure.`
}

function getHealthOverview(sun: Sign, moon: Sign, year: number): string {
  return `Your ${sun} vitality is influenced by ${signData[sun].element} element energy. This year, focus on activities that honor both your ${signData[sun].element} Sun and ${signData[moon].element} Moon needs.`
}

function getElementWellness(element: string): string {
  return element === 'Fire' ? 'you have outlets for physical energy and passion' :
         element === 'Earth' ? 'you maintain routines and connect with nature' :
         element === 'Air' ? 'you have mental stimulation and social connection' :
         'you honor your emotional rhythms and creative expression'
}

function getHealthPractices(sun: Sign, moon: Sign): string {
  return `- ${signData[sun].element} element practice: ${getElementPractice(signData[sun].element)}
- ${signData[moon].element} element practice: ${getElementPractice(signData[moon].element)}
- Mindfulness practice suited to your ${sun} nature`
}

function getElementPractice(element: string): string {
  return element === 'Fire' ? 'High-intensity exercise, competitive sports, dance' :
         element === 'Earth' ? 'Hiking, yoga, gardening, strength training' :
         element === 'Air' ? 'Group fitness, tennis, cycling, breathwork' :
         'Swimming, water sports, restorative yoga, meditation'
}

function getHealthChallenges(sun: Sign, year: number): string {
  return `eclipse seasons and when major planets transit your Sun sign or oppose it. These can bring stress that affects your ${signData[sun].element} vitality.`
}

function getWellnessGoals(sun: Sign, moon: Sign): string {
  return `integrating ${signData[sun].element} body practices with ${signData[moon].element} emotional wellness.`
}

function getGrowthOverview(sun: Sign, moon: Sign, year: number): string {
  return `${year} is a year of ${signData[sun].keywords[0]} evolution for you. Your ${moon} Moon supports inner growth through ${signData[moon].keywords[0]} awareness. The major theme is ${signData[sun].lifeLesson.toLowerCase()}.`
}

function getGrowthPractices(sun: Sign, moon: Sign): string {
  return `- Journaling on ${signData[sun].archetype.toLowerCase()} themes
- Meditation suited to ${signData[moon].element} emotional processing
- Shadow work on ${signData[sun].challenges[0].toLowerCase()}
- Cultivating ${signData[sun].strengths[0].toLowerCase()} consciously`
}

function getGrowthTopics(sun: Sign, moon: Sign): string {
  return `${signData[sun].archetype.toLowerCase()} development, ${signData[moon].element.toLowerCase()} emotional intelligence, and ${signData[sun].giftToWorld.split(',')[0].toLowerCase()}`
}

function getMonthForecast(month: string, index: number, sun: Sign, moon: Sign, year: number): string {
  const energy = ['dynamic', 'reflective', 'expansive', 'grounding', 'creative', 'analytical', 'relational', 'transformative', 'adventurous', 'ambitious', 'innovative', 'spiritual'][index]
  return `**${month} ${year}:**
A ${energy} month for ${sun}. Focus on ${signData[sun].keywords[index % 5]}. Your ${moon} Moon benefits from ${signData[moon].keywords[index % 5]} activities.

**Key Focus:** ${['New beginnings', 'Financial matters', 'Communication', 'Home and family', 'Creativity', 'Health', 'Relationships', 'Deep transformation', 'Learning', 'Career', 'Community', 'Spiritual practice'][index]}
**Challenge:** ${['Impulsiveness', 'Stubbornness', 'Scattered energy', 'Moodiness', 'Ego', 'Perfectionism', 'Indecision', 'Intensity', 'Overcommitting', 'Workaholism', 'Detachment', 'Escapism'][index]}
**Opportunity:** ${['Launch projects', 'Build resources', 'Network', 'Nest and nurture', 'Express yourself', 'Optimize', 'Partner', 'Transform', 'Expand horizons', 'Achieve goals', 'Connect with community', 'Dream and vision'][index]}`
}

function getGreatestOpportunity(sun: Sign, moon: Sign, year: number): string {
  return `Expanding your ${signData[sun].strengths[0].toLowerCase()} into new areas of life.`
}

function getMainChallenge(sun: Sign, moon: Sign, year: number): string {
  return `Working consciously with your ${signData[sun].challenges[0].toLowerCase()} tendency.`
}

function getGrowthTheme(sun: Sign, moon: Sign, year: number): string {
  return `Integrating your ${sun} Sun's ${signData[sun].keywords[0]} nature with your ${moon} Moon's ${signData[moon].keywords[0]} needs.`
}

function getPowerMove(sun: Sign, data: typeof signData[Sign], year: number): string {
  return `Fully embodying your role as ${data.archetype} and sharing your ${data.giftToWorld.split(',')[0].toLowerCase()} with the world.`
}

function getYearOffer(sun: Sign, moon: Sign): string {
  return `a chance to grow more fully into your ${sun} potential while honoring your ${moon} emotional truth`
}

// Additional Year Ahead Helper Functions

function getSkillDevelopment(sign: Sign, index: number): string {
  const skills: Record<string, string[]> = {
    Aries: ['Leadership presence', 'Strategic patience', 'Collaborative working'],
    Taurus: ['Adaptability', 'Risk assessment', 'Innovation mindset'],
    Gemini: ['Deep focus', 'Follow-through', 'Expertise building'],
    Cancer: ['Boundary setting', 'Emotional regulation', 'Professional assertiveness'],
    Leo: ['Active listening', 'Team recognition', 'Humility in leadership'],
    Virgo: ['Big picture thinking', 'Delegation', 'Self-compassion'],
    Libra: ['Decision making', 'Conflict navigation', 'Independent action'],
    Scorpio: ['Trust building', 'Transparency', 'Letting go'],
    Sagittarius: ['Detail orientation', 'Commitment follow-through', 'Practical planning'],
    Capricorn: ['Work-life balance', 'Playfulness', 'Emotional expression'],
    Aquarius: ['Emotional connection', 'One-on-one relating', 'Grounding practices'],
    Pisces: ['Boundaries', 'Practical organization', 'Self-advocacy'],
  }
  return skills[sign]?.[index - 1] || 'Personal development'
}

function getLoveLanguage(sign: Sign, index: number): string {
  const languages: Record<string, string[]> = {
    Aries: ['Acts of service that show initiative', 'Physical affection', 'Words of admiration'],
    Taurus: ['Physical touch and sensual experiences', 'Quality time together', 'Thoughtful gifts'],
    Gemini: ['Stimulating conversation', 'Sharing new experiences', 'Playful banter'],
    Cancer: ['Quality time at home', 'Acts of nurturing care', 'Emotional availability'],
    Leo: ['Words of affirmation', 'Grand romantic gestures', 'Undivided attention'],
    Virgo: ['Acts of thoughtful service', 'Practical support', 'Words of appreciation'],
    Libra: ['Quality time in beautiful settings', 'Thoughtful gifts', 'Romantic gestures'],
    Scorpio: ['Deep emotional intimacy', 'Physical connection', 'Unwavering loyalty'],
    Sagittarius: ['Shared adventures', 'Freedom and trust', 'Philosophical connection'],
    Capricorn: ['Acts of commitment', 'Practical support', 'Respect for achievements'],
    Aquarius: ['Intellectual connection', 'Respecting independence', 'Unique experiences'],
    Pisces: ['Emotional attunement', 'Creative expressions of love', 'Spiritual connection'],
  }
  return languages[sign]?.[index - 1] || 'Heartfelt connection'
}

function getRelationshipMilestones(sun: Sign, moon: Sign, year: number): string {
  return `• Moving in together or discussing shared living
• Having important conversations about the future
• Deepening commitment or clarifying relationship direction
• Meeting each other's important people
• Travelling together or planning significant experiences`
}

function getFinanceBestMonths(sun: Sign, year: number): string {
  const element = signData[sun].element
  return element === 'Fire' ? 'Spring months when your energy for new ventures is highest. Avoid impulsive decisions in summer heat.' :
         element === 'Earth' ? 'Late spring and autumn when your practical wisdom is strongest. Good for negotiations and investments.' :
         element === 'Air' ? 'Early year for new ideas and late year for implementing them. Network in spring for opportunities.' :
         'Trust your intuition in February, June, and October. Avoid major decisions when emotionally unsettled.'
}

function getExerciseRecommendation(sign: Sign, index: number): string {
  const exercises: Record<string, string[]> = {
    Aries: ['High-intensity interval training', 'Competitive sports', 'Boxing or martial arts'],
    Taurus: ['Yoga and stretching', 'Nature walks', 'Weight training'],
    Gemini: ['Dance classes', 'Tennis or badminton', 'Circuit training'],
    Cancer: ['Swimming', 'Home workouts', 'Gentle yoga'],
    Leo: ['Group fitness classes', 'Dance', 'Performance sports'],
    Virgo: ['Pilates', 'Running with tracking', 'Functional fitness'],
    Libra: ['Partner exercises', 'Barre classes', 'Cycling'],
    Scorpio: ['Intense cardio', 'Transformation programs', 'Solo training'],
    Sagittarius: ['Outdoor adventures', 'Team sports', 'Hiking'],
    Capricorn: ['Mountain climbing', 'Structured programs', 'Endurance training'],
    Aquarius: ['Unique fitness trends', 'Group activities', 'Tech-based training'],
    Pisces: ['Swimming', 'Dance', 'Mind-body practices'],
  }
  return exercises[sign]?.[index - 1] || 'Regular movement practice'
}

function getDailySelfCare(sign: Sign): string {
  const care: Record<string, string> = {
    Aries: 'Morning movement to channel your fire energy constructively',
    Taurus: 'Moments of sensory pleasure - good food, comfortable spaces',
    Gemini: 'Mental stimulation through reading or learning something new',
    Cancer: 'Connection with home or loved ones, even briefly',
    Leo: 'Creative expression or acknowledgment of your efforts',
    Virgo: 'Time to organize or complete small tasks for satisfaction',
    Libra: 'Beauty in your environment and harmonious interactions',
    Scorpio: 'Moments of solitude to process and regenerate',
    Sagittarius: 'Learning something new or planning future adventures',
    Capricorn: 'Progress on meaningful goals and structured time',
    Aquarius: 'Mental freedom and space for innovative thinking',
    Pisces: 'Creative or spiritual practice and moments of quiet',
  }
  return care[sign] || 'Moments aligned with your nature'
}

function getWeeklySelfCare(sign: Sign): string {
  const care: Record<string, string> = {
    Aries: 'Physical adventure or competition that lets you expend energy',
    Taurus: 'Extended time in nature or enjoying sensual pleasures',
    Gemini: 'Social time with stimulating friends or new experiences',
    Cancer: 'Quality time at home or with close family/friends',
    Leo: 'Recognition, celebration, or creative projects',
    Virgo: 'Organizing, planning, and crossing items off your list',
    Libra: 'Cultural experiences, art, or quality time with a partner',
    Scorpio: 'Deep conversation, transformation work, or intimate time',
    Sagittarius: 'Exploration, adventure, or philosophical discussion',
    Capricorn: 'Meaningful work progress and quality rest afterwards',
    Aquarius: 'Community connection or pursuing unusual interests',
    Pisces: 'Creative expression, spiritual practice, or time near water',
  }
  return care[sign] || 'Activities that restore your particular energy'
}

function getMeditationStyle(sign: Sign): string {
  const styles: Record<string, string> = {
    Aries: 'Active meditation like walking meditation or dynamic practices',
    Taurus: 'Body-based practices like body scans or sensory awareness',
    Gemini: 'Guided meditations that engage the mind with visualisation',
    Cancer: 'Loving-kindness meditation and practices focused on the heart',
    Leo: 'Heart-centered meditation with visualisation of light and warmth',
    Virgo: 'Focused attention practices like breath counting or mantra',
    Libra: 'Balance-oriented practices and meditation on beauty or harmony',
    Scorpio: 'Deep transformational practices and shadow meditation',
    Sagittarius: 'Expansive practices like sky gazing or journey meditation',
    Capricorn: 'Structured, goal-oriented practices with measurable progress',
    Aquarius: 'Innovative practices and meditation on interconnectedness',
    Pisces: 'Open awareness, ocean meditation, or merging practices',
  }
  return styles[sign] || 'Meditation suited to your nature'
}

function getBookRecommendation(sign: Sign): string {
  const books: Record<string, string> = {
    Aries: 'Books on courageous leadership and pioneering spirit',
    Taurus: 'Works on abundance, embodiment, and sensory wisdom',
    Gemini: 'Multiple books on varied topics to satisfy your curiosity',
    Cancer: 'Books on emotional intelligence and nurturing the soul',
    Leo: 'Inspiring biographies and works on authentic self-expression',
    Virgo: 'Practical wisdom and books on refinement and craft',
    Libra: 'Books on relationships, aesthetics, and balanced living',
    Scorpio: 'Deep psychological works and transformational literature',
    Sagittarius: 'Philosophy, travel memoirs, and wisdom traditions',
    Capricorn: 'Works on mastery, legacy, and sustainable success',
    Aquarius: 'Innovative thinking, future vision, and humanitarian topics',
    Pisces: 'Spiritual texts, poetry, and books on the creative process',
  }
  return books[sign] || 'Wisdom literature aligned with your path'
}

function getHiddenGift(sign: Sign): string {
  const gifts: Record<string, string> = {
    Aries: 'the gift of protective courage and the ability to initiate change when others cannot',
    Taurus: 'the gift of unwavering presence and the ability to create lasting value',
    Gemini: 'the gift of mental agility and the ability to see connections others miss',
    Cancer: 'the gift of emotional wisdom and the ability to create sanctuary for others',
    Leo: 'the gift of radiant authenticity and the ability to encourage others to shine',
    Virgo: 'the gift of discernment and the ability to improve and refine situations',
    Libra: 'the gift of harmony and the ability to bring balance to chaotic situations',
    Scorpio: 'the gift of depth and the ability to transform pain into wisdom',
    Sagittarius: 'the gift of faith and the ability to inspire hope in difficult times',
    Capricorn: 'the gift of endurance and the ability to build structures that last',
    Aquarius: 'the gift of vision and the ability to see possibilities others cannot imagine',
    Pisces: 'the gift of compassion and the ability to heal through unconditional presence',
  }
  return gifts[sign] || 'gifts waiting to be discovered'
}

function getDetailedMonthForecast(month: string, index: number, sun: Sign, moon: Sign, rising: Sign, sunData: typeof signData[Sign], year: number): string {
  const energies = ['initiating', 'stabilising', 'connecting', 'nurturing', 'expressing', 'refining', 'relating', 'transforming', 'expanding', 'achieving', 'innovating', 'transcending']
  const themes = ['new beginnings and fresh starts', 'building resources and stability', 'communication and learning', 'home, family, and emotional security', 'creativity, romance, and self-expression', 'health, work, and daily routines', 'partnerships and relationships', 'deep transformation and shared resources', 'adventure, learning, and expansion', 'career, reputation, and achievement', 'community, friendship, and future vision', 'spirituality, rest, and completion']
  const advice = ['take initiative on important projects', 'focus on what truly matters and build patiently', 'reach out, learn, and share your ideas', 'nurture your home life and emotional bonds', 'express yourself creatively and enjoy life', 'attend to health and optimize your routines', 'focus on important relationships', 'embrace change and release what no longer serves', 'expand your horizons through travel or learning', 'step into greater responsibility and visibility', 'connect with your community and envision the future', 'rest, reflect, and prepare for a new cycle']

  const energy = energies[index]
  const theme = themes[index]
  const monthAdvice = advice[index]

  return `**${month} ${year} Overview:**
${month} carries ${energy} energy for ${sun} individuals. The cosmic weather this month focuses on ${theme}, creating opportunities aligned with your natural ${sunData.element} nature.

**What ${month} Means for Your Sun Sign:**
As a ${sun}, you will feel this month's energy through your ${sunData.keywords[0]} lens. The planetary movements support you in ${monthAdvice}. Your ${sunData.strengths[0].toLowerCase()} will be an asset, while ${sunData.challenges[0].toLowerCase()} tendencies may be triggered - stay aware.

**Your Moon Sign This Month:**
With your ${moon} Moon, the emotional tone of ${month} will be coloured by ${signData[moon].keywords[0]} needs. You will feel most balanced when you honour your need for ${signData[moon].keywords.slice(0, 2).join(' and ')}. Full Moon energy around mid-month will be particularly significant for emotional processing.

**Your Rising Sign This Month:**
Your ${rising} Rising influences how you meet the world's energy. In ${month}, present yourself through your natural ${signData[rising].keywords[0]} qualities. First impressions and social situations flow best when you lean into your Rising sign strengths.

**Key Opportunities:**
• ${getMonthOpportunity(sun, index, 1)}
• ${getMonthOpportunity(sun, index, 2)}
• ${getMonthOpportunity(moon, index, 3)}

**Challenges to Navigate:**
• ${getMonthChallenge(sun, index)}
• Managing the tension between ${sunData.keywords[0]} needs and ${signData[moon].keywords[0]} emotions

**Best Days:**
The New Moon is ideal for setting intentions around ${theme}. Full Moon brings culmination of efforts. Days when the Moon transits fellow ${sunData.element} signs will feel most energising.

**Self-Care Focus:**
This month, prioritise ${sunData.element === 'Fire' ? 'physical activity and creative outlets' : sunData.element === 'Earth' ? 'grounding practices and sensory pleasure' : sunData.element === 'Air' ? 'mental stimulation and social connection' : 'emotional processing and time near water'}.`
}

function getMonthOpportunity(sign: Sign, monthIndex: number, oppIndex: number): string {
  const opportunities = [
    ['Starting bold new projects', 'Taking leadership positions', 'Expressing your authentic self'],
    ['Building financial security', 'Deepening valuable relationships', 'Creating lasting structures'],
    ['Expanding your network', 'Learning new skills', 'Sharing your ideas'],
    ['Strengthening family bonds', 'Creating emotional security', 'Nurturing important relationships'],
    ['Creative self-expression', 'Romance and pleasure', 'Stepping into the spotlight'],
    ['Improving health habits', 'Organizing your life', 'Being of service'],
    ['Partnership opportunities', 'Collaborative ventures', 'Finding balance'],
    ['Deep transformation', 'Financial partnerships', 'Psychological insights'],
    ['Travel and adventure', 'Educational pursuits', 'Philosophical growth'],
    ['Career advancement', 'Public recognition', 'Stepping into authority'],
    ['Community involvement', 'Future planning', 'Innovative projects'],
    ['Spiritual development', 'Rest and healing', 'Creative inspiration'],
  ]
  return opportunities[monthIndex]?.[oppIndex - 1] || 'Growth opportunities'
}

function getMonthChallenge(sign: Sign, monthIndex: number): string {
  const challenges = [
    'Impulsiveness and rushing ahead without planning',
    'Resistance to necessary changes',
    'Scattered focus and overcommitment',
    'Moodiness and emotional sensitivity',
    'Ego conflicts and need for recognition',
    'Perfectionism and self-criticism',
    'Indecision and people-pleasing',
    'Control issues and power struggles',
    'Overextending and impractical plans',
    'Work-life imbalance and pressure',
    'Emotional detachment and rebelliousness',
    'Escapism and boundary confusion',
  ]
  return challenges[monthIndex] || 'Navigating challenges with awareness'
}

function getQuarterFocus(sun: Sign, moon: Sign, quarter: number): string {
  const focuses = [
    `initiating new ${signData[sun].keywords[0]}-aligned projects and setting the tone for the year`,
    `building on first quarter momentum and deepening ${signData[moon].keywords[0]} connections`,
    `harvesting results of your efforts and adjusting course where needed`,
    `completing the year's work and preparing for the next cycle of growth`,
  ]
  return focuses[quarter - 1] || 'growth and evolution'
}

function getQuarterAction(sun: Sign, quarter: number): string {
  const actions = [
    'setting clear intentions and taking bold first steps',
    'nurturing relationships and enjoying the fruits of spring energy',
    'reviewing progress, releasing what does not work, and celebrating wins',
    'tying up loose ends, expressing gratitude, and visioning for the year ahead',
  ]
  return actions[quarter - 1] || 'meaningful action'
}

function getTopPriority(sun: Sign, moon: Sign, index: number): string {
  const sunPriorities: Record<string, string[]> = {
    Aries: ['Take bold action on something you have been postponing', 'Lead a project or initiative', 'Address conflict directly rather than avoiding it', 'Channel your competitive energy productively', 'Start a new physical fitness practice'],
    Taurus: ['Build financial security through consistent action', 'Create beauty and comfort in your environment', 'Develop a valuable skill or resource', 'Strengthen your most important relationships', 'Connect regularly with nature'],
    Gemini: ['Learn something that excites you deeply', 'Write, teach, or share your ideas publicly', 'Improve your communication in relationships', 'Explore new places or experiences', 'Stay curious and ask more questions'],
    Cancer: ['Strengthen your home and family foundations', 'Set healthier emotional boundaries', 'Express your nurturing nature in sustainable ways', 'Build financial security for peace of mind', 'Trust your intuition more fully'],
    Leo: ['Create something that expresses your authentic self', 'Step into leadership with confidence', 'Receive recognition for your contributions', 'Nurture your inner child through play', 'Share your warmth more generously'],
    Virgo: ['Establish routines that support your wellbeing', 'Offer your skills in service to others', 'Release perfectionism and embrace progress', 'Organize an area of your life that feels chaotic', 'Accept help and delegate where possible'],
    Libra: ['Bring balance to an imbalanced relationship', 'Create more beauty in your daily life', 'Make decisions more quickly and trust them', 'Address conflict rather than avoiding it', 'Partner on a meaningful project'],
    Scorpio: ['Transform a pattern that no longer serves you', 'Deepen intimacy in an important relationship', 'Release old resentments or grievances', 'Trust others more and control less', 'Use your intensity for positive creation'],
    Sagittarius: ['Expand your horizons through travel or learning', 'Share your wisdom and optimism with others', 'Follow through on commitments fully', 'Ground your visions in practical action', 'Cultivate faith during uncertain times'],
    Capricorn: ['Build something of lasting value', 'Take on greater responsibility in your career', 'Balance work with rest and play', 'Express emotions more freely', 'Celebrate your achievements along the way'],
    Aquarius: ['Contribute to a cause larger than yourself', 'Innovate in your field or community', 'Deepen personal emotional connections', 'Ground your visions in practical reality', 'Embrace your uniqueness fully'],
    Pisces: ['Express your creativity in tangible form', 'Set and maintain healthy boundaries', 'Trust your intuition and act on it', 'Balance spiritual life with practical needs', 'Heal old emotional wounds'],
  }
  return sunPriorities[sun]?.[index - 1] || 'Focus on meaningful growth'
}

function getPowerDates(sun: Sign, moon: Sign, year: number): string {
  const element = signData[sun].element
  return `**Your Solar Return:** When the Sun returns to your exact birth position, marking your personal new year
**New Moon in ${sun}:** Powerful time for setting intentions aligned with your core nature
**Full Moon in ${sun}:** Culmination of ${sun} themes - great for completion and celebration
**Power Months:** ${element === 'Fire' ? 'March, July, November' : element === 'Earth' ? 'April, August, December' : element === 'Air' ? 'January, May, September' : 'February, June, October'} when the Sun energises fellow ${element} signs`
}

// ============================================
// MONTHLY FORECAST GENERATOR
// ============================================

export function generateMonthlyForecastV2(
  chart: NatalChart,
  userName: string
): GeneratedReportV2 {
  const sun = getPlacement(chart, 'sun')
  const moon = getPlacement(chart, 'moon')
  const mercury = getPlacement(chart, 'mercury')
  const venus = getPlacement(chart, 'venus')
  const mars = getPlacement(chart, 'mars')
  const jupiter = getPlacement(chart, 'jupiter')
  const saturn = getPlacement(chart, 'saturn')

  const sunSign = capitalizeSign(sun?.sign || 'Aries')
  const moonSign = capitalizeSign(moon?.sign || 'Cancer')
  const risingSign = capitalizeSign(chart.ascendant?.sign || 'Aries')
  const mercurySign = capitalizeSign(mercury?.sign || 'Aries')
  const venusSign = capitalizeSign(venus?.sign || 'Libra')
  const marsSign = capitalizeSign(mars?.sign || 'Aries')

  const sunData = signData[sunSign]
  const moonData = signData[moonSign]
  const venusData = signData[venusSign]
  const marsData = signData[marsSign]

  const elements = calculateElementBalance(chart)
  const modalities = calculateModalityBalance(chart)
  const dominantElement = getDominantElement(elements)

  const now = new Date()
  const currentMonth = now.toLocaleString('en-GB', { month: 'long' })
  const currentYear = now.getFullYear()
  const daysInMonth = new Date(currentYear, now.getMonth() + 1, 0).getDate()

  // Get moon phases for the month
  const moonPhases = getMonthMoonPhases(now.getMonth(), currentYear)

  // Generate daily energy ratings
  const dailyEnergies = generateDailyEnergies(sunSign, moonSign, daysInMonth)

  const sections: ReportSectionV2[] = [
    {
      id: 'overview',
      title: `Your ${currentMonth} ${currentYear} Overview`,
      icon: '🌟',
      subsections: [
        {
          title: 'Welcome to Your Monthly Cosmic Guide',
          content: `${userName}, welcome to your personalised astrological forecast for ${currentMonth} ${currentYear}. This comprehensive guide is specifically calculated for YOUR birth chart, not a generic horoscope that applies to millions of people. The planetary transits this month form unique relationships with your natal planets, creating a cosmic landscape that is entirely your own.

This month brings a distinctive blend of energies that will particularly affect you as a ${sunSign} Sun with ${moonSign} Moon and ${risingSign} Rising. The interplay between the current planetary positions and your birth chart reveals specific windows of opportunity, times requiring extra care, and areas where growth is especially supported.

**Your Astrological Profile:**
As we navigate ${currentMonth} together, keep in mind your core cosmic makeup:

• **Sun in ${sunSign}:** Your fundamental identity operates through ${sunData.keywords.slice(0, 3).join(', ')} energy. This month's transits will interact with this core essence, sometimes amplifying your natural strengths, sometimes challenging you to grow beyond comfortable patterns.

• **Moon in ${moonSign}:** Your emotional needs centre around ${moonData.keywords.slice(0, 3).join(', ')} experiences. The lunar phases this month will particularly activate your emotional landscape, with the ${moonPhases.newMoon.sign} New Moon and ${moonPhases.fullMoon.sign} Full Moon offering distinct emotional turning points.

• **Rising in ${risingSign}:** The world meets your ${signData[risingSign].keywords[0]} exterior first. How you navigate social situations and new experiences this month will be coloured by transits to your Ascendant.

**What Makes This Month Unique for You:**
${currentMonth} ${currentYear} offers ${sunSign} natives a particularly ${getMonthQuality(sunSign, now.getMonth())} period. The cosmic weather supports ${getMonthSupport(sunSign, moonSign, now.getMonth())} while asking you to be mindful of ${getMonthCaution(sunSign, now.getMonth())}. Your ${dominantElement} elemental dominance means you'll feel the month's energies most strongly through ${dominantElement === 'Fire' ? 'action, passion, and creative drive' : dominantElement === 'Earth' ? 'practical matters, finances, and physical wellbeing' : dominantElement === 'Air' ? 'communication, ideas, and social connections' : 'emotional experiences, intuition, and relationships'}.`,
          terms: [
            { term: 'Transit', definition: 'When a current planet\'s position forms an angle (aspect) to a planet in your birth chart, activating that area of your life.' },
            { term: 'Natal Chart', definition: 'Your birth chart - the map of the sky at your exact moment of birth, showing where all the planets were positioned.' },
          ],
          tip: 'Bookmark this report and refer back to it weekly. The guidance becomes more valuable when you track how the cosmic weather actually plays out in your life.',
        },
        {
          title: 'The Cosmic Weather This Month',
          content: `**Major Planetary Movements in ${currentMonth}:**

The celestial bodies are in constant motion, and this month brings several significant shifts that will affect your chart directly:

${getDetailedTransits(sunSign, moonSign, risingSign, now.getMonth(), currentYear)}

**How These Transits Affect YOUR Chart:**

With your ${sunSign} Sun, you'll feel ${getSunTransitEffect(sunSign, now.getMonth())}. Your ${moonSign} Moon means the emotional undercurrents will be ${getMoonTransitEffect(moonSign, now.getMonth())}. Meanwhile, your ${risingSign} Rising suggests that socially and professionally, you'll experience ${getRisingTransitEffect(risingSign, now.getMonth())}.

**The Month's Elemental Balance:**

${currentMonth} carries a ${getMonthElementalEnergy(now.getMonth())} elemental signature. For you, with your ${dominantElement}-dominant chart, this means ${getElementalInteraction(dominantElement, now.getMonth())}.

**Mercury's Influence This Month:**
${getMercuryMonthlyInfluence(mercurySign, now.getMonth(), currentYear)}

**Venus's Influence This Month:**
${getVenusMonthlyInfluence(venusSign, now.getMonth(), currentYear)}

**Mars's Influence This Month:**
${getMarsMonthlyInfluence(marsSign, now.getMonth(), currentYear)}`,
          visual: {
            type: 'element-balance',
            title: 'Your Elemental Energy This Month',
            data: elements,
          },
        },
        {
          title: 'Your Energy Forecast at a Glance',
          content: `**Monthly Energy Overview:**

${userName}, here's your personalised energy map for ${currentMonth}. This shows how the cosmic weather interacts specifically with your chart:

**Overall Energy Level:** ${getOverallMonthEnergy(sunSign, now.getMonth())}/10
**Best Days:** ${getBestDaysOfMonth(sunSign, moonSign, daysInMonth).join(', ')}
**Challenging Days:** ${getChallengingDaysOfMonth(sunSign, moonSign, daysInMonth).join(', ')}
**Power Day:** ${getPowerDayOfMonth(sunSign, now.getMonth(), daysInMonth)}

**Weekly Energy Pattern:**
• Week 1 (Days 1-7): ${getWeeklyEnergyRating(sunSign, 1, now.getMonth())}/10 - ${getWeeklyEnergyDescription(sunSign, moonSign, 1, now.getMonth())}
• Week 2 (Days 8-14): ${getWeeklyEnergyRating(sunSign, 2, now.getMonth())}/10 - ${getWeeklyEnergyDescription(sunSign, moonSign, 2, now.getMonth())}
• Week 3 (Days 15-21): ${getWeeklyEnergyRating(sunSign, 3, now.getMonth())}/10 - ${getWeeklyEnergyDescription(sunSign, moonSign, 3, now.getMonth())}
• Week 4 (Days 22-${daysInMonth}): ${getWeeklyEnergyRating(sunSign, 4, now.getMonth())}/10 - ${getWeeklyEnergyDescription(sunSign, moonSign, 4, now.getMonth())}

**Daily Energy Highlights:**
${getDailyEnergyHighlights(sunSign, moonSign, dailyEnergies, daysInMonth)}`,
          visual: {
            type: 'planetary-strength',
            title: 'Daily Energy Chart',
            data: dailyEnergies,
          },
        },
      ],
    },
    {
      id: 'week1',
      title: 'Week 1: Foundation & Intention',
      icon: '🌱',
      subsections: [
        {
          title: 'Week 1 Overview (Days 1-7)',
          content: `**The Energy of Week One:**

The first week of ${currentMonth} sets the tone for everything that follows. For you as a ${sunSign}, this opening period brings ${getWeek1Energy(sunSign, moonSign, now.getMonth())}.

**Day-by-Day Breakdown:**

${getWeek1DailyBreakdown(sunSign, moonSign, venusSign, marsSign, now.getMonth(), currentYear)}

**Your Focus This Week:**

With your ${sunData.modality} ${sunData.element} nature, Week 1 asks you to ${getWeek1Focus(sunSign, sunData)}. Your ${moonSign} Moon will be particularly activated around ${getWeek1MoonActivation(moonSign, now.getMonth())}, so pay attention to emotional signals during this time.

**Key Themes:**
• ${getWeek1Theme1(sunSign, moonSign)}
• ${getWeek1Theme2(sunSign, venusSign)}
• ${getWeek1Theme3(sunSign, marsSign)}

**Advice for the Week:**
${getWeek1Advice(sunSign, moonSign, sunData, moonData)}`,
          tip: 'The first week of any month is ideal for setting intentions. Write down 3 specific goals for ${currentMonth} and review them weekly.',
        },
        {
          title: 'Week 1 - Love & Relationships',
          content: `**Romantic Energy This Week:**

${getWeek1RomanticEnergy(sunSign, venusSign, moonSign, now.getMonth())}

**For Singles:**
${getWeek1SinglesAdvice(sunSign, venusSign, now.getMonth())}

**For Those in Relationships:**
${getWeek1CouplesAdvice(sunSign, venusSign, moonSign, now.getMonth())}

**Best Days for Romance:** ${getWeek1RomanceDays(venusSign, now.getMonth())}

**Communication in Relationships:**
With your Mercury in ${mercurySign}, your communication style this week will be ${getWeek1CommunicationStyle(mercurySign, now.getMonth())}. Be mindful of ${getWeek1CommunicationCaution(mercurySign)}.`,
        },
        {
          title: 'Week 1 - Career & Finances',
          content: `**Professional Energy This Week:**

${getWeek1CareerEnergy(sunSign, marsSign, now.getMonth())}

**Key Career Opportunities:**
${getWeek1CareerOpportunities(sunSign, sunData, now.getMonth())}

**Financial Outlook:**
${getWeek1FinancialOutlook(sunSign, venusSign, now.getMonth())}

**Best Days for Career Moves:** ${getWeek1CareerDays(marsSign, now.getMonth())}
**Best Days for Financial Decisions:** ${getWeek1FinanceDays(venusSign, now.getMonth())}

**Networking & Professional Relationships:**
Your ${risingSign} Rising projects ${signData[risingSign].keywords[0]} energy in professional settings. This week, leverage this by ${getWeek1NetworkingAdvice(risingSign)}.`,
        },
      ],
    },
    {
      id: 'week2',
      title: 'Week 2: Building Momentum',
      icon: '🚀',
      subsections: [
        {
          title: 'Week 2 Overview (Days 8-14)',
          content: `**The Energy of Week Two:**

Week 2 of ${currentMonth} typically brings increased momentum as you've established your rhythm. For ${sunSign}, this period offers ${getWeek2Energy(sunSign, moonSign, now.getMonth())}.

**Day-by-Day Breakdown:**

${getWeek2DailyBreakdown(sunSign, moonSign, venusSign, marsSign, now.getMonth(), currentYear)}

**Your Focus This Week:**

The cosmic energy shifts to favour ${getWeek2Focus(sunSign, sunData)}. With your ${moonData.element} Moon element, you'll find emotional sustenance through ${getWeek2EmotionalFocus(moonSign, moonData)}.

**Key Themes:**
• ${getWeek2Theme1(sunSign, moonSign)}
• ${getWeek2Theme2(sunSign, venusSign)}
• ${getWeek2Theme3(sunSign, marsSign)}

**Special Planetary Alignments:**
${getWeek2SpecialAlignments(sunSign, moonSign, now.getMonth(), currentYear)}

**Advice for the Week:**
${getWeek2Advice(sunSign, moonSign, sunData, moonData)}`,
        },
        {
          title: 'Week 2 - Love & Relationships',
          content: `**Romantic Energy This Week:**

${getWeek2RomanticEnergy(sunSign, venusSign, moonSign, now.getMonth())}

**Venus Influence:**
Venus in its current position particularly affects your ${venusSign} natal Venus, creating ${getWeek2VenusInfluence(venusSign, now.getMonth())}. This is a powerful time for ${getWeek2VenusPower(venusSign)}.

**For Singles:**
${getWeek2SinglesAdvice(sunSign, venusSign, now.getMonth())}

**For Those in Relationships:**
${getWeek2CouplesAdvice(sunSign, venusSign, moonSign, now.getMonth())}

**Best Days for Romance:** ${getWeek2RomanceDays(venusSign, now.getMonth())}

**Intimacy & Connection:**
With Mars in your ${marsSign} natal position being activated, ${getWeek2IntimacyAdvice(marsSign, venusSign)}.`,
        },
        {
          title: 'Week 2 - Career & Finances',
          content: `**Professional Energy This Week:**

${getWeek2CareerEnergy(sunSign, marsSign, now.getMonth())}

**Key Career Opportunities:**
${getWeek2CareerOpportunities(sunSign, sunData, now.getMonth())}

**Mars Drive:**
Your Mars in ${marsSign} is ${getWeek2MarsInfluence(marsSign, now.getMonth())}, giving you ${getWeek2MarsPower(marsSign)} energy in professional pursuits.

**Financial Outlook:**
${getWeek2FinancialOutlook(sunSign, venusSign, now.getMonth())}

**Best Days for Career Moves:** ${getWeek2CareerDays(marsSign, now.getMonth())}
**Best Days for Financial Decisions:** ${getWeek2FinanceDays(venusSign, now.getMonth())}

**Projects & Initiatives:**
This is the optimal week to ${getWeek2ProjectAdvice(sunSign, marsSign)}.`,
        },
      ],
    },
    {
      id: 'week3',
      title: 'Week 3: Peak & Culmination',
      icon: '⭐',
      subsections: [
        {
          title: 'Week 3 Overview (Days 15-21)',
          content: `**The Energy of Week Three:**

Week 3 often represents the peak of monthly energy - things come to a head, reach completion, or demand decisive action. For ${sunSign}, this period brings ${getWeek3Energy(sunSign, moonSign, now.getMonth())}.

**The Full Moon Effect:**
The Full Moon in ${moonPhases.fullMoon.sign} on the ${moonPhases.fullMoon.day}${getOrdinalSuffix(moonPhases.fullMoon.day)} illuminates your ${getFullMoonHouseTheme(sunSign, moonPhases.fullMoon.sign)}. This lunar peak will particularly highlight ${getFullMoonPersonalEffect(sunSign, moonSign, moonPhases.fullMoon.sign)}.

**Day-by-Day Breakdown:**

${getWeek3DailyBreakdown(sunSign, moonSign, venusSign, marsSign, now.getMonth(), currentYear, moonPhases)}

**Your Focus This Week:**

${getWeek3Focus(sunSign, sunData, moonPhases.fullMoon.sign)}

**Key Themes:**
• ${getWeek3Theme1(sunSign, moonSign, moonPhases.fullMoon.sign)}
• ${getWeek3Theme2(sunSign, venusSign)}
• ${getWeek3Theme3(sunSign, marsSign)}

**Advice for the Week:**
${getWeek3Advice(sunSign, moonSign, sunData, moonData, moonPhases.fullMoon.sign)}`,
          tip: 'Full Moons are times of culmination. What was planted at the New Moon often reaches a turning point now. Practice release rituals if something needs to end.',
        },
        {
          title: 'Week 3 - Love & Relationships',
          content: `**Romantic Energy This Week:**

The Full Moon in ${moonPhases.fullMoon.sign} intensifies all relationship dynamics. For your ${venusSign} Venus nature, this means ${getWeek3RomanticEnergy(sunSign, venusSign, moonSign, moonPhases.fullMoon.sign)}.

**Full Moon Relationship Effects:**
Full Moons often bring relationship revelations. With your ${moonSign} Moon, you may experience ${getWeek3MoonRelationshipEffect(moonSign, moonPhases.fullMoon.sign)}. This is a powerful time for ${getWeek3RelationshipPower(sunSign, moonSign, moonPhases.fullMoon.sign)}.

**For Singles:**
${getWeek3SinglesAdvice(sunSign, venusSign, moonPhases.fullMoon.sign)}

**For Those in Relationships:**
${getWeek3CouplesAdvice(sunSign, venusSign, moonSign, moonPhases.fullMoon.sign)}

**Best Days for Romance:** ${getWeek3RomanceDays(venusSign, now.getMonth())}

**Emotional Intensity:**
Be prepared for heightened emotions around the Full Moon. Your ${moonSign} Moon processes through ${moonData.element} energy, so ${getWeek3EmotionalAdvice(moonSign, moonData)}.`,
        },
        {
          title: 'Week 3 - Career & Finances',
          content: `**Professional Energy This Week:**

${getWeek3CareerEnergy(sunSign, marsSign, moonPhases.fullMoon.sign)}

**Full Moon Career Effects:**
The Full Moon in ${moonPhases.fullMoon.sign} may bring ${getWeek3FullMoonCareerEffect(sunSign, moonPhases.fullMoon.sign)}. Projects initiated earlier in the month may ${getWeek3ProjectStatus(sunSign)}.

**Key Career Opportunities:**
${getWeek3CareerOpportunities(sunSign, sunData, moonPhases.fullMoon.sign)}

**Financial Outlook:**
${getWeek3FinancialOutlook(sunSign, venusSign, moonPhases.fullMoon.sign)}

**Best Days for Career Moves:** ${getWeek3CareerDays(marsSign, now.getMonth())}
**Best Days for Financial Decisions:** ${getWeek3FinanceDays(venusSign, now.getMonth())}

**Visibility & Recognition:**
Full Moons illuminate. Your professional efforts may be more visible now. Use your ${sunSign} ${sunData.strengths[0].toLowerCase()} to ${getWeek3VisibilityAdvice(sunSign, sunData)}.`,
        },
      ],
    },
    {
      id: 'week4',
      title: 'Week 4: Integration & Preparation',
      icon: '🌙',
      subsections: [
        {
          title: 'Week 4 Overview (Days 22-${daysInMonth})',
          content: `**The Energy of Week Four:**

The final week of ${currentMonth} is a time for integration, reflection, and preparation for the month ahead. For ${sunSign}, this closing period brings ${getWeek4Energy(sunSign, moonSign, now.getMonth())}.

**The Waning Moon Phase:**
As the Moon wanes after the Full Moon, energy naturally turns inward. Your ${moonSign} Moon will feel this shift as ${getWaningMoonEffect(moonSign, moonData)}.

**Day-by-Day Breakdown:**

${getWeek4DailyBreakdown(sunSign, moonSign, venusSign, marsSign, now.getMonth(), currentYear, daysInMonth)}

**Your Focus This Week:**

${getWeek4Focus(sunSign, sunData)}

**Key Themes:**
• ${getWeek4Theme1(sunSign, moonSign)}
• ${getWeek4Theme2(sunSign, venusSign)}
• ${getWeek4Theme3(sunSign, marsSign)}

**Preparing for Next Month:**
${getNextMonthPreparation(sunSign, moonSign, now.getMonth())}

**Advice for the Week:**
${getWeek4Advice(sunSign, moonSign, sunData, moonData)}`,
        },
        {
          title: 'Week 4 - Love & Relationships',
          content: `**Romantic Energy This Week:**

${getWeek4RomanticEnergy(sunSign, venusSign, moonSign, now.getMonth())}

**Relationship Reflection:**
The waning Moon phase supports relationship review. Consider ${getWeek4RelationshipReflection(sunSign, venusSign, moonSign)}.

**For Singles:**
${getWeek4SinglesAdvice(sunSign, venusSign, now.getMonth())}

**For Those in Relationships:**
${getWeek4CouplesAdvice(sunSign, venusSign, moonSign, now.getMonth())}

**Best Days for Romance:** ${getWeek4RomanceDays(venusSign, now.getMonth())}

**Deepening Bonds:**
The reflective energy of Week 4 is perfect for ${getWeek4BondingAdvice(moonSign, venusSign)}.`,
        },
        {
          title: 'Week 4 - Career & Finances',
          content: `**Professional Energy This Week:**

${getWeek4CareerEnergy(sunSign, marsSign, now.getMonth())}

**Month-End Review:**
Take stock of what you've accomplished this month. Your ${sunSign} nature has likely made progress on ${getWeek4AccomplishmentReview(sunSign, sunData)}.

**Key Career Focus:**
${getWeek4CareerFocus(sunSign, sunData, now.getMonth())}

**Financial Outlook:**
${getWeek4FinancialOutlook(sunSign, venusSign, now.getMonth())}

**Planning Ahead:**
Use this week's reflective energy to plan next month's career moves. As a ${sunSign}, you'll benefit from ${getWeek4PlanningAdvice(sunSign, sunData)}.

**Best Days for Career Moves:** ${getWeek4CareerDays(marsSign, now.getMonth())}
**Best Days for Financial Decisions:** ${getWeek4FinanceDays(venusSign, now.getMonth())}`,
        },
      ],
    },
    {
      id: 'moon-phases',
      title: 'Moon Phase Guide',
      icon: '🌗',
      subsections: [
        {
          title: 'Understanding This Month\'s Lunar Cycle',
          content: `**The Moon\'s Journey Through ${currentMonth}:**

The Moon moves through the zodiac approximately every 2.5 days, changing the emotional backdrop of our lives. For your ${moonSign} Moon, this lunar dance is particularly significant.

**New Moon in ${moonPhases.newMoon.sign} (${moonPhases.newMoon.day}${getOrdinalSuffix(moonPhases.newMoon.day)}):**

${getNewMoonDetailedGuidance(sunSign, moonSign, moonPhases.newMoon.sign)}

**Intentions to Set:**
With your ${sunSign} Sun and ${moonSign} Moon, the ideal New Moon intentions involve:
${getNewMoonIntentions(sunSign, moonSign, moonPhases.newMoon.sign)}

**New Moon Ritual for ${sunSign}:**
${getNewMoonRitual(sunSign, moonSign, moonPhases.newMoon.sign)}

**Full Moon in ${moonPhases.fullMoon.sign} (${moonPhases.fullMoon.day}${getOrdinalSuffix(moonPhases.fullMoon.day)}):**

${getFullMoonDetailedGuidance(sunSign, moonSign, moonPhases.fullMoon.sign)}

**What May Culminate:**
${getFullMoonCulmination(sunSign, moonSign, moonPhases.fullMoon.sign)}

**Full Moon Release Ritual for ${sunSign}:**
${getFullMoonRitual(sunSign, moonSign, moonPhases.fullMoon.sign)}`,
          terms: [
            { term: 'New Moon', definition: 'When the Moon is between Earth and Sun, invisible from Earth. A time for new beginnings and setting intentions.' },
            { term: 'Full Moon', definition: 'When Earth is between Moon and Sun, fully illuminating the Moon. A time of culmination, revelation, and release.' },
          ],
        },
        {
          title: 'Moon Through the Signs This Month',
          content: `**Daily Lunar Energies:**

As the Moon travels through each zodiac sign, it colours our emotional experience. Here's how each lunar transit affects your ${moonSign} Moon this month:

${getMoonThroughSignsGuidance(moonSign, moonData)}

**Best Moon Signs for Your Activities:**

• **For important decisions:** Moon in ${getBestMoonSignForDecisions(sunSign, moonSign)}
• **For starting projects:** Moon in ${getBestMoonSignForProjects(sunSign, marsSign)}
• **For romance:** Moon in ${getBestMoonSignForRomance(venusSign, moonSign)}
• **For rest and self-care:** Moon in ${getBestMoonSignForRest(moonSign)}
• **For socialising:** Moon in ${getBestMoonSignForSocial(sunSign, risingSign)}
• **For financial matters:** Moon in ${getBestMoonSignForFinance(sunSign, venusSign)}`,
          tip: 'Track how you feel when the Moon is in your natal Moon sign (${moonSign}). This is your monthly emotional reset point.',
        },
      ],
    },
    {
      id: 'love',
      title: 'Love & Relationships This Month',
      icon: '💕',
      subsections: [
        {
          title: 'Your Romantic Forecast',
          content: `**Love Energy in ${currentMonth}:**

${userName}, your romantic life this month is shaped by the dance between your natal Venus in ${venusSign} and the transiting planets. Here's your comprehensive love forecast:

**Overall Romantic Energy:** ${getOverallRomanticEnergy(venusSign, now.getMonth())}/10

**Your Love Language This Month:**
With Venus in ${venusSign}, you naturally express and receive love through ${venusData.keywords.slice(0, 2).join(' and ')}. This month, ${getVenusMonthlyLoveLanguage(venusSign, now.getMonth())}.

**What You're Attracted To:**
The cosmic weather heightens your attraction to ${getMonthlyAttractionPattern(venusSign, sunSign, now.getMonth())}. Your ${moonSign} Moon adds an emotional layer, drawing you toward partners who ${getMoonAttractionPattern(moonSign, moonData)}.

**Best Days for Romance:**
${getBestRomanceDaysDetailed(venusSign, moonSign, now.getMonth(), daysInMonth)}

**Days Requiring Care:**
${getRomanceCautionDays(venusSign, marsSign, now.getMonth(), daysInMonth)}

**Venus Retrograde Check:**
${getVenusRetrogradeStatus(now.getMonth(), currentYear)}`,
        },
        {
          title: 'Guidance for Singles',
          content: `**Your Single Life This Month:**

${currentMonth} offers ${sunSign} singles ${getSinglesMonthlyOutlook(sunSign, venusSign, now.getMonth())}.

**Where to Meet People:**
Your ${risingSign} Rising attracts through ${signData[risingSign].keywords[0]} energy. This month, consider ${getSinglesVenueAdvice(risingSign, venusSign, now.getMonth())}.

**Your Dating Superpower This Month:**
${getSinglesSuperpower(sunSign, venusSign, now.getMonth())}

**What to Watch For:**
${getSinglesWatchOut(sunSign, venusSign, moonSign, now.getMonth())}

**Week-by-Week Singles Guide:**
• **Week 1:** ${getSinglesWeekGuide(sunSign, venusSign, 1, now.getMonth())}
• **Week 2:** ${getSinglesWeekGuide(sunSign, venusSign, 2, now.getMonth())}
• **Week 3:** ${getSinglesWeekGuide(sunSign, venusSign, 3, now.getMonth())}
• **Week 4:** ${getSinglesWeekGuide(sunSign, venusSign, 4, now.getMonth())}

**Self-Love Focus:**
${getSelfLoveAdvice(sunSign, moonSign, venusSign)}`,
        },
        {
          title: 'Guidance for Couples',
          content: `**Your Relationship This Month:**

For ${sunSign} in committed relationships, ${currentMonth} brings ${getCouplesMonthlyOutlook(sunSign, venusSign, moonSign, now.getMonth())}.

**Communication Forecast:**
With Mercury in ${mercurySign}, your communication style is ${signData[mercurySign].keywords[0]}. This month, ${getCouplesCommunicationAdvice(mercurySign, now.getMonth())}.

**Intimacy & Connection:**
Your Mars in ${marsSign} drives physical expression through ${marsData.keywords.slice(0, 2).join(' and ')}. The cosmic weather supports ${getCouplesIntimacyAdvice(marsSign, venusSign, now.getMonth())}.

**Potential Friction Points:**
${getCouplesFrictionPoints(sunSign, moonSign, venusSign, now.getMonth())}

**How to Navigate Challenges:**
${getCouplesNavigationAdvice(sunSign, moonSign, now.getMonth())}

**Date Night Ideas for ${sunSign}:**
${getDateNightIdeas(sunSign, venusSign, now.getMonth())}

**Week-by-Week Couples Guide:**
• **Week 1:** ${getCouplesWeekGuide(sunSign, venusSign, moonSign, 1, now.getMonth())}
• **Week 2:** ${getCouplesWeekGuide(sunSign, venusSign, moonSign, 2, now.getMonth())}
• **Week 3:** ${getCouplesWeekGuide(sunSign, venusSign, moonSign, 3, now.getMonth())}
• **Week 4:** ${getCouplesWeekGuide(sunSign, venusSign, moonSign, 4, now.getMonth())}`,
        },
      ],
    },
    {
      id: 'career',
      title: 'Career & Finances This Month',
      icon: '💼',
      subsections: [
        {
          title: 'Your Professional Forecast',
          content: `**Career Energy in ${currentMonth}:**

${userName}, your professional life this month is influenced by the interplay between your natal Mars in ${marsSign} (your drive), Saturn's position (your discipline), and the transiting planets. Here's your comprehensive career forecast:

**Overall Career Energy:** ${getOverallCareerEnergy(marsSign, sunSign, now.getMonth())}/10

**Your Professional Strengths This Month:**
As a ${sunSign} (${sunData.archetype}), you naturally bring ${sunData.strengths.slice(0, 2).join(' and ')} to your work. This month, ${getMonthlyCareerStrengths(sunSign, sunData, now.getMonth())}.

**Areas for Professional Growth:**
${getMonthlyCareerGrowth(sunSign, sunData, now.getMonth())}

**Best Days for Career Moves:**
${getBestCareerDaysDetailed(marsSign, sunSign, now.getMonth(), daysInMonth)}

**Days Requiring Caution:**
${getCareerCautionDays(marsSign, mercurySign, now.getMonth(), daysInMonth)}

**Mercury Retrograde Career Check:**
${getMercuryRetrogradeCareerStatus(mercurySign, now.getMonth(), currentYear)}`,
        },
        {
          title: 'Financial Forecast',
          content: `**Money Energy This Month:**

Your financial life is influenced by your Venus in ${venusSign} (what you value and attract) and the 2nd/8th house transits. Here's what to expect:

**Overall Financial Energy:** ${getOverallFinancialEnergy(venusSign, sunSign, now.getMonth())}/10

**Income Potential:**
${getIncomeOutlook(sunSign, venusSign, now.getMonth())}

**Spending Tendencies:**
With your ${venusSign} Venus, you're naturally drawn to spend on ${getSpendingTendencies(venusSign)}. This month, ${getMonthlySpendingAdvice(venusSign, now.getMonth())}.

**Investment & Saving:**
${getInvestmentAdvice(sunSign, venusSign, now.getMonth())}

**Best Days for Financial Decisions:**
${getBestFinanceDaysDetailed(venusSign, now.getMonth(), daysInMonth)}

**Week-by-Week Financial Guide:**
• **Week 1:** ${getFinanceWeekGuide(sunSign, venusSign, 1, now.getMonth())}
• **Week 2:** ${getFinanceWeekGuide(sunSign, venusSign, 2, now.getMonth())}
• **Week 3:** ${getFinanceWeekGuide(sunSign, venusSign, 3, now.getMonth())}
• **Week 4:** ${getFinanceWeekGuide(sunSign, venusSign, 4, now.getMonth())}`,
        },
        {
          title: 'Projects & Goals',
          content: `**Professional Projects This Month:**

Your ${sunSign} nature excels at ${sunData.strengths[0].toLowerCase()}. Here's how to channel that energy into your ${currentMonth} projects:

**Ideal Projects to Start:**
${getIdealProjectsToStart(sunSign, marsSign, now.getMonth())}

**Projects to Complete:**
${getProjectsToComplete(sunSign, now.getMonth())}

**Projects to Put on Hold:**
${getProjectsToPause(sunSign, mercurySign, now.getMonth())}

**Your Productivity Style This Month:**
${getProductivityStyle(sunSign, marsSign, now.getMonth())}

**Collaboration Forecast:**
${getCollaborationForecast(sunSign, risingSign, now.getMonth())}

**Networking Opportunities:**
${getNetworkingOpportunities(sunSign, risingSign, now.getMonth())}`,
        },
      ],
    },
    {
      id: 'health',
      title: 'Health & Wellness This Month',
      icon: '💪',
      subsections: [
        {
          title: 'Your Vitality Forecast',
          content: `**Physical Energy in ${currentMonth}:**

${userName}, your physical vitality is influenced by your Sun sign element (${sunData.element}), Mars position (${marsSign}), and the current cosmic weather. Here's your wellness guide:

**Overall Energy Level:** ${getOverallHealthEnergy(sunSign, marsSign, now.getMonth())}/10

**Your Body's Needs This Month:**
As a ${sunData.element} sign, you thrive when ${getElementWellness(sunData.element)}. This month specifically calls for ${getMonthlyWellnessNeed(sunSign, sunData, now.getMonth())}.

**Exercise Recommendations:**
${getExerciseRecommendations(sunSign, marsSign, now.getMonth())}

**Energy Peaks & Dips:**
${getEnergyPeaksDips(sunSign, now.getMonth())}

**Watch Points:**
${sunSign} can be vulnerable to ${getHealthWatchPoints(sunSign, sunData)}. Pay extra attention to ${getMonthlyHealthAttention(sunSign, now.getMonth())}.

**Best Days for:**
• **Starting new fitness routines:** ${getBestDaysForFitness(marsSign, now.getMonth())}
• **Rest and recovery:** ${getBestDaysForRest(moonSign, now.getMonth())}
• **Health appointments:** ${getBestDaysForHealth(now.getMonth())}`,
        },
        {
          title: 'Emotional & Mental Wellness',
          content: `**Emotional Health This Month:**

Your ${moonSign} Moon processes emotions through ${moonData.element} energy. This month's emotional weather brings ${getEmotionalWeather(moonSign, moonData, now.getMonth())}.

**Mental Energy:**
${getMentalEnergyForecast(mercurySign, now.getMonth())}

**Stress Management:**
When stressed, your ${sunSign} Sun may resort to ${sunData.shadowSide.split(',')[0].toLowerCase()}. Counter this by ${getStressManagement(sunSign, moonSign)}.

**Self-Care Practices for ${sunSign}:**
${getSelfCarePractices(sunSign, moonSign, now.getMonth())}

**Emotional Triggers This Month:**
Be aware of ${getEmotionalTriggers(moonSign, now.getMonth())}. Your ${moonSign} Moon can navigate these by ${getMoonNavigationAdvice(moonSign, moonData)}.

**Mindfulness Focus:**
${getMindfulnessFocus(sunSign, moonSign, now.getMonth())}`,
        },
        {
          title: 'Sleep & Rest',
          content: `**Sleep Forecast:**

Your ${moonSign} Moon significantly influences your sleep patterns. This month, ${getSleepForecast(moonSign, now.getMonth())}.

**Optimal Sleep Practices:**
${getOptimalSleepPractices(moonSign, moonData)}

**Dream Activity:**
With the Moon phases this month, expect ${getDreamForecast(moonSign, moonPhases)}.

**Rest & Recovery:**
The waning Moon phase (after the ${moonPhases.fullMoon.day}${getOrdinalSuffix(moonPhases.fullMoon.day)}) is ideal for ${getRestRecoveryAdvice(sunSign, moonSign)}.

**Energy Management Tips:**
${getEnergyManagementTips(sunSign, marsSign, moonSign)}`,
        },
      ],
    },
    {
      id: 'growth',
      title: 'Personal Growth This Month',
      icon: '🌱',
      subsections: [
        {
          title: 'Your Growth Journey',
          content: `**Personal Evolution in ${currentMonth}:**

${userName}, every month offers unique opportunities for growth. As a ${sunSign}, your ongoing life lesson is ${sunData.lifeLesson.toLowerCase()}. Here's how ${currentMonth} supports your evolution:

**This Month's Growth Theme:**
${getMonthlyGrowthTheme(sunSign, moonSign, now.getMonth())}

**Shadow Work Opportunity:**
Your ${sunSign} shadow includes ${sunData.shadowSide.split(',')[0].toLowerCase()}. This month provides an opportunity to ${getShadowWorkOpportunity(sunSign, sunData, now.getMonth())}.

**Strengths to Develop:**
${getStrengthsDevelopment(sunSign, sunData, now.getMonth())}

**Growth Challenges:**
${getGrowthChallenges(sunSign, moonSign, now.getMonth())}

**Affirmations for ${sunSign} This Month:**
${getMonthlyAffirmations(sunSign, sunData, now.getMonth())}`,
          tip: 'Growth happens in small moments. Notice when you respond differently than you would have a month ago - that\'s progress.',
        },
        {
          title: 'Spiritual & Intuitive Development',
          content: `**Spiritual Energy This Month:**

Your ${moonSign} Moon connects you to intuitive wisdom through ${moonData.element} energy. This month's cosmic weather supports ${getSpiritualSupport(moonSign, moonData, now.getMonth())}.

**Intuition Forecast:**
${getIntuitionForecast(moonSign, now.getMonth())}

**Meditation & Contemplation:**
${getMeditationGuidance(sunSign, moonSign, now.getMonth())}

**Journaling Prompts for ${currentMonth}:**
${getJournalingPrompts(sunSign, moonSign, now.getMonth())}

**Books/Topics to Explore:**
Based on your ${sunSign} growth edge, consider exploring ${getGrowthTopics(sunSign, moonSign)}.

**Practices for ${sunData.element} Signs:**
${getElementalPractices(sunSign, sunData)}`,
        },
      ],
    },
    {
      id: 'summary',
      title: 'Your ${currentMonth} Summary',
      icon: '✨',
      subsections: [
        {
          title: 'Key Takeaways',
          content: `**${userName}, Your ${currentMonth} at a Glance:**

As we close this comprehensive guide to your ${currentMonth} ${currentYear}, here are the essential insights to carry with you:

**Your Power Days:** ${getBestDaysOfMonth(sunSign, moonSign, daysInMonth).slice(0, 3).join(', ')}
**Your Caution Days:** ${getChallengingDaysOfMonth(sunSign, moonSign, daysInMonth).slice(0, 2).join(', ')}
**Your Theme:** ${getMonthlyGrowthTheme(sunSign, moonSign, now.getMonth()).split('.')[0]}

**The Big Picture:**
${currentMonth} asks ${sunSign} to embrace ${getMonthlyBigPicture(sunSign, moonSign, now.getMonth())}. With your ${moonSign} Moon guiding your emotional journey and ${risingSign} Rising shaping your interactions, you're equipped to ${getMonthlyEquipment(sunSign, moonSign, risingSign)}.

**Final Wisdom:**
${getFinalWisdom(sunSign, moonSign, now.getMonth())}

**Remember:**
The stars incline; they do not compel. This forecast illuminates the cosmic weather, but you always have the power to choose how you navigate it. Your ${sunSign} ${sunData.giftToWorld.split(',')[0].toLowerCase()} is needed in the world - let ${currentMonth} be a month where you share it fully.`,
          tip: 'Revisit this report at the start of each week to remind yourself of the themes and energies ahead.',
        },
        {
          title: 'Quick Reference Calendar',
          content: `**${currentMonth} ${currentYear} Key Dates for ${sunSign}:**

**Moon Phases:**
• New Moon: ${moonPhases.newMoon.day}${getOrdinalSuffix(moonPhases.newMoon.day)} in ${moonPhases.newMoon.sign} - ${getNewMoonQuickRef(sunSign, moonPhases.newMoon.sign)}
• Full Moon: ${moonPhases.fullMoon.day}${getOrdinalSuffix(moonPhases.fullMoon.day)} in ${moonPhases.fullMoon.sign} - ${getFullMoonQuickRef(sunSign, moonPhases.fullMoon.sign)}

**Best Days by Activity:**
• **Career:** ${getBestDaysOfMonth(sunSign, moonSign, daysInMonth).slice(0, 3).join(', ')}
• **Romance:** ${getBestRomanceDaysSimple(venusSign, daysInMonth)}
• **Finance:** ${getBestFinanceDaysSimple(venusSign, daysInMonth)}
• **Health:** ${getBestHealthDaysSimple(marsSign, daysInMonth)}
• **Rest:** ${getBestRestDaysSimple(moonSign, daysInMonth)}

**Mercury Status:** ${getMercuryStatusSimple(now.getMonth(), currentYear)}

**Your Mantra for ${currentMonth}:**
"${getMonthlyMantra(sunSign, moonSign, now.getMonth())}"

May this month bring you growth, joy, and alignment with your highest path.`,
        },
      ],
    },
  ]

  // Calculate word count
  let wordCount = 0
  sections.forEach(section => {
    section.subsections.forEach(subsection => {
      wordCount += subsection.content.split(/\s+/).length
    })
  })

  // Collect all glossary terms
  const allTerms: ReportTerm[] = []
  sections.forEach(section => {
    section.subsections.forEach(subsection => {
      if (subsection.terms) {
        allTerms.push(...subsection.terms)
      }
    })
  })

  return {
    id: `monthly-forecast-${Date.now()}`,
    slug: 'monthly-forecast',
    title: `${currentMonth} ${currentYear} Forecast for ${userName}`,
    generatedAt: new Date().toISOString(),
    userName,
    birthData: {
      date: '',
      place: '',
      sunSign,
      moonSign,
      risingSign,
    },
    summary: {
      headline: `${sunSign} Sun | ${moonSign} Moon | ${risingSign} Rising`,
      overview: `Your personalized guide to ${currentMonth} ${currentYear}`,
      keyStrengths: [
        `Power Days: ${getBestDaysOfMonth(sunSign, moonSign, daysInMonth).slice(0, 2).join(', ')}`,
        `Best for Romance: ${getBestRomanceDaysSimple(venusSign, daysInMonth)}`,
      ],
      growthAreas: [
        `Growth Focus: ${getMonthlyGrowthTheme(sunSign, moonSign, now.getMonth()).split('.')[0]}`,
      ],
    },
    visuals: [
      { type: 'chart-wheel', title: 'Your Birth Chart', data: { sun: sunSign, moon: moonSign, rising: risingSign } },
      { type: 'element-balance', title: 'Your Elemental Balance', data: elements },
      { type: 'planetary-strength', title: 'Daily Energy Forecast', data: dailyEnergies },
    ],
    sections,
    glossary: allTerms,
    wordCount,
  }
}

// ============================================
// MONTHLY FORECAST HELPER FUNCTIONS
// ============================================

function getMonthMoonPhases(month: number, year: number): { newMoon: { day: number; sign: Sign }; fullMoon: { day: number; sign: Sign } } {
  // Simplified moon phase calculation - in production would use astronomical data
  const moonPhaseData: Record<number, { newMoon: { day: number; sign: Sign }; fullMoon: { day: number; sign: Sign } }> = {
    0: { newMoon: { day: 13, sign: 'Capricorn' }, fullMoon: { day: 28, sign: 'Cancer' } },
    1: { newMoon: { day: 11, sign: 'Aquarius' }, fullMoon: { day: 26, sign: 'Leo' } },
    2: { newMoon: { day: 13, sign: 'Pisces' }, fullMoon: { day: 28, sign: 'Virgo' } },
    3: { newMoon: { day: 11, sign: 'Aries' }, fullMoon: { day: 26, sign: 'Libra' } },
    4: { newMoon: { day: 11, sign: 'Taurus' }, fullMoon: { day: 26, sign: 'Scorpio' } },
    5: { newMoon: { day: 9, sign: 'Gemini' }, fullMoon: { day: 24, sign: 'Sagittarius' } },
    6: { newMoon: { day: 9, sign: 'Cancer' }, fullMoon: { day: 24, sign: 'Capricorn' } },
    7: { newMoon: { day: 7, sign: 'Leo' }, fullMoon: { day: 22, sign: 'Aquarius' } },
    8: { newMoon: { day: 6, sign: 'Virgo' }, fullMoon: { day: 21, sign: 'Pisces' } },
    9: { newMoon: { day: 5, sign: 'Libra' }, fullMoon: { day: 20, sign: 'Aries' } },
    10: { newMoon: { day: 4, sign: 'Scorpio' }, fullMoon: { day: 19, sign: 'Taurus' } },
    11: { newMoon: { day: 3, sign: 'Sagittarius' }, fullMoon: { day: 18, sign: 'Gemini' } },
  }
  return moonPhaseData[month] || moonPhaseData[0]
}

function generateDailyEnergies(sun: Sign, moon: Sign, days: number): Record<string, number> {
  const energies: Record<string, number> = {}
  const baseEnergy = signData[sun].element === 'Fire' ? 7 : signData[sun].element === 'Air' ? 6 : 5
  for (let i = 1; i <= days; i++) {
    const variance = Math.sin(i * 0.5) * 2 + Math.cos(i * 0.3) * 1.5
    energies[`day${i}`] = Math.max(3, Math.min(10, Math.round(baseEnergy + variance)))
  }
  return energies
}

function getOrdinalSuffix(day: number): string {
  if (day > 3 && day < 21) return 'th'
  switch (day % 10) {
    case 1: return 'st'
    case 2: return 'nd'
    case 3: return 'rd'
    default: return 'th'
  }
}

function getMonthQuality(sun: Sign, month: number): string {
  const qualities = ['transformative', 'expansive', 'dynamic', 'nurturing', 'creative', 'analytical', 'harmonious', 'intense', 'adventurous', 'ambitious', 'innovative', 'reflective']
  return qualities[month]
}

function getMonthSupport(sun: Sign, moon: Sign, month: number): string {
  return `${signData[sun].strengths[0].toLowerCase()} and ${signData[moon].strengths[0].toLowerCase()}`
}

function getMonthCaution(sun: Sign, month: number): string {
  return signData[sun].challenges[0].toLowerCase()
}

function getDetailedTransits(sun: Sign, moon: Sign, rising: Sign, month: number, year: number): string {
  return `**Sun Transit:** The Sun moves through ${['Capricorn/Aquarius', 'Aquarius/Pisces', 'Pisces/Aries', 'Aries/Taurus', 'Taurus/Gemini', 'Gemini/Cancer', 'Cancer/Leo', 'Leo/Virgo', 'Virgo/Libra', 'Libra/Scorpio', 'Scorpio/Sagittarius', 'Sagittarius/Capricorn'][month]}, illuminating themes of ${['structure and innovation', 'dreams and new beginnings', 'intuition and action', 'initiative and stability', 'security and communication', 'communication and emotion', 'emotion and creativity', 'creativity and service', 'service and partnership', 'partnership and transformation', 'transformation and expansion', 'expansion and achievement'][month]}.

**Venus Transit:** Venus's position this month emphasises ${['committed relationships', 'unconventional love', 'compassionate connection', 'passionate pursuit', 'sensual pleasure', 'intellectual attraction', 'emotional bonding', 'romantic expression', 'practical love', 'balanced partnership', 'deep intimacy', 'adventurous romance'][month]}.

**Mars Transit:** Mars fuels your ${['disciplined ambition', 'innovative action', 'intuitive drive', 'pioneering spirit', 'determined effort', 'versatile energy', 'protective action', 'confident initiative', 'precise execution', 'strategic moves', 'transformative power', 'expansive drive'][month]} this month.`
}

function getSunTransitEffect(sun: Sign, month: number): string {
  return `the cosmic spotlight on ${['your ambitions', 'your individuality', 'your dreams', 'your identity', 'your values', 'your communication', 'your home life', 'your creativity', 'your routines', 'your relationships', 'your transformation', 'your expansion'][month]}`
}

function getMoonTransitEffect(moon: Sign, month: number): string {
  return `particularly ${['grounding', 'liberating', 'intuitive', 'assertive', 'stabilising', 'stimulating', 'nurturing', 'expressive', 'refining', 'balancing', 'deepening', 'expanding'][month]}`
}

function getRisingTransitEffect(rising: Sign, month: number): string {
  return `${['increased responsibility', 'fresh perspectives', 'heightened sensitivity', 'new beginnings', 'material focus', 'busy communications', 'domestic changes', 'creative opportunities', 'health awareness', 'partnership dynamics', 'deep encounters', 'broadening horizons'][month]}`
}

function getMonthElementalEnergy(month: number): string {
  const elements = ['Earth/Air', 'Air/Water', 'Water/Fire', 'Fire/Earth', 'Earth/Air', 'Air/Water', 'Water/Fire', 'Fire/Earth', 'Earth/Air', 'Air/Water', 'Water/Fire', 'Fire/Earth']
  return elements[month]
}

function getElementalInteraction(dominant: string, month: number): string {
  return `you'll find natural flow when the month's energy aligns with your ${dominant} nature, and growth opportunities when it challenges you`
}

function getMercuryMonthlyInfluence(mercury: Sign, month: number, year: number): string {
  return `Mercury's position affects your ${signData[mercury].element}-style thinking this month. Communication flows best when you honour your ${signData[mercury].keywords[0]} nature. Be mindful of ${signData[mercury].challenges[0].toLowerCase()} in conversations.`
}

function getVenusMonthlyInfluence(venus: Sign, month: number, year: number): string {
  return `Venus activates your ${signData[venus].keywords[0]} love nature. Relationships benefit from your natural ${signData[venus].strengths[0].toLowerCase()}. Watch for ${signData[venus].challenges[0].toLowerCase()} in romantic matters.`
}

function getMarsMonthlyInfluence(mars: Sign, month: number, year: number): string {
  return `Mars energises your ${signData[mars].keywords[0]} drive. Take action with ${signData[mars].strengths[0].toLowerCase()} while being aware of ${signData[mars].challenges[0].toLowerCase()} tendencies.`
}

function getOverallMonthEnergy(sun: Sign, month: number): number {
  const base = signData[sun].element === 'Fire' ? 7 : signData[sun].element === 'Air' ? 6 : signData[sun].element === 'Earth' ? 6 : 5
  const variance = ((month + 1) % 3)
  return Math.min(10, base + variance)
}

function getBestDaysOfMonth(sun: Sign, moon: Sign, days: number): string[] {
  const element = signData[sun].element
  const baseDays = element === 'Fire' ? [3, 11, 19, 27] : element === 'Earth' ? [4, 12, 20, 28] : element === 'Air' ? [5, 13, 21, 29] : [2, 10, 18, 26]
  return baseDays.filter(d => d <= days).map(d => d.toString())
}

function getChallengingDaysOfMonth(sun: Sign, moon: Sign, days: number): string[] {
  const element = signData[sun].element
  const baseDays = element === 'Fire' ? [7, 14, 21] : element === 'Earth' ? [8, 15, 22] : element === 'Air' ? [9, 16, 23] : [6, 13, 20]
  return baseDays.filter(d => d <= days).map(d => d.toString())
}

function getPowerDayOfMonth(sun: Sign, month: number, days: number): string {
  const day = ((month + 1) * 3) % days + 1
  return `${day}${getOrdinalSuffix(day)}`
}

function getWeeklyEnergyRating(sun: Sign, week: number, month: number): number {
  const base = signData[sun].element === 'Fire' ? 7 : 6
  const weekBonus = [0, 1, 2, -1][week - 1]
  return Math.min(10, Math.max(4, base + weekBonus + (month % 2)))
}

function getWeeklyEnergyDescription(sun: Sign, moon: Sign, week: number, month: number): string {
  const descriptions = [
    `Setting foundations with ${signData[sun].keywords[0]} intention`,
    `Building momentum through ${signData[sun].strengths[0].toLowerCase()}`,
    `Peak energy for ${signData[moon].keywords[0]} experiences`,
    `Integration and ${signData[sun].keywords[1]} reflection`,
  ]
  return descriptions[week - 1]
}

function getDailyEnergyHighlights(sun: Sign, moon: Sign, energies: Record<string, number>, days: number): string {
  const highDays: number[] = []
  const lowDays: number[] = []
  for (let i = 1; i <= days; i++) {
    if (energies[`day${i}`] >= 8) highDays.push(i)
    if (energies[`day${i}`] <= 4) lowDays.push(i)
  }
  return `**High Energy Days:** ${highDays.slice(0, 5).join(', ') || 'Varies by week'}\n**Lower Energy Days:** ${lowDays.slice(0, 3).join(', ') || 'Generally stable'}`
}

// Week 1 Helpers
function getWeek1Energy(sun: Sign, moon: Sign, month: number): string {
  return `fresh ${signData[sun].element} energy for new beginnings, supported by your ${signData[moon].keywords[0]} emotional intuition`
}

function getWeek1DailyBreakdown(sun: Sign, moon: Sign, venus: Sign, mars: Sign, month: number, year: number): string {
  return `**Day 1:** Fresh start energy - set intentions aligned with your ${sun} nature
**Day 2:** Building momentum - ${signData[sun].keywords[1]} qualities emerge
**Day 3:** Social energy peaks - your ${signData[venus].keywords[0]} Venus shines
**Day 4:** Action-oriented - ${signData[mars].element} Mars energy supports initiative
**Day 5:** Creative flow - express your ${signData[sun].archetype} nature
**Day 6:** Relationship focus - connect with ${signData[moon].keywords[0]} depth
**Day 7:** Rest and reflect - honour your ${signData[moon].element} Moon's needs`
}

function getWeek1Focus(sun: Sign, data: typeof signData[Sign]): string {
  return `channel your ${data.keywords[0]} nature into concrete intentions for the month`
}

function getWeek1MoonActivation(moon: Sign, month: number): string {
  return `the ${(month + 3) % 7 + 1}${getOrdinalSuffix((month + 3) % 7 + 1)}-${(month + 5) % 7 + 1}${getOrdinalSuffix((month + 5) % 7 + 1)}`
}

function getWeek1Theme1(sun: Sign, moon: Sign): string {
  return `Establishing ${signData[sun].keywords[0]} foundations`
}

function getWeek1Theme2(sun: Sign, venus: Sign): string {
  return `Opening to ${signData[venus].keywords[0]} connections`
}

function getWeek1Theme3(sun: Sign, mars: Sign): string {
  return `Taking ${signData[mars].keywords[0]} action`
}

function getWeek1Advice(sun: Sign, moon: Sign, sunData: typeof signData[Sign], moonData: typeof signData[Sign]): string {
  return `Begin the month by honouring both your ${sunData.archetype} identity and your ${moonData.keywords[0]} emotional needs. Set 2-3 clear intentions that align with your ${sunData.strengths[0].toLowerCase()}. Don't rush - your ${moonData.element} Moon needs time to attune to the month's energy.`
}

// Continue with all remaining helper functions (abbreviated for length - in full implementation, each returns substantial content)

function getWeek1RomanticEnergy(sun: Sign, venus: Sign, moon: Sign, month: number): string {
  return `The opening week brings ${signData[venus].keywords[0]} romantic energy. Your ${venus} Venus naturally attracts through ${signData[venus].strengths[0].toLowerCase()}, while your ${moon} Moon seeks ${signData[moon].keywords[0]} emotional connection. This combination creates an atmosphere of ${signData[venus].element === signData[moon].element ? 'natural flow' : 'interesting tension'} in love matters.`
}

function getWeek1SinglesAdvice(sun: Sign, venus: Sign, month: number): string {
  return `Put yourself in environments that honour your ${signData[venus].keywords[0]} Venus nature. Your natural ${signData[venus].strengths[0].toLowerCase()} is particularly magnetic this week. Avoid ${signData[venus].challenges[0].toLowerCase()} patterns that might sabotage connections.`
}

function getWeek1CouplesAdvice(sun: Sign, venus: Sign, moon: Sign, month: number): string {
  return `Focus on ${signData[venus].keywords[0]} expressions of love. Your partner responds well when you show your ${signData[moon].keywords[0]} emotional side. Plan activities that honour both your ${signData[sun].element} Sun's need for ${signData[sun].keywords[0]} experiences and your partner's preferences.`
}

function getWeek1RomanceDays(venus: Sign, month: number): string {
  return `${(month + 2) % 7 + 1}${getOrdinalSuffix((month + 2) % 7 + 1)}, ${(month + 5) % 7 + 1}${getOrdinalSuffix((month + 5) % 7 + 1)}`
}

function getWeek1CommunicationStyle(mercury: Sign, month: number): string {
  return `${signData[mercury].keywords[0]} and ${signData[mercury].keywords[1]}`
}

function getWeek1CommunicationCaution(mercury: Sign): string {
  return signData[mercury].challenges[0].toLowerCase()
}

function getWeek1CareerEnergy(sun: Sign, mars: Sign, month: number): string {
  return `Week 1 career energy is ${signData[mars].keywords[0]}, fueled by your ${mars} Mars. Take ${signData[mars].modality.toLowerCase()} approaches to new projects and lead with your ${signData[sun].strengths[0].toLowerCase()}.`
}

function getWeek1CareerOpportunities(sun: Sign, sunData: typeof signData[Sign], month: number): string {
  return `Your ${sunData.archetype} nature excels at ${sunData.strengths.slice(0, 2).join(' and ')}. Look for opportunities that let you demonstrate these qualities. The cosmic energy supports ${sunData.keywords[0]} initiatives.`
}

function getWeek1FinancialOutlook(sun: Sign, venus: Sign, month: number): string {
  return `Financial energy is ${signData[venus].modality.toLowerCase()} this week. Your ${venus} Venus influences spending toward ${signData[venus].keywords[0]} items. Practice ${signData[sun].element === 'Earth' ? 'your natural prudence' : 'conscious awareness'} with larger purchases.`
}

function getWeek1CareerDays(mars: Sign, month: number): string {
  return `${(month + 1) % 7 + 1}${getOrdinalSuffix((month + 1) % 7 + 1)}, ${(month + 4) % 7 + 1}${getOrdinalSuffix((month + 4) % 7 + 1)}`
}

function getWeek1FinanceDays(venus: Sign, month: number): string {
  return `${(month + 3) % 7 + 1}${getOrdinalSuffix((month + 3) % 7 + 1)}`
}

function getWeek1NetworkingAdvice(rising: Sign): string {
  return `leading with your ${signData[rising].strengths[0].toLowerCase()} while being mindful of ${signData[rising].challenges[0].toLowerCase()}`
}

// Week 2 Helpers (abbreviated - full implementations follow same pattern)
function getWeek2Energy(sun: Sign, moon: Sign, month: number): string {
  return `increasing momentum and ${signData[sun].keywords[1]} expression as you build on Week 1's foundations`
}

function getWeek2DailyBreakdown(sun: Sign, moon: Sign, venus: Sign, mars: Sign, month: number, year: number): string {
  return `**Day 8:** Momentum builds - ${signData[mars].keywords[0]} energy supports action
**Day 9:** Social opportunities - your ${signData[venus].archetype} shines
**Day 10:** Deep focus day - honour your ${signData[moon].element} Moon's depth
**Day 11:** Creative expression - ${signData[sun].keywords[1]} energy flows
**Day 12:** Partnership focus - collaborate with ${signData[venus].keywords[0]} energy
**Day 13:** Practical progress - ${signData[sun].element} grounding helps
**Day 14:** Integration day - process the week's experiences`
}

function getWeek2Focus(sun: Sign, sunData: typeof signData[Sign]): string {
  return `${sunData.keywords[1]} expression and building on established foundations`
}

function getWeek2EmotionalFocus(moon: Sign, moonData: typeof signData[Sign]): string {
  return `${moonData.keywords[0]} activities and ${moonData.element.toLowerCase()} element experiences`
}

function getWeek2Theme1(sun: Sign, moon: Sign): string { return `Building ${signData[sun].keywords[1]} momentum` }
function getWeek2Theme2(sun: Sign, venus: Sign): string { return `Deepening ${signData[venus].keywords[0]} connections` }
function getWeek2Theme3(sun: Sign, mars: Sign): string { return `Sustaining ${signData[mars].keywords[0]} drive` }
function getWeek2SpecialAlignments(sun: Sign, moon: Sign, month: number, year: number): string {
  return `Mid-month alignments support ${signData[sun].element}-style progress. Your ${moon} Moon harmonises with these energies around day 10-12.`
}
function getWeek2Advice(sun: Sign, moon: Sign, sunData: typeof signData[Sign], moonData: typeof signData[Sign]): string {
  return `Capitalise on the momentum you've built. Your ${sunData.strengths[1].toLowerCase()} serves you well now. Let your ${moonData.keywords[0]} emotional intelligence guide decisions.`
}
function getWeek2RomanticEnergy(sun: Sign, venus: Sign, moon: Sign, month: number): string {
  return `Romance deepens as Venus energy settles. Your ${venus} Venus nature seeks ${signData[venus].keywords[1]} expression. Emotional intimacy grows through ${signData[moon].keywords[0]} connection.`
}
function getWeek2VenusInfluence(venus: Sign, month: number): string { return `${signData[venus].keywords[0]} romantic opportunities` }
function getWeek2VenusPower(venus: Sign): string { return `${signData[venus].strengths[0].toLowerCase()} in love` }
function getWeek2SinglesAdvice(sun: Sign, venus: Sign, month: number): string {
  return `Build on connections from Week 1. Your ${venus} Venus is finding its rhythm. Be authentically ${signData[venus].keywords[0]} - this attracts compatible partners.`
}
function getWeek2CouplesAdvice(sun: Sign, venus: Sign, moon: Sign, month: number): string {
  return `Deepen your bond through ${signData[venus].keywords[0]} experiences. Your ${moon} Moon appreciates ${signData[moon].keywords[1]} emotional gestures from your partner.`
}
function getWeek2RomanceDays(venus: Sign, month: number): string { return `${(month + 9) % 7 + 8}${getOrdinalSuffix((month + 9) % 7 + 8)}, ${(month + 12) % 7 + 8}${getOrdinalSuffix((month + 12) % 7 + 8)}` }
function getWeek2IntimacyAdvice(mars: Sign, venus: Sign): string {
  return `combine your ${signData[mars].keywords[0]} Mars passion with your ${signData[venus].keywords[0]} Venus tenderness`
}
function getWeek2CareerEnergy(sun: Sign, mars: Sign, month: number): string {
  return `Career momentum builds with ${signData[mars].keywords[0]} Mars energy. Your ${sun} professional presence strengthens.`
}
function getWeek2CareerOpportunities(sun: Sign, sunData: typeof signData[Sign], month: number): string {
  return `Opportunities align with your ${sunData.strengths[1].toLowerCase()}. Projects benefit from your ${sunData.archetype} approach.`
}
function getWeek2MarsInfluence(mars: Sign, month: number): string { return `particularly activated` }
function getWeek2MarsPower(mars: Sign): string { return `${signData[mars].keywords[0]}` }
function getWeek2FinancialOutlook(sun: Sign, venus: Sign, month: number): string {
  return `Financial flow steadies. Your ${venus} Venus values guide smart decisions. Consider investments in ${signData[venus].keywords[0]} areas.`
}
function getWeek2CareerDays(mars: Sign, month: number): string { return `${(month + 8) % 7 + 8}${getOrdinalSuffix((month + 8) % 7 + 8)}, ${(month + 11) % 7 + 8}${getOrdinalSuffix((month + 11) % 7 + 8)}` }
function getWeek2FinanceDays(venus: Sign, month: number): string { return `${(month + 10) % 7 + 8}${getOrdinalSuffix((month + 10) % 7 + 8)}` }
function getWeek2ProjectAdvice(sun: Sign, mars: Sign): string {
  return `push forward on projects requiring ${signData[sun].keywords[0]} vision and ${signData[mars].keywords[0]} execution`
}

// Week 3 Helpers (Full Moon week)
function getWeek3Energy(sun: Sign, moon: Sign, month: number): string {
  return `peak intensity as the Full Moon illuminates your path, bringing ${signData[sun].keywords[0]} matters to culmination`
}
function getFullMoonHouseTheme(sun: Sign, fullMoonSign: Sign): string {
  return `${signData[fullMoonSign].keywords[0]} matters`
}
function getFullMoonPersonalEffect(sun: Sign, moon: Sign, fullMoonSign: Sign): string {
  return `themes of ${signData[fullMoonSign].keywords[0]} and ${signData[fullMoonSign].keywords[1]} in your ${signData[moon].element} emotional landscape`
}
function getWeek3DailyBreakdown(sun: Sign, moon: Sign, venus: Sign, mars: Sign, month: number, year: number, moonPhases: { fullMoon: { day: number; sign: Sign } }): string {
  return `**Day 15:** Energy intensifies - prepare for Full Moon peak
**Day 16:** Illumination builds - insights emerge
**Day 17:** Full Moon approaches - emotions heighten
**Day ${moonPhases.fullMoon.day}:** FULL MOON in ${moonPhases.fullMoon.sign} - culmination and release
**Day ${moonPhases.fullMoon.day + 1}:** Post-Full Moon - integration begins
**Day ${moonPhases.fullMoon.day + 2}:** Processing insights - honour your ${signData[moon].keywords[0]} needs
**Day 21:** Week closes - waning energy supports release`
}
function getWeek3Focus(sun: Sign, sunData: typeof signData[Sign], fullMoonSign: Sign): string {
  return `Allow the Full Moon in ${fullMoonSign} to reveal what needs attention. Your ${sunData.archetype} nature processes this through ${sunData.element.toLowerCase()} awareness.`
}
function getWeek3Theme1(sun: Sign, moon: Sign, fullMoonSign: Sign): string { return `Full Moon revelations in ${signData[fullMoonSign].keywords[0]} matters` }
function getWeek3Theme2(sun: Sign, venus: Sign): string { return `Relationship clarity and ${signData[venus].keywords[0]} truths` }
function getWeek3Theme3(sun: Sign, mars: Sign): string { return `Peak ${signData[mars].keywords[0]} energy and decisive action` }
function getWeek3Advice(sun: Sign, moon: Sign, sunData: typeof signData[Sign], moonData: typeof signData[Sign], fullMoonSign: Sign): string {
  return `The Full Moon in ${fullMoonSign} peaks your ${sunData.element} energy. Release what no longer serves your ${sunData.archetype} path. Your ${moonData.keywords[0]} Moon may feel extra sensitive - practise self-compassion.`
}
function getWeek3RomanticEnergy(sun: Sign, venus: Sign, moon: Sign, fullMoonSign: Sign): string {
  return `Full Moon intensity amplifies romantic feelings. Your ${venus} Venus nature experiences ${signData[venus].keywords[0]} emotions more powerfully. Relationship truths may surface.`
}
function getWeek3MoonRelationshipEffect(moon: Sign, fullMoonSign: Sign): string {
  return `heightened ${signData[moon].keywords[0]} emotional awareness and ${signData[fullMoonSign].keywords[0]} revelations`
}
function getWeek3RelationshipPower(sun: Sign, moon: Sign, fullMoonSign: Sign): string {
  return `honest conversations and ${signData[moon].element.toLowerCase()}-level emotional connection`
}
function getWeek3SinglesAdvice(sun: Sign, venus: Sign, fullMoonSign: Sign): string {
  return `The Full Moon illuminates what you truly want. Your ${venus} Venus may reveal ${signData[venus].keywords[0]} desires you hadn't fully acknowledged. Trust these insights.`
}
function getWeek3CouplesAdvice(sun: Sign, venus: Sign, moon: Sign, fullMoonSign: Sign): string {
  return `Major relationship insights are possible. Approach conversations with ${signData[moon].keywords[0]} emotional intelligence. What needs to be released? What needs celebrating?`
}
function getWeek3RomanceDays(venus: Sign, month: number): string { return `${(month + 15) % 7 + 15}${getOrdinalSuffix((month + 15) % 7 + 15)}, ${(month + 18) % 7 + 15}${getOrdinalSuffix((month + 18) % 7 + 15)}` }
function getWeek3EmotionalAdvice(moon: Sign, moonData: typeof signData[Sign]): string {
  return `give yourself ${moonData.element === 'Water' ? 'plenty of alone time to process' : moonData.element === 'Fire' ? 'outlets for emotional expression' : moonData.element === 'Earth' ? 'grounding activities' : 'space to discuss and analyze'}`
}
function getWeek3CareerEnergy(sun: Sign, mars: Sign, fullMoonSign: Sign): string {
  return `Peak career energy coincides with Full Moon visibility. Your ${mars} Mars drive is at maximum ${signData[mars].keywords[0]} power.`
}
function getWeek3FullMoonCareerEffect(sun: Sign, fullMoonSign: Sign): string {
  return `culmination of projects, recognition for efforts, or clarity about direction`
}
function getWeek3ProjectStatus(sun: Sign): string { return `reach completion or a significant milestone` }
function getWeek3CareerOpportunities(sun: Sign, sunData: typeof signData[Sign], fullMoonSign: Sign): string {
  return `Your ${sunData.strengths[0].toLowerCase()} is most visible now. Take credit for achievements. The Full Moon in ${fullMoonSign} supports ${signData[fullMoonSign].keywords[0]} career moves.`
}
function getWeek3FinancialOutlook(sun: Sign, venus: Sign, fullMoonSign: Sign): string {
  return `Financial matters may reach resolution. The Full Moon illuminates ${signData[fullMoonSign].keywords[0]} money patterns. Good time for ${signData[venus].keywords[0]} financial decisions.`
}
function getWeek3CareerDays(mars: Sign, month: number): string { return `${(month + 16) % 7 + 15}${getOrdinalSuffix((month + 16) % 7 + 15)}, ${(month + 19) % 7 + 15}${getOrdinalSuffix((month + 19) % 7 + 15)}` }
function getWeek3FinanceDays(venus: Sign, month: number): string { return `${(month + 17) % 7 + 15}${getOrdinalSuffix((month + 17) % 7 + 15)}` }
function getWeek3VisibilityAdvice(sun: Sign, sunData: typeof signData[Sign]): string {
  return `showcase your ${sunData.giftToWorld.split(',')[0].toLowerCase()}`
}

// Week 4 Helpers
function getWeek4Energy(sun: Sign, moon: Sign, month: number): string {
  return `winding down energy supporting integration of this month's lessons and preparation for the month ahead`
}
function getWaningMoonEffect(moon: Sign, moonData: typeof signData[Sign]): string {
  return `a natural pull toward ${moonData.keywords[0]} introspection and ${moonData.element.toLowerCase()} processing`
}
function getWeek4DailyBreakdown(sun: Sign, moon: Sign, venus: Sign, mars: Sign, month: number, year: number, days: number): string {
  return `**Day 22:** Waning energy - focus on completion
**Day 23:** Reflection day - review the month's progress
**Day 24:** Tie up loose ends - ${signData[mars].keywords[1]} follow-through
**Day 25:** Relationship appreciation - express ${signData[venus].keywords[0]} gratitude
**Day 26:** Self-care focus - honour your ${signData[moon].element} Moon
**Day 27:** Planning ahead - set intentions for next month
**Day ${days}:** Month closes - release and prepare`
}
function getWeek4Focus(sun: Sign, sunData: typeof signData[Sign]): string {
  return `Complete what can be completed, release what needs releasing, and prepare your ${sunData.archetype} self for a new cycle.`
}
function getWeek4Theme1(sun: Sign, moon: Sign): string { return `Integration of ${signData[sun].keywords[0]} growth` }
function getWeek4Theme2(sun: Sign, venus: Sign): string { return `${signData[venus].keywords[0]} relationship appreciation` }
function getWeek4Theme3(sun: Sign, mars: Sign): string { return `Sustainable ${signData[mars].keywords[1]} energy management` }
function getNextMonthPreparation(sun: Sign, moon: Sign, month: number): string {
  return `As this month closes, set intentions for next month that honour your ${signData[sun].archetype} nature and ${signData[moon].keywords[0]} emotional needs. What worked this month? What needs adjustment?`
}
function getWeek4Advice(sun: Sign, moon: Sign, sunData: typeof signData[Sign], moonData: typeof signData[Sign]): string {
  return `Allow the waning Moon to support release. Your ${sunData.archetype} self benefits from reflection. Your ${moonData.keywords[0]} Moon appreciates gentler pacing. Don't force new beginnings - that energy returns with the New Moon.`
}
function getWeek4RomanticEnergy(sun: Sign, venus: Sign, moon: Sign, month: number): string {
  return `Softer romantic energy supports deepening existing bonds. Your ${venus} Venus expresses through ${signData[venus].keywords[1]} gestures. Quality time over grand gestures.`
}
function getWeek4RelationshipReflection(sun: Sign, venus: Sign, moon: Sign): string {
  return `what the month revealed about your ${signData[venus].keywords[0]} needs and your ${signData[moon].keywords[0]} emotional patterns in love`
}
function getWeek4SinglesAdvice(sun: Sign, venus: Sign, month: number): string {
  return `Use this reflective energy to clarify what you want. Your ${venus} Venus has learned something this month - what is it? Prepare your ${signData[sun].archetype} self for fresh opportunities next month.`
}
function getWeek4CouplesAdvice(sun: Sign, venus: Sign, moon: Sign, month: number): string {
  return `Express appreciation for your partner. Your ${moon} Moon values ${signData[moon].keywords[0]} acknowledgment. Plan something nurturing together rather than adventurous.`
}
function getWeek4RomanceDays(venus: Sign, month: number): string { return `${(month + 23) % 7 + 22}${getOrdinalSuffix((month + 23) % 7 + 22)}, ${(month + 26) % 7 + 22}${getOrdinalSuffix((month + 26) % 7 + 22)}` }
function getWeek4BondingAdvice(moon: Sign, venus: Sign): string {
  return `${signData[moon].keywords[0]} conversations and ${signData[venus].keywords[0]} activities that don't require high energy`
}
function getWeek4CareerEnergy(sun: Sign, mars: Sign, month: number): string {
  return `Career energy winds down naturally. Focus on completing rather than starting. Your ${mars} Mars does well with ${signData[mars].keywords[1]} follow-through this week.`
}
function getWeek4AccomplishmentReview(sun: Sign, sunData: typeof signData[Sign]): string {
  return `areas aligned with your ${sunData.strengths[0].toLowerCase()} and ${sunData.strengths[1].toLowerCase()}`
}
function getWeek4CareerFocus(sun: Sign, sunData: typeof signData[Sign], month: number): string {
  return `Completion, documentation, and preparation. Your ${sunData.archetype} nature benefits from seeing what's been accomplished before rushing into new projects.`
}
function getWeek4FinancialOutlook(sun: Sign, venus: Sign, month: number): string {
  return `Financial energy stabilises. Good time for reviewing budgets and financial goals. Your ${venus} Venus appreciates ${signData[venus].keywords[0]} but conservative approaches.`
}
function getWeek4PlanningAdvice(sun: Sign, sunData: typeof signData[Sign]): string {
  return `strategic reflection that honours your ${sunData.keywords[0]} vision while grounding it in realistic steps`
}
function getWeek4CareerDays(mars: Sign, month: number): string { return `${(month + 24) % 7 + 22}${getOrdinalSuffix((month + 24) % 7 + 22)}` }
function getWeek4FinanceDays(venus: Sign, month: number): string { return `${(month + 25) % 7 + 22}${getOrdinalSuffix((month + 25) % 7 + 22)}` }

// Moon Phase Helpers
function getNewMoonDetailedGuidance(sun: Sign, moon: Sign, newMoonSign: Sign): string {
  return `The New Moon in ${newMoonSign} marks a powerful fresh start in ${signData[newMoonSign].keywords[0]} matters. For your ${sun} Sun, this lunar reset activates themes of ${signData[newMoonSign].keywords.slice(0, 2).join(' and ')}. Your ${moon} Moon will feel this as an invitation to ${signData[moon].element === signData[newMoonSign].element ? 'flow naturally with new emotional currents' : 'stretch into new emotional territory'}.

This is the ideal time to plant seeds for ${signData[newMoonSign].keywords[0]} goals. The dark Moon supports inner reflection before external action. What do you want to create in the coming lunar cycle? Let your ${signData[sun].archetype} vision guide your intentions.`
}
function getNewMoonIntentions(sun: Sign, moon: Sign, newMoonSign: Sign): string {
  return `• Intentions related to ${signData[newMoonSign].keywords[0]} and ${signData[newMoonSign].keywords[1]}
• Goals that express your ${signData[sun].keywords[0]} core nature
• Emotional growth in ${signData[moon].keywords[0]} areas
• ${signData[newMoonSign].archetype}-style beginnings`
}
function getNewMoonRitual(sun: Sign, moon: Sign, newMoonSign: Sign): string {
  return `Create sacred space that honours your ${signData[sun].element} Sun element (${signData[sun].element === 'Fire' ? 'candles, warmth' : signData[sun].element === 'Earth' ? 'crystals, plants' : signData[sun].element === 'Air' ? 'incense, open windows' : 'water, moonlight'}). Write 3 intentions for the coming cycle. Speak them aloud. Trust your ${signData[moon].keywords[0]} Moon to guide implementation.`
}
function getFullMoonDetailedGuidance(sun: Sign, moon: Sign, fullMoonSign: Sign): string {
  return `The Full Moon in ${fullMoonSign} brings illumination and culmination to ${signData[fullMoonSign].keywords[0]} matters. For your ${sun} Sun, this lunar peak reveals truths about ${signData[fullMoonSign].keywords.slice(0, 2).join(' and ')}. Your ${moon} Moon will experience ${signData[moon].element === signData[fullMoonSign].element ? 'intensified' : 'contrasting'} emotional energy.

This is not the time for starting - it's for seeing clearly, celebrating completion, and releasing what no longer serves. What has reached its peak? What needs to be let go? The Full Moon's light shows you what your ${signData[sun].archetype} self needs to acknowledge.`
}
function getFullMoonCulmination(sun: Sign, moon: Sign, fullMoonSign: Sign): string {
  return `Matters related to ${signData[fullMoonSign].keywords[0]} may reach a turning point. Projects begun at the last New Moon may complete. Relationship dynamics become clear. Your ${signData[sun].keywords[0]} path forward is illuminated.`
}
function getFullMoonRitual(sun: Sign, moon: Sign, fullMoonSign: Sign): string {
  return `Under the Full Moon, write down what you're releasing - habits, beliefs, situations that no longer serve your ${signData[sun].archetype} nature. Safely burn or tear up the paper. Thank the Full Moon in ${fullMoonSign} for the clarity. Let your ${signData[moon].keywords[0]} Moon release emotional weight.`
}
function getMoonThroughSignsGuidance(moon: Sign, moonData: typeof signData[Sign]): string {
  const signs: Sign[] = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces']
  return signs.map(sign => {
    const harmony = signData[sign].element === moonData.element ? 'harmonious' :
                   (signData[sign].element === 'Fire' && moonData.element === 'Air') ||
                   (signData[sign].element === 'Air' && moonData.element === 'Fire') ||
                   (signData[sign].element === 'Earth' && moonData.element === 'Water') ||
                   (signData[sign].element === 'Water' && moonData.element === 'Earth') ? 'supportive' : 'challenging but growth-oriented'
    return `**Moon in ${sign}:** ${harmony} for your ${moon} Moon - ${signData[sign].keywords[0]} emotional energy`
  }).join('\n')
}
function getBestMoonSignForDecisions(sun: Sign, moon: Sign): string { return `${moon} (your natal Moon), ${sun}, or earth signs for practical matters` }
function getBestMoonSignForProjects(sun: Sign, mars: Sign): string { return `${signData[mars].element} signs, especially ${mars}` }
function getBestMoonSignForRomance(venus: Sign, moon: Sign): string { return `${venus}, ${moon}, or ${signData[venus].element} signs` }
function getBestMoonSignForRest(moon: Sign): string { return `${moon} (your comfort zone), Cancer, or Pisces` }
function getBestMoonSignForSocial(sun: Sign, rising: Sign): string { return `${rising}, air signs, or ${sun}` }
function getBestMoonSignForFinance(sun: Sign, venus: Sign): string { return `Taurus, Capricorn, or ${venus}` }

// Love Section Helpers
function getOverallRomanticEnergy(venus: Sign, month: number): number {
  const base = signData[venus].element === 'Water' || signData[venus].element === 'Fire' ? 7 : 6
  return Math.min(10, base + (month % 3))
}
function getVenusMonthlyLoveLanguage(venus: Sign, month: number): string {
  return `this is heightened, making ${signData[venus].strengths[0].toLowerCase()} particularly important in your romantic expression`
}
function getMonthlyAttractionPattern(venus: Sign, sun: Sign, month: number): string {
  return `${signData[venus].keywords.slice(0, 2).join(', ')} qualities, especially those who complement your ${sun} Sun nature`
}
function getMoonAttractionPattern(moon: Sign, moonData: typeof signData[Sign]): string {
  return `can provide ${moonData.keywords.slice(0, 2).join(' and ')} emotional connection`
}
function getBestRomanceDaysDetailed(venus: Sign, moon: Sign, month: number, days: number): string {
  const venusDays = [(month + 3) % days + 1, (month + 11) % days + 1, (month + 19) % days + 1, (month + 25) % days + 1]
  return `**${venusDays[0]}${getOrdinalSuffix(venusDays[0])}:** Venus energy peaks - ideal for dates and declarations
**${venusDays[1]}${getOrdinalSuffix(venusDays[1])}:** Emotional connection deepens
**${venusDays[2]}${getOrdinalSuffix(venusDays[2])}:** Romantic opportunities arise
**${venusDays[3]}${getOrdinalSuffix(venusDays[3])}:** Appreciation and bonding`
}
function getRomanceCautionDays(venus: Sign, mars: Sign, month: number, days: number): string {
  const cautionDays = [(month + 7) % days + 1, (month + 14) % days + 1]
  return `**${cautionDays[0]}${getOrdinalSuffix(cautionDays[0])} & ${cautionDays[1]}${getOrdinalSuffix(cautionDays[1])}:** Potential friction - be mindful of ${signData[venus].challenges[0].toLowerCase()} patterns`
}
function getVenusRetrogradeStatus(month: number, year: number): string {
  return `Venus is direct this month, supporting healthy relationship progress and clear romantic perception.`
}
function getSinglesMonthlyOutlook(sun: Sign, venus: Sign, month: number): string {
  return `good opportunities for ${signData[venus].keywords[0]} connections, especially when you lead with your ${signData[sun].archetype} authenticity`
}
function getSinglesVenueAdvice(rising: Sign, venus: Sign, month: number): string {
  return `${signData[venus].element === 'Fire' ? 'active social events, fitness classes, or adventure activities' : signData[venus].element === 'Earth' ? 'quality restaurants, museums, or nature settings' : signData[venus].element === 'Air' ? 'intellectual gatherings, book clubs, or networking events' : 'intimate gatherings, artistic venues, or spiritual communities'}`
}
function getSinglesSuperpower(sun: Sign, venus: Sign, month: number): string {
  return `Your ${signData[sun].giftToWorld.split(',')[0].toLowerCase()} combined with ${signData[venus].keywords[0]} charm creates magnetic attraction this month.`
}
function getSinglesWatchOut(sun: Sign, venus: Sign, moon: Sign, month: number): string {
  return `Be aware of ${signData[venus].challenges[0].toLowerCase()} patterns that might sabotage promising connections. Your ${moon} Moon may create ${signData[moon].challenges[0].toLowerCase()} defenses - stay open.`
}
function getSinglesWeekGuide(sun: Sign, venus: Sign, week: number, month: number): string {
  const guides = [
    `Set intentions for what you want; be authentically ${signData[sun].keywords[0]}`,
    `Actively engage - your ${signData[venus].keywords[0]} energy is building`,
    `Peak attraction energy around Full Moon - put yourself out there`,
    `Reflect on learnings; prepare for next month's opportunities`,
  ]
  return guides[week - 1]
}
function getSelfLoveAdvice(sun: Sign, moon: Sign, venus: Sign): string {
  return `Practise ${signData[venus].keywords[0]} self-care that honours both your ${signData[sun].archetype} identity and your ${signData[moon].keywords[0]} emotional needs. Self-love attracts the right partners.`
}
function getCouplesMonthlyOutlook(sun: Sign, venus: Sign, moon: Sign, month: number): string {
  return `opportunities for ${signData[venus].keywords[0]} deepening, especially when you honour your partner's need for ${signData[moon].keywords[0]} emotional connection`
}
function getCouplesCommunicationAdvice(mercury: Sign, month: number): string {
  return `lean into your ${signData[mercury].strengths[0].toLowerCase()} while being mindful of ${signData[mercury].challenges[0].toLowerCase()} tendencies in important conversations`
}
function getCouplesIntimacyAdvice(mars: Sign, venus: Sign, month: number): string {
  return `${signData[mars].keywords[0]} physical connection balanced with ${signData[venus].keywords[0]} emotional intimacy`
}
function getCouplesFrictionPoints(sun: Sign, moon: Sign, venus: Sign, month: number): string {
  return `Watch for ${signData[sun].challenges[0].toLowerCase()} triggers. Your ${moon} Moon may react to ${signData[moon].challenges[0].toLowerCase()} patterns. Your ${venus} Venus can smooth things with ${signData[venus].strengths[0].toLowerCase()}.`
}
function getCouplesNavigationAdvice(sun: Sign, moon: Sign, month: number): string {
  return `Lead with your ${signData[sun].strengths[0].toLowerCase()}. Listen with your ${signData[moon].keywords[0]} emotional intelligence. Remember you're on the same team.`
}
function getDateNightIdeas(sun: Sign, venus: Sign, month: number): string {
  const element = signData[venus].element
  return element === 'Fire' ? `Adventure date, dancing, competitive games, or exciting new restaurant` :
         element === 'Earth' ? `Luxury dining, spa experience, nature walk, or cooking together` :
         element === 'Air' ? `Cultural event, gallery opening, interesting documentary, or lively social gathering` :
         `Romantic movie, meaningful conversation spot, art-making together, or stargazing`
}
function getCouplesWeekGuide(sun: Sign, venus: Sign, moon: Sign, week: number, month: number): string {
  const guides = [
    `Set shared intentions for the month; have the "what do we want?" conversation`,
    `Build momentum together; support each other's ${signData[sun].keywords[0]} goals`,
    `Full Moon intensity - be extra gentle; celebrate your bond`,
    `Appreciate and reflect; plan next month's adventures together`,
  ]
  return guides[week - 1]
}

// Career Section Helpers
function getOverallCareerEnergy(mars: Sign, sun: Sign, month: number): number {
  const base = signData[mars].element === 'Fire' || signData[mars].modality === 'Cardinal' ? 7 : 6
  return Math.min(10, base + (month % 3))
}
function getMonthlyCareerStrengths(sun: Sign, sunData: typeof signData[Sign], month: number): string {
  return `these qualities are especially valuable as the cosmic weather supports ${sunData.keywords[0]} professional expression`
}
function getMonthlyCareerGrowth(sun: Sign, sunData: typeof signData[Sign], month: number): string {
  return `Work on ${sunData.challenges[0].toLowerCase()} patterns that might limit professional growth. This month supports developing your ${sunData.keywords[1]} approach.`
}
function getBestCareerDaysDetailed(mars: Sign, sun: Sign, month: number, days: number): string {
  const marsDays = [(month + 2) % days + 1, (month + 9) % days + 1, (month + 16) % days + 1, (month + 23) % days + 1]
  return `**${marsDays[0]}${getOrdinalSuffix(marsDays[0])}:** High drive - ideal for challenging projects
**${marsDays[1]}${getOrdinalSuffix(marsDays[1])}:** Strategic action - good for negotiations
**${marsDays[2]}${getOrdinalSuffix(marsDays[2])}:** Peak visibility - present your work
**${marsDays[3]}${getOrdinalSuffix(marsDays[3])}:** Completion energy - finish outstanding tasks`
}
function getCareerCautionDays(mars: Sign, mercury: Sign, month: number, days: number): string {
  const cautionDays = [(month + 6) % days + 1, (month + 20) % days + 1]
  return `**${cautionDays[0]}${getOrdinalSuffix(cautionDays[0])} & ${cautionDays[1]}${getOrdinalSuffix(cautionDays[1])}:** Lower energy - avoid major presentations or confrontations if possible`
}
function getMercuryRetrogradeCareerStatus(mercury: Sign, month: number, year: number): string {
  return `Mercury is direct, supporting clear professional communication and smooth project progress.`
}
function getOverallFinancialEnergy(venus: Sign, sun: Sign, month: number): number {
  const base = signData[venus].element === 'Earth' ? 7 : 6
  return Math.min(10, base + (month % 3))
}
function getIncomeOutlook(sun: Sign, venus: Sign, month: number): string {
  return `Income potential aligns with your ${signData[sun].strengths[0].toLowerCase()} expressions. Your ${venus} Venus attracts resources through ${signData[venus].keywords[0]} channels.`
}
function getSpendingTendencies(venus: Sign): string {
  return `${signData[venus].keywords.slice(0, 2).join(', ')} items and experiences`
}
function getMonthlySpendingAdvice(venus: Sign, month: number): string {
  return `balance your ${signData[venus].keywords[0]} desires with practical considerations`
}
function getInvestmentAdvice(sun: Sign, venus: Sign, month: number): string {
  return `Good month for ${signData[venus].element === 'Earth' ? 'conservative investments' : 'research and planning'}. Your ${sun} strategic sense supports long-term thinking.`
}
function getBestFinanceDaysDetailed(venus: Sign, month: number, days: number): string {
  const venusDays = [(month + 4) % days + 1, (month + 12) % days + 1, (month + 20) % days + 1, (month + 26) % days + 1]
  return `**${venusDays[0]}${getOrdinalSuffix(venusDays[0])}:** Good for negotiations and deals
**${venusDays[1]}${getOrdinalSuffix(venusDays[1])}:** Positive for investments
**${venusDays[2]}${getOrdinalSuffix(venusDays[2])}:** Review finances at Full Moon
**${venusDays[3]}${getOrdinalSuffix(venusDays[3])}:** Plan next month's budget`
}
function getFinanceWeekGuide(sun: Sign, venus: Sign, week: number, month: number): string {
  const guides = [
    `Set financial intentions; review last month's spending`,
    `Act on opportunities; your ${signData[venus].keywords[0]} judgment is sound`,
    `Full Moon financial review; release unhelpful money patterns`,
    `Plan and prepare; conservative approach serves you`,
  ]
  return guides[week - 1]
}
function getIdealProjectsToStart(sun: Sign, mars: Sign, month: number): string {
  return `Projects requiring ${signData[sun].strengths[0].toLowerCase()} and ${signData[mars].keywords[0]} execution. Your ${signData[sun].archetype} nature excels at ${signData[sun].keywords.slice(0, 2).join(' and ')} initiatives.`
}
function getProjectsToComplete(sun: Sign, month: number): string {
  return `Anything started in previous months that aligns with your ${signData[sun].keywords[0]} strengths. The cosmic weather supports ${signData[sun].modality.toLowerCase()} completion energy.`
}
function getProjectsToPause(sun: Sign, mercury: Sign, month: number): string {
  return `Projects requiring extensive communication during lower ${signData[mercury].element} mental energy periods. Wait for better timing on complex negotiations.`
}
function getProductivityStyle(sun: Sign, mars: Sign, month: number): string {
  return `Your ${sun} Sun works best with ${signData[sun].element === 'Fire' ? 'bursts of passionate focus' : signData[sun].element === 'Earth' ? 'steady, methodical progress' : signData[sun].element === 'Air' ? 'variety and mental stimulation' : 'emotionally meaningful work'}. Your ${mars} Mars adds ${signData[mars].keywords[0]} drive.`
}
function getCollaborationForecast(sun: Sign, rising: Sign, month: number): string {
  return `Your ${rising} Rising makes you ${signData[rising].keywords[0]} in team settings. Collaborate with those who complement your ${signData[sun].element} energy - ${signData[sun].element === 'Fire' ? 'Earth signs for grounding' : signData[sun].element === 'Earth' ? 'Water signs for intuition' : signData[sun].element === 'Air' ? 'Fire signs for action' : 'Air signs for objectivity'}.`
}
function getNetworkingOpportunities(sun: Sign, rising: Sign, month: number): string {
  return `Lead with your ${signData[rising].strengths[0].toLowerCase()}. Your ${signData[sun].archetype} authenticity attracts valuable professional connections.`
}

// Health Section Helpers
function getOverallHealthEnergy(sun: Sign, mars: Sign, month: number): number {
  const base = signData[mars].element === 'Fire' || signData[sun].element === 'Fire' ? 7 : 6
  return Math.min(10, base + (month % 3))
}
function getMonthlyWellnessNeed(sun: Sign, sunData: typeof signData[Sign], month: number): string {
  return `${sunData.element === 'Fire' ? 'outlets for physical energy and passion' : sunData.element === 'Earth' ? 'grounding routines and nature connection' : sunData.element === 'Air' ? 'mental stimulation and social activity' : 'emotional processing and creative expression'}`
}
function getExerciseRecommendations(sun: Sign, mars: Sign, month: number): string {
  const marsElement = signData[mars].element
  return marsElement === 'Fire' ? `High-intensity workouts, competitive sports, martial arts, dance cardio` :
         marsElement === 'Earth' ? `Strength training, hiking, yoga, Pilates, outdoor activities` :
         marsElement === 'Air' ? `Group fitness classes, cycling, tennis, interval training` :
         `Swimming, water aerobics, restorative yoga, tai chi`
}
function getEnergyPeaksDips(sun: Sign, month: number): string {
  return `**Energy Peaks:** Around New Moon and when Moon transits ${sun} or compatible signs
**Energy Dips:** Around Full Moon emotional intensity and when Moon squares your Sun sign
**Best Exercise Times:** Morning for ${signData[sun].element === 'Fire' || signData[sun].element === 'Air' ? 'capitalising on natural energy' : 'building momentum before the day'}`
}
function getHealthWatchPoints(sun: Sign, sunData: typeof signData[Sign]): string {
  return `${sunData.element === 'Fire' ? 'burnout, inflammation, head/face issues' : sunData.element === 'Earth' ? 'stubborn health habits, throat/neck issues, weight' : sunData.element === 'Air' ? 'nervous system stress, respiratory issues, overthinking' : 'emotional eating, digestive issues, boundary problems'}`
}
function getMonthlyHealthAttention(sun: Sign, month: number): string {
  return `stress management and ${signData[sun].element === 'Fire' ? 'not overextending' : signData[sun].element === 'Earth' ? 'flexibility' : signData[sun].element === 'Air' ? 'grounding' : 'emotional boundaries'}`
}
function getBestDaysForFitness(mars: Sign, month: number): string { return `${(month + 3) % 28 + 1}${getOrdinalSuffix((month + 3) % 28 + 1)}, ${(month + 10) % 28 + 1}${getOrdinalSuffix((month + 10) % 28 + 1)}` }
function getBestDaysForRest(moon: Sign, month: number): string { return `${(month + 5) % 28 + 1}${getOrdinalSuffix((month + 5) % 28 + 1)}, ${(month + 12) % 28 + 1}${getOrdinalSuffix((month + 12) % 28 + 1)}` }
function getBestDaysForHealth(month: number): string { return `${(month + 7) % 28 + 1}${getOrdinalSuffix((month + 7) % 28 + 1)}` }
function getEmotionalWeather(moon: Sign, moonData: typeof signData[Sign], month: number): string {
  return `${moonData.keywords.slice(0, 2).join(' and ')} emotional currents, with particular intensity around the lunar phases`
}
function getMentalEnergyForecast(mercury: Sign, month: number): string {
  return `Your ${mercury} Mercury brings ${signData[mercury].keywords[0]} mental energy. Thought processes are ${signData[mercury].element === 'Air' ? 'quick and multifaceted' : signData[mercury].element === 'Fire' ? 'intuitive and confident' : signData[mercury].element === 'Earth' ? 'practical and thorough' : 'imaginative and feeling-based'}.`
}
function getStressManagement(sun: Sign, moon: Sign): string {
  return `${signData[sun].element === 'Fire' ? 'physical activity and creative outlets' : signData[sun].element === 'Earth' ? 'nature time and sensory pleasures' : signData[sun].element === 'Air' ? 'talking it out and intellectual engagement' : 'solitude and artistic expression'}`
}
function getSelfCarePractices(sun: Sign, moon: Sign, month: number): string {
  return `**${signData[sun].element} Sun Practices:** ${signData[sun].element === 'Fire' ? 'Active rest, passion projects, sunny outdoor time' : signData[sun].element === 'Earth' ? 'Massage, quality food, garden time, comfortable spaces' : signData[sun].element === 'Air' ? 'Social time, learning, journaling, fresh air' : 'Baths, music, creative expression, moon gazing'}

**${signData[moon].element} Moon Practices:** ${signData[moon].element === 'Fire' ? 'Emotional expression through movement' : signData[moon].element === 'Earth' ? 'Comfort items and routines' : signData[moon].element === 'Air' ? 'Processing through conversation' : 'Emotional release rituals'}`
}
function getEmotionalTriggers(moon: Sign, month: number): string {
  return signData[moon].challenges.slice(0, 2).join(' and ').toLowerCase()
}
function getMoonNavigationAdvice(moon: Sign, moonData: typeof signData[Sign]): string {
  return `leaning into your ${moonData.strengths[0].toLowerCase()} while being gentle with your ${moonData.challenges[0].toLowerCase()} tendencies`
}
function getMindfulnessFocus(sun: Sign, moon: Sign, month: number): string {
  return `This month, practise ${signData[sun].element === 'Fire' ? 'present-moment awareness through action' : signData[sun].element === 'Earth' ? 'body-based mindfulness' : signData[sun].element === 'Air' ? 'breath work and meditation' : 'emotional mindfulness and compassion practices'}. Your ${moon} Moon responds well to ${signData[moon].element.toLowerCase()} element practices.`
}
function getSleepForecast(moon: Sign, month: number): string {
  return `expect ${signData[moon].element === 'Water' ? 'vivid dreams and emotional processing during sleep' : signData[moon].element === 'Fire' ? 'active sleep and morning energy' : signData[moon].element === 'Earth' ? 'steady sleep patterns when routine is maintained' : 'variable sleep depending on mental activity'}`
}
function getOptimalSleepPractices(moon: Sign, moonData: typeof signData[Sign]): string {
  return `Your ${moon} Moon rests best with ${moonData.element === 'Water' ? 'calming rituals, water sounds, and emotional closure before bed' : moonData.element === 'Fire' ? 'physical tiredness, cooler rooms, and minimal stimulation' : moonData.element === 'Earth' ? 'consistent bedtime, comfortable bedding, and no screens' : 'wind-down conversations, reading, and mental clearing'}.`
}
function getDreamForecast(moon: Sign, moonPhases: { fullMoon: { sign: Sign } }): string {
  return `more vivid and potentially significant dreams around the Full Moon in ${moonPhases.fullMoon.sign}. Your ${moon} Moon may process ${signData[moon].keywords[0]} themes through dream imagery.`
}
function getRestRecoveryAdvice(sun: Sign, moon: Sign): string {
  return `${signData[sun].element === 'Fire' ? 'allowing yourself to slow down without guilt' : signData[sun].element === 'Earth' ? 'restorative activities that feel productive' : signData[sun].element === 'Air' ? 'quiet mental space without over-analysis' : 'emotional release and gentle self-compassion'}`
}
function getEnergyManagementTips(sun: Sign, mars: Sign, moon: Sign): string {
  return `**Morning:** Align with your ${signData[mars].element} Mars for optimal activity
**Midday:** Use your ${signData[sun].keywords[0]} Sun strengths
**Evening:** Honour your ${signData[moon].element} Moon's emotional needs
**Key:** Don't fight your natural rhythm - work with your ${signData[sun].archetype} nature`
}

// Growth Section Helpers
function getMonthlyGrowthTheme(sun: Sign, moon: Sign, month: number): string {
  return `Integrating your ${signData[sun].keywords[0]} Sun expression with your ${signData[moon].keywords[0]} emotional authenticity. This month supports growth in ${signData[sun].lifeLesson.split(',')[0].toLowerCase()}.`
}
function getShadowWorkOpportunity(sun: Sign, sunData: typeof signData[Sign], month: number): string {
  return `notice when this pattern arises and consciously choose your ${sunData.strengths[0].toLowerCase()} response instead`
}
function getStrengthsDevelopment(sun: Sign, sunData: typeof signData[Sign], month: number): string {
  return `This month particularly supports developing your ${sunData.strengths.slice(0, 2).join(' and ')}. Look for opportunities to practise these in new contexts.`
}
function getGrowthChallenges(sun: Sign, moon: Sign, month: number): string {
  return `Watch for ${signData[sun].challenges[0].toLowerCase()} patterns that might emerge, especially when your ${moon} Moon feels ${signData[moon].challenges[0].toLowerCase()}. These are growth opportunities, not failures.`
}
function getMonthlyAffirmations(sun: Sign, sunData: typeof signData[Sign], month: number): string {
  return `• "I honour my ${sunData.archetype} nature"
• "My ${sunData.strengths[0].toLowerCase()} serves me well"
• "I am growing beyond ${sunData.challenges[0].toLowerCase()}"
• "I share my ${sunData.giftToWorld.split(',')[0].toLowerCase()} generously"`
}
function getSpiritualSupport(moon: Sign, moonData: typeof signData[Sign], month: number): string {
  return `${moonData.keywords[0]} spiritual practices and ${moonData.element.toLowerCase()} element connections`
}
function getIntuitionForecast(moon: Sign, month: number): string {
  return `Your ${moon} Moon's intuition is particularly strong around the lunar phases. Trust your ${signData[moon].element === 'Water' ? 'gut feelings and dreams' : signData[moon].element === 'Fire' ? 'sudden knowings and hunches' : signData[moon].element === 'Earth' ? 'body wisdom and practical insights' : 'mental patterns and synchronicities'}.`
}
function getMeditationGuidance(sun: Sign, moon: Sign, month: number): string {
  return `Try ${signData[sun].element === 'Fire' ? 'active meditation, walking meditation, or candle gazing' : signData[sun].element === 'Earth' ? 'body scan, grounding meditation, or nature meditation' : signData[sun].element === 'Air' ? 'breath work, guided visualisation, or mantra meditation' : 'water meditation, emotional release meditation, or moon meditation'}.`
}
function getJournalingPrompts(sun: Sign, moon: Sign, month: number): string {
  return `• "How is my ${signData[sun].archetype} nature expressing this month?"
• "What is my ${moon} Moon teaching me about my emotional needs?"
• "Where am I growing beyond ${signData[sun].challenges[0].toLowerCase()}?"
• "What does my ${signData[sun].giftToWorld.split(',')[0].toLowerCase()} look like in action?"`
}
function getElementalPractices(sun: Sign, sunData: typeof signData[Sign]): string {
  return `**${sunData.element} Element Practices:**
${sunData.element === 'Fire' ? '• Work with actual fire (candles, fireplaces, sun exposure)\n• Movement practices that generate internal heat\n• Creative expression and passion projects' : sunData.element === 'Earth' ? '• Grounding exercises and nature connection\n• Working with crystals, plants, or earth\n• Practical manifestation practices' : sunData.element === 'Air' ? '• Breathwork and pranayama\n• Sound healing and mantra\n• Intellectual study of spiritual topics' : '• Water rituals (baths, swimming, rain walks)\n• Emotional release practices\n• Moon ceremonies and dream work'}`
}

// Summary Section Helpers
function getMonthlyBigPicture(sun: Sign, moon: Sign, month: number): string {
  return `${signData[sun].keywords.slice(0, 2).join(' and ')} expression while honouring ${signData[moon].keywords[0]} emotional truth`
}
function getMonthlyEquipment(sun: Sign, moon: Sign, rising: Sign): string {
  return `navigate both challenges and opportunities with ${signData[sun].strengths[0].toLowerCase()}, ${signData[moon].strengths[0].toLowerCase()}, and ${signData[rising].strengths[0].toLowerCase()}`
}
function getFinalWisdom(sun: Sign, moon: Sign, month: number): string {
  return `Remember that as a ${sun}, your ${signData[sun].lifeLesson.split(',')[0].toLowerCase()} journey is ongoing. Each month offers new chances to grow. Trust your ${moon} Moon's emotional wisdom and lead with your ${signData[sun].archetype} authenticity.`
}
function getNewMoonQuickRef(sun: Sign, newMoonSign: Sign): string {
  return `Set ${signData[newMoonSign].keywords[0]} intentions`
}
function getFullMoonQuickRef(sun: Sign, fullMoonSign: Sign): string {
  return `Release ${signData[fullMoonSign].challenges[0].toLowerCase()} patterns`
}
function getBestRomanceDaysSimple(venus: Sign, days: number): string {
  return `${(Math.floor(days / 4)) + 3}${getOrdinalSuffix((Math.floor(days / 4)) + 3)}, ${(Math.floor(days / 2)) + 2}${getOrdinalSuffix((Math.floor(days / 2)) + 2)}`
}
function getBestFinanceDaysSimple(venus: Sign, days: number): string {
  return `${(Math.floor(days / 4)) + 5}${getOrdinalSuffix((Math.floor(days / 4)) + 5)}, ${(Math.floor(days / 2)) + 4}${getOrdinalSuffix((Math.floor(days / 2)) + 4)}`
}
function getBestHealthDaysSimple(mars: Sign, days: number): string {
  return `${(Math.floor(days / 4)) + 1}${getOrdinalSuffix((Math.floor(days / 4)) + 1)}, ${(Math.floor(days / 2)) + 6}${getOrdinalSuffix((Math.floor(days / 2)) + 6)}`
}
function getBestRestDaysSimple(moon: Sign, days: number): string {
  return `${(Math.floor(days / 4)) + 7}${getOrdinalSuffix((Math.floor(days / 4)) + 7)}, ${Math.floor(days / 2)}${getOrdinalSuffix(Math.floor(days / 2))}`
}
function getMercuryStatusSimple(month: number, year: number): string {
  return `Direct - clear communication supported`
}
function getMonthlyMantra(sun: Sign, moon: Sign, month: number): string {
  return `I trust my ${signData[sun].archetype} path and honour my ${signData[moon].keywords[0]} heart.`
}

// ============================================
// PAST LIFE & KARMA REPORT GENERATOR
// ============================================

const southNodePastLifeThemes: Record<Sign, {
  pastLifeRole: string
  pastLifeGifts: string[]
  pastLifeChallenges: string[]
  karmicPatterns: string[]
  ancestralWounds: string
  pastLifeEras: string[]
}> = {
  Aries: {
    pastLifeRole: 'warrior, soldier, pioneer, or independent leader',
    pastLifeGifts: ['courage and bravery', 'self-reliance', 'quick decision-making', 'physical prowess'],
    pastLifeChallenges: ['violence or aggression', 'selfishness', 'isolation through independence', 'unfinished battles'],
    karmicPatterns: ['rushing into conflict', 'putting self first to the point of harm', 'difficulty trusting others'],
    ancestralWounds: 'wounds related to war, violence, or the pressure to be strong and self-sufficient',
    pastLifeEras: ['ancient battlefields', 'frontier settlements', 'revolutionary periods', 'warrior cultures'],
  },
  Taurus: {
    pastLifeRole: 'farmer, banker, landowner, or artisan focused on material security',
    pastLifeGifts: ['building wealth', 'creating beauty', 'patience and persistence', 'sensory appreciation'],
    pastLifeChallenges: ['hoarding or greed', 'resistance to change', 'over-attachment to possessions', 'stubbornness'],
    karmicPatterns: ['clinging to security', 'valuing things over people', 'fear of loss driving decisions'],
    ancestralWounds: 'wounds related to poverty, famine, or loss of land and resources',
    pastLifeEras: ['agricultural societies', 'banking dynasties', 'artisan guilds', 'times of scarcity'],
  },
  Gemini: {
    pastLifeRole: 'messenger, scribe, trader, or teacher of knowledge',
    pastLifeGifts: ['communication skills', 'mental agility', 'networking ability', 'curiosity and learning'],
    pastLifeChallenges: ['deception or gossip', 'scattered focus', 'using words as weapons', 'superficial connections'],
    karmicPatterns: ['avoiding depth for breadth', 'nervous energy', 'difficulty with commitment'],
    ancestralWounds: 'wounds related to silencing, censorship, or the misuse of information',
    pastLifeEras: ['medieval courts', 'trading routes', 'scholarly monasteries', 'ages of exploration'],
  },
  Cancer: {
    pastLifeRole: 'mother figure, caretaker, tribal elder, or keeper of home and family',
    pastLifeGifts: ['nurturing abilities', 'emotional intelligence', 'creating safe spaces', 'preserving traditions'],
    pastLifeChallenges: ['over-attachment to family', 'emotional manipulation', 'difficulty letting go', 'victimhood'],
    karmicPatterns: ['smothering through care', 'living through others', 'using guilt as control'],
    ancestralWounds: 'wounds related to abandonment, loss of home, or family separation',
    pastLifeEras: ['matriarchal cultures', 'times of migration', 'domestic service', 'tribal societies'],
  },
  Leo: {
    pastLifeRole: 'royalty, performer, leader, or creative visionary',
    pastLifeGifts: ['natural authority', 'creative expression', 'inspiring others', 'generous spirit'],
    pastLifeChallenges: ['pride and ego', 'need for constant recognition', 'abuse of power', 'dramatic reactions'],
    karmicPatterns: ['needing to be center stage', 'difficulty sharing spotlight', 'wounded pride driving actions'],
    ancestralWounds: 'wounds related to humiliation, loss of status, or creative suppression',
    pastLifeEras: ['royal courts', 'theatrical periods', 'aristocratic families', 'creative renaissances'],
  },
  Virgo: {
    pastLifeRole: 'healer, servant, craftsperson, or perfectionist artisan',
    pastLifeGifts: ['healing abilities', 'attention to detail', 'service orientation', 'practical skills'],
    pastLifeChallenges: ['self-criticism', 'martyrdom', 'perfectionism paralysis', 'body shame'],
    karmicPatterns: ['never feeling good enough', 'serving to the point of self-neglect', 'criticism as defense'],
    ancestralWounds: 'wounds related to servitude, illness, or never measuring up',
    pastLifeEras: ['healing temples', 'servant classes', 'craft guilds', 'monastic orders'],
  },
  Libra: {
    pastLifeRole: 'diplomat, partner, artist, or mediator focused on relationships',
    pastLifeGifts: ['creating harmony', 'aesthetic beauty', 'partnership skills', 'fairness and justice'],
    pastLifeChallenges: ['codependency', 'losing self in others', 'avoiding conflict at all costs', 'superficiality'],
    karmicPatterns: ['defining self through relationships', 'peace-keeping at personal expense', 'indecision'],
    ancestralWounds: 'wounds related to injustice, betrayal in partnership, or loss of identity',
    pastLifeEras: ['diplomatic courts', 'artistic movements', 'arranged marriages', 'justice systems'],
  },
  Scorpio: {
    pastLifeRole: 'shaman, occultist, power broker, or someone involved with death and transformation',
    pastLifeGifts: ['psychological depth', 'transformative power', 'seeing through illusions', 'regenerative ability'],
    pastLifeChallenges: ['manipulation and control', 'obsession', 'revenge and jealousy', 'power abuse'],
    karmicPatterns: ['trust issues', 'using intensity to control', 'difficulty letting go of pain'],
    ancestralWounds: 'wounds related to betrayal, abuse of power, or traumatic loss',
    pastLifeEras: ['mystery schools', 'power struggles', 'times of plague or death', 'occult practices'],
  },
  Sagittarius: {
    pastLifeRole: 'philosopher, teacher, explorer, or religious figure',
    pastLifeGifts: ['wisdom and teaching', 'broad perspective', 'faith and optimism', 'cultural understanding'],
    pastLifeChallenges: ['dogmatism', 'preachiness', 'escapism through travel', 'commitment avoidance'],
    karmicPatterns: ['running from problems', 'imposing beliefs', 'promising more than delivering'],
    ancestralWounds: 'wounds related to religious persecution, exile, or the silencing of truth',
    pastLifeEras: ['religious crusades', 'great explorations', 'philosophical academies', 'missionary work'],
  },
  Capricorn: {
    pastLifeRole: 'authority figure, builder, ambitious achiever, or stern patriarch',
    pastLifeGifts: ['building lasting structures', 'discipline and ambition', 'worldly wisdom', 'responsibility'],
    pastLifeChallenges: ['cold authority', 'workaholism', 'status obsession', 'emotional repression'],
    karmicPatterns: ['sacrificing joy for achievement', 'using status as identity', 'difficulty with vulnerability'],
    ancestralWounds: 'wounds related to failure, loss of reputation, or crushing responsibility',
    pastLifeEras: ['building empires', 'corporate dynasties', 'political power', 'times of austerity'],
  },
  Aquarius: {
    pastLifeRole: 'revolutionary, visionary, outsider, or humanitarian ahead of their time',
    pastLifeGifts: ['innovative thinking', 'humanitarian vision', 'independence', 'group consciousness'],
    pastLifeChallenges: ['alienation', 'emotional detachment', 'rebellion for its own sake', 'superiority'],
    karmicPatterns: ['feeling like an outsider', 'prioritizing ideals over individuals', 'emotional unavailability'],
    ancestralWounds: 'wounds related to being ostracized, persecution for beliefs, or exile from community',
    pastLifeEras: ['revolutionary periods', 'scientific discoveries', 'utopian experiments', 'times of social change'],
  },
  Pisces: {
    pastLifeRole: 'mystic, artist, healer, or sacrifice figure',
    pastLifeGifts: ['spiritual connection', 'artistic inspiration', 'compassion and empathy', 'transcendence'],
    pastLifeChallenges: ['martyrdom', 'escapism', 'victim patterns', 'boundary dissolution'],
    karmicPatterns: ['sacrificing self for others', 'escaping through substances or fantasy', 'porous boundaries'],
    ancestralWounds: 'wounds related to spiritual persecution, addiction, or the burden of collective suffering',
    pastLifeEras: ['monastic life', 'artistic bohemia', 'healing sanctuaries', 'times of collective trauma'],
  },
}

const northNodeEvolutionThemes: Record<Sign, {
  soulPurpose: string
  evolutionaryGoals: string[]
  growthQualities: string[]
  lifeDestiny: string
  keyLessons: string[]
  manifestionPath: string
}> = {
  Aries: {
    soulPurpose: 'to develop courage, independence, and authentic self-assertion',
    evolutionaryGoals: ['taking initiative', 'standing alone when necessary', 'trusting your instincts', 'leading with courage'],
    growthQualities: ['self-reliance', 'directness', 'bravery', 'pioneering spirit'],
    lifeDestiny: 'becoming a trailblazer who inspires others through courageous action',
    keyLessons: ['it\'s okay to put yourself first sometimes', 'your desires matter', 'conflict can be healthy'],
    manifestionPath: 'through bold action, healthy competition, and championing your own needs',
  },
  Taurus: {
    soulPurpose: 'to develop stability, self-worth, and appreciation of simple pleasures',
    evolutionaryGoals: ['building inner security', 'enjoying the physical world', 'developing patience', 'creating tangible results'],
    growthQualities: ['groundedness', 'persistence', 'sensory presence', 'material competence'],
    lifeDestiny: 'becoming a stabilizing force who creates lasting beauty and value',
    keyLessons: ['slow and steady wins', 'you are enough as you are', 'the physical world is sacred'],
    manifestionPath: 'through patient building, appreciating beauty, and trusting your own worth',
  },
  Gemini: {
    soulPurpose: 'to develop curiosity, communication skills, and mental flexibility',
    evolutionaryGoals: ['learning continuously', 'sharing information', 'connecting diverse ideas', 'staying mentally agile'],
    growthQualities: ['adaptability', 'communication', 'intellectual curiosity', 'social connection'],
    lifeDestiny: 'becoming a bridge between people and ideas, a messenger of knowledge',
    keyLessons: ['every perspective has value', 'learning is lifelong', 'connection requires communication'],
    manifestionPath: 'through teaching, writing, speaking, and building diverse connections',
  },
  Cancer: {
    soulPurpose: 'to develop emotional depth, nurturing abilities, and a sense of belonging',
    evolutionaryGoals: ['creating emotional safety', 'nurturing self and others', 'honoring feelings', 'building home'],
    growthQualities: ['emotional intelligence', 'caring nature', 'intuition', 'protective instincts'],
    lifeDestiny: 'becoming a source of emotional security and nurturance for yourself and others',
    keyLessons: ['vulnerability is strength', 'home is where you make it', 'feelings are valid guides'],
    manifestionPath: 'through creating family (chosen or biological), nurturing others, and honoring emotions',
  },
  Leo: {
    soulPurpose: 'to develop self-expression, creativity, and generous leadership',
    evolutionaryGoals: ['expressing your unique self', 'creating from the heart', 'inspiring others', 'leading with warmth'],
    growthQualities: ['creativity', 'confidence', 'generosity', 'playfulness'],
    lifeDestiny: 'becoming a creative leader who inspires joy and expression in others',
    keyLessons: ['you deserve to shine', 'creativity is essential', 'give generously from your gifts'],
    manifestionPath: 'through creative expression, leadership, and celebrating your unique light',
  },
  Virgo: {
    soulPurpose: 'to develop discernment, practical skills, and meaningful service',
    evolutionaryGoals: ['refining abilities', 'serving effectively', 'improving systems', 'healing through practical care'],
    growthQualities: ['precision', 'helpfulness', 'analytical thinking', 'humility'],
    lifeDestiny: 'becoming a healer or helper who improves life through practical service',
    keyLessons: ['details matter', 'service is sacred', 'perfection is a process'],
    manifestionPath: 'through developing expertise, serving others, and refining your craft',
  },
  Libra: {
    soulPurpose: 'to develop partnership skills, balance, and aesthetic appreciation',
    evolutionaryGoals: ['learning through relationship', 'creating harmony', 'developing diplomacy', 'appreciating beauty'],
    growthQualities: ['fairness', 'grace', 'cooperation', 'aesthetic sense'],
    lifeDestiny: 'becoming a harmonizer who creates beauty and balance in relationships',
    keyLessons: ['we need each other', 'compromise isn\'t weakness', 'beauty uplifts the soul'],
    manifestionPath: 'through partnership, creating beauty, and facilitating harmony',
  },
  Scorpio: {
    soulPurpose: 'to develop emotional depth, transformative power, and authentic intimacy',
    evolutionaryGoals: ['embracing transformation', 'diving deep emotionally', 'claiming personal power', 'achieving intimacy'],
    growthQualities: ['intensity', 'psychological insight', 'regenerative ability', 'magnetic presence'],
    lifeDestiny: 'becoming a transformer who helps others through their own depths',
    keyLessons: ['death precedes rebirth', 'vulnerability enables intimacy', 'power comes from truth'],
    manifestionPath: 'through deep emotional work, transformation, and helping others heal',
  },
  Sagittarius: {
    soulPurpose: 'to develop wisdom, faith, and a broader perspective on life',
    evolutionaryGoals: ['expanding horizons', 'finding meaning', 'developing faith', 'teaching wisdom'],
    growthQualities: ['optimism', 'philosophical depth', 'adventurousness', 'inspirational ability'],
    lifeDestiny: 'becoming a wisdom teacher who expands others\' horizons',
    keyLessons: ['there\'s always more to learn', 'meaning matters', 'faith sustains'],
    manifestionPath: 'through exploration, teaching, and sharing your philosophical insights',
  },
  Capricorn: {
    soulPurpose: 'to develop mastery, responsibility, and achievement in the world',
    evolutionaryGoals: ['building something lasting', 'taking responsibility', 'achieving mastery', 'becoming an authority'],
    growthQualities: ['discipline', 'ambition', 'integrity', 'maturity'],
    lifeDestiny: 'becoming a master builder who creates lasting structures in the world',
    keyLessons: ['discipline creates freedom', 'responsibility is empowering', 'legacy matters'],
    manifestionPath: 'through patient building, taking responsibility, and achieving worldly mastery',
  },
  Aquarius: {
    soulPurpose: 'to develop individuality, humanitarian vision, and contribution to collective',
    evolutionaryGoals: ['embracing uniqueness', 'serving humanity', 'innovating', 'building community'],
    growthQualities: ['originality', 'humanitarian concern', 'progressive thinking', 'group consciousness'],
    lifeDestiny: 'becoming an innovative contributor to the collective good',
    keyLessons: ['different is valuable', 'we\'re all connected', 'the future needs visionaries'],
    manifestionPath: 'through innovation, community building, and humanitarian contribution',
  },
  Pisces: {
    soulPurpose: 'to develop compassion, spiritual connection, and transcendence',
    evolutionaryGoals: ['developing faith', 'embracing unity', 'creating through imagination', 'healing through compassion'],
    growthQualities: ['compassion', 'imagination', 'spiritual sensitivity', 'artistic ability'],
    lifeDestiny: 'becoming a channel for spiritual healing and creative inspiration',
    keyLessons: ['we are all one', 'imagination creates reality', 'surrender is strength'],
    manifestionPath: 'through creative expression, spiritual practice, and compassionate service',
  },
}

const saturnKarmicLessons: Record<Sign, {
  karmicFear: string
  lifeLesson: string
  masteryChallenges: string[]
  wisdomGained: string
  healingPath: string
}> = {
  Aries: { karmicFear: 'being seen as weak or dependent', lifeLesson: 'learning that true strength includes vulnerability', masteryChallenges: ['patience', 'considering others', 'sustained effort'], wisdomGained: 'disciplined courage and leadership that uplifts others', healingPath: 'balancing assertion with cooperation' },
  Taurus: { karmicFear: 'scarcity, loss of security, change', lifeLesson: 'learning that true security comes from within', masteryChallenges: ['flexibility', 'non-attachment', 'trusting life'], wisdomGained: 'building lasting value without clinging', healingPath: 'developing inner stability regardless of external circumstances' },
  Gemini: { karmicFear: 'being misunderstood or mentally inadequate', lifeLesson: 'learning to communicate with depth and responsibility', masteryChallenges: ['focus', 'commitment', 'speaking truth'], wisdomGained: 'becoming a wise communicator and teacher', healingPath: 'using words to heal rather than scatter' },
  Cancer: { karmicFear: 'abandonment, emotional rejection, not belonging', lifeLesson: 'learning to nurture without dependency', masteryChallenges: ['emotional boundaries', 'self-nurturing', 'letting go'], wisdomGained: 'becoming a secure base for self and others', healingPath: 'healing family patterns through conscious parenting of self' },
  Leo: { karmicFear: 'being invisible, unimportant, or ordinary', lifeLesson: 'learning that true worth isn\'t measured by recognition', masteryChallenges: ['humility', 'sharing spotlight', 'self-validation'], wisdomGained: 'authentic leadership that doesn\'t need applause', healingPath: 'finding inner confidence independent of external praise' },
  Virgo: { karmicFear: 'imperfection, criticism, being useless', lifeLesson: 'learning that imperfection is part of wholeness', masteryChallenges: ['self-acceptance', 'rest', 'receiving help'], wisdomGained: 'humble mastery that serves without martyrdom', healingPath: 'accepting yourself while still growing' },
  Libra: { karmicFear: 'conflict, being alone, injustice', lifeLesson: 'learning to find balance within before seeking it without', masteryChallenges: ['decisiveness', 'healthy conflict', 'self-partnership'], wisdomGained: 'creating harmony from inner equilibrium', healingPath: 'developing a strong sense of self within partnerships' },
  Scorpio: { karmicFear: 'betrayal, loss of control, vulnerability', lifeLesson: 'learning to trust and surrender control', masteryChallenges: ['forgiveness', 'releasing grudges', 'transparency'], wisdomGained: 'transformative power that heals rather than wounds', healingPath: 'using intensity for healing rather than control' },
  Sagittarius: { karmicFear: 'being trapped, meaninglessness, losing faith', lifeLesson: 'learning that freedom includes responsibility', masteryChallenges: ['commitment', 'follow-through', 'respecting limits'], wisdomGained: 'wisdom that is grounded and applicable', healingPath: 'finding meaning within limitations' },
  Capricorn: { karmicFear: 'failure, being disrespected, inadequacy', lifeLesson: 'learning that success isn\'t the measure of worth', masteryChallenges: ['work-life balance', 'emotional expression', 'asking for help'], wisdomGained: 'authentic achievement that honors the whole self', healingPath: 'integrating ambition with emotional fulfillment' },
  Aquarius: { karmicFear: 'being ordinary, rejected by group, losing freedom', lifeLesson: 'learning that belonging doesn\'t threaten individuality', masteryChallenges: ['emotional intimacy', 'consistency', 'following rules sometimes'], wisdomGained: 'innovative contribution that serves the collective', healingPath: 'balancing uniqueness with connection' },
  Pisces: { karmicFear: 'being too much, losing boundaries, harsh reality', lifeLesson: 'learning to be spiritual and practical', masteryChallenges: ['boundaries', 'discipline', 'staying grounded'], wisdomGained: 'compassion that is boundaried and sustainable', healingPath: 'bringing spiritual vision into earthly reality' },
}

export function generatePastLifeKarmaReportV2(chart: NatalChart, userName: string): GeneratedReportV2 {
  const sun = getPlacement(chart, 'sun')
  const moon = getPlacement(chart, 'moon')
  const saturn = getPlacement(chart, 'saturn')
  const northNode = chart.placements.find(p => p.planet.toLowerCase().includes('node') && !p.planet.toLowerCase().includes('south'))
  const southNode = chart.placements.find(p => p.planet.toLowerCase().includes('south'))
  const pluto = getPlacement(chart, 'pluto')
  const chiron = getPlacement(chart, 'chiron')

  const sunSign = capitalizeSign(sun?.sign || 'aries')
  const moonSign = capitalizeSign(moon?.sign || 'aries')
  const saturnSign = capitalizeSign(saturn?.sign || 'aries')
  const risingSign = capitalizeSign(chart.ascendant?.sign || 'aries')

  // Derive nodes from chart or estimate from moon
  const southNodeSign = southNode ? capitalizeSign(southNode.sign) : capitalizeSign(moon?.sign || 'aries')
  const northNodeSign = northNode ? capitalizeSign(northNode.sign) : getOppositeSign(southNodeSign)
  const plutoSign = capitalizeSign(pluto?.sign || 'scorpio')
  const chironSign = capitalizeSign(chiron?.sign || 'aries')

  const southNodeData = southNodePastLifeThemes[southNodeSign]
  const northNodeData = northNodeEvolutionThemes[northNodeSign]
  const saturnData = saturnKarmicLessons[saturnSign]

  // Count retrograde planets for karmic emphasis
  const retrogrades = chart.placements.filter(p => p.is_retrograde)
  const retrogradeCount = retrogrades.length

  const sections: ReportSectionV2[] = [
    {
      id: 'soul-journey-overview',
      title: 'Your Soul\'s Journey',
      icon: '🌙',
      subsections: [
        {
          title: 'Understanding Your Karmic Blueprint',
          content: `${userName}, your birth chart is not just a snapshot of planetary positions—it\'s a map of your soul\'s journey across lifetimes. The positions of the lunar nodes, Saturn, Pluto, and retrograde planets reveal the karmic patterns, past life themes, and evolutionary goals you carry into this incarnation.\n\nYour chart reveals a soul that has traveled through many experiences, accumulating both wisdom and unfinished business. With ${retrogradeCount} retrograde planets in your chart, you carry ${retrogradeCount > 3 ? 'significant' : retrogradeCount > 1 ? 'some' : 'subtle'} karmic material requiring integration in this lifetime.\n\nThis report will illuminate where you\'ve been, what you\'ve mastered, what still needs healing, and most importantly—where your soul is heading in its evolutionary journey.`,
          terms: [
            { term: 'Karma', definition: 'The spiritual principle of cause and effect across lifetimes—not punishment, but unfinished lessons seeking completion.' },
            { term: 'Soul Contract', definition: 'Pre-incarnation agreements about lessons to learn, people to meet, and growth to achieve in this lifetime.' },
          ],
        },
        {
          title: 'The Karmic Axis: Your Past and Future',
          content: `The most direct indicator of past life themes in your chart is the Nodal Axis—the points where the Moon\'s orbit crosses the ecliptic. Your South Node in ${southNodeSign} represents where you\'ve been, the skills you\'ve mastered, and the patterns you\'re releasing. Your North Node in ${northNodeSign} represents where you\'re going—your soul\'s growth direction.\n\nThis axis creates a tension: the South Node feels comfortable but limiting, while the North Node feels unfamiliar but fulfilling. Your soul\'s work is to honor the gifts of your South Node while courageously moving toward your North Node destiny.\n\nWith Saturn in ${saturnSign}, there\'s an additional karmic layer—Saturn represents the specific lessons your soul committed to master in this lifetime, often involving themes of discipline, responsibility, and earned wisdom.`,
          visual: {
            type: 'planetary-strength',
            title: 'Your Karmic Indicators',
            data: {
              'South Node': southNodeSign,
              'North Node': northNodeSign,
              'Saturn': saturnSign,
              'Pluto': plutoSign,
              'Chiron': chironSign,
              'Retrogrades': String(retrogradeCount),
            },
          },
        },
      ],
    },
    {
      id: 'south-node-past',
      title: 'The South Node: Your Past Lives',
      icon: '⏳',
      subsections: [
        {
          title: `South Node in ${southNodeSign}: Where You\'ve Been`,
          content: `Your South Node in ${southNodeSign} reveals that in past incarnations, you likely lived as a ${southNodeData.pastLifeRole}. These lives left you with mastered skills and deeply ingrained patterns.\n\nYou may have experienced lifetimes in ${southNodeData.pastLifeEras.join(', ')}. The echoes of these experiences live in your muscle memory, your instinctive reactions, and the things that feel "natural" to you—sometimes too natural, becoming default behaviors that limit your growth.\n\nThis placement suggests souls memories of both achievement and struggle. You came into this life already knowing how to ${southNodeData.pastLifeGifts[0]} and ${southNodeData.pastLifeGifts[1]}, but also carrying tendencies toward ${southNodeData.pastLifeChallenges[0]} and ${southNodeData.pastLifeChallenges[1]}.`,
        },
        {
          title: 'Past Life Gifts You Carry',
          content: `The South Node isn\'t all baggage—it\'s also treasure. Your past lives gifted you with:\n\n${southNodeData.pastLifeGifts.map(gift => `• **${gift.charAt(0).toUpperCase() + gift.slice(1)}**: This comes naturally to you because you\'ve done it before. Trust it, but don\'t hide in it.`).join('\n\n')}\n\nThese gifts are meant to be used in service of your North Node purpose. They become problematic only when you rely on them exclusively, avoiding the growth your soul truly seeks.`,
          tip: `Your past life gifts are like tools in a toolkit—use them when appropriate, but don\'t mistake the tools for the purpose.`,
        },
        {
          title: 'Karmic Patterns to Release',
          content: `Your South Node also reveals patterns that may have served you in past lives but now hold you back:\n\n${southNodeData.karmicPatterns.map(pattern => `• **${pattern.charAt(0).toUpperCase() + pattern.slice(1)}**: You may notice this tendency arising automatically, especially under stress. It\'s familiar, but it\'s no longer serving your evolution.`).join('\n\n')}\n\nThese patterns often emerge most strongly in moments of fear or challenge. They\'re your soul\'s "default settings" from past lives—comfortable, but limiting. Awareness is the first step toward choosing differently.`,
        },
        {
          title: 'Ancestral Wounds',
          content: `Beyond personal past lives, your South Node connects you to ancestral karma—${southNodeData.ancestralWounds}.\n\nYou may carry these wounds even without conscious memory of their origin. They might manifest as inexplicable fears, strong reactions to certain situations, or patterns that seem to run in your family.\n\nHealing these ancestral patterns is part of your soul\'s work. As you heal them in yourself, you heal them for your lineage—past, present, and future.`,
        },
      ],
    },
    {
      id: 'north-node-destiny',
      title: 'The North Node: Your Soul\'s Destiny',
      icon: '⭐',
      subsections: [
        {
          title: `North Node in ${northNodeSign}: Where You\'re Going`,
          content: `Your North Node in ${northNodeSign} represents ${northNodeData.soulPurpose}. This is the direction of your soul\'s evolution—unfamiliar but deeply fulfilling when you lean into it.\n\nUnlike your South Node skills, North Node qualities may feel awkward or scary at first. You haven\'t "practiced" them for lifetimes. But every time you move toward your North Node, you experience a sense of rightness, even if accompanied by fear.\n\nYour destiny path: ${northNodeData.lifeDestiny}.`,
        },
        {
          title: 'Your Evolutionary Goals',
          content: `Your soul chose to develop these qualities in this lifetime:\n\n${northNodeData.evolutionaryGoals.map(goal => `• **${goal.charAt(0).toUpperCase() + goal.slice(1)}**: Each step in this direction, however small, fulfills your soul\'s purpose.`).join('\n\n')}\n\nThese goals aren\'t about achieving external success—they\'re about becoming who your soul intended you to be. Success in these areas will feel meaningful in a way that South Node achievements never quite do.`,
        },
        {
          title: 'Key Life Lessons',
          content: `Your soul came to learn:\n\n${northNodeData.keyLessons.map(lesson => `• "${lesson}"`).join('\n\n')}\n\nThese lessons will present themselves repeatedly through circumstances, relationships, and inner promptings. Each time you embrace them, you accelerate your soul\'s evolution.`,
        },
        {
          title: 'Your Manifestation Path',
          content: `You will manifest your destiny ${northNodeData.manifestionPath}.\n\nThe North Node isn\'t just about internal development—it\'s about how your growth contributes to the world. As you develop your ${northNodeSign} qualities, you naturally become a ${northNodeData.growthQualities.join(', ')} presence in others\' lives.\n\n**Practical Steps:**\n• Seek opportunities that require ${northNodeData.growthQualities[0]}\n• Practice ${northNodeData.growthQualities[1]} even when uncomfortable\n• Surround yourself with people who embody ${northNodeSign} energy\n• When facing choices, ask: "Which option moves me toward my North Node?"`,
          tip: `When life feels meaningful but challenging, you\'re probably on your North Node path. When life feels easy but empty, you\'re probably defaulting to your South Node.`,
        },
      ],
    },
    {
      id: 'saturn-karma',
      title: 'Saturn: Your Karmic Taskmaster',
      icon: '🪐',
      subsections: [
        {
          title: `Saturn in ${saturnSign}: Your Soul\'s Commitment`,
          content: `Saturn in your chart represents the specific karmic curriculum your soul signed up for. In ${saturnSign}, you committed to mastering ${saturnData.lifeLesson}.\n\nThis isn\'t punishment—it\'s precision. Your soul knew this lesson was needed for your evolution and arranged for Saturn to ensure you wouldn\'t skip it. Saturn challenges are hard, but they produce the most lasting growth.\n\nYour deepest karmic fear: ${saturnData.karmicFear}. This fear often drives unconscious behavior until you face it directly.`,
        },
        {
          title: 'The Mastery Challenges',
          content: `Saturn in ${saturnSign} asks you to develop:\n\n${saturnData.masteryChallenges.map(challenge => `• **${challenge.charAt(0).toUpperCase() + challenge.slice(1)}**: This likely doesn\'t come naturally. That\'s exactly why your soul chose it.`).join('\n\n')}\n\nThese challenges often intensify during Saturn transits (especially the Saturn Return around ages 29 and 58). But even in quiet times, Saturn\'s lessons operate in the background, shaping your character through consistent effort.`,
        },
        {
          title: 'The Wisdom You\'re Building',
          content: `Through Saturn\'s rigorous curriculum, you\'re developing: ${saturnData.wisdomGained}.\n\nThis wisdom isn\'t theoretical—it\'s earned through lived experience. Others will eventually seek you out for guidance in exactly the areas where you struggled most. Your wounds become your wisdom.\n\n**Your Healing Path**: ${saturnData.healingPath}`,
        },
      ],
    },
    {
      id: 'twelfth-house',
      title: 'The 12th House: Hidden Karma',
      icon: '🌊',
      subsections: [
        {
          title: 'The House of Past Life Memory',
          content: `The 12th house in astrology is called the house of "hidden enemies, secret sorrows, and self-undoing"—but in karmic terms, it\'s the house of past life memory, unconscious patterns, and spiritual connection.\n\nPlanets in your 12th house represent energies that operated in past lives and now work from behind the scenes of consciousness. They can manifest as inexplicable talents, unexplained fears, or patterns that seem to "happen to you."\n\nThe sign on your 12th house cusp and any planets there reveal the specific flavors of your hidden karma.`,
        },
        {
          title: 'Accessing 12th House Wisdom',
          content: `The 12th house is the doorway to your soul\'s memory. You access it through:\n\n• **Dreams**: Pay attention to recurring dreams—they often contain past life themes\n• **Meditation**: Quiet mind practices open the door to unconscious wisdom\n• **Creative expression**: Art, music, and writing can channel 12th house material\n• **Solitude**: Time alone allows buried patterns to surface\n• **Therapy or healing work**: Safe containers for exploring the unconscious\n\nWhat emerges from 12th house work isn\'t always comfortable, but it\'s always illuminating. This is where karma hides until you\'re ready to see it.`,
          tip: `Keep a dream journal. Your 12th house speaks most clearly while you sleep.`,
        },
      ],
    },
    {
      id: 'retrograde-planets',
      title: 'Retrograde Planets: Unfinished Business',
      icon: '🔄',
      subsections: [
        {
          title: 'Karmic Significance of Retrogrades',
          content: `You have ${retrogradeCount} retrograde planet${retrogradeCount !== 1 ? 's' : ''} in your natal chart. ${retrogradeCount > 3 ? 'This is a significant amount, suggesting a soul with much unfinished business to complete.' : retrogradeCount > 1 ? 'This indicates some specific past life themes requiring attention.' : retrogradeCount === 1 ? 'This points to one particular area of karmic review.' : 'With few retrogrades, your karmic focus may be on new lessons rather than reviewing old ones.'}\n\nRetrograde planets represent energies that didn\'t fully complete their work in past lives. They turn inward, asking for review, revision, and deeper understanding rather than external action. These planets didn\'t quite finish their evolutionary lessons in previous incarnations, so they return in this lifetime asking for deeper consideration.\n\nWhen a planet is retrograde at birth, its energy doesn\'t flow outward naturally. Instead, it cycles back, revisits, reconsiders. This isn\'t weakness—it\'s depth. Retrograde planets often produce the most profound mastery once their lessons are integrated, precisely because they\'ve had to work harder to understand their domain.`,
        },
        {
          title: 'Your Retrograde Planets',
          content: retrogrades.length > 0
            ? `${retrogrades.map(r => `**${r.planet.charAt(0).toUpperCase() + r.planet.slice(1)} Retrograde**: The energy of ${r.planet} is turned inward for you, suggesting past life material around ${getRetrogradeMeaning(r.planet)}. This energy may feel blocked or require extra conscious effort to express externally.\n\nIn past lives, you may have misused this ${r.planet} energy, over-relied on it without integrating its deeper wisdom, or had it somehow wounded or suppressed. Now, your soul asks you to develop a more conscious, intentional relationship with ${r.planet}\'s themes. The external world may not easily reflect this energy back to you—you must cultivate it from within first.`).join('\n\n')}`
            : `With no natal retrograde planets, your soul may be focused more on new experiences than reviewing past ones. This doesn\'t mean you carry no karma—rather, your karmic work may be more about the Nodes, Saturn, and house placements than about retrograde review.\n\nYou\'ll still encounter retrograde energies through transits, which will periodically ask you to slow down and reflect in specific areas of life. These transit retrogrades offer opportunities to develop the internal processing that those with natal retrogrades do naturally.`,
        },
        {
          title: 'Working With Retrograde Energy',
          content: `Whether you have many retrogrades or few, understanding how to work with this energy is valuable:\n\n**For Natal Retrogrades:**\n• Don\'t force external results—let the internal process complete first\n• Journal and reflect on themes related to your retrograde planets\n• Notice when you feel "blocked" in these areas—it\'s often a call to go deeper\n• Use creative expression to externalize what the retrograde turns inward\n• Be patient—retrograde mastery often comes later in life\n\n**For Transit Retrogrades:**\n• Use retrograde periods for review, not new initiatives in that planet\'s domain\n• Finish old projects rather than starting new ones\n• Revisit and revise rather than push forward\n• Pay attention to what "comes back around"—this is karmic material surfacing\n\nThe most evolved expression of retrograde energy is wisdom that comes from having deeply processed and integrated a planetary function, rather than just acting it out unconsciously.`,
          tip: `When a retrograde planet returns to its natal position by transit, it often triggers significant karmic review and completion opportunities.`,
        },
      ],
    },
    {
      id: 'pluto-transformation',
      title: 'Pluto: Your Transformation Karma',
      icon: '🦅',
      subsections: [
        {
          title: `Pluto in ${plutoSign}: Power and Rebirth`,
          content: `Pluto in your chart reveals where you carry karma around power, control, transformation, and the cycle of death and rebirth. In ${plutoSign}, your soul has deep experience with ${signData[plutoSign].element === 'Fire' ? 'wielding personal power, sometimes destructively, and transforming identity through crisis' : signData[plutoSign].element === 'Earth' ? 'material power, resource control, and transformation through loss or gain of security' : signData[plutoSign].element === 'Air' ? 'mental power, manipulation through information, and transformation through ideas' : 'emotional power, psychic intensity, and transformation through deep feeling'}.\n\nPluto\'s house position (where it falls in your chart) shows the life area where this transformative karma plays out. But the sign reveals the style—how you\'ve approached power in past lives, and how you may need to transform your relationship with it in this one.\n\n**Your Pluto Theme**: ${plutoSign} Pluto suggests past life experience with ${signData[plutoSign].archetype.toLowerCase()} energy taken to extreme intensity. You may have been victim or perpetrator of ${plutoSign} energy misused. Now you\'re learning to wield this power consciously, neither suppressing nor being controlled by it.`,
        },
        {
          title: 'Past Life Power Dynamics',
          content: `With Pluto in ${plutoSign}, your past life power stories likely involved:\n\n${signData[plutoSign].element === 'Fire' ? '• Positions of leadership that became tyrannical\n• Identity crises that led to complete reinvention\n• Battles of will where winning destroyed as much as losing\n• Creative power that consumed rather than created\n• The need to be special or important at any cost' : signData[plutoSign].element === 'Earth' ? '• Control of resources used for manipulation\n• Attachment to possessions that prevented necessary endings\n• Physical power over others or being physically overpowered\n• Transformation through loss of everything "solid"\n• The slow building of empires that eventually crumbled' : signData[plutoSign].element === 'Air' ? '• Knowledge used as weapon rather than wisdom\n• Mental manipulation and psychological games\n• Ideas that became dogma, then destroyed their creators\n• Communication that exposed or silenced\n• Intellectual pride that preceded downfall' : '• Emotional intensity that drowned self or others\n• Psychic abilities used for control\n• Secrets and hidden agendas that eventually surfaced\n• Healing power that became wound or wound that became healing\n• Emotional manipulation in intimate relationships'}\n\nThese aren\'t meant to frighten—they\'re meant to illuminate. Understanding your Pluto karma helps you recognise when old patterns are repeating and choose transformation over destruction.`,
        },
        {
          title: 'Your Transformation Path',
          content: `Pluto asks for death and rebirth—not physical, but psychological. The parts of you that need to die are the shadow expressions of your ${plutoSign} placement: the ways you\'ve misused power, the things you\'ve clung to that prevent growth, the defenses that once protected but now imprison.\n\n**Signs you\'re avoiding Pluto work:**\n• Feeling stuck in the same patterns for years\n• Power struggles that never resolve\n• Intense fear around certain themes that you won\'t examine\n• Attraction to/repulsion from Plutonian themes (death, taboo, intensity)\n• Trying to control what can\'t be controlled\n\n**Signs you\'re doing your Pluto work:**\n• Willingness to let go of what no longer serves\n• Ability to sit with intensity without acting out\n• Using power for transformation rather than domination\n• Healing your own wounds rather than projecting them\n• Rising from losses more integrated than before\n\nPluto transformation is not comfortable, but it\'s deeply liberating. Each time you die to an old version of yourself and allow something new to emerge, you complete karma and lighten your soul\'s load.`,
          tip: `Pluto\'s gift is phoenix energy—the ability to transform completely and rise from ashes. Trust the destruction; it makes space for rebirth.`,
        },
      ],
    },
    {
      id: 'chiron-wound',
      title: 'Chiron: The Wounded Healer',
      icon: '💊',
      subsections: [
        {
          title: `Chiron in ${chironSign}: Your Core Wound`,
          content: `Chiron reveals the wound you carry that cannot be fully healed but can be transformed into wisdom and healing ability for others. In ${chironSign}, your core wound relates to ${signData[chironSign].keywords[0]} and ${signData[chironSign].keywords[1]}.\n\nThis isn\'t a wound you chose carelessly—it\'s precisely the wound your soul needed to develop the specific healing gift you\'re meant to offer the world. The pain you\'ve experienced in ${chironSign} themes has given you a unique understanding that no amount of study could provide.\n\n**The Chiron Paradox**: You may find you can help others with exactly what you struggle with yourself. You might be a brilliant advisor on the very issues that challenge you most. This is Chiron\'s signature—the wound that won\'t fully close becomes a spring of wisdom for others.`,
        },
        {
          title: 'Past Life Origins of Your Wound',
          content: `Chiron wounds often originate in past lives. With Chiron in ${chironSign}, you may have experienced:\n\n• Past lives where your ${signData[chironSign].keywords[0]} was damaged or denied\n• Times when you tried to express ${chironSign} qualities and were punished\n• Incarnations where you caused wounds around ${chironSign} themes and now carry the karma\n• Lives where you were a healer of ${chironSign} issues but burned out or were martyred\n• Generational trauma in your family line around these themes\n\nThe wound often shows up early in this lifetime—childhood experiences that mirror the past life origin. You may have felt "different" in ${chironSign} areas from a young age, or experienced rejection or pain precisely where ${chironSign} themes live.\n\nUnderstanding the karmic origin of your wound doesn\'t erase it, but it does help you stop taking it personally. This wound is part of your soul\'s curriculum, not a random misfortune.`,
        },
        {
          title: 'Transforming Wound Into Gift',
          content: `The evolution of Chiron moves through stages:\n\n**Stage 1 - Denial**: Pretending the wound doesn\'t exist or isn\'t important\n**Stage 2 - Pain**: Fully feeling the wound, often through triggering experiences  \n**Stage 3 - Seeking Healing**: Trying everything to "fix" the wound\n**Stage 4 - Acceptance**: Realising this wound won\'t fully heal, but its pain can lessen\n**Stage 5 - Meaning**: Understanding the wound as teacher and gift-giver\n**Stage 6 - Service**: Using your wound wisdom to help others with similar struggles\n\n${userName}, wherever you are in this journey is exactly right. There\'s no rushing Chiron work—it unfolds across the lifetime. But knowing the destination helps: you\'re not meant to be "fixed." You\'re meant to transform your wound into a gift that only you can give.\n\n**Your Healing Gift**: Because of your ${chironSign} Chiron, you have unique capacity to help others with ${signData[chironSign].keywords.slice(0, 2).join(' and ')}. You understand their pain from the inside. You know what doesn\'t help (because you\'ve tried it). You can hold space for their process because you know it can\'t be rushed.`,
          tip: `The activities that help you manage your Chiron wound are often the activities you\'re meant to teach or facilitate for others.`,
        },
      ],
    },
    {
      id: 'karmic-timing',
      title: 'Karmic Timing: When Past Lives Surface',
      icon: '⏰',
      subsections: [
        {
          title: 'Saturn Returns: Your Karmic Checkpoints',
          content: `Saturn returns to its natal position approximately every 29.5 years, marking major karmic checkpoints:\n\n**First Saturn Return (ages 28-30)**: The karma of your youth culminates. Whatever you\'ve avoided or built incorrectly must be faced. Relationships, careers, identities that aren\'t aligned with your soul\'s purpose often end or transform. It\'s intense, but it clears karma from your first three decades and sets the foundation for authentic adulthood.\n\n**Second Saturn Return (ages 57-59)**: A harvest of your middle years. What have you built? What wisdom have you gained? This return often brings questions about legacy and meaning. Karma from your career years resolves; you see clearly what mattered and what didn\'t.\n\n**Third Saturn Return (ages 86-88)**: For those who reach this age, it\'s a completion of Saturn\'s lessons and often a preparation for transition. Past life karma may surface for final resolution.\n\nWith your Saturn in ${saturnSign}, your Saturn returns specifically involve lessons of ${saturnData.lifeLesson}. These periods intensify your core karmic curriculum.`,
        },
        {
          title: 'Nodal Returns: Your Soul\'s Recalibration',
          content: `The Lunar Nodes return to their natal positions every 18.6 years:\n\n**First Nodal Return (age 18-19)**: Your first major choice point between South Node security and North Node growth. Often coincides with leaving home, choosing education or career paths, first serious relationships. The choices you make here echo for years.\n\n**Second Nodal Return (age 37-38)**: A "course correction" opportunity. Are you living your North Node? Or have you retreated to South Node comfort? This return often brings experiences that force you back toward your destiny path.\n\n**Third Nodal Return (age 56-57)**: Near your second Saturn return, this creates a powerful karmic convergence. The question becomes: have you done what you came here to do? There\'s still time, but the urgency increases.\n\nBetween returns, the Nodes make important transits to sensitive points in your chart, often bringing fated-feeling encounters and decisions. People you meet during nodal transits often have karmic significance.`,
        },
        {
          title: 'Recognising Karmic Moments',
          content: `Not every difficult time is karma, but some moments have unmistakable karmic weight. Signs of a karmic moment:\n\n• **Intensity out of proportion**: The situation feels bigger than its apparent cause\n• **Deja vu or familiarity**: You feel like you\'ve been here before\n• **Stuck patterns breaking**: Something that "always happens" suddenly changes\n• **Fated meetings**: Encountering people who change your life direction\n• **Forced choice points**: Circumstances requiring you to choose between comfortable and growth\n• **Old wounds surfacing**: Past pain returns not to torture but to heal\n• **Dreams increasing**: Your unconscious works overtime during karmic periods\n• **Synchronicities multiplying**: The universe seems to be sending messages\n\nWhen you recognise a karmic moment, treat it with the seriousness it deserves. These aren\'t times for default reactions—they\'re opportunities for soul evolution. Pause, reflect, choose consciously. The decisions you make during karmic windows have ripple effects across timelines.`,
          tip: `Keep a journal during major transits and returns. Looking back, you\'ll see the karmic patterns clearly.`,
        },
      ],
    },
    {
      id: 'past-life-glimpses',
      title: 'Accessing Past Life Memory',
      icon: '👁️',
      subsections: [
        {
          title: 'Ways Past Lives Surface',
          content: `Past life memories rarely arrive as complete movies of other times. More often, they surface as:\n\n**Inexplicable Knowledge**: Skills or knowledge you have without learning in this life. Natural abilities in music, languages, healing, or crafts that seem to come from nowhere.\n\n**Irrational Fears**: Phobias that don\'t connect to this life\'s experiences. Fear of water might indicate a drowning death; fear of fire, a burning. These fears often relate to how past lives ended.\n\n**Recurring Dreams**: Dreams set in other times, with other identities, often carrying emotional weight that lingers after waking.\n\n**Strong Reactions to Times/Places**: Being drawn to or repelled by certain historical periods, cultures, or locations without logical explanation.\n\n**Relationship Deja Vu**: Meeting someone and feeling certain you\'ve known them before. Soul group members often incarnate together.\n\n**Childhood Memories**: Some children describe past life memories before socialisation teaches them such things are "impossible."\n\nYour ${southNodeSign} South Node suggests you might have particularly vivid memories or affinities related to ${southNodeData.pastLifeEras.slice(0, 2).join(' and ')}. Pay attention when these themes arise in dreams, media preferences, or inexplicable interests.`,
        },
        {
          title: 'Past Life Exploration Exercises',
          content: `If you wish to explore past life themes more directly, try these approaches:\n\n**Meditation Journeys**:\n1. In deep relaxation, ask to be shown a past life relevant to a current challenge\n2. Notice what images, feelings, or impressions arise without forcing\n3. Let the "movie" play without editing; you can analyse later\n4. Thank whatever guides or memories came through\n5. Journal immediately upon returning to normal consciousness\n\n**Dream Incubation**:\nBefore sleep, ask clearly: "Show me a past life that explains [current issue]."\nKeep paper by your bed; write whatever you remember upon waking.\nRepeat for several nights; themes often build.\n\n**Trigger Exploration**:\nWhen you notice an irrational fear or inexplicable attraction:\n- Sit with the feeling rather than pushing it away\n- Ask it to show you its origin\n- Let images, impressions, or body sensations arise\n- This is your unconscious communicating; listen without judgment\n\n**Professional Support**:\nPast life regression therapy with a skilled practitioner can access memories more directly. Choose someone who creates safety and helps process whatever emerges.`,
        },
        {
          title: 'Healing Prompts for Your Specific Karma',
          content: `Based on your chart, here are specific prompts for past life exploration:\n\n**South Node in ${southNodeSign}**:\n"Show me a past life where I lived as a ${southNodeData.pastLifeRole}. What did I learn? What patterns did I develop that I still carry?"\n\n**Saturn in ${saturnSign}**:\n"Show me a past life where I experienced ${saturnData.karmicFear}. How did that fear begin? What wisdom did I gain from facing it?"\n\n**Your Core Wound (Chiron in ${chironSign})**:\n"Show me the origin of my wound around ${signData[chironSign].keywords[0]}. What happened? What was I meant to learn? How can I heal this now?"\n\n**Karmic Relationships**:\n"Show me a past life with [person you feel karmic connection to]. What was our relationship? What are we completing now?"\n\nApproach these explorations with curiosity rather than attachment to specific outcomes. Sometimes what we learn is unexpected but exactly what our soul needed to understand.`,
          tip: `Past life work is about insight for this life, not escape from it. Whatever you discover should help you live more consciously now.`,
        },
      ],
    },
    {
      id: 'karmic-relationships',
      title: 'Karmic Relationship Patterns',
      icon: '🔗',
      subsections: [
        {
          title: 'How Past Lives Affect Your Relationships',
          content: `Your South Node in ${southNodeSign} and Saturn in ${saturnSign} create specific patterns in how you relate to others.\n\nFrom your South Node, you may attract partners who trigger your ${southNodeData.karmicPatterns[0]} pattern, or who themselves embody ${southNodeSign} energy in unhealthy ways. These relationships feel intensely familiar but often don\'t promote growth.\n\nFrom Saturn, you may experience ${saturnData.karmicFear} in relationships, leading to patterns of ${saturnSign === 'Cancer' || saturnSign === 'Scorpio' ? 'emotional walls' : saturnSign === 'Libra' || saturnSign === 'Leo' ? 'people-pleasing or performing' : 'control or distance'}.`,
        },
        {
          title: 'Recognizing Soul Contracts',
          content: `Some relationships in your life are pre-arranged soul contracts—agreements made between lifetimes to meet and catalyze growth. Signs of a soul contract relationship:\n\n• Instant recognition or familiarity\n• Intense reactions (positive or negative) from the start\n• The relationship forces you to face your shadows\n• You can\'t seem to fully leave even when it\'s difficult\n• The relationship relates to your North or South Node themes\n\nSoul contract relationships aren\'t always romantic—they can be friendships, family members, or even brief encounters that change your life direction.`,
        },
        {
          title: 'Healing Karmic Relationship Patterns',
          content: `To evolve your relationship karma:\n\n• **Notice the pattern**: What type of person or dynamic do you repeatedly attract?\n• **Trace the origin**: Connect it to your South Node or Saturn themes\n• **Make conscious choices**: When you feel the old pull, pause before reacting\n• **Seek North Node partnerships**: Choose people who support your growth direction\n• **Do your own work**: The most powerful way to change relationship karma is to heal yourself\n\nAs you heal your patterns, you\'ll naturally attract healthier connections. The karma releases, and new relationship possibilities emerge.`,
          tip: `If you keep attracting the same type of partner or situation, you\'re being shown a karmic pattern asking for healing.`,
        },
      ],
    },
    {
      id: 'past-life-talents',
      title: 'Past Life Talents to Reclaim',
      icon: '🎁',
      subsections: [
        {
          title: 'Gifts From Other Lifetimes',
          content: `Your soul didn\'t arrive empty-handed. Based on your South Node in ${southNodeSign} and your planetary placements, you carry these past life talents:\n\n${southNodeData.pastLifeGifts.map(gift => `• **${gift.charAt(0).toUpperCase() + gift.slice(1)}**: You may have noticed unusual aptitude in this area, especially as a child before conditioning set in.`).join('\n\n')}\n\nWith your ${sunSign} Sun, you also carry creative abilities related to ${signData[sunSign].giftToWorld.toLowerCase()}. These talents often emerge naturally when you stop trying and simply allow.`,
        },
        {
          title: 'Activating Your Soul Gifts',
          content: `To fully reclaim your past life talents:\n\n• **Trust early interests**: What fascinated you as a child often connects to past life mastery\n• **Notice what comes easily**: Unusual abilities are often remembered rather than learned\n• **Release perfectionism**: Your soul already knows how; let it flow without judgment\n• **Combine old and new**: Use South Node gifts in service of North Node growth\n• **Teach others**: Sharing your natural gifts helps them crystallize\n\nYour talents are meant to be used, not hoarded. As you express them in this lifetime, you complete the circle of past life development.`,
        },
      ],
    },
    {
      id: 'evolutionary-path',
      title: 'Your Evolutionary Path Forward',
      icon: '✨',
      subsections: [
        {
          title: 'Integrating Past and Future',
          content: `The goal of karmic work isn\'t to erase the past but to integrate it. Your ${southNodeSign} South Node gifts and your ${northNodeSign} North Node calling aren\'t opposites—they\'re meant to work together.\n\nImagine using your ${southNodeData.pastLifeGifts[0]} in service of ${northNodeData.evolutionaryGoals[0]}. That\'s integration. Your past life mastery becomes a tool for your evolutionary purpose.\n\nThe journey from South to North Node isn\'t a straight line—it\'s a spiral. You\'ll revisit South Node themes throughout life, but each time with more awareness, using them more consciously.`,
        },
        {
          title: 'Your Soul\'s Invitation',
          content: `${userName}, your soul chose this lifetime with intention. It chose your family, your challenges, your gifts—all in service of evolution.\n\nYour karmic invitation:\n\n• Release ${southNodeData.karmicPatterns[0]} while honoring ${southNodeData.pastLifeGifts[0]}\n• Embrace ${northNodeData.growthQualities[0]} even when it feels uncomfortable\n• Face ${saturnData.karmicFear} to claim ${saturnData.wisdomGained}\n• Remember: you are not your karma—you are the soul choosing how to work with it\n\nEvery choice you make either repeats old karma or creates new possibilities. You have more power than you know.`,
        },
        {
          title: 'Daily Practices for Karmic Healing',
          content: `To accelerate your soul\'s evolution:\n\n**Morning**: Set an intention to move toward your North Node today\n**Throughout the day**: Notice when South Node defaults arise—pause before reacting\n**Evening**: Reflect on moments you chose growth over comfort\n**Weekly**: Engage in an activity that develops your North Node qualities\n**Monthly**: Review patterns in your life—what karma is asking for attention?\n\n**Affirmation for your path**:\n"I honor where my soul has been while courageously moving toward where it\'s going. I release ${southNodeData.karmicPatterns[0]} and embrace ${northNodeData.growthQualities[0]}. My past informs me; my future invites me; I choose my present consciously."`,
          tip: `The universe rewards courageous movement toward the North Node. Watch for synchronicities and support when you\'re on the right path.`,
        },
      ],
    },
  ]

  const wordCount = sections.reduce((acc, s) =>
    acc + s.subsections.reduce((a, sub) => a + sub.content.split(' ').length, 0), 0)

  return {
    id: `past-life-karma-${Date.now()}`,
    slug: 'past-life-karma',
    title: 'Past Life & Karma Report',
    generatedAt: new Date().toISOString(),
    userName,
    birthData: {
      date: '',
      place: '',
      sunSign,
      moonSign,
      risingSign,
    },
    summary: {
      headline: `A Soul Journey from ${southNodeSign} to ${northNodeSign}`,
      overview: `${userName}, your soul carries the wisdom of a ${southNodeData.pastLifeRole} while moving toward a destiny of ${northNodeData.soulPurpose}. With Saturn in ${saturnSign}, you\'re mastering ${saturnData.lifeLesson}. This lifetime is about integrating where you\'ve been with where you\'re going.`,
      keyStrengths: [
        `Past life mastery in ${southNodeData.pastLifeGifts[0]}`,
        `Soul commitment to ${northNodeData.evolutionaryGoals[0]}`,
        `Building wisdom through ${saturnData.masteryChallenges[0]}`,
        `${retrogradeCount > 0 ? `Deep karmic review capacity (${retrogradeCount} retrogrades)` : 'Fresh karmic energy for new experiences'}`,
      ],
      growthAreas: [
        `Releasing the pattern of ${southNodeData.karmicPatterns[0]}`,
        `Developing ${northNodeData.growthQualities[0]}`,
        `Facing the fear of ${saturnData.karmicFear}`,
        `Healing ${southNodeData.ancestralWounds.split('wounds related to ')[1] || 'ancestral patterns'}`,
      ],
    },
    visuals: [
      {
        type: 'planetary-strength',
        title: 'Your Karmic Blueprint',
        data: {
          'South Node': southNodeSign,
          'North Node': northNodeSign,
          'Saturn': saturnSign,
          'Pluto': plutoSign,
          'Chiron': chironSign,
        },
      },
    ],
    sections,
    glossary: [
      { term: 'South Node', definition: 'The point representing past life patterns, mastered skills, and default behaviors you\'re evolving beyond.' },
      { term: 'North Node', definition: 'The point representing your soul\'s growth direction—unfamiliar but fulfilling when embraced.' },
      { term: 'Karmic', definition: 'Related to the spiritual principle of cause and effect across lifetimes.' },
      { term: 'Soul Contract', definition: 'Pre-incarnation agreements about lessons, relationships, and experiences.' },
      { term: 'Retrograde', definition: 'A planet appearing to move backward, indicating internalized energy and past life review.' },
    ],
    wordCount: wordCount + 500, // Account for formatting
  }
}

function getOppositeSign(sign: Sign): Sign {
  const opposites: Record<Sign, Sign> = {
    Aries: 'Libra', Taurus: 'Scorpio', Gemini: 'Sagittarius', Cancer: 'Capricorn',
    Leo: 'Aquarius', Virgo: 'Pisces', Libra: 'Aries', Scorpio: 'Taurus',
    Sagittarius: 'Gemini', Capricorn: 'Cancer', Aquarius: 'Leo', Pisces: 'Virgo',
  }
  return opposites[sign]
}

function getRetrogradeMeaning(planet: string): string {
  const meanings: Record<string, string> = {
    mercury: 'communication, learning, and past life intellectual pursuits',
    venus: 'love, values, and past life relationship patterns',
    mars: 'action, assertion, and past life conflicts or courage',
    jupiter: 'expansion, faith, and past life beliefs or abundance',
    saturn: 'responsibility, structure, and deep karmic lessons',
    uranus: 'freedom, innovation, and past life rebellion',
    neptune: 'spirituality, creativity, and past life spiritual experiences',
    pluto: 'power, transformation, and past life intensity',
  }
  return meanings[planet.toLowerCase()] || 'this planetary energy'
}

// ============================================
// FINANCIAL POTENTIAL REPORT GENERATOR
// ============================================

const signFinancialTraits: Record<Sign, {
  moneyMindset: string
  earningStyle: string
  spendingPattern: string
  investmentApproach: string
  wealthBlocks: string[]
  abundanceGifts: string[]
  bestIndustries: string[]
  financialLesson: string
}> = {
  Aries: {
    moneyMindset: 'entrepreneurial and action-oriented',
    earningStyle: 'through initiative, leadership, and being first',
    spendingPattern: 'impulsive purchases, especially on experiences and adventure',
    investmentApproach: 'aggressive growth, early-stage investments, quick decisions',
    wealthBlocks: ['impatience with slow-building wealth', 'abandoning projects before payoff', 'risky financial decisions'],
    abundanceGifts: ['ability to start ventures', 'courage to take financial risks', 'competitive drive to succeed'],
    bestIndustries: ['entrepreneurship', 'sports/fitness', 'military/security', 'sales', 'emergency services'],
    financialLesson: 'patience and sustained effort create lasting wealth',
  },
  Taurus: {
    moneyMindset: 'security-focused and value-conscious',
    earningStyle: 'through persistence, quality work, and building tangible assets',
    spendingPattern: 'on quality items, comfort, and sensory pleasures',
    investmentApproach: 'conservative, long-term, real assets like property',
    wealthBlocks: ['fear of change limiting opportunities', 'over-attachment to possessions', 'resistance to financial innovation'],
    abundanceGifts: ['natural money magnetism', 'patience for long-term growth', 'eye for value'],
    bestIndustries: ['finance/banking', 'real estate', 'food/hospitality', 'luxury goods', 'agriculture'],
    financialLesson: 'true security comes from self-worth, not net worth',
  },
  Gemini: {
    moneyMindset: 'versatile and opportunity-spotting',
    earningStyle: 'through communication, networking, and multiple income streams',
    spendingPattern: 'on books, courses, tech, and varied experiences',
    investmentApproach: 'diversified, trend-following, intellectually interesting opportunities',
    wealthBlocks: ['scattered focus diluting results', 'not sticking with things long enough', 'overthinking financial decisions'],
    abundanceGifts: ['ability to spot trends', 'networking into opportunities', 'multiple skill monetization'],
    bestIndustries: ['media/journalism', 'marketing', 'education', 'tech', 'sales/trading'],
    financialLesson: 'focus and follow-through multiply financial results',
  },
  Cancer: {
    moneyMindset: 'security and family-oriented',
    earningStyle: 'through nurturing, caregiving, and creating emotional value',
    spendingPattern: 'on home, family, food, and emotional security',
    investmentApproach: 'conservative, family-focused, real estate, inheritance-minded',
    wealthBlocks: ['fear-based financial decisions', 'hoarding from scarcity mindset', 'letting emotions drive money choices'],
    abundanceGifts: ['strong savings instinct', 'ability to create valuable "nest"', 'intuitive financial timing'],
    bestIndustries: ['real estate', 'food/restaurants', 'childcare', 'healthcare', 'family businesses'],
    financialLesson: 'emotional security enables financial abundance',
  },
  Leo: {
    moneyMindset: 'generous and status-conscious',
    earningStyle: 'through creativity, leadership, and personal brand',
    spendingPattern: 'on luxury, entertainment, and impressive experiences',
    investmentApproach: 'bold, visible investments, backing winners, creative ventures',
    wealthBlocks: ['overspending to maintain image', 'pride preventing help-seeking', 'gambling tendencies'],
    abundanceGifts: ['ability to attract money through charisma', 'generous circulation of wealth', 'creative income generation'],
    bestIndustries: ['entertainment', 'leadership positions', 'luxury brands', 'creative arts', 'children\'s services'],
    financialLesson: 'true abundance flows from authentic self-expression',
  },
  Virgo: {
    moneyMindset: 'analytical and improvement-focused',
    earningStyle: 'through expertise, service, and attention to detail',
    spendingPattern: 'practical, health-focused, quality over quantity',
    investmentApproach: 'researched, systematic, steady improvement',
    wealthBlocks: ['undervaluing your services', 'analysis paralysis', 'perfectionism delaying action'],
    abundanceGifts: ['eye for efficiency and improvement', 'ability to create value through refinement', 'practical money management'],
    bestIndustries: ['healthcare', 'accounting', 'consulting', 'wellness', 'quality control'],
    financialLesson: 'your expertise is more valuable than you think',
  },
  Libra: {
    moneyMindset: 'partnership-oriented and balance-seeking',
    earningStyle: 'through relationships, collaboration, and creating harmony',
    spendingPattern: 'on beauty, relationships, and aesthetic experiences',
    investmentApproach: 'balanced, partnership investments, beautiful assets',
    wealthBlocks: ['difficulty asking for fair compensation', 'financial codependency', 'indecision delaying opportunities'],
    abundanceGifts: ['ability to earn through partnerships', 'aesthetic sense that creates value', 'diplomatic negotiation skills'],
    bestIndustries: ['law', 'design/fashion', 'diplomacy', 'marriage/events', 'art dealing'],
    financialLesson: 'knowing your worth enables fair exchange',
  },
  Scorpio: {
    moneyMindset: 'strategic and resourceful',
    earningStyle: 'through transformation, research, and managing others\' resources',
    spendingPattern: 'strategic, researched purchases, quality investments',
    investmentApproach: 'deep research, transformative opportunities, long-term power plays',
    wealthBlocks: ['control issues around money', 'secrecy preventing collaboration', 'all-or-nothing financial patterns'],
    abundanceGifts: ['ability to transform resources', 'shrewd investment instincts', 'access to others\' resources'],
    bestIndustries: ['finance/investing', 'psychology', 'research', 'insurance', 'transformation industries'],
    financialLesson: 'shared resources multiply individual wealth',
  },
  Sagittarius: {
    moneyMindset: 'optimistic and growth-oriented',
    earningStyle: 'through teaching, publishing, and expanding horizons',
    spendingPattern: 'on travel, education, and expansive experiences',
    investmentApproach: 'growth-focused, international, optimistic bets',
    wealthBlocks: ['overoptimism leading to overextension', 'ignoring details', 'restlessness abandoning success'],
    abundanceGifts: ['ability to see opportunities others miss', 'lucky financial breaks', 'growth mindset'],
    bestIndustries: ['education', 'publishing', 'travel', 'international business', 'philosophy/spirituality'],
    financialLesson: 'grounded optimism creates sustainable abundance',
  },
  Capricorn: {
    moneyMindset: 'ambitious and structure-building',
    earningStyle: 'through achievement, authority, and long-term building',
    spendingPattern: 'strategic, status-conscious, investment-minded',
    investmentApproach: 'conservative, long-term, building structures of wealth',
    wealthBlocks: ['workaholism sacrificing life quality', 'fear of failure limiting risks', 'status pursuit over genuine satisfaction'],
    abundanceGifts: ['ability to build lasting wealth structures', 'patience for compound growth', 'strategic financial planning'],
    bestIndustries: ['corporate leadership', 'government', 'architecture', 'traditional business', 'finance'],
    financialLesson: 'wealth serves life; life doesn\'t serve wealth',
  },
  Aquarius: {
    moneyMindset: 'innovative and collective-minded',
    earningStyle: 'through innovation, technology, and serving the collective',
    spendingPattern: 'on technology, causes, and unconventional items',
    investmentApproach: 'innovative, tech-focused, socially responsible',
    wealthBlocks: ['detachment from material needs', 'impractical idealism', 'rebellion against necessary financial structures'],
    abundanceGifts: ['ability to spot future trends', 'innovative income streams', 'network-based wealth'],
    bestIndustries: ['technology', 'humanitarian work', 'innovation', 'networking', 'future-focused industries'],
    financialLesson: 'individual prosperity can serve collective good',
  },
  Pisces: {
    moneyMindset: 'intuitive and faith-based',
    earningStyle: 'through creativity, healing, and spiritual service',
    spendingPattern: 'on art, spirituality, and helping others',
    investmentApproach: 'intuitive, creative ventures, faith-based',
    wealthBlocks: ['unclear boundaries leading to loss', 'escapism from financial reality', 'giving away more than sustainable'],
    abundanceGifts: ['intuitive financial timing', 'ability to manifest through faith', 'creative income generation'],
    bestIndustries: ['arts', 'healing/spirituality', 'film/music', 'healthcare', 'charitable work'],
    financialLesson: 'grounded spirituality includes material abundance',
  },
}

export function generateFinancialPotentialReportV2(chart: NatalChart, userName: string): GeneratedReportV2 {
  const sun = getPlacement(chart, 'sun')
  const moon = getPlacement(chart, 'moon')
  const venus = getPlacement(chart, 'venus')
  const mars = getPlacement(chart, 'mars')
  const jupiter = getPlacement(chart, 'jupiter')
  const saturn = getPlacement(chart, 'saturn')
  const pluto = getPlacement(chart, 'pluto')

  const sunSign = capitalizeSign(sun?.sign || 'aries')
  const moonSign = capitalizeSign(moon?.sign || 'aries')
  const venusSign = capitalizeSign(venus?.sign || 'taurus')
  const marsSign = capitalizeSign(mars?.sign || 'aries')
  const jupiterSign = capitalizeSign(jupiter?.sign || 'sagittarius')
  const saturnSign = capitalizeSign(saturn?.sign || 'capricorn')
  const plutoSign = capitalizeSign(pluto?.sign || 'scorpio')
  const risingSign = capitalizeSign(chart.ascendant?.sign || 'aries')

  // 2nd house is personal money, 8th is shared/investments, 10th is career
  const secondHouse = chart.houses?.[1]
  const eighthHouse = chart.houses?.[7]
  const tenthHouse = chart.houses?.[9]

  const secondHouseSign = secondHouse ? capitalizeSign(secondHouse.sign) : getHouseSign(risingSign, 2)
  const eighthHouseSign = eighthHouse ? capitalizeSign(eighthHouse.sign) : getHouseSign(risingSign, 8)
  const tenthHouseSign = tenthHouse ? capitalizeSign(tenthHouse.sign) : getHouseSign(risingSign, 10)

  const sunFinance = signFinancialTraits[sunSign]
  const venusFinance = signFinancialTraits[venusSign]
  const jupiterFinance = signFinancialTraits[jupiterSign]
  const secondHouseFinance = signFinancialTraits[secondHouseSign]
  const tenthHouseFinance = signFinancialTraits[tenthHouseSign]

  const sections: ReportSectionV2[] = [
    {
      id: 'financial-blueprint',
      title: 'Your Financial Blueprint',
      icon: '💎',
      subsections: [
        {
          title: 'Your Cosmic Wealth Signature',
          content: `${userName}, your birth chart reveals a unique financial blueprint—patterns of earning, spending, investing, and manifesting abundance that are written in the stars. This isn\'t about limitation; it\'s about working WITH your natural tendencies rather than against them.\n\nYour financial personality is shaped by multiple factors: your Sun in ${sunSign} creates your core approach to wealth (${sunFinance.moneyMindset}), while Venus in ${venusSign} influences what you value and attract (${venusFinance.earningStyle}). Jupiter in ${jupiterSign} shows where abundance flows easily (${jupiterFinance.moneyMindset}), and Saturn in ${saturnSign} reveals your financial lessons and ultimate mastery.\n\nThe second house of your chart, with ${secondHouseSign} energy, governs your personal income and self-worth. The eighth house in ${eighthHouseSign} rules shared resources, investments, and transformation through money. The tenth house in ${tenthHouseSign} shows your career potential and public earning power.`,
          visual: {
            type: 'planetary-strength',
            title: 'Your Financial Planets',
            data: {
              'Income Style (2nd)': secondHouseSign,
              'Investments (8th)': eighthHouseSign,
              'Career Money (10th)': tenthHouseSign,
              'Values': venusSign,
              'Expansion': jupiterSign,
              'Discipline': saturnSign,
            },
          },
        },
        {
          title: 'Your Core Money Mindset',
          content: `With your Sun in ${sunSign}, your fundamental approach to money and resources is ${sunFinance.moneyMindset}. You naturally tend to earn ${sunFinance.earningStyle}.\n\nThis is your financial identity at the deepest level—how you think about money, what you believe you deserve, and how you instinctively approach wealth-building.\n\n**Your Natural Financial Style:**\n• Earning approach: ${sunFinance.earningStyle}\n• Spending tendency: ${sunFinance.spendingPattern}\n• Investment style: ${sunFinance.investmentApproach}\n\n**The Lesson Your Sun Teaches About Money:**\n${sunFinance.financialLesson}`,
          terms: [
            { term: 'Financial Blueprint', definition: 'The unique pattern of money beliefs, behaviors, and potentials revealed in your birth chart.' },
            { term: 'Abundance Consciousness', definition: 'A mindset that recognizes the flow of resources as natural and available.' },
          ],
        },
      ],
    },
    {
      id: 'second-house',
      title: 'The 2nd House: Your Personal Wealth',
      icon: '💰',
      subsections: [
        {
          title: `${secondHouseSign} Energy in Your Money House`,
          content: `The second house governs personal income, possessions, self-worth, and what you value. With ${secondHouseSign} energy here, you tend to:\n\n• **Earn money through**: ${secondHouseFinance.earningStyle}\n• **Value spending on**: ${secondHouseFinance.spendingPattern}\n• **Approach building wealth via**: ${secondHouseFinance.investmentApproach}\n\nThis isn\'t just about money—your second house reflects your relationship with self-worth. Financial struggles often connect to not valuing yourself; financial flow often connects to healthy self-esteem.\n\n**Industries Aligned With Your 2nd House:**\n${secondHouseFinance.bestIndustries.map(ind => `• ${ind}`).join('\n')}`,
        },
        {
          title: 'Maximizing Your Earning Potential',
          content: `To fully activate your second house earning potential:\n\n**Leverage Your Natural Gifts:**\n${secondHouseFinance.abundanceGifts.map(gift => `• ${gift.charAt(0).toUpperCase() + gift.slice(1)}`).join('\n')}\n\n**Watch For These Blocks:**\n${secondHouseFinance.wealthBlocks.map(block => `• ${block.charAt(0).toUpperCase() + block.slice(1)}`).join('\n')}\n\n**Your Second House Lesson:**\n${secondHouseFinance.financialLesson}\n\n**Practical Application:**\nYour ideal income streams involve ${secondHouseFinance.earningStyle}. Look for opportunities that allow you to express these qualities while building financial stability.`,
          tip: `Your relationship with money mirrors your relationship with self-worth. Working on one improves the other.`,
        },
      ],
    },
    {
      id: 'eighth-house',
      title: 'The 8th House: Shared Resources & Investments',
      icon: '🔮',
      subsections: [
        {
          title: `${eighthHouseSign} Energy in Your Investment House`,
          content: `The eighth house rules other people\'s money, investments, inheritance, debt, taxes, and shared resources. With ${eighthHouseSign} energy here, your approach to these matters is ${signFinancialTraits[eighthHouseSign].moneyMindset}.\n\nThis house reveals how you:\n• Handle joint finances and partnerships\n• Approach investments and passive income\n• Deal with inheritance and legacy\n• Navigate debt and taxes\n• Transform your financial situation\n\n**Investment Style:**\n${signFinancialTraits[eighthHouseSign].investmentApproach}`,
        },
        {
          title: 'Growing Wealth Through the 8th House',
          content: `Your eighth house suggests wealth-building through:\n\n**Partnership Potential:**\nWith ${eighthHouseSign} here, you may benefit from financial partnerships that are ${signFinancialTraits[eighthHouseSign].moneyMindset}. Joint ventures, marriage finances, or business partnerships can be powerful wealth vehicles when approached with awareness.\n\n**Investment Approach:**\n${signFinancialTraits[eighthHouseSign].investmentApproach}\n\n**Transformation Potential:**\nThe eighth house governs financial transformation—your ability to completely change your financial situation. Your path involves ${signFinancialTraits[eighthHouseSign].earningStyle.replace('through', 'transforming through')}.\n\n**Watch For:**\n${signFinancialTraits[eighthHouseSign].wealthBlocks.slice(0, 2).map(b => `• ${b}`).join('\n')}`,
          tip: `The eighth house is where "other people\'s money" can work for you—through investments, partnerships, or leveraging resources.`,
        },
      ],
    },
    {
      id: 'tenth-house',
      title: 'The 10th House: Career & Public Wealth',
      icon: '🏆',
      subsections: [
        {
          title: `${tenthHouseSign} Energy in Your Career House`,
          content: `The tenth house rules your career, public reputation, and how you earn in the world\'s eyes. With ${tenthHouseSign} energy here, your professional earning potential is expressed through ${tenthHouseFinance.earningStyle}.\n\nThis placement suggests you\'re meant to build a career that is ${tenthHouseFinance.moneyMindset}. Your professional reputation and earning power grow when you embody these qualities authentically.\n\n**Ideal Career Paths:**\n${tenthHouseFinance.bestIndustries.map(ind => `• ${ind}`).join('\n')}\n\n**Your Professional Financial Gifts:**\n${tenthHouseFinance.abundanceGifts.map(g => `• ${g.charAt(0).toUpperCase() + g.slice(1)}`).join('\n')}`,
        },
        {
          title: 'Maximizing Career Wealth',
          content: `To fully activate your tenth house earning potential:\n\n**Professional Positioning:**\nWith ${tenthHouseSign} in your tenth house, position yourself as ${signFinancialTraits[tenthHouseSign].moneyMindset}. This energy attracts opportunities, promotions, and higher compensation.\n\n**Career Wealth Blocks to Clear:**\n${tenthHouseFinance.wealthBlocks.map(block => `• ${block.charAt(0).toUpperCase() + block.slice(1)}`).join('\n')}\n\n**Your Career Financial Lesson:**\n${tenthHouseFinance.financialLesson}\n\n**Authority and Earning:**\nAs you develop authority in your field, your earning power naturally increases. Your tenth house in ${tenthHouseSign} suggests authority comes through ${tenthHouseFinance.earningStyle}.`,
        },
      ],
    },
    {
      id: 'venus-jupiter',
      title: 'Venus & Jupiter: Your Abundance Planets',
      icon: '✨',
      subsections: [
        {
          title: `Venus in ${venusSign}: What You Attract`,
          content: `Venus governs what you attract, value, and find beautiful—including money. In ${venusSign}, your Venus attracts abundance through ${venusFinance.earningStyle}.\n\n**Your Venus Money Gifts:**\n${venusFinance.abundanceGifts.map(gift => `• ${gift.charAt(0).toUpperCase() + gift.slice(1)}`).join('\n')}\n\n**What You Value Spending On:**\n${venusFinance.spendingPattern}\n\n**Venus Abundance Lesson:**\n${venusFinance.financialLesson}\n\nVenus is your "attraction" magnet. When you\'re aligned with your Venus sign\'s values, money flows more easily. When you ignore these values, abundance feels blocked.`,
        },
        {
          title: `Jupiter in ${jupiterSign}: Your Expansion Zone`,
          content: `Jupiter is the greater benefic—the planet of expansion, luck, and abundance. In ${jupiterSign}, your Jupiter expands wealth through ${jupiterFinance.earningStyle}.\n\n**Your Jupiter Luck Factor:**\n${jupiterFinance.abundanceGifts.map(gift => `• ${gift.charAt(0).toUpperCase() + gift.slice(1)}`).join('\n')}\n\n**Best Industries for Jupiter Luck:**\n${jupiterFinance.bestIndustries.map(ind => `• ${ind}`).join('\n')}\n\n**Jupiter Growth Potential:**\nJupiter shows where "lucky breaks" come from. For you, financial expansion flows when you embrace ${jupiterSign} energy—being ${jupiterFinance.moneyMindset}.\n\n**Jupiter\'s Financial Lesson:**\n${jupiterFinance.financialLesson}`,
          tip: `Follow your Jupiter sign\'s energy to find where financial opportunities seem to appear "magically."`,
        },
      ],
    },
    {
      id: 'saturn-pluto',
      title: 'Saturn & Pluto: Financial Mastery',
      icon: '🪐',
      subsections: [
        {
          title: `Saturn in ${saturnSign}: Your Financial Discipline`,
          content: `Saturn represents lessons, discipline, and mastery over time. In ${saturnSign}, your financial discipline is developed through ${signFinancialTraits[saturnSign].earningStyle}.\n\nSaturn doesn\'t deny wealth—it demands that you earn it through sustained effort. The areas Saturn touches require more work but ultimately produce more lasting results.\n\n**Saturn\'s Financial Challenges:**\n${signFinancialTraits[saturnSign].wealthBlocks.map(block => `• ${block.charAt(0).toUpperCase() + block.slice(1)}`).join('\n')}\n\n**Saturn\'s Ultimate Reward:**\nMastery of ${signFinancialTraits[saturnSign].financialLesson}. This becomes your greatest financial strength after age 29-30 (first Saturn return).`,
        },
        {
          title: `Pluto in ${plutoSign}: Transformative Wealth`,
          content: `Pluto represents transformation, power, and regeneration. In ${plutoSign}, you have the power to completely transform your finances through ${signFinancialTraits[plutoSign].earningStyle}.\n\nPluto aspects often indicate:\n• Potential for significant wealth transformation\n• Deep psychological relationship with money\n• Power dynamics around resources\n• Ability to regenerate after financial losses\n\n**Pluto\'s Financial Message:**\nYour relationship with money is a path to personal power. Facing financial fears transforms them into financial strength. Your ${plutoSign} Pluto suggests transformation through ${signFinancialTraits[plutoSign].investmentApproach}.`,
        },
      ],
    },
    {
      id: 'money-mindset',
      title: 'Your Money Mindset Profile',
      icon: '🧠',
      subsections: [
        {
          title: 'Your Unique Financial Psychology',
          content: `Based on your chart, your money mindset profile combines several energies:\n\n**Core Identity (Sun in ${sunSign}):**\n${sunFinance.moneyMindset}\n\n**Emotional Relationship (Moon in ${moonSign}):**\nYou feel financially secure when you have ${signFinancialTraits[moonSign].spendingPattern}. Emotional spending triggers: ${signFinancialTraits[moonSign].wealthBlocks[0]}.\n\n**Action Style (Mars in ${marsSign}):**\nYou pursue money ${signFinancialTraits[marsSign].moneyMindset}. Your earning energy is activated through ${signFinancialTraits[marsSign].earningStyle}.\n\n**Values & Attraction (Venus in ${venusSign}):**\n${venusFinance.moneyMindset}. You attract abundance through ${venusFinance.earningStyle}.`,
          visual: {
            type: 'element-balance',
            title: 'Your Financial Element Balance',
            data: {
              Fire: sunSign === 'Aries' || sunSign === 'Leo' || sunSign === 'Sagittarius' ? 30 : 10,
              Earth: venusSign === 'Taurus' || venusSign === 'Virgo' || venusSign === 'Capricorn' ? 35 : 15,
              Air: marsSign === 'Gemini' || marsSign === 'Libra' || marsSign === 'Aquarius' ? 25 : 10,
              Water: moonSign === 'Cancer' || moonSign === 'Scorpio' || moonSign === 'Pisces' ? 30 : 15,
            },
          },
        },
        {
          title: 'Abundance Blocks to Clear',
          content: `Your chart reveals these potential wealth blocks:\n\n${[sunFinance.wealthBlocks[0], venusFinance.wealthBlocks[0], signFinancialTraits[saturnSign].wealthBlocks[0]].map((block, i) => `**Block ${i + 1}**: ${block.charAt(0).toUpperCase() + block.slice(1)}\n*Healing*: Acknowledge this pattern when it arises. It\'s not truth—it\'s programming that can be changed.`).join('\n\n')}\n\n**Clearing Process:**\n1. Notice the block when it activates\n2. Question its validity\n3. Choose a different response\n4. Celebrate small financial wins\n5. Gradually reprogram through experience`,
          tip: `Abundance blocks are often inherited beliefs, not personal truth. Question every money belief you hold.`,
        },
      ],
    },
    {
      id: 'timing',
      title: 'Timing Your Financial Moves',
      icon: '📅',
      subsections: [
        {
          title: 'Planetary Timing for Wealth',
          content: `Certain times are better for financial decisions based on your chart:\n\n**Best Times for Income Increases:**\nWhen Jupiter transits your 2nd house (${secondHouseSign}) or aspects your natal Jupiter in ${jupiterSign}. Also favorable when the Sun moves through ${secondHouseSign}.\n\n**Best Times for Investments:**\nWhen planets transit your 8th house (${eighthHouseSign}) or when Jupiter and Saturn make supportive aspects to your natal chart.\n\n**Best Times for Career Moves:**\nWhen planets transit your 10th house (${tenthHouseSign}) or when Jupiter supports your Midheaven.\n\n**Caution Periods:**\nMercury retrograde (3-4 times yearly): Avoid signing major contracts\nEclipse seasons: Major financial decisions may have unexpected consequences\nSaturn transits: Require extra diligence but can build lasting structures`,
        },
        {
          title: 'Your Personal Financial Cycles',
          content: `Based on your chart, watch these cycles:\n\n**Annual Cycle:**\nYour financial energy peaks when the Sun transits ${sunSign} and ${secondHouseSign}. Plan major money moves during these periods.\n\n**Jupiter Cycle (12 years):**\nJupiter returns to ${jupiterSign} every 12 years, bringing financial expansion opportunities. Your next Jupiter return is a time of potential abundance increase.\n\n**Saturn Cycle (29 years):**\nSaturn returns to ${saturnSign} every 29 years, testing and ultimately strengthening your financial foundations. These periods require discipline but build lasting wealth.\n\n**Monthly Timing:**\nNew Moons in earth signs (Taurus, Virgo, Capricorn) are excellent for initiating financial plans. Full Moons illuminate financial situations for clarity.`,
        },
      ],
    },
    {
      id: 'wealth-path',
      title: 'Your Wealth Manifestation Path',
      icon: '🌟',
      subsections: [
        {
          title: 'Your Unique Prosperity Formula',
          content: `${userName}, your birth chart reveals a specific formula for creating wealth:\n\n**Step 1: Align with Your Values (Venus in ${venusSign})**\nMake money doing what you genuinely value. For you, this means ${venusFinance.earningStyle}.\n\n**Step 2: Take Inspired Action (Mars in ${marsSign})**\nPursue opportunities ${signFinancialTraits[marsSign].moneyMindset}. Your earning energy is activated through ${signFinancialTraits[marsSign].earningStyle}.\n\n**Step 3: Expand Through Faith (Jupiter in ${jupiterSign})**\nTrust in abundance and opportunities will appear. Your luck factor is strongest when you\'re ${jupiterFinance.moneyMindset}.\n\n**Step 4: Build with Discipline (Saturn in ${saturnSign})**\nCreate lasting structures through ${signFinancialTraits[saturnSign].earningStyle}. Remember: ${signFinancialTraits[saturnSign].financialLesson}.`,
        },
        {
          title: 'Daily Practices for Financial Abundance',
          content: `To activate your wealth potential:\n\n**Morning Practice:**\n• Set a financial intention aligned with ${sunSign} energy\n• Visualize abundance flowing to you through ${venusSign} activities\n• Affirm: "I am worthy of wealth because of who I am"\n\n**Throughout the Day:**\n• Make at least one ${marsSign}-style money move\n• Notice and release ${sunFinance.wealthBlocks[0]} patterns\n• Express gratitude for every form of abundance\n\n**Weekly Review:**\n• Track income and expenses (Saturn discipline)\n• Identify opportunities in ${jupiterSign} areas\n• Clear one small abundance block\n\n**Abundance Affirmation:**\n"I attract wealth through ${venusFinance.earningStyle}. I grow abundance through ${jupiterFinance.moneyMindset} energy. I build lasting prosperity with ${signFinancialTraits[saturnSign].moneyMindset} discipline. Money flows to me easily and naturally."`,
          tip: `Consistency in these practices creates compound results—just like compound interest.`,
        },
      ],
    },
    {
      id: 'entrepreneurship',
      title: 'Your Entrepreneurial Potential',
      icon: '🚀',
      subsections: [
        {
          title: 'Your Business-Building Profile',
          content: `${userName}, your chart reveals specific entrepreneurial strengths and the types of businesses most aligned with your cosmic blueprint.\n\n**Your Entrepreneurial Style (Sun in ${sunSign}):**\nAs a ${sunSign}, you approach business-building ${sunFinance.moneyMindset}. Your natural leadership style is ${signData[sunSign].element === 'Fire' ? 'visionary and inspiring—you\'re the type to launch bold ventures and rally others to your vision' : signData[sunSign].element === 'Earth' ? 'practical and building-focused—you excel at creating sustainable businesses with real value' : signData[sunSign].element === 'Air' ? 'innovative and networked—you thrive in businesses built on ideas, communication, and connections' : 'intuitive and service-oriented—you excel at businesses that serve emotional needs and create belonging'}.\n\n**Risk Tolerance (Mars in ${marsSign}):**\n${signFinancialTraits[marsSign].moneyMindset}. This affects how you approach business decisions, competition, and growth strategies. Your Mars suggests ${signFinancialTraits[marsSign].investmentApproach} when it comes to business investments.\n\n**Expansion Strategy (Jupiter in ${jupiterSign}):**\nYour business grows best through ${jupiterFinance.earningStyle}. Jupiter\'s placement suggests luck and expansion come through ${jupiterSign} activities and markets.`,
        },
        {
          title: 'Ideal Business Types for Your Chart',
          content: `Based on your planetary placements, these business models align with your natural strengths:\n\n**High Alignment Businesses:**\n${sunFinance.bestIndustries.slice(0, 3).map((ind, i) => `${i + 1}. **${ind}** - Resonates with your ${sunSign} Sun energy and ${secondHouseSign} earning style`).join('\n')}\n\n**Supporting Business Activities:**\n${venusFinance.bestIndustries.slice(0, 2).map(ind => `• ${ind} - Aligned with your Venus values in ${venusSign}`).join('\n')}\n\n**Growth Opportunities:**\n${jupiterFinance.bestIndustries.slice(0, 2).map(ind => `• ${ind} - Jupiter expansion zones where "luck" meets preparation`).join('\n')}\n\n**Business Structure Advice:**\nWith Saturn in ${saturnSign}, your business needs solid ${signFinancialTraits[saturnSign].investmentApproach} foundations. Don\'t skip the structure—your Saturn rewards thoroughness with longevity.\n\n**Partnership Potential:**\nYour 8th house in ${eighthHouseSign} suggests you ${signData[eighthHouseSign].element === 'Fire' ? 'may prefer to go solo or lead partnerships with clear vision control' : signData[eighthHouseSign].element === 'Earth' ? 'can thrive in partnerships when there are clear agreements and shared practical goals' : signData[eighthHouseSign].element === 'Air' ? 'benefit from intellectual partnerships and shared idea development' : 'need deep trust before entering financial partnerships, but can create powerful unions when trust is established'}.`,
          tip: `The best business for you combines your Sun sign passion, Venus values, and Jupiter expansion zones.`,
        },
        {
          title: 'Entrepreneurial Challenges to Navigate',
          content: `Every chart has entrepreneurial challenges. Yours include:\n\n**Challenge 1: ${sunFinance.wealthBlocks[0]}**\nThis tendency can sabotage business success by ${signData[sunSign].element === 'Fire' ? 'causing premature action or burnout' : signData[sunSign].element === 'Earth' ? 'creating resistance to necessary pivots' : signData[sunSign].element === 'Air' ? 'scattering focus across too many ideas' : 'letting emotions override business logic'}.\n*Solution*: Build in checkpoints and accountability structures.\n\n**Challenge 2: ${signFinancialTraits[saturnSign].wealthBlocks[0]}**\nSaturn\'s lessons in business often involve overcoming this pattern.\n*Solution*: ${signFinancialTraits[saturnSign].financialLesson} - apply this directly to your business development.\n\n**Challenge 3: ${signFinancialTraits[marsSign].wealthBlocks[0]}**\nYour action-taking style can sometimes lead to this pitfall.\n*Solution*: Channel your ${marsSign} Mars energy into ${signFinancialTraits[marsSign].abundanceGifts[0]}.\n\n**The Entrepreneurial Edge:**\nRemember, every challenge is also a potential strength. ${sunSign} entrepreneurs who master their shadows often outperform those with "easier" placements because they\'ve developed conscious awareness of their patterns.`,
        },
      ],
    },
    {
      id: 'career-path',
      title: 'Career & Income Development',
      icon: '📈',
      subsections: [
        {
          title: 'Your Career Evolution Path',
          content: `Your chart reveals a natural career evolution that builds wealth over time:\n\n**Phase 1: Foundation Building (ages 18-28)**\nFocus on developing ${sunSign} core competencies and ${signFinancialTraits[saturnSign].earningStyle}. This period is about learning, making mistakes, and building foundational skills. Income grows slowly but importantly.\n\n**Phase 2: Establishment (ages 29-40)**\nAfter your Saturn Return, career direction clarifies. This is the time to establish yourself in ${tenthHouseSign} career expressions and ${sunFinance.bestIndustries[0]} domains. Income potential increases significantly when aligned with your chart.\n\n**Phase 3: Authority (ages 40-55)**\nYour Jupiter cycle supports becoming an authority in your field. ${jupiterSign} themes become central to your career identity. This is often peak earning time, especially if you\'ve done your Saturn work.\n\n**Phase 4: Legacy (ages 55+)**\nWealth focus shifts from accumulation to meaning and legacy. Your 8th house in ${eighthHouseSign} becomes more active—themes of inheritance, investments, and transforming wealth for future generations.`,
        },
        {
          title: 'Income Streams for Your Chart',
          content: `Diversified income aligned with your chart:\n\n**Primary Income (2nd House ${secondHouseSign}):**\nYour main income stream should involve ${secondHouseFinance.earningStyle}. This is where consistent, reliable income flows best.\n\n**Secondary Income (10th House ${tenthHouseSign}):**\nCareer advancement and authority bring increased income through ${tenthHouseFinance.earningStyle}. Consider consulting, speaking, or leadership roles.\n\n**Passive Income (8th House ${eighthHouseSign}):**\nYour potential for passive income flows through ${signFinancialTraits[eighthHouseSign].investmentApproach}. Types to consider:\n${signData[eighthHouseSign].element === 'Fire' ? '• Growth investments, startups, venture opportunities' : signData[eighthHouseSign].element === 'Earth' ? '• Real estate, dividend stocks, tangible assets' : signData[eighthHouseSign].element === 'Air' ? '• Intellectual property, licensing, technology investments' : '• Investment partnerships, estate planning, trust structures'}\n\n**Jupiter Bonus Income (${jupiterSign}):**\nLuck-based or expansion income comes through ${jupiterFinance.bestIndustries.slice(0, 2).join(' and ')}. Watch for "lucky breaks" in these areas.`,
          tip: `Multiple income streams provide security; diverse income aligned with your chart provides prosperity AND fulfillment.`,
        },
        {
          title: 'Negotiation & Value Communication',
          content: `Your chart reveals how to communicate your value effectively:\n\n**Negotiation Style (Mars in ${marsSign}):**\nYou negotiate best when you\'re ${signFinancialTraits[marsSign].moneyMindset}. Avoid ${signFinancialTraits[marsSign].wealthBlocks[0]} during negotiations—it undermines your power.\n\n**Presenting Value (Venus in ${venusSign}):**\nYour value proposition resonates when framed around ${venusFinance.earningStyle}. Lead with what you genuinely offer, aligned with your Venus values.\n\n**Building Credibility (Saturn in ${saturnSign}):**\nYour authority grows through ${signFinancialTraits[saturnSign].earningStyle}. Don\'t expect overnight recognition—Saturn rewards consistent demonstration over time.\n\n**Asking for More:**\nWith your ${sunSign} Sun and ${secondHouseSign} second house, you\'re most effective asking for raises/higher fees when:\n• You can demonstrate ${sunSign} achievements\n• You\'ve built ${saturnSign} credibility\n• You present during favorable planetary timing\n• You genuinely believe in your worth (self-worth work amplifies income)\n\n**Your Power Phrases:**\n"I bring ${sunSign} qualities of ${signData[sunSign].keywords.slice(0, 2).join(' and ')} to every project."\n"My approach of ${venusFinance.earningStyle} creates unique value."\n"I have a track record of ${secondHouseFinance.earningStyle}."`,
        },
      ],
    },
    {
      id: 'financial-relationships',
      title: 'Money & Relationships',
      icon: '💑',
      subsections: [
        {
          title: 'Your Financial Partnership Style',
          content: `Money in relationships is governed by your 8th house (${eighthHouseSign}) and Venus (${venusSign}). Understanding these helps navigate shared finances.\n\n**Your 8th House Style in Joint Finances:**\n${eighthHouseSign} energy in your house of shared resources suggests you approach joint finances ${signFinancialTraits[eighthHouseSign].moneyMindset}. In partnerships, you tend to:\n• ${signData[eighthHouseSign].element === 'Fire' ? 'Take initiative in financial decisions, sometimes without full consultation' : signData[eighthHouseSign].element === 'Earth' ? 'Want clear agreements, shared goals, and practical financial plans' : signData[eighthHouseSign].element === 'Air' ? 'Prefer discussing all options and keeping things fair and balanced' : 'Need emotional trust before financial merging, may avoid money conversations'}\n\n**Venus Values in Partnership:**\nYour Venus in ${venusSign} needs ${venusFinance.spendingPattern} to feel satisfied in relationships. Financial stress in partnerships often connects to Venus values not being honored.\n\n**Potential Friction Points:**\nIn partnerships, watch for ${signFinancialTraits[eighthHouseSign].wealthBlocks[0]} and ${venusFinance.wealthBlocks[0]}. These patterns can create money conflicts in relationships.`,
        },
        {
          title: 'Harmonizing Finances With Partners',
          content: `To create financial harmony in relationships:\n\n**Communicate Your Needs:**\nExpress your ${venusSign} Venus values clearly. "I feel secure when we..." "I value spending on..." "What matters to me financially is..."\n\n**Honor Different Styles:**\nYour partner may have a different financial blueprint. Neither is wrong—they need integration. Your ${secondHouseSign} earning style and ${eighthHouseSign} sharing style can complement many other placements when approached consciously.\n\n**Create Structure (Saturn):**\nYour Saturn in ${saturnSign} suggests successful joint finances require ${signFinancialTraits[saturnSign].investmentApproach} structures. Regular money conversations, clear agreements, and shared goals provide security.\n\n**Maintain Individual Resources:**\nEven in partnership, your 2nd house in ${secondHouseSign} needs expression. Keep some individual financial identity—it supports self-worth and relationship health.\n\n**Joint Investment Strategy:**\nFor joint investments, honor both charts. Your ${eighthHouseSign} 8th house suggests ${signFinancialTraits[eighthHouseSign].investmentApproach}. Discuss how this aligns with your partner\'s approach.`,
        },
        {
          title: 'Financial Inheritance & Family Money',
          content: `The 8th house also governs inheritance and family money patterns. With ${eighthHouseSign} here:\n\n**Inheritance Potential:**\nYour approach to inheritance is ${signFinancialTraits[eighthHouseSign].moneyMindset}. You may receive, manage, or transform inherited resources in ways aligned with this energy.\n\n**Family Money Patterns:**\nYou likely inherited financial beliefs from your family. Your ${moonSign} Moon suggests childhood financial atmosphere was ${signFinancialTraits[moonSign].moneyMindset}. These early patterns still influence you.\n\n**Breaking Generational Patterns:**\nTo evolve your family\'s financial karma:\n• Identify the inherited money beliefs (Moon in ${moonSign})\n• Recognize which no longer serve you\n• Consciously choose new beliefs aligned with your chart\'s potential\n• Create new family financial culture if you have children\n\n**Leaving Legacy:**\nYour chart suggests legacy through ${tenthHouseSign} career achievements and ${eighthHouseSign} shared resources. Consider how you want to be remembered financially—what values do you want to pass on?\n\nThe wealth you create isn\'t just for you—it\'s for everyone your life touches, and potentially generations to come.`,
          tip: `Financial karma often runs through families. You have the power to transform these patterns.`,
        },
      ],
    },
  ]

  const wordCount = sections.reduce((acc, s) =>
    acc + s.subsections.reduce((a, sub) => a + sub.content.split(' ').length, 0), 0)

  return {
    id: `financial-potential-${Date.now()}`,
    slug: 'financial-potential',
    title: 'Financial Potential Report',
    generatedAt: new Date().toISOString(),
    userName,
    birthData: {
      date: '',
      place: '',
      sunSign,
      moonSign,
      risingSign,
    },
    summary: {
      headline: `A Wealth Blueprint of ${secondHouseSign} Earning & ${jupiterSign} Expansion`,
      overview: `${userName}, your financial potential is written in the stars. With ${secondHouseSign} ruling your income, ${jupiterSign} Jupiter expanding opportunities, and ${saturnSign} Saturn building discipline, you have a unique formula for creating lasting wealth. Your path involves ${sunFinance.earningStyle} while mastering ${signFinancialTraits[saturnSign].financialLesson}.`,
      keyStrengths: [
        `Natural ability: ${sunFinance.abundanceGifts[0]}`,
        `Attraction power: ${venusFinance.abundanceGifts[0]}`,
        `Expansion through: ${jupiterFinance.abundanceGifts[0]}`,
        `Earning style: ${secondHouseFinance.earningStyle.slice(0, 50)}...`,
      ],
      growthAreas: [
        `Clear block: ${sunFinance.wealthBlocks[0]}`,
        `Release: ${venusFinance.wealthBlocks[0]}`,
        `Master: ${signFinancialTraits[saturnSign].financialLesson}`,
        `Transform: relationship with ${eighthHouseSign} financial energy`,
      ],
    },
    visuals: [
      {
        type: 'planetary-strength',
        title: 'Your Financial Houses',
        data: {
          'Personal Income (2nd)': secondHouseSign,
          'Investments (8th)': eighthHouseSign,
          'Career (10th)': tenthHouseSign,
        },
      },
    ],
    sections,
    glossary: [
      { term: '2nd House', definition: 'The area of your chart governing personal income, possessions, and self-worth.' },
      { term: '8th House', definition: 'The area governing shared resources, investments, inheritance, and financial transformation.' },
      { term: '10th House', definition: 'The career house, ruling public reputation and professional earning power.' },
      { term: 'Jupiter', definition: 'The planet of expansion and luck—shows where abundance flows easily.' },
      { term: 'Saturn', definition: 'The planet of discipline and mastery—shows financial lessons and long-term wealth building.' },
    ],
    wordCount: wordCount + 400,
  }
}

function getHouseSign(rising: Sign, house: number): Sign {
  const signs: Sign[] = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces']
  const risingIndex = signs.indexOf(rising)
  return signs[(risingIndex + house - 1) % 12]
}

// ============================================
// DEEP PARTNER COMPATIBILITY REPORT GENERATOR
// ============================================

export function generatePartnerCompatibilityReportV2(
  chart: NatalChart,
  userName: string,
  partnerChart: NatalChart,
  partnerName: string
): GeneratedReportV2 {
  // Get both people's placements
  const userSun = getPlacement(chart, 'sun')
  const userMoon = getPlacement(chart, 'moon')
  const userVenus = getPlacement(chart, 'venus')
  const userMars = getPlacement(chart, 'mars')
  const userMercury = getPlacement(chart, 'mercury')
  const userSaturn = getPlacement(chart, 'saturn')

  const partnerSun = getPlacement(partnerChart, 'sun')
  const partnerMoon = getPlacement(partnerChart, 'moon')
  const partnerVenus = getPlacement(partnerChart, 'venus')
  const partnerMars = getPlacement(partnerChart, 'mars')
  const partnerMercury = getPlacement(partnerChart, 'mercury')
  const partnerSaturn = getPlacement(partnerChart, 'saturn')

  const userSunSign = capitalizeSign(userSun?.sign || 'aries')
  const userMoonSign = capitalizeSign(userMoon?.sign || 'aries')
  const userVenusSign = capitalizeSign(userVenus?.sign || 'taurus')
  const userMarsSign = capitalizeSign(userMars?.sign || 'aries')
  const userMercurySign = capitalizeSign(userMercury?.sign || 'gemini')
  const userRisingSign = capitalizeSign(chart.ascendant?.sign || 'aries')

  const partnerSunSign = capitalizeSign(partnerSun?.sign || 'aries')
  const partnerMoonSign = capitalizeSign(partnerMoon?.sign || 'aries')
  const partnerVenusSign = capitalizeSign(partnerVenus?.sign || 'taurus')
  const partnerMarsSign = capitalizeSign(partnerMars?.sign || 'aries')
  const partnerMercurySign = capitalizeSign(partnerMercury?.sign || 'gemini')
  const partnerRisingSign = capitalizeSign(partnerChart.ascendant?.sign || 'aries')
  const userSaturnSign = capitalizeSign(userSaturn?.sign || 'capricorn')
  const partnerSaturnSign = capitalizeSign(partnerSaturn?.sign || 'capricorn')

  // Calculate element compatibility
  const userElements = getElementBalance(chart)
  const partnerElements = getElementBalance(partnerChart)

  // Calculate composite midpoints (simplified)
  const compositeSunSign = getMidpointSign(userSunSign, partnerSunSign)
  const compositeMoonSign = getMidpointSign(userMoonSign, partnerMoonSign)
  const compositeVenusSign = getMidpointSign(userVenusSign, partnerVenusSign)

  // Aspect compatibility scores (simplified)
  const sunMoonCompatibility = getSignCompatibilityScore(userSunSign, partnerMoonSign)
  const moonMoonCompatibility = getSignCompatibilityScore(userMoonSign, partnerMoonSign)
  const venusMarsCompatibility = getSignCompatibilityScore(userVenusSign, partnerMarsSign)
  const sunSunCompatibility = getSignCompatibilityScore(userSunSign, partnerSunSign)

  const overallScore = Math.round((sunMoonCompatibility + moonMoonCompatibility + venusMarsCompatibility + sunSunCompatibility) / 4)

  const sections: ReportSectionV2[] = [
    {
      id: 'partnership-overview',
      title: 'Your Partnership Overview',
      icon: '💑',
      subsections: [
        {
          title: 'The Cosmic Story of Your Connection',
          content: `${userName} and ${partnerName}, your birth charts reveal a unique cosmic connection—a relationship with its own personality, purpose, and potential. This report explores both the synastry (how your individual charts interact) and the composite (the chart of your relationship itself).\n\nAt first glance, we see a ${userSunSign} Sun meeting a ${partnerSunSign} Sun—a connection between ${signData[userSunSign].archetype} and ${signData[partnerSunSign].archetype} energies. But the real story goes much deeper.\n\nYour relationship has significant strengths in ${sunMoonCompatibility > 70 ? 'emotional attunement' : 'complementary differences'}, with ${venusMarsCompatibility > 70 ? 'strong romantic chemistry' : 'a steady building attraction'}. The composite chart suggests your relationship\'s purpose involves ${signData[compositeSunSign].lifeLesson.toLowerCase()}.`,
          visual: {
            type: 'planetary-strength',
            title: 'Compatibility Scores',
            data: {
              'Sun-Moon Bond': `${sunMoonCompatibility}%`,
              'Emotional Match': `${moonMoonCompatibility}%`,
              'Romantic Chemistry': `${venusMarsCompatibility}%`,
              'Identity Harmony': `${sunSunCompatibility}%`,
              'Overall': `${overallScore}%`,
            },
          },
        },
        {
          title: 'What Makes This Connection Unique',
          content: `Every relationship is one-of-a-kind, and yours is no exception. Here\'s what makes your bond special:\n\n**${userName}\'s Contribution:**\n• Brings ${signData[userSunSign].giftToWorld.toLowerCase()}\n• Offers emotional ${signData[userMoonSign].keywords[0]} and ${signData[userMoonSign].keywords[1]}\n• Expresses love through ${signData[userVenusSign].keywords[0]} and ${signData[userVenusSign].keywords[1]} gestures\n\n**${partnerName}\'s Contribution:**\n• Brings ${signData[partnerSunSign].giftToWorld.toLowerCase()}\n• Offers emotional ${signData[partnerMoonSign].keywords[0]} and ${signData[partnerMoonSign].keywords[1]}\n• Expresses love through ${signData[partnerVenusSign].keywords[0]} and ${signData[partnerVenusSign].keywords[1]} gestures\n\n**Together You Create:**\nA relationship entity with a ${compositeSunSign} Sun nature—one that is ${signData[compositeSunSign].keywords.join(', ')} at its core.`,
          terms: [
            { term: 'Synastry', definition: 'The comparison of two birth charts to understand relationship dynamics.' },
            { term: 'Composite Chart', definition: 'A single chart created from the midpoints of two charts, representing the relationship as its own entity.' },
          ],
        },
      ],
    },
    {
      id: 'composite-chart',
      title: 'Your Composite Chart: The Relationship Entity',
      icon: '🌟',
      subsections: [
        {
          title: `Composite Sun in ${compositeSunSign}: Your Relationship\'s Identity`,
          content: `When your individual charts combine, they create a third entity—your relationship itself. This composite chart has its own Sun sign, revealing what your partnership is fundamentally "about."\n\nYour Composite Sun in ${compositeSunSign} means your relationship\'s core identity is ${signData[compositeSunSign].keywords.join(', ')}. The relationship thrives when it embodies ${signData[compositeSunSign].archetype} energy.\n\n**Your Relationship\'s Purpose:**\n${signData[compositeSunSign].lifeLesson}\n\n**Your Relationship\'s Gift to Each Other:**\n${signData[compositeSunSign].giftToWorld}\n\n**The Relationship\'s Shadow:**\nWhen stressed, the relationship may express ${signData[compositeSunSign].shadowSide.toLowerCase()}. Awareness of this tendency helps you navigate it consciously.`,
        },
        {
          title: `Composite Moon in ${compositeMoonSign}: Your Emotional Foundation`,
          content: `The Composite Moon reveals the emotional tone of your relationship—what you need to feel safe together, and how you naturally nurture each other.\n\nWith a Composite Moon in ${compositeMoonSign}, your relationship feels most secure when it\'s ${signData[compositeMoonSign].keywords.join(', ')}. You instinctively create a home environment that reflects ${compositeMoonSign} energy.\n\n**Your Emotional Needs as a Couple:**\n${signData[compositeMoonSign].strengths.map(s => `• ${s}`).join('\n')}\n\n**Watch For:**\n${signData[compositeMoonSign].challenges.map(c => `• ${c}`).join('\n')}\n\nThe Composite Moon is where you retreat to feel safe together. Honor these needs, and your emotional bond deepens.`,
        },
        {
          title: `Composite Venus in ${compositeVenusSign}: How You Love Together`,
          content: `Composite Venus shows how your relationship expresses love, what you value together, and what brings you shared pleasure.\n\nWith Composite Venus in ${compositeVenusSign}, you express love as a couple through ${signData[compositeVenusSign].keywords.join(', ')} gestures. You\'re naturally drawn to ${signData[compositeVenusSign].archetype.toLowerCase()} experiences together.\n\n**What You Enjoy Together:**\n${signData[compositeVenusSign].strengths.slice(0, 3).map(s => `• ${s}`).join('\n')}\n\n**Your Shared Values:**\nAs a couple, you value ${signData[compositeVenusSign].keywords[0]} and ${signData[compositeVenusSign].keywords[1]}. When these values are honored, romance flourishes.\n\n**Romance Tips:**\n• Plan dates that incorporate ${compositeVenusSign} energy\n• Express appreciation in ${signData[compositeVenusSign].keywords[0]} ways\n• Create beauty together that reflects your shared aesthetic`,
        },
      ],
    },
    {
      id: 'sun-moon-connections',
      title: 'Sun & Moon Connections',
      icon: '☀️',
      subsections: [
        {
          title: `${userName}\'s Sun (${userSunSign}) & ${partnerName}\'s Moon (${partnerMoonSign})`,
          content: `This is one of the most important connections in synastry—${userName}\'s core identity meeting ${partnerName}\'s emotional needs.\n\n**The Dynamic:**\n${userName} expresses their ${userSunSign} identity—${signData[userSunSign].keywords.join(', ')}. ${partnerName}\'s ${partnerMoonSign} Moon needs ${signData[partnerMoonSign].keywords.join(', ')} to feel secure.\n\n**Compatibility Score: ${sunMoonCompatibility}%**\n\n${sunMoonCompatibility > 70
            ? `This is a naturally supportive connection. ${userName}\'s way of being resonates with what ${partnerName} needs emotionally. ${partnerName} feels seen and valued by ${userName}\'s authentic self-expression.`
            : sunMoonCompatibility > 50
            ? `This connection requires some adjustment. ${userName}\'s natural expression differs from what ${partnerName} instinctively needs, but this difference can promote growth if approached with awareness.`
            : `This connection presents challenges that, when worked through, create deep growth. ${userName} and ${partnerName} are invited to stretch beyond their comfort zones to meet each other.`}`,
        },
        {
          title: `${partnerName}\'s Sun (${partnerSunSign}) & ${userName}\'s Moon (${userMoonSign})`,
          content: `The reverse connection—${partnerName}\'s core identity meeting ${userName}\'s emotional needs.\n\n**The Dynamic:**\n${partnerName} expresses their ${partnerSunSign} identity—${signData[partnerSunSign].keywords.join(', ')}. ${userName}\'s ${userMoonSign} Moon needs ${signData[userMoonSign].keywords.join(', ')} to feel secure.\n\n**How This Plays Out:**\n${getSignCompatibilityScore(partnerSunSign, userMoonSign) > 70
            ? `${partnerName}\'s natural way of being provides what ${userName} needs emotionally. This creates a sense of safety and belonging for ${userName}.`
            : `${partnerName}\'s expression and ${userName}\'s emotional needs operate differently. This isn\'t incompatibility—it\'s an invitation to expand how both partners give and receive.`}\n\n**Nurturing This Connection:**\n• ${partnerName}: Express your ${partnerSunSign} nature while being aware of ${userName}\'s ${userMoonSign} needs\n• ${userName}: Communicate your emotional needs clearly; ${partnerName} wants to meet them`,
        },
        {
          title: `Moon-Moon Connection: Emotional Resonance`,
          content: `The Moon-Moon aspect reveals how naturally your emotional natures sync—how easily you understand each other\'s feelings and create emotional safety together.\n\n**${userName}\'s Moon in ${userMoonSign}:**\n• Needs: ${signData[userMoonSign].keywords.slice(0, 2).join(', ')}\n• Processes emotions: ${signData[userMoonSign].element === 'Water' ? 'deeply and intuitively' : signData[userMoonSign].element === 'Fire' ? 'quickly and expressively' : signData[userMoonSign].element === 'Earth' ? 'steadily and practically' : 'mentally and analytically'}\n\n**${partnerName}\'s Moon in ${partnerMoonSign}:**\n• Needs: ${signData[partnerMoonSign].keywords.slice(0, 2).join(', ')}\n• Processes emotions: ${signData[partnerMoonSign].element === 'Water' ? 'deeply and intuitively' : signData[partnerMoonSign].element === 'Fire' ? 'quickly and expressively' : signData[partnerMoonSign].element === 'Earth' ? 'steadily and practically' : 'mentally and analytically'}\n\n**Emotional Compatibility: ${moonMoonCompatibility}%**\n\n${signData[userMoonSign].element === signData[partnerMoonSign].element
            ? `Sharing the same element (${signData[userMoonSign].element}), you naturally understand each other\'s emotional language. You process feelings similarly and instinctively know how to comfort each other.`
            : `With different emotional elements, you offer each other new ways of feeling and processing. ${userName} teaches ${partnerName} about ${signData[userMoonSign].element} emotional wisdom; ${partnerName} teaches ${userName} about ${signData[partnerMoonSign].element} emotional intelligence.`}`,
          tip: `When emotional conflicts arise, remember your partner processes feelings through a different element. Neither way is wrong—they\'re just different.`,
        },
      ],
    },
    {
      id: 'venus-mars',
      title: 'Venus & Mars: Love & Desire',
      icon: '💕',
      subsections: [
        {
          title: `${userName}\'s Venus (${userVenusSign}) & ${partnerName}\'s Mars (${partnerMarsSign})`,
          content: `Venus-Mars connections create romantic and physical chemistry. ${userName}\'s Venus (what they find attractive) meeting ${partnerName}\'s Mars (how they pursue and assert) creates a specific dynamic.\n\n**${userName} is attracted to:**\n${signData[userVenusSign].keywords.join(', ')}\n\n**${partnerName} pursues through:**\n${signData[partnerMarsSign].keywords.join(', ')}\n\n**Chemistry Score: ${venusMarsCompatibility}%**\n\n${venusMarsCompatibility > 70
            ? `Strong natural chemistry! ${partnerName}\'s pursuit style naturally appeals to what ${userName} finds attractive. This creates a classic romantic dynamic where ${partnerName}\'s assertiveness is well-received.`
            : venusMarsCompatibility > 50
            ? `Moderate chemistry that can deepen with understanding. ${partnerName}\'s Mars style isn\'t exactly what ${userName}\'s Venus expects, but this creates intrigue and the opportunity to expand attraction.`
            : `This combination creates a slow-building attraction. Initial chemistry may not be fireworks, but deeper connection develops through appreciation of differences.`}`,
        },
        {
          title: `${partnerName}\'s Venus (${partnerVenusSign}) & ${userName}\'s Mars (${userMarsSign})`,
          content: `The reverse Venus-Mars dynamic—what ${partnerName} is attracted to, and how ${userName} pursues.\n\n**${partnerName} is attracted to:**\n${signData[partnerVenusSign].keywords.join(', ')}\n\n**${userName} pursues through:**\n${signData[userMarsSign].keywords.join(', ')}\n\n**Chemistry Score: ${getSignCompatibilityScore(partnerVenusSign, userMarsSign)}%**\n\n${getSignCompatibilityScore(partnerVenusSign, userMarsSign) > 70
            ? `${userName}\'s way of pursuing and asserting naturally appeals to ${partnerName}. This creates a satisfying dynamic where ${userName} feels capable of winning ${partnerName}\'s heart.`
            : `${userName} may need to adjust their pursuit style to match what ${partnerName} finds attractive. This isn\'t about changing who you are—it\'s about learning your partner\'s romantic language.`}\n\n**Keeping the Spark Alive:**\n• ${userName}: Express your Mars through activities ${partnerName}\'s Venus appreciates\n• ${partnerName}: Show ${userName} that their pursuit style is valued\n• Both: Maintain the chase even in long-term commitment`,
        },
        {
          title: 'Physical & Romantic Chemistry',
          content: `The overall romantic and physical connection between you combines multiple factors:\n\n**Attraction Style:**\n${userName}: Attracted to ${signData[userVenusSign].archetype.toLowerCase()} energy; gives love through ${signData[userVenusSign].keywords[0]}\n${partnerName}: Attracted to ${signData[partnerVenusSign].archetype.toLowerCase()} energy; gives love through ${signData[partnerVenusSign].keywords[0]}\n\n**Desire Style:**\n${userName}: Pursues ${signData[userMarsSign].keywords[0]} way; aroused by ${signData[userMarsSign].keywords[1]}\n${partnerName}: Pursues ${signData[partnerMarsSign].keywords[0]} way; aroused by ${signData[partnerMarsSign].keywords[1]}\n\n**Enhancing Physical Connection:**\n• Create dates that satisfy both Venus signs\n• Allow both Mars signs to express assertion\n• Communicate about desires openly\n• Remember: chemistry is built, not just found\n\n**Overall Physical Compatibility:**\nYour Venus-Mars interplay suggests ${venusMarsCompatibility > 70 ? 'natural, easy chemistry that sustains over time' : venusMarsCompatibility > 50 ? 'chemistry that deepens as you learn each other' : 'a connection that rewards patience and communication'}.`,
        },
      ],
    },
    {
      id: 'mercury-communication',
      title: 'Mercury: Communication Dynamics',
      icon: '💬',
      subsections: [
        {
          title: 'How You Think & Communicate',
          content: `Mercury governs how we think, process information, and communicate. Understanding your Mercury connection helps you communicate more effectively.\n\n**${userName}\'s Mercury in ${userMercurySign}:**\n• Thinks: ${signData[userMercurySign].element === 'Fire' ? 'intuitively, in big pictures' : signData[userMercurySign].element === 'Earth' ? 'practically, in concrete terms' : signData[userMercurySign].element === 'Air' ? 'logically, in concepts and ideas' : 'emotionally, in feelings and impressions'}\n• Communicates: ${signData[userMercurySign].keywords.slice(0, 2).join(', ')}\n• Needs in conversation: ${signData[userMercurySign].modality === 'Cardinal' ? 'directness and initiative' : signData[userMercurySign].modality === 'Fixed' ? 'depth and consistency' : 'variety and flexibility'}\n\n**${partnerName}\'s Mercury in ${partnerMercurySign}:**\n• Thinks: ${signData[partnerMercurySign].element === 'Fire' ? 'intuitively, in big pictures' : signData[partnerMercurySign].element === 'Earth' ? 'practically, in concrete terms' : signData[partnerMercurySign].element === 'Air' ? 'logically, in concepts and ideas' : 'emotionally, in feelings and impressions'}\n• Communicates: ${signData[partnerMercurySign].keywords.slice(0, 2).join(', ')}\n• Needs in conversation: ${signData[partnerMercurySign].modality === 'Cardinal' ? 'directness and initiative' : signData[partnerMercurySign].modality === 'Fixed' ? 'depth and consistency' : 'variety and flexibility'}`,
        },
        {
          title: 'Communication Compatibility',
          content: `**Communication Score: ${getSignCompatibilityScore(userMercurySign, partnerMercurySign)}%**\n\n${signData[userMercurySign].element === signData[partnerMercurySign].element
            ? `Sharing the same Mercury element (${signData[userMercurySign].element}), you naturally "get" each other\'s thinking process. Conversations flow easily, and you understand each other\'s mental shortcuts.`
            : `With different Mercury elements, you think and communicate differently. This can lead to misunderstandings but also to valuable complementarity—you see things the other misses.`}\n\n**Communication Strengths:**\n• ${userName} brings ${signData[userMercurySign].strengths[0].toLowerCase()} to conversations\n• ${partnerName} brings ${signData[partnerMercurySign].strengths[0].toLowerCase()} to conversations\n\n**Watch For:**\n• ${userName} may need: ${signData[userMercurySign].element === 'Water' || signData[userMercurySign].element === 'Earth' ? 'more processing time' : 'faster mental stimulation'}\n• ${partnerName} may need: ${signData[partnerMercurySign].element === 'Water' || signData[partnerMercurySign].element === 'Earth' ? 'more processing time' : 'faster mental stimulation'}`,
          tip: `When conversations go sideways, check if you\'re speaking different Mercury languages. Slow down and translate.`,
        },
      ],
    },
    {
      id: 'saturn-commitment',
      title: 'Saturn: Commitment & Longevity',
      icon: '🪐',
      subsections: [
        {
          title: 'Saturn Connections: The Glue of Long-Term Partnership',
          content: `Saturn aspects between charts reveal the staying power of a relationship—the ability to commit, build together, and weather challenges.\n\n**${userName}\'s Saturn in ${capitalizeSign(userSaturn?.sign || 'capricorn')}:**\n• Commitment style: ${signData[capitalizeSign(userSaturn?.sign || 'capricorn')].keywords[0]}, ${signData[capitalizeSign(userSaturn?.sign || 'capricorn')].keywords[1]}\n• What they need for security: ${signData[capitalizeSign(userSaturn?.sign || 'capricorn')].strengths[0]}\n\n**${partnerName}\'s Saturn in ${capitalizeSign(partnerSaturn?.sign || 'capricorn')}:**\n• Commitment style: ${signData[capitalizeSign(partnerSaturn?.sign || 'capricorn')].keywords[0]}, ${signData[capitalizeSign(partnerSaturn?.sign || 'capricorn')].keywords[1]}\n• What they need for security: ${signData[capitalizeSign(partnerSaturn?.sign || 'capricorn')].strengths[0]}\n\nSaturn connections can feel heavy but are essential for lasting partnership. They create the structure that holds a relationship together through life\'s challenges.`,
        },
        {
          title: 'Building a Lasting Foundation',
          content: `For long-term success, your relationship needs:\n\n**Structure:**\nCreate shared routines, rituals, and commitments that both Saturn placements can respect.\n\n**Responsibility:**\nDivide responsibilities in ways that honor both your Saturn needs. ${userName} may prefer ${signData[capitalizeSign(userSaturn?.sign || 'capricorn')].modality === 'Cardinal' ? 'initiating projects' : signData[capitalizeSign(userSaturn?.sign || 'capricorn')].modality === 'Fixed' ? 'maintaining stability' : 'adapting as needed'}. ${partnerName} may prefer ${signData[capitalizeSign(partnerSaturn?.sign || 'capricorn')].modality === 'Cardinal' ? 'initiating projects' : signData[capitalizeSign(partnerSaturn?.sign || 'capricorn')].modality === 'Fixed' ? 'maintaining stability' : 'adapting as needed'}.\n\n**Growth:**\nSaturn asks: "Are you both growing?" A relationship without growth stagnates. Keep challenging each other to be better while supporting the process.\n\n**Time:**\nSaturn-influenced connections often improve with time. The first few years may feel like work, but the payoff is a deeply stable bond.`,
        },
      ],
    },
    {
      id: 'karmic-connections',
      title: 'Karmic & Past Life Connections',
      icon: '🔮',
      subsections: [
        {
          title: 'Signs of Soul Connection',
          content: `Certain indicators in synastry suggest past life connections—souls who have traveled together before and have unfinished business or continued learning.\n\n**Your Karmic Indicators:**\n• Sun-Moon connections: ${sunMoonCompatibility > 60 ? 'Strong soul recognition present' : 'Building new soul connection in this life'}\n• Saturn aspects: ${userName}\'s Saturn may teach ${partnerName} about ${signData[capitalizeSign(userSaturn?.sign || 'capricorn')].lifeLesson.toLowerCase()}\n• Node connections: Past life meeting future direction\n\n**Past Life Themes:**\nBased on your chart combination, you may have shared past lives involving ${signData[userSunSign].archetype.toLowerCase()} and ${signData[partnerSunSign].archetype.toLowerCase()} dynamics. The current life continues this soul work with new opportunities for resolution and growth.`,
        },
        {
          title: 'Your Soul Contract',
          content: `Every significant relationship involves a soul contract—an agreement made between lifetimes about what you\'ll learn together.\n\n**What You\'re Here to Learn Together:**\n• ${userName} learns from ${partnerName}: ${signData[partnerSunSign].giftToWorld.toLowerCase()}\n• ${partnerName} learns from ${userName}: ${signData[userSunSign].giftToWorld.toLowerCase()}\n\n**Your Relationship\'s Higher Purpose:**\nBased on your composite Sun in ${compositeSunSign}, your relationship exists to ${signData[compositeSunSign].lifeLesson.toLowerCase()}. When you fulfill this purpose, both of you evolve—and your relationship becomes a gift to everyone who witnesses it.\n\n**Honoring the Contract:**\n• Show up fully as yourselves\n• Allow each other to change and grow\n• Face challenges as opportunities\n• Remember: you chose each other`,
          tip: `Soul contracts aren\'t binding prisons—they\'re invitations. You can always renegotiate through conscious communication.`,
        },
      ],
    },
    {
      id: 'challenges',
      title: 'Navigating Challenges Together',
      icon: '⚡',
      subsections: [
        {
          title: 'Potential Friction Points',
          content: `Every relationship has challenges. Awareness of potential friction points helps you navigate them with grace.\n\n**Area 1: Core Identity (Sun-Sun)**\n${sunSunCompatibility > 70
            ? `Your Sun signs naturally harmonize. Friction is minimal here.`
            : `${userSunSign} (${signData[userSunSign].element}) and ${partnerSunSign} (${signData[partnerSunSign].element}) can clash. ${userName}\'s ${signData[userSunSign].challenges[0].toLowerCase()} may trigger ${partnerName}, while ${partnerName}\'s ${signData[partnerSunSign].challenges[0].toLowerCase()} may trigger ${userName}.`}\n\n**Area 2: Emotional Needs (Moon-Moon)**\n${moonMoonCompatibility > 70
            ? `Your emotional needs align well. Conflicts here are easily resolved.`
            : `Different emotional needs can create misunderstandings. ${userName} needs ${signData[userMoonSign].keywords[0]}; ${partnerName} needs ${signData[partnerMoonSign].keywords[0]}. Neither is wrong—both need acknowledgment.`}\n\n**Area 3: Love Language (Venus-Venus)**\n${getSignCompatibilityScore(userVenusSign, partnerVenusSign) > 70
            ? `You naturally speak similar love languages.`
            : `You may show love differently. ${userName} shows love through ${signData[userVenusSign].keywords[0]}; ${partnerName} through ${signData[partnerVenusSign].keywords[0]}. Learn each other\'s language.`}`,
        },
        {
          title: 'Conflict Resolution Styles',
          content: `Understanding how each of you approaches conflict helps you fight fair.\n\n**${userName}\'s Conflict Style (Mars in ${userMarsSign}):**\n• Approaches conflict: ${signData[userMarsSign].keywords[0]}, ${signData[userMarsSign].keywords[1]}\n• Needs during conflict: ${signData[userMarsSign].element === 'Fire' ? 'to express anger, then move on quickly' : signData[userMarsSign].element === 'Earth' ? 'practical solutions and time to process' : signData[userMarsSign].element === 'Air' ? 'logical discussion and space' : 'emotional validation and reconnection'}\n\n**${partnerName}\'s Conflict Style (Mars in ${partnerMarsSign}):**\n• Approaches conflict: ${signData[partnerMarsSign].keywords[0]}, ${signData[partnerMarsSign].keywords[1]}\n• Needs during conflict: ${signData[partnerMarsSign].element === 'Fire' ? 'to express anger, then move on quickly' : signData[partnerMarsSign].element === 'Earth' ? 'practical solutions and time to process' : signData[partnerMarsSign].element === 'Air' ? 'logical discussion and space' : 'emotional validation and reconnection'}\n\n**Fighting Fair:**\n• Acknowledge each other\'s conflict styles as valid\n• ${signData[userMarsSign].element === 'Fire' && signData[partnerMarsSign].element === 'Water' ? 'Balance intensity with sensitivity' : 'Meet in the middle on timing and approach'}\n• Always repair after conflict—reconnection matters more than winning`,
        },
      ],
    },
    {
      id: 'growth-potential',
      title: 'Growth Opportunities Together',
      icon: '🌱',
      subsections: [
        {
          title: 'How You Help Each Other Grow',
          content: `The best relationships catalyze growth. Here\'s how you evolve each other:\n\n**${partnerName} Helps ${userName} Develop:**\n• ${signData[partnerSunSign].strengths[0]} (from ${partnerName}\'s Sun)\n• ${signData[partnerMoonSign].strengths[0]} (from ${partnerName}\'s Moon)\n• ${signData[partnerVenusSign].strengths[0]} (from ${partnerName}\'s Venus)\n\n**${userName} Helps ${partnerName} Develop:**\n• ${signData[userSunSign].strengths[0]} (from ${userName}\'s Sun)\n• ${signData[userMoonSign].strengths[0]} (from ${userName}\'s Moon)\n• ${signData[userVenusSign].strengths[0]} (from ${userName}\'s Venus)\n\n**Together, You\'re Learning:**\nYour composite chart suggests your relationship\'s curriculum includes ${signData[compositeSunSign].lifeLesson.toLowerCase()}. Every challenge is an opportunity to master this lesson together.`,
        },
        {
          title: 'Your Relationship\'s Highest Potential',
          content: `${userName} and ${partnerName}, your charts reveal a relationship with significant potential for:\n\n**Emotional Depth:**\n${moonMoonCompatibility > 60 ? 'Your Moon connection creates natural emotional safety for deep intimacy.' : 'Your different emotional styles, when honored, create comprehensive emotional intelligence together.'}\n\n**Creative Partnership:**\nWith your combined Venus energies (${userVenusSign} and ${partnerVenusSign}), you can create beauty together through ${signData[userVenusSign].keywords[0]} and ${signData[partnerVenusSign].keywords[0]} expressions.\n\n**Lasting Commitment:**\nYour Saturn placements (${userSaturnSign} and ${partnerSaturnSign}) suggest the ability to ${signData[userSaturnSign].element === 'Earth' || signData[partnerSaturnSign].element === 'Earth' ? 'build substantial shared structures' : signData[userSaturnSign].element === 'Water' || signData[partnerSaturnSign].element === 'Water' ? 'create deep emotional commitment' : 'maintain freedom within commitment'} over time.\n\n**Soul Evolution:**\nThis relationship, fully embraced, helps both of you become more fully yourselves—not through losing your identity, but through being witnessed and supported in your growth.\n\n**Your Relationship Affirmation:**\n"We honor what makes each of us unique while creating something beautiful together. Our love is a canvas for both our individual and shared evolution. We are both teachers and students in this partnership."`,
          tip: `The goal isn\'t a perfect relationship—it\'s a relationship that helps both partners become more whole.`,
        },
      ],
    },
  ]

  const wordCount = sections.reduce((acc, s) =>
    acc + s.subsections.reduce((a, sub) => a + sub.content.split(' ').length, 0), 0)

  return {
    id: `partner-compatibility-${Date.now()}`,
    slug: 'partner-compatibility',
    title: 'Deep Compatibility Analysis',
    generatedAt: new Date().toISOString(),
    userName,
    partnerName,
    birthData: {
      date: '',
      place: '',
      sunSign: userSunSign,
      moonSign: userMoonSign,
      risingSign: userRisingSign,
    },
    partnerBirthData: {
      date: '',
      place: '',
    },
    summary: {
      headline: `${userSunSign} & ${partnerSunSign}: A ${overallScore}% Cosmic Match`,
      overview: `${userName} and ${partnerName}, your connection combines ${signData[userSunSign].archetype} and ${signData[partnerSunSign].archetype} energies, creating a relationship entity with a ${compositeSunSign} Sun. With ${sunMoonCompatibility}% Sun-Moon resonance and ${venusMarsCompatibility}% romantic chemistry, your partnership has both natural harmony and growth opportunities.`,
      keyStrengths: [
        `${sunMoonCompatibility > 70 ? 'Strong emotional attunement' : 'Complementary differences promote growth'}`,
        `Combined Venus energy: ${signData[userVenusSign].keywords[0]} meets ${signData[partnerVenusSign].keywords[0]}`,
        `Composite purpose: ${signData[compositeSunSign].lifeLesson.slice(0, 40)}...`,
        `${moonMoonCompatibility > 70 ? 'Natural emotional safety' : 'Opportunity to expand emotional range'}`,
      ],
      growthAreas: [
        `Communication: ${userMercurySign} and ${partnerMercurySign} styles may differ`,
        `${sunSunCompatibility < 70 ? `Balancing ${userSunSign} and ${partnerSunSign} needs` : 'Maintaining individual identity within harmony'}`,
        `Conflict navigation with different Mars styles`,
        `Honoring both partners\' Saturn-level commitments`,
      ],
    },
    visuals: [
      {
        type: 'planetary-strength',
        title: 'Compatibility Overview',
        data: {
          'Sun-Moon': `${sunMoonCompatibility}%`,
          'Moon-Moon': `${moonMoonCompatibility}%`,
          'Venus-Mars': `${venusMarsCompatibility}%`,
          'Sun-Sun': `${sunSunCompatibility}%`,
          'Overall': `${overallScore}%`,
        },
      },
    ],
    sections,
    glossary: [
      { term: 'Synastry', definition: 'The comparison of two birth charts to understand relationship dynamics.' },
      { term: 'Composite Chart', definition: 'A chart created from the midpoints of two charts, representing the relationship as an entity.' },
      { term: 'Venus-Mars Aspects', definition: 'Connections between attraction (Venus) and desire (Mars) that create romantic chemistry.' },
      { term: 'Saturn Aspects', definition: 'Connections involving Saturn that indicate commitment, longevity, and karmic lessons.' },
    ],
    wordCount: wordCount + 500,
  }
}

function getMidpointSign(sign1: Sign, sign2: Sign): Sign {
  const signs: Sign[] = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces']
  const index1 = signs.indexOf(sign1)
  const index2 = signs.indexOf(sign2)
  const midIndex = Math.round((index1 + index2) / 2) % 12
  return signs[midIndex]
}

function getSignCompatibilityScore(sign1: Sign, sign2: Sign): number {
  const element1 = signData[sign1].element
  const element2 = signData[sign2].element

  // Same element = high compatibility
  if (element1 === element2) return 85 + Math.floor(Math.random() * 10)

  // Compatible elements
  const compatible: Record<string, string[]> = {
    Fire: ['Air'],
    Air: ['Fire'],
    Earth: ['Water'],
    Water: ['Earth'],
  }

  if (compatible[element1]?.includes(element2)) return 70 + Math.floor(Math.random() * 15)

  // Challenging elements (opposite or square)
  return 50 + Math.floor(Math.random() * 20)
}

function getElementBalance(chart: NatalChart): Record<string, number> {
  const elements = { Fire: 0, Earth: 0, Air: 0, Water: 0 }
  const elementMap: Record<string, string> = {
    aries: 'Fire', leo: 'Fire', sagittarius: 'Fire',
    taurus: 'Earth', virgo: 'Earth', capricorn: 'Earth',
    gemini: 'Air', libra: 'Air', aquarius: 'Air',
    cancer: 'Water', scorpio: 'Water', pisces: 'Water',
  }

  chart.placements.forEach(p => {
    const element = elementMap[p.sign.toLowerCase()]
    if (element) elements[element as keyof typeof elements]++
  })

  return elements
}

// Export the main generator function
export function generateReportV2(
  slug: ReportSlug,
  chart: NatalChart,
  userName: string,
  partnerChart?: NatalChart,
  partnerName?: string
): GeneratedReportV2 {
  switch (slug) {
    case 'personality-deep-dive':
      return generatePersonalityReportV2(chart, userName)
    case 'relationship-compatibility':
      if (partnerChart && partnerName) {
        return generateRelationshipReportV2(chart, userName, partnerChart, partnerName)
      }
      // Fallback if no partner data
      return generatePersonalityReportV2(chart, userName)
    case 'year-ahead-forecast':
      return generateYearAheadReportV2(chart, userName)
    case 'monthly-forecast':
      return generateMonthlyForecastV2(chart, userName)
    case 'past-life-karma':
      return generatePastLifeKarmaReportV2(chart, userName)
    case 'financial-potential':
      return generateFinancialPotentialReportV2(chart, userName)
    case 'partner-compatibility':
      if (partnerChart && partnerName) {
        return generatePartnerCompatibilityReportV2(chart, userName, partnerChart, partnerName)
      }
      // Fallback if no partner data
      return generatePersonalityReportV2(chart, userName)
    default:
      return generatePersonalityReportV2(chart, userName)
  }
}
