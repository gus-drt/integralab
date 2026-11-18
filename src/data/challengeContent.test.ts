import { describe, expect, it } from 'vitest'
import { challengeExercises } from './challengeExercises'

describe('desafios opcionais', () => {
  it('possui IDs únicos e somente níveis avançados', () => {
    expect(new Set(challengeExercises.map((item) => item.id)).size).toBe(challengeExercises.length)
    expect(challengeExercises.every((item) => item.difficulty >= 4)).toBe(true)
  })
  it('mantém solução, dicas e erros comuns', () => {
    expect(challengeExercises.every((item) => item.solution.length && item.hints.length >= 2 && item.commonErrors.length)).toBe(true)
  })
})
