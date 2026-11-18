import type { Exercise } from '../types/content'

const base = (id: string, topic: string, prompt: string, answer: number, solution: string[], difficulty: 1 | 2 | 3 = 1, tolerance = 1e-9): Exercise => ({ id, moduleId: 'integral-definida', topic, prerequisites: ['trilha-zero', 'primitivas'], difficulty, format: 'numeric', prompt, expectedAnswer: answer, tolerance, solution, hints: ['Identifique o intervalo e o significado do resultado.', 'Use a propriedade ou a primitiva adequada e confira os sinais.'], commonErrors: ['Ignorar a orientação dos limites.', 'Confundir área geométrica com acumulação líquida.'], suggestedMinutes: difficulty + 1, tags: ['integral definida', topic], explanation: solution.at(-1) ?? '' })
const choice = (id: string, topic: string, prompt: string, expected: string, choices: { id: string; label: string }[], explanation: string): Exercise => ({ id, moduleId: 'integral-definida', topic, prerequisites: ['trilha-zero'], difficulty: 1, format: 'multiple-choice', prompt, expectedAnswer: expected, choices, solution: [explanation], hints: ['Observe limites, sinal e intervalo.', 'Compare cada opção com a definição.'], commonErrors: ['Aplicar uma regra sem observar os limites.'], suggestedMinutes: 2, tags: ['integral definida', topic], explanation })
const expression = (id: string, topic: string, prompt: string, expected: string, solution: string[], difficulty: 1 | 2 = 1): Exercise => ({ id, moduleId: 'integral-definida', topic, prerequisites: ['primitivas'], difficulty, format: 'expression', prompt, expectedAnswer: expected, equivalenceMode: 'exact', solution, hints: ['Use o Teorema Fundamental.', 'Derive considerando o limite superior.'], commonErrors: ['Adicionar +C em uma derivada.', 'Esquecer a regra da cadeia.'], suggestedMinutes: difficulty + 1, tags: ['Teorema Fundamental', topic], explanation: solution.at(-1) ?? '' })

