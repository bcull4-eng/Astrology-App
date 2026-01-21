'use client'

/**
 * Account Page
 *
 * User account settings, purchased reports, subscription management, and sign out.
 */

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/hooks'
import { getReportBySlug } from '@/lib/reports'
import { ReportIcon } from '@/components/ui/astrology-icons'

type Tab = 'account' | 'reports' | 'subscription' | 'notifications'

interface GeneratedReport {
  id: string
  report_slug: string
  report_title: string
  word_count: number
  partner_name: string | null
  created_at: string
}

export default function AccountPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<Tab>('account')
  const [signingOut, setSigningOut] = useState(false)
  const [generatedReports, setGeneratedReports] = useState<GeneratedReport[]>([])
  const [reportCredits, setReportCredits] = useState(0)
  const [loadingReports, setLoadingReports] = useState(true)

  // Fetch generated reports and credits
  useEffect(() => {
    async function fetchReports() {
      try {
        const [reportsRes, purchasesRes] = await Promise.all([
          fetch('/api/reports'),
          fetch('/api/user/purchases'),
        ])

        if (reportsRes.ok) {
          const data = await reportsRes.json()
          setGeneratedReports(data.reports || [])
        }

        if (purchasesRes.ok) {
          const data = await purchasesRes.json()
          setReportCredits(data.reportCredits || 0)
        }
      } catch (error) {
        console.error('Error fetching reports:', error)
      } finally {
        setLoadingReports(false)
      }
    }
    fetchReports()
  }, [])

  const handleSignOut = async () => {
    setSigningOut(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'account', label: 'Account', icon: 'user' },
    { id: 'reports', label: 'My Reports', icon: 'document' },
    { id: 'subscription', label: 'Subscription', icon: 'card' },
    { id: 'notifications', label: 'Notifications', icon: 'bell' },
  ]

  return (
    <div className="min-h-screen bg-[#1a1a2e]">
      {/* Header */}
      <header className="border-b border-indigo-900/30 bg-[#1a1a2e]/80 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="text-white font-semibold text-xl">
            <span className="text-indigo-400">Astro</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/dashboard" className="text-indigo-200/70 hover:text-white transition-colors text-sm">
              Dashboard
            </Link>
            <Link href="/learn" className="text-indigo-200/70 hover:text-white transition-colors text-sm">
              Learn
            </Link>
            <Link href="/reports" className="text-indigo-200/70 hover:text-white transition-colors text-sm">
              Reports
            </Link>
            <Link href="/synastry" className="text-indigo-200/70 hover:text-white transition-colors text-sm">
              Synastry
            </Link>
            <Link href="/settings" className="text-white transition-colors text-sm font-medium">
              Account
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-white mb-6">Account</h1>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-indigo-950/40 text-indigo-200/70 hover:bg-indigo-900/30 hover:text-white'
              }`}
            >
              <TabIcon icon={tab.icon} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'account' && (
          <div className="space-y-6">
            {/* Profile */}
            <div className="bg-indigo-950/30 rounded-2xl p-6">
              <h2 className="text-white font-semibold mb-4">Profile</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-indigo-200/50 text-sm mb-1">Email</label>
                  <p className="text-white">{user?.email || 'Loading...'}</p>
                </div>
              </div>
            </div>

            {/* Sign Out */}
            <div className="bg-indigo-950/30 rounded-2xl p-6">
              <h2 className="text-white font-semibold mb-4">Session</h2>
              <button
                onClick={handleSignOut}
                disabled={signingOut}
                className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
              >
                {signingOut ? 'Signing out...' : 'Sign out'}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="space-y-6">
            {/* Report Credits */}
            {reportCredits > 0 && (
              <div className="bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-indigo-500/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-white font-semibold">Report Credits</h2>
                      <p className="text-indigo-300/70 text-sm">
                        You have <span className="font-semibold text-indigo-400">{reportCredits} credit{reportCredits !== 1 ? 's' : ''}</span> remaining
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/reports"
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    Generate Report
                  </Link>
                </div>
              </div>
            )}

            {/* Generated Reports */}
            <div className="bg-indigo-950/30 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white font-semibold">My Reports</h2>
                <Link
                  href="/reports"
                  className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors"
                >
                  Browse Reports
                </Link>
              </div>

              {loadingReports ? (
                <div className="flex items-center justify-center py-12">
                  <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : generatedReports.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-indigo-300/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-white font-medium mb-2">No reports generated yet</h3>
                  <p className="text-indigo-200/50 text-sm mb-4">
                    {reportCredits > 0
                      ? 'Use your credits to generate personalized reports'
                      : 'Purchase a report bundle to get deep insights into your chart'}
                  </p>
                  <Link
                    href="/reports"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    {reportCredits > 0 ? 'Generate a Report' : 'Browse Reports'}
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {generatedReports.map((report) => {
                    const reportDef = getReportBySlug(report.report_slug)
                    if (!reportDef) return null

                    return (
                      <div
                        key={report.id}
                        className="flex items-center gap-4 p-4 bg-indigo-950/40 rounded-xl"
                      >
                        <div
                          className={`w-12 h-12 rounded-lg bg-gradient-to-br ${reportDef.gradient} flex items-center justify-center flex-shrink-0`}
                        >
                          <ReportIcon type={reportDef.slug} size={24} className="text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-medium truncate">{report.report_title}</h3>
                          <p className="text-indigo-200/50 text-sm">
                            Generated{' '}
                            {new Date(report.created_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                            {report.word_count && (
                              <span className="ml-2">• {report.word_count.toLocaleString()} words</span>
                            )}
                          </p>
                        </div>
                        <Link
                          href={`/reports/${report.report_slug}/view`}
                          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors flex-shrink-0"
                        >
                          View Report
                        </Link>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'subscription' && (
          <div className="space-y-6">
            <div className="bg-indigo-950/30 rounded-2xl p-6">
              <h2 className="text-white font-semibold mb-4">Current Plan</h2>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Pro Plan</p>
                  <p className="text-indigo-200/50 text-sm">£20/month</p>
                </div>
                <button className="px-4 py-2 bg-indigo-900/50 hover:bg-indigo-800/50 text-white text-sm font-medium rounded-lg transition-colors">
                  Manage Subscription
                </button>
              </div>
            </div>

            <div className="bg-indigo-950/30 rounded-2xl p-6">
              <h2 className="text-white font-semibold mb-4">Billing History</h2>
              <div className="text-indigo-200/50 text-sm">
                Your billing history will appear here once you have active subscriptions.
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <div className="bg-indigo-950/30 rounded-2xl p-6">
              <h2 className="text-white font-semibold mb-4">Email Notifications</h2>
              <div className="space-y-4">
                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <p className="text-white">Daily guidance emails</p>
                    <p className="text-indigo-200/50 text-sm">Get your daily do/avoid list by email</p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-5 h-5 rounded bg-indigo-900/50 border-indigo-500/30 text-indigo-500 focus:ring-indigo-500"
                  />
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <p className="text-white">Theme change alerts</p>
                    <p className="text-indigo-200/50 text-sm">Get notified when your primary theme changes</p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-5 h-5 rounded bg-indigo-900/50 border-indigo-500/30 text-indigo-500 focus:ring-indigo-500"
                  />
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <p className="text-white">New report available</p>
                    <p className="text-indigo-200/50 text-sm">Get notified when new report types are released</p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-5 h-5 rounded bg-indigo-900/50 border-indigo-500/30 text-indigo-500 focus:ring-indigo-500"
                  />
                </label>
              </div>
            </div>

            <div className="bg-indigo-950/30 rounded-2xl p-6">
              <h2 className="text-white font-semibold mb-4">Push Notifications</h2>
              <div className="space-y-4">
                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <p className="text-white">Daily reminders</p>
                    <p className="text-indigo-200/50 text-sm">Remind me to check my daily guidance</p>
                  </div>
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded bg-indigo-900/50 border-indigo-500/30 text-indigo-500 focus:ring-indigo-500"
                  />
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Back link */}
        <div className="mt-8 text-center">
          <Link href="/dashboard" className="text-indigo-200/50 hover:text-white text-sm transition-colors">
            Back to Dashboard
          </Link>
        </div>
      </main>
    </div>
  )
}

function TabIcon({ icon }: { icon: string }) {
  switch (icon) {
    case 'user':
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      )
    case 'document':
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      )
    case 'card':
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          />
        </svg>
      )
    case 'bell':
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
      )
    default:
      return null
  }
}
