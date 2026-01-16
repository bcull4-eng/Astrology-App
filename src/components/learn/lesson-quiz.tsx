'use client'

import { useState } from 'react'
import type { QuizQuestion } from '@/types'
import { useLearningStore } from '@/store/learning'

interface LessonQuizProps {
  questions: QuizQuestion[]
  lessonId: string
  onComplete: (score: number) => void
}

export function LessonQuiz({ questions, lessonId, onComplete }: LessonQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const { saveQuizScore } = useLearningStore()

  const currentQuestion = questions[currentIndex]
  const isLastQuestion = currentIndex === questions.length - 1
  const isCorrect = selectedAnswer === currentQuestion.correctIndex

  const handleSelect = (index: number) => {
    if (showResult) return
    setSelectedAnswer(index)
  }

  const handleSubmit = () => {
    if (selectedAnswer === null) return

    setShowResult(true)
    if (isCorrect) {
      setCorrectCount((c) => c + 1)
    }
  }

  const handleNext = () => {
    if (isLastQuestion) {
      // Quiz complete
      const finalScore = correctCount + (isCorrect ? 1 : 0)
      const percentage = Math.round((finalScore / questions.length) * 100)
      saveQuizScore(lessonId, percentage)
      setIsComplete(true)
      onComplete(percentage)
    } else {
      setCurrentIndex((i) => i + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    }
  }

  if (isComplete) {
    const finalScore = correctCount
    const percentage = Math.round((finalScore / questions.length) * 100)

    return (
      <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50 text-center">
        <div className="text-5xl mb-4">
          {percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : '📚'}
        </div>
        <h2 className="text-2xl font-semibold text-white mb-2">Quiz Complete!</h2>
        <p className="text-slate-400 mb-6">
          You scored {finalScore} out of {questions.length}
        </p>

        <div className="w-full max-w-xs mx-auto mb-6">
          <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                percentage >= 80
                  ? 'bg-green-500'
                  : percentage >= 60
                  ? 'bg-yellow-500'
                  : 'bg-orange-500'
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
          <p className="text-right text-sm text-slate-400 mt-1">{percentage}%</p>
        </div>

        {percentage >= 80 ? (
          <p className="text-green-400">Excellent work! You&apos;ve mastered this lesson.</p>
        ) : percentage >= 60 ? (
          <p className="text-yellow-400">Good effort! Review the lesson to improve your score.</p>
        ) : (
          <p className="text-orange-400">Keep learning! Review the lesson and try again.</p>
        )}
      </div>
    )
  }

  return (
    <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
      {/* Progress */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-slate-400 text-sm">
          Question {currentIndex + 1} of {questions.length}
        </span>
        <div className="flex gap-1">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i < currentIndex
                  ? 'bg-purple-500'
                  : i === currentIndex
                  ? 'bg-purple-400'
                  : 'bg-slate-600'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Question */}
      <h3 className="text-xl text-white font-medium mb-6">{currentQuestion.question}</h3>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {currentQuestion.options.map((option, index) => {
          const isSelected = selectedAnswer === index
          const isCorrectOption = index === currentQuestion.correctIndex

          let optionStyles = 'border-slate-600 hover:border-slate-500'

          if (showResult) {
            if (isCorrectOption) {
              optionStyles = 'border-green-500 bg-green-500/10'
            } else if (isSelected && !isCorrectOption) {
              optionStyles = 'border-red-500 bg-red-500/10'
            }
          } else if (isSelected) {
            optionStyles = 'border-purple-500 bg-purple-500/10'
          }

          return (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              disabled={showResult}
              className={`w-full p-4 rounded-xl border text-left transition-all ${optionStyles}`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs ${
                    showResult && isCorrectOption
                      ? 'border-green-500 bg-green-500 text-white'
                      : showResult && isSelected && !isCorrectOption
                      ? 'border-red-500 bg-red-500 text-white'
                      : isSelected
                      ? 'border-purple-500 bg-purple-500 text-white'
                      : 'border-slate-600'
                  }`}
                >
                  {showResult && isCorrectOption && '✓'}
                  {showResult && isSelected && !isCorrectOption && '✕'}
                </div>
                <span
                  className={
                    showResult && isCorrectOption
                      ? 'text-green-300'
                      : showResult && isSelected && !isCorrectOption
                      ? 'text-red-300'
                      : 'text-slate-300'
                  }
                >
                  {option}
                </span>
              </div>
            </button>
          )
        })}
      </div>

      {/* Explanation */}
      {showResult && (
        <div
          className={`p-4 rounded-xl mb-6 ${
            isCorrect ? 'bg-green-500/10 border border-green-500/20' : 'bg-blue-500/10 border border-blue-500/20'
          }`}
        >
          <p className={`text-sm ${isCorrect ? 'text-green-300' : 'text-blue-300'}`}>
            {currentQuestion.explanation}
          </p>
        </div>
      )}

      {/* Action Button */}
      {!showResult ? (
        <button
          onClick={handleSubmit}
          disabled={selectedAnswer === null}
          className={`w-full py-3 rounded-xl font-medium transition-all ${
            selectedAnswer === null
              ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90'
          }`}
        >
          Check Answer
        </button>
      ) : (
        <button
          onClick={handleNext}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:opacity-90 transition-opacity"
        >
          {isLastQuestion ? 'See Results' : 'Next Question'}
        </button>
      )}
    </div>
  )
}
