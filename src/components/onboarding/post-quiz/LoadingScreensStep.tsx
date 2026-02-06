'use client'

/**
 * LoadingScreensStep (Step 16)
 *
 * Animated loading screens with messages:
 * "Accessing planet database...", "Analyzing your cosmic data...", etc.
 */

import { useState, useEffect } from 'react'
import { useOnboardingV2Store } from '@/store/onboarding-v2'

const LOADING_MESSAGES = [
  { text: 'Accessing planet database...', icon: '🪐', duration: 1500 },
  { text: 'Analyzing your birth chart...', icon: '📊', duration: 1500 },
  { text: 'Calculating cosmic alignments...', icon: '✨', duration: 1500 },
  { text: 'Processing palm patterns...', icon: '🖐️', duration: 1500 },
  { text: 'Generating your unique insights...', icon: '🔮', duration: 1500 },
  { text: 'Preparing your personalized report...', icon: '📜', duration: 1000 },
]

export function LoadingScreensStep() {
  const { goToNextStep, email, gender, natalChartData, palmReadingData, futureGoals, relationshipStatus, colorPreference, elementPreference, birthPlace, birthMonth, birthDay, birthYear, birthHour, birthMinute, birthAmPm, birthTimeKnown } = useOnboardingV2Store()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  // Save data to backend
  useEffect(() => {
    const saveOnboardingData = async () => {
      if (!email) return

      try {
        // Prepare the data to save
        const birthDate = birthMonth && birthDay && birthYear
          ? `${birthYear}-${String(birthMonth).padStart(2, '0')}-${String(birthDay).padStart(2, '0')}`
          : null

        let birthTime = null
        if (birthTimeKnown && birthHour && birthMinute !== null && birthAmPm) {
          let hour24 = birthHour
          if (birthAmPm === 'PM' && birthHour !== 12) hour24 += 12
          if (birthAmPm === 'AM' && birthHour === 12) hour24 = 0
          birthTime = `${String(hour24).padStart(2, '0')}:${String(birthMinute).padStart(2, '0')}`
        }

        await fetch('/api/user/onboarding-data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            gender,
            birthDate,
            birthTime,
            birthTimeKnown,
            birthPlace,
            natalChartData,
            relationshipStatus,
            futureGoals,
            colorPreference,
            elementPreference,
            palmReadingData: palmReadingData ? {
              lifeLineScore: palmReadingData.lifeLineScore,
              heartLineScore: palmReadingData.heartLineScore,
              headLineScore: palmReadingData.headLineScore,
              fateLineScore: palmReadingData.fateLineScore,
              predictions: palmReadingData.predictions,
              // Don't send the image data to API - too large
            } : null,
          }),
        })
      } catch (err) {
        console.error('Failed to save onboarding data:', err)
        // Continue anyway - don't block the user
      }
    }

    saveOnboardingData()
  }, [email, gender, natalChartData, palmReadingData, futureGoals, relationshipStatus, colorPreference, elementPreference, birthPlace, birthMonth, birthDay, birthYear, birthHour, birthMinute, birthAmPm, birthTimeKnown])

  // Progress through messages
  useEffect(() => {
    const totalDuration = LOADING_MESSAGES.reduce((sum, m) => sum + m.duration, 0)
    let elapsed = 0

    const interval = setInterval(() => {
      elapsed += 50
      setProgress((elapsed / totalDuration) * 100)

      // Calculate which message to show
      let cumulativeDuration = 0
      for (let i = 0; i < LOADING_MESSAGES.length; i++) {
        cumulativeDuration += LOADING_MESSAGES[i].duration
        if (elapsed < cumulativeDuration) {
          setCurrentIndex(i)
          break
        }
      }

      if (elapsed >= totalDuration) {
        clearInterval(interval)
        goToNextStep()
      }
    }, 50)

    return () => clearInterval(interval)
  }, [goToNextStep])

  const currentMessage = LOADING_MESSAGES[currentIndex]

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
      {/* Animated icon */}
      <div className="relative w-24 h-24 mb-8">
        {/* Rotating ring */}
        <div className="absolute inset-0 rounded-full border-2 border-indigo-500/30 border-t-indigo-500 animate-spin" />

        {/* Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl animate-float">{currentMessage.icon}</span>
        </div>
      </div>

      {/* Message */}
      <p className="text-white text-lg text-center mb-8 h-8">
        {currentMessage.text}
      </p>

      {/* Progress bar */}
      <div className="w-full max-w-sm">
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-center text-white/40 text-sm mt-2">
          {Math.round(progress)}% complete
        </p>
      </div>

      {/* Dots indicator */}
      <div className="flex gap-2 mt-8">
        {LOADING_MESSAGES.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === currentIndex ? 'bg-indigo-500' : i < currentIndex ? 'bg-indigo-500/50' : 'bg-white/20'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
