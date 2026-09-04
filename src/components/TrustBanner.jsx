import { FileCheck, ShieldCheck, Award, MapPin } from 'lucide-react'
import { Reveal, Stagger } from '../lib/motion.js'
import './trust.css'

/* Trust Badges Banner — Certification Badge Wall / Dark Framed Credential Panel.
   The first three trace to the source page's own meta description; the fourth
   is generic, unquantified trust language filling the fourth slot. No specific
   licence number, BBB rating or association is claimed anywhere, because none
   was stated on the source page. Four different, meaning-matched Lucide icons,
   identical size, stroke and optical box. */

const BADGES = [
  { icon: FileCheck, label: 'Canadian Electrical Code Compliant', note: 'Every job, residential or commercial' },
  { icon: ShieldCheck, label: 'Fully Licensed & Insured', note: 'Licensed electricians on every call' },
  { icon: Award, label: '15+ Years In The Trade', note: 'Hands-on field experience' },
  { icon: MapPin, label: 'Locally Owned & Operated', note: 'Based in Cochrane, Alberta' },
]

export default function TrustBanner() {
  return (
    <section className="section section--tight trust band-deep" aria-labelledby="trust-h2">
      <h2 className="sr-only" id="trust-h2">Our Credentials</h2>
      <div className="shell">
        <Reveal className="trust-panel" technique="rise">
          <span className="trust-rule" data-reveal="wipe" aria-hidden="true" />
          <img
            className="trust-tex"
            src="/images/tex-steel.webp"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            width="1400"
            height="788"
          />
          <Stagger className="trust-row" technique="rise" step={90} start={160} itemClassName="trust-cell">
            {BADGES.map(({ icon: Icon, label, note }) => (
              <div className="trust-badge" key={label}>
                <span className="trust-icon" aria-hidden="true"><Icon className="lucide" /></span>
                <span className="trust-text">
                  <span className="trust-label">{label}</span>
                  <span className="trust-note">{note}</span>
                </span>
              </div>
            ))}
          </Stagger>
        </Reveal>
      </div>
    </section>
  )
}
