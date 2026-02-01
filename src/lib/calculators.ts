/**
 * Calculator Business Logic
 *
 * Functions to process natal chart data for various calculator results
 */

import type {
  NatalChart,
  NatalPlacement,
  Planet,
  ZodiacSign,
  ZodiacPosition
} from '@/types/astrology'
import type {
  Calculator,
  SignResult,
  SignInterpretation,
  SaturnReturnResult,
  SolarReturnResult,
  LunarReturnResult,
  MoonPhaseResult,
  MoonPhase,
  PartOfFortuneResult,
  LilithResult,
  CompatibilityResult,
  CompatibilityAspect
} from '@/types/calculators'
import type { BirthData } from '@/types'
import { getAstrologyClient } from './astrology-api'

// Sign interpretations database
const signInterpretations: Record<Planet | 'ascendant' | 'midheaven' | 'part_of_fortune' | 'lilith', Record<ZodiacSign, SignInterpretation>> = {
  sun: {
    aries: {
      title: 'Aries Sun',
      summary: 'You are a natural-born leader with an independent spirit and pioneering nature. Your confidence and directness inspire others to action.',
      traits: ['Courageous', 'Confident', 'Enthusiastic', 'Direct', 'Competitive'],
      strengths: ['Natural leadership', 'Takes initiative', 'Energetic', 'Honest'],
      challenges: ['Impatience', 'Can be aggressive', 'May overlook details', 'Prone to burnout']
    },
    taurus: {
      title: 'Taurus Sun',
      summary: 'You are grounded, reliable, and appreciate the finer things in life. Your patience and determination help you build lasting success.',
      traits: ['Patient', 'Reliable', 'Practical', 'Sensual', 'Determined'],
      strengths: ['Financial acumen', 'Loyal', 'Appreciates beauty', 'Strong-willed'],
      challenges: ['Stubbornness', 'Resistance to change', 'Possessiveness', 'Can be materialistic']
    },
    gemini: {
      title: 'Gemini Sun',
      summary: 'You have a curious, adaptable mind that thrives on variety and intellectual stimulation. Communication is your superpower.',
      traits: ['Curious', 'Adaptable', 'Witty', 'Social', 'Versatile'],
      strengths: ['Excellent communicator', 'Quick learner', 'Social butterfly', 'Youthful spirit'],
      challenges: ['Inconsistency', 'Restlessness', 'Can be superficial', 'Difficulty with commitment']
    },
    cancer: {
      title: 'Cancer Sun',
      summary: 'You are deeply intuitive and emotionally intelligent, with a nurturing nature. Home and family are central to your sense of self.',
      traits: ['Nurturing', 'Intuitive', 'Protective', 'Emotional', 'Loyal'],
      strengths: ['Emotional intelligence', 'Caring', 'Great memory', 'Creates security'],
      challenges: ['Moodiness', 'Over-sensitivity', 'Can be clingy', 'Difficulty letting go']
    },
    leo: {
      title: 'Leo Sun',
      summary: 'You shine with natural charisma and creative self-expression. Your warmth and generosity draw others to your radiant presence.',
      traits: ['Charismatic', 'Creative', 'Generous', 'Dramatic', 'Confident'],
      strengths: ['Natural performer', 'Loyal friend', 'Inspires others', 'Big-hearted'],
      challenges: ['Need for attention', 'Pride', 'Can be dominating', 'Sensitivity to criticism']
    },
    virgo: {
      title: 'Virgo Sun',
      summary: 'You have a keen analytical mind and a desire to be of service. Your attention to detail and practical wisdom make you invaluable.',
      traits: ['Analytical', 'Helpful', 'Practical', 'Modest', 'Health-conscious'],
      strengths: ['Problem-solver', 'Dedicated worker', 'Organized', 'Reliable'],
      challenges: ['Perfectionism', 'Over-critical', 'Worry-prone', 'Can be too reserved']
    },
    libra: {
      title: 'Libra Sun',
      summary: 'You seek harmony, beauty, and balanced relationships. Your diplomatic nature and aesthetic sense create peace wherever you go.',
      traits: ['Diplomatic', 'Artistic', 'Harmonious', 'Romantic', 'Fair-minded'],
      strengths: ['Peacemaker', 'Aesthetic eye', 'Great partner', 'Sees all sides'],
      challenges: ['Indecisiveness', 'People-pleasing', 'Avoids conflict', 'Can be superficial']
    },
    scorpio: {
      title: 'Scorpio Sun',
      summary: 'You possess intense emotional depth and transformative power. Your penetrating insight sees beneath the surface of everything.',
      traits: ['Intense', 'Mysterious', 'Passionate', 'Resourceful', 'Determined'],
      strengths: ['Emotional depth', 'Investigative', 'Loyal', 'Transformative'],
      challenges: ['Jealousy', 'Secretive', 'Vindictive tendencies', 'Trust issues']
    },
    sagittarius: {
      title: 'Sagittarius Sun',
      summary: 'You are a free-spirited adventurer seeking truth and meaning. Your optimism and philosophical nature inspire exploration.',
      traits: ['Adventurous', 'Optimistic', 'Philosophical', 'Honest', 'Freedom-loving'],
      strengths: ['Inspiring teacher', 'Open-minded', 'Enthusiastic', 'Visionary'],
      challenges: ['Restlessness', 'Tactless', 'Overcommits', 'Can be preachy']
    },
    capricorn: {
      title: 'Capricorn Sun',
      summary: 'You are ambitious, disciplined, and built for long-term success. Your patience and work ethic help you climb any mountain.',
      traits: ['Ambitious', 'Disciplined', 'Responsible', 'Practical', 'Reserved'],
      strengths: ['Natural authority', 'Strategic planner', 'Reliable', 'Goal-oriented'],
      challenges: ['Workaholism', 'Pessimism', 'Emotionally guarded', 'Status-conscious']
    },
    aquarius: {
      title: 'Aquarius Sun',
      summary: 'You are an innovative thinker and humanitarian at heart. Your unique perspective and progressive ideas make you ahead of your time.',
      traits: ['Innovative', 'Humanitarian', 'Independent', 'Unconventional', 'Intellectual'],
      strengths: ['Visionary', 'Values friendship', 'Original thinker', 'Tolerant'],
      challenges: ['Emotional detachment', 'Stubborn opinions', 'Rebellious', 'Can be aloof']
    },
    pisces: {
      title: 'Pisces Sun',
      summary: 'You are deeply compassionate with a rich inner life and spiritual sensitivity. Your imagination and empathy know no bounds.',
      traits: ['Compassionate', 'Intuitive', 'Artistic', 'Dreamy', 'Spiritual'],
      strengths: ['Empathetic', 'Creative', 'Healing presence', 'Adaptable'],
      challenges: ['Escapism', 'Over-sensitivity', 'Boundaries issues', 'Can be passive']
    }
  },
  moon: {
    aries: {
      title: 'Aries Moon',
      summary: 'Your emotions are quick, fiery, and direct. You need independence and action to feel emotionally fulfilled.',
      traits: ['Impulsive emotionally', 'Needs excitement', 'Quick to anger and forgive', 'Independent'],
      strengths: ['Emotional courage', 'Honest about feelings', 'Resilient', 'Self-reliant'],
      challenges: ['Emotional impatience', 'Can be combative', 'Difficulty with vulnerability', 'Reactive']
    },
    taurus: {
      title: 'Taurus Moon',
      summary: 'Your emotions are stable, sensual, and security-oriented. You need comfort and routine to feel emotionally grounded.',
      traits: ['Emotionally steady', 'Comfort-seeking', 'Loyal', 'Sensory-oriented'],
      strengths: ['Emotional stability', 'Reliable support', 'Creates cozy environments', 'Patient'],
      challenges: ['Emotional stubbornness', 'Fear of change', 'Can be possessive', 'Holds grudges']
    },
    gemini: {
      title: 'Gemini Moon',
      summary: 'Your emotions are changeable and need intellectual stimulation. You process feelings through talking and thinking.',
      traits: ['Emotionally curious', 'Needs variety', 'Talks through feelings', 'Adaptable moods'],
      strengths: ['Emotional versatility', 'Can lighten heavy moods', 'Mentally agile', 'Social'],
      challenges: ['Emotional inconsistency', 'Overthinking feelings', 'Can seem superficial', 'Nervous energy']
    },
    cancer: {
      title: 'Cancer Moon',
      summary: 'Your emotions run deep and your nurturing instincts are strong. Home and family are your emotional anchors.',
      traits: ['Deeply emotional', 'Nurturing', 'Nostalgic', 'Protective of loved ones'],
      strengths: ['Emotional intelligence', 'Caring', 'Strong intuition', 'Loyal'],
      challenges: ['Moodiness', 'Over-attachment', 'Takes things personally', 'Can be smothering']
    },
    leo: {
      title: 'Leo Moon',
      summary: 'Your emotions are warm, dramatic, and need recognition. You feel best when you can express yourself creatively.',
      traits: ['Warm-hearted', 'Needs appreciation', 'Dramatic feelings', 'Generous'],
      strengths: ['Emotional warmth', 'Uplifting presence', 'Loyal heart', 'Creative expression'],
      challenges: ['Need for attention', 'Pride in emotions', 'Can be dramatic', 'Hurt by criticism']
    },
    virgo: {
      title: 'Virgo Moon',
      summary: 'Your emotions are processed analytically and you find comfort in being useful. Service helps you feel emotionally fulfilled.',
      traits: ['Analytical about feelings', 'Helpful', 'Health-conscious', 'Modest'],
      strengths: ['Practical emotional support', 'Reliable', 'Improves situations', 'Thoughtful'],
      challenges: ['Self-critical', 'Worry-prone', 'Difficulty relaxing', 'Can be nitpicky']
    },
    libra: {
      title: 'Libra Moon',
      summary: 'Your emotions seek harmony and partnership. You feel best in balanced relationships and beautiful surroundings.',
      traits: ['Relationship-oriented', 'Aesthetically sensitive', 'Diplomatic', 'Seeks balance'],
      strengths: ['Creates harmony', 'Considerate', 'Fair', 'Good listener'],
      challenges: ['Indecisive about feelings', 'Avoids emotional conflict', 'Can be dependent', 'People-pleasing']
    },
    scorpio: {
      title: 'Scorpio Moon',
      summary: 'Your emotions are intense, deep, and all-or-nothing. You experience feelings with transformative power.',
      traits: ['Emotionally intense', 'Perceptive', 'Private about feelings', 'Passionate'],
      strengths: ['Emotional depth', 'Loyal', 'Psychologically aware', 'Transformative'],
      challenges: ['Emotional extremes', 'Jealousy', 'Difficulty trusting', 'Can be obsessive']
    },
    sagittarius: {
      title: 'Sagittarius Moon',
      summary: 'Your emotions are optimistic and need freedom. You feel best when exploring, learning, and maintaining independence.',
      traits: ['Emotionally optimistic', 'Freedom-loving', 'Philosophical', 'Adventurous'],
      strengths: ['Uplifting spirit', 'Honest about feelings', 'Resilient', 'Inspiring'],
      challenges: ['Emotional avoidance', 'Restless', 'Can be preachy', 'Commitment issues']
    },
    capricorn: {
      title: 'Capricorn Moon',
      summary: 'Your emotions are controlled and achievement-oriented. You feel secure through accomplishment and structure.',
      traits: ['Emotionally reserved', 'Responsible', 'Goal-oriented', 'Self-controlled'],
      strengths: ['Emotional maturity', 'Reliable', 'Persevering', 'Practical support'],
      challenges: ['Difficulty expressing feelings', 'Can be cold', 'Pessimistic', 'Emotional repression']
    },
    aquarius: {
      title: 'Aquarius Moon',
      summary: 'Your emotions are unconventional and need intellectual understanding. You value emotional freedom and friendship.',
      traits: ['Emotionally detached', 'Values friendship', 'Unconventional feelings', 'Humanitarian'],
      strengths: ['Emotional objectivity', 'Tolerant', 'Independent', 'Fair'],
      challenges: ['Emotional distance', 'Can seem cold', 'Difficulty with intimacy', 'Rebels against needs']
    },
    pisces: {
      title: 'Pisces Moon',
      summary: 'Your emotions are boundless, empathetic, and spiritually attuned. You feel everything deeply and need creative outlets.',
      traits: ['Highly empathetic', 'Intuitive', 'Dreamy', 'Compassionate'],
      strengths: ['Emotional sensitivity', 'Creative', 'Healing presence', 'Selfless'],
      challenges: ['Absorbs others\' emotions', 'Escapist tendencies', 'Boundaries issues', 'Can be moody']
    }
  },
  mercury: {
    aries: {
      title: 'Mercury in Aries',
      summary: 'You think fast, speak directly, and love a good debate. Your mind is quick and competitive.',
      traits: ['Direct communication', 'Quick thinker', 'Bold ideas', 'Impatient listener'],
      strengths: ['Fast decision-making', 'Honest speaker', 'Pioneering ideas', 'Confident'],
      challenges: ['Interrupts others', 'Can be argumentative', 'Hasty conclusions', 'Impatient']
    },
    taurus: {
      title: 'Mercury in Taurus',
      summary: 'You think methodically and speak deliberately. Your mind is practical and focused on tangible results.',
      traits: ['Deliberate speech', 'Practical thinking', 'Good memory', 'Resistant to changing views'],
      strengths: ['Thorough', 'Common sense', 'Reliable opinions', 'Patient listener'],
      challenges: ['Slow to decide', 'Mental stubbornness', 'Dislikes abstract ideas', 'Can be repetitive']
    },
    gemini: {
      title: 'Mercury in Gemini',
      summary: 'Mercury rules Gemini, making you a gifted communicator with a versatile, curious mind.',
      traits: ['Excellent communicator', 'Curious', 'Witty', 'Multi-tasker'],
      strengths: ['Quick learner', 'Articulate', 'Versatile thinker', 'Social intelligence'],
      challenges: ['Scattered focus', 'Nervous chatter', 'Inconsistent', 'Superficial knowledge']
    },
    cancer: {
      title: 'Mercury in Cancer',
      summary: 'You think with your heart and communicate with emotional intelligence. Memory is tied to feeling.',
      traits: ['Emotional communication', 'Good memory', 'Intuitive', 'Protective of ideas'],
      strengths: ['Empathetic listener', 'Remembers important details', 'Nurturing words', 'Imaginative'],
      challenges: ['Subjective thinking', 'Moody communication', 'Can be defensive', 'Indirect']
    },
    leo: {
      title: 'Mercury in Leo',
      summary: 'You communicate with warmth, drama, and creative flair. Your ideas are big and presentation matters.',
      traits: ['Dramatic speaker', 'Creative thinker', 'Confident opinions', 'Storyteller'],
      strengths: ['Inspiring communicator', 'Leadership through words', 'Generous with knowledge', 'Entertaining'],
      challenges: ['Can dominate conversations', 'Ego in opinions', 'Sensitive to criticism', 'Exaggerates']
    },
    virgo: {
      title: 'Mercury in Virgo',
      summary: 'Mercury rules Virgo, giving you an analytical, detail-oriented mind that excels at problem-solving.',
      traits: ['Analytical', 'Detail-oriented', 'Helpful communicator', 'Perfectionist'],
      strengths: ['Excellent analyst', 'Precise speaker', 'Practical solutions', 'Organized thinker'],
      challenges: ['Overcritical', 'Misses big picture', 'Worry-prone', 'Can be nitpicky']
    },
    libra: {
      title: 'Mercury in Libra',
      summary: 'You communicate diplomatically and think in terms of balance and fairness. Decisions come after weighing all sides.',
      traits: ['Diplomatic', 'Fair-minded', 'Charming speaker', 'Indecisive'],
      strengths: ['Mediator', 'Sees all perspectives', 'Graceful communication', 'Objective'],
      challenges: ['Indecisive', 'Avoids tough conversations', 'People-pleasing', 'Superficial agreement']
    },
    scorpio: {
      title: 'Mercury in Scorpio',
      summary: 'You think deeply and communicate with penetrating insight. Nothing escapes your psychological radar.',
      traits: ['Investigative mind', 'Intense communication', 'Strategic', 'Secretive'],
      strengths: ['Perceptive', 'Gets to the truth', 'Research skills', 'Persuasive'],
      challenges: ['Suspicious', 'Can be manipulative', 'Obsessive thinking', 'Harsh words']
    },
    sagittarius: {
      title: 'Mercury in Sagittarius',
      summary: 'You think big picture and communicate with enthusiasm and optimism. Philosophy and meaning drive your mind.',
      traits: ['Big-picture thinker', 'Enthusiastic speaker', 'Honest', 'Philosophical'],
      strengths: ['Inspiring ideas', 'Sees potential', 'Multicultural perspective', 'Optimistic outlook'],
      challenges: ['Tactless', 'Overlooks details', 'Preachy', 'Exaggerates']
    },
    capricorn: {
      title: 'Mercury in Capricorn',
      summary: 'You think strategically and communicate with authority. Your mind is practical and goal-oriented.',
      traits: ['Strategic thinker', 'Authoritative speaker', 'Practical', 'Serious'],
      strengths: ['Long-term planning', 'Credible', 'Disciplined mind', 'Realistic'],
      challenges: ['Pessimistic', 'Rigid thinking', 'Difficulty with small talk', 'Can be cold']
    },
    aquarius: {
      title: 'Mercury in Aquarius',
      summary: 'You think originally and communicate unconventional ideas. Your mind is innovative and future-oriented.',
      traits: ['Original thinker', 'Unconventional ideas', 'Humanitarian', 'Detached'],
      strengths: ['Innovative', 'Open-minded', 'Objective', 'Visionary'],
      challenges: ['Stubborn opinions', 'Emotionally detached', 'Contrarian', 'Can be preachy']
    },
    pisces: {
      title: 'Mercury in Pisces',
      summary: 'You think intuitively and communicate with imagination and empathy. Poetry comes easier than logic.',
      traits: ['Intuitive thinker', 'Imaginative', 'Empathetic communicator', 'Dreamy'],
      strengths: ['Creative ideas', 'Compassionate listener', 'Artistic expression', 'Psychic'],
      challenges: ['Vague communication', 'Difficulty with facts', 'Easily confused', 'Forgetful']
    }
  },
  venus: {
    aries: {
      title: 'Venus in Aries',
      summary: 'You love boldly and attract through confidence. The thrill of the chase excites you in romance.',
      traits: ['Passionate', 'Direct in love', 'Impulsive affection', 'Competitive'],
      strengths: ['Exciting partner', 'Honest about feelings', 'Takes initiative', 'Loyal when committed'],
      challenges: ['Impatient in love', 'Can be selfish', 'Quick to lose interest', 'Argumentative']
    },
    taurus: {
      title: 'Venus in Taurus',
      summary: 'Venus rules Taurus, making you a sensual, devoted lover who values stability and physical pleasure.',
      traits: ['Sensual', 'Loyal', 'Appreciates luxury', 'Slow to commit but steadfast'],
      strengths: ['Devoted partner', 'Creates comfort', 'Sensory appreciation', 'Reliable'],
      challenges: ['Possessive', 'Resistant to change', 'Can be materialistic', 'Stubborn in love']
    },
    gemini: {
      title: 'Venus in Gemini',
      summary: 'You love through words and mental connection. Variety and stimulating conversation keep romance alive.',
      traits: ['Flirtatious', 'Needs mental stimulation', 'Social', 'Playful in love'],
      strengths: ['Great conversationalist', 'Keeps things interesting', 'Adaptable', 'Fun'],
      challenges: ['Commitment issues', 'Fickle', 'Can be superficial', 'Easily bored']
    },
    cancer: {
      title: 'Venus in Cancer',
      summary: 'You love with nurturing devotion and seek emotional security in relationships. Home is where the heart is.',
      traits: ['Nurturing lover', 'Emotionally devoted', 'Protective', 'Sentimental'],
      strengths: ['Deeply caring', 'Creates home', 'Loyal', 'Remembers everything'],
      challenges: ['Clingy', 'Moody in love', 'Fear of rejection', 'Holds grudges']
    },
    leo: {
      title: 'Venus in Leo',
      summary: 'You love dramatically and generously. Romance should be grand, and you need to feel adored.',
      traits: ['Romantic', 'Generous', 'Needs admiration', 'Dramatic in love'],
      strengths: ['Loyal', 'Generous partner', 'Makes partner feel special', 'Warm-hearted'],
      challenges: ['Needs constant attention', 'Pride in love', 'Can be demanding', 'Drama-prone']
    },
    virgo: {
      title: 'Venus in Virgo',
      summary: 'You show love through acts of service and attention to detail. Quality over quantity in relationships.',
      traits: ['Helpful lover', 'Modest', 'Practical love', 'Health-conscious'],
      strengths: ['Devoted through actions', 'Improves partner\'s life', 'Reliable', 'Thoughtful'],
      challenges: ['Critical of partner', 'Difficulty expressing feelings', 'Too practical', 'Nervous in love']
    },
    libra: {
      title: 'Venus in Libra',
      summary: 'Venus rules Libra, making you a natural romantic who thrives in partnership and values harmony.',
      traits: ['Romantic idealist', 'Partnership-oriented', 'Charming', 'Aesthetically refined'],
      strengths: ['Natural partner', 'Creates harmony', 'Diplomatic', 'Appreciates beauty'],
      challenges: ['Indecisive in love', 'Avoids conflict', 'Can be superficial', 'Dependent']
    },
    scorpio: {
      title: 'Venus in Scorpio',
      summary: 'You love intensely and completely. Relationships are transformative, all-or-nothing experiences.',
      traits: ['Intense passion', 'All-or-nothing love', 'Jealous', 'Magnetically attractive'],
      strengths: ['Deep connection', 'Loyal', 'Passionate', 'Transformative love'],
      challenges: ['Jealous', 'Possessive', 'Trust issues', 'Can be manipulative']
    },
    sagittarius: {
      title: 'Venus in Sagittarius',
      summary: 'You love freely and need adventure in relationships. Freedom and shared experiences bond you.',
      traits: ['Adventurous lover', 'Freedom-loving', 'Honest', 'Philosophical about love'],
      strengths: ['Exciting partner', 'Honest', 'Optimistic', 'Growth-oriented'],
      challenges: ['Commitment issues', 'Restless', 'Tactless', 'Fear of being tied down']
    },
    capricorn: {
      title: 'Venus in Capricorn',
      summary: 'You love seriously and value commitment. Relationships are investments you make carefully.',
      traits: ['Serious about love', 'Status-conscious', 'Reserved', 'Loyal once committed'],
      strengths: ['Reliable partner', 'Long-term focused', 'Provides stability', 'Ambitious together'],
      challenges: ['Emotionally reserved', 'Can be cold', 'Status over love', 'Slow to open up']
    },
    aquarius: {
      title: 'Venus in Aquarius',
      summary: 'You love unconventionally and need intellectual connection. Friendship is the foundation of romance.',
      traits: ['Unconventional lover', 'Needs freedom', 'Friendly', 'Humanitarian values'],
      strengths: ['Accepting', 'Intellectual connection', 'Loyal friend-lover', 'Progressive'],
      challenges: ['Emotionally detached', 'Commitment issues', 'Too independent', 'Unpredictable']
    },
    pisces: {
      title: 'Venus in Pisces',
      summary: 'Venus is exalted in Pisces, giving you a boundless, unconditional capacity for love and romance.',
      traits: ['Romantic dreamer', 'Compassionate lover', 'Self-sacrificing', 'Idealistic'],
      strengths: ['Unconditional love', 'Romantic', 'Empathetic', 'Creative in love'],
      challenges: ['Idealizes partners', 'Escapist', 'Boundaries issues', 'Can be a martyr']
    }
  },
  mars: {
    aries: {
      title: 'Mars in Aries',
      summary: 'Mars rules Aries, making you a natural warrior with direct, bold energy. You act first and think later.',
      traits: ['Direct action', 'Competitive', 'Quick to act', 'Courageous'],
      strengths: ['Takes initiative', 'Brave', 'Energetic', 'Natural leader'],
      challenges: ['Impatient', 'Aggressive', 'Reckless', 'Quick temper']
    },
    taurus: {
      title: 'Mars in Taurus',
      summary: 'You act with steady determination and pursue goals with patience. Slow and steady wins your race.',
      traits: ['Steady energy', 'Patient pursuit', 'Sensual', 'Stubborn when challenged'],
      strengths: ['Persistent', 'Reliable energy', 'Strong stamina', 'Practical action'],
      challenges: ['Slow to start', 'Stubborn', 'Possessive', 'Can be lazy']
    },
    gemini: {
      title: 'Mars in Gemini',
      summary: 'You act through words and ideas. Mental agility is your weapon, and you fight with wit.',
      traits: ['Verbal combat', 'Mentally active', 'Multi-tasking', 'Restless energy'],
      strengths: ['Quick wit', 'Versatile', 'Strategic communication', 'Adaptable'],
      challenges: ['Scattered energy', 'Argumentative', 'Nervous', 'Follow-through issues']
    },
    cancer: {
      title: 'Mars in Cancer',
      summary: 'You act to protect and nurture. Your energy is driven by emotional security and family.',
      traits: ['Protective action', 'Emotionally driven', 'Defensive', 'Nurturing'],
      strengths: ['Fierce protector', 'Emotionally motivated', 'Tenacious', 'Caring'],
      challenges: ['Passive-aggressive', 'Moody energy', 'Takes things personally', 'Indirect']
    },
    leo: {
      title: 'Mars in Leo',
      summary: 'You act with dramatic flair and creative passion. Your energy needs recognition and applause.',
      traits: ['Dramatic action', 'Creative drive', 'Needs recognition', 'Generous energy'],
      strengths: ['Inspiring leader', 'Confident action', 'Loyal fighter', 'Creative'],
      challenges: ['Ego-driven', 'Needs attention', 'Pride when challenged', 'Can dominate']
    },
    virgo: {
      title: 'Mars in Virgo',
      summary: 'You act with precision and purpose. Your energy is best channeled into improvement and service.',
      traits: ['Precise action', 'Service-oriented', 'Analytical', 'Health-focused'],
      strengths: ['Efficient', 'Practical', 'Hardworking', 'Problem-solver'],
      challenges: ['Critical', 'Nervous energy', 'Perfectionist', 'Repressed anger']
    },
    libra: {
      title: 'Mars in Libra',
      summary: 'You act for fairness and balance. Your energy is channeled through partnership and diplomacy.',
      traits: ['Diplomatic action', 'Partnership-driven', 'Fair fighter', 'Indecisive'],
      strengths: ['Mediator', 'Charming', 'Strategic', 'Team player'],
      challenges: ['Indecisive', 'Passive', 'People-pleasing', 'Avoids direct conflict']
    },
    scorpio: {
      title: 'Mars in Scorpio',
      summary: 'Mars is powerful in Scorpio, giving you intense, strategic, all-or-nothing energy.',
      traits: ['Intense drive', 'Strategic', 'All-or-nothing', 'Magnetic'],
      strengths: ['Powerful focus', 'Determined', 'Resourceful', 'Fearless'],
      challenges: ['Obsessive', 'Vindictive', 'Jealous', 'Controlling']
    },
    sagittarius: {
      title: 'Mars in Sagittarius',
      summary: 'You act with enthusiasm and optimism. Your energy seeks adventure, truth, and expansion.',
      traits: ['Adventurous energy', 'Enthusiastic', 'Freedom-driven', 'Optimistic'],
      strengths: ['Inspiring action', 'Risk-taker', 'Honest fighter', 'Expansive'],
      challenges: ['Restless', 'Overcommits', 'Tactless', 'Preachy']
    },
    capricorn: {
      title: 'Mars in Capricorn',
      summary: 'Mars is exalted in Capricorn, making your energy disciplined, strategic, and achievement-focused.',
      traits: ['Disciplined action', 'Ambitious', 'Strategic', 'Patient'],
      strengths: ['Achiever', 'Self-controlled', 'Reliable energy', 'Goal-oriented'],
      challenges: ['Workaholic', 'Cold', 'Ruthless', 'Repressed']
    },
    aquarius: {
      title: 'Mars in Aquarius',
      summary: 'You act for humanitarian ideals and progressive change. Your energy is unconventional and intellectual.',
      traits: ['Unconventional action', 'Humanitarian', 'Independent', 'Rebellious'],
      strengths: ['Innovative', 'Fights for causes', 'Original', 'Team-oriented'],
      challenges: ['Stubborn', 'Detached', 'Unpredictable', 'Contrarian']
    },
    pisces: {
      title: 'Mars in Pisces',
      summary: 'You act on intuition and compassion. Your energy is subtle, creative, and spiritually motivated.',
      traits: ['Intuitive action', 'Compassionate', 'Creative', 'Indirect'],
      strengths: ['Artistic', 'Selfless', 'Adaptable', 'Imaginative'],
      challenges: ['Passive', 'Escapist', 'Confused direction', 'Easily drained']
    }
  },
  jupiter: {
    aries: {
      title: 'Jupiter in Aries',
      summary: 'You find luck and growth through bold initiative and pioneering action.',
      traits: ['Finds luck through action', 'Optimistic pioneer', 'Confident expansion'],
      strengths: ['Entrepreneurial', 'Inspires others', 'Courageous growth'],
      challenges: ['Impulsive risks', 'Overconfident', 'Impatient for results']
    },
    taurus: {
      title: 'Jupiter in Taurus',
      summary: 'You find luck and growth through patience, material stability, and sensory pleasures.',
      traits: ['Material abundance', 'Patient growth', 'Appreciates luxury'],
      strengths: ['Financial growth', 'Stable expansion', 'Generous with resources'],
      challenges: ['Excessive indulgence', 'Materialistic', 'Slow to expand']
    },
    gemini: {
      title: 'Jupiter in Gemini',
      summary: 'You find luck and growth through communication, learning, and diverse connections.',
      traits: ['Intellectual expansion', 'Social luck', 'Curious growth'],
      strengths: ['Networking', 'Lifelong learner', 'Versatile opportunities'],
      challenges: ['Scattered focus', 'Superficial knowledge', 'Too many interests']
    },
    cancer: {
      title: 'Jupiter in Cancer',
      summary: 'Jupiter is exalted in Cancer. You find luck through nurturing, home, and emotional connections.',
      traits: ['Emotional abundance', 'Generous nurturing', 'Home expansion'],
      strengths: ['Wealthy in love', 'Protective growth', 'Strong family bonds'],
      challenges: ['Over-protective', 'Excessive emotion', 'Clingy']
    },
    leo: {
      title: 'Jupiter in Leo',
      summary: 'You find luck and growth through creative self-expression, leadership, and generosity.',
      traits: ['Generous expansion', 'Creative luck', 'Leadership growth'],
      strengths: ['Inspiring leader', 'Big-hearted', 'Creative abundance'],
      challenges: ['Excessive pride', 'Need for praise', 'Dramatic excess']
    },
    virgo: {
      title: 'Jupiter in Virgo',
      summary: 'You find luck and growth through service, health, and attention to detail.',
      traits: ['Growth through service', 'Practical expansion', 'Health-focused'],
      strengths: ['Helpful growth', 'Efficient expansion', 'Practical wisdom'],
      challenges: ['Overly critical', 'Perfectionist', 'Misses big picture']
    },
    libra: {
      title: 'Jupiter in Libra',
      summary: 'You find luck and growth through partnerships, diplomacy, and creating harmony.',
      traits: ['Partnership luck', 'Diplomatic expansion', 'Aesthetic growth'],
      strengths: ['Beneficial relationships', 'Fair dealing', 'Artistic expansion'],
      challenges: ['Indecisive', 'Over-accommodating', 'Dependent on others']
    },
    scorpio: {
      title: 'Jupiter in Scorpio',
      summary: 'You find luck and growth through transformation, deep investigation, and shared resources.',
      traits: ['Transformative growth', 'Luck through crisis', 'Deep expansion'],
      strengths: ['Psychological insight', 'Resource management', 'Powerful growth'],
      challenges: ['Excessive intensity', 'Obsessive', 'Power struggles']
    },
    sagittarius: {
      title: 'Jupiter in Sagittarius',
      summary: 'Jupiter rules Sagittarius, bringing abundant luck through travel, education, and philosophy.',
      traits: ['Abundant luck', 'Philosophical expansion', 'Travel blessings'],
      strengths: ['Optimistic', 'Wisdom seeker', 'Inspiring teacher'],
      challenges: ['Overindulgent', 'Preachy', 'Excessive optimism']
    },
    capricorn: {
      title: 'Jupiter in Capricorn',
      summary: 'You find luck and growth through discipline, patience, and building lasting structures.',
      traits: ['Disciplined growth', 'Patient expansion', 'Achievement luck'],
      strengths: ['Business acumen', 'Responsible growth', 'Long-term success'],
      challenges: ['Limited vision', 'Pessimistic', 'Too cautious']
    },
    aquarius: {
      title: 'Jupiter in Aquarius',
      summary: 'You find luck and growth through innovation, humanitarian work, and group connections.',
      traits: ['Innovative expansion', 'Social luck', 'Humanitarian growth'],
      strengths: ['Visionary', 'Community-minded', 'Progressive growth'],
      challenges: ['Detached', 'Rebellious excess', 'Unpractical ideals']
    },
    pisces: {
      title: 'Jupiter in Pisces',
      summary: 'Jupiter co-rules Pisces, bringing luck through compassion, creativity, and spiritual growth.',
      traits: ['Spiritual abundance', 'Compassionate expansion', 'Creative luck'],
      strengths: ['Intuitive', 'Generous spirit', 'Artistic growth'],
      challenges: ['Escapist', 'Overly trusting', 'Boundary issues']
    }
  },
  saturn: {
    aries: {
      title: 'Saturn in Aries',
      summary: 'Your lessons involve learning patience in action and healthy assertion of identity.',
      traits: ['Learning assertiveness', 'Delayed initiative', 'Self-doubt to overcome'],
      strengths: ['Disciplined action', 'Mature leadership', 'Earned independence'],
      challenges: ['Frustrated initiative', 'Fear of action', 'Identity struggles']
    },
    taurus: {
      title: 'Saturn in Taurus',
      summary: 'Your lessons involve building material security and learning the right relationship with resources.',
      traits: ['Financial lessons', 'Material discipline', 'Security challenges'],
      strengths: ['Patient wealth building', 'Resourceful', 'Lasting security'],
      challenges: ['Financial anxiety', 'Scarcity mindset', 'Slow material progress']
    },
    gemini: {
      title: 'Saturn in Gemini',
      summary: 'Your lessons involve disciplined thinking and learning to communicate with authority.',
      traits: ['Mental discipline', 'Communication challenges', 'Learning difficulties'],
      strengths: ['Structured thinking', 'Serious communicator', 'Deep learning'],
      challenges: ['Mental anxiety', 'Self-doubt in speaking', 'Information overwhelm']
    },
    cancer: {
      title: 'Saturn in Cancer',
      summary: 'Your lessons involve emotional maturity and creating your own sense of security.',
      traits: ['Emotional boundaries', 'Family responsibilities', 'Security lessons'],
      strengths: ['Emotional wisdom', 'Protective authority', 'Creates lasting home'],
      challenges: ['Emotional repression', 'Family burdens', 'Difficulty nurturing']
    },
    leo: {
      title: 'Saturn in Leo',
      summary: 'Your lessons involve authentic self-expression and earning recognition through merit.',
      traits: ['Creative challenges', 'Recognition lessons', 'Authority over ego'],
      strengths: ['Disciplined creativity', 'Earned respect', 'Mature self-expression'],
      challenges: ['Creative blocks', 'Fear of attention', 'Self-esteem issues']
    },
    virgo: {
      title: 'Saturn in Virgo',
      summary: 'Your lessons involve practical service and mastering skills without perfectionism.',
      traits: ['Perfectionism challenges', 'Health lessons', 'Service duties'],
      strengths: ['Master of craft', 'Efficient worker', 'Practical wisdom'],
      challenges: ['Excessive self-criticism', 'Health anxiety', 'Overwork']
    },
    libra: {
      title: 'Saturn in Libra',
      summary: 'Saturn is exalted in Libra. Your lessons involve balanced relationships and fair justice.',
      traits: ['Relationship responsibilities', 'Justice lessons', 'Partnership karma'],
      strengths: ['Mature relationships', 'Fair authority', 'Balanced judgment'],
      challenges: ['Relationship delays', 'Fear of commitment', 'People-pleasing']
    },
    scorpio: {
      title: 'Saturn in Scorpio',
      summary: 'Your lessons involve emotional control and mastering power and transformation.',
      traits: ['Power lessons', 'Emotional control', 'Transformation challenges'],
      strengths: ['Psychological mastery', 'Emotional strength', 'Resource control'],
      challenges: ['Fear of vulnerability', 'Control issues', 'Trust difficulties']
    },
    sagittarius: {
      title: 'Saturn in Sagittarius',
      summary: 'Your lessons involve structured belief systems and responsible teaching.',
      traits: ['Faith challenges', 'Philosophy lessons', 'Teaching duties'],
      strengths: ['Mature wisdom', 'Responsible teaching', 'Structured beliefs'],
      challenges: ['Dogmatic', 'Faith crises', 'Limited vision']
    },
    capricorn: {
      title: 'Saturn in Capricorn',
      summary: 'Saturn rules Capricorn. Your lessons involve mastering ambition and building lasting achievement.',
      traits: ['Career responsibilities', 'Achievement pressure', 'Authority lessons'],
      strengths: ['Natural authority', 'Disciplined achiever', 'Lasting success'],
      challenges: ['Excessive pressure', 'Fear of failure', 'Workaholic']
    },
    aquarius: {
      title: 'Saturn in Aquarius',
      summary: 'Saturn co-rules Aquarius. Your lessons involve responsible innovation and social structures.',
      traits: ['Social responsibilities', 'Group lessons', 'Innovation discipline'],
      strengths: ['Structured innovation', 'Social authority', 'Progressive building'],
      challenges: ['Fear of groups', 'Feeling different', 'Rebellious rigidity']
    },
    pisces: {
      title: 'Saturn in Pisces',
      summary: 'Your lessons involve grounding spiritual ideals and practical compassion.',
      traits: ['Spiritual challenges', 'Compassion lessons', 'Boundary learning'],
      strengths: ['Grounded spirituality', 'Practical compassion', 'Artistic discipline'],
      challenges: ['Victim mentality', 'Fear of chaos', 'Escapism']
    }
  },
  uranus: {
    aries: { title: 'Uranus in Aries', summary: 'Revolutionary individuality and pioneering change.', traits: ['Revolutionary'], strengths: ['Innovative leadership'], challenges: ['Reckless rebellion'] },
    taurus: { title: 'Uranus in Taurus', summary: 'Disruption of material values and financial innovation.', traits: ['Financial revolution'], strengths: ['Innovative resources'], challenges: ['Unstable security'] },
    gemini: { title: 'Uranus in Gemini', summary: 'Revolutionary ideas and communication breakthroughs.', traits: ['Mental innovation'], strengths: ['Original thinking'], challenges: ['Scattered genius'] },
    cancer: { title: 'Uranus in Cancer', summary: 'Revolution in family structures and emotional freedom.', traits: ['Family change'], strengths: ['Emotional liberation'], challenges: ['Unstable roots'] },
    leo: { title: 'Uranus in Leo', summary: 'Creative revolution and unique self-expression.', traits: ['Creative genius'], strengths: ['Original creativity'], challenges: ['Ego disruption'] },
    virgo: { title: 'Uranus in Virgo', summary: 'Innovation in health, work, and service systems.', traits: ['Health innovation'], strengths: ['Work revolution'], challenges: ['Chaotic routines'] },
    libra: { title: 'Uranus in Libra', summary: 'Revolution in relationships and social justice.', traits: ['Relationship change'], strengths: ['Social innovation'], challenges: ['Unstable partnerships'] },
    scorpio: { title: 'Uranus in Scorpio', summary: 'Psychological revolution and power transformation.', traits: ['Deep transformation'], strengths: ['Psychological breakthrough'], challenges: ['Power disruption'] },
    sagittarius: { title: 'Uranus in Sagittarius', summary: 'Revolution in beliefs and educational innovation.', traits: ['Belief revolution'], strengths: ['Educational innovation'], challenges: ['Restless seeking'] },
    capricorn: { title: 'Uranus in Capricorn', summary: 'Revolution in structures and career innovation.', traits: ['Structural change'], strengths: ['Career innovation'], challenges: ['Authority disruption'] },
    aquarius: { title: 'Uranus in Aquarius', summary: 'Uranus rules Aquarius. Pure technological and social revolution.', traits: ['Technological revolution'], strengths: ['Humanitarian innovation'], challenges: ['Extreme detachment'] },
    pisces: { title: 'Uranus in Pisces', summary: 'Spiritual revolution and artistic innovation.', traits: ['Spiritual awakening'], strengths: ['Artistic breakthrough'], challenges: ['Chaotic spirituality'] }
  },
  neptune: {
    aries: { title: 'Neptune in Aries', summary: 'Spiritual warrior and idealistic action.', traits: ['Spiritual activism'], strengths: ['Inspired action'], challenges: ['Confused identity'] },
    taurus: { title: 'Neptune in Taurus', summary: 'Idealization of material beauty and values.', traits: ['Material dreams'], strengths: ['Artistic values'], challenges: ['Financial illusion'] },
    gemini: { title: 'Neptune in Gemini', summary: 'Imaginative communication and intuitive thinking.', traits: ['Intuitive mind'], strengths: ['Creative communication'], challenges: ['Mental confusion'] },
    cancer: { title: 'Neptune in Cancer', summary: 'Deep emotional sensitivity and psychic home.', traits: ['Psychic sensitivity'], strengths: ['Emotional intuition'], challenges: ['Emotional overwhelm'] },
    leo: { title: 'Neptune in Leo', summary: 'Creative dreams and romantic idealism.', traits: ['Creative dreams'], strengths: ['Artistic inspiration'], challenges: ['Ego illusion'] },
    virgo: { title: 'Neptune in Virgo', summary: 'Service idealism and health sensitivity.', traits: ['Service dreams'], strengths: ['Healing abilities'], challenges: ['Health anxiety'] },
    libra: { title: 'Neptune in Libra', summary: 'Relationship idealism and artistic harmony.', traits: ['Romantic dreams'], strengths: ['Artistic beauty'], challenges: ['Relationship illusion'] },
    scorpio: { title: 'Neptune in Scorpio', summary: 'Psychic depth and spiritual transformation.', traits: ['Psychic power'], strengths: ['Deep intuition'], challenges: ['Obsessive fantasy'] },
    sagittarius: { title: 'Neptune in Sagittarius', summary: 'Spiritual seeking and religious idealism.', traits: ['Spiritual seeking'], strengths: ['Inspired faith'], challenges: ['Blind belief'] },
    capricorn: { title: 'Neptune in Capricorn', summary: 'Dissolving old structures and practical spirituality.', traits: ['Practical spirituality'], strengths: ['Grounded dreams'], challenges: ['Cynical idealism'] },
    aquarius: { title: 'Neptune in Aquarius', summary: 'Humanitarian dreams and collective spirituality.', traits: ['Collective dreams'], strengths: ['Humanitarian vision'], challenges: ['Utopian illusion'] },
    pisces: { title: 'Neptune in Pisces', summary: 'Neptune rules Pisces. Peak spiritual sensitivity and artistic transcendence.', traits: ['Spiritual transcendence'], strengths: ['Boundless compassion'], challenges: ['Reality escape'] }
  },
  pluto: {
    aries: { title: 'Pluto in Aries', summary: 'Transformative leadership and identity rebirth.', traits: ['Identity transformation'], strengths: ['Powerful rebirth'], challenges: ['Power conflicts'] },
    taurus: { title: 'Pluto in Taurus', summary: 'Transformation of values and material power.', traits: ['Material transformation'], strengths: ['Resource power'], challenges: ['Possessive control'] },
    gemini: { title: 'Pluto in Gemini', summary: 'Transformation through ideas and communication power.', traits: ['Mental transformation'], strengths: ['Powerful ideas'], challenges: ['Manipulative words'] },
    cancer: { title: 'Pluto in Cancer', summary: 'Family transformation and emotional power.', traits: ['Family transformation'], strengths: ['Emotional power'], challenges: ['Control through emotions'] },
    leo: { title: 'Pluto in Leo', summary: 'Creative transformation and powerful self-expression.', traits: ['Creative transformation'], strengths: ['Magnetic presence'], challenges: ['Ego power struggles'] },
    virgo: { title: 'Pluto in Virgo', summary: 'Transformation through service and health power.', traits: ['Service transformation'], strengths: ['Healing power'], challenges: ['Obsessive perfection'] },
    libra: { title: 'Pluto in Libra', summary: 'Relationship transformation and partnership power.', traits: ['Relationship transformation'], strengths: ['Partnership power'], challenges: ['Control in relationships'] },
    scorpio: { title: 'Pluto in Scorpio', summary: 'Pluto rules Scorpio. Intense transformation and psychological power.', traits: ['Deep transformation'], strengths: ['Psychological power'], challenges: ['Destructive intensity'] },
    sagittarius: { title: 'Pluto in Sagittarius', summary: 'Transformation of beliefs and philosophical power.', traits: ['Belief transformation'], strengths: ['Truth power'], challenges: ['Fanatical beliefs'] },
    capricorn: { title: 'Pluto in Capricorn', summary: 'Transformation of structures and institutional power.', traits: ['Structural transformation'], strengths: ['Authority power'], challenges: ['Power corruption'] },
    aquarius: { title: 'Pluto in Aquarius', summary: 'Social transformation and collective power.', traits: ['Social transformation'], strengths: ['Revolutionary power'], challenges: ['Group control'] },
    pisces: { title: 'Pluto in Pisces', summary: 'Spiritual transformation and transcendent power.', traits: ['Spiritual transformation'], strengths: ['Transcendent power'], challenges: ['Escapist destruction'] }
  },
  north_node: {
    aries: { title: 'North Node in Aries', summary: 'Your soul is learning independence, initiative, and self-assertion.', traits: ['Learning independence', 'Developing courage', 'Self-assertion'], strengths: ['Leadership potential', 'Pioneer spirit'], challenges: ['Overcoming codependency', 'Fear of conflict'] },
    taurus: { title: 'North Node in Taurus', summary: 'Your soul is learning stability, self-worth, and material grounding.', traits: ['Learning stability', 'Self-worth', 'Grounding'], strengths: ['Building security', 'Patience'], challenges: ['Letting go of drama', 'Material attachment'] },
    gemini: { title: 'North Node in Gemini', summary: 'Your soul is learning communication, curiosity, and local connections.', traits: ['Learning communication', 'Curiosity', 'Flexibility'], strengths: ['Information sharing', 'Adaptability'], challenges: ['Overcoming dogma', 'Analysis paralysis'] },
    cancer: { title: 'North Node in Cancer', summary: 'Your soul is learning emotional nurturing, home, and family bonds.', traits: ['Learning nurturing', 'Emotional connection', 'Home building'], strengths: ['Emotional intelligence', 'Caring'], challenges: ['Career obsession', 'Emotional walls'] },
    leo: { title: 'North Node in Leo', summary: 'Your soul is learning creative self-expression and confident leadership.', traits: ['Learning self-expression', 'Creativity', 'Leadership'], strengths: ['Star quality', 'Generosity'], challenges: ['Hiding in groups', 'Fear of spotlight'] },
    virgo: { title: 'North Node in Virgo', summary: 'Your soul is learning practical service, health, and discernment.', traits: ['Learning service', 'Discernment', 'Health focus'], strengths: ['Helpful skills', 'Organization'], challenges: ['Escapism', 'Victim mentality'] },
    libra: { title: 'North Node in Libra', summary: 'Your soul is learning partnership, diplomacy, and balance.', traits: ['Learning partnership', 'Diplomacy', 'Balance'], strengths: ['Relationship skills', 'Fairness'], challenges: ['Excessive independence', 'Selfishness'] },
    scorpio: { title: 'North Node in Scorpio', summary: 'Your soul is learning depth, transformation, and shared resources.', traits: ['Learning depth', 'Transformation', 'Intimacy'], strengths: ['Psychological insight', 'Power'], challenges: ['Material attachment', 'Stubbornness'] },
    sagittarius: { title: 'North Node in Sagittarius', summary: 'Your soul is learning faith, big picture thinking, and adventure.', traits: ['Learning faith', 'Expansion', 'Adventure'], strengths: ['Wisdom teaching', 'Optimism'], challenges: ['Overthinking', 'Gossip'] },
    capricorn: { title: 'North Node in Capricorn', summary: 'Your soul is learning responsibility, achievement, and authority.', traits: ['Learning authority', 'Achievement', 'Responsibility'], strengths: ['Leadership', 'Discipline'], challenges: ['Emotional dependence', 'Family focus'] },
    aquarius: { title: 'North Node in Aquarius', summary: 'Your soul is learning humanitarian vision and group consciousness.', traits: ['Learning humanitarianism', 'Innovation', 'Detachment'], strengths: ['Visionary thinking', 'Community'], challenges: ['Ego attachment', 'Drama'] },
    pisces: { title: 'North Node in Pisces', summary: 'Your soul is learning compassion, spirituality, and surrender.', traits: ['Learning surrender', 'Spirituality', 'Compassion'], strengths: ['Intuition', 'Healing'], challenges: ['Over-analysis', 'Perfectionism'] }
  },
  chiron: {
    aries: { title: 'Chiron in Aries', summary: 'Your wound involves identity and self-assertion. Healing comes through embracing who you are.', traits: ['Identity wound', 'Self-assertion challenges'], strengths: ['Helps others find themselves', 'Identity healer'], challenges: ['Fear of being yourself', 'Anger issues'] },
    taurus: { title: 'Chiron in Taurus', summary: 'Your wound involves self-worth and material security. Healing comes through valuing yourself.', traits: ['Self-worth wound', 'Security challenges'], strengths: ['Helps others with worth', 'Value healer'], challenges: ['Low self-esteem', 'Material insecurity'] },
    gemini: { title: 'Chiron in Gemini', summary: 'Your wound involves communication and being heard. Healing comes through finding your voice.', traits: ['Communication wound', 'Learning challenges'], strengths: ['Helps others communicate', 'Teaching healer'], challenges: ['Feeling unheard', 'Learning difficulties'] },
    cancer: { title: 'Chiron in Cancer', summary: 'Your wound involves nurturing and belonging. Healing comes through creating family.', traits: ['Nurturing wound', 'Family challenges'], strengths: ['Helps others heal family', 'Nurturing healer'], challenges: ['Feeling unwanted', 'Mother wound'] },
    leo: { title: 'Chiron in Leo', summary: 'Your wound involves self-expression and recognition. Healing comes through creative authenticity.', traits: ['Recognition wound', 'Creative challenges'], strengths: ['Helps others shine', 'Creative healer'], challenges: ['Fear of visibility', 'Seeking approval'] },
    virgo: { title: 'Chiron in Virgo', summary: 'Your wound involves perfectionism and service. Healing comes through self-acceptance.', traits: ['Perfectionism wound', 'Service challenges'], strengths: ['Helps others accept flaws', 'Service healer'], challenges: ['Never good enough', 'Health anxiety'] },
    libra: { title: 'Chiron in Libra', summary: 'Your wound involves relationships and balance. Healing comes through healthy partnership.', traits: ['Relationship wound', 'Balance challenges'], strengths: ['Helps others with relationships', 'Partnership healer'], challenges: ['Fear of rejection', 'Codependency'] },
    scorpio: { title: 'Chiron in Scorpio', summary: 'Your wound involves trust and power. Healing comes through transformation.', traits: ['Trust wound', 'Power challenges'], strengths: ['Helps others transform', 'Crisis healer'], challenges: ['Betrayal trauma', 'Control issues'] },
    sagittarius: { title: 'Chiron in Sagittarius', summary: 'Your wound involves meaning and beliefs. Healing comes through finding your truth.', traits: ['Meaning wound', 'Faith challenges'], strengths: ['Helps others find meaning', 'Wisdom healer'], challenges: ['Loss of faith', 'Feeling lost'] },
    capricorn: { title: 'Chiron in Capricorn', summary: 'Your wound involves achievement and authority. Healing comes through self-mastery.', traits: ['Achievement wound', 'Authority challenges'], strengths: ['Helps others succeed', 'Mentor healer'], challenges: ['Fear of failure', 'Father wound'] },
    aquarius: { title: 'Chiron in Aquarius', summary: 'Your wound involves belonging and being different. Healing comes through embracing uniqueness.', traits: ['Belonging wound', 'Alienation challenges'], strengths: ['Helps outsiders belong', 'Community healer'], challenges: ['Feeling alien', 'Social anxiety'] },
    pisces: { title: 'Chiron in Pisces', summary: 'Your wound involves spirituality and boundaries. Healing comes through grounded faith.', traits: ['Spiritual wound', 'Boundary challenges'], strengths: ['Helps others heal spiritually', 'Spiritual healer'], challenges: ['Feeling lost', 'Victim complex'] }
  },
  ascendant: {
    aries: { title: 'Aries Rising', summary: 'You appear bold, energetic, and ready for action. First impressions show your competitive spirit.', traits: ['Athletic appearance', 'Direct approach', 'Confident presence'], strengths: ['Striking first impressions', 'Natural leader'], challenges: ['Can seem aggressive', 'Impatient demeanor'] },
    taurus: { title: 'Taurus Rising', summary: 'You appear calm, reliable, and aesthetically pleasing. First impressions show your grounded nature.', traits: ['Pleasant appearance', 'Calm demeanor', 'Sensual presence'], strengths: ['Trustworthy vibe', 'Naturally attractive'], challenges: ['Can seem stubborn', 'Slow to warm up'] },
    gemini: { title: 'Gemini Rising', summary: 'You appear curious, youthful, and mentally agile. First impressions show your wit and adaptability.', traits: ['Youthful appearance', 'Animated expression', 'Quick movements'], strengths: ['Engaging presence', 'Great conversationalist'], challenges: ['Can seem scattered', 'Nervous energy'] },
    cancer: { title: 'Cancer Rising', summary: 'You appear nurturing, approachable, and emotionally attuned. First impressions show your caring nature.', traits: ['Soft appearance', 'Nurturing vibe', 'Protective presence'], strengths: ['Welcoming energy', 'Comforting presence'], challenges: ['Can seem moody', 'Defensive initially'] },
    leo: { title: 'Leo Rising', summary: 'You appear confident, radiant, and commanding attention. First impressions show your star quality.', traits: ['Dramatic appearance', 'Confident bearing', 'Warm presence'], strengths: ['Magnetic presence', 'Natural performer'], challenges: ['Can seem prideful', 'Needs attention'] },
    virgo: { title: 'Virgo Rising', summary: 'You appear modest, helpful, and detail-oriented. First impressions show your practical nature.', traits: ['Neat appearance', 'Modest demeanor', 'Observant presence'], strengths: ['Trustworthy vibe', 'Helpful nature'], challenges: ['Can seem critical', 'Reserved initially'] },
    libra: { title: 'Libra Rising', summary: 'You appear charming, balanced, and aesthetically refined. First impressions show your diplomatic nature.', traits: ['Attractive appearance', 'Graceful demeanor', 'Pleasant presence'], strengths: ['Natural charm', 'Puts others at ease'], challenges: ['Can seem superficial', 'Indecisive'] },
    scorpio: { title: 'Scorpio Rising', summary: 'You appear intense, mysterious, and magnetically compelling. First impressions show your depth.', traits: ['Intense appearance', 'Penetrating gaze', 'Magnetic presence'], strengths: ['Compelling presence', 'Powerful aura'], challenges: ['Can seem intimidating', 'Hard to read'] },
    sagittarius: { title: 'Sagittarius Rising', summary: 'You appear optimistic, adventurous, and philosophical. First impressions show your enthusiasm.', traits: ['Tall or athletic', 'Friendly demeanor', 'Open presence'], strengths: ['Inspiring presence', 'Approachable'], challenges: ['Can seem preachy', 'Restless energy'] },
    capricorn: { title: 'Capricorn Rising', summary: 'You appear serious, capable, and authoritative. First impressions show your mature nature.', traits: ['Mature appearance', 'Reserved demeanor', 'Authoritative presence'], strengths: ['Commands respect', 'Reliable vibe'], challenges: ['Can seem cold', 'Hard to approach'] },
    aquarius: { title: 'Aquarius Rising', summary: 'You appear unique, intellectual, and unconventional. First impressions show your individuality.', traits: ['Unique appearance', 'Friendly but detached', 'Original presence'], strengths: ['Interesting vibe', 'Open-minded'], challenges: ['Can seem aloof', 'Eccentric'] },
    pisces: { title: 'Pisces Rising', summary: 'You appear dreamy, compassionate, and ethereal. First impressions show your gentle nature.', traits: ['Soft appearance', 'Dreamy demeanor', 'Gentle presence'], strengths: ['Approachable vibe', 'Artistic aura'], challenges: ['Can seem vague', 'Hard to pin down'] }
  },
  midheaven: {
    aries: { title: 'Midheaven in Aries', summary: 'Your career path involves leadership, pioneering, and independent action.', traits: ['Leadership careers', 'Entrepreneurial'], strengths: ['Career pioneer', 'Self-starter'], challenges: ['Work conflicts', 'Impatient career path'] },
    taurus: { title: 'Midheaven in Taurus', summary: 'Your career path involves building, finances, and material stability.', traits: ['Stable careers', 'Financial roles'], strengths: ['Builds lasting career', 'Financially successful'], challenges: ['Slow career progress', 'Resistant to change'] },
    gemini: { title: 'Midheaven in Gemini', summary: 'Your career path involves communication, media, and intellectual work.', traits: ['Communication careers', 'Diverse roles'], strengths: ['Versatile career', 'Network builder'], challenges: ['Career indecision', 'Scattered focus'] },
    cancer: { title: 'Midheaven in Cancer', summary: 'Your career path involves nurturing, home, and emotional support.', traits: ['Caring careers', 'Home-based work'], strengths: ['Nurturing leader', 'Creates family at work'], challenges: ['Work-life boundaries', 'Emotional at work'] },
    leo: { title: 'Midheaven in Leo', summary: 'Your career path involves creativity, performance, and leadership.', traits: ['Creative careers', 'Leadership roles'], strengths: ['Natural leader', 'Public recognition'], challenges: ['Ego at work', 'Needs praise'] },
    virgo: { title: 'Midheaven in Virgo', summary: 'Your career path involves service, health, and detailed work.', traits: ['Service careers', 'Health roles'], strengths: ['Skilled worker', 'Problem solver'], challenges: ['Perfectionism at work', 'Undervalued'] },
    libra: { title: 'Midheaven in Libra', summary: 'Your career path involves partnership, art, and diplomacy.', traits: ['Partnership careers', 'Artistic roles'], strengths: ['Diplomatic leader', 'Beautiful work'], challenges: ['Career indecision', 'Needs others'] },
    scorpio: { title: 'Midheaven in Scorpio', summary: 'Your career path involves transformation, research, and power.', traits: ['Investigative careers', 'Power roles'], strengths: ['Powerful career', 'Deep impact'], challenges: ['Power struggles', 'Secretive work'] },
    sagittarius: { title: 'Midheaven in Sagittarius', summary: 'Your career path involves education, travel, and philosophy.', traits: ['Teaching careers', 'Global roles'], strengths: ['Inspiring leader', 'Expansive career'], challenges: ['Restless career', 'Overcommits'] },
    capricorn: { title: 'Midheaven in Capricorn', summary: 'Your career path involves authority, achievement, and lasting success.', traits: ['Executive careers', 'Authority roles'], strengths: ['Natural authority', 'Lasting achievement'], challenges: ['Workaholic', 'Cold reputation'] },
    aquarius: { title: 'Midheaven in Aquarius', summary: 'Your career path involves innovation, technology, and humanitarian work.', traits: ['Innovative careers', 'Tech roles'], strengths: ['Visionary leader', 'Unique career'], challenges: ['Rebellious at work', 'Detached'] },
    pisces: { title: 'Midheaven in Pisces', summary: 'Your career path involves creativity, healing, and spiritual work.', traits: ['Artistic careers', 'Healing roles'], strengths: ['Creative career', 'Compassionate leader'], challenges: ['Career confusion', 'Boundaries at work'] }
  },
  part_of_fortune: {
    aries: { title: 'Part of Fortune in Aries', summary: 'You find luck and joy through independent action and pioneering endeavors.', traits: ['Luck through initiative'], strengths: ['Fortune favors boldness'], challenges: ['Impatient with luck'] },
    taurus: { title: 'Part of Fortune in Taurus', summary: 'You find luck and joy through material stability and sensory pleasures.', traits: ['Material luck'], strengths: ['Fortune favors patience'], challenges: ['Attachment to fortune'] },
    gemini: { title: 'Part of Fortune in Gemini', summary: 'You find luck and joy through communication and intellectual connections.', traits: ['Luck through communication'], strengths: ['Fortune favors curiosity'], challenges: ['Scattered luck'] },
    cancer: { title: 'Part of Fortune in Cancer', summary: 'You find luck and joy through home, family, and emotional connections.', traits: ['Luck through nurturing'], strengths: ['Fortune favors care'], challenges: ['Clingy with luck'] },
    leo: { title: 'Part of Fortune in Leo', summary: 'You find luck and joy through creative self-expression and leadership.', traits: ['Luck through creativity'], strengths: ['Fortune favors confidence'], challenges: ['Pride with fortune'] },
    virgo: { title: 'Part of Fortune in Virgo', summary: 'You find luck and joy through service, health, and practical skills.', traits: ['Luck through service'], strengths: ['Fortune favors detail'], challenges: ['Critical of luck'] },
    libra: { title: 'Part of Fortune in Libra', summary: 'You find luck and joy through partnerships and creating harmony.', traits: ['Luck through relationships'], strengths: ['Fortune favors fairness'], challenges: ['Dependent luck'] },
    scorpio: { title: 'Part of Fortune in Scorpio', summary: 'You find luck and joy through transformation and deep connections.', traits: ['Luck through depth'], strengths: ['Fortune favors intensity'], challenges: ['Obsessive with luck'] },
    sagittarius: { title: 'Part of Fortune in Sagittarius', summary: 'You find luck and joy through adventure, learning, and expansion.', traits: ['Luck through adventure'], strengths: ['Fortune favors optimism'], challenges: ['Restless luck'] },
    capricorn: { title: 'Part of Fortune in Capricorn', summary: 'You find luck and joy through achievement, discipline, and authority.', traits: ['Luck through hard work'], strengths: ['Fortune favors discipline'], challenges: ['Slow fortune'] },
    aquarius: { title: 'Part of Fortune in Aquarius', summary: 'You find luck and joy through innovation and humanitarian efforts.', traits: ['Luck through uniqueness'], strengths: ['Fortune favors originality'], challenges: ['Detached from luck'] },
    pisces: { title: 'Part of Fortune in Pisces', summary: 'You find luck and joy through spirituality, creativity, and compassion.', traits: ['Luck through faith'], strengths: ['Fortune favors surrender'], challenges: ['Confused luck'] }
  },
  lilith: {
    aries: { title: 'Lilith in Aries', summary: 'Your shadow involves suppressed anger and independence. Power lies in authentic self-assertion.', traits: ['Suppressed anger', 'Hidden independence'], strengths: ['Warrior energy', 'Fierce authenticity'], challenges: ['Rage issues', 'Excessive aggression'] },
    taurus: { title: 'Lilith in Taurus', summary: 'Your shadow involves suppressed sensuality and material desires. Power lies in embodied pleasure.', traits: ['Suppressed desire', 'Hidden possessiveness'], strengths: ['Sensual power', 'Material magnetism'], challenges: ['Greed', 'Stubborn shadow'] },
    gemini: { title: 'Lilith in Gemini', summary: 'Your shadow involves suppressed thoughts and communication. Power lies in speaking your truth.', traits: ['Suppressed voice', 'Hidden thoughts'], strengths: ['Sharp wit', 'Taboo knowledge'], challenges: ['Manipulative words', 'Mental chaos'] },
    cancer: { title: 'Lilith in Cancer', summary: 'Your shadow involves suppressed emotions and mothering. Power lies in emotional authenticity.', traits: ['Suppressed feelings', 'Hidden nurturing'], strengths: ['Emotional power', 'Fierce protection'], challenges: ['Smothering', 'Emotional manipulation'] },
    leo: { title: 'Lilith in Leo', summary: 'Your shadow involves suppressed self-expression and pride. Power lies in unapologetic visibility.', traits: ['Suppressed ego', 'Hidden creativity'], strengths: ['Magnetic presence', 'Creative power'], challenges: ['Attention seeking', 'Drama'] },
    virgo: { title: 'Lilith in Virgo', summary: 'Your shadow involves suppressed sexuality and criticism. Power lies in integrated perfectionism.', traits: ['Suppressed sexuality', 'Hidden criticism'], strengths: ['Discriminating power', 'Service magnetism'], challenges: ['Sexual shame', 'Critical shadow'] },
    libra: { title: 'Lilith in Libra', summary: 'Your shadow involves suppressed relationship needs and vanity. Power lies in authentic relating.', traits: ['Suppressed needs', 'Hidden vanity'], strengths: ['Relationship power', 'Magnetic beauty'], challenges: ['Codependency', 'Manipulation'] },
    scorpio: { title: 'Lilith in Scorpio', summary: 'Your shadow involves suppressed intensity and power. Power lies in embracing the taboo.', traits: ['Suppressed intensity', 'Hidden power'], strengths: ['Transformative power', 'Magnetic depth'], challenges: ['Obsession', 'Control issues'] },
    sagittarius: { title: 'Lilith in Sagittarius', summary: 'Your shadow involves suppressed beliefs and wildness. Power lies in authentic freedom.', traits: ['Suppressed truth', 'Hidden wildness'], strengths: ['Truth power', 'Philosophical depth'], challenges: ['Fanaticism', 'Excess'] },
    capricorn: { title: 'Lilith in Capricorn', summary: 'Your shadow involves suppressed ambition and authority. Power lies in authentic achievement.', traits: ['Suppressed ambition', 'Hidden authority'], strengths: ['Achievement power', 'Dark authority'], challenges: ['Ruthlessness', 'Cold manipulation'] },
    aquarius: { title: 'Lilith in Aquarius', summary: 'Your shadow involves suppressed uniqueness and rebellion. Power lies in authentic individuality.', traits: ['Suppressed uniqueness', 'Hidden rebellion'], strengths: ['Revolutionary power', 'Unique magnetism'], challenges: ['Alienation', 'Extreme detachment'] },
    pisces: { title: 'Lilith in Pisces', summary: 'Your shadow involves suppressed spirituality and escapism. Power lies in conscious surrender.', traits: ['Suppressed spirituality', 'Hidden escapism'], strengths: ['Spiritual power', 'Mystical magnetism'], challenges: ['Victim mentality', 'Addiction'] }
  }
}

