import { beforeEach, describe, expect, it } from 'vitest'
import { createAttemptRecord, emptyProgress, exportProgress, importProgress, loadProgress, saveProgress, STORAGE_KEY } from './progress'

describe('persistência do progresso', () => {
  beforeEach(() => localStorage.clear())

  it('usa estado vazio quando não há dados', () => {
    expect(loadProgress().version).toBe(1)
    expect(loadProgress().completedLessons).toEqual([])
  })

  it('salva e recupera progresso válido', () => {
    const progress = { ...emptyProgress(), completedLessons: ['zero-01'] }
    saveProgress(progress)
    expect(loadProgress().completedLessons).toEqual(['zero-01'])
  })

  it('recupera com segurança após JSON corrompido', () => {
    localStorage.setItem(STORAGE_KEY, '{inválido')
    expect(loadProgress().completedLessons).toEqual([])
  })

  it('exporta e importa um pacote versionado', () => {
    const progress = { ...emptyProgress(), completedLessons: ['zero-01'] }
    const result = importProgress(exportProgress(progress, { focusMode: true, reduceMotion: false, sessionMinutes: 20 }))
    expect(result.progress.completedLessons).toEqual(['zero-01'])
    expect(result.preferences.focusMode).toBe(true)
  })

  it('agenda revisão e reinicia o nível após erro', () => {
    const now = new Date('2026-11-10T12:00:00.000Z')
    const first = createAttemptRecord(undefined, true, now)
    expect(first.reviewLevel).toBe(1)
    expect(first.nextReviewAt).toBe('2026-11-11T12:00:00.000Z')
    const second = createAttemptRecord(first, true, now)
    expect(second.reviewLevel).toBe(2)
    expect(second.nextReviewAt).toBe('2026-11-13T12:00:00.000Z')
    const wrong = createAttemptRecord(second, false, now)
    expect(wrong.reviewLevel).toBe(0)
    expect(wrong.nextReviewAt).toBe(now.toISOString())
    expect(wrong.wrongAttempts).toBe(1)
  })
})
