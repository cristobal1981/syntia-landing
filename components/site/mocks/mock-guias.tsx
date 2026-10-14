"use client"

import { useMemo } from "react"
import { AlarmClock } from "lucide-react"
import { mockGuias, mockPortalLabels } from "@/content/mocks"
import {
  MockCard,
  MockHeading,
  MockPageTitle,
  MockShell,
  type MockSize,
} from "@/components/site/mocks/mock-primitives"
import { getSappoFiscalLine } from "@/lib/fiscal-pulse"
import { getRelevantTaxWindows } from "@/lib/tax-calendar"
import { cn } from "@/lib/utils"

export function MockGuias({ size = "compact" }: { size?: MockSize }) {
  const guias = mockPortalLabels.guias
  const entries = mockGuias.entries.slice(0, 2)

  const { highlight, sappoMessage } = useMemo(() => {
    const now = new Date()
    const [primary] = getRelevantTaxWindows(now)
    const sappoMessage = getSappoFiscalLine(now)

    if (!primary) {
      return {
        highlight: mockGuias.calendarHighlights[0],
        sappoMessage,
      }
    }

    return {
      highlight: {
        id: primary.window.id,
        title: primary.window.title,
        rangeLabel: primary.window.rangeLabel,
        modelCodes: primary.window.modelCodes,
        badge: primary.status,
        badgeLabel:
          primary.status === "active"
            ? mockPortalLabels.guias.badges.active
            : mockPortalLabels.guias.badges.upcoming,
      },
      sappoMessage,
    }
  }, [])

  return (
    <MockShell active={mockGuias.activeNav} size={size}>
      <MockPageTitle subtitle="Guías prácticas sobre impuestos, plazos y trámites habituales.">
        {guias.title}
      </MockPageTitle>

      <section className="mb-3 rounded-xl border border-primary/25 bg-primary/10 p-2.5">
        <div className="mb-2 flex items-start justify-between gap-2">
          <div>
            <MockHeading className="flex items-center gap-1.5">
              <AlarmClock className="size-3.5 text-primary" />
              {guias.nowTitle}
            </MockHeading>
            <p className="text-[10px] text-m-fg-muted">
              Plazos abiertos o a punto de abrirse.
            </p>
          </div>
          <p className="max-w-[11rem] rounded-lg bg-m-card/80 px-2 py-1.5 text-[9px] leading-snug italic text-m-fg">
            “{sappoMessage}”
          </p>
        </div>

        {highlight ? (
          <MockCard className="px-2.5 py-2">
            <div className="flex items-start justify-between gap-2">
              <p className="font-semibold leading-tight">{highlight.title}</p>
              <span
                className={cn(
                  "shrink-0 rounded-full px-1.5 py-px text-[10px] font-semibold",
                  highlight.badge === "active"
                    ? "bg-primary/15 text-accent-on-light"
                    : "bg-m-muted text-m-fg-muted",
                )}
              >
                {highlight.badgeLabel}
              </span>
            </div>
            <p className="mt-0.5 text-[10px] text-m-fg-muted">{highlight.rangeLabel}</p>
            <div className="mt-1.5 flex flex-wrap gap-1">
              {highlight.modelCodes.slice(0, 8).map((code) => (
                <span
                  key={code}
                  className="rounded-md bg-m-muted px-1.5 py-px text-[10px] font-semibold text-m-fg"
                >
                  {code}
                </span>
              ))}
            </div>
          </MockCard>
        ) : null}
      </section>

      <MockHeading className="mb-1.5">Impuestos periódicos</MockHeading>
      <div className="grid gap-2 @min-[34rem]:grid-cols-2">
        {entries.map((entry) => (
          <MockCard key={entry.slug} className="px-2.5 py-2">
            <p className="font-semibold leading-tight">{entry.title}</p>
            <p className="mt-0.5 line-clamp-2 text-[10px] text-m-fg-muted">
              {entry.description}
            </p>
            <div className="mt-1.5 flex flex-wrap gap-1">
              {entry.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="text-[9px] text-m-fg-muted">
                  #{tag}
                </span>
              ))}
            </div>
            <p className="mt-1.5 text-[10px] font-semibold text-accent-on-light">
              {guias.readGuide} →
            </p>
          </MockCard>
        ))}
      </div>
    </MockShell>
  )
}