// Helper: Get interpretation for a placement
export function getSignInterpretation(
  planet: Planet | 'ascendant' | 'midheaven' | 'part_of_fortune' | 'lilith',
  sign: ZodiacSign
): SignInterpretation {
  return signInterpretations[planet]?.[sign] || {
    title: `${planet} in ${sign}`,
    summary: `Your ${planet} is in ${sign}.`,
    traits: [],
    strengths: [],
    challenges: []
  }
}

// Extract sign results from natal chart for specific placements
export function extractSignResults(
  chart: NatalChart,
  calculator: Calculator
): SignResult[] {
  const results: SignResult[] = []

  // Add planet placements
  for (const planet of calculator.placements) {
    const placement = chart.placements.find((p) => p.planet === planet)
    if (placement) {
      results.push({
        planet: placement.planet,
        sign: placement.sign,
        degree: placement.degree,
        house: placement.house,
        isRetrograde: placement.is_retrograde,
        interpretation: getSignInterpretation(placement.planet, placement.sign)
      })
    }
  }

  // Add Ascendant if requested
  if (calculator.includeAscendant && chart.ascendant) {
    results.push({
      planet: 'ascendant',
      sign: chart.ascendant.sign,
      degree: chart.ascendant.degree,
      interpretation: getSignInterpretation('ascendant', chart.ascendant.sign)
    })
  }

  // Add Midheaven if requested
  if (calculator.includeMidheaven && chart.midheaven) {
    results.push({
      planet: 'midheaven',
      sign: chart.midheaven.sign,
      degree: chart.midheaven.degree,
      interpretation: getSignInterpretation('midheaven', chart.midheaven.sign)
    })
  }

  return results
}

