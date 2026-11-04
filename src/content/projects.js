// Projetos: a lista alimenta Início (os `featured`), Projetos e a página de cada projeto.
// Campos `null` não aparecem. `sections` é o estudo de caso; seção sem parágrafos não entra.
// `cover`: imagem 16:10 em public/, ex.: '/img/projetos/insetos.jpg'.

export const projectCategories = [
  { id: 'research', label: { pt: 'pesquisa', en: 'research' } },
  { id: 'dotnet', label: '.NET' },
  { id: 'databases', label: { pt: 'bancos de dados', en: 'databases' } },
]

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
      pt: 'Software de análise de imagens que automatiza a observação de comportamento de insetos, usado por 2 laboratórios de farmacologia da UNICAMP.',
      en: 'Image-analysis software that automates the observation of insect behavior, used by 2 pharmacology labs at UNICAMP.',
    },
    lede: {
      pt: 'Um software de análise de imagens que transforma horas de observação manual em dados — hoje patenteado e em uso por 2 laboratórios de farmacologia da UNICAMP.',
      en: 'Image-analysis software that turns hours of manual observation into data — now patented and in use by 2 pharmacology labs at UNICAMP.',
    },
    tags: [{ pt: 'visão computacional', en: 'computer vision' }],
    cover: null,
    repo: null,
    patentUrl: null,
    facts: {
      role: null,
      status: { pt: 'Patenteado · em uso', en: 'Patented · in use' },
      adoption: {
        pt: '2 laboratórios de farmacologia — UNICAMP',
        en: '2 pharmacology labs — UNICAMP',
      },
    },
    sections: [
      { title: { pt: 'O problema', en: 'The problem' }, paragraphs: [] },
      { title: { pt: 'A solução', en: 'The solution' }, paragraphs: [] },
      {
        title: { pt: 'Resultado', en: 'Outcome' },
        paragraphs: [
          {
            pt: 'O software foi patenteado e adotado por 2 laboratórios de farmacologia da UNICAMP.',
            en: 'The software was patented and adopted by 2 pharmacology labs at UNICAMP.',
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
]

export const findProject = (slug) => projects.find((p) => p.slug === slug)
