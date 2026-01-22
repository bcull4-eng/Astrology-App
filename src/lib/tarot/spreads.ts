/**
 * Tarot Spread Configurations
 *
 * Defines the available reading types and their spread layouts.
 */

import type { SpreadConfig, ReadingType } from '@/types/tarot'

export const SPREADS: Record<ReadingType, SpreadConfig> = {
  daily: {
    id: 'daily',
    name: 'Daily Tarot',
    description: 'Receive guidance for your day ahead with a single card draw.',
    cardCount: 1,
    positions: ['Daily Guidance'],
    icon: '☀️',
  },
  yes_no: {
    id: 'yes_no',
    name: 'Yes/No',
    description: 'Get a clear answer to your yes or no question.',
    cardCount: 1,
    positions: ['Answer'],
    icon: '❓',
  },
  one_card: {
    id: 'one_card',
    name: 'One Card',
    description: 'Draw a single card for focused insight on any topic.',
    cardCount: 1,
    positions: ['Focus'],
    icon: '🎴',
  },
  three_card: {
    id: 'three_card',
    name: 'Three Card',
    description: 'Explore the past, present, and future of your situation.',
    cardCount: 3,
    positions: ['Past', 'Present', 'Future'],
    icon: '🔮',
  },
}

export function getSpread(readingType: ReadingType): SpreadConfig {
  return SPREADS[readingType]
}

export function getAllSpreads(): SpreadConfig[] {
  return Object.values(SPREADS)
}
