# Selection log — Hurricane Electric

Working document. Started at Step 0, updated through build and both finishing
passes. Process per `section-style-repo.md`: layout → visual style → animation →
element inventory, with the two shared richness files checked on every section.

---

## Step 0 — Page inventory

**Subject:** Hurricane Electric, a licensed electrical contractor in Cochrane,
Alberta, whose actual specialty is energy-efficient lighting — LED retrofits,
fixture layouts planned around real usage, work to current Canadian Electrical
Code. Audience: homeowners and commercial property managers in Cochrane and
Calgary. The page's single job: get a phone call or a photo-diagnosis submission.

**Page ambition level:** mixed, per DIRECTION.md. Two loud moments (the hero /
photo-diagnosis widget, and the Services spotlight), a deliberate quiet middle
(reviews, story), a dense technical close (coverage map, FAQ).

**Primary style family:** dark-moody + minimal-clean.

**The palette problem and how it was solved.** The brief fixes Light at #F4F1EA,
which is almost exactly the warm cream `front-end-design.md` names as an
AI-default page background. DIRECTION.md's warning is followed literally: the
deep navy (#1B2A38) and its shades are the dominant field for 9 of 11 sections;
the cream appears twice only, as *inset bands* (Google Reviews, Coverage), where
it reads as a lit surface cut into a dark page rather than as the page ground;
the amber (#E8A33D) never fills an area larger than a button — it is reserved
for hairlines, rules, tick marks, the star row, and the map nodes.

**Section inventory, in page order, with imagery:**

| # | Section | Imagery available and used |
|---|---|---|
| 1 | Header / nav | none (type + rule only) |
| 2 | Hero | `street-dusk.webp` — full-bleed bed |
| 3 | Google Reviews | none — deliberate, see below |
| 4 | Trust Badges Banner | `tex-steel.webp` at very low opacity as panel surface |
| 5 | Why Us | `panel-tech.webp` — framed insert |
| 6 | Services | `lighting-hero.webp` (spotlight) + `panel-new`, `commercial-lift`, `office-ti`, `troubleshooting-hero` |
| 7 | Our Story | `about-crew.webp` — full-width divider band |
| 8 | Service Area | `tuscany-hero.webp` + a custom-drawn SVG coverage map |
| 9 | FAQ | none — deliberate, see below |
| 10 | Final CTA | `flatlay-materials.webp` — full-bleed bed |
| 11 | Footer | none (gradient only) |

Fourteen distinct photographs, none reused.

**Font substitution:** none required. The brief names Lexend Deca (display) and
Public Sans (body); both are real Google Fonts families and are loaded directly,
at 300/400/500/600 and 400/500/600 respectively.

**Carry-through techniques assigned by DIRECTION.md:**
- *Image:* **Full-Bleed Background Photo with Foreground Card** — used twice,
  deliberately: the Hero (photo bed + glass widget card) and the Final CTA
  (flat-lay bed + foreground call/text card). Its Avoid-when ("no photo that
  reads well cropped and zoomed to fill a section") is satisfied by both —
  `street-dusk` and `flatlay-materials` are both wide, low-detail-at-edges frames.
- *Motion:* **Depth Settle** on photography (Why Us insert, Services spotlight and
  cards, Story band, Coverage photo) and **Slow Ambient Drift** on the hero scrim.
  Drift's Avoid-when ("don't stack ambient background motion under active
  foreground motion") is respected: the drift layer runs only in the hero, and
  the hero's foreground motion is a one-shot load sequence that finishes in
  ~1.6s, after which nothing else in that section moves.

---

## Sections

### 1. Navigation
- **Layout:** Transparent-to-Solid Scroll Nav *(assigned)*
- **Visual style:** Minimal Underline Link Treatment *(assigned)* — style family
  minimal-clean, over a dark-moody field
- **Animation:** Nav Background Fade-In on Scroll + Underline Grow on Hover +
  Mega Menu Column Stagger Reveal
- **Element sequence:** the bar's own fill/blur/hairline are the only animated
  properties on scroll (logo, links and CTA never move). Per-link underline
  sweeps from the left on hover, 220ms ease-out-quart. Dropdown panels enter as
  one unit with their columns offset 60ms apart. Reduced motion: fill changes
  instantly, underline toggles, panel appears with no transform.
- **Trigger:** scroll position > 24px (JS, `useScrollY`), not an observer.
- **Rationale.** Layout: assigned, and it is the correct fit — the hero is a
  dark full-bleed photo, which is exactly the condition the entry's Avoid-when
  carves out for (it warns off text-only or light heroes). Visual style: the
  underline treatment keeps the nav quiet so the hero H1 and the widget own the
  first screen; a Bold Color-Block Nav Bar would have spent the amber before the
  page had said anything. Animation: fade-in-on-scroll is the animation entry
  written for this exact layout.

### 2. Hero
- **Layout:** Full-Bleed Image Hero *(assigned)*
- **Visual style:** Gradient Scrim *(assigned)*, style family dark-moody, plus
  **Full-Bleed Background Photo with Foreground Card** and **Layered Depth
  Composition** from the richness file
- **Animation:** Parallax Scroll Depth *(assigned)* + Staggered Load-In +
  Weighted Word Reveal (once-per-page) + CTA Micro-Interaction + Slow Ambient Drift
- **Motion budget:** 5 groups.
- **Element sequence (load trigger — nothing above the fold waits on a scroll
  observer it will never receive):**
  1. eyebrow + its amber tick — `data-load` rise, 0ms
  2. H1 — Weighted Word Reveal, words at 62ms apart, starting 120ms
  3. subheadline — rise, 620ms
  4. value-badge row — Staggered Rise as one group, 4 items 70ms apart, 760ms
  5. CTA pair — rise together as one unit (button + button + microcopy), 980ms
  6. widget card — Depth Settle, 1040ms; its internal controls are not staggered
     — the panel is one object
  Background bed: parallax (scroll-linked, desktop ≥900px only) and the amber
  glow layer on a 19s ambient drift, both independent of the load sequence.
  Reduced motion: all of the above resolve instantly; parallax and drift off.
- **Rationale.** Layout: assigned; the photo library is genuinely strong and the
  headline is 8 words, which is what full-bleed wants. Visual style: `street-dusk`
  has no natural dark zone at the left where the copy sits, so the scrim is doing
  real legibility work, not decoration — the entry's own Avoid-when is inverted
  here. Animation: parallax is assigned and pairs with the layered composition;
  Weighted Word Reveal is spent here and nowhere else, per its once-per-page rule.

### 3. Google Reviews Section
- **Layout:** Testimonial Card Grid *(assigned)*
- **Visual style:** Minimal Divider-Line Testimonial List *(assigned)*, style
  family minimal-clean, on the first **cream inset band**
- **Animation:** Staggered Rise for the review cells + Star Rating Fill Animation
  on Scroll + Counting Numerals on the aggregate figure
- **Element sequence:** eyebrow + H2 as one unit (0ms) → aggregate callout panel,
  its 4.9 counting up over 1500ms ease-out-expo and its five stars sweeping fill
  70ms apart, once the panel is 18% into view (+180ms) → five review cells rise
  as one staggered group in reading order, 90ms apart (+320ms). Hover on a cell
  lifts its left hairline to amber (Magnetic Lift, shadow-free variant, since
  there are no cards to lift). Reduced motion: opacity only, stars render filled,
  4.9 renders final.
- **Deliberate no-photo decision:** a Google-reviews block is recognisable
  because it is typographic — an aggregate figure, star rows, names, dividers.
  Adding photography here would make it read as a testimonial section, not a
  Google block. The design ambition goes into the aggregate callout instead.
- **Rationale.** Layout: card grid over carousel because five reviews should all
  be legible at once for a cold visitor who will not click anything. Visual style:
  divider-line over Glass Panel Quote Card because glass is already spent on the
  signature widget and would dilute it; the divider list also lets the cream band
  stay genuinely quiet between two dark sections.

### 4. Trust Badges Banner
- **Layout:** Certification Badge Wall (credibility)
- **Visual style:** Dark Framed Credential Panel *(assigned)*, style family
  dark-moody, plus **Textured or Patterned Background, No Photo** (`tex-steel`
  at 5% as the panel's surface)
- **Animation:** Badge Fade and Scale-In on Scroll
- **Element sequence:** the panel's amber hairline draws left-to-right first
  (`wipe`, 820ms), then the four badges enter as one staggered group 90ms apart.
  Reduced motion: rule at full width, badges at final opacity.
- **Element system:** four Lucide icons — FileCheck / ShieldCheck / Award /
  MapPin — all at `--icon-lg` with the page-wide `--icon-stroke`, each in an
  identical 44px square with the same optical padding, so the row reads as one
  system. Nothing invents a specific credential.
- **Rationale.** The assigned visual style names its own premium execution note —
  a thin brand-accent hairline rather than a hard rectangle edge — which is
  followed exactly. Its Avoid-when (a dark panel on a light airy page) does not
  apply: this page is dark-dominant.

### 5. Why Us
- **Layout:** Single Statement + Supporting Points *(assigned)*
- **Visual style:** Icon Line-Art Treatment *(assigned)*, style family
  minimal-clean, plus **Framed or Bordered Photo Insert** (`panel-tech`)
- **Animation:** Sequential Reveal on Scroll + **Icon Draw-In** (custom) +
  Bordered Frame Draw + Depth Settle on the photo
- **Element sequence:** eyebrow → H2 (clip reveal, observing an unclipped
  ancestor) → statement paragraph → photo insert (Depth Settle) with its amber
  frame drawing 150ms after the photo lands → four supporting points stagger
  110ms apart, each one's line-art icon drawing its stroke as the leading beat
  of its own item. Reduced motion: icons render complete, frame renders drawn.
- **Rationale.** Layout: assigned, and correct — the four points are not equal in
  weight; energy-efficient lighting is the differentiator and the other three
  support it, which is precisely the hierarchy this layout implies and the
  Icon + Blurb Grid would have flattened.

### 6. Services
- **Layout:** Featured Service Spotlight with Secondary List *(assigned)*
- **Visual style:** Glass Panel Service Card *(assigned)*, style family
  glass-depth, plus **Grid-Breaking Oversized Image** on the spotlight
- **Animation:** Staggered Grid Fade-In on Scroll + Card Hover Reveal +
  Image Zoom on Hover + Depth Settle
- **Element sequence:** eyebrow + H2 (one unit) → spotlight image (Depth Settle,
  oversized, breaking the grid to the right) → spotlight copy block + its CTA as
  one unit, 160ms after the image → four secondary glass cards stagger 100ms
  apart in reading order. Hover: card lifts 6px, its photo scales 1.05, and the
  hidden "See what this covers" line and arrow slide up into view. Reduced
  motion: no lift, no zoom; hover shows a border-colour change only.
- **Rationale.** Layout: assigned and genuinely correct — the brief's own copy
  puts Energy-Efficient Lighting Installation first and the source business
  leads with it, so a uniform Service Card Grid would have contradicted the
  positioning. Visual style: glass is the page's second use of the family after
  the widget, which is a deliberate rhyme between the signature element and the
  services it sells, not a repetition of convenience.

### 7. Our Story
- **Layout:** Single-Column Long-Form Story *(assigned)*
- **Visual style:** Dark Cinematic Narrative Band *(assigned)*, style family
  dark-moody, plus **Image as Section Divider** (`about-crew` as a full-width
  band closing the section)
- **Animation:** Progressive Reveal Scrub on the paragraphs + Pull-Quote Fade
  and Scale-In + Depth Settle on the divider band
- **Element sequence:** eyebrow → H2 → the three paragraphs, each tied to a
  scroll scrub (opacity and a 6px rise driven by distance from viewport centre,
  desktop only) → the pull-quote as its own beat after the prose has settled →
  the crew band last. Reduced motion and below 900px: scrub is pinned to 1, each
  paragraph gets a plain staggered rise instead.
- **Rationale.** Layout: assigned; the copy is three continuous paragraphs of
  first-person narrative, which is exactly the content shape this layout wants
  and which a Milestone Card Grid would have had to invent structure for. This is
  the page's darkest field (#0A0E13) — the deliberate low point in the tonal
  rhythm before the cream Coverage band.

### 8. Service Area / Coverage
- **Layout:** Location Photo with Directions Panel *(assigned)*
- **Visual style:** Custom Styled Map *(assigned)*, style family minimal-clean /
  bold-geometric, on the second **cream inset band**
- **Animation:** **Sequential Line Draw** on the map's route segments (custom) +
  **Coverage Zone Highlight on Hover** (custom) + Depth Settle on the photo
- **Element sequence:** eyebrow → H2 → framing paragraph → photo insert (Depth
  Settle) → the map panel, whose four route segments draw their strokes in
  sequence 140ms apart once the panel is 18% into view, then the eight town nodes
  pop in as one group → the town list beside it staggers 70ms apart. Hovering or
  focusing a town in the list lights its node and its connector; hovering a node
  highlights the list row. Reduced motion: routes render drawn, nodes render in
  place, hover highlight becomes a colour change with no transition.
- **Rationale.** Layout: assigned. Its Avoid-when ("no photogenic storefront")
  was a real risk — this business has no storefront — so the photo carries the
  *territory* rather than a building: `tuscany-hero` is a Cochrane-plausible
  street with the Rockies behind it, which is what the section is actually about.
  Visual style: an unstyled map embed was never an option (no API, and it would
  have broken the palette); the hand-drawn schematic reads as an electrical plan,
  which is the one place on the page where the trade's own drafting vernacular
  can be used literally.

### 9. FAQ
- **Layout:** Two-Column Category Split *(assigned)*
- **Visual style:** Minimal Line-Divided Accordion *(assigned)*, style family
  minimal-clean
- **Animation:** Accordion Expand and Collapse with Height Transition +
  Icon Morph (plus → minus) + Staggered Fade-In on Scroll
- **Element sequence:** eyebrow + H2 (one unit) → the two category headings and
  their question rows stagger top-to-bottom within each column, 80ms apart, left
  column leading the right by 120ms → answers are click-driven only. Icon rotates
  45° into a minus on open, tied 1:1 to the same click. Reduced motion: height
  changes instantly, icon swaps with no rotation.
- **Deliberate no-photo decision:** six questions across two categories is dense
  utility content; the richness file's own guidance is that texture is the
  fallback for text-appropriate sections. The section instead earns its keep
  through the two-column split and an amber hairline that only appears on the
  open row.
- **Rationale.** Layout: assigned, and the six questions do split cleanly into
  "Licensing & Code" (3) and "Scope & Coverage" (3), which is the condition the
  entry's Avoid-when requires. Classic Accordion List would have been a single
  undifferentiated stack of six.

### 10. Final CTA
- **Layout:** Full-Width CTA Banner *(assigned)*
- **Visual style:** Dark Cinematic CTA Background *(assigned)*, style family
  dark-moody, plus **Full-Bleed Background Photo with Foreground Card** (second
  deliberate use) over `flatlay-materials`
- **Animation:** **Banner Background Slow Pan** (custom) + Button Magnetic Hover
- **Element sequence:** the flat-lay bed pans slowly and continuously (34s,
  ±1.6%, desktop only); over it, headline → supporting line → the call/text
  button pair enter as one grouped band. Reduced motion: pan off, band appears
  with opacity only.
- **Rationale.** Layout: assigned. The banner wants brevity and the brief's copy
  for this section is exactly a headline, one supporting line, and two links —
  a Split CTA with Form would have needed a form the brief does not ask for.

### 11. Footer
- **Layout:** Mega Footer (4 columns) — **deviation from the assigned Split
  Footer with Final CTA Panel**
- **Visual style:** Gradient Fade-to-Dark Footer *(assigned)*, style family
  dark-moody
- **Animation:** Link Column Staggered Fade-In on Scroll + Underline Sweep on
  every link + Social Icon Hover Bounce (damped to a lift, to match the page's
  register)
- **Element sequence:** the four columns stagger left to right, 90ms apart, each
  column entering as one unit (heading + its links together, never link-by-link).
  Reduced motion: columns fade with no offset.
- **Deviation justification (one line, per DIRECTION.md's rule):** Split Footer
  with Final CTA Panel lost against Mega Footer because its own Avoid-when field
  rules it out here — the CTA has already been repeated four times up the page
  and lands as a full-width banner immediately above the footer, so a second CTA
  panel would read as pushy rather than confident; the assigned *visual* style
  (Gradient Fade-to-Dark) is kept and is what fuses the CTA banner into the
  footer so the two still read as one composed closing unit, which is the effect
  the assigned layout was there to produce.

### Signature element — the photo-diagnosis widget
- **Layout:** Multi-Step Form (2 steps) inside the hero's foreground card
- **Visual style:** **Glass Panel Widget with Depth** *(assigned)*, style family
  glass-depth, over the navy field
- **Animation:** Widget Entrance Scale-In on Scroll (as Depth Settle on load) +
  **Multi-Step Progress Bar Transition** (custom) + Step-by-Step Reveal +
  Field Focus Highlight + Inline Validation Feedback + Success State
  Confirmation Animation + Cursor-Reactive Glow (1 of a maximum 2 uses page-wide)
- **Element sequence:** the panel enters as one object. Internally: step swap is
  a 1:1 replacement (old group out, new group in — never two steps staggering
  together); the progress rail's amber fill animates its own width independently
  of the field group; on submit the whole form group is replaced by the success
  state, which enters with a single check-draw and a rise. Reduced motion: steps
  swap instantly, rail jumps, check renders drawn, glow off.
- **Why two steps.** Its Avoid-when says multi-step is wrong for three or four
  fields — but the real constraint here is the fold on a 390×844 screen, where a
  single-column five-control form cannot coexist with an H1, a subheadline, four
  badges and two CTAs. Splitting at the natural seam (what you are looking at /
  who we call back) keeps the widget compact enough to clear the fold on both
  breakpoints *and* gives it the progress rail, which is the detail that makes it
  read as an instrument rather than a contact form.

---

## Custom motion techniques written for this site

Four techniques not in `src/lib/motion.js`, each pulled from a real entry rather
than invented, all in `src/lib/motion-extra.js` / `motion-extra.css`:

1. **`useStrokeDraw`** — implements *Sequential Line Draw*
   (animation-and-motion-richness.md) by measuring each SVG path's real
   `getTotalLength()` and sequencing `stroke-dashoffset` per segment. Used on the
   coverage map's four route segments, 620ms each, 140ms apart. The kit's
   `data-reveal='stroke'` needs a hard-coded `--draw-len`; this measures it.
2. **`useIconDraw`** — implements *Icon Draw-In* (animations/value-proposition.md)
   against Lucide's rendered SVG children, so the line-art icons in Why Us draw
   themselves as the leading beat of each item's reveal.
3. **`StarSweep`** — implements *Star Rating Fill Animation on Scroll*
   (animations/social-proof.md) as a one-pass sequential fill sweep, not a long
   stagger, over an outline star row.
4. **`useSlowPan`** — implements *Banner Background Slow Pan*
   (animations/calls-to-action.md) as a continuous, low-amplitude horizontal pan
   on the Final CTA's photographic bed, disabled below 900px and under reduced
   motion.

Plus the widget's progress-rail transition (*Multi-Step Progress Bar
Transition*, animations/forms.md), written inline in the component because it is
specific to that one element.

---

## Pass 1 — Elevation sweep

Run once every section existed, section by section, reopening each entry's
visual-styles / animations / image-and-visual-richness triple.

| Section | Outcome |
|---|---|
| Navigation | **Changed.** The solid state arrived as a hard border switching on; it now arrives as an amber hairline that draws across the bar's bottom edge (a scroll-linked variant of Sequential Line Draw). |
| Hero | **Changed.** The eyebrow gained a drawn amber tick, which turned the eyebrow/widget top-edge alignment from an implied relationship into a visible marker. Measured: both tops land on 255px at 1440×900, 0px apart. |
| Google Reviews | **Restructured.** The first pass put the aggregate callout in a sticky left rail beside a one-column list; the rail could not stick — its own grid track was only as tall as the card — and left a 660px void of bare cream. Rebuilt as a head row with the aggregate callout on the right, then a two-column divider grid. The aggregate gained the counting numeral, the star sweep and a Google-marked attribution block, and each review row gained a relative date and a Google mark, which is what makes it read as a Google block rather than generic testimonials. A sixth cell states the placeholder status outright and keeps the grid square. |
| Trust Badges | **Changed.** The panel was flat colour — the exact default outcome the richness file flags for skipping the image check. Added `tex-steel` at 5% as the panel's surface (Textured or Patterned Background, No Photo). |
| Why Us | **Restructured.** The first pass ran statement + photo down one column against the four points in the other; the points column finished 150px short and the section read lopsided. Moved the statement and lead into a full-width top row over a hairline, then set a 4:5 framed photo against the four points so both columns land together. Bordered Frame Draw added on the photo's amber bracket, 150ms after the image settles, per the entry's own timing. |
| Services | **Changed.** Secondary cards had an entrance and a lift but were otherwise inert; added Card Hover Reveal (the covered-work line and its arrow rise into view) and Image Zoom on Hover. |
| Our Story | **Left as-is.** Already at appropriate ambition, and deliberately the page's quietest moment — the scrub plus the pull-quote is the right load for three paragraphs. The scrub's opacity floor was raised from 0.45 to 0.62 after the first screenshot round: at 0.45 the body copy read as a rendering fault rather than as motion. |
| Coverage | **Changed.** The map nodes were static; added the bidirectional hover/focus link between the town list and the map nodes (Coverage Zone Highlight on Hover), which is what turns a drawing into an interface. |
| FAQ | **Changed.** The section was two short columns above a large empty slab. Added the repeated ask as a full-width closing band under both columns — one ask, several spots — which also resolved the dead space. The open-row hairline moved from the row's top edge to its bottom edge, where it no longer doubles up with the category rule. |
| Final CTA | **Changed.** Added the slow pan on the photographic bed; the banner was a static photo behind a card, which the entry's Avoid-when only excuses for flat-colour banners. |
| Footer | **Changed.** Columns entered well and then sat completely inert. Added Underline Sweep on every footer link and a damped lift on the social marks. |
| Widget | **Changed.** Added the Cursor-Reactive Glow (its only use on the page) and the drawn check on the success state. The step-1 advance control changed from a solid amber fill to an amber-outlined button, so the page carries exactly one solid amber fill per view. |

## Pass 2 — Coherence sweep

A fresh look at the whole page after Pass 1's changes landed.

1. **Walked back a Pass 1 change.** The Cursor-Reactive Glow had been added to the
   widget *and* the Final CTA card. Its own Avoid-when caps it at one or two
   elements per page, and with both the page opened and closed on the same
   trick. Removed from the Final CTA card; the widget keeps it, and the CTA card
   keeps the slow pan behind it instead.
2. **Motion load.** The hero was carrying parallax + ambient drift + word reveal
   + a five-group load stagger + the widget settle, spread over 2.1s. The badge
   stagger step came down from 110ms to 70ms and the sequence was pulled in to
   finish at ~1.6s — at the original spacing it read as a wait rather than a
   moment.
3. **Tonal rhythm.** Trust Badges, Why Us and Services were three consecutive
   sections on the same navy. They now sit on three distinct steps of the navy
   ladder (`--field-deep` → `--field` → `--field-raised`), with the Services band
   carrying a faint vertical conduit-rule texture, so the run of dark sections
   reads as depth rather than one long slab.
4. **Type.** A systematic measure bug was found and fixed: several section-head
   wrappers capped their width in `ch`, which resolves against the 16px wrapper
   rather than the 44px heading inside it — so every H2 was wrapping at roughly
   300px and running to four or five near-single-word lines. All head measures
   are now in `rem`. The hero H1's cap came down from 3.5rem to 3.125rem and its
   grid column widened, which put the headline on two balanced lines on desktop
   and three on mobile, with no orphan line.
5. **Left alone deliberately.** The FAQ and the Story remain the two quietest
   sections on the page. That is the rhythm, not an omission.

---

## Screenshot rounds

Three full rounds, plus targeted section and interaction captures.

**Round 1** — the H1 wrapped to four lines ending in a one-word "AB"; every
section H2 was wrapping at ~300px (the `ch` bug above); the hero scrim was so
heavy the photograph read as nothing at all; Why Us and the FAQ both carried
large accidental voids; the reviews rail could not stick. All fixed.

**Round 2** — measured horizontal overflow of exactly 2% of the viewport at every
width from 768px up, traced to the Story section's full-bleed divider band:
Depth Settle starts at `scale(1.04)`, and on a 100%-wide band that is 2% hanging
off each edge until the entrance completes. Fixed with `overflow: clip` on the
section. A second, unrelated overflow at 390px came from the FAQ closing band's
button pair being `flex: none`, whose intrinsic width pushed the document to
443px and dragged the fixed header out with it. Both fixed; measured
`scrollWidth - innerWidth = 0` at 390 / 768 / 1024 / 1280 / 1440 / 1920, on load
and again after a full scroll pass.

**Round 3** — the Services dropdown rendered only its first column in captures.
The DOM was correct (13 items, two columns, every one at opacity 1); the panel's
`backdrop-filter` over an already 97%-opaque fill was rastering unevenly. The
blur bought nothing, so it was removed.

**Interaction captures** — widget step 2, the submitted success state, the open
Services dropdown, and a 26-stop keyboard tab walk confirming the amber focus
ring on every focusable element, both dropdowns included. That walk caught one
accessibility regression: `.pdx-input:focus-visible { outline: none }` was
suppressing the ring on the widget's own fields. Removed.

**Fold verification (measured, not eyeballed):**

| | desktop 1440×900 | mobile 390×844 |
|---|---|---|
| eyebrow top / widget top | 255 / 255 — 0px apart | stacked layout |
| H1 | 291–397 | 120–215 |
| subheadline | 417–537 | 227–305 |
| 4 value badges | end 635 | end 371 |
| primary click-to-call | 659–713 | 383–427 |
| secondary CTA to Services | 659–713 | 383–427 |
| photo-diagnosis widget | 255–706 | 443–824 |
| sticky call bar at scroll 0 | absent | absent |

All six elements inside the fold at opacity 1 on both breakpoints, with 194px of
headroom on desktop and 20px on mobile.

---

## Kit bug found and fixed here

**`useInView` could permanently strand a section at opacity 0.** An
IntersectionObserver notification can go undelivered when the page is scrolled
faster than the observer samples — a programmatic `scrollTo` walk, an anchor
jump, a flung touch scroll. Reproduced on the built page: across four identical
full-page scroll passes, three left a different set of elements at
`data-in="false"` and `opacity: 0` for the rest of the session (the Services
card grid in one run, the Story head in another). Fixed in `src/lib/motion.js`
by adding a rAF-throttled scroll/resize backstop alongside the observer. The
observer stays primary, and the backstop re-checks the *same* trigger point —
top edge 12% into the viewport, matching the existing `rootMargin` — plus
anything already scrolled fully past. The repo's Scroll Trigger Timing rule
still holds and nothing fires at first pixel. Four consecutive verification
passes after the fix: zero stranded elements.

Worth pushing to the other sites in the batch.

---

## Fonts

No substitution needed. The brief names Lexend Deca (display) and Public Sans
(body); both are genuine Google Fonts families, loaded at 300/400/500/600 and
400/500/600 respectively with `display=swap`, a preconnect to
`fonts.gstatic.com`, and a real system fallback stack behind each.
