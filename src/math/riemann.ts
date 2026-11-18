export type RiemannMethod = 'left' | 'right' | 'midpoint'

export function square(x: number): number { return x * x }

export function squareIntegral(a: number, b: number): number {
  return (b ** 3 - a ** 3) / 3
}

export function riemannSum(fn: (x: number) => number, a: number, b: number, n: number, method: RiemannMethod): number {
  if (!Number.isInteger(n) || n < 1 || !Number.isFinite(a) || !Number.isFinite(b) || b <= a) throw new Error('Intervalo e número de subintervalos inválidos.')
  const width = (b - a) / n
  let total = 0
  for (let index = 0; index < n; index += 1) {
    const left = a + index * width
    const sample = method === 'left' ? left : method === 'right' ? left + width : left + width / 2
    total += fn(sample) * width
  }
  return total
}

export function riemannRectangles(a: number, b: number, n: number, method: RiemannMethod) {
  const width = (b - a) / n
  return Array.from({ length: n }, (_, index) => {
    const x = a + index * width
    const sample = method === 'left' ? x : method === 'right' ? x + width : x + width / 2
    return { x, width, sample, height: square(sample) }
  })
}
