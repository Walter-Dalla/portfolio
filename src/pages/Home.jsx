import { Link } from 'react-router'
import { architectureHref, architectureIntro, architectureSystems } from '../content/architecture.js'
import { findDiagram } from '../content/diagrams.js'
import { company, metrics, profile, workedAt } from '../content/profile.js'
import { projects } from '../content/projects.js'
import { useI18n } from '../i18n/context.js'
import { ArchDiagram } from '../components/ArchDiagram.jsx'
import { CopyButton } from '../components/CopyButton.jsx'
import { DownloadIcon } from '../components/Icons.jsx'
import { Media } from '../components/Media.jsx'
import { ProjectCard } from '../components/ProjectCard.jsx'
import { SectionHeading } from '../components/SectionHeading.jsx'
import { availableResumes, resumeFileName, resumeHref } from '../components/resume.js'
import { usePageTitle } from '../components/usePageTitle.js'
import './home.css'

const EXPLORE = [
  { to: '/resume', cmd: 'cat resume.md', title: 'navResume', text: 'exploreResume' },
  { to: '/achievements', cmd: 'ls achievements/', title: 'navAchievements', text: 'exploreAchievements' },
  { to: '/about', cmd: 'open about-me', title: 'navAbout', text: 'exploreAbout' },
  { to: '/contact', cmd: 'ping walter', title: 'navContact', text: 'exploreContact' },
]

// Valor de métrica com mais caracteres que isto (ex.: um antes → depois) não cabe na célula na
// fonte cheia e usa `.metric__value--long`.
const LONG_METRIC = 5

