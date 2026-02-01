'use client'

/**
 * Daily Insights Component (Unlocked/Premium)
 *
 * Shows personalized daily insights based on the user's natal chart.
 * When real transit data is available from astrology-api.io, displays
 * actual moon phase, retrogrades, transit highlights, and transit-based cosmic score.
 * Falls back to template-based content when API is unavailable.
 */

import { useMemo, useState, useEffect } from 'react'
import type { NatalChart } from '@/types'
import { signData } from '@/lib/report-generator-v2'
import type { DailySkyData, TransitAspect } from '@/lib/astrology-api'

interface DailyInsightsProps {
  chart: NatalChart
  dailySky?: DailySkyData | null
}

// Get sign from placements
function getSign(chart: NatalChart, planet: string): string {
  const placement = chart.placements.find(p => p.planet === planet)
  return placement?.sign || 'aries'
}

function capitalizeSign(sign: string): string {
  return sign.charAt(0).toUpperCase() + sign.slice(1)
}

// Generate cosmic score - enhanced with real transit data when available
function generateCosmicScore(chart: NatalChart, dailySky?: DailySkyData | null): number {
  const day = new Date().getDate()
  const sunSign = getSign(chart, 'sun')
  const moonSign = getSign(chart, 'moon')

  const sunElement = signData[capitalizeSign(sunSign) as keyof typeof signData]?.element || 'Fire'
  const moonElement = signData[capitalizeSign(moonSign) as keyof typeof signData]?.element || 'Water'

  let baseScore = 65 + (day % 25)
  const elementBonus = sunElement === moonElement ? 5 : 0
  baseScore += elementBonus

  // Enhance with real sky data
  if (dailySky) {
    // Moon phase influence
    const phase = (dailySky.moonPhase?.name ?? '').toLowerCase()
    if (phase.includes('full')) baseScore += 8
    else if (phase.includes('new')) baseScore -= 3
    else if (phase.includes('waxing')) baseScore += 4

    // Retrogrades reduce score slightly
    baseScore -= dailySky.retrogrades.length * 2

    // Void of course dampens energy
    if (dailySky.voidOfCourse?.isVoid) baseScore -= 5
  }

  return Math.min(95, Math.max(55, baseScore))
}

