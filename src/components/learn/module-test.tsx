'use client'

/**
 * Module Test Component
 *
 * Comprehensive test at the end of each module to assess understanding.
 * Features multiple question types, progress tracking, and detailed results.
 */

import { useState } from 'react'
import Link from 'next/link'
import type { ModuleTest, ModuleTestQuestion, ModuleTestResult } from '@/types/learning'
import { useLearningStore } from '@/store/learning'

interface ModuleTestProps {
  test: ModuleTest
  moduleId: string
  moduleTitle: string
  courseId: string
  onComplete: (result: ModuleTestResult) => void
}

export function ModuleTestComponent({
  test,
  moduleId,
  moduleTitle,
  courseId,
  onComplete,
}: ModuleTestProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number[]>>({})
  const [showResults, setShowResults] = useState(false)
  const [result, setResult] = useState<ModuleTestResult | null>(null)
  const { saveModuleTestResult } = useLearningStore()

  const currentQuestion = test.questions[currentQuestionIndex]
  const totalQuestions = test.questions.length
  const answeredCount = Object.keys(answers).length

  const handleSelectAnswer = (questionId: string, optionIndex: number, isMultiSelect: boolean) => {
    setAnswers((prev) => {
      if (isMultiSelect) {
        const current = prev[questionId] || []
        if (current.includes(optionIndex)) {
          return { ...prev, [questionId]: current.filter((i) => i !== optionIndex) }
        }
        return { ...prev, [questionId]: [...current, optionIndex] }
      }
      return { ...prev, [questionId]: [optionIndex] }
    })
  }

  const isAnswerSelected = (questionId: string, optionIndex: number) => {
    return answers[questionId]?.includes(optionIndex) ?? false
  }

  const goToNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    }
  }

  const goToPrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
    }
  }

  const calculateResults = () => {
    let earnedPoints = 0
    let totalPoints = 0

    test.questions.forEach((question) => {
      totalPoints += question.points
      const userAnswers = answers[question.id] || []
      const correctAnswers = question.correctIndices

      // Check if arrays are equal (order doesn't matter)
      const isCorrect =
        userAnswers.length === correctAnswers.length &&
        userAnswers.every((a) => correctAnswers.includes(a))

      if (isCorrect) {
        earnedPoints += question.points
      }
    })

    const percentage = Math.round((earnedPoints / totalPoints) * 100)
    const passed = percentage >= test.passingScore

    const testResult: ModuleTestResult = {
      score: earnedPoints,
      totalPoints,
      percentage,
      passed,
      completedAt: new Date().toISOString(),
      answers,
    }

    setResult(testResult)
    setShowResults(true)
    saveModuleTestResult(moduleId, testResult)
    onComplete(testResult)
  }

  const canSubmit = answeredCount === totalQuestions

  // Results view
  if (showResults && result) {
    return (
      <div className="max-w-3xl mx-auto">
        {/* Results Header */}
        <div className={`rounded-2xl p-8 mb-8 text-center ${
          result.passed
            ? 'bg-gradient-to-br from-emerald-500/10 via-green-500/10 to-teal-500/10 border border-emerald-500/20'
            : 'bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-red-500/10 border border-amber-500/20'
        }`}>
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
            result.passed ? 'bg-emerald-500/20' : 'bg-amber-500/20'
          }`}>
            {result.passed ? (
              <svg className="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-10 h-10 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            )}
          </div>

          <h2 className="text-2xl font-bold text-white mb-2">
            {result.passed ? 'Congratulations!' : 'Keep Learning!'}
          </h2>
          <p className={`text-lg mb-4 ${result.passed ? 'text-emerald-300' : 'text-amber-300'}`}>
            {result.passed
              ? `You passed the ${moduleTitle} test!`
              : `You need ${test.passingScore}% to pass. Try again after reviewing.`}
          </p>

          <div className="flex items-center justify-center gap-8">
            <div>
              <div className={`text-4xl font-bold ${result.passed ? 'text-emerald-400' : 'text-amber-400'}`}>
                {result.percentage}%
              </div>
              <div className="text-indigo-200/50 text-sm">Score</div>
            </div>
            <div className="w-px h-12 bg-indigo-500/20" />
            <div>
              <div className="text-4xl font-bold text-white">
                {result.score}/{result.totalPoints}
              </div>
              <div className="text-indigo-200/50 text-sm">Points</div>
            </div>
          </div>
        </div>

        {/* Question Review */}
        <h3 className="text-lg font-semibold text-white mb-4">Review Your Answers</h3>
        <div className="space-y-4 mb-8">
          {test.questions.map((question, index) => {
            const userAnswers = answers[question.id] || []
            const isCorrect =
              userAnswers.length === question.correctIndices.length &&
              userAnswers.every((a) => question.correctIndices.includes(a))

            return (
              <div
                key={question.id}
                className={`rounded-xl p-5 border ${
                  isCorrect
                    ? 'bg-emerald-500/5 border-emerald-500/20'
                    : 'bg-rose-500/5 border-rose-500/20'
                }`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isCorrect ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                  }`}>
                    {isCorrect ? '✓' : '✗'}
                  </div>
                  <div>
                    <div className="text-white font-medium">
                      {index + 1}. {question.question}
                    </div>
                    <div className="text-indigo-200/50 text-sm mt-1">
                      {question.points} point{question.points !== 1 ? 's' : ''}
                    </div>
                  </div>
                </div>

                <div className="pl-9 space-y-2">
                  {question.options.map((option, optIdx) => {
                    const wasSelected = userAnswers.includes(optIdx)
                    const isCorrectOption = question.correctIndices.includes(optIdx)

                    return (
                      <div
                        key={optIdx}
                        className={`px-3 py-2 rounded-lg text-sm ${
                          isCorrectOption
                            ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                            : wasSelected
                              ? 'bg-rose-500/10 text-rose-300 border border-rose-500/30'
                              : 'bg-indigo-950/30 text-indigo-200/60'
                        }`}
                      >
                        {option}
                        {isCorrectOption && <span className="ml-2 text-emerald-400">✓ Correct</span>}
                        {wasSelected && !isCorrectOption && <span className="ml-2 text-rose-400">✗ Your answer</span>}
                      </div>
                    )
                  })}
                </div>

                <div className="pl-9 mt-3 p-3 bg-indigo-950/30 rounded-lg">
                  <div className="text-indigo-300/70 text-sm">
                    <span className="font-medium text-indigo-300">Explanation:</span> {question.explanation}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-center gap-4">
          {result.passed ? (
            <Link
              href={`/learn`}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all"
            >
              Continue to Next Module
            </Link>
          ) : (
            <>
              <Link
                href={`/learn`}
                className="px-6 py-3 bg-indigo-950/50 hover:bg-indigo-950/70 text-white font-medium rounded-xl transition-colors border border-indigo-500/20"
              >
                Review Lessons
              </Link>
              <button
                onClick={() => {
                  setShowResults(false)
                  setResult(null)
                  setAnswers({})
                  setCurrentQuestionIndex(0)
                }}
                className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-semibold rounded-xl transition-all"
              >
                Retry Test
              </button>
            </>
          )}
        </div>
      </div>
    )
  }

  // Test taking view
  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-white">{test.title}</h1>
            <p className="text-indigo-200/50">{moduleTitle}</p>
          </div>
          <div className="text-right">
            <div className="text-indigo-200/50 text-sm">Passing Score</div>
            <div className="text-white font-semibold">{test.passingScore}%</div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-2 bg-indigo-900/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
            />
          </div>
          <div className="text-indigo-200/70 text-sm whitespace-nowrap">
            {currentQuestionIndex + 1} / {totalQuestions}
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="bg-indigo-950/30 rounded-2xl p-6 mb-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-300 font-semibold flex-shrink-0">
            {currentQuestionIndex + 1}
          </div>
          <div>
            <div className="text-white text-lg font-medium mb-2">{currentQuestion.question}</div>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-indigo-200/50">
                {currentQuestion.points} point{currentQuestion.points !== 1 ? 's' : ''}
              </span>
              {currentQuestion.type === 'multiple-select' && (
                <span className="text-indigo-400">Select all that apply</span>
              )}
              {currentQuestion.type === 'true-false' && (
                <span className="text-indigo-300/50">True or False</span>
              )}
            </div>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-3 pl-14">
          {currentQuestion.options.map((option, optIdx) => {
            const isSelected = isAnswerSelected(currentQuestion.id, optIdx)
            const isMultiSelect = currentQuestion.type === 'multiple-select'

            return (
              <button
                key={optIdx}
                onClick={() => handleSelectAnswer(currentQuestion.id, optIdx, isMultiSelect)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-indigo-500/20 border-indigo-500 text-white'
                    : 'bg-indigo-950/40 border-indigo-500/20 text-indigo-200/70 hover:border-indigo-500/50 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-${isMultiSelect ? 'md' : 'full'} border-2 flex items-center justify-center ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-500'
                      : 'border-indigo-500/30'
                  }`}>
                    {isSelected && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span>{option}</span>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Question navigation dots */}
      <div className="flex items-center justify-center gap-2 mb-6">
        {test.questions.map((q, idx) => {
          const isAnswered = !!answers[q.id]
          const isCurrent = idx === currentQuestionIndex

          return (
            <button
              key={q.id}
              onClick={() => setCurrentQuestionIndex(idx)}
              className={`w-3 h-3 rounded-full transition-all ${
                isCurrent
                  ? 'bg-indigo-500 scale-125'
                  : isAnswered
                    ? 'bg-indigo-400/50'
                    : 'bg-indigo-900/50'
              }`}
            />
          )
        })}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={goToPrevious}
          disabled={currentQuestionIndex === 0}
          className="flex items-center gap-2 px-4 py-2 text-indigo-200/70 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>

        <div className="text-indigo-200/50 text-sm">
          {answeredCount} of {totalQuestions} answered
        </div>

        {currentQuestionIndex < totalQuestions - 1 ? (
          <button
            onClick={goToNext}
            className="flex items-center gap-2 px-4 py-2 text-indigo-200/70 hover:text-white transition-colors"
          >
            Next
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ) : (
          <button
            onClick={calculateResults}
            disabled={!canSubmit}
            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all"
          >
            Submit Test
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}
