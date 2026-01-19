'use client'

/**
 * AI Astrologist State Store
 *
 * Manages chat state for the AI astrologist feature including
 * character selection and conversation history.
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CharacterId, AstrologistMessage, AstrologistState } from '@/types'

const initialConversations: Record<CharacterId, AstrologistMessage[]> = {
  celeste: [],
  nova: [],
  orion: [],
}

export const useAstrologistStore = create<AstrologistState>()(
  persist(
    (set, get) => ({
      selectedCharacter: null,
      conversations: initialConversations,
      isLoading: false,
      freeMessagesUsed: 0,

      selectCharacter: (characterId) => set({ selectedCharacter: characterId }),

      incrementFreeMessages: () => set({ freeMessagesUsed: get().freeMessagesUsed + 1 }),

      getFreeMessagesUsed: () => get().freeMessagesUsed,

      addMessage: (characterId, message) =>
        set((state) => ({
          conversations: {
            ...state.conversations,
            [characterId]: [
              ...state.conversations[characterId],
              {
                ...message,
                id: crypto.randomUUID(),
                createdAt: new Date(),
              },
            ],
          },
        })),

      updateLastMessage: (characterId, content) =>
        set((state) => {
          const messages = state.conversations[characterId]
          if (messages.length === 0) return state

          const updatedMessages = [...messages]
          updatedMessages[updatedMessages.length - 1] = {
            ...updatedMessages[updatedMessages.length - 1],
            content,
          }

          return {
            conversations: {
              ...state.conversations,
              [characterId]: updatedMessages,
            },
          }
        }),

      clearConversation: (characterId) =>
        set((state) => ({
          conversations: {
            ...state.conversations,
            [characterId]: [],
          },
        })),

      setIsLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'astrologist-storage',
      partialize: (state) => ({
        selectedCharacter: state.selectedCharacter,
        conversations: state.conversations,
        freeMessagesUsed: state.freeMessagesUsed,
      }),
    }
  )
)
