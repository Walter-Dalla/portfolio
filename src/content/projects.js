// Projetos: a lista alimenta Início (os `featured`), Projetos e a página de cada projeto.
// Campos `null` não aparecem. `sections` é o estudo de caso; seção sem parágrafos não entra.
// `cover`: imagem 16:10 em public/, ex.: '/img/projetos/insetos.jpg'.

export const projectCategories = [
  { id: 'research', label: { pt: 'pesquisa', en: 'research' } },
  { id: 'dotnet', label: '.NET' },
  { id: 'databases', label: { pt: 'bancos de dados', en: 'databases' } },
  { id: 'ai', label: { pt: 'IA & agentes', en: 'AI & agents' } },
  { id: 'web', label: 'web' },
  { id: 'games', label: { pt: 'jogos', en: 'games' } },
  { id: 'infra', label: 'infra' },
]

// Projeto pessoal ainda sem estudo de caso: só o card e um parágrafo (vindo do README).
// `repo` só para repositórios públicos.
function simpleProject({ slug, title, period, kind, categories, summary, about, tags, repo = null }) {
  return {
    slug,
    title,
    period,
    patented: false,
    kind,
    featured: false,
    categories,
    summary,
    lede: summary,
    tags,
    cover: null,
    repo,
    patentUrl: null,
    facts: { role: null, status: { pt: 'Em desenvolvimento', en: 'In development' }, adoption: null },
    sections: [{ title: { pt: 'O projeto', en: 'The project' }, paragraphs: [about] }],
    gallery: [],
  }
}

