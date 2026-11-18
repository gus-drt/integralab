import { useEffect, useMemo, useState } from 'react'
import { examQuestions } from '../data/examQuestions'
import { gradeExam, selectExamQuestions } from '../math/exam'

type ExamMode = 'prova' | 'treino'
type ExamStatus = 'running' | 'paused' | 'submitted'
type ExamSession = { seed: number; mode: ExamMode; durationSeconds: number; remainingSeconds: number; status: ExamStatus; questionIds: string[]; answers: Record<string, string>; savedAt: string }
const EXAM_KEY = 'integralab.exam.v1'

function loadSession(): ExamSession | null {
  try {
    const parsed = JSON.parse(localStorage.getItem(EXAM_KEY) ?? 'null') as ExamSession | null
    if (!parsed?.questionIds?.length || !['running', 'paused', 'submitted'].includes(parsed.status)) return null
    if (parsed.status === 'running') {
      const elapsed = Math.max(0, Math.floor((Date.now() - new Date(parsed.savedAt).getTime()) / 1000))
      parsed.remainingSeconds = Math.max(0, parsed.remainingSeconds - elapsed)
      if (parsed.remainingSeconds === 0) parsed.status = 'submitted'
    }
    return parsed
  } catch { return null }
}

function formatTime(total: number) {
  const minutes = Math.floor(total / 60).toString().padStart(2, '0')
  const seconds = (total % 60).toString().padStart(2, '0')
  return `${minutes}:${seconds}`
}

