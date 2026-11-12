import { Link } from 'react-router'
import { company, metrics, profile, workedAt } from '../content/profile.js'
import { projects } from '../content/projects.js'
import { useI18n } from '../i18n/context.js'
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

export function Home() {
  const { t, l, lang } = useI18n()
  usePageTitle(t('homeTitle'))
  const featured = projects.filter((p) => p.featured)
  const resumes = availableResumes(lang)
  const availability = l(profile.availability)

  return (
    <>
      <section className="container hero">
        <div className="hero__text">
          <span className="eyebrow">$ whoami</span>
          <h1 className="hero__title">{profile.name}</h1>
          <p className="hero__tagline">{l(profile.tagline)}</p>
          <p className="hero__pitch">{l(profile.pitch)}</p>
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
        <div className="hero__aside">
          <Media
            src={profile.photo}
            alt={profile.name}
            ratio="4 / 5"
            className="hero__photo"
            label="WD"
            priority
          />
          <span className="hero__location mono">
            <span className="accent-dot" />
            {profile.location}
          </span>
        </div>
      </section>

      <div className="container worked">
        <span id="worked-label" className="worked__label mono">
          {t('workedAtLabel')}
        </span>
        <ul aria-labelledby="worked-label" className="worked__list">
          {workedAt.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>

      <section aria-label={t('metricsLabel')} className="metrics">
        <div className="container">
          <div className="metrics__grid">
            {metrics.map((m) => (
              <div key={m.value} className="metric">
                <span className="metric__value">{m.value}</span>
                <span className="metric__label">{l(m.label)}</span>
                <span className="metric__source">{m.source}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container home-section">
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

      <section className="container home-section">
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
                  <CopyButton text={profile.email} label={t('copyEmail')} className="link link--muted site-footer__copy" />
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
