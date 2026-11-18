import { useState } from 'react'
import { areaBetweenXAndSquare, diskVolumeLinear, geometricAreaX, integralX, shellVolumeLinear } from '../math/applicationVisuals'

type Lab = 'signed' | 'between' | 'volume'

export function ApplicationLabsPage() {
  const [lab, setLab] = useState<Lab>('signed')
  const [a, setA] = useState(-1)
  const [b, setB] = useState(2)
  const [end, setEnd] = useState(1)
  const [volumeEnd, setVolumeEnd] = useState(2)
  return <div className="page"><header className="page-heading"><p className="eyebrow">Laboratórios de aplicações</p><h1>Veja a geometria antes de calcular</h1><p>Os controles alteram o modelo e os valores ao mesmo tempo. Cada gráfico inclui uma descrição textual equivalente.</p></header><div className="lab-tabs" role="tablist" aria-label="Escolher laboratório"><button type="button" role="tab" aria-selected={lab === 'signed'} onClick={() => setLab('signed')}>Área líquida</button><button type="button" role="tab" aria-selected={lab === 'between'} onClick={() => setLab('between')}>Entre curvas</button><button type="button" role="tab" aria-selected={lab === 'volume'} onClick={() => setLab('volume')}>Volumes</button></div>{lab === 'signed' && <section className="application-lab" role="tabpanel"><div className="lab-controls"><h2>Área líquida de f(x)=x</h2><label>Limite inferior: <strong>{a.toFixed(1)}</strong><input type="range" min="-3" max={b - .5} step="0.5" value={a} onChange={(event) => setA(Number(event.target.value))} /></label><label>Limite superior: <strong>{b.toFixed(1)}</strong><input type="range" min={a + .5} max="3" step="0.5" value={b} onChange={(event) => setB(Number(event.target.value))} /></label><div className="lab-readout"><span>Integral líquida <strong>{integralX(a, b).toFixed(3)}</strong></span><span>Área geométrica <strong>{geometricAreaX(a, b).toFixed(3)}</strong></span></div></div><SignedAreaGraphic a={a} b={b} /><p className="lab-description">Entre {a} e {b}, partes abaixo do eixo contam negativamente na integral. A área geométrica torna todas as contribuições positivas.</p></section>}{lab === 'between' && <section className="application-lab" role="tabpanel"><div className="lab-controls"><h2>Área entre y=x e y=x²</h2><label>Limite superior: <strong>{end.toFixed(1)}</strong><input type="range" min="0.2" max="1" step="0.1" value={end} onChange={(event) => setEnd(Number(event.target.value))} /></label><div className="lab-readout"><span>Área <strong>{areaBetweenXAndSquare(end).toFixed(4)}</strong></span><span>Altura em x=b <strong>{(end - end ** 2).toFixed(3)}</strong></span></div></div><BetweenCurvesGraphic end={end} /><p className="lab-description">Em [0,{end.toFixed(1)}], y=x é a curva superior e y=x² é a inferior. A área integra x−x².</p></section>}{lab === 'volume' && <section className="application-lab" role="tabpanel"><div className="lab-controls"><h2>Região sob y=x, de 0 a b</h2><label>Valor de b: <strong>{volumeEnd.toFixed(1)}</strong><input type="range" min="0.5" max="3" step="0.5" value={volumeEnd} onChange={(event) => setVolumeEnd(Number(event.target.value))} /></label><div className="lab-readout"><span>Discos em torno de x <strong>{diskVolumeLinear(volumeEnd).toFixed(3)}</strong></span><span>Cascas em torno de y <strong>{shellVolumeLinear(volumeEnd).toFixed(3)}</strong></span></div></div><VolumeGraphic end={volumeEnd} /><p className="lab-description">São dois sólidos diferentes: discos giram a região em torno do eixo x; cascas giram a mesma região em torno do eixo y. Por isso os volumes não precisam coincidir.</p></section>}</div>
}

function SignedAreaGraphic({ a, b }: { a: number; b: number }) {
  const sx = (x: number) => 210 + x * 60
  const sy = (y: number) => 140 - y * 35
  const start = Math.max(-3, a), end = Math.min(3, b)
  const points = Array.from({ length: 61 }, (_, i) => { const x = -3 + i / 10; return `${sx(x)},${sy(x)}` }).join(' ')
  const fill = Array.from({ length: 41 }, (_, i) => { const x = start + (end - start) * i / 40; return `${sx(x)},${sy(x)}` }).join(' ')
  return <svg className="application-chart" viewBox="0 0 420 280" role="img" aria-label={`Gráfico de y=x entre ${a} e ${b}, com áreas positivas e negativas destacadas`}><line x1="20" y1="140" x2="400" y2="140"/><line x1="210" y1="20" x2="210" y2="260"/><polygon points={`${sx(start)},140 ${fill} ${sx(end)},140`} /><polyline points={points}/></svg>
}
function BetweenCurvesGraphic({ end }: { end: number }) {
  const sx = (x: number) => 45 + x * 320
  const sy = (y: number) => 230 - y * 180
  const upper = Array.from({ length: 41 }, (_, i) => { const x = end * i / 40; return `${sx(x)},${sy(x)}` }).join(' ')
  const lower = Array.from({ length: 41 }, (_, i) => { const x = end * (40 - i) / 40; return `${sx(x)},${sy(x ** 2)}` }).join(' ')
  return <svg className="application-chart" viewBox="0 0 420 280" role="img" aria-label={`Região entre y=x e y=x ao quadrado de 0 até ${end}`}><line x1="35" y1="230" x2="390" y2="230"/><line x1="45" y1="30" x2="45" y2="245"/><polygon points={`${upper} ${lower}`} /><polyline points={upper}/><polyline className="secondary-curve" points={lower.split(' ').reverse().join(' ')}/></svg>
}
function VolumeGraphic({ end }: { end: number }) {
  const height = 40 + end * 28
  return <svg className="application-chart" viewBox="0 0 420 280" role="img" aria-label={`Esquema da região triangular sob y=x até ${end}, com um disco e uma casca representativos`}><line x1="30" y1="235" x2="390" y2="235"/><line x1="50" y1="30" x2="50" y2="250"/><polygon points={`50,235 ${50 + end * 90},${235 - height} ${50 + end * 90},235`} /><ellipse cx={90 + end * 40} cy="170" rx="34" ry="10"/><rect x={210} y={235-height} width="24" height={height}/><text x="70" y="265">disco</text><text x="205" y="265">casca</text></svg>
}
