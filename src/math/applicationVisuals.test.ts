import { describe, expect, it } from 'vitest'
import { areaBetweenXAndSquare, diskVolumeLinear, geometricAreaX, integralX, shellVolumeLinear } from './applicationVisuals'

describe('cálculos dos laboratórios de aplicações', () => {
  it('distingue integral líquida de área geométrica', () => {
    expect(integralX(-1, 2)).toBeCloseTo(1.5)
    expect(geometricAreaX(-1, 2)).toBeCloseTo(2.5)
  })
  it('calcula área entre x e x²', () => expect(areaBetweenXAndSquare(1)).toBeCloseTo(1 / 6))
  it('calcula volumes por discos e cascas', () => {
    expect(diskVolumeLinear(2)).toBeCloseTo(8 * Math.PI / 3)
    expect(shellVolumeLinear(2)).toBeCloseTo(16 * Math.PI / 3)
  })
})
