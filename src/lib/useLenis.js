import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'

/**
 * Lenis inertial scroll, wired to Framer Motion's frame loop so scroll-linked
 * motion and the smooth-scroll physics share one clock (no competing rAF).
 *
 * Lenis writes to window.scrollTop natively, so Framer's `useScroll` with the
 * default document container stays in sync.
 */
export function useLenis({ paused = false } = {}) {
  const lenisRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      infinite: false,
      autoRaf: false
    })

    lenisRef.current = lenis
    window.__lenis = lenis

    let rafId
    const raf = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
      lenis.destroy()
      window.__lenis = null
    }
  }, [])

  useEffect(() => {
    const lenis = lenisRef.current
    if (!lenis) return
    if (paused) lenis.stop()
    else lenis.start()
  }, [paused])

  return { lenisRef, scrolled }
}

/** Smooth-scroll to a section id, honouring Lenis when it is running. */
export function scrollToId(id, offset = -24) {
  const el = document.getElementById(id)
  if (!el) return
  const lenis = window.__lenis
  if (lenis) lenis.scrollTo(el, { offset, duration: 1.25 })
  else el.scrollIntoView({ behavior: 'smooth' })
}
