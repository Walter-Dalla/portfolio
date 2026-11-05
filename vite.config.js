import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Publicado no GitHub Pages com domínio próprio (walterdalla.uk), servido na raiz.
export default defineConfig({
  base: '/',
  plugins: [react()],
  server: { port: 3000 },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js'],
    css: false,
  },
})
