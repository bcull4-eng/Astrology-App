'use client'

import { useState } from 'react'
import type { NatalChart, ChatMessage, ComparisonItem, InteractiveOption } from '@/types'
import type { ZodiacSign, Planet } from '@/types/learning'

// Zodiac sign data
const ZODIAC_DATA: Record<ZodiacSign, { symbol: string; element: string; modality: string; color: string; dates: string }> = {
  aries: { symbol: '♈', element: 'Fire', modality: 'Cardinal', color: 'from-red-500 to-orange-500', dates: 'Mar 21 - Apr 19' },
  taurus: { symbol: '♉', element: 'Earth', modality: 'Fixed', color: 'from-green-600 to-emerald-500', dates: 'Apr 20 - May 20' },
  gemini: { symbol: '♊', element: 'Air', modality: 'Mutable', color: 'from-yellow-400 to-amber-500', dates: 'May 21 - Jun 20' },
  cancer: { symbol: '♋', element: 'Water', modality: 'Cardinal', color: 'from-slate-400 to-slate-300', dates: 'Jun 21 - Jul 22' },
  leo: { symbol: '♌', element: 'Fire', modality: 'Fixed', color: 'from-orange-500 to-yellow-500', dates: 'Jul 23 - Aug 22' },
  virgo: { symbol: '♍', element: 'Earth', modality: 'Mutable', color: 'from-amber-600 to-yellow-600', dates: 'Aug 23 - Sep 22' },
  libra: { symbol: '♎', element: 'Air', modality: 'Cardinal', color: 'from-pink-400 to-rose-400', dates: 'Sep 23 - Oct 22' },
  scorpio: { symbol: '♏', element: 'Water', modality: 'Fixed', color: 'from-purple-700 to-red-700', dates: 'Oct 23 - Nov 21' },
  sagittarius: { symbol: '♐', element: 'Fire', modality: 'Mutable', color: 'from-purple-500 to-indigo-500', dates: 'Nov 22 - Dec 21' },
  capricorn: { symbol: '♑', element: 'Earth', modality: 'Cardinal', color: 'from-slate-600 to-slate-500', dates: 'Dec 22 - Jan 19' },
  aquarius: { symbol: '♒', element: 'Air', modality: 'Fixed', color: 'from-cyan-500 to-blue-500', dates: 'Jan 20 - Feb 18' },
  pisces: { symbol: '♓', element: 'Water', modality: 'Mutable', color: 'from-teal-400 to-cyan-400', dates: 'Feb 19 - Mar 20' },
}

const PLANET_DATA: Record<Planet, { symbol: string; name: string; meaning: string; color: string }> = {
  sun: { symbol: '☉', name: 'Sun', meaning: 'Identity & Ego', color: 'from-yellow-400 to-orange-500' },
  moon: { symbol: '☽', name: 'Moon', meaning: 'Emotions & Instincts', color: 'from-slate-300 to-slate-400' },
  mercury: { symbol: '☿', name: 'Mercury', meaning: 'Communication & Mind', color: 'from-emerald-400 to-teal-500' },
  venus: { symbol: '♀', name: 'Venus', meaning: 'Love & Values', color: 'from-pink-400 to-rose-500' },
  mars: { symbol: '♂', name: 'Mars', meaning: 'Action & Drive', color: 'from-red-500 to-red-600' },
  jupiter: { symbol: '♃', name: 'Jupiter', meaning: 'Expansion & Luck', color: 'from-purple-400 to-indigo-500' },
  saturn: { symbol: '♄', name: 'Saturn', meaning: 'Structure & Lessons', color: 'from-slate-500 to-slate-600' },
  uranus: { symbol: '♅', name: 'Uranus', meaning: 'Innovation & Change', color: 'from-cyan-400 to-blue-500' },
  neptune: { symbol: '♆', name: 'Neptune', meaning: 'Dreams & Spirituality', color: 'from-blue-400 to-purple-500' },
  pluto: { symbol: '♇', name: 'Pluto', meaning: 'Transformation & Power', color: 'from-slate-700 to-purple-900' },
}

const ELEMENT_COLORS = {
  Fire: 'bg-gradient-to-r from-red-500 to-orange-500',
  Earth: 'bg-gradient-to-r from-green-600 to-emerald-500',
  Air: 'bg-gradient-to-r from-yellow-400 to-amber-400',
  Water: 'bg-gradient-to-r from-blue-500 to-cyan-500',
}

