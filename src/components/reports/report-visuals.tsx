'use client'

/**
 * Report Visual Components
 *
 * Visual elements for astrology reports including charts, balances, and diagrams.
 */

import { useState } from 'react'

// Element colors
const elementColors = {
  Fire: { bg: 'bg-orange-500', text: 'text-orange-500', light: 'bg-orange-500/20' },
  Earth: { bg: 'bg-emerald-500', text: 'text-emerald-500', light: 'bg-emerald-500/20' },
  Air: { bg: 'bg-sky-500', text: 'text-sky-500', light: 'bg-sky-500/20' },
  Water: { bg: 'bg-blue-500', text: 'text-blue-500', light: 'bg-blue-500/20' },
}

const modalityColors = {
  Cardinal: { bg: 'bg-red-500', text: 'text-red-400', light: 'bg-red-500/20' },
  Fixed: { bg: 'bg-amber-500', text: 'text-amber-400', light: 'bg-amber-500/20' },
  Mutable: { bg: 'bg-violet-500', text: 'text-violet-400', light: 'bg-violet-500/20' },
}

const zodiacEmojis: Record<string, string> = {
  Aries: '♈', Taurus: '♉', Gemini: '♊', Cancer: '♋',
  Leo: '♌', Virgo: '♍', Libra: '♎', Scorpio: '♏',
  Sagittarius: '♐', Capricorn: '♑', Aquarius: '♒', Pisces: '♓',
}

interface ElementBalanceProps {
  data: Record<string, number>
  title?: string
}

