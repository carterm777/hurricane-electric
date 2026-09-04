/* ── Site-specific motion techniques ────────────────────────────────────────
   Four techniques the shared kit does not provide, each implementing a real
   entry from the design system rather than an invented effect. Every one has a
   reduced-motion path written alongside it.

     1. useStrokeDraw  — Sequential Line Draw   (animation-and-motion-richness)
     2. useIconDraw    — Icon Draw-In           (animations/value-proposition)
     3. StarSweep      — Star Rating Fill       (animations/social-proof)
     4. useSlowPan     — Banner Background Slow Pan (animations/calls-to-action)
   ───────────────────────────────────────────────────────────────────────── */
import { useEffect, useRef } from 'react'
import { Star } from 'lucide-react'
import { useInView, prefersReducedMotion } from './motion.js'

/* ── 1. Sequential Line Draw ────────────────────────────────────────────────
   The kit's `data-reveal="stroke"` needs a hard-coded --draw-len. Real paths
   have real lengths, so measure them and sequence the segments: 620ms each,
   140ms apart, ease-out-quart, fired once the container is 18% into view. */
export function useStrokeDraw({ selector = '[data-draw-path]', step = 140, duration = 620 } = {}) {
  const [ref, inView] = useInView({ threshold: 0.18 })
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const paths = [...root.querySelectorAll(selector)]
    if (!paths.length) return
    const reduce = prefersReducedMotion()
    paths.forEach((p, i) => {
      const len = typeof p.getTotalLength === 'function' ? p.getTotalLength() : 0
      if (!len) return
      if (reduce) {
        p.style.strokeDasharray = 'none'
        p.style.strokeDashoffset = '0'
        return
      }
      p.style.strokeDasharray = `${len}`
      p.style.transition = `stroke-dashoffset ${duration}ms cubic-bezier(0.25,1,0.5,1) ${i * step}ms`
      p.style.strokeDashoffset = inView ? '0' : `${len}`
    })
  }, [inView, selector, step, duration, ref])
  return [ref, inView]
}

/* ── 2. Icon Draw-In ────────────────────────────────────────────────────────
   Lucide renders plain SVG children, so the icon's own strokes can be drawn as
   the leading beat of the item it belongs to. Runs on the whole icon at once
   (not shape-by-shape) — letter-by-letter equivalents read as gimmicky at this
   quality bar. */
export function useIconDraw({ delay = 0, duration = 720 } = {}) {
  const [ref, inView] = useInView({ threshold: 0.25 })
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const svg = root.querySelector('svg')
    if (!svg) return
    const shapes = [...svg.querySelectorAll('path, line, circle, rect, polyline, polygon')]
    if (!shapes.length) return
    if (prefersReducedMotion()) {
      shapes.forEach((s) => { s.style.strokeDasharray = 'none'; s.style.strokeDashoffset = '0' })
      return
    }
    shapes.forEach((s, i) => {
      let len = 0
      try { len = s.getTotalLength() } catch { len = 0 }
      if (!len) return
      s.style.strokeDasharray = `${len}`
      s.style.transition = `stroke-dashoffset ${duration}ms cubic-bezier(0.25,1,0.5,1) ${delay + i * 45}ms`
      s.style.strokeDashoffset = inView ? '0' : `${len}`
    })
  }, [inView, delay, duration, ref])
  return ref
}

/* ── 3. Star Rating Fill Animation on Scroll ────────────────────────────────
   One quick sequential sweep across the row — not a long stagger — fired after
   the content it belongs to has entered. Outline stars underneath, a filled
   overlay whose width sweeps to 100%. */
export function StarSweep({ count = 5, start = 0, step = 70, size = 'md', label }) {
  const [ref, inView] = useInView({ threshold: 0.35 })
  return (
    <span
      ref={ref}
      className={`starsweep starsweep--${size}`}
      data-in={inView ? 'true' : 'false'}
      role="img"
      aria-label={label || `${count} out of 5 stars`}
    >
      {Array.from({ length: count }, (_, i) => (
        <span className="starsweep-cell" key={i} aria-hidden="true">
          <Star className="starsweep-out" />
          <span className="starsweep-fill" style={{ '--star-delay': `${start + i * step}ms` }}>
            <Star className="starsweep-in" />
          </span>
        </span>
      ))}
    </span>
  )
}

/* ── 4. Banner Background Slow Pan ──────────────────────────────────────────
   Continuous, low amplitude, ~34s. Only meaningful on a photographic banner
   bed; off below 900px and under reduced motion, per the entry's own note. */
export function useSlowPan({ disableBelow = 900 } = {}) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion() || window.innerWidth < disableBelow) {
      el.removeAttribute('data-pan')
      return
    }
    el.setAttribute('data-pan', 'on')
  }, [disableBelow])
  return ref
}
