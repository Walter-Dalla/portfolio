import { company, profile } from '../content/profile.js'
import { useI18n } from '../i18n/context.js'
import { CopyButton } from '../components/CopyButton.jsx'
import { availableResumes, resumeFileName, resumeHref } from '../components/resume.js'
import { usePageTitle } from '../components/usePageTitle.js'
import './contact.css'

const PDF_LINK = { pt: 'pdfPtLink', en: 'pdfEnLink' }

export function Contact() {
  const { t, l } = useI18n()
  usePageTitle(t('navContact'))
  const resumes = availableResumes()
  const availability = l(profile.availability)

  return (
    <div className="container page contact">
      <section className="contact__intro">
        <span className="eyebrow">$ ping walter</span>
        <h1 className="contact__title">{t('contactTitle')}</h1>
        {availability && <p className="lead">{availability}</p>}
      </section>

      <div className="contact__email">
        <div className="contact__email-text">
          <span className="mono contact__email-eyebrow">{t('emailEyebrow')}</span>
          <a href={`mailto:${profile.email}`} className="mono contact__address">
            {profile.email}
          </a>
        </div>
        <div className="btn-row contact__actions">
          <a href={`mailto:${profile.email}`} className="btn btn--primary">
            {t('sendEmail')}
          </a>
          <CopyButton text={profile.email} label={t('copyEmail')} />
        </div>
      </div>

      <div className="contact__grid">
        <a href={profile.linkedin} className="contact__card" target="_blank" rel="noreferrer">
          <span className="mono contact__card-label">linkedin</span>
          <span className="contact__card-value">{profile.linkedinHandle} ↗</span>
        </a>
        <a href={profile.github} className="contact__card" target="_blank" rel="noreferrer">
          <span className="mono contact__card-label">github</span>
          <span className="contact__card-value">{profile.githubHandle} ↗</span>
        </a>
        <div className="contact__card">
          <span className="mono contact__card-label">{t('locationTz')}</span>
          <span className="contact__card-value">
            {profile.location} · {profile.timezone}
          </span>
        </div>
        {company && (
          <div className="contact__card">
            <span className="mono contact__card-label">{t('companyLabel')}</span>
            <span className="contact__card-value">{company.name}</span>
            <span className="mono contact__card-meta">CNPJ {company.cnpj}</span>
          </div>
        )}
      </div>

      {resumes.length > 0 && (
        <div className="contact__resume">
          <span>{t('preferResume')}</span>
          {resumes.map((code) => (
            <a key={code} href={resumeHref(code)} download={resumeFileName(code)} className="link">
              {t(PDF_LINK[code])}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
