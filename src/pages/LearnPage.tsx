import { ModuleCard } from '../components/ModuleCard'
import { courseModules } from '../data/modules'
import { Link } from 'react-router-dom'

export function LearnPage() {
  return <div className="page"><header className="page-heading"><p className="eyebrow">Percurso de aprendizagem</p><h1>Do significado às técnicas</h1><p>Os fundamentos vêm primeiro. Você pode rever qualquer etapa sem perder o progresso.</p></header><div className="module-list">{courseModules.filter((item) => item.enabled).map((module, index) => <div className="module-row" key={module.id}><span className="module-index">{String(index).padStart(2, '0')}</span><ModuleCard module={module} /></div>)}</div><section className="challenge-callout"><div><p className="eyebrow">Depois dos fundamentos</p><h2>Quer combinar vários conceitos?</h2><p>Os desafios são opcionais, não bloqueiam o percurso e podem ser retomados a qualquer momento.</p></div><Link className="primary-button" to="/desafios">Abrir desafios</Link></section></div>
}
