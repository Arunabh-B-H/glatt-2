import React, { useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Phone, CheckCircle2 } from 'lucide-react'
import { BRAND, SERVICES, TEAM, TIME_SLOTS } from '../data/salon'
import { EASE } from '../lib/utils'
import { WhatsAppIcon } from './ui/BrandIcons'

/* ==========================================================================
   APPOINTMENT DIALOG
   A focus-trapped dialog for a task that genuinely needs protected focus:
   committing to a date, an artist, and a phone number.
   ========================================================================== */

export default function AppointmentDialog({
  open,
  onClose,
  form,
  setForm,
  onSubmit,
  submitted,
  onWhatsApp
}) {
  const panelRef = useRef(null)
  const firstFieldRef = useRef(null)

  const update = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  /* Move focus into the dialog on open, and trap Tab inside it. */
  useEffect(() => {
    if (!open) return
    const t = window.setTimeout(() => firstFieldRef.current?.focus(), 120)

    const onKey = (e) => {
      if (e.key !== 'Tab' || !panelRef.current) return
      const focusables = panelRef.current.querySelectorAll(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      if (!focusables.length) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKey)
    return () => {
      window.clearTimeout(t)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.24, ease: EASE.swift }}
        >
          <div
            className="absolute inset-0 bg-obsidian-950/88 backdrop-blur-xl"
            onClick={onClose}
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Book your appointment"
            initial={{ opacity: 0, y: 26, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.97 }}
            transition={{ duration: 0.34, ease: EASE.luxe }}
            className="u-glass-deep u-grain relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[1.5rem] p-7 sm:p-9"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-28 size-72 rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(212,175,55,0.14) 0%, transparent 66%)',
                filter: 'blur(26px)'
              }}
            />

            <button
              onClick={onClose}
              className="absolute right-5 top-5 z-10 flex size-9 items-center justify-center rounded-full border border-white/12 text-pearl-dim transition-colors duration-250 hover:border-champagne-500/55 hover:text-champagne-200"
              aria-label="Close dialog"
            >
              <X size={16} />
            </button>

            <div className="relative">
              <h2 className="font-display text-[1.75rem] leading-tight text-pearl">
                Book your appointment
              </h2>
              <p className="mt-2 text-[0.8125rem] text-pearl-mute">
                {BRAND.addressLines[0]}, {BRAND.city}
              </p>

              <form onSubmit={onSubmit} className="mt-8 space-y-4">
                <Field label="Treatment">
                  <select
                    ref={firstFieldRef}
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

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Date">
                    <input
                      type="date"
                      value={form.date}
                      onChange={update('date')}
                      required
                      className="u-field"
                    />
                  </Field>
                  <Field label="Time">
                    <select
                      value={form.time}
                      onChange={update('time')}
                      className="u-field cursor-pointer"
                    >
                      {TIME_SLOTS.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
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

                <div className="flex flex-col gap-2.5 pt-2 sm:flex-row">
                  <button
                    type="button"
                    onClick={onWhatsApp}
                    className="u-btn-ghost flex-1"
                  >
                    <WhatsAppIcon size={15} />
                    WhatsApp
                  </button>
                  <a
                    href={BRAND.phoneHref}
                    className="u-btn-ghost flex-1"
                  >
                    <Phone size={14} />
                    Call desk
                  </a>
                </div>

                <button type="submit" className="u-btn-gold w-full">
                  Submit request
                </button>

                <AnimatePresence>
                  {submitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.32, ease: EASE.luxe }}
                      className="flex items-start gap-3 rounded-xl border border-champagne-500/30 bg-champagne-500/[0.08] p-4"
                    >
                      <CheckCircle2
                        size={17}
                        className="mt-0.5 shrink-0 text-champagne-300"
                      />
                      <p className="text-[0.8125rem] leading-relaxed text-pearl-dim">
                        Request logged. We will call {form.phone || 'you'}
                        shortly to confirm your time slot.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
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
