/* ── Motion & interaction library ───────────────────────────────────────────
   Shared plumbing only. Every visual decision (distance, colour, shape) stays
   in each site's own CSS. Scroll entrances follow the repo's Scroll Trigger
   Timing rule: fire once the element is meaningfully inside the viewport,
   never at first pixel.
   ───────────────────────────────────────────────────────────────────────── */
import { useEffect, useRef, useState, useCallback, Fragment } from 'react'

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* Fires when the element is ~18% into the viewport (repo default: 0.15–0.2
   threshold / -12% bottom rootMargin). Unobserves after the first hit so the
   entrance never replays on scroll-back. */
export function useInView({
  threshold = 0.18, rootMargin = '0px 0px -12% 0px', once = true, observeParent = false,
} = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) { setInView(true); return }
    /* Chrome counts the target's OWN clip-path when computing the intersection
       ratio, so an element starting at `clip-path: inset(0 0 100% 0)` has a
       ratio of 0 and can never satisfy a 0.18 threshold — the entrance never
       fires and the content stays invisible for the whole session. Verified
       empirically. For those techniques, watch an unclipped ancestor instead. */
    const target = observeParent && el.parentElement ? el.parentElement : el
    // Elements taller than the viewport can never satisfy a % threshold, so
    // trigger those off a fixed band near their top edge instead.
    const tall = target.offsetHeight > window.innerHeight * 0.9
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) { setInView(true); if (once) { io.unobserve(target); stopNet() } }
        else if (!once) setInView(false)
      },
      tall
        ? { threshold: 0, rootMargin: '0px 0px -25% 0px' }
        : { threshold, rootMargin }
    )
    io.observe(target)

    /* Safety net. A fast programmatic scroll — the screenshot harness, a jump
       to an anchor, a flung touch scroll — can leave an IntersectionObserver
       notification undelivered, and the element then stays at opacity 0 for
       the rest of the session. Verified empirically: roughly one section in
       ten was stranded per full-page scroll pass. The observer stays primary;
       this only re-checks the SAME trigger point (top edge 12% into the
       viewport, matching the rootMargin above) and anything already scrolled
       past. It never fires at first pixel. */
    let raf = null
    let netOn = true
    const stopNet = () => {
      if (!netOn) return
      netOn = false
      window.removeEventListener('scroll', onNet)
      window.removeEventListener('resize', onNet)
      if (raf) cancelAnimationFrame(raf)
    }
    function check() {
      raf = null
      if (!netOn) return
      const r = target.getBoundingClientRect()
      const vh = window.innerHeight || 0
      const line = tall ? vh * 0.75 : vh * 0.88
      if (r.bottom <= 0 || (r.top < line && r.bottom > 0)) {
        setInView(true)
        if (once) { io.unobserve(target); stopNet() }
      }
    }
    function onNet() { if (raf === null) raf = requestAnimationFrame(check) }
    window.addEventListener('scroll', onNet, { passive: true })
    window.addEventListener('resize', onNet, { passive: true })

    return () => { io.disconnect(); stopNet() }
  }, [threshold, rootMargin, once, observeParent])
  return [ref, inView]
}

/* Techniques whose start state hides the element from IntersectionObserver. */
const CLIPPED = new Set(['clip', 'wipe'])

/* Declarative entrance wrapper.
   technique: 'rise' | 'clip' | 'settle' | 'focus' | 'draw' | 'wipe' | 'fade'
   delay: ms offset relative to the group before it (80–150ms reads deliberate) */
export function Reveal({
  as: Tag = 'div', technique = 'rise', delay = 0, className = '',
  threshold, rootMargin, style, children, ...rest
}) {
  const [ref, inView] = useInView({ threshold, rootMargin, observeParent: CLIPPED.has(technique) })
  return (
    <Tag
      ref={ref}
      data-reveal={technique}
      data-in={inView ? 'true' : 'false'}
      className={className}
      style={{ '--reveal-delay': `${delay}ms`, ...style }}
      {...rest}
    >{children}</Tag>
  )
}

/* Group stagger: one observer for the whole group, incremental delays on the
   children. Use this instead of N separate Reveals so related elements read as
   one sequence rather than N independent accidents. */
export function Stagger({
  as: Tag = 'div', technique = 'rise', step = 110, start = 0,
  itemClassName = '', className = '', threshold, rootMargin, children, ...rest
}) {
  const [ref, inView] = useInView({ threshold, rootMargin })
  const items = (Array.isArray(children) ? children : [children]).flat().filter(Boolean)
  return (
    <Tag ref={ref} className={className} data-stagger-root data-in={inView ? 'true' : 'false'} {...rest}>
      {items.map((child, i) => (
        <div
          key={child?.key ?? i}
          className={itemClassName}
          data-reveal={technique}
          data-stagger-item
          style={{ '--reveal-delay': `${start + i * step}ms` }}
        >{child}</div>
      ))}
    </Tag>
  )
}

