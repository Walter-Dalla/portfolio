import { useEffect, useRef, useState } from 'react'
import { useI18n } from '../i18n/context.js'

const FEEDBACK_MS = 2000

/** Copia `text` para a área de transferência e confirma por dois segundos. `label` é o texto do botão. */
export function CopyButton({ text, label, className = 'btn btn--secondary' }) {
  const { t } = useI18n()
  const [copied, setCopied] = useState(false)
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      return // sem clipboard (permissão negada): o endereço continua visível e selecionável
    }
    setCopied(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), FEEDBACK_MS)
  }

  return (
    <button type="button" className={className} onClick={copy} aria-live="polite">
      {copied ? t('copied') : (label ?? t('copy'))}
    </button>
  )
}
