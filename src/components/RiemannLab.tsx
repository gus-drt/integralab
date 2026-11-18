import { useId, useState } from 'react'
import { riemannRectangles, riemannSum, square, squareIntegral, type RiemannMethod } from '../math/riemann'

const methods: { id: RiemannMethod; label: string }[] = [{ id: 'left', label: 'Esquerda' }, { id: 'right', label: 'Direita' }, { id: 'midpoint', label: 'Ponto médio' }]

export function RiemannLab() {
  const [n, setN] = useState(4)
  const [method, setMethod] = useState<RiemannMethod>('left')
  const titleId = useId()
  const a = 0
  const b = 2
  const exact = squareIntegral(a, b)
  const approximate = riemannSum(square, a, b, n, method)
  const rectangles = riemannRectangles(a, b, n, method)
  const error = approximate - exact
  const plot = { left: 48, bottom: 238, width: 360, height: 190, maxY: 4.4 }
  const sx = (x: number) => plot.left + (x / b) * plot.width
  const sy = (y: number) => plot.bottom - (y / plot.maxY) * plot.height
  const curve = Array.from({ length: 81 }, (_, index) => { const x = (b * index) / 80; return `${index ? 'L' : 'M'}${sx(x).toFixed(1)},${sy(square(x)).toFixed(1)}` }).join(' ')
  return <section className="riemann-lab" aria-labelledby={titleId}><div className="riemann-heading"><div><p className="eyebrow">Laboratório de Riemann</p><h2 id={titleId}>Aproxime a área sob f(x) = x²</h2><p>Intervalo fixo: [0, 2]. Compare a soma dos retângulos com 8/3.</p></div><div className="riemann-values" aria-live="polite"><span>Aproximação <strong>{approximate.toFixed(5)}</strong></span><span>Erro com sinal <strong>{error >= 0 ? '+' : ''}{error.toFixed(5)}</strong></span></div></div><div className="riemann-controls"><label><span>Método</span><select value={method} onChange={(event) => setMethod(event.target.value as RiemannMethod)}>{methods.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label><label><span>Subintervalos: <strong>{n}</strong></span><input type="range" min="1" max="30" value={n} onChange={(event) => setN(Number(event.target.value))} /></label></div><svg className="riemann-chart" viewBox="0 0 440 275" role="img" aria-labelledby={`${titleId}-svg-title ${titleId}-svg-desc`}><title id={`${titleId}-svg-title`}>Soma de Riemann para x ao quadrado</title><desc id={`${titleId}-svg-desc`}>{n} retângulos pelo método {methods.find((item) => item.id === method)?.label.toLowerCase()}, aproximação {approximate.toFixed(5)}, valor exato 2,66667.</desc><line x1={plot.left} y1={plot.bottom} x2={420} y2={plot.bottom} /><line x1={plot.left} y1={25} x2={plot.left} y2={plot.bottom} />{rectangles.map((rectangle, index) => <rect key={index} x={sx(rectangle.x)} y={sy(rectangle.height)} width={Math.max(1, (rectangle.width / b) * plot.width)} height={plot.bottom - sy(rectangle.height)}><title>Faixa {index + 1}: altura {rectangle.height.toFixed(3)}</title></rect>)}<path d={curve} /><text x={sx(0)} y="258">0</text><text x={sx(1)} y="258" textAnchor="middle">1</text><text x={sx(2)} y="258" textAnchor="end">2</text><text x="24" y={sy(4)}>4</text></svg><details><summary>Descrição textual e valores</summary><p>O gráfico mostra a curva crescente y = x² e {n} retângulos de mesma largura. Pelo método {methods.find((item) => item.id === method)?.label.toLowerCase()}, a soma é {approximate.toFixed(5)}. A integral exata é 2,66667; o erro com sinal é {error.toFixed(5)}.</p></details></section>
}
