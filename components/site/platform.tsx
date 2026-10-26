"use client"

import { useEffect, useState } from "react"
import {
  AlarmClock,
  ArrowRight,
  FileText,
  FolderOpen,
  Layers,
  ListChecks,
  Mail,
  MessageSquare,
  Phone,
  PenLine,
  Sparkles,
  type LucideIcon,
} from "lucide-react"
import { BrowserFrame } from "@/components/site/browser-frame"
import { PortalMock } from "@/components/site/mocks"
import { SectionShell } from "@/components/site/section-shell"
import { MarketingButton } from "@/components/ui/marketing-button"
import { platform, site, type FeatureId } from "@/content/site"
import { getFiscalPulse, type FiscalPulseItem } from "@/lib/fiscal-pulse"
import { cn } from "@/lib/utils"

/** Pantallas fuera del tour de Funcionalidades. */
const SCENES = [
  {
    id: "firmas" as const satisfies FeatureId,
    label: "Firmas",
    url: "app.syntia.es/firmas",
    caption: "Pendientes de firma",
  },
  {
    id: "guias" as const satisfies FeatureId,
    label: "Guías",
    url: "app.syntia.es/guias",
    caption: "Guías y plazos a mano",
  },
] as const

type ContrastPhase = {
  label: string
  mode: string
  icon: LucideIcon
  headline: string
  items: readonly { icon: LucideIcon; text: string }[]
}

const BEFORE: ContrastPhase = {
  label: "Antes",
  mode: "Descentralizado",
  icon: Layers,
  headline: "El estado real, en ninguna parte.",
  items: [
    { icon: Mail, text: "12 hilos de correo abiertos" },
    { icon: Phone, text: "Llamadas sin dejar rastro" },
    { icon: FolderOpen, text: "Carpetas compartidas a medias" },
  ],
}

const AFTER: ContrastPhase = {
  label: "Después",
  mode: "En un solo sitio",
  icon: Sparkles,
  headline: "Un solo sitio. Estado a la vista.",
  items: [
    { icon: ListChecks, text: "Trámite en curso · con historial" },
    { icon: FileText, text: "Documento listo para descargar" },
    { icon: PenLine, text: "Firma pendiente · 2 días" },
    { icon: MessageSquare, text: "Consulta con tu asesor · en contexto" },
  ],
}

/** Intervalos desfasados: las 3 motions siguen, pero no pelean al mismo ritmo. */
const PHASE_MS = 5600
const SCENE_MS = 8200
const PULSE_MS = 10000
const SCENE_DELAY_MS = 1800
const PULSE_DELAY_MS = 3200

/**
 * Bento asimétrico: Antes/Después, mock Firmas/Guías, beneficios + pulso fiscal.
 * Tres motions conservadas; alturas fijas en cards que rotan copy.
 */
