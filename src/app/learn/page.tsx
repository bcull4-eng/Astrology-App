'use client'

/**
 * Learn Page
 *
 * Shows the course content if purchased, otherwise shows a compelling
 * preview with paywall to encourage purchase.
 */

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { COURSES, getAllLessonIds } from '@/lib/courses'
import { useLearningStore } from '@/store/learning'
import { getModuleTest } from '@/lib/module-tests'
import {
  COURSE_PRICE,
  COMPREHENSIVE_COURSE_OUTLINE,
  CERTIFICATE_INFO,
} from '@/lib/comprehensive-course'
import { Certificate, CertificatePreview } from '@/components/learn/certificate'

export default function LearnPage() {
  const { getCourseProgress, completedLessons, isModuleTestPassed, getModuleTestResult } = useLearningStore()
  const [coursePurchased, setCoursePurchased] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showCertificate, setShowCertificate] = useState(false)

  useEffect(() => {
    // Check if course is purchased from sessionStorage
    // In production, this would check the database
    const purchased = sessionStorage.getItem('course-purchased') === 'true'
    setCoursePurchased(purchased)
    setLoading(false)
  }, [])

  // Calculate total progress across all courses
  const totalLessons = COURSES.reduce((acc, c) => acc + c.modules.flatMap(m => m.lessons).length, 0)
  const totalCompleted = completedLessons.length
  const overallProgress = totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0
  const isComplete = overallProgress === 100 && totalCompleted > 0

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  // Show certificate if course is complete
  if (showCertificate && isComplete) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={() => setShowCertificate(false)}
          className="inline-flex items-center gap-2 text-indigo-200/50 hover:text-white mb-6 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Course
        </button>
        <Certificate
          userName="Student Name" // In production, get from user profile
          completedAt={new Date().toISOString()}
          credentialId={`${CERTIFICATE_INFO.credentialId}-${Date.now().toString(36).toUpperCase()}`}
        />
      </div>
    )
  }

  // If course not purchased, show preview/paywall
  if (!coursePurchased) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-400 text-sm font-medium px-4 py-2 rounded-full mb-4">
            <span className="text-lg">✨</span>
            Learn at your own pace
          </div>
          <h1 className="text-3xl font-semibold text-white mb-3">
            Master Astrology Your Way
          </h1>
          <p className="text-indigo-200/60 text-lg max-w-2xl mx-auto mb-4">
            Whether you want to understand your own chart better or dream of reading charts for others, this course takes you from curious beginner to confident practitioner.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-500/10 text-indigo-300 text-sm rounded-full">
              <span>🔮</span> For personal discovery
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-pink-500/10 text-pink-300 text-sm rounded-full">
              <span>💫</span> For aspiring readers
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 text-amber-300 text-sm rounded-full">
              <span>🎓</span> For future teachers
            </span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-4 mb-10">
          <div className="bg-indigo-950/30 rounded-xl p-4 text-center">
            <div className="text-2xl font-semibold text-white">{COMPREHENSIVE_COURSE_OUTLINE.totalModules}</div>
            <div className="text-indigo-200/50 text-sm">Modules</div>
          </div>
          <div className="bg-indigo-950/30 rounded-xl p-4 text-center">
            <div className="text-2xl font-semibold text-white">{COMPREHENSIVE_COURSE_OUTLINE.totalLessons}</div>
            <div className="text-indigo-200/50 text-sm">Lessons</div>
          </div>
          <div className="bg-indigo-950/30 rounded-xl p-4 text-center">
            <div className="text-2xl font-semibold text-white">2-4</div>
            <div className="text-indigo-200/50 text-sm">Min/Lesson</div>
          </div>
          <div className="bg-indigo-950/30 rounded-xl p-4 text-center">
            <div className="text-2xl font-semibold text-amber-400">1</div>
            <div className="text-indigo-200/50 text-sm">Certificate</div>
          </div>
        </div>

        {/* Locked Course Preview */}
        <div className="relative mb-10">
          <div className="space-y-4 blur-[3px] select-none pointer-events-none">
            {COMPREHENSIVE_COURSE_OUTLINE.modules.slice(0, 4).map((module) => (
              <div key={module.id} className="bg-indigo-950/30 rounded-2xl p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-300 font-semibold">
                    {module.number}
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{module.title}</h3>
                    <p className="text-indigo-200/50 text-sm">{module.lessons} lessons</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="bg-indigo-950/30 rounded-2xl p-6 text-center text-indigo-200/50">
              +{COMPREHENSIVE_COURSE_OUTLINE.totalModules - 4} more modules...
            </div>
          </div>

          {/* Lock Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-[#1a1a2e]/95 via-[#1a1a2e]/70 to-[#1a1a2e]/50 rounded-2xl">
            <div className="text-center px-6">
              <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🌟</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Start Your Astrology Journey</h3>
              <p className="text-indigo-200/60 mb-6 max-w-md">
                {COMPREHENSIVE_COURSE_OUTLINE.totalLessons} lessons designed to take you from complete beginner to confidently reading charts - at your own pace.
              </p>
              <Link
                href="/learn/preview"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25 text-lg"
              >
                See What You&apos;ll Learn - £{COURSE_PRICE}
              </Link>
            </div>
          </div>
        </div>

        {/* Two Paths Section */}
        <div className="grid md:grid-cols-2 gap-4 mb-10">
          <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-2xl p-6">
            <div className="text-3xl mb-3">🔮</div>
            <h3 className="text-lg font-semibold text-white mb-2">For Personal Discovery</h3>
            <p className="text-indigo-200/60 text-sm">
              Finally understand your birth chart on a deep level. Learn why you are the way you are, what drives you, and how to work with your cosmic blueprint.
            </p>
          </div>
          <div className="bg-gradient-to-br from-pink-500/10 to-amber-500/10 border border-pink-500/20 rounded-2xl p-6">
            <div className="text-3xl mb-3">💫</div>
            <h3 className="text-lg font-semibold text-white mb-2">For Aspiring Professionals</h3>
            <p className="text-indigo-200/60 text-sm">
              Want to read charts for friends, start a side hustle, or even teach astrology? We&apos;ve got dedicated modules on professional practice and how to teach.
            </p>
          </div>
        </div>

        {/* What's Included */}
        <div className="bg-indigo-950/30 rounded-2xl p-6 mb-10">
          <h2 className="text-xl font-semibold text-white mb-2">Everything you need to learn astrology properly</h2>
          <p className="text-indigo-200/50 text-sm mb-4">No fluff, no filler - just a clear path from beginner to confident practitioner</p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: '📚', text: `${COMPREHENSIVE_COURSE_OUTLINE.totalLessons} bite-sized lessons` },
              { icon: '⏰', text: '2-4 min per lesson - easy to fit in your day' },
              { icon: '✨', text: 'Practice with your own birth chart' },
              { icon: '📝', text: 'Quizzes to check your understanding' },
              { icon: '👥', text: 'How to read for clients professionally' },
              { icon: '🎓', text: 'How to teach astrology to others' },
              { icon: '📜', text: 'Certificate when you complete it' },
              { icon: '♾️', text: 'Lifetime access - go at your own pace' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xl">{item.icon}</span>
                <span className="text-indigo-200/70">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Certificate Preview */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-2 text-center">Get certified when you&apos;re done</h2>
          <p className="text-center text-indigo-200/50 text-sm mb-4">
            Complete the course and earn a certificate you can share with clients or add to your credentials
          </p>
          <CertificatePreview />
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <Link
            href="/learn/preview"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25"
          >
            See Full Curriculum
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    )
  }

  // Course is purchased - show full course content
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-semibold text-white mb-3">
          Your Astrology Journey 🌟
        </h1>
        <p className="text-indigo-200/60 text-lg max-w-2xl mx-auto">
          Work through the lessons at your own pace. Each one builds on the last, and you can always come back to review.
        </p>
      </div>

      {/* Overall Progress */}
      <div className="bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-pink-600/10 rounded-2xl p-6 mb-10 border border-indigo-500/20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-white font-semibold">Your Progress</h2>
            <p className="text-indigo-200/50 text-sm">{totalCompleted} of {totalLessons} lessons completed</p>
          </div>
          {isComplete && (
            <button
              onClick={() => setShowCertificate(true)}
              className="flex items-center gap-2 px-4 py-2 bg-amber-500/20 text-amber-400 font-medium rounded-lg hover:bg-amber-500/30 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              View Certificate
            </button>
          )}
        </div>
        <div className="h-3 bg-indigo-900/50 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-500"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
        <div className="text-right mt-2">
          <span className="text-purple-400 font-semibold">{overallProgress}%</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        <div className="bg-indigo-950/30 rounded-xl p-4 text-center">
          <div className="text-2xl font-semibold text-white">{totalCompleted}</div>
          <div className="text-indigo-200/50 text-sm">Lessons Completed</div>
        </div>
        <div className="bg-indigo-950/30 rounded-xl p-4 text-center">
          <div className="text-2xl font-semibold text-white">{totalLessons}</div>
          <div className="text-indigo-200/50 text-sm">Total Lessons</div>
        </div>
        <div className="bg-indigo-950/30 rounded-xl p-4 text-center">
          <div className="text-2xl font-semibold text-white">
            {COURSES.reduce((acc, c) => acc + c.estimatedMinutes, 0)}
          </div>
          <div className="text-indigo-200/50 text-sm">Minutes of Content</div>
        </div>
      </div>

      {/* Courses */}
      <div className="space-y-6">
        {COURSES.map((course) => {
          const lessonIds = getAllLessonIds(course.id)
          const progress = getCourseProgress(lessonIds)
          const completedCount = lessonIds.filter(id => completedLessons.includes(id)).length

          return (
            <div
              key={course.id}
              className="bg-indigo-950/30 rounded-2xl p-6"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="text-4xl">{course.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-xl font-semibold text-white">{course.title}</h2>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 capitalize">
                      {course.difficulty}
                    </span>
                  </div>
                  <p className="text-indigo-200/50 text-sm">{course.description}</p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="text-indigo-200/50">{completedCount} of {lessonIds.length} lessons</span>
                  <span className="text-purple-400">{progress}%</span>
                </div>
                <div className="h-2 bg-indigo-900/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Modules */}
              <div className="space-y-3">
                {course.modules.map((module, moduleIndex) => {
                  const moduleLessonIds = module.lessons.map(l => l.id)
                  const moduleCompletedCount = moduleLessonIds.filter(id => completedLessons.includes(id)).length
                  const isModuleLessonsComplete = moduleCompletedCount === moduleLessonIds.length
                  const moduleTest = getModuleTest(module.id)
                  const testResult = getModuleTestResult(module.id)
                  const testPassed = isModuleTestPassed(module.id)
                  const isModuleFullyComplete = isModuleLessonsComplete && (!moduleTest || testPassed)

                  return (
                    <div key={module.id} className="bg-indigo-950/40 rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          isModuleFullyComplete
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-indigo-900/50 text-indigo-200/70'
                        }`}>
                          {isModuleFullyComplete ? '✓' : moduleIndex + 1}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-medium">{module.title}</h3>
                          <p className="text-indigo-300/40 text-xs">{moduleCompletedCount}/{module.lessons.length} lessons</p>
                        </div>
                        {/* Module Test Status Badge */}
                        {moduleTest && (
                          <div>
                            {testPassed ? (
                              <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Test Passed
                              </span>
                            ) : testResult ? (
                              <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-500/20 text-amber-400 text-xs rounded-full">
                                {testResult.percentage}% - Retry
                              </span>
                            ) : isModuleLessonsComplete ? (
                              <span className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-500/20 text-indigo-300 text-xs rounded-full">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                Test Ready
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-900/50 text-indigo-300/50 text-xs rounded-full">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                Test Locked
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="grid gap-2 pl-11">
                        {module.lessons.map((lesson) => {
                          const isLessonCompleted = completedLessons.includes(lesson.id)

                          return (
                            <Link
                              key={lesson.id}
                              href={`/learn/${course.id}/${lesson.id}`}
                              className="flex items-center gap-3 p-2 rounded-lg hover:bg-indigo-900/30 transition-colors group"
                            >
                              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                                isLessonCompleted
                                  ? 'bg-green-500/20 text-green-400'
                                  : 'border border-indigo-500/30 text-indigo-300/40 group-hover:border-indigo-500/50'
                              }`}>
                                {isLessonCompleted && '✓'}
                              </div>
                              <span className={`text-sm flex-1 ${
                                isLessonCompleted ? 'text-indigo-200/50' : 'text-indigo-200/70 group-hover:text-white'
                              }`}>
                                {lesson.title}
                              </span>
                              <span className="text-indigo-300/30 text-xs">
                                {lesson.estimatedMinutes} min
                              </span>
                            </Link>
                          )
                        })}

                        {/* Module Test Link */}
                        {moduleTest && (
                          <Link
                            href={`/learn/${course.id}/test/${module.id}`}
                            className={`flex items-center gap-3 p-2 rounded-lg transition-colors group ${
                              isModuleLessonsComplete
                                ? 'hover:bg-indigo-900/30'
                                : 'opacity-50 cursor-not-allowed pointer-events-none'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-md flex items-center justify-center text-xs ${
                              testPassed
                                ? 'bg-green-500/20 text-green-400'
                                : isModuleLessonsComplete
                                  ? 'bg-purple-500/20 text-purple-400'
                                  : 'bg-indigo-900/50 text-indigo-300/30'
                            }`}>
                              {testPassed ? '✓' : (
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                </svg>
                              )}
                            </div>
                            <span className={`text-sm flex-1 ${
                              testPassed
                                ? 'text-indigo-200/50'
                                : isModuleLessonsComplete
                                  ? 'text-purple-300 group-hover:text-purple-200 font-medium'
                                  : 'text-indigo-300/40'
                            }`}>
                              Module Test
                              {testResult && !testPassed && (
                                <span className="ml-2 text-amber-400/70">({testResult.percentage}%)</span>
                              )}
                            </span>
                            <span className={`text-xs ${
                              isModuleLessonsComplete ? 'text-indigo-300/50' : 'text-indigo-300/30'
                            }`}>
                              ~{moduleTest.estimatedMinutes} min
                            </span>
                          </Link>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* CTA */}
              {progress === 0 ? (
                <Link
                  href={`/learn/${course.id}/${course.modules[0].lessons[0].id}`}
                  className="mt-4 block w-full text-center py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:opacity-90 transition-opacity"
                >
                  Start Course
                </Link>
              ) : progress < 100 ? (
                <Link
                  href={`/learn/${course.id}/${getNextUncompletedLesson(course, completedLessons)}`}
                  className="mt-4 block w-full text-center py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:opacity-90 transition-opacity"
                >
                  Continue Learning
                </Link>
              ) : (
                <div className="mt-4 text-center py-3 text-green-400 font-medium">
                  Course Complete!
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function getNextUncompletedLesson(course: typeof COURSES[0], completedLessons: string[]): string {
  for (const module of course.modules) {
    for (const lesson of module.lessons) {
      if (!completedLessons.includes(lesson.id)) {
        return lesson.id
      }
    }
  }
  // All complete, return first lesson
  return course.modules[0].lessons[0].id
}
