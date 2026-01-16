'use client'

/**
 * Bundle Purchase Page
 *
 * Allows users to purchase all 3 reports at a discounted price.
 */

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { reportsList } from '@/lib/reports'

const BUNDLE_PRICE = 59
const ORIGINAL_PRICE = 103 // £29 + £39 + £35

export default function BundlePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [hasChart, setHasChart] = useState(false)
  const [partnerName, setPartnerName] = useState('')
  const [partnerBirthDate, setPartnerBirthDate] = useState('')
  const [partnerBirthTime, setPartnerBirthTime] = useState('')
  const [partnerBirthPlace, setPartnerBirthPlace] = useState('')

  useEffect(() => {
    const chartData = sessionStorage.getItem('natal-chart')
    setHasChart(!!chartData)
  }, [])

  const handlePurchase = async () => {
    if (!hasChart) {
      router.push('/birth-details')
      return
    }

    if (!partnerName || !partnerBirthDate || !partnerBirthPlace) {
      return
    }

    setLoading(true)

    // TODO: Implement Stripe checkout
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Store bundle purchase info
    const purchaseData = {
      type: 'bundle',
      reports: ['personality-deep-dive', 'relationship-compatibility', 'year-ahead-forecast'],
      purchasedAt: new Date().toISOString(),
      partnerData: {
        name: partnerName,
        birthDate: partnerBirthDate,
        birthTime: partnerBirthTime,
        birthPlace: partnerBirthPlace,
      },
    }
    sessionStorage.setItem('pending-bundle', JSON.stringify(purchaseData))

    // Redirect to first report
    sessionStorage.setItem(
      'pending-report',
      JSON.stringify({
        reportSlug: 'personality-deep-dive',
        purchasedAt: new Date().toISOString(),
        partnerData: purchaseData.partnerData,
      })
    )
    router.push('/reports/personality-deep-dive/view')
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
      <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 border-2 border-amber-500/30 rounded-2xl p-8 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-amber-500 text-black text-sm font-bold px-4 py-1 rounded-bl-xl">
          SAVE £{ORIGINAL_PRICE - BUNDLE_PRICE}
        </div>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex -space-x-3">
            {reportsList.map((report) => (
              <div
                key={report.slug}
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${report.gradient} flex items-center justify-center text-2xl border-2 border-slate-900 shadow-lg`}
              >
                {report.icon}
              </div>
            ))}
          </div>
        </div>

        <h1 className="text-3xl font-bold text-white mb-2">Complete Report Bundle</h1>
        <p className="text-slate-300 text-lg mb-4">
          Get all 3 personalized astrology reports and unlock the complete picture of your cosmic blueprint.
        </p>

        <div className="flex items-baseline gap-3">
          <span className="text-slate-500 line-through text-2xl">£{ORIGINAL_PRICE}</span>
          <span className="text-5xl font-bold text-white">£{BUNDLE_PRICE}</span>
          <span className="text-amber-400 font-medium">Save 43%</span>
        </div>
      </div>

      {/* What's Included */}
      <div className="space-y-4 mb-8">
        <h2 className="text-xl font-semibold text-white">What&apos;s included</h2>

        {reportsList.map((report) => (
          <div
            key={report.slug}
            className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-5 flex items-start gap-4"
          >
            <div
              className={`w-12 h-12 rounded-lg bg-gradient-to-br ${report.gradient} flex items-center justify-center text-xl flex-shrink-0`}
            >
              {report.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-white font-medium">{report.title}</h3>
                <span className="text-slate-500 text-sm">£{report.price} value</span>
              </div>
              <p className="text-slate-400 text-sm mb-2">{report.subtitle}</p>
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span>{report.wordCount}</span>
                <span>•</span>
                <span>{report.deliveryTime}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Total Value */}
      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-emerald-400 font-medium">Total value: £{ORIGINAL_PRICE}</p>
            <p className="text-slate-400 text-sm">Over 12,000 words of personalized insights</p>
          </div>
          <div className="text-right">
            <p className="text-white font-bold text-xl">You pay: £{BUNDLE_PRICE}</p>
            <p className="text-emerald-400 text-sm">You save: £{ORIGINAL_PRICE - BUNDLE_PRICE}</p>
          </div>
        </div>
      </div>

      {/* Partner Details (Required for Relationship Report) */}
      <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 mb-8">
        <h3 className="text-white font-semibold mb-2">Partner&apos;s birth details</h3>
        <p className="text-slate-400 text-sm mb-4">
          Required for the Relationship Compatibility report. We&apos;ll compare your chart with theirs.
        </p>

        {!hasChart ? (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-4">
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <div>
                <div className="text-amber-400 font-medium text-sm">Your birth details required</div>
                <div className="text-amber-400/80 text-xs mt-1">
                  You&apos;ll need to add your birth details before purchasing.
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <input
              type="text"
              value={partnerName}
              onChange={(e) => setPartnerName(e.target.value)}
              placeholder="Partner's name"
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 text-xs mb-1">Date of birth</label>
                <input
                  type="date"
                  value={partnerBirthDate}
                  onChange={(e) => setPartnerBirthDate(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 [color-scheme:dark]"
                />
              </div>
              <div>
                <label className="block text-slate-400 text-xs mb-1">Time of birth (optional)</label>
                <input
                  type="time"
                  value={partnerBirthTime}
                  onChange={(e) => setPartnerBirthTime(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 [color-scheme:dark]"
                />
              </div>
            </div>
            <div>
              <label className="block text-slate-400 text-xs mb-1">Place of birth</label>
              <input
                type="text"
                value={partnerBirthPlace}
                onChange={(e) => setPartnerBirthPlace(e.target.value)}
                placeholder="City, Country"
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        )}
      </div>

      {/* CTA */}
      <button
        onClick={handlePurchase}
        disabled={loading || (hasChart && (!partnerName || !partnerBirthDate || !partnerBirthPlace))}
        className="w-full py-4 px-6 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold text-lg rounded-xl transition-all shadow-lg shadow-amber-500/25"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            Processing...
          </span>
        ) : !hasChart ? (
          'Add birth details first'
        ) : (
          `Get All 3 Reports - £${BUNDLE_PRICE}`
        )}
      </button>

      {/* Trust Signals */}
      <div className="mt-6 flex items-center justify-center gap-6 text-slate-500 text-sm">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          Secure payment
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Instant delivery
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          Fully personalized
        </div>
      </div>
    </div>
  )
}
