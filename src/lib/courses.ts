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
    estimatedMinutes: 90,
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
            estimatedMinutes: 5,
            content: [
              { type: 'heading', content: 'The Celestial Blueprint', level: 2 },
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
                type: 'text',
                content: 'When we say someone is a "Leo" or "Pisces," we\'re referring to where the Sun was positioned in the zodiac at the moment of their birth. But that\'s just the beginning - every planet occupies a zodiac sign, creating a unique celestial fingerprint.'
              },
              {
                type: 'callout',
                content: 'Your birth chart captures the exact positions of all celestial bodies at your moment of birth - like a snapshot of the sky.',
                variant: 'tip'
              },
              {
                type: 'personalized',
                dataKey: 'sunSign',
                template: 'Your Sun is in {value}, which represents your core identity and life purpose.'
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
            estimatedMinutes: 8,
            content: [
              { type: 'heading', content: 'Fire, Earth, Air & Water', level: 2 },
              {
                type: 'text',
                content: 'Every zodiac sign belongs to one of four elements. Understanding elements gives you immediate insight into how signs express themselves.'
              },
              {
                type: 'concept',
                title: 'Fire Signs',
                content: 'Aries, Leo, Sagittarius - Passionate, energetic, and action-oriented. Fire signs are the initiators and enthusiasts of the zodiac.',
                icon: '🔥'
              },
              {
                type: 'concept',
                title: 'Earth Signs',
                content: 'Taurus, Virgo, Capricorn - Practical, grounded, and reliable. Earth signs build, maintain, and create tangible results.',
                icon: '🌍'
              },
              {
                type: 'concept',
                title: 'Air Signs',
                content: 'Gemini, Libra, Aquarius - Intellectual, communicative, and social. Air signs connect ideas and people.',
                icon: '💨'
              },
              {
                type: 'concept',
                title: 'Water Signs',
                content: 'Cancer, Scorpio, Pisces - Emotional, intuitive, and empathetic. Water signs feel deeply and navigate the emotional realm.',
                icon: '💧'
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
            estimatedMinutes: 7,
            content: [
              { type: 'heading', content: 'Cardinal, Fixed & Mutable', level: 2 },
              {
                type: 'text',
                content: 'Beyond elements, each sign has a modality (or quality) that describes how it takes action and responds to change.'
              },
              {
                type: 'concept',
                title: 'Cardinal Signs',
                content: 'Aries, Cancer, Libra, Capricorn - The initiators. Cardinal signs start new seasons and love to begin new projects. They\'re leaders who set things in motion.',
                icon: '🚀'
              },
              {
                type: 'concept',
                title: 'Fixed Signs',
                content: 'Taurus, Leo, Scorpio, Aquarius - The stabilizers. Fixed signs occur in the middle of seasons and excel at maintaining, persisting, and seeing things through.',
                icon: '⚓'
              },
              {
                type: 'concept',
                title: 'Mutable Signs',
                content: 'Gemini, Virgo, Sagittarius, Pisces - The adapters. Mutable signs end seasons and are flexible, versatile, and comfortable with change.',
                icon: '🌊'
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
            estimatedMinutes: 12,
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
            estimatedMinutes: 10,
            content: [
              { type: 'heading', content: 'Your Inner World', level: 2 },
              {
                type: 'text',
                content: 'Personal planets move quickly through the zodiac and represent your day-to-day personality, desires, and habits.'
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
                type: 'concept',
                title: 'The Moon',
                content: 'Your emotional nature, instincts, and inner needs. The Moon shows how you nurture yourself and what makes you feel safe.',
                icon: '🌙'
              },
              {
                type: 'personalized',
                dataKey: 'moonSign',
                template: 'Your Moon in {value} reveals your emotional needs and how you process feelings.'
              },
              {
                type: 'concept',
                title: 'Mercury',
                content: 'Your mind, communication style, and learning approach. Mercury rules how you think, speak, and process information.',
                icon: '☿️'
              },
              {
                type: 'personalized',
                dataKey: 'mercurySign',
                template: 'Your Mercury in {value} shapes how you communicate and learn.'
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
                type: 'concept',
                title: 'Mars',
                content: 'Your drive, ambition, and how you take action. Mars represents your energy, assertiveness, and what motivates you.',
                icon: '♂️'
              },
              {
                type: 'personalized',
                dataKey: 'marsSign',
                template: 'Your Mars in {value} shows how you pursue goals and express your energy.'
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
            estimatedMinutes: 8,
            content: [
              { type: 'heading', content: 'Bridging Inner & Outer Worlds', level: 2 },
              {
                type: 'text',
                content: 'Jupiter and Saturn take longer to move through the zodiac and represent how we engage with society and develop over time.'
              },
              {
                type: 'concept',
                title: 'Jupiter',
                content: 'The planet of expansion, luck, and wisdom. Jupiter shows where you find opportunity, growth, and meaning. It expands whatever it touches.',
                icon: '♃'
              },
              {
                type: 'personalized',
                dataKey: 'jupiterSign',
                template: 'Your Jupiter in {value} reveals where you naturally attract abundance and seek growth.'
              },
              {
                type: 'concept',
                title: 'Saturn',
                content: 'The planet of structure, discipline, and mastery. Saturn shows where you face challenges that build character and lasting achievement.',
                icon: '♄'
              },
              {
                type: 'personalized',
                dataKey: 'saturnSign',
                template: 'Your Saturn in {value} indicates the areas where you\'re building mastery through effort and patience.'
              },
              {
                type: 'callout',
                content: 'Jupiter and Saturn work as a pair - Jupiter expands and says "yes" while Saturn contracts and says "not yet." Both are necessary for balanced growth.',
                variant: 'tip'
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
            estimatedMinutes: 8,
            content: [
              { type: 'heading', content: 'Collective & Transformative Forces', level: 2 },
              {
                type: 'text',
                content: 'The outer planets move very slowly and influence entire generations. Their house placement in your chart is more personally significant than their sign.'
              },
              {
                type: 'concept',
                title: 'Uranus',
                content: 'Revolution, innovation, and sudden change. Uranus breaks patterns and brings unexpected awakenings. It rules originality and the urge for freedom.',
                icon: '♅'
              },
              {
                type: 'concept',
                title: 'Neptune',
                content: 'Dreams, spirituality, and transcendence. Neptune dissolves boundaries and connects us to the mystical. It rules imagination, compassion, and illusion.',
                icon: '♆'
              },
              {
                type: 'concept',
                title: 'Pluto',
                content: 'Transformation, power, and rebirth. Pluto takes us through death-and-rebirth cycles, destroying what no longer serves so something new can emerge.',
                icon: '♇'
              },
              {
                type: 'callout',
                content: 'Because outer planets move so slowly, everyone born within several years shares the same outer planet signs. The houses they occupy make them personal.',
                variant: 'info'
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
            estimatedMinutes: 10,
            content: [
              { type: 'heading', content: 'The Stage of Life', level: 2 },
              {
                type: 'text',
                content: 'If planets are the actors and signs are how they perform, houses are where the action takes place. The 12 houses represent different areas of life.'
              },
              {
                type: 'callout',
                content: 'Your houses are determined by your exact birth time and location. This is why knowing your birth time matters!',
                variant: 'info'
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
                type: 'personalized',
                dataKey: 'sunHouse',
                template: 'Your Sun is in the {value} house, meaning your identity and purpose shine most brightly in this life area.'
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
            estimatedMinutes: 8,
            content: [
              { type: 'heading', content: 'The Four Angles', level: 2 },
              {
                type: 'text',
                content: 'The angular houses (1st, 4th, 7th, 10th) are the most powerful positions in a chart. Planets here have strong, visible influence.'
              },
              {
                type: 'concept',
                title: '1st House / Ascendant',
                content: 'Your rising sign and how you present yourself to the world. This is your "front door" - the first impression others have of you.',
                icon: '👤'
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
                type: 'concept',
                title: '10th House / Midheaven',
                content: 'Your career, public image, and legacy. This is your most visible point - how the world sees your achievements and contributions.',
                icon: '⭐'
              },
              {
                type: 'callout',
                content: 'Any planet conjunct (near) an angle becomes especially prominent in your life and personality.',
                variant: 'tip'
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
            estimatedMinutes: 10,
            content: [
              { type: 'heading', content: 'The Three Pillars', level: 2 },
              {
                type: 'text',
                content: 'Your "Big Three" - Sun, Moon, and Rising - form the foundation of who you are. Understanding these three placements gives you a surprisingly complete picture of your personality.'
              },
              {
                type: 'concept',
                title: 'The Sun: Your Core Self',
                content: 'Your Sun sign represents your conscious identity, ego, and life purpose. It\'s who you\'re becoming and what makes you feel vital. This is your "character" in the story of your life.',
                icon: '☀️'
              },
              {
                type: 'personalized',
                dataKey: 'sunSign',
                template: 'With your Sun in {value}, your core identity is expressed through {value} qualities.'
              },
              {
                type: 'concept',
                title: 'The Moon: Your Inner Self',
                content: 'Your Moon sign reveals your emotional nature, instincts, and what you need to feel safe. It\'s the "private you" that comes out with those you trust. Your Moon shows how you recharge.',
                icon: '🌙'
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
                type: 'personalized',
                dataKey: 'risingSign',
                template: 'With {value} Rising, you approach life and present yourself with {value} energy.'
              },
              {
                type: 'callout',
                content: 'Think of it this way: Sun = who you are, Moon = what you need, Rising = how you appear.',
                variant: 'tip'
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
            estimatedMinutes: 12,
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
    estimatedMinutes: 120,
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
            estimatedMinutes: 8,
            content: [
              { type: 'heading', content: 'The Conversation Between Planets', level: 2 },
              {
                type: 'text',
                content: 'Aspects are the geometric angles formed between planets in your chart. They show how different parts of your personality interact - whether they work together harmoniously or create tension that drives growth.'
              },
              {
                type: 'concept',
                title: 'What Makes an Aspect?',
                content: 'When two planets are a specific number of degrees apart, they form an aspect. The main aspects are based on dividing the 360° circle: conjunction (0°), opposition (180°), trine (120°), square (90°), and sextile (60°).',
                icon: '📐'
              },
              {
                type: 'text',
                content: 'Aspects are perhaps the most important factor in chart interpretation. A planet\'s sign and house tell you what and where, but aspects reveal the dynamic tensions and harmonies that shape how that energy actually manifests.'
              },
              {
                type: 'callout',
                content: 'Orbs allow some flexibility - planets don\'t need to be at exact angles. Most astrologers use 8-10° orbs for major aspects involving the Sun and Moon, and tighter orbs (4-6°) for other planets.',
                variant: 'info'
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
            estimatedMinutes: 12,
            content: [
              { type: 'heading', content: 'The Five Major Aspects', level: 2 },
              {
                type: 'text',
                content: 'These five aspects form the foundation of chart interpretation. Each creates a different type of relationship between planets.'
              },
              {
                type: 'concept',
                title: 'Conjunction (0°)',
                content: 'Planets merge their energies - they\'re so close they become a unified force. This intensifies both planets, creating a powerful focal point. The nature depends on the planets involved.',
                icon: '⚫'
              },
              {
                type: 'concept',
                title: 'Opposition (180°)',
                content: 'Planets face off across the chart, creating awareness of polarities. This aspect requires integration - learning to balance two seemingly opposite needs. It often plays out through relationships.',
                icon: '↔️'
              },
              {
                type: 'concept',
                title: 'Trine (120°)',
                content: 'The most harmonious aspect - planets in the same element flow together naturally. Trines represent talents and ease, but can lead to complacency if not consciously developed.',
                icon: '△'
              },
              {
                type: 'concept',
                title: 'Square (90°)',
                content: 'Tension that demands action. Squares create friction between planets, forcing growth through challenges. They\'re often the source of your greatest accomplishments.',
                icon: '◻️'
              },
              {
                type: 'concept',
                title: 'Sextile (60°)',
                content: 'Opportunity aspects - planets support each other but require effort to activate. Sextiles offer potential that you must consciously choose to develop.',
                icon: '✶'
              },
              {
                type: 'callout',
                content: 'Squares are often feared but they\'re incredibly valuable - they provide the motivation and drive that trines lack. The most successful people often have prominent squares in their charts.',
                variant: 'tip'
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
            estimatedMinutes: 10,
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
            estimatedMinutes: 8,
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
            estimatedMinutes: 10,
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
            estimatedMinutes: 8,
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
            estimatedMinutes: 10,
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
            estimatedMinutes: 8,
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
            estimatedMinutes: 10,
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
            estimatedMinutes: 12,
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
            estimatedMinutes: 10,
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
    estimatedMinutes: 35,
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
            estimatedMinutes: 8,
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
            estimatedMinutes: 8,
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
            estimatedMinutes: 7,
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
            estimatedMinutes: 7,
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
            estimatedMinutes: 5,
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
    estimatedMinutes: 40,
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
            estimatedMinutes: 7,
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
            estimatedMinutes: 8,
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
            estimatedMinutes: 8,
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
            estimatedMinutes: 7,
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
            estimatedMinutes: 6,
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
            estimatedMinutes: 6,
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
    estimatedMinutes: 45,
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
            estimatedMinutes: 8,
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
            estimatedMinutes: 7,
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
            estimatedMinutes: 10,
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
            estimatedMinutes: 8,
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
            estimatedMinutes: 8,
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
    estimatedMinutes: 50,
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
            estimatedMinutes: 8,
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
            estimatedMinutes: 7,
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
            estimatedMinutes: 8,
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
            estimatedMinutes: 8,
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
            estimatedMinutes: 7,
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
    estimatedMinutes: 35,
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
            estimatedMinutes: 8,
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
            estimatedMinutes: 8,
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
            estimatedMinutes: 7,
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
            estimatedMinutes: 7,
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
