# Glossário — linguagem do site ↔ linguagem do código

## Páginas

| Negócio | Código | Evite / nota |
|---|---|---|
| Início (home) | `Home`, rota `/` | |
| Currículo | `Resume`, rota `/resume` | "CV" só para o PDF |
| Projetos | `Projects`, rota `/projects` | |
| Projeto (estudo de caso) | `ProjectDetail`, rota `/projects/:slug` | |
| Como trabalho com IA | `Ai`, rota `/ai` | |
| Conquistas | `Achievements`, rota `/achievements` | "prêmios" (é só um tipo de conquista) |
| Sobre mim | `About`, rota `/about` | |
| Contato | `Contact`, rota `/contact` | "formulário" (não há formulário) |

## Conteúdo

| Negócio | Código | Evite / nota |
|---|---|---|
| Experiência (item da linha do tempo) | `experiences` | pode ser um grupo de vínculos |
| Licenças e certificados | `credentials` | lista completa no `/resume`, atrás de "mostrar mais" |
| Bullet só da página IA | `aiOnly` (em `experiences[].bullets[]`) | aparece em `/ai`, não no `/resume` |
| Vínculo (cargo dentro de um grupo) | `experiences[].positions`, `Position` | "experiência" para o cargo de dentro do grupo |
| Habilidades / stack | `skillGroups` | |
| Métricas de impacto | `metrics` | |
| Projeto em destaque | `projects[].featured` | |
| Resumo do projeto (problema, o que fiz, resultado) | `projects[].brief` | |
| Decisões de arquitetura (cartões) | `projects[].decisions`, `Decisions` | "ADR" só como referência ao formato |
| Diagrama de arquitetura | `diagrams`, `ArchDiagram` | |
| Números de engenharia da ficha | `facts.commits`, `facts.tests`, `facts.mutation` (`numbers` de `simpleProject`) | |
| Categoria de projeto (filtro) | `projectCategories` | |
| Conquista em destaque | `featuredAchievement` | |
| Fatos rápidos | `about.facts` | |
| PDF do currículo | `resumePdf`, `public/cv/` | |

## Interface

| Negócio | Código | Evite / nota |
|---|---|---|
| Tema claro/escuro | `ThemeProvider`, `useTheme`, `data-theme` | "dark mode" só no tema escuro |
| Idioma PT/EN | `LanguageProvider`, `useI18n`, `strings` | |
| Cabeçalho / navegação | `Header`, `NAV_ITEMS` | fixo ao rolar; menu no celular |
| Rodapé | `Footer` | "Fale comigo", nome e local; sem navegação nem © |
| Visualizador de imagem (ampliar) | `Lightbox`, `useLightbox`, `Zoom` | |
| Botão copiar e-mail | `CopyButton` | |
| Voltar ao topo | `BackToTop` | |
| Prévia do link (LinkedIn, WhatsApp) | tags Open Graph em `index.html`, `public/og.png` | |

## Armadilhas

| No código | Significa | Por quê |
|---|---|---|
| `t(chave)` | texto de interface (`src/i18n/strings.js`) | conteúdo usa `l(valor)` com `{ pt, en }` em `src/content/` |
| campo `null` no conteúdo | bloco não aparece na página | o design tem placeholders (`[FOTO]`) que não vão para produção |
| `Media` sem `src` | bloco decorativo no lugar da foto | mostra um rótulo, nunca o texto do placeholder |
| rota `/projects`, `/resume`… | caminho da página, igual em PT e EN | os antigos (`/projetos`, `/curriculo`…) só existem como redirect em `LEGACY_PATHS`; não use em links |
| `slug` de projeto | id em inglês, ex.: `insect-behavioral-analysis` | slug renomeado entra em `LEGACY_PROJECT_SLUGS` para o link antigo continuar valendo |
