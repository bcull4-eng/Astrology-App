import { create } from 'zustand'
import type { AIAssistantStore, AIMessage, AIContext } from '@/types/ai-assistant'

export const useAIAssistantStore = create<AIAssistantStore>((set, get) => ({
  // Initial state
  isOpen: false,
  selectedText: undefined,
  context: {
    pageName: 'Astrology App',
    pageDescription: undefined,
    viewingContext: undefined,
  },
  messages: [],
  isLoading: false,

  // Actions
  openAssistant: (selectedText?: string) => {
    set({ isOpen: true, selectedText })
  },

  closeAssistant: () => {
    set({ isOpen: false, selectedText: undefined })
  },

  setContext: (context: Partial<AIContext>) => {
    set((state) => ({
      context: { ...state.context, ...context },
    }))
  },

  askQuestion: async (question: string) => {
    const { context, messages } = get()

    // Add user message
    const userMessage: AIMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: question,
      timestamp: new Date(),
    }

    // Add placeholder assistant message for streaming
    const assistantMessage: AIMessage = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: '',
      timestamp: new Date(),
    }

    set({
      messages: [...messages, userMessage, assistantMessage],
      isLoading: true,
    })

    try {
      const response = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question,
          context,
          conversationHistory: messages.slice(-10), // Last 10 messages for context
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get AI response')
      }

      // Handle streaming response
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (!reader) {
        throw new Error('No response body')
      }

      let fullContent = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        fullContent += chunk

        // Update the assistant message with streamed content
        set((state) => ({
          messages: state.messages.map((msg) =>
            msg.id === assistantMessage.id
              ? { ...msg, content: fullContent }
              : msg
          ),
        }))
      }
    } catch (error) {
      console.error('AI Assistant error:', error)
      // Update assistant message with error
      set((state) => ({
        messages: state.messages.map((msg) =>
          msg.id === assistantMessage.id
            ? { ...msg, content: 'Sorry, I encountered an error. Please try again.' }
            : msg
        ),
      }))
    } finally {
      set({ isLoading: false })
    }
  },

  clearMessages: () => {
    set({ messages: [] })
  },
}))
