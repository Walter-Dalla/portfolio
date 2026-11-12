---
id: P-022
status: open
created: 2026-11-11
related: [P-007]
---

# Uptime na ficha técnica dos projetos em produção

## Problem
P-007 pedia uptime entre os números de engenharia, mas nenhum número de uptime existe no conteúdo (o KittyCafé só diz "em produção desde setembro de 2026"). A linha ficou fora para não inventar métrica. Depende de material do dono: o número medido e a fonte (ex.: monitor do Homelab).

## Strategy
1. O dono informa o uptime medido (período e fonte) dos projetos em produção (KittyCafé, GoPrint).
2. Novo campo `facts.uptime` em `simpleProject({ numbers })`, rótulo `factUptime` em `strings.js` e uma linha `Fact` ao lado de `factCommits`.

## Locations
- `src/pages/ProjectDetail.jsx:207` — linhas da ficha com números [code src/pages/ProjectDetail.jsx:207]
- `src/i18n/strings.js:82` — rótulos `fact*` [code src/i18n/strings.js:82]

## Code references
- `simpleProject` `src/content/projects.js` [code src/content/projects.js]

## Other references
- docs/relatorios/2026-11-11-pendencias.md [doc]

## Open questions
—
