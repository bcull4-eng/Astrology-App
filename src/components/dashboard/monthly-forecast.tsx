'use client'

/**
 * Monthly Forecast Component (Unlocked/Premium)
 *
 * Comprehensive monthly forecast with week-by-week breakdown,
 * key dates, themes, and personalized guidance.
 */

import { useMemo } from 'react'
import type { NatalChart } from '@/types'
import { signData } from '@/lib/report-generator-v2'

interface MonthlyForecastProps {
  chart: NatalChart
}

function getSign(chart: NatalChart, planet: string): string {
  const placement = chart.placements.find(p => p.planet === planet)
  return placement?.sign || 'aries'
}

function capitalizeSign(sign: string): string {
  return sign.charAt(0).toUpperCase() + sign.slice(1)
}

function generateMonthlyOverview(chart: NatalChart): {
  overview: string
  theme: string
  opportunities: string[]
  challenges: string[]
  keyDates: { date: string; event: string; advice: string }[]
  weeks: { week: number; title: string; focus: string; energy: number }[]
} {
  const sunSign = capitalizeSign(getSign(chart, 'sun'))
  const moonSign = capitalizeSign(getSign(chart, 'moon'))
  const venusSign = capitalizeSign(getSign(chart, 'venus'))
  const marsSign = capitalizeSign(getSign(chart, 'mars'))

  const sunData = signData[sunSign as keyof typeof signData]
  const moonData = signData[moonSign as keyof typeof signData]

  const currentMonth = new Date().toLocaleString('default', { month: 'long' })
  const monthNum = new Date().getMonth()

  const overviews = [
    `${currentMonth} brings a powerful emphasis on ${sunData?.keywords[0]?.toLowerCase() || 'personal growth'} for ${sunSign} individuals. The planetary movements this month support your natural inclination toward ${sunData?.strengths.slice(0, 2).join(' and ')?.toLowerCase() || 'achievement'}, while also inviting deeper exploration of your ${moonSign} emotional landscape. This is a month to embrace both your ambitious ${sunData?.element || 'Fire'} nature and your need for ${moonData?.keywords[0]?.toLowerCase() || 'emotional security'}.`,
    `This ${currentMonth}, the cosmic energies align beautifully with your ${sunSign}-${moonSign} combination. Expect opportunities related to ${sunData?.keywords.slice(0, 2).join(' and ')?.toLowerCase() || 'self-expression'}, while Venus in ${venusSign} enhances your relationships and creative endeavors. Mars energizes your ${marsSign} drive, making this an excellent month for taking decisive action on long-held goals.`,
    `${currentMonth} invites your ${sunSign} nature to evolve and expand. The month's astrological weather particularly supports ${sunData?.archetype || 'your authentic self'} expression, while offering chances to develop your ${moonData?.keywords[0]?.toLowerCase() || 'emotional intelligence'}. Balance will be key - honour both your need for ${sunData?.element === 'Fire' ? 'action and adventure' : sunData?.element === 'Earth' ? 'stability and growth' : sunData?.element === 'Air' ? 'connection and ideas' : 'depth and meaning'}.`,
  ]

  const themes = [
    `${sunData?.keywords[0] || 'Transformation'} Through ${moonData?.keywords[0] || 'Intuition'}`,
    `Balancing ${sunData?.element || 'Action'} and ${moonData?.element || 'Reflection'}`,
    `Embracing Your ${sunData?.archetype || 'True Nature'}`,
  ]

  const opportunityLists = [
    [
      `Career advancement through ${sunData?.strengths[0]?.toLowerCase() || 'leadership'}`,
      `Deeper connections with loved ones`,
      `Financial opportunities mid-month`,
      `Creative projects gain momentum`,
    ],
    [
      `New beginnings in ${sunData?.keywords[0]?.toLowerCase() || 'personal'} areas`,
      `Relationship harmony and growth`,
      `Learning and skill development`,
      `Health and wellness breakthroughs`,
    ],
    [
      `Professional recognition for your ${sunData?.strengths[0]?.toLowerCase() || 'efforts'}`,
      `Emotional healing and release`,
      `Unexpected positive changes`,
      `Spiritual or personal insights`,
    ],
  ]

  const challengeLists = [
    [
      `Avoid ${sunData?.challenges[0]?.toLowerCase() || 'overextension'} in week 2`,
      `Manage ${moonData?.shadowSide?.toLowerCase() || 'emotional reactivity'}`,
      `Don't rush major decisions around the 15th`,
    ],
    [
      `Watch for ${sunData?.shadowSide?.toLowerCase() || 'ego conflicts'}`,
      `Balance work and rest carefully`,
      `Communication may be tricky late month`,
    ],
    [
      `Guard against ${moonData?.challenges[0]?.toLowerCase() || 'overwhelm'}`,
      `Patience needed in relationships`,
      `Financial caution around month's end`,
    ],
  ]

  const today = new Date()
  const keyDatesList = [
    [
      { date: `${currentMonth} ${5 + (monthNum % 3)}`, event: 'New Moon - Fresh starts', advice: `Set intentions around ${sunData?.keywords[0]?.toLowerCase() || 'growth'}` },
      { date: `${currentMonth} ${12 + (monthNum % 5)}`, event: 'Venus enters supportive aspect', advice: 'Ideal for relationships and creativity' },
      { date: `${currentMonth} ${19 + (monthNum % 4)}`, event: 'Full Moon - Culmination', advice: 'Release what no longer serves you' },
      { date: `${currentMonth} ${25 + (monthNum % 3)}`, event: 'Mars activation', advice: 'Take bold action on important goals' },
    ],
    [
      { date: `${currentMonth} ${3 + (monthNum % 4)}`, event: 'Mercury clarity returns', advice: 'Good for important communications' },
      { date: `${currentMonth} ${10 + (monthNum % 5)}`, event: 'Jupiter expansion day', advice: `Embrace ${sunData?.keywords[0]?.toLowerCase() || 'opportunities'}` },
      { date: `${currentMonth} ${17 + (monthNum % 4)}`, event: 'Emotional release point', advice: 'Honor your feelings fully' },
      { date: `${currentMonth} ${24 + (monthNum % 4)}`, event: 'Saturn structure day', advice: 'Build lasting foundations' },
    ],
  ]

  const weeksList = [
    [
      { week: 1, title: 'New Beginnings', focus: `Initiate ${sunData?.keywords[0]?.toLowerCase() || 'new projects'} with confidence`, energy: 75 },
      { week: 2, title: 'Building Momentum', focus: `Develop your ${moonData?.keywords[0]?.toLowerCase() || 'emotional connections'}`, energy: 85 },
      { week: 3, title: 'Peak Energy', focus: `Push forward with ${sunData?.strengths[0]?.toLowerCase() || 'determination'}`, energy: 90 },
      { week: 4, title: 'Integration', focus: `Reflect and consolidate your ${sunData?.element?.toLowerCase() || 'fire'} gains`, energy: 70 },
    ],
    [
      { week: 1, title: 'Foundation Setting', focus: `Establish ${sunData?.element?.toLowerCase() || 'strong'} groundwork`, energy: 70 },
      { week: 2, title: 'Expansion Phase', focus: `Grow your ${sunData?.keywords[0]?.toLowerCase() || 'influence'}`, energy: 80 },
      { week: 3, title: 'Manifestation', focus: `Bring ${moonData?.keywords[0]?.toLowerCase() || 'dreams'} into reality`, energy: 85 },
      { week: 4, title: 'Completion', focus: `Celebrate ${sunData?.strengths[0]?.toLowerCase() || 'achievements'}`, energy: 75 },
    ],
  ]

  return {
    overview: overviews[monthNum % 3],
    theme: themes[monthNum % 3],
    opportunities: opportunityLists[monthNum % 3],
    challenges: challengeLists[monthNum % 3],
    keyDates: keyDatesList[monthNum % 2],
    weeks: weeksList[monthNum % 2],
  }
}

