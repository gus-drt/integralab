export const STORAGE_KEY = 'integralab.progress.v1'
export const PREFERENCES_KEY = 'integralab.preferences.v1'

export interface ProgressState {
  version: 1
  completedLessons: string[]
  attempts: Record<string, AttemptRecord>
  lastVisitedPath: string
  updatedAt: string
}

export interface AttemptRecord {
  correct: boolean
  attempts: number
  wrongAttempts?: number
  reviewLevel?: number
  lastAttemptAt: string
  nextReviewAt?: string
}

export interface Preferences {
  focusMode: boolean
  reduceMotion: boolean
  sessionMinutes: 10 | 15 | 20 | 30 | 45
}

export const emptyProgress = (): ProgressState => ({
  version: 1,
  completedLessons: [],
  attempts: {},
  lastVisitedPath: '/aprender',
  updatedAt: new Date().toISOString(),
})

export const defaultPreferences: Preferences = {
  focusMode: false,
  reduceMotion: false,
  sessionMinutes: 15,
}

const REVIEW_DELAYS_DAYS = [1, 3, 7, 14, 30]

export function createAttemptRecord(previous: AttemptRecord | undefined, correct: boolean, now = new Date()): AttemptRecord {
  const previousLevel = previous?.reviewLevel ?? 0
  const reviewLevel = correct ? Math.min(previousLevel + 1, REVIEW_DELAYS_DAYS.length) : 0
  const due = new Date(now)
  due.setDate(due.getDate() + (correct ? REVIEW_DELAYS_DAYS[Math.max(0, reviewLevel - 1)] : 0))
  return {
    correct,
    attempts: (previous?.attempts ?? 0) + 1,
    wrongAttempts: (previous?.wrongAttempts ?? (previous && !previous.correct ? 1 : 0)) + (correct ? 0 : 1),
    reviewLevel,
    lastAttemptAt: now.toISOString(),
    nextReviewAt: due.toISOString(),
  }
}

function safeRead<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key)
    return stored ? (JSON.parse(stored) as T) : fallback
  } catch {
    return fallback
  }
}

export function loadProgress(): ProgressState {
  const value = safeRead<Partial<ProgressState>>(STORAGE_KEY, {})
  if (value.version !== 1 || !Array.isArray(value.completedLessons) || !value.attempts || typeof value.attempts !== 'object' || typeof value.lastVisitedPath !== 'string') return emptyProgress()
  return { ...emptyProgress(), ...value, completedLessons: value.completedLessons.filter((item): item is string => typeof item === 'string'), attempts: Object.fromEntries(Object.entries(value.attempts).filter((entry): entry is [string, AttemptRecord] => {
    const record = entry[1] as Partial<AttemptRecord> | undefined
    return !!record && typeof record.correct === 'boolean' && Number.isFinite(record.attempts) && typeof record.lastAttemptAt === 'string'
  })) }
}

export function saveProgress(progress: ProgressState): void {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...progress, updatedAt: new Date().toISOString() })) } catch { /* armazenamento indisponível ou cheio: o estado continua utilizável nesta sessão */ }
}

export function loadPreferences(): Preferences {
  const value = safeRead<Partial<Preferences>>(PREFERENCES_KEY, {})
  return { focusMode: typeof value.focusMode === 'boolean' ? value.focusMode : defaultPreferences.focusMode, reduceMotion: typeof value.reduceMotion === 'boolean' ? value.reduceMotion : defaultPreferences.reduceMotion, sessionMinutes: [10, 15, 20, 30, 45].includes(value.sessionMinutes ?? 0) ? value.sessionMinutes as Preferences['sessionMinutes'] : defaultPreferences.sessionMinutes }
}

export function savePreferences(preferences: Preferences): void {
  try { localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences)) } catch { /* armazenamento indisponível: manter preferências em memória */ }
}

export function exportProgress(progress: ProgressState, preferences: Preferences): string {
  return JSON.stringify({ application: 'IntegraLab', exportedAt: new Date().toISOString(), progress, preferences }, null, 2)
}

export function importProgress(raw: string): { progress: ProgressState; preferences: Preferences } {
  const parsed = JSON.parse(raw) as { application?: string; progress?: Partial<ProgressState>; preferences?: Partial<Preferences> }
  if (parsed.application !== 'IntegraLab' || parsed.progress?.version !== 1 || !Array.isArray(parsed.progress.completedLessons) || !parsed.progress.attempts || typeof parsed.progress.attempts !== 'object' || typeof parsed.progress.lastVisitedPath !== 'string') {
    throw new Error('Arquivo de progresso inválido ou incompatível.')
  }
  return {
    progress: { ...emptyProgress(), ...parsed.progress, completedLessons: parsed.progress.completedLessons.filter((item): item is string => typeof item === 'string'), attempts: Object.fromEntries(Object.entries(parsed.progress.attempts).filter((entry): entry is [string, AttemptRecord] => { const record = entry[1] as Partial<AttemptRecord> | undefined; return !!record && typeof record.correct === 'boolean' && Number.isFinite(record.attempts) && typeof record.lastAttemptAt === 'string' })) },
    preferences: { focusMode: typeof parsed.preferences?.focusMode === 'boolean' ? parsed.preferences.focusMode : defaultPreferences.focusMode, reduceMotion: typeof parsed.preferences?.reduceMotion === 'boolean' ? parsed.preferences.reduceMotion : defaultPreferences.reduceMotion, sessionMinutes: [10, 15, 20, 30, 45].includes(parsed.preferences?.sessionMinutes ?? 0) ? parsed.preferences?.sessionMinutes as Preferences['sessionMinutes'] : defaultPreferences.sessionMinutes },
  }
}
