/**
 * User & Onboarding Data Types
 */

export interface User {
  id: string
  email: string
  created_at: Date
  subscription_status: SubscriptionStatus
  subscription_expires_at: Date | null
}

export type SubscriptionStatus = 'free' | 'pro' | 'expired'

export interface BirthData {
  user_id: string
  birth_date: Date
  birth_time: string | null
  birth_time_confidence: BirthTimeConfidence
  birth_place: BirthPlace
}

export type BirthTimeConfidence = 'exact' | 'approximate' | 'unknown'

export interface BirthPlace {
  city: string
  country: string
  latitude: number
  longitude: number
  timezone: string
}

export interface UserPreferences {
  user_id: string
  current_location: Location | null
  focus_areas: FocusArea[]
  notification_preferences: NotificationPreferences
}

export type FocusArea = 'career' | 'relationships' | 'money' | 'growth'

export interface Location {
  city: string
  country: string
  latitude: number
  longitude: number
  timezone: string
}

export interface NotificationPreferences {
  email_enabled: boolean
  push_enabled: boolean
  daily_guidance_enabled: boolean
  theme_change_enabled: boolean
}
