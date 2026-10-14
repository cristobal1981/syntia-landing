/**
 * Fictional client-portal data for landing UI mocks.
 * Vocabulary aligned with syntia-app (tramites, obligaciones, firmas, guías, documentos).
 */

// —— Shared types ——

export type PortalNavIcon =
  | "home"
  | "obligations"
  | "procedures"
  | "documents"
  | "signatures"
  | "guides"

export type PortalNavItem = {
  label: string
  href: string
  icon: PortalNavIcon
}

export type TaskStateBadgeVariant =
  | "inProgress"
  | "changesRequested"
  | "done"
  | "canceled"
  | "unknown"

export type TramiteListType = "tramite" | "consulta"

export type TramiteListItem = {
  id: string
  name: string
  type: TramiteListType
  stateLabel: string
  stateVariant: TaskStateBadgeVariant
  tags?: readonly string[]
  attachmentCount?: number
  updatedAt: string
  unreadMessages?: number
}

export type ChatterMessage = {
  id: string
  authorName: string
  authorRole: "client" | "advisor"
  body: string
  sentAt: string
  isNew?: boolean
}

export type TramiteDetailMock = {
  selectedId: string
  subject: string
  type: TramiteListType
  stateLabel: string
  stateVariant: TaskStateBadgeVariant
  messages: readonly ChatterMessage[]
}

export type ObligacionDeadlineStatus = "overdue" | "dueSoon" | "none"

export type ObligacionRow = {
  id: string
  period: string
  modelCode: string
  modelName: string
  stateLabel: string
  stateVariant: TaskStateBadgeVariant
  deadline: string
  deadlineStatus: ObligacionDeadlineStatus
  documentCount: number
  year: number
}

export type DocumentEntryKind = "folder" | "file"

export type DocumentEntry = {
  id: string
  name: string
  kind: DocumentEntryKind
  modifiedAt?: string
  sizeLabel?: string
  mimeHint?: "pdf" | "image" | "spreadsheet" | "folder"
}

export type DocumentBreadcrumb = {
  label: string
  path: string
}

export type FirmaPendingItem = {
  id: string
  title: string
  sentAt: string
  dueAt: string
  dueSoon: boolean
  statusLabel: string
}

export type FirmaHistoryItem = {
  id: string
  title: string
  signedAt: string
  createdAt: string
  statusLabel: string
}

export type GuideCategoryId =
  | "impuestos-periodicos"
  | "campanas-anuales"
  | "autonomos-y-empresa"
  | "referencia"

export type GuideHubEntry = {
  slug: string
  title: string
  description: string
  category: GuideCategoryId
  categoryLabel: string
  tags: readonly string[]
}

export type TaxCalendarHighlight = {
  id: string
  title: string
  rangeLabel: string
  modelCodes: readonly string[]
  badge: "active" | "upcoming"
  badgeLabel: string
}

export type HomeNotification = {
  id: string
  type: "tramite" | "consulta" | "obligacion" | "firma" | "document"
  title: string
  description: string
  timeAgo: string
}

export type HomeQuickLink = {
  label: string
  href: string
  icon: PortalNavIcon
}

// —— Product labels (client portal copy) ——

export const mockPortalLabels = {
  nav: {
    inicio: "Inicio",
    obligaciones: "Obligaciones",
    tramites: "Trámites",
    documentos: "Documentos",
    firmas: "Firmas",
    guias: "Guías",
  },
  tramites: {
    title: "Tus trámites",
    nuevaConsulta: "Nueva consulta",
    types: { tramite: "Trámite", consulta: "Consulta" } as const,
    taskStates: {
      inProgress: "En curso",
      changesRequested: "Cambios solicitados",
      approved: "Aprobado",
      waiting: "En espera",
      done: "Hecho",
      canceled: "Cancelado",
    },
    chatter: {
      title: "Conversación",
      composerPlaceholder: "Escribe un mensaje…",
      youLabel: "Tú",
    },
  },
  obligaciones: {
    title: "Obligaciones fiscales",
    urgentTitle: "Qué toca ahora",
    pendingTitle: "En curso",
    closedTitle: "Hecho",
    taskStates: {
      inProgress: "En curso",
      changesRequested: "Cambios solicitados",
      done: "Presentado",
      canceled: "Cancelado",
    },
    deadline: {
      overdue: "Atrasado",
      dueSoon: "Vence pronto",
    },
  },
  documentos: {
    title: "Documentos",
    upload: "Subir archivos",
    quickInvoiceFolder: "Facturas de compra",
  },
  firmas: {
    tabs: { pending: "Pendientes", history: "Firmadas" },
    signAction: "Firmar documento",
    statusPending: "Pendiente de firma",
    statusSigned: "Firmado",
  },
  guias: {
    title: "Guías",
    nowTitle: "Ahora toca",
    allTitle: "Todas las guías",
    readGuide: "Leer guía",
    badges: { active: "Plazo abierto", upcoming: "Empieza pronto" },
  },
  home: {
    greeting: "Hola,",
    statsTitle: "Resumen",
    unreadTitle: "Novedades",
    quickLinksTitle: "Accesos rápidos",
  },
} as const

