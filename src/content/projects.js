// Projetos: a lista alimenta Início (os `featured`), Projetos e a página de cada projeto.
// Campos `null` não aparecem. `sections` é o estudo de caso; seção sem parágrafos nem passos não entra.
// Seção: { title, paragraphs } e, opcionais, `steps: [{ label, text }]` (lista numerada),
// `links: [{ href, label }]` (abrem em nova aba) e `excerpt: { caption, lines }` (trecho em fonte mono).
// Em `simpleProject`, `extraSections` entra depois das duas seções padrão.
// `role` (opcional em `simpleProject`): a linha "papel" da ficha. `links` (opcional em `simpleProject`): links da
// seção "O projeto", no formato de `links` de uma seção.
// `ai` (só em `simpleProject`): o texto de "Como foi feito com IA", também lido pela página /ai; null quando não há.
// `cover`: imagem 16:10 em public/, ex.: '/img/projects/<slug>/cover.webp'; o site recorta ao centro (21:9 no projeto, 16:9 no Início).
// `gallery`: [{ src, alt: { pt, en } }], imagens 4:3. `thesisUrl`: link do TCC (opcional).
// `demoUrl`: página que mostra o projeto funcionando (opcional; string ou `{ pt, en }`); URL externa abre em nova aba.
// `brief`: resumo em três tópicos no topo, { problem, action, result }, cada um { pt, en } ou null (opcional).
// `decisions`: decisões de arquitetura, [{ decision, why, alternative, tradeoff }]; `alternative` e `tradeoff`
// são opcionais (null ou ausentes não aparecem).
// `embedUrl`: página de outra origem embutida por iframe abaixo do estudo de caso (opcional; string ou `{ pt, en }`;
// protocolo em src/components/ProjectEmbed.jsx).
// `slug` é a URL (/projects/<slug>), em inglês; ao renomear, registre o antigo em LEGACY_PROJECT_SLUGS (src/App.jsx).

export const projectCategories = [
  { id: 'research', label: { pt: 'pesquisa', en: 'research' } },
  { id: 'dotnet', label: '.NET' },
  { id: 'databases', label: { pt: 'bancos de dados', en: 'databases' } },
  { id: 'ai', label: { pt: 'IA & agentes', en: 'AI & agents' } },
  { id: 'web', label: 'web' },
  { id: 'games', label: { pt: 'jogos', en: 'games' } },
  { id: 'infra', label: 'infra' },
]

// Projeto pessoal ainda sem estudo de caso completo: card, um parágrafo e, se houver, como foi feito com IA.
// `repo` só para repositórios públicos.
// Fluxo interativo do wh-harness: a fonte mora no repo dele (site/flow.html), publicada no GitHub Pages
// num caminho por idioma.
const WH_FLOW_URL = {
  pt: 'https://walter-dalla.github.io/wh-harness/pt/',
  en: 'https://walter-dalla.github.io/wh-harness/en/',
}

const IN_DEVELOPMENT = { pt: 'Em desenvolvimento', en: 'In development' }

function simpleProject({
  slug,
  title,
  period,
  kind,
  categories,
  summary,
  about,
  ai = null,
  tags,
  repo = null,
  featured = false,
  status = IN_DEVELOPMENT,
  client = null,
  cover = null,
  gallery = [],
  demoUrl = null,
  embedUrl = null,
  numbers = {},
  brief = null,
  decisions = [],
  extraSections = [],
  role = null,
  links = [],
}) {
  return {
    slug,
    title,
    period,
    kind,
    featured,
    categories,
    summary,
    lede: summary,
    ai,
    brief,
    tags,
    cover,
    repo,
    demoUrl,
    embedUrl,
    facts: { client, role, status, adoption: null, commits: null, tests: null, mutation: null, ...numbers },
    sections: [
      { title: { pt: 'O projeto', en: 'The project' }, paragraphs: [about], links },
      { title: { pt: 'Como foi feito com IA', en: 'How it was built with AI' }, paragraphs: ai ? [ai] : [] },
      ...extraSections,
    ],
    decisions,
    gallery,
  }
}

