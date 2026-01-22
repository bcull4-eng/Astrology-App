'use client'

import type { SignResult } from '@/types/calculators'
import type { ZodiacSign } from '@/types/astrology'

interface SignResultCardProps {
  result: SignResult
  showHouse?: boolean
}

// Zodiac sign symbols
const zodiacSymbols: Record<ZodiacSign, string> = {
  aries: '\u2648',
  taurus: '\u2649',
  gemini: '\u264a',
  cancer: '\u264b',
  leo: '\u264c',
  virgo: '\u264d',
  libra: '\u264e',
  scorpio: '\u264f',
  sagittarius: '\u2650',
  capricorn: '\u2651',
  aquarius: '\u2652',
  pisces: '\u2653',
}

// Planet display names
const planetNames: Record<string, string> = {
  sun: 'Sun',
  moon: 'Moon',
  mercury: 'Mercury',
  venus: 'Venus',
  mars: 'Mars',
  jupiter: 'Jupiter',
  saturn: 'Saturn',
  uranus: 'Uranus',
  neptune: 'Neptune',
  pluto: 'Pluto',
  north_node: 'North Node',
  chiron: 'Chiron',
  ascendant: 'Rising Sign',
  midheaven: 'Midheaven',
  part_of_fortune: 'Part of Fortune',
  lilith: 'Black Moon Lilith',
}

// Sign colors for visual appeal
const signColors: Record<ZodiacSign, string> = {
  aries: 'from-red-500/20 to-orange-500/20 border-red-500/30',
  taurus: 'from-green-500/20 to-emerald-500/20 border-green-500/30',
  gemini: 'from-yellow-500/20 to-amber-500/20 border-yellow-500/30',
  cancer: 'from-slate-400/20 to-slate-300/20 border-slate-400/30',
  leo: 'from-orange-500/20 to-yellow-500/20 border-orange-500/30',
  virgo: 'from-amber-500/20 to-yellow-600/20 border-amber-500/30',
  libra: 'from-pink-500/20 to-rose-500/20 border-pink-500/30',
  scorpio: 'from-purple-500/20 to-violet-500/20 border-purple-500/30',
  sagittarius: 'from-indigo-500/20 to-blue-500/20 border-indigo-500/30',
  capricorn: 'from-slate-600/20 to-slate-500/20 border-slate-500/30',
  aquarius: 'from-cyan-500/20 to-teal-500/20 border-cyan-500/30',
  pisces: 'from-violet-500/20 to-purple-500/20 border-violet-500/30',
}

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function SignResultCard({ result, showHouse = true }: SignResultCardProps) {
  const planetName = planetNames[result.planet] || result.planet
  const signName = capitalizeFirst(result.sign)
  const signSymbol = zodiacSymbols[result.sign]
  const colorClass = signColors[result.sign]

  return (
    <div className={`bg-gradient-to-br ${colorClass} border rounded-xl p-6 space-y-4`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">{planetName}</h3>
          <p className="text-slate-400 text-sm">
            {result.degree.toFixed(1)}° {signName}
            {result.isRetrograde && <span className="ml-2 text-amber-400">Retrograde</span>}
          </p>
        </div>
        <div className="text-4xl opacity-80">{signSymbol}</div>
      </div>

      {/* Sign Name */}
      <div className="text-2xl font-bold text-white">
        {result.interpretation.title}
      </div>

      {/* Summary */}
      <p className="text-slate-300 leading-relaxed">
        {result.interpretation.summary}
      </p>

      {/* House Position */}
      {showHouse && result.house && (
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <span className="px-2 py-1 bg-slate-800/50 rounded">House {result.house}</span>
          <span>- {getHouseDescription(result.house)}</span>
        </div>
      )}

      {/* Traits */}
      {result.interpretation.traits.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-slate-400 mb-2">Key Traits</h4>
          <div className="flex flex-wrap gap-2">
            {result.interpretation.traits.map((trait, i) => (
              <span key={i} className="px-3 py-1 bg-slate-800/50 rounded-full text-sm text-slate-300">
                {trait}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Strengths & Challenges */}
      <div className="grid grid-cols-2 gap-4">
        {result.interpretation.strengths.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-green-400 mb-2">Strengths</h4>
            <ul className="space-y-1">
              {result.interpretation.strengths.map((strength, i) => (
                <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                  <span className="text-green-400 mt-1">+</span>
                  {strength}
                </li>
              ))}
            </ul>
          </div>
        )}
        {result.interpretation.challenges.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-amber-400 mb-2">Challenges</h4>
            <ul className="space-y-1">
              {result.interpretation.challenges.map((challenge, i) => (
                <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                  <span className="text-amber-400 mt-1">!</span>
                  {challenge}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

function getHouseDescription(house: number): string {
  const descriptions: Record<number, string> = {
    1: 'Self & Identity',
    2: 'Money & Values',
    3: 'Communication & Learning',
    4: 'Home & Family',
    5: 'Creativity & Romance',
    6: 'Work & Health',
    7: 'Partnerships',
    8: 'Transformation & Shared Resources',
    9: 'Philosophy & Travel',
    10: 'Career & Public Image',
    11: 'Friends & Goals',
    12: 'Spirituality & Subconscious',
  }
  return descriptions[house] || ''
}

// Compact version for multiple results
interface SignResultCompactProps {
  result: SignResult
  onClick?: () => void
}

export function SignResultCompact({ result, onClick }: SignResultCompactProps) {
  const planetName = planetNames[result.planet] || result.planet
  const signName = capitalizeFirst(result.sign)
  const signSymbol = zodiacSymbols[result.sign]
  const colorClass = signColors[result.sign]

  return (
    <button
      onClick={onClick}
      className={`bg-gradient-to-br ${colorClass} border rounded-lg p-3 md:p-4 text-left transition-transform hover:scale-[1.02] w-full min-h-[70px]`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="text-xs md:text-sm text-slate-400 truncate">{planetName}</p>
          <p className="text-sm md:text-lg font-semibold text-white truncate">{signName}</p>
        </div>
        <div className="text-2xl md:text-3xl opacity-80 flex-shrink-0">{signSymbol}</div>
      </div>
      {result.isRetrograde && (
        <span className="inline-block mt-1 md:mt-2 text-[10px] md:text-xs text-amber-400 bg-amber-400/10 px-1.5 md:px-2 py-0.5 rounded">
          Retrograde
        </span>
      )}
    </button>
  )
}
