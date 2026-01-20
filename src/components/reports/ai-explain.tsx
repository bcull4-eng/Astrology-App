'use client'

/**
 * AI Explain Component
 *
 * Allows users to highlight text and get AI explanations.
 */

import { useState, useEffect, useCallback, useRef } from 'react'

interface AIExplainProps {
  children: React.ReactNode
  reportContext?: string
}

export function AIExplainWrapper({ children, reportContext }: AIExplainProps) {
  const [selection, setSelection] = useState<{
    text: string
    x: number
    y: number
  } | null>(null)
  const [explanation, setExplanation] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseUp = useCallback(() => {
    const selectedText = window.getSelection()?.toString().trim()

    if (selectedText && selectedText.length > 10 && selectedText.length < 500) {
      const range = window.getSelection()?.getRangeAt(0)
      if (range && containerRef.current?.contains(range.commonAncestorContainer)) {
        const rect = range.getBoundingClientRect()
        setSelection({
          text: selectedText,
          x: rect.left + rect.width / 2,
          y: rect.top - 10,
        })
      }
    } else {
      setSelection(null)
    }
  }, [])

  const handleMouseDown = useCallback(() => {
    if (!showModal) {
      setSelection(null)
    }
  }, [showModal])

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mousedown', handleMouseDown)
    return () => {
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mousedown', handleMouseDown)
    }
  }, [handleMouseUp, handleMouseDown])

  const handleExplain = async () => {
    if (!selection) return

    setLoading(true)
    setShowModal(true)
    setExplanation(null)

    try {
      const response = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Please explain this astrological concept in simple, clear terms. Be concise but thorough (2-3 paragraphs max):\n\n"${selection.text}"`,
          context: reportContext || 'astrology report',
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setExplanation(data.response || 'Unable to generate explanation.')
      } else {
        setExplanation('Sorry, I couldn\'t generate an explanation. Please try again.')
      }
    } catch (error) {
      console.error('AI explain error:', error)
      setExplanation('Sorry, something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const closeModal = () => {
    setShowModal(false)
    setSelection(null)
    setExplanation(null)
  }

  return (
    <div ref={containerRef} className="relative">
      {children}

      {/* Selection Tooltip */}
      {selection && !showModal && (
        <div
          className="fixed z-50 transform -translate-x-1/2 -translate-y-full animate-fade-in"
          style={{ left: selection.x, top: selection.y }}
        >
          <button
            onClick={handleExplain}
            className="flex items-center gap-2 px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg shadow-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Ask AI to explain
          </button>
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-3 h-3 bg-indigo-600 rotate-45 -mt-1.5" />
        </div>
      )}

      {/* Explanation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl max-w-lg w-full p-6 relative shadow-2xl">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold">AI Explanation</h3>
                <p className="text-slate-400 text-xs">Powered by your AI Astrologist</p>
              </div>
            </div>

            {/* Selected Text */}
            <div className="bg-slate-900/50 rounded-lg p-3 mb-4 border border-slate-700/50">
              <p className="text-slate-300 text-sm italic">"{selection?.text}"</p>
            </div>

            {/* Explanation */}
            <div className="min-h-[100px]">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="flex items-center gap-3 text-indigo-400">
                    <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm">Analyzing...</span>
                  </div>
                </div>
              ) : explanation ? (
                <div className="prose prose-invert prose-sm max-w-none">
                  <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{explanation}</p>
                </div>
              ) : null}
            </div>

            {/* Actions */}
            {!loading && explanation && (
              <div className="mt-4 pt-4 border-t border-slate-700/50 flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Got it
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// Helper banner to show at top of report
export function AIExplainBanner() {
  return (
    <div className="bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/20 rounded-xl p-4 mb-6 flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
        <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      </div>
      <div className="flex-1">
        <p className="text-white font-medium text-sm">AI-Powered Explanations</p>
        <p className="text-indigo-200/60 text-xs">
          Highlight any text in your report to get an instant AI explanation of astrological concepts.
        </p>
      </div>
    </div>
  )
}
