'use client'

/**
 * Weekly Forecast Component (Unlocked/Premium)
 *
 * Comprehensive ~300 word weekly forecast with 7-day energy chart,
 * power days, transits, themes, and personalized recommendations.
 * Enhanced with real planetary positions when available from astrology-api.io.
 */

import { useMemo, useState, useEffect } from 'react'
import type { NatalChart } from '@/types'
import { signData } from '@/lib/report-generator-v2'
import type { DailySkyData } from '@/lib/astrology-api'

interface WeeklyForecastProps {
  chart: NatalChart
  dailySky?: DailySkyData | null
}

function getSign(chart: NatalChart, planet: string): string {
  const placement = chart.placements.find(p => p.planet === planet)
  return placement?.sign || 'aries'
}

function capitalizeSign(sign: string): string {
  return sign.charAt(0).toUpperCase() + sign.slice(1)
}

// Generate 7-day energy levels - enhanced with real sky data
function generateWeekEnergy(chart: NatalChart, dailySky?: DailySkyData | null): { day: string; date: string; fullDate: Date; energy: number; isPowerDay: boolean; description: string }[] {
  const sunSign = capitalizeSign(getSign(chart, 'sun'))
  const moonSign = capitalizeSign(getSign(chart, 'moon'))
  const sunData = signData[sunSign as keyof typeof signData]
  const moonData = signData[moonSign as keyof typeof signData]
  const element = sunData?.element || 'Fire'

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const today = new Date()
  const week: { day: string; date: string; fullDate: Date; energy: number; isPowerDay: boolean; description: string }[] = []

  for (let i = 0; i < 7; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)

    const dayOfWeek = date.getDay()
    const dayNum = date.getDate()

    let baseEnergy = 60 + (dayNum % 30)

    // Element-based energy patterns
    if (element === 'Fire') {
      if (dayOfWeek === 2 || dayOfWeek === 3) baseEnergy += 15
    } else if (element === 'Earth') {
      if (dayOfWeek >= 1 && dayOfWeek <= 4) baseEnergy += 10
    } else if (element === 'Air') {
      if (dayOfWeek === 1 || dayOfWeek === 2) baseEnergy += 15
    } else {
      if (dayOfWeek === 0 || dayOfWeek === 5) baseEnergy += 12
    }

    if (dayOfWeek === 0 || dayOfWeek === 6) baseEnergy -= 5

    // Apply real sky data adjustments for today (day 0)
    if (i === 0 && dailySky) {
      const retroCount = dailySky.retrogrades.length
      baseEnergy -= retroCount * 3

      if (dailySky.voidOfCourse.isVoid) baseEnergy -= 8

      const phase = dailySky.moonPhase.name.toLowerCase()
      if (phase.includes('full')) baseEnergy += 10
      else if (phase.includes('new')) baseEnergy -= 3
      else if (phase.includes('waxing')) baseEnergy += 5
    }

    const energy = Math.min(100, Math.max(40, baseEnergy))
    const isPowerDay = energy >= 85

    const descriptions = [
      `Ideal for rest and ${moonData?.keywords[0]?.toLowerCase() || 'reflection'}`,
      `Strong ${sunData?.element || 'Fire'} energy for initiatives`,
      `Peak mental clarity and communication`,
      `Balanced energy for steady progress`,
      `Creative and expressive energy heightened`,
      `Social connections and partnerships favoured`,
      `Reflective energy, good for planning ahead`,
    ]

    // Enhanced description for today with real data
    let description = descriptions[dayOfWeek]
    if (i === 0 && dailySky) {
      const phase = dailySky.moonPhase.name
      description = `${phase} energy • ${dailySky.retrogrades.length > 0 ? `${dailySky.retrogrades.length} planets Rx` : 'Direct planetary flow'}`
    }

    week.push({
      day: days[dayOfWeek],
      date: date.getDate().toString(),
      fullDate: date,
      energy,
      isPowerDay,
      description,
    })
  }

  return week
}

