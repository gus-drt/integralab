import { useState } from 'react'
import { ExerciseCard } from '../components/ExerciseCard'
import { allExercises } from '../data/catalog'
import type { ProgressState } from '../state/progress'
import { createAttemptRecord } from '../state/progress'

export function PracticePage({ progress, onProgress }: { progress: ProgressState; onProgress: (value: ProgressState) => void }) {
  const topics = ['todos', ...new Set(allExercises.map((exercise) => exercise.topic))]
  const [topic, setTopic] = useState('todos')
  const [onlyMistakes, setOnlyMistakes] = useState(false)
  const exercises = allExercises.filter((exercise) => {
    const attempt = progress.attempts[exercise.id]
    return (topic === 'todos' || exercise.topic === topic) && (!onlyMistakes || (attempt && !attempt.correct))
  })
  function recordAttempt(id: string, correct: boolean) {
    const prior = progress.attempts[id]
    onProgress({ ...progress, attempts: { ...progress.attempts, [id]: createAttemptRecord(prior, correct) }, lastVisitedPath: '/praticar', updatedAt: new Date().toISOString() })
  }
  return <div className="page"><header className="page-heading"><p className="eyebrow">Prática ativa</p><h1>Resolva sem espiar a solução</h1><p>Escolha um tópico ou retome questões erradas. Dicas aparecem aos poucos e a solução continua separada.</p></header><section className="practice-toolbar" aria-label="Filtros de exercícios"><label><span>Tópico</span><select value={topic} onChange={(event) => setTopic(event.target.value)}>{topics.map((item) => <option key={item} value={item}>{item === 'todos' ? 'Todos os tópicos ativos' : item}</option>)}</select></label><label className="mistake-filter"><input type="checkbox" checked={onlyMistakes} onChange={(event) => setOnlyMistakes(event.target.checked)} /><span>Mostrar apenas erros atuais</span></label><p aria-live="polite"><strong>{exercises.length}</strong> questões</p></section>{exercises.length ? <section className="practice-list">{exercises.map((exercise) => <ExerciseCard key={exercise.id} exercise={exercise} onAttempt={(correct) => recordAttempt(exercise.id, correct)} />)}</section> : <section className="empty-state"><span aria-hidden="true">✓</span><h2>Nenhuma questão neste filtro</h2><p>Você não tem erros atuais aqui. Escolha outro tópico ou veja todas as questões.</p></section>}</div>
}
