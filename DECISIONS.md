# Decisões técnicas e pedagógicas

## D-001 — Aplicação estática no MVP

**Decisão:** React, TypeScript e Vite, sem backend ou serviço pago.

**Motivo:** o progresso pode permanecer local; a aplicação será simples de executar e hospedar gratuitamente.

## D-002 — Conteúdo separado da interface

**Decisão:** módulos, lições e exercícios serão dados estruturados e tipados.

**Motivo:** facilita revisão matemática, testes, ativação de módulos e expansão do banco.

## D-003 — Persistência versionada

**Decisão:** usar `localStorage` no MVP, com chave versionada e importação/exportação em JSON.

**Motivo:** permite retomada sem login e cria uma rota de migração futura.

## D-004 — Escopo curricular confirmado

**Decisão:** tratar como obrigatórios os tópicos de integração listados no plano de ensino IME0350 de 2026.2. A Trilha Zero é um pré-módulo pedagógico adicional.

**Motivo:** a ementa oficial elimina a incerteza original sobre partes, substituições trigonométricas, frações parciais, impróprias e aplicações.

## D-005 — Avaliação simbólica limitada e honesta

**Decisão:** aceitar equivalências somente em um subconjunto testado; fora dele, usar autoavaliação guiada.

**Motivo:** evitar marcar respostas corretas como erradas e não executar entradas arbitrárias.

## D-006 — Áreas futuras visíveis sem simulação

**Decisão:** mostrar as rotas principais desde a fundação, com estado explícito “em preparação”.

**Motivo:** permite validar a arquitetura e a navegação sem apresentar dados ou funções fictícias.

## D-007 — Equivalência simbólica por parser restrito

**Decisão:** interpretar apenas números, `x`, `C`, operações aritméticas, potências constantes, parênteses e uma lista explícita de funções elementares (`sin`, `cos`, `tan`, `sec`, `ln`, `exp`). Primitivas são comparadas pela derivada em pontos de amostragem controlados e no domínio comum válido.

**Motivo:** aceitar formas algébricas e constantes equivalentes sem `eval`, execução de código ou a falsa promessa de um sistema de álgebra completo. Entradas fora do escopo são recusadas de forma explícita.
