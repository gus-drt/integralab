import { describe, expect, it } from 'vitest'
import { zeroExercises } from './zeroExercises'
import { zeroLessons } from './zeroLessons'

describe('conteúdo da Trilha Zero', () => {
  it('possui seis lições em ordem, com dois exercícios cada', () => {
    expect(zeroLessons).toHaveLength(6)
    expect(zeroLessons.map((lesson) => lesson.order)).toEqual([1, 2, 3, 4, 5, 6])
    expect(zeroLessons.every((lesson) => lesson.exerciseIds.length >= 2)).toBe(true)
  })

  it('usa IDs únicos e referencia somente exercícios existentes', () => {
    const ids = zeroExercises.map((exercise) => exercise.id)
    expect(new Set(ids).size).toBe(ids.length)
    const referenced = zeroLessons.flatMap((lesson) => lesson.exerciseIds)
    expect(referenced.every((id) => ids.includes(id))).toBe(true)
  })

  it('mantém respostas e soluções pedagógicas preenchidas', () => {
    expect(zeroExercises.every((exercise) => exercise.expectedAnswer !== '')).toBe(true)
    expect(zeroExercises.every((exercise) => exercise.hints.length >= 2)).toBe(true)
    expect(zeroExercises.every((exercise) => exercise.solution.length >= 1)).toBe(true)
  })
})
