'use client'

/**
 * Tarot State Store
 *
 * Manages state for the tarot reading feature including
 * reading type selection, card draws, and interpretations.
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { TarotState, ReadingType, DrawnCard } from '@/types/tarot'

function getTodayDateString(): string {
  return new Date().toISOString().split('T')[0]
}

export const useTarotStore = create<TarotState>()(
  persist(
    (set, get) => ({
      // Reading flow
      selectedReadingType: null,
      question: '',
      drawnCards: [],
      revealedCardIds: [],
      interpretation: '',
      isInterpreting: false,

      // Daily limit
      hasUsedDailyReading: false,
      lastReadingDate: null,

      // Actions
      setReadingType: (type: ReadingType | null) =>
        set({ selectedReadingType: type }),

      setQuestion: (question: string) =>
        set({ question }),

      drawCard: (cardId: string, position: string, isReversed: boolean) =>
        set((state) => ({
          drawnCards: [
            ...state.drawnCards,
            { cardId, position, isReversed },
          ],
        })),

      revealCard: (cardId: string) =>
        set((state) => ({
          revealedCardIds: [...state.revealedCardIds, cardId],
        })),

      setInterpretation: (interpretation: string) =>
        set({ interpretation }),

      appendInterpretation: (chunk: string) =>
        set((state) => ({
          interpretation: state.interpretation + chunk,
        })),

      setIsInterpreting: (isInterpreting: boolean) =>
        set({ isInterpreting }),

      setDailyReadingUsed: () =>
        set({
          hasUsedDailyReading: true,
          lastReadingDate: getTodayDateString(),
        }),

      checkDailyLimit: () => {
        const { lastReadingDate, hasUsedDailyReading } = get()
        const today = getTodayDateString()

        // If last reading was on a different day, they haven't used it today
        if (lastReadingDate !== today) {
          return false
        }

        return hasUsedDailyReading
      },

      resetDailyLimitIfNewDay: () => {
        const { lastReadingDate } = get()
        const today = getTodayDateString()

        if (lastReadingDate !== today) {
          set({ hasUsedDailyReading: false, lastReadingDate: null })
        }
      },

      resetReading: () =>
        set({
          selectedReadingType: null,
          question: '',
          drawnCards: [],
          revealedCardIds: [],
          interpretation: '',
          isInterpreting: false,
        }),
    }),
    {
      name: 'tarot-storage',
      partialize: (state) => ({
        hasUsedDailyReading: state.hasUsedDailyReading,
        lastReadingDate: state.lastReadingDate,
      }),
    }
  )
)
