import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUp, Phone, Mail } from 'lucide-react'
import { BRAND } from '../data/salon'
import { EASE } from '../lib/utils'
import { scrollToId } from '../lib/useLenis'
import { WhatsAppIcon, InstagramIcon, FacebookIcon } from './ui/BrandIcons'
import BrandMark from './ui/BrandMark'

const NAV = [
  { id: 'services', label: 'Services & pricing' },
  { id: 'matcher', label: 'Style matcher' },
  { id: 'numbers', label: 'Heritage' },
  { id: 'showcase', label: 'Treatment suite' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'team', label: 'Master stylists' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'visit', label: 'Visit the studio' }
]

export default function Footer({ onBook }) {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.08] pt-20 md:pt-24">
      {/* Champagne horizon glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(212,175,55,0.55) 30%, rgba(212,175,55,0.55) 70%, transparent)'
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-1/2 h-96 w-[60rem] -translate-x-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(ellipse, rgba(212,175,55,0.10) 0%, transparent 68%)',
          filter: 'blur(50px)'
        }}
      />

      <div className="u-container relative">
        <div className="grid gap-12 pb-16 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, ease: EASE.luxe }}
          >
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-full border border-champagne-500/25 bg-champagne-500/[0.06]">
                <BrandMark variant="emblem" className="size-7" />
              </span>
              <span className="font-wordmark text-[0.9375rem] font-semibold tracking-[0.26em] text-pearl">
                {BRAND.wordmark}
              </span>
            </div>

            <p className="mt-6 max-w-sm text-[0.875rem] leading-[1.85] text-pearl-dim/85">
              Trivandrum&rsquo;s benchmark unisex salon and luxury spa. Since
              1996, dedicated to precision styling, bridal radiance, and
              uncompromising customer care.
            </p>

            <div className="mt-7 flex gap-2.5">
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
                  className="flex size-10 items-center justify-center rounded-full border border-white/10 text-pearl-dim transition-all duration-300 hover:-translate-y-0.5 hover:border-champagne-500/55 hover:text-champagne-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.nav
            aria-label="Footer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, delay: 0.1, ease: EASE.luxe }}
          >
            <h4 className="text-[0.625rem] font-semibold uppercase tracking-[0.28em] text-champagne-500">
              Navigate
            </h4>
            <ul className="mt-6 space-y-3">
              {NAV.map((n) => (
                <li key={n.id}>
                  <button
                    onClick={() => scrollToId(n.id, -20)}
                    className="group relative text-[0.875rem] text-pearl-dim/85 transition-colors duration-250 hover:text-pearl"
                  >
                    {n.label}
                    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-champagne-400 transition-all duration-300 group-hover:w-full" />
                  </button>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, delay: 0.2, ease: EASE.luxe }}
          >
            <h4 className="text-[0.625rem] font-semibold uppercase tracking-[0.28em] text-champagne-500">
              The studio
            </h4>

            <address className="mt-6 space-y-4 not-italic">
              <p className="text-[0.875rem] leading-[1.8] text-pearl-dim/85">
                {BRAND.addressOneLine}
              </p>
              <a
                href={BRAND.phoneHref}
                className="flex items-center gap-2.5 text-[0.875rem] text-pearl-dim/85 transition-colors duration-250 hover:text-champagne-300"
              >
                <Phone size={13} strokeWidth={1.7} className="text-champagne-500" />
                {BRAND.phone}
              </a>
              <a
                href={BRAND.landlineHref}
                className="flex items-center gap-2.5 text-[0.875rem] text-pearl-dim/85 transition-colors duration-250 hover:text-champagne-300"
              >
                <Phone size={13} strokeWidth={1.7} className="text-champagne-500" />
                {BRAND.landline}
              </a>
              <button
                onClick={onBook}
                className="flex items-center gap-2.5 text-[0.875rem] text-pearl-dim/85 transition-colors duration-250 hover:text-champagne-300"
              >
                <Mail size={13} strokeWidth={1.7} className="text-champagne-500" />
                Request a callback
              </button>
            </address>

            <button
              onClick={onBook}
              className="u-btn-gold mt-7 w-full sm:w-auto"
            >
              Reserve an appointment
            </button>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 border-t border-white/[0.08] py-7 sm:flex-row sm:items-center sm:justify-between sm:pr-16">
          <p className="text-[0.75rem] text-pearl-faint">
            &copy; 1996 – {year} The Glatt Salon. All rights reserved. Unisex
            Salon &amp; Spa — Hair, Makeup, Beauty, Spa.
          </p>
          <button
            onClick={() => scrollToId('hero', 0)}
            className="group flex items-center gap-2 self-start text-[0.75rem] font-medium text-pearl-dim transition-colors duration-250 hover:text-champagne-300"
          >
            Back to top
            <span className="flex size-7 items-center justify-center rounded-full border border-white/12 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-champagne-500/55">
              <ArrowUp size={12} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  )
}
