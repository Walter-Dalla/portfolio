---
aliases: [Cabeçalho, Navegação, Rodapé, Rotas]
---

# Layout do site

Moldura comum: cabeçalho com navegação e toggles, rodapé, rotas e página 404. As rotas são em inglês nos dois idiomas; os caminhos antigos em português redirecionam para elas.

## Símbolos de entrada

`App`, `LEGACY_PATHS`, `LEGACY_PROJECT_SLUGS`, `LegacyProjectRedirect` (`src/App.jsx`), `Layout`, `Header`, `Footer` (`src/components/`), `NotFound`, `usePageTitle`.

## Interações

- [tema-idioma.md](tema-idioma.md): `Header` usa `useTheme` e `useI18n`.
- [seo.md](seo.md): no GitHub Pages, rota desconhecida e caminho antigo caem no `404.html` gerado pelo pré-render; cada rota pública tem seu `.html`.
