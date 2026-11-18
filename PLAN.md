# Plano de implementação do IntegraLab

Atualizado em: 10/11/2026.

## Escopo confirmado

- Referência: James Stewart, *Cálculo*, volume 1, 5ª edição.
- Disciplina: IME0350 — Cálculo 1A, UFG, semestre 2026.2.
- Núcleo de integração confirmado pela ementa: primitivas, integrais definida e indefinida, Teorema Fundamental, mudança de variável, partes, substituições trigonométricas, funções racionais por frações parciais, integrais impróprias, áreas, volumes, comprimento de arco, superfícies de revolução e valor médio.
- A Trilha Zero permanece como preparação pedagógica obrigatória antes do núcleo formal.

## Etapas

### 0. Fundação do projeto — concluída

- [x] Registrar escopo, decisões e riscos.
- [x] Criar aplicação React + TypeScript + Vite.
- [x] Configurar lint, testes e build.
- [x] Definir modelos de módulos e exercícios.

### 1. Shell funcional e acessível — concluída

- [x] Criar navegação principal responsiva.
- [x] Adicionar painel inicial e mapa do percurso.
- [x] Persistir progresso e preferências localmente.
- [x] Adicionar modo foco, redução de movimento e duração de sessão.
- [x] Exportar e importar progresso em JSON.
- [x] Incluir estados honestos para áreas ainda não implementadas.

### 2. Trilha Zero — concluída

- [x] Criar seis lições completas e originais.
- [x] Implementar exemplo resolvido e parcialmente resolvido.
- [x] Criar exercícios de nível 0 e 1 com revisão matemática.
- [x] Implementar dicas graduais, feedback e solução oculta.
- [x] Adicionar visualização acessível de acumulação e retângulos.

### 3. Motor de exercícios — concluída para o MVP

- [x] Validar dados estruturados e metadados da Trilha Zero.
- [x] Suportar múltipla escolha e respostas numéricas.
- [x] Suportar expressões matemáticas delimitadas.
- [x] Implementar equivalências seguras no subconjunto documentado.
- [x] Comunicar explicitamente entradas fora do subconjunto.
- [x] Registrar tentativas e erros recorrentes.
- [x] Criar prática por tópico e filtro de erros atuais.

### 4. Núcleo formal da ementa

- [x] Primitivas e integrais indefinidas: famílias, constantes, potência, linearidade e verificação.
- [x] Integral definida, somas de Riemann, propriedades e Teorema Fundamental.
- [x] Técnicas confirmadas na ementa: substituição, partes, trigonométricas, substituição trigonométrica e frações parciais.
- [x] Integrais impróprias: intervalos infinitos, integrandos ilimitados e testes básicos.
- [x] Aplicações confirmadas na ementa: áreas, volumes, arco, superfícies, valor médio e modelos com unidades.

### 5. Laboratórios visuais

- [x] Somas de Riemann interativas para f(x)=x², com métodos esquerda, direita e ponto médio.
- [x] Área líquida com limites ajustáveis.
- [x] Área entre curvas e comparação de volumes por discos e cascas.
- [x] Alternativas textuais equivalentes para os laboratórios atuais.
- [ ] Tabelas detalhadas e visualizações tridimensionais de volumes.

### 6. Revisão

- [x] Tópicos frágeis e erros recorrentes.
- [x] Revisão espaçada simples com intervalos progressivos.
- [x] Fila intercalada entre tópicos.
- [x] Desafios opcionais de transferência, sem bloquear o percurso básico.

### 7. Simulado

- [x] Banco tradicional de questões.
- [x] Temporizador persistente, navegação e entrega confirmada.
- [x] Modos prova e treino.
- [x] Pontuação determinística e relatório por tópico.
- [x] Gabarito comentado somente após a entrega.

### 8. Estabilização e entrega

- [x] Auditoria automática de acessibilidade e validação em celular e desktop.
- [x] Testes end-to-end dos fluxos críticos e auditoria estrutural do catálogo matemático.
- [x] Testes unitários de cálculos, conteúdo, progresso, revisão e simulado.
- [x] Documentação de deploy e inclusão de conteúdo.
- [ ] Validação externa com leitor de tela e revisão pedagógica independente por docente ou monitor.

## Regra de conclusão

Uma etapa só é marcada como concluída depois de passar por build e testes relevantes. Funcionalidades ainda ausentes devem ser identificadas como tal na interface.
