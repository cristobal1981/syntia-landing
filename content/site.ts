/**
 * Contenido de la landing de Syntia.
 * Lenguaje de cliente: se habla de lo que el cliente hace en el portal.
 * Las secciones de página solo componen estos módulos.
 */

export const brand = {
  wordmark: "Syntia",
  logoSrc: "/brand/syntia-logo_horizontal-negativo.webp",
  isotipoSrc: "/brand/syntia-isotipo.svg",
  logoWidth: 640,
  logoHeight: 160,
} as const

/* -------------------------------------------------------------------------- */
/* Sitio / metadata                                                           */
/* -------------------------------------------------------------------------- */

export const site = {
  name: "Syntia",
  tagline: "Digitaliza. Innova. Crece.",
  /** Descriptor corto de marca (hero, footer, meta) */
  descriptor: "Plataforma digital de asesoría: clara, moderna y cercana.",
  productOf: "Un producto de tenaasesores",
  title: "Syntia | Portal de cliente de tenaasesores",
  description:
    "Syntia es la plataforma digital de asesoría de tenaasesores: sigue tus trámites, sube documentos, firma y habla con tu asesor desde un único espacio claro y siempre disponible.",
  url: "https://www.syntia.es",
  appUrl: "https://app.syntia.es",
  advisorUrl: "https://www.tenaasesores.es",
  advisorLogoSrc: "/brand/tenaasesores-bg_dark.webp",
  advisorLogoWidth: 320,
  advisorLogoHeight: 64,
  email: "hola@syntia.es",
} as const

/** Relación con tenaasesores (product-of) */
export const productOf = {
  label: "Un producto de tenaasesores",
  description:
    "Syntia es el espacio digital de los clientes de tenaasesores. Tu asesor sigue siendo el mismo: ahora con todo a mano para ti.",
  href: site.advisorUrl,
  logoSrc: site.advisorLogoSrc,
  logoWidth: site.advisorLogoWidth,
  logoHeight: site.advisorLogoHeight,
} as const

/* -------------------------------------------------------------------------- */
/* Navegación                                                                 */
/* -------------------------------------------------------------------------- */

export const navItems = [
  { label: "Plataforma", href: "#plataforma" },
  { label: "Funcionalidades", href: "#funcionalidades" },
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "Contacto", href: "#contacto" },
] as const

/** CTA del topbar → app.syntia.es */
export const navCta = "Ir al portal" as const

/* -------------------------------------------------------------------------- */
/* Hero                                                                       */
/* -------------------------------------------------------------------------- */

export const hero = {
  eyebrow: site.tagline,
  title: "Tu asesoría, clara y al día",
  subtitle:
    "Syntia es el portal de cliente de tenaasesores. Consulta el estado de tus trámites, sube documentos, firma y habla con tu asesor desde un único sitio.",
  ctaPrimary: "Ir al portal",
  ctaSecondary: "Ver funcionalidades",
  ctaSecondaryHref: "#funcionalidades",
  /** Split de audiencia bajo los CTAs */
  note: "¿Ya eres cliente? Entra al portal. Si aún no tienes acceso, solicítalo a tu asesor.",
  browserUrl: "app.syntia.es",
  /** Se sustituirá por el mock de Inicio; la captura queda como fallback */
  mock: "inicio",
  screenshot: "/demos/demo-inicio.png",
  screenshotAlt: "Pantalla de inicio de Syntia",
  screenshotWidth: 1920,
  screenshotHeight: 959,
} as const

/* -------------------------------------------------------------------------- */
/* Plataforma / Qué resuelve                                                  */
/* -------------------------------------------------------------------------- */