// Calculate Saturn Return dates
export function calculateSaturnReturn(
  birthDate: Date,
  saturnPlacement: NatalPlacement
): SaturnReturnResult {
  const saturnCycleDays = 10759 // ~29.5 years in days
  const firstReturnStartDays = saturnCycleDays - 365 // Roughly 1 year before exact
  const firstReturnEndDays = saturnCycleDays + 365 // Roughly 1 year after exact

  const birthTime = birthDate.getTime()

  const firstReturnStart = new Date(birthTime + firstReturnStartDays * 24 * 60 * 60 * 1000)
  const firstReturnExact = new Date(birthTime + saturnCycleDays * 24 * 60 * 60 * 1000)
  const firstReturnEnd = new Date(birthTime + firstReturnEndDays * 24 * 60 * 60 * 1000)

  const secondReturnStart = new Date(birthTime + (saturnCycleDays * 2 - 365) * 24 * 60 * 60 * 1000)
  const secondReturnExact = new Date(birthTime + saturnCycleDays * 2 * 24 * 60 * 60 * 1000)
  const secondReturnEnd = new Date(birthTime + (saturnCycleDays * 2 + 365) * 24 * 60 * 60 * 1000)

  const now = new Date()
  let currentPhase: 'pre-return' | 'approaching' | 'in-return' | 'post-return'

  if (now < firstReturnStart) {
    currentPhase = 'pre-return'
  } else if (now < firstReturnEnd) {
    if (now < firstReturnExact) {
      currentPhase = 'approaching'
    } else {
      currentPhase = 'in-return'
    }
  } else if (now < secondReturnStart) {
    currentPhase = 'post-return'
  } else if (now < secondReturnEnd) {
    currentPhase = now < secondReturnExact ? 'approaching' : 'in-return'
  } else {
    currentPhase = 'post-return'
  }

  const ageAtFirst = Math.floor((firstReturnExact.getTime() - birthTime) / (365.25 * 24 * 60 * 60 * 1000))
  const ageAtSecond = Math.floor((secondReturnExact.getTime() - birthTime) / (365.25 * 24 * 60 * 60 * 1000))

  return {
    saturnSign: saturnPlacement.sign,
    saturnDegree: saturnPlacement.degree,
    firstReturn: {
      startDate: firstReturnStart,
      exactDate: firstReturnExact,
      endDate: firstReturnEnd,
      age: ageAtFirst
    },
    secondReturn: {
      startDate: secondReturnStart,
      exactDate: secondReturnExact,
      endDate: secondReturnEnd,
      age: ageAtSecond
    },
    currentPhase,
    interpretation: getSaturnReturnInterpretation(saturnPlacement.sign, currentPhase)
  }
}

