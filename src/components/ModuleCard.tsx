import type { CourseModule } from '../types/content'
import { Link } from 'react-router-dom'

export interface ModuleProgressInfo {
  completed: number
  total: number
  percentage: number
}

export function ModuleCard({ module, moduleProgress }: { module: CourseModule; moduleProgress?: ModuleProgressInfo }) {
  const label = module.status === 'core' ? 'Fundamento' : module.status === 'syllabus' ? 'Na ementa' : 'Aprofundamento'
  const isCompleted = !!moduleProgress && moduleProgress.total > 0 && moduleProgress.completed >= moduleProgress.total
  return (
    <article className={`module-card${isCompleted ? ' module-card-completed' : ''}`}>
      <div className="card-meta">
        <div className="card-tags">
          <span className={`tag tag-${module.status}`}>{label}</span>
          {isCompleted && <span className="tag tag-completed">Concluída ✓</span>}
        </div>
        <span>
          {moduleProgress
            ? `${moduleProgress.completed}/${moduleProgress.total} lições (${moduleProgress.percentage}%)`
            : `${module.lessonCount} lições`}
        </span>
      </div>
      <h2>{module.title}</h2>
      <p>{module.description}</p>
      {moduleProgress && (
        <div className="module-progress" aria-label={`Progresso da trilha: ${moduleProgress.percentage}%`}>
          <div className="module-progress-track">
            <div className="module-progress-fill" style={{ width: `${moduleProgress.percentage}%` }} />
          </div>
        </div>
      )}
      {module.id === 'trilha-zero' ? <Link className="text-button" to="/aprender/trilha-zero/zero-01-acumular">Começar <span aria-hidden="true">→</span></Link> : module.id === 'primitivas' ? <Link className="text-button" to="/aprender/primitivas/prim-01-familias">Ver lições <span aria-hidden="true">→</span></Link> : module.id === 'integral-definida' ? <div className="card-actions"><Link className="text-button" to="/aprender/integral-definida/def-01-area-liquida">Ver lições →</Link><Link className="text-button" to="/laboratorio/riemann">Laboratório</Link></div> : module.id === 'tecnicas' ? <Link className="text-button" to="/aprender/tecnicas/tec-01-escolher">Ver lições <span aria-hidden="true">→</span></Link> : module.id === 'improprias' ? <Link className="text-button" to="/aprender/improprias/imp-01-infinito">Ver lições <span aria-hidden="true">→</span></Link> : module.id === 'aplicacoes' ? <div className="card-actions"><Link className="text-button" to="/aprender/aplicacoes/apl-01-areas">Ver lições →</Link><Link className="text-button" to="/laboratorio/aplicacoes">Laboratórios</Link></div> : <button className="text-button" type="button" disabled aria-describedby={`${module.id}-status`}>Ver lições <span aria-hidden="true">→</span></button>}
      {!['trilha-zero', 'primitivas', 'integral-definida', 'tecnicas', 'improprias', 'aplicacoes'].includes(module.id) && <span id={`${module.id}-status`} className="sr-only">Conteúdo em preparação</span>}
    </article>
  )
}
