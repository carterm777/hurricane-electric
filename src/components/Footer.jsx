import { Phone, MapPin, MessageSquareText, Mail, Facebook, Instagram, Linkedin } from 'lucide-react'
import { Stagger } from '../lib/motion.js'
import { PHONE_DISPLAY, TEL, SMS, EMAIL, MAILTO, LOCATION } from '../lib/site.js'
import './footer.css'

/* Footer — Mega Footer (4 columns) / Gradient Fade-to-Dark.
   Deviation from the assigned Split Footer with Final CTA Panel is recorded in
   SELECTION-LOG.md: the CTA banner immediately above already carries the ask,
   which is exactly the condition that layout's Avoid-when rules it out for. */

const SERVICES = [
  'Energy-Efficient Lighting Installation',
  'Residential Electrical',
  'Commercial Electrical',
  'LED Retrofits & Upgrades',
  'Electrical Troubleshooting & Repair',
]

const QUICK = [
  { label: 'Home', href: '#top' },
  { label: 'About', href: '#story' },
  { label: 'Services', href: '#services' },
  { label: 'Service Areas', href: '#coverage' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  return (
    <footer className="ftr" id="footer">
      <h2 className="sr-only">Hurricane Electric Contact And Site Links</h2>
      <div className="shell">
        <Stagger className="ftr-cols" technique="rise" step={90} itemClassName="ftr-cell">
          <div className="ftr-brand">
            <div className="ftr-mark">
              <span className="ftr-mark-glyph" aria-hidden="true"><span className="ftr-mark-eye" /></span>
              <span className="ftr-mark-text">
                <span className="ftr-mark-name">Hurricane</span>
                <span className="ftr-mark-sub">Electric</span>
              </span>
            </div>
            <p className="ftr-mission">
              We're a licensed Cochrane electrical contractor with more than 15 years of experience,
              known for energy-efficient lighting work built to current Canadian Electrical Code. We
              serve homes and businesses across Cochrane, Calgary, and the surrounding area.
            </p>
            <ul className="ftr-social list-reset">
              <li>
                <a className="ftr-social-link" href="#footer" aria-label="Hurricane Electric on Facebook">
                  <Facebook className="lucide" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a className="ftr-social-link" href="#footer" aria-label="Hurricane Electric on Instagram">
                  <Instagram className="lucide" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a className="ftr-social-link" href="#footer" aria-label="Hurricane Electric on LinkedIn">
                  <Linkedin className="lucide" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>

          <nav className="ftr-nav" aria-label="Services">
            <h3 className="ftr-col-title">Our Services</h3>
            <ul className="ftr-links list-reset">
              {SERVICES.map((s) => (
                <li key={s}><a className="tlink" href="#services">{s}</a></li>
              ))}
            </ul>
          </nav>

          <nav className="ftr-nav" aria-label="Quick links">
            <h3 className="ftr-col-title">Quick Links</h3>
            <ul className="ftr-links list-reset">
              {QUICK.map((q) => (
                <li key={q.label}><a className="tlink" href={q.href}>{q.label}</a></li>
              ))}
            </ul>
          </nav>

          <div className="ftr-contact">
            <h3 className="ftr-col-title">Hurricane Electric</h3>
            <ul className="ftr-links ftr-links--contact list-reset">
              <li>
                <span className="ftr-contact-row">
                  <MapPin className="lucide" aria-hidden="true" />
                  <span>{LOCATION}</span>
                </span>
              </li>
              <li>
                <a className="ftr-contact-row tlink" href={TEL}>
                  <Phone className="lucide" aria-hidden="true" />
                  <span>{PHONE_DISPLAY}</span>
                </a>
              </li>
              <li>
                <a className="ftr-contact-row tlink" href={SMS}>
                  <MessageSquareText className="lucide" aria-hidden="true" />
                  <span>Text {PHONE_DISPLAY}</span>
                </a>
              </li>
              <li>
                <a className="ftr-contact-row tlink" href={MAILTO}>
                  <Mail className="lucide" aria-hidden="true" />
                  <span>{EMAIL}</span>
                </a>
              </li>
            </ul>
            <p className="ftr-note">
              Address, phone and email shown here are placeholders for this demonstration build.
            </p>
          </div>
        </Stagger>

        <div className="ftr-base">
          <p className="ftr-copy">
            &copy; {new Date().getFullYear()} Hurricane Electric. Licensed and insured electrical
            contracting in Cochrane, Alberta.
          </p>
          <p className="ftr-demo">Demonstration site — not the live Hurricane Electric website.</p>
        </div>
      </div>
    </footer>
  )
}
