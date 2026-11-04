import { resumePdf } from '../content/profile.js'
import { assetUrl } from '../assetUrl.js'

/** Só os idiomas cujo PDF existe. */
export function availableResumes() {
  return ['pt', 'en'].filter((lang) => resumePdf[lang])
}

export function resumeHref(lang) {
  return assetUrl(resumePdf[lang])
}

export function resumeFileName(lang) {
  return `Walter-Dalla-CV-${lang.toUpperCase()}.pdf`
}