export function Platform() {
  const [status, docs, firma, chat] = platform.highlights
  const [sceneIndex, setSceneIndex] = useState(0)
  const [scenePaused, setScenePaused] = useState(false)
  const [phase, setPhase] = useState<"antes" | "despues">("antes")
  const [phasePaused, setPhasePaused] = useState(false)
  const [pulseIndex, setPulseIndex] = useState(0)
  const [pulsePaused, setPulsePaused] = useState(false)
  const [pulse, setPulse] = useState(() => getFiscalPulse())

  const scene = SCENES[sceneIndex] ?? SCENES[0]
  const contrast = phase === "antes" ? BEFORE : AFTER
  const pulseItem = pulse[pulseIndex] ?? pulse[0]

  useEffect(() => {
    if (phasePaused) return
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (media.matches) return
    const id = window.setInterval(() => {
      setPhase((p) => (p === "antes" ? "despues" : "antes"))
    }, PHASE_MS)
    return () => window.clearInterval(id)
  }, [phasePaused])

  useEffect(() => {
    if (scenePaused) return
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (media.matches) return
    let intervalId = 0
    const delayId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        setSceneIndex((i) => (i + 1) % SCENES.length)
      }, SCENE_MS)
    }, SCENE_DELAY_MS)
    return () => {
      window.clearTimeout(delayId)
      window.clearInterval(intervalId)
    }
  }, [scenePaused])

  useEffect(() => {
    // La fecha solo se conoce en el cliente: calcularla en el render rompería la hidratación.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPulse(getFiscalPulse(new Date()))
  }, [])

  useEffect(() => {
    if (pulsePaused || pulse.length === 0) return
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (media.matches) return
    let intervalId = 0
    const delayId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        setPulseIndex((i) => (i + 1) % pulse.length)
      }, PULSE_MS)
    }, PULSE_DELAY_MS)
    return () => {
      window.clearTimeout(delayId)
      window.clearInterval(intervalId)
    }
  }, [pulsePaused, pulse.length])

  return (
    <SectionShell
      id="plataforma"
      className="bg-surface-light py-20 text-on-light md:py-28"
    >
      <div className="mb-8 max-w-2xl md:mb-10">
        <h2 className="section-title text-3xl leading-[1.08] text-on-light sm:text-4xl md:text-[2.75rem]">
          {platform.title}
        </h2>
        <p className="section-subtitle mt-4 max-w-[52ch] text-base text-pretty text-muted-on-light sm:text-lg">
          {platform.subtitle}
        </p>
      </div>

      <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-12">
        {/* Antes / Después — altura = max(ambos) vía apilado invisible */}
        <div className="grid sm:col-span-2 md:col-span-4">
          <div
            className="invisible col-start-1 row-start-1"
            aria-hidden
          >
            <ContrastFace data={BEFORE} phase="antes" />
          </div>
          <div
            className="invisible col-start-1 row-start-1"
            aria-hidden
          >
            <ContrastFace data={AFTER} phase="despues" />
          </div>
          <button
            type="button"
            onClick={() => {
              setPhasePaused(true)
              setPhase((p) => (p === "antes" ? "despues" : "antes"))
            }}
            className={cn(
              "col-start-1 row-start-1 flex h-full cursor-pointer flex-col rounded-2xl text-left transition-[background-color,transform] duration-500",
              "hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-light",
              phase === "antes"
                ? "bg-background text-on-dark"
                : "bg-brisa text-on-light",
            )}
            aria-label={`${contrast.label}: ${contrast.mode}. Cambiar a ${phase === "antes" ? "después" : "antes"}.`}
          >
            <ContrastFace data={contrast} phase={phase} />
          </button>
        </div>

        <div className="min-w-0 overflow-hidden rounded-2xl bg-background p-3 sm:col-span-2 md:col-span-8 md:row-span-2 md:p-4">
          <div className="mb-3 flex items-center justify-between gap-3 px-1">
            <p className="font-sans text-xs font-medium text-muted-on-dark">
              {scene.caption}
            </p>
            <div
              className="flex gap-1"
              role="tablist"
              aria-label="Pantalla del portal"
            >
              {SCENES.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={i === sceneIndex}
                  aria-label={s.label}
                  onClick={() => {
                    setScenePaused(true)
                    setSceneIndex(i)
                  }}
                  className={cn(
                    "h-2 w-6 cursor-pointer rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                    i === sceneIndex
                      ? "bg-primary"
                      : "bg-agua/40 hover:bg-agua/70",
                  )}
                />
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setScenePaused(true)
              setSceneIndex((i) => (i + 1) % SCENES.length)
            }}
            aria-label={`Ver siguiente pantalla. Ahora: ${scene.label}.`}
            className="block w-full cursor-pointer rounded-xl text-left transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <BrowserFrame
              key={scene.id}
              url={scene.url}
              label={scene.caption}
              screen={scene.label}
              className="pointer-events-none min-w-0 [&_.shadow-2xl]:shadow-lg [&_.shadow-2xl]:shadow-black/25"
            >
              <PortalMock id={scene.id} size="compact" />
            </BrowserFrame>
          </button>
        </div>

        <PointCell
          className="border border-accent-on-light/25 bg-white/80 md:col-span-4 md:min-h-[12rem]"
          icon={ListChecks}
          title={status.title}
          description={status.description}
          titleClassName="text-lg sm:text-xl sm:leading-snug"
        />

        <PointCell
          className="bg-brisa text-on-light md:col-span-4"
          icon={FileText}
          title={docs.title}
          description={docs.description}
          mutedClassName="text-muted-on-light"
        />

        <PointCell
          className="border border-accent-on-light/20 bg-white/70 md:col-span-4"
          icon={PenLine}
          title={firma.title}
          description={firma.description}
        />

        <PointCell
          className="border border-accent-on-light/20 bg-white/70 md:col-span-4"
          icon={MessageSquare}
          title={chat.title}
          description={chat.description}
        />

        {/* Pulso — altura fija al mensaje más largo */}
        <div className="grid sm:col-span-1 md:col-span-8">
          {pulse.map((item) => (
            <div
              key={`measure-${item.text}`}
              className="invisible col-start-1 row-start-1"
              aria-hidden
            >
              <PulseFace item={item} />
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              setPulsePaused(true)
              setPulseIndex((i) => (i + 1) % pulse.length)
            }}
            className={cn(
              "col-start-1 row-start-1 flex h-full cursor-pointer flex-col rounded-2xl border border-accent-on-light/20 bg-white/70 text-left transition-transform duration-300 hover:-translate-y-0.5",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-light",
            )}
            aria-label="Siguiente aviso del periodo fiscal"
          >
            <PulseFace
              item={pulseItem}
              pulseIndex={pulseIndex}
              pulseCount={pulse.length}
            />
          </button>
        </div>

        <div className="flex flex-col justify-between gap-4 rounded-2xl bg-background px-5 py-5 text-on-dark sm:col-span-1 md:col-span-4 md:px-6 md:py-6">
          <p className="text-sm leading-relaxed text-muted-on-dark">
            {platform.cta.note}
          </p>
          <div className="flex flex-col gap-2">
            <MarketingButton
              size="lg"
              nativeButton={false}
              className="h-11 w-full px-4 text-sm"
              render={
                <a
                  href={site.appUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {platform.cta.primary}
                  <ArrowRight className="ml-2 size-4" />
                </a>
              }
            />
            <MarketingButton
              size="lg"
              variant="outline"
              marketingVariant="secondary"
              nativeButton={false}
              className="h-11 w-full border-agua/50 bg-transparent px-4 text-sm"
              render={
                <a href={platform.cta.secondaryHref}>{platform.cta.secondary}</a>
              }
            />
          </div>
        </div>
      </div>
    </SectionShell>
  )
}

