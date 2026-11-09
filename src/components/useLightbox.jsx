import { useCallback, useState } from 'react'
import { Lightbox } from './Lightbox.jsx'

/** Estado do visualizador: `open(i)` abre na imagem `i`; renderize `lightbox` na página. */
export function useLightbox(images) {
  const [index, setIndex] = useState(null)
  const close = useCallback(() => setIndex(null), [])
  const lightbox = index == null ? null : <Lightbox images={images} index={index} onClose={close} />
  return { open: setIndex, lightbox }
}
