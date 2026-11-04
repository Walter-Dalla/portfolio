import { useCallback, useEffect, useMemo, useState } from 'react'
import { LANGS, LanguageContext, pick } from './context.js'
import { strings } from './strings.js'
import { readStored, writeStored } from '../storage.js'

export const LANG_KEY = 'wd-lang'

function initialLang() {
  const stored = readStored(LANG_KEY)
  return LANGS.includes(stored) ? stored : 'pt'
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(initialLang)

  useEffect(() => {
    document.documentElement.lang = lang === 'en' ? 'en' : 'pt-BR'
  }, [lang])

  const setLang = useCallback((next) => {
    if (!LANGS.includes(next)) return
    writeStored(LANG_KEY, next)
    setLangState(next)
  }, [])

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: (key) => pick(strings[key], lang) ?? key,
      l: (content) => pick(content, lang),
    }),
    [lang, setLang],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
