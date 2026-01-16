'use client'

/**
 * Report Detail Page
 *
 * Shows detailed information about a specific report and allows purchase.
 */

import { useState, useEffect } from 'react'
import { useParams, useRouter, notFound } from 'next/navigation'
import Link from 'next/link'
import { getReportBySlug } from '@/lib/reports'
import type { ReportDefinition, NatalChart } from '@/types'

export default function ReportDetailPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  const [report, setReport] = useState<ReportDefinition | null>(null)
  const [loading, setLoading] = useState(false)
  const [hasChart, setHasChart] = useState(false)
  const [partnerName, setPartnerName] = useState('')
  const [partnerBirthDate, setPartnerBirthDate] = useState('')
  const [partnerBirthTime, setPartnerBirthTime] = useState('')
  const [partnerBirthPlace, setPartnerBirthPlace] = useState('')

  useEffect(() => {
    const foundReport = getReportBySlug(slug)
    if (!foundReport) {
      notFound()
    }
    setReport(foundReport)

    // Check if user has birth chart
    const chartData = sessionStorage.getItem('natal-chart')
    setHasChart(!!chartData)
  }, [slug])

  const handlePurchase = async () => {
    if (!hasChart) {
      router.push('/birth-details')
      return
    }

    if (report?.requiresPartner && (!partnerName || !partnerBirthDate || !partnerBirthPlace)) {
      return
    }

    setLoading(true)

    // TODO: Implement Stripe checkout
    // For now, simulate purchase and redirect to generated report
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Store the purchase info for report generation
    const purchaseData = {
      reportSlug: slug,
      purchasedAt: new Date().toISOString(),
      partnerData: report?.requiresPartner
        ? {
            name: partnerName,
            birthDate: partnerBirthDate,
            birthTime: partnerBirthTime,
            birthPlace: partnerBirthPlace,
          }
        : null,
    }
    sessionStorage.setItem('pending-report', JSON.stringify(purchaseData))

    router.push(`/reports/${slug}/view`)
  }

  if (!report) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Back Link */}
      <Link
        href="/reports"
        className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        All Reports
      </Link>

      {/* Header */}
      <div className="flex items-start gap-5 mb-8">
        <div
          className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${report.gradient} flex items-center justify-center text-4xl shadow-lg flex-shrink-0`}
        >
          {report.icon}
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-white mb-2">{report.title}</h1>
          <p className="text-slate-400 text-lg">{report.subtitle}</p>
          <div className="flex items-center gap-4 mt-3 text-sm text-slate-500">
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              {report.wordCount}
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              {report.deliveryTime} delivery
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 mb-6">
        <p className="text-slate-300 leading-relaxed">{report.description}</p>
      </div>

      {/* Two Column Layout */}
      <div className="grid md:grid-cols-5 gap-6">
        {/* Left: Features & Sections */}
        <div className="md:col-span-3 space-y-6">
          {/* What's Included */}
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">What&apos;s included</h2>
            <ul className="space-y-3">
              {report.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Report Sections */}
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Report sections</h2>
            <div className="grid grid-cols-2 gap-2">
              {report.sampleSections.map((section, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-sm text-slate-400 py-2 px-3 bg-slate-800/50 rounded-lg"
                >
                  <span className="w-5 h-5 flex items-center justify-center bg-indigo-500/20 text-indigo-400 rounded text-xs font-medium">
                    {i + 1}
                  </span>
                  {section}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Purchase Card */}
        <div className="md:col-span-2">
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-800/30 border border-slate-700/50 rounded-2xl p-6 sticky top-8">
            {/* Price */}
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-white">£{report.price}</div>
              <div className="text-slate-500">one-time payment</div>
            </div>

            {/* Requirements */}
            {!hasChart && (
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <div className="text-amber-400 font-medium text-sm">Birth details required</div>
                    <div className="text-amber-400/80 text-xs mt-1">
                      You&apos;ll need to add your birth details before purchasing this report.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Partner Details Form */}
            {report.requiresPartner && hasChart && (
              <div className="space-y-3 mb-4">
                <h3 className="text-white font-medium text-sm">Partner&apos;s birth details</h3>
                <p className="text-slate-500 text-xs">We need your partner&apos;s birth information to calculate their chart and compare it with yours.</p>
                <input
                  type="text"
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                  placeholder="Partner's name"
                  className="w-full px-3 py-2 bg-slate-800/50 border border-slate-600 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <div>
                  <label className="block text-slate-400 text-xs mb-1">Date of birth</label>
                  <input
                    type="date"
                    value={partnerBirthDate}
                    onChange={(e) => setPartnerBirthDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800/50 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 [color-scheme:dark]"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-xs mb-1">Time of birth (if known)</label>
                  <input
                    type="time"
                    value={partnerBirthTime}
                    onChange={(e) => setPartnerBirthTime(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800/50 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 [color-scheme:dark]"
                  />
                  <p className="text-slate-500 text-xs mt-1">Optional - provides more accurate Rising sign and house placements</p>
                </div>
                <div>
                  <label className="block text-slate-400 text-xs mb-1">Place of birth</label>
                  <input
                    type="text"
                    value={partnerBirthPlace}
                    onChange={(e) => setPartnerBirthPlace(e.target.value)}
                    placeholder="City, Country"
                    className="w-full px-3 py-2 bg-slate-800/50 border border-slate-600 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            )}

            {/* CTA Button */}
            <button
              onClick={handlePurchase}
              disabled={loading || (report.requiresPartner && hasChart && (!partnerName || !partnerBirthDate || !partnerBirthPlace))}
              className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </span>
              ) : !hasChart ? (
                'Add birth details first'
              ) : (
                `Get Report - £${report.price}`
              )}
            </button>

            {/* Trust Signals */}
            <div className="mt-4 pt-4 border-t border-slate-700/50">
              <div className="flex items-center justify-center gap-4 text-slate-500 text-xs">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Secure
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Instant
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Personalized
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sample Preview */}
      <div className="mt-8 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 border border-indigo-500/20 rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-white mb-2">What makes our reports different?</h2>
        <p className="text-slate-400 mb-4">
          Unlike generic horoscope content, our reports are calculated from your exact birth chart data.
          Every insight is tailored to your unique planetary positions, aspects, and houses.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-slate-800/30 rounded-xl p-4">
            <div className="text-indigo-400 font-medium mb-1">Not sun-sign only</div>
            <p className="text-slate-500 text-sm">We analyze all planets, houses, and aspects in your chart</p>
          </div>
          <div className="bg-slate-800/30 rounded-xl p-4">
            <div className="text-purple-400 font-medium mb-1">Actionable insights</div>
            <p className="text-slate-500 text-sm">Practical guidance you can apply to your daily life</p>
          </div>
          <div className="bg-slate-800/30 rounded-xl p-4">
            <div className="text-pink-400 font-medium mb-1">Growth-focused</div>
            <p className="text-slate-500 text-sm">Emphasis on self-improvement and understanding</p>
          </div>
        </div>
      </div>
    </div>
  )
}
