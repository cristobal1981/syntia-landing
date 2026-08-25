import Image from "next/image"
import { site } from "@/content/site"
import { cn } from "@/lib/utils"

type ProductOfProps = {
  className?: string
  /** Text color class for the "Un producto de" label */
  labelClassName?: string
  /** Override logo asset (e.g. light variant on brisa) */
  logoSrc?: string
}

export function ProductOf({
  className,
  labelClassName = "text-primary",
  logoSrc = site.advisorLogoSrc,
}: ProductOfProps) {
  return (
    <a
      href={site.advisorUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-1 transition-opacity hover:opacity-90",
        className,
      )}
    >
      <span className={cn("font-sans text-sm font-semibold tracking-wide", labelClassName)}>
        Un producto de
      </span>
      <Image
        src={logoSrc}
        alt="tenaasesores"
        width={site.advisorLogoWidth}
        height={site.advisorLogoHeight}
        className="h-7 w-auto object-contain md:h-8"
        style={{ width: "auto" }}
      />
    </a>
  )
}
