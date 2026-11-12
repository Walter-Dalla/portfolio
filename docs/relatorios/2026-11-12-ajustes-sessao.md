# Ajustes da sessão (P-023 a P-029) · 2026-11-12 · impl/ajustes-sessao · PR on GitHub
Sete pendências do dono (P-023 a P-029): Andelph Group como cliente; /ai com a empresa uma vez e o texto novo do wh-harness; rodapé "Fale comigo"; minicurso de Spring Boot em Conquistas; Atom como projeto fora da lista; fluxo do wh-harness embutido no idioma do site, sem moldura.
Lanes:
ia: DONE · 3 items · fadad36
rodape: DONE · 3 items · d8f4eb0
projetos: DONE · 5 items · 7611b08

## Errors
— (nenhum: Aceites verdes de primeira, merges sem conflito; suíte 25 arquivos/197 testes, lint e build verdes na ponta 2880323)

## Open items
- HUMAN: conferir ao vivo (:3000 ou produção) o fluxo sem rolagem própria e a troca PT/EN sem recarregar; antes do merge, `curl -I` em `https://walter-dalla.github.io/wh-harness/pt/` e `/en/` = 200 (medido 200 em 2026-11-11) → P-030.
- Decisão sem o dono: formato do Atom (página `/projects/atom` fora da lista, `noindex`, fora do sitemap, entrada só pelo cartão do técnico em Conquistas) → P-031.
- `/contact` mostra só nome e CNPJ da empresa, então a Andelph Group aparece em `/resume` e em `public/llms.txt`, não em Contato (comportamento anterior, fora do pedido).

## Consultations
— (no consultation)

## QA
| Id | Type | Severity | Where | Evidence | Fix |
|---|---|---|---|---|---|
| QA-final-01 | risk | low | src/content/projects.js:684 (Atom `links`) | The Atom LinkedIn URL (`feed/update/urn:li:activity:6610003994779631616/`) is traced only to the lane file projetos.md:40; PLAN/ANALYSIS fix the minicourse URL but not this one, and docs/pending/P-028 no longer exists to compare against. Not shown to be wrong. | Owner confirms the link while reviewing the PR. |
| QA-projetos-01 | missing test | low | scripts/prerender.mjs:38,73 | `<meta name="robots" content="noindex">` and the sitemap built from `sitemapRoutes()` have no unit test; the item-11 build check (`grep -c atom dist/sitemap.xml` = 0, `grep -c ... dist/projects/atom.html` = 1) is not in acceptance/projetos-ajustes-sessao-11.log | record the two build greps in the log or in the report |
| QA-rodape-01 | risk | low | src/components/layout.css `.site-footer__address` | `white-space: nowrap` + `flex-wrap` mantém o e-mail inteiro em 390px; largura de 350px e "sem rolagem lateral" não conferidos em navegador (Aceite só jsdom). | Conferir em 390x844 no QA visual final. |
| QA-rodape-02 | name | low | src/footer.test.jsx (9 nomes locais de teste) | Variáveis locais de teste, não conceitos do domínio. | Nenhuma. |
QA-final-01: link fornecido pelo dono nesta sessão (conferido pelo orquestrador). QA-projetos-01: build na ponta 2880323 conferido (`sitemap.xml` sem atom; `atom.html` com noindex), registrado no log do item 11. QA-rodape-01: fechado pelo QA final (390px sem rolagem lateral). QA-rodape-02: nenhuma ação.

## Problems found
— (nenhum fora do escopo)

## Cost
| Agent | Model | Requests | Input | Cache write | Cache read | Output | Share |
|---|---|---|---|---|---|---|---|
| orchestrator (main session) | claude-opus-5-5 | 95 | 190 | 152638 | 13160407 | 38357 | 37% |
| wh:impl-enrich · Analyze and plan ajustes-sessao | claude-fable-5-2 | 33 | 72 | 203756 | 4172376 | 80561 | 25% |
| wh:impl-dev · Lane projetos (P-028, P-029) | claude-opus-5-5 | 54 | 108 | 91656 | 3456670 | 27080 | 14% |
| wh:impl-dev · Lane rodape (P-026..P-028 link) | claude-opus-5-5 | 33 | 68 | 64122 | 1451359 | 18179 | 7% |
| wh:impl-qa · Final QA ajustes-sessao | claude-opus-5-5 | 29 | 60 | 77498 | 1378537 | 14444 | 6% |
| wh:impl-dev · Lane ia (P-023..P-025) | claude-opus-5-5 | 22 | 44 | 52237 | 838481 | 12704 | 5% |
| wh:impl-structure · Structure session requests | claude-sonnet-5-5 | 8 | 18 | 36047 | 168044 | 10961 | 2% |
| wh:impl-qa · Code QA lane projetos | claude-sonnet-5-5 | 4 | 8 | 32501 | 106574 | 2230 | 1% |
| wh:impl-qa · Code QA lane ia | claude-sonnet-5-5 | 5 | 10 | 32473 | 104927 | 1933 | 1% |
| wh:impl-qa · Code QA lane rodape | claude-sonnet-5-5 | 4 | 8 | 20387 | 82505 | 1866 | 1% |
| Total | | 287 | 586 | 763315 | 24919880 | 208315 | 100% |

