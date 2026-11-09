import { useEffect, useLayoutEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router'

// Posição de rolagem de cada entrada do histórico (chave do react-router), só nesta sessão.
const positions = new Map()

/**
 * Página nova abre no topo; "voltar"/"avançar" restaura a posição em que a pessoa estava.
 * Trocar só a query (?cat=…) ou abrir uma âncora (#secao) não mexe na rolagem.
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
      return
    }
    // Pulo imediato: a rolagem suave (html) é só para âncoras e para o botão de voltar ao topo.
    if (pathChanged && !location.hash) window.scrollTo?.({ top: 0, left: 0, behavior: 'instant' })
  }, [location.key, location.pathname, location.hash, navigationType])
}
