import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { lockScroll } from '../../lib/smoothScroll'

// Small thumbnail that opens the full photo in an overlay. Rendered through a
// portal (Reveal's transform would break position: fixed) and kept below the
// custom cursor's z-index so the cursor stays visible over it.
export default function PhotoZoom({ src, full = src, alt, openLabel, closeLabel, className }) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef(null)
  const closeRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const trigger = triggerRef.current
    lockScroll(true)
    closeRef.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape' || e.key === 'Tab') {
        e.preventDefault()
        if (e.key === 'Escape') setOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      lockScroll(false)
      trigger?.focus()
    }
  }, [open])

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`${openLabel}: ${alt}`}
        className={`group relative shrink-0 overflow-hidden rounded-lg border border-white/10 transition-colors hover:border-orange-bright/60 focus-visible:border-orange-bright ${className}`}
      >
        <img
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
          className="block h-full w-auto transition-transform duration-300 group-hover:scale-105"
        />
      </button>

      {open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[75] flex items-center justify-center bg-black/90 p-4 md:p-10 backdrop-blur-sm"
          >
            <img
              src={full}
              alt={alt}
              className="max-h-full max-w-full rounded-xl border border-white/10 object-contain shadow-2xl"
            />
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 md:top-6 md:right-6 rounded-full border border-white/20 bg-black/60 px-4 py-2 text-sm text-white/85 hover:border-orange-bright hover:text-white"
            >
              {closeLabel} ✕
            </button>
          </div>,
          document.body,
        )}
    </>
  )
}
