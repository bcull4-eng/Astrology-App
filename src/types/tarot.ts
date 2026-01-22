/**
 * Tarot Types
 *
 * Type definitions for the tarot reading feature.
 */

export type TarotSuit = 'major' | 'wands' | 'cups' | 'swords' | 'pentacles'

export type ReadingType = 'daily' | 'yes_no' | 'one_card' | 'three_card'

export interface TarotCard {
  id: string
  name: string
  suit: TarotSuit
  number: number // 0-21 for major, 1-14 for minor (Ace=1, Page=11, Knight=12, Queen=13, King=14)
  keywords: string[]
  uprightMeaning: string
  reversedMeaning: string
  image: string // path to card image
}

export interface DrawnCard {
  cardId: string
  position: string // e.g., "Past", "Present", "Future", "Daily Guidance"
  isReversed: boolean
}

export interface SpreadConfig {
  id: ReadingType
  name: string
  description: string
  cardCount: number
  positions: string[]
  icon: string // emoji or icon identifier
}

export interface TarotReading {
  id: string
  userId: string
  readingType: ReadingType
  question?: string
  cards: DrawnCard[]
  interpretation: string
  createdAt: Date
}

export interface CompletedReading {
  readingType: ReadingType
  cards: DrawnCard[]
  interpretation: string
  question?: string
}

export interface TarotState {
  // Reading flow
  selectedReadingType: ReadingType | null
  question: string
  drawnCards: DrawnCard[]
  revealedCardIds: string[]
  interpretation: string
  isInterpreting: boolean

  // Daily limit - tracks which reading types have been used today
  usedReadingTypes: ReadingType[]
  completedReadings: CompletedReading[]
  lastReadingDate: string | null

  // Actions
  setReadingType: (type: ReadingType | null) => void
  setQuestion: (question: string) => void
  drawCard: (cardId: string, position: string, isReversed: boolean) => void
  revealCard: (cardId: string) => void
  setInterpretation: (interpretation: string) => void
  appendInterpretation: (chunk: string) => void
  setIsInterpreting: (isInterpreting: boolean) => void
  saveCompletedReading: (reading: CompletedReading) => void
  getCompletedReading: (type: ReadingType) => CompletedReading | undefined
  hasUsedReadingType: (type: ReadingType) => boolean
  resetDailyLimitIfNewDay: () => void
  resetReading: () => void
}
