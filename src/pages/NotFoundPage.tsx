import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return <div className="page"><section className="empty-state"><span aria-hidden="true">?</span><h1>Página não encontrada</h1><p>O endereço pode ter mudado ou não fazer parte do IntegraLab.</p><Link className="primary-button" to="/">Voltar ao início</Link></section></div>
}