export const projects = [
  simpleProject({
    slug: 'wh-harness',
    title: 'wh-harness',
    period: { pt: '2026 – atual', en: '2026 – present' },
    kind: { pt: 'plugin · Claude Code', en: 'plugin · Claude Code' },
    categories: ['ai'],
    featured: true,
    summary: {
      pt: 'Plugin open source que leva uma tarefa de software da solicitação ao pull request (análise, plano, agentes em paralelo, QA, retrospectiva) em qualquer repositório.',
      en: 'Open-source plugin that takes a software task from request to pull request (analysis, plan, parallel agents, QA, retrospective) in any repository.',
    },
    about: {
      pt: 'A regra central é "a skill tem o procedimento, o perfil tem os fatos": o plugin guarda dez skills genéricas (implementation, adotar, deploy, qa-visual, retro, limpeza…), subagentes e um hook, e cada projeto guarda só os seus fatos — comandos, portas, glossário, mapa de features — em .claude/profile/. O /wh:implementation enriquece a tarefa, divide em faixas, roda cada faixa num subagente em worktree git própria, faz QA do código e final e abre o PR. Um hook em Python puro injeta em cada prompt ponteiros do glossário, do mapa de features e do índice CodeGraph. Foi extraído do KittyCafé e hoje roda também no GoPrint, no Nesse Capítulo e neste portfólio.',
      en: 'Its core rule is "the skill holds the procedure, the profile holds the facts": the plugin ships ten generic skills (implementation, adopt, deploy, visual QA, retro, cleanup…), subagents and a hook, and each project keeps only its facts — commands, ports, glossary, feature map — in .claude/profile/. /wh:implementation enriches the task, splits it into lanes, runs each lane in a subagent on its own git worktree, does code and final QA and opens the PR. A pure-Python hook adds pointers from the glossary, the feature map and the CodeGraph index to every prompt. It was extracted from KittyCafé and now also runs in GoPrint, Nesse Capítulo and this portfolio.',
    },
    ai: {
      pt: 'O harness foi construído com o próprio Claude Code e testado contra si mesmo: execuções headless do /wh:implementation num repositório de teste, com tempo, custo e commits medidos, geraram uma lista numerada de falhas, corrigidas em rodadas de revisão crítica em que eu defino os critérios e aprovo as correções. Todos os commits têm o Claude como coautor.',
      en: 'The harness was built with Claude Code itself and tested against itself: headless /wh:implementation runs on a test repository, with time, cost and commits measured, produced a numbered list of gaps, fixed in critical-review rounds where I set the criteria and approve the fixes. Every commit has Claude as co-author.',
    },
    tags: [{ label: 'Claude Code', accent: true }, { pt: 'Orquestração de agentes', en: 'Agent orchestration' }, 'Python'],
    repo: 'https://github.com/Walter-Dalla/wh-harness',
    demoUrl: WH_FLOW_URL,
    embedUrl: WH_FLOW_URL,
    numbers: { tests: '32' },
    brief: {
      problem: null,
      action: {
        pt: 'Plugin com dez skills genéricas, subagentes e um hook; cada projeto guarda só os seus fatos em .claude/profile/.',
        en: 'A plugin with ten generic skills, subagents and a hook; each project keeps only its facts in .claude/profile/.',
      },
      result: {
        pt: 'Extraído do KittyCafé, hoje roda também no GoPrint, no Nesse Capítulo e neste portfólio.',
        en: 'Extracted from KittyCafé, it now also runs in GoPrint, Nesse Capítulo and this portfolio.',
      },
    },
    extraSections: [
      {
        title: { pt: 'Como eu planejo', en: 'How I plan' },
        paragraphs: [],
        steps: [
          {
            label: { pt: 'Solicitação', en: 'Request' },
            text: {
              pt: 'O trabalho entra como uma lista de pendências numeradas.',
              en: 'Work comes in as a numbered punch list.',
            },
          },
          {
            label: { pt: 'Análise', en: 'Analysis' },
            text: { pt: 'O /wh:implementation enriquece a tarefa.', en: '/wh:implementation enriches the task.' },
          },
          {
            label: { pt: 'Plano em faixas', en: 'Plan in lanes' },
            text: {
              pt: 'Cada tarefa vira um plano com itens numerados, dividido em faixas; cada faixa roda num subagente em worktree git própria, com um commit por item.',
              en: 'Each task becomes a plan with numbered items, split into lanes; each lane runs in a subagent on its own git worktree, with one commit per item.',
            },
          },
          {
            label: 'QA',
            text: {
              pt: 'O harness faz QA do código e QA final e abre o PR.',
              en: 'The harness does code QA and final QA and opens the PR.',
            },
          },
          {
            label: { pt: 'Retrospectiva', en: 'Retrospective' },
            text: {
              pt: 'Cada execução termina numa retrospectiva, registrada no relatório.',
              en: 'Every run ends in a retrospective, recorded in the report.',
            },
          },
        ],
        links: [
          {
            href: 'https://github.com/Walter-Dalla/portfolio/blob/master/docs/relatorios/2026-11-10-curriculo-vinculos.md',
            label: { pt: 'relatório de uma execução (em português)', en: 'report of a run (in Portuguese)' },
          },
        ],
        excerpt: {
          caption: {
            pt: 'Trecho do plano que gerou esta seção (itens numerados)',
            en: 'Excerpt of the plan that produced this section (numbered items)',
          },
          // Literal do plano desta execução, em inglês nos dois idiomas.
          lines: [
            'pendencias-1 · Demo button at the top of the project page, short label "Ver demo" / "See demo"',
            'pendencias-2 · Notice that the interactive demo is in Portuguese only, shown when the site is in English',
            'pendencias-3 · Engineering numbers in the fact sheet (commits, tests, mutation tests)',
            'pendencias-4 · Three-bullet summary (problem, what I did, result) at the top of each project',
          ],
        },
      },
    ],
    cover: '/img/projects/wh-harness/cover.webp',
    gallery: [
      {
        src: '/img/projects/wh-harness/run.webp',
        alt: {
          pt: 'Linha do tempo de uma execução real do orquestrador, com ferramentas e agentes usados',
          en: 'Timeline of a real orchestrator run, with the tools and agents it used',
        },
      },
      {
        src: '/img/projects/wh-harness/tests.webp',
        alt: { pt: 'Suíte de testes do plugin passando: 32 testes', en: 'The plugin test suite passing: 32 tests' },
      },
    ],
  }),
  simpleProject({
    slug: 'goprint',
    title: 'GoPrint',
    period: { pt: '2026 – atual', en: '2026 – present' },
    kind: 'SaaS B2B',
    categories: ['dotnet', 'web'],
    summary: {
      pt: 'SaaS B2B feito para a Andelph Group: chamados de manutenção de impressoras, em que um prestador de serviço atende múltiplas empresas clientes.',
      en: 'B2B SaaS built for Andelph Group: printer-repair tickets, where a service provider serves multiple client companies.',
    },
    about: {
      pt: 'Cada cliente abre chamados, anexa fotos, vídeos ou PDF como evidência e acompanha os dez status do ciclo de vida com histórico de cada mudança; a assistência cadastra empresas, usuários e impressoras (com QR Code pelo número de série) e acompanha um painel por fase. API em ASP.NET Core (.NET 10) com Dapper e PostgreSQL, anexos em S3 (MinIO) e e-mail por SendGrid; o isolamento entre clientes vem da empresa contida no token. O front em React + Vite + TypeScript é servido pela própria API numa única imagem Docker, com testes de integração em xUnit e Testcontainers.',
      en: 'Each client opens tickets, attaches photos, videos or PDFs as evidence and follows the ten lifecycle statuses with a history of every change; the provider registers companies, users and printers (with a QR code from the serial number) and follows a dashboard by phase. ASP.NET Core (.NET 10) API with Dapper and PostgreSQL, S3 attachments (MinIO) and email through SendGrid; tenant isolation comes from the company in the token. The React + Vite + TypeScript front end is served by the API itself in a single Docker image, with integration tests in xUnit and Testcontainers.',
    },
    ai: {
      pt: 'Desenvolvido com o Claude Code sob o wh-harness: o trabalho é planejado como uma lista de pendências numeradas, executada por agentes em worktrees paralelas e integrada depois — 30 dos 43 commits têm o Claude como coautor e 12 são merges dessas worktrees.',
      en: 'Built with Claude Code under wh-harness: work is planned as a numbered punch list, carried out by agents on parallel worktrees and merged afterwards — 30 of the 43 commits have Claude as co-author and 12 are merges of those worktrees.',
    },
    client: 'Andelph Group',
    brief: {
      problem: {
        pt: 'Um prestador de serviço atende múltiplas empresas clientes em chamados de manutenção de impressoras.',
        en: 'A service provider serves multiple client companies with printer-repair tickets.',
      },
      action: {
        pt: 'API em ASP.NET Core (.NET 10) com Dapper e PostgreSQL e front em React + Vite + TypeScript, numa única imagem Docker; o isolamento entre clientes vem da empresa contida no token.',
        en: 'ASP.NET Core (.NET 10) API with Dapper and PostgreSQL and a React + Vite + TypeScript front end, in a single Docker image; tenant isolation comes from the company in the token.',
      },
      result: null,
    },
    tags: [
      { label: { pt: 'Projeto de cliente', en: 'Client project' }, accent: true },
      '.NET 10',
      'PostgreSQL',
      'React',
      'Docker',
    ],
    cover: '/img/projects/goprint/cover.webp',
    gallery: [
      {
        src: '/img/projects/goprint/ticket.webp',
        alt: { pt: 'Chamado com etapa do ciclo de vida, anexos e linha do tempo', en: 'A ticket with its lifecycle step, attachments and timeline' },
      },
      {
        src: '/img/projects/goprint/client.webp',
        alt: { pt: 'Chamados vistos pela empresa cliente (dados fictícios)', en: 'Tickets as seen by the client company (sample data)' },
      },
      {
        src: '/img/projects/goprint/qrcode.webp',
        alt: { pt: 'Impressora com QR Code gerado pelo número de série', en: 'A printer with the QR code generated from its serial number' },
      },
    ],
  }),
  simpleProject({
    slug: 'nesse-capitulo',
    title: 'Nesse Capítulo',
    period: '2026',
    kind: { pt: 'app web · PWA', en: 'web app · PWA' },
    categories: ['web'],
    featured: true,
    summary: {
      pt: 'Tracker de leituras mobile-first (PWA + API): estante, notas, resenhas e histórico por ano, com login Google.',
      en: 'Mobile-first reading tracker (PWA + API): shelves, ratings, reviews and yearly history, with Google login.',
    },
    about: {
      pt: 'Busca de livros com autocompletar (Google Books, com Open Library como reserva, cache e limite de taxa), quatro listas (Lendo, Quero ler, Lidos, Abandonados), nota e resenha por livro e estatísticas por ano, inclusive para leituras antigas registradas só com o ano. O banco SQLite é enxuto de propósito: capas e sinopses nunca são guardadas, vêm da fonte externa quando a tela precisa. TypeScript de ponta a ponta — React 19 e Tailwind no front, Hono com node:sqlite na API — num único processo Node; instalável como app e pronto para a Play Store via TWA. O anúncio recompensado opcional é exigido pelo backend, não só pela interface.',
      en: 'Book search with autocomplete (Google Books, with Open Library as fallback, caching and rate limiting), four shelves (Reading, Want to read, Read, Abandoned), a rating and review per book and yearly stats, including past reads logged with just the year. The SQLite database is lean on purpose: covers and synopses are never stored, they come from the external source when a screen needs them. TypeScript end to end — React 19 and Tailwind on the front, Hono with node:sqlite on the API — in a single Node process; installable as an app and ready for the Play Store via TWA. The optional rewarded ad is enforced by the backend, not just the UI.',
    },
    ai: {
      pt: 'Feito em dois dias com o Claude Code: todos os commits têm o Claude como coautor, da base inicial às refatorações (banco enxuto, autocompletar, troca de driver SQLite). Depois o repositório adotou o wh-harness, com perfis, glossário, mapa de features e índice CodeGraph para os agentes.',
      en: 'Built in two days with Claude Code: every commit has Claude as co-author, from the initial base to the refactors (lean database, autocomplete, SQLite driver swap). The repository then adopted wh-harness, with profiles, a glossary, a feature map and a CodeGraph index for the agents.',
    },
    brief: {
      problem: null,
      action: {
        pt: 'TypeScript de ponta a ponta — React 19 e Tailwind no front, Hono com node:sqlite na API — num único processo Node.',
        en: 'TypeScript end to end — React 19 and Tailwind on the front, Hono with node:sqlite on the API — in a single Node process.',
      },
      result: {
        pt: 'Instalável como app e pronto para a Play Store via TWA.',
        en: 'Installable as an app and ready for the Play Store via TWA.',
      },
    },
    tags: ['React', 'TypeScript', 'Hono', 'SQLite', 'PWA'],
    repo: 'https://github.com/Walter-Dalla/nesse-capitulo',
    cover: '/img/projects/nesse-capitulo/cover.webp',
    gallery: [
      {
        src: '/img/projects/nesse-capitulo/desktop.webp',
        alt: { pt: 'Estante de lidos no navegador, com capas, notas e resenhas', en: 'The read shelf in the browser, with covers, ratings and reviews' },
      },
      {
        src: '/img/projects/nesse-capitulo/book.webp',
        alt: { pt: 'Página de um livro com nota e status de leitura', en: 'A book page with its rating and reading status' },
      },
      {
        src: '/img/projects/nesse-capitulo/stats.webp',
        alt: { pt: 'Estatísticas de leitura por ano: livros, páginas e nota média', en: 'Yearly reading stats: books, pages and average rating' },
      },
    ],
  }),
  {
    slug: 'insect-behavioral-analysis',
    title: { pt: 'Ferramenta para Análise Comportamental de Insetos', en: 'Tool for Insect Behavioral Analysis' },
    period: { pt: '2024 – atual', en: '2024 – present' },
    kind: { pt: 'pesquisa · UNICAMP', en: 'research · UNICAMP' },
    featured: true,
    categories: ['research'],
    summary: {
      pt: 'Software de análise de imagens para comportamento de insetos, em uso em produção por 3 laboratórios de farmacologia da UNICAMP.',
      en: 'Image analysis software for insect behavior, in production use by 3 pharmacology labs at UNICAMP.',
    },
    lede: {
      pt: 'Um software de análise de imagens que transforma horas de observação manual em dados — hoje em uso por 3 laboratórios de farmacologia da UNICAMP.',
      en: 'Image-analysis software that turns hours of manual observation into data — now in use by 3 pharmacology labs at UNICAMP.',
    },
    brief: {
      problem: {
        pt: 'Medir mudanças de comportamento de insetos a partir de vídeos, à mão, é lento e subjetivo; as alternativas são softwares proprietários, com custo por análise.',
        en: 'Measuring insect behavioral changes from experiment videos by hand is slow and subjective; the alternatives are proprietary tools with a cost per analysis.',
      },
      action: {
        pt: 'Software em Python com OpenCV e NumPy que rastreia o inseto com duas câmeras a 90° e gera a rota em 3D, quadro a quadro.',
        en: 'Python software with OpenCV and NumPy that tracks the insect with two cameras at 90° and produces a frame-by-frame 3D route.',
      },
      result: {
        pt: 'Adotado por 3 laboratórios de farmacologia da UNICAMP.',
        en: 'Adopted by 3 pharmacology labs at UNICAMP.',
      },
    },
    tags: [
      { pt: 'visão computacional', en: 'computer vision' },
      'Python',
      'OpenCV',
      'NumPy',
      'Matplotlib',
      'Tkinter',
      { pt: 'rastreamento 3D', en: '3D tracking' },
    ],
    cover: '/img/projects/insect-behavioral-analysis/cover.webp',
    repo: null,
    thesisUrl: 'https://hdl.handle.net/11449/258670',
    facts: {
      role: {
        pt: 'Autor e desenvolvedor (TCC, UNESP)',
        en: 'Author and developer (undergraduate thesis, UNESP)',
      },
      status: { pt: 'Em uso', en: 'In use' },
      adoption: {
        pt: '3 laboratórios de farmacologia — UNICAMP',
        en: '3 pharmacology labs — UNICAMP',
      },
    },
    sections: [
      {
        title: { pt: 'O problema', en: 'The problem' },
        paragraphs: [
          {
            pt: 'Grupos que estudam o efeito de inseticidas e agrotóxicos em insetos precisam medir mudanças de comportamento — rota percorrida, tempo em voo e em pouso, velocidade — a partir de vídeos de experimentos. Fazer isso à mão é lento e subjetivo; as alternativas existentes são softwares proprietários, com custo por análise e sem espaço para o pesquisador criar as métricas que o seu projeto exige.',
            en: 'Research groups studying how insecticides and pesticides affect insects need to measure behavioral changes — the route travelled, time in flight versus at rest, speed — from experiment videos. Doing it by hand is slow and subjective, and the existing alternatives are proprietary tools with a cost per analysis and no room for researchers to add the metrics their own project needs.',
          },
          {
            pt: 'O projeto nasceu como meu Trabalho de Conclusão de Curso em Sistemas de Informação na UNESP (Bauru, 2024), "Ferramenta para análise comportamental de insetos", orientado pelo Prof. Dr. Marcelo de Paiva Guimarães, com o objetivo de oferecer uma ferramenta livre, extensível e que rode em qualquer computador, sem GPU nem internet.',
            en: 'The project started as my undergraduate thesis in Information Systems at UNESP (Bauru, 2024), "Ferramenta para análise comportamental de insetos" (A tool for insect behavioral analysis), advised by Prof. Dr. Marcelo de Paiva Guimarães, with the goal of an open, extensible tool that runs on any computer, with no GPU and no internet connection.',
          },
        ],
      },
      {
        title: { pt: 'A solução', en: 'The solution' },
        paragraphs: [
          {
            pt: 'O inseto fica numa caixa transparente de fundo branco, filmada por duas câmeras a 90° (topo e lateral). O software, em Python com OpenCV e NumPy, corrige a perspectiva de cada quadro a partir de quatro pontos marcados pelo pesquisador, monta uma máscara de fundo com os pixels mais claros de quadros amostrados ao longo do vídeo, subtrai essa máscara de cada quadro, limpa o ruído por limiar e toma o centro do maior contorno como a posição do inseto.',
            en: 'The insect sits in a transparent, white-backed box filmed by two cameras at 90° (top and side). The software, written in Python with OpenCV and NumPy, corrects the perspective of every frame from four points the researcher marks, builds a background mask from the brightest pixels of frames sampled across the video, subtracts that mask from each frame, removes noise with a threshold and takes the centre of the largest contour as the insect position.',
          },
          {
            pt: 'A câmera do topo dá largura e profundidade; a lateral dá altura. Combinadas, geram a rota em 3D, quadro a quadro, exibida num gráfico interativo (Matplotlib) e salva em JSON. Sobre a rota rodam módulos de metadados — tempo em cada borda e em voo, velocidade — que o pesquisador pode estender só com um arquivo Python numa pasta, sem mexer no núcleo. Perfis de análise guardam vídeos, medidas da caixa e pontos de perspectiva, e um relatório em PDF resume os resultados.',
            en: 'The top camera gives width and depth; the side camera gives height. Combined, they produce a frame-by-frame 3D route, shown in an interactive Matplotlib chart and saved as JSON. Metadata modules run on top of the route — time at each edge and in flight, speed — and researchers can add their own by dropping a Python file into a folder, with no changes to the core. Analysis profiles store the videos, box dimensions and perspective points, and a PDF report summarises the results.',
          },
        ],
      },
      {
        title: { pt: 'Resultado', en: 'Outcome' },
        paragraphs: [
          {
            pt: 'Nos testes do TCC, a ferramenta recuperou a rota de uma mosca filmada por dois celulares num aquário improvisado, com reflexos, sombras e fita adesiva no fundo — falhando em apenas alguns quadros isolados — e registrou curvas, correções de curso e paradas de uma barata em vídeo cedido por um pesquisador da área. Os testes também expuseram limites, como a perda do objeto quando ele fica imóvel em um dos eixos.',
            en: 'In the thesis tests, the tool recovered the route of a fly filmed by two phones in an improvised aquarium — with reflections, shadows and tape in the background — losing it in only a few isolated frames, and registered the turns, course corrections and pauses of a cockroach in footage provided by a researcher in the field. The tests also exposed limits, such as losing the subject when it stays still along one axis.',
          },
          {
            pt: 'O software foi adotado por 3 laboratórios de farmacologia da UNICAMP.',
            en: 'The software was adopted by 3 pharmacology labs at UNICAMP.',
          },
        ],
      },
    ],
    gallery: [
      {
        src: '/img/projects/insect-behavioral-analysis/cameras.webp',
        alt: {
          pt: 'Esquema do ambiente controlado: caixa filmada por duas câmeras, no topo e na lateral',
          en: 'Controlled environment diagram: a box filmed by two cameras, from the top and the side',
        },
      },
      {
        src: '/img/projects/insect-behavioral-analysis/modules.webp',
        alt: {
          pt: 'Diagrama dos módulos de interface, básicos, de metadados e de exportação',
          en: 'Diagram of the interface, core, metadata and export modules',
        },
      },
    ],
  },
  simpleProject({
    slug: 'portfolio',
    title: { pt: 'Este portfólio', en: 'This portfolio' },
    period: '2026',
    kind: { pt: 'site pessoal', en: 'personal site' },
    categories: ['web'],
    status: { pt: 'No ar', en: 'Live' },
    summary: {
      pt: 'O site que você está vendo: SPA em React 19 + Vite, bilíngue PT/EN, tema claro/escuro e deploy no GitHub Pages com domínio próprio.',
      en: "The site you're looking at: a React 19 + Vite SPA, bilingual PT/EN, light/dark theme and deployed to GitHub Pages on a custom domain.",
    },
    about: {
      pt: 'Só frontend, sem backend: todo o conteúdo fica em arquivos bilíngues { pt, en }, separados dos textos de interface, e um campo vazio simplesmente esconde o bloco. Testes com Vitest e CI no GitHub Actions (lint, testes, build) que publica em walterdalla.uk a cada push na master.',
      en: 'Frontend only, no backend: all content lives in bilingual { pt, en } files, kept apart from the interface strings, and an empty field simply hides its block. Vitest tests and GitHub Actions CI (lint, tests, build) that publishes to walterdalla.uk on every push to master.',
    },
    ai: {
      pt: 'Reescrito em novembro de 2026 com o Claude Code sob o wh-harness: um CLAUDE.md como mapa, perfis com a fonte de cada fato, glossário e mapa de features. Todo commit tem o Claude como coautor e chega à master por pull request revisado.',
      en: 'Rewritten in November 2026 with Claude Code under wh-harness: a CLAUDE.md as the map, profiles that cite the source of every fact, a glossary and a feature map. Every commit has Claude as co-author and reaches master through a reviewed pull request.',
    },
    brief: {
      problem: null,
      action: {
        pt: 'SPA em React 19 + Vite com todo o conteúdo em arquivos bilíngues { pt, en }, testes com Vitest e CI no GitHub Actions.',
        en: 'A React 19 + Vite SPA with all content in bilingual { pt, en } files, Vitest tests and GitHub Actions CI.',
      },
      result: {
        pt: 'Publicado em walterdalla.uk a cada push na master.',
        en: 'Published to walterdalla.uk on every push to master.',
      },
    },
    tags: ['React', 'Vite', 'Vitest', 'GitHub Actions'],
    repo: 'https://github.com/Walter-Dalla/portfolio',
    cover: '/img/projects/portfolio/cover.webp',
    gallery: [
      {
        src: '/img/projects/portfolio/projects-light.webp',
        alt: { pt: 'Lista de projetos no tema claro', en: 'The project list in the light theme' },
      },
      {
        src: '/img/projects/portfolio/case-study-en.webp',
        alt: { pt: 'Página de projeto em inglês', en: 'A project page in English' },
      },
    ],
  }),
  simpleProject({
    slug: 'homelab',
    title: 'Homelab',
    period: { pt: '2026 – atual', en: '2026 – present' },
    kind: { pt: 'infra · self-hosted', en: 'infra · self-hosted' },
    categories: ['infra'],
    summary: {
      pt: 'Servidor self-hosted que roda meus projetos em produção, exposto apenas por um túnel, sem portas abertas.',
      en: 'Self-hosted server running my projects in production, exposed only through a tunnel with no open ports.',
    },
    about: {
      pt: 'O hardware é um kit com processador Xeon egresso de datacenter. Como a revenda entrega esses processadores com a frequência limitada, fiz a ressolda para restaurar o clock completo, o que aumenta a capacidade de processamento sem sair das especificações do fabricante. Cada aplicação é uma stack Docker gerida pelo Komodo, com imagens no registry Zot; ambos ficam restritos à rede interna. As imagens são construídas na máquina de desenvolvimento e passam por scan de vulnerabilidades com Trivy antes do push: falha HIGH/CRITICAL com correção disponível bloqueia a publicação. A comunicação com a internet passa somente pelo Cloudflare Tunnel: os containers rodam sem usuário root e sem porta publicada, e só o cloudflared os alcança pela rede Docker. Os bancos SQLite têm backup diário com cópia fora do servidor e ensaio de restauração. Hoje hospeda o KittyCafé e o GoPrint.',
      en: 'The hardware is a Xeon kit with a processor retired from a datacenter. Resellers ship these processors with their frequency limited, so I reworked the soldering to restore the full clock, which increases processing capacity while staying within the manufacturer\'s specifications. Each application is a Docker stack managed by Komodo, with images in a Zot registry; both are restricted to the internal network. Images are built on the development machine and scanned with Trivy before the push: a HIGH/CRITICAL finding with an available fix blocks the release. Internet traffic flows only through Cloudflare Tunnel: containers run as non-root users with no published ports, and only cloudflared reaches them over the Docker network. The SQLite databases get daily backups with an off-host copy and restore rehearsals. It currently hosts KittyCafé and GoPrint.',
    },
    brief: {
      problem: {
        pt: 'Rodar meus projetos em produção num servidor self-hosted, sem portas abertas.',
        en: 'Running my projects in production on a self-hosted server, with no open ports.',
      },
      action: {
        pt: 'Cada aplicação é uma stack Docker gerida pelo Komodo, com imagens no registry Zot e scan com Trivy antes do push; a internet chega só pelo Cloudflare Tunnel.',
        en: 'Each application is a Docker stack managed by Komodo, with images in a Zot registry and a Trivy scan before the push; the internet reaches it only through Cloudflare Tunnel.',
      },
      result: { pt: 'Hoje hospeda o KittyCafé e o GoPrint.', en: 'It currently hosts KittyCafé and GoPrint.' },
    },
    tags: ['Docker', 'Komodo', 'Zot', 'Cloudflare Tunnel', 'Trivy', 'Linux', 'Xeon'],
  }),
  simpleProject({
    slug: 'cartas-malfaladas',
    title: 'Cartas Malfaladas',
    period: '2026',
    kind: { pt: 'jogo multiplayer', en: 'multiplayer game' },
    categories: ['games', 'web'],
    summary: {
      pt: 'Jogo de cartas de completar frases para jogar com amigos no navegador ou no Android: crie uma sala, mande o link e a mesa inteira vota na resposta mais engraçada, sem juiz.',
      en: 'Fill-in-the-blank party card game played with friends in the browser or on Android: create a room, share the link and the whole table votes for the funniest answer, with no judge.',
    },
    about: {
      pt: 'API em NestJS + Socket.IO com SQLite (Drizzle), web em Vite + React 19 empacotada para Android com Capacitor, e um pacote compartilhado de contratos (schemas Zod, tipos e eventos). O servidor é a fonte da verdade — sorteio, pontos e fases ficam nele, e ninguém recebe a mão dos outros —, e as regras são funções puras com relógio e aleatoriedade injetados, testadas sem rede. Tem reconexão, quatro baralhos, revanche, conta Google com decks próprios e a moderação exigida pela Google Play (denúncia, bloqueio, classificação etária). Feito com JPBeckner.',
      en: "NestJS + Socket.IO API with SQLite (Drizzle), a Vite + React 19 web app packaged for Android with Capacitor, and a shared contracts package (Zod schemas, types and events). The server is the source of truth — draws, points and phases live there, and nobody receives anyone else's hand — and the rules are pure functions with injected clock and randomness, tested without a network. It has reconnection, four decks, rematches, Google accounts with custom decks and the moderation Google Play requires (reporting, blocking, age rating). Built with JPBeckner.",
    },
    ai: {
      pt: 'São 717 commits em três semanas, 628 com o Claude como coautor. O trabalho correu em faixas paralelas (assinatura, moderação, release e CI), cada uma num agente em worktree própria, com relatório de cada rodada. A qualidade é checada pela máquina: o CI falha se a documentação citar código que não existe ou se um arquivo passar de 400 linhas, e testes de mutação (Stryker) rodam toda noite nos módulos críticos.',
      en: 'It has 717 commits in three weeks, 628 with Claude as co-author. Work ran in parallel lanes (subscriptions, moderation, release and CI), each in an agent on its own worktree, with a report for every round. Quality is checked by the machine: CI fails if the docs cite code that does not exist or a file grows past 400 lines, and mutation tests (Stryker) run nightly on the critical modules.',
    },
    numbers: {
      commits: { pt: '717 · 628 com o Claude como coautor', en: '717 · 628 with Claude as co-author' },
      mutation: { pt: 'Stryker, toda noite nos módulos críticos', en: 'Stryker, nightly on the critical modules' },
    },
    brief: {
      problem: null,
      action: {
        pt: 'API em NestJS + Socket.IO em que o servidor é a fonte da verdade, com regras como funções puras testadas sem rede; web em Vite + React 19 empacotada para Android com Capacitor.',
        en: 'A NestJS + Socket.IO API where the server is the source of truth, with rules as pure functions tested without a network; a Vite + React 19 web app packaged for Android with Capacitor.',
      },
      result: null,
    },
    decisions: [
      {
        decision: { pt: 'O servidor é a fonte da verdade', en: 'The server is the source of truth' },
        why: {
          pt: 'Sorteio, pontos e fases ficam nele, e ninguém recebe a mão dos outros.',
          en: "Draws, points and phases live there, and nobody receives anyone else's hand.",
        },
        alternative: {
          pt: 'Deixar o navegador de cada jogador calcular sorteio e pontos e só sincronizar o resultado.',
          en: "Letting each player's browser compute draws and points and only sync the result.",
        },
        tradeoff: {
          pt: 'Sem conexão com o servidor não há jogo, e tudo que vai para o navegador passa por um filtro que esconde a mão dos outros e o dono de cada carta na votação.',
          en: "Without a connection to the server there is no game, and everything sent to the browser goes through a filter that hides other players' hands and who owns each card during the vote.",
        },
      },
      {
        decision: {
          pt: 'Regras como funções puras, com relógio e aleatoriedade injetados',
          en: 'Rules as pure functions with injected clock and randomness',
        },
        why: { pt: 'São testadas sem rede.', en: 'They are tested without a network.' },
        alternative: {
          pt: 'Regras dentro dos handlers do Socket.IO, lendo a hora e sorteando direto.',
          en: 'Rules inside the Socket.IO handlers, reading the time and drawing directly.',
        },
        tradeoff: {
          pt: 'Cada regra recebe a sala e o contexto e devolve uma sala nova ou um erro; um lint barra Date.now() e Math.random() fora dos módulos de relógio e sorteio.',
          en: 'Each rule takes the room and a context and returns a new room or an error; a lint blocks Date.now() and Math.random() outside the clock and randomness modules.',
        },
      },
      {
        decision: { pt: 'Um pacote compartilhado de contratos', en: 'A shared contracts package' },
        why: { pt: 'Reúne os schemas Zod, os tipos e os eventos.', en: 'It holds the Zod schemas, types and events.' },
        alternative: {
          pt: 'Tipos e eventos escritos duas vezes, na API e na web.',
          en: 'Types and events written twice, in the API and in the web app.',
        },
        tradeoff: {
          pt: 'O pacote é compilado: mudou o contrato, ele é recompilado antes de a API e a web enxergarem, e a mudança de payload aparece num snapshot que precisa ser aceito.',
          en: 'The package is compiled: when the contract changes it is rebuilt before the API and the web app see it, and the payload change shows up in a snapshot that has to be accepted.',
        },
      },
      {
        decision: {
          pt: 'Web em Vite + React 19 empacotada para Android com Capacitor',
          en: 'A Vite + React 19 web app packaged for Android with Capacitor',
        },
        why: { pt: 'O jogo roda no navegador ou no Android.', en: 'The game is played in the browser or on Android.' },
        alternative: {
          pt: 'Um app Android nativo, com uma segunda base de código.',
          en: 'A native Android app, with a second codebase.',
        },
        tradeoff: {
          pt: 'O app é o site num WebView: sem servidor mostra "Sem conexão", e o login do Google, recusado em WebView, precisou de um caminho nativo com a conta do aparelho.',
          en: 'The app is the site in a WebView: with no server it shows "No connection", and Google sign-in, refused inside a WebView, needed a native path using the device account.',
        },
      },
    ],
    tags: ['NestJS', 'Socket.IO', 'React', 'TypeScript'],
    cover: '/img/projects/cartas-malfaladas/cover.webp',
    gallery: [
      {
        src: '/img/projects/cartas-malfaladas/lobby.webp',
        alt: { pt: 'Sala de espera com código da mesa, link e jogadores', en: 'Waiting room with the table code, invite link and players' },
      },
      {
        src: '/img/projects/cartas-malfaladas/vote.webp',
        alt: { pt: 'Votação anônima na resposta mais engraçada', en: 'Anonymous vote for the funniest answer' },
      },
      {
        src: '/img/projects/cartas-malfaladas/results.webp',
        alt: { pt: 'Resultado da rodada com votos e placar', en: 'Round result with votes and scoreboard' },
      },
    ],
  }),
  simpleProject({
    slug: 'kittycafe',
    title: 'KittyCafé',
    period: { pt: '2023 – atual', en: '2023 – present' },
    kind: { pt: 'jogo idle', en: 'idle game' },
    categories: ['games', 'dotnet'],
    featured: true,
    status: { pt: 'No ar na web · Android e Windows em andamento', en: 'Live on the web · Android and Windows in progress' },
    summary: {
      pt: 'Jogo idle de um café com gatos, no ar na web: monte e decore o café, cozinhe receitas e os clientes comem e pagam sozinhos, inclusive com o jogo fechado.',
      en: 'An idle cat café game, live on the web: build and decorate the café, cook recipes, and customers eat and pay on their own, even while the game is closed.',
    },
    about: {
      pt: 'Backend .NET 10 (REST, SQLite, login Google) e cliente Godot 4 em 3D isométrico. O backend é a fonte da verdade e não roda nada em segundo plano: guarda timestamps e recalcula o estado a cada requisição, e a chegada de clientes é prevista de forma determinística — o progresso offline sai do tempo decorrido no próximo sync, e o cliente só anima o que o servidor já decidiu. Além do núcleo, tem equipe de gatos que automatiza a cozinha, missões, reputação, fazenda, minijogos, liga semanal entre amigos, anúncios (AdMob), Play Billing e um servidor MCP de administração. Roda em produção em kittycafe.walterdalla.uk desde setembro de 2026, numa imagem Docker única atrás de Cloudflare Tunnel.',
      en: 'A .NET 10 backend (REST, SQLite, Google login) and an isometric 3D Godot 4 client. The backend is the source of truth and runs nothing in the background: it stores timestamps and recomputes state on each request, and customer arrivals are predicted deterministically — offline progress comes from elapsed time on the next sync, and the client only animates what the server has already decided. Beyond the core loop it has a cat staff that automates the kitchen, quests, reputation, a farm, minigames, a weekly league among friends, ads (AdMob), Play Billing and an admin MCP server. It has been live at kittycafe.walterdalla.uk since September 2026, as a single Docker image behind Cloudflare Tunnel.',
    },
    ai: {
      pt: 'É o projeto onde nasceu meu fluxo com agentes: 1.594 dos 1.822 commits têm o Claude como coautor. Cada tarefa vira um plano com itens numerados; um orquestrador distribui faixas a agentes em worktrees próprias, cada um com um backend descartável numa porta reservada e um commit por item; QA de código e QA visual devolvem achados; uma etapa de limpeza atualiza changelog e docs. O CI barra o que o agente erraria em silêncio: docs que citam símbolos inexistentes, traduções órfãs, padrões proibidos, e um job noturno de testes de mutação. Agentes nunca acessam o servidor de produção.',
      en: 'This is where my agent workflow was born: 1,594 of its 1,822 commits have Claude as co-author. Each task becomes a plan with numbered items; an orchestrator hands lanes to agents on their own worktrees, each with a disposable backend on a reserved port and one commit per item; code QA and visual QA report findings; a cleanup step updates the changelog and docs. CI blocks what an agent would get wrong silently: docs citing symbols that do not exist, orphan translations, banned patterns, plus a nightly mutation-testing job. Agents never touch the production server.',
    },
    numbers: {
      commits: { pt: '1.822 · 1.594 com o Claude como coautor', en: '1,822 · 1,594 with Claude as co-author' },
      mutation: { pt: 'job noturno no CI', en: 'nightly CI job' },
    },
    brief: {
      problem: null,
      action: {
        pt: 'Backend .NET 10 que é a fonte da verdade e não roda nada em segundo plano: guarda timestamps e recalcula o estado a cada requisição; cliente Godot 4 em 3D isométrico.',
        en: 'A .NET 10 backend that is the source of truth and runs nothing in the background: it stores timestamps and recomputes state on each request; an isometric 3D Godot 4 client.',
      },
      result: {
        pt: 'Em produção em kittycafe.walterdalla.uk desde setembro de 2026.',
        en: 'Live at kittycafe.walterdalla.uk since September 2026.',
      },
    },
    decisions: [
      {
        decision: {
          pt: 'O backend é a fonte da verdade e não roda nada em segundo plano',
          en: 'The backend is the source of truth and runs nothing in the background',
        },
        why: {
          pt: 'Guarda timestamps e recalcula o estado a cada requisição; o progresso offline sai do tempo decorrido no próximo sync.',
          en: 'It stores timestamps and recomputes state on each request; offline progress comes from elapsed time on the next sync.',
        },
        alternative: {
          pt: 'Um processo em segundo plano simulando cada café o tempo todo, mesmo sem ninguém jogando.',
          en: 'A background process simulating every café all the time, even with nobody playing.',
        },
        tradeoff: {
          pt: 'O trabalho vai para a requisição: cada sync refaz a simulação do último instante salvo até agora.',
          en: 'The work moves into the request: each sync replays the simulation from the last saved instant up to now.',
        },
      },
      {
        decision: {
          pt: 'A chegada de clientes é prevista de forma determinística',
          en: 'Customer arrivals are predicted deterministically',
        },
        why: {
          pt: 'O cliente só anima o que o servidor já decidiu.',
          en: 'The client only animates what the server has already decided.',
        },
        alternative: {
          pt: 'Empurrar cada chegada em tempo real por WebSocket; cada conexão custa memória e traz reconexão e heartbeat próprios.',
          en: 'Pushing each arrival in real time over WebSocket; every connection costs memory and brings its own reconnection and heartbeat.',
        },
        tradeoff: {
          pt: 'Todo sorteio da simulação usa a semente da visita, e tempo e aleatoriedade entram por parâmetro; se um escapar, previsão e execução divergem.',
          en: "Every draw in the simulation uses the visit's seed, and time and randomness come in as parameters; if one slips, forecast and execution diverge.",
        },
      },
      {
        decision: {
          pt: 'Uma imagem Docker única atrás de Cloudflare Tunnel',
          en: 'A single Docker image behind Cloudflare Tunnel',
        },
        why: {
          pt: 'Roda em produção em kittycafe.walterdalla.uk desde setembro de 2026.',
          en: 'It has been live at kittycafe.walterdalla.uk since September 2026.',
        },
        alternative: {
          pt: 'Servir o jogo web separado da API e publicar uma porta no servidor.',
          en: 'Serving the web game apart from the API and publishing a port on the server.',
        },
        tradeoff: {
          pt: 'Qualquer mudança no cliente web pede uma imagem nova, e ela sai da máquina de desenvolvimento, não do CI.',
          en: 'Any change to the web client needs a new image, and it is built on the development machine, not in CI.',
        },
      },
    ],
    tags: ['.NET 10', 'Godot', 'SQLite', 'Docker'],
    cover: '/img/projects/kittycafe/cover.webp',
    gallery: [
      {
        src: '/img/projects/kittycafe/menu.webp',
        alt: { pt: 'Cardápio com receitas, tempo de preparo e lucro por cliente', en: 'Menu with recipes, cooking time and profit per customer' },
      },
      {
        src: '/img/projects/kittycafe/staff.webp',
        alt: { pt: 'Equipe de gatos: garçom, cozinheiro e gerente', en: 'Cat staff: waiter, cook and manager' },
      },
      {
        src: '/img/projects/kittycafe/farm.webp',
        alt: { pt: 'Fazenda com canteiros, galinheiro e quadro de encomendas', en: 'Farm with crop plots, a chicken coop and an orders board' },
      },
      {
        src: '/img/projects/kittycafe/minigame.webp',
        alt: { pt: 'Minijogo de cozinha "Mexa no ritmo"', en: 'The "Stir to the rhythm" cooking minigame' },
      },
    ],
  }),
]

