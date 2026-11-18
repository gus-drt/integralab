import type { CourseModule } from '../types/content'

export const courseModules: CourseModule[] = [
  {
    id: 'trilha-zero',
    title: 'Trilha Zero — Primeiros passos em integrais',
    shortTitle: 'Trilha Zero',
    description: 'Acumulação, áreas, aproximações e a primeira leitura da notação integral.',
    status: 'core', enabled: true, lessonCount: 6, prerequisites: [],
  },
  {
    id: 'primitivas',
    title: 'Primitivas e integrais indefinidas',
    shortTitle: 'Primitivas',
    description: 'Famílias de primitivas, regras imediatas, constante de integração e verificação.',
    status: 'syllabus', enabled: true, lessonCount: 5, prerequisites: ['trilha-zero'],
  },
  {
    id: 'integral-definida',
    title: 'Integral definida e Teorema Fundamental',
    shortTitle: 'Integral definida',
    description: 'Somas, área líquida, propriedades e a conexão entre derivar e integrar.',
    status: 'syllabus', enabled: true, lessonCount: 6, prerequisites: ['trilha-zero', 'primitivas'],
  },
  {
    id: 'tecnicas',
    title: 'Técnicas de integração',
    shortTitle: 'Técnicas',
    description: 'Substituição, partes, substituições trigonométricas e frações parciais.',
    status: 'syllabus', enabled: true, lessonCount: 8, prerequisites: ['primitivas'],
  },
  {
    id: 'improprias',
    title: 'Integrais impróprias',
    shortTitle: 'Impróprias',
    description: 'Intervalos infinitos, integrandos ilimitados e convergência.',
    status: 'syllabus', enabled: true, lessonCount: 3, prerequisites: ['integral-definida', 'tecnicas'],
  },
  {
    id: 'aplicacoes',
    title: 'Aplicações da integração',
    shortTitle: 'Aplicações',
    description: 'Áreas, volumes, comprimento de arco, superfícies e valor médio.',
    status: 'syllabus', enabled: true, lessonCount: 7, prerequisites: ['integral-definida'],
  },
]
