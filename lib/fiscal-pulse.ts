import {
  daysPhrase,
  filingPeriodLabel,
  getRelevantTaxWindows,
  type RelevantTaxWindow,
} from "@/lib/tax-calendar"

export type FiscalPulseItem = {
  label: string
  text: string
  detail: string
}

const FALLBACK: FiscalPulseItem[] = [
  {
    label: "Plazo",
    text: "Sin plazo fiscal inminente",
    detail: "Cuando se acerque una ventana, Syntia la deja a la vista.",
  },
  {
    label: "Plazo",
    text: "Tu espacio, al día",
    detail: "Trámites, documentos y firmas siguen disponibles fuera de campaña.",
  },
]

/**
 * Mensajes ficticios del pulso «Ahora», anclados al calendario fiscal
 * del día en que el visitante ve la web.
 */
export function getFiscalPulse(now: Date = new Date()): FiscalPulseItem[] {
  const relevant = getRelevantTaxWindows(now)
  if (relevant.length === 0) return FALLBACK

  const primary = relevant[0]
  const items: FiscalPulseItem[] = []

  items.push(...deadlinePulse(primary))
  items.push(...modelPulse(primary))
  items.push(...docsPulse(primary))

  const secondary = relevant.find((w) => w.window.id !== primary.window.id)
  if (secondary) {
    items.push(...secondaryPulse(secondary))
  } else {
    items.push(advisorPulse(primary))
  }

  return items.slice(0, 4)
}

function deadlinePulse(w: RelevantTaxWindow): FiscalPulseItem[] {
  const period = filingPeriodLabel(w)
  const shortTitle = shortWindowTitle(w)

  if (w.status === "active") {
    const days = w.daysUntilEnd
    return [
      {
        label: "Plazo",
        text:
          days <= 0
            ? `Último día · ${shortTitle}`
            : `Quedan ${daysPhrase(days)} · ${shortTitle}`,
        detail: period
          ? `Plazo abierto para ${period}. ${w.window.rangeLabel}.`
          : `${w.window.rangeLabel}.`,
      },
    ]
  }

  return [
    {
      label: "Plazo",
      text: `En ${daysPhrase(w.daysUntilStart)} · ${shortTitle}`,
      detail: period
        ? `Se abre el plazo de ${period}. ${w.window.rangeLabel}.`
        : `Se acerca: ${w.window.rangeLabel}.`,
    },
  ]
}

function modelPulse(w: RelevantTaxWindow): FiscalPulseItem[] {
  const codes = w.window.modelCodes
  const period = filingPeriodLabel(w)
  const lead = codes[0]
  if (!lead) return []

  const label =
    w.status === "active"
      ? `Modelo ${lead}${period ? ` · ${period}` : ""} en curso`
      : `Modelo ${lead}${period ? ` · ${period}` : ""} a la vista`

  const name = modelHint(lead)
  return [
    {
      label: "Plazo",
      text: label,
      detail:
        w.status === "active"
          ? `${name}. Estado y documentos en Obligaciones.`
          : `${name}. Syntia te avisa cuando abra el plazo.`,
    },
  ]
}

function docsPulse(w: RelevantTaxWindow): FiscalPulseItem[] {
  const period = filingPeriodLabel(w)
  if (w.window.id === "renta") {
    return [
      {
        label: "Plazo",
        text: "Documentación de la Renta",
        detail: "Certificados y datos del ejercicio, listos para tu asesor.",
      },
    ]
  }
  if (w.window.id === "resumenes-anuales") {
    return [
      {
        label: "Plazo",
        text: "Resúmenes anuales · papeles del ejercicio",
        detail: "390, 190 y 180: lo que tu asesor necesita para cerrar el año.",
      },
    ]
  }
  if (w.window.id === "feb-347") {
    return [
      {
        label: "Plazo",
        text: "Operaciones con terceros · 347",
        detail: "Revisa volumen y contrapartes antes del cierre de febrero.",
      },
    ]
  }
  if (w.window.id === "sociedades") {
    return [
      {
        label: "Plazo",
        text: "Impuesto sobre Sociedades · modelo 200",
        detail: "Cuentas y ajustes del ejercicio en marcha con tu asesor.",
      },
    ]
  }
  if (!period) return []

  const months = quarterMonthSpan(w.window.quarter)
  return [
    {
      label: "Plazo",
      text: period
        ? `Facturas ${months} · para el cierre ${period}`
        : "Documentación del periodo",
      detail: "Súbelas a su carpeta; tu asesor las tiene a mano para el plazo.",
    },
  ]
}

