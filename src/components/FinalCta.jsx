import { Phone, MessageSquareText, ShieldCheck } from 'lucide-react'
import { Reveal } from '../lib/motion.js'
import { useSlowPan } from '../lib/motion-extra.js'
import { PHONE_DISPLAY, TEL, SMS } from '../lib/site.js'
import './cta.css'

/* Final CTA — Full-Width CTA Banner / Dark Cinematic CTA Background.
   Second deliberate use of Full-Bleed Background Photo with Foreground Card.
   The band sits flush against the footer so the two read as one closing unit. */

export default function FinalCta() {
  const panRef = useSlowPan()

  return (
    <section className="cta" id="contact" aria-labelledby="cta-h2">
      <div className="cta-bed" aria-hidden="true">
        <img
          className="cta-photo"
          ref={panRef}
          src="/images/flatlay-materials.webp"
          alt=""
          loading="lazy"
          decoding="async"
          width="2000"
          height="1125"
        />
        <span className="cta-scrim" />
      </div>

      <div className="shell cta-inner">
        <Reveal className="cta-card" technique="rise">
          <p className="eyebrow cta-eyebrow">Ready When You Are</p>
          <h2 className="h2 cta-h2" id="cta-h2">Ready For Electrical Work Built To Code?</h2>
          <p className="cta-sub">
            Call now for a licensed, energy-efficient electrical team serving Cochrane and Calgary.
          </p>

          <div className="cta-actions">
            <a className="btn btn--primary cta-call" href={TEL}>
              <Phone className="lucide" aria-hidden="true" />
              Call {PHONE_DISPLAY}
            </a>
            <a className="btn btn--ghost cta-text" href={SMS}>
              <MessageSquareText className="lucide" aria-hidden="true" />
              Text {PHONE_DISPLAY}
            </a>
          </div>

          <p className="reassure cta-reassure">
            <ShieldCheck className="lucide" aria-hidden="true" />
            <span>
              Licensed and insured, every job to current Canadian Electrical Code. No cost to ask,
              and nothing gets booked until you say so.
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
