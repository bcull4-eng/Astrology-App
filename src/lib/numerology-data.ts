/**
 * Numerology Data and Calculations
 *
 * Calculate Life Path, Expression, Soul Urge, and Personality numbers.
 */

export interface NumerologyResult {
  lifePath: number
  expression: number
  soulUrge: number
  personality: number
  birthday: number
}

export interface NumberMeaning {
  number: number
  name: string
  keywords: string[]
  description: string
  strengths: string[]
  challenges: string[]
  careers: string[]
  compatibility: number[]
}

export const NUMBER_MEANINGS: Record<number, NumberMeaning> = {
  1: {
    number: 1,
    name: 'The Leader',
    keywords: ['Independent', 'Original', 'Ambitious', 'Pioneer'],
    description: 'Number 1 represents new beginnings, independence, and individuality. You are a natural-born leader with a pioneering spirit. Your drive to succeed and innovative thinking set you apart.',
    strengths: ['Leadership', 'Initiative', 'Creativity', 'Determination', 'Courage'],
    challenges: ['Stubbornness', 'Impatience', 'Self-centeredness', 'Aggression'],
    careers: ['Entrepreneur', 'CEO', 'Inventor', 'Director', 'Freelancer'],
    compatibility: [3, 5, 7],
  },
  2: {
    number: 2,
    name: 'The Diplomat',
    keywords: ['Cooperative', 'Sensitive', 'Harmonious', 'Supportive'],
    description: 'Number 2 represents balance, partnership, and diplomacy. You are naturally intuitive and excel at bringing people together. Your sensitivity to others makes you an excellent mediator.',
    strengths: ['Diplomacy', 'Patience', 'Intuition', 'Cooperation', 'Empathy'],
    challenges: ['Over-sensitivity', 'Indecision', 'Dependence', 'Shyness'],
    careers: ['Counselor', 'Mediator', 'Teacher', 'Diplomat', 'Social Worker'],
    compatibility: [4, 6, 8],
  },
  3: {
    number: 3,
    name: 'The Communicator',
    keywords: ['Creative', 'Expressive', 'Social', 'Optimistic'],
    description: 'Number 3 represents creativity, self-expression, and communication. You have a gift for words and artistic expression. Your optimism and charm attract others to you.',
    strengths: ['Creativity', 'Communication', 'Joy', 'Inspiration', 'Artistic talent'],
    challenges: ['Scattered energy', 'Exaggeration', 'Mood swings', 'Superficiality'],
    careers: ['Writer', 'Artist', 'Actor', 'Speaker', 'Designer'],
    compatibility: [1, 5, 9],
  },
  4: {
    number: 4,
    name: 'The Builder',
    keywords: ['Practical', 'Organized', 'Dependable', 'Hardworking'],
    description: 'Number 4 represents stability, hard work, and practicality. You are methodical and systematic in your approach to life. Your dedication to building solid foundations ensures lasting success.',
    strengths: ['Organization', 'Reliability', 'Discipline', 'Patience', 'Determination'],
    challenges: ['Rigidity', 'Stubbornness', 'Workaholism', 'Pessimism'],
    careers: ['Engineer', 'Architect', 'Accountant', 'Manager', 'Scientist'],
    compatibility: [2, 6, 8],
  },
  5: {
    number: 5,
    name: 'The Freedom Seeker',
    keywords: ['Adventurous', 'Versatile', 'Dynamic', 'Progressive'],
    description: 'Number 5 represents freedom, change, and adventure. You crave variety and new experiences. Your adaptability and resourcefulness help you thrive in any situation.',
    strengths: ['Versatility', 'Curiosity', 'Adaptability', 'Enthusiasm', 'Courage'],
    challenges: ['Restlessness', 'Impulsiveness', 'Inconsistency', 'Overindulgence'],
    careers: ['Travel Writer', 'Sales', 'Marketing', 'Journalist', 'Consultant'],
    compatibility: [1, 3, 7],
  },
  6: {
    number: 6,
    name: 'The Nurturer',
    keywords: ['Responsible', 'Loving', 'Protective', 'Harmonious'],
    description: 'Number 6 represents love, responsibility, and nurturing. You have a deep sense of duty to family and community. Your caring nature makes you the heart of any group.',
    strengths: ['Compassion', 'Responsibility', 'Healing', 'Balance', 'Service'],
    challenges: ['Worry', 'Self-sacrifice', 'Interfering', 'Perfectionism'],
    careers: ['Healer', 'Teacher', 'Counselor', 'Interior Designer', 'Chef'],
    compatibility: [2, 4, 9],
  },
  7: {
    number: 7,
    name: 'The Seeker',
    keywords: ['Analytical', 'Introspective', 'Spiritual', 'Wise'],
    description: 'Number 7 represents wisdom, spirituality, and introspection. You are a deep thinker who seeks truth and understanding. Your analytical mind uncovers what others miss.',
    strengths: ['Wisdom', 'Analysis', 'Intuition', 'Research', 'Spirituality'],
    challenges: ['Isolation', 'Skepticism', 'Aloofness', 'Perfectionism'],
    careers: ['Researcher', 'Professor', 'Analyst', 'Scientist', 'Spiritual Teacher'],
    compatibility: [1, 5, 9],
  },
  8: {
    number: 8,
    name: 'The Powerhouse',
    keywords: ['Ambitious', 'Authoritative', 'Successful', 'Material'],
    description: 'Number 8 represents power, abundance, and achievement. You have a natural talent for business and material success. Your ambition and determination lead to great accomplishments.',
    strengths: ['Leadership', 'Business sense', 'Ambition', 'Efficiency', 'Judgment'],
    challenges: ['Workaholic tendencies', 'Materialism', 'Control issues', 'Impatience'],
    careers: ['Executive', 'Banker', 'Lawyer', 'Real Estate', 'Investor'],
    compatibility: [2, 4, 6],
  },
  9: {
    number: 9,
    name: 'The Humanitarian',
    keywords: ['Compassionate', 'Generous', 'Universal', 'Wise'],
    description: 'Number 9 represents completion, wisdom, and humanitarianism. You have a global perspective and deep compassion for humanity. Your life purpose involves service to others.',
    strengths: ['Compassion', 'Generosity', 'Creativity', 'Wisdom', 'Universal love'],
    challenges: ['Moodiness', 'Detachment', 'Scattered', 'Aloofness'],
    careers: ['Philanthropist', 'Artist', 'Teacher', 'Healer', 'Humanitarian'],
    compatibility: [3, 6, 7],
  },
  11: {
    number: 11,
    name: 'The Inspirer (Master Number)',
    keywords: ['Intuitive', 'Visionary', 'Idealistic', 'Inspiring'],
    description: 'Master Number 11 represents illumination, intuition, and spiritual insight. You are a visionary who inspires others through your ideas and ideals. Your heightened sensitivity is both a gift and a challenge.',
    strengths: ['Intuition', 'Inspiration', 'Idealism', 'Vision', 'Sensitivity'],
    challenges: ['Nervous energy', 'Impracticality', 'Self-doubt', 'Oversensitivity'],
    careers: ['Spiritual Leader', 'Psychic', 'Counselor', 'Artist', 'Inventor'],
    compatibility: [2, 4, 6],
  },
  22: {
    number: 22,
    name: 'The Master Builder (Master Number)',
    keywords: ['Visionary', 'Practical', 'Powerful', 'Ambitious'],
    description: 'Master Number 22 is the most powerful number in numerology. You have the ability to turn dreams into reality on a large scale. Your practical approach to lofty goals creates lasting achievements.',
    strengths: ['Vision', 'Practicality', 'Leadership', 'Discipline', 'Achievement'],
    challenges: ['Overwhelm', 'Self-doubt', 'Controlling', 'Nervous tension'],
    careers: ['Architect', 'CEO', 'Diplomat', 'Politician', 'Global Leader'],
    compatibility: [4, 6, 8],
  },
  33: {
    number: 33,
    name: 'The Master Teacher (Master Number)',
    keywords: ['Healing', 'Blessing', 'Teaching', 'Compassion'],
    description: 'Master Number 33 represents selfless giving, spiritual teaching, and healing. You are here to uplift humanity through your example. Your compassion and wisdom inspire others to grow.',
    strengths: ['Compassion', 'Healing', 'Teaching', 'Selflessness', 'Creativity'],
    challenges: ['Martyrdom', 'Burden', 'Unrealistic expectations', 'Overwhelm'],
    careers: ['Healer', 'Spiritual Teacher', 'Humanitarian', 'Artist', 'Counselor'],
    compatibility: [6, 9, 11],
  },
}

