'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getLesson, getNextLesson, getPreviousLesson } from '@/lib/courses'
import { useLearningStore } from '@/store/learning'
import { LessonContentRenderer } from '@/components/learn/lesson-content-renderer'
import { LessonQuiz } from '@/components/learn/lesson-quiz'
import type { NatalChart } from '@/types'

export default function LessonPage() {
  const params = useParams()
  const router = useRouter()
  const courseId = params.courseId as string
  const lessonId = params.lessonId as string

  const { isLessonCompleted, completeLesson, setCurrentCourse, setCurrentLesson } = useLearningStore()

  const [natalChart, setNatalChart] = useState<NatalChart | null>(null)
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const lessonData = getLesson(courseId, lessonId)
  const nextLesson = getNextLesson(courseId, lessonId)
  const prevLesson = getPreviousLesson(courseId, lessonId)

  const isCompleted = isLessonCompleted(lessonId)

  useEffect(() => {
    setCurrentCourse(courseId)
    setCurrentLesson(lessonId)
  }, [courseId, lessonId, setCurrentCourse, setCurrentLesson])

  useEffect(() => {
    // Load natal chart from session storage for personalization
    const chartData = sessionStorage.getItem('natal-chart')
    if (chartData) {
      try {
        setNatalChart(JSON.parse(chartData))
      } catch (e) {
        console.error('Failed to parse natal chart:', e)
      }
    }
  }, [])

  if (!lessonData) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-semibold text-white mb-4">Lesson Not Found</h1>
        <p className="text-slate-400 mb-6">This lesson doesn&apos;t exist or has been removed.</p>
        <Link href="/learn" className="text-purple-400 hover:text-purple-300">
          Back to Courses
        </Link>
      </div>
    )
  }

  const { lesson, module, course } = lessonData
  const hasQuiz = lesson.quiz && lesson.quiz.length > 0

  const handleComplete = () => {
    if (hasQuiz && !quizCompleted) {
      setShowQuiz(true)
    } else {
      completeLesson(lessonId)
      if (nextLesson) {
        router.push(`/learn/${courseId}/${nextLesson.lesson.id}`)
      }
    }
  }

  const handleQuizComplete = (score: number) => {
    setQuizCompleted(true)
    completeLesson(lessonId)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-400 mb-8">
        <Link href="/learn" className="hover:text-white transition-colors">
          Learn
        </Link>
        <span>/</span>
        <Link href="/learn" className="hover:text-white transition-colors">
          {course.title}
        </Link>
        <span>/</span>
        <span className="text-slate-300">{module.title}</span>
      </div>

      {/* Lesson Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          {isCompleted && (
            <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">
              Completed
            </span>
          )}
          <span className="text-xs text-slate-500">
            {lesson.estimatedMinutes} min read
          </span>
        </div>
        <h1 className="text-3xl font-semibold text-white mb-2">{lesson.title}</h1>
        <p className="text-slate-400">{lesson.description}</p>
      </div>

      {/* Lesson Content */}
      {!showQuiz ? (
        <>
          <div className="prose prose-invert prose-slate max-w-none mb-10">
            <LessonContentRenderer content={lesson.content} natalChart={natalChart} />
          </div>

          {/* Mark Complete / Continue */}
          <div className="border-t border-slate-800 pt-8 mt-8">
            {!isCompleted ? (
              <button
                onClick={handleComplete}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:opacity-90 transition-opacity"
              >
                {hasQuiz ? 'Take Quiz' : 'Complete & Continue'}
              </button>
            ) : nextLesson ? (
              <Link
                href={`/learn/${courseId}/${nextLesson.lesson.id}`}
                className="block w-full py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:opacity-90 transition-opacity text-center"
              >
                Next Lesson: {nextLesson.lesson.title}
              </Link>
            ) : (
              <div className="text-center py-4">
                <div className="text-green-400 font-medium mb-2">Course Complete!</div>
                <Link href="/learn" className="text-purple-400 hover:text-purple-300">
                  Back to Courses
                </Link>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <LessonQuiz
            questions={lesson.quiz!}
            lessonId={lessonId}
            onComplete={handleQuizComplete}
          />

          {quizCompleted && nextLesson && (
            <div className="mt-8">
              <Link
                href={`/learn/${courseId}/${nextLesson.lesson.id}`}
                className="block w-full py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:opacity-90 transition-opacity text-center"
              >
                Next Lesson: {nextLesson.lesson.title}
              </Link>
            </div>
          )}
        </>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 pt-8 border-t border-slate-800">
        {prevLesson ? (
          <Link
            href={`/learn/${courseId}/${prevLesson.lesson.id}`}
            className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <span>&larr;</span>
            <span>{prevLesson.lesson.title}</span>
          </Link>
        ) : (
          <div />
        )}
        {nextLesson && !showQuiz && (
          <Link
            href={`/learn/${courseId}/${nextLesson.lesson.id}`}
            className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <span>{nextLesson.lesson.title}</span>
            <span>&rarr;</span>
          </Link>
        )}
      </div>
    </div>
  )
}
