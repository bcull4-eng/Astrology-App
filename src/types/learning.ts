/**
 * Learning/Course Types
 */

export interface Course {
  id: string
  title: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'comprehensive'
  modules: Module[]
  estimatedMinutes: number
  icon: string
  price?: number
  certificate?: CertificateInfo
}

export interface CertificateInfo {
  title: string
  description: string
  credentialId: string
  skills: string[]
}

export interface Module {
  id: string
  title: string
  description: string
  lessons: Lesson[]
  test?: ModuleTest
}

export interface ModuleTest {
  id: string
  title: string
  description: string
  passingScore: number // Percentage needed to pass (e.g., 70)
  questions: ModuleTestQuestion[]
  estimatedMinutes: number
}

export interface ModuleTestQuestion {
  id: string
  question: string
  type: 'multiple-choice' | 'true-false' | 'multiple-select'
  options: string[]
  correctIndices: number[] // Array to support multiple correct answers
  explanation: string
  points: number
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
  // New interactive and visual types
  | { type: 'chat'; messages: ChatMessage[] }
  | { type: 'zodiacWheel'; highlight?: ZodiacSign[]; showUserPlacements?: boolean }
  | { type: 'elementChart'; showUserDistribution?: boolean }
  | { type: 'aspectDiagram'; pattern: 'conjunction' | 'opposition' | 'trine' | 'square' | 'sextile' | 'grand-trine' | 't-square' }
  | { type: 'signCard'; sign: ZodiacSign }
  | { type: 'planetCard'; planet: Planet }
  | { type: 'comparison'; title: string; items: ComparisonItem[] }
  | { type: 'interactive'; question: string; options: InteractiveOption[] }
  | { type: 'reflection'; prompt: string; placeholder?: string }
  | { type: 'yourChart'; highlight: 'sun' | 'moon' | 'rising' | 'all'; description: string }
  | { type: 'funFact'; content: string }
  | { type: 'animation'; variant: 'planets-orbit' | 'zodiac-cycle' | 'moon-phases' }

export interface ChatMessage {
  role: 'guide' | 'student'
  content: string
  avatar?: string
}

export interface ComparisonItem {
  label: string
  left: string
  right: string
}

export interface InteractiveOption {
  label: string
  response: string
  isCorrect?: boolean
}

export type ZodiacSign =
  | 'aries' | 'taurus' | 'gemini' | 'cancer'
  | 'leo' | 'virgo' | 'libra' | 'scorpio'
  | 'sagittarius' | 'capricorn' | 'aquarius' | 'pisces'

export type Planet =
  | 'sun' | 'moon' | 'mercury' | 'venus' | 'mars'
  | 'jupiter' | 'saturn' | 'uranus' | 'neptune' | 'pluto'

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
  moduleTestScores: Record<string, ModuleTestResult>
  currentCourseId: string | null
  currentLessonId: string | null
  lastActiveAt: string | null
  certificates: CertificateEarned[]
  coursePurchased: boolean
}

export interface ModuleTestResult {
  score: number
  totalPoints: number
  percentage: number
  passed: boolean
  completedAt: string
  answers: Record<string, number[]> // questionId -> selected indices
}

export interface CertificateEarned {
  courseId: string
  earnedAt: string
  credentialId: string
  userName: string
}
