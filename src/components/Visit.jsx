import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MapPin,
  Phone,
  Clock,
  Navigation,
  CheckCircle2,
  Compass
} from 'lucide-react'
import { BRAND, SERVICES, TEAM, TIME_SLOTS } from '../data/salon'
import { EASE } from '../lib/utils'
import { WhatsAppIcon } from './ui/BrandIcons'

/* ==========================================================================
   VISIT & RESERVE — the studio directory beside the appointment desk.
   ========================================================================== */

export default function Visit({
  form,
  setForm,
  onSubmit,
  submitted,
  onWhatsApp
}) {
  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  return (
    <section id="visit" className="relative py-24 md:py-32">
      <div className="u-container">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16 xl:gap-24">
          {/* ── Directory ── */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, ease: EASE.luxe }}
          >
            <h2 className="u-title text-balance">
              Find the studio
              <br />
              <em className="italic text-champagne-300">on Keston Road</em>
            </h2>
            <p className="mt-5 max-w-lg text-[0.9375rem] leading-[1.8] text-pearl-dim/90 text-pretty">
              Conveniently situated in Kanaka Nagar, Kowdiar, Thiruvananthapuram.
              Ample parking, tranquil air-conditioned private styling zones, and
              welcoming hospitality.
            </p>

            <dl className="mt-10 divide-y divide-white/[0.08] border-y border-white/[0.08]">
              <Row icon={MapPin} label="Address">
                {BRAND.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
                <a
                  href={BRAND.maps}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-champagne-300 transition-colors duration-250 hover:text-champagne-200"
                >
                  <Navigation size={12} strokeWidth={1.8} />
                  Get driving directions
                </a>
              </Row>

              <Row icon={Clock} label="Hours">
                <span className="block">{BRAND.hours}</span>
                <span className="mt-1.5 block text-[0.8125rem] text-champagne-400">
                  {BRAND.openDays}
                </span>
              </Row>

              <Row icon={Phone} label="Direct">
                <a
                  href={BRAND.phoneHref}
                  className="block transition-colors duration-250 hover:text-champagne-300"
                >
                  {BRAND.phone}
                </a>
                <a
                  href={BRAND.landlineHref}
                  className="mt-1 block transition-colors duration-250 hover:text-champagne-300"
                >
                  {BRAND.landline}
                </a>
                <a
                  href={BRAND.tour}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-champagne-300 transition-colors duration-250 hover:text-champagne-200"
                >
                  <Compass size={12} strokeWidth={1.8} />
                  360° virtual tour
                </a>
              </Row>
            </dl>
          </motion.div>

          {/* ── Appointment desk ── */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, delay: 0.14, ease: EASE.luxe }}
          >
            <div className="u-glass-deep u-grain relative overflow-hidden rounded-[1.75rem] p-7 md:p-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-20 -top-24 size-80 rounded-full"
                style={{
                  background:
                    'radial-gradient(circle, rgba(212,175,55,0.11) 0%, transparent 66%)',
                  filter: 'blur(26px)'
                }}
              />

              <div className="relative">
                <h3 className="font-display text-[1.75rem] leading-tight text-pearl">
                  Reserve your appointment
                </h3>
                <p className="mt-2 text-[0.8125rem] text-pearl-mute">
                  Choose a treatment and a preferred time. We will confirm by
                  phone.
                </p>

                <form onSubmit={onSubmit} className="mt-8 space-y-5">
                  <Field label="Treatment">
                    <select
                      value={form.service}
                      onChange={update('service')}
                      className="u-field cursor-pointer"
                    >
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.title} — {s.price}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Artist">
                    <select
                      value={form.stylist}
                      onChange={update('stylist')}
                      className="u-field cursor-pointer"
                    >
                      <option value="Any Available Stylist">
                        Any Available Master Stylist
                      </option>
                      {TEAM.map((t) => (
                        <option key={t.name} value={t.name}>
                          {t.name} — {t.role}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Preferred date">
                      <input
                        type="date"
                        value={form.date}
                        onChange={update('date')}
                        required
                        className="u-field"
                      />
                    </Field>
                    <Field label="Time slot">
                      <select
                        value={form.time}
                        onChange={update('time')}
                        className="u-field cursor-pointer"
                      >
                        {TIME_SLOTS.map((s) => (
                          <option key={s.value} value={s.value}>
                            {s.label} · {s.hint}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Your name">
                      <input
                        type="text"
                        placeholder="Full name"
                        value={form.name}
                        onChange={update('name')}
                        required
                        className="u-field"
                      />
                    </Field>
                    <Field label="Phone">
                      <input
                        type="tel"
                        placeholder="98959 70069"
                        value={form.phone}
                        onChange={update('phone')}
                        required
                        className="u-field"
                      />
                    </Field>
                  </div>

                  <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                    <button
                      type="button"
                      onClick={onWhatsApp}
                      className="u-btn-ghost flex-1"
                    >
                      <WhatsAppIcon size={15} />
                      Send via WhatsApp
                    </button>
                    <button type="submit" className="u-btn-gold flex-1">
                      Request callback
                    </button>
                  </div>

                  <AnimatePresence>
                    {submitted && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE.luxe }}
                        className="flex items-start gap-3 rounded-xl border border-champagne-500/30 bg-champagne-500/[0.08] p-4"
                      >
                        <CheckCircle2
                          size={17}
                          className="mt-0.5 shrink-0 text-champagne-300"
                        />
                        <p className="text-[0.8125rem] leading-relaxed text-pearl-dim">
                          Thank you — your request is logged. Our reception desk
                          will call {form.phone || 'you'} shortly to confirm your
                          slot.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Row({ icon: Icon, label, children }) {
  return (
    <div className="flex gap-5 py-6">
      <dt className="sr-only">{label}</dt>
      <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full border border-champagne-500/22 bg-champagne-500/[0.06] text-champagne-300">
        <Icon size={15} strokeWidth={1.6} />
      </span>
      <dd className="min-w-0 text-[0.9375rem] leading-[1.75] text-pearl-dim">
        <span className="mb-1.5 block text-[0.625rem] font-semibold uppercase tracking-[0.26em] text-pearl-mute">
          {label}
        </span>
        {children}
      </dd>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[0.625rem] font-semibold uppercase tracking-[0.24em] text-pearl-mute">
        {label}
      </span>
      {children}
    </label>
  )
}