// Letter to number mapping (Pythagorean system)
const LETTER_VALUES: Record<string, number> = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
  S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8,
}

const VOWELS = ['A', 'E', 'I', 'O', 'U']

function reduceToSingleDigit(num: number, keepMaster = true): number {
  if (keepMaster && (num === 11 || num === 22 || num === 33)) {
    return num
  }

  while (num > 9 && !(keepMaster && (num === 11 || num === 22 || num === 33))) {
    num = String(num).split('').reduce((sum, digit) => sum + parseInt(digit), 0)
  }

  return num
}

function sumDigits(num: number): number {
  return String(num).split('').reduce((sum, digit) => sum + parseInt(digit), 0)
}

export function calculateLifePath(day: number, month: number, year: number): number {
  // Reduce each component first
  const dayReduced = reduceToSingleDigit(day, false)
  const monthReduced = reduceToSingleDigit(month, false)
  const yearReduced = reduceToSingleDigit(sumDigits(year), false)

  // Sum and reduce, keeping master numbers
  const total = dayReduced + monthReduced + yearReduced
  return reduceToSingleDigit(total, true)
}

export function calculateExpression(fullName: string): number {
  const letters = fullName.toUpperCase().replace(/[^A-Z]/g, '')
  const sum = letters.split('').reduce((total, letter) => total + (LETTER_VALUES[letter] || 0), 0)
  return reduceToSingleDigit(sum, true)
}

export function calculateSoulUrge(fullName: string): number {
  const letters = fullName.toUpperCase().replace(/[^A-Z]/g, '')
  const vowelSum = letters.split('').reduce((total, letter) => {
    if (VOWELS.includes(letter)) {
      return total + (LETTER_VALUES[letter] || 0)
    }
    return total
  }, 0)
  return reduceToSingleDigit(vowelSum, true)
}

export function calculatePersonality(fullName: string): number {
  const letters = fullName.toUpperCase().replace(/[^A-Z]/g, '')
  const consonantSum = letters.split('').reduce((total, letter) => {
    if (!VOWELS.includes(letter)) {
      return total + (LETTER_VALUES[letter] || 0)
    }
    return total
  }, 0)
  return reduceToSingleDigit(consonantSum, true)
}

export function calculateBirthday(day: number): number {
  return reduceToSingleDigit(day, true)
}

export function calculateAllNumbers(
  fullName: string,
  day: number,
  month: number,
  year: number
): NumerologyResult {
  return {
    lifePath: calculateLifePath(day, month, year),
    expression: calculateExpression(fullName),
    soulUrge: calculateSoulUrge(fullName),
    personality: calculatePersonality(fullName),
    birthday: calculateBirthday(day),
  }
}
