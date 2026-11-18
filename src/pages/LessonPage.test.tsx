import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { LessonPage } from './LessonPage'
import { emptyProgress } from '../state/progress'

describe('LessonPage - Rolagem ao topo ao avançar lição', () => {
  beforeEach(() => {
    vi.stubGlobal('scrollTo', vi.fn())
  })

  it('chama window.scrollTo para o topo ao carregar a lição', () => {
    render(
      <MemoryRouter initialEntries={['/aprender/trilha-zero/zero-01-acumular']}>
        <Routes>
          <Route
            path="/aprender/:moduleId/:lessonId"
            element={<LessonPage progress={emptyProgress()} onProgress={vi.fn()} />}
          />
        </Routes>
      </MemoryRouter>
    )

    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, left: 0 })
  })

  it('chama scrollTo ao clicar em Próxima lição', () => {
    render(
      <MemoryRouter initialEntries={['/aprender/trilha-zero/zero-01-acumular']}>
        <Routes>
          <Route
            path="/aprender/:moduleId/:lessonId"
            element={<LessonPage progress={emptyProgress()} onProgress={vi.fn()} />}
          />
        </Routes>
      </MemoryRouter>
    )

    const nextButton = screen.getByRole('link', { name: /próxima lição/i })
    expect(nextButton).toBeInTheDocument()

    fireEvent.click(nextButton)
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, left: 0, behavior: 'smooth' })
  })
})
