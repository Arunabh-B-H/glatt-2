import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { EASE } from '../lib/utils'
import BrandMark from './ui/BrandMark'

/* ==========================================================================
   CINEMATIC PRELOADER
   A curtain of obsidian that lifts to reveal the studio. The counter is
   driven by real asset readiness (images decoded) with a time floor, so the
   number means something and the reveal never fires on an empty frame.
   ========================================================================== */

const CRITICAL_ASSETS = ['/the_glatt_logo.png', '/images/hero-bg.jpg']

/** Decode each critical image; resolves true when all are painted. */
function useAssetProgress() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false

    const load = (src) =>
      new Promise((resolve) => {
        const img = new Image()
        img.onload = () => resolve(src)
        img.onerror = () => resolve(src)
        img.src = src
      })

    Promise.all(CRITICAL_ASSETS.map(load)).then(() => {
      if (!cancelled) setReady(true)
    })

    return () => {
      cancelled = true
    }
  }, [])

  return ready
}

export default function Preloader({ onComplete, onDone }) {
  const assetsReady = useAssetProgress()
  const [display, setDisplay] = useState(0)
  const [exiting, setExiting] = useState(false)
  const [gone, setGone] = useState(false)

  const rawProgress = useMotionValue(0)
  const smooth = useSpring(rawProgress, { stiffness: 120, damping: 26, mass: 0.5 })
  const counterRef = useRef(null)

  useEffect(() => {
    const start = performance.now()
    const FLOOR = 1250 // minimum cinematic beat — never a flash
    let raf

    const tick = (now) => {
      const elapsed = now - start
      const timeRatio = Math.min(1, elapsed / FLOOR)
      // Ease-out time curve, but gated: we stop short of 100 until assets land.
      const eased = 1 - Math.pow(1 - timeRatio, 2.4)
      const ceiling = assetsReady ? 100 : 88
      const value = Math.min(ceiling, eased * ceiling)

      rawProgress.set(value)
      setDisplay(Math.round(value))

      if (value >= 100) {
        finish()
        return
      }
      raf = requestAnimationFrame(tick)
    }

    const finish = () => {
      setDisplay(100)
      rawProgress.set(100)
      // Hold the completed state for a beat, then lift the curtain.
      window.setTimeout(() => {
        setExiting(true)
        onComplete?.()
        window.setTimeout(() => {
          setGone(true)
          // Release the scroll lock once the curtain has fully lifted.
          onDone?.()
        }, 1100)
      }, 180)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [assetsReady, rawProgress, onComplete])

  // The counter is a separate rAF so the number ticks smoothly rather than
  // snapping to React state on every frame.
  useEffect(() => {
    let raf
    const loop = () => {
      if (counterRef.current) {
        counterRef.current.textContent = String(Math.round(smooth.get())).padStart(3, '0')
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [smooth])

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-obsidian-950"
          initial={{ opacity: 1 }}
          animate={{ opacity: exiting ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE.luxe }}
          aria-hidden="true"
        >
          {/* Ambient champagne bloom that intensifies as we approach 100 */}
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 size-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(212,175,55,0.20) 0%, rgba(212,175,55,0.06) 38%, transparent 68%)',
              filter: 'blur(40px)'
            }}
            animate={{ scale: 0.72, opacity: 0.5 }}
            transition={{ duration: FLOOR_SECONDS, ease: EASE.luxe }}
          />

          {/* Curtain panels that split open on exit */}
          <motion.div
            className="absolute inset-0 grid grid-cols-2"
            initial={{ x: 0 }}
            animate={{ x: exiting ? '0%' : '0%' }}
          >
            <motion.div
              className="h-full w-1/2 bg-obsidian-950"
              animate={{ x: exiting ? '-100%' : '0%' }}
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            />
            <motion.div
              className="h-full w-1/2 bg-obsidian-950"
              animate={{ x: exiting ? '100%' : '0%' }}
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            />
          </motion.div>

          {/* Content — lifts away slightly as the curtain opens */}
          <motion.div
            className="relative z-10 flex w-full max-w-md flex-col items-center px-8"
            animate={{
              opacity: exiting ? 0 : 1,
              y: exiting ? -28 : 0,
              filter: exiting ? 'blur(8px)' : 'blur(0px)'
            }}
            transition={{ duration: 0.62, ease: EASE.luxe }}
          >
            {/* The mark */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: EASE.luxe }}
            >
              <div
                className="absolute inset-0 -m-10 rounded-full"
                style={{
                  background:
                    'radial-gradient(circle, rgba(212,175,55,0.24) 0%, transparent 68%)',
                  filter: 'blur(22px)'
                }}
              />
              <BrandMark
                variant="full"
                className="relative h-20 w-auto md:h-24"
                style={{ filter: 'drop-shadow(0 8px 30px rgba(212,175,55,0.35))' }}
              />
            </motion.div>

            {/* Progress readout */}
            <div className="mt-12 w-full">
              <div className="flex items-end justify-between">
                <span
                  ref={counterRef}
                  className="font-display text-[3.5rem] leading-none font-light tabular-nums text-pearl md:text-[4.5rem]"
                >
                  000
                </span>
                <span className="pb-2 text-[0.625rem] font-semibold uppercase tracking-[0.4em] text-pearl-mute">
                  Percent
                </span>
              </div>

              {/* Hairline progress rail */}
              <div className="relative mt-5 h-px w-full overflow-hidden bg-white/10">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-champagne-600 via-champagne-300 to-champagne-100"
                  style={{
                    width: '100%',
                    transformOrigin: 'left center',
                    scaleX: smooth
                  }}
                />
              </div>

              <div className="mt-5 flex items-center justify-between text-[0.5625rem] font-semibold uppercase tracking-[0.34em] text-pearl-faint">
                <span>Kowdiar · Thiruvananthapuram</span>
                <span>Est. 1996</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const FLOOR_SECONDS = 1.25
