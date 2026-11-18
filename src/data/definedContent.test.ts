import { describe, expect, it } from 'vitest'
import { definedExercises } from './definedExercises'
import { definedLessons } from './definedLessons'

describe('módulo de integral definida', () => {
  it('possui seis lições e quatro exercícios por lição', () => {
    expect(definedLessons).toHaveLength(6)
    expect(definedExercises).toHaveLength(24)
    expect(definedLessons.every((lesson) => lesson.exerciseIds.length === 4)).toBe(true)
  })

  it('mantém IDs únicos e referências válidas', () => {
    const ids = definedExercises.map((exercise) => exercise.id)
    expect(new Set(ids).size).toBe(ids.length)
    expect(definedLessons.flatMap((lesson) => lesson.exerciseIds).every((id) => ids.includes(id))).toBe(true)
  })

  it('registra metadados pedagógicos em todos os exercícios', () => {
    expect(definedExercises.every((exercise) => exercise.solution.length > 0)).toBe(true)
    expect(definedExercises.every((exercise) => exercise.hints.length >= 2)).toBe(true)
    expect(definedExercises.every((exercise) => exercise.commonErrors.length > 0)).toBe(true)
  })
})
