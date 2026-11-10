import { useEffect, useState } from 'react'
import { certifications, education, experiences, languages, skillGroups } from '../content/experiences.js'
import { company, resumePdf } from '../content/profile.js'
import { useI18n } from '../i18n/context.js'
import { DownloadIcon } from '../components/Icons.jsx'
import { Zoom } from '../components/Lightbox.jsx'
import { useLightbox } from '../components/useLightbox.jsx'
import { Media } from '../components/Media.jsx'
import { Rich } from '../components/Rich.jsx'
import { SectionHeading } from '../components/SectionHeading.jsx'
import { Tags } from '../components/Tags.jsx'
import { availableResumes, resumeFileName, resumeHref } from '../components/resume.js'
import { usePageTitle } from '../components/usePageTitle.js'
import './resume.css'

const PDF_LABEL = { pt: 'resumePdfPt', en: 'resumePdfEn' }
const CTA_LABEL = { pt: 'pdfPt', en: 'pdfEn' }

function ExperienceExtra({ extra }) {
  const { l } = useI18n()
  const photos = extra?.photos ?? []
  const text = l(extra?.text)
  const { open, lightbox } = useLightbox(photos)
  if (!photos.length && !text) return null
  return (
    <div className="xp__extra">
      {photos.length > 0 && (
        <div className="xp__photos">
          {photos.map((photo, i) => (
            <Zoom key={photo.src} onClick={() => open(i)} className="xp__photo">
              <Media src={photo.src} alt={photo.alt} ratio="4 / 3" />
            </Zoom>
          ))}
        </div>
      )}
      {text && <p className="xp__extra-text">{text}</p>}
      {lightbox}
    </div>
  )
}

// Seções do currículo: âncora, texto do eyebrow ("01 · experiência") e se existe nesta página.
const SECTIONS = [
  { id: 'experiencia', key: 'experienceEyebrow' },
  { id: 'stack', key: 'skillsEyebrow' },
  { id: 'formacao', key: 'educationEyebrow' },
  { id: 'empresa', key: 'companyEyebrow', when: () => Boolean(company) },
]

/** Id da seção que ocupa o topo da tela, para destacar a chip do índice. */
function useActiveSection(ids) {
  const [active, setActive] = useState(null)
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting)
        if (hit) setActive(hit.target.id)
      },
      { rootMargin: '-20% 0px -70% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [ids])
  return active
}

function ResumeIndex() {
  const { t } = useI18n()
  const sections = SECTIONS.filter((s) => !s.when || s.when())
  const active = useActiveSection(sections.map((s) => s.id))
  return (
    <nav aria-label={t('resumeIndexLabel')} className="page-nav mono">
      {sections.map((s) => {
        const [num, label] = t(s.key).split(' · ')
        return (
          <a key={s.id} href={`#${s.id}`} className="page-nav__link" aria-current={active === s.id ? 'true' : undefined}>
            <b>{num}</b> {label}
          </a>
        )
      })}
    </nav>
  )
}

// Um cargo: título, empresa (com local e, num grupo, o período), nota, bullets, tags e extras.
function Position({ xp, as: Heading = 'h3', showPeriod = false }) {
  const { l } = useI18n()
  const place = l(xp.place)
  return (
    <>
      <Heading className="xp__role">{l(xp.role)}</Heading>
      <span className="xp__company">
        {l(xp.company)}
        {place && ` · ${place}`}
        {showPeriod && ` · ${l(xp.period)}`}
      </span>
      {xp.note && <span className="xp__note">{l(xp.note)}</span>}
      {xp.bullets.length > 0 && (
        <ul className="xp__bullets">
          {xp.bullets.map((b, i) => (
            <li key={i}>
              <Rich text={l(b)} />
            </li>
          ))}
        </ul>
      )}
      <Tags items={xp.tags} />
      <ExperienceExtra extra={xp.extra} />
    </>
  )
}

function Experience({ xp, last }) {
  const { l } = useI18n()
  return (
    <article className="xp">
      <div className="xp__rail">
        <span className={`xp__dot xp__dot--${xp.stage ?? 'past'}`} />
        {!last && <span className="xp__line" />}
      </div>
      <div className={`xp__body${last ? '' : ' xp__body--spaced'}`}>
        <span className={`xp__period mono${xp.stage ? ' xp__period--accent' : ''}`}>{l(xp.period)}</span>
        {xp.positions ? (
          <>
            <h3 className="xp__group-title">{l(xp.company)}</h3>
            {xp.note && <span className="xp__note">{l(xp.note)}</span>}
            {xp.positions.map((pos, i) => (
              <div key={`${l(pos.company)}-${i}`} className="xp__position">
                <Position xp={pos} as="h4" showPeriod={xp.positions.length > 1} />
              </div>
            ))}
          </>
        ) : (
          <Position xp={xp} />
        )}
      </div>
    </article>
  )
}

