import { useCallback, useEffect, useMemo, useState } from 'react'
import { ThemeContext } from './context.js'
import { readStored, writeStored } from '../storage.js'

export const THEME_KEY = 'wd-theme'
const DEFAULT_THEME = 'dark'

function initialTheme() {
  const stored = readStored(THEME_KEY)
  return stored === 'light' || stored === 'dark' ? stored : DEFAULT_THEME
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(initialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
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
