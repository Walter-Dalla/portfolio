// Linha do tempo do currículo, da mais recente para a mais antiga.
// O CV é a fonte da verdade: cargos, datas e descrições seguem o texto dele, em cada idioma.
// `**texto**` em um item vira destaque (número em mono, cor de acento).
// `stage`: 'current' (marcador cheio), 'recent' (contorno de acento) ou ausente (contorno neutro).
// `note` (opcional): linha curta abaixo da empresa, ex.: como entrou, cargos anteriores.
// `extra` (opcional): { photos: [{ src, alt }], text: { pt, en } } — bloco de fotos e texto extra.
// `positions` (opcional): a entrada vira um grupo de vínculos com a mesma empresa. `company` é o título
// do grupo, `note` diz como os vínculos se ligam e cada item de `positions` é um cargo com o texto do CV.
// Título, período e nota do grupo não vêm do CV. `stage` vale só na entrada (o marcador do trilho).
// `ai: true` num bullet ({ pt, en, ai: true }): o bullet também aparece na página /ai (Como trabalho com IA).
export const experiences = [
  {
    period: { pt: '09/2025 — atual', en: '09/2025 — present' },
    company: 'Walter Serviços de Arquitetura de Software LTDA',
    note: {
      pt: 'Minha empresa (PJ), pela qual atendi a Qyon e atendo a AgileEngine e a Andelph Group.',
      en: 'My own company, through which I served Qyon and now serve AgileEngine and Andelph Group.',
    },
    stage: 'current',
    positions: [
      {
        period: { pt: '07/2026 — atual', en: '07/2026 — present' },
        role: { pt: 'Desenvolvedor Fullstack Sênior Orientado a IA', en: 'Senior AI-Oriented Fullstack Developer' },
        company: { pt: 'AgileEngine (EUA)', en: 'AgileEngine (US)' },
        place: { pt: 'Remoto', en: 'Remote' },
        note: {
          pt: 'Contrato via consultoria própria (Walter Serviços de Arquitetura de Software LTDA); detalhes do cliente sob NDA.',
          en: 'Contract, via own consultancy (Walter Serviços de Arquitetura de Software LTDA); client details under NDA.',
        },
        bullets: [
          {
            pt: 'Projetei e implementei um harness customizado de orquestração de IA que executa skills programáticas de forma concorrente em múltiplas tarefas, viabilizando o desenvolvimento paralelizado.',
            en: 'Designed and implemented a custom AI orchestration harness that runs programmatic skills concurrently across multiple tasks, enabling parallelized development.',
            ai: true,
          },
          {
            pt: 'Construí fluxos de engenharia orientados por IA de ponta a ponta (análise, planejamento, implementação, testes, deploy) com agentes Claude e Codex, em Azure DevOps e Azure Cloud.',
            en: 'Built end-to-end AI-driven engineering workflows (analysis, planning, implementation, testing, deployment) with Claude and Codex agents, on Azure DevOps and Azure Cloud.',
            ai: true,
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
        role: { pt: 'Arquiteto de Sistemas & DevOps', en: 'Systems Architect & DevOps' },
        company: 'Qyon',
        place: { pt: 'Remoto', en: 'Remote' },
        note: {
          pt: 'Arquiteto único, atuando também em DevOps e FinOps; contrato via consultoria própria (Walter Serviços de Arquitetura de Software LTDA).',
          en: 'Sole architect, also covering DevOps and FinOps; contract via own consultancy (Walter Serviços de Arquitetura de Software LTDA).',
        },
        bullets: [
          {
            pt: 'Consolidei **8 microsserviços** quase idênticos em um único serviço (padrões Strategy e Template Method) e o migrei do .NET Core 3.1 para o .NET 10, **mais que dobrando** a vazão das filas e reduzindo o uso de memória.',
            en: 'Consolidated **8 near-identical microservices** into a single service (Strategy and Template Method patterns) and migrated it from .NET Core 3.1 to .NET 10, **more than doubling** queue throughput and reducing memory usage.',
          },
          {
            pt: 'Redesenhei a arquitetura de processamento, introduzindo o RabbitMQ Shovel no fluxo de mensageria, para absorver um novo cliente cujo volume diário superava **o dobro** do total anterior da empresa.',
            en: "Redesigned the processing architecture, introducing RabbitMQ Shovel into the messaging workflow, to absorb a new client whose daily volume exceeded **twice** the company's previous total.",
          },
          {
            pt: 'Gerenciei toda a infraestrutura AWS e 6 bancos de dados RDS em um ambiente regulado de alta segurança, reduzindo os custos de AWS em **23%**.',
            en: 'Managed the full AWS infrastructure and 6 RDS databases in a high-security regulated environment, cutting AWS costs by **23%**.',
          },
          {
            pt: 'Otimizei aplicações críticas em Java e C# e fiz o tuning de PostgreSQL/MySQL, reduzindo o uso de memória e CPU.',
            en: 'Optimized critical Java and C# applications and tuned PostgreSQL/MySQL, reducing memory and CPU usage.',
          },
          {
            pt: 'Estabeleci conjuntos de regras para Claude Code e Cursor (CLAUDE.md, padrões de código) adotados por um time de **mais de 20 desenvolvedores**.',
            en: 'Established Claude Code and Cursor rule sets (CLAUDE.md, coding standards) adopted by a team of **20+ developers**.',
            ai: true,
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
    ],
  },
  {
    period: '11/2023 — 08/2025',
    company: { pt: 'BTG Pactual e Act Digital', en: 'BTG Pactual and Act Digital' },
    note: {
      pt: 'Comecei como terceiro pela Act Digital e depois fui contratado diretamente pelo banco.',
      en: 'Started as a contractor through Act Digital, then was hired directly by the bank.',
    },
    stage: 'recent',
    positions: [
      {
        period: '11/2023 — 08/2025',
        role: {
          pt: 'Engenheiro de Software Sênior & Arquiteto de Sistemas',
          en: 'Senior Software Engineer & Systems Architect',
        },
        company: { pt: 'BTG Pactual (Banco de Investimentos)', en: 'BTG Pactual (Brazilian Investment Bank)' },
        place: 'São Paulo-SP',
        note: {
          pt: 'Desenvolvedor Backend Pleno, prevenção a fraudes (via Act Digital), a partir de nov/2023; contratado diretamente pelo banco e promovido ao time de arquitetura em mar/2025 após entregar a frente de prevenção a fraudes do projeto de latência do PIX.',
          en: 'Mid-Level Backend Developer, fraud prevention (via Act Digital), from Nov 2023; hired directly by the bank and promoted to the architecture team in Mar 2025 after delivering the fraud-prevention side of the PIX latency project.',
        },
        bullets: [
          {
            pt: 'Liderei, como ponto focal técnico, a frente antifraude do projeto de redução de latência do PIX no BTG: desenhei a arquitetura, validei-a com o time de arquitetura do banco e a entreguei com 2 desenvolvedores plenos, reduzindo a latência P95 do fluxo de análise antifraude de **~7s para ~4,5s**, dentro do novo limite de 5s do Banco Central (BACEN).',
            en: "Led the fraud-prevention side of BTG's PIX latency-reduction effort (PIX is Brazil's instant-payment system) as technical focal point: designed the architecture, validated it with the bank's architecture team and delivered it with 2 mid-level developers, cutting P95 latency of the fraud-screening flow from **~7s to ~4.5s**, within the Central Bank's (BACEN) new 5s limit.",
          },
          {
            pt: 'Projetei um mecanismo customizado de timeout/fallback que garante uma resposta determinística dentro do prazo mesmo quando um fornecedor externo trava, viabilizando caminhos de degradação controlada para transações PIX e TED.',
            en: 'Designed a custom timeout/fallback mechanism that guarantees a deterministic response within the deadline even when an external vendor hangs, enabling controlled degradation paths for PIX and TED (wire transfer) transactions.',
          },
          {
            pt: 'Migrei AWS Lambdas para CronJobs nativos do EKS, substituí um job de relay de filas pelo RabbitMQ Shovel e adicionei cache em Redis para eliminar chamadas HTTP redundantes, reduzindo custo de infraestrutura e latência.',
            en: 'Migrated AWS Lambdas to native EKS CronJobs, replaced a queue relay job with RabbitMQ Shovel and added Redis caching to eliminate redundant HTTP calls, cutting infrastructure cost and latency.',
          },
          {
            pt: 'Implementei observabilidade completa com DataDog (dashboards, alertas, Command Center), reduzindo o MTTR de incidentes em sistemas críticos.',
            en: 'Implemented full observability with DataDog (dashboards, alerts, Command Center), reducing incident MTTR in critical systems.',
          },
          {
            pt: 'Desenvolvi serviços backend em .NET para a área de prevenção a fraudes, migrando a stack do .NET Core 3.1 para o 6 e, posteriormente, para o 8.',
            en: 'Developed .NET backend services for the fraud-prevention department, migrating the stack from .NET Core 3.1 to 6 and later 8.',
          },
          {
            pt: 'Otimizei e automatizei o processo de entrega do time, reduzindo o SLA de entrega de **7 dias para 1**.',
            en: "Optimized and automated the team's delivery process, reducing delivery SLA from **7 days to 1**.",
          },
          {
            pt: 'Mentorei 4 novos desenvolvedores e estabeleci uma cultura de testes unitários, reduzindo defeitos em produção.',
            en: 'Mentored 4 new developers and established a unit testing culture, reducing production defects.',
          },
        ],
        tags: [
          { label: 'PIX' },
          { label: '.NET 8' },
          { label: 'EKS' },
          { label: 'RabbitMQ' },
          { label: 'Redis' },
          { label: 'DataDog' },
        ],
      },
    ],
  },
  {
    period: '09/2020 — 11/2023',
    company: { pt: 'Linx (Grupo Stone) e Ez.Devs', en: 'Linx (Stone Group) and Ez.Devs' },
    note: {
      pt: 'Comecei alocado na Linx pela Ez.Devs e depois fui contratado diretamente.',
      en: 'Started embedded at Linx through Ez.Devs, then was hired directly.',
    },
    positions: [
      {
        period: '10/2021 — 11/2023',
        role: { pt: 'Engenheiro de Software Pleno (Backend C#)', en: 'Mid-Level Software Engineer (C# Backend)' },
        company: {
          pt: 'Linx (Grupo Stone) - Software para Varejo e Food Service',
          en: 'Linx (Stone Group) - Retail & Food Software',
        },
        place: { pt: 'Remoto/Bauru-SP/São Paulo-SP', en: 'Remote/Bauru-SP/São Paulo-SP' },
        note: {
          pt: "Promovido de Engenheiro de Software I para II; ponto focal do time de backend no novo ecossistema de PDV para redes de alimentação (Habib's, Bob's, Rei do Mate).",
          en: "Promoted from Software Engineer I to II; focal point of the backend team on the new POS ecosystem for Brazilian food chains (Habib's, Bob's, Rei do Mate).",
        },
        bullets: [
          {
            pt: 'Projetei a arquitetura offline-first da nova plataforma de Ponto de Venda (persistência local quando offline, sincronização na reconexão), integrada aos sistemas de documentos fiscais eletrônicos (NFe, SAT) e construída para alta disponibilidade.',
            en: 'Designed the offline-first architecture of the new Point of Sale platform (local persistence when offline, sync on reconnection), integrated with Brazilian electronic tax-invoice systems (NFe, SAT) and built for high availability.',
          },
          {
            pt: 'Levantei requisitos diretamente com CEOs e CTOs dos clientes e visitei suas unidades para entender o dia a dia das operações, transformando necessidades de negócio no desenho técnico da nova plataforma de PDV.',
            en: 'Gathered requirements directly with client CEOs and CTOs and visited customer sites to understand day-to-day operations, turning business needs into the technical design of the new POS platform.',
          },
          {
            pt: 'Rearquitetei o backend em C#, removendo uma máquina de estados pouco confiável, racionalizando o uso de filas de mensagens e padronizando design patterns, e o atualizei do .NET Core 3.1 para o .NET 5.',
            en: 'Re-architected the C# backend, removing an unreliable state machine, rationalizing message-queue usage and standardizing design patterns, and upgraded it from .NET Core 3.1 to .NET 5.',
          },
          {
            pt: 'Modelei e gerenciei toda a infraestrutura Azure: SQL Database, AKS (Kubernetes), Application Insights e pipelines de CI/CD para desenvolvimento, testes e produção.',
            en: 'Modeled and managed the full Azure infrastructure: SQL Database, AKS (Kubernetes), Application Insights and CI/CD pipelines for dev, test and production.',
          },
          {
            pt: 'Implementei regras de negócio complexas, incluindo roteirização baseada em grafos (VRP), e integrações com terceiros (cupons promocionais, APIs fiscais) usando .NET e MongoDB.',
            en: 'Implemented complex business rules, including graph-based routing (VRP), and third-party integrations (promo codes, fiscal APIs) using .NET and MongoDB.',
          },
          {
            pt: 'Treinei 4 novos desenvolvedores e defini padrões de código, revisão de PRs e práticas de Git Flow.',
            en: 'Trained 4 new developers and defined coding standards, PR review and Git Flow practices.',
          },
        ],
        tags: [{ label: 'C#' }, { label: 'AKS' }, { label: 'SQL Server' }, { label: 'MongoDB' }],
      },
      {
        period: '09/2020 — 10/2021',
        role: { pt: 'Desenvolvedor de Software', en: 'Software Developer' },
        company: { pt: 'Ez.Devs (Outsourcing de Software)', en: 'Ez.Devs (Software Outsourcing)' },
        place: { pt: 'Remoto', en: 'Remote' },
        note: {
          pt: 'Entreguei projetos para 3 clientes diferentes, incluindo 7 meses alocado no time de P&D da Linx.',
          en: "Delivered projects for 3 different clients, including 7 months embedded in Linx's R&D team.",
        },
        bullets: [
          {
            pt: 'Linx (P&D, divisão Food): desenvolvi um Kitchen Display System (KDS), painéis de pedidos e regras de negócio em C# ASP.NET MVC com MongoDB, integrando APIs de terceiros.',
            en: 'Linx (R&D, Food division): developed a Kitchen Display System (KDS), order panels and business rules in C# ASP.NET MVC with MongoDB, integrating third-party APIs.',
          },
          {
            pt: 'Cliente de treinamento corporativo: construí uma plataforma interna de treinamentos como aplicação web fullstack com Node.js, React e PostgreSQL.',
            en: 'Corporate training client: built an internal training platform as a fullstack web application with Node.js, React and PostgreSQL.',
          },
          {
            pt: 'Governo do Estado de Mato Grosso do Sul: estabilizei um frontend Angular em fase final, corrigindo defeitos e padronizando a base de código.',
            en: 'State government of Mato Grosso do Sul (Brazil): stabilized a late-stage Angular frontend, fixing defects and standardizing the codebase.',
          },
        ],
        tags: [{ label: 'Node.js' }, { label: 'React' }, { label: 'Angular' }, { label: 'ASP.NET MVC' }],
      },
    ],
  },
  {
    period: '10/2018 — 09/2019',
    role: { pt: 'Estagiário Backend', en: 'Backend Intern' },
    company: 'Assertiva',
    place: 'Campinas-SP',
    bullets: [
      {
        pt: 'Construí dois serviços internos usados por toda a empresa: o sistema de health check que monitora as aplicações da empresa e o módulo compartilhado de e-mail utilizado por todos os times.',
        en: "Built two company-wide internal services: the health-check system monitoring the company's applications, and the shared email module used by all teams.",
      },
      {
        pt: 'Integrei provedores externos (SMS, PABX, birôs de crédito) em Java e T-SQL, na AWS com SQL Server e PostgreSQL.',
        en: 'Integrated external providers (SMS, PBX, credit bureaus) in Java and T-SQL, on AWS with SQL Server and PostgreSQL.',
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
    items: [{ pt: 'Orquestração de Agentes de IA (Claude, Codex)', en: 'AI Agent Orchestration (Claude, Codex)' }],
  },
  {
    label: { pt: 'linguagens & frameworks/', en: 'languages & frameworks/' },
    items: ['.NET', 'C#', 'Java', 'Node.js', 'React', 'Angular'],
  },
  {
    label: 'cloud & devops/',
    items: ['AWS', 'Azure', 'Kubernetes (AKS/EKS)', 'Docker', 'Terraform', 'CI/CD (Azure DevOps, GitHub Actions)'],
  },
  {
    label: { pt: 'mensageria & cache/', en: 'messaging & cache/' },
    items: ['RabbitMQ', 'Kafka', 'Redis'],
  },
  {
    label: { pt: 'bancos-de-dados/', en: 'databases/' },
    items: ['PostgreSQL', 'SQL Server', 'MySQL', 'MongoDB', 'DynamoDB'],
  },
  {
    label: { pt: 'observabilidade/', en: 'observability/' },
    items: ['DataDog', 'Splunk'],
  },
  {
    label: { pt: 'arquitetura/', en: 'architecture/' },
    items: [{ pt: 'Arquitetura de Microsserviços', en: 'Microservices Architecture' }],
  },
]

// Formação do currículo, da mais recente para a mais antiga.
// `noteLink` (opcional): { href, label: { pt, en } } — link depois da nota.
export const education = [
  {
    period: '01/2020 — 12/2024',
    title: {
      pt: 'Bacharelado em Sistemas de Informação (equivalente a Ciência da Computação)',
      en: "Bachelor's Degree in Information Systems (Computer Science-equivalent)",
    },
    school: { pt: 'UNESP (Universidade Estadual Paulista)', en: 'UNESP (São Paulo State University)' },
    place: 'Bauru-SP',
    note: {
      pt: 'Ferramenta para Análise Comportamental de Insetos: software de análise de imagens para comportamento de insetos, em uso em produção por 3 laboratórios de farmacologia da UNICAMP.',
      en: 'Tool for Insect Behavioral Analysis: image analysis software for insect behavior, in production use by 3 pharmacology labs at UNICAMP.',
    },
    noteLink: {
      href: 'https://hdl.handle.net/11449/258670',
      label: { pt: 'Ver artigo', en: 'View Paper' },
    },
  },
  {
    period: '01/2017 — 12/2019',
    title: { pt: 'Curso Técnico em Informática (Software)', en: 'Technical Degree in IT (Software)' },
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
  { name: { pt: 'Português', en: 'Portuguese' }, level: { pt: 'Nativo', en: 'Native or Bilingual Proficiency' } },
  {
    name: { pt: 'Inglês', en: 'English' },
    level: { pt: 'Avançado (proficiência profissional)', en: 'Professional Working Proficiency' },
  },
]

export const certifications = [
  'AWS Academy Graduate — Cloud Foundations',
  { pt: 'Domain Driven Design', en: 'Domain Driven Design' },
  'Spring MVC I & II',
  'Maven',
]

// Licenças e certificados completos (do LinkedIn), atrás do "mostrar mais" no cartão de certificações.
// `issued` é 'AAAA-MM' e aparece como MM/AAAA; o título é o nome do curso, sem tradução; agrupados por
// `issuer` na ordem em que aparecem aqui. `url` é o link "Exibir credencial".
export const credentials = [
  {
    issuer: 'AWS',
    title: 'AWS Academy Graduate — AWS Academy Introduction to Cloud Semester 1',
    issued: '2023-12',
    url: 'https://www.credly.com/badges/497599f5-1abb-416e-9050-32d2bdccdf16/linked_in_profile',
  },
  {
    issuer: 'AWS',
    title: 'AWS Academy Graduate — AWS Academy Cloud Foundations',
    issued: '2023-06',
    url: 'https://www.credly.com/badges/eba990b8-a930-4ada-81da-261e4ede07be/print',
  },
  {
    issuer: 'Full Cycle',
    title: 'Curso de Domain Driven Design',
    issued: '2023-08',
    url: 'https://fullcycle.com.br/certificado/1cf6c31d-a05a-4cc0-8977-53ea750e014a',
  },
  {
    issuer: 'Full Cycle',
    title: 'Curso de Fundamentos da arquitetura de software',
    issued: '2023-03',
    url: 'https://fullcycle.com.br/certificado/a0576640-7559-471d-93c2-726f318d807a',
  },
  {
    issuer: 'Alura',
    title: 'Java Parte 1: Primeiros passos',
    issued: '2018-10',
    url: 'https://cursos.alura.com.br/certificate/b137de01-2616-473c-8dad-bc2ef5b50a28',
  },
  {
    issuer: 'Alura',
    title: 'Java Parte 2: Introdução à orientação a objetos',
    issued: '2018-10',
    url: 'https://cursos.alura.com.br/certificate/0955f25d-0531-4035-949c-620166f203b4',
  },
  {
    issuer: 'Alura',
    title: 'Java Parte 3: Entendendo herança e interface',
    issued: '2018-10',
    url: 'https://cursos.alura.com.br/certificate/023fb869-cf2c-4884-9c51-4e2fb9bff81f',
  },
  {
    issuer: 'Alura',
    title: 'Java Parte 4: Entendendo exceções',
    issued: '2018-10',
    url: 'https://cursos.alura.com.br/user/walter-dalla/course/java-excecoes/certificate',
  },
  {
    issuer: 'Alura',
    title: 'Java Parte 5: Pacotes e java.lang',
    issued: '2018-10',
    url: 'https://cursos.alura.com.br/user/walter-dalla/course/java-pacotes-e-java-lang/certificate',
  },
  {
    issuer: 'Alura',
    title: 'Java Parte 6: Conhecendo o java.util',
    issued: '2018-10',
    url: 'https://cursos.alura.com.br/user/walter-dalla/course/java-util-lambdas/certificate',
  },
  {
    issuer: 'Alura',
    title: 'Java Parte 7: Trabalhando com java.io',
    issued: '2018-10',
    url: 'https://cursos.alura.com.br/user/walter-dalla/course/java-trabalhando-com-io/certificate',
  },
  {
    issuer: 'Alura',
    title: 'Java: Dominando as Collections',
    issued: '2018-10',
    url: 'https://cursos.alura.com.br/user/walter-dalla/course/java-collections/certificate',
  },
  {
    issuer: 'Alura',
    title: 'Java e JPA: Persista seus objetos com a JPA2 e Hibernate',
    issued: '2018-10',
    url: 'https://cursos.alura.com.br/user/walter-dalla/course/persistencia-de-objetos-com-jpa-hibernate/certificate',
  },
  {
    issuer: 'Alura',
    title: 'Servlet Parte 1: Fundamentos da programação web Java',
    issued: '2018-10',
    url: 'https://cursos.alura.com.br/user/walter-dalla/course/servlets-fundamentos-programacao-web-java/certificate',
  },
  {
    issuer: 'Alura',
    title: 'Servlet Parte 2: Autenticação, autorização e o padrão MVC',
    issued: '2018-10',
    url: 'https://cursos.alura.com.br/user/walter-dalla/course/servlet-autenticacao-autorizacao-mvc/certificate',
  },
  {
    issuer: 'Alura',
    title: 'Spring MVC I: Criando aplicações web',
    issued: '2018-10',
    url: 'https://cursos.alura.com.br/certificate/01549c8f-9835-4cf8-8d53-420a67eaaa60',
  },
  {
    issuer: 'Alura',
    title: 'Spring MVC II: Integração, cache, segurança e templates',
    issued: '2019-01',
    url: 'https://cursos.alura.com.br/user/walter-dalla/course/springmvc-2-integracao-cache-seguranca-e-templates/certificate',
  },
  {
    issuer: 'Alura',
    title: 'Spring Boot: Agilidade no desenvolvimento Java com Spring',
    issued: '2019-01',
    url: 'https://cursos.alura.com.br/user/walter-dalla/course/springboot/certificate',
  },
  {
    issuer: 'Alura',
    title: 'Maven: Build do zero à web',
    issued: '2018-12',
    url: 'https://cursos.alura.com.br/user/walter-dalla/course/maven-build-do-zero-a-web/certificate',
  },
  {
    issuer: 'Alura',
    title: 'Modelagem de banco de dados relacional: Índices e normalização',
    issued: '2018-02',
    url: 'https://cursos.alura.com.br/user/walter-dalla/course/modelagem-banco-relacional/certificate',
  },
  {
    issuer: 'Alura',
    title: 'MySQL I: Iniciando suas consultas',
    issued: '2019-02',
    url: 'https://cursos.alura.com.br/user/walter-dalla/course/introducao-a-banco-de-dados-e-sql/certificate',
  },
  {
    issuer: 'Alura',
    title: 'Python 3: Introdução à orientação a objetos',
    issued: '2019-02',
    url: 'https://cursos.alura.com.br/user/walter-dalla/course/python-3-intro-orientacao-objetos/certificate',
  },
  {
    issuer: 'Alura',
    title: 'Kanban Parte 1: Fundamentos essenciais',
    issued: '2019-03',
    url: 'https://cursos.alura.com.br/user/walter-dalla/course/kanban-primeiros-passos/certificate',
  },
]
