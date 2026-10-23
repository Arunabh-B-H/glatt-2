import React from 'react'
import { BRAND } from '../data/salon'

const ITEMS = [
  'Hair Architecture',
  'Signature Bridal Artistry',
  'Keratin & Hair Botox',
  'Precision Men’s Grooming',
  'Aromatherapy Spa Rituals',
  'Hydra-Luxe Skincare',
  String(BRAND.established),
  BRAND.city
]

/* ==========================================================================
   MARQUEE BAND — an infinite scroll of running text between hero and menu.
   Two identical tracks are rendered side by side; the key util translates
   them -50% so the seam closes without a jump.
   ========================================================================== */
export default function Marquee() {
  const Track = () => (
    <div className="flex shrink-0 items-center">
      {ITEMS.map((t, i) => (
        <span
          key={i}
          className="flex shrink-0 items-center whitespace-nowrap text-[0.6875rem] font-medium uppercase tracking-[0.36em] text-pearl-dim md:text-[0.75rem] md:tracking-[0.52em]"
        >
          {t}
          <span
            aria-hidden="true"
            className="mx-6 inline-block h-px w-6 bg-champagne-500/35 md:mx-9 md:w-9"
          />
        </span>
      ))}
    </div>
  )

  return (
    <div
      className="flex h-[3.25rem] items-center overflow-hidden"
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee">
        <Track />
        <Track />
      </div>
    </div>
  )
}