export const definedExercises: Exercise[] = [
  base('def-01-constante', 'área líquida', 'Calcule ∫₀³ 2 dx.', 6, ['A região é um retângulo de largura 3 e altura 2.', 'Integral = 6.']),
  base('def-01-negativa', 'área líquida', 'Calcule ∫₀³ (−2) dx.', -6, ['A área está abaixo do eixo x.', 'Acumulação líquida = −2 × 3 = −6.']),
  base('def-01-partes', 'área líquida', 'Uma região contribui +5 acima do eixo e −2 abaixo. Qual é a integral?', 3, ['Some com sinais: 5 + (−2).', 'Integral = 3.']),
  choice('def-01-geometrica', 'área líquida', 'Se a função cruza o eixo x, integral definida e área geométrica total são sempre iguais?', 'b', [{ id: 'a', label: 'Sim' }, { id: 'b', label: 'Não; a integral usa sinais' }, { id: 'c', label: 'Só quando os limites são inteiros' }], 'Partes abaixo do eixo contribuem negativamente para a integral, mas positivamente para a área geométrica.'),

  base('def-02-esquerda', 'Riemann', 'Para f(x)=x² em [0,2], com 2 faixas, qual é a soma à esquerda?', 1, ['Δx = 1; alturas f(0)=0 e f(1)=1.', 'Soma = (0+1)·1 = 1.']),
  base('def-02-direita', 'Riemann', 'Para f(x)=x² em [0,2], com 2 faixas, qual é a soma à direita?', 5, ['Δx = 1; alturas f(1)=1 e f(2)=4.', 'Soma = 5.']),
  base('def-02-medio', 'Riemann', 'Para f(x)=x² em [0,2], com 2 faixas, qual é a soma pelo ponto médio?', 2.5, ['Pontos médios: 0,5 e 1,5.', 'Soma = (0,25+2,25)·1 = 2,5.']),
  choice('def-02-convergencia', 'Riemann', 'O que significa aumentar n em uma soma de Riemann?', 'a', [{ id: 'a', label: 'Usar mais faixas, cada uma mais estreita' }, { id: 'b', label: 'Aumentar os limites' }, { id: 'c', label: 'Trocar a função' }], 'Como Δx=(b−a)/n, aumentar n reduz a largura das faixas.'),

  base('def-03-linear', 'propriedades', 'Calcule ∫₀² x dx.', 2, ['Uma primitiva é x²/2.', '[x²/2]₀² = 2.']),
  base('def-03-impar', 'propriedades', 'Calcule ∫₋₁¹ x dx.', 0, ['x é ímpar e o intervalo é simétrico.', 'As contribuições se cancelam: integral = 0.']),
  base('def-03-fator', 'propriedades', 'Calcule ∫₀² 3x² dx.', 8, ['Uma primitiva é x³.', '[x³]₀² = 8.']),
  base('def-03-inverter', 'propriedades', 'Calcule ∫₃¹ 4 dx.', -8, ['Inverter limites troca o sinal.', '∫₁³4dx = 8, então ∫₃¹4dx = −8.']),

  base('def-04-2x', 'TFC parte 2', 'Use uma primitiva para calcular ∫₁³ 2x dx.', 8, ['Primitiva: x².', '3² − 1² = 8.']),
  base('def-04-polinomio', 'TFC parte 2', 'Calcule ∫₀² (x²+1) dx. Use decimal ou fração calculada.', 14 / 3, ['Primitiva: x³/3+x.', 'Em 2: 8/3+2=14/3; em 0: 0.'], 2, 1e-6),
  base('def-04-negativo', 'TFC parte 2', 'Calcule ∫₋₂⁰ 3x² dx.', 8, ['Primitiva: x³.', '0³ − (−2)³ = 8.']),
  choice('def-04-procedimento', 'TFC parte 2', 'Se F′=f, como calcular ∫ₐᵇf(x)dx?', 'c', [{ id: 'a', label: 'F(a)+F(b)' }, { id: 'b', label: 'f(b)−f(a)' }, { id: 'c', label: 'F(b)−F(a)' }], 'A Parte 2 do TFC afirma ∫ₐᵇf(x)dx = F(b)−F(a).'),

  expression('def-05-x2', 'TFC parte 1', 'Se G(x)=∫₀ˣ t² dt, escreva G′(x).', 'x^2', ['Pelo TFC, derivar a acumulação recupera o integrando no limite superior.', 'G′(x)=x².']),
  expression('def-05-linear', 'TFC parte 1', 'Se H(x)=∫₁ˣ (3t+2)dt, escreva H′(x).', '3*x+2', ['Substitua t pelo limite superior x.', 'H′(x)=3x+2.']),
  expression('def-05-cadeia', 'TFC parte 1', 'Se P(x)=∫₁^(x²) t dt, escreva P′(x).', '2*x^3', ['Integrando no limite: x².', 'Derivada do limite x²: 2x.', 'Produto: 2x³.'], 2),
  choice('def-05-continuidade', 'TFC parte 1', 'Qual hipótese usual permite aplicar diretamente a Parte 1 do TFC?', 'a', [{ id: 'a', label: 'O integrando é contínuo no intervalo' }, { id: 'b', label: 'O integrando é sempre positivo' }, { id: 'c', label: 'Os limites são inteiros' }], 'A continuidade do integrando garante a forma básica do resultado.'),

  base('def-06-constante', 'valor médio', 'Qual é o valor médio de f(x)=7 em [2,5]?', 7, ['A média de uma função constante é a própria constante.', 'Valor médio = 7.']),
  base('def-06-linear', 'valor médio', 'Qual é o valor médio de f(x)=x em [0,4]?', 2, ['Integral = [x²/2]₀⁴ = 8.', 'Divida pela largura 4: 8/4=2.']),
  base('def-06-quadratica', 'valor médio', 'Qual é o valor médio de f(x)=x² em [0,3]?', 3, ['Integral = [x³/3]₀³ = 9.', 'Divida pela largura 3: 9/3=3.']),
  choice('def-06-formula', 'valor médio', 'Qual fórmula dá o valor médio de f em [a,b]?', 'b', [{ id: 'a', label: '∫ₐᵇf(x)dx' }, { id: 'b', label: '(1/(b−a))∫ₐᵇf(x)dx' }, { id: 'c', label: '(f(a)+f(b))/(b−a)' }], 'Dividimos a acumulação total pelo comprimento b−a do intervalo.'),
]

export const definedExerciseById = Object.fromEntries(definedExercises.map((item) => [item.id, item]))
