import { useState } from 'react'
import { MapPin, Phone } from 'lucide-react'
import { Reveal } from '../lib/motion.js'
import { useStrokeDraw } from '../lib/motion-extra.js'
import { PHONE_DISPLAY, TEL } from '../lib/site.js'
import './coverage.css'

/* Service Area — Location Photo with Directions Panel / Custom Styled Map.
   No storefront exists, so the photo carries the territory rather than a
   building. The map is drawn by hand as a schematic in the trade's own
   drafting vernacular; its four route segments use Sequential Line Draw and
   the town list is bidirectionally linked to the nodes on hover and focus. */

const TOWNS = [
  { id: 'cochrane', name: 'Cochrane', x: 24, y: 30, base: true, note: 'Home base' },
  { id: 'calgary', name: 'Calgary', x: 76, y: 46, note: 'Full city coverage' },
  { id: 'airdrie', name: 'Airdrie', x: 68, y: 13, note: 'North corridor' },
  { id: 'bearspaw', name: 'Bearspaw', x: 48, y: 35, note: 'Acreage wiring' },
  { id: 'springbank', name: 'Springbank', x: 50, y: 54, note: 'Rural service' },
  { id: 'redwood', name: 'Redwood Meadows', x: 18, y: 55, note: 'West of Cochrane' },
  { id: 'rockyview', name: 'Rocky View County', x: 44, y: 15, note: 'County-wide' },
  { id: 'bragg', name: 'Bragg Creek', x: 30, y: 68, note: 'Foothills' },
]

const ROUTES = [
  { id: 'r1', d: 'M24 30 L48 35 L76 46', links: ['cochrane', 'bearspaw', 'calgary'] },
  { id: 'r2', d: 'M24 30 L44 15 L68 13', links: ['cochrane', 'rockyview', 'airdrie'] },
  { id: 'r3', d: 'M24 30 L18 55 L30 68', links: ['cochrane', 'redwood', 'bragg'] },
  { id: 'r4', d: 'M48 35 L50 54 L76 46', links: ['bearspaw', 'springbank', 'calgary'] },
]

export default function Coverage() {
  const [active, setActive] = useState(null)
  const [mapRef] = useStrokeDraw({ selector: '[data-draw-path]', step: 150, duration: 660 })

  return (
    <section className="section cov band-cream" id="coverage" aria-labelledby="cov-h2">
      <div className="shell">
        <Reveal className="sec-head cov-head" technique="rise">
          <p className="eyebrow eyebrow--light">Service Area</p>
          <h2 className="h2 h2--light" id="cov-h2">Cochrane, Calgary, And Everything Between</h2>
          <p className="lead lead--light cov-lead">
            Based in Cochrane, we take on residential and commercial electrical work across
            Cochrane, Calgary, and the communities between them.
          </p>
        </Reveal>

        <div className="cov-grid">
          <Reveal className="cov-figure" technique="settle" as="figure">
            <img
              className="cov-photo"
              src="/images/tuscany-hero.webp"
              alt="A suburban Alberta street at dusk with snow-capped mountains on the horizon"
              loading="lazy"
              decoding="async"
              width="2000"
              height="1125"
            />
            <figcaption className="cov-caption">
              <MapPin className="lucide" aria-hidden="true" />
              Cochrane, Alberta — the middle of everywhere we work.
            </figcaption>
          </Reveal>

          <Reveal className="cov-panel" technique="rise" delay={140}>
            <div className="cov-map-wrap" ref={mapRef}>
              <p className="cov-map-title">Coverage Schematic</p>
              <svg
                className="cov-map"
                viewBox="0 0 100 80"
                role="img"
                aria-label="Schematic map of the service area, with Cochrane at the centre and routes running to Calgary, Airdrie, Bragg Creek and the surrounding communities"
              >
                <defs>
                  <pattern id="covGrid" width="8" height="8" patternUnits="userSpaceOnUse">
                    <path d="M8 0 L0 0 0 8" fill="none" stroke="currentColor" strokeWidth="0.2" />
                  </pattern>
                </defs>
                <rect className="cov-map-grid" x="0" y="0" width="100" height="80" fill="url(#covGrid)" />

                {ROUTES.map((r) => (
                  <path
                    key={r.id}
                    className="cov-route"
                    data-draw-path
                    data-hot={active && r.links.includes(active) ? 'true' : 'false'}
                    d={r.d}
                    fill="none"
                  />
                ))}

                {TOWNS.map((t) => (
                  <g
                    key={t.id}
                    className="cov-node"
                    data-zone-active={active === t.id ? 'true' : 'false'}
                    data-base={t.base ? 'true' : 'false'}
                    onMouseEnter={() => setActive(t.id)}
                    onMouseLeave={() => setActive(null)}
                  >
                    <circle className="zone-halo" cx={t.x} cy={t.y} r="6" />
                    <circle className="zone-node" cx={t.x} cy={t.y} r={t.base ? 3 : 2.1} />
                    <text className="cov-node-text" x={t.x} y={t.y - 5}>{t.name}</text>
                  </g>
                ))}
              </svg>
              <p className="cov-map-legend">
                <span className="cov-legend-key" aria-hidden="true" />
                Home base
                <span className="cov-legend-sep" aria-hidden="true" />
                Schematic only — not to scale
              </p>
            </div>

            <div className="cov-list-block">
              <h3 className="h3 h3--light cov-list-title">Communities We Cover</h3>
              <ul className="cov-list list-reset">
                {TOWNS.map((t) => (
                  <li key={t.id}>
                    <button
                      type="button"
                      className="cov-town"
                      data-active={active === t.id ? 'true' : 'false'}
                      onMouseEnter={() => setActive(t.id)}
                      onMouseLeave={() => setActive(null)}
                      onFocus={() => setActive(t.id)}
                      onBlur={() => setActive(null)}
                      aria-label={`${t.name} — ${t.note}`}
                    >
                      <span className="cov-town-dot" aria-hidden="true" />
                      <span className="cov-town-name">{t.name}</span>
                      <span className="cov-town-note">{t.note}</span>
                    </button>
                  </li>
                ))}
              </ul>
              <div className="cov-cta">
                <a className="btn btn--primary btn--sm" href={TEL}>
                  <Phone className="lucide" aria-hidden="true" />
                  Call {PHONE_DISPLAY}
                </a>
                <p className="reassure reassure--light cov-reassure">
                  <MapPin className="lucide" aria-hidden="true" />
                  <span>Not on the list? Call and ask — we take work across Rocky View County.</span>
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
