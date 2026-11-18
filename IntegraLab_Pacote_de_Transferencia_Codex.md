# INTEGRALAB
## Pacote de transferência de contexto para o Codex
**Objetivo:** transformar o Integralab em um ambiente de aprendizagem de Cálculo Integral, completo, visual, confiável e pronto para uso.

> Este documento é a fonte principal de contexto do projeto. O Codex deve lê-lo integralmente antes de alterar o código. Não deve presumir que o protótipo anterior está completo nem descartar trabalho existente sem inspeção.

---

## 1. Visão do produto

O **Integralab** é uma aplicação web educacional para apoiar o estudo de Cálculo Integral (Cálculo 1A), com foco em construir a compreensão desde o primeiro contato com integrais, prática progressiva e preparação para avaliações universitárias. **O ponto de partida é zero conhecimento de Cálculo Integral:** não presumir que o estudante já saiba o que é uma integral, reconheça sua notação ou domine técnicas de integração.

O estudante cursa Bacharelado em Inteligência Artificial na UFG, em Goiás, Brasil. Tem dificuldade com a disciplina e precisa de uma ferramenta que transforme estudo passivo em prática guiada. Aprende especialmente bem com recursos visuais. O objetivo é melhorar a aprendizagem e a preparação para a prova — não existe promessa de aprovação ou nota garantida.

### Princípios
1. **Matemática correta antes de efeitos visuais.**
2. **Aprendizagem ativa:** o aluno tenta resolver antes de ver a solução.
3. **Progressão real:** pré-requisitos e dificuldade aumentam gradualmente.
4. **Visualização com propósito:** gráficos e animações devem explicar o conceito, não apenas decorar a interface.
5. **Feedback pedagógico:** explicar por que uma resposta está certa ou errada.
6. **Simulado fiel:** questões convencionais de matemática, sem contextualização narrativa ou IA artificialmente inserida.
7. **Baixa fricção:** interface clara, responsiva, rápida e utilizável em celular e computador.
8. **Transparência:** indicar o que foi estudado, o que falta e quais recursos ainda não estão implementados.

---

## 2. Contexto e decisões já tomadas

- Nome do produto: **Integralab** (pode ser estilizado como “∫ Integralab”).
- Referência didática principal: **James Stewart, Cálculo, Volume 1**.
- Disciplina: Cálculo 1A / Cálculo Integral.
- Público: estudante universitário iniciante/intermediário em cálculo.
- O estudante programa em nível iniciante e pretende usar IA para desenvolver.
- Preferência de aprendizagem já identificada: explicações visuais, exemplos passo a passo e exercícios.
- O estudante relata TDAH e suspeita de altas habilidades/superdotação (AH/SD); isso deve orientar opções de experiência, nunca servir como diagnóstico, estereótipo ou justificativa para presumir capacidades/dificuldades específicas.
- O estudante conhece algumas estratégias de aprendizagem que funcionam para si, mas está aberto a experimentar métodos adicionais. O produto deve permitir testar abordagens diferentes e observar quais ajudam de fato.
- O projeto deve funcionar como uma aplicação real, não apenas como uma demonstração visual.
- O estudante já criou anteriormente um aplicativo interativo para derivadas, com exercícios por tópico, respostas abertas e de múltipla escolha, gabarito separado, material de estudo e simulado cronometrado. O Integralab deve aproveitar essa boa estrutura, mas evitar repetir a armadilha de construir uma ferramenta bonita sem treinar suficientemente a resolução manual de problemas.


### Ponto de partida pedagógico: iniciante absoluto em integrais

O percurso deve começar antes da primeira técnica formal. Não confundir já ter tido contato com derivadas com saber integrar. O estudante pode precisar reconstruir conceitos básicos e isso deve ser tratado como parte normal do percurso, sem tom infantilizado.

