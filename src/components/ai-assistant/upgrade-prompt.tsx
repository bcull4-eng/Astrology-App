'use client'

import { X, Sparkles, Lock } from 'lucide-react'
import Link from 'next/link'

interface UpgradePromptProps {
  isOpen: boolean
  onClose: () => void
  selectedText?: string
}

export function UpgradePrompt({ isOpen, onClose, selectedText }: UpgradePromptProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[9998] flex items-end sm:items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl animate-in slide-in-from-bottom-4 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-semibold text-white">AI Assistant</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-indigo-400" />
          </div>

          <h4 className="text-xl font-semibold text-white mb-2">
            Unlock AI-Powered Insights
          </h4>

          <p className="text-slate-400 mb-6">
            {selectedText ? (
              <>Get instant explanations for any astrological concept. Upgrade to Pro to ask the AI about &ldquo;{selectedText.slice(0, 50)}{selectedText.length > 50 ? '...' : ''}&rdquo; and more.</>
            ) : (
              <>Get instant answers to your astrology questions. Our AI assistant can explain placements, transits, and help you understand your chart.</>
            )}
          </p>

          <div className="space-y-3">
            <Link
              href="/paywall"
              className="block w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-xl transition-all"
              onClick={onClose}
            >
              Upgrade to Pro
            </Link>
            <button
              onClick={onClose}
              className="block w-full px-6 py-3 text-slate-400 hover:text-white transition-colors"
            >
              Maybe later
            </button>
          </div>
        </div>

        {/* Features list */}
        <div className="px-6 pb-6">
          <div className="bg-slate-800/50 rounded-xl p-4">
            <p className="text-sm font-medium text-white mb-3">Pro includes:</p>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                Unlimited AI assistant questions
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                Highlight any text to get explanations
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                Context-aware answers about your chart
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                Daily insights, forecasts & more
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
