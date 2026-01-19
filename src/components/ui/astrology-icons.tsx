/**
 * Astrology-themed SVG Icons
 *
 * Custom icons for reports and other astrology features
 * Designed to match the cosmic aesthetic.
 */

import React from 'react'

interface IconProps {
  className?: string
  size?: number
}

/**
 * Sun symbol icon - for Personality Deep Dive report
 */
export function SunSymbolIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      {/* Rays */}
      <line x1="12" y1="2" x2="12" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="19" x2="12" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="2" y1="12" x2="5" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="19" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="4.93" y1="19.07" x2="6.34" y2="17.66" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="17.66" y1="6.34" x2="19.07" y2="4.93" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

/**
 * Venus symbol icon - for Relationship Compatibility report
 */
export function VenusSymbolIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
      <line x1="12" y1="15" x2="12" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="8" y1="19" x2="16" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

/**
 * Saturn symbol icon - for Year Ahead Forecast report
 */
export function SaturnSymbolIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="6" y1="2" x2="6" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="3" y1="5" x2="9" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M6 10C6 10 6 14 10 14C14 14 16 12 16 16C16 20 12 22 8 22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

/**
 * Moon phases icon - generic astrology icon
 */
export function MoonPhasesIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * Constellation icon
 */
export function ConstellationIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="5" cy="5" r="2" fill="currentColor" />
      <circle cx="19" cy="5" r="2" fill="currentColor" />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" />
      <circle cx="5" cy="19" r="2" fill="currentColor" />
      <circle cx="19" cy="19" r="2" fill="currentColor" />
      <line x1="5" y1="5" x2="12" y2="12" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <line x1="19" y1="5" x2="12" y2="12" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <line x1="5" y1="19" x2="12" y2="12" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <line x1="19" y1="19" x2="12" y2="12" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    </svg>
  )
}

/**
 * Birth chart wheel icon
 */
export function ChartWheelIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <line x1="12" y1="2" x2="12" y2="6" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <line x1="12" y1="18" x2="12" y2="22" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <line x1="2" y1="12" x2="6" y2="12" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <line x1="18" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    </svg>
  )
}

/**
 * Star icon
 */
export function StarIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2L14.09 8.26L21 9.27L16 13.97L17.18 20.73L12 17.77L6.82 20.73L8 13.97L3 9.27L9.91 8.26L12 2Z" />
    </svg>
  )
}

/**
 * Zodiac wheel icon
 */
export function ZodiacWheelIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      {/* Zodiac division lines */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => {
        const rad = (angle * Math.PI) / 180
        const x1 = 12 + 7 * Math.cos(rad)
        const y1 = 12 + 7 * Math.sin(rad)
        const x2 = 12 + 10 * Math.cos(rad)
        const y2 = 12 + 10 * Math.sin(rad)
        return (
          <line
            key={angle}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.3"
          />
        )
      })}
    </svg>
  )
}

/**
 * Report icon component that renders the appropriate icon for each report type
 */
export function ReportIcon({ type, className = '', size = 24 }: { type: string } & IconProps) {
  switch (type) {
    case 'personality-deep-dive':
      return <SunSymbolIcon className={className} size={size} />
    case 'relationship-compatibility':
      return <VenusSymbolIcon className={className} size={size} />
    case 'year-ahead-forecast':
      return <SaturnSymbolIcon className={className} size={size} />
    default:
      return <StarIcon className={className} size={size} />
  }
}
