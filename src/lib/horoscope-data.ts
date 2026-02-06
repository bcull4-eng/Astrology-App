/**
 * Daily Horoscope Generator
 *
 * Generates daily horoscopes based on current transits and zodiac sign.
 */

import { ZodiacSign, ZODIAC_DATA } from './zodiac-data'

export interface DailyHoroscope {
  sign: ZodiacSign
  date: string
  overall: string
  love: string
  career: string
  health: string
  luckyNumber: number
  luckyColor: string
  mood: string
  rating: number // 1-5
}

// Horoscope templates by element
const HOROSCOPE_TEMPLATES = {
  fire: {
    overall: [
      "Your natural energy is amplified today. Channel your enthusiasm into productive endeavors, but be mindful of coming on too strong with others.",
      "Bold moves are favored today. Trust your instincts and don't be afraid to take the lead. Your confidence will inspire those around you.",
      "The cosmic energy supports your ambitious nature. Set clear intentions and watch doors begin to open.",
      "Today calls for action. Your pioneering spirit is your greatest asset—use it wisely.",
      "A burst of creative energy flows through you. Express yourself authentically and watch magic unfold.",
    ],
    love: [
      "Passion runs high in matters of the heart. Express your feelings openly, but give your partner space to respond.",
      "Your magnetic energy draws others to you. Single fire signs may encounter an exciting new connection.",
      "Romance needs adventure today. Plan something spontaneous to reignite the spark.",
      "Your enthusiasm in love is contagious. Share your dreams with someone special.",
      "A passionate conversation could deepen your connection. Be bold but kind.",
    ],
    career: [
      "Leadership opportunities emerge. Step into your power and others will follow.",
      "Your innovative ideas catch attention at work. Don't hold back—speak up!",
      "Competition brings out your best today. Channel it into productivity, not conflict.",
      "A new project could showcase your talents. Say yes to challenges.",
      "Your drive impresses higher-ups. Recognition may be coming your way.",
    ],
  },
  earth: {
    overall: [
      "Patience and persistence pay off today. Focus on building something lasting rather than seeking quick results.",
      "Practical matters demand your attention. Your grounded approach helps you navigate any challenge.",
      "Today favors methodical progress. Take things one step at a time and celebrate small wins.",
      "Your reliability is your superpower. Others count on you, and you won't let them down.",
      "Material concerns may occupy your mind. Trust your practical wisdom to find solutions.",
    ],
    love: [
      "Steady and sincere gestures mean more than grand displays. Show love through actions today.",
      "Quality time strengthens your bonds. Plan a cozy, intimate experience with your partner.",
      "Patience in love brings rewards. Let relationships develop naturally.",
      "Your sensual nature craves connection. Make time for physical affection.",
      "Stability in love matters most now. Focus on building a secure foundation.",
    ],
    career: [
      "Hard work pays dividends. Your dedication doesn't go unnoticed.",
      "Financial matters need attention. Review your resources and plan wisely.",
      "Your practical skills solve a workplace problem. Be the reliable one.",
      "Long-term planning is favored. Think about where you want to be in five years.",
      "Steady progress beats rushed results. Focus on quality over speed.",
    ],
  },
  air: {
    overall: [
      "Your mind is especially sharp today. Use your intellectual gifts to solve problems and connect with others.",
      "Communication flows freely. It's an excellent day for important conversations and networking.",
      "New ideas and perspectives energize you. Stay curious and open to learning.",
      "Social connections bring unexpected opportunities. Say yes to invitations.",
      "Your quick wit serves you well today. Use humor to ease tense situations.",
    ],
    love: [
      "Stimulating conversation deepens attraction. Connect on an intellectual level first.",
      "Social butterflies may meet someone special at a gathering. Keep your options open.",
      "Share your thoughts and ideas with your partner. Mental connection strengthens your bond.",
      "Light-hearted flirtation adds sparkle to your day. Enjoy the playful energy.",
      "Communication is key in love today. Express what's on your mind clearly.",
    ],
    career: [
      "Your ideas catch attention in meetings. Speak up and share your vision.",
      "Networking opens doors. Connect with colleagues you don't usually interact with.",
      "Problem-solving comes naturally. You see solutions others miss.",
      "Writing and communication projects flow easily. Put your thoughts to paper.",
      "Collaboration enhances your work. Two heads are better than one today.",
    ],
  },
  water: {
    overall: [
      "Your intuition is especially strong today. Trust your gut feelings and inner wisdom.",
      "Emotional depths reveal hidden truths. Take time for reflection and self-care.",
      "Sensitivity is your gift. Use it to understand and support others.",
      "Creative inspiration flows from your emotional experiences. Channel feelings into art.",
      "The day may bring intense feelings. Honor them without being overwhelmed.",
    ],
    love: [
      "Deep emotional connection is possible today. Be vulnerable with someone you trust.",
      "Your empathy helps you understand your partner's needs. Listen with your heart.",
      "Intuition guides you in matters of love. If something feels right, trust it.",
      "Nurturing gestures strengthen your bonds. Show love through care and attention.",
      "Past emotions may surface. Use this as an opportunity for healing and growth.",
    ],
    career: [
      "Your intuition gives you an edge at work. Trust your instincts on decisions.",
      "Creative projects benefit from your emotional depth. Pour your heart into your work.",
      "Helping colleagues creates good karma. Your support is appreciated.",
      "Behind-the-scenes work brings satisfaction. Not everything needs to be public.",
      "Your sensitivity helps you read workplace dynamics. Use this insight wisely.",
    ],
  },
}

