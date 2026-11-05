// Linha do tempo do currículo, da mais recente para a mais antiga.
// `**texto**` em um item vira destaque (número em mono, cor de acento).
// `stage`: 'current' (marcador cheio), 'recent' (contorno de acento) ou ausente (contorno neutro).
// `note` (opcional): linha curta abaixo da empresa, ex.: como entrou, cargos anteriores.
// `extra` (opcional): { photos: [{ src, alt }], text: { pt, en } } — bloco de fotos e texto extra.
export const experiences = [
  {
    period: { pt: '07/2026 — atual', en: '07/2026 — present' },
    role: 'Senior AI-Oriented Fullstack Developer',
    company: 'AgileEngine',
    place: { pt: 'Remoto (EUA)', en: 'Remote (USA)' },
    note: {
      pt: 'Pela minha consultoria, Walter Serviços de Arquitetura de Software.',
      en: 'Through my own consultancy, Walter Serviços de Arquitetura de Software.',
    },
    stage: 'current',
    bullets: [
      {
        pt: 'Projetei e implementei um harness próprio de orquestração de IA que executa skills programáticas em paralelo em várias tarefas, permitindo desenvolver software de saúde de forma paralelizada.',
        en: 'Designed and implemented a custom AI orchestration harness that runs programmatic skills concurrently across multiple tasks, enabling parallelized development of healthcare software.',
      },
      {
        pt: 'Workflows de engenharia orientados por IA de ponta a ponta (análise, planejamento, implementação, testes e deploy) com agentes Claude e Codex, em Azure DevOps e Azure Cloud.',
        en: 'Built end-to-end AI-driven engineering workflows (analysis, planning, implementation, testing, deployment) with Claude and Codex agents, on Azure DevOps and Azure Cloud.',
      },
    ],
    tags: [
      { label: 'Claude', accent: true },
      { label: 'Codex', accent: true },
      { label: 'Azure DevOps' },
      { label: 'Azure' },
    ],
  },
  {
    period: '09/2025 — 05/2026',
    role: 'Systems Architect & DevOps',
    company: 'Qyon',
    place: 'Americana-SP',
    note: {
      pt: 'Pela minha consultoria, Walter Serviços de Arquitetura de Software.',
      en: 'Through my own consultancy, Walter Serviços de Arquitetura de Software.',
    },
    stage: 'recent',
    bullets: [
      {
        pt: 'Consolidei **8 microsserviços** quase idênticos em um só (padrões Strategy e Template Method), migrando de .NET Core 3.1 para .NET 10: vazão da fila **mais que dobrou**, menos memória e deploy de **8 pods para 1**.',
        en: 'Consolidated **8 near-identical microservices** into a single service (Strategy and Template Method patterns), migrating from .NET Core 3.1 to .NET 10: queue throughput **more than doubled**, memory usage dropped and deployment went from **8 pods to 1**.',
      },
      {
        pt: 'Gestão de toda a infraestrutura AWS e de 6 bancos RDS em ambiente regulado de alta segurança; **−23%** nos custos de AWS, principalmente com instâncias reservadas.',
        en: 'Managed the full AWS infrastructure and 6 RDS databases in a high-security regulated environment; cut AWS costs by **23%**, largely through reserved instances.',
      },
      {
        pt: 'Redesenhei a arquitetura de processamento para absorver um novo cliente com volume diário maior que **o dobro** de todo o volume anterior da empresa; introduzi o RabbitMQ Shovel no fluxo de mensageria.',
        en: "Redesigned the processing architecture to absorb a new client whose daily volume exceeded **twice** the company's previous total; introduced RabbitMQ Shovel into the messaging workflow.",
      },
      {
        pt: 'Otimização de aplicações críticas em Java e C# e tuning de PostgreSQL e MySQL, reduzindo uso de memória e CPU.',
        en: 'Optimized critical Java and C# applications and tuned PostgreSQL/MySQL, reducing memory and CPU usage.',
      },
      {
        pt: 'Criei os conjuntos de regras de Claude Code e Cursor (CLAUDE.md, padrões de código) adotados por um time de **20+ desenvolvedores**.',
        en: 'Established Claude Code and Cursor rule sets (CLAUDE.md, coding standards) adopted by a team of **20+ developers**.',
      },
    ],
    tags: [
      { label: '.NET 10' },
      { label: 'AWS' },
      { label: 'RabbitMQ' },
      { label: 'PostgreSQL' },
      { label: 'MySQL' },
      { label: 'Claude Code', accent: true },
    ],
  },
  {
    period: '11/2023 — 08/2025',
    role: 'Senior Development Analyst & Systems Architect',
    company: 'BTG Pactual',
    place: 'São Paulo-SP',
    note: {
      pt: 'Entrei pela Act Digital como Desenvolvedor Backend Pleno (prevenção a fraudes); contratado direto como Sênior em 03/2025.',
      en: 'Joined via Act Digital as Mid-Level Backend Developer (fraud prevention); hired directly as Senior in 03/2025.',
    },
    stage: 'recent',
    bullets: [
      {
        pt: 'Liderei a entrega técnica do projeto de redução de latência do PIX (eu e 2 devs plenos), desenhando a arquitetura e validando com o time de arquitetura do banco: P95 do fluxo antifraude de **~7s para ~4,5s**, dentro do novo limite de 5s do BACEN.',
        en: "Led the technical delivery of the PIX latency-reduction project (myself and 2 mid-level developers), designing the architecture and validating it with the bank's architecture team: P95 latency of the fraud-prevention flow went from **~7s to ~4.5s**, meeting the new BACEN 5s limit.",
      },
      {
        pt: 'Mecanismo próprio de timeout/fallback com threads concorrentes, no lugar do timeout impreciso do HttpClient, com degradação determinística para PIX e TED em falhas de fornecedores externos.',
        en: 'Designed a custom timeout/fallback mechanism using concurrent threads, replacing the imprecise HttpClient timeout and enabling deterministic degradation paths for PIX and TED during external vendor failures.',
      },
      {
        pt: 'Menos custo e latência: AWS Lambdas migradas para CronJobs nativos no EKS, job de repasse de fila trocado por RabbitMQ Shovel e cache em Redis para eliminar chamadas HTTP redundantes.',
        en: 'Cut infrastructure cost and latency by migrating AWS Lambdas to native EKS CronJobs, replacing a queue relay job with RabbitMQ Shovel and adding Redis caching to eliminate redundant HTTP calls.',
      },
      {
        pt: 'Observabilidade completa com Datadog (dashboards, alertas, integração com o Command Center), reduzindo o MTTR de incidentes em sistemas críticos.',
        en: 'Implemented full observability with Datadog (dashboards, alerts, Command Center integration), reducing incident MTTR in critical systems.',
      },
      {
        pt: 'SLA de entrega do time de **7 dias para 1** com otimização de processo e automação.',
        en: 'Reduced team delivery SLA from **7 days to 1** through process optimization and automation.',
      },
      {
        pt: 'Serviços .NET para o departamento de prevenção a fraudes, migrando de .NET Core 3.1 para 6 e depois 8.',
        en: 'Developed .NET backend services for the fraud-prevention department, migrating the stack from .NET Core 3.1 to 6 and later 8.',
      },
      {
        pt: 'Mentoria de 4 novos desenvolvedores e cultura de testes unitários, reduzindo defeitos em produção.',
        en: 'Mentored 4 new developers and established a unit testing culture, reducing production defects.',
      },
    ],
    tags: [
      { label: 'PIX' },
      { label: '.NET 8' },
      { label: 'EKS' },
      { label: 'RabbitMQ' },
      { label: 'Redis' },
      { label: 'Datadog' },
    ],
  },
  {
    period: '09/2021 — 11/2023',
    role: { pt: 'Analista Desenvolvedor Pleno (Backend C#)', en: 'Mid-Level Development Analyst (C# Backend)' },
    company: 'Linx/Stone',
    place: { pt: 'Remoto/Bauru-SP/São Paulo-SP', en: 'Remote/Bauru-SP/São Paulo-SP' },
    note: {
      pt: 'Analista Desenvolvedor I e II; ponto focal do time de backend C# no novo ecossistema de PDV (food service).',
      en: 'Analyst Developer I and II; focal point of the C# backend team on the new Point of Sale ecosystem (food service).',
    },
    bullets: [
      {
        pt: 'Arquitetura offline-first do novo PDV (persistência local sem conexão, sincronização ao reconectar), com integração fiscal (NF-e, SAT) e foco em alta disponibilidade.',
        en: 'Designed the offline-first architecture of the new Point of Sale platform (local persistence when offline, sync on reconnection), with fiscal integration (NF-e, SAT) and high-availability focus.',
      },
      {
        pt: 'Rearquitetura do backend C#: removi uma máquina de estados instável, racionalizei o uso de filas e padronizei design patterns; upgrade de .NET Core 3.1 para .NET 5 e depois .NET 8.',
        en: 'Re-architected the C# backend: removed an unreliable state machine, rationalized message-queue usage and standardized design patterns; upgraded from .NET Core 3.1 to .NET 5 and later .NET 8.',
      },
      {
        pt: 'Modelagem e gestão de toda a infraestrutura Azure: SQL Database, AKS, Application Insights e pipelines de CI/CD para dev, teste e produção.',
        en: 'Modeled and managed the full Azure infrastructure: SQL Database, AKS, Application Insights and CI/CD pipelines for dev, test and production.',
      },
      {
        pt: 'Regras de negócio complexas, incluindo roteamento em grafos (VRP), e integrações com terceiros (cupons, APIs fiscais) com .NET e MongoDB.',
        en: 'Implemented complex business rules, including graph-based routing (VRP), and third-party integrations (promo codes, fiscal APIs) using .NET and MongoDB.',
      },
      {
        pt: "Treinei 4 novos desenvolvedores; defini padrões de código, revisão de PR e Git Flow. Clientes como Habib's, Bob's e Rei do Mate.",
        en: "Trained 4 new developers; defined coding standards, PR review and Git Flow practices. Clients such as Habib's, Bob's and Rei do Mate.",
      },
    ],
    tags: [{ label: 'C#' }, { label: 'AKS' }, { label: 'SQL Server' }, { label: 'MongoDB' }],
  },
  {
    period: '09/2020 — 10/2021',
    role: { pt: 'Desenvolvedor de Software', en: 'Software Developer' },
    company: 'Ez.Devs',
    place: { pt: 'Remoto', en: 'Remote' },
    note: {
      pt: 'Outsourcing: projetos fullstack e backend, os últimos 7 meses alocado no time de P&D da Linx.',
      en: "Outsourcing: fullstack and backend projects, the last 7 months allocated to Linx's R&D team.",
    },
    bullets: [
      {
        pt: 'Aplicação web fullstack de food service com Node.js, React e PostgreSQL.',
        en: 'Built a fullstack foodservice web application with Node.js, React and PostgreSQL.',
      },
      {
        pt: 'Concluí e refatorei um frontend Angular em fase final, melhorando estabilidade e padronização do código.',
        en: 'Completed and refactored a late-stage Angular frontend, improving stability and code standardization.',
      },
      {
        pt: 'Na Linx (P&D, divisão Food): KDS, painéis de pedidos e regras de negócio em C# ASP.NET MVC com MongoDB, integrando APIs de terceiros.',
        en: 'At Linx (R&D, Food division): developed KDS, order panels and business rules in C# ASP.NET MVC with MongoDB, integrating third-party APIs.',
      },
    ],
    tags: [{ label: 'Node.js' }, { label: 'React' }, { label: 'Angular' }, { label: 'ASP.NET MVC' }],
  },
  {
    period: '10/2018 — 09/2019',
    role: { pt: 'Estágio Backend', en: 'Backend Intern' },
    company: 'Assertiva',
    place: 'Campinas-SP',
    bullets: [
      {
        pt: 'Integrações com provedores externos (SMS, PABX, birôs de crédito) em Java e T-SQL, com comunicação resiliente entre sistemas na AWS, com SQL Server e PostgreSQL.',
        en: 'Built integrations with external providers (SMS, PBX, credit bureaus) in Java and T-SQL, ensuring resilient communication between systems on AWS with SQL Server and PostgreSQL.',
      },
      {
        pt: 'Pipelines de Big Data: ingestão, limpeza e análise de grandes volumes de dados.',
        en: 'Worked on Big Data pipelines: ingestion, cleaning and analysis of large datasets.',
      },
    ],
    tags: [{ label: 'Java' }, { label: 'T-SQL' }, { label: 'AWS' }],
  },
]

