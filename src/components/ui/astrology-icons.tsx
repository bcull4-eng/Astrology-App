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
 * Pre-calculated line positions to avoid hydration mismatch from floating-point precision differences
 */
const zodiacLines = [
  { x1: 19, y1: 12, x2: 22, y2: 12 },       // 0°
  { x1: 18.06, y1: 15.5, x2: 20.66, y2: 17 },   // 30°
  { x1: 15.5, y1: 18.06, x2: 17, y2: 20.66 },   // 60°
  { x1: 12, y1: 19, x2: 12, y2: 22 },       // 90°
  { x1: 8.5, y1: 18.06, x2: 7, y2: 20.66 },     // 120°
  { x1: 5.94, y1: 15.5, x2: 3.34, y2: 17 },     // 150°
  { x1: 5, y1: 12, x2: 2, y2: 12 },         // 180°
  { x1: 5.94, y1: 8.5, x2: 3.34, y2: 7 },       // 210°
  { x1: 8.5, y1: 5.94, x2: 7, y2: 3.34 },       // 240°
  { x1: 12, y1: 5, x2: 12, y2: 2 },         // 270°
  { x1: 15.5, y1: 5.94, x2: 17, y2: 3.34 },     // 300°
  { x1: 18.06, y1: 8.5, x2: 20.66, y2: 7 },     // 330°
]

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
      {zodiacLines.map((line, i) => (
        <line
          key={i}
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.3"
        />
      ))}
    </svg>
  )
}

/**
 * Jupiter symbol icon - for Financial Potential report
 */
export function JupiterSymbolIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9 4c2 0 4 2 4 4s-2 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="4" y1="8" x2="13" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="17" y1="4" x2="17" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="14" y1="20" x2="20" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

/**
 * Pluto symbol icon - for Past Life & Karma report
 */
export function PlutoSymbolIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="6" r="3" stroke="currentColor" strokeWidth="1.5" />
      <line x1="12" y1="9" x2="12" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="15" x2="12" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 16c0 2.5 4 5 4 5s4-2.5 4-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  )
}

/**
 * Linked hearts icon - for Partner Compatibility report
 */
export function LinkedHeartsIcon({ className = '', size = 24 }: IconProps) {
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
        d="M8.5 7C6.5 7 5 8.5 5 10.5C5 12.5 6.5 14 8.5 14L12 18L15.5 14C17.5 14 19 12.5 19 10.5C19 8.5 17.5 7 15.5 7C14 7 13 8 12 9C11 8 10 7 8.5 7Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * Calendar with moon icon - for Monthly Forecast report
 */
export function CalendarMoonIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="1.5" />
      <path d="M15 16a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" fill="currentColor" />
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
    case 'monthly-forecast':
      return <CalendarMoonIcon className={className} size={size} />
    case 'past-life-karma':
      return <PlutoSymbolIcon className={className} size={size} />
    case 'financial-potential':
      return <JupiterSymbolIcon className={className} size={size} />
    case 'partner-compatibility':
      return <LinkedHeartsIcon className={className} size={size} />
    default:
      return <StarIcon className={className} size={size} />
  }
}
