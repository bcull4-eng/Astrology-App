'use client'

/**
 * ChartMappingStep (Step 5)
 *
 * Chart mapping animation showing zodiac wheel, checklist animation,
 * and initial natal chart results (Moon/Sun/Ascendant).
 */

import { useState, useEffect } from 'react'
import { Check } from 'lucide-react'
import { useOnboardingV2Store, getFormattedBirthDate, getFormattedBirthTime } from '@/store/onboarding-v2'
import { ZODIAC_DATA } from '@/types/onboarding-v2'
import { AstrologerBubble } from '../AstrologerBubble'

const CHECKLIST_ITEMS = [
  'Your strengths & talents',
  'Your challenges & growth areas',
  'Your life purpose & path',
  'Your emotional patterns',
  'Your relationship style',
]

export function ChartMappingStep() {
  const {
    birthMonth,
    birthDay,
    birthYear,
    birthHour,
    birthMinute,
    birthAmPm,
    birthTimeKnown,
    birthPlace,
    setNatalChartData,
    setProfileData,
    goToNextStep,
  } = useOnboardingV2Store()

  const [isLoading, setIsLoading] = useState(true)
  const [visibleCheckItems, setVisibleCheckItems] = useState(0)
  const [showBubble, setShowBubble] = useState(false)
  const [chartData, setChartData] = useState<{
    sunSign: string
    moonSign: string
    ascendant: string
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Fetch natal chart data
  useEffect(() => {
    const fetchChart = async () => {
      try {
        const birthDate = getFormattedBirthDate(birthMonth, birthDay, birthYear)
        const birthTime = birthTimeKnown
          ? getFormattedBirthTime(birthHour, birthMinute, birthAmPm)
          : '12:00'

        if (!birthDate || !birthPlace.latitude || !birthPlace.longitude) {
          setError('Missing birth data')
          setIsLoading(false)
          return
        }

        const response = await fetch('/api/natal-chart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            birthDate,
            birthTime,
            birthPlace: {
              city: birthPlace.city,
              country: birthPlace.country,
              latitude: birthPlace.latitude,
              longitude: birthPlace.longitude,
              timezone: birthPlace.timezone,
            },
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to calculate chart')
        }

        const data = await response.json()

        // Extract key placements
        const sunSign = data.planets?.sun?.sign || 'Aries'
        const moonSign = data.planets?.moon?.sign || 'Aries'
        const ascendant = data.ascendant?.sign || sunSign

        setChartData({ sunSign, moonSign, ascendant })

        // Store full chart data
        setNatalChartData({
          sunSign,
          moonSign,
          ascendant,
          planets: data.planets || {},
          houses: data.houses || {},
          aspects: data.aspects || [],
        })

        // Set profile data based on sun sign
        const signKey = sunSign.toLowerCase()
        const zodiacInfo = ZODIAC_DATA[signKey]
        if (zodiacInfo) {
          setProfileData({
            sign: sunSign,
            modality: zodiacInfo.modality,
            polarity: zodiacInfo.polarity,
            element: zodiacInfo.element,
            rulingPlanet: zodiacInfo.rulingPlanet,
            compatibleSigns: zodiacInfo.compatible,
          })
        }

        setIsLoading(false)
      } catch {
        setError('Could not calculate chart. Please try again.')
        setIsLoading(false)
      }
    }

    fetchChart()
  }, [birthMonth, birthDay, birthYear, birthHour, birthMinute, birthAmPm, birthTimeKnown, birthPlace, setNatalChartData, setProfileData])

  // Animate checklist items
  useEffect(() => {
    if (isLoading || error) return

    const interval = setInterval(() => {
      setVisibleCheckItems((prev) => {
        if (prev < CHECKLIST_ITEMS.length) {
          return prev + 1
        }
        clearInterval(interval)
        // Show bubble after checklist completes
        setTimeout(() => setShowBubble(true), 500)
        return prev
      })
    }, 400)

    return () => clearInterval(interval)
  }, [isLoading, error])

  const handleContinue = () => {
    goToNextStep()
  }

  if (error) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <p className="text-red-400 text-center mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-white/10 rounded-xl text-white"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
      <h1 className="text-2xl font-serif font-semibold text-white text-center mb-2">
        Mapping Your Chart
      </h1>
      <p className="text-white/60 text-center mb-8">
        Calculating your unique cosmic blueprint
      </p>

      {/* Zodiac wheel animation */}
      <div className="relative w-48 h-48 mb-8">
        <div className={`absolute inset-0 rounded-full border-2 border-indigo-500/30 ${isLoading ? 'animate-spin-slow' : ''}`}>
          {/* Zodiac symbols around wheel */}
          {['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'].map((symbol, i) => {
            const angle = (i * 30 - 90) * (Math.PI / 180)
            const x = 50 + 42 * Math.cos(angle)
            const y = 50 + 42 * Math.sin(angle)
            return (
              <span
                key={i}
                className="absolute text-indigo-400/60 text-sm"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {symbol}
              </span>
            )
          })}
        </div>
        {/* Center glow */}
        <div className="absolute inset-8 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-sm" />
        {!isLoading && chartData && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl">☉</span>
          </div>
        )}
      </div>

      {/* Loading or checklist */}
      {isLoading ? (
        <div className="flex items-center gap-2 text-white/60">
          <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <span>Calculating positions...</span>
        </div>
      ) : (
        <>
          {/* Checklist */}
          <div className="w-full max-w-sm space-y-3 mb-8">
            {CHECKLIST_ITEMS.map((item, index) => (
              <div
                key={index}
                className={`
                  flex items-center gap-3 transition-all duration-400
                  ${index < visibleCheckItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                `}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center">
                  <Check className="w-4 h-4 text-indigo-400" />
                </div>
                <span className="text-white/80">{item}</span>
              </div>
            ))}
          </div>

          {/* Chart results summary */}
          {chartData && visibleCheckItems === CHECKLIST_ITEMS.length && (
            <div className="w-full max-w-sm mb-6 animate-fade-in-up">
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white/5 rounded-xl p-3 text-center">
                  <span className="text-2xl">☉</span>
                  <p className="text-xs text-white/40 mt-1">Sun</p>
                  <p className="text-white font-medium">{chartData.sunSign}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-3 text-center">
                  <span className="text-2xl">☽</span>
                  <p className="text-xs text-white/40 mt-1">Moon</p>
                  <p className="text-white font-medium">{chartData.moonSign}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-3 text-center">
                  <span className="text-2xl">↑</span>
                  <p className="text-xs text-white/40 mt-1">Rising</p>
                  <p className="text-white font-medium">{chartData.ascendant}</p>
                </div>
              </div>
            </div>
          )}

          {/* Astrologer bubble */}
          {showBubble && (
            <div className="w-full max-w-sm mb-6">
              <AstrologerBubble
                message="I see a rare spark in your chart! Your cosmic blueprint reveals something truly special..."
                highlightedText="rare spark"
              />
            </div>
          )}

          {/* Continue button */}
          {visibleCheckItems === CHECKLIST_ITEMS.length && (
            <button
              onClick={handleContinue}
              className="w-full max-w-sm py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90 transition-all animate-fade-in-up"
            >
              Continue
            </button>
          )}
        </>
      )}
    </div>
  )
}
