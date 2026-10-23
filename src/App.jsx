import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'

import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Services from './components/Services'
import Matcher from './components/Matcher'
import Heritage from './components/Heritage'
import CinematicStrip from './components/CinematicStrip'
import Gallery from './components/Gallery'
import Testimonials from './components/Testimonials'
import Team from './components/Team'
import Visit from './components/Visit'
import Footer from './components/Footer'
import Concierge from './components/Concierge'
import SocialRail from './components/SocialRail'
import Preloader from './components/Preloader'
import AppointmentDialog from './components/AppointmentDialog'

import { useLenis, scrollToId } from './lib/useLenis'
import { EASE } from './lib/utils'
import { buildWhatsAppLink } from './data/salon'

const INITIAL_FORM = {
  service: 'Signature Haircut & Styling',
  stylist: 'Any Available Stylist',
  date: '',
  time: '11:00 AM',
  name: '',
  phone: ''
}

export default function App() {
  const [preloading, setPreloading] = useState(true)
  const [revealed, setRevealed] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [form, setForm] = useState(INITIAL_FORM)
  const [submitted, setSubmitted] = useState(false)

  const { scrolled } = useLenis({ paused: preloading })

  /* ── Open the reservation desk, optionally pre-selecting a treatment ── */
  const openBooking = useCallback((service) => {
    setForm((f) => ({
      ...f,
      service: typeof service === 'string' ? service : service?.title ?? f.service
    }))
    setSubmitted(false)
    setDialogOpen(true)
  }, [])

  const openWithStylist = useCallback((stylist) => {
    setForm((f) => ({ ...f, stylist }))
    setSubmitted(false)
    setDialogOpen(true)
  }, [])

  const closeBooking = useCallback(() => setDialogOpen(false), [])

  const submitBooking = useCallback((e) => {
    e.preventDefault()
    setSubmitted(true)
  }, [])

  const sendToWhatsApp = useCallback(() => {
    window.open(buildWhatsAppLink(form), '_blank', 'noopener,noreferrer')
  }, [form])

  /* ── Anchor interception: Lenis handles the scroll, we close the drawer ── */
  useEffect(() => {
    const onClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]')
      if (!anchor) return
      const href = anchor.getAttribute('href')
      if (href && href.length > 1) {
        const target = document.querySelector(href)
        if (target) {
          e.preventDefault()
          scrollToId(href.slice(1), -20)
        }
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  /* ── Lock the page behind the appointment dialog ── */
  useEffect(() => {
    if (!dialogOpen) return
    const lenis = window.__lenis
    lenis?.stop()
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && closeBooking()
    window.addEventListener('keydown', onKey)
    return () => {
      lenis?.start()
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [dialogOpen, closeBooking])

  return (
    <LayoutGroup>
      <div className="relative min-h-screen bg-obsidian-950">
        {/* Preloader */}
        <AnimatePresence>
          {preloading && (
            <Preloader
              onComplete={() => {
                setRevealed(true)
              }}
              onDone={() => {
                setPreloading(false)
                document.body.style.overflow = ''
                window.__lenis?.start()
              }}
            />
          )}
        </AnimatePresence>

        {/* Page — held back until the preloader hands over */}
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: revealed ? 1 : 0 }}
          transition={{ duration: 0.6, ease: EASE.luxe, delay: 0.15 }}
        >
          <SocialRail />
          <Nav scrolled={scrolled} onBook={() => openBooking()} />

          <main>
            <Hero revealed={revealed} onBook={() => openBooking()} />

            <div className="border-y border-white/[0.06] bg-obsidian-900/40">
              <Marquee />
            </div>

            <Services onBook={openBooking} />
            <Matcher onBook={openBooking} />
            <Heritage onBook={() => openBooking()} />
            <CinematicStrip onBook={openBooking} />
            <Gallery />
            <Testimonials />
            <Team onBookWith={openWithStylist} />
            <Visit
              form={form}
              setForm={setForm}
              onSubmit={submitBooking}
              submitted={submitted}
              onWhatsApp={sendToWhatsApp}
            />
          </main>

          <Footer onBook={() => openBooking()} />
        </motion.div>

        {/* Floating surfaces */}
        <Concierge onBook={openBooking} />

        <AppointmentDialog
          open={dialogOpen}
          onClose={closeBooking}
          form={form}
          setForm={setForm}
          onSubmit={submitBooking}
          submitted={submitted}
          onWhatsApp={sendToWhatsApp}
        />
      </div>
    </LayoutGroup>
  )
}
