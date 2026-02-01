'use client'

/**
 * Chat Interface Component
 *
 * Main chat interface for the AI astrologist with streaming support.
 * Free users get 1 message, then must upgrade to Pro.
 */

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ChatMessage } from './chat-message'
import { ChatInput } from './chat-input'
import { TypingIndicator } from './typing-indicator'
import { useAstrologistStore } from '@/store/astrologist'
import { useSubscription } from '@/hooks/use-subscription'
import { getCharacter } from '@/lib/astrologist/characters'
import type { CharacterId, NatalChart } from '@/types'

const FREE_MESSAGE_LIMIT = 1

interface ChatInterfaceProps {
  characterId: CharacterId
  onBack: () => void
}

export function ChatInterface({ characterId, onBack }: ChatInterfaceProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [natalChart, setNatalChart] = useState<NatalChart | null>(null)
  const { isPro, loading: subscriptionLoading } = useSubscription()

  const { conversations, isLoading, addMessage, updateLastMessage, setIsLoading, clearConversation, freeMessagesUsed, incrementFreeMessages } =
    useAstrologistStore()

  // Check if free user has hit their limit
  const hasReachedFreeLimit = !isPro && freeMessagesUsed >= FREE_MESSAGE_LIMIT

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
    // Check if free user has reached limit
    if (hasReachedFreeLimit) {
      return
    }

    // Increment free message counter for non-Pro users
    if (!isPro) {
      incrementFreeMessages()
    }

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
          freeMessagesUsed: isPro ? 0 : freeMessagesUsed,
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
      <div className="flex items-center justify-between p-4 border-b border-indigo-500/10 bg-indigo-950/30">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-indigo-900/30 rounded-lg transition-colors"
            aria-label="Go back"
          >
            <svg className="w-5 h-5 text-indigo-300/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${character.gradient} flex items-center justify-center text-lg`}>
            {character.avatar}
          </div>
          <div>
            <h2 className="font-semibold text-white">{character.name}</h2>
            <p className="text-xs text-indigo-200/50">{character.tagline}</p>
          </div>
        </div>

        <button
          onClick={handleClearChat}
          className="text-xs text-indigo-300/40 hover:text-indigo-200 transition-colors"
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
            <p className="text-sm text-indigo-200/50 max-w-sm">
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
                  <div className="bg-indigo-950/50 rounded-2xl rounded-bl-md">
                    <TypingIndicator />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input or Upgrade Prompt */}
      {hasReachedFreeLimit ? (
        <div className="p-4 border-t border-indigo-500/10 bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-pink-600/10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-300 text-xs font-medium px-3 py-1 rounded-full mb-3">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Free message used
            </div>
            <h3 className="text-white font-semibold mb-1">Enjoying the conversation?</h3>
            <p className="text-indigo-200/60 text-sm mb-4">
              Upgrade to Pro for unlimited chats with all our AI astrologers
            </p>
            <Link
              href="/paywall"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium rounded-xl transition-all shadow-lg shadow-indigo-500/25"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Upgrade to Pro
            </Link>
            <p className="text-indigo-300/40 text-xs mt-3">
              Try for just £2/week • Cancel anytime
            </p>
          </div>
        </div>
      ) : (
        <ChatInput onSend={handleSend} isLoading={isLoading || subscriptionLoading} />
      )}
    </div>
  )
}