// —— Fictional client ——

export const mockClient = {
  firstName: "Elena",
  displayName: "Elena Ruiz",
  companyName: "Estudio Ruiz Arquitectura SL",
  advisorName: "Lucía Morales",
  advisorRoleLabel: "Asesor Syntia",
} as const

export const mockPortalNav: readonly PortalNavItem[] = [
  { label: mockPortalLabels.nav.inicio, href: "/dashboard", icon: "home" },
  {
    label: mockPortalLabels.nav.obligaciones,
    href: "/obligaciones",
    icon: "obligations",
  },
  { label: mockPortalLabels.nav.tramites, href: "/tramites", icon: "procedures" },
  {
    label: mockPortalLabels.nav.documentos,
    href: "/documentos",
    icon: "documents",
  },
  { label: mockPortalLabels.nav.firmas, href: "/firmas", icon: "signatures" },
  { label: mockPortalLabels.nav.guias, href: "/guias", icon: "guides" },
] as const

// —— Inicio ——

export const mockInicio = {
  activeNav: "home" as const,
  /** Titular del resumen (mismo patrón que ClientHomeStats en la app). */
  headline: "Tienes 2 obligaciones en curso",
  headlineKind: "obligaciones" as const,
  stats: {
    activeTramitesAndConsultas: 3,
    obligacionesInProgress: 2,
    pendingSignatures: 1,
  },
  statsLabels: {
    activeTramitesAndConsultas: "trámites y consultas activos",
    obligacionesInProgress: "obligaciones en curso",
    pendingSignatures: "solicitudes de firma",
  },
  notifications: [
    {
      id: "n1",
      type: "consulta",
      title: "Consulta · Duda modelo 303",
      description: "Lucía te ha respondido en la conversación.",
      timeAgo: "Hace 2 h",
    },
    {
      id: "n2",
      type: "obligacion",
      title: "Modelo 111 · 3T 2026",
      description: "Cambios solicitados: falta el detalle de retenciones de septiembre.",
      timeAgo: "Ayer",
    },
    {
      id: "n3",
      type: "firma",
      title: "Nueva solicitud de firma",
      description: "Contrato de colaboración 2026–2027 pendiente de tu firma.",
      timeAgo: "Hace 3 días",
    },
  ] satisfies readonly HomeNotification[],
  quickLinks: [
    { label: mockPortalLabels.nav.documentos, href: "/documentos", icon: "documents" },
    { label: mockPortalLabels.nav.obligaciones, href: "/obligaciones", icon: "obligations" },
    { label: mockPortalLabels.nav.tramites, href: "/tramites", icon: "procedures" },
    { label: mockPortalLabels.nav.guias, href: "/guias", icon: "guides" },
  ] satisfies readonly HomeQuickLink[],
} as const

// —— Trámites (+ chat) ——

export const mockTramitesList: readonly TramiteListItem[] = [
  {
    id: "t-303",
    name: "Autoliquidación IVA · 3T 2026",
    type: "tramite",
    stateLabel: mockPortalLabels.tramites.taskStates.inProgress,
    stateVariant: "inProgress",
    tags: ["IVA", "303"],
    attachmentCount: 4,
    updatedAt: "14 oct 2026",
    unreadMessages: 1,
  },
  {
    id: "t-consulta-retenciones",
    name: "Duda sobre retenciones en factura de diseño",
    type: "consulta",
    stateLabel: mockPortalLabels.tramites.taskStates.changesRequested,
    stateVariant: "changesRequested",
    tags: ["Consulta"],
    attachmentCount: 1,
    updatedAt: "13 oct 2026",
    unreadMessages: 2,
  },
  {
    id: "t-alta-trabajador",
    name: "Alta de trabajador · incorporación octubre",
    type: "tramite",
    stateLabel: mockPortalLabels.tramites.taskStates.waiting,
    stateVariant: "inProgress",
    tags: ["Laboral"],
    attachmentCount: 2,
    updatedAt: "9 oct 2026",
  },
  {
    id: "t-consulta-347",
    name: "¿Debo incluir a un proveedor en el 347?",
    type: "consulta",
    stateLabel: mockPortalLabels.tramites.taskStates.inProgress,
    stateVariant: "inProgress",
    updatedAt: "6 oct 2026",
  },
] as const