function ContrastFace({
  data,
  phase,
}: {
  data: ContrastPhase
  phase: "antes" | "despues"
}) {
  const PhaseIcon = data.icon
  return (
    <div className="flex h-full flex-col px-5 py-5 sm:px-6 sm:py-6 md:px-7 md:py-7">
      <div className="flex items-center gap-2.5">
        <span
          className={cn(
            "inline-flex size-9 shrink-0 items-center justify-center rounded-xl transition-colors duration-500",
            phase === "antes"
              ? "bg-agua/25 text-primary"
              : "bg-accent-on-light/15 text-accent-on-light",
          )}
          aria-hidden
        >
          <PhaseIcon className="size-5" strokeWidth={2} />
        </span>
        <span className="min-w-0">
          <span
            className={cn(
              "block font-sans text-sm font-medium tracking-wide",
              phase === "antes" ? "text-primary" : "text-accent-on-light",
            )}
          >
            {data.label}
          </span>
          <span
            className={cn(
              "block text-xs",
              phase === "antes" ? "text-muted-on-dark" : "text-muted-on-light",
            )}
          >
            {data.mode}
          </span>
        </span>
      </div>

      <p className="mt-5 font-sans text-xl font-semibold leading-tight tracking-tight sm:mt-6 sm:text-2xl">
        {data.headline}
      </p>

      <ul className="mt-5 space-y-3 sm:mt-6">
        {data.items.map((item) => {
          const Icon = item.icon
          return (
            <li
              key={item.text}
              className={cn(
                "flex items-start gap-2.5 text-sm leading-snug",
                phase === "antes" ? "text-muted-on-dark" : "text-muted-on-light",
              )}
            >
              <Icon
                className={cn(
                  "mt-0.5 size-4 shrink-0",
                  phase === "antes" ? "text-primary" : "text-accent-on-light",
                )}
                aria-hidden
              />
              <span>{item.text}</span>
            </li>
          )
        })}
      </ul>

      <div className="mt-auto flex gap-1.5 pt-5" aria-hidden>
        <span
          className={cn(
            "h-1 w-6 rounded-full transition-colors",
            phase === "antes" ? "bg-primary" : "bg-accent-on-light/35",
          )}
        />
        <span
          className={cn(
            "h-1 w-6 rounded-full transition-colors",
            phase === "despues" ? "bg-accent-on-light" : "bg-agua/40",
          )}
        />
      </div>
    </div>
  )
}

function PulseFace({
  item,
  pulseIndex,
  pulseCount,
}: {
  item: FiscalPulseItem
  pulseIndex?: number
  pulseCount?: number
}) {
  return (
    <div className="flex h-full flex-col px-5 py-5 md:px-6 md:py-6">
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 font-sans text-sm font-medium tracking-wide text-accent-on-light">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-on-light/30 motion-reduce:animate-none" />
            <span className="relative inline-flex size-2 rounded-full bg-accent-on-light" />
          </span>
          Plazo
        </span>
        <AlarmClock className="size-4 text-accent-on-light/70" aria-hidden />
      </div>
      <p className="mt-3 font-sans text-base font-semibold leading-snug tracking-tight text-on-light">
        {item.text}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-muted-on-light">
        {item.detail}
      </p>
      {typeof pulseCount === "number" && typeof pulseIndex === "number" ? (
        <div className="mt-auto flex gap-1.5 pt-4" aria-hidden>
          {Array.from({ length: pulseCount }, (_, i) => (
            <span
              key={i}
              className={cn(
                "h-1 w-4 rounded-full transition-colors duration-300",
                i === pulseIndex ? "bg-accent-on-light" : "bg-accent-on-light/25",
              )}
            />
          ))}
        </div>
      ) : (
        <div className="mt-auto pt-4" aria-hidden>
          <span className="block h-1 w-4" />
        </div>
      )}
    </div>
  )
}

function PointCell({
  icon: Icon,
  title,
  description,
  className,
  titleClassName,
  mutedClassName = "text-muted-on-light",
}: {
  icon: typeof ListChecks
  title: string
  description: string
  className?: string
  titleClassName?: string
  mutedClassName?: string
}) {
  return (
    <div className={cn("rounded-2xl px-5 py-5 md:px-6 md:py-6", className)}>
      <Icon className="size-5 text-accent-on-light" aria-hidden />
      <h3
        className={cn(
          "mt-3 font-sans text-base font-semibold tracking-tight text-on-light md:mt-4 md:text-lg",
          titleClassName,
        )}
      >
        {title}
      </h3>
      <p className={cn("mt-2 text-sm leading-relaxed", mutedClassName)}>
        {description}
      </p>
    </div>
  )
}
