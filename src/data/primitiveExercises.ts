import type { Exercise } from '../types/content'

function expression(id: string, topic: string, prompt: string, expected: string, solution: string[], difficulty: 1 | 2 = 1): Exercise {
  return { id, moduleId: 'primitivas', topic, prerequisites: ['trilha-zero'], difficulty, format: 'expression', prompt, expectedAnswer: expected, equivalenceMode: 'up-to-constant', solution, hints: ['Procure uma função cuja derivada seja o integrando.', 'Derive sua resposta para conferir.'], commonErrors: ['Esquecer a constante de integração.', 'Aplicar a regra da derivada sem invertê-la.'], suggestedMinutes: difficulty + 1, tags: ['primitivas', topic], explanation: 'A derivada da resposta coincide com o integrando.' }
}

function choice(id: string, topic: string, prompt: string, expected: string, choices: { id: string; label: string }[], explanation: string): Exercise {
  return { id, moduleId: 'primitivas', topic, prerequisites: ['trilha-zero'], difficulty: 1, format: 'multiple-choice', prompt, expectedAnswer: expected, choices, solution: [explanation], hints: ['Derive as alternativas.', 'Constantes desaparecem ao derivar.'], commonErrors: ['Escolher apenas pela aparência.'], suggestedMinutes: 2, tags: ['primitivas', topic], explanation }
}

export const primitiveExercises: Exercise[] = [
  choice('prim-01-familia', 'famílias', 'Qual conjunto representa todas as primitivas de f(x) = 2x?', 'b', [{ id: 'a', label: 'x²' }, { id: 'b', label: 'x² + C' }, { id: 'c', label: '2x² + C' }], 'A derivada de x² + C é 2x para qualquer constante C.'),
  choice('prim-01-diferenca', 'famílias', 'Se F e G têm a mesma derivada em um intervalo, como elas podem diferir?', 'c', [{ id: 'a', label: 'Por um fator x' }, { id: 'b', label: 'Por uma potência' }, { id: 'c', label: 'Por uma constante' }], 'A derivada de F − G é zero; portanto, F − G é constante no intervalo.'),
  expression('prim-01-direta', 'famílias', 'Escreva uma primitiva de 6x.', '3*x^2+C', ['A derivada de x² é 2x.', 'Multiplicando por 3: d/dx(3x²) = 6x.', 'Resposta: 3x² + C.']),
  expression('prim-01-variacao', 'famílias', 'Escreva uma primitiva de −4x.', '-2*x^2+C', ['d/dx(−2x²) = −4x.', 'Resposta: −2x² + C.']),

  expression('prim-02-cinco', 'constantes', 'Calcule ∫ 5 dx.', '5*x+C', ['A derivada de 5x é 5.', 'Resposta: 5x + C.']),
  expression('prim-02-negativa', 'constantes', 'Calcule ∫ −3 dx.', '-3*x+C', ['A derivada de −3x é −3.', 'Resposta: −3x + C.']),
  expression('prim-02-fracao', 'constantes', 'Calcule ∫ (1/2) dx.', 'x/2+C', ['A derivada de x/2 é 1/2.', 'Resposta: x/2 + C.']),
  choice('prim-02-verificar', 'constantes', 'Qual é a derivada de 7x − 12?', 'a', [{ id: 'a', label: '7' }, { id: 'b', label: '7x' }, { id: 'c', label: '−12' }], 'A derivada de 7x é 7 e a derivada de −12 é zero.'),

  expression('prim-03-x2', 'potência', 'Calcule ∫ x² dx.', 'x^3/3+C', ['Aumente o expoente: 2 + 1 = 3.', 'Divida pelo novo expoente: x³/3.', 'Resposta: x³/3 + C.']),
  expression('prim-03-x4', 'potência', 'Calcule ∫ x⁴ dx.', 'x^5/5+C', ['Novo expoente: 5.', 'Resposta: x⁵/5 + C.']),
  expression('prim-03-raiz', 'potência', 'Escreva √x como x^(1/2) e calcule sua primitiva.', '2*x^(3/2)/3+C', ['1/2 + 1 = 3/2.', 'Divida por 3/2, isto é, multiplique por 2/3.', 'Resposta: (2/3)x^(3/2) + C.'], 2),
  expression('prim-03-inversa-quadrado', 'potência', 'Calcule ∫ x^(−2) dx.', '-x^(-1)+C', ['−2 + 1 = −1.', 'x^(−1)/(−1) = −x^(−1).', 'Resposta: −1/x + C.'], 2),

  expression('prim-04-soma', 'linearidade', 'Calcule ∫ (x² + 4) dx.', 'x^3/3+4*x+C', ['Integre termo a termo.', '∫x² dx = x³/3 e ∫4 dx = 4x.', 'Resposta: x³/3 + 4x + C.']),
  expression('prim-04-coeficiente', 'linearidade', 'Calcule ∫ 3x² dx.', 'x^3+C', ['O fator 3 permanece: 3·x³/3.', 'Simplifique para x³ + C.']),
  expression('prim-04-polinomio', 'linearidade', 'Calcule ∫ (2x³ − 3x + 5) dx.', 'x^4/2-3*x^2/2+5*x+C', ['Integre cada termo.', '2x³ → x⁴/2; −3x → −3x²/2; 5 → 5x.', 'Some e inclua C.'], 2),
  expression('prim-04-reorganizar', 'linearidade', 'Calcule ∫ (1 + x + x²) dx.', 'x+x^2/2+x^3/3+C', ['A ordem dos termos não altera a soma.', 'Primitivas: x, x²/2 e x³/3.', 'Resposta: x + x²/2 + x³/3 + C.'], 2),

  choice('prim-05-checagem', 'verificação', 'Para verificar uma integral indefinida, o que deve ser feito?', 'b', [{ id: 'a', label: 'Integrar a resposta novamente' }, { id: 'b', label: 'Derivar a resposta' }, { id: 'c', label: 'Substituir x = 0 apenas' }], 'Ao derivar uma primitiva correta, recuperamos o integrando.'),
  choice('prim-05-erro', 'verificação', 'Uma pessoa escreveu ∫x³ dx = 3x² + C. Qual foi o erro?', 'a', [{ id: 'a', label: 'Usou a regra de derivação, não a de integração' }, { id: 'b', label: 'Deveria retirar o C' }, { id: 'c', label: 'O resultado está correto' }], 'A primitiva correta é x⁴/4 + C; 3x² é a derivada de x³.'),
  expression('prim-05-corrigir', 'verificação', 'Corrija a resposta incorreta ∫ 4x³ dx = 12x² + C.', 'x^4+C', ['Aumente o expoente para 4.', 'Divida 4 pelo novo expoente 4.', 'Resposta: x⁴ + C.']),
  expression('prim-05-mista', 'verificação', 'Calcule e depois verifique: ∫ (6x² − 2) dx.', '2*x^3-2*x+C', ['6x² → 2x³; −2 → −2x.', 'd/dx(2x³ − 2x + C) = 6x² − 2.', 'Resposta: 2x³ − 2x + C.'], 2),
]

export const primitiveExerciseById = Object.fromEntries(primitiveExercises.map((item) => [item.id, item]))
