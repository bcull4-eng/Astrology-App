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
  type: 'chart-wheel' | 'element-balance' | 'modality-balance' | 'aspect-grid' | 'house-emphasis' | 'planetary-strength'
  title: string
  data: Record<string, number | string>
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
const signData: Record<Sign, {
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
      ],
    },
    {
      id: 'monthly',
      title: 'Month-by-Month Breakdown',
      icon: '📅',
      subsections: months.map((month, i) => ({
        title: month,
        content: getMonthForecast(month, i, sunSign, moonSign, currentYear),
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
    default:
      return generatePersonalityReportV2(chart, userName)
  }
}
