"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BrandLogo } from "@/components/site/brand-logo"
import { navItems, site } from "@/content/site"
import { cn } from "@/lib/utils"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-agua/30 bg-background/90 backdrop-blur-md">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-20">
          <BrandLogo priority />

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="font-sans text-sm font-medium text-muted-on-dark transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button
              size="lg"
              nativeButton={false}
              className="h-11 bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary/85"
              render={
                <a href={site.appUrl} target="_blank" rel="noopener noreferrer">
                  Acceso a la plataforma
                  <ArrowRight className="ml-1.5 size-4" />
                </a>
              }
            />
          </div>

          <button
            type="button"
            className="p-2 text-on-dark md:hidden"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
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
              <Button
                size="lg"
                nativeButton={false}
                className="mt-2 h-11 w-full bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary/85"
                render={
                  <a href={site.appUrl} target="_blank" rel="noopener noreferrer">
                    Acceso a la plataforma
                    <ArrowRight className="ml-1.5 size-4" />
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