## Consolidated retro
| # | Severity | Category | Evidence (lanes) | Proposal | Who applies |
|---|---|---|---|---|---|
| 1 | high | Automatic check | enricher: First `acceptance.py PLAN.md` run printed 9 green of 11: `npx vitest run src/<new>.test.jsx src/<existing>.test.jsx` exits 0 when the new file does not exist (filters are substring matches; the existing file runs alone). Fixed by prefixing `test -f <new file> &&`. | `.claude/profile/implementation.md` § Tests: "Acceptance with a new test file: `test -f <file> && npx vitest run <files>` (a missing filter is not an error in Vitest)". Also worth one line in `TRIAGE.md` § Plan for runners with substring filters. | repo (profile; aplicado) / owner, outside the repo (wh plugin) |
| 2 | medium | Automatic check | enricher: `npm test` and `npx vitest run` at the clone root collect tests from `.claude/worktrees/**` and `.impl/**` (no `exclude` in `vite.config.js`); my prototype test had to be deleted right after running, and the orchestrator had to warn that worktree tests are not part of the verdict. | `vite.config.js` `test.exclude`: add `.claude/**` and `.impl/**` to the Vitest defaults (or `test.include: ['src/**/*.test.jsx']`); then profile `suite` can stay `npm test`. | repo; também visto pelo qa-final (contagem 536 vs 197) |
| 3 | medium | Information access | enricher: The flow page only accepts the origins `https://walterdalla.uk` and `http://localhost:3000` (`wh-harness/site/flow.html:296`), so height and language messages do not work on the agent ports 3100+; found only by reading the other repo, and it forced a HUMAN step for two "done when" criteria of P-029. | `docs/features/projetos.md`: one line on the allowed origins of the embed and what QA sees on other ports; optionally allow `http://localhost:3100-3110` in the wh-harness page. | repo (doc, close step) / owner, outside the repo (wh-harness) |
| 4 | medium | Steering doc | enricher: Analysis proposed Atom at the end of `projects`; the owner's answer ("não deve exibir em projetos") reversed it and added three items (unlisted list, SEO, entry link). The pending file said "pouco destaque, no fim da lista" and the enricher did not ask where the project may appear. | `PENDING.md` § Format / structurer: for a new piece of content, an open question "where does it show (lists, home, sitemap) and where not?"; enricher `analyze` risk list: new content item = every listing that will show it, as a question when the owner signalled low prominence. | owner, outside the repo (wh plugin) |
| 5 | medium | Steering doc | orchestrator: Antes do `/wh:implementation`, a sessão anotou 7 pendências em `docs/PENDENCIAS.md` no formato antigo (seções de texto), enquanto o remoto já tinha migrado para `docs/pending/P-NNN-*.md`; isso exigiu stash, reset e estruturação do zero. `CLAUDE.md` § Docs ainda diz só "`docs/PENDENCIAS.md` — pendências do dono". | `CLAUDE.md` § Docs: "`docs/PENDENCIAS.md` — índice; cada pendência é um arquivo `docs/pending/P-NNN-*.md`". | owner (CLAUDE.md) |
| 6 | medium | Information access | orchestrator: O clone local estava 19 commits atrás de `origin/master` durante toda a anotação de pendências; nada avisou. `git pull` com rascunho local falhou por conflito em 7 arquivos. | Hook de início de sessão (ou `wh:prompt-graph`) que rode `git fetch` e avise "master atrás de origin em N commits". | owner (harness, fora do repo) |
| 7 | medium | tooling | qa-final: Profile § Visual QA uses `chrome-headless-shell --screenshot`, which cannot set `wd-lang`/`wd-theme` in localStorage or click anything. I had to write a CDP driver (Node 22 WebSocket) to cover the theme × language matrix and the language switch. | Add the script (.impl/ajustes-sessao/qa/visual/cdp.mjs) as `scripts/qa-cdp.mjs` and point profile § Visual or e2e QA at it. | repo (owner approves; profile is protected) |
| 8 | low | Tool economy | enricher: The RTK hook rewrote two Bash calls (`cat` → `rtk read`) after auto mode reviewed them; each had to be issued again. The agent definition also blocks `Write` of `.md` files, so `ANALYSIS.md`, `PLAN.md` and the lane files went through Bash heredocs after one refused call. | Enricher instructions: "write `.impl/<slug>/*.md` through a Bash heredoc" (as already said for agents in worktrees); RTK: exempt `cat`/`rtk read` rewrites or run the rewrite before the permission review. | owner, outside the repo (wh plugin, RTK config) |
| 9 | low | Navigation | enricher: Line numbers in the pending files were stale for `src/content/projects.js` (simpleProject 44 vs 36), `achievements.js` (15 vs 20) and `project-detail.css` (318 vs 338): written before the last master merge; each was re-read to correct. | Structurer: cite the symbol first and the line as a hint, or run after the pull (`impl_env.sh --pull-only`) so lines match the base. | owner, outside the repo (wh plugin) |
| 10 | low | lane file | ia: Lane gave exact texts, file:line and the code snippet for `aiWork`; 3 items closed with no consultation and no rework (acceptance.py exit 0 each, suite 167/167) | Keep the format: exact texts + "compare by equality" rule + snippet for the non-obvious grouping | repo (enricher habit, nothing to change) |
| 11 | low | protocol | ia: Acceptance logs via `acceptance.py --log` and `profile_run.sh suite/typecheck` all passed the worktree guard on the first try; no heredoc or command needed rewriting | None | — |
| 12 | low | Navigation | orchestrator: O rascunho do embed por idioma estava só na árvore de trabalho; guardei-o como `.impl/<slug>/draft-embed.patch` para o enricher. Funcionou, mas não há lugar previsto para "rascunho do dono" no fluxo. | `SKILL.md` fase 1: quando `ENV FAILED` por mudanças locais, oferecer salvar o diff em `.impl/<slug>/draft.patch` e citá-lo ao enricher. | owner (plugin wh) |
| 13 | low | Automatic check | orchestrator: `lane_prompt.sh --qa` em modo final imprimiu "Diff base: main", mas a principal é `master`; o QA final teve de deduzir a base pelo BOARD. | `lane_prompt.sh`: ler `_common § Git` (main) em vez do literal `main`. | owner (plugin wh); também visto pelo qa-final |
| 14 | low | Tool economy | orchestrator, rodape, qa-final: o stop do perfil `pkill -f "vite --port <porta>"` casa com o próprio shell e sai 144. | `_common.md` § Toolchain e `implementation.md` § Disposable service: `pkill -f "[v]ite --port <porta>"`. | repo (profile; aplicado) |
| 15 | low | guard | projetos: `cd <wt> && sed ... && /usr/bin/git -C . diff` refused ("directory computed at runtime"): a relative `-C .` counts as computed even after `cd` | `.claude/profile/implementation.md` § Worktree commands: add "git -C takes the absolute worktree path, never `.`" | repo (profile; aplicado) |
| 16 | low | lane file | projetos: Item 8 Acceptance says "clone only if the guard refuses", but `acceptance.py` ran the `git grep` in the worktree with exit 0; the extra in-worktree commands were redundant | enricher template: mark "clone only" only after the guard actually refused that command once | owner (plugin) |
| 17 | low | lane file | projetos: Lane gave exact strings, file:line anchors and the draft patch; all 5 items went through with no consultation | keep: the literal content + anchors pattern worked well | — |
| 22 | low | script | rodape: `profile_run.sh health` right after starting vite in the background returned exit 7 (not ready yet); a second plain curl a moment later gave 200 | `ENVIRONMENT.md` § Disposable service: note that health may need a retry after start, or make `profile_run.sh health` retry for a few seconds | owner, outside the repo |
| 23 | info | workflow | rodape: Lane was small and fully specified (exact texts, tests, CSS width rule); no consultation needed; 3 items, all Acceptance green at first run | none | — |
