# Pendências do site: Início, rodapé, Contato, Currículo, IA e Sobre (P-033 a P-043) · 2026-11-12 · impl/pendencias · PR on GitHub
Pedido: "implemente todas as pendências" + avaliar se `docs/PENDENCIAS.md` vai para o `pending/` novo. Pendências migradas para `pending/` local (gitignorado; `docs/pending/` e `docs/PENDENCIAS.md` saem do git, `5bf788b`). Execução empilhada no PR #46 (`impl/pendencias-site`, decisão do dono): este PR traz os commits do #46 até ele entrar. Entraram P-033 a P-043: faixa "Onde atuei" nova, métrica "6 projetos", GoPrint nos destaques, rodapé sem navegação nem © e com botão de copiar estável, cartão de contato da empresa no Início, currículo em destaque no Contato e fora do fim de `/resume`, 23 licenças e certificados com "mostrar mais", bullet da Qyon só em `/ai`, Sobre com parágrafo dos agentes e linha do tempo reescrita.
Lanes:
conteudo: DONE · 5 items · cd58dcf
curriculo: HUMAN_DECISION · 3 items · 4f35a90
contato: DONE · 4 items · 18a9492

## Errors
Nenhuma falha restante: na ponta, suíte (40 arquivos, 244 testes), lint e build verdes. Os 3 merges sem conflito. Correções na integração: `18a9492` (lane contato: `button.copy-btn`, o `.btn` global vencia o grid e o botão do Contato ficava com ~290px), `2fa5206` (QA-contato-03), `968c911` (QA-final-01). Base errada no início: `impl/pendencias` reaproveitou o ramo de uma execução já mergeada (21 atrás da `master`); refeito sobre `impl/pendencias-site` e enviado com `--force-with-lease`.
WARNING conteudo: pendencias-3 toca `src/content/projects.js` (May touch): só `featured: true` do kittycafe para o goprint.

## Open items
- Links das 23 credenciais: fetch sem login deu 200 em todos, mas 200 não prova que a página mostra o certificado; conferir no navegador → P-044.
- CSS global carrega depois do CSS dos componentes (`src/main.jsx`): armadilha de especificidade (retro high, repo) → P-045.
- Adiadas pelo dono, seguem abertas em `pending/`: P-008 a P-012 (entrevista guiada), P-016, P-019, P-020, P-022 (material do dono). P-002 fica fora (repo wh-harness).
- P-017, P-018, P-021, P-030, P-031, P-032 movidas para `pending/done/` porque o PR #46 as entrega; se o #46 não entrar, voltam.
- Decisões sem o dono: nenhuma. Decisão do enricher: o rodapé esconde "Fale comigo" só no Início, onde o cartão da empresa já mostra os mesmos contatos.
- Contratos: nenhum.

## Consultations
— (nenhuma consulta)

## QA
| Id | Type | Severity | Where | Evidence | Fix |
|---|---|---|---|---|---|
| QA-contato-01 | standard | low | docs/features/layout.md:12, docs/GLOSSARIO.md:41 | Rodape ainda descrito com "a navegacao e a linha do ©" / "repete a navegacao"; o codigo removeu os dois (Footer.jsx) | atualizar as duas linhas (cleanup/feature-docs) |
| QA-contato-02 | risk | low | src/pages/home.css `.home-company__email` | `white-space: nowrap` no e-mail dentro de `li` com `min-width:0`: a 390px pode estourar o cartao; nao demonstrado (jsdom nao mede) | conferir a 390px no QA visual final |
| QA-contato-03 | standard | low | src/pages/Contact.jsx (fim do JSX) | linha em branco sobrando antes do `</div>` final apos remover o bloco antigo | remover a linha |
| QA-conteudo-01 | standard | low | docs/features/inicio.md:15 | still says featured are "wh-harness, Nesse Capítulo, Insetos, KittyCafé"; P-035 made it GoPrint instead of KittyCafé | update line to the new four (cleanup/docs step) |
| QA-curriculo-01 | name | low | docs/GLOSSARIO.md | No glossary terms for `credentials` (licenças e certificados) and `aiOnly`. | Closing docs. |
| QA-curriculo-02 | standard | low | docs/features/curriculo.md:13 | Symbols stop at `certifications`; missing `credentials`, "mostrar mais", removed PDF block, `aiOnly`. | Closing docs. |
| QA-final-01 | standard | low | src/pages/Home.jsx (home-company email `<li>`) | Home card's CopyButton uses `className="link link--muted site-footer__copy"`: a BEM element of the footer block (layout.css:257) used inside `.home-company`; if someone restyles the footer's copy button, the Home card changes too | give it a neutral class (e.g. `copy-link` in layout.css) used by both, or a `home-company__copy` |
Corrigidos: QA-contato-03 (`2fa5206`), QA-final-01 (`968c911`, classe neutra `copy-link`; testes do rodapé, Início e botão + lint verdes). QA-contato-02 conferido no QA final: o e-mail cabe no cartão a 390px e 360px, sem rolagem horizontal (não reproduzido). QA-conteudo-01, QA-curriculo-01/02 e QA-contato-01 corrigidos nos docs de fechamento (`docs: pendencias`). Visual: `/`, `/contact`, `/resume`, `/about`, `/ai` em 1440 e 390, claro e escuro, PT (e EN em `/` e `/about`); o botão de copiar desloca o vizinho 0px em `/`, `/contact` e no rodapé de `/about`, PT e EN.

## Problems found
Nenhum fora do escopo.

