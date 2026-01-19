'use client'

/**
 * Bundle Purchase Page
 *
 * Supports two bundle types:
 * - Pick 3: User selects any 3 reports for £59
 * - All 6: User gets all 6 reports for £89
 */

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { reportsList } from '@/lib/reports'
import { ReportIcon } from '@/components/ui/astrology-icons'
import { StatsBar } from '@/components/social-proof/stats-bar'
import { TestimonialCard } from '@/components/social-proof/testimonial-card'
import { getTestimonialsByFeature } from '@/components/social-proof/testimonials-data'

const PICK_3_PRICE = 59
const PICK_3_ORIGINAL = 87 // £29 x 3
const ALL_6_PRICE = 89
const ALL_6_ORIGINAL = 174 // £29 x 6

// Filter out free reports (like monthly forecast)
const paidReports = reportsList.filter(r => r.price > 0)

export default function BundlePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const bundleType = searchParams.get('type') || 'pick3'

  const [loading, setLoading] = useState(false)
  const [hasChart, setHasChart] = useState(false)
  const [selectedReports, setSelectedReports] = useState<string[]>([])
  const [partnerName, setPartnerName] = useState('')
  const [partnerBirthDate, setPartnerBirthDate] = useState('')
  const [partnerBirthTime, setPartnerBirthTime] = useState('')
  const [partnerBirthPlace, setPartnerBirthPlace] = useState('')

  const isAll6 = bundleType === 'all6'
  const bundlePrice = isAll6 ? ALL_6_PRICE : PICK_3_PRICE
  const originalPrice = isAll6 ? ALL_6_ORIGINAL : PICK_3_ORIGINAL
  const maxReports = isAll6 ? 6 : 3

  // Check if any selected report requires partner data
  const requiresPartner = isAll6
    ? paidReports.some(r => r.requiresPartner)
    : selectedReports.some(slug => paidReports.find(r => r.slug === slug)?.requiresPartner)

  useEffect(() => {
    const chartData = sessionStorage.getItem('natal-chart')
    setHasChart(!!chartData)

    // If All 6, automatically select all reports
    if (isAll6) {
      setSelectedReports(paidReports.map(r => r.slug))
    }
  }, [isAll6])

  const toggleReport = (slug: string) => {
    if (isAll6) return // Can't toggle in All 6 mode

    setSelectedReports(prev => {
      if (prev.includes(slug)) {
        return prev.filter(s => s !== slug)
      }
      if (prev.length >= 3) {
        return prev // Can't select more than 3
      }
      return [...prev, slug]
    })
  }

  const handlePurchase = async () => {
    if (!hasChart) {
      router.push('/birth-details')
      return
    }

    if (!isAll6 && selectedReports.length < 3) {
      return
    }

    if (requiresPartner && (!partnerName || !partnerBirthDate || !partnerBirthPlace)) {
      return
    }

    setLoading(true)

    // TODO: Implement Stripe checkout
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Store bundle purchase info
    const purchaseData = {
      type: isAll6 ? 'all6-bundle' : 'pick3-bundle',
      reports: isAll6 ? paidReports.map(r => r.slug) : selectedReports,
      purchasedAt: new Date().toISOString(),
      partnerData: requiresPartner ? {
        name: partnerName,
        birthDate: partnerBirthDate,
        birthTime: partnerBirthTime,
        birthPlace: partnerBirthPlace,
      } : null,
    }
    sessionStorage.setItem('pending-bundle', JSON.stringify(purchaseData))

    // Redirect to first report
    const firstReport = isAll6 ? paidReports[0].slug : selectedReports[0]
    sessionStorage.setItem(
      'pending-report',
      JSON.stringify({
        reportSlug: firstReport,
        purchasedAt: new Date().toISOString(),
        partnerData: purchaseData.partnerData,
      })
    )
    router.push(`/reports/${firstReport}/view`)
  }

  const canPurchase = hasChart &&
    (isAll6 || selectedReports.length === 3) &&
    (!requiresPartner || (partnerName && partnerBirthDate && partnerBirthPlace))

  return (
    <div className="max-w-3xl mx-auto">
      {/* Back Link */}
      <Link
        href="/reports"
        className="inline-flex items-center gap-2 text-indigo-200/50 hover:text-white mb-6 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        All Reports
      </Link>

      {/* Header */}
      <div className={`bg-gradient-to-r ${isAll6 ? 'from-purple-500/5 via-indigo-500/5 to-blue-500/5' : 'from-amber-500/5 via-orange-500/5 to-rose-500/5'} rounded-2xl p-8 mb-8 relative overflow-hidden`}>
        <div className={`absolute top-0 right-0 ${isAll6 ? 'bg-purple-500/90 text-white' : 'bg-amber-500/90 text-black'} text-sm font-bold px-4 py-1 rounded-bl-xl`}>
          SAVE £{originalPrice - bundlePrice}
        </div>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex -space-x-3">
            {(isAll6 ? paidReports.slice(0, 4) : paidReports.slice(0, 3)).map((report) => (
              <div
                key={report.slug}
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${report.gradient} flex items-center justify-center border-2 border-[#1a1a2e] shadow-lg`}
              >
                <ReportIcon type={report.slug} size={28} className="text-white" />
              </div>
            ))}
            {isAll6 && (
              <div className="w-14 h-14 rounded-xl bg-indigo-600/50 flex items-center justify-center border-2 border-[#1a1a2e] text-white font-bold">
                +2
              </div>
            )}
          </div>
        </div>

        <h1 className="text-3xl font-bold text-white mb-2">
          {isAll6 ? 'Complete Report Collection' : 'Pick Any 3 Reports'}
        </h1>
        <p className="text-indigo-200/70 text-lg mb-4">
          {isAll6
            ? 'Get all 6 premium reports for the ultimate cosmic deep dive. 27,000+ words of personalized insights.'
            : 'Choose any 3 reports from our collection to create your perfect cosmic reading package.'
          }
        </p>

        <div className="flex items-baseline gap-3">
          <span className="text-indigo-300/40 line-through text-2xl">£{originalPrice}</span>
          <span className="text-5xl font-bold text-white">£{bundlePrice}</span>
          <span className={`${isAll6 ? 'text-purple-400' : 'text-amber-400'} font-medium`}>
            Save {Math.round((1 - bundlePrice / originalPrice) * 100)}%
          </span>
        </div>
      </div>

      {/* Bundle Type Toggle */}
      <div className="bg-indigo-950/30 rounded-xl p-2 mb-8 flex">
        <Link
          href="/reports/bundle?type=pick3"
          className={`flex-1 py-2 px-4 rounded-lg text-center font-medium transition-all ${
            !isAll6
              ? 'bg-indigo-600 text-white'
              : 'text-indigo-200/70 hover:text-white'
          }`}
        >
          Pick Any 3 - £{PICK_3_PRICE}
        </Link>
        <Link
          href="/reports/bundle?type=all6"
          className={`flex-1 py-2 px-4 rounded-lg text-center font-medium transition-all ${
            isAll6
              ? 'bg-purple-600 text-white'
              : 'text-indigo-200/70 hover:text-white'
          }`}
        >
          All 6 Reports - £{ALL_6_PRICE}
        </Link>
      </div>

      {/* Report Selection (Pick 3 only) */}
      {!isAll6 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Select your 3 reports</h2>
            <span className={`text-sm font-medium ${selectedReports.length === 3 ? 'text-emerald-400' : 'text-indigo-300/60'}`}>
              {selectedReports.length}/3 selected
            </span>
          </div>

          <div className="space-y-3">
            {paidReports.map((report) => {
              const isSelected = selectedReports.includes(report.slug)
              const isDisabled = !isSelected && selectedReports.length >= 3

              return (
                <button
                  key={report.slug}
                  onClick={() => toggleReport(report.slug)}
                  disabled={isDisabled}
                  className={`w-full bg-indigo-950/30 rounded-xl p-5 flex items-start gap-4 text-left transition-all ${
                    isSelected
                      ? 'ring-2 ring-amber-500/50 bg-amber-500/5'
                      : isDisabled
                      ? 'opacity-40 cursor-not-allowed'
                      : 'hover:bg-indigo-950/50'
                  }`}
                >
                  {/* Checkbox */}
                  <div
                    className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                      isSelected
                        ? 'border-amber-500 bg-amber-500'
                        : 'border-indigo-500/30'
                    }`}
                  >
                    {isSelected && (
                      <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>

                  {/* Report Icon */}
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${report.gradient} flex items-center justify-center flex-shrink-0`}
                  >
                    <ReportIcon type={report.slug} size={24} className="text-white" />
                  </div>

                  {/* Report Info */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-white font-medium">{report.title}</h3>
                      <span className="text-indigo-300/40 text-sm">£{report.price} value</span>
                    </div>
                    <p className="text-indigo-200/50 text-sm mb-2">{report.subtitle}</p>
                    <div className="flex items-center gap-3 text-xs text-indigo-300/40">
                      <span>{report.wordCount}</span>
                      <span>•</span>
                      <span>{report.deliveryTime}</span>
                      {report.requiresPartner && (
                        <>
                          <span>•</span>
                          <span className="text-pink-400">Requires partner details</span>
                        </>
                      )}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* What's Included (All 6 only) */}
      {isAll6 && (
        <div className="space-y-4 mb-8">
          <h2 className="text-xl font-semibold text-white">What&apos;s included</h2>

          {paidReports.map((report) => (
            <div
              key={report.slug}
              className="bg-indigo-950/30 rounded-xl p-5 flex items-start gap-4"
            >
              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-br ${report.gradient} flex items-center justify-center flex-shrink-0`}
              >
                <ReportIcon type={report.slug} size={24} className="text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-white font-medium">{report.title}</h3>
                  <span className="text-indigo-300/40 text-sm">£{report.price} value</span>
                </div>
                <p className="text-indigo-200/50 text-sm mb-2">{report.subtitle}</p>
                <div className="flex items-center gap-3 text-xs text-indigo-300/40">
                  <span>{report.wordCount}</span>
                  <span>•</span>
                  <span>{report.deliveryTime}</span>
                  {report.requiresPartner && (
                    <>
                      <span>•</span>
                      <span className="text-pink-400">Requires partner details</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Total Value */}
      <div className="bg-emerald-500/10 rounded-xl p-4 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-emerald-400 font-medium">Total value: £{originalPrice}</p>
            <p className="text-indigo-200/50 text-sm">
              {isAll6 ? 'Over 27,000 words of personalized insights' : 'Over 12,000 words of personalized insights'}
            </p>
          </div>
          <div className="text-right">
            <p className="text-white font-bold text-xl">You pay: £{bundlePrice}</p>
            <p className="text-emerald-400 text-sm">You save: £{originalPrice - bundlePrice}</p>
          </div>
        </div>
      </div>

      {/* Partner Details (if required) */}
      {requiresPartner && (
        <div className="bg-indigo-950/30 rounded-xl p-6 mb-8">
          <h3 className="text-white font-semibold mb-2">Partner&apos;s birth details</h3>
          <p className="text-indigo-200/50 text-sm mb-4">
            Required for compatibility reports. We&apos;ll compare your chart with theirs.
          </p>

          {!hasChart ? (
            <div className="bg-amber-500/10 rounded-xl p-4 mb-4">
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
                className="w-full px-4 py-3 bg-indigo-950/50 border border-indigo-500/20 rounded-lg text-white placeholder-indigo-300/40 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-indigo-200/50 text-xs mb-1">Date of birth</label>
                  <input
                    type="date"
                    value={partnerBirthDate}
                    onChange={(e) => setPartnerBirthDate(e.target.value)}
                    className="w-full px-4 py-3 bg-indigo-950/50 border border-indigo-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 [color-scheme:dark]"
                  />
                </div>
                <div>
                  <label className="block text-indigo-200/50 text-xs mb-1">Time of birth (optional)</label>
                  <input
                    type="time"
                    value={partnerBirthTime}
                    onChange={(e) => setPartnerBirthTime(e.target.value)}
                    className="w-full px-4 py-3 bg-indigo-950/50 border border-indigo-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 [color-scheme:dark]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-indigo-200/50 text-xs mb-1">Place of birth</label>
                <input
                  type="text"
                  value={partnerBirthPlace}
                  onChange={(e) => setPartnerBirthPlace(e.target.value)}
                  placeholder="City, Country"
                  className="w-full px-4 py-3 bg-indigo-950/50 border border-indigo-500/20 rounded-lg text-white placeholder-indigo-300/40 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* CTA */}
      <button
        onClick={handlePurchase}
        disabled={loading || !canPurchase}
        className={`w-full py-4 px-6 ${
          isAll6
            ? 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 shadow-purple-500/20'
            : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 shadow-amber-500/20'
        } disabled:opacity-50 disabled:cursor-not-allowed text-${isAll6 ? 'white' : 'black'} font-bold text-lg rounded-xl transition-all shadow-lg`}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <div className={`w-5 h-5 border-2 ${isAll6 ? 'border-white/30 border-t-white' : 'border-black/30 border-t-black'} rounded-full animate-spin`} />
            Processing...
          </span>
        ) : !hasChart ? (
          'Add birth details first'
        ) : !isAll6 && selectedReports.length < 3 ? (
          `Select ${3 - selectedReports.length} more report${3 - selectedReports.length > 1 ? 's' : ''}`
        ) : (
          `Get ${isAll6 ? 'All 6' : '3'} Reports - £${bundlePrice}`
        )}
      </button>

      {/* Social Proof */}
      <div className="mt-6 mb-6">
        <StatsBar variant="minimal" />
      </div>

      {/* Featured Review */}
      <div className="mb-6">
        <TestimonialCard
          testimonial={getTestimonialsByFeature('reports')[0]}
          variant="compact"
        />
      </div>

      {/* Trust Signals */}
      <div className="mt-6 flex items-center justify-center gap-6 text-indigo-300/40 text-sm">
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