// Grupos de habilidades do currículo. `featured` ganha borda de acento.
export const skillGroups = [
  {
    label: { pt: 'ia & agentes/', en: 'ai & agents/' },
    featured: true,
    items: [
      'Claude',
      'Codex',
      'Claude Code',
      'AI Skills',
      'Agentic coding',
      { pt: 'Orquestração de agentes', en: 'Agent orchestration' },
    ],
  },
  { label: { pt: 'linguagens/', en: 'languages/' }, items: ['C#', '.NET', 'Java', 'Node.js'] },
  {
    label: 'cloud & devops/',
    items: ['AWS', 'Azure', 'Kubernetes (AKS/EKS)', 'Docker', 'Terraform', 'Azure DevOps', 'GitHub Actions'],
  },
  {
    label: { pt: 'mensageria & cache/', en: 'messaging & cache/' },
    items: ['RabbitMQ', 'Kafka', 'Redis'],
  },
  {
    label: { pt: 'bancos-de-dados/', en: 'databases/' },
    items: ['PostgreSQL', 'MySQL', 'SQL Server', 'MongoDB', 'DynamoDB'],
  },
  {
    label: { pt: 'observabilidade/', en: 'observability/' },
    items: ['Datadog', 'Splunk', 'Application Insights'],
  },
  {
    label: { pt: 'arquitetura/', en: 'architecture/' },
    items: [
      { pt: 'Microsserviços', en: 'Microservices' },
      'Design Patterns',
      { pt: 'Otimização de performance', en: 'Performance optimization' },
      { pt: 'Tuning de banco', en: 'Database tuning' },
      { pt: 'Fallback & resiliência', en: 'Fallback & resilience' },
    ],
  },
]

