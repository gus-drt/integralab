import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'
import { AppShell } from './AppShell'
import { defaultPreferences } from '../state/progress'

describe('AppShell - Menu Hambúrguer Responsivo', () => {
  it('renderiza o botão de alternância do menu com atributos acessíveis', () => {
    render(
      <MemoryRouter>
        <AppShell preferences={defaultPreferences} onOpenPreferences={vi.fn()} />
      </MemoryRouter>
    )

    const toggleButton = screen.getByRole('button', { name: /abrir menu de navegação/i })
    expect(toggleButton).toBeInTheDocument()
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false')
    expect(toggleButton).toHaveAttribute('aria-controls', 'primary-navigation')
  })

  it('abre e fecha o menu ao clicar no botão hambúrguer', () => {
    render(
      <MemoryRouter>
        <AppShell preferences={defaultPreferences} onOpenPreferences={vi.fn()} />
      </MemoryRouter>
    )

    const toggleButton = screen.getByRole('button', { name: /abrir menu de navegação/i })
    const nav = screen.getByRole('navigation', { name: /navegação principal/i })

    expect(nav).not.toHaveClass('open')

    // Abre o menu
    fireEvent.click(toggleButton)
    expect(toggleButton).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('button', { name: /fechar menu de navegação/i })).toBeInTheDocument()
    expect(nav).toHaveClass('open')

    // Fecha o menu
    fireEvent.click(toggleButton)
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false')
    expect(nav).not.toHaveClass('open')
  })

  it('fecha o menu quando um link de navegação é clicado', () => {
    render(
      <MemoryRouter>
        <AppShell preferences={defaultPreferences} onOpenPreferences={vi.fn()} />
      </MemoryRouter>
    )

    const toggleButton = screen.getByRole('button', { name: /abrir menu de navegação/i })
    fireEvent.click(toggleButton)

    const nav = screen.getByRole('navigation', { name: /navegação principal/i })
    expect(nav).toHaveClass('open')

    const praticarLink = screen.getByRole('link', { name: 'Praticar' })
    fireEvent.click(praticarLink)

    expect(nav).not.toHaveClass('open')
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false')
  })

  it('fecha o menu ao pressionar a tecla Escape', () => {
    render(
      <MemoryRouter>
        <AppShell preferences={defaultPreferences} onOpenPreferences={vi.fn()} />
      </MemoryRouter>
    )

    const toggleButton = screen.getByRole('button', { name: /abrir menu de navegação/i })
    fireEvent.click(toggleButton)

    const nav = screen.getByRole('navigation', { name: /navegação principal/i })
    expect(nav).toHaveClass('open')

    fireEvent.keyDown(window, { key: 'Escape' })

    expect(nav).not.toHaveClass('open')
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false')
  })
})
