export type ExamQuestion = {
  id: string
  topic: string
  difficulty: 1 | 2 | 3 | 4 | 5
  format: 'numeric' | 'multiple-choice'
  prompt: string
  choices?: { id: string; label: string }[]
  expectedAnswer: number | string
  tolerance?: number
  solution: string[]
}

export const examQuestions: ExamQuestion[] = [
  { id: 'sim-01', topic: 'primitivas', difficulty: 1, format: 'multiple-choice', prompt: 'Uma primitiva de 4x³ é:', choices: [{ id: 'a', label: 'x⁴+C' }, { id: 'b', label: '12x²+C' }, { id: 'c', label: '4x⁴+C' }], expectedAnswer: 'a', solution: ['Aumente o expoente para 4 e divida o coeficiente 4 por 4.', 'Resultado: x⁴+C.'] },
  { id: 'sim-02', topic: 'primitivas', difficulty: 2, format: 'numeric', prompt: 'Se F′(x)=6x e F(0)=2, calcule F(2).', expectedAnswer: 14, solution: ['F(x)=3x²+C.', 'F(0)=2 implica C=2.', 'F(2)=12+2=14.'] },
  { id: 'sim-03', topic: 'integral definida', difficulty: 1, format: 'numeric', prompt: 'Calcule ∫₀² 3 dx.', expectedAnswer: 6, solution: ['A integral é a área de um retângulo: 3·2=6.'] },
  { id: 'sim-04', topic: 'integral definida', difficulty: 2, format: 'numeric', prompt: 'Calcule ∫₋₁¹ x² dx.', expectedAnswer: 2 / 3, tolerance: 1e-6, solution: ['Uma primitiva é x³/3.', '[x³/3]₋₁¹=1/3−(−1/3)=2/3.'] },
  { id: 'sim-05', topic: 'Riemann', difficulty: 2, format: 'numeric', prompt: 'Para f(x)=x em [0,2], n=2, calcule a soma à direita.', expectedAnswer: 3, solution: ['Δx=1 e os pontos à direita são 1 e 2.', 'Soma=(1+2)·1=3.'] },
  { id: 'sim-06', topic: 'TFC', difficulty: 2, format: 'multiple-choice', prompt: 'Se G(x)=∫₁ˣ(t²+1)dt, então G′(x)=', choices: [{ id: 'a', label: 'x²+1' }, { id: 'b', label: '2x' }, { id: 'c', label: 'x³/3+x' }], expectedAnswer: 'a', solution: ['Pela Parte 1 do TFC, a derivada recupera o integrando no limite superior.'] },
  { id: 'sim-07', topic: 'TFC', difficulty: 3, format: 'numeric', prompt: 'Calcule ∫₁³(2x−1)dx.', expectedAnswer: 6, solution: ['Primitiva: x²−x.', 'Em 3:6; em 1:0; resultado 6.'] },
  { id: 'sim-08', topic: 'substituição', difficulty: 2, format: 'multiple-choice', prompt: 'Na integral ∫2x cos(x²)dx, a substituição adequada é:', choices: [{ id: 'a', label: 'u=2x' }, { id: 'b', label: 'u=x²' }, { id: 'c', label: 'u=cos(x)' }], expectedAnswer: 'b', solution: ['A derivada de x² é 2x, que aparece como fator.'] },
  { id: 'sim-09', topic: 'substituição', difficulty: 3, format: 'numeric', prompt: 'Calcule ∫₀¹2x(x²+1)dx.', expectedAnswer: 1.5, solution: ['u=x²+1, limites 1 e 2.', '∫₁²u du=3/2.'] },
  { id: 'sim-10', topic: 'por partes', difficulty: 2, format: 'multiple-choice', prompt: 'Na fórmula ∫u dv=uv−∫v du, para ∫x exp(x)dx uma escolha conveniente é:', choices: [{ id: 'a', label: 'u=x e dv=exp(x)dx' }, { id: 'b', label: 'u=exp(x) e dv=x dx' }, { id: 'c', label: 'u=1 e dv=x exp(x)dx' }], expectedAnswer: 'a', solution: ['Derivar x simplifica o polinômio e exp(x) é fácil de integrar.'] },
  { id: 'sim-11', topic: 'trigonométricas', difficulty: 2, format: 'multiple-choice', prompt: 'Uma primitiva de cos(x) é:', choices: [{ id: 'a', label: '−sin(x)+C' }, { id: 'b', label: 'sin(x)+C' }, { id: 'c', label: 'tan(x)+C' }], expectedAnswer: 'b', solution: ['d/dx sin(x)=cos(x).'] },
  { id: 'sim-12', topic: 'frações parciais', difficulty: 3, format: 'multiple-choice', prompt: 'A decomposição de 1/[x(x+1)] é:', choices: [{ id: 'a', label: '1/x−1/(x+1)' }, { id: 'b', label: '1/x+1/(x+1)' }, { id: 'c', label: 'x/(x+1)' }], expectedAnswer: 'a', solution: ['[(x+1)−x]/[x(x+1)]=1/[x(x+1)].'] },
  { id: 'sim-13', topic: 'impróprias', difficulty: 2, format: 'multiple-choice', prompt: 'A integral ∫₁^∞1/x dx:', choices: [{ id: 'a', label: 'converge para 1' }, { id: 'b', label: 'diverge' }, { id: 'c', label: 'converge para 0' }], expectedAnswer: 'b', solution: ['lim b→∞ln(b)=∞, portanto diverge.'] },
  { id: 'sim-14', topic: 'impróprias', difficulty: 3, format: 'numeric', prompt: 'Calcule ∫₀¹1/√x dx.', expectedAnswer: 2, solution: ['Use lim a→0⁺[2√x]ₐ¹.', 'O limite é 2.'] },
  { id: 'sim-15', topic: 'área entre curvas', difficulty: 2, format: 'numeric', prompt: 'Calcule a área entre y=x e y=x² em [0,1].', expectedAnswer: 1 / 6, tolerance: 1e-6, solution: ['Em [0,1], x é a curva superior.', '∫₀¹(x−x²)dx=1/6.'] },
  { id: 'sim-16', topic: 'volumes', difficulty: 2, format: 'numeric', prompt: 'Gire y=x, 0≤x≤2, em torno do eixo x. Informe o coeficiente de π no volume.', expectedAnswer: 8 / 3, tolerance: 1e-6, solution: ['V=π∫₀²x²dx=8π/3.', 'O coeficiente de π é 8/3.'] },
  { id: 'sim-17', topic: 'cascas', difficulty: 3, format: 'multiple-choice', prompt: 'Ao girar em torno do eixo y usando cascas verticais, o raio de uma casca em x é:', choices: [{ id: 'a', label: 'x' }, { id: 'b', label: 'y' }, { id: 'c', label: 'x²' }], expectedAnswer: 'a', solution: ['O raio é a distância horizontal de x ao eixo y.'] },
  { id: 'sim-18', topic: 'comprimento de arco', difficulty: 2, format: 'numeric', prompt: 'Calcule o comprimento de y=0 em [−2,3].', expectedAnswer: 5, solution: ['f′=0 e o integrando do arco é 1.', 'O comprimento é 3−(−2)=5.'] },
  { id: 'sim-19', topic: 'valor médio', difficulty: 2, format: 'numeric', prompt: 'Calcule o valor médio de f(x)=x em [0,6].', expectedAnswer: 3, solution: ['Integral=18 e largura=6.', 'Valor médio=18/6=3.'] },
  { id: 'sim-20', topic: 'propriedades', difficulty: 2, format: 'numeric', prompt: 'Sabendo que ∫₁⁴f(x)dx=7, calcule ∫₄¹f(x)dx.', expectedAnswer: -7, solution: ['Inverter os limites troca o sinal.'] },
  { id: 'sim-21', topic: 'área líquida', difficulty: 2, format: 'numeric', prompt: 'Uma função acumula área +8 acima e −3 abaixo do eixo. Qual é sua integral?', expectedAnswer: 5, solution: ['A integral líquida é 8−3=5.'] },
  { id: 'sim-22', topic: 'seções transversais', difficulty: 3, format: 'numeric', prompt: 'Seções quadradas têm lado x em 0≤x≤3. Calcule o volume.', expectedAnswer: 9, solution: ['A(x)=x².', 'V=∫₀³x²dx=9.'] },
  { id: 'sim-23', topic: 'superfície', difficulty: 3, format: 'numeric', prompt: 'Gire y=1, 0≤x≤2, em torno do eixo x. Informe o coeficiente de π na área lateral.', expectedAnswer: 4, solution: ['S=2π∫₀²1dx=4π.', 'O coeficiente é 4.'] },
  { id: 'sim-24', topic: 'convergência', difficulty: 2, format: 'multiple-choice', prompt: 'A p-integral ∫₁^∞1/xᵖ converge quando:', choices: [{ id: 'a', label: 'p>1' }, { id: 'b', label: 'p<1' }, { id: 'c', label: 'p=1' }], expectedAnswer: 'a', solution: ['No infinito, a condição é p>1.'] },
]
