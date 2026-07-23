import Image from "next/image"
import Link from "next/link"
import { brand } from "@/content/site"
import { cn } from "@/lib/utils"

type BrandLogoProps = {
  className?: string
  priority?: boolean
}

export function BrandLogo({ className, priority = false }: BrandLogoProps) {
  return (
    <Link
      href="/"
      aria-label={`${brand.wordmark} — inicio`}
      className={cn("inline-flex shrink-0 items-center", className)}
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
