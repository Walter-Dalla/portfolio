import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Build publicado no GitHub Pages em /portfolio/; dev e testes ficam na raiz.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/portfolio/' : '/',
  plugins: [react()],
  server: { port: 3000 },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js'],
    css: false,
  },
}))
