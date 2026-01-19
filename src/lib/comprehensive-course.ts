/**
 * Comprehensive Astrology Certification Program
 *
 * A complete astrology education covering all aspects from fundamentals
 * to advanced techniques, including professional practice skills and
 * how to read for paying clients and teach astrology to others.
 *
 * Price: £49 one-time purchase
 * Duration: 20+ hours of content
 * Certificate: Certified Astrology Practitioner
 */

import type { Course, CertificateInfo } from '@/types/learning'

export const COURSE_PRICE = 49

export const CERTIFICATE_INFO: CertificateInfo = {
  title: 'Certified Astrology Practitioner',
  description: 'This certificate verifies completion of the comprehensive Astrology Certification Program, demonstrating proficiency in natal chart interpretation, predictive techniques, relationship astrology, professional client practice, and teaching methodology.',
  credentialId: 'ASTRO-CAP',
  skills: [
    'Natal Chart Interpretation',
    'Planetary Analysis',
    'House System Mastery',
    'Aspect Pattern Recognition',
    'Transit & Progression Forecasting',
    'Synastry & Relationship Analysis',
    'Professional Client Practice',
    'Business & Ethics',
    'Teaching & Curriculum Design',
  ],
}

// Course outline with all modules and lessons
export const COMPREHENSIVE_COURSE_OUTLINE = {
  id: 'astrology-certification',
  title: 'Astrology Certification Program',
  subtitle: 'Become a Certified Astrology Practitioner',
  description: 'Master every aspect of astrology in this comprehensive certification program. From fundamental concepts to advanced predictive techniques, learn everything you need to read charts professionally and teach others.',
  price: COURSE_PRICE,
  estimatedHours: 20,
  totalLessons: 90,
  totalModules: 10,
  certificate: CERTIFICATE_INFO,

  modules: [
    {
      id: 'foundations',
      number: 1,
      title: 'Foundations of Astrology',
      description: 'Build a rock-solid foundation with the essential building blocks of astrological knowledge.',
      lessons: 6,
      topics: [
        'History and origins of astrology',
        'The celestial sphere and ecliptic',
        'Understanding the birth chart structure',
        'Introduction to the zodiac wheel',
        'Elements and modalities overview',
        'Your first chart reading basics',
      ],
    },
    {
      id: 'zodiac-signs',
      number: 2,
      title: 'The Twelve Zodiac Signs',
      description: 'Deep dive into each zodiac sign - their psychology, motivations, strengths, and shadows.',
      lessons: 6,
      topics: [
        'Aries, Taurus, Gemini - Spring signs',
        'Cancer, Leo, Virgo - Summer signs',
        'Libra, Scorpio, Sagittarius - Autumn signs',
        'Capricorn, Aquarius, Pisces - Winter signs',
        'Sign polarities and relationships',
        'Decanates and sign subdivisions',
      ],
    },
    {
      id: 'planets',
      number: 3,
      title: 'The Celestial Bodies',
      description: 'Understand every planet from the personal planets to the outer transpersonal bodies.',
      lessons: 8,
      topics: [
        'The Luminaries: Sun and Moon',
        'Personal planets: Mercury, Venus, Mars',
        'Social planets: Jupiter and Saturn',
        'Transpersonal planets: Uranus, Neptune, Pluto',
        'Chiron and the asteroid belt',
        'The Lunar Nodes: North and South',
        'Lilith and other sensitive points',
        'Planetary dignities and debilities',
      ],
    },
    {
      id: 'houses',
      number: 4,
      title: 'The Twelve Houses',
      description: 'Master the house system - the areas of life where planetary energies manifest.',
      lessons: 6,
      topics: [
        'Angular houses (1, 4, 7, 10): Life pillars',
        'Succedent houses (2, 5, 8, 11): Resources',
        'Cadent houses (3, 6, 9, 12): Adaptation',
        'House rulerships and derivatives',
        'Empty houses and stelliums',
        'Different house systems explained',
      ],
    },
    {
      id: 'aspects',
      number: 5,
      title: 'Planetary Aspects',
      description: 'Learn how planets communicate through geometric relationships.',
      lessons: 7,
      topics: [
        'Major aspects: Conjunction, Opposition, Trine',
        'Challenging aspects: Square and Quincunx',
        'Minor aspects: Sextile, Semi-sextile, Quintile',
        'Aspect orbs and applying vs separating',
        'Aspect patterns: Grand Trine, T-Square, Yod',
        'Grand Cross and Stellium configurations',
        'Unaspected planets and their meaning',
      ],
    },
    {
      id: 'chart-synthesis',
      number: 6,
      title: 'Chart Synthesis & Interpretation',
      description: 'Learn to weave all elements together into a coherent chart interpretation.',
      lessons: 6,
      topics: [
        'The interpretation hierarchy',
        'Finding the chart ruler and final dispositor',
        'Identifying dominant themes and patterns',
        'Balancing conflicting chart factors',
        'Creating a narrative from the chart',
        'Practice readings and case studies',
      ],
    },
    {
      id: 'predictive',
      number: 7,
      title: 'Predictive Astrology',
      description: 'Master the art of forecasting with transits, progressions, and solar returns.',
      lessons: 7,
      topics: [
        'Understanding transits and their timing',
        'Outer planet transits: Life chapters',
        'Personal planet transits: Daily influences',
        'Secondary progressions explained',
        'Solar Arc directions',
        'Solar and Lunar returns',
        'Timing techniques and predictions',
      ],
    },
    {
      id: 'relationship',
      number: 8,
      title: 'Relationship Astrology',
      description: 'Explore the astrology of relationships through synastry and composite charts.',
      lessons: 6,
      topics: [
        'Synastry basics: Chart comparison',
        'Key synastry aspects for compatibility',
        'The composite chart: Relationship entity',
        'Davison chart technique',
        'Family astrology and dynamics',
        'Business and friendship compatibility',
      ],
    },
    {
      id: 'specialized',
      number: 9,
      title: 'Specialized Branches',
      description: 'Explore specialized applications of astrological knowledge.',
      lessons: 6,
      topics: [
        'Medical astrology fundamentals',
        'Financial and business astrology',
        'Electional astrology: Choosing dates',
        'Horary astrology: Question charts',
        'Mundane astrology: World events',
        'Astrocartography: Location astrology',
      ],
    },
    {
      id: 'psychology',
      number: 10,
      title: 'Psychological Astrology',
      description: 'Integrate psychological principles with astrological interpretation.',
      lessons: 5,
      topics: [
        'Jung and astrology: Archetypes',
        'Shadow work through the chart',
        'Defense mechanisms in planetary aspects',
        'The wounded healer: Chiron in depth',
        'Using astrology for personal growth',
      ],
    },
    {
      id: 'ethics-practice',
      number: 11,
      title: 'Professional Ethics & Practice',
      description: 'Develop the skills and ethics needed for professional consultations.',
      lessons: 5,
      topics: [
        'Ethics in astrological practice',
        'Client consultation techniques',
        'Handling sensitive topics with care',
        'Building an astrology practice',
        'Continuing education and growth',
      ],
    },
    {
      id: 'teaching',
      number: 12,
      title: 'Teaching Astrology to Others',
      description: 'Learn how to effectively share your astrological knowledge with students.',
      lessons: 4,
      topics: [
        'Curriculum design and lesson planning',
        'Teaching methods for different learners',
        'Creating workshops and courses',
        'Building an educational practice',
      ],
    },
  ],
}

