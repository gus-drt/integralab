import { useId, useState } from 'react'

export function AccumulationVisual() {
  const [rate, setRate] = useState(2)
  const [duration, setDuration] = useState(3)
  const titleId = useId()
  const total = rate * duration
  const width = 260 / duration
  return <section className="lab-visual" aria-labelledby={titleId}><div><p className="eyebrow">Laboratório visual</p><h2 id={titleId}>Veja a acumulação crescer</h2><p>Altura é a taxa, largura é o tempo e área é o total.</p><label>Taxa: <strong>{rate} unidades/s</strong><input type="range" min="1" max="5" value={rate} onChange={(e) => setRate(Number(e.target.value))} /></label><label>Duração: <strong>{duration} s</strong><input type="range" min="1" max="6" value={duration} onChange={(e) => setDuration(Number(e.target.value))} /></label></div><div className="lab-chart"><svg viewBox="0 0 340 230" role="img" aria-label={`Retângulo de largura ${duration}, altura ${rate} e área ${total}`}><path className="axis" d="M45 20V190H320" />{Array.from({ length: duration }).map((_, index) => <rect key={index} x={46 + index * width} y={190 - rate * 28} width={width - 2} height={rate * 28} />)}<text x="175" y="220" textAnchor="middle">duração: {duration} s</text></svg><p aria-live="polite"><strong>{rate} × {duration} = {total}</strong> unidades acumuladas</p></div></section>
}
