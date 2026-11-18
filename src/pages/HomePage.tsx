import { Link } from 'react-router-dom'
import type { Preferences, ProgressState } from '../state/progress'
import { getDashboard } from '../math/dashboard'

export function HomePage({ preferences, progress }: { preferences: Preferences; progress: ProgressState }) {
  const dashboard = getDashboard(progress)
  return (
    <div className="page home-page">
      <section className="hero">
        <div><p className="eyebrow">Seu laboratório de Cálculo Integral</p><h1>Entenda o que a integral <em>faz</em> antes de decorar regras.</h1><p className="lead">Comece com acumulação e áreas simples. Avance em passos curtos até os exercícios universitários da sua disciplina.</p><div className="hero-actions"><Link className="primary-button" to={progress.lastVisitedPath}>{dashboard.completedLessons ? 'Continuar de onde parei' : 'Começar pela Trilha Zero'}</Link><Link className="secondary-button" to="/aprender">Ver o percurso</Link></div></div>
        <div className="visual-card" aria-label="Ilustração: retângulos aproximando a área sob uma curva"><svg viewBox="0 0 420 280" role="img" aria-labelledby="graph-title graph-description"><title id="graph-title">Aproximação de uma área</title><desc id="graph-description">Oito retângulos aproximam a região sob uma curva crescente.</desc><path className="axis" d="M45 20V235H395"/><g className="bars">{[0,1,2,3,4,5,6,7].map((i) => <rect key={i} x={58+i*39} y={190-i*15} width="37" height={45+i*15}/>)}</g><path className="curve" d="M45 202 C130 195, 205 165, 270 115 S355 48, 395 36"/></svg><p><strong>Ideia central:</strong> somar pequenas contribuições para encontrar um total.</p></div>
      </section>
      <section className="dashboard-grid" aria-label="Resumo do estudo"><article><span className="metric">{dashboard.overallPercentage}%</span><h2>Progresso do percurso</h2><p>{dashboard.completedLessons} de {dashboard.totalLessons} lições concluídas.</p></article><article><span className="metric">{dashboard.accuracy}%</span><h2>Acertos atuais</h2><p>{dashboard.attemptedQuestions} questões praticadas.</p></article><article><span className="metric">{preferences.sessionMinutes} min</span><h2>Sessão sugerida</h2><p>É uma sugestão, nunca uma contagem obrigatória.</p></article></section>
      <section className="module-progress" aria-label="Progresso por módulo">{dashboard.modules.map((module) => <article key={module.id}><div><strong>{module.title}</strong><span>{module.completed}/{module.total}</span></div><progress max="100" value={module.percentage} aria-label={`${module.title}: ${module.percentage}%`} /></article>)}</section>
      {dashboard.next ? <section className="next-step"><div><p className="eyebrow">Próxima ação recomendada</p><h2>{dashboard.next.title}</h2><p>{dashboard.next.moduleTitle}{dashboard.weakest ? ` · tópico mais frágil atual: ${dashboard.weakest.topic}` : ''}</p></div><Link className="primary-button" to={dashboard.next.path}>Continuar percurso</Link></section> : <section className="next-step"><div><p className="eyebrow">Percurso concluído</p><h2>Consolide com revisão e simulados</h2><p>Use seus erros para decidir o próximo foco.</p></div><Link className="primary-button" to="/revisao">Abrir revisão</Link></section>}
    </div>
  )
}
