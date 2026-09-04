import { Reveal, useScrub } from '../lib/motion.js'
import './story.css'

/* Our Story — Single-Column Long-Form Story / Dark Cinematic Narrative Band.
   The page's darkest field and its quietest moment. Progressive Reveal Scrub
   ties each paragraph to scroll position on desktop; below 900px and under
   reduced motion the scrub is pinned to 1 and a plain rise takes over. */

const PARAS = [
  'Fifteen years ago, most electrical calls in this part of Alberta were about keeping the lights on. Today, a good share of them are about keeping the lights on for less — LED retrofits, smarter fixture layouts, and lighting plans built around real usage instead of just filling a room with fixtures.',
  'We built our business around that shift instead of treating it as a side offering. Every lighting install we run, residential or commercial, gets planned the way a licensed electrician plans a load calculation: what the space needs, not what’s easiest to install. The same attention carries into every other job we take on, from panel upgrades to full renovation wiring.',
  'Cochrane and Calgary have grown fast, and a lot of the properties we work on are being renovated, expanded, or brought up to current code for the first time in decades. We do that work the way we’d want it done in our own house — to code, explained clearly, and without cutting a corner that costs someone money down the line.',
]

function ScrubPara({ text }) {
  const ref = useScrub({ disableBelow: 900 })
  return <p className="story-p" ref={ref}>{text}</p>
}

export default function Story() {
  return (
    <section className="section story band-void" id="story" aria-labelledby="story-h2">
      <div className="shell shell--narrow story-inner">
        <Reveal className="sec-head story-head" technique="rise">
          <p className="eyebrow">Our Story</p>
          <h2 className="h2" id="story-h2">Fifteen Years From Keeping The Lights On</h2>
        </Reveal>

        <div className="story-body">
          {PARAS.map((t, i) => <ScrubPara key={i} text={t} />)}
        </div>

        <Reveal className="story-quote" technique="rise" delay={120} as="blockquote">
          <p>
            We do that work the way we&rsquo;d want it done in our own house — to code, explained
            clearly, and without cutting a corner.
          </p>
          <cite>Hurricane Electric, Cochrane</cite>
        </Reveal>
      </div>

      <Reveal className="story-band" technique="settle" delay={80} as="figure">
        <img
          className="story-band-img"
          src="/images/about-crew.webp"
          alt="Five-person Hurricane Electric crew lined up in front of two service vans inside their shop"
          loading="lazy"
          decoding="async"
          width="2000"
          height="1125"
        />
        <figcaption className="story-band-cap">
          The crew that runs every Cochrane and Calgary job.
        </figcaption>
      </Reveal>
    </section>
  )
}
