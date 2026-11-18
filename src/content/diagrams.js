// Diagramas de arquitetura dos projetos, desenhados por src/components/ArchDiagram.jsx; a chave é o `slug` do projeto.
// Diagrama: { title, nodes, edges, groups, focus? }. Textos (`title`, `label`, `sub`, `detail`) são string ou { pt, en }.
// `nodes`: [{ id, label, sub?, col, row, layer, detail, tech? }], numa grade de até 4 colunas (col 0–3); label até
// 19 caracteres, sub até 24. `layer` é uma chave de `diagramLayers`; `detail` (uma ou duas frases) e `tech` (tags)
// aparecem no painel do explorador (src/components/ArchExplorer.jsx) quando o nó é selecionado. A ordem de `nodes`
// é a ordem do passo a passo ("anterior"/"próximo") do painel.
// `edges`: [{ from, to, label?, both?, bend? }] por id de nó; mesma linha ou coluna = reta, senão cotovelo
// (horizontal e depois vertical; `bend: 'v'` inverte: vertical e depois horizontal); `both` põe seta nas duas pontas.
// Rótulo só cabe em aresta vertical, em cotovelo ou em reta que atravessa uma célula vazia.
// `groups`: [{ id, label, nodes: [ids] }], moldura tracejada em volta dos nós.
// `focus` (opcional): id do nó que abre selecionado; sem ele, o primeiro nó da camada `app`.
// Desenhe só o que o projeto (src/content/projects.js: `about`, `stack`, `decisions`) ou o `detail` do nó dizem,
// sem endereços, nomes de máquina, segredos nem limites internos.

// Camadas dos nós, na ordem em que um pedido as atravessa.
export const diagramLayers = {
  client: { pt: 'cliente', en: 'client' },
  edge: { pt: 'borda', en: 'edge' },
  app: { pt: 'aplicação', en: 'application' },
  data: { pt: 'dados', en: 'data' },
  external: { pt: 'serviço externo', en: 'external service' },
  tooling: { pt: 'pipeline', en: 'pipeline' },
}

const SINGLE_IMAGE = { pt: 'imagem Docker única', en: 'single Docker image' }
const EDGE_HTTPS = { pt: 'borda · HTTPS', en: 'edge · HTTPS' }

