import { Phone } from 'lucide-react'
import { useScrollY, useMediaQuery } from '../lib/motion.js'
import { PHONE_DISPLAY, TEL } from '../lib/site.js'
import './callbar.css'

/* Mobile sticky call-only bar. Held back until 340px of scroll so it never
   competes with the hero fold, and rendered only once shown so nothing sits in
   the layout at zero opacity. */

export default function CallBar() {
  const y = useScrollY()
  const isMobile = useMediaQuery('(max-width: 900px)')
  if (!isMobile || y < 340) return null

  return (
    <div className="callbar" role="complementary" aria-label="Call Hurricane Electric">
      <a className="callbar-link" href={TEL}>
        <span className="callbar-icon" aria-hidden="true"><Phone className="lucide" /></span>
        <span className="callbar-text">
          <span className="callbar-lead">Call Hurricane Electric</span>
          <span className="callbar-num">{PHONE_DISPLAY}</span>
        </span>
      </a>
    </div>
  )
}
