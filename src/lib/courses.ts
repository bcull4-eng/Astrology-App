/**
 * Astrology Learning Course Data
 *
 * Course content for beginner and advanced astrology courses.
 */

import type { Course } from '@/types/learning'

export const COURSES: Course[] = [
  {
    id: 'foundations',
    title: 'Foundations of Astrology',
    description: 'Master the building blocks of astrology - from zodiac signs to planetary meanings to house interpretations.',
    difficulty: 'beginner',
    estimatedMinutes: 20,
    icon: '✨',
    modules: [
      {
        id: 'zodiac-basics',
        title: 'The Zodiac Signs',
        description: 'Understand the 12 zodiac signs, their elements, and modalities.',
        lessons: [
          {
            id: 'what-is-zodiac',
            title: 'What is the Zodiac?',
            description: 'An introduction to the zodiac wheel and how it forms the foundation of astrology.',
            estimatedMinutes: 1,
            content: [
              { type: 'heading', content: 'The Celestial Blueprint', level: 2 },
              {
                type: 'chat',
                messages: [
                  { role: 'student', content: "I keep hearing about zodiac signs, but what actually is the zodiac?" },
                  { role: 'guide', content: "Great question! Imagine a giant belt wrapped around the Earth, like a cosmic highway. The Sun, Moon, and planets travel along this highway throughout the year." },
                  { role: 'student', content: "So it's like a path in space?" },
                  { role: 'guide', content: "Exactly! And we've divided this path into 12 sections - those are the zodiac signs. Each section has its own personality and energy." }
                ]
              },
              {
                type: 'zodiacWheel',
                highlight: ['aries', 'cancer', 'libra', 'capricorn'],
                showUserPlacements: false
              },
              {
                type: 'text',
                content: 'The zodiac is a belt of the heavens divided into twelve equal parts, each named after a constellation. Think of it as a cosmic clock that the Sun, Moon, and planets move through over time.'
              },
              {
                type: 'concept',
                title: 'The Ecliptic',
                content: 'The zodiac follows the ecliptic - the apparent path the Sun traces across the sky throughout the year. This 360° circle is divided into twelve 30° segments, each representing a zodiac sign.',
                icon: '🌞'
              },
              {
                type: 'funFact',
                content: 'The word "zodiac" comes from the Greek "zodiakos kyklos" meaning "circle of animals." Most zodiac signs are represented by animals or mythological creatures!'
              },
              {
                type: 'text',
                content: 'When we say someone is a "Leo" or "Pisces," we\'re referring to where the Sun was positioned in the zodiac at the moment of their birth. But that\'s just the beginning - every planet occupies a zodiac sign, creating a unique celestial fingerprint.'
              },
              {
                type: 'interactive',
                question: 'If someone was born on July 25th, where would their Sun be?',
                options: [
                  { label: 'Cancer', response: 'Close! Cancer runs from June 21 to July 22. July 25th falls just after Cancer ends.', isCorrect: false },
                  { label: 'Leo', response: 'Correct! Leo season runs from July 23 to August 22, so someone born July 25th is a Leo Sun.', isCorrect: true },
                  { label: 'Virgo', response: 'Not quite - Virgo season starts on August 23. July 25th is earlier in the summer.', isCorrect: false }
                ]
              },
              {
                type: 'callout',
                content: 'Your birth chart captures the exact positions of all celestial bodies at your moment of birth - like a snapshot of the sky.',
                variant: 'tip'
              },
              {
                type: 'yourChart',
                highlight: 'sun',
                description: 'This is where your Sun was at the moment you were born - your core identity.'
              },
              {
                type: 'personalized',
                dataKey: 'sunSign',
                template: 'Your Sun is in {value}, which represents your core identity and life purpose.'
              },
              {
                type: 'reflection',
                prompt: 'Think about your Sun sign. What traits of that sign do you recognize in yourself? What surprises you?',
                placeholder: 'I notice that I...'
              }
            ],
            quiz: [
              {
                id: 'q1-zodiac-divisions',
                question: 'How many signs make up the zodiac?',
                options: ['10', '12', '13', '24'],
                correctIndex: 1,
                explanation: 'The zodiac is divided into 12 equal parts of 30° each, giving us the 12 zodiac signs.'
              },
              {
                id: 'q2-sun-sign',
                question: 'What does your Sun sign represent?',
                options: ['Your emotions', 'Your core identity', 'Your relationships', 'Your career'],
                correctIndex: 1,
                explanation: 'The Sun sign represents your core identity, ego, and life purpose - the essence of who you are.'
              }
            ]
          },
          {
            id: 'elements',
            title: 'The Four Elements',
            description: 'Discover how Fire, Earth, Air, and Water shape personality.',
            estimatedMinutes: 2,
            content: [
              { type: 'heading', content: 'Fire, Earth, Air & Water', level: 2 },
              {
                type: 'animation',
                variant: 'zodiac-cycle'
              },
              {
                type: 'text',
                content: 'Every zodiac sign belongs to one of four elements. Understanding elements gives you immediate insight into how signs express themselves.'
              },
              {
                type: 'comparison',
                title: 'The Four Elements at a Glance',
                items: [
                  { label: 'Energy', left: 'Fire: Action & Passion', right: 'Water: Emotion & Intuition' },
                  { label: 'Nature', left: 'Air: Ideas & Connection', right: 'Earth: Structure & Stability' },
                  { label: 'Focus', left: 'Fire/Air: Outward', right: 'Water/Earth: Inward' }
                ]
              },
              {
                type: 'concept',
                title: 'Fire Signs',
                content: 'Aries, Leo, Sagittarius - Passionate, energetic, and action-oriented. Fire signs are the initiators and enthusiasts of the zodiac.',
                icon: '🔥'
              },
              {
                type: 'signCard',
                sign: 'aries'
              },
              {
                type: 'concept',
                title: 'Earth Signs',
                content: 'Taurus, Virgo, Capricorn - Practical, grounded, and reliable. Earth signs build, maintain, and create tangible results.',
                icon: '🌍'
              },
              {
                type: 'signCard',
                sign: 'taurus'
              },
              {
                type: 'concept',
                title: 'Air Signs',
                content: 'Gemini, Libra, Aquarius - Intellectual, communicative, and social. Air signs connect ideas and people.',
                icon: '💨'
              },
              {
                type: 'signCard',
                sign: 'gemini'
              },
              {
                type: 'concept',
                title: 'Water Signs',
                content: 'Cancer, Scorpio, Pisces - Emotional, intuitive, and empathetic. Water signs feel deeply and navigate the emotional realm.',
                icon: '💧'
              },
              {
                type: 'signCard',
                sign: 'cancer'
              },
              {
                type: 'funFact',
                content: 'The elements follow an ancient pattern: Fire and Air are considered "masculine" (active, outward), while Earth and Water are "feminine" (receptive, inward). This has nothing to do with gender - it describes energy flow!'
              },
              {
                type: 'interactive',
                question: 'Which element would you expect to be the best at handling a crisis?',
                options: [
                  { label: 'Fire', response: 'Fire signs are quick to act! They jump into action, though sometimes without a full plan.', isCorrect: false },
                  { label: 'Earth', response: 'Great answer! Earth signs stay calm and practical, creating step-by-step solutions.', isCorrect: true },
                  { label: 'Air', response: 'Air signs analyze the situation well but might get stuck in their head during emergencies.', isCorrect: false },
                  { label: 'Water', response: 'Water signs can sense the emotional needs of others but may get overwhelmed in chaos.', isCorrect: false }
                ]
              },
              { type: 'heading', content: 'Your Elemental Balance', level: 3 },
              {
                type: 'elementChart',
                showUserDistribution: true
              },
              {
                type: 'personalized',
                dataKey: 'dominantElement',
                template: 'Your chart has a strong {value} influence, which shapes how you approach life and process experiences.'
              },
              {
                type: 'callout',
                content: 'A balanced chart has placements across multiple elements, but most people have one or two dominant elements.',
                variant: 'info'
              },
              {
                type: 'reflection',
                prompt: 'Based on your dominant element, how do you typically respond when facing a challenge or decision?',
                placeholder: 'When I face challenges, I tend to...'
              }
            ],
            quiz: [
              {
                id: 'q1-fire-signs',
                question: 'Which signs belong to the Fire element?',
                options: ['Cancer, Scorpio, Pisces', 'Gemini, Libra, Aquarius', 'Aries, Leo, Sagittarius', 'Taurus, Virgo, Capricorn'],
                correctIndex: 2,
                explanation: 'Aries, Leo, and Sagittarius are the three Fire signs - passionate, energetic, and action-oriented.'
              },
              {
                id: 'q2-earth-traits',
                question: 'What best describes Earth signs?',
                options: ['Emotional and intuitive', 'Practical and grounded', 'Intellectual and social', 'Passionate and impulsive'],
                correctIndex: 1,
                explanation: 'Earth signs (Taurus, Virgo, Capricorn) are known for being practical, reliable, and focused on tangible results.'
              }
            ]
          },
          {
            id: 'modalities',
            title: 'The Three Modalities',
            description: 'Learn how Cardinal, Fixed, and Mutable signs approach change.',
            estimatedMinutes: 2,
            content: [
              { type: 'heading', content: 'Cardinal, Fixed & Mutable', level: 2 },
              {
                type: 'chat',
                messages: [
                  { role: 'student', content: "So all Fire signs are the same?" },
                  { role: 'guide', content: "Not at all! Aries, Leo, and Sagittarius are all Fire signs, but they express that fire differently. That's where modalities come in." },
                  { role: 'student', content: "What do you mean?" },
                  { role: 'guide', content: "Aries STARTS the fire (Cardinal), Leo MAINTAINS the fire (Fixed), and Sagittarius SPREADS the fire (Mutable). Same element, different approaches!" }
                ]
              },
              {
                type: 'text',
                content: 'Beyond elements, each sign has a modality (or quality) that describes how it takes action and responds to change.'
              },
              {
                type: 'zodiacWheel',
                highlight: ['aries', 'cancer', 'libra', 'capricorn'],
                showUserPlacements: false
              },
              {
                type: 'concept',
                title: 'Cardinal Signs',
                content: 'Aries, Cancer, Libra, Capricorn - The initiators. Cardinal signs start new seasons and love to begin new projects. They\'re leaders who set things in motion.',
                icon: '🚀'
              },
              {
                type: 'zodiacWheel',
                highlight: ['taurus', 'leo', 'scorpio', 'aquarius'],
                showUserPlacements: false
              },
              {
                type: 'concept',
                title: 'Fixed Signs',
                content: 'Taurus, Leo, Scorpio, Aquarius - The stabilizers. Fixed signs occur in the middle of seasons and excel at maintaining, persisting, and seeing things through.',
                icon: '⚓'
              },
              {
                type: 'zodiacWheel',
                highlight: ['gemini', 'virgo', 'sagittarius', 'pisces'],
                showUserPlacements: false
              },
              {
                type: 'concept',
                title: 'Mutable Signs',
                content: 'Gemini, Virgo, Sagittarius, Pisces - The adapters. Mutable signs end seasons and are flexible, versatile, and comfortable with change.',
                icon: '🌊'
              },
              {
                type: 'comparison',
                title: 'Modalities in Action',
                items: [
                  { label: 'Project Start', left: 'Cardinal: Launches it', right: 'Fixed: Plans thoroughly' },
                  { label: 'Mid-Project', left: 'Fixed: Keeps going', right: 'Mutable: Adapts as needed' },
                  { label: 'Challenges', left: 'Cardinal: Finds new direction', right: 'Mutable: Goes with the flow' }
                ]
              },
              {
                type: 'funFact',
                content: 'The modalities align with the seasons! Cardinal signs begin each season (spring equinox = Aries), Fixed signs are mid-season stability, and Mutable signs transition us to the next season.'
              },
              {
                type: 'interactive',
                question: 'A team needs someone to adapt a failing project. Which modality would be ideal?',
                options: [
                  { label: 'Cardinal', response: 'Cardinal signs are great starters, but might just want to scrap it and begin fresh rather than adapt.', isCorrect: false },
                  { label: 'Fixed', response: 'Fixed signs have perseverance but can be resistant to the changes a failing project needs.', isCorrect: false },
                  { label: 'Mutable', response: 'Exactly! Mutable signs excel at flexibility and can pivot, adjust, and adapt to save a struggling project.', isCorrect: true }
                ]
              },
              {
                type: 'callout',
                content: 'When you combine element + modality, each combination is unique. For example, Aries is Cardinal Fire (initiating action), while Leo is Fixed Fire (sustaining passion).',
                variant: 'tip'
              },
              {
                type: 'personalized',
                dataKey: 'dominantModality',
                template: 'Your chart shows strong {value} energy, influencing how you approach projects and handle change.'
              },
              {
                type: 'reflection',
                prompt: 'Think about a recent project or goal. Did you find it easier to start, maintain, or adapt? What does this tell you about your dominant modality?',
                placeholder: 'When working on projects, I notice that I...'
              }
            ],
            quiz: [
              {
                id: 'q1-cardinal-trait',
                question: 'What best describes Cardinal signs?',
                options: ['They resist change', 'They initiate and lead', 'They adapt to circumstances', 'They analyze deeply'],
                correctIndex: 1,
                explanation: 'Cardinal signs are initiators - they start new seasons and love to begin new projects and lead the way.'
              },
              {
                id: 'q2-fixed-signs',
                question: 'Which of these is a Fixed sign?',
                options: ['Aries', 'Gemini', 'Leo', 'Sagittarius'],
                correctIndex: 2,
                explanation: 'Leo is a Fixed Fire sign. Fixed signs (Taurus, Leo, Scorpio, Aquarius) are known for persistence and stability.'
              }
            ]
          },
          {
            id: 'sign-meanings',
            title: 'The 12 Sign Personalities',
            description: 'A brief tour through each zodiac sign\'s core traits.',
            estimatedMinutes: 4,
            content: [
              { type: 'heading', content: 'Meet the Signs', level: 2 },
              {
                type: 'text',
                content: 'Each zodiac sign has distinct characteristics. Here\'s a quick overview of all twelve.'
              },
              {
                type: 'list',
                style: 'bullet',
                items: [
                  'Aries (Mar 21 - Apr 19): Bold, pioneering, competitive. The warrior who charges ahead.',
                  'Taurus (Apr 20 - May 20): Steady, sensual, determined. The builder who values security.',
                  'Gemini (May 21 - Jun 20): Curious, adaptable, communicative. The storyteller who connects ideas.',
                  'Cancer (Jun 21 - Jul 22): Nurturing, protective, intuitive. The caretaker who creates home.',
                  'Leo (Jul 23 - Aug 22): Creative, generous, dramatic. The performer who radiates warmth.',
                  'Virgo (Aug 23 - Sep 22): Analytical, helpful, precise. The healer who improves systems.',
                  'Libra (Sep 23 - Oct 22): Harmonious, diplomatic, aesthetic. The partner who seeks balance.',
                  'Scorpio (Oct 23 - Nov 21): Intense, transformative, perceptive. The detective who uncovers truth.',
                  'Sagittarius (Nov 22 - Dec 21): Adventurous, philosophical, optimistic. The explorer who seeks meaning.',
                  'Capricorn (Dec 22 - Jan 19): Ambitious, disciplined, responsible. The achiever who builds legacy.',
                  'Aquarius (Jan 20 - Feb 18): Innovative, humanitarian, independent. The visionary who challenges norms.',
                  'Pisces (Feb 19 - Mar 20): Compassionate, imaginative, spiritual. The dreamer who transcends boundaries.'
                ]
              },
              {
                type: 'personalized',
                dataKey: 'sunSign',
                template: 'As a {value} Sun, you embody the core qualities of this sign in your identity and self-expression.'
              },
              {
                type: 'callout',
                content: 'Remember: You\'re not just your Sun sign! Your Moon, Rising, and other placements add layers of complexity.',
                variant: 'info'
              }
            ],
            quiz: [
              {
                id: 'q1-virgo-trait',
                question: 'Which trait best describes Virgo?',
                options: ['Dramatic and creative', 'Analytical and helpful', 'Adventurous and philosophical', 'Nurturing and protective'],
                correctIndex: 1,
                explanation: 'Virgo is known for being analytical, helpful, and precise - the sign that improves and refines.'
              },
              {
                id: 'q2-scorpio-element',
                question: 'What element is Scorpio?',
                options: ['Fire', 'Earth', 'Air', 'Water'],
                correctIndex: 3,
                explanation: 'Scorpio is a Water sign, along with Cancer and Pisces. Water signs are emotional, intuitive, and deep.'
              }
            ]
          }
        ]
      },
      {
        id: 'planets',
        title: 'The Planets',
        description: 'Understand what each planet represents in your chart.',
        lessons: [
          {
            id: 'personal-planets',
            title: 'The Personal Planets',
            description: 'Sun, Moon, Mercury, Venus, and Mars - the planets that shape your personality.',
            estimatedMinutes: 3,
            content: [
              { type: 'heading', content: 'Your Inner World', level: 2 },
              {
                type: 'animation',
                variant: 'planets-orbit'
              },
              {
                type: 'text',
                content: 'Personal planets move quickly through the zodiac and represent your day-to-day personality, desires, and habits.'
              },
              {
                type: 'chat',
                messages: [
                  { role: 'student', content: "Why are some planets called 'personal' planets?" },
                  { role: 'guide', content: "Great question! Personal planets move fast - they change signs within days to weeks. So your placements are unique to YOU, not shared by everyone born that year." },
                  { role: 'student', content: "That makes sense. So they're more about individual personality?" },
                  { role: 'guide', content: "Exactly! They shape your daily life - how you think, feel, love, and act. They're the planets you 'feel' most directly." }
                ]
              },
              {
                type: 'planetCard',
                planet: 'sun'
              },
              {
                type: 'concept',
                title: 'The Sun',
                content: 'Your core identity, ego, and life purpose. The Sun represents who you\'re becoming and what makes you feel vital and alive.',
                icon: '☀️'
              },
              {
                type: 'personalized',
                dataKey: 'sunSign',
                template: 'Your Sun in {value} shows your essential nature and what brings you a sense of purpose.'
              },
              {
                type: 'planetCard',
                planet: 'moon'
              },
              {
                type: 'concept',
                title: 'The Moon',
                content: 'Your emotional nature, instincts, and inner needs. The Moon shows how you nurture yourself and what makes you feel safe.',
                icon: '🌙'
              },
              {
                type: 'animation',
                variant: 'moon-phases'
              },
              {
                type: 'personalized',
                dataKey: 'moonSign',
                template: 'Your Moon in {value} reveals your emotional needs and how you process feelings.'
              },
              {
                type: 'planetCard',
                planet: 'mercury'
              },
              {
                type: 'concept',
                title: 'Mercury',
                content: 'Your mind, communication style, and learning approach. Mercury rules how you think, speak, and process information.',
                icon: '☿️'
              },
              {
                type: 'funFact',
                content: 'Mercury retrograde happens 3-4 times per year when Mercury appears to move backward in the sky. It\'s notorious for communication mix-ups, but it\'s also a great time for reflection and review!'
              },
              {
                type: 'personalized',
                dataKey: 'mercurySign',
                template: 'Your Mercury in {value} shapes how you communicate and learn.'
              },
              {
                type: 'planetCard',
                planet: 'venus'
              },
              {
                type: 'concept',
                title: 'Venus',
                content: 'Your values, aesthetics, and approach to love. Venus shows what you find beautiful and how you relate in partnerships.',
                icon: '♀️'
              },
              {
                type: 'personalized',
                dataKey: 'venusSign',
                template: 'Your Venus in {value} influences your relationship style and what you find attractive.'
              },
              {
                type: 'planetCard',
                planet: 'mars'
              },
              {
                type: 'concept',
                title: 'Mars',
                content: 'Your drive, ambition, and how you take action. Mars represents your energy, assertiveness, and what motivates you.',
                icon: '♂️'
              },
              {
                type: 'personalized',
                dataKey: 'marsSign',
                template: 'Your Mars in {value} shows how you pursue goals and express your energy.'
              },
              {
                type: 'interactive',
                question: 'If someone has Mars in a Fire sign, how might they approach conflict?',
                options: [
                  { label: 'Avoid it entirely', response: 'Not quite - Fire Mars tends to meet conflict head-on rather than avoid it.', isCorrect: false },
                  { label: 'Address it directly and passionately', response: 'Correct! Fire Mars (Aries, Leo, Sagittarius) tends to be direct, passionate, and action-oriented in conflict.', isCorrect: true },
                  { label: 'Analyze it intellectually', response: 'That sounds more like Air Mars! Fire Mars acts on instinct rather than analysis.', isCorrect: false }
                ]
              },
              {
                type: 'yourChart',
                highlight: 'all',
                description: 'Here are your personal planet placements - the foundation of your unique astrological profile.'
              },
              {
                type: 'reflection',
                prompt: 'Look at your Sun and Moon signs. How do your conscious identity (Sun) and emotional needs (Moon) work together? Do they complement or challenge each other?',
                placeholder: 'My Sun wants... but my Moon needs...'
              }
            ],
            quiz: [
              {
                id: 'q1-moon-represents',
                question: 'What does the Moon represent in astrology?',
                options: ['Career ambitions', 'Emotional nature and inner needs', 'Communication style', 'Life purpose'],
                correctIndex: 1,
                explanation: 'The Moon represents your emotional nature, instincts, and what makes you feel safe and nurtured.'
              },
              {
                id: 'q2-venus-rules',
                question: 'Venus rules over:',
                options: ['Action and drive', 'Love and values', 'Communication', 'Transformation'],
                correctIndex: 1,
                explanation: 'Venus governs love, beauty, values, and how we relate to others in partnerships.'
              }
            ]
          },
          {
            id: 'social-planets',
            title: 'The Social Planets',
            description: 'Jupiter and Saturn - planets that bridge personal and collective.',
            estimatedMinutes: 2,
            content: [
              { type: 'heading', content: 'Bridging Inner & Outer Worlds', level: 2 },
              {
                type: 'text',
                content: 'Jupiter and Saturn take longer to move through the zodiac and represent how we engage with society and develop over time.'
              },
              {
                type: 'chat',
                messages: [
                  { role: 'student', content: "Why are Jupiter and Saturn called 'social' planets?" },
                  { role: 'guide', content: "They move slower than personal planets - Jupiter takes 12 years to orbit the Sun, Saturn takes 29 years. So people born within a year or two share these placements." },
                  { role: 'student', content: "So they affect groups of people?" },
                  { role: 'guide', content: "Exactly! They shape how your generation approaches growth (Jupiter) and responsibility (Saturn). They bridge your personal world and society." }
                ]
              },
              {
                type: 'planetCard',
                planet: 'jupiter'
              },
              {
                type: 'concept',
                title: 'Jupiter',
                content: 'The planet of expansion, luck, and wisdom. Jupiter shows where you find opportunity, growth, and meaning. It expands whatever it touches.',
                icon: '♃'
              },
              {
                type: 'funFact',
                content: 'Jupiter is the largest planet in our solar system - over 1,300 Earths could fit inside! Astrologically, it embodies this bigness through expansion, generosity, and abundance.'
              },
              {
                type: 'personalized',
                dataKey: 'jupiterSign',
                template: 'Your Jupiter in {value} reveals where you naturally attract abundance and seek growth.'
              },
              {
                type: 'planetCard',
                planet: 'saturn'
              },
              {
                type: 'concept',
                title: 'Saturn',
                content: 'The planet of structure, discipline, and mastery. Saturn shows where you face challenges that build character and lasting achievement.',
                icon: '♄'
              },
              {
                type: 'funFact',
                content: 'The "Saturn Return" happens around ages 28-30 and 57-60 when Saturn returns to its birth position. These are major life milestones for most people - times of growing up and taking on new responsibilities.'
              },
              {
                type: 'personalized',
                dataKey: 'saturnSign',
                template: 'Your Saturn in {value} indicates the areas where you\'re building mastery through effort and patience.'
              },
              {
                type: 'comparison',
                title: 'Jupiter vs Saturn',
                items: [
                  { label: 'Energy', left: 'Jupiter: Expansion', right: 'Saturn: Contraction' },
                  { label: 'Message', left: '"Yes! Go for it!"', right: '"Slow down, do the work"' },
                  { label: 'Gifts', left: 'Luck, abundance, faith', right: 'Mastery, discipline, wisdom' },
                  { label: 'Challenge', left: 'Excess, overconfidence', right: 'Fear, limitation, delay' }
                ]
              },
              {
                type: 'interactive',
                question: 'Someone with Jupiter conjunct (next to) Saturn in their chart might experience:',
                options: [
                  { label: 'Constant inner conflict', response: 'Not necessarily! While these energies differ, they can work together constructively.', isCorrect: false },
                  { label: 'Disciplined growth and realistic optimism', response: 'Exactly! Jupiter-Saturn contacts often produce measured, sustainable success - optimism grounded in hard work.', isCorrect: true },
                  { label: 'Pure luck with no effort', response: 'Saturn would never allow that! Even lucky Jupiter needs Saturn\'s structure to manifest lasting results.', isCorrect: false }
                ]
              },
              {
                type: 'callout',
                content: 'Jupiter and Saturn work as a pair - Jupiter expands and says "yes" while Saturn contracts and says "not yet." Both are necessary for balanced growth.',
                variant: 'tip'
              },
              {
                type: 'reflection',
                prompt: 'Think of a time you had to balance enthusiasm (Jupiter) with patience and discipline (Saturn). How did that play out?',
                placeholder: 'I remember when I wanted to...'
              }
            ],
            quiz: [
              {
                id: 'q1-jupiter-meaning',
                question: 'Jupiter is known as the planet of:',
                options: ['Restriction and discipline', 'Expansion and luck', 'Communication', 'Transformation'],
                correctIndex: 1,
                explanation: 'Jupiter is the great benefic - the planet of expansion, opportunity, luck, and wisdom.'
              },
              {
                id: 'q2-saturn-teaches',
                question: 'What does Saturn teach us?',
                options: ['To take risks', 'To go with the flow', 'Discipline and mastery through challenges', 'To follow our emotions'],
                correctIndex: 2,
                explanation: 'Saturn is the great teacher - it presents challenges that help us build structure, discipline, and lasting mastery.'
              }
            ]
          },
          {
            id: 'outer-planets',
            title: 'The Outer Planets',
            description: 'Uranus, Neptune, and Pluto - generational and transformative forces.',
            estimatedMinutes: 2,
            content: [
              { type: 'heading', content: 'Collective & Transformative Forces', level: 2 },
              {
                type: 'text',
                content: 'The outer planets move very slowly and influence entire generations. Their house placement in your chart is more personally significant than their sign.'
              },
              {
                type: 'comparison',
                title: 'Outer Planet Orbit Times',
                items: [
                  { label: 'Uranus', left: '84 years per orbit', right: '~7 years per sign' },
                  { label: 'Neptune', left: '165 years per orbit', right: '~14 years per sign' },
                  { label: 'Pluto', left: '248 years per orbit', right: '12-31 years per sign' }
                ]
              },
              {
                type: 'planetCard',
                planet: 'uranus'
              },
              {
                type: 'concept',
                title: 'Uranus',
                content: 'Revolution, innovation, and sudden change. Uranus breaks patterns and brings unexpected awakenings. It rules originality and the urge for freedom.',
                icon: '♅'
              },
              {
                type: 'funFact',
                content: 'Uranus rotates on its side - it literally rolls around the Sun! Astrologically, it represents the unexpected, the eccentric, and the revolutionary.'
              },
              {
                type: 'planetCard',
                planet: 'neptune'
              },
              {
                type: 'concept',
                title: 'Neptune',
                content: 'Dreams, spirituality, and transcendence. Neptune dissolves boundaries and connects us to the mystical. It rules imagination, compassion, and illusion.',
                icon: '♆'
              },
              {
                type: 'funFact',
                content: 'Neptune was discovered in 1846 - around the same time photography, film, and anesthesia were developed. All Neptune themes: capturing dreams, illusion, and transcending physical reality.'
              },
              {
                type: 'planetCard',
                planet: 'pluto'
              },
              {
                type: 'concept',
                title: 'Pluto',
                content: 'Transformation, power, and rebirth. Pluto takes us through death-and-rebirth cycles, destroying what no longer serves so something new can emerge.',
                icon: '♇'
              },
              {
                type: 'funFact',
                content: 'Pluto was "demoted" to dwarf planet status in 2006, but astrologers still honor its powerful influence. Its energy is about power struggles, transformation, and what lies beneath the surface.'
              },
              {
                type: 'interactive',
                question: 'Which outer planet would most likely be activated during a sudden career change or technological breakthrough?',
                options: [
                  { label: 'Uranus', response: 'Correct! Uranus rules sudden changes, innovation, and breaking free from old patterns. Technology and unexpected shifts are very Uranian.', isCorrect: true },
                  { label: 'Neptune', response: 'Neptune is more about gradual dissolution, dreams, and spirituality - not sudden, concrete changes.', isCorrect: false },
                  { label: 'Pluto', response: 'Pluto brings deep transformation, but it\'s usually a longer, more intense process rather than sudden breakthroughs.', isCorrect: false }
                ]
              },
              {
                type: 'callout',
                content: 'Because outer planets move so slowly, everyone born within several years shares the same outer planet signs. The houses they occupy make them personal.',
                variant: 'info'
              },
              {
                type: 'reflection',
                prompt: 'Outer planets often correlate with generational themes. Think about your generation - what collective experiences (technology, social movements, crises) might reflect your outer planet placements?',
                placeholder: 'My generation has experienced...'
              }
            ],
            quiz: [
              {
                id: 'q1-uranus-represents',
                question: 'Uranus represents:',
                options: ['Tradition and stability', 'Revolution and innovation', 'Emotion and nurturing', 'Communication'],
                correctIndex: 1,
                explanation: 'Uranus is the planet of revolution, innovation, sudden change, and the urge for freedom.'
              },
              {
                id: 'q2-outer-planets-note',
                question: 'Why are outer planets called "generational"?',
                options: ['They only affect older people', 'They move slowly so whole generations share the same sign', 'They were discovered recently', 'They orbit the Sun together'],
                correctIndex: 1,
                explanation: 'Outer planets move very slowly through the zodiac, so people born within several years share the same outer planet signs.'
              }
            ]
          }
        ]
      },
      {
        id: 'houses',
        title: 'The Houses',
        description: 'Learn where in life the planetary energies play out.',
        lessons: [
          {
            id: 'house-basics',
            title: 'Understanding Houses',
            description: 'The 12 houses as areas of life experience.',
            estimatedMinutes: 3,
            content: [
              { type: 'heading', content: 'The Stage of Life', level: 2 },
              {
                type: 'chat',
                messages: [
                  { role: 'student', content: "I understand signs and planets, but what are houses?" },
                  { role: 'guide', content: "Great question! Think of it like a play: planets are the ACTORS (what's happening), signs are HOW they act, and houses are WHERE the scene takes place." },
                  { role: 'student', content: "So my Venus in Libra in the 7th house means..." },
                  { role: 'guide', content: "Your love nature (Venus) expresses harmoniously (Libra) in the area of partnerships (7th house). The house tells you where that energy shows up in your life!" }
                ]
              },
              {
                type: 'text',
                content: 'If planets are the actors and signs are how they perform, houses are where the action takes place. The 12 houses represent different areas of life.'
              },
              {
                type: 'zodiacWheel',
                showUserPlacements: true
              },
              {
                type: 'callout',
                content: 'Your houses are determined by your exact birth time and location. This is why knowing your birth time matters!',
                variant: 'info'
              },
              {
                type: 'comparison',
                title: 'Houses by Theme',
                items: [
                  { label: 'Self', left: '1st: Identity', right: '12th: Unconscious self' },
                  { label: 'Resources', left: '2nd: Personal money', right: '8th: Shared resources' },
                  { label: 'Relationships', left: '7th: One-on-one', right: '11th: Groups & friends' },
                  { label: 'Direction', left: '4th: Private life', right: '10th: Public life' }
                ]
              },
              {
                type: 'list',
                style: 'numbered',
                items: [
                  '1st House (Rising): Self-image, appearance, first impressions',
                  '2nd House: Money, possessions, values, self-worth',
                  '3rd House: Communication, siblings, local travel, learning',
                  '4th House: Home, family, roots, emotional foundation',
                  '5th House: Creativity, romance, children, pleasure',
                  '6th House: Health, daily routines, work, service',
                  '7th House: Partnerships, marriage, one-on-one relationships',
                  '8th House: Shared resources, transformation, intimacy, death/rebirth',
                  '9th House: Travel, higher education, philosophy, beliefs',
                  '10th House: Career, public image, reputation, achievements',
                  '11th House: Friends, groups, hopes, humanitarian causes',
                  '12th House: Subconscious, spirituality, hidden matters, endings'
                ]
              },
              {
                type: 'funFact',
                content: 'Opposite houses are always connected! The 1st/7th axis is Self vs. Other. The 4th/10th is Private vs. Public. The 2nd/8th is Mine vs. Ours. Understanding these polarities is key to chart interpretation.'
              },
              {
                type: 'interactive',
                question: 'If someone wanted to understand their communication style and relationship with siblings, which house would you look at?',
                options: [
                  { label: '1st House', response: 'Close! The 1st house is about overall self-presentation, but for communication specifically, look elsewhere.', isCorrect: false },
                  { label: '3rd House', response: 'Correct! The 3rd house rules communication, siblings, short journeys, and how we learn and share information.', isCorrect: true },
                  { label: '7th House', response: 'The 7th house is about partnerships and marriage - important relationships, but not specifically siblings.', isCorrect: false },
                  { label: '9th House', response: 'The 9th house is about higher learning and long-distance travel, not everyday communication.', isCorrect: false }
                ]
              },
              {
                type: 'yourChart',
                highlight: 'all',
                description: 'Here are your house placements - see how the planets are distributed across different life areas.'
              },
              {
                type: 'personalized',
                dataKey: 'sunHouse',
                template: 'Your Sun is in the {value} house, meaning your identity and purpose shine most brightly in this life area.'
              },
              {
                type: 'reflection',
                prompt: 'Which house seems most active in your life right now? (Career = 10th, relationships = 7th, home = 4th, self-discovery = 1st, etc.)',
                placeholder: 'The life area I\'m most focused on right now is...'
              }
            ],
            quiz: [
              {
                id: 'q1-7th-house',
                question: 'The 7th house rules:',
                options: ['Career and reputation', 'Home and family', 'Partnerships and marriage', 'Money and possessions'],
                correctIndex: 2,
                explanation: 'The 7th house is the house of partnerships - marriage, business partners, and one-on-one relationships.'
              },
              {
                id: 'q2-house-determines',
                question: 'What determines your house placements?',
                options: ['Just your birth date', 'Your birth time and location', 'The year you were born', 'Your Sun sign'],
                correctIndex: 1,
                explanation: 'Houses are calculated using your exact birth time and location, which is why accurate birth data matters.'
              }
            ]
          },
          {
            id: 'angular-houses',
            title: 'The Angular Houses',
            description: 'The four most powerful houses: 1st, 4th, 7th, and 10th.',
            estimatedMinutes: 2,
            content: [
              { type: 'heading', content: 'The Four Angles', level: 2 },
              {
                type: 'text',
                content: 'The angular houses (1st, 4th, 7th, 10th) are the most powerful positions in a chart. Planets here have strong, visible influence.'
              },
              {
                type: 'zodiacWheel',
                highlight: ['aries', 'cancer', 'libra', 'capricorn'],
                showUserPlacements: false
              },
              {
                type: 'funFact',
                content: 'The four angles form a cross in your chart. They mark the horizon (Ascendant/Descendant) and the meridian (IC/Midheaven). These are the most sensitive points - transiting planets here often trigger major life events!'
              },
              {
                type: 'comparison',
                title: 'The Four Angles',
                items: [
                  { label: 'Horizon', left: 'Ascendant (1st): Self', right: 'Descendant (7th): Other' },
                  { label: 'Meridian', left: 'IC (4th): Private', right: 'MC (10th): Public' }
                ]
              },
              {
                type: 'concept',
                title: '1st House / Ascendant',
                content: 'Your rising sign and how you present yourself to the world. This is your "front door" - the first impression others have of you.',
                icon: '👤'
              },
              {
                type: 'yourChart',
                highlight: 'rising',
                description: 'Your Rising sign shapes your appearance, demeanor, and how you instinctively react to new situations.'
              },
              {
                type: 'personalized',
                dataKey: 'risingSign',
                template: 'Your Ascendant is in {value}, shaping how others perceive you and how you approach new situations.'
              },
              {
                type: 'concept',
                title: '4th House / IC',
                content: 'Your roots, home, and private self. This is your foundation - family origins, where you retreat, and your emotional base.',
                icon: '🏠'
              },
              {
                type: 'concept',
                title: '7th House / Descendant',
                content: 'Your partnerships and what you seek in others. Opposite your Ascendant, it shows qualities you attract or need in relationships.',
                icon: '🤝'
              },
              {
                type: 'chat',
                messages: [
                  { role: 'student', content: "Wait, if my Rising is Aries, my Descendant is the opposite sign?" },
                  { role: 'guide', content: "Exactly! With Aries rising, your 7th house cusp is Libra. You present as bold and independent, but you're drawn to partners who are diplomatic and harmonious." },
                  { role: 'student', content: "So we attract what we need to balance ourselves?" },
                  { role: 'guide', content: "That's a beautiful way to put it! The Descendant shows qualities we often project onto others or need to develop in ourselves through relationships." }
                ]
              },
              {
                type: 'concept',
                title: '10th House / Midheaven',
                content: 'Your career, public image, and legacy. This is your most visible point - how the world sees your achievements and contributions.',
                icon: '⭐'
              },
              {
                type: 'interactive',
                question: 'If someone has Mars exactly on their Midheaven, how might it manifest?',
                options: [
                  { label: 'Hidden anger issues', response: 'Actually, planets on the Midheaven are very visible - not hidden at all!', isCorrect: false },
                  { label: 'A bold, action-oriented career', response: 'Correct! Mars on the MC often indicates careers involving action, competition, leadership, or physical activity. Very visible drive and ambition.', isCorrect: true },
                  { label: 'Difficulty in relationships', response: 'That would be more related to planets in the 7th house or aspecting Venus. The MC is about career and public image.', isCorrect: false }
                ]
              },
              {
                type: 'callout',
                content: 'Any planet conjunct (near) an angle becomes especially prominent in your life and personality.',
                variant: 'tip'
              },
              {
                type: 'reflection',
                prompt: 'Think about how you come across to strangers (Ascendant) versus how you are at home (IC). How different are these two sides of you?',
                placeholder: 'When I first meet people, I seem... but at home, I\'m more...'
              }
            ],
            quiz: [
              {
                id: 'q1-midheaven',
                question: 'The Midheaven (10th house cusp) represents:',
                options: ['Your emotional needs', 'Your career and public image', 'Your relationships', 'Your subconscious'],
                correctIndex: 1,
                explanation: 'The Midheaven or MC is the most visible point in your chart, representing career, public image, and your legacy.'
              },
              {
                id: 'q2-angular-houses',
                question: 'Which houses are considered angular?',
                options: ['2nd, 5th, 8th, 11th', '3rd, 6th, 9th, 12th', '1st, 4th, 7th, 10th', '1st, 2nd, 3rd, 4th'],
                correctIndex: 2,
                explanation: 'The angular houses are 1st, 4th, 7th, and 10th - the four cardinal points of the chart where planets have the strongest expression.'
              }
            ]
          },
          {
            id: 'succedent-houses',
            title: 'The Succedent Houses',
            description: 'The resource houses: 2nd, 5th, 8th, and 11th.',
            estimatedMinutes: 2,
            content: [
              { type: 'heading', content: 'The Houses of Resources', level: 2 },
              {
                type: 'text',
                content: 'Following each angular house is a succedent house. These "fixed" houses deal with security, resources, and what we accumulate. They stabilize what the angular houses initiate.'
              },
              {
                type: 'concept',
                title: '2nd House: Personal Resources',
                content: 'Following the 1st house of self, the 2nd house governs what you have: money, possessions, values, and self-worth. It\'s how you sustain yourself.',
                icon: '💰'
              },
              {
                type: 'concept',
                title: '5th House: Creative Resources',
                content: 'Following the 4th house of home, the 5th governs what brings you joy: creativity, romance, children, hobbies, and self-expression. It\'s your inner child.',
                icon: '🎨'
              },
              {
                type: 'concept',
                title: '8th House: Shared Resources',
                content: 'Following the 7th house of partnership, the 8th governs what you share: joint finances, intimacy, transformation, inheritance, and psychological depth.',
                icon: '🔮'
              },
              {
                type: 'concept',
                title: '11th House: Collective Resources',
                content: 'Following the 10th house of career, the 11th governs your place in the collective: friendships, groups, hopes, dreams, and humanitarian causes.',
                icon: '🌐'
              },
              {
                type: 'callout',
                content: 'Succedent houses are associated with fixed signs (Taurus, Leo, Scorpio, Aquarius) and share their stabilizing, accumulating quality.',
                variant: 'info'
              }
            ],
            quiz: [
              {
                id: 'q1-succedent',
                question: 'What theme connects all succedent houses?',
                options: ['Action and initiation', 'Resources and stability', 'Learning and communication', 'Endings and transitions'],
                correctIndex: 1,
                explanation: 'Succedent houses (2nd, 5th, 8th, 11th) all deal with resources, security, and what we accumulate in different areas of life.'
              }
            ]
          },
          {
            id: 'cadent-houses',
            title: 'The Cadent Houses',
            description: 'The learning houses: 3rd, 6th, 9th, and 12th.',
            estimatedMinutes: 2,
            content: [
              { type: 'heading', content: 'The Houses of Learning & Transition', level: 2 },
              {
                type: 'text',
                content: 'The cadent houses prepare us for the next cycle. These "mutable" houses deal with learning, adaptation, service, and preparing for change. They process and integrate experience.'
              },
              {
                type: 'concept',
                title: '3rd House: Immediate Learning',
                content: 'The 3rd house governs communication, siblings, short trips, and early education. It\'s how we gather information from our immediate environment.',
                icon: '💬'
              },
              {
                type: 'concept',
                title: '6th House: Service & Health',
                content: 'The 6th house governs daily work, health routines, and service to others. It\'s how we refine ourselves and contribute through practical means.',
                icon: '⚕️'
              },
              {
                type: 'concept',
                title: '9th House: Higher Learning',
                content: 'The 9th house governs philosophy, higher education, long journeys, and meaning-making. It\'s how we expand beyond our immediate world.',
                icon: '🎓'
              },
              {
                type: 'concept',
                title: '12th House: Spiritual Learning',
                content: 'The 12th house governs the unconscious, spirituality, isolation, and endings. It\'s where we dissolve ego to prepare for rebirth in the 1st house.',
                icon: '🌌'
              },
              {
                type: 'callout',
                content: 'Cadent houses are associated with mutable signs (Gemini, Virgo, Sagittarius, Pisces) and share their adaptable, transitional quality.',
                variant: 'info'
              }
            ],
            quiz: [
              {
                id: 'q1-cadent',
                question: 'What connects the cadent houses (3rd, 6th, 9th, 12th)?',
                options: ['Starting new things', 'Building resources', 'Learning and transition', 'Relationship themes'],
                correctIndex: 2,
                explanation: 'Cadent houses deal with learning, adaptation, and preparing for the next phase. They process experience and facilitate growth.'
              }
            ]
          },
          {
            id: 'house-rulers',
            title: 'House Rulers & Rulerships',
            description: 'Understanding who rules each house in your chart.',
            estimatedMinutes: 2,
            content: [
              { type: 'heading', content: 'Finding the House Ruler', level: 2 },
              {
                type: 'chat',
                messages: [
                  { role: 'student', content: "What's a house ruler?" },
                  { role: 'guide', content: "Each house cusp falls in a sign, and each sign has a ruling planet. That planet becomes the ruler of that house. For example, if Leo is on your 10th house cusp, the Sun rules your 10th house." },
                  { role: 'student', content: "Why does that matter?" },
                  { role: 'guide', content: "The house ruler connects different life areas. If the Sun rules your 10th house and sits in your 7th house, your career (10th) and partnerships (7th) are linked. You might achieve through partnerships or have a partner-focused career." }
                ]
              },
              {
                type: 'text',
                content: 'House rulers create a web of connections in your chart, showing how different life areas influence each other. The condition and placement of a house ruler tells you a lot about that house\'s themes.'
              },
              {
                type: 'list',
                style: 'bullet',
                items: [
                  'The sign on the house cusp colors how that life area operates',
                  'The ruling planet carries that house\'s energy wherever it sits',
                  'Aspects to the ruler affect the house\'s expression',
                  'The ruler\'s house placement shows where those themes play out'
                ]
              },
              {
                type: 'callout',
                content: 'Example: Cancer on the 2nd house cusp? The Moon rules your 2nd house. Your finances fluctuate with your moods, and security is emotionally important.',
                variant: 'tip'
              }
            ],
            quiz: [
              {
                id: 'q1-house-ruler',
                question: 'If Scorpio is on your 7th house cusp, what planet rules your 7th house?',
                options: ['Venus', 'Mars', 'Pluto (modern) or Mars (traditional)', 'Saturn'],
                correctIndex: 2,
                explanation: 'Scorpio is ruled by Pluto (modern) or Mars (traditional), so either would be considered your 7th house ruler.'
              }
            ]
          }
        ]
      },
      {
        id: 'big-three',
        title: 'Your Big Three',
        description: 'Deep dive into Sun, Moon, and Rising signs.',
        lessons: [
          {
            id: 'big-three-overview',
            title: 'Sun, Moon & Rising',
            description: 'The three pillars of your astrological identity.',
            estimatedMinutes: 3,
            content: [
              { type: 'heading', content: 'The Three Pillars', level: 2 },
              {
                type: 'text',
                content: 'Your "Big Three" - Sun, Moon, and Rising - form the foundation of who you are. Understanding these three placements gives you a surprisingly complete picture of your personality.'
              },
              {
                type: 'chat',
                messages: [
                  { role: 'student', content: "Why do people always ask about Sun, Moon, and Rising?" },
                  { role: 'guide', content: "These three placements are like your personality's triple crown! Together they explain about 70% of your astrological makeup." },
                  { role: 'student', content: "But I only know my Sun sign..." },
                  { role: 'guide', content: "That's like knowing just the main character of a story! Your Moon is your emotional subplot, and your Rising is how the story opens. All three together tell YOUR story." }
                ]
              },
              {
                type: 'yourChart',
                highlight: 'all',
                description: 'Your Big Three form the core of your astrological identity.'
              },
              {
                type: 'comparison',
                title: 'The Big Three at a Glance',
                items: [
                  { label: 'Who', left: 'Sun: Who you ARE', right: 'Core identity, ego' },
                  { label: 'Feel', left: 'Moon: What you NEED', right: 'Emotions, comfort' },
                  { label: 'Show', left: 'Rising: How you APPEAR', right: 'First impressions' }
                ]
              },
              {
                type: 'planetCard',
                planet: 'sun'
              },
              {
                type: 'concept',
                title: 'The Sun: Your Core Self',
                content: 'Your Sun sign represents your conscious identity, ego, and life purpose. It\'s who you\'re becoming and what makes you feel vital. This is your "character" in the story of your life.',
                icon: '☀️'
              },
              {
                type: 'yourChart',
                highlight: 'sun',
                description: 'Your Sun placement - the heart of your chart.'
              },
              {
                type: 'personalized',
                dataKey: 'sunSign',
                template: 'With your Sun in {value}, your core identity is expressed through {value} qualities.'
              },
              {
                type: 'planetCard',
                planet: 'moon'
              },
              {
                type: 'concept',
                title: 'The Moon: Your Inner Self',
                content: 'Your Moon sign reveals your emotional nature, instincts, and what you need to feel safe. It\'s the "private you" that comes out with those you trust. Your Moon shows how you recharge.',
                icon: '🌙'
              },
              {
                type: 'animation',
                variant: 'moon-phases'
              },
              {
                type: 'yourChart',
                highlight: 'moon',
                description: 'Your Moon placement - your emotional compass.'
              },
              {
                type: 'personalized',
                dataKey: 'moonSign',
                template: 'Your Moon in {value} means you process emotions and find comfort in {value} ways.'
              },
              {
                type: 'concept',
                title: 'The Rising: Your Outer Self',
                content: 'Your Rising sign (Ascendant) is the mask you wear and how you approach the world. It\'s your automatic response to new situations and the first impression you give others.',
                icon: '🌅'
              },
              {
                type: 'yourChart',
                highlight: 'rising',
                description: 'Your Rising sign - your window to the world.'
              },
              {
                type: 'personalized',
                dataKey: 'risingSign',
                template: 'With {value} Rising, you approach life and present yourself with {value} energy.'
              },
              {
                type: 'funFact',
                content: 'Your Rising sign changes every 2 hours! That\'s why birth time matters so much. Two people born on the same day but at different times could have completely different Rising signs.'
              },
              {
                type: 'interactive',
                question: 'If someone seems shy at first but becomes the life of the party once comfortable, which placements might explain this?',
                options: [
                  { label: 'Fire Sun, Fire Rising', response: 'Fire energy in both places would likely make someone outgoing right away, not shy at first.', isCorrect: false },
                  { label: 'Fire Sun, Earth or Water Rising', response: 'Exactly! A reserved Rising (Earth/Water) creates a quieter first impression, while the bold Fire Sun emerges once they feel comfortable.', isCorrect: true },
                  { label: 'Earth Sun, Earth Rising', response: 'Double Earth would make someone consistently reserved rather than transforming into the life of the party.', isCorrect: false }
                ]
              },
              {
                type: 'callout',
                content: 'Think of it this way: Sun = who you are, Moon = what you need, Rising = how you appear.',
                variant: 'tip'
              },
              {
                type: 'reflection',
                prompt: 'How do your Sun, Moon, and Rising work together? Do they complement each other, or do you sometimes feel internal tension between different parts of yourself?',
                placeholder: 'My Sun makes me want to... but my Moon needs... and my Rising makes me come across as...'
              }
            ],
            quiz: [
              {
                id: 'q1-big-three',
                question: 'What are the "Big Three" in astrology?',
                options: ['Mercury, Venus, Mars', 'Sun, Moon, Rising', 'Jupiter, Saturn, Uranus', 'Fire, Earth, Air'],
                correctIndex: 1,
                explanation: 'The Big Three are Sun, Moon, and Rising (Ascendant) - the three foundational placements that define your core personality.'
              },
              {
                id: 'q2-rising-represents',
                question: 'Your Rising sign represents:',
                options: ['Your emotions', 'Your life purpose', 'How you appear to others', 'Your communication style'],
                correctIndex: 2,
                explanation: 'The Rising sign (Ascendant) is how you present yourself to the world - your outer persona and first impressions.'
              }
            ]
          },
          {
            id: 'your-chart-synthesis',
            title: 'Reading Your Own Chart',
            description: 'Putting it all together with your personal placements.',
            estimatedMinutes: 4,
            content: [
              { type: 'heading', content: 'Your Personal Blueprint', level: 2 },
              {
                type: 'text',
                content: 'Now that you understand the building blocks, let\'s look at how they combine in YOUR chart specifically.'
              },
              {
                type: 'heading', content: 'Your Core Identity', level: 3
              },
              {
                type: 'personalized',
                dataKey: 'sunSign',
                template: 'As a {value} Sun, your fundamental nature is {value}-like. You express yourself most authentically when embodying {value} qualities.'
              },
              {
                type: 'personalized',
                dataKey: 'sunHouse',
                template: 'With your Sun in the {value} house, your identity shines brightest in matters related to this life area.'
              },
              {
                type: 'heading', content: 'Your Emotional Needs', level: 3
              },
              {
                type: 'personalized',
                dataKey: 'moonSign',
                template: 'Your {value} Moon needs {value} conditions to feel emotionally safe. You recharge through {value} activities.'
              },
              {
                type: 'personalized',
                dataKey: 'moonHouse',
                template: 'With the Moon in your {value} house, your emotional life is particularly tied to this area.'
              },
              {
                type: 'heading', content: 'Your Approach to Life', level: 3
              },
              {
                type: 'personalized',
                dataKey: 'risingSign',
                template: 'With {value} Rising, you move through the world with {value} energy. Others see you as having {value} qualities.'
              },
              {
                type: 'callout',
                content: 'These interpretations are just the beginning. As you learn more about aspects and transits, your chart reveals even deeper insights.',
                variant: 'info'
              }
            ],
            quiz: [
              {
                id: 'q1-chart-synthesis',
                question: 'Which statement best describes how the Big Three work together?',
                options: [
                  'Only your Sun sign matters',
                  'They represent different layers of your personality that work together',
                  'They are always in conflict',
                  'The Rising sign overrides the others'
                ],
                correctIndex: 1,
                explanation: 'The Big Three represent different layers - core self (Sun), emotional self (Moon), and outer self (Rising) - that blend to create your unique personality.'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'advanced',
    title: 'Advanced Astrology',
    description: 'Master aspects, chart patterns, and transits to unlock deeper insights from any birth chart.',
    difficulty: 'advanced',
    estimatedMinutes: 30,
    icon: '🔮',
    modules: [
      {
        id: 'aspects',
        title: 'Planetary Aspects',
        description: 'Understand how planets interact through geometric relationships.',
        lessons: [
          {
            id: 'what-are-aspects',
            title: 'Introduction to Aspects',
            description: 'How planets communicate through angles.',
            estimatedMinutes: 2,
            content: [
              { type: 'heading', content: 'The Conversation Between Planets', level: 2 },
              {
                type: 'chat',
                messages: [
                  { role: 'student', content: "I understand signs and houses, but what are aspects?" },
                  { role: 'guide', content: "Think of planets as people at a party. Aspects describe HOW they're interacting - are they standing close together whispering secrets? Across the room staring each other down? Or comfortably chatting from different corners?" },
                  { role: 'student', content: "So it's about the relationship between planets?" },
                  { role: 'guide', content: "Exactly! And the angle between them determines if they're allies, rivals, or something in between. This is where charts get really interesting!" }
                ]
              },
              {
                type: 'text',
                content: 'Aspects are the geometric angles formed between planets in your chart. They show how different parts of your personality interact - whether they work together harmoniously or create tension that drives growth.'
              },
              {
                type: 'aspectDiagram',
                pattern: 'conjunction'
              },
              {
                type: 'concept',
                title: 'What Makes an Aspect?',
                content: 'When two planets are a specific number of degrees apart, they form an aspect. The main aspects are based on dividing the 360° circle: conjunction (0°), opposition (180°), trine (120°), square (90°), and sextile (60°).',
                icon: '📐'
              },
              {
                type: 'comparison',
                title: 'The Major Aspects',
                items: [
                  { label: '0°', left: 'Conjunction', right: 'Fusion - planets merge' },
                  { label: '60°', left: 'Sextile', right: 'Opportunity - potential support' },
                  { label: '90°', left: 'Square', right: 'Tension - growth through friction' },
                  { label: '120°', left: 'Trine', right: 'Harmony - natural flow' },
                  { label: '180°', left: 'Opposition', right: 'Polarity - awareness & balance' }
                ]
              },
              {
                type: 'text',
                content: 'Aspects are perhaps the most important factor in chart interpretation. A planet\'s sign and house tell you what and where, but aspects reveal the dynamic tensions and harmonies that shape how that energy actually manifests.'
              },
              {
                type: 'funFact',
                content: 'Ancient astrologers called trines and sextiles "soft" aspects (easy, flowing) and squares and oppositions "hard" aspects (challenging, dynamic). Modern astrologers recognize that both types are valuable - easy aspects give talents, while hard aspects give drive!'
              },
              {
                type: 'callout',
                content: 'Orbs allow some flexibility - planets don\'t need to be at exact angles. Most astrologers use 8-10° orbs for major aspects involving the Sun and Moon, and tighter orbs (4-6°) for other planets.',
                variant: 'info'
              },
              {
                type: 'reflection',
                prompt: 'Think about different relationships in your life. Some are easy and harmonious, others create friction but push you to grow. Aspects in your chart work the same way!',
                placeholder: 'The relationships that have pushed me to grow most are...'
              }
            ],
            quiz: [
              {
                id: 'q1-aspect-definition',
                question: 'What is an aspect in astrology?',
                options: ['A planet\'s zodiac sign', 'A geometric angle between planets', 'A house position', 'A lunar phase'],
                correctIndex: 1,
                explanation: 'Aspects are geometric angles formed between planets that show how they interact with each other.'
              },
              {
                id: 'q2-aspect-importance',
                question: 'Why are aspects important?',
                options: ['They determine your Sun sign', 'They show the dynamic interactions between different parts of your personality', 'They only matter for daily horoscopes', 'They predict the future'],
                correctIndex: 1,
                explanation: 'Aspects reveal how different planetary energies in your chart work together or create productive tension.'
              }
            ]
          },
          {
            id: 'major-aspects',
            title: 'The Major Aspects',
            description: 'Conjunction, opposition, trine, square, and sextile.',
            estimatedMinutes: 4,
            content: [
              { type: 'heading', content: 'The Five Major Aspects', level: 2 },
              {
                type: 'text',
                content: 'These five aspects form the foundation of chart interpretation. Each creates a different type of relationship between planets.'
              },
              {
                type: 'aspectDiagram',
                pattern: 'conjunction'
              },
              {
                type: 'concept',
                title: 'Conjunction (0°)',
                content: 'Planets merge their energies - they\'re so close they become a unified force. This intensifies both planets, creating a powerful focal point. The nature depends on the planets involved.',
                icon: '⚫'
              },
              {
                type: 'chat',
                messages: [
                  { role: 'guide', content: "A conjunction is like two people standing so close they're practically one. Venus conjunct Mars? Your love nature and drive are fused - passionate and direct in romance!" }
                ]
              },
              {
                type: 'aspectDiagram',
                pattern: 'opposition'
              },
              {
                type: 'concept',
                title: 'Opposition (180°)',
                content: 'Planets face off across the chart, creating awareness of polarities. This aspect requires integration - learning to balance two seemingly opposite needs. It often plays out through relationships.',
                icon: '↔️'
              },
              {
                type: 'chat',
                messages: [
                  { role: 'guide', content: "Oppositions are like two people on opposite ends of a seesaw. Sun opposite Moon? Your identity and emotional needs are in a constant balancing act." }
                ]
              },
              {
                type: 'aspectDiagram',
                pattern: 'trine'
              },
              {
                type: 'concept',
                title: 'Trine (120°)',
                content: 'The most harmonious aspect - planets in the same element flow together naturally. Trines represent talents and ease, but can lead to complacency if not consciously developed.',
                icon: '△'
              },
              {
                type: 'chat',
                messages: [
                  { role: 'guide', content: "Trines are like best friends who just 'get' each other. Mercury trine Jupiter? Ideas flow easily, learning feels natural, and communication is expansive." }
                ]
              },
              {
                type: 'aspectDiagram',
                pattern: 'square'
              },
              {
                type: 'concept',
                title: 'Square (90°)',
                content: 'Tension that demands action. Squares create friction between planets, forcing growth through challenges. They\'re often the source of your greatest accomplishments.',
                icon: '◻️'
              },
              {
                type: 'chat',
                messages: [
                  { role: 'guide', content: "Squares are like colleagues who push each other's buttons - frustrating, but you end up producing your best work. Mars square Saturn? Discipline clashes with drive, but builds incredible determination." }
                ]
              },
              {
                type: 'aspectDiagram',
                pattern: 'sextile'
              },
              {
                type: 'concept',
                title: 'Sextile (60°)',
                content: 'Opportunity aspects - planets support each other but require effort to activate. Sextiles offer potential that you must consciously choose to develop.',
                icon: '✶'
              },
              {
                type: 'interactive',
                question: 'Someone with a Grand Trine (three planets all trine each other) might need to watch out for:',
                options: [
                  { label: 'Too much conflict', response: 'Actually, trines create ease, not conflict. The challenge is different.', isCorrect: false },
                  { label: 'Complacency and taking talents for granted', response: 'Exactly! Grand Trines give tremendous natural ability but can lead to coasting. Without some squares to provide drive, talents may go undeveloped.', isCorrect: true },
                  { label: 'Difficulty communicating', response: 'Trines actually support easy flow - communication wouldn\'t be the issue here.', isCorrect: false }
                ]
              },
              {
                type: 'callout',
                content: 'Squares are often feared but they\'re incredibly valuable - they provide the motivation and drive that trines lack. The most successful people often have prominent squares in their charts.',
                variant: 'tip'
              },
              {
                type: 'funFact',
                content: 'Michael Jordan has Sun square Mars - that competitive fire and relentless drive to improve came from friction, not ease! His "failure" story (cut from high school team) activated his squares to push him to greatness.'
              },
              {
                type: 'reflection',
                prompt: 'Think about your own successes. Did they come easily (trine energy) or through overcoming challenges (square energy)? Which type of accomplishment feels more meaningful to you?',
                placeholder: 'My most meaningful achievements came from...'
              }
            ],
            quiz: [
              {
                id: 'q1-trine-nature',
                question: 'What is the nature of a trine aspect?',
                options: ['Challenging and tense', 'Harmonious and flowing', 'Neutral', 'Always negative'],
                correctIndex: 1,
                explanation: 'Trines (120°) are harmonious aspects where planets in the same element support each other naturally.'
              },
              {
                id: 'q2-square-benefit',
                question: 'What benefit do square aspects provide?',
                options: ['Easy success', 'Motivation and drive through tension', 'They have no benefits', 'Luck and fortune'],
                correctIndex: 1,
                explanation: 'Squares create tension that motivates action and growth - they\'re often behind our greatest achievements.'
              }
            ]
          },
          {
            id: 'aspect-interpretation',
            title: 'Interpreting Aspects',
            description: 'How to read aspects between specific planets.',
            estimatedMinutes: 3,
            content: [
              { type: 'heading', content: 'Reading Planetary Combinations', level: 2 },
              {
                type: 'text',
                content: 'Interpreting aspects requires blending the meanings of both planets with the nature of the aspect. Here\'s how to approach it.'
              },
              {
                type: 'concept',
                title: 'Sun-Moon Aspects',
                content: 'These aspects show how your conscious identity (Sun) relates to your emotional needs (Moon). Harmonious aspects suggest inner alignment; challenging aspects may indicate a struggle between what you want and what you need.',
                icon: '☀️🌙'
              },
              {
                type: 'concept',
                title: 'Venus-Mars Aspects',
                content: 'The dance between what you desire (Venus) and how you pursue it (Mars). These aspects heavily influence romantic expression and creative drive.',
                icon: '♀️♂️'
              },
              {
                type: 'concept',
                title: 'Mercury Aspects',
                content: 'How Mercury connects to other planets shapes your thinking style. Mercury-Jupiter expands ideas; Mercury-Saturn adds depth and caution; Mercury-Uranus brings innovative insights.',
                icon: '☿️'
              },
              {
                type: 'concept',
                title: 'Saturn Aspects',
                content: 'Saturn aspects to personal planets often indicate areas of life that require extra work but yield lasting mastery. They show where you face your greatest challenges and build your deepest strength.',
                icon: '♄'
              },
              {
                type: 'callout',
                content: 'When interpreting, ask: What does each planet represent? What type of conversation are they having (aspect)? In what life areas does this play out (houses)?',
                variant: 'tip'
              },
              {
                type: 'callout',
                content: 'Understanding your chart\'s aspects reveals the internal dialogues shaping your personality and life experiences.',
                variant: 'info'
              }
            ],
            quiz: [
              {
                id: 'q1-sun-moon-aspect',
                question: 'A challenging Sun-Moon aspect might indicate:',
                options: ['Good luck in finances', 'Tension between identity and emotional needs', 'Strong physical health', 'Musical talent'],
                correctIndex: 1,
                explanation: 'Sun-Moon aspects show the relationship between your conscious self (Sun) and emotional nature (Moon). Challenging aspects suggest these may be at odds.'
              }
            ]
          }
        ]
      },
      {
        id: 'chart-patterns',
        title: 'Chart Patterns',
        description: 'Recognize significant configurations in birth charts.',
        lessons: [
          {
            id: 'stelliums',
            title: 'Stelliums',
            description: 'When multiple planets cluster together.',
            estimatedMinutes: 2,
            content: [
              { type: 'heading', content: 'Concentrated Energy', level: 2 },
              {
                type: 'text',
                content: 'A stellium is a cluster of three or more planets in the same sign or house. This concentrates tremendous energy in one area of life or mode of expression.'
              },
              {
                type: 'concept',
                title: 'Sign Stelliums',
                content: 'Three or more planets in one zodiac sign create an overwhelming emphasis on that sign\'s qualities. The person strongly embodies that sign\'s energy, regardless of their Sun sign.',
                icon: '✨'
              },
              {
                type: 'concept',
                title: 'House Stelliums',
                content: 'Multiple planets in one house make that life area extremely significant. Much of the person\'s energy and life events will center around that house\'s themes.',
                icon: '🏠'
              },
              {
                type: 'text',
                content: 'Stelliums can be both a gift and a challenge. The concentrated energy provides focus and intensity, but the person may struggle with balance, neglecting other areas of life.'
              },
              {
                type: 'callout',
                content: 'If you have a stellium, the aspects those planets make to other parts of your chart become especially important - they\'re the bridges connecting this concentrated energy to rest of your life.',
                variant: 'tip'
              }
            ],
            quiz: [
              {
                id: 'q1-stellium-def',
                question: 'What defines a stellium?',
                options: ['Any two planets together', 'Three or more planets in the same sign or house', 'Planets in opposite signs', 'The Sun and Moon together'],
                correctIndex: 1,
                explanation: 'A stellium is typically defined as three or more planets concentrated in the same sign or house.'
              }
            ]
          },
          {
            id: 't-square',
            title: 'T-Squares & Grand Crosses',
            description: 'Tension patterns that drive achievement.',
            estimatedMinutes: 3,
            content: [
              { type: 'heading', content: 'Dynamic Tension Patterns', level: 2 },
              {
                type: 'text',
                content: 'These configurations involve multiple squares and oppositions, creating built-in tension that demands resolution through action.'
              },
              {
                type: 'concept',
                title: 'The T-Square',
                content: 'Two planets in opposition, both square to a third planet (the apex). The apex planet becomes a focal point for resolving the opposition\'s tension. This creates drive but also stress that seeks release.',
                icon: '⊥'
              },
              {
                type: 'concept',
                title: 'The Grand Cross',
                content: 'Four planets forming two oppositions and four squares - maximum tension. People with grand crosses often feel pulled in multiple directions but develop remarkable ability to handle pressure.',
                icon: '✚'
              },
              {
                type: 'text',
                content: 'These patterns are found in the charts of many high achievers. The constant tension creates motivation that never rests - there\'s always another challenge, another goal, another mountain to climb.'
              },
              {
                type: 'callout',
                content: 'The modality of the signs involved colors the T-Square: Cardinal T-Squares drive action, Fixed T-Squares create determination, Mutable T-Squares produce adaptability.',
                variant: 'info'
              }
            ],
            quiz: [
              {
                id: 'q1-tsquare',
                question: 'What makes up a T-Square?',
                options: ['Three trines', 'An opposition with both planets square to a third', 'Three conjunctions', 'A grand trine with an opposition'],
                correctIndex: 1,
                explanation: 'A T-Square forms when two planets in opposition are both square to a third planet, which becomes the focal point.'
              }
            ]
          },
          {
            id: 'grand-trines',
            title: 'Grand Trines & Kites',
            description: 'Harmonious patterns and how to activate them.',
            estimatedMinutes: 2,
            content: [
              { type: 'heading', content: 'Flowing Energy Patterns', level: 2 },
              {
                type: 'text',
                content: 'Grand trines represent natural talent and ease, but they need conscious activation to reach their potential.'
              },
              {
                type: 'concept',
                title: 'The Grand Trine',
                content: 'Three planets, each 120° apart, forming an equilateral triangle. Energy flows easily between all three, creating natural gifts in the element involved (Fire, Earth, Air, or Water).',
                icon: '△'
              },
              {
                type: 'text',
                content: 'The challenge with grand trines is complacency. Because things come easily, there\'s less motivation to push harder. The talent exists but may remain undeveloped without conscious effort.'
              },
              {
                type: 'concept',
                title: 'The Kite',
                content: 'A grand trine with a fourth planet opposite one of the trine planets. This adds tension and direction, giving the grand trine a focal point and motivation to actually use its gifts.',
                icon: '🪁'
              },
              {
                type: 'callout',
                content: 'If you have a grand trine, look for any planets making challenging aspects to it - these provide the motivation to activate your natural talents.',
                variant: 'tip'
              }
            ],
            quiz: [
              {
                id: 'q1-grand-trine-challenge',
                question: 'What is the main challenge of a grand trine?',
                options: ['Too much stress', 'Potential for complacency', 'Health problems', 'Relationship difficulties'],
                correctIndex: 1,
                explanation: 'Because grand trines represent natural ease, they can lead to complacency - the talents exist but may not be fully developed.'
              }
            ]
          }
        ]
      },
      {
        id: 'transits',
        title: 'Transits & Timing',
        description: 'How current planetary movements affect your chart.',
        lessons: [
          {
            id: 'transit-basics',
            title: 'Understanding Transits',
            description: 'How planetary movements trigger your birth chart.',
            estimatedMinutes: 3,
            content: [
              { type: 'heading', content: 'The Moving Sky', level: 2 },
              {
                type: 'text',
                content: 'Your birth chart is a snapshot frozen in time, but the planets keep moving. Transits occur when current planetary positions form aspects to your natal planets, activating different parts of your chart.'
              },
              {
                type: 'concept',
                title: 'How Transits Work',
                content: 'When a transiting planet crosses the same degree as a natal planet, it "activates" that natal planet\'s themes. The transiting planet\'s nature combines with the natal planet\'s meaning.',
                icon: '🌐'
              },
              {
                type: 'concept',
                title: 'Transit Speed',
                content: 'The Moon transits your whole chart in a month (quick shifts in mood). Saturn takes 29 years (major life lessons). Outer planet transits are rare but profound, marking significant life chapters.',
                icon: '⏱️'
              },
              {
                type: 'text',
                content: 'Transits don\'t make things happen to you - they describe the quality of time and the opportunities or challenges present. You still have free will in how you respond.'
              },
              {
                type: 'callout',
                content: 'Pay attention to transits hitting your natal Sun, Moon, and Rising first - these are the most personally felt.',
                variant: 'tip'
              }
            ],
            quiz: [
              {
                id: 'q1-transit-def',
                question: 'What is a transit in astrology?',
                options: ['A planet changing signs', 'Current planetary positions activating natal planets', 'A lunar eclipse', 'Mercury retrograde'],
                correctIndex: 1,
                explanation: 'Transits occur when current planetary positions form aspects to the planets in your birth chart, activating different themes.'
              }
            ]
          },
          {
            id: 'saturn-return',
            title: 'The Saturn Return',
            description: 'The most important transit of early adulthood.',
            estimatedMinutes: 2,
            content: [
              { type: 'heading', content: 'Coming of Age', level: 2 },
              {
                type: 'text',
                content: 'Around ages 28-30, Saturn returns to its position at your birth. This transit marks the true beginning of adulthood and often brings major life restructuring.'
              },
              {
                type: 'concept',
                title: 'What Happens',
                content: 'The Saturn Return asks: Is your life built on solid foundations? Structures that aren\'t working (jobs, relationships, beliefs) often crumble so something more authentic can be built.',
                icon: '🏗️'
              },
              {
                type: 'text',
                content: 'This period can feel challenging as old identities fall away. But it\'s ultimately about stepping into adult maturity and taking full responsibility for your life direction.'
              },
              {
                type: 'concept',
                title: 'The Second Return',
                content: 'Around age 58-60, Saturn returns again. This second return is about legacy - what have you built? What wisdom do you want to pass on? It\'s often a time of earned authority.',
                icon: '👴'
              },
              {
                type: 'callout',
                content: 'The house Saturn occupies natally shows the life area most affected by your Saturn Returns.',
                variant: 'info'
              },
              {
                type: 'personalized',
                dataKey: 'saturnSign',
                template: 'With Saturn in {value}, your Saturn Return themes involve mastering {value} qualities and responsibilities.'
              }
            ],
            quiz: [
              {
                id: 'q1-saturn-return-age',
                question: 'When does the first Saturn Return occur?',
                options: ['Age 18-20', 'Age 28-30', 'Age 40-42', 'Age 50-52'],
                correctIndex: 1,
                explanation: 'The first Saturn Return occurs around ages 28-30, when Saturn completes its first full orbit and returns to its natal position.'
              }
            ]
          },
          {
            id: 'major-transits',
            title: 'Major Life Transits',
            description: 'Pluto, Neptune, and Uranus transits to natal planets.',
            estimatedMinutes: 3,
            content: [
              { type: 'heading', content: 'Transformational Transits', level: 2 },
              {
                type: 'text',
                content: 'When outer planets transit your natal planets, they mark significant life chapters that unfold over years, not weeks.'
              },
              {
                type: 'concept',
                title: 'Pluto Transits',
                content: 'Pluto transits bring death and rebirth themes. Whatever natal planet Pluto touches will be transformed - old patterns must die so new ones can emerge. These are profound but often difficult passages.',
                icon: '♇'
              },
              {
                type: 'concept',
                title: 'Neptune Transits',
                content: 'Neptune dissolves and spiritualizes. Transits can bring confusion but also inspiration, creativity, and connection to something greater. Boundaries become fuzzy; idealism increases.',
                icon: '♆'
              },
              {
                type: 'concept',
                title: 'Uranus Transits',
                content: 'Uranus brings sudden change and awakening. These transits break you free from stagnation, sometimes dramatically. Expect the unexpected and embrace liberation.',
                icon: '♅'
              },
              {
                type: 'callout',
                content: 'Outer planet transits work best when you cooperate with their themes rather than resist. Pluto asks you to release; Neptune to transcend; Uranus to liberate.',
                variant: 'tip'
              }
            ],
            quiz: [
              {
                id: 'q1-pluto-transit',
                question: 'What is the theme of Pluto transits?',
                options: ['Quick changes', 'Transformation and rebirth', 'Good luck', 'Social expansion'],
                correctIndex: 1,
                explanation: 'Pluto transits bring profound transformation - the death of old patterns and rebirth of new ones.'
              }
            ]
          }
        ]
      },
      {
        id: 'synthesis',
        title: 'Chart Synthesis',
        description: 'Putting it all together for complete chart interpretation.',
        lessons: [
          {
            id: 'interpretation-method',
            title: 'A Method for Interpretation',
            description: 'Step-by-step approach to reading any chart.',
            estimatedMinutes: 4,
            content: [
              { type: 'heading', content: 'Reading a Chart', level: 2 },
              {
                type: 'text',
                content: 'With so many factors in a chart, you need a systematic approach. Here\'s a method that builds from foundation to detail.'
              },
              {
                type: 'list',
                style: 'numbered',
                items: [
                  'Start with the Big Three: Sun, Moon, Rising - this gives you the core personality',
                  'Check the chart shape: Where are the planets clustered? Empty areas? This shows life focus.',
                  'Identify the dominant element and modality: Count planetary placements to find emphasis.',
                  'Examine the ruling planet: The planet that rules the Rising sign is especially important.',
                  'Look at major aspects: Especially any involving the Sun, Moon, or Rising ruler.',
                  'Note any stelliums or chart patterns: T-squares, grand trines, etc.',
                  'Finally, examine specific houses for detailed life areas: Career (10th), relationships (7th), etc.'
                ]
              },
              {
                type: 'callout',
                content: 'Don\'t try to interpret everything at once. Build a picture gradually, letting themes emerge through repetition.',
                variant: 'tip'
              }
            ],
            quiz: [
              {
                id: 'q1-first-step',
                question: 'What should you analyze first when reading a chart?',
                options: ['Minor asteroids', 'The Big Three (Sun, Moon, Rising)', 'House cusps', 'Fixed stars'],
                correctIndex: 1,
                explanation: 'Always start with the Big Three - Sun, Moon, and Rising sign - as they form the foundation of personality.'
              }
            ]
          },
          {
            id: 'themes-repetition',
            title: 'Finding Repeating Themes',
            description: 'How to identify what the chart is really saying.',
            estimatedMinutes: 3,
            content: [
              { type: 'heading', content: 'The Art of Synthesis', level: 2 },
              {
                type: 'text',
                content: 'The key to chart interpretation is finding themes that repeat. When multiple factors point to the same thing, that theme is significant.'
              },
              {
                type: 'concept',
                title: 'Look for Repetition',
                content: 'If someone has Sun in Capricorn, Saturn conjunct the Midheaven, and multiple planets in the 10th house - career and achievement is clearly a major theme, appearing three different ways.',
                icon: '🔄'
              },
              {
                type: 'concept',
                title: 'Weigh the Factors',
                content: 'Not all chart factors are equal. The Sun, Moon, and Rising sign carry more weight than asteroids. Exact aspects are stronger than wide ones. Angular planets (1st, 4th, 7th, 10th houses) are more prominent.',
                icon: '⚖️'
              },
              {
                type: 'text',
                content: 'Contradictions in a chart aren\'t mistakes - they reflect the complexity of human nature. Someone can be both introverted (Scorpio Moon) and attention-seeking (Leo Rising). Both are true.'
              },
              {
                type: 'callout',
                content: 'When you find a strong theme, look for what modifies it. A dominant Saturn energy might be softened by a Venus conjunction or challenged by a Uranus square.',
                variant: 'info'
              },
              {
                type: 'personalized',
                dataKey: 'sunSign',
                template: 'Your own chart contains themes you probably recognize. Practice by identifying what themes repeat in your chart beyond your {value} Sun.'
              }
            ],
            quiz: [
              {
                id: 'q1-theme-finding',
                question: 'How do you identify major themes in a chart?',
                options: ['Only look at the Sun sign', 'Find factors that repeat the same message', 'Ignore contradictions', 'Focus only on aspects'],
                correctIndex: 1,
                explanation: 'Major themes emerge through repetition - when multiple chart factors point to the same theme, it\'s significant.'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'history-context',
    title: 'History & Context',
    description: 'Understand where astrology comes from, its different traditions, and how it has evolved over 5,000 years.',
    difficulty: 'intermediate',
    estimatedMinutes: 10,
    icon: '📜',
    modules: [
      {
        id: 'origins',
        title: 'Origins & Evolution',
        description: 'The ancient roots and development of astrology.',
        lessons: [
          {
            id: 'origins-of-astrology',
            title: 'The Origins of Astrology',
            description: '5,000 years of stargazing and celestial wisdom.',
            estimatedMinutes: 2,
            content: [
              { type: 'heading', content: '5,000 Years of Stargazing', level: 2 },
              {
                type: 'text',
                content: 'Astrology is one of humanity\'s oldest intellectual traditions, dating back at least 5,000 years. Understanding its history helps you appreciate its depth and evolution.'
              },
              {
                type: 'concept',
                title: 'Ancient Origins',
                content: 'Astrology and astronomy were the same discipline until the 17th century. Ancient astrologers were the scientists of their day.',
                icon: '🔭'
              },
              { type: 'heading', content: 'Timeline of Astrology', level: 3 },
              {
                type: 'list',
                style: 'bullet',
                items: [
                  '~3000 BCE - Mesopotamia: First celestial omens recorded; birth of astrology',
                  '~500 BCE - Babylon: Zodiac signs formalized; personal horoscopes begin',
                  '~300 BCE - Greece: Hellenistic astrology develops; aspects and houses introduced',
                  '~200 CE - Rome: Astrology spreads through Roman Empire',
                  '~500-1200 CE - Islamic World: Golden age; Arabs preserve and advance knowledge',
                  '~1200-1600 CE - Europe: Renaissance revival; astrology in universities',
                  '1600s CE - Europe: Astronomy/astrology split; Enlightenment skepticism',
                  '1900s CE - Global: Modern psychological astrology emerges',
                  '2000s CE - Global: Internet age popularization; traditional revival'
                ]
              },
              { type: 'heading', content: 'Mesopotamian Origins', level: 3 },
              {
                type: 'text',
                content: 'Astrology began in ancient Mesopotamia (modern Iraq) around 3000 BCE. Priests observed celestial patterns to predict events affecting the state and king. Key developments included identification of planets as gods, recording of celestial omens, development of mathematical astronomy, and creation of the 12-sign zodiac.'
              },
              { type: 'heading', content: 'Greek Transformation', level: 3 },
              {
                type: 'text',
                content: 'When Mesopotamian astrology met Greek philosophy (around 300 BCE), a transformation occurred. Individual birth charts became possible, the four elements were applied to signs, aspects were developed, and the house system was created. Astrology became more psychological and philosophical.'
              },
              {
                type: 'callout',
                content: 'The system you\'re learning — signs, planets, houses, aspects — is largely the Greek/Hellenistic system, developed over 2,000 years ago and refined ever since.',
                variant: 'info'
              },
              { type: 'heading', content: 'The Medieval Period', level: 3 },
              {
                type: 'text',
                content: 'After Rome fell, Islamic scholars preserved and advanced astrology during Europe\'s Dark Ages. Arab astrologers translated Greek texts into Arabic, developed new techniques, and eventually transmitted knowledge back to Europe. Many astrological terms like "zenith," "nadir," and star names come from Arabic.'
              },
              {
                type: 'callout',
                content: 'When someone says "astrology is just superstition," remember: it was studied in universities alongside medicine and law until the 1600s.',
                variant: 'tip'
              }
            ],
            quiz: [
              {
                id: 'q1-age',
                question: 'Astrology originated approximately:',
                options: ['500 years ago', '1,000 years ago', '3,000-5,000 years ago', '100 years ago'],
                correctIndex: 2,
                explanation: 'Astrology began in Mesopotamia around 3000 BCE, making it roughly 5,000 years old.'
              },
              {
                id: 'q2-houses-aspects',
                question: 'The house system and aspects were primarily developed by:',
                options: ['Mesopotamian priests', 'Greek/Hellenistic astrologers', 'Medieval European monks', '20th century psychologists'],
                correctIndex: 1,
                explanation: 'The Greeks transformed Mesopotamian astrology into the system of signs, houses, and aspects we use today.'
              },
              {
                id: 'q3-preservation',
                question: 'During Europe\'s Dark Ages, astrological knowledge was preserved by:',
                options: ['Roman emperors', 'Islamic scholars', 'Celtic druids', 'Chinese emperors'],
                correctIndex: 1,
                explanation: 'Arab scholars preserved, translated, and advanced astrological knowledge during the Islamic Golden Age.'
              }
            ]
          }
        ]
      },
      {
        id: 'traditions',
        title: 'Different Traditions',
        description: 'Western, Vedic, and other astrological systems.',
        lessons: [
          {
            id: 'western-vs-vedic',
            title: 'Western vs. Vedic Astrology',
            description: 'Two great traditions with different approaches.',
            estimatedMinutes: 2,
            content: [
              { type: 'heading', content: 'Two Great Traditions', level: 2 },
              {
                type: 'text',
                content: 'The two major living astrological traditions are Western (what you\'ve been learning) and Vedic/Jyotish (from India). Both are valid systems with different approaches.'
              },
              {
                type: 'concept',
                title: 'Key Difference',
                content: 'Western and Vedic astrology share ancient roots but diverged over centuries into distinct systems, each with its own strengths.',
                icon: '🌍'
              },
              { type: 'heading', content: 'Key Differences', level: 3 },
              {
                type: 'list',
                style: 'bullet',
                items: [
                  'Zodiac: Western uses Tropical (seasons), Vedic uses Sidereal (fixed stars)',
                  'Your Sun sign: In Vedic, often ~23° earlier (frequently one sign back)',
                  'Orientation: Western is psychological/humanistic, Vedic focuses on karma and prediction',
                  'Dasha system: Central to Vedic predictions, not used in Western',
                  'Nakshatras: 27 lunar mansions used in Vedic, not in Western',
                  'Nodes: Secondary in Western, Rahu/Ketu very important in Vedic'
                ]
              },
              { type: 'heading', content: 'The Zodiac Difference', level: 3 },
              {
                type: 'text',
                content: 'The biggest technical difference is the zodiac. Tropical (Western) defines signs by seasons — 0° Aries equals the spring equinox. Sidereal (Vedic) defines signs by fixed stars. Due to Earth\'s wobble (precession), the sidereal zodiac has drifted ~23° from the tropical.'
              },
              {
                type: 'callout',
                content: 'If you\'re a Taurus Sun in Western astrology, you\'re likely an Aries Sun in Vedic astrology. Both are "correct" within their systems — they\'re measuring different things.',
                variant: 'info'
              },
              { type: 'heading', content: 'Philosophical Differences', level: 3 },
              {
                type: 'text',
                content: 'Western astrology (especially modern) focuses on psychological patterns, self-understanding, free will within tendencies, and character over destiny. Vedic astrology focuses on karma and dharma, timing of events through dashas, prediction and remediation, and fate with possible adjustments through remedies.'
              },
              {
                type: 'callout',
                content: 'If you explore Vedic astrology, don\'t panic when your signs are different. The systems measure different things and both can offer valid insights.',
                variant: 'tip'
              }
            ],
            quiz: [
              {
                id: 'q1-difference',
                question: 'The main technical difference between Western and Vedic astrology is:',
                options: ['Number of planets used', 'Tropical vs. sidereal zodiac', 'Color of the charts', 'Language used'],
                correctIndex: 1,
                explanation: 'Western uses the tropical zodiac (based on seasons) while Vedic uses the sidereal zodiac (based on fixed stars).'
              },
              {
                id: 'q2-vedic-emphasis',
                question: 'Vedic astrology places special emphasis on:',
                options: ['Psychological growth only', 'Karma, dharma, and predictive timing (dashas)', 'Only the Sun sign', 'Rejecting all tradition'],
                correctIndex: 1,
                explanation: 'Vedic astrology emphasizes karma, dharmic purpose, timing through dasha systems, and remedial measures.'
              },
              {
                id: 'q3-validity',
                question: 'When comparing Western and Vedic astrology:',
                options: ['Western is always right', 'Vedic is always right', 'They are different but both valid systems', 'Neither has any validity'],
                correctIndex: 2,
                explanation: 'Both are valid traditions with different approaches and strengths — neither is "correct" over the other.'
              }
            ]
          },
          {
            id: 'house-systems',
            title: 'Why Different House Systems?',
            description: 'Understanding the house system debate.',
            estimatedMinutes: 2,
            content: [
              { type: 'heading', content: 'The House System Debate', level: 2 },
              {
                type: 'text',
                content: 'If you\'ve used different astrology websites, you may have noticed your houses (and even some planet placements) change. That\'s because there are many house systems, and astrologers disagree on which is best.'
              },
              {
                type: 'concept',
                title: 'What Are House Systems?',
                content: 'House systems are different methods of dividing the sky into 12 sections. The "right" one depends on who you ask.',
                icon: '🏠'
              },
              { type: 'heading', content: 'Major House Systems', level: 3 },
              {
                type: 'list',
                style: 'bullet',
                items: [
                  'Whole Sign: Each sign = one house (traditional astrologers, Vedic)',
                  'Placidus: Time-based divisions (most popular in modern Western)',
                  'Koch: Birthplace-based (popular in German tradition)',
                  'Equal: 30° from Ascendant (some modern astrologers)',
                  'Porphyry: Simple quadrant division (some traditional astrologers)'
                ]
              },
              { type: 'heading', content: 'Why So Many?', level: 3 },
              {
                type: 'text',
                content: 'The challenge: The sky is a sphere, but we\'re mapping it onto a flat circle. Different systems solve this problem differently. Additionally, Placidus breaks down at extreme latitudes, Whole Sign was original but fell out of use, each system has theoretical justifications, and astrologers get good results with different systems.'
              },
              { type: 'heading', content: 'Whole Sign vs. Placidus', level: 3 },
              {
                type: 'text',
                content: 'Whole Sign (oldest): Your Rising sign = 1st house, next sign = 2nd house, etc. Every house is exactly one sign. Placidus (most popular): Houses vary in size based on birth latitude. A planet can be in a different sign than its house. Default on most modern software.'
              },
              {
                type: 'callout',
                content: 'If a planet falls near a house cusp, read both house meanings. The energy may blend both areas of life.',
                variant: 'tip'
              },
              {
                type: 'concept',
                title: 'Practical Advice',
                content: 'Pick one system and learn it well. Placidus is fine for beginners. Try Whole Sign if you want to explore traditional astrology. Test both — see which resonates with your experience.',
                icon: '💡'
              }
            ],
            quiz: [
              {
                id: 'q1-popular',
                question: 'The most commonly used house system in modern Western astrology is:',
                options: ['Whole Sign', 'Placidus', 'Koch', 'Campanus'],
                correctIndex: 1,
                explanation: 'Placidus is the default on most modern software and the most widely used today.'
              },
              {
                id: 'q2-whole-sign',
                question: 'In the Whole Sign house system:',
                options: ['Houses vary dramatically in size', 'Each zodiac sign equals exactly one house', 'Only the Sun determines houses', 'There are 13 houses'],
                correctIndex: 1,
                explanation: 'In Whole Sign, your Rising sign is the entire 1st house, the next sign is entirely the 2nd house, and so on.'
              }
            ]
          }
        ]
      },
      {
        id: 'approaches',
        title: 'Modern Approaches',
        description: 'Traditional vs. modern and astrology today.',
        lessons: [
          {
            id: 'traditional-vs-modern',
            title: 'Traditional vs. Modern Astrology',
            description: 'Two approaches to the same art.',
            estimatedMinutes: 2,
            content: [
              { type: 'heading', content: 'Two Approaches to the Same Art', level: 2 },
              {
                type: 'text',
                content: 'Within Western astrology, there\'s a split between "traditional" (pre-1700s techniques revived) and "modern" (20th century psychological) approaches.'
              },
              {
                type: 'concept',
                title: 'Core Difference',
                content: 'Traditional astrology focuses on prediction and concrete outcomes. Modern astrology focuses on psychology and self-development.',
                icon: '⚖️'
              },
              { type: 'heading', content: 'Traditional Astrology', level: 3 },
              {
                type: 'text',
                content: 'Traditional astrology (Hellenistic, Medieval, Renaissance) was more concerned with predicting concrete events, used only the 7 visible planets, had clear "benefic" (Jupiter, Venus) and "malefic" (Saturn, Mars) planets, and used techniques like sect, profections, and Arabic Parts. It was more fatalistic — events were expected to happen.'
              },
              {
                type: 'callout',
                content: 'Since the 1990s, traditional techniques have been recovered from ancient texts and are increasingly popular among modern astrologers.',
                variant: 'info'
              },
              { type: 'heading', content: 'Modern Astrology', level: 3 },
              {
                type: 'text',
                content: 'Modern astrology (20th century onward) was influenced by psychology (especially Jung), incorporated Uranus, Neptune, and Pluto, views all planets as having positive potential, focuses on self-understanding and growth, emphasizes free will over fate, and is less predictive and more therapeutic.'
              },
              { type: 'heading', content: 'Example: Saturn in the 7th House', level: 3 },
              {
                type: 'list',
                style: 'bullet',
                items: [
                  'Traditional: "Delayed marriage, difficulties with partners, older spouse"',
                  'Modern: "Learning about commitment, taking relationships seriously, maturing through partnership"',
                  'Both can be true — they\'re different emphases'
                ]
              },
              {
                type: 'callout',
                content: 'Learn modern astrology for self-understanding, then add traditional techniques for timing and specificity. They complement each other.',
                variant: 'tip'
              }
            ],
            quiz: [
              {
                id: 'q1-jung',
                question: 'Modern psychological astrology was heavily influenced by:',
                options: ['Ancient Babylonian priests', 'The psychologist Carl Jung', 'Medieval Arabic scholars', 'Isaac Newton'],
                correctIndex: 1,
                explanation: 'Modern astrology was transformed by 20th century psychology, particularly Jungian concepts.'
              },
              {
                id: 'q2-traditional-planets',
                question: 'Traditional astrology uses how many planets?',
                options: ['7 (Sun through Saturn)', '10 (including outer planets)', '12 (one for each sign)', '5 (only inner planets)'],
                correctIndex: 0,
                explanation: 'Traditional astrology uses only the 7 classical planets visible to the naked eye: Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn.'
              },
              {
                id: 'q3-best-approach',
                question: 'When it comes to traditional vs. modern astrology, the best approach is often:',
                options: ['Only use traditional', 'Only use modern', 'Learn both as complementary tools', 'Ignore both'],
                correctIndex: 2,
                explanation: 'Traditional and modern approaches offer different strengths and can complement each other effectively.'
              }
            ]
          },
          {
            id: 'astrology-today',
            title: 'Astrology in the Modern World',
            description: 'The current landscape and revival.',
            estimatedMinutes: 1,
            content: [
              { type: 'heading', content: 'Astrology Today', level: 2 },
              {
                type: 'text',
                content: 'Astrology is experiencing a massive revival. Apps like Co-Star have millions of users, "Mercury retrograde" is mainstream vocabulary, and a new generation is discovering this ancient art.'
              },
              { type: 'heading', content: 'The Current Landscape', level: 3 },
              {
                type: 'list',
                style: 'bullet',
                items: [
                  'App explosion: Co-Star, The Pattern, and others reach millions',
                  'Social media astrology: Instagram, TikTok, Twitter astrologers',
                  'Traditional revival: Ancient techniques being recovered and taught',
                  'Academic study: Astrology history studied in universities',
                  'Psychological integration: Therapists incorporating astrological frameworks',
                  'Commercial growth: Rising market for readings, courses, content'
                ]
              },
              { type: 'heading', content: 'Why the Revival?', level: 3 },
              {
                type: 'text',
                content: 'Possible factors driving astrology\'s popularity include desire for meaning in uncertain times, rejection of purely materialist worldviews, internet enabling easy access, younger generations open to alternative frameworks, quality of modern psychological astrology, community and identity, and tools for self-reflection in a busy world.'
              },
              { type: 'heading', content: 'Criticism and Response', level: 3 },
              {
                type: 'text',
                content: 'Common criticisms: "Astrology isn\'t scientific" (True; it\'s not claiming to be laboratory science), "Barnum effect explains it" (Valid concern; good astrology is specific), "Planets can\'t affect us" (Astrology may be correlational, not causal). Healthy response: Use astrology critically, test it against experience, and hold interpretations lightly.'
              },
              {
                type: 'concept',
                title: 'Your Place in This',
                content: 'As you learn astrology, you\'re joining a tradition spanning 5,000 years, a global community of practitioners, an ongoing conversation between ancient and modern, and a tool that millions find meaningful.',
                icon: '✨'
              },
              {
                type: 'callout',
                content: 'Stay humble about what astrology can prove, curious about what it can reveal, and ethical about how you use it.',
                variant: 'tip'
              }
            ],
            quiz: [
              {
                id: 'q1-revival',
                question: 'Astrology is currently experiencing:',
                options: ['Declining interest worldwide', 'A significant revival, especially among younger generations', 'No change from previous decades', 'Complete mainstream scientific acceptance'],
                correctIndex: 1,
                explanation: 'Astrology is experiencing major revival, driven by apps, social media, and renewed interest from younger generations.'
              },
              {
                id: 'q2-approach',
                question: 'A healthy approach to astrology\'s scientific status is:',
                options: ['Claim it\'s proven science', 'Reject it entirely because it\'s not scientific', 'Use it critically, test against experience, hold interpretations lightly', 'Never question any astrological claim'],
                correctIndex: 2,
                explanation: 'Critical, experiential engagement with astrology is healthier than either blind faith or complete dismissal.'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'mindset-philosophy',
    title: 'Mindset & Philosophy',
    description: 'Develop a healthy, empowering approach to astrology that avoids fatalism and embraces growth.',
    difficulty: 'beginner',
    estimatedMinutes: 12,
    icon: '🧠',
    modules: [
      {
        id: 'healthy-approach',
        title: 'A Healthy Approach',
        description: 'Building the right mindset for astrology.',
        lessons: [
          {
            id: 'tool-not-cage',
            title: 'Astrology as a Tool, Not a Cage',
            description: 'How to use astrology without limiting yourself.',
            estimatedMinutes: 2,
            content: [
              { type: 'heading', content: 'Liberation, Not Limitation', level: 2 },
              {
                type: 'text',
                content: 'Astrology should expand your sense of possibility, not narrow it. If astrology makes you feel trapped, anxious, or fatalistic, something has gone wrong — not with astrology, but with how it\'s being used.'
              },
              {
                type: 'concept',
                title: 'The Map Analogy',
                content: 'Your birth chart is like a map of the terrain you\'re traveling through — it shows the landscape, not the journey you must take. A map of mountains doesn\'t force you to climb them; it just shows they\'re there.',
                icon: '🗺️'
              },
              { type: 'heading', content: 'Signs of Unhealthy Use', level: 3 },
              {
                type: 'list',
                style: 'bullet',
                items: [
                  'Checking astrology before making any decision',
                  'Feeling anxious about upcoming transits',
                  'Believing you "can\'t" do something because of your chart',
                  'Using placements to excuse behavior',
                  'Dismissing people based on their Sun sign'
                ]
              },
              { type: 'heading', content: 'Signs of Healthy Use', level: 3 },
              {
                type: 'list',
                style: 'bullet',
                items: [
                  'Using astrology for self-reflection, not prediction',
                  'Feeling curious about transits, not fearful',
                  'Seeing "difficult" placements as growth opportunities',
                  'Taking responsibility for your choices',
                  'Remaining open to people regardless of their signs'
                ]
              },
              {
                type: 'callout',
                content: 'The best astrologers don\'t check their transits every morning. They use astrology as one tool among many for self-understanding.',
                variant: 'tip'
              },
              {
                type: 'concept',
                title: 'The Goal',
                content: 'Astrology at its best helps you understand yourself, have compassion for your patterns, time your efforts wisely, and grow into your potential. It\'s a mirror, not a prison.',
                icon: '🪞'
              }
            ],
            quiz: [
              {
                id: 'q1-healthy-use',
                question: 'A healthy approach to astrology includes:',
                options: ['Checking transits before every decision', 'Dismissing people based on Sun signs', 'Using it for self-reflection while taking responsibility', 'Believing your chart determines everything'],
                correctIndex: 2,
                explanation: 'Healthy astrology use involves self-reflection and personal responsibility, not fatalism or constant checking.'
              },
              {
                id: 'q2-map-analogy',
                question: 'The "map" analogy suggests that your birth chart:',
                options: ['Forces you down a specific path', 'Shows the terrain without dictating your journey', 'Is completely meaningless', 'Should be ignored'],
                correctIndex: 1,
                explanation: 'Like a map, your chart shows the landscape of your nature, but doesn\'t force you to travel any particular route.'
              }
            ]
          },
          {
            id: 'free-will',
            title: 'Free Will vs. Cosmic Influence',
            description: 'Understanding the balance between fate and choice.',
            estimatedMinutes: 2,
            content: [
              { type: 'heading', content: 'The Ancient Question', level: 2 },
              {
                type: 'text',
                content: 'Are we fated by the stars, or do we have free will? This question has been debated for thousands of years. The answer most modern astrologers give: both are true, in different ways.'
              },
              {
                type: 'concept',
                title: 'A Useful Framework',
                content: 'Think of it this way: The stars describe the weather, but you decide whether to carry an umbrella. You didn\'t choose the conditions, but you always choose your response.',
                icon: '☔'
              },
              { type: 'heading', content: 'What the Chart Shows', level: 3 },
              {
                type: 'list',
                style: 'bullet',
                items: [
                  'Your natural tendencies and inclinations',
                  'The themes you\'ll likely encounter',
                  'Your strengths and growth edges',
                  'Timing patterns (when certain themes are emphasized)',
                  'The "raw material" you\'re working with'
                ]
              },
              { type: 'heading', content: 'What the Chart Doesn\'t Show', level: 3 },
              {
                type: 'list',
                style: 'bullet',
                items: [
                  'How you\'ll respond to your tendencies',
                  'Whether you\'ll develop your potential',
                  'Specific events that will happen',
                  'Your level of consciousness or growth',
                  'The choices you\'ll make'
                ]
              },
              {
                type: 'text',
                content: 'Two people with identical charts (born at the same time and place) will live very different lives based on their choices, circumstances, and level of self-awareness.'
              },
              {
                type: 'callout',
                content: '"The stars incline, they do not compel." — Ancient astrological wisdom',
                variant: 'info'
              },
              { type: 'heading', content: 'Levels of Expression', level: 3 },
              {
                type: 'text',
                content: 'Every placement can manifest at different levels. Mars can be expressed as violence OR as healthy assertiveness. Saturn can manifest as depression OR as disciplined mastery. You influence which level manifests through awareness and choice.'
              },
              {
                type: 'callout',
                content: 'Your chart shows WHAT energies you\'re working with. Your consciousness determines HOW you express them.',
                variant: 'tip'
              }
            ],
            quiz: [
              {
                id: 'q1-fate-choice',
                question: 'The relationship between fate and free will in astrology is best described as:',
                options: ['Everything is fated', 'Free will is an illusion', 'The chart shows tendencies, but choices determine expression', 'Astrology has nothing to do with fate'],
                correctIndex: 2,
                explanation: 'The chart shows your tendencies and raw material, but you always have choice in how you respond and express those energies.'
              },
              {
                id: 'q2-levels',
                question: 'A "difficult" placement like Mars square Saturn:',
                options: ['Guarantees conflict and failure', 'Can manifest as either struggle or disciplined achievement', 'Should be ignored', 'Means you have no free will'],
                correctIndex: 1,
                explanation: 'Every placement has multiple levels of expression. Awareness and choice influence which level manifests in your life.'
              }
            ]
          },
          {
            id: 'difficult-placements',
            title: 'Dealing with "Difficult" Placements',
            description: 'Transforming fear into understanding.',
            estimatedMinutes: 2,
            content: [
              { type: 'heading', content: 'No Placement Is a Death Sentence', level: 2 },
              {
                type: 'text',
                content: 'If you\'ve googled your placements, you\'ve probably found scary interpretations. Saturn in the 7th? "Doomed to loneliness!" Pluto square Sun? "Power struggles forever!" This fear-based approach helps no one.'
              },
              {
                type: 'concept',
                title: 'Reframe the Narrative',
                content: 'Every "difficult" placement is actually describing a growth assignment — an area where you\'re meant to develop mastery through experience. The challenge IS the gift.',
                icon: '🎁'
              },
              { type: 'heading', content: 'Common "Scary" Placements Reframed', level: 3 },
              {
                type: 'list',
                style: 'bullet',
                items: [
                  'Saturn in 7th: Not "doomed to loneliness" but "learning commitment through taking relationships seriously"',
                  'Pluto conjunct Sun: Not "power struggles" but "profound capacity for transformation and influence"',
                  'Moon square Saturn: Not "emotional coldness" but "developing emotional resilience and maturity"',
                  'Mars in 12th: Not "hidden enemies" but "learning to assert yourself in subtle, spiritual ways"',
                  '8th house stellium: Not "obsessed with death" but "deep capacity for intimacy and transformation"'
                ]
              },
              { type: 'heading', content: 'Why Challenges Become Gifts', level: 3 },
              {
                type: 'text',
                content: 'The areas of your chart that cause friction are where you\'re pushed to grow. Easy placements often go undeveloped because there\'s no pressure. Challenging ones demand your attention and ultimately yield your greatest strengths.'
              },
              {
                type: 'callout',
                content: 'Many of the most successful and interesting people have "difficult" charts. The challenges gave them depth, drive, and resilience.',
                variant: 'info'
              },
              { type: 'heading', content: 'What To Do With Scary Readings', level: 3 },
              {
                type: 'list',
                style: 'bullet',
                items: [
                  'Remember that one placement doesn\'t define your whole chart',
                  'Look for how the placement might support growth',
                  'Consider what strength this challenge might build',
                  'Seek interpretations focused on potential, not doom',
                  'Talk to a professional if internet readings cause anxiety'
                ]
              },
              {
                type: 'callout',
                content: 'If an astrological interpretation leaves you feeling hopeless, it\'s a bad interpretation — regardless of who gave it.',
                variant: 'tip'
              }
            ],
            quiz: [
              {
                id: 'q1-difficult',
                question: '"Difficult" placements are best understood as:',
                options: ['Curses to be feared', 'Growth assignments that build strength', 'Proof that astrology doesn\'t work', 'Things to hide from others'],
                correctIndex: 1,
                explanation: 'Challenging placements describe areas where you\'re meant to grow through experience. The challenge itself develops important capacities.'
              },
              {
                id: 'q2-saturn-7th',
                question: 'Saturn in the 7th house is better interpreted as:',
                options: ['Guaranteed loneliness', 'Learning commitment by taking relationships seriously', 'Never getting married', 'Having no friends'],
                correctIndex: 1,
                explanation: 'Saturn in the 7th indicates taking relationships seriously and learning important lessons about commitment — not doom.'
              }
            ]
          }
        ]
      },
      {
        id: 'critical-thinking',
        title: 'Critical Thinking',
        description: 'Maintaining discernment while practicing astrology.',
        lessons: [
          {
            id: 'barnum-effect',
            title: 'The Barnum Effect & Critical Thinking',
            description: 'Understanding cognitive biases in astrology.',
            estimatedMinutes: 2,
            content: [
              { type: 'heading', content: 'Why Astrology Can Seem Accurate', level: 2 },
              {
                type: 'text',
                content: 'Skeptics often point to the "Barnum effect" — our tendency to accept vague, general statements as personally accurate. This is a valid concern, and good astrologers should understand it.'
              },
              {
                type: 'concept',
                title: 'The Barnum Effect',
                content: 'Named after P.T. Barnum, this refers to our tendency to accept vague personality descriptions as uniquely true for us. "You have a need for others to like you" sounds personal but applies to almost everyone.',
                icon: '🎪'
              },
              { type: 'heading', content: 'When Barnum Applies', level: 3 },
              {
                type: 'list',
                style: 'bullet',
                items: [
                  'Sun sign horoscopes in magazines/newspapers',
                  'Very general personality descriptions',
                  'Statements that could apply to anyone',
                  'Cold reading techniques',
                  'Overly positive or flattering descriptions'
                ]
              },
              { type: 'heading', content: 'When Astrology Goes Beyond Barnum', level: 3 },
              {
                type: 'list',
                style: 'bullet',
                items: [
                  'Specific, testable statements about personality',
                  'Timing predictions that can be verified',
                  'Details that couldn\'t be guessed (e.g., specific family dynamics)',
                  'Patterns that repeat across people with similar placements',
                  'Insights that feel uncomfortably accurate'
                ]
              },
              {
                type: 'callout',
                content: 'Good astrology is specific. If a reading could apply to anyone, it\'s not real astrology — it\'s entertainment at best.',
                variant: 'info'
              },
              { type: 'heading', content: 'Being Your Own Skeptic', level: 3 },
              {
                type: 'text',
                content: 'The best approach is to be genuinely curious AND healthily skeptical. Test what you learn against your actual experience. Notice when astrology is vague versus specific. Don\'t accept interpretations uncritically.'
              },
              {
                type: 'callout',
                content: 'You don\'t have to choose between "astrology is all true" and "astrology is all false." Hold it lightly, test it personally, and keep what\'s useful.',
                variant: 'tip'
              }
            ],
            quiz: [
              {
                id: 'q1-barnum',
                question: 'The Barnum effect describes:',
                options: ['Why astrology always works', 'Our tendency to accept vague statements as personally accurate', 'Why skeptics are always wrong', 'A type of planetary aspect'],
                correctIndex: 1,
                explanation: 'The Barnum effect is our tendency to see ourselves in vague, general statements — a valid critique that good astrologers should acknowledge.'
              },
              {
                id: 'q2-good-astrology',
                question: 'Good astrology differs from the Barnum effect by being:',
                options: ['More flattering', 'Specific and testable rather than vague', 'Published in magazines', 'Always positive'],
                correctIndex: 1,
                explanation: 'Real astrological insight is specific and can be tested against experience, unlike vague statements that could apply to anyone.'
              }
            ]
          },
          {
            id: 'why-accuracy-varies',
            title: 'Why Accuracy Varies',
            description: 'Understanding the limits and variables of astrological practice.',
            estimatedMinutes: 2,
            content: [
              { type: 'heading', content: 'It\'s Not Always Going to "Hit"', level: 2 },
              {
                type: 'text',
                content: 'Sometimes astrology feels spookily accurate. Other times, it misses completely. Understanding why accuracy varies helps you use astrology more wisely.'
              },
              { type: 'heading', content: 'Why Readings Vary in Accuracy', level: 3 },
              {
                type: 'list',
                style: 'bullet',
                items: [
                  'Birth time accuracy: Even 15 minutes off changes the houses significantly',
                  'Astrologer skill: Interpretation quality varies dramatically',
                  'Which techniques used: Different methods yield different results',
                  'Level of consciousness: How someone expresses their chart varies',
                  'Context matters: Same chart, different cultures/circumstances',
                  'Confirmation bias: We remember hits and forget misses'
                ]
              },
              {
                type: 'concept',
                title: 'Birth Time Matters',
                content: 'If your birth time is wrong, your Rising sign, houses, and house placements may all be wrong. "Mom said around 3pm" is not precise enough for detailed work.',
                icon: '⏰'
              },
              { type: 'heading', content: 'What To Do About Uncertainty', level: 3 },
              {
                type: 'list',
                style: 'bullet',
                items: [
                  'Get your birth certificate for accurate time',
                  'Focus on what resonates, set aside what doesn\'t',
                  'Use multiple sources/astrologers for important questions',
                  'Hold interpretations as possibilities, not certainties',
                  'Trust your own experience over any interpretation'
                ]
              },
              {
                type: 'callout',
                content: 'If a reading doesn\'t resonate, it might be wrong — not you. Your lived experience is always more valid than someone\'s interpretation.',
                variant: 'tip'
              },
              {
                type: 'text',
                content: 'Astrology is an art as much as a science. Even the best astrologers miss sometimes. This doesn\'t invalidate astrology any more than a wrong medical diagnosis invalidates medicine.'
              }
            ],
            quiz: [
              {
                id: 'q1-accuracy',
                question: 'Astrological readings vary in accuracy because:',
                options: ['Astrology is completely random', 'Birth time, astrologer skill, and context all affect outcomes', 'The planets change daily', 'Only Sun signs matter'],
                correctIndex: 1,
                explanation: 'Multiple factors affect accuracy: birth time precision, astrologer skill, techniques used, and individual expression of the chart.'
              },
              {
                id: 'q2-doesnt-resonate',
                question: 'If a reading doesn\'t resonate with you:',
                options: ['You\'re in denial', 'The reading might be wrong — trust your experience', 'Astrology doesn\'t work for you', 'You need to change to match the reading'],
                correctIndex: 1,
                explanation: 'Your lived experience is the ultimate test. If a reading doesn\'t fit, the interpretation may be off — not you.'
              }
            ]
          },
          {
            id: 'ethical-considerations',
            title: 'Ethical Considerations',
            description: 'Using astrology responsibly.',
            estimatedMinutes: 2,
            content: [
              { type: 'heading', content: 'With Knowledge Comes Responsibility', level: 2 },
              {
                type: 'text',
                content: 'As you learn astrology, you\'ll be tempted to look up friends\', partners\', and coworkers\' charts. Before you do, consider the ethics involved.'
              },
              { type: 'heading', content: 'Key Ethical Principles', level: 3 },
              {
                type: 'list',
                style: 'bullet',
                items: [
                  'Consent: Don\'t read someone\'s chart without permission',
                  'Privacy: Don\'t share what you learn about others',
                  'Humility: You might be wrong',
                  'Empowerment: Use insights to help, not judge',
                  'Boundaries: Some things shouldn\'t be predicted (health, death)'
                ]
              },
              {
                type: 'concept',
                title: 'The Consent Question',
                content: 'Looking up someone\'s chart without their knowledge is ethically questionable. It\'s like reading their diary. Would they want you to have this information?',
                icon: '🔒'
              },
              { type: 'heading', content: 'Common Ethical Pitfalls', level: 3 },
              {
                type: 'list',
                style: 'bullet',
                items: [
                  'Judging potential partners by their chart before meeting them',
                  'Telling people unsolicited information about their charts',
                  'Making predictions about health or death',
                  'Using chart knowledge to manipulate',
                  'Stereotyping people by Sun sign'
                ]
              },
              {
                type: 'callout',
                content: 'Just because you CAN look up someone\'s chart doesn\'t mean you SHOULD. Astrology knowledge is a responsibility.',
                variant: 'warning'
              },
              { type: 'heading', content: 'A Good Rule of Thumb', level: 3 },
              {
                type: 'text',
                content: 'Use astrology primarily for self-understanding. When it involves others, ask permission. When sharing insights, be humble and empowering. When in doubt, don\'t.'
              }
            ],
            quiz: [
              {
                id: 'q1-consent',
                question: 'Looking up someone\'s chart without their knowledge is:',
                options: ['Always fine — it\'s public information', 'Ethically questionable — consent matters', 'Required for all relationships', 'Impossible to do'],
                correctIndex: 1,
                explanation: 'Even though birth data might be accessible, looking up someone\'s chart without permission raises ethical concerns about consent and privacy.'
              },
              {
                id: 'q2-sharing',
                question: 'When sharing astrological insights about someone:',
                options: ['Tell them everything you see, especially the negative', 'Be humble, empowering, and respect boundaries', 'Make predictions about their health', 'Share it on social media'],
                correctIndex: 1,
                explanation: 'Ethical astrology sharing is humble (you might be wrong), empowering (helping not judging), and respects boundaries.'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'personal-growth',
    title: 'Personal Growth & Shadow Work',
    description: 'Use your birth chart as a tool for self-compassion, pattern recognition, and conscious evolution.',
    difficulty: 'intermediate',
    estimatedMinutes: 14,
    icon: '🌱',
    modules: [
      {
        id: 'self-compassion',
        title: 'Self-Compassion Through the Chart',
        description: 'Using astrology to understand and accept yourself.',
        lessons: [
          {
            id: 'chart-self-compassion',
            title: 'Using Your Chart for Self-Compassion',
            description: 'How astrology can help you be kinder to yourself.',
            estimatedMinutes: 2,
            content: [
              { type: 'heading', content: 'You Came in With This', level: 2 },
              {
                type: 'text',
                content: 'One of astrology\'s greatest gifts is permission to be yourself. Your chart shows patterns you were born with — not flaws you created through failure.'
              },
              {
                type: 'concept',
                title: 'Built-In, Not Broken',
                content: 'That tendency you\'ve always criticized yourself for? It might be written in your chart. Not as a flaw, but as a feature — something you\'re here to work with and eventually master.',
                icon: '💚'
              },
              { type: 'heading', content: 'How Astrology Supports Self-Compassion', level: 3 },
              {
                type: 'list',
                style: 'bullet',
                items: [
                  'Names your patterns without shaming them',
                  'Shows why certain things are harder for you than others',
                  'Reveals that your challenges serve a purpose',
                  'Reminds you that you\'re working with specific "equipment"',
                  'Normalizes your experience by connecting it to cosmic patterns'
                ]
              },
              {
                type: 'callout',
                content: 'Your Moon sign explains your emotional needs. Instead of "why am I so needy/distant/sensitive?" try "oh, this is how I\'m wired to process emotions."',
                variant: 'info'
              },
              { type: 'heading', content: 'Reframing Your "Weaknesses"', level: 3 },
              {
                type: 'text',
                content: 'Every pattern has a gift inside it. The chart doesn\'t give you random flaws — it gives you specific assignments. What you struggle with is what you\'re here to transform.'
              },
              {
                type: 'list',
                style: 'bullet',
                items: [
                  'Overly sensitive (Cancer Moon)? You\'re here to develop emotional wisdom',
                  'Stubborn (Fixed signs)? You\'re here to learn about commitment',
                  'Scattered (Mutable signs)? You\'re here to develop flexibility',
                  'Controlling (Pluto aspects)? You\'re here to learn about power and surrender'
                ]
              },
              {
                type: 'callout',
                content: 'Next time you criticize yourself for a pattern, try: "This is my chart working. What is this pattern trying to teach me?"',
                variant: 'tip'
              }
            ],
            quiz: [
              {
                id: 'q1-patterns',
                question: 'Your chart\'s challenging patterns are best understood as:',
                options: ['Random flaws you created', 'Evidence you\'re broken', 'Built-in features you\'re here to work with', 'Things to hide from others'],
                correctIndex: 2,
                explanation: 'Your chart\'s patterns aren\'t flaws — they\'re features. You came in with this "equipment" and you\'re here to work with it.'
              },
              {
                id: 'q2-moon',
                question: 'Your Moon sign can help with self-compassion by:',
                options: ['Telling you what\'s wrong with you', 'Explaining your emotional wiring without judgment', 'Predicting future problems', 'Making you feel worse'],
                correctIndex: 1,
                explanation: 'Understanding your Moon sign helps you accept your emotional nature as "how you\'re wired" rather than a flaw to fix.'
              }
            ]
          },
          {
            id: 'growth-map',
            title: 'Your Chart as a Growth Map',
            description: 'The chart as a guide to your evolution, not a life sentence.',
            estimatedMinutes: 2,
            content: [
              { type: 'heading', content: 'A Map, Not a Sentence', level: 2 },
              {
                type: 'text',
                content: 'Your birth chart isn\'t a prison sentence — it\'s a growth curriculum. It shows what you\'re here to learn, not what you\'re stuck with forever.'
              },
              {
                type: 'concept',
                title: 'Growth Curriculum',
                content: 'Think of your chart as showing your courses this lifetime. Saturn in the 7th? You\'ve enrolled in "Mastering Relationships 401." Chiron in the 10th? "Healing Through Career" is on your schedule.',
                icon: '📚'
              },
              { type: 'heading', content: 'Finding Your Growth Edges', level: 3 },
              {
                type: 'text',
                content: 'Certain parts of the chart particularly show growth areas:'
              },
              {
                type: 'list',
                style: 'bullet',
                items: [
                  'Saturn: Where you must develop mastery through effort',
                  'Chiron: Where you\'re wounded and can eventually heal others',
                  'North Node: Where you\'re growing toward (unfamiliar but fulfilling)',
                  'South Node: Where you\'re growing from (comfortable but limiting)',
                  '12th House: What you\'re meant to integrate from the unconscious'
                ]
              },
              { type: 'heading', content: 'Growth Is Not Linear', level: 3 },
              {
                type: 'text',
                content: 'You\'ll revisit the same themes multiple times, each at a deeper level. Saturn returns at 29-30 and 58-60. Nodal returns happen every 18.5 years. You spiral through your curriculum, not march through it once.'
              },
              {
                type: 'callout',
                content: 'If the same theme keeps appearing in your life, that\'s not failure — that\'s your curriculum. You\'re meant to go deeper with it.',
                variant: 'tip'
              }
            ],
            quiz: [
              {
                id: 'q1-curriculum',
                question: 'The birth chart is best understood as:',
                options: ['A fixed destiny', 'A prison sentence', 'A growth curriculum showing what you\'re here to learn', 'Meaningless'],
                correctIndex: 2,
                explanation: 'Your chart shows your growth assignments — what you\'re here to work with and master, not what you\'re stuck with.'
              },
              {
                id: 'q2-repeating',
                question: 'When the same life theme keeps appearing:',
                options: ['You\'ve failed', 'That\'s your curriculum — you\'re meant to go deeper', 'Astrology isn\'t working', 'You should give up'],
                correctIndex: 1,
                explanation: 'Repeating themes aren\'t failures — they\'re your curriculum. You spiral through the same lessons at deeper levels.'
              }
            ]
          }
        ]
      },
      {
        id: 'shadow-work',
        title: 'Shadow Work',
        description: 'Working with the unconscious parts of your chart.',
        lessons: [
          {
            id: 'unconscious-patterns',
            title: 'Identifying Unconscious Patterns',
            description: 'The 12th house, Pluto, and hidden parts of the chart.',
            estimatedMinutes: 3,
            content: [
              { type: 'heading', content: 'What Lies Beneath', level: 2 },
              {
                type: 'text',
                content: 'Some parts of your chart operate below conscious awareness. These are where patterns run automatically, often causing problems until they\'re made conscious.'
              },
              {
                type: 'concept',
                title: 'The Shadow',
                content: 'In Jungian terms, the shadow is what we\'ve rejected or hidden from ourselves. In the chart, certain placements point to shadow material that needs integration.',
                icon: '🌑'
              },
              { type: 'heading', content: 'Shadow Indicators in the Chart', level: 3 },
              {
                type: 'list',
                style: 'bullet',
                items: [
                  '12th House planets: Operating unconsciously, often projected onto others',
                  'Pluto aspects: Where you have compulsive patterns and power issues',
                  'Saturn: Where you feel inadequate and may overcompensate',
                  'Chiron: Your core wound that drives behavior until healed',
                  'South Node: Past patterns you default to but need to outgrow'
                ]
              },
              { type: 'heading', content: 'Signs You\'re Dealing With Shadow', level: 3 },
              {
                type: 'list',
                style: 'bullet',
                items: [
                  'Strong reactions to certain traits in others (projection)',
                  'Repeated patterns you "don\'t understand"',
                  'Behaviors that seem to happen "automatically"',
                  'Things you deny about yourself but others see clearly',
                  'Chronic life themes that won\'t resolve'
                ]
              },
              {
                type: 'callout',
                content: 'What you judge most harshly in others often points to your own shadow. The chart can show where these projections come from.',
                variant: 'info'
              },
              { type: 'heading', content: 'The 12th House Specifically', level: 3 },
              {
                type: 'text',
                content: 'Planets in the 12th house often operate unconsciously. We may not see these parts of ourselves, though others do. Dreams, therapy, and meditation can help bring 12th house material to light.'
              }
            ],
            quiz: [
              {
                id: 'q1-shadow',
                question: 'The psychological "shadow" in astrology refers to:',
                options: ['Planets that are always negative', 'Rejected or unconscious parts of yourself', 'Dark predictions', 'Your Sun sign\'s opposite'],
                correctIndex: 1,
                explanation: 'Shadow material is what we\'ve rejected or hidden from conscious awareness — parts that need integration.'
              },
              {
                id: 'q2-12th-house',
                question: 'Planets in the 12th house often:',
                options: ['Don\'t affect you', 'Operate unconsciously, below awareness', 'Only show in dreams', 'Are always problematic'],
                correctIndex: 1,
                explanation: '12th house planets often work below conscious awareness — we may not see these parts of ourselves clearly.'
              }
            ]
          },
          {
            id: 'working-with-challenges',
            title: 'Working WITH Challenging Aspects',
            description: 'Transforming difficult energies into strengths.',
            estimatedMinutes: 2,
            content: [
              { type: 'heading', content: 'With, Not Against', level: 2 },
              {
                type: 'text',
                content: 'The biggest mistake with challenging aspects is trying to eliminate them. They\'re part of you. The goal is to work WITH these energies consciously, not against them.'
              },
              {
                type: 'concept',
                title: 'Energy Is Neutral',
                content: 'A square between Mars and Saturn is just energy. It can manifest as frustration and blocks, OR as disciplined determination. The energy is the same; the expression is your choice.',
                icon: '⚡'
              },
              { type: 'heading', content: 'Steps to Work With Difficult Aspects', level: 3 },
              {
                type: 'list',
                style: 'numbered',
                items: [
                  'Name it: Identify the aspect and what it represents',
                  'Own it: Accept this is part of your operating system',
                  'Study it: Learn how this aspect typically manifests',
                  'Notice it: Watch when and how it activates in your life',
                  'Channel it: Find healthy expressions for this energy',
                  'Appreciate it: Find the gift hidden in the challenge'
                ]
              },
              { type: 'heading', content: 'Example: Moon Square Pluto', level: 3 },
              {
                type: 'text',
                content: 'Low expression: Emotional manipulation, intensity that overwhelms others, power struggles in relationships. High expression: Profound emotional depth, ability to help others transform, powerful intuition, capacity for genuine intimacy.'
              },
              {
                type: 'callout',
                content: 'Your most challenging aspect, consciously worked with, often becomes your greatest gift to offer others.',
                variant: 'tip'
              }
            ],
            quiz: [
              {
                id: 'q1-approach',
                question: 'The best approach to challenging aspects is:',
                options: ['Try to eliminate them', 'Ignore them', 'Work WITH them consciously', 'Blame your parents'],
                correctIndex: 2,
                explanation: 'Challenging aspects are part of you. The goal is conscious collaboration with these energies, not elimination.'
              },
              {
                id: 'q2-energy',
                question: 'The energy of a difficult aspect is:',
                options: ['Always negative', 'Neutral — expression determines outcome', 'Impossible to change', 'Only affects you negatively'],
                correctIndex: 1,
                explanation: 'Aspect energy is neutral. The same Mars-Saturn square can manifest as frustration or disciplined determination.'
              }
            ]
          },
          {
            id: 'integrating-shadow',
            title: 'Integrating Rejected Parts',
            description: 'Embracing the shadow planets in your chart.',
            estimatedMinutes: 2,
            content: [
              { type: 'heading', content: 'Bringing Shadow Into Light', level: 2 },
              {
                type: 'text',
                content: 'Integration means accepting rejected parts of yourself as valid and useful. It\'s not about "fixing" them but about consciously incorporating them into who you are.'
              },
              { type: 'heading', content: 'Common Shadow Planets', level: 3 },
              {
                type: 'list',
                style: 'bullet',
                items: [
                  'Pluto: Your power, intensity, and capacity for transformation — often feared',
                  'Saturn: Your authority, limits, and capacity for discipline — often avoided',
                  'Mars: Your anger, assertiveness, and drive — often suppressed',
                  'Lilith: Your wild, untamed nature — often hidden',
                  '12th house planets: Whatever\'s there may be denied or projected'
                ]
              },
              { type: 'heading', content: 'Signs of Projection', level: 3 },
              {
                type: 'text',
                content: 'When we don\'t own a planet\'s energy, we often attract it from outside or project it onto others. You might attract dominating people (un-owned Pluto) or critical partners (un-owned Saturn).'
              },
              {
                type: 'callout',
                content: 'What you consistently attract from others may be what you\'re not owning in yourself. Your chart can show what needs reclaiming.',
                variant: 'info'
              },
              { type: 'heading', content: 'Integration Practices', level: 3 },
              {
                type: 'list',
                style: 'bullet',
                items: [
                  'Study the planet: Learn everything about its healthy expression',
                  'Find role models: Who expresses this energy well?',
                  'Small experiments: Try expressing this energy in safe ways',
                  'Journal: Write dialogues with the rejected planet',
                  'Therapy: Work with a professional on deep shadow material'
                ]
              },
              {
                type: 'callout',
                content: 'Integration doesn\'t mean acting out every impulse. It means acknowledging the energy exists and finding conscious, healthy expressions for it.',
                variant: 'tip'
              }
            ],
            quiz: [
              {
                id: 'q1-integration',
                question: 'Integrating shadow material means:',
                options: ['Eliminating negative traits', 'Acting out every impulse', 'Accepting rejected parts as valid and finding healthy expressions', 'Ignoring problems'],
                correctIndex: 2,
                explanation: 'Integration means accepting rejected parts of yourself and finding conscious, healthy ways to express those energies.'
              },
              {
                id: 'q2-projection',
                question: 'When you consistently attract a certain type of person:',
                options: ['It\'s random chance', 'You might be projecting un-owned chart energy', 'It proves astrology is wrong', 'You should avoid all people'],
                correctIndex: 1,
                explanation: 'What we don\'t own in ourselves, we often attract from outside. Your chart can reveal what needs reclaiming.'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'practical-daily-use',
    title: 'Practical Daily Use',
    description: 'Apply astrology to everyday life through moon phases, retrogrades, and personal timing.',
    difficulty: 'intermediate',
    estimatedMinutes: 15,
    icon: '📅',
    modules: [
      {
        id: 'moon-phases',
        title: 'Moon Phase Planning',
        description: 'Working with the lunar cycle.',
        lessons: [
          {
            id: 'moon-phase-basics',
            title: 'Moon Phase Planning',
            description: 'When to start, when to rest.',
            estimatedMinutes: 2,
            content: [
              { type: 'heading', content: 'The Lunar Rhythm', level: 2 },
              {
                type: 'text',
                content: 'The Moon completes a full cycle every 29.5 days, moving through phases that have distinct energies. Working with these phases can help you time activities more effectively.'
              },
              {
                type: 'concept',
                title: 'The Basic Cycle',
                content: 'New Moon (beginnings) → Waxing (building) → Full Moon (culmination) → Waning (releasing) → New Moon again. This rhythm has been observed for thousands of years.',
                icon: '🌙'
              },
              { type: 'heading', content: 'The Phases', level: 3 },
              {
                type: 'list',
                style: 'bullet',
                items: [
                  'New Moon: Set intentions, start projects, plant seeds (literal or metaphorical)',
                  'Waxing Crescent: Take first steps, build momentum, gather resources',
                  'First Quarter: Take action, overcome obstacles, commit',
                  'Waxing Gibbous: Refine, adjust, prepare for culmination',
                  'Full Moon: Harvest results, celebrate, illuminate what\'s hidden',
                  'Waning Gibbous: Share, teach, express gratitude',
                  'Last Quarter: Release, forgive, let go of what\'s not working',
                  'Waning Crescent: Rest, reflect, prepare for the next cycle'
                ]
              },
              { type: 'heading', content: 'Practical Applications', level: 3 },
              {
                type: 'list',
                style: 'bullet',
                items: [
                  'Launch projects, websites, or initiatives near the New Moon',
                  'Schedule important presentations or reveals near the Full Moon',
                  'Begin decluttering or ending things in the waning phase',
                  'Rest and plan during the dark moon (just before New Moon)'
                ]
              },
              {
                type: 'callout',
                content: 'You don\'t have to be rigid about this. Moon phases are a gentle rhythm to work with, not strict rules to follow.',
                variant: 'tip'
              }
            ],
            quiz: [
              {
                id: 'q1-new-moon',
                question: 'The New Moon is best for:',
                options: ['Ending projects', 'Setting intentions and starting new things', 'Taking a vacation', 'Doing nothing'],
                correctIndex: 1,
                explanation: 'The New Moon represents beginnings — it\'s an ideal time to set intentions and plant seeds for new projects.'
              },
              {
                id: 'q2-waning',
                question: 'The waning moon phase (after Full Moon) is good for:',
                options: ['Starting new ventures', 'Releasing and letting go', 'Big launches', 'Making major purchases'],
                correctIndex: 1,
                explanation: 'The waning phase supports release, completion, and letting go of what no longer serves.'
              }
            ]
          },
          {
            id: 'void-of-course',
            title: 'Void of Course Moon',
            description: 'What it means and how to use it.',
            estimatedMinutes: 2,
            content: [
              { type: 'heading', content: 'The Moon Between Signs', level: 2 },
              {
                type: 'text',
                content: 'The "Void of Course" (VOC) Moon is the period after the Moon makes its last major aspect in a sign and before it enters the next sign. This can last from minutes to over a day.'
              },
              {
                type: 'concept',
                title: 'What VOC Means',
                content: 'During VOC periods, the Moon isn\'t connecting with other planets. Traditionally, this is considered poor timing for starting important new ventures — things begun may "come to nothing."',
                icon: '⏸️'
              },
              { type: 'heading', content: 'What the Tradition Says', level: 3 },
              {
                type: 'list',
                style: 'bullet',
                items: [
                  'Don\'t start important new projects',
                  'Don\'t make major purchases or sign contracts',
                  'Don\'t schedule crucial meetings',
                  'Things begun may not develop as expected',
                  'Decisions made may need to be revised'
                ]
              },
              { type: 'heading', content: 'What VOC Is Good For', level: 3 },
              {
                type: 'list',
                style: 'bullet',
                items: [
                  'Routine tasks and maintenance',
                  'Rest and reflection',
                  'Creative brainstorming (without commitment)',
                  'Meditation and spiritual practice',
                  'Finishing existing projects'
                ]
              },
              {
                type: 'callout',
                content: 'Don\'t become paralyzed by VOC moons — they happen every 2-3 days. Life must go on. Just avoid scheduling MAJOR new starts during these times if possible.',
                variant: 'tip'
              },
              {
                type: 'text',
                content: 'Many astrology apps and websites list VOC Moon times. Check before scheduling your most important new beginnings.'
              }
            ],
            quiz: [
              {
                id: 'q1-voc-meaning',
                question: 'The Void of Course Moon is:',
                options: ['When there\'s no Moon', 'The period between the Moon\'s last aspect and entering a new sign', 'A lunar eclipse', 'The New Moon'],
                correctIndex: 1,
                explanation: 'VOC is the period after the Moon\'s last major aspect in a sign until it enters the next sign.'
              },
              {
                id: 'q2-voc-use',
                question: 'VOC Moon periods are good for:',
                options: ['Starting major new ventures', 'Routine tasks, rest, and reflection', 'Signing important contracts', 'Making big announcements'],
                correctIndex: 1,
                explanation: 'VOC periods favor routine work, rest, and finishing existing projects rather than important new beginnings.'
              }
            ]
          }
        ]
      },
      {
        id: 'retrogrades',
        title: 'Retrogrades',
        description: 'Understanding and working with retrograde planets.',
        lessons: [
          {
            id: 'mercury-retrograde',
            title: 'Mercury Retrograde Survival',
            description: 'The famous retrograde — and its opportunities.',
            estimatedMinutes: 2,
            content: [
              { type: 'heading', content: 'The Most Famous Retrograde', level: 2 },
              {
                type: 'text',
                content: 'Mercury retrograde has become mainstream — even non-astrologers blame it for tech failures and miscommunication. But there\'s more nuance than the memes suggest.'
              },
              {
                type: 'concept',
                title: 'What "Retrograde" Means',
                content: 'Retrograde is an optical illusion — Mercury isn\'t actually moving backward. From Earth\'s perspective, it appears to reverse direction for about 3 weeks, roughly 3-4 times per year.',
                icon: '↩️'
              },
              { type: 'heading', content: 'Traditional Cautions', level: 3 },
              {
                type: 'list',
                style: 'bullet',
                items: [
                  'Communication mishaps more likely',
                  'Travel delays and changes',
                  'Technology glitches',
                  'Contracts may need revision',
                  'Misunderstandings increase',
                  'Things from the past resurface'
                ]
              },
              { type: 'heading', content: 'The Opportunities', level: 3 },
              {
                type: 'list',
                style: 'bullet',
                items: [
                  'RE-view, RE-vise, RE-connect (all "re-" activities)',
                  'Finish old projects',
                  'Reconnect with people from the past',
                  'Rethink plans and strategies',
                  'Slow down and reflect',
                  'Catch errors before they become problems'
                ]
              },
              {
                type: 'callout',
                content: 'Mercury retrograde isn\'t inherently bad — it\'s a review period. Problems come from pushing forward when the energy favors looking back.',
                variant: 'info'
              },
              { type: 'heading', content: 'Practical Tips', level: 3 },
              {
                type: 'list',
                style: 'bullet',
                items: [
                  'Back up your devices before retrograde begins',
                  'Build extra time into travel plans',
                  'Double-check important communications',
                  'Expect old friends/exes to reappear',
                  'Delay major new contracts if possible (or read extra carefully)',
                  'Use it for editing, revising, and completing'
                ]
              }
            ],
            quiz: [
              {
                id: 'q1-retrograde',
                question: 'Mercury retrograde is best used for:',
                options: ['Starting all new projects', 'Reviewing, revising, and reconnecting', 'Ignoring communication', 'Traveling recklessly'],
                correctIndex: 1,
                explanation: 'Mercury retrograde favors "re-" activities: review, revise, reconnect, rethink. It\'s a period for looking back, not pushing forward.'
              },
              {
                id: 'q2-frequency',
                question: 'Mercury retrograde occurs:',
                options: ['Once a year', '3-4 times per year for about 3 weeks each', 'Every month', 'Only during eclipses'],
                correctIndex: 1,
                explanation: 'Mercury goes retrograde about 3-4 times per year, each period lasting approximately 3 weeks.'
              }
            ]
          },
          {
            id: 'using-transits',
            title: 'Using Transits for Timing',
            description: 'Practical transit timing for decisions.',
            estimatedMinutes: 2,
            content: [
              { type: 'heading', content: 'Timing With the Stars', level: 2 },
              {
                type: 'text',
                content: 'Beyond Mercury retrograde, you can use transits to time important decisions. This doesn\'t mean waiting for "perfect" timing, but choosing more supportive moments when possible.'
              },
              {
                type: 'concept',
                title: 'Basic Transit Timing',
                content: 'Transits show when certain energies are emphasized. Launching a business during a Jupiter transit to your 10th house is different from launching during a Saturn square.',
                icon: '📆'
              },
              { type: 'heading', content: 'Supportive Transits for New Beginnings', level: 3 },
              {
                type: 'list',
                style: 'bullet',
                items: [
                  'Jupiter transits: Expansion, opportunity, growth',
                  'Venus transits: Relationships, pleasure, aesthetics',
                  'New Moon in relevant house: Fresh starts',
                  'Trine and sextile aspects: Flow and opportunity'
                ]
              },
              { type: 'heading', content: 'Times to Be More Careful', level: 3 },
              {
                type: 'list',
                style: 'bullet',
                items: [
                  'Saturn transits: Require more effort, better for commitments',
                  'Mars transits: Energy but also conflict potential',
                  'Square and opposition aspects: Tension and challenge',
                  'Eclipse seasons: Fated changes, less control'
                ]
              },
              {
                type: 'callout',
                content: 'Don\'t let transit watching paralyze you. Life doesn\'t pause for perfect timing. Use transits as gentle guidance, not strict rules.',
                variant: 'warning'
              },
              { type: 'heading', content: 'Practical Application', level: 3 },
              {
                type: 'text',
                content: 'For major decisions (job changes, moves, launches), check what\'s transiting your relevant houses. But remember: a "bad" transit worked with consciously often yields better results than a "good" transit taken for granted.'
              }
            ],
            quiz: [
              {
                id: 'q1-jupiter',
                question: 'Jupiter transits are generally associated with:',
                options: ['Restriction and delay', 'Expansion and opportunity', 'Conflict and anger', 'Confusion and dissolution'],
                correctIndex: 1,
                explanation: 'Jupiter transits typically bring expansion, opportunity, and growth to the areas of life they touch.'
              },
              {
                id: 'q2-approach',
                question: 'The best approach to transit timing is:',
                options: ['Wait for perfect timing before doing anything', 'Use transits as gentle guidance, not strict rules', 'Ignore all transits', 'Only act during Jupiter transits'],
                correctIndex: 1,
                explanation: 'Transits provide guidance but shouldn\'t paralyze you. Life continues regardless of planetary positions.'
              }
            ]
          }
        ]
      },
      {
        id: 'personal-cycles',
        title: 'Personal Cycles',
        description: 'Your unique astrological timing.',
        lessons: [
          {
            id: 'solar-return',
            title: 'Personal Year Cycles',
            description: 'Solar returns and birthday charts.',
            estimatedMinutes: 2,
            content: [
              { type: 'heading', content: 'Your Personal New Year', level: 2 },
              {
                type: 'text',
                content: 'Your birthday isn\'t just a celebration — it\'s when the Sun returns to its exact birth position, starting a new personal year. This "Solar Return" chart can describe themes for the coming year.'
              },
              {
                type: 'concept',
                title: 'Solar Returns',
                content: 'A Solar Return is a chart cast for the exact moment the Sun returns to its natal position each year. It\'s like a birth chart for your year ahead.',
                icon: '🎂'
              },
              { type: 'heading', content: 'Reading Solar Returns (Simplified)', level: 3 },
              {
                type: 'list',
                style: 'bullet',
                items: [
                  'Rising sign: Your approach and focus this year',
                  'Sun\'s house: Main area of life emphasis',
                  'Moon\'s sign and house: Emotional themes',
                  'Major aspects: Key dynamics to work with',
                  'Planets in angles: Especially prominent themes'
                ]
              },
              { type: 'heading', content: 'Birthday Rituals', level: 3 },
              {
                type: 'text',
                content: 'Many people set intentions on their birthday, consciously or not. Astrology gives structure to this: review the past year, look at your Solar Return, set intentions aligned with incoming themes.'
              },
              {
                type: 'callout',
                content: 'Your Solar Return chart changes based on where you are at the exact moment of your birthday. Some astrologers travel to change their Solar Return!',
                variant: 'info'
              },
              { type: 'heading', content: 'Monthly and Daily Cycles', level: 3 },
              {
                type: 'list',
                style: 'bullet',
                items: [
                  'Lunar Return (monthly): Moon returns to natal position every ~27 days',
                  'Mercury Return: Good for intellectual/communication review',
                  'Venus Return: Relationship and value themes',
                  'These shorter cycles offer regular check-in points'
                ]
              }
            ],
            quiz: [
              {
                id: 'q1-solar-return',
                question: 'A Solar Return chart is cast for:',
                options: ['January 1st each year', 'The exact moment the Sun returns to its natal position', 'Every New Moon', 'Only during eclipses'],
                correctIndex: 1,
                explanation: 'A Solar Return is calculated for the precise moment the Sun returns to its birth position — your true personal New Year.'
              },
              {
                id: 'q2-sr-reading',
                question: 'In a Solar Return chart, the Sun\'s house shows:',
                options: ['Your personality permanently changing', 'The main area of life emphasis for the coming year', 'Nothing important', 'Your natal chart changing'],
                correctIndex: 1,
                explanation: 'The Sun\'s house in a Solar Return indicates where you\'ll focus energy and attention in the year ahead.'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'reading-for-others',
    title: 'Reading for Others',
    description: 'Ethics, boundaries, and best practices for giving astrological readings to other people.',
    difficulty: 'advanced',
    estimatedMinutes: 10,
    icon: '💼',
    modules: [
      {
        id: 'ethics',
        title: 'Ethics & Responsibility',
        description: 'The responsibilities of reading for others.',
        lessons: [
          {
            id: 'empowering-readings',
            title: 'How to Give Empowering Readings',
            description: 'Making readings helpful, not harmful.',
            estimatedMinutes: 2,
            content: [
              { type: 'heading', content: 'The Reader\'s Responsibility', level: 2 },
              {
                type: 'text',
                content: 'When you read someone\'s chart, you have influence over how they see themselves. This is a profound responsibility. Your words can heal or harm, empower or limit.'
              },
              {
                type: 'concept',
                title: 'The Core Principle',
                content: 'An empowering reading helps someone understand themselves better and feel more capable of navigating their life. A disempowering reading leaves them feeling stuck, scared, or hopeless.',
                icon: '💪'
              },
              { type: 'heading', content: 'Empowering Reading Practices', level: 3 },
              {
                type: 'list',
                style: 'bullet',
                items: [
                  'Focus on potential, not just problems',
                  'Frame challenges as growth opportunities',
                  'Offer multiple ways a placement might manifest',
                  'Emphasize free will and choice',
                  'Ask questions rather than making declarations',
                  'Check in: "Does this resonate?"'
                ]
              },
              { type: 'heading', content: 'Language Matters', level: 3 },
              {
                type: 'list',
                style: 'bullet',
                items: [
                  'Say "may" and "might" rather than "will"',
                  'Say "this energy can manifest as..." rather than "you are..."',
                  'Say "one expression of this is..." rather than "this means..."',
                  'Say "this suggests an opportunity to develop..." rather than "you lack..."'
                ]
              },
              {
                type: 'callout',
                content: 'People remember what astrologers tell them for years, sometimes decades. Speak as if your words will echo in their mind forever — because they might.',
                variant: 'warning'
              }
            ],
            quiz: [
              {
                id: 'q1-empowering',
                question: 'An empowering reading:',
                options: ['Only tells positive things', 'Helps someone understand themselves and feel more capable', 'Predicts exactly what will happen', 'Avoids all challenges in the chart'],
                correctIndex: 1,
                explanation: 'Empowering readings help people understand themselves better and feel equipped to navigate their lives — including challenges.'
              },
              {
                id: 'q2-language',
                question: 'When describing chart placements, it\'s best to say:',
                options: ['"You are..." (declarative)', '"This energy can manifest as..." (possibility)', '"This will definitely happen"', '"Your chart is bad"'],
                correctIndex: 1,
                explanation: 'Using possibility language honors free will and the multiple ways any placement can manifest.'
              }
            ]
          },
          {
            id: 'what-not-to-say',
            title: 'What NOT to Say',
            description: 'Topics to avoid or handle with extreme care.',
            estimatedMinutes: 2,
            content: [
              { type: 'heading', content: 'Dangerous Territory', level: 2 },
              {
                type: 'text',
                content: 'Some topics require extreme caution or should be avoided entirely in readings. Getting these wrong can cause serious harm.'
              },
              {
                type: 'concept',
                title: 'The No-Go Zone',
                content: 'Predicting death, serious illness, or other traumatic events is not appropriate in readings — even if you think you see something. The potential for harm far outweighs any benefit.',
                icon: '🚫'
              },
              { type: 'heading', content: 'Topics to Avoid or Handle Carefully', level: 3 },
              {
                type: 'list',
                style: 'bullet',
                items: [
                  'Death timing: NEVER predict when someone or their loved ones will die',
                  'Health diagnoses: You\'re not a doctor; don\'t play one',
                  'Absolute predictions: "You will never marry" or "You will definitely get divorced"',
                  'Doom and gloom: Excessive focus on challenges without growth framing',
                  'Psychological diagnoses: Leave mental health to professionals',
                  'Criminal predictions: "You\'ll be betrayed" or "Your partner is cheating"'
                ]
              },
              {
                type: 'callout',
                content: 'If someone asks "when will I die?" or "will I get cancer?" — the answer is always "Astrology isn\'t appropriate for those questions. Please speak with a medical professional."',
                variant: 'warning'
              },
              { type: 'heading', content: 'Why This Matters', level: 3 },
              {
                type: 'list',
                style: 'bullet',
                items: [
                  'Predictions can become self-fulfilling prophecies',
                  'Chart indications don\'t guarantee specific outcomes',
                  'You might be wrong — with devastating consequences',
                  'Vulnerable people are especially susceptible to harmful predictions',
                  'Legal and ethical liability'
                ]
              },
              { type: 'heading', content: 'The Rule', level: 3 },
              {
                type: 'text',
                content: 'When in doubt, don\'t. If sharing something would cause fear or despair without any constructive action the person can take, keep it to yourself.'
              }
            ],
            quiz: [
              {
                id: 'q1-death',
                question: 'Predicting timing of death in a reading is:',
                options: ['Fine if you see it clearly', 'Never appropriate', 'Only okay for elderly clients', 'Required for complete readings'],
                correctIndex: 1,
                explanation: 'Never predict death timing. The potential for harm far outweighs any possible benefit.'
              },
              {
                id: 'q2-health',
                question: 'When a client asks about health issues in their chart:',
                options: ['Diagnose them based on the chart', 'Tell them they\'ll definitely get sick', 'Recommend they speak with medical professionals', 'Prescribe treatments'],
                correctIndex: 2,
                explanation: 'Health matters belong to medical professionals. Astrologers should not diagnose or predict specific health outcomes.'
              }
            ]
          }
        ]
      },
      {
        id: 'practice',
        title: 'Practice & Boundaries',
        description: 'Professional practices for reading others.',
        lessons: [
          {
            id: 'boundaries',
            title: 'Setting Boundaries as a Reader',
            description: 'Protecting yourself and your clients.',
            estimatedMinutes: 2,
            content: [
              { type: 'heading', content: 'Healthy Boundaries', level: 2 },
              {
                type: 'text',
                content: 'Reading for others requires clear boundaries — for your sake and theirs. Without boundaries, readings can become draining, codependent, or harmful.'
              },
              { type: 'heading', content: 'Boundaries to Establish', level: 3 },
              {
                type: 'list',
                style: 'bullet',
                items: [
                  'What topics you will/won\'t cover',
                  'How long readings last',
                  'How often you\'ll read for the same person',
                  'Whether you read for friends/family (complex dynamics)',
                  'How available you are between sessions',
                  'What qualifies as a question (vs. therapy, medical, legal advice)'
                ]
              },
              {
                type: 'concept',
                title: 'The Dependency Trap',
                content: 'Some clients want astrologers to make all their decisions. This is unhealthy for everyone. Your job is to illuminate possibilities, not run their life.',
                icon: '⚠️'
              },
              { type: 'heading', content: 'Signs of Boundary Issues', level: 3 },
              {
                type: 'list',
                style: 'bullet',
                items: [
                  'Client contacts you constantly between sessions',
                  'Client won\'t make decisions without consulting you',
                  'You feel drained after every reading',
                  'Client expects you to be their therapist',
                  'You\'re pulled into their drama'
                ]
              },
              {
                type: 'callout',
                content: '"I\'m an astrologer, not a therapist/doctor/financial advisor. For that kind of support, I recommend speaking with [appropriate professional]."',
                variant: 'tip'
              }
            ],
            quiz: [
              {
                id: 'q1-dependency',
                question: 'If a client won\'t make decisions without consulting you:',
                options: ['You\'re a great astrologer', 'This is a boundary/dependency issue that should be addressed', 'Read for them more often', 'Take over their life decisions'],
                correctIndex: 1,
                explanation: 'Dependency is unhealthy. Clients should use readings for insight, not outsource all decision-making.'
              },
              {
                id: 'q2-boundaries',
                question: 'Clear boundaries in readings:',
                options: ['Are rude to clients', 'Protect both reader and client', 'Mean you can\'t be helpful', 'Are only for professional astrologers'],
                correctIndex: 1,
                explanation: 'Boundaries protect everyone involved. They create a healthy container for the work.'
              }
            ]
          },
          {
            id: 'when-to-refer',
            title: 'When to Refer Out',
            description: 'Recognizing when someone needs different help.',
            estimatedMinutes: 2,
            content: [
              { type: 'heading', content: 'Knowing Your Limits', level: 2 },
              {
                type: 'text',
                content: 'Astrology is powerful, but it\'s not everything. Knowing when to refer someone to a different kind of professional is essential skill.'
              },
              { type: 'heading', content: 'Refer to Mental Health Professionals When:', level: 3 },
              {
                type: 'list',
                style: 'bullet',
                items: [
                  'Client shows signs of severe depression or anxiety',
                  'Client mentions self-harm or suicidal thoughts (this is urgent)',
                  'Client is in crisis',
                  'Client is using astrology to avoid dealing with trauma',
                  'Client needs ongoing emotional support you can\'t provide'
                ]
              },
              {
                type: 'callout',
                content: 'If someone expresses suicidal thoughts, take it seriously. Provide crisis resources and encourage them to seek immediate help. This is not an astrology matter.',
                variant: 'warning'
              },
              { type: 'heading', content: 'Refer to Other Professionals When:', level: 3 },
              {
                type: 'list',
                style: 'bullet',
                items: [
                  'Medical questions: Doctors',
                  'Legal questions: Lawyers',
                  'Financial questions: Financial advisors',
                  'Relationship crises: Couples therapists',
                  'Spiritual emergencies: Appropriate spiritual care providers'
                ]
              },
              { type: 'heading', content: 'How to Refer', level: 3 },
              {
                type: 'text',
                content: 'Be kind but clear: "I\'m noticing this is beyond what astrology can address. It sounds like you might benefit from talking to [type of professional]. Would you like some resources?" Have referral lists ready.'
              },
              {
                type: 'concept',
                title: 'Consent and Responsibility',
                content: 'You\'re not responsible for "fixing" everyone who comes to you. You ARE responsible for not pretending to offer help you\'re not qualified to give.',
                icon: '🤝'
              }
            ],
            quiz: [
              {
                id: 'q1-mental-health',
                question: 'If a client mentions suicidal thoughts:',
                options: ['Look for it in their chart', 'Provide crisis resources and encourage immediate help', 'Ignore it and continue reading', 'Predict when they\'ll feel better'],
                correctIndex: 1,
                explanation: 'Suicidal thoughts require immediate referral to crisis resources. This is not an astrology matter.'
              },
              {
                id: 'q2-limits',
                question: 'Referring clients to other professionals:',
                options: ['Means you\'re a bad astrologer', 'Is responsible practice that protects everyone', 'Should never happen', 'Makes you legally liable'],
                correctIndex: 1,
                explanation: 'Knowing your limits and referring appropriately is a sign of ethical, responsible practice.'
              }
            ]
          },
          {
            id: 'structuring-readings',
            title: 'Structuring a Reading',
            description: 'How to organize and pace an effective reading.',
            estimatedMinutes: 2,
            content: [
              { type: 'heading', content: 'The Flow of a Reading', level: 2 },
              {
                type: 'text',
                content: 'A well-structured reading feels like a journey. You guide the person from broad overview to specific details, creating a coherent narrative rather than a random list of placements.'
              },
              {
                type: 'concept',
                title: 'Opening: Set the Container',
                content: 'Start by asking what they want to focus on. Clarify what astrology can and can\'t do. Set the tone: curious exploration, not fortune-telling.',
                icon: '🚪'
              },
              {
                type: 'concept',
                title: 'Overview: The Big Picture',
                content: 'Begin with the Big Three (Sun, Moon, Rising). Give them the "headline" of their chart. This orients them before diving into details.',
                icon: '🗺️'
              },
              {
                type: 'concept',
                title: 'Focus Area: Go Deep',
                content: 'Based on their questions, explore relevant planets, houses, and aspects. Connect everything back to their life. Ask questions to confirm relevance.',
                icon: '🔍'
              },
              {
                type: 'concept',
                title: 'Integration: Tie It Together',
                content: 'Summarize the key themes. Offer practical suggestions. End with encouragement and empowerment. Ask if they have questions.',
                icon: '🎁'
              },
              {
                type: 'list',
                style: 'bullet',
                items: [
                  'Allow 60-90 minutes for a full reading',
                  'Check in regularly: "Does this resonate?"',
                  'Leave time for questions at the end',
                  'Provide written notes or recording if possible'
                ]
              }
            ],
            quiz: [
              {
                id: 'q1-structure',
                question: 'A well-structured reading should:',
                options: ['Jump around randomly between placements', 'Move from big picture to specific details', 'Only discuss positive things', 'Last exactly 30 minutes'],
                correctIndex: 1,
                explanation: 'Good readings flow from overview to specifics, creating a coherent narrative the person can follow and remember.'
              }
            ]
          },
          {
            id: 'practice-skills',
            title: 'Building Your Reading Skills',
            description: 'How to practice and improve your chart reading abilities.',
            estimatedMinutes: 2,
            content: [
              { type: 'heading', content: 'Practice Makes Progress', level: 2 },
              {
                type: 'text',
                content: 'Reading charts well requires practice. The good news: there are many ways to practice without pressure, building your confidence and skill over time.'
              },
              {
                type: 'concept',
                title: 'Practice on Yourself',
                content: 'Your own chart is your best teacher. Keep returning to it. Notice how transits feel. Track when themes from your chart show up in life.',
                icon: '🪞'
              },
              {
                type: 'concept',
                title: 'Study Famous Charts',
                content: 'Celebrity and historical figure charts let you see how placements manifest in known lives. Compare what you\'d predict with what actually happened.',
                icon: '⭐'
              },
              {
                type: 'concept',
                title: 'Practice with Friends',
                content: 'Ask friends if you can read their charts for practice. Be honest that you\'re learning. Their feedback is invaluable for understanding how your words land.',
                icon: '👥'
              },
              {
                type: 'concept',
                title: 'Keep a Learning Journal',
                content: 'Write down insights, questions, and "aha" moments. Note which techniques work best for you. Track your progress over time.',
                icon: '📓'
              },
              {
                type: 'callout',
                content: 'Every astrologer was once a beginner. Give yourself permission to learn. The chart will teach you if you stay curious.',
                variant: 'tip'
              }
            ],
            quiz: [
              {
                id: 'q1-practice',
                question: 'The best way to improve at chart reading is to:',
                options: ['Only read your own chart', 'Never practice until you\'re perfect', 'Practice regularly on various charts with curiosity', 'Memorize every astrology book'],
                correctIndex: 2,
                explanation: 'Regular practice on various charts - your own, friends\', and famous people\'s - builds skill and confidence over time.'
              }
            ]
          },
          {
            id: 'getting-feedback',
            title: 'Getting & Using Feedback',
            description: 'How to learn from the people you read for.',
            estimatedMinutes: 2,
            content: [
              { type: 'heading', content: 'Feedback as a Teacher', level: 2 },
              {
                type: 'text',
                content: 'The people you read for are your greatest teachers. Their feedback shows you what lands, what misses, and how to communicate more effectively.'
              },
              {
                type: 'concept',
                title: 'Ask During the Reading',
                content: '"Does this resonate?" "How does this show up for you?" "What part of this feels most true?" Real-time feedback keeps you on track.',
                icon: '❓'
              },
              {
                type: 'concept',
                title: 'Follow Up Later',
                content: 'Check in weeks or months later. Did the themes prove relevant? Were your predictions accurate? Long-term feedback is the most valuable.',
                icon: '📅'
              },
              {
                type: 'concept',
                title: 'Handle Misses Gracefully',
                content: 'Not everything will land. When something doesn\'t resonate, get curious rather than defensive. "Tell me more about how you experience that."',
                icon: '🎯'
              },
              {
                type: 'list',
                style: 'bullet',
                items: [
                  'Ask what was most helpful in the reading',
                  'Ask what they\'ll remember most',
                  'Ask if anything didn\'t fit',
                  'Use misses as learning opportunities'
                ]
              },
              {
                type: 'callout',
                content: 'A "miss" isn\'t failure - it\'s data. Maybe the placement manifests differently than expected, or you need to refine your interpretation.',
                variant: 'info'
              }
            ],
            quiz: [
              {
                id: 'q1-feedback',
                question: 'When something in a reading doesn\'t resonate:',
                options: ['Insist you\'re right', 'Get curious and explore why', 'Blame the client', 'Never try again'],
                correctIndex: 1,
                explanation: 'When something doesn\'t land, getting curious helps you understand the placement better and improve future readings.'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'professional-practice',
    title: 'Professional Astrology Practice',
    description: 'Everything you need to launch and run a successful astrology practice - from pricing and marketing to client management and teaching.',
    difficulty: 'advanced',
    estimatedMinutes: 45,
    icon: '🏆',
    modules: [
      {
        id: 'building-practice',
        title: 'Building Your Practice',
        description: 'Set up and grow your astrology business.',
        lessons: [
          {
            id: 'going-professional',
            title: 'Going Professional',
            description: 'Making the transition from hobbyist to professional astrologer.',
            estimatedMinutes: 3,
            content: [
              { type: 'heading', content: 'From Passion to Profession', level: 2 },
              {
                type: 'chat',
                messages: [
                  { role: 'student', content: "I love doing readings for friends. How do I know if I'm ready to go professional?" },
                  { role: 'guide', content: "Great question! There's no official certification required, but there are signs of readiness: consistent accuracy, positive feedback, people seeking you out, and a genuine desire to help others through this work." },
                  { role: 'student', content: "But I don't feel like an expert yet..." },
                  { role: 'guide', content: "Here's a secret: most professionals don't either! Astrology is so vast that even lifetime practitioners keep learning. What matters is being skilled enough to help clients AND honest about what you don't know." }
                ]
              },
              {
                type: 'text',
                content: 'Going professional means taking responsibility for the quality and ethics of your work. It means showing up consistently, honoring your commitments, and treating each reading as sacred.'
              },
              {
                type: 'concept',
                title: 'Signs You\'re Ready',
                content: 'You\'ve done 50+ readings with positive feedback. You have a consistent interpretation method. You handle sensitive topics gracefully. You know when to refer out. You\'re excited to do this work.',
                icon: '✅'
              },
              {
                type: 'concept',
                title: 'Minimum Viable Skills',
                content: 'Solid natal chart interpretation. Basic transit understanding. Clear communication skills. Ethical framework. Ability to structure a reading. Some specialty focus helps too.',
                icon: '📚'
              },
              {
                type: 'list',
                style: 'bullet',
                items: [
                  'You don\'t need to know everything - specialization is okay',
                  'Continuous learning is part of the job',
                  'Confidence comes from practice, not perfection',
                  'Imposter syndrome is normal - work through it'
                ]
              },
              {
                type: 'callout',
                content: 'Being professional doesn\'t mean being perfect. It means being skilled, ethical, and committed to serving your clients well.',
                variant: 'tip'
              }
            ],
            quiz: [
              {
                id: 'q1-ready',
                question: 'To go professional, you need:',
                options: ['To know absolutely everything about astrology', 'Solid skills, ethical practice, and commitment to learning', 'An official certification', 'At least 10 years of experience'],
                correctIndex: 1,
                explanation: 'Professionalism comes from solid skills, ethical practice, and ongoing learning - not from knowing everything or having decades of experience.'
              }
            ]
          },
          {
            id: 'pricing-services',
            title: 'Pricing Your Services',
            description: 'How to set prices that value your work and attract clients.',
            estimatedMinutes: 3,
            content: [
              { type: 'heading', content: 'The Money Conversation', level: 2 },
              {
                type: 'text',
                content: 'Many astrologers struggle with pricing. We love helping people and may feel awkward charging for spiritual work. But undervaluing your services hurts both you and the profession.'
              },
              {
                type: 'concept',
                title: 'Factors That Determine Pricing',
                content: 'Your experience level. Your local market. Your specialty. Session length. Preparation time. Your cost of living. What similar practitioners charge.',
                icon: '💰'
              },
              {
                type: 'concept',
                title: 'Starting Rates (UK Guidelines)',
                content: 'New professionals: £40-70/hour. Established readers: £80-150/hour. Specialists/experts: £150-300+/hour. These vary by location and specialty.',
                icon: '💷'
              },
              {
                type: 'list',
                style: 'bullet',
                items: [
                  'Include preparation time in your pricing - chart analysis takes time',
                  'Offer different session lengths (30min/60min/90min)',
                  'Consider package deals for returning clients',
                  'Review and raise prices annually as you grow',
                  'Don\'t apologize for your prices'
                ]
              },
              {
                type: 'concept',
                title: 'Sliding Scale Options',
                content: 'Some practitioners offer sliding scale or scholarship slots to ensure accessibility. This can be 10-20% of your practice at reduced rates. It\'s generous AND sustainable.',
                icon: '❤️'
              },
              {
                type: 'callout',
                content: 'If you\'re fully booked at your current rate, it\'s time to raise prices. If you have no clients, you may be priced too high for your market/experience level.',
                variant: 'info'
              }
            ],
            quiz: [
              {
                id: 'q1-pricing',
                question: 'When setting prices, you should:',
                options: ['Always be the cheapest option', 'Never charge for spiritual work', 'Consider experience, market, and sustainability', 'Copy exactly what others charge'],
                correctIndex: 2,
                explanation: 'Good pricing considers your experience, local market, and what\'s sustainable for you - while remaining accessible and fair.'
              }
            ]
          },
          {
            id: 'service-offerings',
            title: 'Designing Your Service Menu',
            description: 'Creating offerings that serve clients and showcase your skills.',
            estimatedMinutes: 3,
            content: [
              { type: 'heading', content: 'What Will You Offer?', level: 2 },
              {
                type: 'text',
                content: 'Most astrologers offer multiple services at different price points. This serves different client needs and creates multiple entry points to your work.'
              },
              {
                type: 'concept',
                title: 'Core Reading Types',
                content: 'Natal Chart Reading: Your foundational offering. Birth Time Rectification: For clients with unknown birth times. Transit/Forecast Readings: What\'s coming up. Solar Return: Birthday year ahead readings.',
                icon: '📋'
              },
              {
                type: 'concept',
                title: 'Relationship Services',
                content: 'Synastry Readings: Comparing two charts. Composite Chart Analysis: The relationship itself. Family Dynamics: Multiple family members. Business Partnership Compatibility.',
                icon: '💕'
              },
              {
                type: 'concept',
                title: 'Specialty Services',
                content: 'Career/Vocational Astrology. Relocation Astrology. Electional Astrology (choosing dates). Children\'s Charts. Past Life/Karmic Focus. Medical Astrology (with appropriate disclaimers).',
                icon: '⭐'
              },
              {
                type: 'list',
                style: 'bullet',
                items: [
                  'Start with 2-3 offerings, expand as you grow',
                  'Consider a "signature" reading that showcases your unique approach',
                  'Written reports can be passive income',
                  'Packages and bundles increase client commitment',
                  'Follow-up sessions should be discounted from full readings'
                ]
              },
              {
                type: 'callout',
                content: 'You don\'t have to offer everything. Specializing in 2-3 areas makes you more memorable and referable.',
                variant: 'tip'
              }
            ],
            quiz: [
              {
                id: 'q1-services',
                question: 'When designing your service menu:',
                options: ['Offer every possible type of reading', 'Focus on 2-3 areas you do well', 'Only offer free readings', 'Copy another astrologer\'s menu exactly'],
                correctIndex: 1,
                explanation: 'Focusing on a few offerings you excel at makes you more memorable and builds expertise faster than trying to do everything.'
              }
            ]
          },
          {
            id: 'finding-clients',
            title: 'Finding & Attracting Clients',
            description: 'Marketing strategies that feel authentic.',
            estimatedMinutes: 4,
            content: [
              { type: 'heading', content: 'Building Your Client Base', level: 2 },
              {
                type: 'text',
                content: 'Marketing yourself as an astrologer doesn\'t mean being salesy or inauthentic. The best marketing is simply sharing your genuine passion and expertise in ways that reach people who need it.'
              },
              {
                type: 'concept',
                title: 'Word of Mouth',
                content: 'The most powerful marketing. Do excellent work and ask satisfied clients to refer friends. Make it easy: "If you know anyone who might benefit from this, I\'d appreciate the referral."',
                icon: '🗣️'
              },
              {
                type: 'concept',
                title: 'Social Media Presence',
                content: 'Share insights about current transits. Post educational content. Show your personality. Engage authentically. You don\'t need to be everywhere - pick 1-2 platforms you enjoy.',
                icon: '📱'
              },
              {
                type: 'concept',
                title: 'Content Marketing',
                content: 'Blog posts, YouTube videos, podcasts, newsletters. Free content showcases your knowledge and builds trust. People hire astrologers they feel they already know.',
                icon: '✍️'
              },
              {
                type: 'concept',
                title: 'Collaborations',
                content: 'Partner with therapists, coaches, yoga studios. Guest on podcasts. Teach workshops at bookshops or wellness centers. Cross-promotion expands your reach.',
                icon: '🤝'
              },
              {
                type: 'list',
                style: 'bullet',
                items: [
                  'Consistency matters more than perfection',
                  'Show your unique perspective - don\'t just repeat basics',
                  'Respond to comments and messages promptly',
                  'Collect testimonials (with permission)',
                  'Make booking easy and obvious'
                ]
              },
              {
                type: 'callout',
                content: 'The best marketing doesn\'t feel like marketing. It\'s sharing what you love with people who want to hear it.',
                variant: 'tip'
              }
            ],
            quiz: [
              {
                id: 'q1-marketing',
                question: 'The most effective marketing for astrologers is usually:',
                options: ['Paid advertising', 'Cold calling', 'Word of mouth and authentic content sharing', 'Aggressive sales tactics'],
                correctIndex: 2,
                explanation: 'Word of mouth and genuine content sharing build trust and attract clients who resonate with your specific approach.'
              }
            ]
          },
          {
            id: 'online-vs-inperson',
            title: 'Online vs. In-Person Readings',
            description: 'Choosing and optimizing your delivery method.',
            estimatedMinutes: 2,
            content: [
              { type: 'heading', content: 'How Will You Deliver Readings?', level: 2 },
              {
                type: 'text',
                content: 'The rise of video calls has made astrology more accessible than ever. Most practitioners now work primarily online, but in-person readings have their own magic.'
              },
              {
                type: 'comparison',
                title: 'Online vs In-Person',
                items: [
                  { label: 'Reach', left: 'Online: Global client base', right: 'In-Person: Local only' },
                  { label: 'Convenience', left: 'Online: Easy scheduling', right: 'In-Person: Travel required' },
                  { label: 'Connection', left: 'Online: Good with practice', right: 'In-Person: Natural intimacy' },
                  { label: 'Tools', left: 'Online: Screen share charts', right: 'In-Person: Printed charts' }
                ]
              },
              {
                type: 'concept',
                title: 'Online Best Practices',
                content: 'Use reliable video software (Zoom, Google Meet). Have good lighting and audio. Test technology before sessions. Have backup plan if tech fails. Screen share the chart. Record for clients (with consent).',
                icon: '💻'
              },
              {
                type: 'concept',
                title: 'In-Person Considerations',
                content: 'Choose a quiet, private space. Consider meeting in public for safety. Have printed charts ready. Create ambiance (lighting, comfort). Be mindful of scents (some are sensitive).',
                icon: '🏠'
              },
              {
                type: 'callout',
                content: 'Many astrologers offer both options. Online for convenience and reach, in-person for local clients who prefer it.',
                variant: 'info'
              }
            ],
            quiz: [
              {
                id: 'q1-delivery',
                question: 'Online readings compared to in-person:',
                options: ['Are always inferior', 'Offer global reach and convenience', 'Don\'t work for astrology', 'Require no preparation'],
                correctIndex: 1,
                explanation: 'Online readings offer global reach and convenience while still allowing meaningful connection with proper setup and practice.'
              }
            ]
          }
        ]
      },
      {
        id: 'advanced-client-skills',
        title: 'Advanced Client Skills',
        description: 'Handle any client situation with grace and skill.',
        lessons: [
          {
            id: 'difficult-questions',
            title: 'Handling Difficult Questions',
            description: 'What to do when clients ask about death, illness, or other sensitive topics.',
            estimatedMinutes: 3,
            content: [
              { type: 'heading', content: 'The Hard Questions', level: 2 },
              {
                type: 'text',
                content: 'Clients will ask difficult questions: "When will I die?" "Will my marriage last?" "Will I get the job?" How you handle these reveals your professionalism and ethics.'
              },
              {
                type: 'concept',
                title: 'Questions About Death',
                content: 'Never predict death. Even if you see challenging transits, death is not predictable from a chart. Redirect: "Astrology shows life themes, not death timing. Let\'s focus on living fully."',
                icon: '⚠️'
              },
              {
                type: 'concept',
                title: 'Health Questions',
                content: 'You are not a doctor. Point out 6th house themes or health-related transits, but always defer to medical professionals. "I see a focus on health this year - it\'s a good time to prioritize check-ups."',
                icon: '🏥'
              },
              {
                type: 'concept',
                title: 'Outcome Questions',
                content: '"Will I get the job/partner/house?" Astrology shows timing and themes, not guaranteed outcomes. Redirect to empowerment: "The energy supports taking action. What you do with it matters."',
                icon: '🔮'
              },
              {
                type: 'list',
                style: 'bullet',
                items: [
                  'Never claim to predict specific outcomes with certainty',
                  'Redirect doom-seeking to empowerment',
                  'It\'s okay to say "I don\'t know" or "That\'s beyond what astrology can answer"',
                  'Focus on what they CAN influence, not what they fear',
                  'If someone is obsessively seeking predictions, explore why'
                ]
              },
              {
                type: 'callout',
                content: 'The goal is insight and empowerment, not fortune-telling. If a client wants certainty about the future, gently explain what astrology can and cannot do.',
                variant: 'warning'
              }
            ],
            quiz: [
              {
                id: 'q1-death',
                question: 'If a client asks when they will die, you should:',
                options: ['Make a prediction based on difficult transits', 'Refuse to answer and redirect to living fully', 'Tell them to ask someone else', 'Make something up to reassure them'],
                correctIndex: 1,
                explanation: 'Never predict death. Redirect the conversation toward living fully and making the most of their time.'
              }
            ]
          },
          {
            id: 'emotional-sessions',
            title: 'Managing Emotional Sessions',
            description: 'What to do when clients cry, get angry, or have strong reactions.',
            estimatedMinutes: 3,
            content: [
              { type: 'heading', content: 'When Emotions Run High', level: 2 },
              {
                type: 'text',
                content: 'Readings often touch deep places. Clients may cry, express anger, or have powerful realizations. Your job is to hold space, not fix them.'
              },
              {
                type: 'concept',
                title: 'When Clients Cry',
                content: 'This is normal and often healing. Pause. Offer tissues. Say "Take your time." Don\'t rush to fill silence. Crying often means something important is being processed.',
                icon: '💧'
              },
              {
                type: 'concept',
                title: 'When Clients Get Defensive',
                content: 'Sometimes truth hits a nerve. If they push back, don\'t argue. "I hear that this doesn\'t resonate for you. Let\'s explore it differently." Their resistance is data, not failure.',
                icon: '🛡️'
              },
              {
                type: 'concept',
                title: 'When Clients Seek Validation',
                content: 'Some clients want you to confirm what they\'ve already decided. Your job is truth, not agreement. "I understand you want X. Here\'s what the chart shows..."',
                icon: '✓'
              },
              {
                type: 'concept',
                title: 'Your Own Regulation',
                content: 'You must stay regulated to help them. If you\'re absorbing their emotions, you can\'t serve them. Ground yourself before sessions. Take breaks between clients.',
                icon: '🧘'
              },
              {
                type: 'list',
                style: 'bullet',
                items: [
                  'Silence is okay - don\'t rush to fill it',
                  'You\'re not their therapist - hold space, don\'t process their trauma',
                  'End sessions on an empowering note when possible',
                  'Check in after intense sessions',
                  'Protect your own energy with clear boundaries'
                ]
              }
            ],
            quiz: [
              {
                id: 'q1-crying',
                question: 'When a client cries during a reading:',
                options: ['Rush to change the subject', 'Hold space and let them process', 'Tell them to stop being emotional', 'End the session immediately'],
                correctIndex: 1,
                explanation: 'Crying often indicates deep processing. Hold space, pause, and let them take the time they need.'
              }
            ]
          },
          {
            id: 'managing-expectations',
            title: 'Managing Client Expectations',
            description: 'Setting up readings for success from the start.',
            estimatedMinutes: 2,
            content: [
              { type: 'heading', content: 'Starting Right', level: 2 },
              {
                type: 'text',
                content: 'Many reading problems stem from mismatched expectations. Setting clear expectations upfront prevents disappointment and creates better outcomes.'
              },
              {
                type: 'concept',
                title: 'Before the Session',
                content: 'Send an intake form asking what they want to focus on. Explain what your reading includes (and doesn\'t). Confirm logistics: time, platform, payment.',
                icon: '📝'
              },
              {
                type: 'concept',
                title: 'Opening the Session',
                content: 'Briefly explain your approach. Ask what\'s most important to them. Clarify what astrology can and can\'t do. Set the container for the work.',
                icon: '🚪'
              },
              {
                type: 'list',
                style: 'bullet',
                items: [
                  'Be clear about what you offer in your marketing',
                  'Have a pre-session questionnaire',
                  'Don\'t promise what you can\'t deliver',
                  'Explain your style before diving in',
                  'Check their main question/intention at the start'
                ]
              },
              {
                type: 'callout',
                content: '"Before we begin, I want you to know that I focus on [your approach]. I won\'t [thing you don\'t do]. Is there anything specific you\'re hoping to explore today?"',
                variant: 'tip'
              }
            ],
            quiz: [
              {
                id: 'q1-expectations',
                question: 'Managing expectations should happen:',
                options: ['Only if there\'s a problem', 'Before and at the start of the reading', 'Never - just wing it', 'Only with difficult clients'],
                correctIndex: 1,
                explanation: 'Setting expectations before and at the start of every reading prevents misunderstandings and creates better outcomes.'
              }
            ]
          },
          {
            id: 'client-retention',
            title: 'Building Long-Term Client Relationships',
            description: 'Turn one-time clients into returning ones.',
            estimatedMinutes: 2,
            content: [
              { type: 'heading', content: 'Beyond the First Reading', level: 2 },
              {
                type: 'text',
                content: 'A thriving practice is built on returning clients. People who trust you come back for transit readings, solar returns, and new life questions. Nurture these relationships.'
              },
              {
                type: 'concept',
                title: 'Follow-Up System',
                content: 'Email after readings to thank them and share notes/recording. Check in around significant transits you discussed. Birthday emails with solar return highlights.',
                icon: '📬'
              },
              {
                type: 'concept',
                title: 'Suggest Future Sessions',
                content: 'At the end of readings, mention natural follow-up points: "Your Saturn return peaks in March - that would be a good time for a follow-up" or "Many clients return annually for solar return readings."',
                icon: '📅'
              },
              {
                type: 'concept',
                title: 'Loyalty Incentives',
                content: 'Returning client discounts. Package deals (3 sessions). Priority booking. These reward loyalty and increase commitment.',
                icon: '🎁'
              },
              {
                type: 'list',
                style: 'bullet',
                items: [
                  'Keep notes on each client for future reference',
                  'Remember personal details they\'ve shared',
                  'Be genuinely interested in their journey',
                  'Make rebooking easy',
                  'Send relevant content between sessions'
                ]
              }
            ],
            quiz: [
              {
                id: 'q1-retention',
                question: 'Building long-term client relationships involves:',
                options: ['Only focusing on new clients', 'Follow-up, genuine interest, and making rebooking easy', 'Never contacting them again', 'Pressuring them to rebook'],
                correctIndex: 1,
                explanation: 'Long-term relationships are built through genuine care, helpful follow-up, and making it easy for satisfied clients to return.'
              }
            ]
          }
        ]
      },
      {
        id: 'teaching-astrology',
        title: 'Teaching Astrology',
        description: 'Share your knowledge through workshops, courses, and mentoring.',
        lessons: [
          {
            id: 'why-teach',
            title: 'Why Teach Astrology?',
            description: 'The rewards and responsibilities of astrological education.',
            estimatedMinutes: 2,
            content: [
              { type: 'heading', content: 'Becoming a Teacher', level: 2 },
              {
                type: 'text',
                content: 'Teaching astrology is deeply rewarding. You help others access this profound tool while deepening your own understanding. Teaching also diversifies your income and expands your impact.'
              },
              {
                type: 'concept',
                title: 'Benefits of Teaching',
                content: 'Passive/scalable income (recorded courses). Positions you as an expert. Deepens your own knowledge. Creates community. Different energy than 1:1 readings.',
                icon: '🌟'
              },
              {
                type: 'concept',
                title: 'Teaching vs Reading',
                content: 'Reading is personal and intuitive. Teaching requires structure and clarity. Good readers aren\'t automatically good teachers - it\'s a different skill set.',
                icon: '⚖️'
              },
              {
                type: 'concept',
                title: 'Are You Ready?',
                content: 'You should have solid foundational knowledge. You don\'t need to know everything - you can teach what you\'ve mastered while being honest about your learning edges.',
                icon: '✅'
              },
              {
                type: 'list',
                style: 'bullet',
                items: [
                  'Teaching forces you to articulate what you know intuitively',
                  'Students\' questions reveal gaps in your own understanding',
                  'Start small - a workshop or single topic - before creating a full curriculum',
                  'Teaching is also learning'
                ]
              }
            ],
            quiz: [
              {
                id: 'q1-teach',
                question: 'To teach astrology, you should:',
                options: ['Know absolutely everything', 'Have solid knowledge and willingness to keep learning', 'Never teach until you have 20 years experience', 'Only teach if you have a degree'],
                correctIndex: 1,
                explanation: 'Good teachers have solid foundational knowledge and stay honest about their learning edges - they don\'t need to know everything.'
              }
            ]
          },
          {
            id: 'curriculum-design',
            title: 'Designing Your Curriculum',
            description: 'How to structure effective astrology lessons.',
            estimatedMinutes: 4,
            content: [
              { type: 'heading', content: 'Creating a Learning Path', level: 2 },
              {
                type: 'text',
                content: 'Good curriculum design means meeting students where they are and building knowledge progressively. Random information dumps don\'t create real understanding.'
              },
              {
                type: 'concept',
                title: 'Know Your Audience',
                content: 'Complete beginners? Students with some knowledge? Practitioners wanting to deepen? Each audience needs different content, pace, and depth.',
                icon: '👥'
              },
              {
                type: 'concept',
                title: 'Progressive Building',
                content: 'Each lesson should build on the last. Planets before aspects (can\'t understand Sun-Moon square without knowing Sun and Moon). Simple before complex.',
                icon: '🏗️'
              },
              {
                type: 'concept',
                title: 'Beginner Curriculum',
                content: '1) What is astrology? 2) The zodiac signs 3) The planets 4) The houses 5) Basic aspects 6) Putting it together. This can be a 6-week course or weekend intensive.',
                icon: '📚'
              },
              {
                type: 'concept',
                title: 'Intermediate Topics',
                content: 'Chart patterns. Transits. Progressions. Synastry. Specialized techniques. Each could be its own workshop or module.',
                icon: '📈'
              },
              {
                type: 'list',
                style: 'bullet',
                items: [
                  'Clear learning objectives for each lesson',
                  'Mix of theory and practice in every session',
                  'Use students\' own charts when possible',
                  'Build in review and integration time',
                  'Create handouts and reference materials'
                ]
              }
            ],
            quiz: [
              {
                id: 'q1-curriculum',
                question: 'Effective curriculum design:',
                options: ['Dumps all information at once', 'Builds progressively from simple to complex', 'Skips fundamentals for advanced students', 'Uses the same content for everyone'],
                correctIndex: 1,
                explanation: 'Good curriculum builds progressively, with each lesson building on previous ones, moving from simple to complex.'
              }
            ]
          },
          {
            id: 'teaching-methods',
            title: 'Teaching Methods & Styles',
            description: 'How to accommodate different learning styles.',
            estimatedMinutes: 3,
            content: [
              { type: 'heading', content: 'How People Learn', level: 2 },
              {
                type: 'text',
                content: 'People learn differently. Some need to see it. Some need to hear it. Some need to do it. Good teaching incorporates multiple methods.'
              },
              {
                type: 'concept',
                title: 'Visual Learners',
                content: 'Use chart images, diagrams, and visual aids. Color-coding. Charts on screen or paper. Videos. Mind maps. These learners need to SEE concepts.',
                icon: '👁️'
              },
              {
                type: 'concept',
                title: 'Auditory Learners',
                content: 'Clear verbal explanations. Discussion and Q&A. Stories and examples. Podcasts. These learners need to HEAR concepts explained.',
                icon: '👂'
              },
              {
                type: 'concept',
                title: 'Kinesthetic Learners',
                content: 'Hands-on chart reading practice. Exercises. Writing and note-taking. Movement (acting out planetary energies). These learners need to DO to understand.',
                icon: '✋'
              },
              {
                type: 'list',
                style: 'bullet',
                items: [
                  'Include all three modes in each lesson when possible',
                  'Start with explanation, show examples, then have them practice',
                  'Allow questions throughout, not just at the end',
                  'Use real charts (their own when possible)',
                  'Provide materials for later reference'
                ]
              },
              {
                type: 'callout',
                content: 'The classic teaching formula: Tell them what you\'ll teach. Teach it. Then tell them what you taught. Repetition aids retention.',
                variant: 'tip'
              }
            ],
            quiz: [
              {
                id: 'q1-methods',
                question: 'To reach all learners, you should:',
                options: ['Only lecture verbally', 'Only show images', 'Use visual, auditory, and hands-on methods', 'Let them figure it out themselves'],
                correctIndex: 2,
                explanation: 'Different people learn differently. Incorporating visual, auditory, and hands-on methods reaches more students effectively.'
              }
            ]
          },
          {
            id: 'workshops-courses',
            title: 'Creating Workshops & Courses',
            description: 'From single workshops to comprehensive programs.',
            estimatedMinutes: 3,
            content: [
              { type: 'heading', content: 'Formats for Teaching', level: 2 },
              {
                type: 'text',
                content: 'There are many formats for teaching astrology, from one-time workshops to year-long certification programs. Start with what feels manageable and grow from there.'
              },
              {
                type: 'concept',
                title: 'Single Workshops (1-3 hours)',
                content: 'Great for specific topics: "Understanding Your Saturn Return" or "Mercury Retrograde Survival." Lower commitment for students and you. Good entry point.',
                icon: '📍'
              },
              {
                type: 'concept',
                title: 'Short Courses (4-8 weeks)',
                content: 'Beginner series. Single topic deep dives. Enough time to build real skill. Weekly meetings create momentum and community.',
                icon: '📅'
              },
              {
                type: 'concept',
                title: 'Comprehensive Programs (3-12 months)',
                content: 'Full astrology training. Multiple modules. Certification possible. Higher price point. Transforms students into practitioners.',
                icon: '🎓'
              },
              {
                type: 'concept',
                title: 'Self-Paced Online Courses',
                content: 'Record once, sell forever. More accessible pricing. Reaches global audience. Requires good production quality. Can supplement with live Q&A calls.',
                icon: '💻'
              },
              {
                type: 'list',
                style: 'bullet',
                items: [
                  'Start with a single workshop to test your material',
                  'Get feedback before scaling up',
                  'Live teaching builds community; recorded scales better',
                  'Consider cohort-based courses for accountability',
                  'Price reflects depth and your expertise'
                ]
              }
            ],
            quiz: [
              {
                id: 'q1-formats',
                question: 'The best format to START teaching is:',
                options: ['A year-long certification program', 'A single workshop on a topic you know well', 'A self-paced course with 50 hours of content', 'Nothing until you\'re an expert'],
                correctIndex: 1,
                explanation: 'Starting with a single workshop lets you test your material and build confidence before creating larger programs.'
              }
            ]
          },
          {
            id: 'building-educational-practice',
            title: 'Building an Educational Practice',
            description: 'Turn teaching into a sustainable part of your business.',
            estimatedMinutes: 3,
            content: [
              { type: 'heading', content: 'Teaching as Business', level: 2 },
              {
                type: 'text',
                content: 'Teaching can become a significant part of your income. It requires different marketing than readings, but the fundamentals of building trust and demonstrating value remain the same.'
              },
              {
                type: 'concept',
                title: 'Marketing Your Teaching',
                content: 'Free workshops or webinars as lead magnets. Testimonials from students. Preview content (YouTube, blog). Clear learning outcomes in marketing.',
                icon: '📣'
              },
              {
                type: 'concept',
                title: 'Pricing Education',
                content: 'Workshops: £25-75. Short courses: £150-400. Comprehensive programs: £500-2000+. Consider what transformation you\'re offering.',
                icon: '💰'
              },
              {
                type: 'concept',
                title: 'Platforms & Tools',
                content: 'Zoom for live teaching. Teachable/Kajabi for self-paced courses. Email list for nurturing leads. Calendar tool for scheduling. Payment processor.',
                icon: '🛠️'
              },
              {
                type: 'concept',
                title: 'The Teaching Ladder',
                content: 'Free content → Low-cost workshop → Multi-week course → Comprehensive program → Mentorship. Each step builds trust for the next.',
                icon: '📶'
              },
              {
                type: 'list',
                style: 'bullet',
                items: [
                  'Your teaching reflects your unique perspective - don\'t just copy others',
                  'Gather testimonials and success stories',
                  'Create a clear student journey',
                  'Balance live teaching with scalable content',
                  'Teaching and readings can feed each other'
                ]
              }
            ],
            quiz: [
              {
                id: 'q1-edu-business',
                question: 'Building a teaching practice involves:',
                options: ['Giving everything away free', 'Marketing, clear offerings, and building trust over time', 'Only teaching in person', 'Charging the highest prices possible immediately'],
                correctIndex: 1,
                explanation: 'Building a sustainable teaching practice requires marketing, clear offerings at appropriate prices, and building trust over time.'
              }
            ]
          }
        ]
      },
      {
        id: 'business-operations',
        title: 'Business Operations',
        description: 'The practical side of running an astrology practice.',
        lessons: [
          {
            id: 'legal-setup',
            title: 'Legal & Business Setup',
            description: 'Protecting yourself and running a legitimate business.',
            estimatedMinutes: 3,
            content: [
              { type: 'heading', content: 'The Business Side', level: 2 },
              {
                type: 'text',
                content: 'Running an astrology practice means running a business. Taking care of legal and administrative fundamentals protects you and gives clients confidence.'
              },
              {
                type: 'concept',
                title: 'Business Structure (UK)',
                content: 'Most astrologers start as sole traders (simple, register with HMRC). As you grow, limited company may offer benefits. Consult an accountant for your situation.',
                icon: '🏢'
              },
              {
                type: 'concept',
                title: 'Insurance',
                content: 'Professional liability insurance (errors & omissions) is wise even if not required. Public liability if seeing clients in person. Relatively affordable peace of mind.',
                icon: '🛡️'
              },
              {
                type: 'concept',
                title: 'Disclaimers',
                content: 'Clear disclaimer that astrology is for entertainment/personal growth, not medical/legal/financial advice. Include in contracts and on website. Protects both parties.',
                icon: '📋'
              },
              {
                type: 'concept',
                title: 'Record Keeping',
                content: 'Track income and expenses for taxes. Keep client notes securely (GDPR compliance if in UK/EU). Save contracts and communications.',
                icon: '📁'
              },
              {
                type: 'callout',
                content: 'Consider consulting with an accountant familiar with self-employment. The investment pays for itself in peace of mind and tax optimization.',
                variant: 'tip'
              }
            ],
            quiz: [
              {
                id: 'q1-legal',
                question: 'For legal protection, astrologers should:',
                options: ['Ignore business requirements', 'Register their business, use disclaimers, and consider insurance', 'Only work for free', 'Avoid all paperwork'],
                correctIndex: 1,
                explanation: 'Proper business setup, disclaimers, and insurance protect both you and your clients and create a professional foundation.'
              }
            ]
          },
          {
            id: 'scheduling-booking',
            title: 'Scheduling & Booking Systems',
            description: 'Make booking easy and manage your time well.',
            estimatedMinutes: 2,
            content: [
              { type: 'heading', content: 'Smooth Scheduling', level: 2 },
              {
                type: 'text',
                content: 'A smooth booking process makes a professional impression and saves you countless back-and-forth emails. The right systems let you focus on what you do best: astrology.'
              },
              {
                type: 'concept',
                title: 'Booking Software',
                content: 'Calendly, Acuity, or similar tools let clients see your availability and book themselves. Automatic confirmations and reminders. Integrates with your calendar.',
                icon: '📅'
              },
              {
                type: 'concept',
                title: 'Payment Integration',
                content: 'Collect payment at booking (reduces no-shows). PayPal, Stripe, or Square. Automatic invoices. Clear refund/cancellation policy.',
                icon: '💳'
              },
              {
                type: 'concept',
                title: 'Intake Forms',
                content: 'Collect birth data accurately (date, exact time, city). Ask about focus areas. Health conditions relevant to your practice. Consent acknowledgment.',
                icon: '📝'
              },
              {
                type: 'list',
                style: 'bullet',
                items: [
                  'Buffer time between sessions (at least 15-30 min)',
                  'Set clear working hours - don\'t be available 24/7',
                  'Send reminder 24-48 hours before session',
                  'Have a cancellation/rescheduling policy',
                  'Require birth data before the session, not during'
                ]
              }
            ],
            quiz: [
              {
                id: 'q1-booking',
                question: 'Collecting payment at booking:',
                options: ['Is rude to clients', 'Reduces no-shows and is standard practice', 'Should never be done', 'Only works for expensive readings'],
                correctIndex: 1,
                explanation: 'Collecting payment at booking is professional, reduces no-shows, and is standard practice for service providers.'
              }
            ]
          },
          {
            id: 'client-records',
            title: 'Client Records & Notes',
            description: 'What to track and how to keep information secure.',
            estimatedMinutes: 2,
            content: [
              { type: 'heading', content: 'Professional Record Keeping', level: 2 },
              {
                type: 'text',
                content: 'Good records help you serve clients better and protect you professionally. But client information is sensitive - handle it with care.'
              },
              {
                type: 'concept',
                title: 'What to Keep',
                content: 'Birth data. Reading date. Key themes discussed. Any predictions or timing mentioned. Follow-up notes. Client feedback.',
                icon: '📋'
              },
              {
                type: 'concept',
                title: 'Security (GDPR)',
                content: 'If you\'re in the UK/EU, GDPR applies. Store data securely (encrypted, password-protected). Only collect necessary data. Have a privacy policy. Allow clients to request data deletion.',
                icon: '🔒'
              },
              {
                type: 'concept',
                title: 'Recording Sessions',
                content: 'Many clients appreciate session recordings. Always get consent first. Store securely. Define how long you\'ll keep them. Consider auto-deletion after 30-90 days.',
                icon: '🎙️'
              },
              {
                type: 'list',
                style: 'bullet',
                items: [
                  'Use secure systems (not just a notebook anyone could find)',
                  'Back up your data regularly',
                  'Don\'t share client information without consent',
                  'Have a policy for what happens to data if you stop practicing',
                  'Review and clean up old records periodically'
                ]
              }
            ],
            quiz: [
              {
                id: 'q1-records',
                question: 'Client records should be:',
                options: ['Shared publicly to show your experience', 'Kept secure with appropriate privacy protections', 'Deleted immediately after every session', 'Only kept in your head'],
                correctIndex: 1,
                explanation: 'Client records are sensitive and should be kept secure with appropriate privacy protections (GDPR compliance in UK/EU).'
              }
            ]
          },
          {
            id: 'continuing-education',
            title: 'Continuing Education & Growth',
            description: 'Never stop learning and evolving as a practitioner.',
            estimatedMinutes: 2,
            content: [
              { type: 'heading', content: 'Lifelong Learning', level: 2 },
              {
                type: 'text',
                content: 'Astrology is vast. Even after decades, there\'s more to learn. The best practitioners stay curious and continue developing their skills throughout their careers.'
              },
              {
                type: 'concept',
                title: 'Formal Study',
                content: 'Take courses in areas you want to develop. Attend conferences. Study with teachers whose work you admire. Many online options exist now.',
                icon: '🎓'
              },
              {
                type: 'concept',
                title: 'Peer Learning',
                content: 'Study groups with other astrologers. Practice reading each other\'s charts. Discuss difficult cases. Community prevents isolation.',
                icon: '👥'
              },
              {
                type: 'concept',
                title: 'Self-Study',
                content: 'Read classic and contemporary texts. Study historical events astrologically. Track transits and observe their effects. Your own chart is an endless teacher.',
                icon: '📚'
              },
              {
                type: 'concept',
                title: 'Specialization',
                content: 'As you grow, you might develop specialties. Medical astrology. Horary. Mundane. Financial. Specialized knowledge makes you more valuable and referable.',
                icon: '⭐'
              },
              {
                type: 'list',
                style: 'bullet',
                items: [
                  'Set a learning goal each year',
                  'Budget time and money for education',
                  'Learn from diverse traditions and approaches',
                  'Stay humble - there\'s always more to know',
                  'Share what you learn - teaching deepens understanding'
                ]
              }
            ],
            quiz: [
              {
                id: 'q1-learning',
                question: 'Professional astrologers should:',
                options: ['Stop learning once they\'re earning money', 'Continue learning throughout their career', 'Only learn from one teacher', 'Avoid other astrologers'],
                correctIndex: 1,
                explanation: 'The best astrologers remain lifelong learners, continuously developing their skills and exploring new areas of astrology.'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'synastry-compatibility',
    title: 'Synastry & Compatibility',
    description: 'Master relationship astrology - understand romantic compatibility, friendship dynamics, and how charts interact.',
    difficulty: 'intermediate',
    estimatedMinutes: 30,
    icon: '💕',
    modules: [
      {
        id: 'synastry-basics',
        title: 'Synastry Fundamentals',
        description: 'Learn the basics of chart comparison and relationship astrology.',
        lessons: [
          {
            id: 'what-is-synastry',
            title: 'What is Synastry?',
            description: 'An introduction to comparing birth charts for relationship insights.',
            estimatedMinutes: 2,
            content: [
              { type: 'heading', content: 'The Art of Chart Comparison', level: 2 },
              {
                type: 'chat',
                messages: [
                  { role: 'student', content: "I've heard of synastry for compatibility. What exactly is it?" },
                  { role: 'guide', content: "Synastry is the art of comparing two birth charts to understand how two people's energies interact. It's like seeing how two melodies harmonize - or create tension - when played together." },
                  { role: 'student', content: "So it's not just about Sun sign compatibility?" },
                  { role: 'guide', content: "Exactly! Sun sign compatibility is just one tiny piece. True synastry looks at how all planets in one chart aspect planets in another. Your Moon might love their Venus, even if your Sun signs are supposedly 'incompatible.'" }
                ]
              },
              {
                type: 'text',
                content: 'Synastry goes far beyond simple Sun sign matching. When we overlay two charts, we see which planets form aspects (connections) between them. These inter-chart aspects reveal the dynamics of any relationship - romantic, friendship, family, or business.'
              },
              {
                type: 'concept',
                title: 'The Overlay Technique',
                content: 'In synastry, we place one person\'s planets around the other\'s chart wheel to see which houses they activate. Your partner\'s Venus might fall in your 7th house of partnership - or your 12th house of hidden matters. Location matters!',
                icon: '🔄'
              },
              {
                type: 'funFact',
                content: 'Ancient astrologers used synastry to arrange marriages! While we don\'t recommend this today, synastry can reveal why certain people feel instantly familiar while others feel challenging.'
              },
              {
                type: 'callout',
                content: 'No synastry is "perfect." Every relationship has easy flowing aspects AND challenging ones. The goal is understanding, not judgment.',
                variant: 'tip'
              }
            ],
            quiz: [
              {
                id: 'q1-synastry-def',
                question: 'What is synastry?',
                options: ['Reading one person\'s chart', 'Comparing two birth charts', 'Predicting the future', 'Sun sign matching'],
                correctIndex: 1,
                explanation: 'Synastry is the comparison of two birth charts to understand relationship dynamics.'
              }
            ]
          },
          {
            id: 'key-synastry-planets',
            title: 'Key Planets in Synastry',
            description: 'Which planets matter most for different types of relationships.',
            estimatedMinutes: 3,
            content: [
              { type: 'heading', content: 'The Relationship Planets', level: 2 },
              {
                type: 'text',
                content: 'While all planets play a role in synastry, certain planets are especially significant for relationship dynamics. Understanding their roles helps you focus on what matters most.'
              },
              {
                type: 'concept',
                title: 'The Luminaries: Sun & Moon',
                content: 'Sun-Moon contacts are vital. The Sun represents core identity while the Moon represents emotional needs. When these connect, there\'s fundamental recognition and emotional attunement.',
                icon: '☀️'
              },
              {
                type: 'concept',
                title: 'Venus & Mars: Attraction',
                content: 'Venus-Mars aspects generate romantic and physical attraction. Venus shows what we find beautiful and how we express love. Mars shows desire and how we pursue what we want.',
                icon: '💫'
              },
              {
                type: 'concept',
                title: 'Mercury: Communication',
                content: 'Mercury aspects determine how well you communicate and understand each other\'s thinking style. Good Mercury connections mean conversations flow naturally.',
                icon: '💬'
              },
              {
                type: 'concept',
                title: 'Saturn: Longevity',
                content: 'Saturn aspects indicate commitment potential and staying power. Challenging Saturn contacts can feel restrictive, but supportive ones provide structure for lasting bonds.',
                icon: '🪐'
              },
              {
                type: 'comparison',
                title: 'Planet Priorities by Relationship Type',
                items: [
                  { label: 'Romantic', left: 'Venus-Mars, Sun-Moon', right: 'Essential for attraction & bonding' },
                  { label: 'Friendship', left: 'Mercury, Jupiter', right: 'Communication & shared enjoyment' },
                  { label: 'Business', left: 'Saturn, Mercury', right: 'Structure & clear communication' }
                ]
              }
            ],
            quiz: [
              {
                id: 'q1-venus-mars',
                question: 'Venus-Mars aspects in synastry indicate:',
                options: ['Communication style', 'Romantic and physical attraction', 'Career compatibility', 'Intellectual connection'],
                correctIndex: 1,
                explanation: 'Venus represents love and attraction while Mars represents desire and pursuit - together they generate romantic chemistry.'
              }
            ]
          },
          {
            id: 'synastry-aspects',
            title: 'Understanding Synastry Aspects',
            description: 'How different aspect types manifest in relationships.',
            estimatedMinutes: 4,
            content: [
              { type: 'heading', content: 'Aspects Between Charts', level: 2 },
              {
                type: 'text',
                content: 'Just as aspects within a single chart show how planetary energies combine, synastry aspects show how your energies combine with another person\'s. Each aspect type creates a different dynamic.'
              },
              {
                type: 'concept',
                title: 'Conjunctions (0°)',
                content: 'The most powerful synastry aspect. When planets conjunct across charts, those energies merge and amplify each other. A Venus conjunct someone\'s Moon creates deep affection and emotional comfort.',
                icon: '⚡'
              },
              {
                type: 'concept',
                title: 'Trines (120°) & Sextiles (60°)',
                content: 'These flowing aspects create ease and natural compatibility. You "get" each other without trying. However, too many easy aspects can mean lack of growth or taking each other for granted.',
                icon: '🌊'
              },
              {
                type: 'concept',
                title: 'Squares (90°)',
                content: 'Squares create friction and tension - but also passion and growth. Square aspects keep relationships dynamic. The key is learning to work with the tension productively.',
                icon: '⚔️'
              },
              {
                type: 'concept',
                title: 'Oppositions (180°)',
                content: 'Oppositions can feel like looking in a mirror - you see qualities you lack or have suppressed. They create strong attraction through polarity but require balance and compromise.',
                icon: '🪞'
              },
              {
                type: 'callout',
                content: 'The healthiest relationships usually have a mix of easy and challenging aspects. All trines can be boring; all squares exhausting. Balance is key.',
                variant: 'tip'
              }
            ],
            quiz: [
              {
                id: 'q1-squares',
                question: 'Square aspects in synastry:',
                options: ['Always doom a relationship', 'Create friction but also passion and growth', 'Are the best aspects to have', 'Have no effect'],
                correctIndex: 1,
                explanation: 'Squares create tension but also keep relationships dynamic and can promote growth when handled well.'
              }
            ]
          }
        ]
      },
      {
        id: 'house-overlays',
        title: 'House Overlays',
        description: 'Understanding where someone\'s planets land in your chart.',
        lessons: [
          {
            id: 'overlay-meaning',
            title: 'What House Overlays Mean',
            description: 'How planetary overlays activate different life areas.',
            estimatedMinutes: 3,
            content: [
              { type: 'heading', content: 'Planets in Your Houses', level: 2 },
              {
                type: 'chat',
                messages: [
                  { role: 'student', content: "I understand aspects, but what are house overlays?" },
                  { role: 'guide', content: "When someone's planet falls into one of your houses, it 'activates' that area of your life. If their Jupiter lands in your 10th house, they might boost your career or public image." },
                  { role: 'student', content: "So they literally affect certain parts of my life?" },
                  { role: 'guide', content: "They influence how you experience that life area when you're with them. Their Sun in your 5th house might make you feel more creative and playful together. Their Saturn in your 7th might bring up commitment themes." }
                ]
              },
              {
                type: 'text',
                content: 'House overlays show where someone impacts your life most directly. Even without strong aspects, a planet falling in a key house creates significant influence in that area.'
              },
              {
                type: 'concept',
                title: 'Angular House Overlays (1, 4, 7, 10)',
                content: 'Planets in angular houses have the strongest impact. Their planets on your angles represent major life influence - identity (1st), home (4th), partnership (7th), career (10th).',
                icon: '🎯'
              },
              {
                type: 'concept',
                title: 'Romantic House Overlays',
                content: 'For romance, pay attention to the 5th house (romance, fun), 7th house (partnership), and 8th house (intimacy, deep bonding). Planets here indicate relationship significance.',
                icon: '💕'
              },
              {
                type: 'funFact',
                content: 'If someone\'s Sun, Moon, or Venus falls in your 7th house, you might feel they\'re "partner material" even before getting to know them well - that house is literally your partnership sector!'
              }
            ],
            quiz: [
              {
                id: 'q1-overlay',
                question: 'If someone\'s Jupiter falls in your 2nd house, it might:',
                options: ['Affect your communication', 'Boost your finances or self-worth', 'Change your appearance', 'Impact your siblings'],
                correctIndex: 1,
                explanation: 'The 2nd house rules money, resources, and self-worth - Jupiter there could bring expansion in these areas.'
              }
            ]
          },
          {
            id: 'venus-mars-houses',
            title: 'Venus & Mars House Overlays',
            description: 'Where attraction and desire show up in charts.',
            estimatedMinutes: 2,
            content: [
              { type: 'heading', content: 'The Attraction Houses', level: 2 },
              {
                type: 'text',
                content: 'Venus and Mars overlays are especially telling for romantic relationships. Where someone\'s Venus or Mars lands shows how and where attraction manifests between you.'
              },
              {
                type: 'concept',
                title: 'Venus in Your Houses',
                content: 'Their Venus shows where they bring love, beauty, and harmony to your life. Venus in your 1st house - they adore your appearance. Venus in your 9th - they love your mind and beliefs.',
                icon: '💗'
              },
              {
                type: 'concept',
                title: 'Mars in Your Houses',
                content: 'Their Mars shows where they activate, motivate, or potentially challenge you. Mars in your 6th - they might push your daily routines. Mars in your 5th - passionate creative or romantic energy.',
                icon: '🔥'
              },
              {
                type: 'list',
                style: 'bullet',
                items: [
                  'Venus/Mars in 1st: Strong physical attraction',
                  'Venus/Mars in 5th: Romantic, playful chemistry',
                  'Venus/Mars in 7th: Partnership-oriented attraction',
                  'Venus/Mars in 8th: Intense, transformative connection',
                  'Venus/Mars in 12th: Spiritual or karmic attraction'
                ]
              }
            ],
            quiz: [
              {
                id: 'q1-venus-overlay',
                question: 'Someone\'s Venus in your 7th house suggests:',
                options: ['Career conflicts', 'They see you as partner material', 'Communication issues', 'Family drama'],
                correctIndex: 1,
                explanation: 'The 7th house is the partnership sector - Venus here indicates they find you lovable in a committed partnership way.'
              }
            ]
          }
        ]
      },
      {
        id: 'composite-charts',
        title: 'The Composite Chart',
        description: 'Understanding the relationship as its own entity.',
        lessons: [
          {
            id: 'composite-intro',
            title: 'Introduction to Composite Charts',
            description: 'How a relationship has its own birth chart.',
            estimatedMinutes: 3,
            content: [
              { type: 'heading', content: 'The Relationship\'s Chart', level: 2 },
              {
                type: 'chat',
                messages: [
                  { role: 'student', content: "What's the difference between synastry and a composite chart?" },
                  { role: 'guide', content: "Synastry compares two separate charts. A composite chart creates one chart for the relationship itself - by finding the midpoints between each pair of planets. It's like the relationship has its own birth chart!" },
                  { role: 'student', content: "So it shows the relationship as a separate thing?" },
                  { role: 'guide', content: "Exactly! The composite shows the relationship's personality, strengths, challenges, and purpose. It's especially useful for understanding what you create TOGETHER, beyond what each person brings individually." }
                ]
              },
              {
                type: 'text',
                content: 'A composite chart is calculated by finding the midpoint between each planet in both charts. The result is a single chart representing the relationship entity - showing its nature, purpose, and dynamics.'
              },
              {
                type: 'concept',
                title: 'Composite Sun',
                content: 'The composite Sun shows the relationship\'s core identity and purpose. Its sign and house reveal what the relationship is "about" and what it helps both people develop.',
                icon: '☀️'
              },
              {
                type: 'concept',
                title: 'Composite Moon',
                content: 'The composite Moon reveals the emotional tone and needs of the relationship. Is it nurturing (Cancer)? Intense (Scorpio)? Independent (Aquarius)?',
                icon: '🌙'
              },
              {
                type: 'funFact',
                content: 'A relationship can have challenging individual synastry but a beautiful composite chart - meaning the relationship itself becomes greater than the sum of its parts!'
              }
            ],
            quiz: [
              {
                id: 'q1-composite',
                question: 'A composite chart represents:',
                options: ['One person\'s chart', 'The comparison of two charts', 'The relationship as its own entity', 'Future predictions'],
                correctIndex: 2,
                explanation: 'The composite chart is a single chart representing the relationship itself, created from the midpoints of both people\'s charts.'
              }
            ]
          },
          {
            id: 'reading-composite',
            title: 'Reading a Composite Chart',
            description: 'How to interpret the relationship chart.',
            estimatedMinutes: 3,
            content: [
              { type: 'heading', content: 'Interpreting the Composite', level: 2 },
              {
                type: 'text',
                content: 'Reading a composite chart is similar to reading a natal chart, but you\'re looking at the relationship\'s characteristics rather than an individual\'s. Focus on key factors that reveal the relationship\'s nature.'
              },
              {
                type: 'concept',
                title: 'Key Composite Factors',
                content: 'Start with the composite Sun, Moon, and Ascendant - these form the "Big Three" of the relationship. Then look at Venus and Mars for love/desire dynamics, and Saturn for longevity.',
                icon: '🔑'
              },
              {
                type: 'list',
                style: 'bullet',
                items: [
                  'Composite Sun: The relationship\'s purpose and identity',
                  'Composite Moon: Emotional needs and feeling tone',
                  'Composite Ascendant: How others see the relationship',
                  'Composite Venus: How love is expressed together',
                  'Composite Saturn: Challenges and staying power'
                ]
              },
              {
                type: 'concept',
                title: 'Composite Aspects',
                content: 'Aspects within the composite show the relationship\'s internal dynamics. Sun-Moon aspects reveal how well identity and emotions work together. Venus-Saturn might indicate commitment challenges or serious love.',
                icon: '🔗'
              },
              {
                type: 'callout',
                content: 'A strong composite doesn\'t guarantee success - it shows the relationship\'s potential. Both people still need to do the work!',
                variant: 'info'
              }
            ],
            quiz: [
              {
                id: 'q1-comp-sun',
                question: 'The composite Sun represents:',
                options: ['One person\'s ego', 'The relationship\'s purpose and identity', 'Physical attraction', 'Past life karma'],
                correctIndex: 1,
                explanation: 'The composite Sun shows what the relationship is fundamentally "about" - its core identity and purpose.'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'twelve-signs-deep',
    title: 'The Twelve Signs in Depth',
    description: 'A comprehensive exploration of each zodiac sign - psychology, motivations, strengths, shadows, and growth paths.',
    difficulty: 'beginner',
    estimatedMinutes: 40,
    icon: '♈',
    modules: [
      {
        id: 'fire-signs',
        title: 'The Fire Signs',
        description: 'Deep dive into Aries, Leo, and Sagittarius.',
        lessons: [
          {
            id: 'aries-deep',
            title: 'Aries: The Pioneer',
            description: 'Understanding the sign of initiation and courage.',
            estimatedMinutes: 3,
            content: [
              { type: 'heading', content: 'The Ram\'s Journey', level: 2 },
              {
                type: 'signCard',
                sign: 'aries'
              },
              {
                type: 'text',
                content: 'Aries is the first sign of the zodiac, representing new beginnings, raw energy, and the courage to be first. Ruled by Mars, Aries embodies the warrior spirit - direct, assertive, and unafraid to forge ahead.'
              },
              {
                type: 'concept',
                title: 'Core Psychology',
                content: 'Aries needs to feel alive through action and challenge. They\'re driven by the question "What can I initiate?" and thrive when they have something to conquer or build from scratch.',
                icon: '🔥'
              },
              {
                type: 'comparison',
                title: 'Aries Light vs Shadow',
                items: [
                  { label: 'Energy', left: 'Courageous, pioneering', right: 'Impulsive, reckless' },
                  { label: 'Drive', left: 'Independent, self-motivated', right: 'Selfish, inconsiderate' },
                  { label: 'Style', left: 'Direct, honest', right: 'Aggressive, impatient' }
                ]
              },
              {
                type: 'concept',
                title: 'Aries Growth Path',
                content: 'Aries grows by learning patience and considering others. Their challenge is moving from "me first" to "we together" without losing their vital spark and initiative.',
                icon: '📈'
              },
              {
                type: 'callout',
                content: 'Consider where Aries-like energy shows up in your life. Where do you feel most pioneering and independent?',
                variant: 'tip'
              }
            ],
            quiz: [
              {
                id: 'q1-aries-ruler',
                question: 'Aries is ruled by:',
                options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
                correctIndex: 1,
                explanation: 'Mars, the planet of action, drive, and desire, rules Aries - giving this sign its assertive, warrior-like nature.'
              }
            ]
          },
          {
            id: 'leo-deep',
            title: 'Leo: The Sovereign',
            description: 'Understanding the sign of creativity and self-expression.',
            estimatedMinutes: 3,
            content: [
              { type: 'heading', content: 'The Lion\'s Heart', level: 2 },
              {
                type: 'signCard',
                sign: 'leo'
              },
              {
                type: 'text',
                content: 'Leo is the sign of creative self-expression, leadership, and heartfelt generosity. Ruled by the Sun, Leo radiates warmth and seeks to shine their unique light into the world.'
              },
              {
                type: 'concept',
                title: 'Core Psychology',
                content: 'Leo needs to feel special and recognized for their unique gifts. They\'re driven by the question "What can I create?" and thrive when they can express their creativity and receive appreciation.',
                icon: '👑'
              },
              {
                type: 'comparison',
                title: 'Leo Light vs Shadow',
                items: [
                  { label: 'Expression', left: 'Creative, generous, warm', right: 'Attention-seeking, dramatic' },
                  { label: 'Leadership', left: 'Inspiring, confident', right: 'Domineering, prideful' },
                  { label: 'Love', left: 'Loyal, big-hearted', right: 'Demanding constant praise' }
                ]
              },
              {
                type: 'concept',
                title: 'Leo Growth Path',
                content: 'Leo grows by learning to shine without needing constant external validation. Their challenge is finding inner confidence that doesn\'t depend on applause.',
                icon: '📈'
              },
              {
                type: 'callout',
                content: 'Reflect on where Leo energy shows up in your life. Where do you need to express creativity and receive recognition?',
                variant: 'tip'
              }
            ],
            quiz: [
              {
                id: 'q1-leo-ruler',
                question: 'Leo is ruled by:',
                options: ['The Moon', 'The Sun', 'Mars', 'Mercury'],
                correctIndex: 1,
                explanation: 'The Sun, representing our core identity and life force, rules Leo - giving this sign its radiant, expressive nature.'
              }
            ]
          },
          {
            id: 'sagittarius-deep',
            title: 'Sagittarius: The Seeker',
            description: 'Understanding the sign of exploration and meaning.',
            estimatedMinutes: 3,
            content: [
              { type: 'heading', content: 'The Archer\'s Quest', level: 2 },
              {
                type: 'signCard',
                sign: 'sagittarius'
              },
              {
                type: 'text',
                content: 'Sagittarius is the sign of exploration, higher learning, and the search for meaning. Ruled by Jupiter, Sagittarius seeks to expand horizons through travel, philosophy, and adventure.'
              },
              {
                type: 'concept',
                title: 'Core Psychology',
                content: 'Sagittarius needs freedom and meaning. They\'re driven by the question "What does it all mean?" and thrive when exploring new territories - physical, intellectual, or spiritual.',
                icon: '🏹'
              },
              {
                type: 'comparison',
                title: 'Sagittarius Light vs Shadow',
                items: [
                  { label: 'Mind', left: 'Philosophical, optimistic', right: 'Preachy, know-it-all' },
                  { label: 'Spirit', left: 'Adventurous, honest', right: 'Restless, tactless' },
                  { label: 'Goals', left: 'Visionary, inspiring', right: 'Unrealistic, irresponsible' }
                ]
              },
              {
                type: 'concept',
                title: 'Sagittarius Growth Path',
                content: 'Sagittarius grows by learning to find meaning in the everyday, not just the extraordinary. Their challenge is committing to depth rather than always seeking the next horizon.',
                icon: '📈'
              },
              {
                type: 'callout',
                content: 'Consider where Sagittarian energy shows up in your life. Where do you seek freedom, growth, and meaning?',
                variant: 'tip'
              }
            ],
            quiz: [
              {
                id: 'q1-sag-ruler',
                question: 'Sagittarius is ruled by:',
                options: ['Saturn', 'Mars', 'Jupiter', 'Neptune'],
                correctIndex: 2,
                explanation: 'Jupiter, the planet of expansion, luck, and higher wisdom, rules Sagittarius - giving this sign its optimistic, growth-oriented nature.'
              }
            ]
          }
        ]
      },
      {
        id: 'earth-signs',
        title: 'The Earth Signs',
        description: 'Deep dive into Taurus, Virgo, and Capricorn.',
        lessons: [
          {
            id: 'taurus-deep',
            title: 'Taurus: The Builder',
            description: 'Understanding the sign of values and stability.',
            estimatedMinutes: 3,
            content: [
              { type: 'heading', content: 'The Bull\'s Garden', level: 2 },
              {
                type: 'signCard',
                sign: 'taurus'
              },
              {
                type: 'text',
                content: 'Taurus is the sign of stability, sensuality, and lasting value. Ruled by Venus, Taurus appreciates beauty, comfort, and the pleasures of the physical world.'
              },
              {
                type: 'concept',
                title: 'Core Psychology',
                content: 'Taurus needs security and sensory satisfaction. They\'re driven by the question "What is worth keeping?" and thrive when building something of lasting value.',
                icon: '🌿'
              },
              {
                type: 'comparison',
                title: 'Taurus Light vs Shadow',
                items: [
                  { label: 'Values', left: 'Dependable, patient', right: 'Stubborn, resistant to change' },
                  { label: 'Senses', left: 'Appreciative, sensual', right: 'Indulgent, materialistic' },
                  { label: 'Resources', left: 'Resourceful, practical', right: 'Possessive, greedy' }
                ]
              },
              {
                type: 'concept',
                title: 'Taurus Growth Path',
                content: 'Taurus grows by learning flexibility and embracing necessary change. Their challenge is knowing when to hold on and when to let go.',
                icon: '📈'
              },
              {
                type: 'callout',
                content: 'Reflect on where Taurus energy shows up in your life. Where do you seek stability and sensory pleasure?',
                variant: 'tip'
              }
            ],
            quiz: [
              {
                id: 'q1-taurus-ruler',
                question: 'Taurus is ruled by:',
                options: ['Mars', 'Venus', 'Mercury', 'The Moon'],
                correctIndex: 1,
                explanation: 'Venus, the planet of love, beauty, and values, rules Taurus - giving this sign its appreciation for comfort and lasting worth.'
              }
            ]
          },
          {
            id: 'virgo-deep',
            title: 'Virgo: The Analyst',
            description: 'Understanding the sign of service and improvement.',
            estimatedMinutes: 3,
            content: [
              { type: 'heading', content: 'The Maiden\'s Craft', level: 2 },
              {
                type: 'signCard',
                sign: 'virgo'
              },
              {
                type: 'text',
                content: 'Virgo is the sign of analysis, service, and practical improvement. Ruled by Mercury, Virgo applies mental energy to perfecting systems and helping others.'
              },
              {
                type: 'concept',
                title: 'Core Psychology',
                content: 'Virgo needs to be useful and to improve things. They\'re driven by the question "How can this be better?" and thrive when their skills serve a meaningful purpose.',
                icon: '🔍'
              },
              {
                type: 'comparison',
                title: 'Virgo Light vs Shadow',
                items: [
                  { label: 'Mind', left: 'Analytical, helpful', right: 'Critical, anxious' },
                  { label: 'Work', left: 'Dedicated, skillful', right: 'Perfectionist, workaholic' },
                  { label: 'Service', left: 'Humble, practical', right: 'Self-critical, martyring' }
                ]
              },
              {
                type: 'concept',
                title: 'Virgo Growth Path',
                content: 'Virgo grows by accepting imperfection - in themselves and others. Their challenge is using their critical eye to improve, not judge.',
                icon: '📈'
              },
              {
                type: 'callout',
                content: 'Reflect on where Virgo energy shows up in your life. Where do you analyze, refine, and seek to be of service?',
                variant: 'tip'
              }
            ],
            quiz: [
              {
                id: 'q1-virgo-ruler',
                question: 'Virgo is ruled by:',
                options: ['Mercury', 'Venus', 'Saturn', 'The Moon'],
                correctIndex: 0,
                explanation: 'Mercury, the planet of communication and analysis, rules Virgo - giving this sign its detail-oriented, practical nature.'
              }
            ]
          },
          {
            id: 'capricorn-deep',
            title: 'Capricorn: The Achiever',
            description: 'Understanding the sign of ambition and mastery.',
            estimatedMinutes: 3,
            content: [
              { type: 'heading', content: 'The Mountain Climber', level: 2 },
              {
                type: 'signCard',
                sign: 'capricorn'
              },
              {
                type: 'text',
                content: 'Capricorn is the sign of ambition, discipline, and mastery. Ruled by Saturn, Capricorn understands that lasting achievement requires patience, structure, and hard work.'
              },
              {
                type: 'concept',
                title: 'Core Psychology',
                content: 'Capricorn needs to achieve and be respected. They\'re driven by the question "What can I accomplish?" and thrive when working toward meaningful, long-term goals.',
                icon: '🏔️'
              },
              {
                type: 'comparison',
                title: 'Capricorn Light vs Shadow',
                items: [
                  { label: 'Work', left: 'Disciplined, responsible', right: 'Workaholic, cold' },
                  { label: 'Goals', left: 'Ambitious, strategic', right: 'Status-obsessed, ruthless' },
                  { label: 'Time', left: 'Patient, wise', right: 'Pessimistic, rigid' }
                ]
              },
              {
                type: 'concept',
                title: 'Capricorn Growth Path',
                content: 'Capricorn grows by learning to value the journey, not just the summit. Their challenge is balancing ambition with emotional connection and play.',
                icon: '📈'
              },
              {
                type: 'callout',
                content: 'Consider where Capricorn energy shows up in your life. Where are you ambitious and willing to work for mastery?',
                variant: 'tip'
              }
            ],
            quiz: [
              {
                id: 'q1-cap-ruler',
                question: 'Capricorn is ruled by:',
                options: ['Jupiter', 'Mars', 'Saturn', 'Pluto'],
                correctIndex: 2,
                explanation: 'Saturn, the planet of structure, discipline, and time, rules Capricorn - giving this sign its achievement-oriented nature.'
              }
            ]
          }
        ]
      },
      {
        id: 'air-signs',
        title: 'The Air Signs',
        description: 'Deep dive into Gemini, Libra, and Aquarius.',
        lessons: [
          {
            id: 'gemini-deep',
            title: 'Gemini: The Messenger',
            description: 'Understanding the sign of communication and curiosity.',
            estimatedMinutes: 3,
            content: [
              { type: 'heading', content: 'The Twins\' Dance', level: 2 },
              {
                type: 'signCard',
                sign: 'gemini'
              },
              {
                type: 'text',
                content: 'Gemini is the sign of communication, curiosity, and mental agility. Ruled by Mercury, Gemini thrives on information exchange, learning, and variety.'
              },
              {
                type: 'concept',
                title: 'Core Psychology',
                content: 'Gemini needs mental stimulation and variety. They\'re driven by the question "What else is there to know?" and thrive when connecting ideas and people.',
                icon: '💨'
              },
              {
                type: 'comparison',
                title: 'Gemini Light vs Shadow',
                items: [
                  { label: 'Mind', left: 'Curious, quick-witted', right: 'Scattered, superficial' },
                  { label: 'Communication', left: 'Articulate, connecting', right: 'Gossip-prone, inconsistent' },
                  { label: 'Interests', left: 'Versatile, adaptable', right: 'Unreliable, two-faced' }
                ]
              },
              {
                type: 'concept',
                title: 'Gemini Growth Path',
                content: 'Gemini grows by developing depth alongside breadth. Their challenge is committing to fewer things more fully rather than skimming many surfaces.',
                icon: '📈'
              },
              {
                type: 'callout',
                content: 'Reflect on where Gemini energy shows up in your life. Where do you communicate, learn, and seek variety?',
                variant: 'tip'
              }
            ],
            quiz: [
              {
                id: 'q1-gemini-ruler',
                question: 'Gemini is ruled by:',
                options: ['Venus', 'Mercury', 'Uranus', 'The Moon'],
                correctIndex: 1,
                explanation: 'Mercury, the planet of communication and mental activity, rules Gemini - giving this sign its quick, curious, communicative nature.'
              }
            ]
          },
          {
            id: 'libra-deep',
            title: 'Libra: The Harmonizer',
            description: 'Understanding the sign of balance and relationships.',
            estimatedMinutes: 3,
            content: [
              { type: 'heading', content: 'The Scales of Balance', level: 2 },
              {
                type: 'signCard',
                sign: 'libra'
              },
              {
                type: 'text',
                content: 'Libra is the sign of relationship, balance, and beauty. Ruled by Venus, Libra seeks harmony in all things and understands life through partnership and fairness.'
              },
              {
                type: 'concept',
                title: 'Core Psychology',
                content: 'Libra needs harmony and partnership. They\'re driven by the question "What is fair?" and thrive when creating balance and beautiful connections.',
                icon: '⚖️'
              },
              {
                type: 'comparison',
                title: 'Libra Light vs Shadow',
                items: [
                  { label: 'Relationships', left: 'Diplomatic, fair', right: 'People-pleasing, codependent' },
                  { label: 'Decisions', left: 'Thoughtful, balanced', right: 'Indecisive, fence-sitting' },
                  { label: 'Style', left: 'Graceful, aesthetic', right: 'Superficial, conflict-avoidant' }
                ]
              },
              {
                type: 'concept',
                title: 'Libra Growth Path',
                content: 'Libra grows by developing a strong sense of self that doesn\'t depend on others\' approval. Their challenge is choosing themselves sometimes, even when it creates temporary disharmony.',
                icon: '📈'
              },
              {
                type: 'callout',
                content: 'Consider where Libra energy shows up in your life. Where do you seek harmony, partnership, and fairness?',
                variant: 'tip'
              }
            ],
            quiz: [
              {
                id: 'q1-libra-ruler',
                question: 'Libra is ruled by:',
                options: ['Mercury', 'Venus', 'Saturn', 'Mars'],
                correctIndex: 1,
                explanation: 'Venus, the planet of love and harmony, rules Libra - giving this sign its relationship-focused, aesthetic nature.'
              }
            ]
          },
          {
            id: 'aquarius-deep',
            title: 'Aquarius: The Visionary',
            description: 'Understanding the sign of innovation and humanity.',
            estimatedMinutes: 3,
            content: [
              { type: 'heading', content: 'The Water Bearer\'s Vision', level: 2 },
              {
                type: 'signCard',
                sign: 'aquarius'
              },
              {
                type: 'text',
                content: 'Aquarius is the sign of innovation, humanity, and future vision. Ruled by Uranus (and traditionally Saturn), Aquarius thinks beyond conventions to imagine new possibilities.'
              },
              {
                type: 'concept',
                title: 'Core Psychology',
                content: 'Aquarius needs intellectual freedom and a sense of contributing to humanity. They\'re driven by the question "What could be different?" and thrive when innovating for the collective good.',
                icon: '⚡'
              },
              {
                type: 'comparison',
                title: 'Aquarius Light vs Shadow',
                items: [
                  { label: 'Mind', left: 'Innovative, humanitarian', right: 'Contrarian, detached' },
                  { label: 'Social', left: 'Friendly, accepting', right: 'Aloof, emotionally distant' },
                  { label: 'Vision', left: 'Progressive, original', right: 'Stubborn in beliefs, eccentric' }
                ]
              },
              {
                type: 'concept',
                title: 'Aquarius Growth Path',
                content: 'Aquarius grows by connecting intellect with emotion. Their challenge is learning that true progress includes emotional intelligence, not just intellectual advancement.',
                icon: '📈'
              },
              {
                type: 'callout',
                content: 'Reflect on where Aquarius energy shows up in your life. Where do you think independently and seek to innovate?',
                variant: 'tip'
              }
            ],
            quiz: [
              {
                id: 'q1-aqua-ruler',
                question: 'Aquarius is ruled by (modern):',
                options: ['Neptune', 'Uranus', 'Jupiter', 'Mercury'],
                correctIndex: 1,
                explanation: 'Uranus, the planet of innovation and sudden change, rules Aquarius in modern astrology - giving this sign its revolutionary, unconventional nature.'
              }
            ]
          }
        ]
      },
      {
        id: 'water-signs',
        title: 'The Water Signs',
        description: 'Deep dive into Cancer, Scorpio, and Pisces.',
        lessons: [
          {
            id: 'cancer-deep',
            title: 'Cancer: The Nurturer',
            description: 'Understanding the sign of emotion and care.',
            estimatedMinutes: 3,
            content: [
              { type: 'heading', content: 'The Crab\'s Shell', level: 2 },
              {
                type: 'signCard',
                sign: 'cancer'
              },
              {
                type: 'text',
                content: 'Cancer is the sign of emotion, nurturing, and protection. Ruled by the Moon, Cancer experiences life through feelings and seeks to create safe, caring environments.'
              },
              {
                type: 'concept',
                title: 'Core Psychology',
                content: 'Cancer needs emotional security and belonging. They\'re driven by the question "Who can I care for?" and thrive when nurturing loved ones and creating home.',
                icon: '🦀'
              },
              {
                type: 'comparison',
                title: 'Cancer Light vs Shadow',
                items: [
                  { label: 'Emotion', left: 'Nurturing, protective', right: 'Clingy, smothering' },
                  { label: 'Home', left: 'Creating safety', right: 'Unable to let go' },
                  { label: 'Care', left: 'Deeply empathetic', right: 'Moody, manipulative' }
                ]
              },
              {
                type: 'concept',
                title: 'Cancer Growth Path',
                content: 'Cancer grows by learning to nurture themselves, not just others. Their challenge is developing emotional independence while maintaining their caring nature.',
                icon: '📈'
              },
              {
                type: 'callout',
                content: 'Consider where Cancer energy shows up in your life. Where do you feel deeply and seek emotional security?',
                variant: 'tip'
              }
            ],
            quiz: [
              {
                id: 'q1-cancer-ruler',
                question: 'Cancer is ruled by:',
                options: ['The Sun', 'The Moon', 'Venus', 'Neptune'],
                correctIndex: 1,
                explanation: 'The Moon, representing emotions and instincts, rules Cancer - giving this sign its deeply feeling, nurturing nature.'
              }
            ]
          },
          {
            id: 'scorpio-deep',
            title: 'Scorpio: The Transformer',
            description: 'Understanding the sign of intensity and depth.',
            estimatedMinutes: 3,
            content: [
              { type: 'heading', content: 'The Scorpion\'s Depths', level: 2 },
              {
                type: 'signCard',
                sign: 'scorpio'
              },
              {
                type: 'text',
                content: 'Scorpio is the sign of transformation, intensity, and hidden depths. Ruled by Pluto (and traditionally Mars), Scorpio understands life\'s shadows and the power of change.'
              },
              {
                type: 'concept',
                title: 'Core Psychology',
                content: 'Scorpio needs depth and authentic connection. They\'re driven by the question "What lies beneath?" and thrive when engaging with life\'s deeper mysteries and transformations.',
                icon: '🦂'
              },
              {
                type: 'comparison',
                title: 'Scorpio Light vs Shadow',
                items: [
                  { label: 'Depth', left: 'Perceptive, transformative', right: 'Suspicious, obsessive' },
                  { label: 'Power', left: 'Empowering, healing', right: 'Controlling, manipulative' },
                  { label: 'Emotion', left: 'Loyal, passionate', right: 'Jealous, vengeful' }
                ]
              },
              {
                type: 'concept',
                title: 'Scorpio Growth Path',
                content: 'Scorpio grows by learning to trust and release control. Their challenge is transforming themselves rather than trying to control or transform others.',
                icon: '📈'
              },
              {
                type: 'callout',
                content: 'Reflect on where Scorpio energy shows up in your life. Where do you go deep and seek transformation?',
                variant: 'tip'
              }
            ],
            quiz: [
              {
                id: 'q1-scorp-ruler',
                question: 'Scorpio is ruled by (modern):',
                options: ['Mars', 'Pluto', 'Neptune', 'Saturn'],
                correctIndex: 1,
                explanation: 'Pluto, the planet of transformation and hidden power, rules Scorpio in modern astrology - giving this sign its intense, transformative nature.'
              }
            ]
          },
          {
            id: 'pisces-deep',
            title: 'Pisces: The Mystic',
            description: 'Understanding the sign of spirituality and compassion.',
            estimatedMinutes: 3,
            content: [
              { type: 'heading', content: 'The Fish\'s Ocean', level: 2 },
              {
                type: 'signCard',
                sign: 'pisces'
              },
              {
                type: 'text',
                content: 'Pisces is the sign of spirituality, compassion, and transcendence. Ruled by Neptune (and traditionally Jupiter), Pisces connects with the infinite and feels the unity of all things.'
              },
              {
                type: 'concept',
                title: 'Core Psychology',
                content: 'Pisces needs spiritual connection and creative expression. They\'re driven by the question "What exists beyond?" and thrive when accessing imagination, compassion, and the transcendent.',
                icon: '🐟'
              },
              {
                type: 'comparison',
                title: 'Pisces Light vs Shadow',
                items: [
                  { label: 'Spirit', left: 'Compassionate, intuitive', right: 'Escapist, victim mentality' },
                  { label: 'Boundaries', left: 'Empathetic, healing', right: 'Boundary-less, absorbing' },
                  { label: 'Reality', left: 'Imaginative, artistic', right: 'Delusional, avoiding' }
                ]
              },
              {
                type: 'concept',
                title: 'Pisces Growth Path',
                content: 'Pisces grows by grounding their spirituality in practical reality. Their challenge is maintaining healthy boundaries while keeping their heart open.',
                icon: '📈'
              },
              {
                type: 'callout',
                content: 'Consider where Pisces energy shows up in your life. Where do you connect with the spiritual and transcendent?',
                variant: 'tip'
              }
            ],
            quiz: [
              {
                id: 'q1-pisces-ruler',
                question: 'Pisces is ruled by (modern):',
                options: ['Jupiter', 'Neptune', 'The Moon', 'Venus'],
                correctIndex: 1,
                explanation: 'Neptune, the planet of spirituality and imagination, rules Pisces in modern astrology - giving this sign its mystical, compassionate nature.'
              }
            ]
          }
        ]
      }
    ]
  }
]

export function getCourse(courseId: string): Course | undefined {
  return COURSES.find(c => c.id === courseId)
}

export function getLesson(courseId: string, lessonId: string) {
  const course = getCourse(courseId)
  if (!course) return undefined

  for (const module of course.modules) {
    const lesson = module.lessons.find(l => l.id === lessonId)
    if (lesson) {
      return { lesson, module, course }
    }
  }
  return undefined
}

export function getAllLessonIds(courseId: string): string[] {
  const course = getCourse(courseId)
  if (!course) return []

  return course.modules.flatMap(m => m.lessons.map(l => l.id))
}

export function getNextLesson(courseId: string, currentLessonId: string) {
  const allLessons = getAllLessonIds(courseId)
  const currentIndex = allLessons.indexOf(currentLessonId)

  if (currentIndex === -1 || currentIndex >= allLessons.length - 1) {
    return undefined
  }

  return getLesson(courseId, allLessons[currentIndex + 1])
}

export function getPreviousLesson(courseId: string, currentLessonId: string) {
  const allLessons = getAllLessonIds(courseId)
  const currentIndex = allLessons.indexOf(currentLessonId)

  if (currentIndex <= 0) {
    return undefined
  }

  return getLesson(courseId, allLessons[currentIndex - 1])
}
