'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  CHINESE_ZODIAC_DATA,
  CHINESE_ZODIAC_ANIMALS,
  getChineseZodiacAnimal,
  getChineseElement,
  getYinYang,
  type ChineseZodiacAnimal,
} from '@/lib/chinese-zodiac-data'
import { ChevronRight } from 'lucide-react'

const ELEMENT_COLORS = {
  wood: 'from-green-500 to-emerald-600',
  fire: 'from-red-500 to-orange-500',
  earth: 'from-yellow-600 to-amber-600',
  metal: 'from-gray-300 to-slate-400',
  water: 'from-blue-500 to-indigo-600',
}

export default function ChineseZodiacPage() {
  const [birthYear, setBirthYear] = useState('')
  const [birthMonth, setBirthMonth] = useState('')
  const [birthDay, setBirthDay] = useState('')
  const [result, setResult] = useState<{
    animal: ChineseZodiacAnimal
    element: string
    yinYang: string
  } | null>(null)

  const handleCalculate = () => {
    if (!birthYear || !birthMonth || !birthDay) return

    const year = parseInt(birthYear)
    const month = parseInt(birthMonth)
    const day = parseInt(birthDay)

    if (year < 1924 || year > 2030) {
      alert('Please enter a year between 1924 and 2030')
      return
    }

    const animal = getChineseZodiacAnimal(year, month, day)
    const element = getChineseElement(year)
    const yinYang = getYinYang(year)

    setResult({ animal, element, yinYang })
  }

  const resultData = result ? CHINESE_ZODIAC_DATA[result.animal] : null

  return (
    <div className="min-h-screen bg-[#1a1a2e]">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Chinese Zodiac Calculator
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Discover your Chinese zodiac animal sign, element, and personality traits based on your birth date.
          </p>
        </div>

        {/* Calculator */}
        <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-2xl p-8 mb-12">
          <h2 className="text-xl font-semibold text-white mb-6 text-center">Enter Your Birth Date</h2>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-white/60 text-sm mb-2">Year</label>
              <input
                type="number"
                value={birthYear}
                onChange={(e) => setBirthYear(e.target.value)}
                placeholder="1990"
                min="1924"
                max="2030"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-white/60 text-sm mb-2">Month</label>
              <select
                value={birthMonth}
                onChange={(e) => setBirthMonth(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-red-500"
              >
                <option value="">Select</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {new Date(2000, i, 1).toLocaleString('default', { month: 'long' })}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-white/60 text-sm mb-2">Day</label>
              <input
                type="number"
                value={birthDay}
                onChange={(e) => setBirthDay(e.target.value)}
                placeholder="15"
                min="1"
                max="31"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          <button
            onClick={handleCalculate}
            className="w-full py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
          >
            Calculate My Chinese Zodiac
          </button>
        </div>

        {/* Result */}
        {result && resultData && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-12">
            <div className="text-center mb-8">
              <span className="text-8xl mb-4 block">{resultData.emoji}</span>
              <h2 className="text-3xl font-bold text-white mb-2">
                {result.yinYang} {result.element.charAt(0).toUpperCase() + result.element.slice(1)} {resultData.name}
              </h2>
              <p className="text-white/60">{resultData.chineseCharacter}</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className={`p-4 rounded-xl bg-gradient-to-br ${ELEMENT_COLORS[result.element as keyof typeof ELEMENT_COLORS]} text-center`}>
                <p className="text-white/80 text-sm mb-1">Element</p>
                <p className="text-white font-bold capitalize">{result.element}</p>
              </div>
              <div className="p-4 rounded-xl bg-white/10 text-center">
                <p className="text-white/60 text-sm mb-1">Polarity</p>
                <p className="text-white font-bold">{result.yinYang}</p>
              </div>
              <div className="p-4 rounded-xl bg-white/10 text-center">
                <p className="text-white/60 text-sm mb-1">Lucky Numbers</p>
                <p className="text-white font-bold">{resultData.luckyNumbers.join(', ')}</p>
              </div>
            </div>

            {/* Traits */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {resultData.traits.map((trait) => (
                <span
                  key={trait}
                  className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-white"
                >
                  {trait}
                </span>
              ))}
            </div>

            {/* Personality */}
            <div className="prose prose-invert max-w-none mb-8">
              <h3 className="text-xl font-semibold text-white mb-3">Personality</h3>
              <p className="text-white/80">{resultData.personality}</p>
            </div>

            {/* Sections */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-pink-500/10 border border-pink-500/30 rounded-xl p-5">
                <h3 className="text-pink-400 font-semibold mb-2">Love & Relationships</h3>
                <p className="text-white/70 text-sm">{resultData.love}</p>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-5">
                <h3 className="text-amber-400 font-semibold mb-2">Career</h3>
                <p className="text-white/70 text-sm">{resultData.career}</p>
              </div>
            </div>

            {/* Compatibility */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-emerald-400 font-semibold mb-3">Compatible With</h3>
                <div className="flex flex-wrap gap-2">
                  {resultData.compatibility.map((animal) => (
                    <span key={animal} className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-400 text-sm">
                      {CHINESE_ZODIAC_DATA[animal].emoji} {CHINESE_ZODIAC_DATA[animal].name}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-red-400 font-semibold mb-3">Challenging Matches</h3>
                <div className="flex flex-wrap gap-2">
                  {resultData.incompatibility.map((animal) => (
                    <span key={animal} className="px-3 py-1 bg-red-500/20 border border-red-500/30 rounded-full text-red-400 text-sm">
                      {CHINESE_ZODIAC_DATA[animal].emoji} {CHINESE_ZODIAC_DATA[animal].name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* All Animals Grid */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">The 12 Chinese Zodiac Animals</h2>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {CHINESE_ZODIAC_ANIMALS.map((animal) => {
              const data = CHINESE_ZODIAC_DATA[animal]
              return (
                <div
                  key={animal}
                  className="p-4 bg-white/5 border border-white/10 rounded-xl text-center hover:bg-white/10 transition-colors"
                >
                  <span className="text-4xl block mb-2">{data.emoji}</span>
                  <p className="text-white font-medium">{data.name}</p>
                  <p className="text-white/50 text-xs">{data.chineseCharacter}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* SEO Content */}
        <section className="prose prose-invert max-w-none mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4">About the Chinese Zodiac</h2>
          <p className="text-white/70">
            The Chinese zodiac, known as Sheng Xiao, is a repeating 12-year cycle where each year is represented
            by an animal and its attributes. Your Chinese zodiac sign is determined by the year you were born,
            taking into account the Chinese New Year date.
          </p>

          <h3 className="text-xl font-semibold text-white mt-8 mb-3">The Five Elements</h3>
          <p className="text-white/70">
            In addition to the 12 animals, Chinese astrology includes five elements that cycle every two years:
            Wood, Fire, Earth, Metal, and Water. This creates a 60-year cycle of unique combinations.
          </p>

          <h3 className="text-xl font-semibold text-white mt-8 mb-3">Yin and Yang</h3>
          <p className="text-white/70">
            Each year alternates between Yin (odd years) and Yang (even years), adding another layer of meaning
            to your Chinese zodiac profile.
          </p>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-semibold text-white mb-2">Discover Your Western Zodiac Too</h3>
          <p className="text-white/60 mb-4">
            Compare your Chinese and Western zodiac signs for deeper self-understanding.
          </p>
          <Link
            href="/charts/birth-chart-calculator"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
          >
            Get Your Birth Chart
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
