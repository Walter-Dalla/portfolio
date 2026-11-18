# Pendências do site (P-017, P-018, P-021, P-032) · 2026-11-12 · impl/pendencias-site · PR on GitHub
Quatro pendências do dono feitas no repo: disponibilidade e botão "fale comigo →" no hero (P-017); faixa "Onde atuei" (P-018); alternativa descartada e trade-off nos 7 cartões de decisão, textos aprovados pelo dono (P-021); na página do projeto, navegação depois do embed e embed até 1284px (P-032). P-030 (conferido ao vivo pelo dono) e P-031 (formato do Atom confirmado) fecham sem código.
Lanes: — (tarefa pequena, inline): 5 itens, commits 1 a 5 de `pendencias-site-N`.

## Errors
— (nenhum: Aceites verdes, sem conflito; suíte 30 arquivos/208 testes, lint e build verdes na ponta 6dcf19a)

## Open items
- Fora desta execução (continuam abertas, sem mudança): P-002 (repo wh-harness), P-008 a P-012 (entrevista guiada), P-016, P-019, P-020, P-022 (material do dono).
- P-021: 5 das 7 alternativas foram inferidas pelo enricher (nenhum doc dos repos as afirma); o dono aprovou como escritas. Vale reler na página `/projects/kittycafe` e `/projects/cartas-malfaladas`.
- Faixa do embed: entre ~1241 e ~1351px de janela o fluxo continua em 2 colunas (não cabe com as margens de 48px).
- QA visual não conferido: tema escuro, `/projects/wh-harness` em 390x844 e a medida exata de 1284px (julgada a olho em 1440).

## Consultations
— (no consultation)

## QA
| Id | Type | Severity | Where | Evidence | Fix |
|---|---|---|---|---|---|
— (QA final sem achados: gates sobre o diff inteiro, suíte, lint e prints de `/` em 1440 e 390 e `/projects/wh-harness` em 1440)

## Problems found
- A branch `impl/pendencias-site` já existia de uma execução antiga (já mergeada); o worktree nasceu nela e foi avançado por fast-forward para a `master`.
- `docs/pending/` é rastreado pelo git, mas a skill o trata como local; as edições não commitadas do dono foram escondidas com skip-worktree durante a execução (retro 1).

## Cost
| Agent | Model | Requests | Input | Cache write | Cache read | Output | Share |
|---|---|---|---|---|---|---|---|
| orchestrator (main session) | claude-opus-5-5 | 51 | 102 | 161513 | 5940394 | 25862 | 54% |
| wh:impl-enrich · Enrich pending items analysis | claude-fable-5-2 | 31 | 64 | 143721 | 2905610 | 43243 | 41% |
| wh:impl-qa · Final QA of pendencias-site | claude-sonnet-5-5 | 12 | 28 | 40348 | 320797 | 4031 | 5% |
| Total | | 94 | 194 | 345582 | 9166801 | 73136 | 100% |

## Consolidated retro
| # | Severity | Category | Evidence (lanes) | Proposal | Who applies |
|---|---|---|---|---|---|
| 1 | high | Steering doc | orchestrator: `docs/pending/` is tracked in this repo, but the skill assumes the pending folder is gitignored. Owner's uncommitted pending edits made `impl_env.sh` fail (`clone has local changes`), then `git pull --ff-only` failed on `docs/PENDENCIAS.md`. Workaround: skip-worktree plus `.git/info/exclude`. | Owner decision: either untrack `docs/pending/` + `docs/PENDENCIAS.md` (gitignore), or set `_common § Pending` to say the folder is tracked and closing = delete the file in the PR. | owner |
| 2 | high | Automatic check | orchestrator: Pending id collision: a local untracked P-023 clashed with the remote's P-023..P-029 from another session; renumbered by hand to P-032. `intake.sh --next` only sees local + history. | `intake.sh`: fetch the remote and count `origin/<main>` pending ids before giving `--next`; warn when a local untracked P-NNN exists in `origin/<main>` history. | owner (wh-harness) |
| 3 | medium | Automatic check | orchestrator: `impl_env.sh` reused an existing `impl/pendencias-site` branch from an older, already-merged run (worktree at 1b9ae56, behind master); I found it only when a test file was missing, then fast-forwarded. | `impl_env.sh`: if `impl/<slug>` exists, refuse unless it is an ancestor of `<main>` and fast-forward it; print `REUSED BRANCH` either way. | owner (wh-harness) |
| 4 | low | Automatic check | orchestrator: `lane_prompt.sh ... final` printed `Diff base: main` although the main branch is `master`; corrected by hand in the QA prompt. | `lane_prompt.sh`: read `<main>` from the profile/env instead of the literal `main`. | owner (wh-harness) |
| 5 | low | Tool economy | orchestrator: Final QA did not run dark theme nor `/projects/wh-harness` at 390, and did not measure the 1284px width (judged by eye). | Profile § Visual QA: list the exact (route, size, theme) matrix of touched areas so the QA cannot drop combos silently. | repo · applied (profile § Visual or e2e QA) |
