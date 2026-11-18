import { describe, expect, it } from 'vitest'
import { checkExpressionEquivalent } from '../math/expression'
import { techniqueExercises } from './techniqueExercises'
import { techniqueLessons } from './techniqueLessons'

describe('módulo de técnicas', () => {
  it('possui oito lições e quatro exercícios por lição', () => {
    expect(techniqueLessons).toHaveLength(8)
    expect(techniqueExercises).toHaveLength(32)
    expect(techniqueLessons.every((lesson) => lesson.exerciseIds.length === 4)).toBe(true)
  })
  it('mantém IDs únicos e referências válidas', () => {
    const ids = techniqueExercises.map((exercise) => exercise.id)
    expect(new Set(ids).size).toBe(ids.length)
    expect(techniqueLessons.flatMap((lesson) => lesson.exerciseIds).every((id) => ids.includes(id))).toBe(true)
  })
  it('verifica resultados representativos das técnicas', () => {
    expect(checkExpressionEquivalent('(x^2+1)^4/4', '(x^2+1)^4/4+C', 'up-to-constant').equivalent).toBe(true)
    expect(checkExpressionEquivalent('x*exp(x)-exp(x)', 'x*exp(x)-exp(x)+C', 'up-to-constant').equivalent).toBe(true)
    expect(checkExpressionEquivalent('-x*cos(x)+sin(x)', '-x*cos(x)+sin(x)+C', 'up-to-constant').equivalent).toBe(true)
    expect(checkExpressionEquivalent('ln(x)-ln(x+1)', 'ln(x)-ln(x+1)+C', 'up-to-constant').equivalent).toBe(true)
  })
})
