import Image from "next/image"
import { Lock } from "lucide-react"
import { brand } from "@/content/site"
import { cn } from "@/lib/utils"

interface BrowserFrameProps {
  /** URL shown in the address bar */
  url?: string
  /** Screenshot to display. When omitted, a branded placeholder is shown. */
  src?: string
  alt?: string
  /** Intrinsic screenshot size — drives the viewport aspect-ratio */
  width?: number
  height?: number
  /** Label shown inside the placeholder while there is no screenshot */
  screen?: string
  /** Render a monitor stand beneath the window */
  stand?: boolean
  /** Fallback aspect for placeholder mode (no `src`) */
  aspect?: string
  priority?: boolean
  className?: string
}

export function BrowserFrame({
  url = "app.syntia.es",
  src,
  alt,
  width = 1920,
  height = 1080,
  screen = "Plataforma Syntia",
  stand = false,
  aspect = "aspect-video",
  priority = false,
  className,
}: BrowserFrameProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="overflow-hidden rounded-xl border border-agua/40 bg-card shadow-2xl shadow-black/40">
        <div className="flex items-center gap-3 border-b border-agua/25 bg-surface-dark/70 px-4 py-2.5">
          <div className="flex gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-agua/70" />
            <span className="size-2.5 rounded-full bg-agua/45" />
            <span className="size-2.5 rounded-full bg-agua/25" />
          </div>
          <div className="flex flex-1 justify-center">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-background/70 px-3 py-1 font-sans text-xs font-medium text-muted-on-dark">
              <Lock className="size-3 text-primary" aria-hidden />
              {url}
            </span>
          </div>
          <div className="w-[42px]" aria-hidden />
        </div>

        {src ? (
          <div
            className="relative w-full bg-surface-dark"
            style={{ aspectRatio: `${width} / ${height}` }}
          >
            <Image
              src={src}
              alt={alt ?? screen}
              width={width}
              height={height}
              priority={priority}
              sizes="(min-width: 1024px) 960px, 100vw"
              className="h-full w-full object-contain object-top"
            />
          </div>
        ) : (
          <div className={cn("relative w-full bg-surface-dark", aspect)}>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[radial-gradient(ellipse_80%_60%_at_50%_35%,rgba(1,222,162,0.06),transparent_70%)]">
              <Image
                src={brand.isotipoSrc || "/placeholder.svg"}
                alt=""
                width={52}
                height={52}
                className="opacity-90"
              />
              <p className="font-sans text-sm font-medium text-muted-on-dark">{screen}</p>
            </div>
          </div>
        )}
      </div>

      {stand && (
        <div className="mx-auto flex flex-col items-center" aria-hidden>
          <div className="h-6 w-24 rounded-b-md bg-gradient-to-b from-agua/25 to-transparent" />
          <div className="h-1.5 w-40 rounded-full bg-agua/30" />
        </div>
      )}
    </div>
  )
}