// Generate comprehensive daily insight (~300 words)
function generateDailyInsight(chart: NatalChart, dailySky?: DailySkyData | null): { overview: string; energy: string; guidance: string; closing: string } {
  const sunSign = capitalizeSign(getSign(chart, 'sun'))
  const moonSign = capitalizeSign(getSign(chart, 'moon'))
  const risingSign = capitalizeSign(getSign(chart, 'rising') || getSign(chart, 'sun'))
  const venusSign = capitalizeSign(getSign(chart, 'venus'))
  const marsSign = capitalizeSign(getSign(chart, 'mars'))
  const mercurySign = capitalizeSign(getSign(chart, 'mercury'))

  const sunData = signData[sunSign as keyof typeof signData]
  const moonData = signData[moonSign as keyof typeof signData]
  const venusData = signData[venusSign as keyof typeof signData]
  const marsData = signData[marsSign as keyof typeof signData]

  const dayOfWeek = new Date().toLocaleDateString('en-US', { weekday: 'long' })
  const day = new Date().getDate()
  const dayMod = day % 7

  // Build transit-aware overview if real data available
  if (dailySky) {
    const moonPhase = (dailySky.moonPhase?.name ?? 'Waxing Crescent')
    const retroList = dailySky.retrogrades
    const retroNote = retroList.length > 0
      ? ` With ${retroList.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' and ')} retrograde, a reflective quality underpins the day's energy.`
      : ''

    const voidNote = dailySky.voidOfCourse?.isVoid
      ? ' The Moon is currently void-of-course, suggesting a pause before initiating anything significant.'
      : ''

    const moonSign_current = dailySky.planets.find(p => p.planet === 'moon')
    const moonSignName = moonSign_current
      ? capitalizeSign(moonSign_current.sign)
      : moonSign

    const transitOverview = `Today's ${moonPhase} with the Moon in ${moonSignName} creates a ${moonPhase.toLowerCase().includes('full') ? 'powerful and illuminating' : moonPhase.toLowerCase().includes('new') ? 'fresh and seed-planting' : moonPhase.toLowerCase().includes('waxing') ? 'building and expansive' : 'releasing and introspective'} atmosphere for ${sunSign} individuals. Your ${sunData?.keywords[0] || 'core'} nature is activated by the current planetary positions.${retroNote}${voidNote}`

    const transitEnergy = `The cosmic weather today particularly influences your ${sunSign}-${moonSign} combination. ${sunData?.element || 'Fire'} energy from your Sun interacts with the ${moonPhase}'s ${moonPhase.toLowerCase().includes('full') ? 'amplifying' : 'shifting'} quality. Venus in ${venusSign} adds a ${venusData?.keywords[0]?.toLowerCase() || 'harmonious'} flavour to your interactions, while Mars in ${marsSign} drives your ${marsData?.keywords[0]?.toLowerCase() || 'assertive'} impulses.`

    const transitGuidance = `Today's guidance centres on working with the ${moonPhase} energy. ${moonPhase.toLowerCase().includes('waxing') || moonPhase.toLowerCase().includes('full') ? 'This is a time for building, creating, and moving forward with your plans.' : 'This is a time for reflection, release, and preparing for the next cycle.'} Your ${sunSign} ${sunData?.strengths[0]?.toLowerCase() || 'strengths'} are your greatest asset today. Trust your ${moonSign} Moon's emotional intelligence to guide your responses.`

    const transitClosing = `As you navigate today's ${moonPhase} energy, remember that your unique ${sunSign}-${moonSign}-${risingSign} configuration gives you specific strengths. ${retroList.length > 0 ? `The ${retroList.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' and ')} retrograde period is an invitation to review and refine rather than rush forward.` : 'The stars support forward movement and initiative today.'}`

    return {
      overview: transitOverview,
      energy: transitEnergy,
      guidance: transitGuidance,
      closing: transitClosing,
    }
  }

  // Fallback: template-based content
  const overviews = [
    `Today's celestial configuration creates a powerful window for ${sunData?.keywords[0] || 'growth'} and self-expression. As a ${sunSign} Sun, you are naturally drawn to ${sunData?.keywords.slice(0, 2).join(' and ') || 'achievement'}, and today's planetary alignments amplify these qualities. The Moon's position activates your ${moonSign} emotional nature, bringing ${moonData?.keywords[0] || 'intuitive'} energy to the surface. This is an excellent day to trust your instincts and act on opportunities that align with your core values.`,
    `The cosmic weather today particularly favours your ${sunSign} nature. With the current planetary positions supporting ${sunData?.element || 'Fire'} energy, you may feel an increased drive toward ${sunData?.strengths[0]?.toLowerCase() || 'action'}. Your ${moonSign} Moon adds emotional depth to your decisions, helping you balance ${sunData?.element === 'Fire' ? 'enthusiasm with wisdom' : sunData?.element === 'Earth' ? 'practicality with intuition' : sunData?.element === 'Air' ? 'logic with feeling' : 'emotion with groundedness'}.`,
    `${dayOfWeek} brings a unique blend of energies that speaks directly to your ${sunSign}-${moonSign} combination. The universe is highlighting themes of ${sunData?.keywords[0] || 'identity'} and ${moonData?.keywords[0] || 'security'} today. Pay attention to how these areas of your life are calling for attention. Your ${risingSign} Rising helps you navigate social situations with ${signData[risingSign as keyof typeof signData]?.keywords[0] || 'grace'}.`,
    `Today's astrological weather creates optimal conditions for your natural ${sunSign} abilities. With supportive aspects to your Sun sign, your ${sunData?.strengths.slice(0, 2).join(' and ')?.toLowerCase() || 'talents'} are particularly accessible. The emotional undercurrent from the ${moonSign} Moon suggests that honouring your ${moonData?.keywords[0]?.toLowerCase() || 'emotional'} needs will enhance your effectiveness in all areas.`,
    `The planetary dance today creates an interesting dynamic for ${sunSign} individuals. While your Sun wants to ${sunData?.keywords[0]?.toLowerCase() || 'express'}, today's transits also invite deeper ${moonData?.element === 'Water' ? 'emotional exploration' : moonData?.element === 'Earth' ? 'grounding practices' : moonData?.element === 'Air' ? 'mental stimulation' : 'passionate engagement'}. Finding balance between action and reflection will be key.`,
    `As a ${sunSign} with ${moonSign} Moon, today's cosmic setup is particularly aligned with your chart. The current planetary positions support your natural tendency toward ${sunData?.keywords[0] || 'leadership'}, while also nurturing your emotional need for ${moonData?.keywords[0] || 'connection'}. This is a day where both aspects of your nature can work in harmony.`,
    `Today brings ${sunData?.element || 'dynamic'} energy that resonates with your ${sunSign} Sun. The celestial patterns forming overhead speak to themes of ${sunData?.keywords.slice(0, 2).join(', ') || 'growth'} and ${moonData?.keywords[0] || 'emotional fulfillment'}. Your chart suggests this is an opportune time to take initiative in areas where you have been hesitating.`,
  ]

  const energyDescriptions = [
    `Your energy levels today are influenced by the ${sunData?.element || 'Fire'}-${moonData?.element || 'Water'} interplay in your chart. ${sunData?.element === moonData?.element ? 'With your Sun and Moon in the same element, there is a natural flow to your energy today.' : `The ${sunData?.element} of your Sun may feel in tension with your ${moonData?.element} Moon - use this creative friction to fuel productive action.`} Venus in ${venusSign} adds a harmonious quality to your interactions, making this a good day for ${venusData?.keywords[0]?.toLowerCase() || 'connection'} and creative pursuits. Mars in ${marsSign} influences how you assert yourself - expect ${marsData?.keywords[0]?.toLowerCase() || 'dynamic'} energy when pursuing your goals.`,
    `The morning hours carry particularly strong ${sunData?.element || 'Fire'} energy, making it an ideal time for activities that require ${sunData?.element === 'Fire' ? 'initiative and courage' : sunData?.element === 'Earth' ? 'focus and persistence' : sunData?.element === 'Air' ? 'communication and planning' : 'creativity and intuition'}. As the day progresses, your ${moonSign} Moon becomes more prominent, shifting the energy toward ${moonData?.keywords[0]?.toLowerCase() || 'emotional'} matters. Listen to this natural rhythm rather than fighting against it.`,
    `Mercury in ${mercurySign} sharpens your mental faculties today, particularly in areas of ${signData[mercurySign as keyof typeof signData]?.keywords[0]?.toLowerCase() || 'communication'}. Combined with your ${sunSign} core nature, this creates excellent conditions for problem-solving and meaningful conversations. Your ${moonSign} Moon ensures you do not lose touch with the emotional dimension of situations.`,
  ]

  const guidanceMessages = [
    `Today's guidance for you centres on embracing your ${sunData?.strengths[0]?.toLowerCase() || 'natural talents'} while remaining aware of your tendency toward ${sunData?.challenges[0]?.toLowerCase() || 'overextension'}. Your ${moonSign} Moon is asking you to honour your emotional needs - ${moonData?.element === 'Water' ? 'take time for quiet reflection and self-care' : moonData?.element === 'Earth' ? 'ground yourself through nature or physical comfort' : moonData?.element === 'Air' ? 'process your feelings through conversation or writing' : 'express your emotions through action or creativity'}. The most successful path today involves balancing external achievement with internal awareness.`,
    `Focus your energy today on areas where your ${sunSign} nature can truly shine. This means prioritising ${sunData?.keywords[0]?.toLowerCase() || 'leadership'} opportunities and situations that call for your ${sunData?.strengths[0]?.toLowerCase() || 'unique gifts'}. At the same time, do not neglect the whispers of your ${moonSign} Moon - your emotional intelligence is a powerful ally when making important decisions.`,
    `The cosmic message today is about integration. Your ${sunSign} Sun represents who you are at your core, while your ${moonSign} Moon reveals what you need to feel secure and nurtured. Today offers opportunities to honour both. Make decisions that satisfy your ${sunData?.keywords[0]?.toLowerCase() || 'drive for achievement'} while also creating space for ${moonData?.keywords[0]?.toLowerCase() || 'emotional wellbeing'}.`,
  ]

  const closingMessages = [
    `As you move through today, remember that your ${sunSign}-${moonSign}-${risingSign} combination gives you unique strengths that no one else possesses. Trust your ${sunData?.element || 'inner'} fire, honour your ${moonData?.element || 'emotional'} needs, and present yourself to the world with the ${signData[risingSign as keyof typeof signData]?.keywords[0] || 'authentic'} energy of your Rising sign. The stars are aligned in your favour.`,
    `Today is an opportunity to express the highest potential of your ${sunSign} Sun. Let your ${sunData?.archetype || 'inner wisdom'} guide your actions, trust your ${moonSign} Moon's intuition, and remember that every challenge is a chance to demonstrate your ${sunData?.strengths[0]?.toLowerCase() || 'resilience'}.`,
    `The universe has specific lessons for your ${sunSign} nature today. Approach them with curiosity rather than resistance. Your ${moonSign} Moon will help you process whatever arises emotionally, while your ${risingSign} Rising ensures you meet the world with ${signData[risingSign as keyof typeof signData]?.keywords[0] || 'grace'} and authenticity.`,
  ]

  return {
    overview: overviews[dayMod],
    energy: energyDescriptions[dayMod % 3],
    guidance: guidanceMessages[dayMod % 3],
    closing: closingMessages[dayMod % 3],
  }
}

