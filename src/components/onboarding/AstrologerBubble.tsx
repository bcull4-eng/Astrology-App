'use client'

/**
 * AstrologerBubble
 *
 * Speech bubble with avatar for astrologer messages.
 * Features pop-in animation, highlighted text with pulse glow,
 * and optional typewriter effect.
 */

import { useState, useEffect } from 'react'

interface AstrologerBubbleProps {
  message: string
  highlightedText?: string
  typewriter?: boolean
  delay?: number
}

export function AstrologerBubble({
  message,
  highlightedText,
  typewriter = false,
  delay = 0,
}: AstrologerBubbleProps) {
  const [isVisible, setIsVisible] = useState(delay === 0)
  const [displayedText, setDisplayedText] = useState(typewriter ? '' : message)

  // Delay visibility
  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => setIsVisible(true), delay)
      return () => clearTimeout(timer)
    }
  }, [delay])

  // Typewriter effect
  useEffect(() => {
    if (!typewriter || !isVisible) return

    let index = 0
    const interval = setInterval(() => {
      if (index < message.length) {
        setDisplayedText(message.slice(0, index + 1))
        index++
      } else {
        clearInterval(interval)
      }
    }, 30)

    return () => clearInterval(interval)
  }, [typewriter, isVisible, message])

  // Render message with highlighted text
  const renderMessage = () => {
    const text = typewriter ? displayedText : message

    if (!highlightedText || !text.includes(highlightedText)) {
      return <span>{text}</span>
    }

    const parts = text.split(highlightedText)
    const showHighlight = !typewriter || displayedText.includes(highlightedText)

    return (
      <>
        {parts[0]}
        {showHighlight && (
          <span className="text-indigo-300 animate-pulse-glow font-medium">
            {highlightedText}
          </span>
        )}
        {showHighlight && parts[1]}
      </>
    )
  }

  if (!isVisible) return null

  return (
    <div className="animate-bubble-pop">
      {/* Speech bubble */}
      <div className="relative bg-gradient-to-br from-indigo-600/80 to-purple-600/80 backdrop-blur-sm rounded-2xl rounded-bl-sm p-4 shadow-lg">
        <p className="text-white text-sm leading-relaxed">{renderMessage()}</p>

        {/* Bubble tail */}
        <div className="absolute -bottom-2 left-4 w-4 h-4 bg-gradient-to-br from-indigo-600/80 to-purple-600/80 transform rotate-45" />
      </div>

      {/* Avatar */}
      <div className="flex items-center gap-2 mt-3 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
          <span className="text-xl">🔮</span>
        </div>
        <div>
          <p className="text-white text-sm font-medium">Celestia</p>
          <p className="text-white/50 text-xs">Your Astrologer</p>
        </div>
      </div>
    </div>
  )
}
