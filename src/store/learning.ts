/**
 * Learning Progress Store
 *
 * Tracks course progress, completed lessons, quiz scores.
 * Persisted to localStorage.
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { LearningProgress } from '@/types/learning'

interface LearningStore extends LearningProgress {
  // Actions
  completeLesson: (lessonId: string) => void
  uncompleteLesson: (lessonId: string) => void
  saveQuizScore: (lessonId: string, score: number) => void
  setCurrentCourse: (courseId: string | null) => void
  setCurrentLesson: (lessonId: string | null) => void
  isLessonCompleted: (lessonId: string) => boolean
  getQuizScore: (lessonId: string) => number | undefined
  getCourseProgress: (lessonIds: string[]) => number
  reset: () => void
}

const initialState: LearningProgress = {
  completedLessons: [],
  quizScores: {},
  currentCourseId: null,
  currentLessonId: null,
  lastActiveAt: null,
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
