// Dados pessoais e do topo do site. Campos `null` não aparecem na página:
// preencha quando tiver o arquivo (ponha em public/) ou o texto.
export const profile = {
  name: 'Walter Dalla Torre Neto',
  email: 'walterdallaprofissional@gmail.com',
  linkedin: 'https://linkedin.com/in/walter-dalla',
  linkedinHandle: 'in/walter-dalla',
  github: 'https://github.com/Walter-Dalla',
  githubHandle: 'Walter-Dalla',
  location: 'São Paulo, BR',
  timezone: 'UTC−3',
  // Retrato 4:5, ex.: '/img/walter.jpg'.
  photo: null,
  tagline: {
    pt: 'Desenvolvedor backend sênior, arquiteto de software e DevOps. Hoje construo com IA — Claude, Codex e orquestração de agentes.',
    en: 'Senior backend developer, software architect and DevOps engineer. Today I build with AI — Claude, Codex and agent orchestration.',
  },
  pitch: {
    pt: 'Construo sistemas que custam menos, respondem mais rápido e não param.',
    en: "I build systems that cost less, respond faster and don't go down.",
  },
  // Disponibilidade mostrada em Contato, ex.: aberto a oportunidades no Brasil e no exterior.
  availability: null,
}

// Empresa pela qual presto serviços como PJ. `null` esconde os blocos em Currículo e Contato.
export const company = {
  name: 'Walter Serviços de Arquitetura de Software LTDA',
  cnpj: '62.427.598/0001-57',
  location: 'São Paulo-SP',
  activity: {
    pt: 'Desenvolvimento e licenciamento de programas de computador customizáveis (CNAE 6202-3/00).',
    en: 'Development and licensing of customizable software (CNAE 6202-3/00).',
  },
  text: {
    pt: 'Minha empresa de arquitetura de software, pela qual atendo clientes como PJ — no Brasil e no exterior — em arquitetura, backend, DevOps e engenharia orientada por IA. Clientes: Qyon e AgileEngine (EUA).',
    en: 'My software architecture company, through which I serve clients as a contractor — in Brazil and abroad — in architecture, backend, DevOps and AI-driven engineering. Clients: Qyon and AgileEngine (USA).',
  },
}

// PDFs do currículo, servidos de public/cv/.
export const resumePdf = {
  pt: null,
  en: '/cv/walter-dalla-cv-en.pdf',
  // Data da última atualização dos PDFs, ex.: { pt: '05/2026', en: '05/2026' }.
  updated: null,
}

export const metrics = [
  {
    value: '−23%',
    label: { pt: 'custos de AWS', en: 'AWS costs' },
    source: 'Qyon · 2025–26',
  },
  {
    value: '8→1',
    label: { pt: 'pods após consolidar 8 microsserviços', en: 'pods after consolidating 8 microservices' },
    source: 'Qyon · 2025–26',
  },
  {
    value: '7→1',
    label: { pt: 'dias de SLA de entrega do time', en: 'days of team delivery SLA' },
    source: 'BTG Pactual · 2023–25',
  },
  {
    value: '~4,5s',
    label: { pt: 'P95 do antifraude PIX (antes ~7s)', en: 'PIX fraud-check P95 (down from ~7s)' },
    source: 'BTG Pactual · 2023–25',
  },
]
