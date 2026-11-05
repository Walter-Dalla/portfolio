import { certifications, education, experiences, languages, skillGroups } from '../content/experiences.js'
import { company, resumePdf } from '../content/profile.js'
import { useI18n } from '../i18n/context.js'
import { DownloadIcon } from '../components/Icons.jsx'
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
  if (!photos.length && !text) return null
  return (
    <div className="xp__extra">
      {photos.length > 0 && (
        <div className="xp__photos">
          {photos.map((photo) => (
            <Media key={photo.src} src={photo.src} alt={photo.alt} ratio="4 / 3" className="xp__photo" />
          ))}
        </div>
      )}
      {text && <p className="xp__extra-text">{text}</p>}
    </div>
  )
}

function Experience({ xp, last }) {
  const { l } = useI18n()
  const place = l(xp.place)
  return (
    <article className="xp">
      <div className="xp__rail">
        <span className={`xp__dot xp__dot--${xp.stage ?? 'past'}`} />
        {!last && <span className="xp__line" />}
      </div>
      <div className={`xp__body${last ? '' : ' xp__body--spaced'}`}>
        <span className={`xp__period mono${xp.stage ? ' xp__period--accent' : ''}`}>{l(xp.period)}</span>
        <h3 className="xp__role">{l(xp.role)}</h3>
        <span className="xp__company">
          {xp.company}
          {place && ` · ${place}`}
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
      </div>
    </article>
  )
}

export function Resume() {
  const { t, l } = useI18n()
  usePageTitle(t('resumeTitle'))
  const resumes = availableResumes()

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

      <section className="resume__section" aria-labelledby="experiencia">
        <SectionHeading id="experiencia" eyebrow={t('experienceEyebrow')} title={t('experienceTitle')} />
        <div className="timeline">
          {experiences.map((xp, i) => (
            <Experience key={`${xp.company}-${i}`} xp={xp} last={i === experiences.length - 1} />
          ))}
        </div>
      </section>

      <section className="resume__section" aria-labelledby="stack">
        <SectionHeading id="stack" eyebrow={t('skillsEyebrow')} title={t('skillsTitle')} />
        <div className="skills">
          {skillGroups.map((group) => (
            <div key={l(group.label)} className={`skills__group${group.featured ? ' card--accent' : ''}`}>
              <span className="eyebrow">{l(group.label)}</span>
              <Tags items={group.items} className="skills__tags" />
            </div>
          ))}
        </div>
      </section>

      <section className="resume__section" aria-labelledby="formacao">
        <SectionHeading id="formacao" eyebrow={t('educationEyebrow')} title={t('educationTitle')} />
        <div className="education">
          {education.map((ed) => (
            <article key={l(ed.title)} className="education__item">
              <span className="xp__period mono">{ed.period}</span>
              <h3 className="xp__role">{l(ed.title)}</h3>
              <span className="xp__company">
                {l(ed.school)}
                {ed.place && ` · ${ed.place}`}
              </span>
              {ed.note && <span className="xp__note">{l(ed.note)}</span>}
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
        <section className="resume__section" aria-labelledby="empresa">
          <SectionHeading id="empresa" eyebrow={t('companyEyebrow')} title={t('companyTitle')} />
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