export function ElementBalance({ data, title }: ElementBalanceProps) {
  const total = Object.values(data).reduce((sum, val) => sum + val, 0)
  const sortedElements = Object.entries(data).sort((a, b) => b[1] - a[1])
  const dominant = sortedElements[0][0]

  return (
    <div className="bg-slate-800/30 rounded-xl p-5 border border-slate-700/50">
      {title && (
        <h4 className="text-white font-medium mb-4 flex items-center gap-2">
          <span className="text-lg">🔥</span>
          {title}
        </h4>
      )}

      <div className="space-y-3">
        {sortedElements.map(([element, value]) => {
          const percentage = Math.round((value / total) * 100)
          const colors = elementColors[element as keyof typeof elementColors]
          const isDominant = element === dominant

          return (
            <div key={element}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${colors.bg}`} />
                  <span className={`text-sm font-medium ${isDominant ? 'text-white' : 'text-slate-300'}`}>
                    {element}
                    {isDominant && <span className="ml-2 text-xs text-indigo-400">(Dominant)</span>}
                  </span>
                </div>
                <span className="text-sm text-slate-400">{percentage}%</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className={`h-full ${colors.bg} rounded-full transition-all duration-500`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-700/50">
        <p className="text-sm text-slate-400">
          <strong className={elementColors[dominant as keyof typeof elementColors]?.text}>
            {dominant}
          </strong>
          {' '}energy dominates your chart, meaning you primarily process life through{' '}
          {dominant === 'Fire' && 'action, inspiration, and enthusiasm.'}
          {dominant === 'Earth' && 'practical application and tangible results.'}
          {dominant === 'Air' && 'ideas, communication, and analysis.'}
          {dominant === 'Water' && 'emotions, intuition, and deep feeling.'}
        </p>
      </div>
    </div>
  )
}

interface ModalityBalanceProps {
  data: Record<string, number>
  title?: string
}

export function ModalityBalance({ data, title }: ModalityBalanceProps) {
  const total = Object.values(data).reduce((sum, val) => sum + val, 0)
  const sortedModalities = Object.entries(data).sort((a, b) => b[1] - a[1])
  const dominant = sortedModalities[0][0]

  return (
    <div className="bg-slate-800/30 rounded-xl p-5 border border-slate-700/50">
      {title && (
        <h4 className="text-white font-medium mb-4 flex items-center gap-2">
          <span className="text-lg">⚡</span>
          {title}
        </h4>
      )}

      <div className="grid grid-cols-3 gap-3 mb-4">
        {sortedModalities.map(([modality, value]) => {
          const percentage = Math.round((value / total) * 100)
          const colors = modalityColors[modality as keyof typeof modalityColors]
          const isDominant = modality === dominant

          return (
            <div
              key={modality}
              className={`rounded-lg p-3 text-center ${isDominant ? colors.light + ' border border-current ' + colors.text : 'bg-slate-800/50'}`}
            >
              <div className={`text-2xl font-bold ${isDominant ? colors.text : 'text-slate-300'}`}>
                {percentage}%
              </div>
              <div className={`text-sm ${isDominant ? colors.text : 'text-slate-400'}`}>
                {modality}
              </div>
            </div>
          )
        })}
      </div>

      <p className="text-sm text-slate-400">
        <strong className={modalityColors[dominant as keyof typeof modalityColors]?.text}>
          {dominant}
        </strong>
        {' '}quality is strongest, meaning you approach life by{' '}
        {dominant === 'Cardinal' && 'initiating action and leading the way.'}
        {dominant === 'Fixed' && 'maintaining, building, and persisting.'}
        {dominant === 'Mutable' && 'adapting, changing, and flowing.'}
      </p>
    </div>
  )
}

interface MiniChartWheelProps {
  data: {
    sun?: string
    moon?: string
    rising?: string
    [key: string]: string | undefined
  }
}

export function MiniChartWheel({ data }: MiniChartWheelProps) {
  const { sun, moon, rising } = data

  return (
    <div className="bg-slate-800/30 rounded-xl p-5 border border-slate-700/50">
      <h4 className="text-white font-medium mb-4 flex items-center gap-2">
        <span className="text-lg">🌟</span>
        Your Big Three
      </h4>

      <div className="flex items-center justify-center mb-6">
        <div className="relative w-48 h-48">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-2 border-slate-600" />

          {/* Sun position */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-2xl shadow-lg shadow-yellow-500/30">
              {sun ? zodiacEmojis[sun] : '☀️'}
            </div>
            <span className="text-xs text-yellow-400 mt-1">Sun</span>
          </div>

          {/* Moon position */}
          <div className="absolute bottom-4 left-4 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center text-xl shadow-lg shadow-slate-400/30">
              {moon ? zodiacEmojis[moon] : '🌙'}
            </div>
            <span className="text-xs text-slate-300 mt-1">Moon</span>
          </div>

          {/* Rising position */}
          <div className="absolute bottom-4 right-4 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-xl shadow-lg shadow-purple-500/30">
              {rising ? zodiacEmojis[rising] : '🌅'}
            </div>
            <span className="text-xs text-purple-400 mt-1">Rising</span>
          </div>

          {/* Center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-slate-400 text-xs">Your</div>
              <div className="text-white font-medium">Core</div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between p-2 rounded-lg bg-yellow-500/10">
          <span className="text-sm text-yellow-400">☀️ Sun</span>
          <span className="text-white font-medium">{sun || 'Unknown'}</span>
        </div>
        <div className="flex items-center justify-between p-2 rounded-lg bg-slate-400/10">
          <span className="text-sm text-slate-300">🌙 Moon</span>
          <span className="text-white font-medium">{moon || 'Unknown'}</span>
        </div>
        <div className="flex items-center justify-between p-2 rounded-lg bg-purple-500/10">
          <span className="text-sm text-purple-400">🌅 Rising</span>
          <span className="text-white font-medium">{rising || 'Unknown'}</span>
        </div>
      </div>
    </div>
  )
}

interface HouseEmphasisProps {
  data: Record<number, number>
  title?: string
}

export function HouseEmphasis({ data, title }: HouseEmphasisProps) {
  const maxValue = Math.max(...Object.values(data))
  const sortedHouses = Object.entries(data)
    .map(([house, value]) => ({ house: parseInt(house), value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 4)

  const houseNames: Record<number, string> = {
    1: 'Self', 2: 'Value', 3: 'Communication', 4: 'Home',
    5: 'Creativity', 6: 'Service', 7: 'Partnership', 8: 'Transformation',
    9: 'Philosophy', 10: 'Career', 11: 'Community', 12: 'Unconscious',
  }

  return (
    <div className="bg-slate-800/30 rounded-xl p-5 border border-slate-700/50">
      {title && (
        <h4 className="text-white font-medium mb-4 flex items-center gap-2">
          <span className="text-lg">🏠</span>
          {title}
        </h4>
      )}

      <div className="space-y-3">
        {sortedHouses.map(({ house, value }, index) => {
          const percentage = Math.round((value / maxValue) * 100)
          const isTop = index === 0

          return (
            <div key={house}>
              <div className="flex items-center justify-between mb-1">
                <span className={`text-sm ${isTop ? 'text-white font-medium' : 'text-slate-300'}`}>
                  {house}
                  {house === 1 ? 'st' : house === 2 ? 'nd' : house === 3 ? 'rd' : 'th'} House
                  <span className="text-slate-500 ml-1">({houseNames[house]})</span>
                  {isTop && <span className="ml-2 text-xs text-indigo-400">(Strongest)</span>}
                </span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className={`h-full ${isTop ? 'bg-indigo-500' : 'bg-slate-500'} rounded-full transition-all duration-500`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>

      <p className="mt-4 text-sm text-slate-400">
        The {sortedHouses[0].house}
        {sortedHouses[0].house === 1 ? 'st' : sortedHouses[0].house === 2 ? 'nd' : sortedHouses[0].house === 3 ? 'rd' : 'th'} House
        ({houseNames[sortedHouses[0].house]}) is most emphasized, suggesting this life area is particularly important.
      </p>
    </div>
  )
}

interface TermTooltipProps {
  term: string
  definition: string
  children: React.ReactNode
}

export function TermTooltip({ term, definition, children }: TermTooltipProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <span className="relative inline-block">
      <span
        className="border-b border-dashed border-indigo-400 cursor-help text-indigo-400"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}
      >
        {children}
      </span>
      {isOpen && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-800 border border-slate-600 rounded-lg shadow-xl">
          <div className="text-white font-medium text-sm mb-1">{term}</div>
          <div className="text-slate-300 text-xs">{definition}</div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-slate-800 border-r border-b border-slate-600" />
        </div>
      )}
    </span>
  )
}

interface ReportTipProps {
  children: React.ReactNode
}

export function ReportTip({ children }: ReportTipProps) {
  return (
    <div className="flex items-start gap-3 p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl mt-4">
      <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
        <span className="text-indigo-400">💡</span>
      </div>
      <div>
        <div className="text-indigo-400 text-xs font-medium uppercase tracking-wider mb-1">Pro Tip</div>
        <p className="text-slate-300 text-sm">{children}</p>
      </div>
    </div>
  )
}

interface ReportSummaryCardProps {
  headline: string
  overview: string
  keyStrengths: string[]
  growthAreas: string[]
}

export function ReportSummaryCard({ headline, overview, keyStrengths, growthAreas }: ReportSummaryCardProps) {
  return (
    <div className="bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-indigo-500/20 mb-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">{headline}</h2>
        <p className="text-slate-300">{overview}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-emerald-400 font-medium mb-3 flex items-center gap-2">
            <span>✨</span> Key Strengths
          </h3>
          <ul className="space-y-2">
            {keyStrengths.map((strength, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                <span className="text-emerald-400 mt-0.5">✓</span>
                {strength}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-amber-400 font-medium mb-3 flex items-center gap-2">
            <span>🌱</span> Growth Areas
          </h3>
          <ul className="space-y-2">
            {growthAreas.map((area, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                <span className="text-amber-400 mt-0.5">→</span>
                {area}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