export function Resume() {
  const { t, l, lang } = useI18n()
  usePageTitle(t('resumeTitle'))
  const resumes = availableResumes(lang)

  return (
    <div className="container page resume">
      <section className="resume__intro">
        <div className="page-intro resume__intro-text">
          <span className="eyebrow">$ cat resume.md</span>
          <h1 className="page-title">{t('resumeTitle')}</h1>
          <p className="lead">{t('resumeLead')}</p>
        </div>
        {resumes.length > 0 && (
          <div className="resume__pdf">
            <span className="mono resume__pdf-eyebrow">{t('resumePdfEyebrow')}</span>
            {resumes.map((code, i) => (
              <a
                key={code}
                href={resumeHref(code)}
                download={resumeFileName(code)}
                className={`btn btn--block ${i === 0 ? 'btn--primary' : 'btn--secondary'}`}
              >
                <span>{t(PDF_LABEL[code])}</span>
                <DownloadIcon />
              </a>
            ))}
            {resumePdf.updated && (
              <span className="mono resume__pdf-date">
                {t('resumePdfUpdated')} {l(resumePdf.updated)}
              </span>
            )}
          </div>
        )}
      </section>

      <ResumeIndex />

      <section id="experiencia" className="resume__section" aria-labelledby="experiencia-titulo">
        <SectionHeading id="experiencia-titulo" eyebrow={t('experienceEyebrow')} title={t('experienceTitle')} />
        <div className="timeline">
          {experiences.map((xp, i) => (
            <Experience key={`${l(xp.company)}-${i}`} xp={xp} last={i === experiences.length - 1} />
          ))}
        </div>
      </section>

      <section id="stack" className="resume__section" aria-labelledby="stack-titulo">
        <SectionHeading id="stack-titulo" eyebrow={t('skillsEyebrow')} title={t('skillsTitle')} />
        <div className="skills">
          {skillGroups.map((group) => (
            <div key={l(group.label)} className={`skills__group${group.featured ? ' card--accent' : ''}`}>
              <span className="eyebrow">{l(group.label)}</span>
              <Tags items={group.items} className="skills__tags" />
            </div>
          ))}
        </div>
      </section>

      <section id="formacao" className="resume__section" aria-labelledby="formacao-titulo">
        <SectionHeading id="formacao-titulo" eyebrow={t('educationEyebrow')} title={t('educationTitle')} />
        <div className="education">
          {education.map((ed) => (
            <article key={l(ed.title)} className="education__item">
              <span className="xp__period mono">{ed.period}</span>
              <h3 className="xp__role">{l(ed.title)}</h3>
              <span className="xp__company">
                {l(ed.school)}
                {ed.place && ` · ${ed.place}`}
              </span>
              {ed.note && (
                <span className="xp__note">
                  {l(ed.note)}
                  {ed.noteLink && (
                    <>
                      {' '}
                      <a href={ed.noteLink.href} className="link link--text" target="_blank" rel="noreferrer">
                        {l(ed.noteLink.label)} ↗
                      </a>
                    </>
                  )}
                </span>
              )}
            </article>
          ))}
        </div>
        {(languages.length > 0 || certifications.length > 0) && (
          <div className="skills">
            {languages.length > 0 && (
              <div className="skills__group">
                <span className="eyebrow">{t('languagesLabel')}</span>
                <ul className="resume__list">
                  {languages.map((lang) => (
                    <li key={l(lang.name)}>
                      {l(lang.name)} <span className="resume__list-meta">· {l(lang.level)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {certifications.length > 0 && (
              <div className="skills__group">
                <span className="eyebrow">{t('certificationsLabel')}</span>
                <Tags items={certifications} className="skills__tags" />
              </div>
            )}
          </div>
        )}
      </section>

      {company && (
        <section id="empresa" className="resume__section" aria-labelledby="empresa-titulo">
          <SectionHeading id="empresa-titulo" eyebrow={t('companyEyebrow')} title={t('companyTitle')} />
          <div className="company card--accent">
            <h3 className="xp__role">{company.name}</h3>
            <span className="xp__company">
              CNPJ <span className="mono">{company.cnpj}</span> · {company.location}
            </span>
            <p className="company__text">{l(company.text)}</p>
            <span className="xp__note">{l(company.activity)}</span>
          </div>
        </section>
      )}

      {resumes.length > 0 && (
        <section className="resume-cta">
          <div className="resume-cta__text">
            <span className="resume-cta__title">{t('resumeCtaTitle')}</span>
            <span className="resume-cta__sub">{t('resumeCtaText')}</span>
          </div>
          <div className="btn-row">
            {resumes.map((code, i) => (
              <a
                key={code}
                href={resumeHref(code)}
                download={resumeFileName(code)}
                className={`btn ${i === 0 ? 'btn--primary' : 'btn--secondary'}`}
              >
                {t(CTA_LABEL[code])}
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