// Generate comprehensive weekly overview (~300 words)
function generateWeeklyOverview(chart: NatalChart, dailySky?: DailySkyData | null): { overview: string; theme: string; opportunity: string; challenge: string; advice: string } {
  const sunSign = capitalizeSign(getSign(chart, 'sun'))
  const moonSign = capitalizeSign(getSign(chart, 'moon'))
  const risingSign = capitalizeSign(getSign(chart, 'rising') || getSign(chart, 'sun'))
  const venusSign = capitalizeSign(getSign(chart, 'venus'))
  const marsSign = capitalizeSign(getSign(chart, 'mars'))

  const sunData = signData[sunSign as keyof typeof signData]
  const moonData = signData[moonSign as keyof typeof signData]
  const venusData = signData[venusSign as keyof typeof signData]
  const marsData = signData[marsSign as keyof typeof signData]

  const weekNum = Math.ceil(new Date().getDate() / 7)

  // Build transit-aware content if real data is available
  if (dailySky) {
    const moonPhase = dailySky.moonPhase.name
    const retroList = dailySky.retrogrades
    const retroNote = retroList.length > 0
      ? ` With ${retroList.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(', ')} in retrograde motion, the week has a reflective quality that invites review and revision.`
      : ' With all planets in direct motion, this is an excellent week for forward progress.'

    const overview = `This week opens under a ${moonPhase}, setting a ${moonPhase.toLowerCase().includes('waxing') || moonPhase.toLowerCase().includes('full') ? 'building and expansive' : 'reflective and releasing'} tone for ${sunSign} individuals. Your ${sunData?.keywords[0] || 'core'} nature finds support in the current planetary positions, especially with Venus in ${venusSign} enhancing your ${venusData?.keywords[0]?.toLowerCase() || 'relational'} world and Mars in ${marsSign} fuelling your ${marsData?.keywords[0]?.toLowerCase() || 'drive'}.${retroNote}`

    const theme = retroList.includes('mercury')
      ? 'Communication Review and Mental Clarity'
      : retroList.includes('venus')
      ? 'Relationship Reflection and Values Reassessment'
      : `${sunData?.keywords[0] || 'Growth'} and ${moonData?.keywords[0] || 'emotional development'}`

    return {
      overview,
      theme,
      opportunity: `The ${moonPhase} supports ${moonPhase.toLowerCase().includes('waxing') || moonPhase.toLowerCase().includes('full') ? 'launching initiatives and making bold moves' : 'reflection, planning, and tying up loose ends'}. Your ${sunSign} ${sunData?.strengths[0]?.toLowerCase() || 'natural abilities'} are particularly strong this week. Venus in ${venusSign} adds charm and grace to your interactions.`,
      challenge: retroList.length > 0
        ? `The ${retroList.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' and ')} retrograde${retroList.length > 1 ? 's' : ''} may create ${retroList.includes('mercury') ? 'communication mix-ups and tech glitches' : retroList.includes('venus') ? 'relationship tensions from unresolved past issues' : 'delays and the need for patience'}. Double-check important details and allow extra time for things to unfold.`
        : `Watch for your ${sunSign} tendency toward ${sunData?.challenges[0]?.toLowerCase() || 'overextension'}. Your ${moonSign} Moon may bring up ${moonData?.challenges[0]?.toLowerCase() || 'emotional sensitivity'} during high-stress moments.`,
      advice: `Work with the ${moonPhase} energy this week. ${moonPhase.toLowerCase().includes('waxing') || moonPhase.toLowerCase().includes('full') ? 'Channel your momentum into your most important goals.' : 'Use this quieter phase for strategic planning and self-care.'} Your ${sunSign}-${moonSign}-${risingSign} combination is uniquely suited to navigate this week's energies.`,
    }
  }

  // Fallback: template-based content
  const overviews = [
    `This week brings a powerful opportunity for ${sunSign} individuals to express their ${sunData?.keywords[0] || 'core'} nature more fully. The planetary alignments support your natural tendencies toward ${sunData?.strengths.slice(0, 2).join(' and ')?.toLowerCase() || 'achievement'}, while also inviting deeper exploration of your ${moonSign} emotional landscape. With Venus currently influencing ${venusData?.keywords[0]?.toLowerCase() || 'relationships'} and Mars activating your ${marsData?.keywords[0]?.toLowerCase() || 'drive'}, this is an excellent time to pursue both personal and professional goals with confidence.`,
    `The coming seven days offer a unique blend of energies tailored to your ${sunSign}-${moonSign} combination. The cosmic weather particularly supports activities related to ${sunData?.keywords.slice(0, 2).join(' and ')?.toLowerCase() || 'growth'}, while your ${moonSign} Moon ensures you stay connected to your emotional truth throughout. This week favours those who balance ${sunData?.element === 'Fire' ? 'bold action with thoughtful reflection' : sunData?.element === 'Earth' ? 'practical steps with intuitive guidance' : sunData?.element === 'Air' ? 'intellectual pursuits with emotional awareness' : 'emotional depth with grounded action'}.`,
    `As a ${sunSign} with ${moonSign} Moon, this week's astrological weather speaks directly to your chart. The planetary movements encourage you to lean into your ${sunData?.archetype || 'natural gifts'} while remaining mindful of your ${moonData?.keywords[0]?.toLowerCase() || 'emotional needs'}. The interplay between ${sunData?.element || 'Fire'} and ${moonData?.element || 'Water'} energies creates a dynamic week where both external achievement and internal growth are possible.`,
    `This week invites your ${sunSign} nature to shine. The celestial patterns forming overhead support your ${sunData?.strengths[0]?.toLowerCase() || 'natural talents'} and create opportunities in areas related to ${sunData?.keywords.slice(0, 2).join(' and ')?.toLowerCase() || 'self-expression'}. Your ${risingSign} Rising helps you navigate new situations with ${signData[risingSign as keyof typeof signData]?.keywords[0] || 'grace'}, while your ${moonSign} Moon provides the emotional intelligence to read situations accurately.`,
  ]

  const themes = [
    `${sunData?.keywords[0] || 'Growth'} and ${moonData?.keywords[0] || 'emotional development'}`,
    `Balancing ${sunData?.element || 'action'} with ${moonData?.element || 'reflection'}`,
    `Expressing your ${sunData?.archetype || 'authentic self'} more fully`,
    `Integration of ${sunData?.keywords[0]?.toLowerCase() || 'drive'} and ${moonData?.keywords[0]?.toLowerCase() || 'intuition'}`,
  ]

  const opportunities = [
    `Your ${sunData?.strengths[0]?.toLowerCase() || 'natural abilities'} are particularly accessible this week. Look for situations that allow you to demonstrate your ${sunSign} qualities of ${sunData?.keywords.slice(0, 2).join(' and ')?.toLowerCase() || 'leadership'}. Venus in ${venusSign} adds a harmonious quality to relationships, making this an excellent week for both romantic and professional connections.`,
    `The week ahead offers multiple windows for ${sunData?.element === 'Fire' ? 'bold initiatives and leadership opportunities' : sunData?.element === 'Earth' ? 'building lasting structures and financial growth' : sunData?.element === 'Air' ? 'networking, learning, and sharing ideas' : 'creative expression and emotional healing'}. Trust your ${moonSign} Moon's instincts about which opportunities align with your deeper needs.`,
    `Mars in ${marsSign} activates your drive and ambition, while Venus in ${venusSign} smooths your interactions. This combination supports both assertive action and diplomatic navigation. Your ${sunSign} nature finds support in taking steps toward ${sunData?.keywords[0]?.toLowerCase() || 'your goals'}.`,
  ]

  const challenges = [
    `Watch for your ${sunSign} tendency toward ${sunData?.challenges[0]?.toLowerCase() || 'overextension'}. Your ${moonSign} Moon may also bring up ${moonData?.challenges[0]?.toLowerCase() || 'emotional sensitivity'} during high-stress moments. The key is recognizing these patterns early and consciously choosing a different response.`,
    `The dynamic energy this week could trigger ${sunData?.shadowSide?.toLowerCase() || 'your shadow side'} if you are not mindful. Balance is essential - push forward with your ${sunSign} ambitions while honouring your ${moonSign} emotional rhythms. Avoid making major decisions when tired or reactive.`,
    `Your ${moonSign} Moon may feel pulled in different directions this week. The challenge is maintaining your centre while navigating competing demands. Ground yourself through ${moonData?.element === 'Water' ? 'quiet reflection and creative outlets' : moonData?.element === 'Earth' ? 'nature, routine, and physical comfort' : moonData?.element === 'Air' ? 'conversation and mental processing' : 'physical activity and passionate pursuits'}.`,
  ]

  const advices = [
    `This week, lead with your ${sunSign} strengths while staying attuned to your ${moonSign} emotional wisdom. Schedule your most important activities during your power days, and use lower-energy days for reflection and self-care. Remember that your ${risingSign} Rising is your ally in navigating social situations - let it work for you.`,
    `Focus on progress over perfection this week. Your ${sunSign} nature may want everything at once, but sustainable success comes from consistent effort. Use the week's energy to advance your key priorities while maintaining space for the unexpected opportunities that ${sunData?.element || 'dynamic'} energy often brings.`,
    `Trust the unique combination of your ${sunSign} Sun, ${moonSign} Moon, and ${risingSign} Rising. This configuration gives you specific strengths that no one else possesses. Lean into your ${sunData?.strengths[0]?.toLowerCase() || 'gifts'} while being gentle with your ${moonData?.challenges[0]?.toLowerCase() || 'growth edges'}.`,
  ]

  return {
    overview: overviews[weekNum % 4],
    theme: themes[weekNum % 4],
    opportunity: opportunities[weekNum % 3],
    challenge: challenges[weekNum % 3],
    advice: advices[weekNum % 3],
  }
}

