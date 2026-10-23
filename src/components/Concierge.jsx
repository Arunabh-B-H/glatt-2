import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, MessageCircle } from 'lucide-react'
import {
  BRAND,
  BOT_QUICK_PROMPTS,
  BOT_GREETING,
  getBotReply
} from '../data/salon'
import { EASE } from '../lib/utils'
import BrandMark from './ui/BrandMark'

/* ==========================================================================
   THE CONCIERGE
   A panel that opens from the bottom-right. Messages enter with a spring;
   the bot "thinks" with a three-dot indicator before answering.
   ========================================================================== */

export default function Concierge({ onBook }) {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [armed, setArmed] = useState(false)
  const [messages, setMessages] = useState([
    { id: 'greet', sender: 'bot', time: 'Just now', ...BOT_GREETING }
  ])
  const endRef = useRef(null)
  const timerRef = useRef(null)

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing, open])

  useEffect(() => () => clearTimeout(timerRef.current), [])

  /* The trigger stays out of the hero: at rest on a phone the hero's
     trust ledger reaches the bottom-right corner, and a fixed dock would
     sit on top of the hours. It arms itself once the reader has moved
     past the fold, where the hero's own CTA has already done its job. */
  useEffect(() => {
    const onScroll = () => setArmed(window.scrollY > 420)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const send = (text) => {
    const msg = (text ?? input).trim()
    if (!msg) return

    setMessages((m) => [
      ...m,
      { id: `u${Date.now()}`, sender: 'user', text: msg, time: 'Just now' }
    ])
    setInput('')
    setTyping(true)

    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      const reply = getBotReply(msg)
      setMessages((m) => [
        ...m,
        {
          id: `b${Date.now()}`,
          sender: 'bot',
          text: reply.text,
          actions: reply.actions,
          time: 'Just now'
        }
      ])
      setTyping(false)
    }, 620)
  }

  const act = (action) => {
    switch (action) {
      case 'book_bridal':
        return onBook('Bridal Glamour & Muhurtham Artistry')
      case 'book_haircut':
        return onBook('Signature Haircut & Styling')
      case 'book_keratin':
        return onBook('Keratin Smoothing & Hair Botox')
      case 'book_balayage':
        return onBook('Balayage & Dimensional Color')
      case 'book_spa':
        return onBook('Moroccan Argan Hair Spa Ritual')
      case 'book_general':
        return onBook('Signature Haircut & Styling')
      case 'whatsapp_bridal':
        return window.open(
          `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(
            'Hi The Glatt Salon, I am inquiring about Bridal Muhurtham Packages'
          )}`,
          '_blank',
          'noopener,noreferrer'
        )
      case 'whatsapp_general':
        return window.open(
          `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(
            'Hi The Glatt Salon, I would like to book an appointment'
          )}`,
          '_blank',
          'noopener,noreferrer'
        )
      case 'maps':
        return window.open(BRAND.maps, '_blank', 'noopener,noreferrer')
      case 'call':
        return (window.location.href = BRAND.phoneHref)
      case 'scroll_services':
        setOpen(false)
        return window.setTimeout(() => {
          const el = document.getElementById('services')
          el?.scrollIntoView({ behavior: 'smooth' })
        }, 200)
      default:
        return undefined
    }
  }

  return (
    <>
      {/* Trigger — icon only, with the label revealed on hover so it never
          sits permanently over the page's bottom-right content. It stays
          out of the hero entirely and arms itself past the fold. */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        className="group fixed bottom-4 right-4 z-[60] sm:bottom-6 sm:right-6"
        aria-label={open ? 'Close Glatt Concierge' : 'Open Glatt Concierge'}
        aria-expanded={open}
        initial={false}
        animate={armed || open ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 12, scale: 0.9 }}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: 0.24, ease: EASE.swift }}
        style={{ pointerEvents: armed || open ? 'auto' : 'none' }}
      >
        <span
          className="pointer-events-none absolute bottom-full right-0 mb-3 whitespace-nowrap rounded-full border border-white/10 bg-obsidian-900/90 px-3 py-1.5 text-[0.625rem] font-semibold uppercase tracking-[0.26em] text-pearl-dim opacity-0 backdrop-blur-xl transition-opacity duration-250 group-hover:opacity-100 sm:opacity-0"
        >
          Concierge
        </span>
        <span className="relative flex size-12 items-center justify-center rounded-full border border-champagne-500/30 bg-obsidian-900/90 backdrop-blur-xl transition-colors duration-300 group-hover:border-champagne-500/70 sm:size-14">
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-champagne-500/12 blur-lg"
            style={{ opacity: open ? 0 : 1 }}
          />
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="x"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.22, ease: EASE.swift }}
                className="relative text-pearl"
              >
                <X size={19} />
              </motion.span>
            ) : (
              <motion.span
                key="chat"
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.7, opacity: 0 }}
                transition={{ duration: 0.22, ease: EASE.swift }}
                className="relative text-champagne-300"
              >
                <MessageCircle size={19} />
              </motion.span>
            )}
          </AnimatePresence>

          {!open && (
            <span
              aria-hidden="true"
              className="absolute -right-0.5 -top-0.5 size-3 rounded-full border-2 border-obsidian-950 bg-champagne-300 animate-pulse-dot"
            />
          )}
        </span>
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.aside
            className="fixed bottom-24 right-4 z-[59] flex h-[min(34rem,72vh)] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-champagne-500/20 bg-obsidian-900/95 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.95)] backdrop-blur-2xl"
            initial={{ opacity: 0, y: 26, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 26, scale: 0.96 }}
            transition={{ duration: 0.3, ease: EASE.luxe }}
            role="dialog"
            aria-label="Glatt Concierge"
          >
            {/* Header */}
            <header className="flex items-center gap-3 border-b border-white/[0.08] bg-white/[0.02] px-5 py-4">
              <span className="relative flex size-10 shrink-0 items-center justify-center rounded-full border border-champagne-500/25 bg-champagne-500/[0.07]">
                <BrandMark variant="emblem" className="size-5" />
                <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-obsidian-900 bg-champagne-300" />
              </span>
              <div className="min-w-0">
                <h3 className="font-display text-[0.9375rem] text-pearl">
                  Glatt Concierge
                </h3>
                <p className="truncate text-[0.6875rem] text-pearl-mute">
                  Virtual beauty &amp; grooming guide
                </p>
              </div>
            </header>

            {/* Messages */}
            <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 12, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.32, ease: EASE.luxe }}
                  className={m.sender === 'user' ? 'flex justify-end' : ''}
                >
                  <div
                    className={`max-w-[86%] rounded-2xl px-4 py-3 text-[0.8125rem] leading-[1.7] ${
                      m.sender === 'user'
                        ? 'rounded-br-md bg-champagne-500/15 text-pearl'
                        : 'rounded-bl-md border border-white/[0.08] bg-white/[0.035] text-pearl-dim'
                    }`}
                  >
                    <p>{m.text}</p>

                    {m.actions?.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {m.actions.map((a, i) => (
                          <button
                            key={i}
                            onClick={() => (a.query ? send(a.query) : act(a.action))}
                            className="rounded-full border border-champagne-500/32 px-2.5 py-1 text-[0.6875rem] font-medium text-champagne-200 transition-colors duration-250 hover:border-champagne-500/70 hover:bg-champagne-500/10"
                          >
                            {a.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {typing && (
                <div className="flex gap-1 rounded-2xl rounded-bl-md border border-white/[0.08] bg-white/[0.035] px-4 py-3.5 w-fit">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="size-1.5 rounded-full bg-champagne-400 animate-typing"
                      style={{ animationDelay: `${i * 0.16}s` }}
                    />
                  ))}
                </div>
              )}

              <div ref={endRef} />
            </div>

            {/* Quick prompts */}
            <div className="flex gap-1.5 overflow-x-auto border-t border-white/[0.06] px-4 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {BOT_QUICK_PROMPTS.map((p, i) => (
                <button
                  key={i}
                  onClick={() => send(p.query)}
                  className="shrink-0 whitespace-nowrap rounded-full border border-white/10 px-3 py-1.5 text-[0.6875rem] text-pearl-dim transition-colors duration-250 hover:border-champagne-500/40 hover:text-pearl"
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Composer */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                send()
              }}
              className="flex items-center gap-2 border-t border-white/[0.08] px-4 py-3"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about rates, bridal, timings…"
                className="min-w-0 flex-1 bg-transparent text-[0.8125rem] text-pearl placeholder:text-pearl-faint focus:outline-none"
                aria-label="Message"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="flex size-9 shrink-0 items-center justify-center rounded-full bg-champagne-500 text-obsidian-950 transition-all duration-250 hover:bg-champagne-400 disabled:opacity-30"
                aria-label="Send message"
              >
                <Send size={14} />
              </button>
            </form>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