// Generate timing recommendations
function generateTimingTips(chart: NatalChart): { morning: string; afternoon: string; evening: string } {
  const sunSign = capitalizeSign(getSign(chart, 'sun'))
  const sunData = signData[sunSign as keyof typeof signData]

  const element = sunData?.element || 'Fire'

  const timings = {
    Fire: {
      morning: 'Peak energy for physical activity, bold initiatives, and tackling challenging tasks. Your natural vitality is strongest now.',
      afternoon: 'Excellent for important meetings, leadership decisions, and assertive conversations. Channel your fire into productive outcomes.',
      evening: 'Creative projects, social gatherings, or activities that allow self-expression. Wind down through movement rather than stillness.',
    },
    Earth: {
      morning: 'Steady focus for detailed work, financial planning, and methodical tasks. Your grounded energy supports concentration.',
      afternoon: 'Ideal for practical decisions, negotiations, and building lasting structures. Trust your instinct for what is sustainable.',
      evening: 'Self-care rituals, time in nature, or enjoying sensory pleasures. Your body knows what it needs to recharge.',
    },
    Air: {
      morning: 'Mental clarity peaks - perfect for writing, communication, and intellectual work. Share your ideas confidently.',
      afternoon: 'Networking, collaborative projects, and social connections thrive. Your natural ability to connect shines now.',
      evening: 'Reading, learning, stimulating conversations, or processing the day through journaling or discussion.',
    },
    Water: {
      morning: 'Intuitive insights are strongest - journal dreams, meditate, or sit with your feelings. Trust what arises.',
      afternoon: 'Creative work, emotional conversations, and nurturing activities flow naturally. Your empathy is a superpower.',
      evening: 'Quality time with loved ones, artistic pursuits, or spiritual practices. Water and music soothe your soul.',
    },
  }

  return timings[element as keyof typeof timings] || timings.Fire
}