**Criar uma “Trilha Zero — Primeiros passos em integrais”**, que introduza:
- O que uma integral tenta responder: acumulação, quantidade total e área líquida.
- Como interpretar uma taxa constante ao longo de um intervalo.
- Área de retângulos e soma de pequenas contribuições.
- Intuição de aproximar uma região com retângulos cada vez menores.
- Diferença intuitiva entre integral definida e indefinida.
- O significado da constante de integração, introduzida no momento certo.
- A relação com derivadas somente quando necessária, com uma revisão curta e opcional de derivação.

**Exercícios muito simples são obrigatórios**, e não devem ser tratados como conteúdo descartável. Exemplos de tipos de atividade para a Trilha Zero:
- Uma taxa constante de 2 unidades por segundo durante 3 segundos: quantas unidades foram acumuladas?
- Um retângulo de base 4 e altura 2: qual sua área?
- Interpretar visualmente uma região sob uma função constante.
- Identificar, em linguagem comum, se o problema pede taxa instantânea ou quantidade acumulada.
- Primeiras primitivas diretas, como integrais de constantes, quando a intuição de acumulação já tiver sido apresentada.
- Primeiras regras algébricas com números e potências simples, antes de combinações longas.

Os exemplos acima são sugestões de desenho pedagógico; criar questões originais, com respostas e explicações verificadas. Começar com números amigáveis e enunciados curtos. Aumentar a abstração gradualmente.

### Métodos de aprendizagem: variedade com experimentação

Não assumir que uma única metodologia serve sempre. Oferecer, testar e permitir alternância entre:
- **Exemplo resolvido:** observar uma resolução completa e explicada.
- **Exemplo parcialmente resolvido:** completar os próximos passos.
- **Prática independente:** resolver sem ver a solução.
- **Recuperação ativa:** tentar lembrar uma regra ou conceito antes de consultar.
- **Revisão espaçada:** reencontrar conceitos e erros depois de intervalos.
- **Prática intercalada:** misturar tipos de questão quando o estudante já tiver base para distinguir estratégias.
- **Autoexplicação:** prompts curtos como “por que esta regra se aplica?” ou “o que representa o resultado?”.
- **Múltiplas representações:** conectar expressão, gráfico, tabela, linguagem verbal e unidades.
- **Aprendizagem por investigação:** pequenos desafios opcionais para explorar padrões e formular conjecturas.

Não aplicar tudo ao mesmo tempo nem transformar o estudo em uma sequência cansativa de etapas obrigatórias. Apresentar pequenas experiências e permitir que o estudante indique o que ajudou. Usar também evidências de desempenho — acerto, retenção em revisões e capacidade de resolver sem dica — em vez de depender apenas de preferência declarada.

### Design acolhedor e configurável para atenção e foco

Considerar que o estudante relata TDAH. Projetar apoios opcionais e ajustáveis, sem medicalizar a interface:
- Quebrar lições e tarefas em unidades pequenas, com um objetivo visível por vez.
- Mostrar sempre uma próxima ação concreta (“faça este passo agora”).
- Reduzir distrações: layout limpo, hierarquia visual clara e opção de modo foco.
- Permitir sessões curtas sugeridas (por exemplo, 10–20 minutos), mas deixar o estudante escolher duração e ritmo.
- Temporizador sempre opcional fora do simulado; não usar contagem regressiva como padrão de estudo.
- Permitir pausar, retomar e salvar automaticamente o progresso.
- Usar feedback imediato, específico e gentil, sem excesso de estímulos.
- Oferecer pausas sugeridas, sem bloquear o fluxo.
- Evitar punição por dias sem estudar, sequências/streaks coercitivas, mensagens de culpa ou alarmes visuais.
- Permitir reduzir animações, sons e elementos visuais, respeitando preferências sensoriais.
- Preferir instruções explícitas e externalização de passos, fórmulas e pré-requisitos.

### Desafio e profundidade opcionais

Considerar a suspeita de AH/SD como uma informação não confirmada, não como diagnóstico. Não presumir que o estudante será sempre rápido, que não precisa de fundamentos ou que deve receber apenas problemas difíceis.