## Cost
| Agent | Model | Requests | Input | Cache write | Cache read | Output | Share |
|---|---|---|---|---|---|---|---|
| wh:impl-enrich · Analyze all pending items | claude-fable-5-2 | 35 | 72 | 414453 | 4831394 | 82870 | 33% |
| orchestrator (main session) | claude-opus-5-5 | 60 | 120 | 217078 | 7590019 | 26843 | 25% |
| wh:impl-dev · Lane contato | claude-opus-5-5 | 58 | 120 | 93030 | 3553701 | 30222 | 13% |
| wh:impl-dev · Lane curriculo | claude-opus-5-5 | 42 | 84 | 84834 | 2475966 | 23938 | 10% |
| wh:impl-dev · Lane conteudo | claude-opus-5-5 | 39 | 80 | 72780 | 1999084 | 21185 | 9% |
| wh:impl-qa · Final QA | claude-opus-5-5 | 36 | 74 | 81614 | 1816853 | 18154 | 7% |
| wh:impl-qa · Code QA conteudo | claude-sonnet-5-5 | 5 | 10 | 34928 | 108162 | 2068 | 1% |
| wh:impl-qa · Code QA curriculo | claude-sonnet-5-5 | 4 | 8 | 25000 | 86804 | 2364 | 1% |
| wh:impl-qa · Code QA contato | claude-sonnet-5-5 | 3 | 6 | 25909 | 58581 | 2207 | 1% |
| Total | | 282 | 574 | 1049626 | 22520564 | 209851 | 100% |

O mais pesado: o enricher (33%), que analisou as 27 pendências, inclusive as 16 adiadas ou já feitas.

## Consolidated retro
| # | Severity | Category | Evidence (lanes) | Proposal | Who applies |
|---|---|---|---|---|---|
| 1 | high | Automatic check | enricher, orchestrator: `impl_env.sh` reused a merged `impl/pendencias` (21 behind master) while printing `BASE=<master>`; migration commit pushed on the stale base. Same as retro 3 of pendencias-site. | `impl_env.sh`: refuse an existing `impl/<slug>` unless `<main>` is its ancestor; print behind/ahead vs `<main>`. | owner (wh-harness) |
| 2 | high | Information access | enricher, orchestrator: open PR #46 already did 6 of 27 items; nothing in intake/env said so. | `intake.sh`/`impl_env.sh`: list open PRs and print `PENDING ALREADY IN PR: P-NNN → #n`. | owner (wh-harness) |
| 3 | high | Code standard | contato, orchestrator: `global.css` imported after `App` in `src/main.jsx`; `.btn`/`.link` `display` beat `.copy-btn`; green tests, only a 1440 screenshot caught it (`18a9492`). | Profile § Tests line (**applied**); import order → P-045. | repo (applied) / P-045 |
| 4 | medium | Steering doc | enricher: previous run's items closed in an unmerged PR stayed `status: open`. | `CLOSE.md`: move to `done/` with `landed in: PR #n (open)`. | owner (wh-harness) |
| 5 | medium | Steering doc | orchestrator: tracked `docs/pending/` + `docs/PENDENCIAS.md` with local edits blocked `impl_env.sh`; migration by hand. | `/wh:adopt`/`/wh:profile`: detect a tracked pending folder and offer the migration. | owner (wh-harness) |
| 6 | medium | Steering doc | enricher: confirmed locations of 16 deferred/done pending files for nothing. | Enricher `analyze`: confirm only items entering the plan. | owner (wh-harness) |
| 7 | medium | Tool economy | enricher, conteudo: privacy hook refused a heredoc with e-mail + "User-Agent"; worktree guard refused a compound write from scratchpad. | Lane files via `Write`, personal data by symbol; ENVIRONMENT.md: compound writes from outside are refused, use Edit/Write. | owner (wh-harness) |
| 8 | medium | Tool economy | qa-final, contato: headless-shell `--screenshot` cannot click, scroll or measure; QA wrote a Node CDP driver. | `_common § Toolchain`: CDP driver (node + chrome `--remote-debugging-port`), or keep one under `scripts/qa/`. | repo |
| 9 | medium | Automatic check | contato: jsdom applies no CSS, so layout items have no Acceptance. | Profile § Tests: layout items close with a dev-side screenshot at the lane port. | repo (profile) |
| 10 | low | Process | qa-final: full-page capture shifted layout -7.5px; 5000px shots unreadable. | Profile § Visual QA line: measure first, clip per area (**applied**). | repo (applied) |
| 11 | low | Automatic check | enricher: content tests compare lists by literal; found by grepping the value. | Profile § Tests line: grep old value in `src/*.test.jsx` (**applied**). | repo (applied) |
| 12 | low | Lane spec | curriculo: `hidden` + `display:flex` shows in real browsers; jsdom passes. | Profile § Tests line `[hidden] { display: none }` (**applied**). | repo (applied) |
| 13 | low | Evidence | curriculo: 200 status doesn't prove a certificate renders. | Link checks grep the body for the title, or "owner confirms" (→ P-044). | repo |
| 14 | low | Automatic check | orchestrator, qa-final: `lane_prompt.sh final` prints `Diff base: main` literal and no `Port:`. | `lane_prompt.sh`: `--base <ref>` and `Port:` for final QA. | owner (wh-harness) |
| 15 | low | Automatic check | conteudo: verbatim owner text had no mechanical check; ad-hoc script 18/18. | Lane template: helper greps quoted texts of the pending file in the target. | owner (wh-harness) |
| 16 | low | No-op | contato: heredocs inside the worktree passed though ENVIRONMENT.md says refused. | Say "may be refused". | owner (wh-harness) |
