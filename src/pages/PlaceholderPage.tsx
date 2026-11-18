import type { ReactNode } from 'react'

export function PlaceholderPage({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return <div className="page"><header className="page-heading"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{children}</p></header><section className="empty-state"><span aria-hidden="true">∫</span><h2>Esta área entra nas próximas etapas</h2><p>Ela aparece desde já para validar a navegação. Nenhum resultado fictício será exibido.</p></section></div>
}
