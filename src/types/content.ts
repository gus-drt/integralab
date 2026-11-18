export type ContentStatus = 'core' | 'syllabus' | 'advanced'

export interface CourseModule {
  id: string
  title: string
  shortTitle: string
  description: string
  status: ContentStatus
  enabled: boolean
  lessonCount: number
  prerequisites: string[]
}

export type ExerciseFormat = 'multiple-choice' | 'numeric' | 'expression' | 'open'

export interface Exercise {
  id: string
  moduleId: string
  topic: string
  prerequisites: string[]
  difficulty: 0 | 1 | 2 | 3 | 4 | 5
  format: ExerciseFormat
  prompt: string
  expectedAnswer: string | number
  solution: string[]
  hints: string[]
  commonErrors: string[]
  suggestedMinutes: number
  tags: string[]
  choices?: { id: string; label: string }[]
  explanation: string
  equivalenceMode?: 'exact' | 'up-to-constant'
  tolerance?: number
}

export interface Lesson {
  id: string
  order: number
  title: string
  durationMinutes: number
  objective: string
  openingQuestion: string
  explanation: string[]
  keyIdea: string
  workedExample: { prompt: string; steps: string[]; answer: string }
  guidedExample: { prompt: string; steps: string[]; question: string; expectedAnswer: number; explanation: string }
  exerciseIds: string[]
  summary: string[]
  commonErrors: string[]
}
