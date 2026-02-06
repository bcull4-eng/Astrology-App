'use client'

/**
 * HandOutlineSVG
 *
 * SVG hand outline for camera overlay during palm capture.
 * Pulses gently to guide user hand placement.
 */

interface HandOutlineSVGProps {
  className?: string
}

export function HandOutlineSVG({ className = '' }: HandOutlineSVGProps) {
  return (
    <svg
      viewBox="0 0 200 280"
      className={`animate-gentle-pulse ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Palm outline */}
      <path
        d="M100 270
           C60 270 30 240 30 200
           L30 150
           C30 140 35 135 45 135
           L45 100
           C45 85 55 80 65 85
           L65 130
           L65 60
           C65 45 75 40 85 45
           L85 130
           L85 40
           C85 25 95 20 105 25
           L105 130
           L105 45
           C105 30 115 25 125 30
           L125 130
           L125 80
           C125 65 135 60 145 65
           L145 140
           C145 140 170 145 170 180
           L170 200
           C170 240 140 270 100 270
           Z"
        strokeDasharray="4 4"
        opacity="0.8"
      />

      {/* Thumb */}
      <path
        d="M30 150
           C20 145 15 130 20 115
           C25 100 40 95 50 100"
        strokeDasharray="4 4"
        opacity="0.6"
      />
    </svg>
  )
}
