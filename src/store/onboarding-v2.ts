'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type {
  OnboardingStep, OnboardingV2State, Gender, RelationshipStatusV2,
  FutureGoal, ColorPreference, ElementOfNature, BirthPlaceInputV2,
  NatalChartData, ProfileData, PalmReadingData,
} from '@/types/onboarding-v2'
import { ONBOARDING_STEPS } from '@/types/onboarding-v2'

interface OnboardingV2Actions {
  setCurrentStep: (step: OnboardingStep) => void
  goToNextStep: () => void
  goToPreviousStep: () => void
  setDirection: (direction: 'forward' | 'backward') => void
  markStepCompleted: (step: OnboardingStep) => void
  setGender: (gender: Gender) => void
  setBirthMonth: (month: number) => void
  setBirthDay: (day: number) => void
  setBirthYear: (year: number) => void
  setBirthHour: (hour: number | null) => void
  setBirthMinute: (minute: number | null) => void
  setBirthAmPm: (ampm: 'AM' | 'PM' | null) => void
  setBirthTimeKnown: (known: boolean) => void
  setBirthPlace: (place: BirthPlaceInputV2) => void
  setNatalChartData: (data: NatalChartData) => void
  setRelationshipStatus: (status: RelationshipStatusV2) => void
  toggleFutureGoal: (goal: FutureGoal) => void
  setFutureGoals: (goals: FutureGoal[]) => void
  setColorPreference: (color: ColorPreference) => void
  setElementPreference: (element: ElementOfNature) => void
  setProfileData: (data: ProfileData) => void
  setPalmReadingData: (data: PalmReadingData) => void
  setEmail: (email: string) => void
  setAuthenticated: (isAuthenticated: boolean, userId?: string) => void
  reset: () => void
}

type OnboardingV2Store = OnboardingV2State & OnboardingV2Actions

const initialState: OnboardingV2State = {
  currentStep: 'gender',
  gender: null,
  birthMonth: null,
  birthDay: null,
  birthYear: null,
  birthHour: null,
  birthMinute: null,
  birthAmPm: null,
  birthTimeKnown: true,
  birthPlace: { city: '', country: '', latitude: null, longitude: null, timezone: '' },
  natalChartData: null,
  relationshipStatus: null,
  futureGoals: [],
  colorPreference: null,
  elementPreference: null,
  profileData: null,
  palmReadingData: null,
  email: '',
  direction: 'forward',
  completedSteps: [],
  isAuthenticated: false,
  userId: null,
}

export const useOnboardingV2Store = create<OnboardingV2Store>()(
  persist(
    (set, get) => ({
      ...initialState,
      setCurrentStep: (step) => set({ currentStep: step }),
      goToNextStep: () => {
        const { currentStep, completedSteps } = get()
        const currentIndex = ONBOARDING_STEPS.indexOf(currentStep)
        if (currentIndex < ONBOARDING_STEPS.length - 1) {
          const nextStep = ONBOARDING_STEPS[currentIndex + 1]
          set({
            currentStep: nextStep,
            direction: 'forward',
            completedSteps: completedSteps.includes(currentStep) ? completedSteps : [...completedSteps, currentStep],
          })
        }
      },
      goToPreviousStep: () => {
        const { currentStep } = get()
        const currentIndex = ONBOARDING_STEPS.indexOf(currentStep)
        if (currentIndex > 0) {
          set({ currentStep: ONBOARDING_STEPS[currentIndex - 1], direction: 'backward' })
        }
      },
      setDirection: (direction) => set({ direction }),
      markStepCompleted: (step) => set((state) => ({
        completedSteps: state.completedSteps.includes(step) ? state.completedSteps : [...state.completedSteps, step],
      })),
      setGender: (gender) => set({ gender }),
      setBirthMonth: (month) => set({ birthMonth: month }),
      setBirthDay: (day) => set({ birthDay: day }),
      setBirthYear: (year) => set({ birthYear: year }),
      setBirthHour: (hour) => set({ birthHour: hour }),
      setBirthMinute: (minute) => set({ birthMinute: minute }),
      setBirthAmPm: (ampm) => set({ birthAmPm: ampm }),
      setBirthTimeKnown: (known) => set({ birthTimeKnown: known }),
      setBirthPlace: (place) => set({ birthPlace: place }),
      setNatalChartData: (data) => set({ natalChartData: data }),
      setRelationshipStatus: (status) => set({ relationshipStatus: status }),
      toggleFutureGoal: (goal) => set((state) => {
        const goals = state.futureGoals
        if (goals.includes(goal)) return { futureGoals: goals.filter((g) => g !== goal) }
        if (goals.length >= 3) return state
        return { futureGoals: [...goals, goal] }
      }),
      setFutureGoals: (goals) => set({ futureGoals: goals.slice(0, 3) }),
      setColorPreference: (color) => set({ colorPreference: color }),
      setElementPreference: (element) => set({ elementPreference: element }),
      setProfileData: (data) => set({ profileData: data }),
      setPalmReadingData: (data) => set({ palmReadingData: data }),
      setEmail: (email) => set({ email }),
      setAuthenticated: (isAuthenticated, userId) => set({ isAuthenticated, userId: userId ?? null }),
      reset: () => set(initialState),
    }),
    { name: 'onboarding-v2-storage' }
  )
)

export function getStepNumber(step: OnboardingStep): number {
  return ONBOARDING_STEPS.indexOf(step) + 1
}

export function isQuizStep(step: OnboardingStep): boolean {
  const stepNumber = getStepNumber(step)
  return stepNumber >= 1 && stepNumber <= 14
}

export function getFormattedBirthDate(month: number | null, day: number | null, year: number | null): string | null {
  if (month === null || day === null || year === null) return null
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

export function getFormattedBirthTime(hour: number | null, minute: number | null, ampm: 'AM' | 'PM' | null): string | null {
  if (hour === null || minute === null || ampm === null) return null
  let hour24 = hour
  if (ampm === 'PM' && hour !== 12) hour24 += 12
  if (ampm === 'AM' && hour === 12) hour24 = 0
  return `${String(hour24).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
}
