type MonthDay = {
  /** Mes 1–12 */
  month: number
  day: number
}

export type TaxCalendarWindow = {
  id: string
  title: string
  /** Copia orientativa; las fechas determinan el resaltado */
  rangeLabel: string
  /** Inclusive. Una ventana no cruza el cambio de año */
  start: MonthDay
  end: MonthDay
  modelCodes: readonly string[]
  /**
   * Trimestre natural (1–4) que cubre esta ventana.
   * `undefined` en ventanas anuales / campaña.
   */
  quarter?: 1 | 2 | 3 | 4
}

/**
 * Calendario fiscal recurrente (agnóstico del año).
 * Alineado con syntia-app/content/tax-calendar.ts.
 */
export const taxCalendar = {
  windows: [
    {
      id: "t4",
      title: "Declaraciones del 4º trimestre (IVA/IGIC)",
      rangeLabel: "Del 1 al 30 de enero",
      start: { month: 1, day: 1 },
      end: { month: 1, day: 30 },
      modelCodes: ["303", "420", "425"],
      quarter: 4,
    },
    {
      id: "t4-retenciones",
      title: "Declaraciones del 4º trimestre (retenciones y pagos fraccionados)",
      rangeLabel: "Del 1 al 20 de enero",
      start: { month: 1, day: 1 },
      end: { month: 1, day: 20 },
      modelCodes: ["111", "115", "123", "130", "131", "349"],
      quarter: 4,
    },
    {
      id: "resumenes-anuales",
      title: "Resúmenes anuales",
      rangeLabel: "Del 1 al 31 de enero",
      start: { month: 1, day: 1 },
      end: { month: 1, day: 31 },
      modelCodes: ["390", "190", "180"],
    },
    {
      id: "feb-347",
      title: "Operaciones con terceros (347)",
      rangeLabel: "Del 1 al 28 de febrero",
      start: { month: 2, day: 1 },
      end: { month: 2, day: 28 },
      modelCodes: ["347"],
    },
    {
      id: "t1",
      title: "Declaraciones del 1er trimestre",
      rangeLabel: "Del 1 al 20 de abril",
      start: { month: 4, day: 1 },
      end: { month: 4, day: 20 },
      modelCodes: ["303", "111", "115", "123", "130", "131", "349", "420", "425"],
      quarter: 1,
    },
    {
      id: "renta",
      title: "Campaña de la Renta",
      rangeLabel: "De principios de abril al 30 de junio",
      start: { month: 4, day: 2 },
      end: { month: 6, day: 30 },
      modelCodes: ["100"],
    },
    {
      id: "t2",
      title: "Declaraciones del 2º trimestre",
      rangeLabel: "Del 1 al 20 de julio",
      start: { month: 7, day: 1 },
      end: { month: 7, day: 20 },
      modelCodes: ["303", "111", "115", "123", "130", "131", "349", "420", "425"],
      quarter: 2,
    },
    {
      id: "sociedades",
      title: "Impuesto sobre Sociedades",
      rangeLabel: "Del 1 al 25 de julio",
      start: { month: 7, day: 1 },
      end: { month: 7, day: 25 },
      modelCodes: ["200"],
    },
    {
      id: "t3",
      title: "Declaraciones del 3er trimestre",
      rangeLabel: "Del 1 al 20 de octubre",
      start: { month: 10, day: 1 },
      end: { month: 10, day: 20 },
      modelCodes: ["303", "111", "115", "123", "130", "131", "349", "420", "425"],
      quarter: 3,
    },
  ],
} as const satisfies { windows: readonly TaxCalendarWindow[] }
