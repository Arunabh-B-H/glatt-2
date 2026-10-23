import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, User } from 'lucide-react'
import {
  MATCHER_PREFERENCES,
  MATCHER_GOALS,
  MATCHER_RESULTS
} from '../data/salon'
import { EASE } from '../lib/utils'

/* ==========================================================================
   STYLE MATCHER — a consultation instrument.
   Two segmented controls drive a single recommendation panel. Selecting an
   option re-renders the result with a masked cross-fade, so the panel reads
   as one surface changing rather than three objects swapping.
   ========================================================================== */

export default function Matcher({ onBook }) {
  const [preference, setPreference] = useState('unisex')
  const [goal, setGoal] = useState('hair')

  const result = resolve(preference, goal)

  return (
    <section id="matcher" className="relative py-24 md:py-32">
      <div className="u-container">
        <div className="u-glass-deep u-grain relative overflow-hidden rounded-[2rem] p-7 md:p-12 lg:p-16">
          {/* Interior glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-32 size-[28rem] rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(212,175,55,0.13) 0%, transparent 66%)',
              filter: 'blur(30px)'
            }}
          />

          <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
            {/* ── Controls ── */}
            <div>
              <h2 className="u-title text-balance">
                Find your signature
                <br />
                <em className="italic text-champagne-300">style &amp; estimate</em>
              </h2>
              <p className="mt-5 max-w-md text-[0.9375rem] leading-[1.8] text-pearl-dim/90 text-pretty">
                Select your preferences to discover the treatment our master
                team would prescribe, with the artist best suited to deliver
                it.
              </p>

              {/* Preference */}
              <div className="mt-9">
                <p className="text-[0.625rem] font-semibold uppercase tracking-[0.28em] text-pearl-mute">
                  Preference
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {MATCHER_PREFERENCES.map((o) => (
                    <SegmentButton
                      key={o.id}
                      active={preference === o.id}
                      onClick={() => setPreference(o.id)}
                      layoutId="matcher-pref"
                    >
                      {o.label}
                    </SegmentButton>
                  ))}
                </div>
              </div>

              {/* Goal */}
              <div className="mt-7">
                <p className="text-[0.625rem] font-semibold uppercase tracking-[0.28em] text-pearl-mute">
                  Desired transformation
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {MATCHER_GOALS.map((o) => (
                    <SegmentButton
                      key={o.id}
                      active={goal === o.id}
                      onClick={() => setGoal(o.id)}
                      layoutId="matcher-goal"
                    >
                      {o.label}
                    </SegmentButton>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Result ── */}
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${preference}-${goal}`}
                  initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
                  transition={{ duration: 0.4, ease: EASE.luxe }}
                  className="relative rounded-[1.5rem] border border-champagne-500/22 bg-obsidian-900/70 p-7 md:p-9"
                >
                  {/* Top hairline */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent via-champagne-400/70 to-transparent md:inset-x-9"
                  />

                  <p className="text-[0.625rem] font-semibold uppercase tracking-[0.28em] text-champagne-400">
                    Recommended experience
                  </p>

                  <h3 className="mt-4 font-display text-[1.75rem] leading-[1.15] tracking-[-0.02em] text-pearl md:text-[2.25rem]">
                    {result.service}
                  </h3>

                  <p className="mt-4 max-w-md text-[0.875rem] leading-[1.78] text-pearl-dim/90">
                    {result.desc}
                  </p>

                  <div className="mt-7 flex items-center gap-2.5 text-[0.8125rem] text-pearl-dim">
                    <User size={13} strokeWidth={1.7} className="text-champagne-500" />
                    <span>
                      Lead artist{' '}
                      <strong className="font-semibold text-pearl">
                        {result.specialist}
                      </strong>
                    </span>
                  </div>

                  {/* Investment */}
                  <div className="mt-7 flex flex-wrap items-end justify-between gap-6 border-t border-white/[0.09] pt-6">
                    <div>
                      <p className="text-[0.5625rem] font-semibold uppercase tracking-[0.26em] text-pearl-faint">
                        Estimated investment
                      </p>
                      <p className="mt-1.5 font-display text-[2rem] leading-none tabular-nums text-champagne-300">
                        {result.price}
                      </p>
                      <p className="mt-2 text-[0.75rem] text-pearl-mute">
                        Approx. {result.duration}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => onBook(result.service)}
                      className="u-btn-gold"
                    >
                      Book this experience
                      <ArrowUpRight size={14} strokeWidth={2} />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SegmentButton({ active, onClick, children, layoutId }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`relative rounded-full border px-4 py-2.5 text-[0.75rem] font-medium tracking-wide transition-colors duration-250 ${
        active
          ? 'border-champagne-500/60 text-obsidian-950'
          : 'border-white/10 text-pearl-dim hover:border-champagne-500/35 hover:text-pearl'
      }`}
    >
      {active && (
        <motion.span
          layoutId={layoutId}
          className="absolute inset-0 rounded-full bg-gradient-to-br from-champagne-200 via-champagne-400 to-champagne-600"
          transition={{ type: 'spring', stiffness: 400, damping: 34, mass: 0.7 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  )
}

/** Recommendation engine — mirrors the original business logic exactly. */
function resolve(preference, goal) {
  if (goal === 'bridal') return MATCHER_RESULTS.bridal
  if (goal === 'color') return MATCHER_RESULTS.color
  if (goal === 'spa') return MATCHER_RESULTS.spa
  if (preference === 'men') return MATCHER_RESULTS.men
  return MATCHER_RESULTS.default
}
