import { Link } from 'react-router-dom'
import { RiemannLab } from '../components/RiemannLab'

export function RiemannPage() {
  return <div className="page"><header className="page-heading"><p className="eyebrow">Visualização com propósito</p><h1>Laboratório de somas de Riemann</h1><p>Altere o método e o número de subintervalos. Observe não só a aproximação, mas também o sinal e o tamanho do erro.</p></header><RiemannLab /><section className="next-step"><div><p className="eyebrow">Conecte visual e cálculo</p><h2>Estude a construção da soma</h2><p>A lição explica Δx, pontos de amostragem e o limite das somas.</p></div><Link className="primary-button" to="/aprender/integral-definida/def-02-riemann">Abrir a lição</Link></section></div>
}
