# Pendências do portfólio: P-001, 003, 004, 005, 006, 007, 013, 014, 015 · 2026-11-11 · impl/pendencias · PR on GitHub
O dono pediu "todas as pendências" de `docs/PENDENCIAS.md`; o estruturador as virou em P-001…P-020 (`docs/pending/`) e o dono escolheu 9 para esta execução. Página de projeto: botão "Ver demo" no topo com aviso de idioma (só no site em EN), resumo de três itens, números na ficha, cartões de decisão, "Como eu planejo" no wh-harness e diagramas SVG de arquitetura que seguem o tema (Homelab na capa e no card). Início com 4 destaques em 2×2. Página nova `/ai`. Regra de conteúdo: nenhum fato ou número novo; todo texto sai de `src/content`, `docs/relatorios` ou do repo.
Lanes: diagrama: pendencias-7…9, 3 commits (3c0d8b8) · projeto: pendencias-1…6, 6 commits (b4eef3c) · site: pendencias-10…13, 4 commits (1b9ae56). Fix do QA final: e08b9ae.

## Errors
- Nenhum teste, lint ou build vermelho nas faixas nem no QA final (156 testes, lint e build com exit 0 em e08b9ae). Nenhum conflito de merge.
- site: pendencias-11 usou dois arquivos de "May touch": `src/components/arch-diagram.css` (regra `.card__cover--diagram`) e `src/decisions.test.jsx` (títulos do KittyCafé agora 01–05, 03 = Arquitetura). Previsto no plano.
- `profile_run.sh` falhou em todas as faixas (perfil sem `## Commands`); build, suíte e lint rodaram à mão. Corrigido neste PR (retro #1).

## Open items
- P-002 (página do fluxo legível no celular) e a tradução da própria página do fluxo: são do repo wh-harness (`site/flow.html`), fora deste repo.
- P-008, P-009, P-010 (estudos de caso Qyon ×2 e BTG), P-011 (métricas clicáveis), P-012 (categoria dos casos): adiados até o dono mandar as notas (contexto, números, limites de NDA).
- P-016 a P-020 (foto, disponibilidade, faixa "Onde atuei", comprovantes, depoimentos): esperam material do dono.
- → P-021: alternativa descartada e trade-off dos 7 cartões de decisão (campos opcionais, vazios hoje).
- → P-022: número de uptime para a ficha técnica (não existe no conteúdo).
- Revisar no PR a redação de todo texto público novo (resumos, cartões, números da ficha, passos do "Como eu planejo", rótulos dos diagramas, página `/ai`), como decidido no Q3.
- Decisões do enricher aceitas pelo dono: D1 botão de demo no topo em todas as larguras (também no desktop); D3 sem linha de uptime e sem números do GoPrint; D5 diagramas só com o que o `about` diz (AdMob, Play Billing, login Google e MCP do KittyCafé ficam fora); D6 item `IA`/`AI` no menu depois de Projetos.
- Nenhuma decisão tomada sem o dono.

## Consultations
— (nenhuma consulta)

## QA
| Id | Type | Severity | Where | Evidence | Fix |
|---|---|---|---|---|---|
| QA-diagrama-01 | risk | low | src/content/diagrams.js:458,466 (label/sub widths) | `KittyCafé · GoPrint` has 19 chars: at 13px mono (~0.6em = 7.8px) = ~148px, equal to the node width (148), so no side padding; subs up to 22 chars (`cópia fora do servidor`) = ~145px of 148. Fits only by the 0.6em estimate; a wider fallback mono font would clip at the border. Limits 19/24 come from the lane. | Check in the final visual QA (both themes, 390px); if tight, shorten the label/sub or widen `nodeW`. |
| QA-diagrama-02 | risk | low | src/components/ArchDiagram.jsx:270 | Group label background width is `label.length × 6.6 + 8` (an estimate of the font), may not cover the dashed border with another font. | Accept, or measure on the final visual QA. |
| QA-final-01 | bug | medium | src/content/diagrams.js (labels/subs) + src/components/ArchDiagram.jsx GRID.nodeW=148 · /projects/homelab, /projects/cartas-malfaladas, /projects card thumbnail | Expected: the node text stays inside its 148-unit box. Observed, with IBM Plex Mono loaded (document.fonts.check true), getBBox per text: "KittyCafé · GoPrint" 152 wide (desktop) / 157.2 (mobile 390, scale 0.85) vs 148; "cópia fora do servidor" 154; "pacote de contratos" 152 / 157.2. The text crosses the node border on both sides (2-4.6 units). "cliente 3D isométrico" and "Zod, types and events" are at 147 of 148 (0.5 padding). Real width is ~8px/char at 13px, not the 7.8 estimate. Screenshots: qa/visual/diagrams/_projects_homelab-dark-pt-desktop.png, _projects_cartas-malfaladas-dark-pt-desktop.png, measurements in qa/visual/pages/report.json | Widen GRID.nodeW to ~168 (or shorten the labels to ≤17 chars and the subs to ≤19), and add a test that bounds label length × 8 + 16 ≤ nodeW |
| QA-final-02 | bug | low | src/components/ArchDiagram.jsx:~135 (group label bg = label.length × 6.6 + 8) | Expected: the label background hides the dashed group border under the whole label. Observed: the text runs past the background by 3.6 ("imagem Docker única"), 9.2 ("rede Docker · sem porta publicada") and 10 ("Docker network · no published ports"), so the dashed line touches the last letters. The real width is ~7px/char at 11px, not 6.6. Same screenshots plus _projects_kittycafe-dark-pt-desktop.png | Use 7.2 per char in MONO_CHAR_11 (or measure with getComputedTextLength after mount) |
| QA-final-01 (retest) | fixed | Full size (Homelab cover, Cartas Arquitetura, KittyCafé), all 16 combinations: no node text within 2 units of its box (before: "KittyCafé · GoPrint" 152-157 of 148; now it fits inside 168). The Homelab card thumbnail in /projects (compact, scale 0.39) still has "cópia fora do servidor" at 167.6-168.7 of 168: about 0.1 screen px over, which you cannot see (retest-diagrams/_projects-dark-pt-desktop.png). This comes from Chrome rounding glyph widths at small sizes, not from the grid |
| QA-final-02 (retest) | fixed | Full size: no group label runs past its background (before: overruns of 3.6-10). The thumbnail still overruns by 1-12 units because of the same small-size rounding, which is ≤ 5 screen px of dashed line beside the label. It isn't visible in the clip. Optional follow-up, not blocking: in compact mode, measure with getComputedTextLength or add 1 char of slack to the label background |
| QA-projeto-01 | name | low | docs/GLOSSARIO.md | New concepts brief/decisions/demoNote/steps/excerpt have no glossary line (grep finds no term; new_names: 27 names, glossary has none of them) | add glossary lines: resumo (brief), decisão de arquitetura (decisions), aviso da demo (demoNote) |
Status: QA-final-01 e QA-final-02 corrigidos em e08b9ae (`GRID.nodeW` 148→168, `MONO_CHAR_11` 6.6→7.2) e retestados (acima); QA-diagrama-01/02 eram os mesmos riscos, confirmados pelo QA final e fechados pelo mesmo commit. Fica, sem bloquear: na miniatura do card do Homelab o rótulo de grupo passa ≤ 5 px de tela do fundo (arredondamento do Chrome em fonte pequena). QA-projeto-01: linhas do glossário adicionadas no commit `docs: pendencias`.
Telas do QA visual: 64 páginas inteiras (8 rotas × desktop/mobile × claro/escuro × PT/EN) + recortes dos diagramas; sem estouro horizontal, menu com 7 itens cabendo.

## Problems found
- Na raiz do clone, `npm test` também coleta as cópias de teste em `.claude/worktrees/*` (228 testes contra 80): falta `.claude/**` em `test.exclude` do `vite.config.js` (retro #5).
- A página embutida do fluxo é só em português, ao contrário do que a pendência registrava; o aviso diz isso só no site em inglês.

## Cost
| Agent | Model | Requests | Output | Share |
|---|---|---|---|---|
| impl-enrich (análise, plano, consultas de onda, retro) | fable-5-2 | 36 | 120 613 | 34% |
| orquestrador | opus-5-5 | 72 | 26 399 | 26% |
| lane projeto | opus-5-5 | 45 | 40 168 | 11% |
| QA final + reteste | opus-5-5 | 50 | 23 637 | 8% |
| lane site | opus-5-5 | 41 | 25 411 | 7% |
| lane diagrama | opus-5-5 | 35 | 25 490 | 6% |
| impl-structure | opus-5-5 | 18 | 25 215 | 4% |
| 3 QAs de código | sonnet-5-5 | 13 | 7 730 | 3% |
| Total | | 310 | 294 663 | 100% |

## Consolidated retro
| # | Severity | Category | Evidence (lanes) | Proposal | Who applies |
|---|---|---|---|---|---|
| 1 | high | Automatic check | orchestrator, diagrama, projeto, qa-final: `profile_run.sh` → "no ## Commands section" em toda faixa; tudo rodou à mão | `.claude/profile/implementation.md` § Commands (build, suite, typecheck = lint, service, health) | repo — **applied** neste PR (`profile_run.sh typecheck` = exit 0) |
| 2 | medium | Code standard | enricher, orchestrator, qa-final: largura do texto do diagrama estimada de cabeça (7,8 px/char); rótulos de 152–157 num nó de 148 (QA-final-01/02) | teste em `src/arch-diagram.test.jsx`: comprimento de cada rótulo × 8,2 ≤ `GRID.nodeW` − 8; e no `impl-enrich`, caixa que contém texto tem largura medida (print/getBBox), não contada | repo (teste) / owner (plugin) |
| 3 | medium | Information access | enricher, orchestrator: o dono disse que o fluxo embutido era só em inglês; a página ao vivo é `pt-BR` | `_common § Docs`: `public/wh-harness/flow.html` redireciona ao site do repo wh-harness; fato sobre ele se confere na URL ao vivo; e `impl-enrich` confere fato externo antes de virar decisão | repo / owner (plugin) |
| 4 | medium | Information access | orchestrator: lista do dono em `docs/PENDENCIAS.md` sujo; intake lê `docs/pending/` | `_common.md` § Pending → `docs/pending/` (**applied**); `CLAUDE.md` § Docs: novas pendências viram arquivos P-NNN | repo (applied) / owner (CLAUDE.md) |
| 5 | medium | Tool economy | enricher: `Write` recusou `ANALYSIS.md`; a análise saiu inteira na resposta e foi escrita de novo por heredoc | `ENVIRONMENT.md` § Files outside the worktree: o enricher escreve por heredoc desde o início | owner (plugin) |
| 6 | medium | tooling | qa-final: o print do perfil não define tema/idioma nem página inteira; driver CDP escrito duas vezes (restart apagou o scratchpad) | versionar o driver como `scripts/qa-shots.mjs` (cópia em `.impl/…/qa/visual/shot.mjs`) e apontar § Visual QA para ele; evidência direto em `qa/`, nunca no scratchpad | owner |
| 7 | low | Steering doc | enricher: W2 com 21 arquivos (teto 15) porque `strings.js`/`projects.js` não eram union files | § Union files: `src/i18n/strings.js` `src/content/projects.js` | repo — **applied** |
| 8 | low | test convention | site: `readFileSync(new URL(..., import.meta.url))` falha no jsdom | § Tests: `resolve(process.cwd(), '<caminho>')` | repo — **applied** |
| 9 | low | Tool economy | enricher, orchestrator: `npm test` na raiz coleta `.claude/worktrees/*` | `vite.config.js` `test.exclude: ['.claude/**', 'node_modules/**']` | repo |
| 10 | low | process | orchestrator, qa-final: restart da sessão matou o QA final sem nada escrito | impl-qa final grava checkpoint em `qa/final.md` a cada passo | owner (plugin) |
| 11 | low | lane file | diagrama, projeto, site: exports não-componente em `.jsx` (eslint-disable), "h2 em ordem" sem contêiner, "atualizar" teste que já passava | template de faixa do enricher: export em `.js`, nomear o contêiner, "só se vermelho" | owner (plugin) |
| 12 | low | Tool economy | enricher: hook RTK reescreveu `cat`/`git` e a chamada foi recusada uma vez (~6 turnos) | `ENVIRONMENT.md` § RTK: `rtk read`/`rtk git` direto | owner (plugin) |
