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
