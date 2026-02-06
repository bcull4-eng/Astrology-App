/**
 * Chinese Zodiac Data
 *
 * Complete data for all 12 Chinese zodiac animals.
 */

export const CHINESE_ZODIAC_ANIMALS = [
  'rat', 'ox', 'tiger', 'rabbit', 'dragon', 'snake',
  'horse', 'goat', 'monkey', 'rooster', 'dog', 'pig'
] as const

export type ChineseZodiacAnimal = typeof CHINESE_ZODIAC_ANIMALS[number]

export const CHINESE_ELEMENTS = ['wood', 'fire', 'earth', 'metal', 'water'] as const
export type ChineseElement = typeof CHINESE_ELEMENTS[number]

export interface ChineseZodiacData {
  animal: ChineseZodiacAnimal
  name: string
  emoji: string
  chineseCharacter: string
  years: number[]
  traits: string[]
  strengths: string[]
  weaknesses: string[]
  compatibility: ChineseZodiacAnimal[]
  incompatibility: ChineseZodiacAnimal[]
  luckyNumbers: number[]
  luckyColors: string[]
  luckyFlowers: string[]
  personality: string
  career: string
  love: string
  health: string
  celebrities: string[]
}

export const CHINESE_ZODIAC_DATA: Record<ChineseZodiacAnimal, ChineseZodiacData> = {
  rat: {
    animal: 'rat',
    name: 'Rat',
    emoji: '🐀',
    chineseCharacter: '鼠',
    years: [1924, 1936, 1948, 1960, 1972, 1984, 1996, 2008, 2020, 2032],
    traits: ['Clever', 'Quick-witted', 'Resourceful', 'Versatile', 'Curious'],
    strengths: ['Intelligent', 'Adaptable', 'Charming', 'Thrifty'],
    weaknesses: ['Stubborn', 'Gossipy', 'Greedy', 'Nervous'],
    compatibility: ['dragon', 'monkey', 'ox'],
    incompatibility: ['horse', 'goat'],
    luckyNumbers: [2, 3],
    luckyColors: ['Blue', 'Gold', 'Green'],
    luckyFlowers: ['Lily', 'African Violet'],
    personality: 'Rats are clever, quick-witted, and resourceful. They have excellent intuition and are naturally curious. While they can be charming and social, they prefer to keep their inner thoughts private.',
    career: 'Rats excel in business, writing, research, and entrepreneurship. Their quick thinking and resourcefulness make them successful in competitive environments.',
    love: 'In relationships, Rats are devoted and protective. They seek partners who can match their intelligence and share their ambitions.',
    health: 'Rats should watch their stress levels and avoid overwork. Regular exercise and relaxation are important for their wellbeing.',
    celebrities: ['Prince Charles', 'Shakespeare', 'Mozart', 'Scarlett Johansson'],
  },
  ox: {
    animal: 'ox',
    name: 'Ox',
    emoji: '🐂',
    chineseCharacter: '牛',
    years: [1925, 1937, 1949, 1961, 1973, 1985, 1997, 2009, 2021, 2033],
    traits: ['Diligent', 'Dependable', 'Strong', 'Determined', 'Patient'],
    strengths: ['Honest', 'Hardworking', 'Patient', 'Reliable'],
    weaknesses: ['Stubborn', 'Conservative', 'Possessive'],
    compatibility: ['rat', 'snake', 'rooster'],
    incompatibility: ['tiger', 'dragon', 'horse', 'goat'],
    luckyNumbers: [1, 4],
    luckyColors: ['White', 'Yellow', 'Green'],
    luckyFlowers: ['Tulip', 'Evergreen', 'Peach Blossom'],
    personality: 'Oxen are known for their diligence, dependability, and strength. They are patient and methodical, approaching tasks with determination and perseverance.',
    career: 'Oxen succeed in careers requiring patience and persistence. They make excellent doctors, lawyers, engineers, and business leaders.',
    love: 'Oxen are loyal and devoted partners. They seek stable, long-term relationships and show love through actions rather than words.',
    health: 'Oxen have strong constitutions but should avoid overwork. Regular exercise and a balanced diet are important.',
    celebrities: ['Barack Obama', 'Princess Diana', 'Napoleon', 'Meryl Streep'],
  },
  tiger: {
    animal: 'tiger',
    name: 'Tiger',
    emoji: '🐅',
    chineseCharacter: '虎',
    years: [1926, 1938, 1950, 1962, 1974, 1986, 1998, 2010, 2022, 2034],
    traits: ['Brave', 'Competitive', 'Confident', 'Charismatic', 'Ambitious'],
    strengths: ['Courageous', 'Enthusiastic', 'Leadership', 'Generous'],
    weaknesses: ['Arrogant', 'Short-tempered', 'Reckless'],
    compatibility: ['dragon', 'horse', 'pig'],
    incompatibility: ['ox', 'tiger', 'snake', 'monkey'],
    luckyNumbers: [1, 3, 4],
    luckyColors: ['Blue', 'Gray', 'Orange'],
    luckyFlowers: ['Yellow Lily', 'Cineraria'],
    personality: 'Tigers are brave, competitive, and confident. They are natural leaders with magnetic personalities and aren\'t afraid to take risks.',
    career: 'Tigers thrive in leadership positions, politics, acting, and entrepreneurship. They need careers that offer excitement and challenge.',
    love: 'Tigers are passionate and romantic. They need partners who can handle their intensity and give them space for independence.',
    health: 'Tigers should watch for stress-related issues. Physical activity helps channel their energy positively.',
    celebrities: ['Queen Elizabeth II', 'Tom Cruise', 'Leonardo DiCaprio', 'Lady Gaga'],
  },
  rabbit: {
    animal: 'rabbit',
    name: 'Rabbit',
    emoji: '🐇',
    chineseCharacter: '兔',
    years: [1927, 1939, 1951, 1963, 1975, 1987, 1999, 2011, 2023, 2035],
    traits: ['Gentle', 'Quiet', 'Elegant', 'Alert', 'Responsible'],
    strengths: ['Kind', 'Patient', 'Artistic', 'Diplomatic'],
    weaknesses: ['Timid', 'Conservative', 'Detached', 'Superficial'],
    compatibility: ['goat', 'monkey', 'dog', 'pig'],
    incompatibility: ['snake', 'rooster'],
    luckyNumbers: [3, 4, 6],
    luckyColors: ['Red', 'Pink', 'Purple', 'Blue'],
    luckyFlowers: ['Plantain Lily', 'Jasmine'],
    personality: 'Rabbits are gentle, quiet, and elegant. They have refined tastes and appreciate beauty in all forms. They prefer peace and harmony.',
    career: 'Rabbits excel in art, design, literature, and diplomacy. They do well in careers that allow creativity and minimal conflict.',
    love: 'Rabbits are romantic and seek harmonious relationships. They are devoted partners who value security and comfort.',
    health: 'Rabbits are generally healthy but should avoid stress. Gentle exercise like yoga or walking suits them.',
    celebrities: ['Albert Einstein', 'Angelina Jolie', 'Michael Jordan', 'Johnny Depp'],
  },
  dragon: {
    animal: 'dragon',
    name: 'Dragon',
    emoji: '🐉',
    chineseCharacter: '龙',
    years: [1928, 1940, 1952, 1964, 1976, 1988, 2000, 2012, 2024, 2036],
    traits: ['Confident', 'Ambitious', 'Energetic', 'Intelligent', 'Enthusiastic'],
    strengths: ['Charismatic', 'Lucky', 'Gifted', 'Powerful'],
    weaknesses: ['Arrogant', 'Impatient', 'Intolerant', 'Unrealistic'],
    compatibility: ['rooster', 'rat', 'monkey'],
    incompatibility: ['ox', 'goat', 'dog'],
    luckyNumbers: [1, 6, 7],
    luckyColors: ['Gold', 'Silver', 'Gray'],
    luckyFlowers: ['Bleeding-heart Glory Bower', 'Dragon Flowers'],
    personality: 'Dragons are confident, ambitious, and energetic. They are natural leaders with magnetic personalities and high standards for themselves and others.',
    career: 'Dragons excel as CEOs, politicians, entrepreneurs, and artists. They need careers that match their ambition and allow them to shine.',
    love: 'Dragons are passionate but may struggle with commitment. They need partners who respect their independence and match their energy.',
    health: 'Dragons have abundant energy but should avoid burnout. Regular rest and stress management are important.',
    celebrities: ['Bruce Lee', 'John Lennon', 'Rihanna', 'Vladimir Putin'],
  },
  snake: {
    animal: 'snake',
    name: 'Snake',
    emoji: '🐍',
    chineseCharacter: '蛇',
    years: [1929, 1941, 1953, 1965, 1977, 1989, 2001, 2013, 2025, 2037],
    traits: ['Wise', 'Intuitive', 'Elegant', 'Mysterious', 'Analytical'],
    strengths: ['Intelligent', 'Romantic', 'Charming', 'Intuitive'],
    weaknesses: ['Jealous', 'Suspicious', 'Cunning', 'Possessive'],
    compatibility: ['dragon', 'rooster'],
    incompatibility: ['tiger', 'rabbit', 'snake', 'goat', 'pig'],
    luckyNumbers: [2, 8, 9],
    luckyColors: ['Black', 'Red', 'Yellow'],
    luckyFlowers: ['Orchid', 'Cactus'],
    personality: 'Snakes are wise, intuitive, and elegant. They have excellent analytical abilities and prefer to observe before acting.',
    career: 'Snakes excel in science, research, philosophy, and the arts. They are suited for careers requiring deep thinking and analysis.',
    love: 'Snakes are passionate and devoted in love but can be jealous. They seek deep, meaningful connections.',
    health: 'Snakes should focus on mental health and avoid overthinking. Meditation and relaxation practices are beneficial.',
    celebrities: ['Abraham Lincoln', 'Oprah Winfrey', 'Taylor Swift', 'J.K. Rowling'],
  },
  horse: {
    animal: 'horse',
    name: 'Horse',
    emoji: '🐴',
    chineseCharacter: '马',
    years: [1930, 1942, 1954, 1966, 1978, 1990, 2002, 2014, 2026, 2038],
    traits: ['Animated', 'Active', 'Energetic', 'Independent', 'Impatient'],
    strengths: ['Enthusiastic', 'Self-reliant', 'Fashionable', 'Quick-witted'],
    weaknesses: ['Impetuous', 'Stubborn', 'Wasteful'],
    compatibility: ['tiger', 'goat', 'rabbit'],
    incompatibility: ['rat', 'ox', 'rooster', 'horse'],
    luckyNumbers: [2, 3, 7],
    luckyColors: ['Yellow', 'Brown'],
    luckyFlowers: ['Calla Lily', 'Jasmine', 'Marigold'],
    personality: 'Horses are animated, active, and energetic. They love freedom and adventure, and their enthusiasm is contagious.',
    career: 'Horses excel in sales, entertainment, tourism, and sports. They need careers that offer variety and freedom.',
    love: 'Horses are romantic and passionate but need independence. They seek partners who support their adventurous spirit.',
    health: 'Horses have good constitutions but should watch for stress. Regular exercise keeps them balanced.',
    celebrities: ['Genghis Khan', 'Rembrandt', 'Jackie Chan', 'Emma Watson'],
  },
  goat: {
    animal: 'goat',
    name: 'Goat',
    emoji: '🐐',
    chineseCharacter: '羊',
    years: [1931, 1943, 1955, 1967, 1979, 1991, 2003, 2015, 2027, 2039],
    traits: ['Calm', 'Gentle', 'Sympathetic', 'Creative', 'Persevering'],
    strengths: ['Artistic', 'Compassionate', 'Elegant', 'Calm'],
    weaknesses: ['Indecisive', 'Pessimistic', 'Shy', 'Dependent'],
    compatibility: ['horse', 'rabbit', 'pig'],
    incompatibility: ['ox', 'tiger', 'dog'],
    luckyNumbers: [2, 7],
    luckyColors: ['Brown', 'Red', 'Purple'],
    luckyFlowers: ['Carnation', 'Primrose'],
    personality: 'Goats are calm, gentle, and creative. They have strong artistic sensibilities and prefer harmony and peace.',
    career: 'Goats excel in art, music, fashion, and healing professions. They need supportive work environments.',
    love: 'Goats are romantic and devoted partners. They seek security and emotional connection in relationships.',
    health: 'Goats should watch for anxiety and digestive issues. A calm lifestyle and gentle exercise are important.',
    celebrities: ['Michelangelo', 'Mark Twain', 'Steve Jobs', 'Julia Roberts'],
  },
  monkey: {
    animal: 'monkey',
    name: 'Monkey',
    emoji: '🐒',
    chineseCharacter: '猴',
    years: [1932, 1944, 1956, 1968, 1980, 1992, 2004, 2016, 2028, 2040],
    traits: ['Witty', 'Intelligent', 'Curious', 'Mischievous', 'Versatile'],
    strengths: ['Clever', 'Sociable', 'Innovative', 'Self-assured'],
    weaknesses: ['Egotistical', 'Suspicious', 'Cunning', 'Restless'],
    compatibility: ['ox', 'rabbit'],
    incompatibility: ['tiger', 'pig'],
    luckyNumbers: [4, 9],
    luckyColors: ['White', 'Blue', 'Gold'],
    luckyFlowers: ['Chrysanthemum', 'Crape-myrtle'],
    personality: 'Monkeys are witty, intelligent, and curious. They have quick minds and love learning new things.',
    career: 'Monkeys excel in science, engineering, entertainment, and finance. They need intellectually stimulating careers.',
    love: 'Monkeys are charming but may struggle with commitment. They need partners who can keep up with their active minds.',
    health: 'Monkeys should watch for nervous system issues. Mental stimulation balanced with relaxation is key.',
    celebrities: ['Leonardo da Vinci', 'Charles Dickens', 'Will Smith', 'Miley Cyrus'],
  },
  rooster: {
    animal: 'rooster',
    name: 'Rooster',
    emoji: '🐓',
    chineseCharacter: '鸡',
    years: [1933, 1945, 1957, 1969, 1981, 1993, 2005, 2017, 2029, 2041],
    traits: ['Observant', 'Hardworking', 'Courageous', 'Honest', 'Confident'],
    strengths: ['Punctual', 'Loyal', 'Truthful', 'Capable'],
    weaknesses: ['Critical', 'Vain', 'Arrogant'],
    compatibility: ['ox', 'snake'],
    incompatibility: ['rat', 'rabbit', 'horse', 'rooster', 'dog'],
    luckyNumbers: [5, 7, 8],
    luckyColors: ['Gold', 'Brown', 'Yellow'],
    luckyFlowers: ['Gladiola', 'Impatiens', 'Cockscomb'],
    personality: 'Roosters are observant, hardworking, and honest. They have strong attention to detail and high standards.',
    career: 'Roosters excel in public relations, medicine, accounting, and the military. They thrive in structured environments.',
    love: 'Roosters are loyal and devoted partners. They need partners who appreciate their honesty and attention to detail.',
    health: 'Roosters should watch for stress-related issues. Regular routines and adequate rest are important.',
    celebrities: ['Beyoncé', 'Matthew McConaughey', 'Serena Williams', 'Britney Spears'],
  },
  dog: {
    animal: 'dog',
    name: 'Dog',
    emoji: '🐕',
    chineseCharacter: '狗',
    years: [1934, 1946, 1958, 1970, 1982, 1994, 2006, 2018, 2030, 2042],
    traits: ['Loyal', 'Honest', 'Prudent', 'Faithful', 'Protective'],
    strengths: ['Faithful', 'Courageous', 'Responsible', 'Righteous'],
    weaknesses: ['Anxious', 'Stubborn', 'Critical', 'Cold'],
    compatibility: ['rabbit'],
    incompatibility: ['dragon', 'goat', 'rooster'],
    luckyNumbers: [3, 4, 9],
    luckyColors: ['Red', 'Green', 'Purple'],
    luckyFlowers: ['Rose', 'Cymbidium Orchid'],
    personality: 'Dogs are loyal, honest, and protective. They have a strong sense of justice and are devoted to those they love.',
    career: 'Dogs excel in law, medicine, education, and social work. They need careers that align with their values.',
    love: 'Dogs are loyal and devoted partners. They seek long-term, stable relationships with trustworthy people.',
    health: 'Dogs should watch for anxiety and heart issues. Regular exercise and stress management are important.',
    celebrities: ['Winston Churchill', 'Elvis Presley', 'Madonna', 'Donald Trump'],
  },
  pig: {
    animal: 'pig',
    name: 'Pig',
    emoji: '🐷',
    chineseCharacter: '猪',
    years: [1935, 1947, 1959, 1971, 1983, 1995, 2007, 2019, 2031, 2043],
    traits: ['Compassionate', 'Generous', 'Diligent', 'Easygoing', 'Sincere'],
    strengths: ['Kind', 'Honest', 'Peaceful', 'Optimistic'],
    weaknesses: ['Naive', 'Lazy', 'Gullible', 'Short-tempered'],
    compatibility: ['tiger', 'rabbit', 'goat'],
    incompatibility: ['snake', 'monkey'],
    luckyNumbers: [2, 5, 8],
    luckyColors: ['Yellow', 'Gray', 'Brown'],
    luckyFlowers: ['Hydrangea', 'Daisy', 'Pitcher Plant'],
    personality: 'Pigs are compassionate, generous, and sincere. They have warm hearts and genuine concern for others.',
    career: 'Pigs excel in entertainment, hospitality, veterinary work, and charity. They need careers that feel meaningful.',
    love: 'Pigs are devoted and romantic partners. They seek harmonious relationships and are very giving.',
    health: 'Pigs should watch their diet and exercise regularly. They tend toward overindulgence.',
    celebrities: ['Ronald Reagan', 'Arnold Schwarzenegger', 'Hillary Clinton', 'Amy Winehouse'],
  },
}