export const platform = {
  id: "plataforma",
  eyebrow: "Qué resuelve",
  title: "Menos correos, más claridad",
  subtitle:
    "Todo lo que antes se repartía entre emails, llamadas y carpetas compartidas, ahora vive en un solo espacio con el estado de cada gestión a la vista.",
  browserUrl: "app.syntia.es/documentos",
  mock: "documentos",
  screenshot: "/demos/demo-documentos.png",
  screenshotAlt: "Documentos en Syntia",
  screenshotWidth: 1920,
  screenshotHeight: 959,
  highlights: [
    {
      title: "Sabes en qué punto está cada cosa",
      description:
        "Cada trámite tiene su estado y su historial. Sin preguntar, sin esperar a que te respondan un correo.",
    },
    {
      title: "Tus documentos, ordenados y a mano",
      description:
        "Sube facturas y papeles a su carpeta y encuentra lo que necesites cuando lo necesites.",
    },
    {
      title: "Firma sin imprimir ni desplazarte",
      description:
        "Los documentos pendientes de firma te esperan en un apartado propio, con su historial.",
    },
    {
      title: "Un hilo directo con tu asesor",
      description:
        "Las consultas y las respuestas quedan dentro de cada trámite, para no perder el contexto.",
    },
  ],
  cta: {
    note: "Si ya eres cliente, entra al portal. Si aún no, sigue con las funcionalidades.",
    primary: "Ir al portal",
    secondary: "Ver funcionalidades",
    secondaryHref: "#funcionalidades",
  },
} as const

/* -------------------------------------------------------------------------- */
/* Sappo — acompañante del portal                                             */
/* -------------------------------------------------------------------------- */

export const sappo = {
  name: "Sappo",
  role: "Tu acompañante en Syntia",
  logoSrc: "/brand/sappo/logo-sappo_verde_syntia.webp",
  logoSrcColor: "/brand/sappo/logo-sappo_colores-45deg.webp",
  logoWidth: 128,
  logoHeight: 128,
  /**
   * Bocadillos en «Cómo funciona» (click / rotación, como en errores de la app).
   * Tono Sappo: seco, preciso, un punto de humor sin coloquialismos.
   */
  onboardingCroaks: [
    "Conste en acta: el alta lo pide tu asesor. Yo te espero dentro — sin laberinto de correos.",
    "Tres pasos y listo. Yo no firmo el alta: te recibo cuando entres.",
    "Empezar es pedirlo. Encontrarlo todo después… eso ya es cosa mía.",
    "Tu asesor abre la puerta. Yo me encargo de que no te pierdas dentro.",
  ],
  /** Frases genéricas; plazos concretos salen de lib/fiscal-pulse (calendario). */
  lines: [
    "Si hay una firma pendiente, te la dejo bien a la vista.",
    "Tu asesor sigue siendo el mismo. Yo te acompaño dentro del portal.",
    "Guías, plazos y papeles: lo urgente, primero. Lo demás, en su sitio.",
  ],
} as const

/* -------------------------------------------------------------------------- */
/* Tour de funcionalidades                                                    */
/* -------------------------------------------------------------------------- */

export type FeatureId =
  | "inicio"
  | "tramites"
  | "obligaciones"
  | "documentos"
  | "firmas"
  | "guias"

export type Feature = {
  id: FeatureId
  /** Ancla de la sección: #feature-<id> */
  anchor: string
  /** Nombre tal y como aparece en el menú del portal */
  navLabel: string
  eyebrow: string
  title: string
  description: string
  bullets: readonly string[]
  /** URL ficticia mostrada en la barra del BrowserFrame */
  browserUrl: string
  /** Clave del mock a renderizar */
  mock: FeatureId
  /** Alt/aria del mock */
  mockLabel: string
  /** Sección más ligera (menos peso visual) */
  compact?: boolean
}

export const featuresSection = {
  id: "funcionalidades",
  eyebrow: "Funcionalidades",
  title: "Lo que usas cada semana",
  subtitle:
    "Tres piezas del día a día con tu asesoría: trámites con conversación, plazos fiscales y documentos en su sitio.",
} as const