function secondaryPulse(w: RelevantTaxWindow): FiscalPulseItem[] {
  const short = shortWindowTitle(w)
  if (w.status === "active") {
    return [
      {
        label: "Plazo",
        text:
          w.daysUntilEnd <= 0
            ? `También hoy · ${short}`
            : `También activo · ${short} (${daysPhrase(w.daysUntilEnd)})`,
        detail: w.window.rangeLabel,
      },
    ]
  }
  return [
    {
      label: "Plazo",
      text: `Próximo · ${short} en ${daysPhrase(w.daysUntilStart)}`,
      detail: w.window.rangeLabel,
    },
  ]
}

function advisorPulse(w: RelevantTaxWindow): FiscalPulseItem {
  const period = filingPeriodLabel(w)
  const code = w.window.modelCodes[0] ?? "plazo"
  return {
    label: "Plazo",
    text: period
      ? `Tu asesor revisó el ${code} de ${period}`
      : `Tu asesor dejó nota sobre ${shortWindowTitle(w)}`,
    detail: "El hilo queda dentro de la obligación, con contexto.",
  }
}

function shortWindowTitle(w: RelevantTaxWindow): string {
  const q = w.window.quarter
  if (q) {
    const names = ["1er trimestre", "2º trimestre", "3er trimestre", "4º trimestre"] as const
    return `declaraciones ${names[q - 1]}`
  }
  if (w.window.id === "renta") return "campaña de la Renta"
  if (w.window.id === "resumenes-anuales") return "resúmenes anuales"
  if (w.window.id === "feb-347") return "modelo 347"
  if (w.window.id === "sociedades") return "Impuesto sobre Sociedades"
  return w.window.title
}

function quarterMonthSpan(quarter: 1 | 2 | 3 | 4 | undefined): string {
  switch (quarter) {
    case 1:
      return "ene–mar"
    case 2:
      return "abr–jun"
    case 3:
      return "jul–sep"
    case 4:
      return "oct–dic"
    default:
      return "del periodo"
  }
}

function modelHint(code: string): string {
  const map: Record<string, string> = {
    "303": "IVA · autoliquidación",
    "111": "Retenciones del trabajo",
    "115": "Retenciones de alquileres",
    "123": "Retenciones de capital mobiliario",
    "130": "Pago fraccionado IRPF",
    "131": "Pago fraccionado IRPF (objetiva)",
    "349": "Operaciones intracomunitarias",
    "420": "IGIC · autoliquidación",
    "425": "IGIC · resumen",
    "390": "Resumen anual de IVA",
    "190": "Resumen anual de retenciones",
    "180": "Resumen anual de alquileres",
    "347": "Declaración de operaciones con terceros",
    "100": "IRPF · declaración de la Renta",
    "200": "Impuesto sobre Sociedades",
  }
  return map[code] ?? `Modelo ${code}`
}

/** Línea de Sappo coherente con el plazo más urgente. */
export function getSappoFiscalLine(now: Date = new Date()): string {
  const [primary] = getRelevantTaxWindows(now)
  if (!primary) {
    return "De momento, sin plazos fiscales a la puerta. Yo aviso cuando se acerquen."
  }

  const codes = primary.window.modelCodes
  const shown = codes.slice(0, 3).join(", ")
  const rest = codes.length - 3
  const subject =
    codes.length === 0
      ? primary.window.title
      : rest > 0
        ? `los modelos ${shown} y otros ${rest}`
        : codes.length === 1
          ? `el modelo ${shown}`
          : `los modelos ${shown}`

  if (primary.status === "active") {
    const d = primary.daysUntilEnd
    if (d <= 0) return `Conste en acta: hoy es el último día para presentar ${subject}.`
    if (d === 1) return `Conste en acta: queda 1 día para presentar ${subject}.`
    return `Conste en acta: quedan ${d} días para presentar ${subject}.`
  }

  const d = primary.daysUntilStart
  if (d <= 1) return `Atención: mañana se abre el plazo para presentar ${subject}.`
  return `Atención: en ${d} días se abre el plazo para presentar ${subject}.`
}
