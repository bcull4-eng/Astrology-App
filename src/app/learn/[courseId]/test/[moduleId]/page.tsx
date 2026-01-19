'use client'

/**
 * Module Test Page
 *
 * Allows users to take comprehensive tests at the end of each module.
 */

import { use } from 'react'
import Link from 'next/link'
import { COURSES } from '@/lib/courses'
import { getModuleTest } from '@/lib/module-tests'
import { ModuleTestComponent } from '@/components/learn/module-test'
import { useLearningStore } from '@/store/learning'
import type { ModuleTestResult } from '@/types/learning'

interface ModuleTestPageProps {
  params: Promise<{
    courseId: string
    moduleId: string
  }>
}

export default function ModuleTestPage({ params }: ModuleTestPageProps) {
  const { courseId, moduleId } = use(params)
  const { getModuleTestResult, completedLessons } = useLearningStore()

  // Find the course and module
  const course = COURSES.find((c) => c.id === courseId)
  const module = course?.modules.find((m) => m.id === moduleId)

  if (!course || !module) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <div className="w-16 h-16 bg-rose-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Module Not Found</h1>
        <p className="text-indigo-200/50 mb-6">The module you're looking for doesn't exist.</p>
        <Link
          href="/learn"
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-colors"
        >
          Back to Course
        </Link>
      </div>
    )
  }

  // Get the test for this module
  const test = getModuleTest(moduleId)

  if (!test) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <div className="w-16 h-16 bg-amber-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">No Test Available</h1>
        <p className="text-indigo-200/50 mb-6">There's no test for this module yet.</p>
        <Link
          href="/learn"
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-colors"
        >
          Back to Course
        </Link>
      </div>
    )
  }

  // Check if module lessons are completed
  const moduleLessonIds = module.lessons.map((l) => l.id)
  const completedModuleLessons = moduleLessonIds.filter((id) => completedLessons.includes(id))
  const allLessonsCompleted = completedModuleLessons.length === moduleLessonIds.length

  // Get existing test result if any
  const existingResult = getModuleTestResult(moduleId)

  // Handle test completion
  const handleTestComplete = (result: ModuleTestResult) => {
    // Result is already saved in the ModuleTestComponent
    console.log('Test completed:', result)
  }

  // If lessons not completed, show prompt to complete lessons first
  if (!allLessonsCompleted) {
    const remainingLessons = moduleLessonIds.length - completedModuleLessons.length
    const nextLessonId = moduleLessonIds.find((id) => !completedLessons.includes(id))

    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Header */}
        <Link
          href="/learn"
          className="inline-flex items-center gap-2 text-indigo-200/50 hover:text-white mb-8 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Course
        </Link>

        <div className="text-center">
          <div className="w-20 h-20 bg-amber-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-white mb-3">{test.title}</h1>
          <p className="text-indigo-200/50 mb-8 max-w-lg mx-auto">
            Complete all lessons in the <span className="text-indigo-300">{module.title}</span> module before taking the test.
          </p>

          <div className="bg-indigo-950/30 rounded-2xl p-6 mb-8 max-w-md mx-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="text-indigo-200/70">Module Progress</span>
              <span className="text-white font-medium">
                {completedModuleLessons.length} / {moduleLessonIds.length} lessons
              </span>
            </div>
            <div className="h-2 bg-indigo-900/50 rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all"
                style={{ width: `${(completedModuleLessons.length / moduleLessonIds.length) * 100}%` }}
              />
            </div>
            <p className="text-indigo-200/50 text-sm">
              {remainingLessons} lesson{remainingLessons !== 1 ? 's' : ''} remaining
            </p>
          </div>

          {nextLessonId && (
            <Link
              href={`/learn/${courseId}/${nextLessonId}`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all"
            >
              Continue Learning
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <Link
        href="/learn"
        className="inline-flex items-center gap-2 text-indigo-200/50 hover:text-white mb-8 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Course
      </Link>

      {/* Test Info (if not started) */}
      {!existingResult && (
        <div className="bg-indigo-950/30 rounded-2xl p-6 mb-8 text-center">
          <div className="w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <p className="text-indigo-200/60 mb-4">{test.description}</p>
          <div className="flex items-center justify-center gap-6 text-sm">
            <div>
              <span className="text-indigo-200/50">Questions:</span>{' '}
              <span className="text-white font-medium">{test.questions.length}</span>
            </div>
            <div>
              <span className="text-indigo-200/50">Passing Score:</span>{' '}
              <span className="text-white font-medium">{test.passingScore}%</span>
            </div>
            <div>
              <span className="text-indigo-200/50">Time:</span>{' '}
              <span className="text-white font-medium">~{test.estimatedMinutes} min</span>
            </div>
          </div>
        </div>
      )}

      {/* Module Test Component */}
      <ModuleTestComponent
        test={test}
        moduleId={moduleId}
        moduleTitle={module.title}
        courseId={courseId}
        onComplete={handleTestComplete}
      />
    </div>
  )
}
