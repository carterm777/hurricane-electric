import { Reveal, Stagger, useCountUp } from '../lib/motion.js'
import { StarSweep } from '../lib/motion-extra.js'
import './reviews.css'

/* ── PLACEHOLDER CONTENT ────────────────────────────────────────────────────
   Every review below is fabricated demonstration copy, as are the aggregate
   rating, the review count and the relative dates. Before this site goes live
   they must be replaced with real reviews pulled from Hurricane Electric's
   Google Business Profile.
   ───────────────────────────────────────────────────────────────────────── */
const REVIEWS = [
  {
    name: 'Kevin O.',
    quote: 'Our power bill dropped noticeably after the LED retrofit. Wish we’d done it years earlier.',
    focus: 'LED Retrofit',
    when: '3 weeks ago',
  },
  {
    name: 'Amanda P.',
    quote: 'Quoted the commercial fit-out clearly and stuck to the number they gave us, even with a change partway through.',
    focus: 'Commercial Fit-Out',
    when: 'a month ago',
  },
  {
    name: 'Ben T.',
    quote: 'Found and fixed a wiring issue an inspector flagged before our sale closed. Fast and no drama.',
    focus: 'Inspection Repair',
    when: '2 months ago',
  },
  {
    name: 'Lindsey W.',
    quote: 'Explained exactly why our old fixtures were drawing so much power before recommending anything new.',
    focus: 'Lighting Assessment',
    when: '3 months ago',
  },
  {
    name: 'Cory D.',
    quote: 'Booked a panel upgrade and they were done in a single day, cleanup included.',
    focus: 'Panel Upgrade',
    when: '4 months ago',
  },
]

function GoogleGlyph() {
  return (
    <svg className="rev-g" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <path fill="#4285F4" d="M45.1 24.5c0-1.6-.1-3.2-.4-4.7H24v9h11.9c-.5 2.8-2.1 5.1-4.4 6.7v5.5h7.1c4.2-3.8 6.5-9.5 6.5-16.5z" />
      <path fill="#34A853" d="M24 46c5.9 0 10.9-2 14.6-5.3l-7.1-5.5c-2 1.3-4.5 2.1-7.5 2.1-5.8 0-10.7-3.9-12.4-9.1H4.3v5.7C8 41.2 15.4 46 24 46z" />
      <path fill="#FBBC05" d="M11.6 28.2c-.4-1.3-.7-2.7-.7-4.2s.3-2.9.7-4.2v-5.7H4.3A22 22 0 0 0 2 24c0 3.6.9 6.9 2.3 9.9l7.3-5.7z" />
      <path fill="#EA4335" d="M24 10.7c3.3 0 6.2 1.1 8.5 3.3l6.3-6.3C34.9 4.1 29.9 2 24 2 15.4 2 8 6.8 4.3 13.9l7.3 5.7c1.7-5.2 6.6-9.1 12.4-9.1z" />
    </svg>
  )
}

function Aggregate() {
  const [ref, value] = useCountUp(4.9, { duration: 1600, decimals: 1 })
  return (
    <div className="rev-agg">
      <div className="rev-agg-badge">
        <GoogleGlyph />
        <span className="rev-agg-badge-text">Google Reviews</span>
      </div>
      <div className="rev-agg-main">
        <p className="rev-agg-figure" ref={ref}>
          <span className="rev-agg-num">{value.toFixed(1)}</span>
          <span className="rev-agg-den">/ 5</span>
        </p>
        <div className="rev-agg-side">
          <StarSweep size="lg" start={420} label="Rated 4.9 out of 5 stars" />
          <p className="rev-agg-count">4.9 out of 5 based on 70+ Google reviews</p>
        </div>
      </div>
      <p className="rev-agg-note">
        Placeholder rating — pending live Google Business Profile data
      </p>
    </div>
  )
}

export default function Reviews() {
  return (
    <section className="section rev band-cream" id="reviews" aria-labelledby="rev-h2">
      <div className="shell">
        <div className="rev-top">
          <Reveal className="sec-head rev-head" technique="rise">
            <p className="eyebrow eyebrow--light">What Customers Say</p>
            <h2 className="h2 h2--light" id="rev-h2">Reviewed By Cochrane And Calgary Homeowners</h2>
          </Reveal>

          <Reveal className="rev-agg-wrap" technique="rise" delay={140}>
            <Aggregate />
          </Reveal>
        </div>

        <Stagger
          className="rev-list"
          technique="rise"
          step={90}
          start={120}
          itemClassName="rev-cell"
        >
          {REVIEWS.map((r) => (
            <article className="rev-item" key={r.name}>
              <div className="rev-item-top">
                <StarSweep size="sm" label="5 out of 5 stars" />
                <span className="rev-focus">{r.focus}</span>
                <span className="rev-src">
                  <GoogleGlyph />
                  Google
                </span>
              </div>
              <p className="rev-quote">{r.quote}</p>
              <p className="rev-attr">
                <span className="rev-avatar" aria-hidden="true">{r.name[0]}</span>
                <span className="rev-name">{r.name}</span>
                <span className="rev-when">{r.when}</span>
              </p>
            </article>
          ))}
          <aside className="rev-note">
            <GoogleGlyph />
            <p>
              Demonstration content. Every review, the rating and the count on this page are
              placeholders — they get replaced with live Google Business Profile reviews before
              this site goes anywhere near a customer.
            </p>
          </aside>
        </Stagger>
      </div>
    </section>
  )
}
