'use client'

/**
 * Report Purchase Success Page
 *
 * Shown after successful report/bundle purchase.
 * Displays purchased reports and allows user to generate them.
 */

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { reportsList } from '@/lib/reports'
import { ReportIcon } from '@/components/ui/astrology-icons'

function PurchaseSuccessContent() {
  const searchParams = useSearchParams()
  const productId = searchParams.get('product')
  const [purchasedReports, setPurchasedReports] = useState<typeof reportsList>([])

  useEffect(() => {
    // Determine which reports were purchased based on product ID
    if (productId === 'report-bundle-6') {
      // All 6 paid reports
      setPurchasedReports(reportsList.filter(r => r.price > 0))
    } else if (productId === 'report-bundle-3') {
      // Get selected reports from session storage
      const bundleData = sessionStorage.getItem('pending-bundle')
      if (bundleData) {
        const { reports } = JSON.parse(bundleData)
        setPurchasedReports(reportsList.filter(r => reports.includes(r.slug)))
      }
    } else if (productId === 'single-report') {
      // Single report from session storage
      const reportData = sessionStorage.getItem('pending-report')
      if (reportData) {
        const { reportSlug } = JSON.parse(reportData)
        const report = reportsList.find(r => r.slug === reportSlug)
        if (report) setPurchasedReports([report])
      }
    }
  }, [productId])

  const bundleType = productId === 'report-bundle-6'
    ? '6 Report Bundle'
    : productId === 'report-bundle-3'
    ? '3 Report Bundle'
    : 'Report'

  return (
    <div className="max-w-2xl mx-auto">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-emerald-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-white mb-3">
          Purchase Complete!
        </h1>

        <p className="text-indigo-200/70">
          Your {bundleType} is ready. Click on any report below to generate your personalized reading.
        </p>
      </div>

      {/* Purchased Reports */}
      <div className="bg-indigo-950/30 rounded-2xl p-6 mb-8">
        <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Your Reports ({purchasedReports.length})
        </h2>

        <div className="space-y-3">
          {purchasedReports.map((report) => (
            <Link
              key={report.slug}
              href={`/reports/${report.slug}/view`}
              className="flex items-center gap-4 p-4 bg-indigo-900/30 hover:bg-indigo-900/50 rounded-xl transition-colors group"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${report.gradient} flex items-center justify-center flex-shrink-0`}>
                <ReportIcon type={report.slug} size={24} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-medium group-hover:text-indigo-300 transition-colors">
                  {report.title}
                </h3>
                <p className="text-indigo-200/50 text-sm">{report.wordCount} of personalized insights</p>
              </div>
              <div className="flex items-center gap-2 text-indigo-400 group-hover:text-indigo-300">
                <span className="text-sm font-medium">Generate</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-indigo-950/20 rounded-xl p-5 mb-8">
        <h3 className="text-white font-medium mb-3">Tips for your reports</h3>
        <ul className="space-y-2 text-sm text-indigo-200/60">
          <li className="flex items-start gap-2">
            <svg className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Each report is generated fresh based on your birth chart
          </li>
          <li className="flex items-start gap-2">
            <svg className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            You can access your reports anytime from the Reports section
          </li>
          <li className="flex items-start gap-2">
            <svg className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Reports that require partner details will ask for them before generating
          </li>
        </ul>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <Link
          href="/reports"
          className="flex-1 py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-colors text-center"
        >
          View All Reports
        </Link>
        <Link
          href="/dashboard"
          className="flex-1 py-3 px-4 bg-indigo-950/50 hover:bg-indigo-900/50 text-indigo-200 font-medium rounded-xl transition-colors text-center"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  )
}

function LoadingFallback() {
  return (
    <div className="max-w-2xl mx-auto flex items-center justify-center py-12">
      <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

export default function PurchaseSuccessPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <PurchaseSuccessContent />
    </Suspense>
  )
}
