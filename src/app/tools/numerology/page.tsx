'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  calculateAllNumbers,
  NUMBER_MEANINGS,
  type NumerologyResult,
} from '@/lib/numerology-data'
import { ChevronRight, Hash } from 'lucide-react'

export default function NumerologyPage() {
  const [fullName, setFullName] = useState('')
  const [birthDay, setBirthDay] = useState('')
  const [birthMonth, setBirthMonth] = useState('')
  const [birthYear, setBirthYear] = useState('')
  const [result, setResult] = useState<NumerologyResult | null>(null)
  const [activeTab, setActiveTab] = useState<keyof NumerologyResult>('lifePath')

  const handleCalculate = () => {
    if (!fullName || !birthDay || !birthMonth || !birthYear) {
      alert('Please fill in all fields')
      return
    }

    const numbers = calculateAllNumbers(
      fullName,
      parseInt(birthDay),
      parseInt(birthMonth),
      parseInt(birthYear)
    )

    setResult(numbers)
    setActiveTab('lifePath')
  }

  const tabLabels: Record<keyof NumerologyResult, string> = {
    lifePath: 'Life Path',
    expression: 'Expression',
    soulUrge: 'Soul Urge',
    personality: 'Personality',
    birthday: 'Birthday',
  }

  const tabDescriptions: Record<keyof NumerologyResult, string> = {
    lifePath: 'Your life purpose and the path you are meant to walk',
    expression: 'Your natural talents and abilities',
    soulUrge: 'Your inner desires and motivations',
    personality: 'How others perceive you',
    birthday: 'Special talents and characteristics',
  }

  const activeNumber = result ? result[activeTab] : null
  const activeMeaning = activeNumber ? NUMBER_MEANINGS[activeNumber] || NUMBER_MEANINGS[activeNumber > 9 ? Math.floor(activeNumber / 10) : activeNumber] : null

  return (
    <div className="min-h-screen bg-[#1a1a2e]">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Numerology Calculator
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Discover the hidden meaning in your name and birth date. Calculate your Life Path,
            Expression, Soul Urge, and more.
          </p>
        </div>

        {/* Calculator */}
        <div className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border border-purple-500/30 rounded-2xl p-8 mb-12">
          <h2 className="text-xl font-semibold text-white mb-6 text-center">Enter Your Details</h2>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-white/60 text-sm mb-2">Full Name (as on birth certificate)</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Michael Smith"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-white/60 text-sm mb-2">Day</label>
                <input
                  type="number"
                  value={birthDay}
                  onChange={(e) => setBirthDay(e.target.value)}
                  placeholder="15"
                  min="1"
                  max="31"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-white/60 text-sm mb-2">Month</label>
                <select
                  value={birthMonth}
                  onChange={(e) => setBirthMonth(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-500"
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
                <label className="block text-white/60 text-sm mb-2">Year</label>
                <input
                  type="number"
                  value={birthYear}
                  onChange={(e) => setBirthYear(e.target.value)}
                  placeholder="1990"
                  min="1900"
                  max="2030"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleCalculate}
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
          >
            Calculate My Numbers
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="mb-12">
            {/* Number Tabs */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {(Object.keys(result) as Array<keyof NumerologyResult>).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-4 py-2 rounded-xl transition-all ${
                    activeTab === key
                      ? 'bg-purple-500 text-white'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  <span className="font-semibold">{result[key]}</span>
                  <span className="ml-2 text-sm">{tabLabels[key]}</span>
                </button>
              ))}
            </div>

            {/* Active Number Display */}
            {activeMeaning && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 text-white mb-4">
                    <span className="text-4xl font-bold">{activeNumber}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {tabLabels[activeTab]} Number: {activeMeaning.name}
                  </h2>
                  <p className="text-white/60">{tabDescriptions[activeTab]}</p>
                </div>

                {/* Keywords */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                  {activeMeaning.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-400"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <div className="prose prose-invert max-w-none mb-8">
                  <p className="text-white/80 text-lg leading-relaxed">{activeMeaning.description}</p>
                </div>

                {/* Strengths & Challenges */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-5">
                    <h3 className="text-emerald-400 font-semibold mb-3">Strengths</h3>
                    <ul className="space-y-2">
                      {activeMeaning.strengths.map((strength) => (
                        <li key={strength} className="flex items-center gap-2 text-white/70">
                          <span className="text-emerald-400">✓</span>
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-5">
                    <h3 className="text-amber-400 font-semibold mb-3">Challenges</h3>
                    <ul className="space-y-2">
                      {activeMeaning.challenges.map((challenge) => (
                        <li key={challenge} className="flex items-center gap-2 text-white/70">
                          <span className="text-amber-400">!</span>
                          {challenge}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Career */}
                <div className="mb-8">
                  <h3 className="text-white font-semibold mb-3">Ideal Careers</h3>
                  <div className="flex flex-wrap gap-2">
                    {activeMeaning.careers.map((career) => (
                      <span key={career} className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-white/80">
                        {career}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Compatibility */}
                <div>
                  <h3 className="text-white font-semibold mb-3">Compatible Numbers</h3>
                  <div className="flex gap-2">
                    {activeMeaning.compatibility.map((num) => (
                      <span key={num} className="w-10 h-10 flex items-center justify-center bg-pink-500/20 border border-pink-500/30 rounded-full text-pink-400 font-bold">
                        {num}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* All Numbers Overview */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
            <Hash className="w-6 h-6 text-purple-400" />
            The Core Numbers
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
              const meaning = NUMBER_MEANINGS[num]
              return (
                <div key={num} className="p-4 bg-white/5 border border-white/10 rounded-xl">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full text-white font-bold">
                      {num}
                    </span>
                    <div>
                      <h3 className="text-white font-semibold">{meaning.name}</h3>
                      <p className="text-white/50 text-sm">{meaning.keywords.join(' • ')}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Master Numbers */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">Master Numbers</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[11, 22, 33].map((num) => {
              const meaning = NUMBER_MEANINGS[num]
              return (
                <div key={num} className="p-5 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-500/30 rounded-xl">
                  <span className="inline-flex w-12 h-12 items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full text-white font-bold text-xl mb-3">
                    {num}
                  </span>
                  <h3 className="text-white font-semibold mb-2">{meaning.name}</h3>
                  <p className="text-white/60 text-sm">{meaning.keywords.join(' • ')}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-semibold text-white mb-2">Combine Numerology with Astrology</h3>
          <p className="text-white/60 mb-4">
            Get a complete picture of your cosmic blueprint with your birth chart.
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
