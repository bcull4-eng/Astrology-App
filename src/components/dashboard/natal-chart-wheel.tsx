'use client'

/**
 * Natal Chart Wheel Component
 *
 * Displays a zodiac wheel with planetary positions.
 */

import type { NatalChart, ZodiacSign, Planet } from '@/types'

interface NatalChartWheelProps {
  chart: NatalChart
}

const ZODIAC_SIGNS: ZodiacSign[] = [
  'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
  'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
]

const SIGN_SYMBOLS: Record<ZodiacSign, string> = {
  aries: '♈', taurus: '♉', gemini: '♊', cancer: '♋',
  leo: '♌', virgo: '♍', libra: '♎', scorpio: '♏',
  sagittarius: '♐', capricorn: '♑', aquarius: '♒', pisces: '♓'
}

const PLANET_SYMBOLS: Record<Planet, string> = {
  sun: '☉', moon: '☽', mercury: '☿', venus: '♀',
  mars: '♂', jupiter: '♃', saturn: '♄', uranus: '♅',
  neptune: '♆', pluto: '♇', north_node: '☊', chiron: '⚷'
}

const PLANET_COLORS: Record<Planet, string> = {
  sun: '#FFD700', moon: '#C0C0C0', mercury: '#87CEEB', venus: '#FF69B4',
  mars: '#FF4500', jupiter: '#FFA500', saturn: '#8B4513', uranus: '#00CED1',
  neptune: '#4169E1', pluto: '#8B008B', north_node: '#9370DB', chiron: '#20B2AA'
}

