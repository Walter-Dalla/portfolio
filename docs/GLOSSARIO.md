# Glossário — linguagem do site ↔ linguagem do código

## Páginas

| Negócio | Código | Evite / nota |
|---|---|---|
| Início (home) | `Home`, rota `/` | |
| Currículo | `Resume`, rota `/curriculo` | "CV" só para o PDF |
| Projetos | `Projects`, rota `/projetos` | |
| Projeto (estudo de caso) | `ProjectDetail`, rota `/projetos/:slug` | |
| Conquistas | `Achievements`, rota `/conquistas` | "prêmios" (é só um tipo de conquista) |
| Sobre mim | `About`, rota `/sobre` | |
| Contato | `Contact`, rota `/contato` | "formulário" (não há formulário) |

## Conteúdo

| Negócio | Código | Evite / nota |
|---|---|---|
| Experiência (item da linha do tempo) | `experiences` | |
| Habilidades / stack | `skillGroups` | |
| Métricas de impacto | `metrics` | |
| Projeto em destaque | `projects[].featured` | |
| Categoria de projeto (filtro) | `projectCategories` | |
| Conquista em destaque (patente) | `featuredAchievement` | |
| Fatos rápidos | `about.facts` | |
| PDF do currículo | `resumePdf`, `public/cv/` | |

## Interface

| Negócio | Código | Evite / nota |
|---|---|---|
| Tema claro/escuro | `ThemeProvider`, `useTheme`, `data-theme` | "dark mode" só no tema escuro |
| Idioma PT/EN | `LanguageProvider`, `useI18n`, `strings` | |
| Cabeçalho / navegação | `Header` | |
| Rodapé | `Footer` | |

## Armadilhas

| No código | Significa | Por quê |
|---|---|---|
| `t(chave)` | texto de interface (`src/i18n/strings.js`) | conteúdo usa `l(valor)` com `{ pt, en }` em `src/content/` |
| campo `null` no conteúdo | bloco não aparece na página | o design tem placeholders (`[FOTO]`) que não vão para produção |
| `Media` sem `src` | bloco decorativo no lugar da foto | mostra um rótulo, nunca o texto do placeholder |