// Generate key transits - enhanced with real data
function generateWeeklyTransits(chart: NatalChart, dailySky?: DailySkyData | null): { planet: string; aspect: string; meaning: string; bestUse: string }[] {
  const sunSign = capitalizeSign(getSign(chart, 'sun'))
  const moonSign = capitalizeSign(getSign(chart, 'moon'))
  const sunData = signData[sunSign as keyof typeof signData]

  if (dailySky) {
    const transits: { planet: string; aspect: string; meaning: string; bestUse: string }[] = []

    // Show real planetary positions
    const planets = dailySky.planets
    const sunPos = planets.find(p => p.planet === 'sun')
    const moonPos = planets.find(p => p.planet === 'moon')
    const venusPos = planets.find(p => p.planet === 'venus')
    const marsPos = planets.find(p => p.planet === 'mars')
    const mercuryPos = planets.find(p => p.planet === 'mercury')

    if (venusPos) {
      const sign = capitalizeSign(venusPos.sign)
      transits.push({
        planet: `Venus in ${sign}${venusPos.retrograde ? ' Rx' : ''}`,
        aspect: venusPos.retrograde ? 'reviewing relationships and values' : `enhancing ${signData[sign as keyof typeof signData]?.keywords[0]?.toLowerCase() || 'harmony'}`,
        meaning: venusPos.retrograde ? 'Past relationships or values resurface for review' : 'Enhanced creativity, relationships, and financial flow',
        bestUse: venusPos.retrograde ? 'Reflect on what you truly value, avoid new financial commitments' : 'Important conversations, creative projects, romantic gestures',
      })
    }

    if (marsPos) {
      const sign = capitalizeSign(marsPos.sign)
      transits.push({
        planet: `Mars in ${sign}${marsPos.retrograde ? ' Rx' : ''}`,
        aspect: marsPos.retrograde ? 'redirecting energy inward' : `driving ${signData[sign as keyof typeof signData]?.keywords[0]?.toLowerCase() || 'action'}`,
        meaning: marsPos.retrograde ? 'Inner motivation review, avoid forced confrontations' : 'Increased energy, motivation, and assertiveness',
        bestUse: marsPos.retrograde ? 'Channel energy into revision and internal goals' : 'Tackling challenges, starting projects, physical activity',
      })
    }

    if (mercuryPos) {
      const sign = capitalizeSign(mercuryPos.sign)
      transits.push({
        planet: `Mercury in ${sign}${mercuryPos.retrograde ? ' Rx' : ''}`,
        aspect: mercuryPos.retrograde ? 'reviewing communications and plans' : `supporting ${signData[sign as keyof typeof signData]?.keywords[0]?.toLowerCase() || 'thinking'}`,
        meaning: mercuryPos.retrograde ? 'Communication mix-ups possible, review all important messages' : 'Mental clarity, effective communication, learning',
        bestUse: mercuryPos.retrograde ? 'Re-read emails, revisit old ideas, back up data' : 'Important emails, negotiations, studying, writing',
      })
    }

    transits.push({
      planet: dailySky.moonPhase.name,
      aspect: `colouring the week's emotional tone`,
      meaning: dailySky.moonPhase.name.toLowerCase().includes('waxing') || dailySky.moonPhase.name.toLowerCase().includes('full')
        ? 'Building energy supports manifestation and action'
        : 'Releasing energy supports letting go and reflection',
      bestUse: 'Follow lunar rhythms for emotional processing and timing',
    })

    return transits
  }

  // Fallback
  return [
    {
      planet: 'Venus',
      aspect: `harmonizing with your ${sunSign} nature`,
      meaning: 'Enhanced relationships, creativity, and financial flow',
      bestUse: 'Important conversations, creative projects, financial decisions',
    },
    {
      planet: 'Mars',
      aspect: `activating your ${sunData?.element || 'Fire'} drive`,
      meaning: 'Increased energy, motivation, and assertiveness',
      bestUse: 'Tackling challenges, starting projects, physical activity',
    },
    {
      planet: 'Mercury',
      aspect: `supporting your ${sunSign} communication`,
      meaning: 'Mental clarity, effective communication, learning',
      bestUse: 'Important emails, negotiations, studying, writing',
    },
    {
      planet: 'Moon Phases',
      aspect: `moving through your emotional ${moonSign} territory`,
      meaning: 'Shifting emotional tides throughout the week',
      bestUse: 'Follow lunar rhythms for emotional processing',
    },
  ]
}

