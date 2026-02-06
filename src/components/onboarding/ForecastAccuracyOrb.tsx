'use client'

/**
 * ForecastAccuracyOrb
 *
 * Animated gradient sphere showing forecast accuracy percentage.
 * The orb fills up with a gradient animation, floating particles,
 * and the percentage counts up.
 */

import { useState, useEffect, useRef } from 'react'

interface ForecastAccuracyOrbProps {
  percentage: number
  onComplete?: () => void
}

export function ForecastAccuracyOrb({ percentage, onComplete }: ForecastAccuracyOrbProps) {
  const [displayedPercent, setDisplayedPercent] = useState(0)
  const [fillOffset, setFillOffset] = useState(100)
  const hasCompletedRef = useRef(false)

  // Animate count up
  useEffect(() => {
    const duration = 1500
    const steps = 60
    const stepDuration = duration / steps
    const increment = percentage / steps

    let current = 0
    const interval = setInterval(() => {
      current += increment
      if (current >= percentage) {
        setDisplayedPercent(percentage)
        clearInterval(interval)

        // Fire onComplete callback
        if (!hasCompletedRef.current && onComplete) {
          hasCompletedRef.current = true
          setTimeout(onComplete, 500)
        }
      } else {
        setDisplayedPercent(Math.floor(current))
      }
    }, stepDuration)

    return () => clearInterval(interval)
  }, [percentage, onComplete])

  // Animate fill
  useEffect(() => {
    // Target offset: 100% - percentage = how much to translate down
    const targetOffset = 100 - percentage
    const timer = setTimeout(() => {
      setFillOffset(targetOffset)
    }, 100)
    return () => clearTimeout(timer)
  }, [percentage])

  // Determine glow intensity based on percentage
  const glowIntensity = percentage / 100
  const glowOpacity = 0.2 + glowIntensity * 0.4

  return (
    <div className="relative">
      {/* Outer glow */}
      <div
        className="absolute inset-0 rounded-full blur-xl transition-opacity duration-1000"
        style={{
          background: `radial-gradient(circle, rgba(99, 102, 241, ${glowOpacity}) 0%, transparent 70%)`,
          transform: 'scale(1.3)',
        }}
      />

      {/* Orb container */}
      <div className="relative w-48 h-48 rounded-full overflow-hidden border-2 border-indigo-500/30 bg-[#1a1a2e]">
        {/* Fill gradient */}
        <div
          className="absolute inset-0 transition-transform duration-[1.5s] ease-out"
          style={{
            transform: `translateY(${fillOffset}%)`,
            background: 'linear-gradient(180deg, #818cf8 0%, #6366f1 30%, #4f46e5 60%, #3730a3 100%)',
          }}
        />

        {/* Wave effect on top of fill */}
        <div
          className="absolute inset-x-0 h-8 transition-all duration-[1.5s] ease-out"
          style={{
            top: `${fillOffset}%`,
            transform: 'translateY(-50%)',
            background: 'linear-gradient(180deg, transparent 0%, rgba(129, 140, 248, 0.5) 50%, transparent 100%)',
            filter: 'blur(4px)',
          }}
        />

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-float"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                animationDelay: `${i * 0.5}s`,
                opacity: 0.3 + Math.random() * 0.4,
              }}
            />
          ))}
        </div>

        {/* Percentage text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl font-bold text-white tabular-nums drop-shadow-lg">
            {displayedPercent}%
          </span>
        </div>
      </div>

      {/* Label */}
      <p className="text-center text-white/60 mt-4 text-sm">
        Forecast Accuracy
      </p>
    </div>
  )
}
