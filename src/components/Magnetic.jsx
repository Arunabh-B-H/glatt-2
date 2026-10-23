import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'

/* ==========================================================================
   MAGNETIC — a pointer-following micro-interaction.
   The child is pulled a fraction of its distance from the pointer, then
   settles back on leave. Subtle enough to feel intentional, not playful.
   ========================================================================== */

export default function Magnetic({ children, strength = 0.3, className = '' }) {
  const ref = useRef(null)
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2
    setX((e.clientX - cx) * strength)
    setY((e.clientY - cy) * strength)
  }

  const onLeave = () => {
    setX(0)
    setY(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        x,
        y,
        transition: 'transform 0.24s cubic-bezier(0.23, 1, 0.32, 1)'
      }}
    >
      {children}
    </motion.div>
  )
}