// Generate recommendations
function generateWeeklyRecs(chart: NatalChart, dailySky?: DailySkyData | null): { category: string; recommendation: string }[] {
  const sunSign = capitalizeSign(getSign(chart, 'sun'))
  const moonSign = capitalizeSign(getSign(chart, 'moon'))
  const sunData = signData[sunSign as keyof typeof signData]
  const moonData = signData[moonSign as keyof typeof signData]

  const recs = [
    {
      category: 'Career',
      recommendation: dailySky?.retrogrades.includes('mercury')
        ? `Mercury retrograde favours reviewing plans over launching new ones. Use your ${sunSign} ${sunData?.strengths[0]?.toLowerCase() || 'leadership'} to refine existing projects.`
        : `Schedule important meetings on your high-energy days. Your ${sunSign} ${sunData?.strengths[0]?.toLowerCase() || 'leadership'} will be most effective then.`,
    },
    {
      category: 'Relationships',
      recommendation: dailySky?.retrogrades.includes('venus')
        ? `Venus retrograde may bring past relationship patterns to the surface. Use your ${moonSign} Moon's emotional intelligence to process these themes.`
        : `Your ${moonSign} Moon craves ${moonData?.keywords[0]?.toLowerCase() || 'connection'} this week. Make time for meaningful conversations with loved ones.`,
    },
    {
      category: 'Health',
      recommendation: `Balance ${sunData?.element || 'active'} exercise with ${moonData?.element || 'restorative'} practices. Your body needs both this week.`,
    },
    {
      category: 'Growth',
      recommendation: `Focus on developing your ${sunData?.strengths[1]?.toLowerCase() || 'potential'}. This is an excellent week for personal development.`,
    },
    {
      category: 'Finances',
      recommendation: dailySky?.retrogrades.includes('jupiter')
        ? `Jupiter retrograde suggests reviewing financial strategies rather than expanding. Consolidate before growing.`
        : `Trust your ${sunSign} instincts about opportunities, but let your ${moonSign} Moon's caution guide major decisions.`,
    },
  ]

  return recs
}

