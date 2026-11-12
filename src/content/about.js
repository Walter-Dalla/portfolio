// Página Sobre. Parágrafos e fatos com valor `null` não aparecem;
// a galeria só aparece com pelo menos uma foto. `links` e `link` apontam para rotas do site.
// Fatos de carreira seguem o CV (src/content/experiences.js) e o LinkedIn; os de projetos, src/content/projects.js.
const RESUME_LINK = { to: '/resume', label: { pt: 'ver no currículo →', en: 'see in resume →' } }
const ACHIEVEMENTS_LINK = { to: '/achievements', label: { pt: 'ver em conquistas →', en: 'see in achievements →' } }

export const about = {
  intro: {
    pt: 'Comecei a programar no técnico do COTIL/UNICAMP, segui para Sistemas de Informação na UNESP de Bauru e, desde 2018, construo software — hoje com agentes de IA.',
    en: 'I started coding at the COTIL/UNICAMP technical school, went on to Information Systems at UNESP Bauru and, since 2018, I have been building software — today with AI agents.',
  },
  // Texto em primeira pessoa: [{ text: { pt, en }, links: [{ to, label: { pt, en } }] }]
  paragraphs: [
    {
      text: {
        pt: 'Sou um arquiteto de software que gosta de ficar perto do código. Antes de desenhar uma solução, levanto requisitos direto com CEOs e CTOs dos clientes e vou ver a operação de perto. Pela minha própria consultoria, trabalho remotamente com times dos EUA e do Brasil, em inglês e português.',
        en: 'I am a software architect who likes to stay close to the code. Before I design a solution, I gather requirements directly with client CEOs and CTOs and go see the operation first-hand. Through my own consultancy, I work remotely with US and Brazilian teams, in English and Portuguese.',
      },
      links: [{ to: '/contact', label: { pt: 'falar comigo →', en: 'get in touch →' } }],
    },
    {
      text: {
        pt: 'Minha carreira passou pelo varejo e alimentação na Linx, onde desenhei a arquitetura offline-first do novo PDV. O trabalho de que mais me orgulho foi no BTG Pactual: como ponto focal técnico, levei a latência P95 da análise antifraude do PIX de ~7s para ~4,5s, abaixo do novo limite de 5s do Banco Central. Na Qyon, como único arquiteto, reduzi em 23% os custos de AWS. Hoje, na AgileEngine, construo fluxos de engenharia com agentes de IA: eles mudam a velocidade com que trabalho, mas o que mantém tudo seguro continua sendo arquitetura e padrões de engenharia. Ao longo do caminho, treinei e mentorei mais de 8 desenvolvedores.',
        en: "My career went through retail and food service at Linx, where I designed the offline-first architecture of the new POS. The work I'm proudest of was at BTG Pactual: as the technical focal point, I took the P95 latency of PIX fraud screening from ~7s to ~4.5s, under the Central Bank's new 5s limit. At Qyon, as the sole architect, I cut AWS costs by 23%. Today, at AgileEngine, I build engineering workflows with AI agents: they change how fast I move, but architecture and engineering standards are still what keeps it safe. Along the way, I have trained and mentored 8+ developers.",
      },
      links: [{ to: '/resume', label: { pt: 'ver currículo completo →', en: 'see full resume →' } }],
    },
    {
      text: {
        pt: 'Meus projetos se conectam: o fluxo com agentes nasceu no KittyCafé e virou o wh-harness, hoje usado também no GoPrint, feito para a Andelph Group, no Nesse Capítulo e neste portfólio. O KittyCafé e o GoPrint rodam em produção no meu homelab.',
        en: 'My projects connect: the agent workflow was born in KittyCafé and became wh-harness, now also used in GoPrint, built for Andelph Group, in Nesse Capítulo and in this portfolio. KittyCafé and GoPrint run in production on my homelab.',
      },
      links: [
        { to: '/projects/wh-harness', label: 'wh-harness →' },
        { to: '/projects/kittycafe', label: 'KittyCafé →' },
        { to: '/projects/goprint', label: 'GoPrint →' },
        { to: '/projects/homelab', label: 'Homelab →' },
        { to: '/projects', label: { pt: 'todos os projetos →', en: 'all projects →' } },
      ],
    },
    {
      text: {
        pt: 'Fiz o KittyCafé de propósito como um projeto de agentes: jogos, por definição, pedem mais loop e refinamento do que backends e sites em geral, porque são mais dinâmicos, e isso faz deles um ótimo teste de estresse para os agentes. Minha ideia agora é otimizar o wh-harness para gastar o mínimo de tokens por feature implementada.',
        en: 'I built KittyCafé on purpose as an agent project: games, by definition, need more looping and refinement than backends and websites in general, because they are more dynamic, which makes them a great stress test for the agents. My idea now is to optimize wh-harness to spend the minimum of tokens per implemented feature.',
      },
      links: [],
    },
    {
      text: {
        pt: 'Meu TCC na UNESP virou a ferramenta de análise comportamental de insetos, hoje em uso por 3 laboratórios de farmacologia da UNICAMP.',
        en: 'My undergraduate thesis at UNESP became the insect behavioral analysis tool, now in use by 3 pharmacology labs at UNICAMP.',
      },
      links: [
        {
          to: '/projects/insect-behavioral-analysis',
          label: { pt: 'ver o projeto →', en: 'see the project →' },
        },
        { to: '/achievements', label: { pt: 'ver conquistas →', en: 'see achievements →' } },
      ],
    },
  ],
  facts: [
    { label: { pt: 'base', en: 'based in' }, value: 'São Paulo, BR' },
    { label: { pt: '1º emprego', en: '1st job' }, value: { pt: '2018, Assertiva', en: '2018, Assertiva' } },
    { label: { pt: 'formação', en: 'education' }, value: 'UNESP · COTIL' },
    { label: { pt: 'agora', en: 'now' }, value: { pt: 'agentes de IA', en: 'AI agents' } },
    { label: { pt: 'atuação', en: 'works' }, value: { pt: 'remoto · BR e EUA', en: 'remote · BR and US' } },
    { label: { pt: 'idiomas', en: 'languages' }, value: 'PT · EN' },
    { label: { pt: 'hobby', en: 'hobby' }, value: null },
    { label: { pt: 'café ou chá', en: 'coffee or tea' }, value: null },
  ],
  // [{ src, caption: { pt, en }, size: 'large' | 'wide' | 'tall' | undefined }]
  gallery: [],
  story: [
    {
      year: '2017',
      text: {
        pt: 'Entro no técnico de Informática do COTIL/UNICAMP.',
        en: 'I join the IT technical program at COTIL/UNICAMP.',
      },
      link: ACHIEVEMENTS_LINK,
    },
    {
      year: '2018',
      text: {
        pt: 'Primeiro estágio, em backend, na Assertiva, com uma passagem pelo suporte para ver o produto pelo lado do cliente.',
        en: 'First internship, in backend, at Assertiva, with a spell in support to see the product from the customer side.',
      },
      link: RESUME_LINK,
    },
    {
      year: '2020',
      text: {
        pt: 'UNESP Bauru, freelas (integração com PayPal, sistema de comissionamento) e primeiro emprego como dev.',
        en: 'UNESP Bauru, freelance work (PayPal integration, a sales commission system) and my first job as a developer.',
      },
      link: RESUME_LINK,
    },
    {
      year: '2021',
      text: {
        pt: 'Entro na Linx (Grupo Stone) e desenho a arquitetura offline-first do novo PDV.',
        en: 'I join Linx (Stone Group) and design the offline-first architecture of the new POS.',
      },
      link: RESUME_LINK,
    },
    {
      year: '2023',
      text: {
        pt: 'Entro no BTG Pactual, na prevenção a fraudes, e depois sou promovido ao time de arquitetura.',
        en: 'I join BTG Pactual in fraud prevention and am later promoted to the architecture team.',
      },
      link: RESUME_LINK,
    },
    {
      year: '2024',
      text: {
        pt: 'Formatura na UNESP e início do software de análise de insetos.',
        en: 'Graduation at UNESP and the start of the insect-analysis software.',
      },
      link: {
        to: '/projects/insect-behavioral-analysis',
        label: { pt: 'ver o projeto →', en: 'see the project →' },
      },
    },
    {
      year: '2025',
      text: {
        pt: 'Único arquiteto na Qyon, cobrindo também DevOps e FinOps.',
        en: 'Sole architect at Qyon, also covering DevOps and FinOps.',
      },
      link: RESUME_LINK,
    },
    {
      year: '2026',
      text: {
        pt: 'Desenvolvimento orientado por IA na AgileEngine e, nos meus projetos, o wh-harness.',
        en: 'AI-driven development at AgileEngine and, in my own projects, wh-harness.',
      },
      link: { to: '/projects/wh-harness', label: { pt: 'ver o wh-harness →', en: 'see wh-harness →' } },
    },
  ],
}
