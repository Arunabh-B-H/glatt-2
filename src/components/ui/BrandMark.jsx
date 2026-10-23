import React from 'react'

/* ==========================================================================
   BRAND MARK
   The house emblem and wordmark, re-tinted to true monochrome champagne.

   The source PNGs carry the original magenta and cream artwork. Masking a
   gradient-filled element by the PNG's alpha channel lets the shape be
   filled with the house gold instead — so the artwork survives intact while
   the palette is fully purged of the old brand colours.
   ========================================================================== */

/**
 * @param {'emblem'|'full'} variant  'emblem' = the "g" monogram,
 *                                    'full'   = the full "The Glatt" lockup.
 */
export default function BrandMark({
  variant = 'emblem',
  className = '',
  style
}) {
  return (
    <span
      aria-hidden="true"
      className={`u-mark-gold u-mark-gold--${variant} ${className}`}
      style={style}
    />
  )
}
