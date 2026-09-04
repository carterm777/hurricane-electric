import { Plus, Phone, MessageSquareText } from 'lucide-react'
import { Reveal, Stagger, useAccordion } from '../lib/motion.js'
import { PHONE_DISPLAY, TEL, SMS } from '../lib/site.js'
import './faq.css'

/* FAQ — Two-Column Category Split / Minimal Line-Divided Accordion.
   The six questions split cleanly into licensing/code and scope/coverage,
   which is the condition the layout's Avoid-when requires. */

const GROUPS = [
  {
    category: 'Licensing & Code',
    items: [
      {
        q: 'Are you licensed and insured?',
        a: 'Yes. We’re fully licensed and insured, and every job is completed to current Canadian Electrical Code.',
      },
      {
        q: 'Is your electrical work up to code?',
        a: 'Yes, every project is completed to current Canadian Electrical Code, whether it’s a small repair or a full commercial fit-out.',
      },
      {
        q: 'What makes your lighting work energy-efficient?',
        a: 'We plan lighting around real fixture usage and switch to LED wherever it cuts power draw without cutting quality, instead of defaulting to whatever fixture is easiest to install.',
      },
    ],
  },
  {
    category: 'Scope & Coverage',
    items: [
      {
        q: 'Do you work on commercial properties, or just homes?',
        a: 'Both. We handle residential electrical work and commercial installs and retrofits, including offices and retail spaces.',
      },
      {
        q: 'Our lights flicker every time the furnace kicks on. Is that a wiring problem?',
        a: 'Often, yes. Flickering tied to another appliance turning on usually points to a shared circuit or a voltage drop somewhere in the wiring, and it’s worth having checked rather than ignored, since it can point to a bigger issue.',
      },
      {
        q: 'What areas do you serve?',
        a: 'We serve Cochrane, Calgary, Airdrie, Bearspaw, Springbank, Redwood Meadows, and the surrounding Rocky View County communities.',
      },
    ],
  },
]

export default function Faq() {
  const { isOpen, toggle } = useAccordion('g0-0')

  return (
    <section className="section faq band-deep" id="faq" aria-labelledby="faq-h2">
      <div className="shell">
        <Reveal className="sec-head faq-head" technique="rise">
          <p className="eyebrow">Common Questions</p>
          <h2 className="h2" id="faq-h2">Answers Before You Call</h2>
        </Reveal>

        <div className="faq-cols">
          {GROUPS.map((group, gi) => (
            <div className="faq-colwrap" key={group.category}>
            <Stagger
              className="faq-col"
              technique="rise"
              step={80}
              start={gi * 120}
              itemClassName="faq-cell"
            >
              <h3 className="faq-cat">{group.category}</h3>
              {group.items.map((item, ii) => {
                const id = `g${gi}-${ii}`
                const open = isOpen(id)
                return (
                  <div className="faq-item" key={id} data-open={open ? 'true' : 'false'}>
                    <h4 className="faq-q-wrap">
                      <button
                        type="button"
                        className="faq-q"
                        aria-expanded={open}
                        aria-controls={`faq-a-${id}`}
                        id={`faq-q-${id}`}
                        onClick={() => toggle(id)}
                      >
                        <span className="faq-q-text">{item.q}</span>
                        <span className="faq-icon" aria-hidden="true"><Plus className="lucide" /></span>
                      </button>
                    </h4>
                    <div
                      className="faq-a"
                      id={`faq-a-${id}`}
                      role="region"
                      aria-labelledby={`faq-q-${id}`}
                    >
                      <div className="faq-a-inner"><p>{item.a}</p></div>
                    </div>
                  </div>
                )
              })}
            </Stagger>
            </div>
          ))}
        </div>

        <Reveal className="faq-aside" technique="rise" delay={160}>
          <div className="faq-aside-text">
            <h3 className="h3 faq-aside-title">Still Not Sure What You're Looking At?</h3>
            <p className="faq-aside-copy">
              Send a photo through the form at the top of the page, or call and describe it — an
              electrician will tell you what it is before anyone books anything.
            </p>
          </div>
          <div className="faq-aside-actions">
            <a className="btn btn--primary btn--sm" href={TEL}>
              <Phone className="lucide" aria-hidden="true" />
              Call {PHONE_DISPLAY}
            </a>
            <a className="btn btn--ghost btn--sm" href={SMS}>
              <MessageSquareText className="lucide" aria-hidden="true" />
              Send A Text
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
