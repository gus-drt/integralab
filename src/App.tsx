import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { PreferencesDialog } from './components/PreferencesDialog'
import { usePersistentState } from './hooks/usePersistentState'
import { HomePage } from './pages/HomePage'
import { LearnPage } from './pages/LearnPage'
import { LessonPage } from './pages/LessonPage'
import { PracticePage } from './pages/PracticePage'
import { RiemannPage } from './pages/RiemannPage'
import { ReviewPage } from './pages/ReviewPage'
import { ExamPage } from './pages/ExamPage'
import { ApplicationLabsPage } from './pages/ApplicationLabsPage'
import { ChallengesPage } from './pages/ChallengesPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { loadPreferences, loadProgress, savePreferences, saveProgress } from './state/progress'

export default function App() {
  const [progress, setProgress] = usePersistentState(loadProgress, saveProgress)
  const [preferences, setPreferences] = usePersistentState(loadPreferences, savePreferences)
  const [preferencesOpen, setPreferencesOpen] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.reduceMotion = String(preferences.reduceMotion)
  }, [preferences.reduceMotion])

  return <BrowserRouter><Routes><Route element={<AppShell preferences={preferences} onOpenPreferences={() => setPreferencesOpen(true)} />}><Route index element={<HomePage preferences={preferences} progress={progress} />} /><Route path="aprender" element={<LearnPage progress={progress} />} /><Route path="aprender/:moduleId/:lessonId" element={<LessonPage progress={progress} onProgress={setProgress} />} /><Route path="laboratorio/riemann" element={<RiemannPage />} /><Route path="laboratorio/aplicacoes" element={<ApplicationLabsPage />} /><Route path="desafios" element={<ChallengesPage progress={progress} onProgress={setProgress} />} /><Route path="praticar" element={<PracticePage progress={progress} onProgress={setProgress} />} /><Route path="revisao" element={<ReviewPage progress={progress} onProgress={setProgress} />} /><Route path="simulado" element={<ExamPage />} /><Route path="*" element={<NotFoundPage />} /></Route></Routes><PreferencesDialog open={preferencesOpen} preferences={preferences} progress={progress} onClose={() => setPreferencesOpen(false)} onPreferences={setPreferences} onImport={(nextProgress, nextPreferences) => { setProgress(nextProgress); setPreferences(nextPreferences) }} /></BrowserRouter>
}