// What students will learn - for marketing
export const LEARNING_OUTCOMES = [
  'Read and interpret any natal birth chart with confidence',
  'Understand the psychological dynamics of all 12 zodiac signs',
  'Analyze planetary placements, aspects, and house positions',
  'Forecast life events using transits and progressions',
  'Provide relationship compatibility readings',
  'Apply specialized techniques like electional and horary astrology',
  'Conduct ethical and empowering client consultations',
  'Design and teach your own astrology courses',
]

// Who this course is for
export const TARGET_AUDIENCE = [
  'Beginners who want a complete astrology education',
  'Intermediate students looking to fill knowledge gaps',
  'Anyone wanting professional-level chart reading skills',
  'Those interested in teaching astrology to others',
  'People seeking a meaningful credential in astrology',
]

// Course features for marketing
export const COURSE_FEATURES = [
  {
    icon: 'book',
    title: '72 In-Depth Lessons',
    description: 'Comprehensive coverage of every astrological topic',
  },
  {
    icon: 'clock',
    title: '15+ Hours of Content',
    description: 'Learn at your own pace with lifetime access',
  },
  {
    icon: 'chart',
    title: 'Interactive Exercises',
    description: 'Practice with your own birth chart throughout',
  },
  {
    icon: 'quiz',
    title: 'Knowledge Checks',
    description: 'Quizzes to reinforce learning in every module',
  },
  {
    icon: 'certificate',
    title: 'Official Certificate',
    description: 'Earn your Certified Astrology Practitioner credential',
  },
  {
    icon: 'teach',
    title: 'Teaching Module',
    description: 'Learn to share your knowledge with others',
  },
]

// Testimonials (mock for now)
export const TESTIMONIALS = [
  {
    name: 'Sarah M.',
    location: 'London, UK',
    quote: 'This course transformed my understanding of astrology. The certificate gave me the confidence to start offering readings professionally.',
    avatar: 'SM',
  },
  {
    name: 'James K.',
    location: 'Manchester, UK',
    quote: 'The teaching module was exactly what I needed. I now run monthly astrology workshops at my local community center.',
    avatar: 'JK',
  },
  {
    name: 'Emma T.',
    location: 'Edinburgh, UK',
    quote: 'I love how the lessons connect to my own birth chart. It makes the learning so much more personal and memorable.',
    avatar: 'ET',
  },
]
