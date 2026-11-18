import { describe, expect, it } from 'vitest'
import { applicationExercises } from './applicationExercises'
import { applicationLessons } from './applicationLessons'

describe('módulo de aplicações', () => {
  it('possui sete lições e quatro exercícios por lição', () => {
    expect(applicationLessons).toHaveLength(7)
    expect(applicationExercises).toHaveLength(28)
    expect(applicationLessons.every((lesson) => lesson.exerciseIds.length === 4)).toBe(true)
  })
  it('mantém IDs únicos e referências válidas', () => {
    const ids = applicationExercises.map((exercise) => exercise.id)
    expect(new Set(ids).size).toBe(ids.length)
    expect(applicationLessons.flatMap((lesson) => lesson.exerciseIds).every((id) => ids.includes(id))).toBe(true)
  })
  it('mantém respostas numéricas finitas', () => {
    const numeric = applicationExercises.filter((exercise) => exercise.format === 'numeric')
    expect(numeric.every((exercise) => Number.isFinite(exercise.expectedAnswer))).toBe(true)
  })
})
