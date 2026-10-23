import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { SERVICES } from '../data/salon'
import { EASE } from '../lib/utils'
import { scrollToId } from '../lib/useLenis'
import Magnetic from './Magnetic'

/* ==========================================================================
   CINEMATIC STRIP — "Treatments in motion"
   A full-bleed horizontal treatment showcase that reads like a luxury
   lookbook. The title scales and fades as the section enters (scroll-linked,
   not time-linked), the aurora behind the rail drifts as you continue
   scrolling, and the cards stagger into view. The rail swipes on touch,
   drags with a pointer, and nudges with the arrow controls on desktop.
   ========================================================================== */

const SERVICE_IMAGES = {
  'haircut-classic': '/images/hero-bg.jpg',
  'skin-fade': '/images/mens-grooming.jpg',
  'bridal-makeover': '/images/gallery-kasavu-bridal.jpg',
  'balayage-color': '/images/hair-color.jpg',
  'keratin-botox': '/images/gallery-festive-glam.png',
  'moroccan-spa': '/images/spa-wellness.jpg',
  'luxury-massage': '/images/spa-wellness.jpg',
  'hydra-facial': '/images/salon-interior.jpg',
  'groom-package': '/images/mens-grooming.jpg'
}

export default function CinematicStrip({ onBook }) {
  const railRef = useRef(null)
  const barRef = useRef(null)
  const drag = useRef({ active: false, startX: 0, startLeft: 0 })

  /* Scroll-linked storytelling */
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ['start end', 'end start']
  })
  const titleScale = useTransform(scrollYProgress, [0, 0.32], [0.93, 1])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.22], [0, 1])
  const auroraY = useTransform(scrollYProgress, [0, 1], [0, -46])

  const scrollBy = (delta) => {
    const r = railRef.current
    if (!r) return
    const card = r.querySelector('[data-card]')
    const step = card ? card.offsetWidth + 20 : r.clientWidth * 0.8
    r.scrollBy({ left: delta * step, behavior: 'smooth' })
  }

  /* The progress hairline tracks the rail's own scroll, written straight
     to the DOM so it never re-renders the section on every frame. */
  const onRailScroll = () => {
    const r = railRef.current
    const bar = barRef.current
    if (!r || !bar) return
    const max = r.scrollWidth - r.clientWidth
    const p = max > 0 ? r.scrollLeft / max : 0
    bar.style.transform = `scaleX(${0.08 + p * 0.92})`
  }

  /* Pointer drag — the rail follows the cursor. Buttons and links opt out
     so their own clicks still land. */
  const onPointerDown = (e) => {
    if (e.pointerType === 'touch') return
    if (e.target.closest('button, a')) return
    drag.current = { active: true, startX: e.clientX, startLeft: railRef.current.scrollLeft }
  }
  const onPointerMove = (e) => {
    if (!drag.current.active) return
    railRef.current.scrollLeft = drag.current.startLeft - (e.clientX - drag.current.startX)
  }
  const endDrag = () => {
    drag.current.active = false
  }

  return (
    <section id="showcase" className="relative overflow-hidden py-24 md:py-32">
      {/* ── Decorative field ── */}
      <div
        className="absolute inset-0 z-0 animate-aurora opacity-25 blur-[70px]"
        style={{ y: auroraY }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 z-0 bg-gradient-to-b from-obsidian-950 via-obsidian-900/80 to-obsidian-950"
        aria-hidden="true"
      />

      {/* ── Heading ── */}
      <div className="u-container relative z-10">
        <div className="flex flex-col gap-9 md:flex-row md:items-end md:justify-between">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: EASE.luxe }}
            style={{ opacity: titleOpacity, scale: titleScale }}
          >
            <h2 className="u-display text-balance">
              Craft for every story
              <br />
              you&rsquo;re <em className="italic text-champagne-300">telling</em>
            </h2>
            <p className="mt-6 max-w-[46ch] text-[0.9375rem] leading-[1.8] text-pearl-dim/85 text-pretty">
              Bespoke cuts, dimensional colour, bridal artistry and restorative
              spa rituals — each performed at the chair by a master of the craft.
            </p>
          </motion.div>

          {/* ── Rail controls ── */}
          <div className="flex shrink-0 items-center gap-4">
            <span className="hidden text-[0.5625rem] font-semibold uppercase tracking-[0.26em] text-pearl-faint sm:block">
              Drag to explore
            </span>
            <div className="flex items-center gap-2">
              <div className="-translate-y-1/2">
                <Magnetic>
                  <button
                    type="button"
                    onClick={() => scrollBy(-1)}
                    className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-white/[0.12] bg-obsidian-900/80 text-pearl backdrop-blur-xl transition-colors duration-250 hover:border-champagne-500/60 hover:text-champagne-300"
                    aria-label="Previous treatment"
                  >
                    <ChevronLeft size={16} strokeWidth={2} />
                  </button>
                </Magnetic>
              </div>
              <div className="-translate-y-1/2">
                <Magnetic>
                  <button
                    type="button"
                    onClick={() => scrollBy(1)}
                    className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-white/[0.12] bg-obsidian-900/80 text-pearl backdrop-blur-xl transition-colors duration-250 hover:border-champagne-500/60 hover:text-champagne-300"
                    aria-label="Next treatment"
                  >
                    <ChevronRight size={16} strokeWidth={2} />
                  </button>
                </Magnetic>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── The rail ── */}
      <div className="relative z-10 mt-12 md:mt-16">
        <div
          ref={railRef}
          onScroll={onRailScroll}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          className="u-rail-pad flex cursor-grab gap-5 overflow-x-auto scroll-smooth pb-8 active:cursor-grabbing"
          style={{ scrollbarWidth: 'none' }}
        >
          {SERVICES.map((svc) => (
            <TreatmentCard key={svc.id} svc={svc} onBook={onBook} />
          ))}
          {/* Trailing room so the last card can rest clear of the edge */}
          <div
            aria-hidden="true"
            className="flex-none w-[clamp(1.25rem,4.5vw,5rem)]"
          />
        </div>

        {/* Rail progress hairline */}
        <div className="u-container mt-1">
          <div className="h-px w-full bg-white/[0.08]">
            <div
              ref={barRef}
              className="h-full origin-left bg-gradient-to-r from-champagne-700 via-champagne-400 to-champagne-200"
              style={{ transform: 'scaleX(0.08)' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------------------
   One treatment card in the rail.
   -------------------------------------------------------------------------- */
function TreatmentCard({ svc, onBook }) {
  const imgSrc = SERVICE_IMAGES[svc.id] ?? '/images/hero-bg.jpg'

  return (
    <motion.div
      data-card
      className="group flex-none w-[min(86vw,21rem)]"
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, ease: EASE.luxe }}
    >
      <div className="relative overflow-hidden rounded-[1.5rem] border border-white/[0.09] bg-obsidian-800/50 shadow-[0_28px_60px_-38px_rgba(0,0,0,0.95)]">
        {/* Image — uniform tile crop, deliberately cropped to the card ratio */}
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={imgSrc}
            alt={`${svc.title} at The Glatt Salon`}
            className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/90 via-obsidian-950/10 to-obsidian-900/25" />
          <span className="absolute left-3 top-3 rounded-full border border-white/[0.15] bg-obsidian-950/65 px-2.5 py-1 text-[0.5625rem] font-semibold uppercase tracking-[0.18em] text-champagne-300 backdrop-blur-sm">
            {svc.category}
          </span>
        </div>

        {/* Body */}
        <div className="p-5">
          <h3 className="font-display text-[1.1875rem] leading-[1.2] tracking-[-0.012em] text-pearl">
            {svc.title}
          </h3>
          <p className="mt-2.5 max-w-[36ch] text-[0.8125rem] leading-[1.7] text-pearl-dim/80 line-clamp-2">
            {svc.description}
          </p>

          <div className="mt-5 flex items-baseline justify-between gap-4">
            <span className="font-display text-[1.125rem] leading-none tabular-nums text-champagne-300">
              {svc.price}
            </span>
            <span className="whitespace-nowrap text-[0.6875rem] font-medium text-pearl-mute">
              {svc.duration}
            </span>
          </div>

          <div className="mt-5">
            <Magnetic>
              <button
                type="button"
                onClick={() => onBook(svc)}
                className="u-btn-gold w-full !px-3.5 !py-3 text-[0.6875rem]"
              >
                Reserve
                <ArrowUpRight size={14} strokeWidth={2} />
              </button>
            </Magnetic>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
