'use client'

/**
 * PalmScanAnimation
 *
 * 3-phase scanning animation overlay for palm reading.
 * Phase 1: Scanning fingers (0-3s)
 * Phase 2: Identifying lines (3-6s)
 * Phase 3: Generating results (6-8s)
 */

import { useState, useEffect } from 'react'

interface PalmScanAnimationProps {
  palmImage: string
  onComplete: () => void
}

type ScanPhase = 1 | 2 | 3

const PHASES: Record<ScanPhase, { text: string; duration: number }> = {
  1: { text: 'Scanning your fingers...', duration: 3000 },
  2: { text: 'Identifying lines, mounts and plains...', duration: 3000 },
  3: { text: 'Generating your palm reading result...', duration: 2000 },
}

const FINGER_DOTS = [
  { x: 25, y: 15, delay: 0 },    // Thumb
  { x: 35, y: 5, delay: 200 },   // Index
  { x: 50, y: 2, delay: 400 },   // Middle
  { x: 65, y: 5, delay: 600 },   // Ring
  { x: 78, y: 12, delay: 800 },  // Pinky
]

const PALM_LINES = [
  { path: 'M 25 55 Q 45 45 70 50', color: '#14b8a6', label: 'Life', delay: 0 },      // Life line (teal)
  { path: 'M 20 35 Q 50 25 80 35', color: '#f472b6', label: 'Heart', delay: 400 },   // Heart line (pink)
  { path: 'M 25 45 Q 50 40 70 45', color: '#fbbf24', label: 'Head', delay: 800 },    // Head line (yellow)
  { path: 'M 50 65 Q 50 45 50 30', color: '#a855f7', label: 'Fate', delay: 1200 },   // Fate line (purple)
]

const LABELS = [
  { x: 75, y: 25, text: 'Marriage', delay: 0 },
  { x: 80, y: 40, text: 'Children', delay: 200 },
  { x: 30, y: 60, text: 'Big Change', delay: 400 },
  { x: 70, y: 55, text: 'Money', delay: 600 },
]

export function PalmScanAnimation({ palmImage, onComplete }: PalmScanAnimationProps) {
  const [phase, setPhase] = useState<ScanPhase>(1)
  const [progress, setProgress] = useState(0)
  const [showFlash, setShowFlash] = useState(false)

  // Progress animation
  useEffect(() => {
    const startTime = Date.now()
    const totalDuration = 8000

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min((elapsed / totalDuration) * 100, 100)
      setProgress(newProgress)

      // Update phase based on time
      if (elapsed < 3000) {
        setPhase(1)
      } else if (elapsed < 6000) {
        setPhase(2)
      } else {
        setPhase(3)
      }

      // Complete
      if (elapsed >= totalDuration) {
        clearInterval(interval)
        setShowFlash(true)
        setTimeout(onComplete, 300)
      }
    }, 50)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div className="relative w-full max-w-sm mx-auto">
      {/* Flash overlay */}
      {showFlash && (
        <div className="absolute inset-0 bg-white z-50 animate-screen-flash rounded-2xl" />
      )}

      {/* Palm image with overlay */}
      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
        {/* Base palm image */}
        <img
          src={palmImage}
          alt="Palm"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Scan line (Phase 1) */}
        {phase >= 1 && (
          <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan-line blur-sm" />
        )}

        {/* Finger dots (Phase 1) */}
        {phase >= 1 && FINGER_DOTS.map((dot, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-cyan-400 rounded-full animate-pop-in shadow-lg shadow-cyan-400/50"
            style={{
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              transform: 'translate(-50%, -50%)',
              animationDelay: `${dot.delay}ms`,
            }}
          />
        ))}

        {/* Palm lines (Phase 2) */}
        {phase >= 2 && (
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {PALM_LINES.map((line, i) => (
              <path
                key={i}
                d={line.path}
                fill="none"
                stroke={line.color}
                strokeWidth="2"
                strokeLinecap="round"
                className="animate-draw-line"
                style={{
                  '--line-length': '200',
                  animationDelay: `${line.delay}ms`,
                } as React.CSSProperties}
              />
            ))}
          </svg>
        )}

        {/* Labels (Phase 3) */}
        {phase >= 3 && LABELS.map((label, i) => (
          <div
            key={i}
            className="absolute animate-pop-in"
            style={{
              left: `${label.x}%`,
              top: `${label.y}%`,
              transform: 'translate(-50%, -50%)',
              animationDelay: `${label.delay}ms`,
            }}
          >
            <span className="text-xs text-white bg-indigo-500/80 px-2 py-1 rounded-full whitespace-nowrap">
              {label.text}
            </span>
          </div>
        ))}

        {/* Glow effect (Phase 3) */}
        {phase === 3 && (
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/20 to-transparent animate-pulse" />
        )}
      </div>

      {/* Progress bar */}
      <div className="mt-4">
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-center text-white/60 text-sm mt-2">
          {PHASES[phase].text}
        </p>
      </div>
    </div>
  )
}