function getSaturnReturnInterpretation(sign: ZodiacSign, phase: string): string {
  const signThemes: Record<ZodiacSign, string> = {
    aries: 'independence, leadership, and self-assertion',
    taurus: 'material security, values, and self-worth',
    gemini: 'communication, learning, and mental clarity',
    cancer: 'emotional security, family, and nurturing',
    leo: 'creative expression, confidence, and authenticity',
    virgo: 'service, health, and practical skills',
    libra: 'relationships, balance, and fairness',
    scorpio: 'transformation, power, and emotional depth',
    sagittarius: 'beliefs, meaning, and expansion',
    capricorn: 'career, achievement, and responsibility',
    aquarius: 'individuality, community, and innovation',
    pisces: 'spirituality, compassion, and boundaries'
  }

  const phaseAdvice: Record<string, string> = {
    'pre-return': 'Your Saturn Return is approaching. This is a time to reflect on the structures and commitments in your life.',
    'approaching': 'Your Saturn Return is beginning. You may feel pressure to make significant life changes.',
    'in-return': 'You are in the midst of your Saturn Return. This is a pivotal time for maturation and taking responsibility.',
    'post-return': 'You have completed your Saturn Return. The lessons you learned are now integrated into your life path.'
  }

  return `Your Saturn Return focuses on themes of ${signThemes[sign]}. ${phaseAdvice[phase]}`
}

