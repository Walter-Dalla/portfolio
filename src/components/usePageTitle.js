import { useEffect } from 'react'

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — Walter Dalla` : 'Walter Dalla'
  }, [title])
}