export function ExamPage() {
  const [session, setSession] = useState<ExamSession | null>(loadSession)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [mode, setMode] = useState<ExamMode>('prova')
  const [minutes, setMinutes] = useState(30)
  const questions = useMemo(() => session ? session.questionIds.map((id) => examQuestions.find((question) => question.id === id)).filter((item) => item !== undefined) : [], [session])

  useEffect(() => {
    if (!session) { localStorage.removeItem(EXAM_KEY); return }
    localStorage.setItem(EXAM_KEY, JSON.stringify({ ...session, savedAt: new Date().toISOString() }))
  }, [session])
  useEffect(() => {
    if (session?.status !== 'running') return
    const timer = window.setInterval(() => setSession((value) => value ? { ...value, remainingSeconds: Math.max(0, value.remainingSeconds - 1), status: value.remainingSeconds <= 1 ? 'submitted' : value.status } : value), 1000)
    return () => window.clearInterval(timer)
  }, [session?.status])

  function start() {
    const seed = Date.now()
    const selected = selectExamQuestions(examQuestions, 10, seed)
    setSession({ seed, mode, durationSeconds: minutes * 60, remainingSeconds: minutes * 60, status: 'running', questionIds: selected.map((item) => item.id), answers: {}, savedAt: new Date().toISOString() })
    setCurrentIndex(0)
  }
  function answer(id: string, value: string) { setSession((current) => current ? { ...current, answers: { ...current.answers, [id]: value } } : current) }
  function submit() { if (window.confirm('Finalizar e entregar o simulado? As respostas não poderão ser alteradas.')) setSession((current) => current ? { ...current, status: 'submitted' } : current) }
  function reset() { setSession(null); setCurrentIndex(0) }

  if (!session) return <div className="page"><header className="page-heading"><p className="eyebrow">Simulação para treino</p><h1>Simulado de Cálculo Integral</h1><p>Dez questões tradicionais selecionadas sem repetição. O conteúdo não pretende reproduzir exatamente a prova da professora.</p></header><section className="exam-start"><div><h2>Configuração</h2><label><span>Modo</span><select value={mode} onChange={(event) => setMode(event.target.value as ExamMode)}><option value="prova">Prova — sem pausa</option><option value="treino">Treino — pausa permitida</option></select></label><label><span>Tempo</span><select value={minutes} onChange={(event) => setMinutes(Number(event.target.value))}><option value="20">20 minutos</option><option value="30">30 minutos</option><option value="45">45 minutos</option></select></label><button className="primary-button" type="button" onClick={start}>Iniciar simulado</button></div><ul><li>Respostas e soluções aparecem somente após a entrega.</li><li>O relógio continua após fechar a página.</li><li>Questões respondidas ficam salvas neste dispositivo.</li><li>Uma nova tentativa recebe outro conjunto.</li></ul></section></div>

  const grade = session.status === 'submitted' ? gradeExam(questions, session.answers) : null
  if (grade) return <div className="page"><header className="page-heading"><p className="eyebrow">Simulado entregue</p><h1>{grade.percentage}% de aproveitamento</h1><p>{grade.correct} de {grade.total} questões corretas em {formatTime(session.durationSeconds - session.remainingSeconds)}.</p></header><section className="exam-results-summary"><article><strong>{grade.correct}/{grade.total}</strong><span>acertos</span></article><article><strong>{formatTime(session.durationSeconds - session.remainingSeconds)}</strong><span>tempo utilizado</span></article><article><strong>{session.mode === 'prova' ? 'Prova' : 'Treino'}</strong><span>modo</span></article></section><section className="topic-results"><h2>Desempenho por tópico</h2>{grade.byTopic.map((item) => <div key={item.topic}><span>{item.topic}</span><strong>{item.correct}/{item.total}</strong></div>)}</section><section className="answer-key"><p className="eyebrow">Gabarito comentado</p><h2>Revise cada questão</h2>{grade.results.map((result, index) => <article key={result.question.id} className={result.correct ? 'result-correct' : 'result-wrong'}><div><span>Questão {index + 1} · {result.question.topic}</span><strong>{result.correct ? 'Correta' : 'Incorreta'}</strong></div><h3>{result.question.prompt}</h3><p><b>Sua resposta:</b> {result.question.choices?.find((choice) => choice.id === session.answers[result.question.id])?.label ?? session.answers[result.question.id] ?? 'Em branco'}</p><p><b>Resposta esperada:</b> {result.question.choices?.find((choice) => choice.id === result.question.expectedAnswer)?.label ?? result.question.expectedAnswer}</p><ol>{result.question.solution.map((step) => <li key={step}>{step}</li>)}</ol></article>)}</section><button className="primary-button" type="button" onClick={reset}>Fazer novo simulado</button></div>

  const current = questions[currentIndex]
  const answered = Object.values(session.answers).filter((value) => value !== '').length
  return <div className="page exam-page"><header className="exam-header"><div><p className="eyebrow">Modo {session.mode}</p><h1>Simulado em andamento</h1><p>{answered} de {questions.length} respondidas</p></div><div className={`exam-clock ${session.remainingSeconds < 300 ? 'urgent' : ''}`} role="timer" aria-live="off"><span>Tempo restante</span><strong>{formatTime(session.remainingSeconds)}</strong></div></header><nav className="question-palette" aria-label="Questões do simulado">{questions.map((question, index) => <button key={question.id} type="button" className={`${index === currentIndex ? 'current' : ''} ${session.answers[question.id] ? 'answered' : ''}`} onClick={() => setCurrentIndex(index)} aria-label={`Questão ${index + 1}${session.answers[question.id] ? ', respondida' : ', não respondida'}`}>{index + 1}</button>)}</nav><section className="exam-question"><div className="exam-question-meta"><span>Questão {currentIndex + 1} de {questions.length}</span><span>{current.topic} · nível {current.difficulty}</span></div><h2>{current.prompt}</h2>{current.format === 'multiple-choice' ? <fieldset><legend className="sr-only">Escolha uma resposta</legend>{current.choices?.map((choice) => <label className="choice" key={choice.id}><input type="radio" name={current.id} value={choice.id} checked={session.answers[current.id] === choice.id} onChange={(event) => answer(current.id, event.target.value)} /><span>{choice.label}</span></label>)}</fieldset> : <label className="answer-field"><span>Resposta numérica</span><input inputMode="decimal" value={session.answers[current.id] ?? ''} onChange={(event) => answer(current.id, event.target.value)} /></label>}<div className="exam-navigation"><button type="button" disabled={currentIndex === 0} onClick={() => setCurrentIndex((value) => value - 1)}>← Anterior</button><button type="button" disabled={currentIndex === questions.length - 1} onClick={() => setCurrentIndex((value) => value + 1)}>Próxima →</button></div></section><footer className="exam-actions">{session.mode === 'treino' && <button type="button" onClick={() => setSession((value) => value ? { ...value, status: value.status === 'paused' ? 'running' : 'paused' } : value)}>{session.status === 'paused' ? 'Retomar relógio' : 'Pausar relógio'}</button>}<button className="primary-button" type="button" onClick={submit}>Finalizar e entregar</button></footer>{session.status === 'paused' && <div className="pause-banner" role="status">Simulado pausado. Suas respostas continuam salvas.</div>}</div>
}