// Calculate Moon Phase at birth
export function calculateMoonPhase(
  sunPosition: ZodiacPosition,
  moonPosition: ZodiacPosition
): MoonPhaseResult {
  // Calculate the angle between Sun and Moon
  const signOrder: ZodiacSign[] = [
    'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
    'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
  ]

  const sunDegree = signOrder.indexOf(sunPosition.sign) * 30 + sunPosition.degree
  const moonDegree = signOrder.indexOf(moonPosition.sign) * 30 + moonPosition.degree

  let angle = moonDegree - sunDegree
  if (angle < 0) angle += 360

  let phase: MoonPhase
  let illumination: number

  if (angle < 45) {
    phase = 'new-moon'
    illumination = angle / 45 * 25
  } else if (angle < 90) {
    phase = 'waxing-crescent'
    illumination = 25 + (angle - 45) / 45 * 25
  } else if (angle < 135) {
    phase = 'first-quarter'
    illumination = 50 + (angle - 90) / 45 * 25
  } else if (angle < 180) {
    phase = 'waxing-gibbous'
    illumination = 75 + (angle - 135) / 45 * 25
  } else if (angle < 225) {
    phase = 'full-moon'
    illumination = 100 - (angle - 180) / 45 * 25
  } else if (angle < 270) {
    phase = 'waning-gibbous'
    illumination = 75 - (angle - 225) / 45 * 25
  } else if (angle < 315) {
    phase = 'last-quarter'
    illumination = 50 - (angle - 270) / 45 * 25
  } else {
    phase = 'waning-crescent'
    illumination = 25 - (angle - 315) / 45 * 25
  }

  // Calculate next new and full moon (approximate)
  const now = new Date()
  const lunarCycle = 29.5 * 24 * 60 * 60 * 1000 // ~29.5 days in ms

  const daysToNewMoon = Math.round((360 - angle) / 360 * 29.5)
  const daysToFullMoon = Math.round(((180 - angle + 360) % 360) / 360 * 29.5)

  return {
    phase,
    illumination: Math.round(illumination),
    nextNewMoon: new Date(now.getTime() + daysToNewMoon * 24 * 60 * 60 * 1000),
    nextFullMoon: new Date(now.getTime() + daysToFullMoon * 24 * 60 * 60 * 1000),
    interpretation: getMoonPhaseInterpretation(phase)
  }
}

