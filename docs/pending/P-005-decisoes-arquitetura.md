---
id: P-005
status: open
created: 2026-11-10
related: [P-006, P-007, P-013]
---

# Bloco "Decisões de arquitetura" (ADR curto) na página do projeto

## Problem
"Bloco "Decisões de arquitetura" em `ProjectDetail`, estilo ADR curto: 3 a 5 cartões por projeto com decisão, alternativa descartada e trade-off. Novo campo em `src/content/projects.js` (e em `simpleProject`); o conteúdo sai dos parágrafos `about` atuais. Piloto: KittyCafé e Cartas Malfaladas."

## Strategy
1. Novo campo em `src/content/projects.js` e em `simpleProject`, bilíngue `{ pt, en }`, vazio esconde o bloco.
2. Bloco em `ProjectDetail` com 3 a 5 cartões: decisão, alternativa descartada, trade-off.
3. Conteúdo tirado dos parágrafos `about` atuais (só reorganiza o que já existe).
4. Piloto: KittyCafé e Cartas Malfaladas.

## Locations
- `src/content/projects.js:27-66` (`simpleProject`) — receber e repassar o campo novo [code src/content/projects.js:27-66]
- `src/content/projects.js:330-364` — Cartas Malfaladas, `about` como fonte [code src/content/projects.js:330-331]
- `src/content/projects.js:365-408` — KittyCafé, `about` como fonte [code src/content/projects.js:365-366]
- `src/pages/ProjectDetail.jsx:55-82` — corpo do artigo, onde o bloco entra (numeração `project__num`) [code src/pages/ProjectDetail.jsx:55-82]
- `src/pages/ProjectDetail.jsx:59,71` — a numeração das seções (`i + 1`, galeria = `sections.length + 1`) vira um contador único [code src/pages/ProjectDetail.jsx:59,71]
- `src/pages/project-detail.css:67-78` (`.project__section`) — estilo dos cartões ao lado [code src/pages/project-detail.css:67-78]
- `src/i18n/strings.js:80-84` — título do bloco e rótulos PT/EN junto dos textos de Projetos [code src/i18n/strings.js:80-84]
- O `about` sustenta 3 cartões no KittyCafé e 4 na Cartas Malfaladas com decisão e consequência; alternativa descartada só em 1 dos 7 ("não roda nada em segundo plano") e trade-off em nenhum [code src/content/projects.js:341,378]

## Code references
- `simpleProject` `src/content/projects.js:27` [code src/content/projects.js:27]
- `Project` `src/pages/ProjectDetail.jsx:24` [code src/pages/ProjectDetail.jsx:24]

## Other references
- docs/PENDENCIAS.md § Estrutura dos projetos [doc docs/PENDENCIAS.md]
- `docs/features/projetos.md` [doc docs/features/projetos.md]

## Open questions
- Os cartões ficam no corpo do texto (como seção numerada) ou num bloco próprio fora da numeração (decisão técnica/visual). → seção numerada no corpo, depois do texto e antes da galeria (enricher, decisão técnica, 2026-11-10)
- O `about` não traz alternativa descartada (só 1 de 7) nem trade-off: os cartões saem com decisão + consequência e os dois campos opcionais, o dono dita os textos agora, ou o item sai desta execução? → cartões com decisão + consequência; alternativa e trade-off opcionais, mostrados só quando preenchidos; os textos que faltam viram pendência nova (owner, 2026-11-10)
