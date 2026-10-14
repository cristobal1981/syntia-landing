import type { ComponentType, ReactNode } from "react"
import Image from "next/image"
import {
  BookOpen,
  Bell,
  ClipboardList,
  FileText,
  Home,
  PanelLeft,
  PenLine,
  Plus,
  Scale,
  Search,
  Sun,
  Upload,
} from "lucide-react"
import {
  mockClient,
  mockPortalChrome,
  mockPortalLabels,
  type PortalNavIcon,
  type TaskStateBadgeVariant,
} from "@/content/mocks"
import { cn } from "@/lib/utils"

/**
 * Chrome del portal alineado a localhost:3000 (syntia-app):
 * sidebar oscuro con borde activo a la izquierda, Factura de compra + perfil
 * abajo, topbar clara con buscador / Nueva consulta / campana / tema.
 */

const navIcons: Record<PortalNavIcon, ComponentType<{ className?: string }>> = {
  home: Home,
  obligations: Scale,
  procedures: ClipboardList,
  documents: FileText,
  signatures: PenLine,
  guides: BookOpen,
}

export type MockSize = "hero" | "default" | "compact"

const sizeClass: Record<MockSize, string> = {
  hero: "h-[22rem] sm:h-[26rem] lg:h-[28rem]",
  default: "h-[26rem] sm:h-[28rem] lg:h-[30rem]",
  compact: "h-[23rem] sm:h-[25rem] lg:h-[26rem]",
}

type MockShellProps = {
  active: PortalNavIcon
  size?: MockSize
  children: ReactNode
  /** Capas a pantalla completa del mock (drawers, scrims). */
  overlay?: ReactNode
  className?: string
}

export function MockShell({
  active,
  size = "default",
  children,
  overlay,
  className,
}: MockShellProps) {
  const initial = mockClient.displayName.charAt(0).toUpperCase()

  return (
    <div
      className={cn(
        "@container relative flex w-full overflow-hidden bg-m-bg font-sans text-m-fg",
        "text-[11px] leading-snug @min-[36rem]:text-xs",
        sizeClass[size],
        className,
      )}
    >
      <aside className="flex w-11 shrink-0 flex-col bg-m-side @min-[36rem]:w-[9.5rem]">
        <div className="flex flex-col items-center px-1.5 py-3 @min-[36rem]:items-start @min-[36rem]:px-3 @min-[36rem]:py-3.5">
          <div className="flex items-center gap-1.5">
            <Image
              src="/brand/syntia-isotipo.svg"
              alt=""
              width={18}
              height={18}
              className="size-[18px] shrink-0"
            />
            <span className="hidden font-sans text-[13px] font-semibold tracking-tight text-on-dark @min-[36rem]:inline">
              syntia
            </span>
          </div>
          <span className="mt-0.5 hidden pl-[26px] text-[9px] leading-none text-muted-on-dark @min-[36rem]:block">
            by tenaasesores
          </span>
        </div>

        <nav className="flex min-h-0 flex-1 flex-col gap-0.5 overflow-hidden px-1 py-1 @min-[36rem]:px-2">
          {mockPortalChrome.nav.map((item) => {
            const Icon = navIcons[item.icon]
            const isActive = item.icon === active
            return (
              <div
                key={item.label}
                className={cn(
                  "relative flex h-7 items-center justify-center gap-2 rounded-md text-muted-on-dark @min-[36rem]:justify-start @min-[36rem]:px-2.5",
                  isActive && "bg-m-side-active text-primary",
                )}
              >
                {isActive ? (
                  <span
                    className="absolute inset-y-1 left-0 w-[3px] rounded-full bg-primary"
                    aria-hidden
                  />
                ) : null}
                <Icon className="size-3.5 shrink-0" />
                <span className="hidden truncate @min-[36rem]:inline">{item.label}</span>
              </div>
            )
          })}

          <div className="mt-auto hidden pt-2 @min-[36rem]:block">
            <div className="flex items-center gap-2 rounded-lg bg-primary/15 px-2 py-2 text-primary">
              <Upload className="size-3.5 shrink-0" />
              <div className="min-w-0 leading-tight">
                <p className="truncate text-[10px] font-semibold">Factura de compra</p>
                <p className="truncate text-[9px] text-primary/80">Subida rápida</p>
              </div>
            </div>
          </div>
        </nav>

        <div className="hidden border-t border-white/10 px-2 py-2.5 @min-[36rem]:block">
          <div className="flex items-center gap-2">
            <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/25 text-[10px] font-bold text-primary">
              {initial}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[10px] font-semibold text-on-dark">
                {mockClient.displayName}
              </p>
              <p className="text-[9px] text-muted-on-dark">Cliente</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col bg-m-bg">
        <div className="flex h-9 shrink-0 items-center gap-2 bg-m-side px-2 @min-[36rem]:px-3">
          <PanelLeft className="hidden size-3.5 text-muted-on-dark @min-[36rem]:block" />
          <div className="hidden h-6 flex-1 items-center gap-1.5 rounded-full border border-white/10 bg-m-side-active px-2.5 text-[10px] text-muted-on-dark @min-[30rem]:flex @min-[30rem]:max-w-[14rem] @min-[42rem]:max-w-[18rem]">
            <Search className="size-3" />
            Buscar…
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="inline-flex h-6 items-center gap-1 rounded-md bg-primary px-2 text-[10px] font-semibold text-primary-foreground">
              <Plus className="size-3" />
              <span className="hidden @min-[28rem]:inline">
                {mockPortalLabels.tramites.nuevaConsulta}
              </span>
            </span>
            <Bell className="size-3.5 text-muted-on-dark" />
            <Sun className="size-3.5 text-muted-on-dark" />
          </div>
        </div>

        <div className="relative min-h-0 flex-1 overflow-hidden px-3 py-3 @min-[36rem]:px-5 @min-[36rem]:py-4">
          {children}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-m-bg to-transparent"
            aria-hidden
          />
        </div>
      </div>

      {overlay ? (
        <div className="pointer-events-none absolute inset-0 z-20">{overlay}</div>
      ) : null}
    </div>
  )
}