function getMoonPhaseInterpretation(phase: MoonPhase): string {
  const interpretations: Record<MoonPhase, string> = {
    'new-moon': 'Born under a New Moon, you are a natural initiator with a strong instinct to begin new cycles. You may feel called to start fresh repeatedly throughout life, bringing new energy to whatever you touch.',
    'waxing-crescent': 'Born under a Waxing Crescent Moon, you carry the energy of struggle and breakthrough. You are determined to push past limitations and have strong willpower to achieve your goals.',
    'first-quarter': 'Born under a First Quarter Moon, you are a builder who takes action to create tangible results. You may face many crises of action that ultimately strengthen your character.',
    'waxing-gibbous': 'Born under a Waxing Gibbous Moon, you seek perfection and refinement. You are analytical and always looking for ways to improve yourself and your work.',
    'full-moon': 'Born under a Full Moon, you experience life with heightened awareness and emotional intensity. Relationships are central to your journey, and you shine brightest when connecting with others.',
    'waning-gibbous': 'Born under a Waning Gibbous Moon (Disseminating), you are a natural teacher who shares wisdom with others. You find fulfillment in passing on what you have learned.',
    'last-quarter': 'Born under a Last Quarter Moon, you question traditions and established systems. You have a revolutionary spirit that seeks to transform outdated structures.',
    'waning-crescent': 'Born under a Waning Crescent (Balsamic) Moon, you carry ancient wisdom and may feel like an old soul. You complete karmic cycles and prepare the way for new beginnings.'
  }
  return interpretations[phase]
}

