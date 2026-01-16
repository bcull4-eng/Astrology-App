'use client'

import Link from 'next/link'
import { COURSES, getAllLessonIds } from '@/lib/courses'
import { useLearningStore } from '@/store/learning'

export default function LearnPage() {
  const { getCourseProgress, completedLessons } = useLearningStore()

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-semibold text-white mb-3">
          Learn Astrology
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Master the building blocks of astrology with personalized lessons that connect directly to your birth chart.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        <div className="bg-slate-800/50 rounded-xl p-4 text-center">
          <div className="text-2xl font-semibold text-white">{completedLessons.length}</div>
          <div className="text-slate-400 text-sm">Lessons Completed</div>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 text-center">
          <div className="text-2xl font-semibold text-white">
            {COURSES.reduce((acc, c) => acc + c.modules.flatMap(m => m.lessons).length, 0)}
          </div>
          <div className="text-slate-400 text-sm">Total Lessons</div>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 text-center">
          <div className="text-2xl font-semibold text-white">
            {COURSES.reduce((acc, c) => acc + c.estimatedMinutes, 0)}
          </div>
          <div className="text-slate-400 text-sm">Minutes of Content</div>
        </div>
      </div>

      {/* Courses */}
      <div className="space-y-6">
        {COURSES.map((course) => {
          const lessonIds = getAllLessonIds(course.id)
          const progress = getCourseProgress(lessonIds)
          const totalLessons = lessonIds.length
          const completedCount = lessonIds.filter(id => completedLessons.includes(id)).length

          return (
            <div
              key={course.id}
              className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50"
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
                  <p className="text-slate-400 text-sm">{course.description}</p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="text-slate-400">{completedCount} of {totalLessons} lessons</span>
                  <span className="text-purple-400">{progress}%</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
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
                  const moduleCompleted = moduleLessonIds.filter(id => completedLessons.includes(id)).length
                  const isModuleComplete = moduleCompleted === moduleLessonIds.length

                  return (
                    <div key={module.id} className="bg-slate-900/50 rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          isModuleComplete
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-slate-700 text-slate-300'
                        }`}>
                          {isModuleComplete ? '✓' : moduleIndex + 1}
                        </div>
                        <div>
                          <h3 className="text-white font-medium">{module.title}</h3>
                          <p className="text-slate-500 text-xs">{moduleCompleted}/{module.lessons.length} lessons</p>
                        </div>
                      </div>

                      <div className="grid gap-2 pl-11">
                        {module.lessons.map((lesson) => {
                          const isCompleted = completedLessons.includes(lesson.id)

                          return (
                            <Link
                              key={lesson.id}
                              href={`/learn/${course.id}/${lesson.id}`}
                              className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800/50 transition-colors group"
                            >
                              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                                isCompleted
                                  ? 'bg-green-500/20 text-green-400'
                                  : 'border border-slate-600 text-slate-500 group-hover:border-slate-500'
                              }`}>
                                {isCompleted && '✓'}
                              </div>
                              <span className={`text-sm flex-1 ${
                                isCompleted ? 'text-slate-400' : 'text-slate-300 group-hover:text-white'
                              }`}>
                                {lesson.title}
                              </span>
                              <span className="text-slate-600 text-xs">
                                {lesson.estimatedMinutes} min
                              </span>
                            </Link>
                          )
                        })}
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
