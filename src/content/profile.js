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
    pt: 'Engenheiro de Software Sênior & Arquiteto de Sistemas',
    en: 'Senior Software Engineer & Systems Architect',
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
    pt: 'Minha empresa de arquitetura de software, pela qual atendo clientes como PJ — no Brasil e no exterior — em arquitetura, backend, DevOps e engenharia orientada por IA. Clientes: Qyon, AgileEngine (EUA) e Andelph Group.',
    en: 'My software architecture company, through which I serve clients as a contractor — in Brazil and abroad — in architecture, backend, DevOps and AI-driven engineering. Clients: Qyon, AgileEngine (USA) and Andelph Group.',
  },
}

// PDFs do currículo, servidos de public/cv/.
export const resumePdf = {
  pt: '/cv/walter-dalla-cv-pt.pdf',
  en: '/cv/walter-dalla-cv-en.pdf',
  // Data da última atualização dos PDFs, ex.: { pt: '05/2026', en: '05/2026' }.
  updated: { pt: '11/2026', en: '11/2026' },
}

export const metrics = [
  {
    value: '−23%',
    label: { pt: 'custos de AWS', en: 'AWS costs' },
    source: 'Qyon · 2025–26',
  },
  {
    value: '8→1',
    label: { pt: 'microsserviços consolidados em um único serviço', en: 'microservices consolidated into a single service' },
    source: 'Qyon · 2025–26',
  },
  {
    value: '7→1',
    label: { pt: 'dias de SLA de entrega do time', en: 'days of team delivery SLA' },
    source: 'BTG Pactual · 2023–25',
  },
  {
    value: '~36%',
    label: { pt: 'menos latência P95 na análise antifraude do PIX (~7s → ~4,5s)', en: 'lower P95 fraud-screening latency on PIX (~7s → ~4.5s)' },
    source: 'BTG Pactual · 2023–25',
  },
]
