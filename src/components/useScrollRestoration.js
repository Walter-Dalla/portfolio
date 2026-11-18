import { useEffect, useLayoutEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router'

// Posição de rolagem de cada entrada do histórico (chave do react-router), só nesta sessão.
const positions = new Map()

// Rola até o elemento da âncora (#secao). O router não faz isso sozinho ao navegar para /pagina#secao.
function scrollToHash(hash) {
  const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null
  target?.scrollIntoView?.({ behavior: 'instant', block: 'start' })
  return Boolean(target)
}

/**
 * Página nova abre no topo, ou na âncora (#secao) quando o link traz uma; "voltar"/"avançar" restaura a posição
 * em que a pessoa estava. Trocar só a query (?cat=…) não mexe na rolagem.
 */
export function useScrollRestoration() {
  const location = useLocation()
  const navigationType = useNavigationType()
  const lastPath = useRef(location.pathname)

  useEffect(() => {
    let frame = 0
    function onScroll() {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => positions.set(location.key, window.scrollY))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [location.key])

  useLayoutEffect(() => {
    const pathChanged = lastPath.current !== location.pathname
    lastPath.current = location.pathname
    if (navigationType === 'POP') {
      const saved = positions.get(location.key)
      if (saved != null) window.scrollTo?.({ top: saved, left: 0, behavior: 'instant' })
      // Primeira carga já com âncora: a seção só existe depois que a página é desenhada.
      else scrollToHash(location.hash)
      return
    }
    if (scrollToHash(location.hash)) return
    // Pulo imediato: a rolagem suave (html) é só para o botão de voltar ao topo.
    if (pathChanged) window.scrollTo?.({ top: 0, left: 0, behavior: 'instant' })
  }, [location.key, location.pathname, location.hash, navigationType])
}
