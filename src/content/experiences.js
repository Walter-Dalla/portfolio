// Linha do tempo do currículo, da mais recente para a mais antiga.
// `**texto**` em um item vira destaque (número em mono, cor de acento).
// `stage`: 'current' (marcador cheio), 'recent' (contorno de acento) ou ausente (contorno neutro).
// `extra` (opcional): { photos: [{ src, alt }], text: { pt, en } } — bloco de fotos e texto extra.
export const experiences = [
  {
    period: { pt: '07/2026 — atual', en: '07/2026 — present' },
    role: 'Senior AI-Oriented Fullstack Developer',
    company: 'AgileEngine',
    place: { pt: 'Remoto (EUA)', en: 'Remote (USA)' },
    stage: 'current',
    bullets: [
      {
        pt: 'Software de saúde com workflows de IA usando Claude e Codex.',
        en: 'Healthcare software built with AI workflows using Claude and Codex.',
      },
      {
        pt: 'Harness próprio de orquestração de agentes, executando skills em paralelo.',
        en: 'Custom agent-orchestration harness running skills in parallel.',
      },
      {
        pt: 'Entrega e infraestrutura com Azure DevOps e Azure Cloud.',
        en: 'Delivery and infrastructure with Azure DevOps and Azure Cloud.',
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
    period: '08/2025 — 07/2026',
    role: 'Senior Systems Architect & DevOps',
    company: 'Qyon',
    place: 'Americana-SP',
    stage: 'recent',
    bullets: [
      {
        pt: 'Definição de padrões de arquitetura seguidos por mais de 20 desenvolvedores.',
        en: 'Defined architecture standards followed by 20+ developers.',
      },
      {
        pt: 'Infraestrutura AWS em ambiente de alta segurança.',
        en: 'AWS infrastructure in a high-security environment.',
      },
      { pt: 'Tuning de PostgreSQL e MySQL.', en: 'PostgreSQL and MySQL tuning.' },
      { pt: '**−23%** nos custos de AWS.', en: '**−23%** in AWS costs.' },
    ],
    tags: [
      { label: 'AWS' },
      { label: 'PostgreSQL' },
      { label: 'MySQL' },
      { label: { pt: 'Arquitetura', en: 'Architecture' } },
    ],
  },
  {
    period: '03/2025 — 08/2025',
    role: 'Senior Development Analyst & Systems Architect',
    company: 'BTG Pactual',
    place: 'São Paulo-SP',
    stage: 'recent',
    bullets: [
      {
        pt: 'Observabilidade com Datadog: **+216%** de eficiência.',
        en: 'Observability with Datadog: **+216%** efficiency.',
      },
      {
        pt: 'Fallback para PIX e TED, levando o SLA de **7 para 1 dia**.',
        en: 'PIX and TED fallback, taking the SLA from **7 days to 1**.',
      },
      { pt: 'Mentoria de 4 desenvolvedores.', en: 'Mentored 4 developers.' },
    ],
    tags: [{ label: 'Datadog' }, { label: 'PIX' }, { label: '.NET Core' }],
  },
  {
    period: '11/2023 — 03/2025',
    role: 'Mid-Level Development Analyst',
    company: 'Act Digital',
    place: { pt: 'alocado no BTG Pactual', en: 'outsourced to BTG Pactual' },
    bullets: [
      {
        pt: 'Sistema regulado pelo BACEN com latência reduzida de 2s para **<1s**.',
        en: 'BACEN-regulated system with latency cut from 2s to **<1s**.',
      },
      { pt: 'Fluxo biométrico do aplicativo.', en: 'Biometric flow of the mobile app.' },
    ],
    tags: [],
  },
  {
    period: '09/2021 — 11/2023',
    role: 'Mid-Level Development Analyst',
    company: 'Linx/Stone',
    place: null,
    bullets: [
      { pt: 'PDV com integração fiscal (NF-e, SAT).', en: 'POS with fiscal integration (NF-e, SAT).' },
      {
        pt: 'Infraestrutura Azure: AKS, SQL e Application Insights.',
        en: 'Azure infrastructure: AKS, SQL and Application Insights.',
      },
      {
        pt: "Clientes como Habib's, Bob's e Rei do Mate.",
        en: "Clients such as Habib's, Bob's and Rei do Mate.",
      },
    ],
    tags: [{ label: 'C#' }, { label: 'AKS' }, { label: 'SQL Server' }],
  },
  {
    period: '09/2020 — 08/2021',
    role: 'Junior Software Developer',
    company: 'Ez.Devs',
    place: { pt: 'alocado na Linx/Stone', en: 'outsourced to Linx/Stone' },
    bullets: [],
    tags: [],
  },
  {
    period: '10/2018 — 09/2019',
    role: { pt: 'Estágio Backend', en: 'Backend Internship' },
    company: 'Assertiva',
    place: null,
    bullets: [],
    tags: [],
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
      'AI Skills',
      'Agentic coding',
      { pt: 'Orquestração de agentes', en: 'Agent orchestration' },
    ],
  },
  { label: { pt: 'linguagens/', en: 'languages/' }, items: ['C#', '.NET Core', 'Java'] },
  { label: 'cloud/', items: ['AWS', 'Azure', 'Azure DevOps', 'AKS'] },
  {
    label: { pt: 'bancos-de-dados/', en: 'databases/' },
    items: ['PostgreSQL', 'MySQL', 'SQL Server', 'DynamoDB', 'MongoDB'],
  },
  {
    label: { pt: 'observabilidade/', en: 'observability/' },
    items: ['Datadog', 'Splunk', 'Application Insights'],
  },
  {
    label: { pt: 'arquitetura/', en: 'architecture/' },
    items: [
      { pt: 'Microsserviços', en: 'Microservices' },
      { pt: 'Padrões de arquitetura', en: 'Architecture standards' },
      { pt: 'Tuning de banco', en: 'Database tuning' },
      { pt: 'Fallback & resiliência', en: 'Fallback & resilience' },
    ],
  },
]
