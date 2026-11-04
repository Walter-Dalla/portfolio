import { createContext, useContext } from 'react'

export const LANGS = ['pt', 'en']

export const LanguageContext = createContext(null)

/** Idioma atual, troca de idioma, `t(chave)` para textos de interface e `l(valor)` para conteúdo. */
export function useI18n() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useI18n fora do LanguageProvider')
  return ctx
}

/** Escolhe o texto do idioma: aceita string pura ou `{ pt, en }`. */
export function pick(value, lang) {
  if (value == null || typeof value !== 'object') return value
  return value[lang] ?? value.pt
}