Depois de demonstrar domínio dos fundamentos, oferecer:
- “Desafio extra” opcional com problemas não rotineiros.
- Explorações de por que uma técnica funciona, demonstrações intuitivas e conexões entre tópicos.
- Problemas de transferência para IA, física, computação e situações novas.
- Caminhos de aprofundamento sem obrigar o estudante a pular etapas fundamentais.

O sistema deve permitir avançar mais rápido quando houver domínio demonstrado, mas também voltar a explicações simples sem constrangimento. **Não confundir profundidade com pressa nem dificuldade com aprendizagem.**

### Informação ainda não confirmada
A edição exata do Stewart e a lista oficial de conteúdos cobrados pelo professor ainda não foram informadas. Portanto:
- Não inventar o programa da disciplina.
- Criar uma estrutura modular de conteúdos.
- Marcar conteúdos como “núcleo comum”, “dependente do programa” ou “avançado”.
- Facilitar ativar/desativar módulos.
- Ao iniciar o projeto, pedir ao estudante a edição/ISBN do livro e, se possível, ementa, lista de conteúdos ou fotos/arquivo do plano de ensino. Não bloquear o desenvolvimento da estrutura geral enquanto isso não chega.
- Não copiar longos trechos, figuras ou exercícios protegidos do Stewart. Usá-lo como referência conceitual; criar explicações e questões originais.

---

## 3. Experiência principal do usuário

A navegação deve ser simples e previsível. Estrutura sugerida:

1. **Início / Painel**
   - Visão geral do curso.
   - Progresso por unidade.
   - Próxima atividade recomendada.
   - Atalho para continuar de onde parou.
   - Resumo de desempenho (tentativas, acertos, tópicos frágeis).

2. **Aprender**
   - Unidades e lições em sequência.
   - Intuição visual, definição matemática, propriedades, exemplos resolvidos.
   - Alertas sobre erros comuns e pré-requisitos.
   - Pequenas verificações de compreensão.

3. **Praticar**
   - Exercícios organizados por tópico e dificuldade.
   - Alternância entre múltipla escolha e resposta aberta.
   - Dicas graduais: pista 1, pista 2, solução completa.
   - Feedback imediato e explicação da resolução.
   - Opção de refazer questões erradas.

4. **Simulado**
   - Prova tradicional, com enunciados matemáticos convencionais.
   - Temporizador funcional.
   - Questões embaralhadas de um conjunto controlado, sem repetir a mesma questão na sessão.
   - Respostas bloqueadas até o envio, salvo se o modo de treino permitir explicitamente.
   - Resultado por questão, tópico e nível de dificuldade.
   - Gabarito comentado somente depois da entrega.

5. **Revisão**
   - Lista de erros recorrentes.
   - Tópicos com menor desempenho.
   - Recomendação de exercícios de reforço.
   - Revisão espaçada simples, se possível.

Não colocar soluções imediatamente visíveis ao lado dos exercícios. O padrão deve incentivar tentativa independente, mas sem deixar o estudante travado: oferecer uma dica pequena, depois uma dica mais explícita e, por fim, a solução completa.

### Estrutura mínima de cada lição

1. Objetivo em linguagem simples: “ao terminar, você conseguirá…”.
2. Intuição inicial ou pergunta concreta.
3. Explicação visual e verbal.
4. Exemplo resolvido em passos curtos.
5. Exemplo parcialmente resolvido para completar.
6. Dois a cinco exercícios simples e diretos.
7. Um ou dois exercícios de transferência/combinação, quando os pré-requisitos estiverem dominados.
8. Resumo de bolso e erros comuns.
9. Verificação curta de retenção em outro momento.

Não avançar automaticamente só porque o estudante clicou em “próximo”. Sugerir revisão quando houver erros repetidos, mas permitir que ele escolha continuar.

---

## 4. Conteúdo matemático: mapa inicial

Organizar o currículo em módulos. A ordem final deve ser validada com a ementa do professor e a edição do Stewart.

