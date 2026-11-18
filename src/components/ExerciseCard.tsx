import { useState } from 'react'
import type { Exercise } from '../types/content'
import { checkExpressionEquivalent } from '../math/expression'

export function ExerciseCard({ exercise, onAttempt }: { exercise: Exercise; onAttempt: (correct: boolean) => void }) {
  const [answer, setAnswer] = useState('')
  const [result, setResult] = useState<'correct' | 'incorrect' | null>(null)
  const [hintCount, setHintCount] = useState(0)
  const [showSolution, setShowSolution] = useState(false)
  const [detail, setDetail] = useState('')
  function check() {
    const value = answer.trim().replace(',', '.')
    const expressionResult = exercise.format === 'expression'
      ? checkExpressionEquivalent(value, String(exercise.expectedAnswer), exercise.equivalenceMode)
      : null
    const correct = expressionResult?.equivalent ?? (typeof exercise.expectedAnswer === 'number' ? Math.abs(Number(value) - exercise.expectedAnswer) <= (exercise.tolerance ?? 1e-9) : value === exercise.expectedAnswer)
    setDetail(expressionResult?.message ?? '')
    setResult(correct ? 'correct' : 'incorrect')
    onAttempt(correct)
  }
  return <article className="exercise-card"><div className="exercise-meta"><span>Nível {exercise.difficulty}</span><span>~{exercise.suggestedMinutes} min</span></div><h3>{exercise.prompt}</h3>{exercise.format === 'multiple-choice' ? <fieldset><legend className="sr-only">Escolha uma resposta</legend>{exercise.choices?.map((choice) => <label className="choice" key={choice.id}><input type="radio" name={exercise.id} value={choice.id} checked={answer === choice.id} onChange={(e) => { setAnswer(e.target.value); setResult(null) }} /><span>{choice.label}</span></label>)}</fieldset> : <label className="answer-field"><span>Sua resposta</span><input inputMode={exercise.format === 'numeric' ? 'decimal' : 'text'} value={answer} placeholder={exercise.format === 'expression' ? 'Ex.: 2x + C' : undefined} onChange={(e) => { setAnswer(e.target.value); setResult(null); setDetail('') }} />{exercise.format === 'expression' && <small>Escopo aceito: números, x, C, +, −, ×, ÷, potências inteiras e parênteses.</small>}</label>}<button className="primary-button" type="button" disabled={!answer} onClick={check}>Conferir resposta</button>{result && <div className={`feedback ${result}`} role="status"><strong>{result === 'correct' ? 'Correto.' : 'Ainda não.'}</strong> {result === 'correct' ? exercise.explanation : (detail || 'Revise a operação ou peça uma dica.')}</div>}<div className="help-actions"><button type="button" onClick={() => setHintCount((count) => Math.min(count + 1, exercise.hints.length))} disabled={hintCount === exercise.hints.length}>Mostrar dica</button><button type="button" onClick={() => setShowSolution((value) => !value)}>{showSolution ? 'Ocultar solução' : 'Ver solução completa'}</button></div>{hintCount > 0 && <ol className="hints">{exercise.hints.slice(0, hintCount).map((hint) => <li key={hint}>{hint}</li>)}</ol>}{showSolution && <div className="solution"><h4>Resolução</h4><ol>{exercise.solution.map((step) => <li key={step}>{step}</li>)}</ol><strong>Resposta: {exercise.choices?.find((choice) => choice.id === exercise.expectedAnswer)?.label ?? exercise.expectedAnswer}</strong></div>}</article>
}
