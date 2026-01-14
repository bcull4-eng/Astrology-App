'use client'

/**
 * Settings Page
 *
 * User account settings, subscription management, and sign out.
 */

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/hooks'

export default function SettingsPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [signingOut, setSigningOut] = useState(false)

  const handleSignOut = async () => {
    setSigningOut(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-white font-semibold text-xl">Settings</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Account */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 mb-6">
          <h2 className="text-white font-semibold mb-4">Account</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-slate-400 text-sm mb-1">Email</label>
              <p className="text-white">{user?.email || 'Loading...'}</p>
            </div>
          </div>
        </div>

        {/* Subscription */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 mb-6">
          <h2 className="text-white font-semibold mb-4">Subscription</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Pro Plan</p>
              <p className="text-slate-400 text-sm">£20/month</p>
            </div>
            <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium rounded-lg transition-colors">
              Manage Subscription
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 mb-6">
          <h2 className="text-white font-semibold mb-4">Notifications</h2>
          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-white">Daily guidance emails</p>
                <p className="text-slate-400 text-sm">Get your daily do/avoid list by email</p>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 rounded bg-slate-700 border-slate-600 text-indigo-500 focus:ring-indigo-500"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-white">Theme change alerts</p>
                <p className="text-slate-400 text-sm">Get notified when your primary theme changes</p>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 rounded bg-slate-700 border-slate-600 text-indigo-500 focus:ring-indigo-500"
              />
            </label>
          </div>
        </div>

        {/* Sign Out */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
          <h2 className="text-white font-semibold mb-4">Session</h2>
          <button
            onClick={handleSignOut}
            disabled={signingOut}
            className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-600/50 text-red-400 text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
          >
            {signingOut ? 'Signing out...' : 'Sign out'}
          </button>
        </div>

        {/* Back link */}
        <div className="mt-6 text-center">
          <a href="/dashboard" className="text-slate-400 hover:text-white text-sm transition-colors">
            ← Back to Dashboard
          </a>
        </div>
      </main>
    </div>
  )
}
