'use client'

/**
 * ResultsRevealStep (Step 19)
 *
 * Full results reveal with palm scores, compatibility, and chart analysis.
 */

import { useState, useEffect } from 'react'
import { useOnboardingV2Store } from '@/store/onboarding-v2'
import { ChevronRight } from 'lucide-react'

export function ResultsRevealStep() {
  const {
    goToNextStep,
    profileData,
    natalChartData,
    palmReadingData,
    futureGoals,
    relationshipStatus,
  } = useOnboardingV2Store()

  const [activeSection, setActiveSection] = useState(0)

  // Auto-advance through sections for reveal effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (activeSection < 3) {
        setActiveSection((prev) => prev + 1)
      }
    }, 1000)
    return () => clearTimeout(timer)
  }, [activeSection])

  const sections = [
    {
      title: 'Your Cosmic Profile',
      content: (
        <div className="space-y-4">
          {profileData && (
            <>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl">
                  {getZodiacSymbol(profileData.sign)}
                </div>
                <div>
                  <p className="text-white font-semibold text-xl">{profileData.sign}</p>
                  <p className="text-white/60 capitalize">
                    {profileData.element} • {profileData.modality}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-4">
                {natalChartData && (
                  <>
                    <div className="bg-white/5 rounded-xl p-3 text-center">
                      <span className="text-xl">☉</span>
                      <p className="text-xs text-white/40 mt-1">Sun</p>
                      <p className="text-white text-sm font-medium">{natalChartData.sunSign}</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 text-center">
                      <span className="text-xl">☽</span>
                      <p className="text-xs text-white/40 mt-1">Moon</p>
                      <p className="text-white text-sm font-medium">{natalChartData.moonSign}</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 text-center">
                      <span className="text-xl">↑</span>
                      <p className="text-xs text-white/40 mt-1">Rising</p>
                      <p className="text-white text-sm font-medium">{natalChartData.ascendant}</p>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      ),
    },
    {
      title: 'Palm Reading Analysis',
      content: (
        <div className="space-y-4">
          {palmReadingData ? (
            <>
              <PalmLineDetail
                label="Life Line"
                score={palmReadingData.lifeLineScore}
                color="from-teal-400 to-emerald-500"
                description={getLifeLineDescription(palmReadingData.lifeLineScore)}
              />
              <PalmLineDetail
                label="Heart Line"
                score={palmReadingData.heartLineScore}
                color="from-pink-400 to-rose-500"
                description={getHeartLineDescription(palmReadingData.heartLineScore)}
              />
              <PalmLineDetail
                label="Head Line"
                score={palmReadingData.headLineScore}
                color="from-yellow-400 to-amber-500"
                description={getHeadLineDescription(palmReadingData.headLineScore)}
              />
              <PalmLineDetail
                label="Fate Line"
                score={palmReadingData.fateLineScore}
                color="from-purple-400 to-indigo-500"
                description={getFateLineDescription(palmReadingData.fateLineScore)}
              />

              <div className="mt-5 space-y-3">
                <div className="p-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl border border-indigo-500/20">
                  <p className="text-indigo-300 text-xs font-medium uppercase tracking-wider mb-2">🔮 Key Prediction</p>
                  <p className="text-white">{palmReadingData.predictions.bigChange}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-white/5 rounded-xl">
                    <p className="text-pink-400 text-xs font-medium mb-1">❤️ Love & Marriage</p>
                    <p className="text-white/70 text-sm">{palmReadingData.predictions.marriage}</p>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl">
                    <p className="text-emerald-400 text-xs font-medium mb-1">💰 Wealth & Fortune</p>
                    <p className="text-white/70 text-sm">{palmReadingData.predictions.money}</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p className="text-white/60">Palm reading data not available</p>
          )}
        </div>
      ),
    },
    {
      title: 'Compatibility Matches',
      content: (
        <div className="space-y-3">
          {profileData?.compatibleSigns.map((sign, i) => (
            <div
              key={sign}
              className="flex items-center justify-between p-3 bg-white/5 rounded-xl"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{getZodiacSymbol(sign)}</span>
                <span className="text-white font-medium">{sign}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-20 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-pink-400 to-red-500 rounded-full"
                    style={{ width: `${95 - i * 8}%` }}
                  />
                </div>
                <span className="text-white text-sm">{95 - i * 8}%</span>
              </div>
            </div>
          ))}

          {relationshipStatus && (
            <p className="text-white/40 text-sm mt-3">
              Based on your status: {relationshipStatus.replace('_', ' ')}
            </p>
          )}
        </div>
      ),
    },
    {
      title: 'Focus Areas',
      content: (
        <div className="space-y-3">
          {futureGoals.map((goal) => (
            <div
              key={goal}
              className="p-4 bg-white/5 rounded-xl"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xl">{getGoalEmoji(goal)}</span>
                <span className="text-white font-medium capitalize">{goal.replace('_', ' ')}</span>
              </div>
              <p className="text-white/60 text-sm">
                {getGoalInsight(goal, profileData?.sign || 'Aries')}
              </p>
            </div>
          ))}
        </div>
      ),
    },
  ]

  return (
    <div className="flex-1 flex flex-col px-6 py-8">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-serif font-semibold text-white mb-2">
          Your Cosmic Report
        </h1>
        <p className="text-white/60">
          Personalized insights based on your unique data
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-4 flex-1 overflow-auto">
        {sections.map((section, index) => (
          <div
            key={index}
            className={`
              transition-all duration-500
              ${index <= activeSection ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
            style={{ transitionDelay: `${index * 200}ms` }}
          >
            <div className="border border-white/10 rounded-2xl p-4 bg-white/5">
              <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center text-xs text-indigo-400">
                  {index + 1}
                </span>
                {section.title}
              </h2>
              {section.content}
            </div>
          </div>
        ))}
      </div>

      {/* Continue button */}
      {activeSection >= 3 && (
        <button
          onClick={goToNextStep}
          className="mt-6 w-full py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90 transition-all flex items-center justify-center gap-2 animate-fade-in-up"
        >
          Continue
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  )
}

// Palm line detail component with description
function PalmLineDetail({ label, score, color, description }: { label: string; score: number; color: string; description: string }) {
  return (
    <div className="p-3 bg-white/5 rounded-xl">
      <div className="flex justify-between text-sm mb-2">
        <span className="text-white font-medium">{label}</span>
        <span className="text-white/80">{score}%</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-2">
        <div
          className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-1000`}
          style={{ width: `${score}%` }}
        />
      </div>
      <p className="text-white/60 text-sm">{description}</p>
    </div>
  )
}

// Palm line description helpers
function getLifeLineDescription(score: number): string {
  if (score >= 85) return "Your life line indicates exceptional vitality and a strong life force. You possess remarkable resilience and are likely to enjoy a long, energetic life with the ability to overcome obstacles."
  if (score >= 70) return "A well-defined life line suggests good overall health and stamina. You have a balanced approach to life and can handle challenges with steady determination."
  if (score >= 55) return "Your life line shows moderate energy levels. Focus on maintaining consistent self-care routines to optimize your vitality and wellbeing."
  return "Your life line suggests you may benefit from focusing on energy management. Small lifestyle adjustments can significantly boost your vitality."
}

function getHeartLineDescription(score: number): string {
  if (score >= 85) return "Your heart line reveals deep emotional intelligence and a capacity for profound love. You form meaningful connections and express affection freely and authentically."
  if (score >= 70) return "A strong heart line indicates healthy emotional expression and satisfying relationships. You balance head and heart well in matters of love."
  if (score >= 55) return "Your heart line suggests you approach love thoughtfully. You may benefit from allowing yourself to be more vulnerable in romantic connections."
  return "Your heart line indicates potential for emotional growth. Opening up gradually to trusted people will strengthen your capacity for deep connection."
}

function getHeadLineDescription(score: number): string {
  if (score >= 85) return "Your head line reveals exceptional mental clarity and intellectual prowess. You have a sharp, analytical mind with excellent problem-solving abilities and creative thinking."
  if (score >= 70) return "A well-formed head line indicates strong mental focus and good decision-making abilities. You think clearly under pressure and learn quickly."
  if (score >= 55) return "Your head line shows balanced thinking patterns. You may benefit from practices that enhance focus, like meditation or structured planning."
  return "Your head line suggests you think in unique, non-linear ways. Embrace your intuitive approach while developing structured thinking when needed."
}

function getFateLineDescription(score: number): string {
  if (score >= 85) return "Your fate line indicates a strong sense of purpose and destiny. You're naturally aligned with your life path and tend to attract opportunities that advance your goals."
  if (score >= 70) return "A clear fate line suggests you have good direction in life. Your career and life choices tend to unfold in meaningful ways with steady progress."
  if (score >= 55) return "Your fate line shows you're still discovering your true path. This flexibility allows you to pivot and find the direction that truly resonates."
  return "Your fate line suggests you create your own destiny rather than following a predetermined path. You have the freedom to shape your future as you choose."
}

// Helper functions
function getZodiacSymbol(sign: string): string {
  const symbols: Record<string, string> = {
    Aries: '♈', Taurus: '♉', Gemini: '♊', Cancer: '♋',
    Leo: '♌', Virgo: '♍', Libra: '♎', Scorpio: '♏',
    Sagittarius: '♐', Capricorn: '♑', Aquarius: '♒', Pisces: '♓',
  }
  return symbols[sign] || '★'
}

function getGoalEmoji(goal: string): string {
  const emojis: Record<string, string> = {
    love: '❤️', career: '💼', wealth: '💰', health: '🌿',
    family: '👨‍👩‍👧', travel: '✈️', spirituality: '🧘', creativity: '🎨',
  }
  return emojis[goal] || '✨'
}

function getGoalInsight(goal: string, sign: string): string {
  const insights: Record<string, string> = {
    love: `As a ${sign}, your Venus placement suggests a passionate year ahead for romance. Key dates: March and September.`,
    career: `Your Mars energy indicates major career advancement opportunities. Network actively in Q2 for best results.`,
    wealth: `Jupiter transits your financial sector mid-year. Consider investments between May and August.`,
    health: `Focus on cardiovascular health and stress management. Your moon sign benefits from water-based activities.`,
    family: `Family bonds strengthen significantly. A reunion or celebration is indicated around the holidays.`,
    travel: `Your chart shows favorable travel aspects. Consider destinations to the East for transformative experiences.`,
    spirituality: `Neptune enhances your intuition this year. Meditation and dream journaling will be especially powerful.`,
    creativity: `Venus blesses your creative endeavors. Share your work publicly - recognition is likely.`,
  }
  return insights[goal] || 'Exciting developments ahead in this area of your life.'
}
