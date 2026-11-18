import { useEffect, useRef } from 'react'
import type { ChangeEvent } from 'react'
import type { Preferences, ProgressState } from '../state/progress'
import { exportProgress, importProgress } from '../state/progress'

interface Props {
  open: boolean
  preferences: Preferences
  progress: ProgressState
  onClose: () => void
  onPreferences: (value: Preferences) => void
  onImport: (progress: ProgressState, preferences: Preferences) => void
}

export function PreferencesDialog({ open, preferences, progress, onClose, onPreferences, onImport }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const onCloseRef = useRef(onClose)
  useEffect(() => { onCloseRef.current = onClose }, [onClose])
  useEffect(() => {
    if (!open) return
    const previous = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    function onKeyDown(event: KeyboardEvent) { if (event.key === 'Escape') onCloseRef.current() }
    document.addEventListener('keydown', onKeyDown)
    return () => { document.removeEventListener('keydown', onKeyDown); previous?.focus() }
  }, [open])
  if (!open) return null

  function downloadProgress() {
    const blob = new Blob([exportProgress(progress, preferences)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'integralab-progresso.json'
    link.click()
    URL.revokeObjectURL(url)
  }

  async function uploadProgress(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    try {
      const imported = importProgress(await file.text())
      onImport(imported.progress, imported.preferences)
      window.alert('Progresso importado com sucesso.')
    } catch (error) {
      window.alert(error instanceof Error ? error.message : 'Não foi possível importar o arquivo.')
    } finally {
      event.target.value = ''
    }
  }

  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="dialog" role="dialog" aria-modal="true" aria-labelledby="preferences-title" aria-describedby="preferences-description" onMouseDown={(e) => e.stopPropagation()}>
        <div className="dialog-heading"><div><p className="eyebrow">Seu espaço de estudo</p><h2 id="preferences-title">Preferências</h2></div><button ref={closeRef} type="button" className="icon-button" onClick={onClose}>Fechar</button></div>
        <p id="preferences-description" className="sr-only">Ajuste foco, movimento, duração sugerida e dados de progresso. Pressione Escape para fechar.</p>
        <label className="toggle"><span><strong>Modo foco</strong><small>Reduz elementos secundários durante o estudo.</small></span><input type="checkbox" checked={preferences.focusMode} onChange={(e) => onPreferences({ ...preferences, focusMode: e.target.checked })} /></label>
        <label className="toggle"><span><strong>Reduzir movimento</strong><small>Desativa transições e animações não essenciais.</small></span><input type="checkbox" checked={preferences.reduceMotion} onChange={(e) => onPreferences({ ...preferences, reduceMotion: e.target.checked })} /></label>
        <label className="field"><span>Duração sugerida da sessão</span><select value={preferences.sessionMinutes} onChange={(e) => onPreferences({ ...preferences, sessionMinutes: Number(e.target.value) as Preferences['sessionMinutes'] })}><option value="10">10 minutos</option><option value="15">15 minutos</option><option value="20">20 minutos</option><option value="30">30 minutos</option><option value="45">45 minutos</option></select></label>
        <div className="data-actions"><button type="button" onClick={downloadProgress}>Exportar progresso</button><button type="button" onClick={() => inputRef.current?.click()}>Importar progresso</button><input ref={inputRef} className="sr-only" type="file" accept="application/json" onChange={uploadProgress} /></div>
      </section>
    </div>
  )
}