### Módulo A — Primitivas e integrais indefinidas
- Antiderivadas e família de primitivas.
- Notação de integral indefinida.
- Regras básicas de integração.
- Integrais de potências, constantes e funções elementares pertinentes ao programa.
- Verificação por derivação.
- Constante de integração e interpretação.

### Módulo B — Soma de Riemann e integral definida
- Partições de intervalos.
- Soma à esquerda, à direita e ponto médio.
- Aproximação de áreas acumuladas.
- Limite das somas de Riemann.
- Integral definida e propriedades.
- Interpretação geométrica e como acumulação líquida.

### Módulo C — Teorema Fundamental do Cálculo
- Relação entre derivação e integração.
- Parte 1: função definida por integral e derivada.
- Parte 2: avaliação de integrais definidas por primitivas.
- Condições e interpretação.
- Erros comuns com limites e sinais.

### Módulo D — Técnicas de integração
- Substituição (mudança de variável).
- Integração por partes, se estiver no programa.
- Integrais trigonométricas, substituição trigonométrica e frações parciais, somente se cobradas.
- Estratégia para escolher uma técnica.
- Verificação do resultado por derivação.

### Módulo E — Aplicações da integral
- Área sob uma curva.
- Área entre curvas.
- Volumes por discos/arruelas e cascas cilíndricas, se cobrados.
- Comprimento de arco e área de superfície, se cobrados.
- Trabalho, deslocamento e outras aplicações físicas pertinentes.

### Módulo F — Tópicos adicionais
- Integrais impróprias, se estiverem no programa.
- Aplicações adicionais de acumulação.
- Outros tópicos identificados na ementa.

**Regra:** não apresentar como conteúdo obrigatório aquilo que não foi confirmado. Etiquetar os tópicos condicionais e permitir que sejam ocultados.

---

## 5. Storytelling e conexões com Inteligência Artificial

Nas lições e na prática, usar situações contextualizadas para tornar o cálculo significativo. As conexões devem ser matematicamente legítimas, com hipóteses explícitas e unidades consistentes.

Possíveis contextos:
- **Probabilidade e valor esperado:** integral de uma variável aleatória contínua com densidade de probabilidade.
- **Acumulação de erro:** integrar uma taxa de erro ao longo do tempo ou de iterações, deixando claro o que a taxa representa.
- **Funções de perda:** integrar uma função ou densidade de perda em um intervalo para estudar acumulação; não afirmar que todo treinamento de rede neural usa integração dessa forma.
- **Distribuições contínuas:** área sob uma densidade como probabilidade.
- **Sinais e séries temporais:** acumulação de uma taxa/sinal ao longo do tempo.
- **Robótica e movimento:** velocidade integrada para obter deslocamento, com condições iniciais.
- **Visão computacional:** acumulação espacial ou temporal em exemplos simplificados, sem exagerar a relação com o cálculo usado em sistemas reais.

Cada aplicação deve conter:
1. Cenário curto e compreensível.
2. Definição das variáveis e unidades.
3. Modelo matemático.
4. Resolução integral passo a passo.
5. Interpretação do resultado.
6. Limitações/suposições do modelo.

**Importante:** conexões com IA aparecem em Aprender e Praticar. O Simulado permanece tradicional, com problemas matemáticos no estilo de uma prova universitária.

---

## 6. Requisitos de visualização

Priorizar gráficos e interações que realmente ensinem:

- Gráfico de uma função com região integrada sombreada.
- Controles para alterar limites de integração.
- Retângulos de soma de Riemann, com escolha de quantidade de subintervalos e método (esquerda, direita, ponto médio).
- Comparação entre aproximação por retângulos e valor da integral.
- Visualização de área positiva e negativa.
- Visualização de área entre duas curvas.
- Visualização de volumes por discos/arruelas, quando aplicável.
- Animações curtas e controláveis, com opção de pausar/reiniciar.
- Equações legíveis em celular e desktop.

