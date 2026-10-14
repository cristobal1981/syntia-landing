"use client"

import { ReactLenis, useLenis } from "lenis/react"
import { useEffect, type ReactNode } from "react"
import "lenis/dist/lenis.css"

/** Offset bajo el header fijo al hacer scroll a anclas. */
export const ANCHOR_OFFSET = -72

function ReducedMotionGuard() {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return

    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => {
      if (media.matches) lenis.stop()
      else lenis.start()
    }

    sync()
    media.addEventListener("change", sync)
    return () => media.removeEventListener("change", sync)
  }, [lenis])

  return null
}

/** Al cargar / refrescar con #hash, Lenis no scrollea solo: lo hacemos aquí. */
function HashScrollOnLoad() {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return

    const hash = window.location.hash
    if (!hash || hash.length < 2) return

    const id = decodeURIComponent(hash.slice(1))
    const el = document.getElementById(id)
    if (!el) return

    const frame = window.requestAnimationFrame(() => {
      lenis.scrollTo(el, { offset: ANCHOR_OFFSET, immediate: false })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [lenis])

  return null
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        lerp: 0.09,
        duration: 1.2,
        smoothWheel: true,
        anchors: { offset: ANCHOR_OFFSET },
      }}
    >
      <ReducedMotionGuard />
      <HashScrollOnLoad />
      {children}
    </ReactLenis>
  )
}