export const mockTramiteDetail: TramiteDetailMock = {
  selectedId: "t-consulta-retenciones",
  subject: "Duda sobre retenciones en factura de diseño",
  type: "consulta",
  stateLabel: mockPortalLabels.tramites.taskStates.changesRequested,
  stateVariant: "changesRequested",
  messages: [
    {
      id: "m1",
      authorName: mockClient.displayName,
      authorRole: "client",
      body: "Hola Lucía, he recibido una factura de un diseñador freelance por 2.400 €. ¿Debo retener IRPF? Te adjunto el PDF.",
      sentAt: "10 oct 2026, 11:24",
    },
    {
      id: "m2",
      authorName: mockClient.advisorName,
      authorRole: "advisor",
      body: "Gracias, Elena. En principio sí aplica retención del 15 % si es actividad profesional. Necesito confirmar si figura como autónomo en el epígrafe correcto — ¿puedes subir también el justificante de alta?",
      sentAt: "10 oct 2026, 16:02",
    },
    {
      id: "m3",
      authorName: mockClient.displayName,
      authorRole: "client",
      body: "Subo el justificante en Documentos y te aviso por aquí.",
      sentAt: "11 oct 2026, 09:15",
    },
    {
      id: "m4",
      authorName: mockClient.advisorName,
      authorRole: "advisor",
      body: "Perfecto. Mientras tanto, no pagues la factura sin retención: lo dejamos en «Cambios solicitados» hasta tener el alta.",
      sentAt: "13 oct 2026, 10:41",
      isNew: true,
    },
  ],
} as const

export const mockTramites = {
  activeNav: "procedures" as const,
  list: mockTramitesList,
  detail: mockTramiteDetail,
  drawerNewConsulta: {
    subjectPlaceholder: "Ej. Duda sobre el modelo 303…",
    draftSubject: "",
    draftBody: "",
  },
} as const

// —— Obligaciones ——

export const mockObligaciones = {
  activeNav: "obligations" as const,
  urgent: [
    {
      id: "o-111-3t",
      period: "3T 2026",
      modelCode: "111",
      modelName: "Retenciones e ingresos a cuenta",
      stateLabel: mockPortalLabels.obligaciones.taskStates.changesRequested,
      stateVariant: "changesRequested",
      deadline: "20 oct 2026",
      deadlineStatus: "dueSoon",
      documentCount: 3,
      year: 2026,
    },
    {
      id: "o-303-3t",
      period: "3T 2026",
      modelCode: "303",
      modelName: "IVA · Autoliquidación",
      stateLabel: mockPortalLabels.obligaciones.taskStates.inProgress,
      stateVariant: "inProgress",
      deadline: "20 oct 2026",
      deadlineStatus: "dueSoon",
      documentCount: 6,
      year: 2026,
    },
  ] satisfies readonly ObligacionRow[],
  pending: [
    {
      id: "o-130-3t",
      period: "3T 2026",
      modelCode: "130",
      modelName: "Pago fraccionado IRPF",
      stateLabel: mockPortalLabels.obligaciones.taskStates.inProgress,
      stateVariant: "inProgress",
      deadline: "20 oct 2026",
      deadlineStatus: "none",
      documentCount: 0,
      year: 2026,
    },
    {
      id: "o-349-3t",
      period: "3T 2026",
      modelCode: "349",
      modelName: "Operaciones intracomunitarias",
      stateLabel: mockPortalLabels.obligaciones.taskStates.inProgress,
      stateVariant: "inProgress",
      deadline: "—",
      deadlineStatus: "none",
      documentCount: 1,
      year: 2026,
    },
  ] satisfies readonly ObligacionRow[],
  closedByYear: {
    2026: [
      {
        id: "o-303-2t",
        period: "2T 2026",
        modelCode: "303",
        modelName: "IVA · Autoliquidación",
        stateLabel: mockPortalLabels.obligaciones.taskStates.done,
        stateVariant: "done",
        deadline: "20 jul 2026",
        deadlineStatus: "none",
        documentCount: 5,
        year: 2026,
      },
      {
        id: "o-111-2t",
        period: "2T 2026",
        modelCode: "111",
        modelName: "Retenciones e ingresos a cuenta",
        stateLabel: mockPortalLabels.obligaciones.taskStates.done,
        stateVariant: "done",
        deadline: "20 jul 2026",
        deadlineStatus: "none",
        documentCount: 2,
        year: 2026,
      },
    ],
    2025: [
      {
        id: "o-390-2025",
        period: "Ejercicio 2025",
        modelCode: "390",
        modelName: "Resumen anual de IVA",
        stateLabel: mockPortalLabels.obligaciones.taskStates.done,
        stateVariant: "done",
        deadline: "30 ene 2026",
        deadlineStatus: "none",
        documentCount: 1,
        year: 2025,
      },
    ],
  } as const satisfies Record<number, readonly ObligacionRow[]>,
} as const

