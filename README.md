# IntegraLab

Plataforma web interativa para aprender Cálculo Integral desde a intuição inicial até exercícios universitários de Cálculo 1A.

## Requisitos

- Node.js 22 ou superior
- npm 10 ou superior (ou pnpm equivalente)

## Executar

```bash
npm install
npm run dev
```

O terminal mostrará o endereço local da aplicação.

## Qualidade

```bash
npm run lint
npm test
npm run build
```

## Deploy estático

1. Execute `pnpm build`.
2. Publique a pasta `dist` em um serviço de hospedagem estática.
3. Configure fallback de todas as rotas para `index.html`, pois a aplicação usa roteamento no navegador.

Exemplos de regra de fallback:

- Netlify: `/* /index.html 200`.
- Vercel: rewrite de `/(.*)` para `/index.html`.
- Servidor próprio: devolver `index.html` para caminhos que não correspondam a arquivos.

Nenhuma chave, API paga, backend ou banco remoto é necessário.

## Estrutura

- `src/data`: currículo e conteúdo estruturado.
- `src/types`: contratos de módulos, lições e exercícios.
- `src/state`: persistência e estado do estudante.
- `src/components`: componentes reutilizáveis.
- `src/pages`: áreas principais da aplicação.
- `PLAN.md`: etapas e estado da implementação.
- `DECISIONS.md`: decisões técnicas e pedagógicas.
- `CONTENT_GUIDE.md`: inclusão e revisão de exercícios.

## Estado atual

O núcleo curricular confirmado está implementado: 35 lições e 136 exercícios ativos, da Trilha Zero às aplicações e desafios opcionais. A página Revisão prioriza erros, tópicos frágeis e questões vencidas em intervalos progressivos. O Simulado seleciona dez questões de um banco tradicional exclusivo, mantém relógio e respostas localmente, calcula desempenho por tópico e só revela o gabarito após a entrega. Há laboratórios interativos de Riemann, área líquida, área entre curvas e comparação de volumes.

### Escopo das respostas simbólicas

O avaliador aceita números, `x`, `C`, `+`, `-`, `*`, `/`, potências constantes, parênteses e as funções `sin`, `cos`, `tan`, `sec`, `ln` e `exp`. Multiplicação simples pode ser implícita, como em `2x`; antes de funções, use `*`, como em `2*sin(x)`. Ele não executa código e não pretende substituir um sistema de álgebra computacional completo.

## Referências e escopo

- James Stewart, *Cálculo*, volume 1, 5ª edição, como referência conceitual.
- Plano de ensino IME0350 — Cálculo 1A, UFG, 2026.2, para o recorte curricular.

O conteúdo e os exercícios da aplicação serão originais; o projeto não reproduzirá extensos trechos, imagens ou exercícios protegidos dos livros.
