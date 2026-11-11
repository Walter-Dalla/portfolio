# Pendências

Tarefas em aberto do dono do site. Ao concluir, apague o item.

## Página do fluxo do wh-harness (`public/wh-harness/flow.html`)

Achados do QA de 2026-11-10 (relatório `docs/relatorios/2026-11-10-curriculo-vinculos.md`), decisão do dono:

- A página só existe em português, mas o site abre em inglês: fazer uma versão EN que siga a escolha `wd-lang` (QA-final-02).
- No celular, os rótulos do mapa ficam com ~7 px e as linhas do painel "Arquivos" são cortadas à direita sem sinal de rolagem (QA-final-03).
- No celular, o botão "Ver a demonstração interativa" fica no fim da página de `/projects/wh-harness`; e em PT ele quebra em duas linhas no card lateral do desktop — manter ou trocar por um rótulo curto, ex.: "Ver demo" (QA-final-06, QA-final-10).

## Destaques do Início ("Coisas que eu construí" / "Things I built")

- Pôr wh-harness (`slug: 'wh-harness'`) e Nesse Capítulo (`slug: 'nesse-capitulo'`) como projetos em destaque: `featured: true` em `src/content/projects.js`. Hoje os destaques são a Ferramenta de Análise Comportamental de Insetos e o KittyCafé — decidir se saem ou se ficam os quatro.

## Melhorias de engajamento (análise de 2026-11-10)

Ordem sugerida: estrutura dos projetos → casos profissionais → diagramas → itens que dependem de material do dono.

### Estrutura dos projetos (só reorganiza conteúdo que já existe)

- Bloco "Decisões de arquitetura" em `ProjectDetail`, estilo ADR curto: 3 a 5 cartões por projeto com decisão, alternativa descartada e trade-off. Novo campo em `src/content/projects.js` (e em `simpleProject`); o conteúdo sai dos parágrafos `about` atuais. Piloto: KittyCafé (`slug: 'kittycafe'`) e Cartas Malfaladas (`slug: 'cartas-malfaladas'`).
- Resumo no topo de cada projeto: três bullets (problema, o que fiz, resultado) antes do texto.
- Ficha técnica expandida (`facts`): números de engenharia por projeto — testes, testes de mutação, commits, uptime. Cartas Malfaladas e KittyCafé já têm esses números no campo `ai`.

### Estudos de caso profissionais

- Três páginas novas em `src/content/projects.js`, anonimizadas onde houver NDA, com contexto, restrições, opções consideradas, decisão, resultado medido e diagrama antes/depois:
  - Qyon: consolidação de 8 microsserviços em 1 (Strategy e Template Method, .NET Core 3.1 → .NET 10).
  - Qyon: redesenho do processamento com RabbitMQ Shovel para o cliente de volume 2×.
  - BTG Pactual: latência P95 do antifraude do PIX (~7s → ~4,5s).
- Métricas do Início clicáveis: cada item de `metrics` (`src/content/profile.js`) leva ao estudo de caso que o explica. Depende do item acima.
- Decidir a categoria desses casos em `projectCategories` (ex.: "profissional") e se entram nos destaques do Início.

### Diagramas e processo

- Diagrama de arquitetura por projeto, em SVG com tema claro/escuro (componentes e fluxo de dados). Começar por Homelab (rede e túnel; também serve de capa, hoje sem `cover`), KittyCafé e Cartas Malfaladas.
- Seção "Como eu planejo": solicitação → análise → plano em faixas → QA → retrospectiva, com artefatos reais (um plano numerado e um relatório de `docs/relatorios/`).
- Página ou bloco "Como trabalho com IA", reunindo o que hoje está espalhado nos campos `ai` dos projetos (harness, regras adotadas por 20+ devs).

### Dependem de material do dono

- Foto do hero: preencher `profile.photo` (retrato 4:5 em `public/img/`).
- Disponibilidade: preencher `profile.availability` (ex.: aberto a propostas · remoto · PJ/CLT) e deixar a chamada para contato visível no hero.
- Faixa "Onde atuei" abaixo do hero: BTG Pactual, Qyon, AgileEngine, UNICAMP (conferir se os logos podem ser usados; senão, só os nomes).
- Comprovantes: preencher os `proofUrl` em `src/content/achievements.js` (diploma UNESP, COTIL, certificações).
- Depoimentos: uma ou duas citações de colegas ou do orientador do TCC, com autorização.