/* Word-by-word headline reveal. Once-per-page technique — hero only, and only
   for headlines under ~10 words. Renders plain text when reduced motion is on. */
export function WordReveal({ text, as: Tag = 'span', step = 75, start = 0, className = '' }) {
  const [ref, inView] = useInView({ threshold: 0.2 })
  const words = String(text).split(' ')
  if (prefersReducedMotion()) return <Tag className={className}>{text}</Tag>
  /* The space between words must sit OUTSIDE the inline-block. Inside it, two
     adjacent .wr-word boxes have no whitespace between them, so the line has no
     soft-wrap opportunity and the headline is forced onto a single line —
     which breaks the brief's 2–3 line hero wrap. */
  return (
    <Tag ref={ref} className={className} data-word-reveal data-in={inView ? 'true' : 'false'}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="wr-word" style={{ '--reveal-delay': `${start + i * step}ms` }}>
            <span className="wr-inner">{w}</span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </Tag>
  )
}

/* Counting Numerals — 1200–1800ms, ease-out-expo, once per view. */
export function useCountUp(target, { duration = 1500, decimals = 0 } = {}) {
  const [ref, inView] = useInView({ threshold: 0.4 })
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!inView) return
    if (prefersReducedMotion()) { setValue(target); return }
    let raf, startTs
    const tick = (ts) => {
      if (!startTs) startTs = ts
      const p = Math.min((ts - startTs) / duration, 1)
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p)   // ease-out-expo
      setValue(Number((target * eased).toFixed(decimals)))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, target, duration, decimals])
  return [ref, value]
}

/* Layered Parallax Drift — desktop only, flattened on mobile and under
   reduced motion, per the repo's Avoid-when note. */
export function useParallax(speed = 0.35, { axis = 'y', disableBelow = 900 } = {}) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion() || window.innerWidth < disableBelow) {
      el.style.transform = ''
      return
    }
    let raf = null
    const update = () => {
      raf = null
      const r = el.getBoundingClientRect()
      const centre = r.top + r.height / 2 - window.innerHeight / 2
      const offset = -centre * speed
      el.style.transform = axis === 'y'
        ? `translate3d(0, ${offset.toFixed(2)}px, 0)`
        : `translate3d(${offset.toFixed(2)}px, 0, 0)`
    }
    const onScroll = () => { if (raf === null) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [speed, axis, disableBelow])
  return ref
}

/* Cursor-Reactive Glow — writes --mx/--my (%) on the element. Dark/high-
   contrast panels only, 1–2 per page maximum. */
export function useCursorGlow() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    if (window.matchMedia('(hover: none)').matches) return
    const move = (e) => {
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`)
      el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`)
    }
    const enter = () => el.setAttribute('data-glow', 'on')
    const leave = () => el.removeAttribute('data-glow')
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerenter', enter)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerenter', enter)
      el.removeEventListener('pointerleave', leave)
    }
  }, [])
  return ref
}

/* Progressive Reveal Scrub — 0→1 as the element travels toward viewport
   centre. Written to --scrub so CSS owns what the number actually does. */
export function useScrub({ disableBelow = 0 } = {}) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion() || window.innerWidth < disableBelow) {
      el.style.setProperty('--scrub', '1'); return
    }
    let raf = null
    const update = () => {
      raf = null
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      const p = 1 - Math.min(Math.max((r.top - vh * 0.15) / (vh * 0.6), 0), 1)
      el.style.setProperty('--scrub', p.toFixed(3))
    }
    const onScroll = () => { if (raf === null) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [disableBelow])
  return ref
}

/* Page scroll offset, for sticky-nav state and scroll-progress rules. */
export function useScrollY() {
  const [y, setY] = useState(0)
  useEffect(() => {
    let raf = null
    const update = () => { raf = null; setY(window.scrollY) }
    const onScroll = () => { if (raf === null) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf) }
  }, [])
  return y
}

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = (e) => setMatches(e.matches)
    setMatches(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [query])
  return matches
}

/* Accessible accordion state — single-open by default. */
export function useAccordion(initial = null, { allowMultiple = false } = {}) {
  const [open, setOpen] = useState(allowMultiple ? (initial ?? []) : initial)
  const toggle = useCallback((id) => {
    setOpen((cur) =>
      allowMultiple
        ? (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id])
        : (cur === id ? null : id)
    )
  }, [allowMultiple])
  const isOpen = useCallback(
    (id) => (allowMultiple ? open.includes(id) : open === id),
    [open, allowMultiple]
  )
  return { open, toggle, isOpen }
}
