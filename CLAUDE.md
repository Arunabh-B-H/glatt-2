# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start Vite dev server at `http://localhost:3000` |
| `npm run build` | Build production bundle to `dist/` |
| `npm run preview` | Preview the production build locally |

## Tech Stack (locked)

React 19 · Vite 8 (Rolldown) · Tailwind CSS v4 · Framer Motion 14 · React Three Fiber / Drei · Lenis

Do not swap the framework or the styling system. The build targets Tailwind v4's
CSS-first config — there is no `tailwind.config.js`.

## Project Structure

```
src/
  main.jsx              Entry point rendering <App /> into #root
  App.jsx                Section composition, booking state, dialog + concierge wiring
  index.css              Tailwind v4 @theme tokens + component layer + keyframes
  data/
    salon.js             All business content: BRAND, SERVICES, CATEGORIES, STATS,
                         HERITAGE, GALLERY_ITEMS, TESTIMONIALS, TEAM, TIME_SLOTS,
                         MARQUEE_ITEMS, MATCHER_*, BOT_*
  lib/
    useLenis.js          Lenis instance, window.__lenis handle, scrollToId()
    utils.js             EASE curves, T presets, stagger helpers, trackPointer, formatINR
  components/
    Nav.jsx              Fixed header, scroll state, mobile drawer
    Hero.jsx             Hero: photo plate + WebGL layer + scrim + type
    Marquee.jsx          Scrolling brand marquee
    Services.jsx         Editorial menu: sticky filter column + expandable ledger
    Matcher.jsx          Style matcher (preferences → recommended treatment)
    Heritage.jsx         Founding story + stat ledger
    Gallery.jsx          Filterable image/video grid
    Testimonials.jsx     Review carousel
    Team.jsx             Stylist profiles, opens booking with a stylist
    Visit.jsx            Address, hours, map, booking form
    Footer.jsx           Footer navigation, contact, social
    Concierge.jsx        Chat panel (rule-based bot)
    SocialRail.jsx       Fixed left-edge channel dock (xl and up)
    Preloader.jsx        Cinematic preloader
    AppointmentDialog.jsx Modal booking desk
    three/HeroScene.jsx  The single R3F WebGL canvas
    ui/BrandMark.jsx     Champagne-masked house emblem
    ui/BrandIcons.jsx    WhatsApp / Instagram / Facebook glyphs
public/                 Images, videos, favicons, brand PNGs
```

## Architecture

### Data layer
`src/data/salon.js` is the single source of truth for every piece of business
content. Components import from it and never hard-code prices, timings, contact
details, or service names. Editing the salon means editing that file.

### Design system (`src/index.css`)
Tailwind v4 CSS-first. Tokens live in `@theme`: obsidian/charcoal grounds,
champagne gold accents, pearl inks, a fluid type scale, custom easings, and
elevation shadows. `@layer components` holds the shared primitives (`.u-container`,
`.u-glass`, `.u-btn-gold`, `.u-pill`, `.u-field`, `.u-mark-gold`, `.u-scene-veil`).
`@utility` blocks define custom utilities Tailwind cannot express.

### Motion vocabulary
`EASE` in `src/lib/utils.js` is the house easing set: `swift` for UI feedback,
`luxe` for entrances, `inout` for on-screen movement, `drawer` for panels. Never
`ease-in` on UI — it delays the first pixel. Entrances animate from an
already-visible default (`opacity` + small `y`/`x`), never from `scale(0)`.
`prefers-reduced-motion` is honoured globally in `index.css`.

### 3D
Exactly one WebGL canvas exists — `components/three/HeroScene.jsx` in the hero.
Everywhere else, depth is CSS 3D and layered light. The canvas is genuinely
transparent (`alpha: true`, clear alpha 0) so the studio photograph reads through
it; the scrim below it cannot dim the 3D layer, so the canvas wrapper carries
`.u-scene-veil`, a mask that dissolves the top of the strand into the obsidian.
`LockRig` frames the lock by aspect ratio — wide, tablet portrait, and phone
portrait each get their own scale and position.

### Scroll
Lenis is created once in `useLenis` with `autoRaf: false` and driven by a manual
rAF loop. The instance is exposed as `window.__lenis`. Anchor links are
intercepted in `App.jsx` and routed through `scrollToId` so the drawer closes and
Lenis keeps ownership of the scroll.

### Responsive rules
`.u-container` caps at 1480px with fluid gutters. From 1280px it yields a left
lane so the fixed `SocialRail` never crowds the content. `html` and `body` clip
horizontal overflow — scroll-triggered entrances offset elements sideways before
they settle, and that transient offset must never make the page scroll
horizontally. `overflow-x: clip` rather than `hidden`: `hidden` would make the
root a scroll container and break the window-level scroll Lenis drives.

## Conventions

- Content components live in `src/components/`; pure helpers in `src/lib/`;
  business content in `src/data/`. Keep that split.
- The palette is obsidian + champagne gold only. No second accent hue.
- Icons come from `lucide-react`; brand glyphs are the authored SVGs in
  `ui/BrandIcons.jsx`. No emoji as icons.
- `motion` components are used for entrances and state changes; CSS transitions
  handle hover/press feedback.
- Run `npx vite build` before declaring a change done.
