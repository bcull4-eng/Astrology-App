'use client'

/**
 * Report View Page
 *
 * Displays a generated report with rich visuals, educational content,
 * and interactive elements.
 */

import { useState, useEffect } from 'react'
import { useParams, useRouter, notFound } from 'next/navigation'
import Link from 'next/link'
import { getReportBySlug } from '@/lib/reports'
import { generateReportV2, type GeneratedReportV2 } from '@/lib/report-generator-v2'
import type { NatalChart, ReportSlug, ZodiacSign } from '@/types'
import {
  ElementBalance,
  ModalityBalance,
  MiniChartWheel,
  HouseEmphasis,
  TermTooltip,
  ReportTip,
  ReportSummaryCard,
  PlanetaryStrength,
  AspectGrid,
  CompatibilityMeter,
  YearlyTimeline,
  BirthChartWheel,
} from '@/components/reports/report-visuals'
import { AIExplainWrapper, AIExplainBanner } from '@/components/reports/ai-explain'

// Helper to create a demo partner chart from birth data
// In production, this would call a proper chart calculation API
function createPartnerChart(partnerData: { name: string; birthDate: string; birthTime?: string; birthPlace: string }): NatalChart {
  // Extract month/day to estimate sun sign (simplified)
  const date = new Date(partnerData.birthDate)
  const month = date.getMonth() + 1
  const day = date.getDate()

  // Simple sun sign calculation
  const getSunSign = (m: number, d: number): ZodiacSign => {
    if ((m === 3 && d >= 21) || (m === 4 && d <= 19)) return 'aries'
    if ((m === 4 && d >= 20) || (m === 5 && d <= 20)) return 'taurus'
    if ((m === 5 && d >= 21) || (m === 6 && d <= 20)) return 'gemini'
    if ((m === 6 && d >= 21) || (m === 7 && d <= 22)) return 'cancer'
    if ((m === 7 && d >= 23) || (m === 8 && d <= 22)) return 'leo'
    if ((m === 8 && d >= 23) || (m === 9 && d <= 22)) return 'virgo'
    if ((m === 9 && d >= 23) || (m === 10 && d <= 22)) return 'libra'
    if ((m === 10 && d >= 23) || (m === 11 && d <= 21)) return 'scorpio'
    if ((m === 11 && d >= 22) || (m === 12 && d <= 21)) return 'sagittarius'
    if ((m === 12 && d >= 22) || (m === 1 && d <= 19)) return 'capricorn'
    if ((m === 1 && d >= 20) || (m === 2 && d <= 18)) return 'aquarius'
    return 'pisces'
  }

  const sunSign = getSunSign(month, day)

  // Generate other placements based on patterns (simplified demo)
  const signs: ZodiacSign[] = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']
  const sunIndex = signs.indexOf(sunSign)

  return {
    user_id: 'partner',
    calculated_at: new Date(),
    placements: [
      { planet: 'sun', sign: sunSign, degree: day % 30, house: 1, is_retrograde: false },
      { planet: 'moon', sign: signs[(sunIndex + 4) % 12], degree: 15, house: 4, is_retrograde: false },
      { planet: 'mercury', sign: signs[(sunIndex + 1) % 12], degree: 8, house: 3, is_retrograde: false },
      { planet: 'venus', sign: signs[(sunIndex + 2) % 12], degree: 20, house: 5, is_retrograde: false },
      { planet: 'mars', sign: signs[(sunIndex + 3) % 12], degree: 5, house: 8, is_retrograde: false },
      { planet: 'jupiter', sign: signs[(sunIndex + 5) % 12], degree: 12, house: 9, is_retrograde: false },
      { planet: 'saturn', sign: signs[(sunIndex + 6) % 12], degree: 25, house: 10, is_retrograde: false },
    ],
    houses: [],
    ascendant: { sign: signs[(sunIndex + 6) % 12], degree: 15 },
    midheaven: { sign: signs[(sunIndex + 9) % 12], degree: 10 },
  }
}