Não usar gráficos estáticos quando uma interação simples puder demonstrar o conceito. Porém, não sacrificar acessibilidade ou desempenho para adicionar animações desnecessárias. Fornecer uma explicação textual equivalente para cada visualização.

---

## 7. Requisitos dos exercícios

Cada exercício deve ter metadados:
- ID único.
- Módulo e subtópico.
- Pré-requisitos.
- Dificuldade (1 a 5).
- Formato (múltipla escolha, resposta numérica, expressão matemática ou resposta aberta).
- Enunciado.
- Resposta esperada e critérios de equivalência.
- Resolução detalhada.
- Uma ou mais dicas graduais.
- Erros comuns/distratores plausíveis.
- Tempo sugerido.
- Tags (Stewart/conceito, aplicação IA, prova tradicional etc.).

### Progressão
- **Nível 0 — Pré-requisito/intuição:** linguagem comum, áreas simples, taxas constantes, leitura de gráficos e operações básicas necessárias.
- Nível 1: reconhecimento e aplicação direta de uma regra.
- Nível 2: combinações simples e interpretação.
- Nível 3: escolha de estratégia e mais etapas.
- Nível 4: problemas contextualizados ou combinação de conceitos.
- Nível 5: problemas integradores de nível universitário.

Não aumentar a dificuldade apenas tornando os números mais feios. A dificuldade deve vir da escolha de método, interpretação, encadeamento de conceitos e rigor algébrico.

**Regra de cobertura:** cada tópico ativo deve ter exercícios de entrada realmente fáceis. Não basta ter questões de nível universitário avançado. Para cada regra ou conceito novo, criar pelo menos: 2 questões diretas e simples, 1 questão com pequena variação, 1 questão de interpretação ou representação e, depois, questões integradoras. Ajustar a quantidade conforme o tamanho do tópico.

### Respostas abertas
- Aceitar formas matematicamente equivalentes quando possível.
- Não depender exclusivamente de comparação literal de strings.
- Para o MVP, aceitar respostas numéricas e formas simbólicas com escopo claramente delimitado.
- Se não for possível validar uma expressão com segurança, explicar a limitação e oferecer autoavaliação guiada, em vez de marcar uma resposta correta como errada.
- Nunca executar código arbitrário enviado pelo usuário para avaliar respostas.

### Gabarito
- Solução passo a passo, com justificativa de cada transformação.
- Mostrar a resposta final claramente.
- Sempre que útil, incluir verificação por derivação ou interpretação geométrica.
- Separar o gabarito do enunciado e ocultá-lo até o aluno solicitar.

---

## 8. Simulado: requisitos específicos

- Interface visual semelhante a uma prova universitária.
- Questões matemáticas tradicionais, sem histórias de IA.
- Temporizador com iniciar, pausar (se permitido), finalizar e confirmação antes de encerrar.
- Navegação entre questões e indicador de questões respondidas.
- Respostas não reveladas antes da entrega.
- Pontuação calculada de forma determinística.
- Tela final com nota, tempo, desempenho por tópico e gabarito comentado.
- Permitir novo simulado com conjunto diferente.
- Criar banco suficiente para evitar que o mesmo pequeno conjunto apareça sempre.
- Incluir modo “prova” e modo “treino”, se isso não complicar a primeira versão.

Não afirmar que o simulado replica exatamente a prova do professor. Identificar claramente que é uma simulação para treino.

---

## 9. Requisitos técnicos e qualidade

### Primeiro passo obrigatório: auditoria do projeto
Antes de programar:
1. Inspecionar todos os arquivos e a estrutura atual do repositório.
2. Identificar framework, comandos, dependências, estado de implementação e funcionalidades existentes.
3. Executar a aplicação e os testes disponíveis.
4. Registrar o que funciona, o que está incompleto e os riscos.
5. Preservar código útil. Não recomeçar do zero sem justificar tecnicamente.
6. Propor um plano por etapas e começar pela etapa de maior valor.

