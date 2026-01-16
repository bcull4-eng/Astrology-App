'use client'

/**
 * Onboarding State Store
 *
 * Manages state across onboarding screens using localStorage
 * for persistence during the flow.
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { BirthTimeConfidence, FocusArea, RelationshipStatus, LifePhase, PrimaryConcern } from '@/types'

interface BirthPlaceInput {
  city: string
  country: string
  latitude: number | null
  longitude: number | null
  timezone: string
}

interface OnboardingState {
  // Birth data
  birthDate: string // ISO date string
  birthTime: string // HH:mm format
  birthTimeConfidence: BirthTimeConfidence
  birthPlace: BirthPlaceInput

  // Focus areas
  focusAreas: FocusArea[]

  // Personalization data
  relationshipStatus: RelationshipStatus | null
  lifePhase: LifePhase | null
  primaryConcerns: PrimaryConcern[]

  // Actions
  setBirthDate: (date: string) => void
  setBirthTime: (time: string) => void
  setBirthTimeConfidence: (confidence: BirthTimeConfidence) => void
  setBirthPlace: (place: BirthPlaceInput) => void
  setFocusAreas: (areas: FocusArea[]) => void
  toggleFocusArea: (area: FocusArea) => void
  setRelationshipStatus: (status: RelationshipStatus | null) => void
  setLifePhase: (phase: LifePhase | null) => void
  setPrimaryConcerns: (concerns: PrimaryConcern[]) => void
  togglePrimaryConcern: (concern: PrimaryConcern) => void
  reset: () => void
}

const initialState = {
  birthDate: '',
  birthTime: '',
  birthTimeConfidence: 'exact' as BirthTimeConfidence,
  birthPlace: {
    city: '',
    country: '',
    latitude: null,
    longitude: null,
    timezone: '',
  },
  focusAreas: [] as FocusArea[],
  relationshipStatus: null as RelationshipStatus | null,
  lifePhase: null as LifePhase | null,
  primaryConcerns: [] as PrimaryConcern[],
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      ...initialState,

      setBirthDate: (date) => set({ birthDate: date }),
      setBirthTime: (time) => set({ birthTime: time }),
      setBirthTimeConfidence: (confidence) =>
        set({ birthTimeConfidence: confidence }),
      setBirthPlace: (place) => set({ birthPlace: place }),
      setFocusAreas: (areas) => set({ focusAreas: areas }),
      toggleFocusArea: (area) =>
        set((state) => ({
          focusAreas: state.focusAreas.includes(area)
            ? state.focusAreas.filter((a) => a !== area)
            : [...state.focusAreas, area],
        })),
      setRelationshipStatus: (status) => set({ relationshipStatus: status }),
      setLifePhase: (phase) => set({ lifePhase: phase }),
      setPrimaryConcerns: (concerns) => set({ primaryConcerns: concerns }),
      togglePrimaryConcern: (concern) =>
        set((state) => ({
          primaryConcerns: state.primaryConcerns.includes(concern)
            ? state.primaryConcerns.filter((c) => c !== concern)
            : [...state.primaryConcerns, concern],
        })),
      reset: () => set(initialState),
    }),
    {
      name: 'onboarding-storage',
    }
  )
)
