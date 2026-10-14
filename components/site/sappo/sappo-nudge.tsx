"use client"

import { useEffect, useRef, useState } from "react"
import { Sappo } from "@/components/site/sappo/sappo"
import { sappo } from "@/content/site"
import { cn } from "@/lib/utils"

const croaks = sappo.onboardingCroaks
const ROTATE_MS = 6500

/**
 * Sappo pinchable (hop + croaks) como en las páginas de error de la app.
 * Bocadillo blanco; el mensaje rota solo y avanza al pulsar.
 */
export function SappoNudge({ className }: { className?: string }) {
  const hopRef = useRef<HTMLSpanElement>(null)
  const nextIndex = useRef(1)
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const line = croaks[index] ?? croaks[0]

  const show = (i: number) => {
    setIndex(i % croaks.length)
  }

  const poke = () => {
    const el = hopRef.current
    if (el) {
      el.classList.remove("sappo-hop")
      void el.offsetWidth
      el.classList.add("sappo-hop")
    }
    setPaused(true)
    show(nextIndex.current)
    nextIndex.current += 1
  }

  useEffect(() => {
    if (paused) return
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (media.matches) return
    const id = window.setInterval(() => {
      setIndex((i) => {
        const next = (i + 1) % croaks.length
        nextIndex.current = next + 1
        return next
      })
    }, ROTATE_MS)
    return () => window.clearInterval(id)
  }, [paused])

  return (
    <aside
      className={cn(
        "mx-auto flex max-w-lg items-center justify-center gap-3 text-left sm:gap-4",
        className,
      )}
    >
      <span ref={hopRef} className="sappo-hop shrink-0">
        <button
          type="button"
          onClick={poke}
          aria-label="Sappo. Púlsalo para otra frase"
          className="relative block cursor-pointer rounded-[1.5rem] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-surface-dark"
        >
          <Sappo mood="idle" className="block h-14 w-auto sm:h-16" />
        </button>
      </span>

      <p
        key={line}
        role="status"
        aria-live="polite"
        className="sappo-bubble relative max-w-[22rem] rounded-2xl border border-black/5 bg-white px-3.5 py-2.5 font-sans text-sm leading-snug font-medium text-surface-dark shadow-sm sm:px-4 sm:py-3"
      >
        <span
          aria-hidden
          className="absolute top-1/2 -left-1.5 size-3 -translate-y-1/2 rotate-45 border-b border-l border-black/5 bg-white"
        />
        {line}
      </p>
    </aside>
  )
}
