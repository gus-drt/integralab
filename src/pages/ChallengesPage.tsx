import { ExerciseCard } from '../components/ExerciseCard'
import { challengeExercises } from '../data/challengeExercises'
import { createAttemptRecord, type ProgressState } from '../state/progress'

export function ChallengesPage({ progress, onProgress }: { progress: ProgressState; onProgress: (value: ProgressState) => void }) {
  function record(id: string, correct: boolean) {
    const prior = progress.attempts[id]
    onProgress({ ...progress, attempts: { ...progress.attempts, [id]: createAttemptRecord(prior, correct) }, lastVisitedPath: '/desafios', updatedAt: new Date().toISOString() })
  }
  return <div className="page"><header className="page-heading"><p className="eyebrow">Aprofundamento opcional</p><h1>Desafios de transferência</h1><p>Problemas que combinam conceitos e exigem escolher uma representação. Eles não substituem os fundamentos e podem ser tentados ou deixados para depois.</p></header><section className="challenge-note"><strong>Sem pressa.</strong><span>Dificuldade maior só ajuda quando os conceitos básicos já estão firmes. Use as dicas sem culpa.</span></section><section className="practice-list">{challengeExercises.map((exercise) => <ExerciseCard key={exercise.id} exercise={exercise} onAttempt={(correct) => record(exercise.id, correct)} />)}</section></div>
}
