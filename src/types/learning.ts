/**
 * Learning/Course Types
 */

export interface Course {
  id: string
  title: string
  description: string
  difficulty: 'beginner' | 'advanced'
  modules: Module[]
  estimatedMinutes: number
  icon: string
}

export interface Module {
  id: string
  title: string
  description: string
  lessons: Lesson[]
}

export interface Lesson {
  id: string
  title: string
  description: string
  content: LessonBlock[]
  estimatedMinutes: number
  quiz?: QuizQuestion[]
}

export type LessonBlock =
  | { type: 'text'; content: string }
  | { type: 'heading'; content: string; level?: 2 | 3 }
  | { type: 'concept'; title: string; content: string; icon?: string }
  | { type: 'personalized'; dataKey: PersonalizedDataKey; template: string }
  | { type: 'list'; items: string[]; style?: 'bullet' | 'numbered' }
  | { type: 'callout'; content: string; variant?: 'info' | 'tip' | 'warning' }
  | { type: 'quiz'; questions: QuizQuestion[] }

export type PersonalizedDataKey =
  | 'sunSign'
  | 'moonSign'
  | 'risingSign'
  | 'mercurySign'
  | 'venusSign'
  | 'marsSign'
  | 'jupiterSign'
  | 'saturnSign'
  | 'sunHouse'
  | 'moonHouse'
  | 'dominantElement'
  | 'dominantModality'

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export interface LearningProgress {
  completedLessons: string[]
  quizScores: Record<string, number>
  currentCourseId: string | null
  currentLessonId: string | null
  lastActiveAt: string | null
}
