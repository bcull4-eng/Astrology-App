'use client'

import type { LessonBlock, NatalChart, PersonalizedDataKey } from '@/types'

interface LessonContentRendererProps {
  content: LessonBlock[]
  natalChart: NatalChart | null
}

export function LessonContentRenderer({ content, natalChart }: LessonContentRendererProps) {
  return (
    <div className="space-y-6">
      {content.map((block, index) => (
        <ContentBlock key={index} block={block} natalChart={natalChart} />
      ))}
    </div>
  )
}

function ContentBlock({ block, natalChart }: { block: LessonBlock; natalChart: NatalChart | null }) {
  switch (block.type) {
    case 'heading':
      if (block.level === 3) {
        return <h3 className="text-lg font-semibold text-white mt-8 mb-3">{block.content}</h3>
      }
      return <h2 className="text-xl font-semibold text-white mt-10 mb-4">{block.content}</h2>

    case 'text':
      return <p className="text-slate-300 leading-relaxed">{block.content}</p>

    case 'concept':
      return (
        <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50">
          <div className="flex items-start gap-3">
            {block.icon && <span className="text-2xl">{block.icon}</span>}
            <div>
              <h4 className="text-white font-medium mb-2">{block.title}</h4>
              <p className="text-slate-400 text-sm leading-relaxed">{block.content}</p>
            </div>
          </div>
        </div>
      )

    case 'personalized':
      return <PersonalizedBlock dataKey={block.dataKey} template={block.template} natalChart={natalChart} />

    case 'list':
      if (block.style === 'numbered') {
        return (
          <ol className="space-y-2 list-decimal list-inside">
            {block.items.map((item, i) => (
              <li key={i} className="text-slate-300 leading-relaxed">
                {item}
              </li>
            ))}
          </ol>
        )
      }
      return (
        <ul className="space-y-2">
          {block.items.map((item, i) => (
            <li key={i} className="text-slate-300 leading-relaxed flex items-start gap-2">
              <span className="text-purple-400 mt-1.5">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )

    case 'callout':
      return <CalloutBlock content={block.content} variant={block.variant || 'info'} />

    case 'quiz':
      // Quiz blocks are handled separately at the lesson level
      return null

    default:
      return null
  }
}

function PersonalizedBlock({
  dataKey,
  template,
  natalChart,
}: {
  dataKey: PersonalizedDataKey
  template: string
  natalChart: NatalChart | null
}) {
  const value = natalChart ? getPersonalizedValue(dataKey, natalChart) : null

  if (!value) {
    return (
      <div className="bg-purple-500/10 rounded-xl p-5 border border-purple-500/20">
        <div className="flex items-start gap-3">
          <span className="text-purple-400">✨</span>
          <p className="text-purple-200 text-sm">
            <Link href="/birth-details" className="underline hover:text-purple-100">
              Add your birth details
            </Link>{' '}
            to see personalized insights here.
          </p>
        </div>
      </div>
    )
  }

  const personalizedText = template.replace(/{value}/g, value)

  return (
    <div className="bg-purple-500/10 rounded-xl p-5 border border-purple-500/20">
      <div className="flex items-start gap-3">
        <span className="text-purple-400">✨</span>
        <p className="text-purple-100 text-sm leading-relaxed">{personalizedText}</p>
      </div>
    </div>
  )
}

function CalloutBlock({ content, variant }: { content: string; variant: 'info' | 'tip' | 'warning' }) {
  const styles = {
    info: {
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
      icon: 'ℹ️',
      text: 'text-blue-200',
    },
    tip: {
      bg: 'bg-green-500/10',
      border: 'border-green-500/20',
      icon: '💡',
      text: 'text-green-200',
    },
    warning: {
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
      icon: '⚠️',
      text: 'text-amber-200',
    },
  }

  const style = styles[variant]

  return (
    <div className={`${style.bg} rounded-xl p-5 border ${style.border}`}>
      <div className="flex items-start gap-3">
        <span>{style.icon}</span>
        <p className={`${style.text} text-sm leading-relaxed`}>{content}</p>
      </div>
    </div>
  )
}

function getPersonalizedValue(key: PersonalizedDataKey, chart: NatalChart): string | null {
  const placements = chart.placements

  switch (key) {
    case 'sunSign':
      return placements.find(p => p.planet === 'sun')?.sign || null
    case 'moonSign':
      return placements.find(p => p.planet === 'moon')?.sign || null
    case 'risingSign':
      // Rising sign is typically the sign of the 1st house cusp
      return chart.houses?.find(h => h.house === 1)?.sign || null
    case 'mercurySign':
      return placements.find(p => p.planet === 'mercury')?.sign || null
    case 'venusSign':
      return placements.find(p => p.planet === 'venus')?.sign || null
    case 'marsSign':
      return placements.find(p => p.planet === 'mars')?.sign || null
    case 'jupiterSign':
      return placements.find(p => p.planet === 'jupiter')?.sign || null
    case 'saturnSign':
      return placements.find(p => p.planet === 'saturn')?.sign || null
    case 'sunHouse':
      const sun = placements.find(p => p.planet === 'sun')
      return sun?.house ? ordinal(sun.house) : null
    case 'moonHouse':
      const moon = placements.find(p => p.planet === 'moon')
      return moon?.house ? ordinal(moon.house) : null
    case 'dominantElement':
      return getDominantElement(placements)
    case 'dominantModality':
      return getDominantModality(placements)
    default:
      return null
  }
}

function ordinal(n: number): string {
  const suffixes = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return n + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0])
}

function getDominantElement(placements: NatalChart['placements']): string {
  const elements: Record<string, string> = {
    Aries: 'Fire', Leo: 'Fire', Sagittarius: 'Fire',
    Taurus: 'Earth', Virgo: 'Earth', Capricorn: 'Earth',
    Gemini: 'Air', Libra: 'Air', Aquarius: 'Air',
    Cancer: 'Water', Scorpio: 'Water', Pisces: 'Water',
  }

  const counts: Record<string, number> = { Fire: 0, Earth: 0, Air: 0, Water: 0 }

  for (const p of placements) {
    const element = elements[p.sign]
    if (element) counts[element]++
  }

  return Object.entries(counts).reduce((a, b) => (a[1] > b[1] ? a : b))[0]
}

function getDominantModality(placements: NatalChart['placements']): string {
  const modalities: Record<string, string> = {
    Aries: 'Cardinal', Cancer: 'Cardinal', Libra: 'Cardinal', Capricorn: 'Cardinal',
    Taurus: 'Fixed', Leo: 'Fixed', Scorpio: 'Fixed', Aquarius: 'Fixed',
    Gemini: 'Mutable', Virgo: 'Mutable', Sagittarius: 'Mutable', Pisces: 'Mutable',
  }

  const counts: Record<string, number> = { Cardinal: 0, Fixed: 0, Mutable: 0 }

  for (const p of placements) {
    const modality = modalities[p.sign]
    if (modality) counts[modality]++
  }

  return Object.entries(counts).reduce((a, b) => (a[1] > b[1] ? a : b))[0]
}

// Simple Link component for the personalized block
function Link({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  return (
    <a href={href} className={className}>
      {children}
    </a>
  )
}
