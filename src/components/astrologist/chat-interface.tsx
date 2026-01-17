'use client'

/**
 * Chat Interface Component
 *
 * Main chat interface for the AI astrologist with streaming support.
 */

import { useEffect, useRef, useState } from 'react'
import { ChatMessage } from './chat-message'
import { ChatInput } from './chat-input'
import { TypingIndicator } from './typing-indicator'
import { useAstrologistStore } from '@/store/astrologist'
import { getCharacter } from '@/lib/astrologist/characters'
import type { CharacterId, NatalChart } from '@/types'

interface ChatInterfaceProps {
  characterId: CharacterId
  onBack: () => void
}

export function ChatInterface({ characterId, onBack }: ChatInterfaceProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [natalChart, setNatalChart] = useState<NatalChart | null>(null)

  const { conversations, isLoading, addMessage, updateLastMessage, setIsLoading, clearConversation } =
    useAstrologistStore()

  const messages = conversations[characterId] || []
  const character = getCharacter(characterId)

  // Load natal chart from database first, then sessionStorage fallback
  useEffect(() => {
    async function loadNatalChart() {
      // First try sessionStorage for quick load
      const sessionData = sessionStorage.getItem('natal-chart')
      if (sessionData) {
        try {
          setNatalChart(JSON.parse(sessionData))
        } catch {
          // Invalid chart data
        }
      }

      // Then try to load from database (more authoritative)
      try {
        const response = await fetch('/api/user/birth-data')
        if (response.ok) {
          const { birthData } = await response.json()
          if (birthData?.natalChart) {
            setNatalChart(birthData.natalChart)
            // Update sessionStorage
            sessionStorage.setItem('natal-chart', JSON.stringify(birthData.natalChart))
          }
        }
      } catch {
        // Database fetch failed, keep using sessionStorage data
      }
    }

    loadNatalChart()
  }, [])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async (message: string) => {
    // Add user message
    addMessage(characterId, {
      role: 'user',
      content: message,
      characterId,
    })

    // Add placeholder for assistant message
    addMessage(characterId, {
      role: 'assistant',
      content: '',
      characterId,
    })

    setIsLoading(true)

    try {
      // Build conversation history (excluding the placeholder)
      const history = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }))

      const response = await fetch('/api/astrologist/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          characterId,
          message,
          conversationHistory: history,
          natalChart,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      // Handle streaming response
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let fullContent = ''

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          fullContent += chunk
          updateLastMessage(characterId, fullContent)
        }
      }
    } catch (error) {
      console.error('Chat error:', error)
      updateLastMessage(
        characterId,
        "I apologize, but I'm having trouble connecting to the cosmos right now. Please try again."
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleClearChat = () => {
    if (window.confirm('Are you sure you want to clear this conversation?')) {
      clearConversation(characterId)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700 bg-slate-900/50">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Go back"
          >
            <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${character.gradient} flex items-center justify-center text-lg`}>
            {character.avatar}
          </div>
          <div>
            <h2 className="font-semibold text-white">{character.name}</h2>
            <p className="text-xs text-slate-400">{character.tagline}</p>
          </div>
        </div>

        <button
          onClick={handleClearChat}
          className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
        >
          Clear chat
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center px-4">
            <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${character.gradient} flex items-center justify-center text-3xl mb-4`}>
              {character.avatar}
            </div>
            <h3 className="text-lg font-medium text-white mb-2">Chat with {character.name}</h3>
            <p className="text-sm text-slate-400 max-w-sm">
              {character.id === 'celeste' &&
                "I'm here to guide you with gentle wisdom from the stars. What's on your mind, dear one?"}
              {character.id === 'nova' &&
                "Hey! I'm so excited to dive into your chart with you! What do you want to know?"}
              {character.id === 'orion' &&
                "The stars have messages for those ready to hear them. What brings you here?"}
            </p>
            {natalChart && (
              <p className="mt-4 text-xs text-indigo-400">
                Your natal chart is loaded for personalized insights
              </p>
            )}
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && messages[messages.length - 1]?.content === '' && (
              <div className="flex justify-start mb-4">
                <div className="flex items-start gap-3">
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br ${character.gradient} flex items-center justify-center text-lg`}
                  >
                    {character.avatar}
                  </div>
                  <div className="bg-slate-800/70 border border-slate-700 rounded-2xl rounded-bl-md">
                    <TypingIndicator />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input */}
      <ChatInput onSend={handleSend} isLoading={isLoading} />
    </div>
  )
}