/** Tour corto: Inicio vive en el hero; Firmas/Guías ya están en “Qué resuelve”. */
export const features: readonly Feature[] = [
  {
    id: "tramites",
    anchor: "feature-tramites",
    navLabel: "Trámites",
    eyebrow: "Trámites",
    title: "Cada trámite, con su conversación",
    description:
      "Abre una nueva consulta o sigue un trámite en marcha. Cada uno tiene su estado, su detalle y la conversación con tu asesor en el mismo sitio.",
    bullets: [
      "Lista de trámites y consultas con su estado",
      "Conversación con tu asesor dentro de cada trámite",
      "Nueva consulta en pocos pasos",
    ],
    browserUrl: "app.syntia.es/tramites",
    mock: "tramites",
    mockLabel: "Lista de trámites con panel de detalle y conversación",
  },
  {
    id: "obligaciones",
    anchor: "feature-obligaciones",
    navLabel: "Obligaciones",
    eyebrow: "Obligaciones",
    title: "Qué toca ahora, qué viene después",
    description:
      "Tus obligaciones ordenadas por urgencia: lo que toca ahora, lo que está en curso y lo que ya está hecho. Para llegar a cada plazo sin sorpresas.",
    bullets: [
      "Apartado “Qué toca ahora” con lo más inmediato",
      "Seguimiento de lo que está en curso",
      "Histórico de lo ya completado",
    ],
    browserUrl: "app.syntia.es/obligaciones",
    mock: "obligaciones",
    mockLabel: "Obligaciones agrupadas en qué toca ahora, en curso y hecho",
  },
  {
    id: "documentos",
    anchor: "feature-documentos",
    navLabel: "Documentos",
    eyebrow: "Documentos",
    title: "Tus papeles, en su carpeta",
    description:
      "Navega por carpetas, sube una factura en segundos y encuentra cualquier documento de tu asesoría sin buscar entre correos antiguos.",
    bullets: [
      "Carpetas organizadas por tipo de documento",
      "Subida de facturas y archivos desde el navegador",
      "Descarga de lo que tu asesor comparte contigo",
    ],
    browserUrl: "app.syntia.es/documentos",
    mock: "documentos",
    mockLabel: "Explorador de carpetas del portal",
  },
] as const

/* -------------------------------------------------------------------------- */
/* Cómo funciona                                                              */
/* -------------------------------------------------------------------------- */

export const howItWorks = {
  id: "como-funciona",
  badge: "Cómo funciona",
  title: "Empezar con Syntia es muy sencillo",
  subtitle:
    "Solo para clientes de tenaasesores. Tu asesor te da acceso y, a partir de ahí, gestionas tu espacio desde el portal.",
  /** CTA propio de la sección (distinto del final: aquí portal; allí también tena). */
  ctaPrimary: "Ir al portal",
  steps: [
    {
      number: "01",
      title: "Solicitas el alta",
      description:
        "Pídelo a tu asesor de tenaasesores. Preparamos tu espacio Syntia con tus datos para que esté listo desde el primer día.",
    },
    {
      number: "02",
      title: "Accedes a tu espacio",
      description:
        "Recibes tus credenciales y entras al portal desde cualquier dispositivo. Tus trámites y documentos te esperan dentro.",
    },
    {
      number: "03",
      title: "Lo usas en el día a día",
      description:
        "Consulta el estado de tus gestiones, sube documentos, firma y escribe a tu asesor cuando lo necesites.",
    },
  ],
} as const

/* -------------------------------------------------------------------------- */
/* CTA final                                                                  */
/* -------------------------------------------------------------------------- */

export const finalCta = {
  id: "contacto",
  eyebrow: site.tagline,
  title: "Accede a tu espacio Syntia",
  subtitle:
    "Si ya eres cliente, entra al portal. Si aún no tienes acceso, habla con tu asesor en tenaasesores y solicita el alta.",
  primary: "Ir al portal",
  primaryHref: site.appUrl,
  secondary: "Hablar con tenaasesores",
  secondaryHref: site.advisorUrl,
} as const

/* -------------------------------------------------------------------------- */
/* Footer                                                                     */
/* -------------------------------------------------------------------------- */

export const footer = {
  description:
    "Syntia es la plataforma digital de asesoría de tenaasesores: clara, moderna y cercana. Digitaliza. Innova. Crece.",
  columns: [
    {
      heading: "Plataforma",
      links: [
        { label: "Ir al portal", href: "https://app.syntia.es" },
        { label: "Funcionalidades", href: "#funcionalidades" },
        { label: "Cómo funciona", href: "#como-funciona" },
      ],
    },
    {
      heading: "Contacto",
      links: [
        { label: "tenaasesores", href: "https://www.tenaasesores.es" },
        { label: "hola@syntia.es", href: "mailto:hola@syntia.es" },
      ],
    },
  ],
} as const