// Generate focus areas
function generateFocusAreas(chart: NatalChart): { priority: string; secondary: string; watch: string; opportunity: string } {
  const sunSign = capitalizeSign(getSign(chart, 'sun'))
  const moonSign = capitalizeSign(getSign(chart, 'moon'))
  const sunData = signData[sunSign as keyof typeof signData]
  const moonData = signData[moonSign as keyof typeof signData]

  return {
    priority: sunData?.strengths[0] || 'Personal growth',
    secondary: moonData?.keywords[0] || 'Emotional wellbeing',
    watch: sunData?.challenges[0] || 'Balance',
    opportunity: sunData?.keywords[1] || 'Self-expression',
  }
}

// Generate action items
function generateActionItems(chart: NatalChart, dailySky?: DailySkyData | null): { do: string[]; avoid: string[] } {
  const sunSign = capitalizeSign(getSign(chart, 'sun'))
  const moonSign = capitalizeSign(getSign(chart, 'moon'))
  const sunData = signData[sunSign as keyof typeof signData]
  const moonData = signData[moonSign as keyof typeof signData]

  const doItems = [
    `Lead with your ${sunSign} ${sunData?.strengths[0]?.toLowerCase() || 'strengths'} in challenging situations`,
    `Honour your ${moonSign} Moon's need for ${moonData?.keywords[0]?.toLowerCase() || 'emotional connection'}`,
    `Express your ${sunData?.keywords[0]?.toLowerCase() || 'authentic'} nature boldly and without apology`,
    `Take initiative on projects that align with your ${sunData?.element || 'core'} nature`,
    `Trust your intuition, especially regarding ${moonData?.element === 'Water' ? 'emotional matters' : moonData?.element === 'Earth' ? 'practical decisions' : moonData?.element === 'Air' ? 'ideas and communication' : 'creative impulses'}`,
  ]

  const avoidItems = [
    `${sunData?.challenges[0] || 'Overextending yourself'} - your ${sunSign} shadow tendency`,
    `Ignoring emotional signals from your ${moonSign} Moon`,
    `Making major decisions when feeling reactive or pressured`,
    `${moonData?.challenges[0] || 'Suppressing your true feelings'}`,
  ]

  // Add transit-aware items
  if (dailySky) {
    if (dailySky.voidOfCourse?.isVoid) {
      avoidItems.push('Starting important new ventures (Moon is void-of-course)')
    }
    if (dailySky.retrogrades.includes('mercury')) {
      avoidItems.push('Sending important messages without re-reading (Mercury retrograde)')
      doItems.push('Review and revise existing plans and communications')
    }
    const phase = (dailySky.moonPhase?.name ?? '').toLowerCase()
    if (phase.includes('new')) {
      doItems.push('Set intentions for the new lunar cycle')
    } else if (phase.includes('full')) {
      doItems.push('Celebrate what you have accomplished this cycle')
    }
  }

  return { do: doItems, avoid: avoidItems }
}

