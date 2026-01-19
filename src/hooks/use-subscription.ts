'use client'

/**
 * Subscription Hook
 *
 * Checks user subscription status from Supabase user metadata.
 * Premium status is set when user completes Stripe checkout.
 */

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { SubscriptionStatus } from '@/types/user'

interface SubscriptionState {
  status: SubscriptionStatus
  loading: boolean
  expiresAt: Date | null
}

export function useSubscription() {
  const [state, setState] = useState<SubscriptionState>({
    status: 'free',
    loading: true,
    expiresAt: null,
  })

  const supabase = createClient()

  useEffect(() => {
    async function checkSubscription() {
      try {
        const { data: { user } } = await supabase.auth.getUser()

        if (user) {
          // Check user metadata for subscription status
          const metadata = user.user_metadata || {}
          const subscriptionStatus = metadata.subscription_status as SubscriptionStatus || 'free'
          const expiresAt = metadata.subscription_expires_at
            ? new Date(metadata.subscription_expires_at)
            : null

          // Check if subscription has expired
          if (subscriptionStatus === 'pro' && expiresAt && expiresAt < new Date()) {
            setState({
              status: 'expired',
              loading: false,
              expiresAt,
            })
          } else {
            setState({
              status: subscriptionStatus,
              loading: false,
              expiresAt,
            })
          }
        } else {
          setState({
            status: 'free',
            loading: false,
            expiresAt: null,
          })
        }
      } catch (error) {
        console.error('Failed to check subscription:', error)
        setState({
          status: 'free',
          loading: false,
          expiresAt: null,
        })
      }
    }

    checkSubscription()

    // Listen for auth changes (in case subscription is updated)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkSubscription()
    })

    return () => subscription.unsubscribe()
  }, [])

  const isPro = state.status === 'pro'
  const isFree = state.status === 'free'
  const isExpired = state.status === 'expired'

  return {
    ...state,
    isPro,
    isFree,
    isExpired,
  }
}
