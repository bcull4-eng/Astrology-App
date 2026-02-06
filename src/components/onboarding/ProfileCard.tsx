'use client'

/**
 * ProfileCard
 *
 * Sign card showing modality, polarity, element, ruling planet,
 * and compatible signs. Used in ProfileRevealStep.
 */

import type { ProfileData } from '@/types/onboarding-v2'

interface ProfileCardProps {
  profile: ProfileData
}

const ELEMENT_COLORS: Record<string, string> = {
  fire: 'from-orange-500 to-red-600',
  earth: 'from-green-500 to-emerald-700',
  air: 'from-sky-400 to-blue-600',
  water: 'from-blue-500 to-indigo-700',
}

const ELEMENT_EMOJIS: Record<string, string> = {
  fire: '🔥',
  earth: '🌍',
  air: '💨',
  water: '🌊',
}

const ZODIAC_SYMBOLS: Record<string, string> = {
  Aries: '♈',
  Taurus: '♉',
  Gemini: '♊',
  Cancer: '♋',
  Leo: '♌',
  Virgo: '♍',
  Libra: '♎',
  Scorpio: '♏',
  Sagittarius: '♐',
  Capricorn: '♑',
  Aquarius: '♒',
  Pisces: '♓',
}

export function ProfileCard({ profile }: ProfileCardProps) {
  const gradientClass = ELEMENT_COLORS[profile.element] || ELEMENT_COLORS.fire
  const elementEmoji = ELEMENT_EMOJIS[profile.element] || '✨'
  const zodiacSymbol = ZODIAC_SYMBOLS[profile.sign] || '★'

  return (
    <div className={`relative rounded-3xl overflow-hidden bg-gradient-to-br ${gradientClass} p-1`}>
      <div className="bg-[#1a1a2e]/90 rounded-[22px] p-6">
        {/* Sign header */}
        <div className="text-center mb-6">
          <span className="text-5xl mb-2 block">{zodiacSymbol}</span>
          <h2 className="text-2xl font-serif font-bold text-white">{profile.sign}</h2>
          <p className="text-white/60 text-sm">{elementEmoji} {profile.element.charAt(0).toUpperCase() + profile.element.slice(1)} Sign</p>
        </div>

        {/* Properties grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white/5 rounded-xl p-3 text-center">
            <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Modality</p>
            <p className="text-white font-medium capitalize">{profile.modality}</p>
          </div>
          <div className="bg-white/5 rounded-xl p-3 text-center">
            <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Polarity</p>
            <p className="text-white font-medium capitalize">{profile.polarity === 'positive' ? 'Yang (+)' : 'Yin (-)'}</p>
          </div>
          <div className="bg-white/5 rounded-xl p-3 text-center col-span-2">
            <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Ruling Planet</p>
            <p className="text-white font-medium">{profile.rulingPlanet}</p>
          </div>
        </div>

        {/* Compatible signs */}
        <div className="text-center">
          <p className="text-xs text-white/40 uppercase tracking-wider mb-3">Most Compatible With</p>
          <div className="flex justify-center gap-4">
            {profile.compatibleSigns.slice(0, 4).map((sign) => (
              <div key={sign} className="flex flex-col items-center gap-1">
                <div
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
                  title={sign}
                >
                  <span className="text-lg">{ZODIAC_SYMBOLS[sign] || '★'}</span>
                </div>
                <span className="text-xs text-white/60">{sign}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
