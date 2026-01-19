'use client'

/**
 * Reports Listing Page
 *
 * Displays available reports for purchase with descriptions and pricing.
 * Includes bundle option and gift feature.
 */

import { useState } from 'react'
import Link from 'next/link'
import { reportsList } from '@/lib/reports'
import { ReportIcon, ConstellationIcon, StarIcon, ZodiacWheelIcon } from '@/components/ui/astrology-icons'

const BUNDLE_PRICE = 49
const BUNDLE_SAVINGS = 87 - 49 // £29 + £29 + £29 = £87

export default function ReportsPage() {
  const [showGiftModal, setShowGiftModal] = useState(false)
  const [selectedGiftReport, setSelectedGiftReport] = useState<string | null>(null)
  const [giftForm, setGiftForm] = useState({
    recipientName: '',
    recipientEmail: '',
    senderName: '',
    personalMessage: '',
  })
  const [giftSubmitting, setGiftSubmitting] = useState(false)
  const [giftSuccess, setGiftSuccess] = useState(false)

  const handleGiftClick = (slug: string) => {
    setSelectedGiftReport(slug)
    setShowGiftModal(true)
  }

  const handleGiftSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setGiftSubmitting(true)

    // TODO: Implement actual gift purchase with Stripe
    // For now, simulate the process
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Store gift info (would normally go to database)
    const giftData = {
      reportSlug: selectedGiftReport,
      ...giftForm,
      purchasedAt: new Date().toISOString(),
    }
    console.log('Gift purchased:', giftData)

    setGiftSubmitting(false)
    setGiftSuccess(true)
  }

  const closeGiftModal = () => {
    setShowGiftModal(false)
    setSelectedGiftReport(null)
    setGiftSuccess(false)
    setGiftForm({
      recipientName: '',
      recipientEmail: '',
      senderName: '',
      personalMessage: '',
    })
  }

  const selectedReport = reportsList.find((r) => r.slug === selectedGiftReport)

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-indigo-500/10 text-indigo-300 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
          <ZodiacWheelIcon size={16} />
          Personalized Reports
        </div>
        <h1 className="text-3xl font-bold text-white mb-3">Deep dive into your cosmic blueprint</h1>
        <p className="text-indigo-200/60 max-w-xl mx-auto">
          Comprehensive, personalized reports based on your unique birth chart. Each report is generated
          instantly and tailored specifically to you.
        </p>
      </div>

      {/* Bundle Offer */}
      <div className="mb-8 bg-gradient-to-r from-amber-500/5 via-orange-500/5 to-rose-500/5 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-amber-500/90 text-black text-xs font-bold px-3 py-1 rounded-bl-lg">
          BEST VALUE
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex -space-x-2">
                {reportsList.map((report) => (
                  <div
                    key={report.slug}
                    className={`w-10 h-10 rounded-lg bg-gradient-to-br ${report.gradient} flex items-center justify-center border-2 border-[#1a1a2e]`}
                  >
                    <ReportIcon type={report.slug} size={20} className="text-white" />
                  </div>
                ))}
              </div>
              <h2 className="text-xl font-bold text-white">Complete Report Bundle</h2>
            </div>
            <p className="text-indigo-200/70 mb-3">
              Get all 3 reports and unlock the complete picture of your cosmic blueprint. Includes
              Personality Deep Dive, Relationship Compatibility, and Year Ahead Forecast.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1 text-emerald-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                12,000+ words of insights
              </div>
              <div className="flex items-center gap-1 text-emerald-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Save £{BUNDLE_SAVINGS}
              </div>
            </div>
          </div>
          <div className="text-center md:text-right flex-shrink-0">
            <div className="flex items-baseline gap-2 justify-center md:justify-end">
              <span className="text-indigo-300/50 line-through text-lg">£87</span>
              <span className="text-4xl font-bold text-white">£{BUNDLE_PRICE}</span>
            </div>
            <p className="text-amber-400 text-sm font-medium mb-3">Save 44%</p>
            <Link
              href="/reports/bundle"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-semibold rounded-xl transition-all shadow-lg shadow-amber-500/20"
            >
              Get All 3 Reports
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
        {reportsList.map((report) => (
          <div
            key={report.slug}
            className="group bg-indigo-950/30 rounded-2xl p-6 hover:bg-indigo-900/30 transition-all"
          >
            {/* Icon & Badge */}
            <div className="flex items-start justify-between mb-4">
              <div
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${report.gradient} flex items-center justify-center shadow-lg`}
              >
                <ReportIcon type={report.slug} size={28} className="text-white" />
              </div>
              {report.requiresPartner && (
                <span className="text-xs bg-pink-500/20 text-pink-300 px-2 py-1 rounded-full">
                  Requires partner details
                </span>
              )}
            </div>

            {/* Title & Description */}
            <Link href={`/reports/${report.slug}`}>
              <h2 className="text-xl font-semibold text-white mb-1 group-hover:text-indigo-300 transition-colors">
                {report.title}
              </h2>
            </Link>
            <p className="text-indigo-200/50 text-sm mb-4">{report.subtitle}</p>

            {/* Meta Info */}
            <div className="flex items-center gap-4 text-xs text-indigo-300/40 mb-4">
              <div className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                <StarIcon size={14} />
                {report.deliveryTime}
              </div>
            </div>

            {/* Features Preview */}
            <ul className="space-y-1.5 mb-5">
              {report.features.slice(0, 4).map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-indigo-200/70">
                  <svg
                    className="w-4 h-4 text-indigo-400 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
              {report.features.length > 4 && (
                <li className="text-sm text-indigo-300/40 pl-6">+ {report.features.length - 4} more...</li>
              )}
            </ul>

            {/* Price & Actions */}
            <div className="pt-4 border-t border-indigo-500/10">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="text-2xl font-bold text-white">£{report.price}</span>
                  <span className="text-indigo-300/40 text-sm ml-1">one-time</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/reports/${report.slug}`}
                  className="flex-1 py-2 px-4 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors text-center"
                >
                  Get Report
                </Link>
                <button
                  onClick={() => handleGiftClick(report.slug)}
                  className="py-2 px-3 bg-indigo-900/50 hover:bg-indigo-800/50 text-indigo-200 rounded-lg transition-colors"
                  title="Gift this report"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Gift a Report Section */}
      <div className="mb-8 bg-gradient-to-r from-pink-500/5 via-rose-500/5 to-red-500/5 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-pink-500/10 rounded-xl flex items-center justify-center">
              <svg className="w-7 h-7 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Gift a Report</h3>
              <p className="text-indigo-200/50 text-sm">
                Know someone who would love a personalized astrology report? Send them a gift they&apos;ll
                treasure.
              </p>
            </div>
          </div>
          <p className="text-indigo-200/60 text-sm">
            Click the gift icon on any report to send it to a friend. They&apos;ll receive an email with
            instructions to claim their report.
          </p>
        </div>
      </div>

      {/* Trust Section */}
      <div className="bg-indigo-950/20 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4 text-center">Why choose our reports?</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <ConstellationIcon size={24} className="text-indigo-400" />
            </div>
            <h4 className="text-white font-medium mb-1">Deeply Personalized</h4>
            <p className="text-indigo-200/50 text-sm">Generated from your exact birth chart, not generic sun sign content</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <StarIcon size={24} className="text-emerald-400" />
            </div>
            <h4 className="text-white font-medium mb-1">Instant Delivery</h4>
            <p className="text-indigo-200/50 text-sm">Your report is generated immediately after purchase</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h4 className="text-white font-medium mb-1">In-Depth Analysis</h4>
            <p className="text-indigo-200/50 text-sm">4,000-5,000 words of comprehensive astrological insight</p>
          </div>
        </div>
      </div>

      {/* Lifetime Access Banner */}
      <div className="mt-8 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="text-white font-semibold mb-1">Have a Lifetime subscription?</h3>
            <p className="text-indigo-200/50 text-sm">
              Lifetime members get 1 free report included with their subscription.
            </p>
          </div>
          <Link
            href="/settings"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Check your subscription
          </Link>
        </div>
      </div>

      {/* Gift Modal */}
      {showGiftModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#1e1e3a] border border-indigo-500/20 rounded-2xl max-w-md w-full p-6 relative">
            <button
              onClick={closeGiftModal}
              className="absolute top-4 right-4 text-indigo-300/50 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {giftSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Gift Sent!</h3>
                <p className="text-indigo-200/60 mb-6">
                  We&apos;ve sent an email to {giftForm.recipientEmail} with instructions on how to claim their
                  report.
                </p>
                <button
                  onClick={closeGiftModal}
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Gift a Report</h3>
                    <p className="text-indigo-200/50 text-sm">{selectedReport?.title}</p>
                  </div>
                </div>

                <form onSubmit={handleGiftSubmit} className="space-y-4">
                  <div>
                    <label className="block text-indigo-200/70 text-sm mb-1">Recipient&apos;s name</label>
                    <input
                      type="text"
                      required
                      value={giftForm.recipientName}
                      onChange={(e) => setGiftForm({ ...giftForm, recipientName: e.target.value })}
                      placeholder="Their name"
                      className="w-full px-3 py-2 bg-indigo-950/50 border border-indigo-500/20 rounded-lg text-white text-sm placeholder-indigo-300/30 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-indigo-200/70 text-sm mb-1">Recipient&apos;s email</label>
                    <input
                      type="email"
                      required
                      value={giftForm.recipientEmail}
                      onChange={(e) => setGiftForm({ ...giftForm, recipientEmail: e.target.value })}
                      placeholder="their@email.com"
                      className="w-full px-3 py-2 bg-indigo-950/50 border border-indigo-500/20 rounded-lg text-white text-sm placeholder-indigo-300/30 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-indigo-200/70 text-sm mb-1">Your name</label>
                    <input
                      type="text"
                      required
                      value={giftForm.senderName}
                      onChange={(e) => setGiftForm({ ...giftForm, senderName: e.target.value })}
                      placeholder="Your name"
                      className="w-full px-3 py-2 bg-indigo-950/50 border border-indigo-500/20 rounded-lg text-white text-sm placeholder-indigo-300/30 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-indigo-200/70 text-sm mb-1">Personal message (optional)</label>
                    <textarea
                      value={giftForm.personalMessage}
                      onChange={(e) => setGiftForm({ ...giftForm, personalMessage: e.target.value })}
                      placeholder="Add a personal note to include with the gift..."
                      rows={3}
                      className="w-full px-3 py-2 bg-indigo-950/50 border border-indigo-500/20 rounded-lg text-white text-sm placeholder-indigo-300/30 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-indigo-500/10">
                    <div>
                      <span className="text-2xl font-bold text-white">£{selectedReport?.price}</span>
                    </div>
                    <button
                      type="submit"
                      disabled={giftSubmitting}
                      className="px-6 py-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 disabled:opacity-50 text-white font-medium rounded-lg transition-all"
                    >
                      {giftSubmitting ? (
                        <span className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        'Send Gift'
                      )}
                    </button>
                  </div>
                </form>

                <p className="text-indigo-300/40 text-xs mt-4 text-center">
                  They&apos;ll receive an email inviting them to create an account and claim their personalized
                  report.
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
