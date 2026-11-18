type Dual = { value: number; derivative: number }
type Token = { type: 'number' | 'variable' | 'function' | 'operator' | 'left' | 'right'; value: string }

const EPSILON = 1e-8
const SAMPLE_POINTS = [-2.1, -0.7, 0.4, 1.3, 2.6, 4.2]

function normalize(raw: string): string {
  return raw
    .toLowerCase()
    .replaceAll('−', '-')
    .replaceAll('·', '*')
    .replaceAll('²', '^2')
    .replaceAll('³', '^3')
    .replace(/\s+/g, '')
    .replace(/(\d|x|c|\))(?=x|c|\()/g, '$1*')
    .replace(/(x|c|\))(?=\d)/g, '$1*')
}

function tokenize(raw: string): Token[] {
  const input = normalize(raw)
  if (!input || input.length > 120) throw new Error('Expressão vazia ou longa demais.')
  const tokens: Token[] = []
  let index = 0
  while (index < input.length) {
    const char = input[index]
    const functionMatch = input.slice(index).match(/^(sin|cos|tan|sec|ln|exp)/)
    if (functionMatch) {
      tokens.push({ type: 'function', value: functionMatch[0] })
      index += functionMatch[0].length
      continue
    }
    if (/\d|\./.test(char)) {
      const match = input.slice(index).match(/^(?:\d+(?:\.\d*)?|\.\d+)/)
      if (!match) throw new Error('Número inválido.')
      tokens.push({ type: 'number', value: match[0] })
      index += match[0].length
      continue
    }
    if (char === 'x' || char === 'c') tokens.push({ type: 'variable', value: char })
    else if ('+-*/^'.includes(char)) tokens.push({ type: 'operator', value: char })
    else if (char === '(') tokens.push({ type: 'left', value: char })
    else if (char === ')') tokens.push({ type: 'right', value: char })
    else throw new Error(`Símbolo não aceito: ${char}`)
    index += 1
  }
  return tokens
}

class Parser {
  private index = 0
  constructor(private readonly tokens: Token[], private readonly x: number) {}

  parse(): Dual {
    const result = this.expression()
    if (this.index !== this.tokens.length) throw new Error('Expressão incompleta.')
    if (!Number.isFinite(result.value) || !Number.isFinite(result.derivative)) throw new Error('Expressão fora do domínio.')
    return result
  }

  private expression(): Dual {
    let left = this.term()
    while (this.peek('+') || this.peek('-')) {
      const operator = this.next().value
      const right = this.term()
      left = operator === '+'
        ? { value: left.value + right.value, derivative: left.derivative + right.derivative }
        : { value: left.value - right.value, derivative: left.derivative - right.derivative }
    }
    return left
  }

  private term(): Dual {
    let left = this.power()
    while (this.peek('*') || this.peek('/')) {
      const operator = this.next().value
      const right = this.power()
      if (operator === '*') left = { value: left.value * right.value, derivative: left.derivative * right.value + left.value * right.derivative }
      else {
        if (Math.abs(right.value) < EPSILON) throw new Error('Divisão por zero.')
        left = { value: left.value / right.value, derivative: (left.derivative * right.value - left.value * right.derivative) / right.value ** 2 }
      }
    }
    return left
  }

  private power(): Dual {
    let base = this.unary()
    if (this.peek('^')) {
      this.next()
      const exponent = this.power()
      if (Math.abs(exponent.derivative) > EPSILON) throw new Error('Expoente variável ainda não é aceito.')
      if (base.value < 0 && !Number.isInteger(exponent.value)) throw new Error('Potência fora do domínio real.')
      if (base.value === 0 && exponent.value < 1) throw new Error('Potência fora do domínio real.')
      const value = base.value ** exponent.value
      const derivative = exponent.value === 0 ? 0 : exponent.value * base.value ** (exponent.value - 1) * base.derivative
      base = { value, derivative }
    }
    return base
  }

