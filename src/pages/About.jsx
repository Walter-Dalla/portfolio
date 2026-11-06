import { Link } from 'react-router'
import { about } from '../content/about.js'
import { useI18n } from '../i18n/context.js'
import { Media } from '../components/Media.jsx'
import { SectionHeading } from '../components/SectionHeading.jsx'
import { usePageTitle } from '../components/usePageTitle.js'
import './about.css'

export function About() {
  const { t, l } = useI18n()
  usePageTitle(t('navAbout'))
  const facts = about.facts.filter((f) => f.value)
  const gallery = about.gallery ?? []
  // Sem galeria, a história vira a seção 01.
  const storyNumber = gallery.length > 0 ? '02' : '01'
  const storyEyebrow = t('storyEyebrow').replace(/^\d+/, storyNumber)

  return (
    <div className="container page about">
      <section className="about__intro">
        <div className="about__text">
          <span className="eyebrow">$ open about-me</span>
          <h1 className="page-title">{t('aboutTitle')}</h1>
          <p className="about__lede">{l(about.intro)}</p>
          {about.paragraphs.map((p, i) => (
            <div key={i} className="about__block">
              <p className="about__p">{l(p.text)}</p>
              <div className="link-row">
                {p.links.map((link) => (
                  <Link key={link.to} to={link.to} className="link">
                    {l(link.label)}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <aside aria-label={t('quickFactsLabel')} className="quick-facts mono">
          <span className="quick-facts__title">{t('quickFacts')}</span>
          {facts.map((fact) => (
            <div key={l(fact.label)} className="quick-facts__row">
              <span className="quick-facts__label">{l(fact.label)}</span>
              <span>{l(fact.value)}</span>
            </div>
          ))}
        </aside>
      </section>

      {gallery.length > 0 && (
        <section className="about__section">
          <SectionHeading eyebrow={t('galleryEyebrow')} title={t('galleryTitle')} />
          <div className="about-gallery">
            {gallery.map((photo) => (
              <figure key={photo.src} className={`about-gallery__item about-gallery__item--${photo.size ?? 'normal'}`}>
                <Media src={photo.src} alt={photo.caption} className="about-gallery__media" />
                {photo.caption && <figcaption className="mono">{l(photo.caption)}</figcaption>}
              </figure>
            ))}
          </div>
        </section>
      )}

      <section className="about__section">
        <SectionHeading eyebrow={storyEyebrow} title={t('storyTitle')} />
        <ol className="story">
          {about.story.map((step) => (
            <li key={step.year} className="story__step">
              <span className="story__year mono">{step.year}</span>
              <span className="story__text">{l(step.text)}</span>
              {step.link && (
                <Link to={step.link.to} className="link story__link">
                  {l(step.link.label)}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}
