import { taxCalendar, type TaxCalendarWindow } from "@/content/tax-calendar"

export type TaxWindowStatus = "active" | "upcoming"

export type RelevantTaxWindow = {
  window: TaxCalendarWindow
  status: TaxWindowStatus
  /** Año civil de esta ocurrencia (el de start/end) */
  year: number
  /** 0 cuando la ventana está abierta */
  daysUntilStart: number
  daysUntilEnd: number
}

const MS_PER_DAY = 24 * 60 * 60 * 1000

function toDayDate(year: number, month: number, day: number): Date {
  return new Date(year, month - 1, day)
}

function diffInDays(from: Date, to: Date): number {
  return Math.round((to.getTime() - from.getTime()) / MS_PER_DAY)
}

/**
 * Ventanas abiertas ahora o que abren dentro del horizonte.
 * Comparación por día natural, fin inclusive.
 */
export function getRelevantTaxWindows(
  now: Date = new Date(),
  horizonDays = 45,
): RelevantTaxWindow[] {
  const today = toDayDate(now.getFullYear(), now.getMonth() + 1, now.getDate())
  const relevant: RelevantTaxWindow[] = []

  for (const window of taxCalendar.windows) {
    for (const year of [today.getFullYear(), today.getFullYear() + 1]) {
      const start = toDayDate(year, window.start.month, window.start.day)
      const end = toDayDate(year, window.end.month, window.end.day)
      if (end < today) continue

      const daysUntilStart = Math.max(0, diffInDays(today, start))
      const daysUntilEnd = diffInDays(today, end)

      if (start <= today) {
        relevant.push({
          window,
          status: "active",
          year,
          daysUntilStart: 0,
          daysUntilEnd,
        })
      } else if (daysUntilStart <= horizonDays) {
        relevant.push({
          window,
          status: "upcoming",
          year,
          daysUntilStart,
          daysUntilEnd,
        })
      }
      break
    }
  }

  return relevant.sort((a, b) => {
    if (a.status !== b.status) return a.status === "active" ? -1 : 1
    if (a.status === "active") return a.daysUntilEnd - b.daysUntilEnd
    return a.daysUntilStart - b.daysUntilStart
  })
}

/** Periodo de presentación: p. ej. "3T 2026". El 4T presentado en enero es del año anterior. */
export function filingPeriodLabel(w: RelevantTaxWindow): string | null {
  const q = w.window.quarter
  if (!q) return null
  const periodYear =
    q === 4 && w.window.start.month === 1 ? w.year - 1 : w.year
  return `${q}T ${periodYear}`
}

export function daysPhrase(days: number): string {
  if (days <= 0) return "hoy"
  if (days === 1) return "1 día"
  return `${days} días`
}
