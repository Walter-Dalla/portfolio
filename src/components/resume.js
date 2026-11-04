import { resumePdf } from '../content/profile.js'

/** Só os idiomas cujo PDF existe. */
export function availableResumes() {
  return ['pt', 'en'].filter((lang) => resumePdf[lang])
}

export function resumeHref(lang) {
  return resumePdf[lang]
}

export function resumeFileName(lang) {
  return `Walter-Dalla-CV-${lang.toUpperCase()}.pdf`
}
