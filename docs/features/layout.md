---
aliases: [Cabeçalho, Navegação, Rodapé, Rotas]
---

# Layout do site

Moldura comum: cabeçalho com navegação e toggles, rodapé, rotas e página 404. A navegação tem 6 itens (Início, Currículo, Projetos, IA, Sobre, Contato); Conquistas (`/achievements`) mantém a rota, mas fica fora do menu e dos atalhos do Início (chega-se pelos links do Sobre); "IA"/"AI" leva a `/ai`. As rotas são em inglês nos dois idiomas; os caminhos antigos em português redirecionam para elas.

- O cabeçalho é fixo ao rolar (`position: sticky`, fundo translúcido). Abaixo de 760px a navegação vira um menu (`menu-toggle`, `aria-expanded`) que fecha ao trocar de rota ou com Esc; os itens vêm de `NAV_ITEMS` (`src/components/nav.js`). A marca nunca quebra nem encolhe; quando a navegação ocupa a linha toda (de 760px a ~930px), os botões de idioma e tema descem para a linha de baixo, alinhados à direita.
- Classes comuns de interação em `global.css`: `.chips`/`.chip` (filtros em pílula de Projetos), realce de `.btn` e `.link` ao passar o mouse e `.reveal` (entrada do bloco ao rolar).
- `useScrollRestoration`: rota nova abre no topo, ou na âncora quando o link traz uma (`/projects/<slug>#architecture`; vale também na primeira carga); "voltar"/"avançar" restaura a posição; trocar só a query (`?cat=`) não rola.
- Ordem do CSS: `global.css` é importado antes do `App` (`src/main.jsx`, `src/entry-server.jsx`), então o CSS do componente vence um empate de especificidade com uma classe comum (`.page`, `.card`, `.media`, `.grid`); há teste (`src/css-order.test.jsx`).
- `BackToTop`: botão "↑" que aparece após rolar uma tela.
- Rodapé, de cima para baixo: bloco "Fale comigo" / "Get in touch" (`h2`; e-mail, `in/walter-dalla` e `Walter-Dalla` por extenso, de `profile`, com `CopyButton` ao lado do e-mail), nome e local e o colofão (`.site-footer__colophon`): "Como este site é feito →", que abre `/projects/portfolio` (projeto fora da lista), e "código ↗", o repositório; sem navegação e sem ©. No Início, com `company`, o bloco "Fale comigo" some porque o cartão da empresa logo acima mostra os mesmos contatos.
- `CopyButton`: copia um texto (e-mail) e confirma por dois segundos; usado em Contato, no rodapé e no cartão da empresa no Início. Largura estável: rótulo e "copiado ✓" ocupam a mesma célula do grid (`button.copy-btn`); a classe `copy-link` dá a cara de link no rodapé e no Início.
- `Lightbox` + `useLightbox` + `Zoom`: visualizador de imagens em tela cheia (Esc, ← →), usado nas galerias.
- A 404 oferece atalhos para Projetos, Currículo e Contato.
- `index.html` traz as tags Open Graph/Twitter (prévia do link; imagem em `public/og.png`), `theme-color` e `apple-touch-icon`.

## Símbolos de entrada

`App`, `LEGACY_PATHS`, `LEGACY_PROJECT_SLUGS`, `LegacyProjectRedirect` (`src/App.jsx`), `Layout`, `Header`, `Footer`, `NAV_ITEMS`, `BackToTop`, `CopyButton`, `Lightbox`, `useLightbox`, `Zoom`, `useScrollRestoration` (`src/components/`), `NotFound`, `usePageTitle`.

## Interações

- [tema-idioma.md](tema-idioma.md): `Header` usa `useTheme` e `useI18n`.
- [arquitetura.md](arquitetura.md): os links do Início para a arquitetura de um projeto dependem da rolagem até a âncora.
- [seo.md](seo.md): no GitHub Pages, rota desconhecida e caminho antigo caem no `404.html` gerado pelo pré-render; cada rota pública tem seu `.html`.
