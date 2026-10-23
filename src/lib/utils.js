/** Tiny class-name joiner — avoids pulling in clsx for a two-line helper. */
export function cn(...parts) {
  return parts.filter(Boolean).join(' ')
}

/**
 * The house motion vocabulary.
 * `swift` for UI feedback (≤260ms), `luxe` for entrances, `inout` for
 * on-screen movement. Never `ease-in` — it delays the first pixel.
 */
export const EASE = {
  swift: [0.23, 1, 0.32, 1],
  luxe: [0.16, 1, 0.3, 1],
  inout: [0.77, 0, 0.175, 1],
  drawer: [0.32, 0.72, 0, 1]
}

/** Shared transition presets. */
export const T = {
  /** Press / hover / small state flips. */
  swift: { duration: 0.22, ease: EASE.swift },
  /** Panels, dropdowns, modals. */
  panel: { duration: 0.26, ease: EASE.swift },
  /** Marketing entrances & reveals. */
  reveal: { duration: 0.78, ease: EASE.luxe },
  /** Bigger, slower cinematic moves. */
  cinematic: { duration: 1.15, ease: EASE.luxe }
}

/** Stagger helpers — short delays keep the cascade feeling responsive. */
export const stagger = (each = 0.07, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: each, delayChildren: delay } }
})

export const staggerItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.62, ease: EASE.luxe } }
}

/**
 * Tracks the pointer inside an element and exposes the normalized offsets
 * as CSS custom properties. Used for the cursor-following spotlight and the
 * 3D card tilt. Written as a direct style write (no React state) so it
 * never triggers a re-render on pointer move.
 */
export function trackPointer(event) {
  const el = event.currentTarget
  const rect = el.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  el.style.setProperty('--mouse-x', `${x}px`)
  el.style.setProperty('--mouse-y', `${y}px`)
  el.style.setProperty('--mouse-nx', `${(x / rect.width) * 2 - 1}`)
  el.style.setProperty('--mouse-ny', `${(y / rect.height) * 2 - 1}`)
}

/** Format a number with Indian grouping (₹12,000 / ₹1,50,000). */
export function formatINR(value) {
  return `₹${Number(value).toLocaleString('en-IN')}`
}
