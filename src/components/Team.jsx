import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { TEAM } from '../data/salon'
import { EASE } from '../lib/utils'

/* ==========================================================================
   THE ARTISANS — a horizontal rank of stylists.
   The lead artist gets a larger plate, because that is how a salon actually
   presents its people: hierarchy, not a uniform grid of portraits.
   ========================================================================== */

export default function Team({ onBookWith }) {
  return (
    <section id="team" className="relative py-24 md:py-32">
      <div className="u-container">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: EASE.luxe }}
          >
            <h2 className="u-title text-balance">
              The hands behind
              <br />
              <em className="italic text-champagne-300">the work</em>
            </h2>
            <p className="mt-5 text-[0.9375rem] leading-[1.8] text-pearl-dim/90 text-pretty">
              Trained under global academies and guided by decades of hands-on
              hair and beauty mastery in Trivandrum.
            </p>
          </motion.div>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {TEAM.map((member, i) => (
            <motion.article
              key={member.name}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.09, ease: EASE.luxe }}
            >
              {/* Portrait plate */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/[0.08] bg-obsidian-900">
                <img
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/20 to-transparent" />

                {/* Experience rule */}
                <span className="absolute right-4 top-4 rounded-full border border-champagne-500/30 bg-obsidian-950/70 px-2.5 py-1 text-[0.625rem] font-semibold tracking-wide text-champagne-200 backdrop-blur-md">
                  {member.experience}
                </span>

                {/* Hover reveal of the booking action */}
                <div className="absolute inset-x-4 bottom-4 translate-y-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <button
                    type="button"
                    onClick={() => onBookWith(member.name)}
                    className="u-btn-gold w-full !py-2.5 !text-[0.6875rem]"
                  >
                    Book with {member.name.split(' ')[0]}
                    <ArrowUpRight size={13} strokeWidth={2} />
                  </button>
                </div>
              </div>

              {/* Caption */}
              <div className="mt-5">
                <p className="text-[0.5625rem] font-semibold uppercase tracking-[0.26em] text-champagne-500">
                  {member.tag}
                </p>
                <h3 className="mt-2 font-display text-[1.25rem] leading-tight text-pearl">
                  {member.name}
                </h3>
                <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-pearl-dim">
                  {member.role}
                </p>
                <p className="mt-2 text-[0.8125rem] leading-relaxed text-pearl-mute">
                  {member.specialty}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
