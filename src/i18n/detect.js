import { LANG_KEY, LANGS } from './context.js'
import { readStored } from '../storage.js'

/**
 * Idioma inicial: a escolha salva; sem ela, português quando o navegador está em português e inglês
 * nos outros casos. Não grava nada. Fora do navegador (pré-render) devolve inglês: lá o `navigator`
 * global do Node segue o locale da máquina, por isso só se lê `window.navigator`.
 */
export function detectLang() {
  const stored = readStored(LANG_KEY)
  if (LANGS.includes(stored)) return stored
  try {
    if (typeof window !== 'undefined' && /^pt/i.test(window.navigator.language ?? '')) return 'pt'
  } catch {
    /* sem navegador legível: inglês */
  }
  return 'en'
}
