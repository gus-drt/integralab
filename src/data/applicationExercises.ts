import type { Exercise } from '../types/content'

const numeric = (id: string, topic: string, prompt: string, answer: number, solution: string[], difficulty: 2 | 3 | 4 = 2, tolerance = 1e-6): Exercise => ({ id, moduleId: 'aplicacoes', topic, prerequisites: ['integral-definida'], difficulty, format: 'numeric', prompt, expectedAnswer: answer, tolerance, solution, hints: ['Faça um esboço e identifique a grandeza diferencial.', 'Monte a integral com limites e unidades antes de calcular.'], commonErrors: ['Usar a fórmula correta com limites ou raio incorretos.', 'Apresentar um valor sem interpretar a unidade.'], suggestedMinutes: difficulty + 2, tags: ['aplicações', topic], explanation: solution.at(-1) ?? '' })
const choice = (id: string, topic: string, prompt: string, expected: string, choices: { id: string; label: string }[], explanation: string, difficulty: 2 | 3 = 2): Exercise => ({ id, moduleId: 'aplicacoes', topic, prerequisites: ['integral-definida'], difficulty, format: 'multiple-choice', prompt, expectedAnswer: expected, choices, solution: [explanation], hints: ['Identifique eixo, raio, altura e variável de integração.', 'Confira as unidades esperadas.'], commonErrors: ['Confundir raio com diâmetro ou altura.'], suggestedMinutes: difficulty + 2, tags: ['aplicações', topic], explanation })

