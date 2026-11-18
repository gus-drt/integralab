import { describe, expect, it } from 'vitest'
import { checkExpressionEquivalent } from '../math/expression'
import { primitiveExercises } from './primitiveExercises'
import { primitiveLessons } from './primitiveLessons'

describe('módulo de primitivas', () => {
  it('possui cinco lições e quatro exercícios por lição', () => {
    expect(primitiveLessons).toHaveLength(5)
    expect(primitiveLessons.every((lesson) => lesson.exerciseIds.length === 4)).toBe(true)
    expect(primitiveExercises).toHaveLength(20)
  })

  it('mantém IDs únicos e todas as referências válidas', () => {
    const ids = primitiveExercises.map((exercise) => exercise.id)
    expect(new Set(ids).size).toBe(ids.length)
    expect(primitiveLessons.flatMap((lesson) => lesson.exerciseIds).every((id) => ids.includes(id))).toBe(true)
  })

  it('aceita formas equivalentes das regras de potência e linearidade', () => {
    expect(checkExpressionEquivalent('0.3333333333333333*x^3', 'x^3/3', 'up-to-constant').equivalent).toBe(true)
    expect(checkExpressionEquivalent('2/3*x^(3/2)+9', '2*x^(3/2)/3+C', 'up-to-constant').equivalent).toBe(true)
    expect(checkExpressionEquivalent('-1/x', '-x^(-1)+C', 'up-to-constant').equivalent).toBe(true)
    expect(checkExpressionEquivalent('x^3+x^2-4x', 'x^3+x^2-4*x+C', 'up-to-constant').equivalent).toBe(true)
  })
})