### Arquitetura
- Separar conteúdo matemático, dados de exercícios, lógica de avaliação, estado do usuário e componentes visuais.
- Manter questões em dados estruturados, não espalhadas por componentes.
- Usar componentes reutilizáveis para fórmulas, gráficos, cartões de conteúdo, dicas, exercícios e feedback.
- Centralizar funções matemáticas e de pontuação.
- Persistir progresso localmente de forma robusta (por exemplo, localStorage ou IndexedDB), sem exigir login no MVP.
- Permitir exportar/importar progresso em JSON, se viável.
- Evitar dependência de serviços pagos ou chaves de API para a funcionalidade principal.
- Não colocar segredos ou chaves no frontend.
- Preparar instruções simples para instalação, execução, build e deploy.

### Stack
Inspecionar a stack existente e mantê-la se for adequada. Se o repositório estiver vazio, escolher uma stack moderna, simples e gratuita para desenvolvimento e hospedagem estática. Explicar a escolha antes de introduzir dependências. Evitar backend e banco remoto no MVP, a menos que haja necessidade real.

### Interface e acessibilidade
- Design limpo, moderno e consistente, com identidade visual de laboratório de matemática.
- Incluir um modo foco opcional e controles simples para reduzir animações, sons e elementos não essenciais.
- Permitir que o estudante escolha sessões curtas ou longas; sugerir blocos de 10–20 minutos sem impor esse intervalo.
- Salvar automaticamente e permitir pausar/retomar sem perder respostas.
- Não usar streaks punitivos, alertas de culpa ou temporizadores compulsórios.
- Manter desafios avançados opcionais e acessíveis sem esconder o caminho básico.
- Responsivo: celular primeiro, mas confortável em desktop.
- Contraste adequado, foco visível, navegação por teclado e rótulos acessíveis.
- Suporte a leitores de tela onde aplicável.
- Fórmulas renderizadas com qualidade e sem overflow horizontal.
- Estados de carregamento, vazio, erro e sucesso.
- Sem botões decorativos que não funcionam.
- Sem links quebrados ou dados falsos apresentados como reais.

### Confiabilidade matemática
- Conferir manualmente as soluções e testar casos representativos.
- Testar sinais, constantes, limites, domínio e condições de aplicação.
- Verificar primitivas por derivação.
- Verificar integrais definidas por aproximação numérica independente quando útil.
- Não usar resultados gerados por IA sem validação.
- Manter um conjunto de testes unitários para regras, equivalência de respostas e pontuação.
- Quando houver ambiguidade matemática, explicitar a convenção adotada.

---

## 10. Critérios de aceitação para considerar “pronto”

O projeto só deve ser considerado pronto quando:

- [ ] A aplicação inicia seguindo o README, sem passos ocultos.
- [ ] Todas as rotas e navegação principais funcionam.
- [ ] As unidades e lições implementadas têm conteúdo matematicamente revisado.
- [ ] Há exercícios muito simples de entrada em cada tópico ativo, além de questões intermediárias e integradoras.
- [ ] A Trilha Zero ensina o significado de integral e acumulação antes de exigir técnicas formais.
- [ ] Cada lição inclui exemplo resolvido, prática guiada e prática independente.
- [ ] Há opções de modo foco, sessões ajustáveis, pausa/retomada e redução de estímulos.
- [ ] As dicas e soluções funcionam e permanecem ocultas até serem solicitadas.
- [ ] As respostas aceitam equivalências previstas ou comunicam honestamente suas limitações.
- [ ] Os gráficos interativos correspondem às expressões e limites apresentados.
- [ ] O simulado tem temporizador funcional, pontuação correta e gabarito pós-envio.
- [ ] O progresso permanece após atualizar ou fechar a página.
- [ ] A experiência funciona em celular e desktop.
- [ ] Não há erros críticos no console, testes ou build.
- [ ] O README explica instalação, execução, testes, build, deploy e como adicionar questões.
- [ ] Há uma lista clara de conteúdos confirmados e conteúdos ainda dependentes da ementa.

Se algum critério não puder ser concluído, documentar precisamente o que falta. Não declarar “pronto” com funcionalidades simuladas ou botões sem ação.