// Generate life area scores with descriptions
function generateLifeAreaScores(chart: NatalChart, dailySky?: DailySkyData | null): { area: string; score: number; color: string; insight: string }[] {
  const sunSign = capitalizeSign(getSign(chart, 'sun'))
  const moonSign = capitalizeSign(getSign(chart, 'moon'))
  const venusSign = capitalizeSign(getSign(chart, 'venus'))
  const sunData = signData[sunSign as keyof typeof signData]
  const day = new Date().getDate()

  // Base scores
  let loveScore = 70 + (day % 25)
  let careerScore = 65 + ((day + 5) % 30)
  let moneyScore = 60 + ((day + 10) % 35)
  let healthScore = 75 + ((day + 3) % 20)

  // Adjust with real data
  if (dailySky) {
    const retroCount = dailySky.retrogrades.length
    careerScore -= retroCount * 2
    if (dailySky.retrogrades.includes('venus')) loveScore -= 5
    if (dailySky.retrogrades.includes('jupiter')) moneyScore -= 5
    if (dailySky.voidOfCourse?.isVoid) {
      careerScore -= 3
      moneyScore -= 3
    }
    // Full moon boosts emotional/relationship scores
    if ((dailySky.moonPhase?.name ?? '').toLowerCase().includes('full')) {
      loveScore += 5
      healthScore += 3
    }
  }

  return [
    {
      area: 'Love',
      score: Math.min(100, Math.max(30, loveScore)),
      color: 'bg-rose-500',
      insight: dailySky?.retrogrades.includes('venus')
        ? `Venus retrograde invites reflection on relationship patterns`
        : `Venus in ${venusSign} colours your romantic energy today`,
    },
    {
      area: 'Career',
      score: Math.min(100, Math.max(30, careerScore)),
      color: 'bg-amber-500',
      insight: dailySky?.retrogrades.includes('mercury')
        ? `Mercury retrograde favours reviewing rather than launching`
        : `Your ${sunSign} drive is ${careerScore > 80 ? 'highly' : 'moderately'} activated for professional matters`,
    },
    {
      area: 'Money',
      score: Math.min(100, Math.max(30, moneyScore)),
      color: 'bg-emerald-500',
      insight: dailySky?.retrogrades.includes('jupiter')
        ? `Jupiter retrograde suggests caution with expansion`
        : `${sunData?.element || 'Your elemental'} energy influences financial decisions today`,
    },
    {
      area: 'Health',
      score: Math.min(100, Math.max(30, healthScore)),
      color: 'bg-blue-500',
      insight: `Your ${moonSign} Moon suggests ${signData[moonSign as keyof typeof signData]?.element === 'Water' ? 'hydration and rest' : 'active self-care'} focus`,
    },
  ]
}

