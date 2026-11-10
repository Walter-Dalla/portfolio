# Currículo: CV novo e experiências agrupadas por vínculo · 2026-11-10 · impl/curriculo-vinculos · PR no GitHub

As pendências de `docs/PENDENCIAS.md`: `/resume` passa de 6 para 4 entradas — a empresa PJ (AgileEngine + Qyon), BTG Pactual e Act Digital (um bloco), Linx e Ez.Devs, Assertiva —, com título, período e nota próprios de cada grupo e o texto do CV em cada cargo; texto sincronizado com o CV novo (1º bullet PT do BTG e formação); PDFs de `public/cv/` trocados. A pedido do dono ("tudo"), o QA final cobriu também a página do fluxo do wh-harness (PR #42, já na `master`).
Execução inline (tarefa pequena), 5 itens: `curriculo-vinculos-1` a `-5`, mais 4 correções do QA e os commits de docs.

## Errors
Nenhum. Suíte (77 testes), lint e build verdes na ponta; aceites dos 5 itens verdes (`cvdiff.mjs`: `miss 0 · positions 6 · entries 4`).

## Open items
- Decisão do enricher, não perguntada: o card da Home passou de "6 experiências desde 2018" para "6 cargos desde 2018" (a linha do tempo tem 4 entradas). Alternativa: manter "experiências". → `src/i18n/strings.js` `exploreResume`
- `resumePdf.updated` não mudou: já `11/2026`.
- A sincronização seguiu os `.txt` do CV (o dono confirmou que batem com os PDFs); o texto dos PDFs não foi lido (sem `pdftotext`).
- `docs/PENDENCIAS.md` recebeu os achados da página do fluxo (QA-final-02, -03, -06, -10).
- Linhas `[inferred]` do profile continuam sem confirmação (21).

## Consultations
Nenhuma (tarefa inline). O enricher da análise morreu num restart de sessão; um segundo enricher planejou a partir do `ANALYSIS.md` com as respostas Q1–Q5 do dono.

## QA
Final (Gates: yes) e um reteste. Corrigidos e retestados: QA-final-01 (medium, fora do diff: `.claude/perfil/` → `.claude/profile/` no texto do wh-harness, `4fda667`), QA-final-04 (low, fora do diff: nota do bloco SEO aparecia no `npm run dev`, `123a934`), QA-final-05 (low: rótulo genérico do botão de `demoUrl`, `152d2fc`), QA-final-08 (low: separador dos vínculos na largura do texto, `33fb7e3`). Corrigidos nos docs de fechamento: QA-final-07, QA-final-09 (`28925ea`). Registrados para o dono: QA-final-02, -03, -06, -10 (→ `docs/PENDENCIAS.md`). Visual: 24 prints de `/resume`, `/`, `/projects/wh-harness` e `flow.html`, desktop e mobile, claro e escuro, sem erro de console nem rolagem horizontal.

## Problems found
- PR #42 (página do fluxo) entrou na `master` sem este processo; os achados dele estão acima, marcados "fora do diff".

## Consolidated retro
| # | Severity | Category | Evidence (lanes) | Proposal | Who applies |
|---|---|---|---|---|---|
| 1 | medium | Automatic check | enricher: `cvdiff.mjs` comparava por substring e deixou passar a formação (`miss 2` → `miss 6` comparando linha inteira) | regra do `impl-enrich` (analyze): comparação de campo inteiro; o que o script não cobre vira Acceptance própria | repo (plugin) |
| 2 | medium | Information access | orquestrador, enricher: PDFs fora do repo (`/mnt/c/...`), copiados à mão para `.impl/`; sem `pdftotext` | `_common.md` § Toolchain: fonte do CV = `.txt` ao lado do PDF, ou instalar `poppler-utils` | owner |
| 3 | medium | Steering doc | enricher: perguntas Q1–Q5 não persistidas no `ANALYSIS.md`; orquestrador: restart matou o enricher | `impl-enrich` (analyze): seção `Questions` no `ANALYSIS.md` antes de responder | repo (plugin) |
| 4 | medium | Tool economy | enricher, QA: o hook RTK reescreveu `cat` e o auto mode recusou; `pkill -f "vite --port"` matou o próprio shell (QA, orquestrador) | `ENVIRONMENT.md` § RTK: ler com `Read`; `_common.md` § Toolchain: parar o vite por PID (`pgrep -f "vite --port <porta>" \| grep -v $$`) | repo (plugin) / owner |
| 5 | medium | Steering doc | orquestrador: o 1º run parou nas pré-condições (branch de feature, docs não commitados) | `implementation/SKILL.md` §1: caminho "stash → env → aplicar no INTWT como 1º commit" | repo (plugin) |
| 6 | low | Navigation | enricher: worktree sem `node_modules`, só descoberto medindo | profile § Worktree commands — **applied** neste commit | repo |
