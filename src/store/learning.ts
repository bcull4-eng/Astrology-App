/**
 * Learning Progress Store
 *
 * Tracks course progress, completed lessons, quiz scores, and module tests.
 * Persisted to localStorage.
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { LearningProgress, ModuleTestResult } from '@/types/learning'

interface LearningStore extends LearningProgress {
  // Actions
  completeLesson: (lessonId: string) => void
  uncompleteLesson: (lessonId: string) => void
  saveQuizScore: (lessonId: string, score: number) => void
  saveModuleTestResult: (moduleId: string, result: ModuleTestResult) => void
  setCurrentCourse: (courseId: string | null) => void
  setCurrentLesson: (lessonId: string | null) => void
  isLessonCompleted: (lessonId: string) => boolean
  getQuizScore: (lessonId: string) => number | undefined
  getModuleTestResult: (moduleId: string) => ModuleTestResult | undefined
  isModuleTestPassed: (moduleId: string) => boolean
  getCourseProgress: (lessonIds: string[]) => number
  reset: () => void
}

const initialState: LearningProgress = {
  completedLessons: [],
  quizScores: {},
  moduleTestScores: {},
  currentCourseId: null,
  currentLessonId: null,
  lastActiveAt: null,
  certificates: [],
  coursePurchased: false,
}

export const useLearningStore = create<LearningStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      completeLesson: (lessonId) =>
        set((state) => ({
          completedLessons: state.completedLessons.includes(lessonId)
            ? state.completedLessons
            : [...state.completedLessons, lessonId],
          lastActiveAt: new Date().toISOString(),
        })),

      uncompleteLesson: (lessonId) =>
        set((state) => ({
          completedLessons: state.completedLessons.filter((id) => id !== lessonId),
        })),

      saveQuizScore: (lessonId, score) =>
        set((state) => ({
          quizScores: { ...state.quizScores, [lessonId]: score },
        })),

      saveModuleTestResult: (moduleId, result) =>
        set((state) => ({
          moduleTestScores: { ...state.moduleTestScores, [moduleId]: result },
          lastActiveAt: new Date().toISOString(),
        })),

      setCurrentCourse: (courseId) =>
        set({ currentCourseId: courseId }),

      setCurrentLesson: (lessonId) =>
        set({
          currentLessonId: lessonId,
          lastActiveAt: new Date().toISOString(),
        }),

      isLessonCompleted: (lessonId) =>
        get().completedLessons.includes(lessonId),

      getQuizScore: (lessonId) =>
        get().quizScores[lessonId],

      getModuleTestResult: (moduleId) =>
        get().moduleTestScores[moduleId],

      isModuleTestPassed: (moduleId) => {
        const result = get().moduleTestScores[moduleId]
        return result?.passed ?? false
      },

      getCourseProgress: (lessonIds) => {
        const completed = get().completedLessons
        const completedCount = lessonIds.filter((id) => completed.includes(id)).length
        return lessonIds.length > 0 ? Math.round((completedCount / lessonIds.length) * 100) : 0
      },

      reset: () => set(initialState),
    }),
    {
      name: 'astro-learning-progress',
    }
  )
)
