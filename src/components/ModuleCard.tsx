import type { CourseModule } from '../types/content'
import { Link } from 'react-router-dom'

export function ModuleCard({ module }: { module: CourseModule }) {
  const label = module.status === 'core' ? 'Fundamento' : module.status === 'syllabus' ? 'Na ementa' : 'Aprofundamento'
  return (
    <article className="module-card">
      <div className="card-meta"><span className={`tag tag-${module.status}`}>{label}</span><span>{module.lessonCount} lições</span></div>
      <h2>{module.title}</h2>
      <p>{module.description}</p>
      {module.id === 'trilha-zero' ? <Link className="text-button" to="/aprender/trilha-zero/zero-01-acumular">Começar <span aria-hidden="true">→</span></Link> : module.id === 'primitivas' ? <Link className="text-button" to="/aprender/primitivas/prim-01-familias">Ver lições <span aria-hidden="true">→</span></Link> : module.id === 'integral-definida' ? <div className="card-actions"><Link className="text-button" to="/aprender/integral-definida/def-01-area-liquida">Ver lições →</Link><Link className="text-button" to="/laboratorio/riemann">Laboratório</Link></div> : module.id === 'tecnicas' ? <Link className="text-button" to="/aprender/tecnicas/tec-01-escolher">Ver lições <span aria-hidden="true">→</span></Link> : module.id === 'improprias' ? <Link className="text-button" to="/aprender/improprias/imp-01-infinito">Ver lições <span aria-hidden="true">→</span></Link> : module.id === 'aplicacoes' ? <div className="card-actions"><Link className="text-button" to="/aprender/aplicacoes/apl-01-areas">Ver lições →</Link><Link className="text-button" to="/laboratorio/aplicacoes">Laboratórios</Link></div> : <button className="text-button" type="button" disabled aria-describedby={`${module.id}-status`}>Ver lições <span aria-hidden="true">→</span></button>}
      {!['trilha-zero', 'primitivas', 'integral-definida', 'tecnicas', 'improprias', 'aplicacoes'].includes(module.id) && <span id={`${module.id}-status`} className="sr-only">Conteúdo em preparação</span>}
    </article>
  )
}