  private unary(): Dual {
    if (this.peek('+')) { this.next(); return this.unary() }
    if (this.peek('-')) { this.next(); const value = this.unary(); return { value: -value.value, derivative: -value.derivative } }
    return this.primary()
  }

  private primary(): Dual {
    const token = this.next()
    if (!token) throw new Error('Esperava um número, x ou parênteses.')
    if (token.type === 'number') return { value: Number(token.value), derivative: 0 }
    if (token.type === 'variable') return token.value === 'x' ? { value: this.x, derivative: 1 } : { value: 0, derivative: 0 }
    if (token.type === 'function') {
      if (this.next()?.type !== 'left') throw new Error(`Use parênteses depois de ${token.value}.`)
      const argument = this.expression()
      if (this.next()?.type !== 'right') throw new Error('Parênteses não fechados.')
      if (token.value === 'sin') return { value: Math.sin(argument.value), derivative: Math.cos(argument.value) * argument.derivative }
      if (token.value === 'cos') return { value: Math.cos(argument.value), derivative: -Math.sin(argument.value) * argument.derivative }
      if (token.value === 'tan') return { value: Math.tan(argument.value), derivative: argument.derivative / Math.cos(argument.value) ** 2 }
      if (token.value === 'sec') return { value: 1 / Math.cos(argument.value), derivative: (Math.sin(argument.value) / Math.cos(argument.value) ** 2) * argument.derivative }
      if (token.value === 'ln') {
        if (argument.value <= 0) throw new Error('Logaritmo fora do domínio real.')
        return { value: Math.log(argument.value), derivative: argument.derivative / argument.value }
      }
      return { value: Math.exp(argument.value), derivative: Math.exp(argument.value) * argument.derivative }
    }
    if (token.type === 'left') {
      const value = this.expression()
      if (this.next()?.type !== 'right') throw new Error('Parênteses não fechados.')
      return value
    }
    throw new Error('Termo inesperado.')
  }

  private peek(value: string): boolean { return this.tokens[this.index]?.value === value }
  private next(): Token { return this.tokens[this.index++] }
}

function evaluate(tokens: Token[], x: number): Dual {
  return new Parser(tokens, x).parse()
}

export type EquivalenceMode = 'exact' | 'up-to-constant'
export type EquivalenceResult = { equivalent: boolean; message: string }

export function checkExpressionEquivalent(user: string, expected: string, mode: EquivalenceMode = 'exact'): EquivalenceResult {
  try {
    const userTokens = tokenize(user)
    const expectedTokens = tokenize(expected)
    let comparedPoints = 0
    for (const x of SAMPLE_POINTS) {
      let received: Dual | undefined
      let target: Dual | undefined
      try { received = evaluate(userTokens, x) } catch { /* fora do domínio neste ponto */ }
      try { target = evaluate(expectedTokens, x) } catch { /* fora do domínio neste ponto */ }
      if (!received && !target) continue
      if (!received || !target) return { equivalent: false, message: 'As expressões não têm o mesmo domínio nos pontos verificados.' }
      comparedPoints += 1
      const left = mode === 'up-to-constant' ? received.derivative : received.value
      const right = mode === 'up-to-constant' ? target.derivative : target.value
      if (Math.abs(left - right) > EPSILON * Math.max(1, Math.abs(right))) {
        return { equivalent: false, message: mode === 'up-to-constant' ? 'A derivada da sua expressão não produz o integrando esperado.' : 'As expressões não têm o mesmo valor.' }
      }
    }
    if (comparedPoints < 2) return { equivalent: false, message: 'Não há pontos válidos suficientes para verificar esta expressão com segurança.' }
    return { equivalent: true, message: mode === 'up-to-constant' ? 'Expressão equivalente: a diferença é, no máximo, uma constante.' : 'Expressão equivalente.' }
  } catch (error) {
    return { equivalent: false, message: error instanceof Error ? error.message : 'Não foi possível interpretar a expressão.' }
  }
}
