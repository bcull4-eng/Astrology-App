/**
 * Report Definitions
 *
 * Defines the available reports users can purchase
 */

import type { ReportDefinition, ReportSlug } from '@/types'

export const reports: Record<ReportSlug, ReportDefinition> = {
  'personality-deep-dive': {
    slug: 'personality-deep-dive',
    title: 'Personality Deep Dive',
    subtitle: 'Understand yourself at your core',
    description:
      'A comprehensive 4,000+ word exploration of your unique personality based on your complete birth chart. Discover your core motivations, emotional patterns, communication style, relationship needs, and life purpose.',
    price: 29,
    wordCount: '4,000-5,000 words',
    deliveryTime: 'Instant',
    icon: '🪞',
    gradient: 'from-violet-500 to-purple-600',
    features: [
      'Complete Sun, Moon & Rising analysis',
      'Your emotional landscape & inner needs',
      'Communication style & mental patterns',
      'Love language & relationship approach',
      'Career strengths & working style',
      'Life purpose & soul mission',
      'Shadow work & growth areas',
      'Personalized affirmations',
    ],
    sampleSections: [
      'The Essence of You (Sun Sign Deep Dive)',
      'Your Inner World (Moon Sign Analysis)',
      'How Others See You (Rising Sign)',
      'Mind & Communication (Mercury)',
      'Love & Values (Venus)',
      'Drive & Ambition (Mars)',
      'Growth & Opportunity (Jupiter)',
      'Challenges & Mastery (Saturn)',
      'Your Life Purpose (North Node)',
      'Healing Journey (Chiron)',
    ],
  },
  'relationship-compatibility': {
    slug: 'relationship-compatibility',
    title: 'Relationship Compatibility',
    subtitle: 'Understand your cosmic connection',
    description:
      'An in-depth 4,000+ word synastry analysis exploring the dynamics between you and your partner. Discover your strengths as a couple, potential challenges, and how to nurture your connection.',
    price: 39,
    wordCount: '4,000-5,000 words',
    deliveryTime: 'Instant',
    icon: '💞',
    gradient: 'from-rose-500 to-pink-600',
    requiresPartner: true,
    features: [
      'Complete synastry chart comparison',
      'Emotional compatibility analysis',
      'Communication dynamics',
      'Physical & romantic chemistry',
      'Long-term relationship potential',
      'Areas of natural harmony',
      'Growth opportunities together',
      'Practical relationship advice',
    ],
    sampleSections: [
      'Your Connection at a Glance',
      'Emotional Bond (Moon Connections)',
      'Communication Styles (Mercury Aspects)',
      'Romantic Chemistry (Venus Interactions)',
      'Physical Attraction (Mars Dynamics)',
      'Growth Together (Jupiter Aspects)',
      'Commitment & Stability (Saturn)',
      'Karmic Connections',
      'Challenges & How to Navigate Them',
      'Your Relationship Superpower',
    ],
  },
  'year-ahead-forecast': {
    slug: 'year-ahead-forecast',
    title: 'Year Ahead Forecast',
    subtitle: 'Navigate your next 12 months',
    description:
      'A comprehensive 4,500+ word forecast covering the major astrological influences affecting you over the next year. Get month-by-month insights, key dates, and practical guidance.',
    price: 35,
    wordCount: '4,500-5,500 words',
    deliveryTime: 'Instant',
    icon: '🔮',
    gradient: 'from-indigo-500 to-blue-600',
    features: [
      'Month-by-month breakdown',
      'Major transit influences',
      'Career & financial outlook',
      'Relationship forecasts',
      'Health & wellness windows',
      'Key dates to watch',
      'Best times for major decisions',
      'Personal growth opportunities',
    ],
    sampleSections: [
      'Your Year at a Glance',
      'Major Themes for the Year',
      'Career & Professional Life',
      'Love & Relationships',
      'Health & Wellness',
      'Personal Growth & Spirituality',
      'Month-by-Month Breakdown',
      'Key Dates & Power Days',
      'Eclipses & Their Impact',
      'Closing Thoughts & Guidance',
    ],
  },
}

export const reportsList = Object.values(reports)

export function getReportBySlug(slug: string): ReportDefinition | undefined {
  return reports[slug as ReportSlug]
}
