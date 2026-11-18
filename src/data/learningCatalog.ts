import { zeroLessons } from './zeroLessons'
import { primitiveLessons } from './primitiveLessons'
import { definedLessons } from './definedLessons'
import { techniqueLessons } from './techniqueLessons'
import { improperLessons } from './improperLessons'
import { applicationLessons } from './applicationLessons'

export const learningModules = [
  { id: 'trilha-zero', title: 'Trilha Zero', lessons: zeroLessons },
  { id: 'primitivas', title: 'Primitivas', lessons: primitiveLessons },
  { id: 'integral-definida', title: 'Integral definida', lessons: definedLessons },
  { id: 'tecnicas', title: 'Técnicas', lessons: techniqueLessons },
  { id: 'improprias', title: 'Impróprias', lessons: improperLessons },
  { id: 'aplicacoes', title: 'Aplicações', lessons: applicationLessons },
]

export const allLessons = learningModules.flatMap((module) => module.lessons.map((lesson) => ({ ...lesson, moduleId: module.id, moduleTitle: module.title })))
