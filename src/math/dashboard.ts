import { allExercises } from '../data/catalog'
import { allLessons, learningModules } from '../data/learningCatalog'
import type { ProgressState } from '../state/progress'

export function getDashboard(progress: ProgressState) {
  const completed = new Set(progress.completedLessons)
  const modules = learningModules.map((module) => {
    const completedCount = module.lessons.filter((lesson) => completed.has(lesson.id)).length
    return { id: module.id, title: module.title, completed: completedCount, total: module.lessons.length, percentage: Math.round(completedCount / module.lessons.length * 100) }
  })
  const next = allLessons.find((lesson) => !completed.has(lesson.id))
  const attempts = Object.entries(progress.attempts)
  const correct = attempts.filter(([, value]) => value.correct).length
  const byTopic = new Map<string, { correct: number; total: number }>()
  for (const [id, attempt] of attempts) {
    const exercise = allExercises.find((item) => item.id === id)
    if (!exercise) continue
    const value = byTopic.get(exercise.topic) ?? { correct: 0, total: 0 }
    value.total += 1
    value.correct += attempt.correct ? 1 : 0
    byTopic.set(exercise.topic, value)
  }
  const weakest = [...byTopic.entries()].map(([topic, value]) => ({ topic, percentage: Math.round(value.correct / value.total * 100), total: value.total })).filter((item) => item.total >= 1).sort((a, b) => a.percentage - b.percentage)[0]
  return {
    modules,
    completedLessons: completed.size,
    totalLessons: allLessons.length,
    overallPercentage: Math.round(completed.size / allLessons.length * 100),
    attemptedQuestions: attempts.length,
    accuracy: attempts.length ? Math.round(correct / attempts.length * 100) : 0,
    next: next ? { title: next.title, path: `/aprender/${next.moduleId}/${next.id}`, moduleTitle: next.moduleTitle } : null,
    weakest,
  }
}
