import { describe, expect, it } from 'vitest'
import { checkExpressionEquivalent } from './expression'

describe('equivalência segura de expressões', () => {
  it('aceita multiplicação implícita e formas algébricas equivalentes', () => {
    expect(checkExpressionEquivalent('2x + x', '3*x').equivalent).toBe(true)
    expect(checkExpressionEquivalent('(x+1)^2', 'x^2+2x+1').equivalent).toBe(true)
  })

  it('aceita primitivas que diferem por constante', () => {
    expect(checkExpressionEquivalent('2x + 17', '2*x+C', 'up-to-constant').equivalent).toBe(true)
    expect(checkExpressionEquivalent('x^2 + 4', 'x^2+C', 'up-to-constant').equivalent).toBe(true)
  })

  it('rejeita derivada errada e entradas fora do escopo', () => {
    expect(checkExpressionEquivalent('2x^2', '2*x+C', 'up-to-constant').equivalent).toBe(false)
    expect(checkExpressionEquivalent('alert(1)', 'x').equivalent).toBe(false)
    expect(checkExpressionEquivalent('x/(x-x)', 'x').equivalent).toBe(false)
  })

  it('aceita as funções elementares habilitadas', () => {
    expect(checkExpressionEquivalent('-cos(x)+4', '-cos(x)+C', 'up-to-constant').equivalent).toBe(true)
    expect(checkExpressionEquivalent('exp(2*x)/2', 'exp(2*x)/2+C', 'up-to-constant').equivalent).toBe(true)
    expect(checkExpressionEquivalent('ln(x)', 'ln(x)+C', 'up-to-constant').equivalent).toBe(true)
    expect(checkExpressionEquivalent('sin(x)^2', '1-cos(x)^2').equivalent).toBe(true)
  })
})