// —— Documentos ——

export const mockDocumentos = {
  activeNav: "documents" as const,
  currentPath: "/documentos",
  breadcrumbs: [
    { label: "Inicio", path: "/documentos" },
  ] satisfies readonly DocumentBreadcrumb[],
  /** Carpetas raíz del drive del cliente (como en app). */
  entries: [
    {
      id: "d-folder-year",
      name: "Año en curso",
      kind: "folder",
      modifiedAt: "13 oct 2026",
      mimeHint: "folder",
    },
    {
      id: "d-folder-perm",
      name: "Documentación permanente",
      kind: "folder",
      modifiedAt: "13 oct 2026",
      mimeHint: "folder",
    },
    {
      id: "d-folder-hist",
      name: "Histórico",
      kind: "folder",
      modifiedAt: "12 oct 2026",
      mimeHint: "folder",
    },
  ] satisfies readonly DocumentEntry[],
  uploadHint: {
    folderLabel: mockPortalLabels.documentos.quickInvoiceFolder,
    limits: "PDF, imágenes u Office. Hasta 10 archivos y 10 MB en total.",
  },
} as const

// —— Firmas ——

export const mockFirmas = {
  activeNav: "signatures" as const,
  activeTab: "pending" as const,
  pending: [
    {
      id: "f-contrato-colab",
      title: "Contrato de colaboración 2026–2027",
      sentAt: "11 oct 2026",
      dueAt: "25 oct 2026",
      dueSoon: true,
      statusLabel: mockPortalLabels.firmas.statusPending,
    },
  ] satisfies readonly FirmaPendingItem[],
  history: [
    {
      id: "f-sepa",
      title: "Orden de domiciliación SEPA · cuota autónomos",
      signedAt: "18 sep 2026",
      createdAt: "15 sep 2026",
      statusLabel: mockPortalLabels.firmas.statusSigned,
    },
    {
      id: "f-rgpd",
      title: "Anexo de protección de datos (RGPD)",
      signedAt: "4 mar 2026",
      createdAt: "2 mar 2026",
      statusLabel: mockPortalLabels.firmas.statusSigned,
    },
  ] satisfies readonly FirmaHistoryItem[],
} as const

// —— Guías ——

export const mockGuias = {
  activeNav: "guides" as const,
  sappoMessage:
    "Conste en acta: quedan 6 días para presentar los modelos 303, 111, 115 y otros 6.",
  calendarHighlights: [
    {
      id: "t3-2026",
      title: "Declaraciones del 3er trimestre",
      rangeLabel: "Del 1 al 20 de octubre",
      modelCodes: ["303", "111", "115", "123", "130", "131", "349", "420", "425"],
      badge: "active",
      badgeLabel: mockPortalLabels.guias.badges.active,
    },
    {
      id: "resumenes-anuales",
      title: "Resúmenes anuales",
      rangeLabel: "Del 1 al 31 de enero",
      modelCodes: ["390", "190"],
      badge: "upcoming",
      badgeLabel: mockPortalLabels.guias.badges.upcoming,
    },
  ] satisfies readonly TaxCalendarHighlight[],
  entries: [
    {
      slug: "cierre-trimestral",
      title: "Cierre trimestral: IVA y retenciones",
      description:
        "Qué se presenta cada trimestre, qué documentación necesita tu asesoría y cómo prepararte para que el cierre sea rápido.",
      category: "impuestos-periodicos",
      categoryLabel: "Impuestos periódicos",
      tags: ["trimestral", "iva", "retenciones"],
    },
    {
      slug: "resumenes-anuales-enero",
      title: "Resúmenes anuales de enero",
      description:
        "Además del cuarto trimestre, en enero se presentan los resúmenes informativos del año: IVA, retenciones y alquileres.",
      category: "impuestos-periodicos",
      categoryLabel: "Impuestos periódicos",
      tags: ["anual", "enero", "resumen"],
    },
    {
      slug: "alta-autonomo",
      title: "Darse de alta como autónomo",
      description:
        "Los pasos del alta: censo de Hacienda, RETA en la Seguridad Social y las primeras obligaciones que llegan después.",
      category: "autonomos-y-empresa",
      categoryLabel: "Autónomos y empresa",
      tags: ["autónomo", "alta", "inicio"],
    },
  ] satisfies readonly GuideHubEntry[],
} as const

/** Aggregate export for mock shell chrome (sidebar + active route). */
export const mockPortalChrome = {
  client: mockClient,
  nav: mockPortalNav,
  labels: mockPortalLabels,
  browserUrl: "app.syntia.es",
} as const
