'use client'

import { useState, useEffect, useMemo } from 'react'
import { useParams, notFound } from 'next/navigation'
import Link from 'next/link'
import { getCalculatorBySlug, getAllCalculatorSlugs, getRelatedCalculators } from '../data/calculators'
import { CalculatorForm } from '../components/CalculatorForm'
import { CalculatorResultDisplay } from '../components/CalculatorResult'
import { SEOContentDisplay } from '../components/SEOContent'
import { useAIContext } from '@/hooks/use-ai-context'
import type { Calculator, CalculatorFormData, CalculatorResult } from '@/types/calculators'
import type { NatalChart } from '@/types/astrology'
import {
  extractSignResults,
  calculateSaturnReturn,
  calculateMoonPhase,
  calculatePartOfFortune,
  calculateLilith,
  calculateCompatibility
} from '@/lib/calculators'

export default function CalculatorPage() {
  const params = useParams()
  const slug = params.calculatorSlug as string

  const [calculator, setCalculator] = useState<Calculator | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<CalculatorResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Set AI context for this page
  const aiContext = useMemo(() => ({
    pageName: calculator?.title || 'Calculator',
    pageDescription: calculator?.description,
    viewingContext: result ? {
      type: 'calculator' as const,
      details: `User calculated their ${calculator?.title}`,
      data: {
        calculatorType: calculator?.outputType,
        signResults: result.signResults?.map(r => `${r.planet}: ${r.sign}`),
      }
    } : {
      type: 'calculator' as const,
      details: `Viewing ${calculator?.title || 'calculator'} - no results yet`,
    }
  }), [calculator, result])

  useAIContext(aiContext)

  useEffect(() => {
    const calc = getCalculatorBySlug(slug)
    if (calc) {
      setCalculator(calc)
      // Update page title
      document.title = calc.metaTitle
    }
  }, [slug])

  if (!calculator) {
    // Check if it's a valid slug
    const validSlugs = getAllCalculatorSlugs()
    if (!validSlugs.includes(slug)) {
      notFound()
    }
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-indigo-500 border-t-transparent rounded-full" />
      </div>
    )
  }

  const handleSubmit = async (data: CalculatorFormData) => {
    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      // Fetch natal chart for main person
      const chartResponse = await fetch('/api/natal-chart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          birthDate: data.birthDate,
          birthTime: data.birthTime || null,
          birthTimeConfidence: data.birthTimeConfidence,
          birthPlace: data.birthPlace,
        }),
      })

      if (!chartResponse.ok) {
        const errorData = await chartResponse.json()
        throw new Error(errorData.error || 'Failed to calculate chart')
      }

      const chartData = await chartResponse.json()
      const chart: NatalChart = chartData.chart

      // Store birth data in session storage for upsell flow
      sessionStorage.setItem('calculatorBirthData', JSON.stringify({
        birthDate: data.birthDate,
        birthTime: data.birthTime,
        birthPlace: data.birthPlace,
        location: chartData.location,
      }))

      // For compatibility calculator, fetch partner's chart too
      let partnerChart: NatalChart | undefined
      if (calculator.inputType === 'compatibility' && data.partnerBirthDate && data.partnerBirthPlace) {
        const partnerResponse = await fetch('/api/natal-chart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            birthDate: data.partnerBirthDate,
            birthTime: data.partnerBirthTime || null,
            birthTimeConfidence: data.partnerBirthTimeConfidence || 'unknown',
            birthPlace: data.partnerBirthPlace,
          }),
        })

        if (!partnerResponse.ok) {
          const errorData = await partnerResponse.json()
          throw new Error(errorData.error || 'Failed to calculate partner chart')
        }

        const partnerData = await partnerResponse.json()
        partnerChart = partnerData.chart
      }

      // Build result based on calculator type
      const calculatorResult: CalculatorResult = {
        calculator,
        chart,
        partnerChart,
      }

      // Extract sign results for most calculator types
      if (calculator.outputType === 'single-sign' || calculator.outputType === 'multiple-signs' || calculator.outputType === 'chart') {
        calculatorResult.signResults = extractSignResults(chart, calculator)
      }

      // Handle special calculator types
      if (calculator.slug === 'saturn-return-calculator') {
        const saturnPlacement = chart.placements.find(p => p.planet === 'saturn')
        if (saturnPlacement) {
          calculatorResult.saturnReturn = calculateSaturnReturn(
            new Date(data.birthDate),
            saturnPlacement
          )
        }
      }

      if (calculator.slug === 'solar-return-calculator') {
        const solarReturnResponse = await fetch('/api/solar-return', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            birthDate: data.birthDate,
            birthTime: data.birthTime || null,
            birthTimeConfidence: data.birthTimeConfidence,
            birthPlace: data.birthPlace,
          }),
        })

        if (solarReturnResponse.ok) {
          const solarReturnData = await solarReturnResponse.json()
          calculatorResult.solarReturn = solarReturnData.solarReturn
        }
      }

      if (calculator.slug === 'lunar-return-calculator') {
        const lunarReturnResponse = await fetch('/api/lunar-return', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            birthDate: data.birthDate,
            birthTime: data.birthTime || null,
            birthTimeConfidence: data.birthTimeConfidence,
            birthPlace: data.birthPlace,
          }),
        })

        if (lunarReturnResponse.ok) {
          const lunarReturnData = await lunarReturnResponse.json()
          calculatorResult.lunarReturn = lunarReturnData.lunarReturn
        }
      }

      if (calculator.slug === 'moon-phase-calculator') {
        const sunPlacement = chart.placements.find(p => p.planet === 'sun')
        const moonPlacement = chart.placements.find(p => p.planet === 'moon')
        if (sunPlacement && moonPlacement) {
          calculatorResult.moonPhase = calculateMoonPhase(
            { sign: sunPlacement.sign, degree: sunPlacement.degree },
            { sign: moonPlacement.sign, degree: moonPlacement.degree }
          )
        }
      }

      if (calculator.slug === 'part-of-fortune-calculator') {
        calculatorResult.partOfFortune = calculatePartOfFortune(chart, data.birthTime)
        calculatorResult.signResults = [{
          planet: 'part_of_fortune',
          sign: calculatorResult.partOfFortune.sign,
          degree: calculatorResult.partOfFortune.degree,
          house: calculatorResult.partOfFortune.house,
          interpretation: {
            title: `Part of Fortune in ${capitalize(calculatorResult.partOfFortune.sign)}`,
            summary: calculatorResult.partOfFortune.interpretation,
            traits: [],
            strengths: [],
            challenges: []
          }
        }]
      }

      if (calculator.slug === 'lilith-calculator') {
        calculatorResult.lilith = calculateLilith(chart)
        calculatorResult.signResults = [{
          planet: 'lilith',
          sign: calculatorResult.lilith.sign,
          degree: calculatorResult.lilith.degree,
          house: calculatorResult.lilith.house,
          interpretation: {
            title: `Black Moon Lilith in ${capitalize(calculatorResult.lilith.sign)}`,
            summary: calculatorResult.lilith.interpretation,
            traits: [],
            strengths: [],
            challenges: []
          }
        }]
      }

      if (calculator.slug === 'love-compatibility-calculator' && partnerChart) {
        calculatorResult.compatibility = calculateCompatibility(chart, partnerChart)
      }

      setResult(calculatorResult)

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const relatedCalculators = getRelatedCalculators(slug)

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Breadcrumb */}
      <div className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav className="text-sm text-slate-500">
            <Link href="/charts" className="hover:text-slate-300">Calculators</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-300">{calculator.title}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {calculator.h1}
          </h1>
          <p className="text-lg text-slate-300">
            {calculator.description}
          </p>
        </header>

        {/* Calculator Form & Results */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-white mb-4">
                Enter Your Birth Details
              </h2>
              <CalculatorForm
                calculator={calculator}
                onSubmit={handleSubmit}
                isLoading={isLoading}
              />
              {error && (
                <div className="mt-4 bg-red-500/10 border border-red-500/50 rounded-lg p-3 text-red-400 text-sm">
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {result ? (
              <CalculatorResultDisplay calculator={calculator} result={result} />
            ) : (
              <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-8 text-center">
                <div className="text-5xl mb-4">
                  {getCalculatorEmoji(calculator.slug)}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Ready to Calculate
                </h3>
                <p className="text-slate-400">
                  Enter your birth details on the left to see your {calculator.title.replace(' Calculator', '').toLowerCase()} results.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Related Calculators */}
        {relatedCalculators.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-semibold text-white mb-4">Related Calculators</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedCalculators.map((calc) => (
                <Link
                  key={calc.slug}
                  href={`/charts/${calc.slug}`}
                  className="bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-indigo-500/50 rounded-lg p-4 transition-all"
                >
                  <h3 className="font-semibold text-white">{calc.title}</h3>
                  <p className="text-sm text-slate-400 mt-1 line-clamp-2">{calc.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* SEO Content */}
        <section className="mt-12 bg-slate-800/30 border border-slate-700/50 rounded-xl p-8">
          <SEOContentDisplay content={calculator.seoContent} calculator={calculator} />
        </section>
      </div>
    </div>
  )
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function getCalculatorEmoji(slug: string): string {
  const emojis: Record<string, string> = {
    'sun-moon-rising-calculator': '\u2728',
    'birth-chart-calculator': '\u{1f52e}',
    'rising-sign-calculator': '\u2b06\ufe0f',
    'moon-sign-calculator': '\u{1f319}',
    'sun-sign-calculator': '\u2600\ufe0f',
    'venus-sign-calculator': '\u2665\ufe0f',
    'mars-sign-calculator': '\u{1f525}',
    'mercury-sign-calculator': '\u{1f4ac}',
    'jupiter-sign-calculator': '\u{1f340}',
    'saturn-sign-calculator': '\u{1f48e}',
    'saturn-return-calculator': '\u{1f504}',
    'north-node-calculator': '\u{1f9ed}',
    'chiron-sign-calculator': '\u{1fa79}',
    'midheaven-calculator': '\u{1f3af}',
    'lilith-calculator': '\u{1f311}',
    'part-of-fortune-calculator': '\u2618\ufe0f',
    'love-compatibility-calculator': '\u{1f495}',
    'personal-planets-calculator': '\u{1f31f}',
    'moon-phase-calculator': '\u{1f315}',
    'solar-return-calculator': '\u{1f382}',
    'lunar-return-calculator': '\u{1f319}',
  }
  return emojis[slug] || '\u2728'
}
