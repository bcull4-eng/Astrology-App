'use client'

/**
 * Daily Guidance Component
 *
 * Shows today's specific advice based on current transits.
 */

import type { DailyGuidance as DailyGuidanceType } from '@/types'

interface DailyGuidanceProps {
  guidance: DailyGuidanceType
}

const toneEmoji: Record<string, string> = {
  encouraging: '✨',
  cautious: '⚠️',
  reflective: '🪞',
  action_oriented: '🚀',
  restorative: '🌿',
}

export function DailyGuidance({ guidance }: DailyGuidanceProps) {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">{toneEmoji[guidance.tone] || '💫'}</span>
        <h2 className="text-white font-semibold">Today&apos;s Guidance</h2>
      </div>

      <p className="text-slate-300 leading-relaxed mb-6">{guidance.short_advice}</p>

      {/* Full lists */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-emerald-400 font-medium text-sm mb-3">Do Today</h3>
          <ul className="space-y-2">
            {guidance.do_list.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-slate-300 text-sm">
                <span className="text-emerald-400">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-red-400 font-medium text-sm mb-3">Avoid Today</h3>
          <ul className="space-y-2">
            {guidance.avoid_list.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-slate-300 text-sm">
                <span className="text-red-400">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