// Personalized sign interpretations
const SIGN_INTERPRETATIONS: Record<ZodiacSign, {
  sun: string
  moon: string
  rising: string
  mercury: string
  venus: string
  mars: string
}> = {
  aries: {
    sun: "You're a natural leader with bold energy. You thrive when taking initiative and aren't afraid to be first.",
    moon: "You process emotions quickly and directly. You need action and movement to feel emotionally balanced.",
    rising: "You come across as confident and energetic. People see you as someone who gets things done.",
    mercury: "You think fast and speak directly. You prefer to get straight to the point.",
    venus: "You love the thrill of the chase. Passion and excitement keep your relationships alive.",
    mars: "You have abundant energy and a competitive spirit. You go after what you want without hesitation.",
  },
  taurus: {
    sun: "You value stability and the finer things in life. You're dependable and build things that last.",
    moon: "You need comfort and security to feel safe. Routine and sensory pleasures soothe you.",
    rising: "You appear calm and grounded. People find your steady presence reassuring.",
    mercury: "You think thoroughly before speaking. Your ideas are practical and well-considered.",
    venus: "You love deeply and loyally. Quality time and physical affection are your love languages.",
    mars: "You're persistent and determined. Once you set a goal, you work toward it steadily.",
  },
  gemini: {
    sun: "You're curious and adaptable, always learning something new. Variety keeps you energized.",
    moon: "You process emotions through talking and thinking. Mental stimulation helps you feel balanced.",
    rising: "You come across as witty and engaging. People enjoy your quick mind and conversational skills.",
    mercury: "Your mind moves fast and you're an excellent communicator. You see multiple perspectives easily.",
    venus: "You need mental connection in relationships. Stimulating conversation is romantic to you.",
    mars: "You pursue goals with mental agility. You're skilled at multitasking and adapting your approach.",
  },
  cancer: {
    sun: "You're nurturing and protective of those you love. Home and family are central to your identity.",
    moon: "You feel emotions deeply and intuitively. Creating emotional safety is essential for you.",
    rising: "You appear caring and approachable. People sense your warmth and emotional intelligence.",
    mercury: "You think with your heart as much as your head. Your memory and intuition are strong.",
    venus: "You love through nurturing and care. You want deep emotional bonds and a sense of home.",
    mars: "You're motivated by protecting what matters. You can be fierce when defending loved ones.",
  },
  leo: {
    sun: "You're meant to shine. Creativity and self-expression are at the heart of who you are.",
    moon: "You need to feel appreciated and special. Recognition feeds your emotional wellbeing.",
    rising: "You radiate warmth and confidence. People are drawn to your charismatic presence.",
    mercury: "You communicate with flair and creativity. You have a gift for inspiring others.",
    venus: "You love generously and want to be adored. Grand gestures and loyalty matter to you.",
    mars: "You pursue goals with heart and passion. You're driven to create and be recognized.",
  },
  virgo: {
    sun: "You find purpose in being helpful and improving things. Details matter to you.",
    moon: "You feel settled when things are organized. Helping others grounds your emotions.",
    rising: "You appear thoughtful and capable. People see you as someone who has it together.",
    mercury: "Your mind is analytical and detail-oriented. You excel at problem-solving.",
    venus: "You show love through acts of service. You notice the small things that matter.",
    mars: "You pursue goals methodically and efficiently. You improve everything you touch.",
  },
  libra: {
    sun: "You seek balance and harmony in all things. Relationships and fairness define you.",
    moon: "You need peace and beauty to feel emotionally balanced. Conflict is draining for you.",
    rising: "You appear charming and diplomatic. People find you easy to get along with.",
    mercury: "You see all sides of every situation. You're a natural mediator and communicator.",
    venus: "You're a true romantic who values partnership. Beauty and harmony attract you.",
    mars: "You pursue goals through collaboration. You achieve more when working with others.",
  },
  scorpio: {
    sun: "You live life intensely and seek deep truth. Transformation is your superpower.",
    moon: "You feel emotions with great depth. You need trust and intimacy to feel secure.",
    rising: "You appear mysterious and powerful. People sense your intensity and depth.",
    mercury: "Your mind penetrates beneath the surface. You're drawn to uncover hidden truths.",
    venus: "You love with complete devotion. You want soul-deep connections, not surface-level.",
    mars: "You pursue goals with laser focus. Once committed, nothing can stop you.",
  },
  sagittarius: {
    sun: "You're an explorer at heart, always seeking meaning and adventure. Freedom is essential.",
    moon: "You need space and optimism to feel good. Adventure and learning lift your spirits.",
    rising: "You appear enthusiastic and open-minded. People see you as adventurous and fun.",
    mercury: "Your mind seeks the big picture and meaning. You're a natural philosopher.",
    venus: "You love freedom in relationships. Shared adventures and growth attract you.",
    mars: "You pursue goals with optimism and big vision. You're motivated by meaning and expansion.",
  },
  capricorn: {
    sun: "You're ambitious and determined to achieve. Building something lasting matters to you.",
    moon: "You feel secure through accomplishment. Structure and goals steady your emotions.",
    rising: "You appear mature and capable. People see you as someone they can rely on.",
    mercury: "Your thinking is strategic and practical. You plan for the long term.",
    venus: "You love steadily and traditionally. You value commitment and building together.",
    mars: "You pursue goals with discipline and patience. You're willing to work for what matters.",
  },
  aquarius: {
    sun: "You're here to innovate and champion change. Being unique is part of your identity.",
    moon: "You need intellectual freedom to feel balanced. You process emotions through ideas.",
    rising: "You appear unique and forward-thinking. People see you as original and independent.",
    mercury: "Your mind is innovative and unconventional. You think ahead of your time.",
    venus: "You love with friendship at the core. You need mental connection and independence.",
    mars: "You pursue goals in your own unique way. You're motivated by making a difference.",
  },
  pisces: {
    sun: "You're deeply intuitive and creative. Compassion and imagination define you.",
    moon: "You feel everything deeply and need time to dream. Creativity soothes your soul.",
    rising: "You appear gentle and empathetic. People sense your compassion and creativity.",
    mercury: "Your mind works through intuition and imagery. You think in feelings and pictures.",
    venus: "You love unconditionally and romantically. You seek a spiritual connection.",
    mars: "You pursue goals through inspiration and flow. Your intuition guides your actions.",
  },
}

