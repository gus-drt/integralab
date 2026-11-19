# Guia de conteúdo do IntegraLab

## Princípios

1. Começar com uma questão de entrada realmente simples.
2. Aumentar dificuldade por estratégia, interpretação ou encadeamento, não por números desagradáveis.
3. Manter solução, dicas e resposta separadas do enunciado.
4. Verificar primitivas por derivação e integrais definidas por cálculo independente.
5. Informar unidades, domínio e hipóteses sempre que forem relevantes.
6. Apresentar cada termo e símbolo novo antes de usá-lo em uma pergunta: explicar em linguagem simples e mostrar um caso numérico. Não presumir que “ponto médio”, “diferencial”, “singularidade” ou “seção transversal” sejam conhecidos.
7. Nos exemplos resolvidos, mostrar a escolha da regra e as operações intermediárias. Separar identificação dos dados, substituição, cálculo e interpretação. Evitar instruções como “ajuste o fator”, “decomponha” ou “avalie” sem executar a operação.
8. Em integrais definidas, mostrar a primitiva, seu valor em cada limite e a subtração com sinais e parênteses. Em substituições, mostrar a derivada, a troca do diferencial, eventuais fatores e a volta à variável original ou a troca dos limites.
9. O exemplo guiado deve praticar um procedimento já explicado; as soluções e dicas dos exercícios devem recuperar esse procedimento, inclusive quando acessadas fora da lição.
10. Enxugar repetições, não os passos necessários para aprender. Não introduzir resultados exatos ou atalhos sem explicação apenas para comparar com um exemplo introdutório.

## Adicionar exercício

Inclua o objeto no arquivo de dados do módulo e referencie seu ID em uma lição. Campos obrigatórios:

- `id`, `moduleId`, `topic` e `prerequisites`;
- `difficulty` de 0 a 5;
- `format`;
- `prompt` e `expectedAnswer`;
- `solution`, `hints` e `commonErrors`;
- `suggestedMinutes`, `tags` e `explanation`.

Respostas numéricas podem declarar `tolerance`. Expressões podem usar `equivalenceMode: "up-to-constant"` para primitivas. O parser aceita apenas o subconjunto documentado no README.

Depois de alterar conteúdo, execute:

```bash
pnpm lint
pnpm test
pnpm build
```

## Checklist matemático

- [ ] Enunciado sem ambiguidade.
- [ ] Resposta recalculada manualmente.
- [ ] Sinais, limites e constantes conferidos.
- [ ] Unidade coerente.
- [ ] Dicas não revelam a solução imediatamente.
- [ ] Distratores correspondem a erros plausíveis.
- [ ] Formas equivalentes relevantes foram testadas.
- [ ] Conteúdo é original e não reproduz exercício protegido.

## Checklist pedagógico

- [ ] Cada termo novo foi definido antes de ser cobrado.
- [ ] Cada símbolo da fórmula teve seu significado apresentado.
- [ ] A escolha do método foi justificada com os dados do exemplo.
- [ ] As contas mostram de onde vêm fatores, sinais, limites e coeficientes.
- [ ] O exemplo chega ao resultado sem depender de uma operação não demonstrada.
- [ ] O passo guiado tem enunciado completo e exige algo já ensinado.
- [ ] As dicas tratam do método pedido, não de uma orientação genérica inadequada.
- [ ] Conceitos parecidos foram distinguidos quando necessário: ponto médio e valor médio; posição e altura; área líquida e geométrica; raio e diâmetro; superfície e volume.

## Revisão de progressão — novembro de 2026

Escopo: 23 lições, de `def-02-riemann` até o final de Aplicações, e 25 resoluções de exercícios associadas. Trilha Zero, Primitivas e a primeira lição de Integral definida foram preservadas. IDs e vínculos de progresso foram mantidos.

| Trecho | Lacuna identificada | Tratamento |
| --- | --- | --- |
| Somas de Riemann | Ponto médio cobrado sem definição; posições confundidas com alturas | Definição e cálculo por faixa, leitura de Δx e Σ, sequência posição → altura → área → soma e prática guiada |
| Propriedades e TFC | Simetria, função ímpar, notação de avaliação e cadeia presumidas | Definições com exemplos; valores em cada limite; substituição no integrando e derivada do limite |
| Valor médio | Integral e divisão comprimidas; possível confusão com ponto médio | Cálculo completo e comparação entre posição e altura média |
| Substituição e partes | Diferenciais, fatores e sinais surgiam prontos | Transformação de todos os blocos; origem do fator 1/2; montagem de u, du, dv e v |
| Trigonometria e frações parciais | Identidades, domínio e coeficientes omitidos | Definição das funções e inversa; transformação do radical; escolha do sinal; equações para A e B |
| Impróprias | Limites laterais, singularidades e direção da comparação presumidos | Vocabulário, avaliação antes do limite, separação dos lados e justificativa das desigualdades |
| Aplicações | Raios, alturas e seções surgiam diretamente nas fórmulas | Construção geométrica das medidas, integrais avaliadas até o fim e interpretação das unidades |

A revisão também corrigiu o enunciado guiado que confundia derivar x uma vez com fazê-lo desaparecer: a primeira derivada é a constante 1.
