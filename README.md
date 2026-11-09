# Portfólio — Walter Dalla

Site de portfólio de Walter Dalla Torre Neto: início, currículo, projetos (com estudos de caso),
conquistas, sobre e contato. Tema escuro/claro e idioma PT/EN. Só frontend: SPA estática.

Stack: React 19, React Router 8, Vite 8, Vitest + Testing Library, ESLint.

## Rodar

Requer Node ≥ 22.12.

```bash
npm install
npm run dev       # http://localhost:3000
npm test          # testes (Vitest)
npm run lint      # ESLint
npm run build     # produção em dist/
npm run preview   # serve o build em http://localhost:4173
```

## Editar o conteúdo

Todo o texto do site mora em `src/content/` (conteúdo, `{ pt, en }`) e `src/i18n/strings.js`
(textos de interface). Campos `null` ou listas vazias não aparecem na página: preencha-os para
fazer o bloco surgir.

| O quê | Onde |
|---|---|
| Foto do retrato, disponibilidade, PDFs do currículo | `src/content/profile.js` (arquivos em `public/`) |
| Experiências e habilidades | `src/content/experiences.js` |
| Projetos, capas, estudos de caso, galeria | `src/content/projects.js` |
| Conquistas, diplomas, comprovantes | `src/content/achievements.js` |
| Texto pessoal, fatos rápidos, galeria, história | `src/content/about.js` |
| Prévia do link ao compartilhar (título, descrição, imagem 1200×630) | `index.html` (tags `og:`/`twitter:`) e `public/og.png` |

## Publicar

Publicado no GitHub Pages com domínio próprio: https://walterdalla.uk/ (o domínio fica em `public/CNAME`).

Todo push na `master` roda `.github/workflows/ci.yml` (lint, testes, build) e, se passar,
publica `dist/`. O build usa `base: '/'` (`vite.config.js`); caminhos de `public/`
no conteúdo (ex.: `/cv/...`, `/img/...`) passam por `assetUrl` e acompanham o `base` se ele mudar. Como é uma SPA, o CI
copia `index.html` para `404.html` para as rotas diretas (`/resume`…) funcionarem.
