import { CalendarClock, PenLine } from "lucide-react"
import { mockFirmas, mockPortalLabels } from "@/content/mocks"
import {
  MockCard,
  MockPageTitle,
  MockShell,
  MockPrimaryButton,
  StateBadge,
  type MockSize,
} from "@/components/site/mocks/mock-primitives"
import { cn } from "@/lib/utils"

export function MockFirmas({ size = "default" }: { size?: MockSize }) {
  const { tabs } = mockPortalLabels.firmas
  const { pending, history } = mockFirmas

  return (
    <MockShell active={mockFirmas.activeNav} size={size}>
      <MockPageTitle subtitle="Los documentos se abren en una pestaña nueva para firmar con seguridad.">
        Solicitudes pendientes de firma
      </MockPageTitle>

      <div className="mb-3 flex gap-1.5">
        {[
          { id: "pending", label: tabs.pending, count: pending.length },
          { id: "history", label: tabs.history, count: history.length },
        ].map((tab) => (
          <span
            key={tab.id}
            className={cn(
              "inline-flex h-7 items-center gap-1.5 rounded-lg px-3 text-[11px] font-medium",
              tab.id === mockFirmas.activeTab
                ? "bg-m-side font-semibold text-on-dark"
                : "border border-m-border bg-m-card text-m-fg-muted",
            )}
          >
            {tab.label}
            <span className="opacity-70">({tab.count})</span>
          </span>
        ))}
      </div>

      <div className="space-y-2">
        {pending.map((item) => (
          <MockCard key={item.id} className="p-3">
            <div className="flex items-start gap-2.5">
              <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-accent-on-light">
                <PenLine className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-sans text-[13px] font-semibold leading-tight">{item.title}</p>
                <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] text-m-fg-muted">
                  <span>Enviado {item.sentAt}</span>
                  <span className="inline-flex items-center gap-0.5 text-amber-800">
                    <CalendarClock className="size-3" />
                    Vence {item.dueAt}
                  </span>
                </p>
              </div>
              <StateBadge variant="inProgress" className="hidden @min-[30rem]:inline-flex">
                {item.statusLabel}
              </StateBadge>
            </div>
            <div className="mt-3 flex justify-end">
              <MockPrimaryButton>{mockPortalLabels.firmas.signAction}</MockPrimaryButton>
            </div>
          </MockCard>
        ))}
      </div>
    </MockShell>
  )
}
