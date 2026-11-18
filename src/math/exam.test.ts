import { describe, expect, it } from 'vitest'
import { examQuestions } from '../data/examQuestions'
import { gradeExam, isExamAnswerCorrect, selectExamQuestions } from './exam'

describe('motor do simulado', () => {
  it('usa um banco com IDs únicos e respostas definidas', () => {
    expect(examQuestions.length).toBeGreaterThanOrEqual(20)
    expect(new Set(examQuestions.map((item) => item.id)).size).toBe(examQuestions.length)
    expect(examQuestions.every((item) => item.expectedAnswer !== '')).toBe(true)
  })
  it('seleciona sem repetição e de forma determinística', () => {
    const first = selectExamQuestions(examQuestions, 10, 123).map((item) => item.id)
    const second = selectExamQuestions(examQuestions, 10, 123).map((item) => item.id)
    expect(first).toEqual(second)
    expect(new Set(first).size).toBe(10)
  })
  it('corrige números com vírgula e tolerância', () => {
    const question = examQuestions.find((item) => item.id === 'sim-04')!
    expect(isExamAnswerCorrect(question, '0,6666667')).toBe(true)
    expect(isExamAnswerCorrect(question, '0.5')).toBe(false)
  })
  it('calcula pontuação e tópicos', () => {
    const questions = examQuestions.slice(0, 2)
    const grade = gradeExam(questions, { 'sim-01': 'a', 'sim-02': '0' })
    expect(grade.correct).toBe(1)
    expect(grade.percentage).toBe(50)
    expect(grade.byTopic[0].total).toBe(2)
  })
})
