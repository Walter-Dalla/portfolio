// Diagramas de arquitetura dos projetos, desenhados por src/components/ArchDiagram.jsx; a chave é o `slug` do projeto.
// Diagrama: { title, nodes, edges, groups }. Textos (`title`, `label`, `sub`) são string ou { pt, en }.
// `nodes`: [{ id, label, sub?, col, row }], numa grade de até 4 colunas (col 0–3); label até 19 caracteres, sub até 24.
// `edges`: [{ from, to, label?, both? }] por id de nó; mesma linha ou coluna = reta, senão cotovelo; `both` põe seta nas duas pontas.
// `groups`: [{ id, label, nodes: [ids] }], moldura tracejada em volta dos nós.
// Desenhe só o que o texto `about` do projeto (src/content/projects.js) diz.

export const diagrams = {
  homelab: {
    title: {
      pt: 'Arquitetura do Homelab: publicação das imagens, acesso pelo túnel e backup',
      en: 'Homelab architecture: image publishing, access through the tunnel and backup',
    },
    nodes: [
      {
        id: 'dev',
        label: { pt: 'máquina de dev', en: 'dev machine' },
        sub: { pt: 'build das imagens', en: 'image build' },
        col: 0,
        row: 0,
      },
      { id: 'trivy', label: 'Trivy', sub: { pt: 'scan antes do push', en: 'scan before the push' }, col: 1, row: 0 },
      { id: 'zot', label: 'Zot', sub: { pt: 'registry de imagens', en: 'image registry' }, col: 2, row: 0 },
      { id: 'komodo', label: 'Komodo', sub: { pt: 'stacks Docker', en: 'Docker stacks' }, col: 3, row: 0 },
      { id: 'internet', label: 'internet', col: 0, row: 1 },
      { id: 'tunnel', label: 'Cloudflare Tunnel', col: 1, row: 1 },
      { id: 'cloudflared', label: 'cloudflared', col: 2, row: 1 },
      {
        id: 'apps',
        label: 'KittyCafé · GoPrint',
        sub: { pt: 'containers sem root', en: 'non-root containers' },
        col: 3,
        row: 1,
      },
      {
        id: 'backup',
        label: { pt: 'backup diário', en: 'daily backup' },
        sub: { pt: 'cópia fora do servidor', en: 'off-host copy' },
        col: 2,
        row: 2,
      },
      { id: 'sqlite', label: { pt: 'bancos SQLite', en: 'SQLite databases' }, col: 3, row: 2 },
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
}

export const findDiagram = (slug) => diagrams[slug] ?? null
