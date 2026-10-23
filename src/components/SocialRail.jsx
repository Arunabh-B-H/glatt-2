import React from 'react'
import { motion } from 'framer-motion'
import { BRAND } from '../data/salon'
import { EASE } from '../lib/utils'
import { WhatsAppIcon, InstagramIcon, FacebookIcon } from './ui/BrandIcons'

const CHANNELS = [
  { Icon: WhatsAppIcon, href: BRAND.whatsappUrl, label: 'WhatsApp direct' },
  { Icon: InstagramIcon, href: BRAND.instagram, label: 'Instagram' },
  { Icon: FacebookIcon, href: BRAND.facebook, label: 'Facebook' }
]

/* ==========================================================================
   SOCIAL RAIL — a thin vertical dock on the left edge, desktop only.
   It hides below 1280px where it would crowd the content column.
   ========================================================================== */
export default function SocialRail() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -22 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.9, ease: EASE.luxe }}
      className="fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-1.5 xl:flex"
      aria-label="Official channels"
    >
      <span
        aria-hidden="true"
        className="mb-2 size-1.5 rounded-full bg-champagne-400 animate-pulse-dot"
      />

      {CHANNELS.map(({ Icon, href, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          className="group relative flex size-10 items-center justify-center rounded-full border border-white/[0.09] bg-obsidian-900/60 text-pearl-dim backdrop-blur-xl transition-all duration-300 hover:border-champagne-500/55 hover:text-champagne-300"
        >
          <Icon size={15} />
          <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-full border border-champagne-500/20 bg-obsidian-900/95 px-3 py-1.5 text-[0.625rem] font-medium uppercase tracking-[0.16em] text-champagne-200 opacity-0 backdrop-blur-xl transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 -translate-x-1">
            {label}
          </span>
        </a>
      ))}

      <span
        aria-hidden="true"
        className="mt-2 h-14 w-px bg-gradient-to-b from-white/12 to-transparent"
      />
    </motion.aside>
  )
}