// Mini Zodiac Wheel Component
export function ZodiacWheelVisual({
  highlight = [],
  showUserPlacements = false,
  natalChart
}: {
  highlight?: ZodiacSign[]
  showUserPlacements?: boolean
  natalChart?: NatalChart | null
}) {
  const signs: ZodiacSign[] = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']

  const userPlacements = showUserPlacements && natalChart
    ? natalChart.placements.reduce((acc, p) => {
        if (!acc[p.sign]) acc[p.sign] = []
        acc[p.sign].push(p.planet)
        return acc
      }, {} as Record<string, string[]>)
    : {}

  return (
    <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
      <div className="relative w-64 h-64 mx-auto">
        {/* Outer ring with signs */}
        <div className="absolute inset-0">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Background circle */}
            <circle cx="100" cy="100" r="95" fill="none" stroke="rgb(51, 65, 85)" strokeWidth="1" />
            <circle cx="100" cy="100" r="70" fill="none" stroke="rgb(51, 65, 85)" strokeWidth="1" />

            {/* Sign segments */}
            {signs.map((sign, i) => {
              const angle = (i * 30 - 90) * (Math.PI / 180)
              const nextAngle = ((i + 1) * 30 - 90) * (Math.PI / 180)
              const midAngle = ((i * 30 + 15) - 90) * (Math.PI / 180)

              const x1 = 100 + 70 * Math.cos(angle)
              const y1 = 100 + 70 * Math.sin(angle)
              const x2 = 100 + 95 * Math.cos(angle)
              const y2 = 100 + 95 * Math.sin(angle)

              const textX = 100 + 82 * Math.cos(midAngle)
              const textY = 100 + 82 * Math.sin(midAngle)

              const isHighlighted = highlight.includes(sign)
              const hasUserPlanet = userPlacements[sign]?.length > 0
              const data = ZODIAC_DATA[sign]

              return (
                <g key={sign}>
                  {/* Divider lines */}
                  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgb(71, 85, 105)" strokeWidth="1" />

                  {/* Highlight arc if needed */}
                  {(isHighlighted || hasUserPlanet) && (
                    <path
                      d={`M ${100 + 70 * Math.cos(angle)} ${100 + 70 * Math.sin(angle)}
                          A 70 70 0 0 1 ${100 + 70 * Math.cos(nextAngle)} ${100 + 70 * Math.sin(nextAngle)}
                          L ${100 + 95 * Math.cos(nextAngle)} ${100 + 95 * Math.sin(nextAngle)}
                          A 95 95 0 0 0 ${100 + 95 * Math.cos(angle)} ${100 + 95 * Math.sin(angle)} Z`}
                      fill={isHighlighted ? 'rgba(139, 92, 246, 0.3)' : 'rgba(139, 92, 246, 0.15)'}
                    />
                  )}

                  {/* Sign symbol */}
                  <text
                    x={textX}
                    y={textY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className={`text-sm ${isHighlighted || hasUserPlanet ? 'fill-purple-300' : 'fill-slate-400'}`}
                    style={{ fontSize: '14px' }}
                  >
                    {data.symbol}
                  </text>
                </g>
              )
            })}

            {/* Center decoration */}
            <circle cx="100" cy="100" r="25" fill="rgb(30, 41, 59)" stroke="rgb(71, 85, 105)" strokeWidth="1" />
            <text x="100" y="100" textAnchor="middle" dominantBaseline="middle" className="fill-purple-400 text-lg">
              ✧
            </text>
          </svg>
        </div>
      </div>

      {/* Legend for user placements */}
      {showUserPlacements && natalChart && (
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {natalChart.placements.slice(0, 5).map((p) => (
            <span key={p.planet} className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">
              {PLANET_DATA[p.planet as Planet]?.symbol} in {ZODIAC_DATA[p.sign as ZodiacSign]?.symbol}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

// Element Distribution Chart
export function ElementChartVisual({
  showUserDistribution = false,
  natalChart
}: {
  showUserDistribution?: boolean
  natalChart?: NatalChart | null
}) {
  const defaultDistribution = { Fire: 3, Earth: 3, Air: 3, Water: 3 }

  const distribution = showUserDistribution && natalChart
    ? natalChart.placements.reduce((acc, p) => {
        const element = getElementForSign(p.sign as ZodiacSign)
        if (element) acc[element] = (acc[element] || 0) + 1
        return acc
      }, { Fire: 0, Earth: 0, Air: 0, Water: 0 } as Record<string, number>)
    : defaultDistribution

  const total = Object.values(distribution).reduce((a, b) => a + b, 0)
  const elements = ['Fire', 'Earth', 'Air', 'Water'] as const

  return (
    <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
      <h4 className="text-white font-medium mb-4 text-center">
        {showUserDistribution ? 'Your Element Balance' : 'The Four Elements'}
      </h4>

      <div className="space-y-3">
        {elements.map((element) => {
          const count = distribution[element] || 0
          const percentage = total > 0 ? (count / total) * 100 : 25

          return (
            <div key={element} className="flex items-center gap-3">
              <div className="w-16 text-sm text-slate-400">{element}</div>
              <div className="flex-1 h-6 bg-slate-700/50 rounded-full overflow-hidden">
                <div
                  className={`h-full ${ELEMENT_COLORS[element]} transition-all duration-500`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="w-8 text-sm text-slate-400 text-right">{count}</div>
            </div>
          )
        })}
      </div>

      {/* Element icons */}
      <div className="flex justify-center gap-6 mt-6">
        <div className="text-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white mb-1">
            🔥
          </div>
          <span className="text-xs text-slate-500">Fire</span>
        </div>
        <div className="text-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-600 to-emerald-500 flex items-center justify-center text-white mb-1">
            🌍
          </div>
          <span className="text-xs text-slate-500">Earth</span>
        </div>
        <div className="text-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-amber-400 flex items-center justify-center text-white mb-1">
            💨
          </div>
          <span className="text-xs text-slate-500">Air</span>
        </div>
        <div className="text-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white mb-1">
            💧
          </div>
          <span className="text-xs text-slate-500">Water</span>
        </div>
      </div>
    </div>
  )
}

// Aspect Diagram Component
export function AspectDiagramVisual({
  pattern
}: {
  pattern: 'conjunction' | 'opposition' | 'trine' | 'square' | 'sextile' | 'grand-trine' | 't-square'
}) {
  const aspectInfo = {
    conjunction: { name: 'Conjunction', angle: '0°', nature: 'Fusion', color: 'text-purple-400' },
    opposition: { name: 'Opposition', angle: '180°', nature: 'Tension/Balance', color: 'text-red-400' },
    trine: { name: 'Trine', angle: '120°', nature: 'Harmony', color: 'text-blue-400' },
    square: { name: 'Square', angle: '90°', nature: 'Challenge', color: 'text-orange-400' },
    sextile: { name: 'Sextile', angle: '60°', nature: 'Opportunity', color: 'text-green-400' },
    'grand-trine': { name: 'Grand Trine', angle: '3×120°', nature: 'Flow', color: 'text-cyan-400' },
    't-square': { name: 'T-Square', angle: '90°-180°-90°', nature: 'Drive', color: 'text-amber-400' },
  }

  const info = aspectInfo[pattern]

  return (
    <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-white font-medium">{info.name}</h4>
        <span className={`text-sm ${info.color}`}>{info.angle}</span>
      </div>

      <div className="relative w-48 h-48 mx-auto mb-4">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Zodiac circle */}
          <circle cx="50" cy="50" r="45" fill="none" stroke="rgb(71, 85, 105)" strokeWidth="1" />

          {/* Aspect pattern */}
          {pattern === 'conjunction' && (
            <>
              <circle cx="50" cy="5" r="6" fill="rgb(139, 92, 246)" />
              <circle cx="50" cy="5" r="4" fill="rgb(168, 85, 247)" />
            </>
          )}

          {pattern === 'opposition' && (
            <>
              <circle cx="50" cy="5" r="4" fill="rgb(239, 68, 68)" />
              <circle cx="50" cy="95" r="4" fill="rgb(239, 68, 68)" />
              <line x1="50" y1="9" x2="50" y2="91" stroke="rgb(239, 68, 68)" strokeWidth="2" strokeDasharray="4 2" />
            </>
          )}

          {pattern === 'trine' && (
            <>
              <circle cx="50" cy="5" r="4" fill="rgb(96, 165, 250)" />
              <circle cx="11" cy="72" r="4" fill="rgb(96, 165, 250)" />
              <circle cx="89" cy="72" r="4" fill="rgb(96, 165, 250)" />
              <path d="M 50 9 L 15 70 L 85 70 Z" fill="none" stroke="rgb(96, 165, 250)" strokeWidth="2" />
            </>
          )}

          {pattern === 'square' && (
            <>
              <circle cx="50" cy="5" r="4" fill="rgb(249, 115, 22)" />
              <circle cx="95" cy="50" r="4" fill="rgb(249, 115, 22)" />
              <line x1="50" y1="9" x2="91" y2="50" stroke="rgb(249, 115, 22)" strokeWidth="2" />
            </>
          )}

          {pattern === 'sextile' && (
            <>
              <circle cx="50" cy="5" r="4" fill="rgb(74, 222, 128)" />
              <circle cx="89" cy="27" r="4" fill="rgb(74, 222, 128)" />
              <line x1="50" y1="9" x2="85" y2="27" stroke="rgb(74, 222, 128)" strokeWidth="2" />
            </>
          )}

          {pattern === 'grand-trine' && (
            <>
              <circle cx="50" cy="5" r="4" fill="rgb(34, 211, 238)" />
              <circle cx="11" cy="72" r="4" fill="rgb(34, 211, 238)" />
              <circle cx="89" cy="72" r="4" fill="rgb(34, 211, 238)" />
              <path d="M 50 9 L 15 70 L 85 70 Z" fill="rgba(34, 211, 238, 0.2)" stroke="rgb(34, 211, 238)" strokeWidth="2" />
            </>
          )}

          {pattern === 't-square' && (
            <>
              <circle cx="50" cy="5" r="4" fill="rgb(251, 191, 36)" />
              <circle cx="5" cy="50" r="4" fill="rgb(251, 191, 36)" />
              <circle cx="95" cy="50" r="4" fill="rgb(251, 191, 36)" />
              <line x1="9" y1="50" x2="91" y2="50" stroke="rgb(251, 191, 36)" strokeWidth="2" />
              <line x1="50" y1="9" x2="9" y2="50" stroke="rgb(251, 191, 36)" strokeWidth="2" />
              <line x1="50" y1="9" x2="91" y2="50" stroke="rgb(251, 191, 36)" strokeWidth="2" />
            </>
          )}
        </svg>
      </div>

      <div className="text-center">
        <span className={`text-sm font-medium ${info.color}`}>{info.nature}</span>
      </div>
    </div>
  )
}

// Sign Card Component
export function SignCardVisual({ sign }: { sign: ZodiacSign }) {
  const data = ZODIAC_DATA[sign]
  const signName = sign.charAt(0).toUpperCase() + sign.slice(1)

  return (
    <div className={`bg-gradient-to-br ${data.color} rounded-2xl p-6 text-white`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className="text-4xl">{data.symbol}</span>
        </div>
        <div className="text-right">
          <span className="text-xs opacity-75">{data.dates}</span>
        </div>
      </div>

      <h4 className="text-xl font-bold mb-2">{signName}</h4>

      <div className="flex gap-2 flex-wrap">
        <span className="text-xs bg-white/20 px-2 py-1 rounded-full">{data.element}</span>
        <span className="text-xs bg-white/20 px-2 py-1 rounded-full">{data.modality}</span>
      </div>
    </div>
  )
}

// Planet Card Component
export function PlanetCardVisual({ planet }: { planet: Planet }) {
  const data = PLANET_DATA[planet]

  return (
    <div className={`bg-gradient-to-br ${data.color} rounded-2xl p-5 text-white`}>
      <div className="flex items-center gap-4">
        <span className="text-4xl">{data.symbol}</span>
        <div>
          <h4 className="font-bold">{data.name}</h4>
          <p className="text-sm opacity-80">{data.meaning}</p>
        </div>
      </div>
    </div>
  )
}

// Chat Bubble Component
export function ChatVisual({ messages }: { messages: ChatMessage[] }) {
  return (
    <div className="bg-slate-800/30 rounded-2xl p-4 border border-slate-700/50 space-y-4">
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`flex items-start gap-3 ${msg.role === 'student' ? 'flex-row-reverse' : ''}`}
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
            msg.role === 'guide'
              ? 'bg-purple-500/20 text-purple-400'
              : 'bg-blue-500/20 text-blue-400'
          }`}>
            {msg.role === 'guide' ? '✨' : '🙋'}
          </div>
          <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
            msg.role === 'guide'
              ? 'bg-slate-700/50 text-slate-200'
              : 'bg-blue-500/20 text-blue-100'
          }`}>
            <p className="text-sm leading-relaxed">{msg.content}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

// Comparison Component
export function ComparisonVisual({ title, items }: { title: string; items: ComparisonItem[] }) {
  return (
    <div className="bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700/50">
      <div className="bg-slate-700/50 px-4 py-3">
        <h4 className="text-white font-medium text-center">{title}</h4>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-3 gap-2 text-sm mb-2 pb-2 border-b border-slate-700/50">
          <div className="text-slate-500 text-center">Aspect</div>
          <div className="text-purple-400 text-center">Option A</div>
          <div className="text-cyan-400 text-center">Option B</div>
        </div>
        {items.map((item, i) => (
          <div key={i} className="grid grid-cols-3 gap-2 text-sm py-2">
            <div className="text-slate-400">{item.label}</div>
            <div className="text-slate-300 text-center">{item.left}</div>
            <div className="text-slate-300 text-center">{item.right}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Interactive Question Component
export function InteractiveVisual({ question, options }: { question: string; options: InteractiveOption[] }) {
  const [selected, setSelected] = useState<number | null>(null)
  const [showResponse, setShowResponse] = useState(false)

  const handleSelect = (index: number) => {
    setSelected(index)
    setShowResponse(true)
  }

  return (
    <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
      <div className="flex items-start gap-3 mb-4">
        <span className="text-2xl">🤔</span>
        <p className="text-white font-medium">{question}</p>
      </div>

      <div className="space-y-2">
        {options.map((option, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            disabled={showResponse}
            className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
              selected === i
                ? option.isCorrect
                  ? 'bg-green-500/20 border-green-500/50 text-green-200'
                  : 'bg-amber-500/20 border-amber-500/50 text-amber-200'
                : 'bg-slate-700/30 border-slate-600/50 text-slate-300 hover:bg-slate-700/50'
            } border`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {showResponse && selected !== null && (
        <div className={`mt-4 p-4 rounded-xl ${
          options[selected].isCorrect ? 'bg-green-500/10' : 'bg-amber-500/10'
        }`}>
          <p className={`text-sm ${options[selected].isCorrect ? 'text-green-200' : 'text-amber-200'}`}>
            {options[selected].response}
          </p>
        </div>
      )}
    </div>
  )
}

// Reflection Prompt Component
export function ReflectionVisual({ prompt, placeholder }: { prompt: string; placeholder?: string }) {
  const [response, setResponse] = useState('')

  return (
    <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-500/20">
      <div className="flex items-start gap-3 mb-4">
        <span className="text-2xl">📝</span>
        <div>
          <h4 className="text-purple-200 font-medium mb-1">Reflection</h4>
          <p className="text-purple-100/80 text-sm">{prompt}</p>
        </div>
      </div>

      <textarea
        value={response}
        onChange={(e) => setResponse(e.target.value)}
        placeholder={placeholder || 'Take a moment to reflect...'}
        className="w-full h-24 bg-slate-800/50 border border-slate-600/50 rounded-xl px-4 py-3 text-slate-200 text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none"
      />

      <p className="text-xs text-slate-500 mt-2">
        Your reflections are saved locally and not shared.
      </p>
    </div>
  )
}

// Your Chart Highlight Component
export function YourChartVisual({
  highlight,
  description,
  natalChart
}: {
  highlight: 'sun' | 'moon' | 'rising' | 'all'
  description: string
  natalChart?: NatalChart | null
}) {
  if (!natalChart) {
    return (
      <div className="bg-purple-500/10 rounded-2xl p-6 border border-purple-500/20">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">🔮</span>
          <div>
            <h4 className="text-purple-200 font-medium">Personalize This Lesson</h4>
            <p className="text-purple-100/70 text-sm">Add your birth details to see your own chart here.</p>
          </div>
        </div>
        <a
          href="/birth-details"
          className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 rounded-lg text-sm transition-colors"
        >
          Add Birth Details →
        </a>
      </div>
    )
  }

  const sun = natalChart.placements.find(p => p.planet === 'sun')
  const moon = natalChart.placements.find(p => p.planet === 'moon')
  const rising = natalChart.ascendant

  const placements = []
  if (highlight === 'sun' || highlight === 'all') {
    placements.push({ label: 'Sun', sign: sun?.sign, symbol: '☉' })
  }
  if (highlight === 'moon' || highlight === 'all') {
    placements.push({ label: 'Moon', sign: moon?.sign, symbol: '☽' })
  }
  if (highlight === 'rising' || highlight === 'all') {
    placements.push({ label: 'Rising', sign: rising?.sign, symbol: '↑' })
  }

  return (
    <div className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-2xl p-6 border border-purple-500/20">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">✨</span>
        <h4 className="text-purple-200 font-medium">In Your Chart</h4>
      </div>

      <div className="flex gap-4 mb-4">
        {placements.map((p) => (
          <div key={p.label} className="flex-1 bg-slate-800/50 rounded-xl p-4 text-center">
            <span className="text-2xl block mb-1">{p.symbol}</span>
            <span className="text-xs text-slate-500 block">{p.label}</span>
            <span className="text-white font-medium capitalize">{p.sign}</span>
          </div>
        ))}
      </div>

      <p className="text-purple-100/80 text-sm">{description}</p>
    </div>
  )
}

// Fun Fact Component
export function FunFactVisual({ content }: { content: string }) {
  return (
    <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-2xl p-5 border border-amber-500/20">
      <div className="flex items-start gap-3">
        <span className="text-2xl">💫</span>
        <div>
          <span className="text-amber-300 text-xs font-medium uppercase tracking-wider">Fun Fact</span>
          <p className="text-amber-100 text-sm mt-1">{content}</p>
        </div>
      </div>
    </div>
  )
}

// Animated Visual Component
export function AnimationVisual({ variant }: { variant: 'planets-orbit' | 'zodiac-cycle' | 'moon-phases' }) {
  if (variant === 'moon-phases') {
    return (
      <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
        <h4 className="text-white font-medium text-center mb-4">Moon Phases</h4>
        <div className="flex justify-center gap-3">
          {['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'].map((moon, i) => (
            <div
              key={i}
              className="text-3xl animate-pulse"
              style={{ animationDelay: `${i * 200}ms` }}
            >
              {moon}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-slate-500 mt-3 px-2">
          <span>New</span>
          <span>Full</span>
          <span>New</span>
        </div>
      </div>
    )
  }

  if (variant === 'zodiac-cycle') {
    const signs = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓']
    return (
      <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
        <h4 className="text-white font-medium text-center mb-4">The Zodiac Cycle</h4>
        <div className="flex justify-center gap-2 flex-wrap max-w-[250px] mx-auto">
          {signs.map((sign, i) => (
            <span
              key={i}
              className="text-2xl animate-pulse"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              {sign}
            </span>
          ))}
        </div>
      </div>
    )
  }

  // planets-orbit
  return (
    <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
      <h4 className="text-white font-medium text-center mb-4">Planetary Motion</h4>
      <div className="relative w-48 h-48 mx-auto">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl">☉</span>
        </div>
        <div className="absolute inset-4 border border-slate-600/50 rounded-full animate-spin" style={{ animationDuration: '20s' }}>
          <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-lg">☿</span>
        </div>
        <div className="absolute inset-8 border border-slate-600/50 rounded-full animate-spin" style={{ animationDuration: '30s' }}>
          <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-lg">♀</span>
        </div>
        <div className="absolute inset-12 border border-slate-600/50 rounded-full animate-spin" style={{ animationDuration: '40s' }}>
          <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-lg">♂</span>
        </div>
      </div>
    </div>
  )
}

// Helper function
function getElementForSign(sign: ZodiacSign): string | null {
  const elements: Record<ZodiacSign, string> = {
    aries: 'Fire', leo: 'Fire', sagittarius: 'Fire',
    taurus: 'Earth', virgo: 'Earth', capricorn: 'Earth',
    gemini: 'Air', libra: 'Air', aquarius: 'Air',
    cancer: 'Water', scorpio: 'Water', pisces: 'Water',
  }
  return elements[sign] || null
}
