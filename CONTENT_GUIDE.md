# Guia de conteúdo do IntegraLab

## Princípios

1. Começar com uma questão de entrada realmente simples.
2. Aumentar dificuldade por estratégia, interpretação ou encadeamento, não por números desagradáveis.
3. Manter solução, dicas e resposta separadas do enunciado.
4. Verificar primitivas por derivação e integrais definidas por cálculo independente.
5. Informar unidades, domínio e hipóteses sempre que forem relevantes.

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