// Chinese New Year dates (approximate - the actual date varies)
const CHINESE_NEW_YEAR_DATES: Record<number, { month: number; day: number }> = {
  1924: { month: 2, day: 5 }, 1925: { month: 1, day: 24 }, 1926: { month: 2, day: 13 },
  1927: { month: 2, day: 2 }, 1928: { month: 1, day: 23 }, 1929: { month: 2, day: 10 },
  1930: { month: 1, day: 30 }, 1931: { month: 2, day: 17 }, 1932: { month: 2, day: 6 },
  1933: { month: 1, day: 26 }, 1934: { month: 2, day: 14 }, 1935: { month: 2, day: 4 },
  1936: { month: 1, day: 24 }, 1937: { month: 2, day: 11 }, 1938: { month: 1, day: 31 },
  1939: { month: 2, day: 19 }, 1940: { month: 2, day: 8 }, 1941: { month: 1, day: 27 },
  1942: { month: 2, day: 15 }, 1943: { month: 2, day: 5 }, 1944: { month: 1, day: 25 },
  1945: { month: 2, day: 13 }, 1946: { month: 2, day: 2 }, 1947: { month: 1, day: 22 },
  1948: { month: 2, day: 10 }, 1949: { month: 1, day: 29 }, 1950: { month: 2, day: 17 },
  1951: { month: 2, day: 6 }, 1952: { month: 1, day: 27 }, 1953: { month: 2, day: 14 },
  1954: { month: 2, day: 3 }, 1955: { month: 1, day: 24 }, 1956: { month: 2, day: 12 },
  1957: { month: 1, day: 31 }, 1958: { month: 2, day: 18 }, 1959: { month: 2, day: 8 },
  1960: { month: 1, day: 28 }, 1961: { month: 2, day: 15 }, 1962: { month: 2, day: 5 },
  1963: { month: 1, day: 25 }, 1964: { month: 2, day: 13 }, 1965: { month: 2, day: 2 },
  1966: { month: 1, day: 21 }, 1967: { month: 2, day: 9 }, 1968: { month: 1, day: 30 },
  1969: { month: 2, day: 17 }, 1970: { month: 2, day: 6 }, 1971: { month: 1, day: 27 },
  1972: { month: 2, day: 15 }, 1973: { month: 2, day: 3 }, 1974: { month: 1, day: 23 },
  1975: { month: 2, day: 11 }, 1976: { month: 1, day: 31 }, 1977: { month: 2, day: 18 },
  1978: { month: 2, day: 7 }, 1979: { month: 1, day: 28 }, 1980: { month: 2, day: 16 },
  1981: { month: 2, day: 5 }, 1982: { month: 1, day: 25 }, 1983: { month: 2, day: 13 },
  1984: { month: 2, day: 2 }, 1985: { month: 2, day: 20 }, 1986: { month: 2, day: 9 },
  1987: { month: 1, day: 29 }, 1988: { month: 2, day: 17 }, 1989: { month: 2, day: 6 },
  1990: { month: 1, day: 27 }, 1991: { month: 2, day: 15 }, 1992: { month: 2, day: 4 },
  1993: { month: 1, day: 23 }, 1994: { month: 2, day: 10 }, 1995: { month: 1, day: 31 },
  1996: { month: 2, day: 19 }, 1997: { month: 2, day: 7 }, 1998: { month: 1, day: 28 },
  1999: { month: 2, day: 16 }, 2000: { month: 2, day: 5 }, 2001: { month: 1, day: 24 },
  2002: { month: 2, day: 12 }, 2003: { month: 2, day: 1 }, 2004: { month: 1, day: 22 },
  2005: { month: 2, day: 9 }, 2006: { month: 1, day: 29 }, 2007: { month: 2, day: 18 },
  2008: { month: 2, day: 7 }, 2009: { month: 1, day: 26 }, 2010: { month: 2, day: 14 },
  2011: { month: 2, day: 3 }, 2012: { month: 1, day: 23 }, 2013: { month: 2, day: 10 },
  2014: { month: 1, day: 31 }, 2015: { month: 2, day: 19 }, 2016: { month: 2, day: 8 },
  2017: { month: 1, day: 28 }, 2018: { month: 2, day: 16 }, 2019: { month: 2, day: 5 },
  2020: { month: 1, day: 25 }, 2021: { month: 2, day: 12 }, 2022: { month: 2, day: 1 },
  2023: { month: 1, day: 22 }, 2024: { month: 2, day: 10 }, 2025: { month: 1, day: 29 },
  2026: { month: 2, day: 17 }, 2027: { month: 2, day: 6 }, 2028: { month: 1, day: 26 },
  2029: { month: 2, day: 13 }, 2030: { month: 2, day: 3 },
}

export function getChineseZodiacAnimal(year: number, month: number, day: number): ChineseZodiacAnimal {
  // Check if before Chinese New Year
  const cnyDate = CHINESE_NEW_YEAR_DATES[year]
  let effectiveYear = year

  if (cnyDate) {
    const birthDate = new Date(year, month - 1, day)
    const cnyDateObj = new Date(year, cnyDate.month - 1, cnyDate.day)
    if (birthDate < cnyDateObj) {
      effectiveYear = year - 1
    }
  }

  // Calculate the animal based on the year cycle
  const baseYear = 1924 // Rat year
  const yearDiff = effectiveYear - baseYear
  const animalIndex = ((yearDiff % 12) + 12) % 12

  return CHINESE_ZODIAC_ANIMALS[animalIndex]
}

export function getChineseElement(year: number): ChineseElement {
  // Elements cycle every 2 years
  const baseYear = 1924 // Wood year
  const yearDiff = year - baseYear
  const elementIndex = Math.floor(((yearDiff % 10) + 10) % 10 / 2)

  return CHINESE_ELEMENTS[elementIndex]
}

export function getYinYang(year: number): 'Yin' | 'Yang' {
  return year % 2 === 0 ? 'Yang' : 'Yin'
}
