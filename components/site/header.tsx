"use client"

import { useState } from "react"
import Link from "next/link"
import { useLenis } from "lenis/react"
import { ArrowRight, Menu, X } from "lucide-react"
import { MarketingButton } from "@/components/ui/marketing-button"
import { BrandLogo } from "@/components/site/brand-logo"
import { navItems, navCta, site } from "@/content/site"
import { cn } from "@/lib/utils"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useLenis((lenis) => {
    const next = lenis.scroll > 8
    setIsScrolled((prev) => (prev === next ? prev : next))
  })

  const solid = isScrolled || isMenuOpen

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300",
        solid
          ? "border-b border-agua/30 bg-background"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-12 items-center justify-between md:grid md:h-[var(--site-header-height)] md:grid-cols-[1fr_auto_1fr] md:items-center">
          <BrandLogo priority className="justify-self-start [&_img]:h-6 [&_img]:md:h-7" />

          <nav className="hidden items-center gap-6 justify-self-center md:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="font-sans text-base font-medium text-muted-on-dark transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden justify-self-end md:block">
            <MarketingButton
              size="sm"
              nativeButton={false}
              className="h-8 px-3.5 text-xs"
              render={
                <a href={site.appUrl} target="_blank" rel="noopener noreferrer">
                  {navCta}
                  <ArrowRight className="ml-1.5 size-3.5" />
                </a>
              }
            />
          </div>

          <button
            type="button"
            className="p-1.5 text-on-dark md:hidden"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        <div
          className={cn(
            "grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out md:hidden",
            isMenuOpen ? "grid-rows-[1fr] border-t border-agua/30" : "grid-rows-[0fr]",
          )}
        >
          <div className="min-h-0">
            <nav className="flex flex-col gap-2 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="py-2 font-sans text-base font-medium text-muted-on-dark transition-colors hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <MarketingButton
                size="sm"
                nativeButton={false}
                className="mt-2 h-9 w-full text-sm"
                render={
                  <a href={site.appUrl} target="_blank" rel="noopener noreferrer">
                    {navCta}
                    <ArrowRight className="ml-1.5 size-3.5" />
                  </a>
                }
              />
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
