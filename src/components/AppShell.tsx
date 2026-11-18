import { useState, useEffect } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import type { Preferences } from '../state/progress'

const nav = [
  ['/', 'Início'],
  ['/aprender', 'Aprender'],
  ['/praticar', 'Praticar'],
  ['/revisao', 'Revisão'],
  ['/simulado', 'Simulado'],
]

export function AppShell({ preferences, onOpenPreferences }: { preferences: Preferences; onOpenPreferences: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const [prevPathname, setPrevPathname] = useState(location.pathname)

  // Fecha o menu móvel imediatamente quando a rota mudar
  if (prevPathname !== location.pathname) {
    setPrevPathname(location.pathname)
    setMenuOpen(false)
  }

  // Fecha o menu com a tecla Escape
  useEffect(() => {
    if (!menuOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  return (
    <div className={preferences.focusMode ? 'app focus-mode' : 'app'}>
      <header className={`topbar ${menuOpen ? 'nav-open' : ''}`}>
        <NavLink
          to="/"
          className="brand"
          aria-label="IntegraLab, página inicial"
          onClick={() => setMenuOpen(false)}
        >
          <span aria-hidden="true">∫</span> IntegraLab
        </NavLink>

        <nav
          id="primary-navigation"
          className={`topbar-nav ${menuOpen ? 'open' : ''}`}
          aria-label="Navegação principal"
        >
          {nav.map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="topbar-actions">
          <button
            className="icon-button"
            type="button"
            onClick={onOpenPreferences}
            aria-label="Ajustes: abrir preferências"
          >
            Ajustes
          </button>
          <button
            className="menu-toggle"
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
          >
            <span className="hamburger-box" aria-hidden="true">
              <span className="hamburger-bar" />
              <span className="hamburger-bar" />
              <span className="hamburger-bar" />
            </span>
          </button>
        </div>
      </header>

      {menuOpen && (
        <div
          className="menu-backdrop"
          aria-hidden="true"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <main id="conteudo">
        <Outlet />
      </main>

      <footer>
        <span>IntegraLab · Cálculo 1A</span>
        <span>Seu progresso fica neste dispositivo.</span>
      </footer>
    </div>
  )
}
