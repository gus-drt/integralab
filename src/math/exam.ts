import type { ExamQuestion } from '../data/examQuestions'

function random(seed: number) {
  let value = seed >>> 0
  return () => { value += 0x6D2B79F5; let result = value; result = Math.imul(result ^ result >>> 15, result | 1); result ^= result + Math.imul(result ^ result >>> 7, result | 61); return ((result ^ result >>> 14) >>> 0) / 4294967296 }
}

export function selectExamQuestions(bank: ExamQuestion[], count: number, seed: number): ExamQuestion[] {
  const items = [...bank]
  const next = random(seed)
  for (let index = items.length - 1; index > 0; index -= 1) {
    const target = Math.floor(next() * (index + 1))
    ;[items[index], items[target]] = [items[target], items[index]]
  }
  return items.slice(0, Math.min(count, items.length))
}

export function isExamAnswerCorrect(question: ExamQuestion, answer: string | undefined): boolean {
  if (answer === undefined || answer.trim() === '') return false
  if (typeof question.expectedAnswer === 'number') {
    const numericAnswer = Number(answer.trim().replace(',', '.'))
    return Number.isFinite(numericAnswer) && Math.abs(numericAnswer - question.expectedAnswer) <= (question.tolerance ?? 1e-9)
  }
  return answer.trim() === question.expectedAnswer
}

export function gradeExam(questions: ExamQuestion[], answers: Record<string, string>) {
  const results = questions.map((question) => ({ question, correct: isExamAnswerCorrect(question, answers[question.id]) }))
  const byTopic = new Map<string, { correct: number; total: number }>()
  for (const result of results) {
    const value = byTopic.get(result.question.topic) ?? { correct: 0, total: 0 }
    value.total += 1
    value.correct += result.correct ? 1 : 0
    byTopic.set(result.question.topic, value)
  }
  const correct = results.filter((result) => result.correct).length
  return { results, correct, total: questions.length, percentage: questions.length ? Math.round(correct / questions.length * 100) : 0, byTopic: [...byTopic.entries()].map(([topic, value]) => ({ topic, ...value })) }
}