const HEALTH_MESSAGES = [
  "Focus on hydration and rest. Your body needs nurturing today.",
  "Physical activity boosts your mood. Even a short walk makes a difference.",
  "Pay attention to stress levels. Try breathing exercises when tension rises.",
  "Your energy is strong. Use it for exercise but don't overdo it.",
  "Mental health matters. Take breaks for meditation or quiet reflection.",
  "Listen to what your body needs. Rest if tired, move if restless.",
  "Nutrition is key today. Nourish yourself with wholesome foods.",
]

const MOODS = [
  "Optimistic", "Reflective", "Energetic", "Peaceful", "Determined",
  "Creative", "Social", "Introspective", "Adventurous", "Nurturing",
  "Passionate", "Grounded", "Curious", "Intuitive", "Ambitious",
]

// Seeded random based on date and sign
function seededRandom(seed: string): () => number {
  let h = 0
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(31, h) + seed.charCodeAt(i) | 0
  }
  return function () {
    h = Math.imul(h ^ h >>> 16, 2246822507)
    h = Math.imul(h ^ h >>> 13, 3266489909)
    return (h ^= h >>> 16) >>> 0
  }
}

export function generateDailyHoroscope(sign: ZodiacSign, date: Date = new Date()): DailyHoroscope {
  const dateStr = date.toISOString().split('T')[0]
  const seed = `${sign}-${dateStr}`
  const rand = seededRandom(seed)
  const random = () => rand() / 4294967295

  const signData = ZODIAC_DATA[sign]
  const element = signData.element
  const templates = HOROSCOPE_TEMPLATES[element]

  const overallIdx = Math.floor(random() * templates.overall.length)
  const loveIdx = Math.floor(random() * templates.love.length)
  const careerIdx = Math.floor(random() * templates.career.length)
  const healthIdx = Math.floor(random() * HEALTH_MESSAGES.length)
  const moodIdx = Math.floor(random() * MOODS.length)

  const luckyNumber = signData.luckyNumbers[Math.floor(random() * signData.luckyNumbers.length)]
  const luckyColor = signData.luckyColors[Math.floor(random() * signData.luckyColors.length)]
  const rating = Math.floor(random() * 3) + 3 // 3-5 stars

  return {
    sign,
    date: dateStr,
    overall: templates.overall[overallIdx],
    love: templates.love[loveIdx],
    career: templates.career[careerIdx],
    health: HEALTH_MESSAGES[healthIdx],
    luckyNumber,
    luckyColor,
    mood: MOODS[moodIdx],
    rating,
  }
}

export function getFormattedDate(date: Date = new Date()): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
