'use client'

/**
 * Course Purchase Success Page
 *
 * Shown after successful course purchase.
 * Grants access to the full course.
 */

import { useEffect } from 'react'
import Link from 'next/link'

export default function CoursePurchaseSuccessPage() {
  useEffect(() => {
    // Grant course access
    sessionStorage.setItem('course-purchased', 'true')
  }, [])

  return (
    <div className="max-w-2xl mx-auto text-center py-12">
      {/* Success Icon */}
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
        Welcome to the Course!
      </h1>

      <p className="text-indigo-200/70 mb-8 max-w-md mx-auto">
        Your purchase is complete. You now have lifetime access to the complete astrology course, including all lessons and your certificate upon completion.
      </p>

      {/* What's Included */}
      <div className="bg-indigo-950/30 rounded-2xl p-6 mb-8 text-left">
        <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          What You Get
        </h2>

        <ul className="space-y-3">
          <li className="flex items-start gap-3 text-indigo-200/70">
            <span className="text-emerald-400 mt-0.5">*</span>
            <span>Access to all 10 modules with 60+ lessons</span>
          </li>
          <li className="flex items-start gap-3 text-indigo-200/70">
            <span className="text-emerald-400 mt-0.5">*</span>
            <span>Interactive quizzes to test your knowledge</span>
          </li>
          <li className="flex items-start gap-3 text-indigo-200/70">
            <span className="text-emerald-400 mt-0.5">*</span>
            <span>Certificate of completion to share</span>
          </li>
          <li className="flex items-start gap-3 text-indigo-200/70">
            <span className="text-emerald-400 mt-0.5">*</span>
            <span>Lifetime access - learn at your own pace</span>
          </li>
        </ul>
      </div>

      {/* CTA */}
      <Link
        href="/learn"
        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25"
      >
        Start Learning
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </Link>
    </div>
  )
}
