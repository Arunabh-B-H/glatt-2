import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { STATS, HERITAGE, BRAND } from '../data/salon'
import { EASE } from '../lib/utils'
import { scrollToId } from '../lib/useLenis'
import BrandMark from './ui/BrandMark'

/* ==========================================================================
   HERITAGE — the founding story, told with a horizontal year-ledger feel.
   The numbers sit in a single ruled band rather than four identical stat
   cards, so the page never falls into the hero-metric template.
   ========================================================================== */

export default function Heritage({ onBook }) {
  const bandRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: bandRef,
    offset: ['start end', 'end start']
  })
  const bandX = useTransform(scrollYProgress, [0, 1], ['2%', '-2%'])

  return (
    <section id="numbers" className="relative py-24 md:py-32">
      <div className="u-container">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-20">
          {/* ── The story ── */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.85, ease: EASE.luxe }}
          >
            <h2 className="u-title text-balance">
              Three decades in
              <br />
              <em className="italic text-champagne-300">Kowdiar</em>
            </h2>

            <blockquote className="mt-8 border-l border-champagne-500/50 pl-6">
              <p className="font-display text-[1.375rem] leading-[1.42] tracking-[-0.012em] text-pearl md:text-[1.625rem]">
                &ldquo;{HERITAGE.quote}&rdquo;
              </p>
            </blockquote>

            <p className="mt-7 max-w-[58ch] text-[0.9375rem] leading-[1.85] text-pearl-dim/90 text-pretty">
              {HERITAGE.body}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <button type="button" onClick={onBook} className="u-btn-gold">
                Experience the craft
                <ArrowUpRight size={14} strokeWidth={2} />
              </button>
              <button
                type="button"
                onClick={() => scrollToId('visit', -20)}
                className="u-btn-ghost"
              >
                Visit the studio
              </button>
            </div>
          </motion.div>

          {/* ── The numbers band ── */}
          <div ref={bandRef} className="lg:pt-3">
            <p className="text-[0.625rem] font-semibold uppercase tracking-[0.28em] text-pearl-mute">
              The record
            </p>

            <dl className="mt-6 border-t border-white/[0.09]">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  className="group flex items-baseline gap-5 border-b border-white/[0.09] py-6 transition-colors duration-300 hover:border-champagne-500/30"
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.65, delay: i * 0.08, ease: EASE.luxe }}
                >
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="min-w-0 flex-1">
                    <span className="block font-display text-[2rem] leading-none tabular-nums text-champagne-300 md:text-[2.5rem]">
                      {s.value}
                    </span>
                    <span className="mt-2.5 block text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-pearl">
                      {s.label}
                    </span>
                    <span className="mt-1 block text-[0.8125rem] leading-relaxed text-pearl-mute">
                      {s.desc}
                    </span>
                  </dd>
                  <span
                    aria-hidden="true"
                    className="mt-1 h-px w-8 shrink-0 bg-gradient-to-r from-transparent to-champagne-500/40 transition-all duration-400 group-hover:w-14 group-hover:to-champagne-400"
                  />
                </motion.div>
              ))}
            </dl>

            {/* Founder's mark */}
            <motion.div
              className="mt-8 flex items-center gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: EASE.luxe }}
            >
              <span className="flex size-11 items-center justify-center rounded-full border border-champagne-500/25 bg-champagne-500/[0.06]">
                <BrandMark variant="emblem" className="size-7 opacity-90" />
              </span>
              <p className="text-[0.8125rem] leading-relaxed text-pearl-mute">
                Founded in {BRAND.established} by Creative Director{' '}
                <span className="text-pearl-dim">Arun</span> — still at the chair,
                still teaching.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
