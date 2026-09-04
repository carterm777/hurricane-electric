import { ArrowUpRight, Phone } from 'lucide-react'
import { Reveal, Stagger } from '../lib/motion.js'
import { PHONE_DISPLAY, TEL } from '../lib/site.js'
import './services.css'

/* Services — Featured Service Spotlight with Secondary List / Glass Panel Card.
   The brief's own copy leads with energy-efficient lighting, so a uniform grid
   would have flattened the positioning the business is actually built on. */

const SECONDARY = [
  {
    title: 'Residential Electrical',
    body: 'Wiring, panel upgrades, and troubleshooting for homes throughout Cochrane and the surrounding area.',
    img: '/images/panel-new.webp',
    alt: 'A finished, labelled breaker panel in a clean grey enclosure with the door open',
    covers: 'Panels · Wiring · Renovations',
  },
  {
    title: 'Commercial Electrical',
    body: 'Electrical installs and lighting retrofits for offices, retail spaces, and commercial buildings.',
    img: '/images/commercial-lift.webp',
    alt: 'Two electricians on a scissor lift installing linear lighting in an open-ceiling commercial space',
    covers: 'Fit-outs · Retrofits · Service',
  },
  {
    title: 'LED Retrofits & Upgrades',
    body: 'Replacing older, inefficient fixtures with LED systems that cut power draw without cutting light quality.',
    img: '/images/office-ti.webp',
    alt: 'A finished modern office with glass partitions lit by recessed linear LED fixtures',
    covers: 'Audits · Fixtures · Controls',
  },
  {
    title: 'Electrical Troubleshooting & Repair',
    body: 'Diagnosing flickering lights, tripped breakers, and wiring faults, then fixing the real cause.',
    img: '/images/troubleshooting-hero.webp',
    alt: 'Electrician kneeling at a baseboard outlet testing it with a multimeter',
    covers: 'Faults · Breakers · Flicker',
  },
]

export default function Services() {
  return (
    <section className="section svc band-raised" id="services" aria-labelledby="svc-h2">
      <span className="svc-tex" aria-hidden="true" />
      <div className="shell">
        <Reveal className="sec-head svc-head" technique="rise">
          <p className="eyebrow">Core Services</p>
          <h2 className="h2" id="svc-h2">What We Take On, Residential And Commercial</h2>
        </Reveal>

        {/* Featured spotlight — Grid-Breaking Oversized Image */}
        <div className="svc-spot">
          <Reveal className="svc-spot-figure" technique="settle" delay={80}>
            <img
              className="svc-spot-img"
              src="/images/lighting-hero.webp"
              alt="Modern kitchen at dusk lit by warm under-cabinet strips and recessed pot lights"
              loading="lazy"
              decoding="async"
              width="2000"
              height="1125"
            />
          </Reveal>

          <Reveal className="svc-spot-card" technique="rise" delay={240}>
            <p className="svc-spot-tag">The Specialty</p>
            <h3 className="h3 svc-spot-title">Energy-Efficient Lighting Installation</h3>
            <p className="svc-spot-body">
              Fixture layouts and LED lighting plans built around what a space needs, not what's
              easiest to install.
            </p>
            <ul className="svc-spot-list list-reset">
              <li>Fixture layout planned against real room usage</li>
              <li>LED specified where it cuts draw without cutting quality</li>
              <li>Completed to current Canadian Electrical Code</li>
            </ul>
            <a className="btn btn--primary btn--sm svc-spot-cta" href={TEL}>
              <Phone className="lucide" aria-hidden="true" />
              Call {PHONE_DISPLAY}
            </a>
          </Reveal>
        </div>

        {/* Secondary list — Glass Panel Service Cards */}
        <Stagger className="svc-grid" technique="rise" step={100} start={80} itemClassName="svc-cell">
          {SECONDARY.map((s) => (
            <article className="svc-card" key={s.title}>
              <div className="svc-card-media">
                <img
                  className="svc-card-img"
                  src={s.img}
                  alt={s.alt}
                  loading="lazy"
                  decoding="async"
                  width="2000"
                  height="1125"
                />
              </div>
              <div className="svc-card-body">
                <h3 className="h3 svc-card-title">{s.title}</h3>
                <p className="svc-card-copy">{s.body}</p>
                <p className="svc-card-covers">
                  <span>{s.covers}</span>
                  <ArrowUpRight className="lucide" aria-hidden="true" />
                </p>
              </div>
            </article>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
