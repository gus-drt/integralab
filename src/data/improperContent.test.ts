import { describe, expect, it } from 'vitest'
import { improperExercises } from './improperExercises'
import { improperLessons } from './improperLessons'

describe('módulo de integrais impróprias', () => {
  it('possui três lições e quatro exercícios por lição', () => {
    expect(improperLessons).toHaveLength(3)
    expect(improperExercises).toHaveLength(12)
    expect(improperLessons.every((lesson) => lesson.exerciseIds.length === 4)).toBe(true)
  })
  it('mantém IDs únicos e referências válidas', () => {
    const ids = improperExercises.map((exercise) => exercise.id)
    expect(new Set(ids).size).toBe(ids.length)
    expect(improperLessons.flatMap((lesson) => lesson.exerciseIds).every((id) => ids.includes(id))).toBe(true)
  })
  it('distingue os dois critérios de p-integral', () => {
    const infinity = improperExercises.find((exercise) => exercise.id === 'imp-03-p')
    const zero = improperExercises.find((exercise) => exercise.id === 'imp-03-pzero')
    expect(infinity?.expectedAnswer).toBe('a')
    expect(zero?.expectedAnswer).toBe('b')
  })
})