export const applicationExercises: Exercise[] = [
  numeric('apl-01-linear', 'área entre curvas', 'Encontre a área entre y=x e y=x² em [0,1].', 1 / 6, ['Em [0,1], x≥x².', 'Área=∫₀¹(x−x²)dx=[x²/2−x³/3]₀¹=1/6.']),
  numeric('apl-01-parabola', 'área entre curvas', 'Encontre a área entre y=4 e y=x², de x=−2 a x=2.', 32 / 3, ['A curva superior é 4.', '∫₋₂²(4−x²)dx=32/3.']),
  numeric('apl-01-cruza', 'área entre curvas', 'Qual é a área entre y=x e o eixo x em [−1,1]?', 1, ['Divida em x=0 ou use |x|.', 'Duas áreas triangulares de 1/2 somam 1.']),
  choice('apl-01-ordem', 'área entre curvas', 'Com fatias verticais, a altura típica da região é:', 'a', [{ id: 'a', label: 'função superior − função inferior' }, { id: 'b', label: 'função direita − função esquerda' }, { id: 'c', label: 'soma das funções' }], 'Para integração em x, cada retângulo vertical tem altura superior−inferior.'),

  numeric('apl-02-disco', 'discos e arruelas', 'Gire y=x, 0≤x≤2, em torno do eixo x. Qual é o volume?', 8 * Math.PI / 3, ['Raio R=x.', 'V=π∫₀²x²dx=8π/3.']),
  numeric('apl-02-constante', 'discos e arruelas', 'Gire y=3, 0≤x≤4, em torno do eixo x. Qual é o volume?', 36 * Math.PI, ['O sólido é um cilindro de raio 3 e comprimento 4.', 'V=π∫₀⁴9dx=36π.']),
  numeric('apl-02-arruela', 'discos e arruelas', 'Uma arruela tem raio externo 3 e interno 1. Qual é sua área?', 8 * Math.PI, ['A=π(R²−r²).', 'A=π(9−1)=8π.']),
  choice('apl-02-formula', 'discos e arruelas', 'Qual integrando representa uma arruela?', 'b', [{ id: 'a', label: '2π·raio·altura' }, { id: 'b', label: 'π(R²−r²)' }, { id: 'c', label: 'R−r' }], 'A seção é um disco externo menos o disco interno.'),

  numeric('apl-03-casca', 'cascas cilíndricas', 'Gire a região sob y=x em [0,2] em torno do eixo y usando cascas. Qual é o volume?', 16 * Math.PI / 3, ['Raio=x e altura=x.', 'V=2π∫₀²x·x dx=16π/3.']),
  numeric('apl-03-retangulo', 'cascas cilíndricas', 'Gire 0≤x≤2, 0≤y≤3 em torno do eixo y. Qual é o volume?', 12 * Math.PI, ['V=2π∫₀²x·3dx.', 'V=12π.']),
  choice('apl-03-elementos', 'cascas cilíndricas', 'No método das cascas em torno do eixo y, com integração em x, os fatores são:', 'c', [{ id: 'a', label: 'π e raio²' }, { id: 'b', label: 'base e altura' }, { id: 'c', label: '2π, raio, altura e espessura' }], 'A casca fina tem volume aproximado 2π·raio·altura·dx.'),
  choice('apl-03-escolha', 'cascas cilíndricas', 'Cascas são especialmente úteis quando:', 'a', [{ id: 'a', label: 'fatias paralelas ao eixo geram cascas simples' }, { id: 'b', label: 'não existe eixo de rotação' }, { id: 'c', label: 'a região tem área zero' }], 'A orientação pode evitar resolver funções inversas ou dividir a região.'),

  numeric('apl-04-quadrados', 'seções transversais', 'Um sólido tem base 0≤x≤2 e seções quadradas de lado x. Qual é o volume?', 8 / 3, ['Área da seção A(x)=x².', 'V=∫₀²x²dx=8/3.']),
  numeric('apl-04-circulos', 'seções transversais', 'Seções perpendiculares ao eixo x são círculos de raio x em [0,1]. Qual é o volume?', Math.PI / 3, ['A(x)=πx².', 'V=∫₀¹πx²dx=π/3.']),
  numeric('apl-04-triangulos', 'seções transversais', 'Seções são triângulos de base x e altura x em [0,2]. Qual é o volume?', 4 / 3, ['A(x)=x²/2.', 'V=∫₀²x²/2dx=4/3.']),
  choice('apl-04-principio', 'seções transversais', 'A fórmula geral por seções é:', 'b', [{ id: 'a', label: 'V=∫perímetro dx' }, { id: 'b', label: 'V=∫A(x)dx' }, { id: 'c', label: 'V=A(b)−A(a)' }], 'Somamos áreas de seções transversais multiplicadas pela espessura.'),

  numeric('apl-05-linha', 'comprimento de arco', 'Qual é o comprimento de y=x em [0,3]?', 3 * Math.SQRT2, ['y′=1.', 'L=∫₀³√(1+1²)dx=3√2.']),
  numeric('apl-05-horizontal', 'comprimento de arco', 'Qual é o comprimento de y=5 em [−2,4]?', 6, ['y′=0.', 'L=∫₋₂⁴1dx=6.']),
  choice('apl-05-formula', 'comprimento de arco', 'Para y=f(x), a fórmula do comprimento em [a,b] é:', 'a', [{ id: 'a', label: '∫√(1+[f′(x)]²)dx' }, { id: 'b', label: '∫πf(x)²dx' }, { id: 'c', label: '∫|f(x)|dx' }], 'O elemento de arco vem do limite do Teorema de Pitágoras.'),
  choice('apl-05-derivada', 'comprimento de arco', 'Por que aparece f′ na fórmula de arco?', 'c', [{ id: 'a', label: 'Para medir a área' }, { id: 'b', label: 'Para encontrar o valor médio' }, { id: 'c', label: 'Para incorporar a variação vertical junto à horizontal' }], 'Localmente, ds≈√(dx²+dy²)=√(1+(dy/dx)²)dx.'),

  numeric('apl-06-cilindro', 'superfície de revolução', 'Gire y=2, 0≤x≤3, em torno do eixo x. Qual é a área lateral?', 12 * Math.PI, ['Raio=2 e ds=dx.', 'S=2π∫₀³2dx=12π.']),
  numeric('apl-06-cone', 'superfície de revolução', 'Gire y=x, 0≤x≤1, em torno do eixo x. Qual é a área da superfície lateral?', Math.PI * Math.SQRT2, ['y′=1.', 'S=2π∫₀¹x√2dx=π√2.']),
  choice('apl-06-formula', 'superfície de revolução', 'Ao girar y=f(x)≥0 em torno do eixo x, a área é:', 'b', [{ id: 'a', label: 'π∫f²dx' }, { id: 'b', label: '2π∫f√(1+[f′]²)dx' }, { id: 'c', label: '∫(superior−inferior)dx' }], 'A circunferência 2πf multiplica o elemento de arco ds.'),
  choice('apl-06-diferenca', 'superfície de revolução', 'Área de superfície e volume de revolução diferem porque:', 'a', [{ id: 'a', label: 'uma acumula uma camada superficial; o outro, seções sólidas' }, { id: 'b', label: 'usam sempre o mesmo integrando' }, { id: 'c', label: 'superfície não usa derivada' }], 'A superfície usa circunferência×arco; o volume usa área de seção ou casca.'),

  numeric('apl-07-velocidade', 'aplicações e unidades', 'Uma velocidade v(t)=2t m/s atua de t=0 a t=3. Qual é o deslocamento?', 9, ['Deslocamento=∫₀³2t dt=[t²]₀³.', 'Resultado: 9 m.']),
  numeric('apl-07-sinal', 'aplicações e unidades', 'Uma taxa constante de processamento é 5 itens/s por 8 s. Quantos itens?', 40, ['Total=∫₀⁸5dt.', 'Resultado: 40 itens.']),
  numeric('apl-07-media', 'aplicações e unidades', 'A taxa r(t)=t² itens/s em [0,3]. Qual é a taxa média?', 3, ['Total=∫₀³t²dt=9 itens.', 'Divida por 3 s: média=3 itens/s.']),
  choice('apl-07-modelo', 'aplicações e unidades', 'Antes de integrar uma taxa em um contexto aplicado, é essencial:', 'c', [{ id: 'a', label: 'Remover as unidades' }, { id: 'b', label: 'Supor que o modelo é exato' }, { id: 'c', label: 'Definir variáveis, unidades, intervalo e hipóteses' }], 'A interpretação depende do que a taxa mede e das condições sob as quais o modelo é válido.'),
]

export const applicationExerciseById = Object.fromEntries(applicationExercises.map((item) => [item.id, item]))