export function NatalChartWheel({ chart }: NatalChartWheelProps) {
  const size = 320
  const center = size / 2
  const outerRadius = size / 2 - 10
  const signRadius = outerRadius - 25
  const planetRadius = signRadius - 35
  const innerRadius = planetRadius - 30

  // Calculate position on circle from degree (0 = Aries 0°)
  function getPosition(degree: number, radius: number) {
    // Astrology charts go counter-clockwise, starting from 9 o'clock position
    const adjustedDegree = 180 - degree
    const radians = (adjustedDegree * Math.PI) / 180
    return {
      x: center + radius * Math.cos(radians),
      y: center - radius * Math.sin(radians)
    }
  }

  // Get absolute degree for a placement
  function getAbsoluteDegree(sign: ZodiacSign, degree: number) {
    const signIndex = ZODIAC_SIGNS.indexOf(sign)
    return signIndex * 30 + degree
  }

  // Get sun and moon signs for description
  const sunPlacement = chart.placements.find(p => p.planet === 'sun')
  const moonPlacement = chart.placements.find(p => p.planet === 'moon')
  const risingSign = chart.ascendant?.sign

  const signNames: Record<ZodiacSign, string> = {
    aries: 'Aries', taurus: 'Taurus', gemini: 'Gemini', cancer: 'Cancer',
    leo: 'Leo', virgo: 'Virgo', libra: 'Libra', scorpio: 'Scorpio',
    sagittarius: 'Sagittarius', capricorn: 'Capricorn', aquarius: 'Aquarius', pisces: 'Pisces'
  }

  return (
    <div className="mb-8">
      <h2 className="text-white font-semibold mb-2">Your Natal Chart</h2>
      <p className="text-slate-400 text-sm mb-6">
        This is your cosmic blueprint—a snapshot of the sky at the moment you were born.
        {sunPlacement && moonPlacement && risingSign && (
          <> You&apos;re a <span className="text-indigo-400">{signNames[sunPlacement.sign]} Sun</span> with
          a <span className="text-indigo-400">{signNames[moonPlacement.sign]} Moon</span> and
          <span className="text-indigo-400"> {signNames[risingSign]} Rising</span>.
          Your Sun reflects your core identity, your Moon reveals your emotional nature,
          and your Rising sign shapes how others see you.</>
        )}
      </p>

      <div className="flex justify-center">
        <svg width={480} height={380} viewBox="0 0 480 380">
          {/* Offset the chart to make room for annotations */}
          <g transform="translate(80, 30)">
            {/* Background circles */}
            <circle cx={center} cy={center} r={outerRadius} fill="none" stroke="#334155" strokeWidth="1" />
            <circle cx={center} cy={center} r={signRadius} fill="none" stroke="#334155" strokeWidth="1" />
            <circle cx={center} cy={center} r={innerRadius} fill="none" stroke="#334155" strokeWidth="1" />

            {/* Zodiac sign divisions and symbols */}
            {ZODIAC_SIGNS.map((sign, index) => {
              const startDegree = index * 30
              const midDegree = startDegree + 15
              const startPos = getPosition(startDegree, outerRadius)
              const innerStartPos = getPosition(startDegree, innerRadius)
              const symbolPos = getPosition(midDegree, (outerRadius + signRadius) / 2)

              return (
                <g key={sign}>
                  {/* Division line */}
                  <line
                    x1={innerStartPos.x}
                    y1={innerStartPos.y}
                    x2={startPos.x}
                    y2={startPos.y}
                    stroke="#475569"
                    strokeWidth="1"
                  />
                  {/* Sign symbol */}
                  <text
                    x={symbolPos.x}
                    y={symbolPos.y}
                    fill="#94a3b8"
                    fontSize="14"
                    textAnchor="middle"
                    dominantBaseline="central"
                  >
                    {SIGN_SYMBOLS[sign]}
                  </text>
                </g>
              )
            })}

            {/* Ascendant line */}
            {chart.ascendant && (
              <line
                x1={center}
                y1={center}
                x2={getPosition(getAbsoluteDegree(chart.ascendant.sign, chart.ascendant.degree), outerRadius).x}
                y2={getPosition(getAbsoluteDegree(chart.ascendant.sign, chart.ascendant.degree), outerRadius).y}
                stroke="#6366f1"
                strokeWidth="2"
              />
            )}

            {/* Midheaven line */}
            {chart.midheaven && (
              <line
                x1={center}
                y1={center}
                x2={getPosition(getAbsoluteDegree(chart.midheaven.sign, chart.midheaven.degree), outerRadius).x}
                y2={getPosition(getAbsoluteDegree(chart.midheaven.sign, chart.midheaven.degree), outerRadius).y}
                stroke="#8b5cf6"
                strokeWidth="2"
                strokeDasharray="4,4"
              />
            )}

            {/* Planet positions */}
            {chart.placements.map((placement, index) => {
              const degree = getAbsoluteDegree(placement.sign, placement.degree)
              // Spread planets slightly to avoid overlap
              const adjustedRadius = planetRadius + (index % 3 - 1) * 12
              const pos = getPosition(degree, adjustedRadius)
              const color = PLANET_COLORS[placement.planet] || '#ffffff'

              return (
                <g key={placement.planet}>
                  {/* Planet symbol */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r="12"
                    fill="#1e293b"
                    stroke={color}
                    strokeWidth="2"
                  />
                  <text
                    x={pos.x}
                    y={pos.y}
                    fill={color}
                    fontSize="12"
                    textAnchor="middle"
                    dominantBaseline="central"
                  >
                    {PLANET_SYMBOLS[placement.planet]}
                  </text>
                  {/* Retrograde indicator */}
                  {placement.is_retrograde && (
                    <text
                      x={pos.x + 10}
                      y={pos.y - 10}
                      fill="#ef4444"
                      fontSize="8"
                      textAnchor="middle"
                    >
                      R
                    </text>
                  )}
                </g>
              )
            })}

            {/* Center point */}
            <circle cx={center} cy={center} r="3" fill="#6366f1" />
          </g>

          {/* Annotation: Zodiac Signs (top right) */}
          <g>
            <path
              d="M 385 50 Q 360 60 340 75"
              fill="none"
              stroke="#64748b"
              strokeWidth="1"
              markerEnd="url(#arrowhead)"
            />
            <text x="390" y="45" fill="#94a3b8" fontSize="11" fontWeight="500">Zodiac Signs</text>
            <text x="390" y="58" fill="#64748b" fontSize="9">The 12 signs form the</text>
            <text x="390" y="69" fill="#64748b" fontSize="9">backdrop of the sky</text>
          </g>

          {/* Annotation: Planets (left side) */}
          <g>
            <path
              d="M 70 140 Q 90 145 110 150"
              fill="none"
              stroke="#64748b"
              strokeWidth="1"
              markerEnd="url(#arrowhead)"
            />
            <text x="10" y="120" fill="#94a3b8" fontSize="11" fontWeight="500">Planets</text>
            <text x="10" y="133" fill="#64748b" fontSize="9">Show where celestial</text>
            <text x="10" y="144" fill="#64748b" fontSize="9">bodies were when</text>
            <text x="10" y="155" fill="#64748b" fontSize="9">you were born</text>
          </g>

          {/* Annotation: Ascendant (left bottom) */}
          <g>
            <path
              d="M 70 260 Q 100 240 130 220"
              fill="none"
              stroke="#6366f1"
              strokeWidth="1"
              markerEnd="url(#arrowhead-asc)"
            />
            <text x="10" y="265" fill="#6366f1" fontSize="11" fontWeight="500">Ascendant</text>
            <text x="10" y="278" fill="#64748b" fontSize="9">Your rising sign—</text>
            <text x="10" y="289" fill="#64748b" fontSize="9">how others see you</text>
          </g>

          {/* Annotation: Midheaven (top) */}
          <g>
            <path
              d="M 240 15 Q 240 30 240 50"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="1"
              strokeDasharray="3,2"
              markerEnd="url(#arrowhead-mc)"
            />
            <text x="195" y="10" fill="#8b5cf6" fontSize="11" fontWeight="500">Midheaven (MC)</text>
            <text x="280" y="10" fill="#64748b" fontSize="9">Your public image & career path</text>
          </g>

          {/* Annotation: Houses (bottom right) */}
          <g>
            <path
              d="M 400 280 Q 370 260 340 240"
              fill="none"
              stroke="#64748b"
              strokeWidth="1"
              markerEnd="url(#arrowhead)"
            />
            <text x="390" y="290" fill="#94a3b8" fontSize="11" fontWeight="500">Houses</text>
            <text x="390" y="303" fill="#64748b" fontSize="9">12 life areas like</text>
            <text x="390" y="314" fill="#64748b" fontSize="9">career, love, home</text>
          </g>

          {/* Arrow markers */}
          <defs>
            <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M 0 0 L 6 3 L 0 6 Z" fill="#64748b" />
            </marker>
            <marker id="arrowhead-asc" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M 0 0 L 6 3 L 0 6 Z" fill="#6366f1" />
            </marker>
            <marker id="arrowhead-mc" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M 0 0 L 6 3 L 0 6 Z" fill="#8b5cf6" />
            </marker>
          </defs>
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 justify-center">
        {chart.placements.slice(0, 10).map((placement) => (
          <div key={placement.planet} className="flex items-center gap-1.5 text-xs">
            <span style={{ color: PLANET_COLORS[placement.planet] }}>
              {PLANET_SYMBOLS[placement.planet]}
            </span>
            <span className="text-slate-400 capitalize">
              {placement.planet.replace('_', ' ')}
            </span>
            <span className="text-slate-500">
              {SIGN_SYMBOLS[placement.sign]} {Math.round(placement.degree)}°
            </span>
            {placement.is_retrograde && (
              <span className="text-red-400 text-[10px]">R</span>
            )}
          </div>
        ))}
      </div>

      {/* Personalized Interpretations */}
      <div className="mt-8 space-y-4">
        <h3 className="text-white font-semibold text-sm">What This Means For You</h3>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Sun Sign */}
          {sunPlacement && (
            <div className="bg-slate-800/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span style={{ color: PLANET_COLORS.sun }} className="text-lg">{PLANET_SYMBOLS.sun}</span>
                <span className="text-white font-medium text-sm">Your Core Identity</span>
                <span className="text-slate-500 text-xs">Sun in {signNames[sunPlacement.sign]}</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                {SIGN_INTERPRETATIONS[sunPlacement.sign].sun}
              </p>
            </div>
          )}

          {/* Moon Sign */}
          {moonPlacement && (
            <div className="bg-slate-800/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span style={{ color: PLANET_COLORS.moon }} className="text-lg">{PLANET_SYMBOLS.moon}</span>
                <span className="text-white font-medium text-sm">Your Emotional World</span>
                <span className="text-slate-500 text-xs">Moon in {signNames[moonPlacement.sign]}</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                {SIGN_INTERPRETATIONS[moonPlacement.sign].moon}
              </p>
            </div>
          )}

          {/* Rising Sign */}
          {risingSign && (
            <div className="bg-slate-800/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-indigo-400 text-lg">↑</span>
                <span className="text-white font-medium text-sm">How Others See You</span>
                <span className="text-slate-500 text-xs">{signNames[risingSign]} Rising</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                {SIGN_INTERPRETATIONS[risingSign].rising}
              </p>
            </div>
          )}

          {/* Mercury */}
          {chart.placements.find(p => p.planet === 'mercury') && (
            <div className="bg-slate-800/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span style={{ color: PLANET_COLORS.mercury }} className="text-lg">{PLANET_SYMBOLS.mercury}</span>
                <span className="text-white font-medium text-sm">How You Think & Communicate</span>
                <span className="text-slate-500 text-xs">Mercury in {signNames[chart.placements.find(p => p.planet === 'mercury')!.sign]}</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                {SIGN_INTERPRETATIONS[chart.placements.find(p => p.planet === 'mercury')!.sign].mercury}
              </p>
            </div>
          )}

          {/* Venus */}
          {chart.placements.find(p => p.planet === 'venus') && (
            <div className="bg-slate-800/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span style={{ color: PLANET_COLORS.venus }} className="text-lg">{PLANET_SYMBOLS.venus}</span>
                <span className="text-white font-medium text-sm">How You Love</span>
                <span className="text-slate-500 text-xs">Venus in {signNames[chart.placements.find(p => p.planet === 'venus')!.sign]}</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                {SIGN_INTERPRETATIONS[chart.placements.find(p => p.planet === 'venus')!.sign].venus}
              </p>
            </div>
          )}

          {/* Mars */}
          {chart.placements.find(p => p.planet === 'mars') && (
            <div className="bg-slate-800/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span style={{ color: PLANET_COLORS.mars }} className="text-lg">{PLANET_SYMBOLS.mars}</span>
                <span className="text-white font-medium text-sm">How You Take Action</span>
                <span className="text-slate-500 text-xs">Mars in {signNames[chart.placements.find(p => p.planet === 'mars')!.sign]}</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                {SIGN_INTERPRETATIONS[chart.placements.find(p => p.planet === 'mars')!.sign].mars}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
