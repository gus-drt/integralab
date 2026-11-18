import { useMemo, useState } from 'react'
import { ExerciseCard } from '../components/ExerciseCard'
import { allExercises } from '../data/catalog'
import { createAttemptRecord, type ProgressState } from '../state/progress'

export function ReviewPage({ progress, onProgress }: { progress: ProgressState; onProgress: (value: ProgressState) => void }) {
  const [now] = useState(() => Date.now())
  const stats = useMemo(() => {
    const byTopic = new Map<string, { attempted: number; correct: number; wrong: number }>()
    for (const exercise of allExercises) {
      const attempt = progress.attempts[exercise.id]
      if (!attempt) continue
      const current = byTopic.get(exercise.topic) ?? { attempted: 0, correct: 0, wrong: 0 }
      current.attempted += 1
      current.correct += attempt.correct ? 1 : 0
      current.wrong += attempt.wrongAttempts ?? (attempt.correct ? 0 : 1)
      byTopic.set(exercise.topic, current)
    }
    return [...byTopic.entries()].map(([topic, value]) => ({ topic, ...value, accuracy: value.correct / value.attempted })).sort((a, b) => a.accuracy - b.accuracy || b.wrong - a.wrong)
  }, [progress.attempts])

  const due = allExercises.filter((exercise) => {
    const attempt = progress.attempts[exercise.id]
    return attempt && (!attempt.correct || !attempt.nextReviewAt || new Date(attempt.nextReviewAt).getTime() <= now)
  }).sort((a, b) => {
    const left = progress.attempts[a.id]
    const right = progress.attempts[b.id]
    return Number(left.correct) - Number(right.correct) || (right.wrongAttempts ?? 0) - (left.wrongAttempts ?? 0)
  })

  const recommendations = (() => {
    const selected = [] as typeof due
    const topics = new Set<string>()
    for (const exercise of due) {
      if (!topics.has(exercise.topic) && selected.length < 6) { selected.push(exercise); topics.add(exercise.topic) }
    }
    for (const exercise of due) {
      if (selected.length >= 6) break
      if (!selected.includes(exercise)) selected.push(exercise)
    }
    return selected
  })()
  function record(id: string, correct: boolean) {
    const prior = progress.attempts[id]
    onProgress({ ...progress, attempts: { ...progress.attempts, [id]: createAttemptRecord(prior, correct) }, lastVisitedPath: '/revisao', updatedAt: new Date().toISOString() })
  }
  const attempted = Object.keys(progress.attempts).length
  const correct = Object.values(progress.attempts).filter((item) => item.correct).length

  return <div className="page"><header className="page-heading"><p className="eyebrow">Revisão orientada por evidências</p><h1>Retome o que ainda não está firme</h1><p>As recomendações usam suas tentativas, erros reincidentes e a data da próxima revisão. Não há punição por tempo sem estudar.</p></header><section className="review-summary" aria-label="Resumo da revisão"><article><strong>{attempted}</strong><span>questões tentadas</span></article><article><strong>{attempted ? Math.round(correct / attempted * 100) : 0}%</strong><span>acertos atuais</span></article><article><strong>{due.length}</strong><span>revisões disponíveis</span></article></section>{attempted === 0 ? <section className="empty-state"><span aria-hidden="true">↻</span><h2>A revisão começa depois da prática</h2><p>Resolva algumas questões. Os erros e acertos serão usados para montar uma fila personalizada.</p></section> : <><section className="weak-topics"><div><p className="eyebrow">Diagnóstico</p><h2>Tópicos que merecem atenção</h2></div><div className="topic-table">{stats.slice(0, 8).map((item) => <div key={item.topic}><span>{item.topic}</span><progress max="100" value={Math.round(item.accuracy * 100)} aria-label={`${item.topic}: ${Math.round(item.accuracy * 100)}% de acertos atuais`} /><strong>{Math.round(item.accuracy * 100)}%</strong></div>)}</div></section><section className="review-queue"><p className="eyebrow">Fila recomendada</p><h2>{recommendations.length ? 'Questões para revisar agora' : 'Nada vencido por enquanto'}</h2><p>{recommendations.length ? 'A fila mistura tópicos quando possível e prioriza erros reincidentes.' : 'Continue praticando ou volte quando as próximas revisões vencerem.'}</p>{recommendations.map((exercise) => <ExerciseCard key={exercise.id} exercise={exercise} onAttempt={(value) => record(exercise.id, value)} />)}</section></>}</div>
}