// Projetos fora da lista: têm página (/projects/<slug>), mas não aparecem em Projetos, Início, /ai, na navegação
// entre projetos nem no sitemap; só se chega a eles por link direto.
export const unlistedProjects = [
  simpleProject({
    slug: 'atom',
    title: 'Atom',
    period: '2019',
    kind: { pt: 'TCC · curso técnico', en: 'capstone · technical degree' },
    categories: ['web'],
    status: { pt: 'Concluído', en: 'Completed' },
    role: {
      pt: 'Gerente de projeto, líder e desenvolvedor do backend, desenvolvedor do frontend',
      en: 'Project manager, backend lead and developer, frontend developer',
    },
    summary: {
      pt: 'TCC do curso técnico em informática no COTIL/UNICAMP: questionários totalmente customizáveis, com envio e análise simples das respostas.',
      en: 'Capstone project of my technical degree in IT at COTIL/UNICAMP: fully customizable questionnaires, with sending and simple analysis of the answers.',
    },
    about: {
      pt: 'O Atom foi o trabalho de conclusão do curso técnico em informática, requisito para o certificado. Com ele dá para criar questionários totalmente customizáveis, enviá-los e analisar as respostas de forma simples. Foi feito por uma equipe de 5 pessoas; o backend é em Java com Spring Boot, o frontend em React e o banco é MySQL. A banca deu nota média 9,5. O repositório público é o do backend; o do frontend é privado.',
      en: 'Atom was the capstone project of my technical degree in IT, required for the certificate. It lets you build fully customizable questionnaires, send them and analyze the answers in a simple way. It was built by a team of 5; the backend is Java with Spring Boot, the frontend is React and the database is MySQL. The examining board gave it an average grade of 9.5. The public repository is the backend; the frontend one is private.',
    },
    brief: {
      problem: null,
      action: {
        pt: 'Aplicação web de questionários feita em equipe de 5 pessoas: backend em Java com Spring Boot, frontend em React e MySQL.',
        en: 'A questionnaire web app built by a team of 5: Java with Spring Boot backend, React frontend and MySQL.',
      },
      result: {
        pt: 'Nota média 9,5 da banca.',
        en: 'Average grade of 9.5 from the examining board.',
      },
    },
    tags: ['Java', 'Spring Boot', 'React', 'MySQL'],
    repo: 'https://github.com/Walter-Dalla/Atom',
    links: [
      {
        href: 'https://www.linkedin.com/feed/update/urn:li:activity:6610003994779631616/',
        label: { pt: 'publicação no LinkedIn', en: 'LinkedIn post' },
      },
    ],
  }),
]

export const findProject = (slug) => [...projects, ...unlistedProjects].find((p) => p.slug === slug)