// Formação do currículo, da mais recente para a mais antiga.
export const education = [
  {
    period: '2020 — 2024',
    title: { pt: 'Bacharelado em Sistemas de Informação', en: "Bachelor's Degree in Information Systems" },
    school: { pt: 'UNESP (Universidade Estadual Paulista)', en: 'UNESP (São Paulo State University)' },
    place: 'Bauru-SP',
    note: { pt: 'Equivalente a Ciência da Computação.', en: 'Equivalent to Computer Science.' },
  },
  {
    period: '2017 — 2019',
    title: { pt: 'Técnico em Informática (Software)', en: 'Technical Degree in IT (Software)' },
    school: {
      pt: 'COTIL / UNICAMP (Universidade Estadual de Campinas)',
      en: 'COTIL / UNICAMP (State University of Campinas)',
    },
    place: 'Limeira-SP',
    note: null,
  },
]

// Idiomas e certificações (lista curta abaixo da formação). Lista vazia esconde o bloco.
export const languages = [
  { name: { pt: 'Português', en: 'Portuguese' }, level: { pt: 'nativo', en: 'native' } },
  { name: { pt: 'Inglês', en: 'English' }, level: { pt: 'profissional', en: 'professional working' } },
]

export const certifications = [
  'AWS Academy Graduate — Cloud Foundations',
  { pt: 'Domain Driven Design', en: 'Domain Driven Design' },
  'Spring MVC I & II',
  'Maven',
]
