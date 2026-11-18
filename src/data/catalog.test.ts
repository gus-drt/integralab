import { describe, expect, it } from 'vitest'
import { allExercises } from './catalog'

describe('auditoria global do banco de exercícios', () => {
  it('mantém IDs únicos no catálogo completo', () => {
    expect(allExercises).toHaveLength(136)
    expect(new Set(allExercises.map((item) => item.id)).size).toBe(allExercises.length)
  })
  it('preenche metadados e respostas válidas', () => {
    for (const exercise of allExercises) {
      expect(exercise.prompt.trim().length).toBeGreaterThan(8)
      expect(exercise.solution.length).toBeGreaterThan(0)
      expect(exercise.hints.length).toBeGreaterThanOrEqual(2)
      expect(exercise.commonErrors.length).toBeGreaterThan(0)
      expect(exercise.suggestedMinutes).toBeGreaterThan(0)
      expect(exercise.tags.length).toBeGreaterThan(0)
      if (exercise.format === 'numeric') expect(Number.isFinite(exercise.expectedAnswer)).toBe(true)
      if (exercise.format === 'multiple-choice') expect(exercise.choices?.some((choice) => choice.id === exercise.expectedAnswer)).toBe(true)
    }
  })
})
