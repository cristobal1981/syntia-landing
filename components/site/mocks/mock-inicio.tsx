import {
  ChevronRight,
  ClipboardList,
  FileText,
  MessageSquare,
  PenLine,
  Scale,
  BookOpen,
  type LucideIcon,
} from "lucide-react"
import { mockClient, mockInicio, mockPortalLabels, type PortalNavIcon } from "@/content/mocks"
import {
  MockCard,
  MockHeading,
  MockShell,
  type MockSize,
} from "@/components/site/mocks/mock-primitives"

const notificationIcon: Record<string, LucideIcon> = {
  tramite: ClipboardList,
  consulta: MessageSquare,
  obligacion: Scale,
  firma: PenLine,
  document: FileText,
}

const quickIcons: Record<PortalNavIcon, LucideIcon> = {
  home: FileText,
  documents: FileText,
  obligations: Scale,
  procedures: ClipboardList,
  signatures: PenLine,
  guides: BookOpen,
}

export function MockInicio({ size = "hero" }: { size?: MockSize }) {
  const { stats, statsLabels } = mockInicio
  const secondary = [
    {
      value: stats.activeTramitesAndConsultas,
      label: statsLabels.activeTramitesAndConsultas,
    },
    {
      value: stats.pendingSignatures,
      label: statsLabels.pendingSignatures,
    },
  ]

  return (
    <MockShell active={mockInicio.activeNav} size={size}>
      <header className="mb-3">
        <p className="text-[10px] text-m-fg-muted @min-[36rem]:text-[11px]">
          {mockPortalLabels.home.greeting}
        </p>
        <h2 className="font-sans text-lg font-semibold tracking-tight text-m-fg @min-[36rem]:text-2xl">
          {mockClient.displayName}
          <span className="hidden font-normal text-m-fg-muted @min-[40rem]:inline">
            {" "}
            · {mockClient.companyName}
          </span>
        </h2>
      </header>

      {/* Resumen: titular + chips sueltos (sin card), como ClientHomeStats */}
      <section className="mb-4">
        <h3 className="sr-only">{mockPortalLabels.home.statsTitle}</h3>
        <div className="flex w-fit items-center gap-2.5">
          <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-accent-on-light">
            <Scale className="size-4" />
          </span>
          <p className="font-sans text-[13px] font-medium leading-snug @min-[36rem]:text-base">
            {mockInicio.headline}
          </p>
          <ChevronRight className="size-4 shrink-0 text-m-fg-muted" />
        </div>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {secondary.map((chip) => (
            <span
              key={chip.label}
              className="inline-flex items-center rounded-full border border-m-border bg-m-muted/40 px-2.5 py-0.5 text-[10px] text-m-fg-muted"
            >
              {chip.value} {chip.label}
            </span>
          ))}
        </div>
      </section>

      <section className="mb-4">
        <MockHeading className="mb-1.5">{mockPortalLabels.home.unreadTitle}</MockHeading>
        <MockCard className="divide-y divide-m-border">
          {mockInicio.notifications.map((n) => {
            const Icon = notificationIcon[n.type] ?? FileText
            return (
              <div key={n.id} className="flex items-start gap-2 px-2.5 py-2">
                <span className="mt-px inline-flex size-5 shrink-0 items-center justify-center rounded-md bg-primary/15 text-accent-on-light">
                  <Icon className="size-3" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{n.title}</p>
                  <p className="line-clamp-1 text-m-fg-muted">{n.description}</p>
                </div>
                <span className="hidden shrink-0 text-[10px] text-m-fg-muted @min-[30rem]:inline">
                  {n.timeAgo}
                </span>
              </div>
            )
          })}
        </MockCard>
      </section>

      <section>
        <p className="mb-1.5 font-sans text-[10px] font-medium tracking-wide text-m-fg-muted uppercase">
          {mockPortalLabels.home.quickLinksTitle}
        </p>
        <div className="flex flex-wrap gap-x-3 gap-y-1.5">
          {mockInicio.quickLinks.map((link) => {
            const Icon = quickIcons[link.icon] ?? FileText
            return (
              <span
                key={link.label}
                className="inline-flex items-center gap-1.5 text-[11px] font-medium text-m-fg"
              >
                <Icon className="size-3.5 text-primary" />
                {link.label}
              </span>
            )
          })}
        </div>
      </section>
    </MockShell>
  )
}