/* ------------------------------------------------------------------ */

const badgeClass: Record<TaskStateBadgeVariant, string> = {
  inProgress: "bg-amber-400/25 text-amber-800",
  changesRequested: "bg-orange-500/20 text-orange-700",
  done: "bg-primary/15 text-accent-on-light",
  canceled: "bg-red-500/15 text-red-700",
  unknown: "bg-m-muted text-m-fg-muted",
}

export function StateBadge({
  variant,
  children,
  className,
}: {
  variant: TaskStateBadgeVariant
  children: ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center whitespace-nowrap rounded-full px-1.5 py-px text-[10px] font-semibold",
        badgeClass[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}

export function TypeBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex shrink-0 items-center rounded-full bg-sky-500/15 px-1.5 py-px text-[10px] font-semibold text-sky-800">
      {children}
    </span>
  )
}

export function MockCard({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn("rounded-xl border border-m-border bg-m-card", className)}>
      {children}
    </div>
  )
}

export function MockHeading({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <h3
      className={cn(
        "font-sans text-[13px] font-semibold text-m-fg @min-[36rem]:text-sm",
        className,
      )}
    >
      {children}
    </h3>
  )
}

export function MockPageTitle({
  children,
  subtitle,
  action,
}: {
  children: ReactNode
  subtitle?: string
  action?: ReactNode
}) {
  return (
    <div className="mb-3 flex items-start justify-between gap-2">
      <div className="min-w-0">
        <h2 className="font-sans text-base font-semibold tracking-tight text-m-fg @min-[36rem]:text-lg">
          {children}
        </h2>
        {subtitle ? (
          <p className="mt-0.5 line-clamp-2 text-[10px] text-m-fg-muted @min-[36rem]:text-[11px]">
            {subtitle}
          </p>
        ) : null}
      </div>
      {action}
    </div>
  )
}

export function MockOutlineButton({
  children,
  icon: Icon,
}: {
  children: ReactNode
  icon?: ComponentType<{ className?: string }>
}) {
  return (
    <span className="inline-flex h-6 shrink-0 items-center gap-1 rounded-md border border-m-border bg-m-card px-2 text-[10px] font-medium text-m-fg">
      {Icon ? <Icon className="size-3" /> : null}
      {children}
    </span>
  )
}

export function MockPrimaryButton({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex h-6 shrink-0 items-center rounded-md bg-primary px-2.5 text-[10px] font-semibold text-primary-foreground">
      {children}
    </span>
  )
}