export function WeeklyForecast({ chart, dailySky: initialDailySky }: WeeklyForecastProps) {
  const [dailySky, setDailySky] = useState<DailySkyData | null>(initialDailySky ?? null)

  useEffect(() => {
    if (initialDailySky !== undefined) return

    fetch('/api/daily-sky')
      .then(res => res.json())
      .then(json => {
        if (json.success && json.data) setDailySky(json.data)
      })
      .catch(() => {})
  }, [initialDailySky])

  const weekEnergy = useMemo(() => generateWeekEnergy(chart, dailySky), [chart, dailySky])
  const overview = useMemo(() => generateWeeklyOverview(chart, dailySky), [chart, dailySky])
  const transits = useMemo(() => generateWeeklyTransits(chart, dailySky), [chart, dailySky])
  const recommendations = useMemo(() => generateWeeklyRecs(chart, dailySky), [chart, dailySky])

  const powerDays = weekEnergy.filter(d => d.isPowerDay)
  const sunSign = capitalizeSign(getSign(chart, 'sun'))
  const moonSign = capitalizeSign(getSign(chart, 'moon'))

  const startDate = new Date()
  const endDate = new Date()
  endDate.setDate(startDate.getDate() + 6)

  const weekRange = `${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`

  return (
    <div className="bg-indigo-950/30 rounded-2xl p-6 mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className={`w-2 h-2 rounded-full ${dailySky ? 'bg-emerald-400' : 'bg-violet-400'} animate-pulse`} />
            <span className={`${dailySky ? 'text-emerald-400' : 'text-violet-400'} text-xs font-medium`}>
              {dailySky ? 'Live planetary data' : 'Weekly Forecast'}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white">Your Week Ahead</h2>
          <p className="text-indigo-200/50 text-sm">
            {weekRange} • {sunSign} Sun, {moonSign} Moon
            {dailySky && ` • ${dailySky.moonPhase.name}`}
          </p>
        </div>
        {powerDays.length > 0 && (
          <div className="text-right bg-amber-500/10 rounded-lg p-3">
            <div className="text-amber-400 text-xs font-medium mb-1">Power Days</div>
            <div className="text-white font-medium">{powerDays.map(d => `${d.day} ${d.date}`).join(', ')}</div>
          </div>
        )}
      </div>

      {/* Retrograde alerts */}
      {dailySky && dailySky.retrogrades.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {dailySky.retrogrades.map(planet => (
            <span key={planet} className="px-2 py-1 bg-amber-500/10 text-amber-400 text-xs rounded-full">
              {planet.charAt(0).toUpperCase() + planet.slice(1)} Retrograde
            </span>
          ))}
        </div>
      )}

      {/* Week Overview */}
      <div className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-xl p-5 mb-4">
        <h3 className="text-violet-300 text-sm font-medium mb-2">This Week's Overview</h3>
        <p className="text-white leading-relaxed">{overview.overview}</p>
      </div>

      {/* Theme, Opportunity, Challenge */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        <div className="bg-gradient-to-br from-indigo-500/20 to-blue-500/20 rounded-xl p-4">
          <div className="text-indigo-400 text-xs font-medium mb-2">This Week's Theme</div>
          <div className="text-white font-medium">{overview.theme}</div>
        </div>
        <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl p-4">
          <div className="text-emerald-400 text-xs font-medium mb-2">Key Opportunity</div>
          <div className="text-white/90 text-sm">{overview.opportunity}</div>
        </div>
        <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-xl p-4">
          <div className="text-amber-400 text-xs font-medium mb-2">Be Mindful Of</div>
          <div className="text-white/90 text-sm">{overview.challenge}</div>
        </div>
      </div>

      {/* 7-Day Energy Chart */}
      <div className="bg-indigo-950/40 rounded-xl p-4 mb-6">
        <div className="text-white font-medium mb-4">7-Day Energy Forecast</div>
        <div className="flex items-end justify-between gap-2 h-40">
          {weekEnergy.map((day, i) => (
            <div key={i} className="flex-1 flex flex-col items-center">
              <div className="text-indigo-200/50 text-[10px] mb-1 h-8 text-center">
                {day.energy}
              </div>
              <div
                className={`w-full rounded-t-lg transition-all duration-500 ${
                  day.isPowerDay
                    ? 'bg-gradient-to-t from-amber-500 to-amber-400'
                    : day.energy >= 70
                    ? 'bg-gradient-to-t from-emerald-500 to-emerald-400'
                    : day.energy >= 50
                    ? 'bg-gradient-to-t from-indigo-500 to-indigo-400'
                    : 'bg-gradient-to-t from-slate-500 to-slate-400'
                }`}
                style={{ height: `${day.energy}%` }}
              />
              <div className={`mt-2 text-xs ${i === 0 ? 'text-indigo-300 font-medium' : 'text-indigo-200/50'}`}>
                {day.day}
              </div>
              <div className={`text-xs ${i === 0 ? 'text-white' : 'text-indigo-200/30'}`}>{day.date}</div>
              {day.isPowerDay && (
                <div className="text-amber-400 text-[10px] mt-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-6 mt-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-amber-500" />
            <span className="text-indigo-200/50">Power Day (85+)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-emerald-500" />
            <span className="text-indigo-200/50">High (70-84)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-indigo-500" />
            <span className="text-indigo-200/50">Moderate (50-69)</span>
          </div>
        </div>
      </div>

      {/* Day-by-Day Breakdown */}
      <div className="bg-indigo-950/40 rounded-xl p-4 mb-6">
        <div className="text-white font-medium mb-4">Day-by-Day Guide</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {weekEnergy.slice(0, 4).map((day, i) => (
            <div key={i} className={`p-3 rounded-lg ${i === 0 ? 'bg-indigo-500/10 border border-indigo-500/20' : 'bg-indigo-950/40'}`}>
              <div className="flex items-center justify-between mb-1">
                <span className={`font-medium ${i === 0 ? 'text-indigo-300' : 'text-white'}`}>
                  {day.day} {day.date}
                  {i === 0 && <span className="text-xs ml-2 text-indigo-400">(Today)</span>}
                </span>
                <span className={`text-sm font-medium ${day.isPowerDay ? 'text-amber-400' : day.energy >= 70 ? 'text-emerald-400' : 'text-indigo-300'}`}>
                  {day.energy}
                </span>
              </div>
              <p className="text-indigo-200/60 text-xs">{day.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Key Transits */}
      <div className="bg-indigo-950/40 rounded-xl p-4 mb-6">
        <div className="text-white font-medium mb-4">
          {dailySky ? 'Current Planetary Positions' : 'Key Planetary Influences'}
        </div>
        <div className="space-y-4">
          {transits.map((transit, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-indigo-300 text-sm font-medium">
                  {transit.planet.includes('Moon') || transit.planet.includes('moon') ? '🌙' : transit.planet.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <div className="text-white text-sm font-medium">
                  {transit.planet} <span className="text-indigo-200/60 font-normal">{transit.aspect}</span>
                </div>
                <div className="text-indigo-200/60 text-xs mb-1">{transit.meaning}</div>
                <div className="text-indigo-300/50 text-xs">Best for: {transit.bestUse}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Advice */}
      <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-xl p-5 mb-6">
        <h3 className="text-emerald-300 text-sm font-medium mb-2">Guidance for the Week</h3>
        <p className="text-white/90 leading-relaxed text-sm">{overview.advice}</p>
      </div>

      {/* Recommendations by Category */}
      <div className="bg-indigo-950/40 rounded-xl p-4">
        <div className="text-white font-medium mb-4">This Week's Recommendations</div>
        <div className="space-y-3">
          {recommendations.map((rec, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                rec.category === 'Career' ? 'bg-amber-500/20' :
                rec.category === 'Relationships' ? 'bg-rose-500/20' :
                rec.category === 'Health' ? 'bg-blue-500/20' :
                rec.category === 'Growth' ? 'bg-violet-500/20' :
                'bg-emerald-500/20'
              }`}>
                <span className={`text-xs font-medium ${
                  rec.category === 'Career' ? 'text-amber-400' :
                  rec.category === 'Relationships' ? 'text-rose-400' :
                  rec.category === 'Health' ? 'text-blue-400' :
                  rec.category === 'Growth' ? 'text-violet-400' :
                  'text-emerald-400'
                }`}>
                  {rec.category.charAt(0)}
                </span>
              </div>
              <div>
                <div className={`text-xs font-medium mb-0.5 ${
                  rec.category === 'Career' ? 'text-amber-400' :
                  rec.category === 'Relationships' ? 'text-rose-400' :
                  rec.category === 'Health' ? 'text-blue-400' :
                  rec.category === 'Growth' ? 'text-violet-400' :
                  'text-emerald-400'
                }`}>
                  {rec.category}
                </div>
                <p className="text-indigo-200/70 text-sm">{rec.recommendation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
