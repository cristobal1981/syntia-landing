import { ChevronRight, MessageSquare, Paperclip, X } from "lucide-react"
import { mockPortalLabels, mockTramites } from "@/content/mocks"
import {
  MockCard,
  MockPageTitle,
  MockShell,
  StateBadge,
  TypeBadge,
  type MockSize,
} from "@/components/site/mocks/mock-primitives"
import { cn } from "@/lib/utils"

const filters = [
  { label: "Trámites", count: 2 },
  { label: "Consultas", count: 2 },
  { label: "Hecho", count: 0 },
  { label: "Cancelado", count: 0 },
  { label: "Con documentos", count: 3 },
] as const

function DrawerOverlay() {
  const { detail } = mockTramites
  return (
    <>
      {/* Scrim a pantalla completa del mock */}
      <div className="absolute inset-0 bg-m-fg/35 backdrop-blur-[2px]" aria-hidden />
      <div
        className="absolute inset-y-0 right-0 flex h-full w-[min(100%,18.5rem)] flex-col border-l border-m-border bg-m-card shadow-[-16px_0_40px_rgba(4,29,35,0.28)] @min-[36rem]:w-[min(100%,22rem)]"
        aria-label="Detalle del trámite"
      >
        <div className="border-b border-m-border px-3 py-2.5">
          <div className="flex items-start justify-between gap-2">
            <p className="font-sans text-[13px] font-semibold leading-tight">{detail.subject}</p>
            <span className="inline-flex items-center gap-1 text-[10px] text-m-fg-muted">
              <span>1/1</span>
              <X className="size-3.5" />
            </span>
          </div>
          <div className="mt-1.5 flex items-center gap-1.5">
            <TypeBadge>{mockPortalLabels.tramites.types[detail.type]}</TypeBadge>
            <StateBadge variant={detail.stateVariant}>{detail.stateLabel}</StateBadge>
          </div>
          <div className="mt-2.5 flex gap-3 text-[11px]">
            <span className="inline-flex items-center gap-1 border-b-2 border-primary pb-1.5 font-semibold text-m-fg">
              <MessageSquare className="size-3" />
              {mockPortalLabels.tramites.chatter.title}
            </span>
            <span className="inline-flex items-center gap-1 pb-1.5 text-m-fg-muted">
              <Paperclip className="size-3" />
              Adjuntos
              <span className="rounded-full bg-m-muted px-1 text-[9px] font-semibold">2</span>
            </span>
          </div>
        </div>

        <div className="min-h-0 flex-1 space-y-2 overflow-hidden px-3 py-2.5">
          {detail.messages.map((m) => {
            const mine = m.authorRole === "client"
            return (
              <div key={m.id} className={cn("flex flex-col", mine ? "items-end" : "items-start")}>
                <p className="mb-0.5 px-1 text-[9px] text-m-fg-muted">
                  {mine ? mockPortalLabels.tramites.chatter.youLabel : m.authorName}
                  <span className="ml-1">{m.sentAt}</span>
                </p>
                <div
                  className={cn(
                    "max-w-[92%] rounded-2xl px-2.5 py-1.5",
                    mine ? "rounded-br-md bg-primary/20" : "rounded-bl-md bg-m-muted",
                  )}
                >
                  <p className="line-clamp-3">{m.body}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="border-t border-m-border px-2.5 py-2">
          <div className="flex h-8 items-center rounded-lg border border-primary/40 bg-m-card px-2 text-m-fg-muted">
            <span className="flex-1 truncate text-[10px]">
              {mockPortalLabels.tramites.chatter.composerPlaceholder}
            </span>
            <Paperclip className="size-3.5" />
          </div>
        </div>
      </div>
    </>
  )
}

export function MockTramites({ size = "default" }: { size?: MockSize }) {
  const { list, detail } = mockTramites
  return (
    <MockShell active={mockTramites.activeNav} size={size} overlay={<DrawerOverlay />}>
      <MockPageTitle subtitle="Gestiones generales, consultas de soporte y documentación asociada. Por defecto ves solo lo que sigue abierto.">
        {mockPortalLabels.tramites.title}
      </MockPageTitle>

      <div className="mb-2 flex flex-wrap gap-1">
        {filters.map((f, i) => (
          <span
            key={f.label}
            className={cn(
              "inline-flex h-6 items-center gap-1 rounded-full border px-2 text-[10px] font-medium",
              i === 0
                ? "border-transparent bg-m-muted font-semibold text-m-fg"
                : "border-m-border bg-m-card text-m-fg-muted",
            )}
          >
            {f.label}
            <span className="opacity-70">({f.count})</span>
          </span>
        ))}
      </div>

      <MockCard className="overflow-hidden">
        <div className="grid grid-cols-[1fr_auto] gap-2 border-b border-m-border px-2.5 py-1.5 text-[10px] font-medium text-m-fg-muted">
          <span>Trámite</span>
          <span className="hidden @min-[30rem]:inline">Etiquetas</span>
        </div>
        <div className="divide-y divide-m-border">
          {list.map((item) => {
            const selected = item.id === detail.selectedId
            return (
              <div
                key={item.id}
                className={cn(
                  "flex items-center gap-2 px-2.5 py-2",
                  selected && "bg-primary/5",
                )}
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{item.name}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-1">
                    {item.attachmentCount ? (
                      <span className="inline-flex items-center gap-0.5 text-[10px] text-m-fg-muted">
                        <Paperclip className="size-3" />
                        {item.attachmentCount}
                      </span>
                    ) : null}
                    <TypeBadge>{mockPortalLabels.tramites.types[item.type]}</TypeBadge>
                    <StateBadge variant={item.stateVariant}>{item.stateLabel}</StateBadge>
                  </div>
                </div>
                <ChevronRight className="size-3.5 shrink-0 text-m-fg-muted" />
              </div>
            )
          })}
        </div>
      </MockCard>
    </MockShell>
  )
}
