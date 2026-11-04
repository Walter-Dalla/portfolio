# Perfil do /wh:deploy

## Alvo
GitHub Pages: `https://walter-dalla.github.io/portfolio/` (sem domínio próprio) [dono]
Site estático (SPA Vite) servido em `/portfolio/`; `base` em `vite.config.js` e `basename` do router em `src/main.jsx` [vite.config.js]
Orquestra: GitHub Actions, `.github/workflows/ci.yml`, job `deploy` [ci: ci.yml]

## Acesso
Agente: `gh` autenticado como `Walter-Dalla` (repo, Actions, Pages API); nenhum servidor [gh auth status]

## Artefato
`dist/` + `dist/404.html` (cópia do `index.html`, fallback da SPA), enviado como artifact de Pages pelo `actions/upload-pages-artifact@v3` [ci: ci.yml]
Sem registro nem tag: cada deploy é o commit da `master` [ci: ci.yml]
Assets fora do bundle: só o que está em `public/` (favicon, `public/cv/*.pdf`) [vite.config.js]

## Pré-condições
Pages ligado com `build_type: workflow`: `gh api repos/Walter-Dalla/portfolio/pages -q .build_type` → `workflow` [gh api]
Mudança mergeada na `master` (`_comum § Git`); o deploy só roda em push na `master` [ci: ci.yml]
CI local verde: `npm run lint && npm test && npm run build` [package.json]

## Publicar
Push/merge na `master` dispara `CI` (lint, test, build, upload) e `deploy` (~1 min) [ci: ci.yml]
Acompanhar: `gh run list --workflow CI --branch master -L 1` e `gh run watch <id> --exit-status` [gh]
Reexecutar sem novo commit: `gh run rerun <id>` [gh]

## Atualizar
Agente: automático pelo job `deploy` (`actions/deploy-pages@v4`, ambiente `github-pages`) [ci: ci.yml]

## Verificar
`curl -s -o /dev/null -w "%{http_code}" https://walter-dalla.github.io/portfolio/` → `200` [inferido]
`curl -s https://walter-dalla.github.io/portfolio/ | grep -o '/portfolio/assets/index-[^"]*\.js'` → mesmo hash do `dist/index.html` do commit [inferido]
`curl -s -o /dev/null -w "%{http_code}" https://walter-dalla.github.io/portfolio/cv/walter-dalla-cv-en.pdf` → `200` [inferido]
Rota profunda `https://walter-dalla.github.io/portfolio/curriculo` → `404` com o HTML do app (renderiza no navegador) [inferido]

## Falhas
Página em branco, assets 404 → `base` diferente de `/portfolio/` → conferir `vite.config.js` [inferido]
Rota profunda mostra 404 do GitHub → falta `404.html` no artifact → passo `cp` do `ci.yml` [inferido]
Job `deploy` `Branch "x" is not allowed to deploy` → regra do ambiente `github-pages` → Settings › Environments (dono) [inferido]
Site antigo após deploy verde → cache do CDN do Pages (até ~10 min) → esperar e refazer o `curl` [inferido]

## Rollback
`git revert <sha> && git push` na `master` (novo deploy) ou `gh run rerun <id>` de um run antigo do `CI` na `master` [inferido]

## Backup
— (site estático; fonte é o git) [inferido]

## Segredos
— (o deploy usa o `GITHUB_TOKEN`/OIDC do Actions; nenhum segredo próprio) [ci: ci.yml]

## Configurações externas
— (sem DNS nem CDN próprios) [dono]

## Clientes extras
—

## Setup inicial
2026-11-04: `gh api -X POST repos/Walter-Dalla/portfolio/pages -f build_type=workflow` [gh api]
