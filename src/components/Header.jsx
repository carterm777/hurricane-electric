import { useEffect, useRef, useState } from 'react'
import { Phone, Mail, MapPin, ChevronDown } from 'lucide-react'
import { useScrollY } from '../lib/motion.js'
import { PHONE_DISPLAY, TEL, EMAIL, MAILTO, LOCATION, SERVICE_LINKS, AREA_LINKS } from '../lib/site.js'
import './header.css'

/* Transparent-to-Solid Scroll Nav + Minimal Underline Link Treatment.
   Mobile carries no hamburger: the nav reduces to click-to-call, per the brief. */

const NAV = [
  { label: 'Home', href: '#top' },
  { label: 'About', href: '#story' },
  { label: 'Services', href: '#services', menu: SERVICE_LINKS, menuHref: '#services' },
  { label: 'Service Areas', href: '#coverage', menu: AREA_LINKS, menuHref: '#coverage' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Blog', href: '#footer' },
  { label: 'Contact', href: '#contact' },
]

export default function Header() {
  const y = useScrollY()
  const solid = y > 24
  const [open, setOpen] = useState(null)
  const navRef = useRef(null)

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header className="hdr" data-solid={solid ? 'true' : 'false'}>
      <div className="hdr-contact">
        <div className="shell hdr-contact-row">
          <a className="hdr-contact-item tlink" href={TEL}>
            <Phone className="lucide" aria-hidden="true" />
            <span>{PHONE_DISPLAY}</span>
          </a>
          <span className="hdr-contact-sep" aria-hidden="true" />
          <a className="hdr-contact-item tlink hdr-contact-item--wide" href={MAILTO}>
            <Mail className="lucide" aria-hidden="true" />
            <span>{EMAIL}</span>
          </a>
          <span className="hdr-contact-sep" aria-hidden="true" />
          <span className="hdr-contact-item hdr-contact-item--plain">
            <MapPin className="lucide" aria-hidden="true" />
            <span>{LOCATION}</span>
          </span>
        </div>
      </div>

      <div className="hdr-bar">
        <div className="shell hdr-row">
          <a className="hdr-mark" href="#top" aria-label="Hurricane Electric — back to top">
            <span className="hdr-mark-glyph" aria-hidden="true">
              <span className="hdr-mark-eye" />
            </span>
            <span className="hdr-mark-text">
              <span className="hdr-mark-name">Hurricane</span>
              <span className="hdr-mark-sub">Electric</span>
            </span>
          </a>

          <nav className="hdr-nav" aria-label="Primary" ref={navRef}>
            <ul className="hdr-nav-list list-reset">
              {NAV.map((item) => (
                <li
                  key={item.label}
                  className="hdr-nav-item"
                  onMouseEnter={() => item.menu && setOpen(item.label)}
                  onMouseLeave={() => item.menu && setOpen(null)}
                >
                  {item.menu ? (
                    <>
                      <button
                        type="button"
                        className="hdr-nav-link hdr-nav-trigger"
                        aria-expanded={open === item.label}
                        aria-controls={`menu-${item.label.replace(/\s+/g, '-').toLowerCase()}`}
                        onFocus={() => setOpen(item.label)}
                        onClick={() => {
                          setOpen(null)
                          document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' })
                        }}
                      >
                        <span>{item.label}</span>
                        <ChevronDown className="lucide hdr-nav-chev" aria-hidden="true" />
                      </button>
                      {open === item.label && (
                        <div
                          className="hdr-menu"
                          id={`menu-${item.label.replace(/\s+/g, '-').toLowerCase()}`}
                          onBlur={(e) => {
                            if (!e.currentTarget.contains(e.relatedTarget)) setOpen(null)
                          }}
                        >
                          <p className="hdr-menu-label">{item.label}</p>
                          <ul className="hdr-menu-list list-reset">
                            {item.menu.map((sub, i) => (
                              <li key={sub} style={{ '--col': i % 2 }}>
                                <a className="hdr-menu-link" href={item.menuHref} onClick={() => setOpen(null)}>
                                  {sub}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </>
                  ) : (
                    <a className="hdr-nav-link" href={item.href}>{item.label}</a>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <a className="btn btn--primary btn--sm hdr-call" href={TEL}>
            <Phone className="lucide" aria-hidden="true" />
            <span className="hdr-call-label">{PHONE_DISPLAY}</span>
            <span className="hdr-call-short">Call Now</span>
          </a>
        </div>
        <span className="hdr-underline" aria-hidden="true" />
      </div>
    </header>
  )
}