export const diagrams = {
  homelab: {
    title: {
      pt: 'Arquitetura do Homelab: publicação das imagens, acesso pelo túnel e backup',
      en: 'Homelab architecture: image publishing, access through the tunnel and backup',
    },
    focus: 'tunnel',
    nodes: [
      {
        id: 'dev',
        label: { pt: 'máquina de dev', en: 'dev machine' },
        sub: { pt: 'build das imagens', en: 'image build' },
        col: 0,
        row: 0,
        layer: 'tooling',
        detail: {
          pt: 'As imagens Docker de cada aplicação são construídas na máquina de desenvolvimento, sempre a partir de código já versionado.',
          en: 'The Docker image of each application is built on the development machine, always from code that is already committed.',
        },
        tech: ['Docker'],
      },
      {
        id: 'trivy',
        label: 'Trivy',
        sub: { pt: 'scan antes do push', en: 'scan before the push' },
        col: 1,
        row: 0,
        layer: 'tooling',
        detail: {
          pt: 'Cada imagem passa por um scan de vulnerabilidades antes de ser publicada: falha HIGH ou CRITICAL com correção disponível bloqueia o push.',
          en: 'Every image goes through a vulnerability scan before it is published: a HIGH or CRITICAL finding with an available fix blocks the push.',
        },
        tech: ['Trivy'],
      },
      {
        id: 'zot',
        label: 'Zot',
        sub: { pt: 'registry de imagens', en: 'image registry' },
        col: 2,
        row: 0,
        layer: 'tooling',
        detail: {
          pt: 'Registry privado de imagens, acessível apenas pela rede interna.',
          en: 'A private image registry, reachable only from the internal network.',
        },
        tech: ['Zot', 'OCI'],
      },
      {
        id: 'komodo',
        label: 'Komodo',
        sub: { pt: 'stacks Docker', en: 'Docker stacks' },
        col: 3,
        row: 0,
        layer: 'tooling',
        detail: {
          pt: 'Cada aplicação é uma stack Docker gerida pelo Komodo, que faz o deploy a partir da imagem publicada no registry.',
          en: 'Each application is a Docker stack managed by Komodo, which deploys from the image published to the registry.',
        },
        tech: ['Komodo', 'Docker Compose'],
      },
      {
        id: 'internet',
        label: 'internet',
        col: 0,
        row: 1,
        layer: 'client',
        detail: {
          pt: 'Usuários e clientes chegam pelo domínio público de cada aplicação.',
          en: 'Users and clients come in through the public domain of each application.',
        },
      },
      {
        id: 'tunnel',
        label: 'Cloudflare Tunnel',
        col: 1,
        row: 1,
        layer: 'edge',
        detail: {
          pt: 'A única entrada vinda da internet é um túnel de saída: o servidor não tem nenhuma porta aberta.',
          en: 'The only way in from the internet is an outbound tunnel: the server has no open ports.',
        },
        tech: ['Cloudflare Tunnel'],
      },
      {
        id: 'cloudflared',
        label: 'cloudflared',
        col: 2,
        row: 1,
        layer: 'edge',
        detail: {
          pt: 'O conector do túnel roda como container e é o único que alcança as aplicações, pela rede Docker.',
          en: 'The tunnel connector runs as a container and is the only thing that reaches the applications, over the Docker network.',
        },
        tech: ['cloudflared'],
      },
      {
        id: 'apps',
        label: 'KittyCafé · GoPrint',
        sub: { pt: 'containers sem root', en: 'non-root containers' },
        col: 3,
        row: 1,
        layer: 'app',
        detail: {
          pt: 'As aplicações rodam em containers sem usuário root e sem porta publicada.',
          en: 'Applications run in containers with no root user and no published ports.',
        },
        tech: ['Docker'],
      },
      {
        id: 'backup',
        label: { pt: 'backup diário', en: 'daily backup' },
        sub: { pt: 'cópia fora do servidor', en: 'off-host copy' },
        col: 2,
        row: 2,
        layer: 'data',
        detail: {
          pt: 'Os bancos têm backup diário com cópia fora do servidor, e a restauração é ensaiada.',
          en: 'The databases are backed up daily with an off-host copy, and the restore is rehearsed.',
        },
      },
      {
        id: 'sqlite',
        label: { pt: 'bancos SQLite', en: 'SQLite databases' },
        col: 3,
        row: 2,
        layer: 'data',
        detail: {
          pt: 'Os dados de cada aplicação ficam num volume próprio, fora da imagem.',
          en: 'The data of each application lives in its own volume, outside the image.',
        },
        tech: ['SQLite'],
      },
    ],
    edges: [
      { from: 'dev', to: 'trivy' },
      { from: 'trivy', to: 'zot' },
      { from: 'zot', to: 'komodo' },
      { from: 'komodo', to: 'apps' },
      { from: 'internet', to: 'tunnel' },
      { from: 'tunnel', to: 'cloudflared' },
      { from: 'cloudflared', to: 'apps' },
      { from: 'apps', to: 'sqlite' },
      { from: 'sqlite', to: 'backup' },
    ],
    groups: [
      { id: 'internal', label: { pt: 'rede interna', en: 'internal network' }, nodes: ['zot', 'komodo'] },
      {
        id: 'docker',
        label: { pt: 'rede Docker · sem porta publicada', en: 'Docker network · no published ports' },
        nodes: ['cloudflared', 'apps'],
      },
    ],
  },
  goprint: {
    title: {
      pt: 'Arquitetura do GoPrint: SPA, túnel, API, banco, storage de anexos e e-mail',
      en: 'GoPrint architecture: SPA, tunnel, API, database, attachment storage and e-mail',
    },
    nodes: [
      {
        id: 'web',
        label: 'React SPA',
        sub: 'Vite · TypeScript',
        col: 0,
        row: 0,
        layer: 'client',
        detail: {
          pt: 'Aplicação de página única usada pela assistência e pelas empresas clientes. As telas do operador são carregadas sob demanda, e os anexos sobem direto para o storage, com barra de progresso.',
          en: 'A single-page app used by the service provider and by the client companies. Operator screens load on demand, and attachments upload straight to storage with a progress bar.',
        },
        tech: ['React 18', 'Vite', 'TypeScript'],
      },
      {
        id: 'edge',
        label: 'Cloudflare Tunnel',
        sub: EDGE_HTTPS,
        col: 1,
        row: 0,
        layer: 'edge',
        detail: {
          pt: 'A aplicação e o storage são publicados por um túnel de saída: nenhum serviço expõe porta na internet, e o tráfego já chega com TLS.',
          en: 'The application and the storage are published through an outbound tunnel: no service exposes a port to the internet, and traffic arrives already under TLS.',
        },
        tech: ['Cloudflare Tunnel'],
      },
      {
        id: 'api',
        label: 'ASP.NET Core',
        sub: { pt: '.NET 10 · API REST', en: '.NET 10 · REST API' },
        col: 2,
        row: 0,
        layer: 'app',
        detail: {
          pt: 'API em camadas (controllers, serviços e repositórios) que também serve o front. Autenticação por JWT, isolamento por empresa em toda consulta, limite de requisições, health checks e erros no padrão ProblemDetails.',
          en: 'A layered API (controllers, services and repositories) that also serves the front end. JWT authentication, per-company isolation on every query, rate limiting, health checks and errors as ProblemDetails.',
        },
        tech: ['.NET 10', 'JWT', 'ProblemDetails', 'OpenAPI'],
      },
      {
        id: 'db',
        label: 'PostgreSQL',
        sub: 'Dapper · DbUp',
        col: 3,
        row: 0,
        layer: 'data',
        detail: {
          pt: 'Banco relacional acessado com SQL explícito via Dapper. O esquema evolui por migrations versionadas, aplicadas na subida da aplicação, e toda mudança de chamado grava o histórico na mesma transação.',
          en: 'A relational database queried with explicit SQL through Dapper. The schema evolves through versioned migrations applied at startup, and every ticket change writes its history in the same transaction.',
        },
        tech: ['PostgreSQL 16', 'Dapper', 'DbUp'],
      },
      {
        id: 'storage',
        label: 'MinIO (S3)',
        sub: { pt: 'anexos dos chamados', en: 'ticket attachments' },
        col: 1,
        row: 1,
        layer: 'data',
        detail: {
          pt: 'Fotos, vídeos e PDFs sobem do navegador direto para o storage, por um formulário pré-assinado com tamanho e tipo travados. A API confere o objeto antes de registrá-lo e entrega links de leitura temporários.',
          en: 'Photos, videos and PDFs go from the browser straight to storage through a pre-signed form with size and type locked. The API checks the object before recording it and hands out temporary read links.',
        },
        tech: ['MinIO', { pt: 'API S3', en: 'S3 API' }, { pt: 'URLs pré-assinadas', en: 'pre-signed URLs' }],
      },
      {
        id: 'mail',
        label: 'SendGrid',
        sub: { pt: 'e-mail transacional', en: 'transactional e-mail' },
        col: 3,
        row: 1,
        layer: 'external',
        detail: {
          pt: 'Convites, redefinição de senha e avisos de mudança de status saem por uma fila em segundo plano, fora do ciclo da requisição.',
          en: 'Invitations, password resets and status-change notices go out through a background queue, outside the request cycle.',
        },
        tech: ['SendGrid'],
      },
    ],
    edges: [
      { from: 'web', to: 'edge' },
      { from: 'edge', to: 'api' },
      { from: 'api', to: 'db' },
      { from: 'edge', to: 'storage', label: { pt: 'upload direto', en: 'direct upload' } },
      { from: 'api', to: 'storage', bend: 'v', label: { pt: 'assina', en: 'signs' } },
      { from: 'api', to: 'mail', bend: 'v', label: { pt: 'fila', en: 'queue' } },
    ],
    groups: [{ id: 'image', label: SINGLE_IMAGE, nodes: ['api'] }],
  },
  kittycafe: {
    title: {
      pt: 'Arquitetura do KittyCafé: cliente Godot, túnel, backend, banco, login e catálogos',
      en: 'KittyCafé architecture: Godot client, tunnel, backend, database, sign-in and catalogs',
    },
    nodes: [
      {
        id: 'client',
        label: 'Godot 4',
        sub: { pt: 'cliente 3D isométrico', en: 'isometric 3D client' },
        col: 0,
        row: 0,
        layer: 'client',
        detail: {
          pt: 'Cliente em Godot 4 com cena 3D isométrica; o mesmo projeto gera os builds de web, Windows e Android. Ele só anima o que o servidor já decidiu: nenhuma regra de economia roda no cliente.',
          en: 'A Godot 4 client with an isometric 3D scene; the same project produces the web, Windows and Android builds. It only animates what the server has already decided: no economy rule runs on the client.',
        },
        tech: ['Godot 4', 'GDScript', 'WebAssembly'],
      },
      {
        id: 'tunnel',
        label: 'Cloudflare Tunnel',
        sub: EDGE_HTTPS,
        col: 1,
        row: 0,
        layer: 'edge',
        detail: {
          pt: 'O jogo é publicado por um túnel de saída, sem porta aberta no servidor. A borda cuida de TLS e compressão, e o IP real do jogador alimenta os limites de requisição.',
          en: 'The game is published through an outbound tunnel, with no open port on the server. The edge handles TLS and compression, and the real player IP feeds the rate limits.',
        },
        tech: ['Cloudflare Tunnel'],
      },
      {
        id: 'backend',
        label: '.NET 10',
        sub: { pt: 'backend REST', en: 'REST backend' },
        col: 2,
        row: 0,
        layer: 'app',
        detail: {
          pt: 'Fonte da verdade do jogo: guarda timestamps e recalcula o estado a cada requisição, sem processamento em segundo plano. A mesma imagem serve a API e o build web do cliente.',
          en: 'The source of truth of the game: it stores timestamps and recomputes state on each request, with no background processing. The same image serves the API and the web build of the client.',
        },
        tech: ['.NET 10', 'ASP.NET Core', 'REST', 'JWT'],
      },
      {
        id: 'sqlite',
        label: 'SQLite',
        sub: { pt: 'documentos JSON · WAL', en: 'JSON documents · WAL' },
        col: 3,
        row: 0,
        layer: 'data',
        detail: {
          pt: 'Cada coleção é uma tabela de documentos JSON, com uma transação por requisição e modo WAL. O banco vive num volume próprio, com backup diário e ensaio de restauração.',
          en: 'Each collection is a table of JSON documents, with one transaction per request and WAL mode. The database lives in its own volume, with daily backups and restore rehearsals.',
        },
        tech: ['SQLite', 'WAL'],
      },
      {
        id: 'google',
        label: 'Google Sign-In',
        sub: 'OAuth 2.0 + PKCE',
        col: 1,
        row: 1,
        layer: 'external',
        detail: {
          pt: 'Único login do jogo: o backend troca o código de autorização no Google e emite um token de acesso de curta duração com refresh token rotativo. A mesma conta abre o mesmo café em qualquer plataforma.',
          en: 'The only sign-in of the game: the backend exchanges the authorization code with Google and issues a short-lived access token with a rotating refresh token. The same account opens the same café on every platform.',
        },
        tech: ['OAuth 2.0', 'PKCE', 'OpenID Connect'],
      },
      {
        id: 'catalogs',
        label: { pt: 'catálogos JSON', en: 'JSON catalogs' },
        sub: { pt: 'versionados no git', en: 'versioned in git' },
        col: 3,
        row: 1,
        layer: 'data',
        detail: {
          pt: 'Cardápio, móveis, missões e personagens são dados versionados no repositório e ressincronizados no banco a cada subida: ajustar o jogo é editar um arquivo, não migrar dados.',
          en: 'Menu, furniture, quests and characters are data versioned in the repository and re-synced into the database on every startup: tuning the game means editing a file, not migrating data.',
        },
        tech: ['JSON'],
      },
    ],
    edges: [
      { from: 'client', to: 'tunnel' },
      { from: 'tunnel', to: 'backend' },
      { from: 'backend', to: 'sqlite' },
      { from: 'backend', to: 'google', bend: 'v', label: 'OAuth' },
      { from: 'catalogs', to: 'sqlite', label: 'seed' },
    ],
    groups: [{ id: 'image', label: SINGLE_IMAGE, nodes: ['backend'] }],
  },
  'cartas-malfaladas': {
    title: {
      pt: 'Arquitetura da Cartas Malfaladas: web, Android, API, contratos, regras e dados',
      en: 'Cartas Malfaladas architecture: web, Android, API, contracts, rules and data',
    },
    focus: 'api',
    nodes: [
      {
        id: 'contracts',
        label: { pt: 'pacote de contratos', en: 'contracts package' },
        sub: { pt: 'Zod, tipos e eventos', en: 'Zod, types and events' },
        col: 1,
        row: 0,
        layer: 'app',
        detail: {
          pt: 'Schemas Zod, tipos e eventos do Socket.IO vivem num pacote único do monorepo, importado pela API e pela web: uma mudança de contrato quebra a compilação dos dois lados, não a produção.',
          en: 'Zod schemas, types and Socket.IO events live in a single monorepo package imported by both the API and the web app: a contract change breaks the build on both sides, not production.',
        },
        tech: ['Zod', 'TypeScript', 'pnpm workspaces'],
      },
      {
        id: 'catalog',
        label: { pt: 'baralhos JSON', en: 'JSON decks' },
        sub: { pt: 'catálogo versionado', en: 'versioned catalog' },
        col: 3,
        row: 0,
        layer: 'data',
        detail: {
          pt: 'Os baralhos oficiais são arquivos JSON validados por schema e recarregados no banco a cada subida do servidor.',
          en: 'The official decks are JSON files validated by a schema and reloaded into the database on every server startup.',
        },
        tech: ['JSON', 'Zod'],
      },
      {
        id: 'web',
        label: 'Vite + React 19',
        sub: 'web',
        col: 0,
        row: 1,
        layer: 'client',
        detail: {
          pt: 'O cliente web só envia intenções (a carta jogada, o voto) e desenha o estado que o servidor empurra. Reconecta sozinho e volta ao mesmo lugar na mesa.',
          en: 'The web client only sends intent (the card played, the vote) and renders the state the server pushes. It reconnects on its own and returns to the same seat at the table.',
        },
        tech: ['React 19', 'Vite', 'TypeScript'],
      },
      {
        id: 'api',
        label: 'NestJS',
        sub: 'API + Socket.IO',
        col: 2,
        row: 1,
        layer: 'app',
        detail: {
          pt: 'HTTP e tempo real na mesma porta. O gateway valida cada evento com o schema do contrato, o serviço aplica uma regra por vez, e o estado da sala é enviado inteiro a cada mudança, numa visão própria para cada jogador.',
          en: 'HTTP and real time on the same port. The gateway validates every event against the contract schema, the service applies one rule at a time, and the whole room state is pushed on every change, in a view built for each player.',
        },
        tech: ['NestJS', 'Socket.IO', 'Node.js'],
      },
      {
        id: 'sqlite',
        label: 'SQLite',
        sub: 'Drizzle',
        col: 3,
        row: 1,
        layer: 'data',
        detail: {
          pt: 'Guarda contas, sessões e baralhos próprios, além de um snapshot de cada sala: depois de um restart as mesas voltam e os jogadores reconectam com o próprio token.',
          en: 'It stores accounts, sessions and custom decks, plus a snapshot of every room: after a restart the tables come back and players reconnect with their own token.',
        },
        tech: ['SQLite', 'Drizzle ORM'],
      },
      {
        id: 'android',
        label: 'Android',
        sub: 'Capacitor',
        col: 0,
        row: 2,
        layer: 'client',
        detail: {
          pt: 'O app Android é o próprio site dentro de um WebView do Capacitor, com login nativo da conta Google: publicar a web não exige uma nova versão na loja.',
          en: 'The Android app is the website itself inside a Capacitor WebView, with native Google account sign-in: shipping the web app does not require a new store release.',
        },
        tech: ['Capacitor', 'Android'],
      },
      {
        id: 'rules',
        label: { pt: 'regras do jogo', en: 'game rules' },
        sub: { pt: 'funções puras', en: 'pure functions' },
        col: 2,
        row: 2,
        layer: 'app',
        detail: {
          pt: 'As regras recebem a sala e devolvem uma sala nova ou um erro; relógio e aleatoriedade chegam por parâmetro. Por isso são testadas sem rede, inclusive com testes de mutação.',
          en: 'Rules take the room and return a new room or an error; clock and randomness come in as parameters. That is why they are tested without a network, mutation tests included.',
        },
        tech: ['TypeScript', 'Vitest', 'Stryker'],
      },
    ],
    edges: [
      { from: 'contracts', to: 'web' },
      { from: 'contracts', to: 'api' },
      { from: 'web', to: 'api', both: true, label: 'Socket.IO' },
      { from: 'api', to: 'sqlite' },
      { from: 'catalog', to: 'sqlite', label: 'seed' },
      { from: 'android', to: 'web', label: { pt: 'empacota', en: 'packages' } },
      { from: 'api', to: 'rules' },
    ],
    groups: [],
  },
  'nesse-capitulo': {
    title: {
      pt: 'Arquitetura do Nesse Capítulo: PWA, app Android, API, banco, login e fontes de livros',
      en: 'Nesse Capítulo architecture: PWA, Android app, API, database, sign-in and book sources',
    },
    nodes: [
      {
        id: 'twa',
        label: 'Android',
        sub: 'Trusted Web Activity',
        col: 0,
        row: 0,
        layer: 'client',
        detail: {
          pt: 'O mesmo PWA é empacotado como Trusted Web Activity para a Play Store, reaproveitando a sessão e a API da web.',
          en: 'The same PWA is packaged as a Trusted Web Activity for the Play Store, reusing the web session and API.',
        },
        tech: ['Trusted Web Activity', 'Android'],
      },
      {
        id: 'pwa',
        label: 'React 19 PWA',
        sub: 'Vite · Tailwind CSS',
        col: 1,
        row: 0,
        layer: 'client',
        detail: {
          pt: 'Interface mobile-first, instalável como app. Um service worker guarda as capas e a última página visitada, e o estado vindo do servidor é gerenciado com TanStack Query.',
          en: 'A mobile-first interface, installable as an app. A service worker caches covers and the last visited page, and server state is managed with TanStack Query.',
        },
        tech: ['React 19', 'Vite', 'Tailwind CSS', 'TanStack Query', 'Service Worker'],
      },
      {
        id: 'api',
        label: 'Hono',
        sub: 'API + front · Node.js',
        col: 2,
        row: 0,
        layer: 'app',
        detail: {
          pt: 'Um único processo Node.js entrega a API e o front compilado. Sessão em cookie HttpOnly, páginas públicas renderizadas no servidor em três idiomas e regras de acesso validadas no backend.',
          en: 'A single Node.js process serves the API and the compiled front end. HttpOnly cookie sessions, public pages rendered on the server in three languages and access rules enforced by the backend.',
        },
        tech: ['Hono', 'Node.js', 'TypeScript'],
      },
      {
        id: 'db',
        label: 'SQLite',
        sub: 'node:sqlite · WAL',
        col: 3,
        row: 0,
        layer: 'data',
        detail: {
          pt: 'Banco embutido do próprio Node, sem dependência nativa. O modelo é enxuto de propósito: capas não são armazenadas, vêm da fonte externa e ficam no cache do navegador.',
          en: 'The database built into Node itself, with no native dependency. The model is lean on purpose: covers are not stored, they come from the external source and stay in the browser cache.',
        },
        tech: ['SQLite', 'node:sqlite'],
      },
      {
        id: 'oauth',
        label: 'Google OAuth 2.0',
        sub: 'OpenID Connect',
        col: 1,
        row: 1,
        layer: 'external',
        detail: {
          pt: 'Login com Google implementado direto sobre OAuth 2.0 e OpenID Connect, sem biblioteca de autenticação; o mesmo fluxo atende a web e o app Android.',
          en: 'Google sign-in implemented directly on OAuth 2.0 and OpenID Connect, with no authentication library; the same flow serves the web and the Android app.',
        },
        tech: ['OAuth 2.0', 'OpenID Connect'],
      },
      {
        id: 'books',
        label: 'Google Books',
        sub: '+ Open Library',
        col: 3,
        row: 1,
        layer: 'external',
        detail: {
          pt: 'A busca de livros consulta o Google Books e passa para a Open Library quando a fonte principal falha, com cache por termo e limite de buscas por usuário.',
          en: 'Book search queries Google Books and switches to Open Library when the primary source fails, with caching per term and a per-user search limit.',
        },
        tech: ['Google Books API', 'Open Library'],
      },
    ],
    edges: [
      { from: 'twa', to: 'pwa' },
      { from: 'pwa', to: 'api' },
      { from: 'api', to: 'db' },
      { from: 'api', to: 'oauth', bend: 'v', label: 'login' },
      { from: 'api', to: 'books', bend: 'v', label: { pt: 'busca', en: 'search' } },
    ],
    groups: [{ id: 'process', label: { pt: 'processo Node único', en: 'single Node process' }, nodes: ['api'] }],
  },
  'wh-harness': {
    title: {
      pt: 'Arquitetura do wh-harness: da solicitação ao pull request',
      en: 'wh-harness architecture: from request to pull request',
    },
    focus: 'enrich',
    nodes: [
      {
        id: 'request',
        label: { pt: 'solicitação', en: 'request' },
        sub: '/wh:implementation',
        col: 0,
        row: 0,
        layer: 'client',
        detail: {
          pt: 'O trabalho entra como um pedido em linguagem natural ou uma lista de pendências numeradas; o comando do plugin assume a tarefa a partir daí.',
          en: 'Work comes in as a plain-language request or a numbered punch list; the plugin command takes the task from there.',
        },
        tech: ['Claude Code'],
      },
      {
        id: 'enrich',
        label: 'impl-enrich',
        sub: { pt: 'análise + plano', en: 'analysis + plan' },
        col: 1,
        row: 0,
        layer: 'app',
        detail: {
          pt: 'Subagente arquiteto: lê o código e a documentação, pergunta só o que o código não responde e escreve um plano em que cada item tem arquivos, símbolos e um comando de aceite executável.',
          en: 'The architect subagent: it reads the code and the docs, asks only what the code cannot answer and writes a plan in which every item has files, symbols and an executable acceptance command.',
        },
        tech: ['Claude Code', { pt: 'subagente', en: 'subagent' }],
      },
      {
        id: 'lanes',
        label: 'impl-dev',
        sub: { pt: 'faixas em worktrees', en: 'lanes in worktrees' },
        col: 2,
        row: 0,
        layer: 'app',
        detail: {
          pt: 'Tarefas grandes são divididas em faixas com arquivos disjuntos; cada faixa roda num subagente, em worktree e branch próprias, com um commit por item do plano.',
          en: 'Large tasks are split into lanes that own disjoint files; each lane runs in a subagent on its own worktree and branch, with one commit per plan item.',
        },
        tech: [{ pt: 'subagentes em paralelo', en: 'parallel subagents' }, 'git worktree'],
      },
      {
        id: 'qa',
        label: 'impl-qa',
        sub: { pt: 'revisão + QA final', en: 'review + final QA' },
        col: 3,
        row: 0,
        layer: 'app',
        detail: {
          pt: 'Um revisor sem o contexto de quem implementou confere o diff de cada faixa antes do merge; o QA final roda a suíte completa, os checks e o teste visual na branch integrada.',
          en: "A reviewer without the implementer's context checks each lane's diff before the merge; the final QA runs the full suite, the checks and the visual test on the integrated branch.",
        },
        tech: [{ pt: 'subagente', en: 'subagent' }, { pt: 'QA visual', en: 'visual QA' }],
      },
      {
        id: 'hook',
        label: 'prompt-graph',
        sub: { pt: 'hook determinístico', en: 'deterministic hook' },
        col: 0,
        row: 1,
        layer: 'tooling',
        detail: {
          pt: 'Hook em Python puro, sem LLM nem rede: cruza cada prompt com o glossário, o mapa de features e o índice CodeGraph do projeto e acrescenta só ponteiros ao contexto.',
          en: 'A pure-Python hook with no LLM and no network: it matches each prompt against the project glossary, feature map and CodeGraph index and adds only pointers to the context.',
        },
        tech: ['Python 3', 'CodeGraph'],
      },
      {
        id: 'profile',
        label: '.claude/profile',
        sub: { pt: 'fatos do projeto', en: 'project facts' },
        col: 1,
        row: 1,
        layer: 'data',
        detail: {
          pt: 'Cada repositório versiona só os seus fatos: comandos de build e teste, portas, documentos, limites e glossário. As skills citam seções do perfil, nunca um comando do projeto.',
          en: 'Each repository versions only its facts: build and test commands, ports, docs, limits and glossary. Skills cite sections of the profile, never a project command.',
        },
        tech: ['Markdown', 'JSON'],
      },
      {
        id: 'pr',
        label: 'pull request',
        sub: { pt: 'relatório + retro', en: 'report + retro' },
        col: 3,
        row: 1,
        layer: 'external',
        detail: {
          pt: 'A entrega é um pull request com o relatório da execução e a retrospectiva; o merge continua sendo uma decisão humana.',
          en: 'The delivery is a pull request with the run report and the retrospective; merging remains a human decision.',
        },
        tech: ['GitHub', 'GitHub CLI'],
      },
    ],
    edges: [
      { from: 'request', to: 'enrich' },
      { from: 'enrich', to: 'lanes' },
      { from: 'lanes', to: 'qa' },
      { from: 'qa', to: 'pr' },
      { from: 'hook', to: 'request', label: { pt: 'contexto', en: 'context' } },
      { from: 'profile', to: 'enrich' },
      { from: 'profile', to: 'lanes' },
    ],
    groups: [
      {
        id: 'plugin',
        label: { pt: 'plugin wh · procedimentos', en: 'wh plugin · procedures' },
        nodes: ['enrich', 'lanes', 'qa'],
      },
      // Rótulo curto: a linha do perfil até o impl-enrich sobe pelo meio da moldura.
      { id: 'repo', label: { pt: 'repositório', en: 'repository' }, nodes: ['profile'] },
    ],
  },
}

export const findDiagram = (slug) => diagrams[slug] ?? null

/** Nó que abre selecionado no explorador: `focus`, senão o primeiro da camada `app`, senão o primeiro. */
export const defaultNodeId = (diagram) =>
  diagram.focus ?? (diagram.nodes.find((n) => n.layer === 'app') ?? diagram.nodes[0]).id
