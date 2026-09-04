import { Lightbulb, FileCheck, Award, ShieldCheck } from 'lucide-react'
import { Reveal } from '../lib/motion.js'
import { useIconDraw } from '../lib/motion-extra.js'
import './why.css'

/* Why Us — Single Statement + Supporting Points / Icon Line-Art Treatment.
   The four points are not equal: the lighting expertise is the differentiator
   and the other three support it, which is the hierarchy this layout implies
   and which an Icon + Blurb Grid would have flattened. */

const POINTS = [
  {
    icon: Lightbulb,
    title: 'Energy-Efficient Lighting Expertise',
    body: 'Lighting is where most of our calls start, and we plan every install around real usage instead of just filling a room with fixtures.',
  },
  {
    icon: FileCheck,
    title: 'Work Built To Code',
    body: 'Every project, residential or commercial, is completed to current Canadian Electrical Code, not just close enough to pass.',
  },
  {
    icon: Award,
    title: '15+ Years Of Field Experience',
    body: 'More than 15 years of hands-on electrical work backs every estimate we give and every job we complete.',
  },
  {
    icon: ShieldCheck,
    title: 'Licensed, Insured, Accountable',
    body: 'Fully licensed and insured electricians handle every job, with clear communication from quote to final walkthrough.',
  },
]

function Point({ icon: Icon, title, body, index }) {
  const iconRef = useIconDraw({ delay: index * 60 })
  return (
    <li className="why-point">
      <span className="why-point-icon" ref={iconRef} aria-hidden="true">
        <Icon className="lucide" />
      </span>
      <div className="why-point-text">
        <h3 className="h3 why-point-title">{title}</h3>
        <p className="why-point-body">{body}</p>
      </div>
    </li>
  )
}

export default function WhyUs() {
  return (
    <section className="section why band-field" id="why" aria-labelledby="why-h2">
      <div className="shell">
        <div className="why-top">
          <Reveal className="sec-head why-head" technique="rise">
            <p className="eyebrow">Why Hurricane Electric</p>
            <h2 className="h2" id="why-h2">
              Most Shops Sell Fixtures. We Plan The Load Behind Them.
            </h2>
          </Reveal>

          <Reveal className="why-lead lead" technique="rise" delay={120} as="p">
            Fifteen years in the field taught us that the difference between an electrical job
            that holds up and one that gets redone is decided long before anything is mounted —
            in the layout, the load, and whether it was signed off to current code.
          </Reveal>
        </div>

        <div className="why-grid">
          <Reveal className="why-figure" technique="settle" delay={100} as="figure">
            <span className="why-frame" data-reveal="draw" style={{ '--reveal-delay': '900ms' }} aria-hidden="true" />
            <img
              className="why-photo"
              src="/images/panel-tech.webp"
              alt="Electrician in navy workwear checking an open breaker panel with a clipboard in hand"
              loading="lazy"
              decoding="async"
              width="2000"
              height="1125"
            />
            <figcaption className="why-caption">
              Every quote starts at the panel, not the fixture.
            </figcaption>
          </Reveal>

          <Reveal className="why-points-wrap" technique="rise" delay={180}>
            <ul className="why-points list-reset">
              {POINTS.map((p, i) => <Point key={p.title} index={i} {...p} />)}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
