import React, { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Play, Expand } from 'lucide-react'
import { GALLERY_ITEMS, GALLERY_CATEGORIES } from '../data/salon'
import { EASE } from '../lib/utils'

/* ==========================================================================
   GALLERY — a masonry of the studio's work.
   Parallax is applied per-tile via scroll-linked Y so the grid feels like
   a deep wall rather than a flat contact sheet. The lightbox is a focus-
   trapped dialog with keyboard navigation.
   ========================================================================== */

export default function Gallery() {
  const [category, setCategory] = useState('All')
  const [index, setIndex] = useState(null)
  const gridRef = useRef(null)

  const items = GALLERY_ITEMS.filter((item) => {
    if (category === 'All') return true
    if (category === 'Videos & Reels') return item.type === 'video'
    if (category === 'Bridal Artistry')
      return (
        item.category.toLowerCase().includes('bridal') ||
        item.category.toLowerCase().includes('festive')
      )
    if (category === "Men's Grooming")
      return (
        item.category.toLowerCase().includes('men') ||
        item.category.toLowerCase().includes('groom')
      )
    if (category === 'Ambiance & Craft')
      return (
        item.category.toLowerCase().includes('ambiance') ||
        item.category.toLowerCase().includes('craft') ||
        item.category.toLowerCase().includes('color') ||
        item.category.toLowerCase().includes('spa')
      )
    return true
  })

  const close = useCallback(() => setIndex(null), [])
  const step = useCallback(
    (dir) => setIndex((i) => (i + dir + items.length) % items.length),
    [items.length]
  )

  useEffect(() => {
    if (index === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [index, close, step])

  // Reset the lightbox when the filter changes under it.
  useEffect(() => {
    setIndex(null)
  }, [category])

  const active = index !== null ? items[index] : null

  return (
    <section id="gallery" className="relative py-24 md:py-32">
      <div className="u-container">
        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: EASE.luxe }}
          >
            <h2 className="u-title text-balance">
              The work,
              <br />
              <em className="italic text-champagne-300">unretouched</em>
            </h2>
            <p className="mt-5 text-[0.9375rem] leading-[1.8] text-pearl-dim/90 text-pretty">
              Step inside our sanctuary on Keston Road — an interplay of moody
              elegance, skilled hands, and transformative aesthetics.
            </p>
          </motion.div>

          {/* Filter */}
          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.14, ease: EASE.luxe }}
            role="tablist"
            aria-label="Filter gallery"
          >
            {GALLERY_CATEGORIES.map((c) => {
              const activeCat = c === category
              return (
                <button
                  key={c}
                  role="tab"
                  aria-selected={activeCat}
                  onClick={() => setCategory(c)}
                  className={`relative rounded-full border px-4 py-2 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] transition-colors duration-250 ${
                    activeCat
                      ? 'border-champagne-500/60 text-obsidian-950'
                      : 'border-white/10 text-pearl-dim hover:border-champagne-500/35 hover:text-pearl'
                  }`}
                >
                  {activeCat && (
                    <motion.span
                      layoutId="gallery-tab"
                      className="absolute inset-0 rounded-full bg-gradient-to-br from-champagne-200 via-champagne-400 to-champagne-600"
                      transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {c === 'Videos & Reels' && <Play size={10} fill="currentColor" />}
                    {c}
                  </span>
                </button>
              )
            })}
          </motion.div>
        </div>

        {/* Grid — intentional column spans, not a uniform tile matrix */}
        <div
          ref={gridRef}
          className="mt-12 grid grid-cols-1 items-start gap-4 sm:grid-cols-2 lg:grid-cols-12"
        >
          <AnimatePresence mode="popLayout">
            {items.map((item, i) => (
              <GalleryTile
                key={item.id}
                item={item}
                span={spanFor(i, items.length)}
                onOpen={() => setIndex(i)}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: EASE.swift }}
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
          >
            <div
              className="absolute inset-0 bg-obsidian-950/92 backdrop-blur-xl"
              onClick={close}
            />

            <motion.button
              onClick={close}
              className="absolute right-4 top-4 z-20 flex size-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-pearl transition-colors duration-250 hover:border-champagne-500/50 hover:text-champagne-200 sm:right-7 sm:top-7"
              aria-label="Close"
              initial={{ opacity: 0, rotate: -60 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 0.3, ease: EASE.luxe }}
            >
              <X size={18} />
            </motion.button>

            <button
              onClick={() => step(-1)}
              className="absolute left-2 z-20 flex size-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-pearl transition-colors duration-250 hover:border-champagne-500/50 hover:text-champagne-200 sm:left-6"
              aria-label="Previous"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => step(1)}
              className="absolute right-2 z-20 flex size-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-pearl transition-colors duration-250 hover:border-champagne-500/50 hover:text-champagne-200 sm:right-6"
              aria-label="Next"
            >
              <ChevronRight size={20} />
            </button>

            <motion.figure
              key={active.id}
              className="relative z-10 flex max-h-[86vh] w-full max-w-4xl flex-col"
              initial={{ opacity: 0, scale: 0.96, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.34, ease: EASE.luxe }}
            >
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-obsidian-900">
                {active.type === 'video' ? (
                  <video
                    key={active.src}
                    src={active.src}
                    controls
                    autoPlay
                    playsInline
                    className="max-h-[68vh] w-full object-contain"
                  />
                ) : (
                  <img
                    src={active.src}
                    alt={active.title}
                    className="max-h-[68vh] w-full object-contain"
                  />
                )}
              </div>

              <figcaption className="mt-5 text-center">
                <p className="text-[0.625rem] font-semibold uppercase tracking-[0.28em] text-champagne-500">
                  {active.category}
                  <span className="mx-2 text-pearl-faint">
                    {index + 1} / {items.length}
                  </span>
                </p>
                <h3 className="mt-2.5 font-display text-[1.5rem] leading-tight text-pearl sm:text-[1.875rem]">
                  {active.title}
                </h3>
                <p className="mx-auto mt-3 max-w-xl text-[0.8125rem] leading-relaxed text-pearl-dim/85">
                  {active.desc}
                </p>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

/** Vary the tile spans so the grid reads as an edited wall, not a matrix. */
function spanFor(i, total) {
  if (total <= 2) return 'sm:col-span-1'
  const pattern = ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-4', 'lg:col-span-4', 'lg:col-span-4']
  return pattern[i % pattern.length]
}

function GalleryTile({ item, span, onOpen }) {
  const ref = useRef(null)
  const isVideo = item.type === 'video'

  return (
    <motion.button
      ref={ref}
      layout
      onClick={onOpen}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.62, ease: EASE.luxe }}
      className={`group relative col-span-1 self-start overflow-hidden rounded-2xl border border-white/[0.08] bg-obsidian-900 text-left ${span}`}
      aria-label={`View ${item.title}`}
    >
      {/* Reels are shot vertical and photographs landscape — the tile takes
          the shape of its own medium rather than cropping both to one box. */}
      <div
        className={`relative w-full overflow-hidden ${
          isVideo
            ? 'aspect-[3/4] sm:aspect-[4/5]'
            : 'aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3]'
        }`}
      >
        {isVideo ? (
          <>
            <video
              src={item.src}
              muted
              loop
              autoPlay
              playsInline
              preload="metadata"
              className="size-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
            />
            <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-white/20 bg-obsidian-950/70 px-2.5 py-1 text-[0.5625rem] font-semibold uppercase tracking-[0.16em] text-champagne-200 backdrop-blur-md">
              <Play size={9} fill="currentColor" />
              {item.badge || 'Reel'}
            </span>
          </>
        ) : (
          <img
            src={item.src}
            alt={item.title}
            loading="lazy"
            className="size-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
          />
        )}

        {/* Legibility scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/25 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Caption */}
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <p className="text-[0.5625rem] font-semibold uppercase tracking-[0.26em] text-champagne-400">
            {item.category}
          </p>
          <h3 className="mt-2 font-display text-[1.125rem] leading-tight text-pearl sm:text-[1.25rem]">
            {item.title}
          </h3>
          <p className="mt-2 max-h-0 overflow-hidden text-[0.8125rem] leading-relaxed text-pearl-dim/85 opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">
            {item.desc}
          </p>
        </div>

        {/* Zoom affordance */}
        <span className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full border border-white/15 bg-obsidian-950/60 text-pearl opacity-0 backdrop-blur-md transition-all duration-400 group-hover:opacity-100">
          {item.type === 'video' ? <Play size={12} fill="currentColor" /> : <Expand size={13} />}
        </span>
      </div>
    </motion.button>
  )
}
