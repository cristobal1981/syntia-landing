"use client"

import { ReactLenis, useLenis } from "lenis/react"
import { useEffect, type ReactNode } from "react"
import "lenis/dist/lenis.css"

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

export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        lerp: 0.09,
        duration: 1.2,
        smoothWheel: true,
        anchors: true,
      }}
    >
      <ReducedMotionGuard />
      {children}
    </ReactLenis>
  )
}
