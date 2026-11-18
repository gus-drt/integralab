export function integralX(a: number, b: number) { return (b ** 2 - a ** 2) / 2 }
export function geometricAreaX(a: number, b: number) {
  if (a >= 0) return integralX(a, b)
  if (b <= 0) return -integralX(a, b)
  return (a ** 2 + b ** 2) / 2
}
export function areaBetweenXAndSquare(b: number) { return b ** 2 / 2 - b ** 3 / 3 }
export function diskVolumeLinear(b: number) { return Math.PI * b ** 3 / 3 }
export function shellVolumeLinear(b: number) { return 2 * Math.PI * b ** 3 / 3 }