export function Home() {
  const { t, l, lang } = useI18n()
  usePageTitle(t('homeTitle'))
  const featured = projects.filter((p) => p.featured)
  const resumes = availableResumes(lang)
  // A chamada de arquitetura mostra a miniatura do primeiro sistema da lista; cada link abre o projeto já na arquitetura.
  const firstSystem = architectureSystems[0]
  const archPreview = firstSystem ? findDiagram(firstSystem.slug) : null
  const availability = l(profile.availability)
  const location = (
    <span className="hero__location mono">
      <span className="accent-dot" />
      {profile.location}
    </span>
  )

  return (
    <>
      <section className="container hero">
        <div className="hero__text">
          <span className="eyebrow">$ whoami</span>
          <h1 className="hero__title">{profile.name}</h1>
          <p className="hero__tagline">{l(profile.tagline)}</p>
          <p className="hero__pitch">{l(profile.pitch)}</p>
          {/* Sem foto não há aside: a localização sobe para o texto, logo acima da disponibilidade. */}
          {!profile.photo && location}
          {availability && (
            <p className="hero__availability mono">
              <span className="accent-dot" />
              {availability}
            </p>
          )}
          <div className="btn-row">
            <Link to="/projects" className="btn btn--primary">
              {t('seeProjects')}
            </Link>
            <Link to="/contact" className="btn btn--secondary">
              {t('heroContact')}
            </Link>
            {resumes.map((code) => (
              <a
                key={code}
                href={resumeHref(code)}
                download={resumeFileName(code)}
                className="btn btn--secondary"
              >
                <DownloadIcon />
                {code === 'en' ? 'Resume' : t('downloadResume')}{' '}
                <span className="btn__hint">{code.toUpperCase()}</span>
              </a>
            ))}
          </div>
          <div className="hero__social mono">
            <a href={profile.linkedin} className="link link--text" target="_blank" rel="noreferrer">
              linkedin ↗
            </a>
            <a href={profile.github} className="link link--text" target="_blank" rel="noreferrer">
              github ↗
            </a>
            <a href={`mailto:${profile.email}`} className="link link--text">
              {t('email')} ↗
            </a>
          </div>
        </div>
        {profile.photo && (
          <div className="hero__aside">
            <Media
              src={profile.photo}
              alt={profile.name}
              ratio="4 / 5"
              className="hero__photo"
              label="WD"
              priority
            />
            {location}
          </div>
        )}
      </section>

      <div className="container worked">
        <span id="worked-label" className="worked__label mono">
          {t('workedAtLabel')}
        </span>
        <ul aria-labelledby="worked-label" className="worked__list">
          {workedAt.map((name, i) => (
            <li key={i}>{l(name)}</li>
          ))}
        </ul>
      </div>

      <section aria-label={t('metricsLabel')} className="metrics">
        <div className="container">
          <div className="metrics__grid">
            {metrics.map((m, i) => {
              const value = l(m.value)
              const long = value.length > LONG_METRIC
              return (
                <div key={i} className="metric">
                  <span className={long ? 'metric__value metric__value--long' : 'metric__value'}>{value}</span>
                  <span className="metric__label">{l(m.label)}</span>
                  <span className="metric__source">{m.source}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="container home-section reveal">
        <div className="home-section__head">
          <SectionHeading eyebrow={t('featuredEyebrow')} title={t('featuredTitle')} />
          <Link to="/projects" className="link">
            {t('seeAllProjects')}
          </Link>
        </div>
        <div className="grid home-projects">
          {featured.map((p) => (
            <ProjectCard key={p.slug} project={p} compact />
          ))}
        </div>
      </section>

      {archPreview && (
        <section className="container home-section reveal">
          <div className="home-arch">
            <div className="home-arch__text">
              <SectionHeading eyebrow={t('homeArchEyebrow')} title={t('homeArchTitle')} />
              <p className="home-arch__lede">{l(architectureIntro.lede)}</p>
              <ul className="home-arch__systems" aria-label={t('homeArchSystemsLabel')}>
                {architectureSystems.map((p) => (
                  <li key={p.slug}>
                    <Link to={architectureHref(p.slug)} className="tag home-arch__system">
                      {l(p.title)} <span aria-hidden="true">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <Link to={architectureHref(firstSystem.slug)} className="home-arch__figure" tabIndex={-1} aria-hidden="true">
              <ArchDiagram diagram={archPreview} compact />
            </Link>
          </div>
        </section>
      )}

      <section className="container home-section reveal">
        <SectionHeading eyebrow={t('exploreEyebrow')} title={t('exploreTitle')} />
        <div className="explore">
          {EXPLORE.map((item) => (
            <Link key={item.to} to={item.to} className="explore__card">
              <span className="explore__cmd mono">{item.cmd}</span>
              <span className="explore__title">{t(item.title)} →</span>
              <span className="explore__text">{t(item.text)}</span>
            </Link>
          ))}
        </div>
      </section>

      {company && (
        <section className="container home-section" aria-labelledby="home-contato-titulo">
          <SectionHeading id="home-contato-titulo" eyebrow={t('homeContactEyebrow')} title={t('companyTitle')} />
          <div className="home-company">
            <h3 className="home-company__name">{company.name}</h3>
            <span className="home-company__meta">
              CNPJ <span className="mono">{company.cnpj}</span> · {company.location}
            </span>
            <p className="home-company__text">{l(company.text)}</p>
            <ul className="home-company__contacts">
              <li className="home-company__contact">
                <span className="mono home-company__label">{t('email')}</span>
                <span className="home-company__value">
                  <a href={`mailto:${profile.email}`} className="link link--text home-company__email">
                    {profile.email}
                  </a>
                  <CopyButton text={profile.email} label={t('copyEmail')} className="link link--muted copy-link" />
                </span>
              </li>
              <li className="home-company__contact">
                <span className="mono home-company__label">linkedin</span>
                <span className="home-company__value">
                  <a href={profile.linkedin} className="link link--text" target="_blank" rel="noreferrer">
                    {profile.linkedinHandle}
                  </a>
                </span>
              </li>
              <li className="home-company__contact">
                <span className="mono home-company__label">github</span>
                <span className="home-company__value">
                  <a href={profile.github} className="link link--text" target="_blank" rel="noreferrer">
                    {profile.githubHandle}
                  </a>
                </span>
              </li>
            </ul>
          </div>
        </section>
      )}
    </>
  )
}
