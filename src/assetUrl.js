/** Prefixa caminhos absolutos de `public/` com o `base` do Vite (hoje `/`, domínio próprio no GitHub Pages). */
export function assetUrl(path) {
  if (!path || !path.startsWith('/') || path.startsWith('//')) return path
  return import.meta.env.BASE_URL.replace(/\/$/, '') + path
}