// Generation step messages for the loading screen
const generationSteps = [
  { message: 'Analyzing your birth chart...', icon: '🌟' },
  { message: 'Calculating planetary positions...', icon: '🪐' },
  { message: 'Mapping house placements...', icon: '🏠' },
  { message: 'Interpreting cosmic alignments...', icon: '✨' },
  { message: 'Generating personalized insights...', icon: '📜' },
  { message: 'Weaving your celestial story...', icon: '🌙' },
  { message: 'Finalizing your report...', icon: '💫' },
]

export default function ReportViewPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as ReportSlug

  const [report, setReport] = useState<GeneratedReportV2 | null>(null)
  const [loading, setLoading] = useState(true)
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())
  const [showTableOfContents, setShowTableOfContents] = useState(true)
  const [showGlossary, setShowGlossary] = useState(false)
  const [activeGlossaryTerm, setActiveGlossaryTerm] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  // Animate through generation steps
  useEffect(() => {
    if (!loading) return

    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        const next = prev + 1
        if (next < generationSteps.length) {
          setCompletedSteps((completed) => [...completed, prev])
          return next
        }
        return prev
      })
    }, 800)

    return () => clearInterval(stepInterval)
  }, [loading])

  useEffect(() => {
    const reportDef = getReportBySlug(slug)
    if (!reportDef) {
      notFound()
    }

    // Check for pending report purchase (single report or bundle)
    const pendingReport = sessionStorage.getItem('pending-report')
    const pendingBundle = sessionStorage.getItem('pending-bundle')
    const chartData = sessionStorage.getItem('natal-chart')

    if (!chartData) {
      router.push(`/reports/${slug}`)
      return
    }

    const chart = JSON.parse(chartData) as NatalChart

    // Get user name from chart or session
    const userData = sessionStorage.getItem('user-data')
    const userName = userData ? JSON.parse(userData).name || 'You' : 'You'

    // Simulate generation time for better UX (minimum 5 seconds to show steps)
    const generateReport = async () => {
      // Wait for animation to complete
      await new Promise((resolve) => setTimeout(resolve, 5600))

      // Generate the report
      try {
        let generatedReport: GeneratedReportV2

        // Handle reports that require partner data
        if (reportDef.requiresPartner) {
          // Check both pending-report (single purchase) and pending-bundle (bundle purchase)
          let partnerData = null

          if (pendingReport) {
            const parsed = JSON.parse(pendingReport)
            partnerData = parsed.partnerData
          } else if (pendingBundle) {
            const parsed = JSON.parse(pendingBundle)
            partnerData = parsed.partnerData
          }

          if (!partnerData || !partnerData.name) {
            // No partner data provided - redirect back to purchase page
            console.error('Partner report requested but no partner data found')
            router.push(`/reports/${slug}`)
            return
          }

          // Create partner chart based on their birth date (demo implementation)
          // In production, this would be calculated from actual birth data
          const partnerChart: NatalChart = createPartnerChart(partnerData as { name: string; birthDate: string; birthTime?: string; birthPlace: string })

          generatedReport = generateReportV2(slug, chart, userName, partnerChart, partnerData.name as string)
        } else {
          generatedReport = generateReportV2(slug, chart, userName)
        }

        setReport(generatedReport)
        // Expand all sections by default
        setExpandedSections(new Set(generatedReport.sections.map((s) => s.id)))

        // Clear the pending data (don't clear bundle data as user may generate other reports)
        sessionStorage.removeItem('pending-report')
      } catch (error) {
        console.error('Failed to generate report:', error)
        router.push(`/reports/${slug}`)
      } finally {
        setLoading(false)
      }
    }

    generateReport()
  }, [slug, router])

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev)
      if (next.has(sectionId)) {
        next.delete(sectionId)
      } else {
        next.add(sectionId)
      }
      return next
    })
  }

  const expandAll = () => {
    if (report) {
      setExpandedSections(new Set(report.sections.map((s) => s.id)))
    }
  }

  const collapseAll = () => {
    setExpandedSections(new Set())
  }

  if (loading) {
    const reportDef = getReportBySlug(slug)
    const progress = ((currentStep + 1) / generationSteps.length) * 100

    return (
      <div className="min-h-[80vh] flex items-center justify-center py-12">
        <div className="w-full max-w-lg">
          {/* Animated cosmic background */}
          <div className="relative mb-8">
            {/* Outer glow ring */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-40 h-40 rounded-full bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 animate-pulse" />
            </div>

            {/* Spinning constellation */}
            <div className="relative w-32 h-32 mx-auto">
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                  <div
                    key={angle}
                    className="absolute w-2 h-2 rounded-full bg-indigo-400"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `rotate(${angle}deg) translateY(-50px)`,
                      opacity: 0.3 + (i % 3) * 0.2,
                    }}
                  />
                ))}
              </div>

              {/* Inner circle with icon */}
              <div className="absolute inset-4 flex items-center justify-center">
                <div
                  className={`w-24 h-24 rounded-full bg-gradient-to-br ${reportDef?.gradient || 'from-indigo-500 to-purple-600'} flex items-center justify-center shadow-2xl`}
                >
                  <span className="text-4xl animate-bounce" style={{ animationDuration: '2s' }}>
                    {generationSteps[currentStep]?.icon || '✨'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Report title */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">
              Crafting Your {reportDef?.title || 'Report'}
            </h2>
            <p className="text-slate-400 text-sm">
              We're analyzing the stars to create your personalized insights
            </p>
          </div>

          {/* Progress steps */}
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 mb-6">
            <div className="space-y-3">
              {generationSteps.map((step, index) => {
                const isCompleted = completedSteps.includes(index)
                const isCurrent = index === currentStep
                const isPending = index > currentStep

                return (
                  <div
                    key={index}
                    className={`flex items-center gap-3 transition-all duration-500 ${
                      isPending ? 'opacity-40' : 'opacity-100'
                    }`}
                  >
                    {/* Step indicator */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        isCompleted
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : isCurrent
                            ? 'bg-indigo-500/20 text-indigo-400 ring-2 ring-indigo-500/50'
                            : 'bg-slate-700/50 text-slate-500'
                      }`}
                    >
                      {isCompleted ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        <span className="text-sm">{step.icon}</span>
                      )}
                    </div>

                    {/* Step text */}
                    <span
                      className={`text-sm transition-colors duration-300 ${
                        isCompleted
                          ? 'text-emerald-400'
                          : isCurrent
                            ? 'text-white font-medium'
                            : 'text-slate-500'
                      }`}
                    >
                      {step.message}
                    </span>

                    {/* Loading dots for current step */}
                    {isCurrent && (
                      <div className="flex gap-1 ml-auto">
                        <div
                          className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce"
                          style={{ animationDelay: '0ms' }}
                        />
                        <div
                          className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce"
                          style={{ animationDelay: '150ms' }}
                        />
                        <div
                          className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce"
                          style={{ animationDelay: '300ms' }}
                        />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Fun fact while waiting */}
          <div className="text-center">
            <p className="text-xs text-slate-500 italic">
              Did you know? Your birth chart contains over 40 unique planetary aspects that shape your
              personality.
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (!report) {
    return null
  }

  const reportDef = getReportBySlug(slug)

  // Render visual component based on type
  const renderVisual = (visual: GeneratedReportV2['visuals'][0]) => {
    switch (visual.type) {
      case 'element-balance':
        return <ElementBalance data={visual.data as Record<string, number>} title={visual.title} />
      case 'modality-balance':
        return <ModalityBalance data={visual.data as Record<string, number>} title={visual.title} />
      case 'chart-wheel':
        return <MiniChartWheel data={visual.data as { sun?: string; moon?: string; rising?: string }} />
      case 'house-emphasis': {
        // Convert string keys to number keys for house emphasis
        const houseData: Record<number, number> = {}
        Object.entries(visual.data).forEach(([key, value]) => {
          const houseNum = parseInt(key)
          if (!isNaN(houseNum) && typeof value === 'number') {
            houseData[houseNum] = value
          }
        })
        return <HouseEmphasis data={houseData} title={visual.title} />
      }
      case 'planetary-strength':
        return <PlanetaryStrength data={visual.data as Record<string, number>} title={visual.title} />
      case 'aspect-grid':
        return <AspectGrid aspects={visual.data as unknown as Array<{ planet1: string; planet2: string; type: 'conjunction' | 'opposition' | 'trine' | 'square' | 'sextile'; orb: number }>} title={visual.title} />
      case 'compatibility-meter':
        return <CompatibilityMeter score={(visual.data as unknown as { score: number }).score} category={visual.title} description={(visual.data as unknown as { description: string }).description || ''} />
      case 'yearly-timeline':
        return <YearlyTimeline months={visual.data as unknown as Array<{ name: string; energy: 'high' | 'medium' | 'low' | 'challenging'; theme: string }>} title={visual.title} />
      case 'birth-chart-wheel':
        return <BirthChartWheel placements={visual.data as unknown as Array<{ planet: string; sign: string; house: number; degree: number }>} />
      default:
        return null
    }
  }

  // Render content with term tooltips
  const renderContentWithTerms = (content: string, terms?: { term: string; definition: string }[]) => {
    if (!terms || terms.length === 0) {
      return content.split('\n\n').map((paragraph, j) => renderParagraph(paragraph, j))
    }

    // For now, render content normally - term highlighting can be enhanced later
    return content.split('\n\n').map((paragraph, j) => renderParagraph(paragraph, j, terms))
  }

  const renderParagraph = (
    paragraph: string,
    index: number,
    terms?: { term: string; definition: string }[]
  ) => {
    // Handle bold headers
    if (paragraph.startsWith('**') && paragraph.includes('**:')) {
      const [header, ...rest] = paragraph.split('**:')
      const headerText = header.replace('**', '')
      return (
        <div key={index} className="mb-4">
          <h4 className="text-white font-semibold mb-1">{headerText}</h4>
          <p className="text-slate-300 leading-relaxed">{rest.join(':').trim()}</p>
        </div>
      )
    }

    // Handle subheaders (###)
    if (paragraph.startsWith('### ')) {
      return (
        <h4 key={index} className="text-white font-semibold text-lg mt-6 mb-3">
          {paragraph.replace('### ', '')}
        </h4>
      )
    }

    // Handle list items
    if (paragraph.startsWith('- ')) {
      const items = paragraph.split('\n').filter((line) => line.startsWith('- '))
      return (
        <ul key={index} className="space-y-2 mb-4">
          {items.map((item, k) => (
            <li key={k} className="flex items-start gap-2 text-slate-300">
              <span className="text-indigo-400 mt-1">•</span>
              <span>{item.replace('- ', '')}</span>
            </li>
          ))}
        </ul>
      )
    }

    // Handle numbered lists
    if (/^\d+\.\s/.test(paragraph)) {
      const items = paragraph.split('\n').filter((line) => /^\d+\.\s/.test(line))
      return (
        <ol key={index} className="space-y-2 mb-4 list-decimal list-inside">
          {items.map((item, k) => (
            <li key={k} className="text-slate-300 leading-relaxed">
              {item.replace(/^\d+\.\s/, '')}
            </li>
          ))}
        </ol>
      )
    }

    // Check if any terms should be highlighted
    let processedText: React.ReactNode = paragraph
    if (terms && terms.length > 0) {
      // Highlight first occurrence of each term
      const termToHighlight = terms.find((t) => paragraph.toLowerCase().includes(t.term.toLowerCase()))
      if (termToHighlight) {
        const regex = new RegExp(`(${termToHighlight.term})`, 'i')
        const parts = paragraph.split(regex)
        if (parts.length > 1) {
          processedText = parts.map((part, i) =>
            part.toLowerCase() === termToHighlight.term.toLowerCase() ? (
              <TermTooltip key={i} term={termToHighlight.term} definition={termToHighlight.definition}>
                {part}
              </TermTooltip>
            ) : (
              part
            )
          )
        }
      }
    }

    return (
      <p key={index} className="text-slate-300 leading-relaxed mb-4">
        {processedText}
      </p>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Link */}
      <Link
        href="/reports"
        className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors print:hidden"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        All Reports
      </Link>

      {/* Report Header */}
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-800/30 border border-slate-700/50 rounded-2xl p-6 mb-8">
        <div className="flex items-start gap-5">
          <div
            className={`w-16 h-16 rounded-xl bg-gradient-to-br ${reportDef?.gradient || 'from-indigo-500 to-purple-600'} flex items-center justify-center text-3xl shadow-lg flex-shrink-0`}
          >
            {reportDef?.icon || '?'}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white mb-1">{report.title}</h1>
            <p className="text-slate-400">
              Generated for {report.userName}
              {report.partnerName && ` & ${report.partnerName}`}
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-slate-500">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {new Date(report.generatedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                {report.wordCount.toLocaleString()} words
              </div>
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">*</span>
                {report.birthData.sunSign} Sun
              </div>
              <div className="flex items-center gap-1">
                <span className="text-slate-400">*</span>
                {report.birthData.moonSign} Moon
              </div>
              <div className="flex items-center gap-1">
                <span className="text-purple-400">*</span>
                {report.birthData.risingSign} Rising
              </div>
            </div>
          </div>
          <div className="flex gap-2 print:hidden">
            <button
              onClick={() => window.print()}
              className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
              title="Print report"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                />
              </svg>
            </button>
            <button
              onClick={() => setShowGlossary(!showGlossary)}
              className={`p-2 rounded-lg transition-colors ${showGlossary ? 'bg-indigo-600 text-white' : 'bg-slate-700 hover:bg-slate-600 text-white'}`}
              title="Glossary"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* AI Explain Banner */}
      <AIExplainBanner />

      {/* Summary Card */}
      <ReportSummaryCard
        headline={report.summary.headline}
        overview={report.summary.overview}
        keyStrengths={report.summary.keyStrengths}
        growthAreas={report.summary.growthAreas}
      />

      {/* Main Visuals Grid */}
      {report.visuals.length > 0 && (
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {report.visuals.map((visual, i) => (
            <div key={i}>{renderVisual(visual)}</div>
          ))}
        </div>
      )}

      {/* Glossary Sidebar */}
      {showGlossary && (
        <div className="fixed right-4 top-24 bottom-4 w-80 bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl z-50 overflow-hidden print:hidden">
          <div className="p-4 border-b border-slate-700 flex items-center justify-between">
            <h3 className="text-white font-semibold">Astrology Glossary</h3>
            <button onClick={() => setShowGlossary(false)} className="text-slate-400 hover:text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="p-4 overflow-y-auto h-[calc(100%-60px)]">
            <div className="space-y-3">
              {report.glossary.map((item, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    activeGlossaryTerm === item.term ? 'bg-indigo-500/20 border border-indigo-500/50' : 'bg-slate-700/50 hover:bg-slate-700'
                  }`}
                  onClick={() => setActiveGlossaryTerm(activeGlossaryTerm === item.term ? null : item.term)}
                >
                  <div className="text-white font-medium text-sm">{item.term}</div>
                  <div
                    className={`text-slate-400 text-xs mt-1 ${
                      activeGlossaryTerm === item.term ? '' : 'line-clamp-2'
                    }`}
                  >
                    {item.definition}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Table of Contents */}
      <div className="mb-8 print:hidden">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => setShowTableOfContents(!showTableOfContents)}
            className="flex items-center gap-2 text-white font-medium"
          >
            <svg
              className={`w-4 h-4 transition-transform ${showTableOfContents ? 'rotate-90' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            Table of Contents
          </button>
          <div className="flex gap-2">
            <button onClick={expandAll} className="text-xs text-indigo-400 hover:text-indigo-300">
              Expand All
            </button>
            <span className="text-slate-600">|</span>
            <button onClick={collapseAll} className="text-xs text-indigo-400 hover:text-indigo-300">
              Collapse All
            </button>
          </div>
        </div>
        {showTableOfContents && (
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4">
            <div className="grid md:grid-cols-2 gap-2">
              {report.sections.map((section, i) => (
                <button
                  key={section.id}
                  onClick={() => {
                    if (!expandedSections.has(section.id)) {
                      toggleSection(section.id)
                    }
                    document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="flex items-center gap-3 text-left text-sm text-slate-300 hover:text-white p-2 rounded-lg hover:bg-slate-700/50 transition-colors"
                >
                  <span className="w-6 h-6 flex items-center justify-center bg-indigo-500/20 text-indigo-400 rounded text-xs font-medium">
                    {i + 1}
                  </span>
                  <span className="flex items-center gap-2">
                    {section.icon && <span>{section.icon}</span>}
                    {section.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Report Content */}
      <AIExplainWrapper reportContext={`${report.title} astrology report for ${report.userName}`}>
        <div className="space-y-6 print:space-y-4">
          {report.sections.map((section, i) => (
            <div
              key={section.id}
              id={section.id}
              className="bg-slate-800/30 border border-slate-700/50 rounded-2xl overflow-hidden print:break-inside-avoid"
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-800/50 transition-colors print:pointer-events-none"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 flex items-center justify-center bg-indigo-500/20 text-indigo-400 rounded-lg text-sm font-medium">
                    {i + 1}
                  </span>
                  {section.icon && <span className="text-xl">{section.icon}</span>}
                  <h2 className="text-lg font-semibold text-white">{section.title}</h2>
                </div>
                <svg
                  className={`w-5 h-5 text-slate-400 transition-transform print:hidden ${
                    expandedSections.has(section.id) ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div
                className={`px-6 pb-6 print:block ${expandedSections.has(section.id) ? 'block' : 'hidden'}`}
              >
                {section.subsections.map((subsection, j) => (
                  <div key={j} className="mb-8 last:mb-0">
                    {subsection.title && (
                      <h3 className="text-white font-medium text-lg mb-4 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                        {subsection.title}
                      </h3>
                    )}

                    <div className="prose prose-invert prose-slate max-w-none">
                      {renderContentWithTerms(subsection.content, subsection.terms)}
                    </div>

                    {/* Subsection Visual */}
                    {subsection.visual && <div className="mt-6">{renderVisual(subsection.visual)}</div>}

                    {/* Subsection Tip */}
                    {subsection.tip && <ReportTip>{subsection.tip}</ReportTip>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </AIExplainWrapper>

      {/* Glossary Section (Print Version) */}
      <div className="hidden print:block mt-8 pt-8 border-t border-slate-700">
        <h2 className="text-xl font-bold text-white mb-4">Glossary of Terms</h2>
        <div className="grid grid-cols-2 gap-4">
          {report.glossary.map((item, i) => (
            <div key={i} className="text-sm">
              <span className="font-medium text-white">{item.term}:</span>{' '}
              <span className="text-slate-400">{item.definition}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 pt-8 border-t border-slate-700/50 text-center print:hidden">
        <p className="text-slate-500 text-sm mb-4">
          This report was generated based on your unique birth chart data. Each insight is personalized to
          your specific planetary positions.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/reports"
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Browse More Reports
          </Link>
          <Link
            href="/dashboard"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body {
            background: white !important;
            color: black !important;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:block {
            display: block !important;
          }
          header,
          nav,
          footer {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}
