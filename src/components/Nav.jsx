import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { BRAND } from '../data/salon'
import { scrollToId } from '../lib/useLenis'
import { EASE } from '../lib/utils'
import { WhatsAppIcon, InstagramIcon, FacebookIcon } from './ui/BrandIcons'
import BrandMark from './ui/BrandMark'

const LINKS = [
  { id: 'services', label: 'Services' },
  { id: 'matcher', label: 'Style Matcher' },
  { id: 'numbers', label: 'Heritage' },
  { id: 'showcase', label: 'Showcase' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'team', label: 'Artisans' },
  { id: 'visit', label: 'Visit' }
]

export default function Nav({ scrolled, onBook }) {
  const [open, setOpen] = useState(false)

  // Lock the page while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const go = (id) => {
    setOpen(false)
    // Let the drawer finish closing before the scroll begins.
    window.setTimeout(() => scrollToId(id, -20), open ? 260 : 0)
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.85, ease: EASE.luxe, delay: 0.1 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={`transition-all duration-500 ${
            scrolled
              ? 'border-b border-white/[0.07] bg-obsidian-950/72 backdrop-blur-2xl'
              : 'border-b border-transparent bg-transparent'
          }`}
        >
          <div className="u-container flex h-[72px] items-center justify-between gap-6 md:h-[86px]">
            {/* Brand */}
            <button
              onClick={() => scrollToId('hero', 0)}
              className="group flex shrink-0 items-center gap-3 text-left"
              aria-label={`${BRAND.name} — home`}
            >
              <span
                className="flex size-10 items-center justify-center rounded-full border border-champagne-500/25 bg-champagne-500/[0.06] transition-colors duration-300 group-hover:border-champagne-500/60 md:size-11"
              >
                <BrandMark variant="emblem" className="h-8 w-8 md:h-9 md:w-9" />
              </span>
              <span className="flex flex-col leading-none">
                <span className="whitespace-nowrap font-wordmark text-[0.8125rem] font-semibold tracking-[0.26em] text-pearl md:text-[0.9375rem]">
                  {BRAND.wordmark}
                </span>
                <span className="mt-1 whitespace-nowrap text-[0.5625rem] font-medium uppercase tracking-[0.34em] text-pearl-mute">
                  {BRAND.descriptor}
                </span>
              </span>
            </button>

            {/* Desktop links. Seven items plus the brand and the Reserve
                action only fit from xl; the lg band would force the row to
                shrink, wrapping the labels mid-word. */}
            <nav className="hidden items-center gap-1 xl:flex" aria-label="Primary">
              {LINKS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => go(l.id)}
                  className="group relative whitespace-nowrap px-3.5 py-2 text-[0.8125rem] font-medium tracking-wide text-pearl-dim transition-colors duration-250 hover:text-pearl"
                >
                  {l.label}
                  <span className="absolute inset-x-3.5 bottom-1 h-px origin-left scale-x-0 bg-champagne-400 transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </button>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <span className="hidden items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-3.5 py-1.5 text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-pearl-dim xl:flex">
                <span className="size-1.5 rounded-full bg-champagne-400 animate-pulse-dot" />
                {BRAND.hoursShort}
              </span>

              <button
                onClick={onBook}
                className="u-btn-gold hidden !px-5 !py-2.5 !text-[0.6875rem] sm:inline-flex"
              >
                Reserve
                <ArrowUpRight size={14} strokeWidth={2} />
              </button>

              <button
                onClick={() => setOpen((v) => !v)}
                className="flex size-10 items-center justify-center rounded-full border border-white/10 text-pearl transition-colors duration-250 hover:border-champagne-500/50 xl:hidden"
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
              >
                {open ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="drawer"
            className="fixed inset-0 z-40 xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: EASE.swift }}
          >
            <div
              className="absolute inset-0 bg-obsidian-950/80 backdrop-blur-md"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              className="u-glass-deep absolute inset-y-0 right-0 flex w-[min(21rem,88vw)] flex-col overflow-y-auto px-7 pt-28 pb-10"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.42, ease: EASE.drawer }}
              aria-label="Mobile"
            >
              <p className="text-[0.625rem] font-semibold uppercase tracking-[0.34em] text-champagne-400">
                Navigate
              </p>

              <ul className="mt-6 flex flex-col">
                {LINKS.map((l, i) => (
                  <motion.li
                    key={l.id}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.06 + i * 0.045, ease: EASE.luxe }}
                  >
                    <button
                      onClick={() => go(l.id)}
                      className="flex w-full items-baseline justify-between border-b border-white/[0.07] py-4 text-left"
                    >
                      <span className="font-display text-2xl text-pearl">{l.label}</span>
                      <ArrowUpRight size={15} className="text-champagne-500" />
                    </button>
                  </motion.li>
                ))}
              </ul>

              <motion.button
                onClick={() => {
                  setOpen(false)
                  window.setTimeout(onBook, 240)
                }}
                className="u-btn-gold mt-8 w-full"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4, ease: EASE.luxe }}
              >
                Reserve an appointment
              </motion.button>

              <div className="mt-8 flex items-center gap-2.5">
                {[
                  { Icon: WhatsAppIcon, href: BRAND.whatsappUrl, label: 'WhatsApp' },
                  { Icon: InstagramIcon, href: BRAND.instagram, label: 'Instagram' },
                  { Icon: FacebookIcon, href: BRAND.facebook, label: 'Facebook' }
                ].map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="flex size-10 items-center justify-center rounded-full border border-white/10 text-pearl-dim transition-colors duration-250 hover:border-champagne-500/50 hover:text-champagne-300"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>

              <div className="mt-auto pt-10">
                <p className="text-[0.6875rem] leading-relaxed text-pearl-mute">
                  {BRAND.addressLines.join(', ')}
                </p>
                <a
                  href={BRAND.phoneHref}
                  className="mt-3 inline-block text-sm font-medium text-champagne-300"
                >
                  {BRAND.phone}
                </a>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
