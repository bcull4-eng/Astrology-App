/**
 * Zodiac Sign Data
 *
 * Comprehensive data for all 12 zodiac signs.
 */

export const ZODIAC_SIGNS = [
  'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
  'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
] as const

export type ZodiacSign = typeof ZODIAC_SIGNS[number]

export interface ZodiacSignData {
  name: string
  symbol: string
  element: 'fire' | 'earth' | 'air' | 'water'
  modality: 'cardinal' | 'fixed' | 'mutable'
  rulingPlanet: string
  dateRange: string
  startDate: { month: number; day: number }
  endDate: { month: number; day: number }
  traits: string[]
  strengths: string[]
  weaknesses: string[]
  loveStyle: string
  careerStrengths: string
  celebrities: string[]
  compatibleSigns: ZodiacSign[]
  leastCompatible: ZodiacSign[]
  luckyNumbers: number[]
  luckyColors: string[]
  luckyDay: string
  bodyPart: string
  tarotCard: string
  description: string
  personality: string
  inLove: string
  atWork: string
}

export const ZODIAC_DATA: Record<ZodiacSign, ZodiacSignData> = {
  aries: {
    name: 'Aries',
    symbol: '♈',
    element: 'fire',
    modality: 'cardinal',
    rulingPlanet: 'Mars',
    dateRange: 'March 21 - April 19',
    startDate: { month: 3, day: 21 },
    endDate: { month: 4, day: 19 },
    traits: ['Bold', 'Ambitious', 'Energetic', 'Competitive', 'Honest', 'Impulsive'],
    strengths: ['Courageous', 'Determined', 'Confident', 'Enthusiastic', 'Optimistic'],
    weaknesses: ['Impatient', 'Moody', 'Short-tempered', 'Impulsive', 'Aggressive'],
    loveStyle: 'Passionate and direct, Aries loves the chase and thrives on excitement in relationships.',
    careerStrengths: 'Natural leaders who excel in competitive environments, entrepreneurship, and roles requiring quick decisions.',
    celebrities: ['Lady Gaga', 'Robert Downey Jr.', 'Emma Watson', 'Mariah Carey'],
    compatibleSigns: ['leo', 'sagittarius', 'gemini', 'aquarius'],
    leastCompatible: ['cancer', 'capricorn'],
    luckyNumbers: [1, 8, 17],
    luckyColors: ['Red', 'Orange'],
    luckyDay: 'Tuesday',
    bodyPart: 'Head',
    tarotCard: 'The Emperor',
    description: 'Aries is the first sign of the zodiac, and that\'s pretty much how those born under this sign see themselves: first. Aries are the leaders of the pack, first in line to get things going.',
    personality: 'Aries individuals are known for their fierce independence and bold nature. They approach life with enthusiasm and aren\'t afraid to take risks. Their competitive spirit drives them to be the best at everything they do.',
    inLove: 'In relationships, Aries is passionate, exciting, and always ready for adventure. They fall in love quickly and intensely, but need a partner who can match their energy and give them space to be themselves.',
    atWork: 'Aries excels in leadership positions and careers that offer variety and challenge. They make excellent entrepreneurs, athletes, military personnel, and executives.',
  },
  taurus: {
    name: 'Taurus',
    symbol: '♉',
    element: 'earth',
    modality: 'fixed',
    rulingPlanet: 'Venus',
    dateRange: 'April 20 - May 20',
    startDate: { month: 4, day: 20 },
    endDate: { month: 5, day: 20 },
    traits: ['Reliable', 'Patient', 'Practical', 'Devoted', 'Stubborn', 'Sensual'],
    strengths: ['Reliable', 'Patient', 'Practical', 'Devoted', 'Responsible'],
    weaknesses: ['Stubborn', 'Possessive', 'Uncompromising', 'Materialistic'],
    loveStyle: 'Sensual and devoted, Taurus seeks stability and loyalty in relationships, showering partners with affection.',
    careerStrengths: 'Excellent in finance, art, music, and any field requiring patience and attention to detail.',
    celebrities: ['Adele', 'Dwayne Johnson', 'Queen Elizabeth II', 'David Beckham'],
    compatibleSigns: ['virgo', 'capricorn', 'cancer', 'pisces'],
    leastCompatible: ['leo', 'aquarius'],
    luckyNumbers: [2, 6, 9, 12],
    luckyColors: ['Green', 'Pink'],
    luckyDay: 'Friday',
    bodyPart: 'Throat/Neck',
    tarotCard: 'The Hierophant',
    description: 'Taurus is an earth sign represented by the bull. Like their celestial spirit animal, Taureans enjoy relaxing in serene environments surrounded by soft sounds, soothing aromas, and succulent flavors.',
    personality: 'Taurus individuals are known for their reliability and practical approach to life. They value stability and security above all else, and work steadily toward their goals.',
    inLove: 'Taurus is incredibly romantic and sensual in love. They seek long-term commitment and show love through physical affection, gifts, and acts of service.',
    atWork: 'Taurus excels in careers that offer stability and allow them to work at their own pace. They make excellent bankers, artists, chefs, and real estate professionals.',
  },
  gemini: {
    name: 'Gemini',
    symbol: '♊',
    element: 'air',
    modality: 'mutable',
    rulingPlanet: 'Mercury',
    dateRange: 'May 21 - June 20',
    startDate: { month: 5, day: 21 },
    endDate: { month: 6, day: 20 },
    traits: ['Adaptable', 'Outgoing', 'Intelligent', 'Curious', 'Witty', 'Restless'],
    strengths: ['Gentle', 'Affectionate', 'Curious', 'Adaptable', 'Quick learner'],
    weaknesses: ['Nervous', 'Inconsistent', 'Indecisive', 'Superficial'],
    loveStyle: 'Playful and intellectually stimulating, Gemini needs mental connection and variety in relationships.',
    careerStrengths: 'Communication experts who excel in writing, teaching, sales, and media.',
    celebrities: ['Angelina Jolie', 'Johnny Depp', 'Kanye West', 'Marilyn Monroe'],
    compatibleSigns: ['libra', 'aquarius', 'aries', 'leo'],
    leastCompatible: ['virgo', 'pisces'],
    luckyNumbers: [5, 7, 14, 23],
    luckyColors: ['Yellow', 'Light Green'],
    luckyDay: 'Wednesday',
    bodyPart: 'Arms/Hands/Lungs',
    tarotCard: 'The Lovers',
    description: 'Gemini is represented by the twins, symbolizing their dual nature. These curious air signs are fascinated by the world and have a genuine interest in everything around them.',
    personality: 'Geminis are the social butterflies of the zodiac. Their quick wit and adaptable nature makes them excellent conversationalists who can talk to anyone about anything.',
    inLove: 'Gemini needs intellectual stimulation in relationships. They fall for people who can match their wit and keep conversations interesting. Variety and spontaneity are key.',
    atWork: 'Gemini thrives in fast-paced environments that offer variety. They excel as journalists, marketers, teachers, and in any role involving communication.',
  },
  cancer: {
    name: 'Cancer',
    symbol: '♋',
    element: 'water',
    modality: 'cardinal',
    rulingPlanet: 'Moon',
    dateRange: 'June 21 - July 22',
    startDate: { month: 6, day: 21 },
    endDate: { month: 7, day: 22 },
    traits: ['Nurturing', 'Intuitive', 'Emotional', 'Protective', 'Loyal', 'Moody'],
    strengths: ['Tenacious', 'Highly imaginative', 'Loyal', 'Emotional', 'Sympathetic'],
    weaknesses: ['Moody', 'Pessimistic', 'Suspicious', 'Manipulative', 'Insecure'],
    loveStyle: 'Deeply nurturing and protective, Cancer seeks emotional security and creates a loving home environment.',
    careerStrengths: 'Excel in caregiving roles, hospitality, real estate, and creative fields.',
    celebrities: ['Tom Hanks', 'Meryl Streep', 'Princess Diana', 'Ariana Grande'],
    compatibleSigns: ['scorpio', 'pisces', 'taurus', 'virgo'],
    leastCompatible: ['aries', 'libra'],
    luckyNumbers: [2, 3, 15, 20],
    luckyColors: ['White', 'Silver'],
    luckyDay: 'Monday',
    bodyPart: 'Chest/Stomach',
    tarotCard: 'The Chariot',
    description: 'Cancer is a cardinal water sign represented by the crab. These intuitive creatures protect their soft interiors with hard shells, retreating into their shells when they feel threatened.',
    personality: 'Cancers are deeply intuitive and sentimental. They care deeply about family and home, and are known for their nurturing nature and emotional intelligence.',
    inLove: 'Cancer is one of the most loving and nurturing partners. They create deep emotional bonds and prioritize their partner\'s emotional wellbeing above all.',
    atWork: 'Cancer excels in roles that allow them to care for others. They make excellent nurses, therapists, chefs, and human resources professionals.',
  },
  leo: {
    name: 'Leo',
    symbol: '♌',
    element: 'fire',
    modality: 'fixed',
    rulingPlanet: 'Sun',
    dateRange: 'July 23 - August 22',
    startDate: { month: 7, day: 23 },
    endDate: { month: 8, day: 22 },
    traits: ['Confident', 'Dramatic', 'Creative', 'Generous', 'Warm-hearted', 'Proud'],
    strengths: ['Creative', 'Passionate', 'Generous', 'Warm-hearted', 'Cheerful'],
    weaknesses: ['Arrogant', 'Stubborn', 'Self-centered', 'Lazy', 'Inflexible'],
    loveStyle: 'Romantic and generous, Leo loves grand gestures and needs admiration and loyalty from partners.',
    careerStrengths: 'Natural performers who excel in entertainment, leadership, and creative industries.',
    celebrities: ['Barack Obama', 'Jennifer Lopez', 'Madonna', 'Chris Hemsworth'],
    compatibleSigns: ['aries', 'sagittarius', 'gemini', 'libra'],
    leastCompatible: ['taurus', 'scorpio'],
    luckyNumbers: [1, 3, 10, 19],
    luckyColors: ['Gold', 'Orange'],
    luckyDay: 'Sunday',
    bodyPart: 'Heart/Spine',
    tarotCard: 'Strength',
    description: 'Leo is represented by the lion, and these spirited fire signs are the kings and queens of the celestial jungle. They\'re delighted to embrace their royal status.',
    personality: 'Leos are natural-born leaders with magnetic personalities. They love to be in the spotlight and have a flair for the dramatic. Their warmth and generosity make them beloved friends.',
    inLove: 'Leo loves passionately and expects the same in return. They need a partner who appreciates them, supports their dreams, and isn\'t afraid of their larger-than-life personality.',
    atWork: 'Leo excels in positions of leadership and creative expression. They make excellent actors, directors, executives, and entrepreneurs.',
  },
  virgo: {
    name: 'Virgo',
    symbol: '♍',
    element: 'earth',
    modality: 'mutable',
    rulingPlanet: 'Mercury',
    dateRange: 'August 23 - September 22',
    startDate: { month: 8, day: 23 },
    endDate: { month: 9, day: 22 },
    traits: ['Analytical', 'Practical', 'Hardworking', 'Helpful', 'Modest', 'Critical'],
    strengths: ['Loyal', 'Analytical', 'Kind', 'Hardworking', 'Practical'],
    weaknesses: ['Shyness', 'Worry', 'Overly critical', 'All work no play'],
    loveStyle: 'Shows love through acts of service and attention to detail. Seeks a partner who appreciates their devotion.',
    careerStrengths: 'Excel in analysis, healthcare, service industries, and detail-oriented work.',
    celebrities: ['Beyoncé', 'Keanu Reeves', 'Michael Jackson', 'Zendaya'],
    compatibleSigns: ['taurus', 'capricorn', 'cancer', 'scorpio'],
    leastCompatible: ['gemini', 'sagittarius'],
    luckyNumbers: [5, 14, 15, 23],
    luckyColors: ['Grey', 'Beige', 'Pale Yellow'],
    luckyDay: 'Wednesday',
    bodyPart: 'Digestive System',
    tarotCard: 'The Hermit',
    description: 'Virgo is an earth sign historically represented by the goddess of wheat and agriculture. This connection speaks to Virgo\'s deep-rooted presence in the material world.',
    personality: 'Virgos are analytical, practical, and hardworking. They have a keen eye for detail and take a methodical approach to life. Their desire to help others is genuine and heartfelt.',
    inLove: 'Virgo shows love through actions rather than words. They\'re devoted partners who pay attention to every detail of their loved one\'s needs.',
    atWork: 'Virgo excels in roles requiring precision and analysis. They make excellent doctors, editors, accountants, and researchers.',
  },
  libra: {
    name: 'Libra',
    symbol: '♎',
    element: 'air',
    modality: 'cardinal',
    rulingPlanet: 'Venus',
    dateRange: 'September 23 - October 22',
    startDate: { month: 9, day: 23 },
    endDate: { month: 10, day: 22 },
    traits: ['Diplomatic', 'Gracious', 'Fair-minded', 'Social', 'Indecisive', 'Charming'],
    strengths: ['Cooperative', 'Diplomatic', 'Gracious', 'Fair-minded', 'Social'],
    weaknesses: ['Indecisive', 'Avoids confrontations', 'Self-pity', 'Holds grudges'],
    loveStyle: 'Romantic and partnership-oriented, Libra seeks harmony and balance in relationships.',
    careerStrengths: 'Excel in law, diplomacy, design, and any field requiring negotiation skills.',
    celebrities: ['Kim Kardashian', 'Will Smith', 'Gwen Stefani', 'Bruno Mars'],
    compatibleSigns: ['gemini', 'aquarius', 'leo', 'sagittarius'],
    leastCompatible: ['cancer', 'capricorn'],
    luckyNumbers: [4, 6, 13, 15],
    luckyColors: ['Pink', 'Blue'],
    luckyDay: 'Friday',
    bodyPart: 'Kidneys/Lower Back',
    tarotCard: 'Justice',
    description: 'Libra is an air sign represented by the scales, an association that reflects Libra\'s fixation on balance and harmony. Libra is obsessed with symmetry and strives to create equilibrium.',
    personality: 'Libras are charming, social, and have a natural ability to see all sides of a situation. They value fairness and harmony, often playing the role of mediator.',
    inLove: 'Libra is the sign of partnership. They thrive in committed relationships and are happiest when they have a partner to share life\'s experiences with.',
    atWork: 'Libra excels in roles that involve working with others and creating harmony. They make excellent lawyers, diplomats, designers, and counselors.',
  },
  scorpio: {
    name: 'Scorpio',
    symbol: '♏',
    element: 'water',
    modality: 'fixed',
    rulingPlanet: 'Pluto',
    dateRange: 'October 23 - November 21',
    startDate: { month: 10, day: 23 },
    endDate: { month: 11, day: 21 },
    traits: ['Passionate', 'Resourceful', 'Brave', 'Mysterious', 'Intense', 'Jealous'],
    strengths: ['Resourceful', 'Brave', 'Passionate', 'Stubborn', 'True friend'],
    weaknesses: ['Distrusting', 'Jealous', 'Secretive', 'Violent', 'Manipulative'],
    loveStyle: 'Intensely passionate and deeply loyal, Scorpio seeks transformative, all-or-nothing connections.',
    careerStrengths: 'Excel in investigation, psychology, finance, and roles requiring depth and determination.',
    celebrities: ['Leonardo DiCaprio', 'Drake', 'Katy Perry', 'Ryan Gosling'],
    compatibleSigns: ['cancer', 'pisces', 'virgo', 'capricorn'],
    leastCompatible: ['leo', 'aquarius'],
    luckyNumbers: [8, 11, 18, 22],
    luckyColors: ['Scarlet', 'Black', 'Rust'],
    luckyDay: 'Tuesday',
    bodyPart: 'Reproductive System',
    tarotCard: 'Death',
    description: 'Scorpio is a water sign that derives its strength from the psychic, emotional realm. Like fellow water signs Cancer and Pisces, Scorpio is extremely clairvoyant and intuitive.',
    personality: 'Scorpios are known for their intensity and passion. They feel everything deeply and approach life with determination and resourcefulness. Their mysterious nature draws others in.',
    inLove: 'Scorpio loves deeply and completely. They seek emotional intimacy and total commitment, and will be fiercely loyal to the right partner.',
    atWork: 'Scorpio excels in roles that require investigation and depth. They make excellent detectives, psychologists, surgeons, and researchers.',
  },
  sagittarius: {
    name: 'Sagittarius',
    symbol: '♐',
    element: 'fire',
    modality: 'mutable',
    rulingPlanet: 'Jupiter',
    dateRange: 'November 22 - December 21',
    startDate: { month: 11, day: 22 },
    endDate: { month: 12, day: 21 },
    traits: ['Optimistic', 'Adventurous', 'Philosophical', 'Honest', 'Restless', 'Blunt'],
    strengths: ['Generous', 'Idealistic', 'Great sense of humor', 'Adventurous'],
    weaknesses: ['Promises more than can deliver', 'Impatient', 'Tactless'],
    loveStyle: 'Free-spirited and adventurous, Sagittarius needs a partner who loves exploration and growth.',
    careerStrengths: 'Excel in travel, education, publishing, and philosophy-related fields.',
    celebrities: ['Taylor Swift', 'Brad Pitt', 'Miley Cyrus', 'Jay-Z'],
    compatibleSigns: ['aries', 'leo', 'libra', 'aquarius'],
    leastCompatible: ['virgo', 'pisces'],
    luckyNumbers: [3, 7, 9, 12],
    luckyColors: ['Blue', 'Purple'],
    luckyDay: 'Thursday',
    bodyPart: 'Hips/Thighs',
    tarotCard: 'Temperance',
    description: 'Sagittarius is represented by the archer, a mythological centaur who launches arrows across the sky. These fire signs are on a perpetual quest for knowledge.',
    personality: 'Sagittarians are optimistic, freedom-loving, and always seeking new adventures. They have a philosophical mind and love to explore both the world and ideas.',
    inLove: 'Sagittarius needs freedom in relationships. They seek a partner who is also their best friend and fellow adventurer, someone who won\'t try to tie them down.',
    atWork: 'Sagittarius thrives in careers involving travel, teaching, or publishing. They make excellent professors, travel guides, and motivational speakers.',
  },
  capricorn: {
    name: 'Capricorn',
    symbol: '♑',
    element: 'earth',
    modality: 'cardinal',
    rulingPlanet: 'Saturn',
    dateRange: 'December 22 - January 19',
    startDate: { month: 12, day: 22 },
    endDate: { month: 1, day: 19 },
    traits: ['Responsible', 'Disciplined', 'Ambitious', 'Patient', 'Reserved', 'Pessimistic'],
    strengths: ['Responsible', 'Disciplined', 'Self-control', 'Good managers'],
    weaknesses: ['Know-it-all', 'Unforgiving', 'Condescending', 'Pessimistic'],
    loveStyle: 'Traditional and committed, Capricorn takes relationships seriously and builds lasting foundations.',
    careerStrengths: 'Natural executives who excel in business, finance, and management.',
    celebrities: ['Michelle Obama', 'Denzel Washington', 'LeBron James', 'Kate Middleton'],
    compatibleSigns: ['taurus', 'virgo', 'scorpio', 'pisces'],
    leastCompatible: ['aries', 'libra'],
    luckyNumbers: [4, 8, 13, 22],
    luckyColors: ['Brown', 'Black', 'Khaki'],
    luckyDay: 'Saturday',
    bodyPart: 'Knees/Bones/Skin',
    tarotCard: 'The Devil',
    description: 'Capricorn is represented by the sea goat, a mythological creature with the body of a goat and tail of a fish. This speaks to Capricorn\'s ability to navigate both material and emotional realms.',
    personality: 'Capricorns are ambitious, disciplined, and practical. They have incredible self-control and work tirelessly toward their goals. Success and status are important to them.',
    inLove: 'Capricorn takes love seriously and isn\'t interested in casual flings. They seek a partner who shares their values and long-term vision for life.',
    atWork: 'Capricorn is destined for success in business. They make excellent CEOs, managers, bankers, and politicians.',
  },
  aquarius: {
    name: 'Aquarius',
    symbol: '♒',
    element: 'air',
    modality: 'fixed',
    rulingPlanet: 'Uranus',
    dateRange: 'January 20 - February 18',
    startDate: { month: 1, day: 20 },
    endDate: { month: 2, day: 18 },
    traits: ['Progressive', 'Original', 'Independent', 'Humanitarian', 'Aloof', 'Unpredictable'],
    strengths: ['Progressive', 'Original', 'Independent', 'Humanitarian'],
    weaknesses: ['Runs from emotional expression', 'Temperamental', 'Uncompromising'],
    loveStyle: 'Values friendship and intellectual connection. Needs space and independence in relationships.',
    careerStrengths: 'Excel in technology, science, social activism, and innovative fields.',
    celebrities: ['Oprah Winfrey', 'Harry Styles', 'Jennifer Aniston', 'The Weeknd'],
    compatibleSigns: ['gemini', 'libra', 'aries', 'sagittarius'],
    leastCompatible: ['taurus', 'scorpio'],
    luckyNumbers: [4, 7, 11, 22],
    luckyColors: ['Electric Blue', 'Turquoise'],
    luckyDay: 'Saturday',
    bodyPart: 'Ankles/Circulatory System',
    tarotCard: 'The Star',
    description: 'Aquarius is represented by the water bearer, the mystical healer who bestows water, or life, upon the land. This air sign is dedicated to making the world a better place.',
    personality: 'Aquarians are progressive, independent, and humanitarian. They march to the beat of their own drum and aren\'t afraid to challenge conventions.',
    inLove: 'Aquarius values friendship in relationships. They need a partner who respects their independence and shares their vision for a better world.',
    atWork: 'Aquarius thrives in innovative and humanitarian roles. They make excellent scientists, inventors, activists, and programmers.',
  },
  pisces: {
    name: 'Pisces',
    symbol: '♓',
    element: 'water',
    modality: 'mutable',
    rulingPlanet: 'Neptune',
    dateRange: 'February 19 - March 20',
    startDate: { month: 2, day: 19 },
    endDate: { month: 3, day: 20 },
    traits: ['Compassionate', 'Artistic', 'Intuitive', 'Gentle', 'Escapist', 'Dreamy'],
    strengths: ['Compassionate', 'Artistic', 'Intuitive', 'Gentle', 'Wise'],
    weaknesses: ['Fearful', 'Overly trusting', 'Sad', 'Desire to escape reality'],
    loveStyle: 'Deeply romantic and devoted, Pisces loves unconditionally and seeks spiritual connection.',
    careerStrengths: 'Excel in arts, healing professions, spirituality, and creative fields.',
    celebrities: ['Rihanna', 'Justin Bieber', 'Albert Einstein', 'Steve Jobs'],
    compatibleSigns: ['cancer', 'scorpio', 'taurus', 'capricorn'],
    leastCompatible: ['gemini', 'sagittarius'],
    luckyNumbers: [3, 9, 12, 15],
    luckyColors: ['Mauve', 'Lilac', 'Sea Green'],
    luckyDay: 'Thursday',
    bodyPart: 'Feet/Lymphatic System',
    tarotCard: 'The Moon',
    description: 'Pisces is the final sign of the zodiac, and thus represents the culmination of every other sign\'s journey. As a result, Pisces is the most intuitive, sensitive, and empathetic sign.',
    personality: 'Pisceans are deeply intuitive and artistic. They have a rich inner life and often feel connected to something larger than themselves. Their empathy is unmatched.',
    inLove: 'Pisces is the ultimate romantic. They love deeply and completely, often putting their partner\'s needs before their own. They seek a soulmate connection.',
    atWork: 'Pisces excels in creative and healing professions. They make excellent artists, musicians, nurses, and spiritual counselors.',
  },
}

export function getZodiacSign(month: number, day: number): ZodiacSign {
  for (const [sign, data] of Object.entries(ZODIAC_DATA)) {
    const { startDate, endDate } = data

    // Handle signs that span year boundary (Capricorn)
    if (startDate.month > endDate.month) {
      if (
        (month === startDate.month && day >= startDate.day) ||
        (month === endDate.month && day <= endDate.day)
      ) {
        return sign as ZodiacSign
      }
    } else {
      if (
        (month === startDate.month && day >= startDate.day) ||
        (month === endDate.month && day <= endDate.day) ||
        (month > startDate.month && month < endDate.month)
      ) {
        return sign as ZodiacSign
      }
    }
  }
  return 'aries' // fallback
}
