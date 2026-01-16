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
import type { NatalChart, ReportSlug } from '@/types'
import {
  ElementBalance,
  ModalityBalance,
  MiniChartWheel,
  HouseEmphasis,
  TermTooltip,
  ReportTip,
  ReportSummaryCard,
} from '@/components/reports/report-visuals'

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

  useEffect(() => {
    const reportDef = getReportBySlug(slug)
    if (!reportDef) {
      notFound()
    }

    // Check for pending report purchase
    const pendingReport = sessionStorage.getItem('pending-report')
    const chartData = sessionStorage.getItem('natal-chart')

    if (!chartData) {
      router.push(`/reports/${slug}`)
      return
    }

    const chart = JSON.parse(chartData) as NatalChart

    // Generate the report
    try {
      let generatedReport: GeneratedReportV2

      if (reportDef.requiresPartner && pendingReport) {
        const { partnerData } = JSON.parse(pendingReport)
        // For demo, create a simple partner chart based on their birth date
        const partnerChart: NatalChart = {
          user_id: 'partner',
          calculated_at: new Date(),
          placements: [
            { planet: 'sun', sign: 'libra', degree: 15, house: 7, is_retrograde: false },
            { planet: 'moon', sign: 'pisces', degree: 22, house: 12, is_retrograde: false },
            { planet: 'mercury', sign: 'virgo', degree: 8, house: 6, is_retrograde: false },
            { planet: 'venus', sign: 'leo', degree: 20, house: 5, is_retrograde: false },
            { planet: 'mars', sign: 'scorpio', degree: 5, house: 8, is_retrograde: false },
          ],
          houses: [],
          ascendant: { sign: 'libra', degree: 15 },
          midheaven: { sign: 'cancer', degree: 10 },
        }
        generatedReport = generateReportV2(slug, chart, 'You', partnerChart, partnerData?.name || 'Your Partner')
      } else {
        generatedReport = generateReportV2(slug, chart, 'You')
      }

      setReport(generatedReport)
      // Expand all sections by default
      setExpandedSections(new Set(generatedReport.sections.map((s) => s.id)))

      // Clear the pending report
      sessionStorage.removeItem('pending-report')
    } catch (error) {
      console.error('Failed to generate report:', error)
      router.push(`/reports/${slug}`)
    } finally {
      setLoading(false)
    }
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
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
          <h2 className="text-xl font-semibold text-white mb-2">Generating your report...</h2>
          <p className="text-slate-400">Analyzing your birth chart and creating personalized insights</p>
          <div className="mt-6 max-w-xs mx-auto">
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 rounded-full animate-pulse" style={{ width: '60%' }} />
            </div>
            <p className="text-xs text-slate-500 mt-2">This may take a moment...</p>
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
      case 'house-emphasis':
        // Convert string keys to number keys for house emphasis
        const houseData: Record<number, number> = {}
        Object.entries(visual.data).forEach(([key, value]) => {
          const houseNum = parseInt(key)
          if (!isNaN(houseNum) && typeof value === 'number') {
            houseData[houseNum] = value
          }
        })
        return <HouseEmphasis data={houseData} title={visual.title} />
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
