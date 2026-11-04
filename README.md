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
| Patente, diplomas, comprovantes | `src/content/achievements.js` |
| Texto pessoal, fatos rápidos, galeria, história | `src/content/about.js` |

## Publicar

Publicado no GitHub Pages: https://walter-dalla.github.io/portfolio/

Todo push na `master` roda `.github/workflows/ci.yml` (lint, testes, build) e, se passar,
publica `dist/`. O build usa `base: '/portfolio/'` (`vite.config.js`); caminhos de `public/`
no conteúdo (ex.: `/cv/...`, `/img/...`) ganham esse prefixo sozinhos. Como é uma SPA, o CI
copia `index.html` para `404.html` para as rotas diretas (`/curriculo`…) funcionarem.
