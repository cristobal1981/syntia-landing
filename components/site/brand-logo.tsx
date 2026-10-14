"use client"

import Image from "next/image"
import Link from "next/link"
import { useLenis } from "lenis/react"
import { brand } from "@/content/site"
import { cn } from "@/lib/utils"

type BrandLogoProps = {
  className?: string
  priority?: boolean
}

export function BrandLogo({ className, priority = false }: BrandLogoProps) {
  const lenis = useLenis()

  return (
    <Link
      href="/"
      aria-label={`${brand.wordmark} — inicio`}
      className={cn("inline-flex shrink-0 items-center", className)}
      onClick={(event) => {
        // Ya en home (con o sin hash): Next solo limpia la URL; hay que scrollear al top.
        if (window.location.pathname !== "/") return
        event.preventDefault()
        if (window.location.hash) {
          window.history.replaceState(null, "", "/")
        }
        lenis?.scrollTo(0, { immediate: false })
      }}
    >
      <Image
        src={brand.logoSrc || "/placeholder.svg"}
        alt={brand.wordmark}
        width={brand.logoWidth}
        height={brand.logoHeight}
        priority={priority}
        className="h-8 w-auto object-contain md:h-9"
        style={{ width: "auto" }}
      />
    </Link>
  )
}
