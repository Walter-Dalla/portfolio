import { useCallback, useEffect, useMemo, useState } from 'react'
import { ThemeContext } from './context.js'
import { readStored, writeStored } from '../storage.js'

export const THEME_KEY = 'wd-theme'
const DEFAULT_THEME = 'dark'
// Cor da barra do navegador no celular (<meta name="theme-color">), igual ao --bg de cada tema.
const THEME_COLOR = { dark: '#0b0d10', light: '#f7f6f2' }

/** Tema salvo; sem escolha, segue a preferência do sistema (escuro se não houver). */
function initialTheme() {
  const stored = readStored(THEME_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  if (typeof window === 'undefined') return DEFAULT_THEME
  return window.matchMedia?.('(prefers-color-scheme: light)')?.matches ? 'light' : DEFAULT_THEME
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(initialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme])
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next = current === 'light' ? 'dark' : 'light'
      writeStored(THEME_KEY, next)
      return next
    })
  }, [])

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme])
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