export function DailyInsights({ chart, dailySky: initialDailySky }: DailyInsightsProps) {
  const [dailySky, setDailySky] = useState<DailySkyData | null>(initialDailySky ?? null)
  const [skyLoaded, setSkyLoaded] = useState(!!initialDailySky)

  // Fetch daily sky data from API if not provided as prop
  useEffect(() => {
    if (initialDailySky !== undefined) return

    fetch('/api/daily-sky')
      .then(res => res.json())
      .then(json => {
        if (json.success && json.data) {
          setDailySky(json.data)
        }
      })
      .catch(() => {
        // API unavailable - continue with template content
      })
      .finally(() => setSkyLoaded(true))
  }, [initialDailySky])

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  const cosmicScore = useMemo(() => generateCosmicScore(chart, dailySky), [chart, dailySky])
  const insight = useMemo(() => generateDailyInsight(chart, dailySky), [chart, dailySky])
  const timing = useMemo(() => generateTimingTips(chart), [chart])
  const focus = useMemo(() => generateFocusAreas(chart), [chart])
  const actions = useMemo(() => generateActionItems(chart, dailySky), [chart, dailySky])
  const lifeAreas = useMemo(() => generateLifeAreaScores(chart, dailySky), [chart, dailySky])

  const sunSign = capitalizeSign(getSign(chart, 'sun'))
  const moonSign = capitalizeSign(getSign(chart, 'moon'))

  return (
    <div className="bg-indigo-950/30 rounded-2xl p-6 mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className={`w-2 h-2 rounded-full ${dailySky ? 'bg-emerald-400' : 'bg-indigo-400'} animate-pulse`} />
            <span className={`${dailySky ? 'text-emerald-400' : 'text-indigo-400'} text-xs font-medium`}>
              {dailySky ? 'Live cosmic data' : 'Updated today at 6am'}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white">Your Daily Cosmic Insights</h2>
          <p className="text-indigo-200/50 text-sm">
            {today} • {sunSign} Sun, {moonSign} Moon
            {dailySky && ` • ${(dailySky.moonPhase?.name ?? 'Waxing Crescent')}`}
          </p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-white">{cosmicScore}</div>
          <div className="text-indigo-200/50 text-xs">Cosmic Score</div>
          <div className="text-indigo-300/40 text-[10px] mt-1">
            {cosmicScore >= 85 ? 'Exceptional day' : cosmicScore >= 75 ? 'High potential' : cosmicScore >= 65 ? 'Balanced energy' : 'Reflective day'}
          </div>
        </div>
      </div>

      {/* Real-time sky alerts */}
      {dailySky && (dailySky.retrogrades.length > 0 || dailySky.voidOfCourse?.isVoid) && (
        <div className="flex flex-wrap gap-2 mb-4">
          {dailySky.retrogrades.map(planet => (
            <span key={planet} className="px-2 py-1 bg-amber-500/10 text-amber-400 text-xs rounded-full">
              {planet.charAt(0).toUpperCase() + planet.slice(1)} Rx
            </span>
          ))}
          {dailySky.voidOfCourse?.isVoid && (
            <span className="px-2 py-1 bg-slate-500/10 text-slate-400 text-xs rounded-full">
              Moon Void-of-Course
            </span>
          )}
          <span className="px-2 py-1 bg-indigo-500/10 text-indigo-400 text-xs rounded-full">
            {(dailySky.moonPhase?.name ?? 'Waxing Crescent')}
          </span>
        </div>
      )}

      {/* Main Insight - Overview */}
      <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl p-5 mb-4">
        <h3 className="text-indigo-300 text-sm font-medium mb-2">Today's Overview</h3>
        <p className="text-white leading-relaxed">{insight.overview}</p>
      </div>

      {/* Energy Description */}
      <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-xl p-5 mb-4">
        <h3 className="text-amber-300 text-sm font-medium mb-2">Your Energy Today</h3>
        <p className="text-white/90 leading-relaxed text-sm">{insight.energy}</p>
      </div>

      {/* Guidance */}
      <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-xl p-5 mb-4">
        <h3 className="text-emerald-300 text-sm font-medium mb-2">Guidance for Today</h3>
        <p className="text-white/90 leading-relaxed text-sm">{insight.guidance}</p>
      </div>

      {/* Closing Message */}
      <div className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-xl p-5 mb-6">
        <h3 className="text-violet-300 text-sm font-medium mb-2">Remember</h3>
        <p className="text-white/90 leading-relaxed text-sm italic">{insight.closing}</p>
      </div>

      {/* Timing - Expanded */}
      <div className="bg-indigo-950/40 rounded-xl p-4 mb-6">
        <div className="text-white font-medium mb-4">Optimal Timing Today</div>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-amber-400 text-lg">☀️</span>
            </div>
            <div>
              <div className="text-amber-400 text-sm font-medium">Morning (6am - 12pm)</div>
              <p className="text-indigo-200/70 text-sm">{timing.morning}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-blue-400 text-lg">🌤️</span>
            </div>
            <div>
              <div className="text-blue-400 text-sm font-medium">Afternoon (12pm - 6pm)</div>
              <p className="text-indigo-200/70 text-sm">{timing.afternoon}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-violet-400 text-lg">🌙</span>
            </div>
            <div>
              <div className="text-violet-400 text-sm font-medium">Evening (6pm onwards)</div>
              <p className="text-indigo-200/70 text-sm">{timing.evening}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Focus Areas - Cards */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-xl p-4">
          <div className="text-violet-400 text-xs font-medium mb-1">Priority Focus</div>
          <div className="text-white font-medium">{focus.priority}</div>
        </div>
        <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl p-4">
          <div className="text-emerald-400 text-xs font-medium mb-1">Opportunity</div>
          <div className="text-white font-medium">{focus.opportunity}</div>
        </div>
        <div className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-xl p-4">
          <div className="text-blue-400 text-xs font-medium mb-1">Emotional Need</div>
          <div className="text-white font-medium">{focus.secondary}</div>
        </div>
        <div className="bg-gradient-to-br from-rose-500/20 to-pink-500/20 rounded-xl p-4">
          <div className="text-rose-400 text-xs font-medium mb-1">Be Mindful Of</div>
          <div className="text-white font-medium">{focus.watch}</div>
        </div>
      </div>

      {/* Life Area Scores with insights */}
      <div className="bg-indigo-950/40 rounded-xl p-4 mb-6">
        <div className="text-white font-medium mb-4">Life Area Forecast</div>
        <div className="space-y-4">
          {lifeAreas.map((item) => (
            <div key={item.area}>
              <div className="flex items-center gap-3 mb-1">
                <div className="w-16 text-indigo-200/70 text-sm font-medium">{item.area}</div>
                <div className="flex-1 h-2 bg-indigo-900/50 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full transition-all duration-500`}
                    style={{ width: `${item.score}%` }}
                  />
                </div>
                <div className="w-8 text-right text-white text-sm font-medium">{item.score}</div>
              </div>
              <p className="text-indigo-200/50 text-xs ml-[76px]">{item.insight}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Action Items - Expanded */}
      <div className="bg-indigo-950/40 rounded-xl p-4">
        <div className="text-white font-medium mb-4">Today's Action Guide</div>

        <div className="mb-4">
          <div className="text-emerald-400 text-sm font-medium mb-2 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Do Today
          </div>
          <div className="space-y-2">
            {actions.do.map((item, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-emerald-400 text-xs">{i + 1}</span>
                </div>
                <span className="text-indigo-200/70">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="text-rose-400 text-sm font-medium mb-2 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Avoid Today
          </div>
          <div className="space-y-2">
            {actions.avoid.map((item, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <div className="w-5 h-5 rounded-full bg-rose-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-rose-400 text-xs">!</span>
                </div>
                <span className="text-indigo-200/70">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
