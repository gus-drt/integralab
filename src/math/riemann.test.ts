import { describe, expect, it } from 'vitest'
import { riemannSum, square, squareIntegral } from './riemann'

describe('somas de Riemann', () => {
  it('calcula somas esquerda, direita e ponto médio', () => {
    expect(riemannSum(square, 0, 2, 2, 'left')).toBeCloseTo(1)
    expect(riemannSum(square, 0, 2, 2, 'right')).toBeCloseTo(5)
    expect(riemannSum(square, 0, 2, 2, 'midpoint')).toBeCloseTo(2.5)
  })
  it('converge para a integral exata', () => {
    const exact = squareIntegral(0, 2)
    expect(Math.abs(riemannSum(square, 0, 2, 1000, 'midpoint') - exact)).toBeLessThan(0.00001)
  })
  it('preserva orientação e rejeita partições inválidas', () => {
    expect(squareIntegral(2, 0)).toBeCloseTo(-8 / 3)
    expect(() => riemannSum(square, 0, 2, 0, 'left')).toThrow()
  })
})
