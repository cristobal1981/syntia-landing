import { AlarmClock, ChevronRight, Scale } from "lucide-react"
import {
  mockObligaciones,
  mockPortalLabels,
  type ObligacionRow,
} from "@/content/mocks"
import {
  MockCard,
  MockHeading,
  MockPageTitle,
  MockShell,
  StateBadge,
  type MockSize,
} from "@/components/site/mocks/mock-primitives"
import { cn } from "@/lib/utils"

function DeadlinePill({ row }: { row: ObligacionRow }) {
  if (row.deadlineStatus === "none") {
    return <span className="text-[10px] text-m-fg-muted">{row.deadline}</span>
  }
  return (
    <span
      className={cn(
        "rounded-full px-1.5 py-px text-[10px] font-semibold",
        row.deadlineStatus === "overdue"
          ? "bg-red-500/15 text-red-700"
          : "bg-amber-400/25 text-amber-800",
      )}
    >
      {row.deadlineStatus === "overdue"
        ? `${mockPortalLabels.obligaciones.deadline.overdue} · ${row.deadline}`
        : row.deadline}
    </span>
  )
}

function UrgentCard({ row }: { row: ObligacionRow }) {
  return (
    <MockCard className="flex items-center gap-2.5 px-3 py-2.5">
      <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-accent-on-light">
        <Scale className="size-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-semibold">Modelo {row.modelCode}</p>
        <p className="text-[10px] text-m-fg-muted">{row.period}</p>
        <div className="mt-1 flex flex-wrap gap-1">
          <DeadlinePill row={row} />
          <StateBadge variant={row.stateVariant}>{row.stateLabel}</StateBadge>
        </div>
      </div>
      <ChevronRight className="size-4 shrink-0 text-m-fg-muted" />
    </MockCard>
  )
}

export function MockObligaciones({ size = "default" }: { size?: MockSize }) {
  const { urgent, pending, closedByYear } = mockObligaciones
  const closedCount = closedByYear[2026]?.length ?? 0

  return (
    <MockShell active={mockObligaciones.activeNav} size={size}>
      <MockPageTitle subtitle="Consulta el estado de tus modelos tributarios por periodo y descarga la documentación asociada.">
        {mockPortalLabels.obligaciones.title}
      </MockPageTitle>

      <p className="mb-3 text-[10px] font-medium text-accent-on-light">
        ¿Para qué sirve cada modelo? →
      </p>

      <section className="mb-3">
        <MockHeading className="mb-0.5 flex items-center gap-1.5">
          <AlarmClock className="size-3.5 text-primary" />
          {mockPortalLabels.obligaciones.urgentTitle}
        </MockHeading>
        <p className="mb-1.5 text-[10px] text-m-fg-muted">
          Lo atrasado y lo que vence en los próximos días.
        </p>
        <div className="space-y-1.5">
          {urgent.map((row) => (
            <UrgentCard key={row.id} row={row} />
          ))}
        </div>
      </section>

      <section className="mb-3">
        <MockHeading className="mb-0.5">{mockPortalLabels.obligaciones.pendingTitle}</MockHeading>
        <p className="mb-1.5 text-[10px] text-m-fg-muted">
          El resto de modelos en marcha, sin plazo inminente.
        </p>
        <MockCard className="overflow-hidden">
          <div className="hidden grid-cols-[1.1fr_1fr_1fr_0.9fr] gap-2 border-b border-m-border px-2.5 py-1.5 text-[10px] font-medium text-m-fg-muted @min-[34rem]:grid">
            <span>Modelo</span>
            <span>Periodo</span>
            <span>Estado</span>
            <span>Vencimiento</span>
          </div>
          <div className="divide-y divide-m-border">
            {pending.map((row) => (
              <div
                key={row.id}
                className="grid grid-cols-1 gap-0.5 px-2.5 py-2 @min-[34rem]:grid-cols-[1.1fr_1fr_1fr_0.9fr] @min-[34rem]:items-center"
              >
                <p className="font-semibold">Modelo {row.modelCode}</p>
                <p className="text-m-fg-muted">{row.period}</p>
                <StateBadge variant={row.stateVariant}>{row.stateLabel}</StateBadge>
                <span className="text-[10px] text-m-fg-muted">{row.deadline}</span>
              </div>
            ))}
          </div>
        </MockCard>
      </section>

      <section>
        <MockHeading className="mb-0.5">{mockPortalLabels.obligaciones.closedTitle}</MockHeading>
        <MockCard className="flex items-center justify-between px-3 py-2">
          <div>
            <p className="font-semibold">2026</p>
            <p className="text-[10px] text-m-fg-muted">{closedCount} modelos presentados</p>
          </div>
          <ChevronRight className="size-4 text-m-fg-muted" />
        </MockCard>
      </section>
    </MockShell>
  )
}
