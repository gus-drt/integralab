import { describe, expect, it } from 'vitest'
import { emptyProgress } from '../state/progress'
import { getDashboard } from './dashboard'

describe('métricas do painel', () => {
  it('recomenda a primeira lição quando não há progresso', () => {
    const dashboard = getDashboard(emptyProgress())
    expect(dashboard.next?.path).toContain('zero-01-acumular')
    expect(dashboard.overallPercentage).toBe(0)
    expect(dashboard.totalLessons).toBe(35)
  })
  it('avança para a primeira lição incompleta', () => {
    const progress = { ...emptyProgress(), completedLessons: ['zero-01-acumular'] }
    expect(getDashboard(progress).next?.path).toContain('zero-02-area')
  })
})
