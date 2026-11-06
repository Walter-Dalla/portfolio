import { resumePdf } from '../content/profile.js'
import { assetUrl } from '../assetUrl.js'

/** Só os idiomas cujo PDF existe; o do idioma atual vem primeiro, como botão principal. */
export function availableResumes(currentLang) {
  return ['pt', 'en']
    .filter((lang) => resumePdf[lang])
    .sort((a, b) => (a === currentLang ? -1 : b === currentLang ? 1 : 0))
}

export function resumeHref(lang) {
  return assetUrl(resumePdf[lang])
}

export function resumeFileName(lang) {
  return `Walter-Dalla-CV-${lang.toUpperCase()}.pdf`
}
