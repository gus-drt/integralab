import type { Exercise } from '../types/content'

const challenge = (id: string, topic: string, prompt: string, answer: number, solution: string[], difficulty: 4 | 5 = 4): Exercise => ({ id, moduleId: 'desafios', topic, prerequisites: ['integral-definida', 'tecnicas'], difficulty, format: 'numeric', prompt, expectedAnswer: answer, tolerance: 1e-6, solution, hints: ['Separe o problema em decisões: representação, técnica e interpretação.', 'Faça um esboço ou derive uma expressão intermediária antes de calcular.'], commonErrors: ['Começar a calcular antes de escolher uma representação.', 'Não verificar sinais, domínio ou unidades.'], suggestedMinutes: difficulty + 4, tags: ['desafio opcional', topic], explanation: solution.at(-1) ?? '' })

export const challengeExercises: Exercise[] = [
  challenge('des-01', 'transferência', 'Uma taxa r(t)=t(4−t) atua de t=0 a t=4. Qual é a acumulação total?', 32 / 3, ['Integre 4t−t² em [0,4].', '[2t²−t³/3]₀⁴=32−64/3=32/3.']),
  challenge('des-02', 'área com interseção', 'Calcule a área entre y=x² e y=2x.', 4 / 3, ['Interseções: x=0 e x=2.', 'Em [0,2], 2x≥x².', '∫₀²(2x−x²)dx=4/3.']),
  challenge('des-03', 'volume comparativo', 'A região sob y=x em [0,1] gira em torno do eixo x. Informe o coeficiente de π no volume.', 1 / 3, ['Use discos: V=π∫₀¹x²dx.', 'Coeficiente=1/3.']),
  challenge('des-04', 'valor médio', 'Encontre c em [0,2] tal que f(c) seja o valor médio de f(x)=x². Informe c.', Math.sqrt(4 / 3), ['Valor médio=(1/2)∫₀²x²dx=4/3.', 'Resolva c²=4/3 com c≥0.', 'c=√(4/3).'], 5),
  challenge('des-05', 'imprópria aplicada', 'Uma densidade simplificada é f(x)=2/x³ para x≥1. Calcule ∫₁∞f(x)dx.', 1, ['Use limite b→∞.', 'Primitiva de 2x⁻³ é −x⁻².', 'O valor é 1.']),
  challenge('des-06', 'técnicas combinadas', 'Calcule ∫₀¹x exp(x²)dx.', (Math.E - 1) / 2, ['u=x², du=2x dx.', 'Integral=(1/2)∫₀¹exp(u)du.', 'Resultado=(e−1)/2.'], 5),
  challenge('des-07', 'movimento', 'v(t)=t−2 m/s em [0,4]. Qual é a distância total percorrida?', 4, ['A velocidade muda de sinal em t=2.', 'Distância=∫₀²(2−t)dt+∫₂⁴(t−2)dt.', 'Cada parte vale 2; total 4 m.'], 5),
  challenge('des-08', 'comparação de métodos', 'Para f(x)=x² em [0,2] com n=2, qual é a diferença soma direita − soma esquerda?', 4, ['Soma esquerda=1.', 'Soma direita=5.', 'Diferença=4.']),
]