---

## 11. Plano de execução recomendado

### Fase 0 — Auditoria e alinhamento
- Inspecionar o repositório.
- Identificar o que já existe.
- Confirmar stack e comandos.
- Solicitar a ementa/edição do Stewart, sem bloquear o trabalho estrutural.
- Criar `PLAN.md` com tarefas e decisões.

### Fase 1 — Fundação funcional
- Estruturar navegação e layout.
- Definir modelo de dados para módulos, lições e exercícios.
- Implementar persistência local.
- Garantir responsividade e acessibilidade básicas.

### Fase 2 — Núcleo matemático
- Implementar primeiro a Trilha Zero, assumindo nenhum conhecimento prévio de integrais.
- Incluir exercícios introdutórios simples sobre taxas, áreas, acumulação e leitura de gráficos.
- Implementar os primeiros módulos confirmados.
- Criar conteúdo original e exercícios progressivos.
- Implementar avaliação, dicas e soluções.
- Testar regras matemáticas.

### Fase 3 — Visualizações
- Soma de Riemann interativa.
- Integral definida e área sombreada.
- Teorema Fundamental do Cálculo.
- Outras visualizações de acordo com o programa.

### Fase 4 — Simulado
- Banco de questões tradicionais.
- Temporizador, navegação, envio, pontuação e relatório.
- Testes completos do fluxo de prova.

### Fase 5 — Polimento
- Revisão de UX, celular e desktop.
- Revisão de acessibilidade e desempenho.
- Corrigir erros e inconsistências.
- Melhorar onboarding e painel de progresso.

### Fase 6 — Entrega
- Executar todos os testes e build.
- Criar README completo.
- Fornecer instruções de deploy.
- Listar limitações restantes e próximos passos.
- Fazer uma demonstração guiada dos principais fluxos.

**Prioridade:** entregar primeiro um núcleo pequeno, correto e utilizável. Só depois ampliar o catálogo. Não gastar a maior parte do esforço em animações, branding ou funcionalidades periféricas antes de garantir conteúdo, exercícios e simulado.

---

## 12. Como o Codex deve trabalhar

- Trabalhar em etapas pequenas e verificáveis.
- Antes de mudanças grandes, explicar objetivo, arquivos afetados e riscos.
- Não sobrescrever nem apagar arquivos sem entender sua função.
- Fazer alterações reais no repositório, não apenas descrever código em mensagens.
- Executar testes e build depois de cada etapa relevante.
- Corrigir os próprios erros antes de avançar.
- Manter `PLAN.md` atualizado com concluído / em andamento / bloqueado.
- Manter `DECISIONS.md` com decisões técnicas relevantes.
- Se faltar informação, fazer uma pergunta objetiva; quando a decisão for reversível e de baixo risco, escolher uma opção sensata e registrar a suposição.
- Não inventar conteúdo da ementa, fontes, resultados de testes ou funcionalidades.
- Não afirmar que o trabalho está concluído enquanto os critérios de aceitação não forem verificados.
- Ao final de cada etapa, apresentar resumo, arquivos alterados, testes executados e próximos passos.

---

## 13. Prompt inicial para colar no Codex

Use o texto abaixo como primeira mensagem no Codex, com este documento e o repositório disponíveis:

> Você é o engenheiro de software responsável por levar o Integralab até uma versão final funcional e polida. Leia integralmente `IntegraLab_Pacote_de_Transferencia_Codex.md` antes de agir e trate-o como especificação principal do produto.
>
> Comece auditando o repositório: identifique a stack, leia os arquivos relevantes, execute a aplicação e os testes disponíveis. Não descarte trabalho existente sem justificativa. Depois crie/atualize `PLAN.md` e `DECISIONS.md`, com fases, riscos e critérios de aceitação.
>
> O objetivo não é produzir apenas um protótipo visual: precisamos de uma aplicação utilizável, responsiva, matematicamente confiável, que comece do zero absoluto em integrais e inclua uma Trilha Zero com exercícios muito simples, lições visuais, prática guiada e independente, métodos variados de aprendizagem, apoios configuráveis para foco/atenção, desafios opcionais, dicas, soluções comentadas, progresso persistente e simulado tradicional cronometrado. As aplicações de IA devem aparecer nas lições e na prática, não no simulado.
>
> A edição do Stewart e a ementa exata ainda serão confirmadas. Não invente o conteúdo cobrado. Estruture os módulos de forma configurável e sinalize conteúdos condicionais. Enquanto aguardamos essa confirmação, implemente a fundação e o núcleo comum.
>
> Trabalhe em etapas pequenas. Faça alterações no código, rode testes e build, corrija problemas e mantenha a documentação atualizada. Priorize correção matemática, experiência de estudo e confiabilidade sobre efeitos visuais. Não use serviços pagos ou chaves de API como dependência do MVP. Não declare a aplicação pronta sem verificar os critérios de aceitação do documento.
>
> Primeiro, apresente uma auditoria objetiva e um plano de execução. Em seguida, comece a implementar a primeira etapa de maior valor sem esperar por uma aprovação para cada pequena alteração. Faça perguntas apenas quando uma informação realmente bloquear uma decisão importante.

---

## 14. Uso consciente dos créditos do evento

O estudante informou que receberá **US$ 100 em créditos de Codex e mais US$ 50 em créditos de API**, como benefícios separados do evento. Tratar os dois saldos como recursos distintos e confirmar no evento as regras de resgate, validade, elegibilidade e produtos cobertos. Não presumir que créditos de API pagam uso do Codex ou vice-versa.

### Estratégia sugerida
- Usar o Codex como agente principal para inspecionar o repositório, implementar funcionalidades, executar testes e revisar o projeto.
- Reservar os créditos de API para experimentos que realmente precisem chamar modelos via API, protótipos ou funcionalidades futuras — não tornar a API paga dependência do MVP.
- Não colocar uma chave de API no frontend nem versionar segredos no Git.
- Configurar limites de gasto/alertas quando disponíveis e acompanhar os dois saldos separadamente.
- Começar com auditoria e planejamento antes de pedir uma reconstrução ampla.
- Dar ao Codex este documento como contexto persistente no repositório.
- Usar tarefas focadas e pedir que rode testes.
- Evitar pedir repetidamente para reescrever o projeto inteiro.
- Usar modelos mais econômicos para tarefas rotineiras, se a interface permitir.
- Não habilitar recarga automática ou gasto adicional sem entender as configurações e limites.

Para fazer os créditos renderem:
- Comece com auditoria e planejamento antes de pedir uma reconstrução ampla.
- Dê ao Codex este documento como contexto persistente no repositório.
- Use tarefas focadas e peça que ele rode testes.
- Evite pedir repetidamente para reescrever o projeto inteiro.
- Use modelos mais econômicos para tarefas rotineiras, se a interface permitir.
- Acompanhe o saldo e o consumo no painel indicado pelo evento/conta.
- Não habilite recarga automática ou gasto adicional sem entender as configurações e limites.

---

## 15. Checklist para o evento

- [ ] Confirmar o processo de resgate dos US$ 100 em créditos de Codex.
- [ ] Confirmar separadamente o resgate dos US$ 50 em créditos de API.
- [ ] Confirmar validade, conta elegível, região, produtos cobertos e restrições de cada saldo.
- [ ] Confirmar se os créditos podem ser usados no Codex local/IDE/CLI e/ou Codex Cloud.
- [ ] Criar ou acessar o repositório Git do Integralab.
- [ ] Guardar este documento dentro do repositório.
- [ ] Se possível, levar a ementa da disciplina e a edição/ISBN do Stewart.
- [ ] Antes de começar uma sessão longa, conferir o painel de uso e os limites.

**Resultado esperado:** um Codex com contexto suficiente para auditar, continuar e entregar o Integralab de forma incremental, sem depender da memória desta conversa.