export function MonthlyForecast({ chart }: MonthlyForecastProps) {
  const forecast = useMemo(() => generateMonthlyOverview(chart), [chart])
  const currentMonth = new Date().toLocaleString('default', { month: 'long' })
  const currentYear = new Date().getFullYear()
  const sunSign = capitalizeSign(getSign(chart, 'sun'))
  const moonSign = capitalizeSign(getSign(chart, 'moon'))

  return (
    <div className="bg-indigo-950/30 rounded-2xl p-6 mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-fuchsia-400 animate-pulse" />
            <span className="text-fuchsia-400 text-xs font-medium">Monthly Forecast</span>
          </div>
          <h2 className="text-2xl font-bold text-white">{currentMonth} {currentYear}</h2>
          <p className="text-indigo-200/50 text-sm">{sunSign} Sun, {moonSign} Moon</p>
        </div>
        <div className="text-right bg-fuchsia-500/10 rounded-lg p-3">
          <div className="text-fuchsia-400 text-xs font-medium mb-1">Theme</div>
          <div className="text-white font-medium text-sm">{forecast.theme}</div>
        </div>
      </div>

      {/* Overview */}
      <div className="bg-gradient-to-r from-fuchsia-500/10 to-purple-500/10 rounded-xl p-5 mb-6">
        <h3 className="text-fuchsia-300 text-sm font-medium mb-2">Month Overview</h3>
        <p className="text-white leading-relaxed">{forecast.overview}</p>
      </div>

      {/* Week by Week Energy */}
      <div className="bg-indigo-950/40 rounded-xl p-4 mb-6">
        <div className="text-white font-medium mb-4">Week-by-Week Energy</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {forecast.weeks.map((week) => (
            <div key={week.week} className="bg-indigo-950/50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-indigo-300 text-xs font-medium">Week {week.week}</span>
                <span className={`text-xs font-medium ${
                  week.energy >= 85 ? 'text-emerald-400' : week.energy >= 75 ? 'text-indigo-400' : 'text-indigo-300'
                }`}>
                  {week.energy}%
                </span>
              </div>
              <div className="text-white font-medium text-sm mb-1">{week.title}</div>
              <div className="text-indigo-200/60 text-xs">{week.focus}</div>
              {/* Energy bar */}
              <div className="mt-2 h-1.5 bg-indigo-950 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    week.energy >= 85 ? 'bg-emerald-500' : week.energy >= 75 ? 'bg-indigo-500' : 'bg-indigo-400'
                  }`}
                  style={{ width: `${week.energy}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Opportunities & Challenges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-emerald-400 font-medium">Opportunities</span>
          </div>
          <ul className="space-y-2">
            {forecast.opportunities.map((opp, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-white/80">
                <span className="text-emerald-400 mt-1">+</span>
                {opp}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="text-amber-400 font-medium">Be Mindful Of</span>
          </div>
          <ul className="space-y-2">
            {forecast.challenges.map((challenge, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-white/80">
                <span className="text-amber-400 mt-1">!</span>
                {challenge}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Key Dates */}
      <div className="bg-indigo-950/40 rounded-xl p-4">
        <div className="text-white font-medium mb-4">Key Dates This Month</div>
        <div className="space-y-3">
          {forecast.keyDates.map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-indigo-950/50 rounded-lg">
              <div className="w-16 flex-shrink-0">
                <div className="text-fuchsia-400 text-xs font-medium">{item.date.split(' ')[0]}</div>
                <div className="text-white font-bold">{item.date.split(' ')[1]}</div>
              </div>
              <div className="flex-1">
                <div className="text-white font-medium text-sm">{item.event}</div>
                <div className="text-indigo-200/60 text-xs mt-1">{item.advice}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
