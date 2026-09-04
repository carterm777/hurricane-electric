import { ShieldCheck, Award, Lightbulb, FileCheck, Phone, ArrowDownRight } from 'lucide-react'
import { WordReveal, useParallax } from '../lib/motion.js'
import { PHONE_DISPLAY, TEL } from '../lib/site.js'
import PhotoDiagnosis from './PhotoDiagnosis.jsx'
import './hero.css'

/* Full-Bleed Image Hero / Gradient Scrim / Parallax Scroll Depth.
   Everything above the fold enters on a load sequence — a scroll observer
   would never fire for content that is already on screen. */

const BADGES = [
  { icon: ShieldCheck, label: 'Licensed & Insured' },
  { icon: Award, label: '15+ Years Experience' },
  { icon: Lightbulb, label: 'Energy-Efficient Lighting' },
  { icon: FileCheck, label: 'Code-Compliant Work' },
]

export default function Hero() {
  const bedRef = useParallax(0.16)

  return (
    <section className="hero" id="top">
      <div className="hero-bed" aria-hidden="true">
        <div className="hero-bed-inner" ref={bedRef}>
          <img
            className="hero-photo"
            src="/images/street-dusk.webp"
            alt=""
            width="2000"
            height="1125"
            fetchpriority="high"
            decoding="async"
          />
        </div>
        <span className="hero-scrim" />
        <span className="hero-glow" data-ambient style={{ '--ambient-dur': '19s' }} />
        <span className="hero-grid-lines" />
      </div>

      <div className="shell hero-grid">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow" data-load style={{ '--reveal-delay': '60ms' }}>
            Cochrane &amp; Calgary, Alberta
          </p>

          <h1 className="hero-h1">
            <WordReveal text="Licensed Electricians Serving Cochrane & Calgary AB" step={62} start={180} />
          </h1>

          <p className="hero-sub" data-load style={{ '--reveal-delay': '620ms' }}>
            Licensed and insured electricians with more than 15 years of experience, delivering
            energy-efficient lighting and code-compliant electrical work for homes and businesses
            throughout Cochrane, Calgary, and the surrounding area.
          </p>

          <ul className="hero-badges list-reset" aria-label="Why homeowners hire us">
            {BADGES.map(({ icon: Icon, label }, i) => (
              <li
                className="hero-badge"
                key={label}
                data-load
                style={{ '--reveal-delay': `${760 + i * 70}ms` }}
              >
                <Icon className="lucide" aria-hidden="true" />
                <span>{label}</span>
              </li>
            ))}
          </ul>

          <div className="hero-ctas" data-load style={{ '--reveal-delay': '1040ms' }}>
            <a className="btn btn--primary hero-call" href={TEL}>
              <Phone className="lucide" aria-hidden="true" />
              Call {PHONE_DISPLAY}
            </a>
            <a className="btn btn--ghost hero-secondary" href="#services">
              View Services
              <ArrowDownRight className="lucide" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="hero-widget" data-load style={{ '--reveal-delay': '900ms' }}>
          <PhotoDiagnosis />
        </div>
      </div>
    </section>
  )
}