// Calculate Part of Fortune
export function calculatePartOfFortune(
  chart: NatalChart,
  birthTime: string | null
): PartOfFortuneResult {
  // Part of Fortune = Ascendant + Moon - Sun (day birth)
  // Part of Fortune = Ascendant + Sun - Moon (night birth)
  const signOrder: ZodiacSign[] = [
    'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
    'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
  ]

  const sun = chart.placements.find((p) => p.planet === 'sun')!
  const moon = chart.placements.find((p) => p.planet === 'moon')!
  const ascendant = chart.ascendant

  const sunDegree = signOrder.indexOf(sun.sign) * 30 + sun.degree
  const moonDegree = signOrder.indexOf(moon.sign) * 30 + moon.degree
  const ascDegree = signOrder.indexOf(ascendant.sign) * 30 + ascendant.degree

  // Determine if day or night birth (Sun above horizon = day)
  const isDay = sun.house >= 7 && sun.house <= 12

  let fortuneDegree: number
  if (isDay) {
    fortuneDegree = ascDegree + moonDegree - sunDegree
  } else {
    fortuneDegree = ascDegree + sunDegree - moonDegree
  }

  // Normalize to 0-360
  fortuneDegree = ((fortuneDegree % 360) + 360) % 360

  const signIndex = Math.floor(fortuneDegree / 30)
  const sign = signOrder[signIndex]
  const degree = fortuneDegree % 30

  // Determine house (simplified - actual would need house cusps)
  const house = Math.floor(fortuneDegree / 30) + 1

  return {
    sign,
    degree: Math.round(degree * 100) / 100,
    house,
    interpretation: getSignInterpretation('part_of_fortune', sign).summary
  }
}

// Calculate Black Moon Lilith (Mean Lilith)
export function calculateLilith(chart: NatalChart): LilithResult {
  // Lilith is approximately opposite the Moon's mean apogee
  // For simplicity, we'll calculate it as approximately 7 signs ahead of the Moon
  const signOrder: ZodiacSign[] = [
    'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
    'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
  ]

  const moon = chart.placements.find((p) => p.planet === 'moon')!
  const moonSignIndex = signOrder.indexOf(moon.sign)

  // Lilith is roughly at Moon's apogee position - this is simplified
  // Real calculation requires lunar orbital data
  const lilithSignIndex = (moonSignIndex + 6) % 12
  const sign = signOrder[lilithSignIndex]
  const degree = moon.degree // Simplified

  return {
    sign,
    degree,
    house: ((moon.house + 6 - 1) % 12) + 1, // Opposite house approximately
    interpretation: getSignInterpretation('lilith', sign).summary
  }
}

