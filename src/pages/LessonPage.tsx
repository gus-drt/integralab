import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { AccumulationVisual } from '../components/AccumulationVisual'
import { ExerciseCard } from '../components/ExerciseCard'
import { zeroExerciseById } from '../data/zeroExercises'
import { zeroLessonById, zeroLessons } from '../data/zeroLessons'
import { primitiveExerciseById } from '../data/primitiveExercises'
import { primitiveLessonById, primitiveLessons } from '../data/primitiveLessons'
import type { Exercise, Lesson } from '../types/content'
import { definedExerciseById } from '../data/definedExercises'
import { definedLessonById, definedLessons } from '../data/definedLessons'
import { techniqueExerciseById } from '../data/techniqueExercises'
import { techniqueLessonById, techniqueLessons } from '../data/techniqueLessons'
import { improperExerciseById } from '../data/improperExercises'
import { improperLessonById, improperLessons } from '../data/improperLessons'
import { applicationExerciseById } from '../data/applicationExercises'
import { applicationLessonById, applicationLessons } from '../data/applicationLessons'
import type { ProgressState } from '../state/progress'
import { createAttemptRecord } from '../state/progress'

export function LessonPage({ progress, onProgress }: { progress: ProgressState; onProgress: (value: ProgressState) => void }) {
  const { moduleId, lessonId } = useParams()
  const catalog: { title: string; lessons: Lesson[]; lessonById: Record<string, Lesson>; exerciseById: Record<string, Exercise> } | undefined = moduleId === 'trilha-zero'
    ? { title: 'Trilha Zero', lessons: zeroLessons, lessonById: zeroLessonById, exerciseById: zeroExerciseById }
    : moduleId === 'primitivas'
      ? { title: 'Primitivas', lessons: primitiveLessons, lessonById: primitiveLessonById, exerciseById: primitiveExerciseById }
      : moduleId === 'integral-definida'
        ? { title: 'Integral definida', lessons: definedLessons, lessonById: definedLessonById, exerciseById: definedExerciseById }
        : moduleId === 'tecnicas'
          ? { title: 'Técnicas de integração', lessons: techniqueLessons, lessonById: techniqueLessonById, exerciseById: techniqueExerciseById }
          : moduleId === 'improprias'
            ? { title: 'Integrais impróprias', lessons: improperLessons, lessonById: improperLessonById, exerciseById: improperExerciseById }
            : moduleId === 'aplicacoes'
              ? { title: 'Aplicações da integral', lessons: applicationLessons, lessonById: applicationLessonById, exerciseById: applicationExerciseById }
      : undefined
  const lesson = lessonId && catalog ? catalog.lessonById[lessonId] : undefined
  const [guidedAnswer, setGuidedAnswer] = useState('')
  const [guidedChecked, setGuidedChecked] = useState(false)
  const [prevLessonId, setPrevLessonId] = useState(lessonId)

  // Reseta os estados de resposta do exemplo guiado ao mudar de lição
  if (prevLessonId !== lessonId) {
    setPrevLessonId(lessonId)
    setGuidedAnswer('')
    setGuidedChecked(false)
  }

  // Ao mudar de lição ou módulo, rola a janela para o topo
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 })
  }, [moduleId, lessonId])

  function scrollToTop() {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  if (!lesson) return <Navigate to="/aprender" replace />
  const currentLesson = lesson
  const completed = progress.completedLessons.includes(currentLesson.id)
  const currentCatalog = catalog!
  const currentModuleId = moduleId!
  const next = currentCatalog.lessons.find((item) => item.order === currentLesson.order + 1)

  function recordAttempt(id: string, correct: boolean) {
    const prior = progress.attempts[id]
    onProgress({
      ...progress,
      attempts: { ...progress.attempts, [id]: createAttemptRecord(prior, correct) },
      lastVisitedPath: `/aprender/${currentModuleId}/${currentLesson.id}`,
      updatedAt: new Date().toISOString()
    })
  }

  function complete() {
    if (!completed) {
      onProgress({
        ...progress,
        completedLessons: [...progress.completedLessons, currentLesson.id],
        lastVisitedPath: next ? `/aprender/${currentModuleId}/${next.id}` : '/aprender',
        updatedAt: new Date().toISOString()
      })
    }
  }

  const guidedCorrect = Number(guidedAnswer.replace(',', '.')) === currentLesson.guidedExample.expectedAnswer

  return (
    <div className="lesson-page">
      <aside className="lesson-sidebar">
        <Link to="/aprender">← Voltar ao percurso</Link>
        <p>{currentCatalog.title}</p>
        <ol>
          {currentCatalog.lessons.map((item) => (
            <li key={item.id} className={item.id === currentLesson.id ? 'current' : ''}>
              <Link
                to={`/aprender/${currentModuleId}/${item.id}`}
                onClick={scrollToTop}
              >
                <span>{item.order}</span>
                {item.title}
                {progress.completedLessons.includes(item.id) && <b aria-label="concluída">✓</b>}
              </Link>
            </li>
          ))}
        </ol>
      </aside>

      <article className="lesson-content">
        <header>
          <p className="eyebrow">Lição {currentLesson.order} de {currentCatalog.lessons.length} · {currentLesson.durationMinutes} min</p>
          <h1>{currentLesson.title}</h1>
          <p className="lesson-objective"><strong>Ao terminar:</strong> {currentLesson.objective}</p>
        </header>

        <section className="opening-question">
          <span aria-hidden="true">?</span>
          <div>
            <p className="eyebrow">Antes de começar</p>
            <h2>{currentLesson.openingQuestion}</h2>
            <p>Pense por alguns segundos. Não precisa acertar de primeira.</p>
          </div>
        </section>

        <section className="lesson-section">
          <h2>A ideia</h2>
          {currentLesson.explanation.map((text) => <p key={text}>{text}</p>)}
          <div className="formula-callout">{currentLesson.keyIdea}</div>
        </section>

        {currentModuleId === 'trilha-zero' && currentLesson.order === 1 && <AccumulationVisual />}

        <section className="worked-example">
          <p className="eyebrow">Exemplo resolvido</p>
          <h2>{currentLesson.workedExample.prompt}</h2>
          <ol>
            {currentLesson.workedExample.steps.map((step) => <li key={step}>{step}</li>)}
          </ol>
          <p className="example-answer">{currentLesson.workedExample.answer}</p>
        </section>

        <section className="guided-example">
          <p className="eyebrow">Complete o próximo passo</p>
          <h2>{currentLesson.guidedExample.prompt}</h2>
          <ul>
            {currentLesson.guidedExample.steps.map((step) => <li key={step}>✓ {step}</li>)}
          </ul>
          <label className="answer-field">
            <span>{currentLesson.guidedExample.question}</span>
            <input
              inputMode="decimal"
              value={guidedAnswer}
              onChange={(e) => { setGuidedAnswer(e.target.value); setGuidedChecked(false) }}
            />
          </label>
          <button type="button" onClick={() => setGuidedChecked(true)} disabled={!guidedAnswer}>
            Verificar passo
          </button>
          {guidedChecked && (
            <p className={`feedback ${guidedCorrect ? 'correct' : 'incorrect'}`} role="status">
              {guidedCorrect ? `Isso. ${currentLesson.guidedExample.explanation}` : 'Ainda não. Releia os passos e verifique a operação.'}
            </p>
          )}
        </section>

        <section className="practice-section">
          <p className="eyebrow">Prática independente</p>
          <h2>Tente antes de pedir uma dica</h2>
          {currentLesson.exerciseIds.map((id) => (
            <ExerciseCard
              key={id}
              exercise={currentCatalog.exerciseById[id]}
              onAttempt={(correct) => recordAttempt(id, correct)}
            />
          ))}
        </section>

        <section className="lesson-recap">
          <div>
            <h2>Resumo de bolso</h2>
            <ul>
              {currentLesson.summary.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <div>
            <h2>Erros para evitar</h2>
            <ul>
              {currentLesson.commonErrors.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </section>

        <div className="lesson-footer">
          <button className="primary-button" type="button" onClick={complete}>
            {completed ? 'Lição concluída ✓' : 'Marcar como concluída'}
          </button>
          {next && (
            <Link
              className="secondary-button"
              to={`/aprender/${currentModuleId}/${next.id}`}
              onClick={scrollToTop}
            >
              Próxima lição →
            </Link>
          )}
        </div>
      </article>
    </div>
  )
}
