'use client'

/**
 * CountdownTimer
 *
 * Expiring offer countdown with flip animation.
 * Timer turns amber under 1 minute, red under 10 seconds.
 */

import { useState, useEffect, useCallback } from 'react'

interface CountdownTimerProps {
  initialMinutes?: number
  onExpire?: () => void
}

export function CountdownTimer({ initialMinutes = 15, onExpire }: CountdownTimerProps) {
  const [totalSeconds, setTotalSeconds] = useState(initialMinutes * 60)
  const [prevSeconds, setPrevSeconds] = useState(totalSeconds)

  // Decrement timer
  useEffect(() => {
    if (totalSeconds <= 0) {
      onExpire?.()
      return
    }

    const interval = setInterval(() => {
      setPrevSeconds(totalSeconds)
      setTotalSeconds((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [totalSeconds, onExpire])

  // Format time
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  // Determine color based on remaining time
  const getColorClass = useCallback(() => {
    if (totalSeconds < 10) return 'text-red-400'
    if (totalSeconds < 60) return 'text-amber-400'
    return 'text-white'
  }, [totalSeconds])

  // Check if digit changed for animation
  const shouldAnimate = prevSeconds !== totalSeconds

  return (
    <div className="flex items-center justify-center gap-1">
      {/* Minutes */}
      <div className={`flex ${getColorClass()}`}>
        <DigitDisplay
          value={Math.floor(minutes / 10)}
          animate={shouldAnimate && Math.floor(prevSeconds / 600) !== Math.floor(totalSeconds / 600)}
        />
        <DigitDisplay
          value={minutes % 10}
          animate={shouldAnimate && Math.floor(prevSeconds / 60) % 10 !== Math.floor(totalSeconds / 60) % 10}
        />
      </div>

      {/* Colon */}
      <span className={`text-2xl font-bold ${getColorClass()} ${totalSeconds <= 60 ? 'animate-pulse' : ''}`}>
        :
      </span>

      {/* Seconds */}
      <div className={`flex ${getColorClass()}`}>
        <DigitDisplay
          value={Math.floor(seconds / 10)}
          animate={shouldAnimate && Math.floor(prevSeconds % 60 / 10) !== Math.floor(seconds / 10)}
        />
        <DigitDisplay
          value={seconds % 10}
          animate={shouldAnimate}
        />
      </div>
    </div>
  )
}

interface DigitDisplayProps {
  value: number
  animate: boolean
}

function DigitDisplay({ value, animate }: DigitDisplayProps) {
  return (
    <div className="relative w-8 h-10 overflow-hidden">
      <div
        className={`
          absolute inset-0 flex items-center justify-center
          text-2xl font-bold tabular-nums
          ${animate ? 'animate-flip-in' : ''}
        `}
        style={{
          transformOrigin: 'center bottom',
          backfaceVisibility: 'hidden',
        }}
      >
        {value}
      </div>
    </div>
  )
}