// Calculate love compatibility
export function calculateCompatibility(
  chart1: NatalChart,
  chart2: NatalChart
): CompatibilityResult {
  const getPlacement = (chart: NatalChart, planet: Planet) =>
    chart.placements.find((p) => p.planet === planet)!

  const sun1 = getPlacement(chart1, 'sun')
  const sun2 = getPlacement(chart2, 'sun')
  const moon1 = getPlacement(chart1, 'moon')
  const moon2 = getPlacement(chart2, 'moon')
  const venus1 = getPlacement(chart1, 'venus')
  const venus2 = getPlacement(chart2, 'venus')
  const mars1 = getPlacement(chart1, 'mars')
  const mars2 = getPlacement(chart2, 'mars')
  const mercury1 = getPlacement(chart1, 'mercury')
  const mercury2 = getPlacement(chart2, 'mercury')

  const signCompatibility = (sign1: ZodiacSign, sign2: ZodiacSign): CompatibilityAspect['compatibility'] => {
    const signOrder: ZodiacSign[] = [
      'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
      'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
    ]
    const idx1 = signOrder.indexOf(sign1)
    const idx2 = signOrder.indexOf(sign2)
    const diff = Math.abs(idx1 - idx2)
    const aspect = Math.min(diff, 12 - diff)

    if (aspect === 0) return 'good' // Conjunction - same sign
    if (aspect === 4 || aspect === 8) return 'excellent' // Trine
    if (aspect === 2 || aspect === 10) return 'good' // Sextile
    if (aspect === 6) return 'challenging' // Opposition
    if (aspect === 3 || aspect === 9) return 'challenging' // Square
    return 'moderate'
  }

  const getCompatibilityScore = (compat: CompatibilityAspect['compatibility']): number => {
    switch (compat) {
      case 'excellent': return 90
      case 'good': return 75
      case 'moderate': return 60
      case 'challenging': return 45
    }
  }

  const sunCompat = signCompatibility(sun1.sign, sun2.sign)
  const moonCompat = signCompatibility(moon1.sign, moon2.sign)
  const venusCompat = signCompatibility(venus1.sign, venus2.sign)
  const marsCompat = signCompatibility(mars1.sign, mars2.sign)
  const mercuryCompat = signCompatibility(mercury1.sign, mercury2.sign)

  const sunScore = getCompatibilityScore(sunCompat)
  const moonScore = getCompatibilityScore(moonCompat)
  const venusScore = getCompatibilityScore(venusCompat)
  const marsScore = getCompatibilityScore(marsCompat)
  const mercuryScore = getCompatibilityScore(mercuryCompat)

  const overallScore = Math.round((sunScore + moonScore * 1.5 + venusScore * 1.2 + marsScore + mercuryScore) / 5.7)

  return {
    overallScore,
    sunCompatibility: {
      person1Sign: sun1.sign,
      person2Sign: sun2.sign,
      compatibility: sunCompat,
      description: `Your Sun signs are in ${sunCompat} aspect. This affects your core compatibility and life direction.`
    },
    moonCompatibility: {
      person1Sign: moon1.sign,
      person2Sign: moon2.sign,
      compatibility: moonCompat,
      description: `Your Moon signs are in ${moonCompat} aspect. This affects emotional understanding and daily comfort.`
    },
    venusCompatibility: {
      person1Sign: venus1.sign,
      person2Sign: venus2.sign,
      compatibility: venusCompat,
      description: `Your Venus signs are in ${venusCompat} aspect. This affects romantic expression and shared values.`
    },
    marsCompatibility: {
      person1Sign: mars1.sign,
      person2Sign: mars2.sign,
      compatibility: marsCompat,
      description: `Your Mars signs are in ${marsCompat} aspect. This affects physical chemistry and conflict style.`
    },
    categories: {
      emotional: moonScore,
      communication: mercuryScore,
      passion: marsScore,
      values: venusScore,
      longTerm: Math.round((sunScore + moonScore) / 2)
    },
    strengths: generateCompatibilityStrengths(sunCompat, moonCompat, venusCompat),
    challenges: generateCompatibilityChallenges(sunCompat, moonCompat, marsCompat),
    advice: generateCompatibilityAdvice(overallScore)
  }
}

function generateCompatibilityStrengths(
  sun: CompatibilityAspect['compatibility'],
  moon: CompatibilityAspect['compatibility'],
  venus: CompatibilityAspect['compatibility']
): string[] {
  const strengths: string[] = []
  if (sun === 'excellent' || sun === 'good') strengths.push('Strong core compatibility and shared life goals')
  if (moon === 'excellent' || moon === 'good') strengths.push('Natural emotional understanding and comfort together')
  if (venus === 'excellent' || venus === 'good') strengths.push('Compatible values and expressions of love')
  if (strengths.length === 0) strengths.push('Opportunity for growth through complementary differences')
  return strengths
}

function generateCompatibilityChallenges(
  sun: CompatibilityAspect['compatibility'],
  moon: CompatibilityAspect['compatibility'],
  mars: CompatibilityAspect['compatibility']
): string[] {
  const challenges: string[] = []
  if (sun === 'challenging') challenges.push('Different core identities and life directions require compromise')
  if (moon === 'challenging') challenges.push('Emotional needs may not always align naturally')
  if (mars === 'challenging') challenges.push('Conflict styles differ - conscious communication helps')
  if (challenges.length === 0) challenges.push('Maintain individual growth while growing together')
  return challenges
}

function generateCompatibilityAdvice(score: number): string {
  if (score >= 80) return 'You have strong natural compatibility. Focus on appreciating each other and growing together.'
  if (score >= 65) return 'You have good compatibility with some areas for growth. Communication and understanding differences will strengthen your bond.'
  if (score >= 50) return 'You have moderate compatibility that requires conscious effort. Focus on your strengths and be patient with differences.'
  return 'Your charts present challenges that can become opportunities for profound growth. Patience, communication, and mutual respect are key.'
}

// ---------- Solar Return ----------

/**
 * Calculate Solar Return chart and derive year theme from returned chart.
 */
export async function calculateSolarReturnFromAPI(
  birthData: BirthData,
  year?: number
): Promise<SolarReturnResult> {
  const client = getAstrologyClient()
  const chart = await client.getSolarReturn(birthData, year)

  const ascSign = chart.ascendant?.sign ?? 'aries'
  const sunPlacement = chart.placements.find(p => p.planet === 'sun')
  const sunHouse = sunPlacement?.house ?? 1

  // Derive year theme from ascendant sign
  const signThemes: Record<ZodiacSign, string> = {
    aries: 'new beginnings, independence, and personal initiative',
    taurus: 'financial growth, stability, and sensual pleasures',
    gemini: 'communication, learning, and social connections',
    cancer: 'home, family, and emotional security',
    leo: 'creativity, self-expression, and recognition',
    virgo: 'health, service, and self-improvement',
    libra: 'relationships, balance, and partnerships',
    scorpio: 'transformation, depth, and shared resources',
    sagittarius: 'adventure, education, and expanding horizons',
    capricorn: 'career, ambition, and building lasting structures',
    aquarius: 'innovation, community, and breaking free of limits',
    pisces: 'spirituality, creativity, and compassionate growth',
  }

  // Key areas from sun house placement
  const houseAreas: Record<number, string> = {
    1: 'personal identity and new directions',
    2: 'finances and self-worth',
    3: 'communication and local community',
    4: 'home and family foundations',
    5: 'romance, creativity, and joy',
    6: 'daily routines and health',
    7: 'partnerships and one-on-one relationships',
    8: 'shared resources and transformation',
    9: 'travel, higher learning, and philosophy',
    10: 'career and public reputation',
    11: 'friendships, groups, and future goals',
    12: 'solitude, spirituality, and inner work',
  }

  // Find stellium signs (3+ placements in one sign)
  const signCounts: Partial<Record<ZodiacSign, number>> = {}
  for (const p of chart.placements) {
    signCounts[p.sign] = (signCounts[p.sign] ?? 0) + 1
  }
  const stelliums = Object.entries(signCounts)
    .filter(([, count]) => count >= 3)
    .map(([sign]) => `stellium in ${sign}`)

  const keyAreas = [
    `Year theme set by ${ascSign} rising: ${signThemes[ascSign]}`,
    `Sun in the ${ordinal(sunHouse)} house emphasizes ${houseAreas[sunHouse] ?? 'personal growth'}`,
    ...stelliums,
  ]

  // Approximate solar return date (birthday in target year)
  const targetYear = year ?? new Date().getFullYear()
  const birthDate = new Date(birthData.birth_date)
  const solarReturnDate = new Date(targetYear, birthDate.getMonth(), birthDate.getDate())

  return {
    solarReturnDate,
    solarReturnChart: chart,
    yearTheme: `A year of ${signThemes[ascSign]}`,
    keyAreas,
  }
}

function ordinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return n + (s[(v - 20) % 10] || s[v] || s[0])
}

// ---------- Lunar Return ----------

/**
 * Calculate Lunar Return chart and derive month theme from returned chart.
 */
export async function calculateLunarReturnFromAPI(
  birthData: BirthData,
  date?: Date
): Promise<LunarReturnResult> {
  const client = getAstrologyClient()
  const chart = await client.getLunarReturn(birthData, date)

  const moonPlacement = chart.placements.find(p => p.planet === 'moon')
  const moonSign = moonPlacement?.sign ?? 'aries'
  const ascSign = chart.ascendant?.sign ?? 'aries'

  const signThemes: Record<ZodiacSign, string> = {
    aries: 'asserting needs and taking bold action',
    taurus: 'comfort, security, and grounding',
    gemini: 'communication, curiosity, and mental stimulation',
    cancer: 'nurturing, home life, and emotional processing',
    leo: 'self-expression, creativity, and confidence',
    virgo: 'organization, health, and practical improvements',
    libra: 'relationships, harmony, and social balance',
    scorpio: 'emotional depth, intimacy, and letting go',
    sagittarius: 'optimism, exploration, and seeking meaning',
    capricorn: 'discipline, responsibility, and long-term goals',
    aquarius: 'independence, innovation, and community',
    pisces: 'intuition, compassion, and spiritual reflection',
  }

  const houseAreas: Record<number, string> = {
    1: 'personal needs and self-care',
    2: 'financial matters and values',
    3: 'learning and local connections',
    4: 'home and emotional foundations',
    5: 'creative pursuits and pleasure',
    6: 'daily habits and wellness',
    7: 'partnerships and collaboration',
    8: 'deep emotional processing',
    9: 'broadening perspectives',
    10: 'career focus and public image',
    11: 'social circles and aspirations',
    12: 'rest, retreat, and reflection',
  }

  const moonHouse = moonPlacement?.house ?? 1
  const focusAreas = [
    `Moon in ${moonSign}: emotional focus on ${signThemes[moonSign]}`,
    `${capitalize(ascSign)} rising sets the tone for the month`,
    `Moon in the ${ordinal(moonHouse)} house highlights ${houseAreas[moonHouse] ?? 'personal growth'}`,
  ]

  // Approximate lunar return date (close to target date)
  const lunarReturnDate = date ?? new Date()

  return {
    lunarReturnDate,
    lunarReturnChart: chart,
    moonSign,
    monthTheme: `A month of ${signThemes[moonSign]}`,
    focusAreas,
  }
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
