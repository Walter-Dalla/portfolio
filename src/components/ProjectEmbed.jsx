import { useCallback, useEffect, useRef, useState } from 'react'
import { useI18n } from '../i18n/context.js'
import { useTheme } from '../theme/context.js'

// Página de outra origem embutida no estudo de caso (`embedUrl`), ex.: o fluxo do wh-harness.
// `url` já vem no idioma atual (a página tem um caminho por idioma).
// Protocolo com a página: `?embed=1&theme=<dark|light>` no src; `{ type: 'wh-flow:theme', theme }` e
// `{ type: 'wh-flow:lang', lang }` na montagem, no load e a cada troca de tema ou idioma; ela responde
// `{ type: 'wh-flow:height', height }` a cada redimensionamento e a cada mensagem, e o iframe cresce sem
// rolagem dupla. Só aceita mensagens da origem de `url`.
function embedSrc(url, theme) {
  const u = new URL(url)
  u.searchParams.set('embed', '1')
  u.searchParams.set('theme', theme)
  return u.toString()
}

const MIN_HEIGHT = 200
const MAX_HEIGHT = 10000

export function ProjectEmbed({ url, title }) {
  const { t, lang } = useI18n()
  const { theme } = useTheme()
  const frame = useRef(null)
  // O src fica com o tema e o idioma da montagem: trocar depois vai por mensagem, sem recarregar.
  // Na hidratação tema e idioma são os do pré-render (ver src/main.jsx), então o src bate com o HTML.
  const [src] = useState(() => embedSrc(url, theme))
  const [height, setHeight] = useState(null)
  const origin = new URL(url).origin

  // Mensagem enviada antes do load se perde (o `onLoad` cobre); um iframe que carregou antes da
  // hidratação não dispara `onLoad` (a montagem cobre).
  const sync = useCallback(() => {
    const target = frame.current?.contentWindow
    target?.postMessage({ type: 'wh-flow:theme', theme }, origin)
    target?.postMessage({ type: 'wh-flow:lang', lang }, origin)
  }, [theme, lang, origin])

  useEffect(sync, [sync])

  useEffect(() => {
    function onMessage(event) {
      if (event.origin !== origin) return
      const data = event.data
      if (!data || data.type !== 'wh-flow:height' || !Number.isFinite(data.height)) return
      setHeight(Math.min(MAX_HEIGHT, Math.max(MIN_HEIGHT, Math.ceil(data.height))))
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [origin])

  return (
    <section className="project__embed" aria-labelledby="project-embed-title">
      <div className="project__embed-head">
        <h2 id="project-embed-title" className="project__h2">
          {t('embedTitle')}
        </h2>
        <a href={url} className="link mono" target="_blank" rel="noreferrer">
          {t('embedFullscreen')} <span aria-hidden="true">↗</span>
        </a>
      </div>
      <iframe
        ref={frame}
        src={src}
        title={`${title} — ${t('embedTitle')}`}
        loading="lazy"
        className="project__embed-frame"
        style={height ? { height: `${height}px` } : undefined}
        onLoad={sync}
      />
    </section>
  )
}
