import React, { lazy, Suspense } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, MapPin, Phone, Clock, Star } from 'lucide-react'
import { BRAND } from '../data/salon'
import { EASE } from '../lib/utils'

const HeroScene = lazy(() => import('./three/HeroScene'))

/**
 * HERO — "WHERE STYLE MEETS CRAFT"
 * Layers, back to front:
 *   1. photographic plate (hero-bg) with a deep obsidian grade
 *   2. WebGL champagne sculpture (R3F) — genuine spatial depth
 *   3. architectural grid + grain
 *   4. type, scaled against scroll
 */
export default function Hero({ revealed, onBook }) {
  const { scrollY } = useScroll()
  const plateY = useTransform(scrollY, [0, 900], [0, 140])
  const plateScale = useTransform(scrollY, [0, 900], [1.04, 1.16])
  const typeY = useTransform(scrollY, [0, 700], [0, 90])
  const typeOpacity = useTransform(scrollY, [0, 520], [1, 0])
  const sceneY = useTransform(scrollY, [0, 900], [0, 60])

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden pt-28"
    >
      {/* ── 1. Photographic plate ── */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: plateY, scale: plateScale }}
      >
        <img
          src="/images/hero-bg.jpg"
          alt="A master stylist sculpting a cut with shears and comb at The Glatt Salon"
          className="size-full object-cover object-[58%_44%] opacity-95 [filter:saturate(0.5)_hue-rotate(-18deg)_contrast(1.1)_brightness(0.72)]"
          fetchPriority="high"
        />
        {/* Directional scrim. On landscape the copy sits in a left column,
            so the scrim runs left-to-right and opens across the centre to
            let the craft photography read. On portrait the copy spans the
            full width, so the scrim turns vertical — dense under the type,
            lifting toward the top where the photograph carries the frame. */}
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian-950/70 via-obsidian-950/88 to-obsidian-950 lg:bg-gradient-to-r lg:from-obsidian-950 lg:via-obsidian-950/82 lg:to-obsidian-950/30" />
        {/* Champagne wash ties the photo's warm highlights into the palette */}
        <div className="absolute inset-0 bg-[radial-gradient(70%_58%_at_64%_40%,rgba(212,175,55,0.16)_0%,transparent_66%)]" />
        {/* Floor falloff into the next band */}
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-obsidian-950 to-transparent" />
        {/* Header falloff beneath the nav */}
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-obsidian-950/85 to-transparent" />
      </motion.div>

      {/* ── 2. WebGL champagne sculpture ── */}
      <motion.div className="absolute inset-0 z-[1]" style={{ y: sceneY }}>
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </motion.div>

      {/* ── 3. Grain ── */}
      <div className="pointer-events-none absolute inset-0 z-[2] u-grain" />

      {/* Letterbox frame */}
      <div className="letterbox-top" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[4] h-[clamp(0px,3.2vh,26px)] bg-gradient-to-t from-obsidian-950 to-transparent"
        aria-hidden="true"
      />

      {/* ── 4. Content ── */}
      <motion.div
        className="u-container relative z-10 pb-10 md:pb-14"
        style={{ y: typeY, opacity: typeOpacity }}
      >
        <div className="grid items-end gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-20">
          {/* ── Left: the type ── */}
          <div className="max-w-[38rem]">
            {/* Credential line */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={revealed ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE.luxe, delay: 0.15 }}
              className="flex flex-wrap items-center gap-x-4 gap-y-2"
            >
              <span className="flex items-center gap-2.5 text-[0.625rem] font-semibold uppercase tracking-[0.32em] text-champagne-300">
                <span className="h-px w-8 bg-champagne-500/60" />
                Est. 1996
              </span>
              <span className="text-[0.625rem] font-semibold uppercase tracking-[0.32em] text-pearl-mute">
                Kowdiar · Thiruvananthapuram
              </span>
            </motion.div>

            {/* Monumental headline */}
            <h1 className="mt-7 font-display leading-[0.86] tracking-[-0.035em] text-pearl">
              <motion.span
                className="block text-hero"
                initial={{ opacity: 0, y: 42 }}
                animate={revealed ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, ease: EASE.luxe, delay: 0.26 }}
              >
                Where Style
              </motion.span>
              <motion.span
                className="block text-hero italic font-normal text-champagne-200"
                initial={{ opacity: 0, y: 42 }}
                animate={revealed ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, ease: EASE.luxe, delay: 0.38 }}
              >
                Meets Craft
              </motion.span>
            </h1>

            {/* Deck */}
            <motion.p
              className="mt-8 max-w-[46ch] text-[0.9375rem] leading-[1.78] text-pearl-dim/90 text-pretty md:text-base"
              initial={{ opacity: 0, y: 20 }}
              animate={revealed ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: EASE.luxe, delay: 0.52 }}
            >
              Thiruvananthapuram&rsquo;s premier unisex salon since 1996.
              Bespoke haircutting, radiant bridal makeup, advanced skin
              aesthetics, and restorative spa rituals crafted with precision.
            </motion.p>

            {/* Actions — stacked again through the lg band, where the
                two-column grid narrows this column below the width two
                pill buttons need side by side. */}
            <motion.div
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center lg:flex-col lg:items-stretch xl:flex-row xl:items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={revealed ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: EASE.luxe, delay: 0.64 }}
            >
              <button onClick={onBook} className="u-btn-gold">
                Reserve your slot
                <ArrowRight size={15} strokeWidth={2} />
              </button>
              <a href="#services" className="u-btn-ghost">
                Explore the menu
              </a>
            </motion.div>
          </div>

          {/* ── Right: the trust ledger ── */}
          <motion.dl
            className="divide-y divide-white/[0.08] border-y border-white/[0.08] lg:mb-2"
            initial={{ opacity: 0, y: 24 }}
            animate={revealed ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE.luxe, delay: 0.72 }}
          >
            <div className="flex items-center justify-between gap-4 py-4">
              <dt className="text-[0.625rem] font-semibold uppercase tracking-[0.24em] text-pearl-mute">
                Google
              </dt>
              <dd className="flex items-center gap-2.5">
                <span className="flex items-center gap-0.5 text-champagne-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={11} fill="currentColor" strokeWidth={0} />
                  ))}
                </span>
                <a
                  href={BRAND.googleReviews}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[0.8125rem] text-pearl transition-colors duration-250 hover:text-champagne-300"
                >
                  {BRAND.rating}
                  <span className="text-pearl-mute">
                    {' '}
                    · {BRAND.reviewCount} reviews
                  </span>
                </a>
              </dd>
            </div>

            <div className="flex items-center justify-between gap-4 py-4">
              <dt className="text-[0.625rem] font-semibold uppercase tracking-[0.24em] text-pearl-mute">
                Studio
              </dt>
              <dd className="flex items-center gap-2.5 text-[0.8125rem] text-pearl">
                <MapPin size={12} className="text-champagne-500" />
                Kanaka Nagar, Kowdiar
              </dd>
            </div>

            <div className="flex items-center justify-between gap-4 py-4">
              <dt className="text-[0.625rem] font-semibold uppercase tracking-[0.24em] text-pearl-mute">
                Concierge
              </dt>
              <dd>
                <a
                  href={BRAND.phoneHref}
                  className="flex items-center gap-2.5 text-[0.8125rem] text-pearl transition-colors duration-250 hover:text-champagne-300"
                >
                  <Phone size={12} className="text-champagne-500" />
                  098959 70069
                </a>
              </dd>
            </div>

            <div className="flex items-center justify-between gap-4 py-4">
              <dt className="text-[0.625rem] font-semibold uppercase tracking-[0.24em] text-pearl-mute">
                Hours
              </dt>
              <dd className="flex items-center gap-2.5 text-[0.8125rem] text-pearl">
                <Clock size={12} className="text-champagne-500" />
                Open daily 9:00 AM – 8:30 PM
              </dd>
            </div>
          </motion.dl>
        </div>
      </motion.div>
    </section>
  )
}