export const projects = [
  {
    slug: 'analise-comportamental-insetos',
    title: { pt: 'Análise comportamental de insetos', en: 'Insect behavioral analysis' },
    period: { pt: '2024 – atual', en: '2024 – present' },
    patented: true,
    kind: { pt: 'pesquisa · UNICAMP', en: 'research · UNICAMP' },
    featured: true,
    categories: ['research'],
    summary: {
      pt: 'Software de análise de imagens que automatiza a observação de comportamento de insetos, usado por 3 laboratórios de farmacologia da UNICAMP.',
      en: 'Image-analysis software that automates the observation of insect behavior, used by 3 pharmacology labs at UNICAMP.',
    },
    lede: {
      pt: 'Um software de análise de imagens que transforma horas de observação manual em dados — hoje patenteado e em uso por 3 laboratórios de farmacologia da UNICAMP.',
      en: 'Image-analysis software that turns hours of manual observation into data — now patented and in use by 3 pharmacology labs at UNICAMP.',
    },
    tags: [{ pt: 'visão computacional', en: 'computer vision' }],
    cover: null,
    repo: null,
    patentUrl: null,
    facts: {
      role: null,
      status: { pt: 'Patenteado · em uso', en: 'Patented · in use' },
      adoption: {
        pt: '3 laboratórios de farmacologia — UNICAMP',
        en: '3 pharmacology labs — UNICAMP',
      },
    },
    sections: [
      { title: { pt: 'O problema', en: 'The problem' }, paragraphs: [] },
      { title: { pt: 'A solução', en: 'The solution' }, paragraphs: [] },
      {
        title: { pt: 'Resultado', en: 'Outcome' },
        paragraphs: [
          {
            pt: 'O software foi patenteado e adotado por 3 laboratórios de farmacologia da UNICAMP.',
            en: 'The software was patented and adopted by 3 pharmacology labs at UNICAMP.',
          },
        ],
      },
    ],
    // Fotos do estudo de caso: [{ src, alt: { pt, en } }]
    gallery: [],
  },
  {
    slug: 'mongodb-benchmark',
    title: 'MongoDB Benchmark',
    period: '2023',
    patented: false,
    kind: 'benchmark',
    featured: true,
    categories: ['dotnet', 'databases'],
    summary: {
      pt: 'Benchmark de configurações do driver MongoDB para .NET Core, comparando o efeito de cada ajuste.',
      en: 'Benchmark of MongoDB driver settings for .NET Core, comparing the effect of each tweak.',
    },
    lede: {
      pt: 'Benchmark de configurações do driver MongoDB para .NET Core: o que muda em throughput e latência conforme cada ajuste.',
      en: 'Benchmark of MongoDB driver settings for .NET Core: what changes in throughput and latency with each tweak.',
    },
    tags: ['.NET Core', 'C#', 'MongoDB'],
    cover: null,
    repo: 'https://github.com/Walter-Dalla/MongoDBBenchmark',
    patentUrl: null,
    facts: {
      role: null,
      status: { pt: 'Concluído', en: 'Completed' },
      adoption: null,
    },
    sections: [
      {
        title: { pt: 'O projeto', en: 'The project' },
        paragraphs: [
          {
            pt: 'Projeto para medir várias configurações do driver MongoDB para .NET Core.',
            en: 'A project to measure several configurations of the MongoDB driver for .NET Core.',
          },
        ],
      },
    ],
    gallery: [],
  },
  simpleProject({
    slug: 'wh-harness',
    title: 'wh-harness',
    period: { pt: '2026 – atual', en: '2026 – present' },
    kind: { pt: 'plugin · Claude Code', en: 'plugin · Claude Code' },
    categories: ['ai'],
    summary: {
      pt: 'Harness de implementação modular para o Claude Code: skills, subagentes e hooks genéricos que funcionam em qualquer repositório.',
      en: 'A modular implementation harness for Claude Code: generic skills, subagents and hooks that work in any repository.',
    },
    about: {
      pt: 'Um plugin guarda os procedimentos (enriquecer, planejar, faixas paralelas em worktrees, QA, PR, retro) e cada projeto guarda só os seus fatos — comandos, portas, glossário, mapa de features — em .claude/perfil/. O mesmo /wh:implementation conduz um jogo .NET + Godot, uma API Node ou um serviço Python sem uma linha específica de projeto na skill.',
      en: 'One plugin holds the procedures (enrich, plan, parallel lanes in worktrees, QA, PR, retro) and each project holds only its facts — commands, ports, glossary, feature map — in .claude/perfil/. The same /wh:implementation drives a .NET + Godot game, a Node API or a Python service without one line of project-specific text in the skill.',
    },
    tags: [{ label: 'Claude Code', accent: true }, { pt: 'Orquestração de agentes', en: 'Agent orchestration' }, 'Python'],
    repo: 'https://github.com/Walter-Dalla/wh-harness',
  }),
  simpleProject({
    slug: 'kittycafe',
    title: 'KittyCafé',
    period: { pt: '2023 – atual', en: '2023 – present' },
    kind: { pt: 'jogo idle', en: 'idle game' },
    categories: ['games', 'dotnet'],
    summary: {
      pt: 'Jogo idle de gerenciamento de um café com gatos: monte e decore o café, cozinhe receitas e os clientes comem e pagam sozinhos, inclusive offline.',
      en: 'Idle management game about a cat café: build and decorate it, cook recipes, and customers eat and pay on their own, even offline.',
    },
    about: {
      pt: 'Backend .NET 10 (REST, SQLite, login Google) e cliente Godot 4 em 3D isométrico. O backend é a fonte da verdade: guarda só timestamps e recalcula tudo a cada request, sem processamento em background — o progresso offline é derivado do tempo decorrido no próximo sync.',
      en: 'A .NET 10 backend (REST, SQLite, Google login) and an isometric 3D Godot 4 client. The backend is the source of truth: it stores only timestamps and recomputes everything on each request, with no background processing — offline progress is derived from elapsed time on the next sync.',
    },
    tags: ['.NET 10', 'Godot', 'SQLite', 'Docker'],
  }),
  simpleProject({
    slug: 'nesse-capitulo',
    title: 'Nesse Capítulo',
    period: '2026',
    kind: { pt: 'app web · PWA', en: 'web app · PWA' },
    categories: ['web'],
    summary: {
      pt: 'Tracker de leituras mobile-first (PWA + API): listas, notas, resenhas e histórico por ano, com login Google.',
      en: 'Mobile-first reading tracker (PWA + API): shelves, ratings, reviews and yearly history, with Google login.',
    },
    about: {
      pt: 'Busca de livros com autocompletar (Google Books, Open Library como reserva), quatro listas (Lendo, Quero ler, Lidos, Abandonados), nota e resenha por livro e estatísticas por ano. Banco enxuto em SQLite: capas e sinopses vêm da fonte externa só quando a tela precisa. Um único processo Node (Hono) serve a API e o front React; instalável como app e pronto para a Play Store via TWA.',
      en: 'Book search with autocomplete (Google Books, with Open Library as fallback), four shelves (Reading, Want to read, Read, Abandoned), a rating and review per book and yearly stats. Lean SQLite database: covers and synopses come from the external source only when a screen needs them. A single Node (Hono) process serves the API and the React front end; installable as an app and ready for the Play Store via TWA.',
    },
    tags: ['React', 'TypeScript', 'Hono', 'SQLite', 'PWA'],
    repo: 'https://github.com/Walter-Dalla/nesse-capitulo',
  }),
  simpleProject({
    slug: 'goprint',
    title: 'GoPrint',
    period: { pt: '2026 – atual', en: '2026 – present' },
    kind: 'SaaS B2B',
    categories: ['dotnet', 'web'],
    summary: {
      pt: 'Plataforma SaaS B2B de chamados de assistência técnica para impressoras: a assistência atende várias empresas clientes, que abrem e acompanham chamados dos seus equipamentos.',
      en: 'B2B SaaS for printer repair tickets: a service provider serves several client companies, which open and track tickets for their equipment.',
    },
    about: {
      pt: 'API em ASP.NET Core (.NET 10) com PostgreSQL e anexos em S3 (MinIO), SPA em React + Vite + TypeScript, testes de integração com xUnit e Testcontainers, CI no GitHub Actions e deploy em Docker.',
      en: 'ASP.NET Core (.NET 10) API with PostgreSQL and S3 attachments (MinIO), a React + Vite + TypeScript SPA, integration tests with xUnit and Testcontainers, CI on GitHub Actions and Docker deployment.',
    },
    tags: ['.NET 10', 'PostgreSQL', 'React', 'Docker'],
  }),
  simpleProject({
    slug: 'cartas-malfaladas',
    title: 'Cartas Malfaladas',
    period: '2026',
    kind: { pt: 'jogo multiplayer', en: 'multiplayer game' },
    categories: ['games', 'web'],
    summary: {
      pt: 'Jogo de cartas de completar frases para jogar com amigos no navegador: crie uma sala, mande o link e todos votam na resposta mais engraçada.',
      en: 'Fill-in-the-blank party card game played with friends in the browser: create a room, share the link and everyone votes for the funniest answer.',
    },
    about: {
      pt: 'API em NestJS + Socket.IO, web em Vite + React 19 e um pacote compartilhado de contratos (schemas Zod, tipos e eventos). O servidor é a fonte da verdade — sorteio, pontos e fases ficam nele, e ninguém recebe a mão dos outros —, e as regras são funções puras com relógio e aleatoriedade injetados, testadas sem rede. Feito com JPBeckner.',
      en: "NestJS + Socket.IO API, a Vite + React 19 web app and a shared contracts package (Zod schemas, types and events). The server is the source of truth — draws, points and phases live there, and nobody receives anyone else's hand — and the rules are pure functions with injected clock and randomness, tested without a network. Built with JPBeckner.",
    },
    tags: ['NestJS', 'Socket.IO', 'React', 'TypeScript'],
  }),
  simpleProject({
    slug: 'homelab',
    title: 'Homelab',
    period: { pt: '2026 – atual', en: '2026 – present' },
    kind: { pt: 'infra · self-hosted', en: 'infra · self-hosted' },
    categories: ['infra'],
    summary: {
      pt: 'Servidor Linux em casa que roda meus projetos em produção com Docker, publicado na internet só por Cloudflare Tunnel, sem nenhuma porta aberta.',
      en: 'A Linux server at home running my projects in production with Docker, exposed to the internet only through Cloudflare Tunnel, with no open ports.',
    },
    about: {
      pt: 'Cada aplicação é uma stack Docker gerida por um painel self-hosted, com imagens num registry privado. As imagens são construídas na máquina de desenvolvimento e passam por scan de vulnerabilidades com Trivy antes do push: falha HIGH/CRITICAL com correção disponível bloqueia a publicação. Os containers rodam sem usuário root e sem porta publicada — só o cloudflared os alcança pela rede Docker —, e os bancos SQLite têm backup diário com cópia fora do servidor e ensaio de restauração. Hoje hospeda o KittyCafé e o GoPrint.',
      en: 'Each application is a Docker stack managed by a self-hosted panel, with images in a private registry. Images are built on the development machine and scanned with Trivy before the push: a HIGH/CRITICAL finding with an available fix blocks the release. Containers run as non-root users with no published ports — only cloudflared reaches them over the Docker network — and the SQLite databases get daily backups with an off-host copy and restore rehearsals. It currently hosts KittyCafé and GoPrint.',
    },
    tags: ['Docker', 'Cloudflare Tunnel', 'Trivy', 'Linux'],
  }),
  simpleProject({
    slug: 'portfolio',
    title: { pt: 'Este portfólio', en: 'This portfolio' },
    period: '2026',
    kind: { pt: 'site pessoal', en: 'personal site' },
    categories: ['web'],
    summary: {
      pt: 'O site que você está vendo: SPA em React 19 + Vite, bilíngue PT/EN, tema claro/escuro e deploy no GitHub Pages.',
      en: "The site you're looking at: a React 19 + Vite SPA, bilingual PT/EN, light/dark theme and deployed to GitHub Pages.",
    },
    about: {
      pt: 'Só frontend, sem backend: todo o conteúdo fica em arquivos bilíngues { pt, en }, testes com Vitest e CI no GitHub Actions que publica no GitHub Pages a cada push na master.',
      en: 'Frontend only, no backend: all content lives in bilingual { pt, en } files, with Vitest tests and GitHub Actions CI that publishes to GitHub Pages on every push to master.',
    },
    tags: ['React', 'Vite', 'Vitest', 'GitHub Actions'],
    repo: 'https://github.com/Walter-Dalla/portfolio',
  }),
]

export const findProject = (slug) => projects.find((p) => p.slug === slug)
