import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ExternalLink, Quote } from 'lucide-react'
import { TESTIMONIALS, BRAND } from '../data/salon'
import { EASE } from '../lib/utils'

/* ==========================================================================
   TESTIMONIALS — a single large quote that rotates, rather than a grid of
   identical review cards. The index is a set of champagne rules you can
   click; the quote cross-fades with a blur to bridge the swap.
   ========================================================================== */

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const t = TESTIMONIALS[active]

  return (
    <section id="reviews" className="relative overflow-hidden py-24 md:py-32">
      {/* Ambient champagne wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 size-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(212,175,55,0.075) 0%, transparent 62%)',
          filter: 'blur(30px)'
        }}
      />

      <div className="u-container relative">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-20">
          {/* ── Quote ── */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease: EASE.luxe }}
            >
              <h2 className="u-title text-balance">
                What the
                <br />
                <em className="italic text-champagne-300">neighbours say</em>
              </h2>
            </motion.div>

            <div className="relative mt-12 min-h-[16rem] sm:min-h-[14rem]">
              {/* The mark hangs off the left edge, aligned to the first line
                  of the quote rather than floating above it. */}
              <Quote
                size={40}
                strokeWidth={1}
                className="absolute -left-1 -top-3 text-champagne-500/22 md:-left-2"
                aria-hidden="true"
              />
              <AnimatePresence mode="wait">
                <motion.figure
                  key={t.name + t.date}
                  initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -14, filter: 'blur(8px)' }}
                  transition={{ duration: 0.45, ease: EASE.luxe }}
                  className="relative"
                >
                  <blockquote className="max-w-[54ch] pl-8 font-display text-[1.375rem] leading-[1.48] tracking-[-0.012em] text-pearl sm:text-[1.75rem] md:text-[2rem] md:pl-10">
                    {t.review}
                  </blockquote>

                  <figcaption className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
                    <div>
                      <p className="text-[0.9375rem] font-semibold text-pearl">
                        {t.name}
                      </p>
                      <p className="mt-0.5 text-[0.8125rem] text-pearl-mute">
                        {t.location}
                      </p>
                    </div>
                    <span className="hidden h-8 w-px bg-white/10 sm:block" />
                    <div className="flex items-center gap-1.5">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star
                          key={i}
                          size={13}
                          className="text-champagne-400"
                          fill="currentColor"
                          strokeWidth={0}
                        />
                      ))}
                    </div>
                    <span className="rounded-full border border-white/10 px-2.5 py-1 text-[0.6875rem] tracking-wide text-pearl-dim">
                      {t.service}
                    </span>
                    <span className="text-[0.75rem] tabular-nums text-pearl-faint">
                      {t.date}
                    </span>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>

            {/* Selector rules */}
            <div className="mt-10 flex items-center gap-3">
              {TESTIMONIALS.map((item, i) => (
                <button
                  key={item.name}
                  onClick={() => setActive(i)}
                  aria-label={`Read review from ${item.name}`}
                  aria-current={i === active}
                  className="group relative h-8 flex-1 max-w-24"
                >
                  <span
                    className={`absolute inset-x-0 top-1/2 h-px -translate-y-1/2 transition-colors duration-300 ${
                      i === active
                        ? 'bg-champagne-400'
                        : 'bg-white/14 group-hover:bg-white/30'
                    }`}
                  />
                  {i === active && (
                    <motion.span
                      layoutId="review-dot"
                      className="absolute left-0 top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-champagne-300"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* ── Google panel ── */}
          <motion.aside
            className="lg:pt-2"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.16, ease: EASE.luxe }}
          >
            <div className="u-glass u-grain rounded-2xl p-7">
              <p className="text-[0.625rem] font-semibold uppercase tracking-[0.28em] text-pearl-mute">
                Verified on Google
              </p>

              <div className="mt-5 flex items-baseline gap-3">
                <span className="font-display text-[3.5rem] leading-none tabular-nums text-pearl">
                  {BRAND.rating}
                </span>
                <span className="text-[1rem] text-pearl-mute">/ 5</span>
              </div>

              <div className="mt-3 flex items-center gap-1.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={15}
                    className="text-champagne-400"
                    fill="currentColor"
                    strokeWidth={0}
                  />
                ))}
                <span className="ml-2 text-[0.8125rem] text-pearl-dim">
                  {BRAND.reviewCount} reviews
                </span>
              </div>

              <p className="mt-6 text-[0.875rem] leading-[1.8] text-pearl-dim/85">
                Four decades of word of mouth in Kowdiar — and{' '}
                {BRAND.reviewCount} public reviews that keep the chair full.
              </p>

              <a
                href={BRAND.googleReviews}
                target="_blank"
                rel="noreferrer"
                className="u-btn-ghost mt-7 w-full"
              >
                Read all reviews
                <ExternalLink size={14} strokeWidth={1.8} />
              </a>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  )
}
