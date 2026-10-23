import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ArrowUpRight, Sparkles } from 'lucide-react'
import { SERVICES, CATEGORIES, BRAND } from '../data/salon'
import { EASE, trackPointer } from '../lib/utils'
import { WhatsAppIcon } from './ui/BrandIcons'

/* ==========================================================================
   SERVICES — an editorial menu, not a card grid.
   Left column holds the heading and the category filter; the right column
   carries the treatments as a ledger of rows that open in place.
   ========================================================================== */

export default function Services({ onBook }) {
  const [category, setCategory] = useState('All')
  const [expanded, setExpanded] = useState(null)

  const list =
    category === 'All' ? SERVICES : SERVICES.filter((s) => s.category === category)

  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="u-container relative">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16 xl:gap-24">
          {/* ── Left: heading + filter ── */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease: EASE.luxe }}
            >
              <h2 className="u-title text-balance">
                A menu of
                <br />
                considered <em className="italic text-champagne-300">craft</em>
              </h2>
              <p className="mt-5 max-w-sm text-[0.9375rem] leading-[1.8] text-pearl-dim/90 text-pretty">
                Every appointment is built around precision, bespoke
                consultation, and high-end formulations tailored to your
                lifestyle.
              </p>
            </motion.div>

            {/* Category filter — vertical on desktop, wrapping on mobile */}
            <motion.div
              className="mt-9 flex flex-wrap gap-2 lg:flex-col lg:items-start lg:gap-0.5"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: EASE.luxe, delay: 0.14 }}
              role="tablist"
              aria-label="Filter treatments by category"
            >
              {CATEGORIES.map((cat) => {
                const active = cat === category
                return (
                  <button
                    key={cat}
                    role="tab"
                    aria-selected={active}
                    onClick={() => {
                      setCategory(cat)
                      setExpanded(null)
                    }}
                    className={`group relative rounded-full px-3.5 py-2 text-left text-[0.75rem] font-medium tracking-wide transition-colors duration-250 lg:w-full lg:rounded-none lg:px-0 lg:py-2.5 ${
                      active
                        ? 'text-champagne-200'
                        : 'text-pearl-mute hover:text-pearl-dim'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="services-active"
                        className="absolute inset-0 rounded-full border border-champagne-500/30 bg-champagne-500/[0.07] lg:rounded-none lg:border-0 lg:border-l lg:border-champagne-500/70 lg:bg-transparent"
                        transition={{ type: 'spring', stiffness: 420, damping: 36, mass: 0.8 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2.5">
                      <span
                        className={`hidden h-px w-4 transition-all duration-300 lg:block ${
                          active
                            ? 'w-6 bg-champagne-400'
                            : 'w-0 bg-transparent group-hover:w-3 group-hover:bg-champagne-600'
                        }`}
                      />
                      {cat}
                      <span className="text-[0.6875rem] tabular-nums text-pearl-faint">
                        {cat === 'All'
                          ? SERVICES.length
                          : SERVICES.filter((s) => s.category === cat).length}
                      </span>
                    </span>
                  </button>
                )
              })}
            </motion.div>
          </div>

          {/* ── Right: the ledger ── */}
          <div>
            <motion.ul
              className="border-t border-white/[0.08]"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.12 }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.055 } }
              }}
            >
              <AnimatePresence initial={false} mode="popLayout">
                {list.map((svc) => (
                  <ServiceRow
                    key={svc.id}
                    svc={svc}
                    open={expanded === svc.id}
                    onToggle={() =>
                      setExpanded((cur) => (cur === svc.id ? null : svc.id))
                    }
                    onBook={onBook}
                  />
                ))}
              </AnimatePresence>
            </motion.ul>

            <motion.p
              className="mt-12 max-w-md text-[0.8125rem] leading-[1.85] text-pearl-faint"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE.luxe }}
            >
              Custom bridal packages, corporate grooming, and group spa bookings
              are available upon consultation.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------------------
   One treatment row. Expands in place to reveal the inclusions ledger.
   -------------------------------------------------------------------------- */
function ServiceRow({ svc, open, onToggle, onBook }) {
  const rowRef = useRef(null)

  return (
    <motion.li
      layout
      variants={{
        hidden: { opacity: 0, y: 22 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE.luxe } }
      }}
      exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
      className="group relative border-b border-white/[0.08]"
    >
      {/* Cursor spotlight */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(420px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(212,175,55,0.075), transparent 65%)'
        }}
      />

      <div className="relative">
        <button
          ref={rowRef}
          onClick={onToggle}
          onMouseMove={trackPointer}
          aria-expanded={open}
          className="flex w-full cursor-pointer items-start gap-4 py-7 text-left md:gap-8 md:py-9"
        >
          {/* Title + description */}
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <h3 className="font-display text-[1.375rem] leading-tight tracking-[-0.015em] text-pearl transition-colors duration-300 group-hover:text-champagne-200 md:text-[1.75rem]">
                {svc.title}
              </h3>
              <span className="rounded-full border border-white/10 px-2.5 py-1 text-[0.625rem] font-medium tracking-wide text-pearl-mute">
                {svc.duration}
              </span>
            </div>
            <p className="mt-3 max-w-[52ch] text-[0.875rem] leading-[1.75] text-pearl-dim/80">
              {svc.description}
            </p>
          </div>

          {/* Price + chevron */}
          <div className="flex shrink-0 items-start gap-4 md:gap-6">
            <div className="text-right">
              <span className="block text-[0.5625rem] font-semibold uppercase tracking-[0.26em] text-pearl-faint">
                From
              </span>
              <span className="mt-1 block font-display text-[1.375rem] leading-none tabular-nums text-champagne-300 md:text-[1.75rem]">
                {svc.price}
              </span>
            </div>
            <span
              className={`mt-1 flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 transition-all duration-300 ${
                open
                  ? 'rotate-180 border-champagne-500/60 bg-champagne-500/10 text-champagne-300'
                  : 'text-pearl-mute group-hover:border-champagne-500/40 group-hover:text-champagne-300'
              }`}
            >
              <ChevronDown size={15} strokeWidth={1.8} />
            </span>
          </div>
        </button>

        {/* Inclusions — expands in place */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                height: { duration: 0.42, ease: EASE.swift },
                opacity: { duration: 0.28, ease: 'ease' }
              }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-7 pb-9 md:flex-row md:items-end md:justify-between md:pl-0">
                <div className="max-w-xl">
                  <p className="flex items-center gap-2 text-[0.625rem] font-semibold uppercase tracking-[0.26em] text-champagne-500">
                    <Sparkles size={11} strokeWidth={2} />
                    What&rsquo;s included
                  </p>
                  <ul className="mt-4 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                    {svc.inclusions.split(',').map((bit, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-[0.8125rem] leading-relaxed text-pearl-dim/90"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[0.5em] h-px w-3 shrink-0 bg-champagne-500/60"
                        />
                        <span>{bit.trim()}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex shrink-0 flex-wrap gap-2.5">
                  <a
                    href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(
                      `Hi The Glatt Salon, I would like to book ${svc.title} (${svc.price})`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="u-btn-ghost !px-4 !py-2.5"
                  >
                    <WhatsAppIcon size={14} />
                    WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={() => onBook(svc)}
                    className="u-btn-gold !px-4 !py-2.5"
                  >
                    Reserve
                    <ArrowUpRight size={14} strokeWidth={2} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.li>
  )
}
