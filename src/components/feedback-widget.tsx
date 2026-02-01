'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks'

type FeedbackType = 'issue' | 'idea' | 'other'
type Step = 'closed' | 'type-select' | 'compose' | 'success'

const typeConfig: Record<FeedbackType, { icon: string; label: string; placeholder: string }> = {
  issue: {
    icon: '\u26A0\uFE0F',
    label: 'Issue',
    placeholder: 'I noticed that...',
  },
  idea: {
    icon: '\uD83D\uDCA1',
    label: 'Idea',
    placeholder: 'It would be great if...',
  },
  other: {
    icon: '\uD83D\uDCAC',
    label: 'Other',
    placeholder: 'I wanted to say...',
  },
}

export function FeedbackWidget() {
  const { user, loading } = useAuth()
  const [step, setStep] = useState<Step>('closed')
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Reset state when modal closes
  useEffect(() => {
    if (step === 'closed') {
      setFeedbackType(null)
      setMessage('')
      setError(null)
    }
  }, [step])

  // Don't render for unauthenticated users or while loading
  if (loading || !user) return null

  const handleTypeSelect = (type: FeedbackType) => {
    setFeedbackType(type)
    setStep('compose')
  }

  const handleSend = async () => {
    if (!message.trim() || !feedbackType) return

    setSending(true)
    setError(null)

    try {
      const res = await fetch('/api/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
          email: user.email,
          message: message.trim(),
          type: feedbackType,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to send feedback')
      }

      setStep('success')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setSending(false)
    }
  }

  const headingForType: Record<FeedbackType, string> = {
    issue: 'Report an issue',
    idea: 'Share an idea',
    other: 'Send feedback',
  }

  return (
    <>
      {/* Floating trigger button */}
      {step === 'closed' && (
        <button
          onClick={() => setStep('type-select')}
          className="fixed bottom-6 left-6 z-[9989] flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 rounded-full shadow-lg transition-all hover:shadow-xl hover:scale-105 text-sm font-medium"
          aria-label="Send feedback"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          Feedback
        </button>
      )}

      {/* Modal overlay */}
      {step !== 'closed' && (
        <div
          className="fixed inset-0 z-[9995] flex items-end sm:items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setStep('closed')
          }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Modal */}
          <div className="relative w-full max-w-sm bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl animate-in slide-in-from-bottom-4 duration-200 overflow-hidden">

            {/* Step 1: Type selection */}
            {step === 'type-select' && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-white">What&apos;s on your mind?</h2>
                  <button
                    onClick={() => setStep('closed')}
                    className="text-slate-400 hover:text-white transition-colors p-1"
                    aria-label="Close"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {(Object.entries(typeConfig) as [FeedbackType, typeof typeConfig[FeedbackType]][]).map(([type, config]) => (
                    <button
                      key={type}
                      onClick={() => handleTypeSelect(type)}
                      className="flex flex-col items-center gap-2 p-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-indigo-500/50 rounded-xl transition-all"
                    >
                      <span className="text-3xl">{config.icon}</span>
                      <span className="text-sm font-medium text-slate-200">{config.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Compose message */}
            {step === 'compose' && feedbackType && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setStep('type-select')}
                      className="text-slate-400 hover:text-white transition-colors p-1"
                      aria-label="Back"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <h2 className="text-lg font-semibold text-white">{headingForType[feedbackType]}</h2>
                  </div>
                  <button
                    onClick={() => setStep('closed')}
                    className="text-slate-400 hover:text-white transition-colors p-1"
                    aria-label="Close"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={typeConfig[feedbackType].placeholder}
                  rows={5}
                  autoFocus
                  className="w-full bg-slate-800 border border-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl p-4 text-white placeholder-slate-500 text-sm resize-none outline-none transition-colors"
                />

                {error && (
                  <p className="mt-2 text-sm text-red-400">{error}</p>
                )}

                <button
                  onClick={handleSend}
                  disabled={!message.trim() || sending}
                  className="w-full mt-4 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-700 disabled:text-slate-500 text-white font-medium rounded-xl transition-colors"
                >
                  {sending ? 'Sending...' : 'Send feedback'}
                </button>
              </div>
            )}

            {/* Step 3: Success */}
            {step === 'success' && (
              <div className="p-6 text-center">
                <div className="text-4xl mb-3">&#x2705;</div>
                <h2 className="text-lg font-semibold text-white mb-2">Thank you!</h2>
                <p className="text-sm text-slate-400 mb-4">Your feedback has been sent. We really appreciate it.</p>
                <button
                  onClick={() => setStep('closed')}
                  className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-medium transition-colors"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
