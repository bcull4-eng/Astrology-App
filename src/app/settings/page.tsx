'use client'

/**
 * Account Page
 *
 * User account settings, purchased reports, subscription management, and sign out.
 */

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/hooks'
import { getReportBySlug } from '@/lib/reports'
import { ReportIcon } from '@/components/ui/astrology-icons'

type Tab = 'account' | 'birthdetails' | 'reports' | 'subscription' | 'notifications' | 'support'

interface BirthData {
  birthDate: string
  birthTime: string | null
  birthTimeConfidence: string
  birthPlace: {
    city: string
    country: string
    latitude: number
    longitude: number
    timezone: string
  }
  updatedAt: string
}

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
  const [supportForm, setSupportForm] = useState({ name: '', email: '', message: '' })
  const [supportSubmitting, setSupportSubmitting] = useState(false)
  const [supportSuccess, setSupportSuccess] = useState(false)
  const [supportError, setSupportError] = useState<string | null>(null)
  const [birthData, setBirthData] = useState<BirthData | null>(null)
  const [loadingBirthData, setLoadingBirthData] = useState(true)
  const [subscription, setSubscription] = useState<{
    status: string
    plan: string
    expiresAt: string | null
  } | null>(null)
  const [managingSubscription, setManagingSubscription] = useState(false)

  // Fetch generated reports, credits, and birth data
  useEffect(() => {
    async function fetchData() {
      try {
        const [reportsRes, purchasesRes, birthDataRes] = await Promise.all([
          fetch('/api/reports'),
          fetch('/api/user/purchases'),
          fetch('/api/user/birth-data'),
        ])

        if (reportsRes.ok) {
          const data = await reportsRes.json()
          setGeneratedReports(data.reports || [])
        }

        if (purchasesRes.ok) {
          const data = await purchasesRes.json()
          setReportCredits(data.reportCredits || 0)
        }

        if (birthDataRes.ok) {
          const data = await birthDataRes.json()
          setBirthData(data.birthData || null)
        }

        // Fetch subscription data from user metadata
        const supabase = createClient()
        const { data: { user: currentUser } } = await supabase.auth.getUser()
        if (currentUser?.user_metadata) {
          const meta = currentUser.user_metadata
          if (meta.subscription_status) {
            setSubscription({
              status: meta.subscription_status || 'free',
              plan: meta.subscription_plan || 'none',
              expiresAt: meta.subscription_expires_at || null,
            })
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoadingReports(false)
        setLoadingBirthData(false)
      }
    }
    fetchData()
  }, [])

  const handleSignOut = async () => {
    setSigningOut(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  const handleSupportSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSupportSubmitting(true)
    setSupportError(null)

    try {
      const response = await fetch('/api/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(supportForm),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to send message')
      }

      setSupportSuccess(true)
      setSupportForm({ name: '', email: '', message: '' })
    } catch (error) {
      setSupportError(error instanceof Error ? error.message : 'Failed to send message')
    } finally {
      setSupportSubmitting(false)
    }
  }

  const handleManageSubscription = async () => {
    setManagingSubscription(true)
    try {
      const response = await fetch('/api/stripe/portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })

      if (response.ok) {
        const data = await response.json()
        if (data.url) {
          window.location.href = data.url
        }
      } else {
        console.error('Failed to create portal session')
      }
    } catch (error) {
      console.error('Error opening subscription portal:', error)
    } finally {
      setManagingSubscription(false)
    }
  }

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'account', label: 'Account', icon: 'user' },
    { id: 'birthdetails', label: 'Birth Details', icon: 'star' },
    { id: 'reports', label: 'My Reports', icon: 'document' },
    { id: 'subscription', label: 'Subscription', icon: 'card' },
    { id: 'notifications', label: 'Notifications', icon: 'bell' },
    { id: 'support', label: 'Support', icon: 'support' },
  ]

  return (
    <div className="min-h-screen bg-[#1a1a2e]">
      {/* Header */}
      <header className="border-b border-indigo-900/30 bg-[#1a1a2e]/80 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center">
            <Image src="/orbli-logo.png" alt="Orbli" width={288} height={87} style={{ width: '105px', height: 'auto' }} />
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

        {activeTab === 'birthdetails' && (
          <div className="space-y-6">
            <div className="bg-indigo-950/30 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white font-semibold">Your Birth Details</h2>
                <Link
                  href="/birth-details"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  {birthData ? 'Edit Details' : 'Add Details'}
                </Link>
              </div>

              {loadingBirthData ? (
                <div className="flex items-center justify-center py-12">
                  <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : birthData ? (
                <div className="space-y-6">
                  {/* Birth Date & Time */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-indigo-200/50 text-sm mb-1">Birth Date</label>
                      <p className="text-white">
                        {new Date(birthData.birthDate).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                    <div>
                      <label className="block text-indigo-200/50 text-sm mb-1">Birth Time</label>
                      <p className="text-white">
                        {birthData.birthTime || 'Not specified'}
                        {birthData.birthTimeConfidence && birthData.birthTimeConfidence !== 'exact' && (
                          <span className="text-indigo-300/50 text-sm ml-2">
                            ({birthData.birthTimeConfidence})
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Birth Location */}
                  <div>
                    <label className="block text-indigo-200/50 text-sm mb-1">Birth Location</label>
                    <p className="text-white">
                      {birthData.birthPlace.city}, {birthData.birthPlace.country}
                    </p>
                    <p className="text-indigo-300/50 text-sm mt-1">
                      {birthData.birthPlace.latitude.toFixed(4)}°, {birthData.birthPlace.longitude.toFixed(4)}° • {birthData.birthPlace.timezone}
                    </p>
                  </div>

                  {/* Last Updated */}
                  {birthData.updatedAt && (
                    <div className="pt-4 border-t border-indigo-500/10">
                      <p className="text-indigo-300/50 text-sm">
                        Last updated: {new Date(birthData.updatedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-indigo-300/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-white font-medium mb-2">No birth details yet</h3>
                  <p className="text-indigo-200/50 text-sm mb-4">
                    Add your birth details to unlock personalized insights and readings
                  </p>
                  <Link
                    href="/birth-details"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    Add Birth Details
                  </Link>
                </div>
              )}
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
              {subscription && subscription.status === 'pro' ? (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">
                      {subscription.plan === 'lifetime' ? 'Lifetime Pro' :
                       subscription.plan === 'annual' ? 'Annual Pro' : 'Monthly Pro'}
                    </p>
                    <p className="text-indigo-200/50 text-sm">
                      {subscription.plan === 'lifetime' ? 'One-time purchase - Never expires' :
                       subscription.plan === 'annual' ? '£99/year' : '£14.99/month'}
                    </p>
                    {subscription.expiresAt && subscription.plan !== 'lifetime' && (
                      <p className="text-indigo-300/70 text-sm mt-1">
                        Renews on {new Date(subscription.expiresAt).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </p>
                    )}
                  </div>
                  {subscription.plan !== 'lifetime' && (
                    <button
                      onClick={handleManageSubscription}
                      disabled={managingSubscription}
                      className="px-4 py-2 bg-indigo-900/50 hover:bg-indigo-800/50 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
                    >
                      {managingSubscription ? 'Loading...' : 'Manage Subscription'}
                    </button>
                  )}
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-indigo-300/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-white font-medium mb-2">No active subscription</h3>
                  <p className="text-indigo-200/50 text-sm mb-4">
                    Upgrade to Pro for unlimited access to all features
                  </p>
                  <Link
                    href="/paywall"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    View Plans
                  </Link>
                </div>
              )}
            </div>

            {subscription && subscription.status === 'pro' && (
              <div className="bg-indigo-950/30 rounded-2xl p-6">
                <h2 className="text-white font-semibold mb-4">Billing & Invoices</h2>
                <p className="text-indigo-200/50 text-sm mb-4">
                  View your invoices, update payment methods, and manage your billing details through the Stripe customer portal.
                </p>
                <button
                  onClick={handleManageSubscription}
                  disabled={managingSubscription}
                  className="px-4 py-2 bg-indigo-900/50 hover:bg-indigo-800/50 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
                >
                  {managingSubscription ? 'Loading...' : 'Open Billing Portal'}
                </button>
              </div>
            )}
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

        {activeTab === 'support' && (
          <div className="space-y-6">
            <div className="bg-indigo-950/30 rounded-2xl p-6">
              <h2 className="text-white font-semibold mb-4">Contact Support</h2>
              <p className="text-indigo-200/50 text-sm mb-6">
                Have a question or need help? Send us a message and we&apos;ll get back to you as soon as possible.
              </p>

              {supportSuccess ? (
                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-white font-medium mb-2">Message Sent!</h3>
                  <p className="text-green-300/70 text-sm mb-4">
                    Thank you for reaching out. We&apos;ll get back to you soon.
                  </p>
                  <button
                    onClick={() => setSupportSuccess(false)}
                    className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSupportSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="support-name" className="block text-indigo-200/70 text-sm mb-2">
                      Name
                    </label>
                    <input
                      id="support-name"
                      type="text"
                      required
                      value={supportForm.name}
                      onChange={(e) => setSupportForm({ ...supportForm, name: e.target.value })}
                      className="w-full px-4 py-3 bg-indigo-950/50 border border-indigo-500/20 rounded-xl text-white placeholder-indigo-300/30 focus:outline-none focus:border-indigo-500/50 transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="support-email" className="block text-indigo-200/70 text-sm mb-2">
                      Email Address
                    </label>
                    <input
                      id="support-email"
                      type="email"
                      required
                      value={supportForm.email}
                      onChange={(e) => setSupportForm({ ...supportForm, email: e.target.value })}
                      className="w-full px-4 py-3 bg-indigo-950/50 border border-indigo-500/20 rounded-xl text-white placeholder-indigo-300/30 focus:outline-none focus:border-indigo-500/50 transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="support-message" className="block text-indigo-200/70 text-sm mb-2">
                      Message
                    </label>
                    <textarea
                      id="support-message"
                      required
                      rows={5}
                      value={supportForm.message}
                      onChange={(e) => setSupportForm({ ...supportForm, message: e.target.value })}
                      className="w-full px-4 py-3 bg-indigo-950/50 border border-indigo-500/20 rounded-xl text-white placeholder-indigo-300/30 focus:outline-none focus:border-indigo-500/50 transition-colors resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>

                  {supportError && (
                    <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3">
                      {supportError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={supportSubmitting}
                    className="w-full px-4 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors"
                  >
                    {supportSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
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
    case 'support':
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      )
    case 'star':
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )
    default:
      return null
  }
}
