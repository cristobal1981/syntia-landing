export const brand = {
  wordmark: "Syntia",
  logoSrc: "/brand/syntia-logo_horizontal-negativo.webp",
  isotipoSrc: "/brand/syntia-isotipo.svg",
  logoWidth: 640,
  logoHeight: 160,
} as const

export const site = {
  name: "Syntia",
  tagline: "Digitaliza. Innova. Crece.",
  productOf: "Un producto de Tena Asesores",
  description:
    "Syntia es el portal de cliente de Tena Asesores: una capa sobre Odoo que da a cada cliente la información, los documentos y el seguimiento que el portal nativo deja demasiado simples.",
  url: "https://www.syntia.es",
  appUrl: "https://app.syntia.es",
  advisorUrl: "https://www.tenaasesores.es",
  advisorLogoSrc: "/brand/tenaasesores-logo.webp",
  advisorLogoWidth: 320,
  advisorLogoHeight: 64,
  email: "hola@syntia.es",
} as const

export const navItems = [
  { label: "Plataforma", href: "#plataforma" },
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "Contacto", href: "#contacto" },
] as const

export const hero = {
  title: {
    prefix: "Tu asesoría,",
    highlight: "en una sola pantalla",
  },
  subtitle:
    "Syntia no es una herramienta aparte: es el portal de cliente de Tena Asesores, construido sobre Odoo para que veas documentos, trámites y el estado real de tus gestiones con la claridad que el portal estándar no ofrece.",
  ctaPrimary: "Acceso a la plataforma",
  ctaSecondary: "Ver cómo funciona",
  browserUrl: "app.syntia.es",
  screenshot: "/demos/demo-inicio.png",
  screenshotAlt: "Inicio de la plataforma Syntia",
  screenshotWidth: 1920,
  screenshotHeight: 959,
} as const

export const platform = {
  title: ["La capa de portal", "que Odoo no resuelve solo"],
  subtitle:
    "Odoo cubre la gestión interna de la asesoría. Syntia se centra en lo que el cliente ve: un portal con contexto, seguimiento e información suficiente para entender qué pasa con su expediente.",
  browserUrl: "app.syntia.es/documentos",
  screenshot: "/demos/demo-documentos.png",
  screenshotAlt: "Gestión de documentos en Syntia",
  screenshotWidth: 1920,
  screenshotHeight: 959,
  highlights: [
    {
      title: "Portal de cliente, de verdad",
      description:
        "El portal nativo de Odoo se queda corto para un cliente de asesoría. Syntia lo amplía con la información y el recorrido que sí necesita.",
    },
    {
      title: "Capa sobre Odoo",
      description:
        "No sustituye el ERP: se apoya en Odoo y organiza lo que ya gestionamos por dentro, para mostrártelo de forma clara por fuera.",
    },
    {
      title: "Documentos, trámites y comunicación",
      description:
        "Consulta el estado de tus gestiones, sube documentación y habla con tu asesor sin perder el hilo entre correos y carpetas.",
    },
  ],
} as const

export const howItWorks = {
  badge: "Cómo funciona",
  title: ["Empezar con Syntia", "es muy sencillo"],
  subtitle:
    "Solo para clientes de Tena Asesores. Tu asesor te da acceso y, a partir de ahí, gestionas tu espacio desde el portal.",
  steps: [
    {
      number: "01",
      title: "Solicitas el alta",
      description:
        "Pídelo a tu asesor de Tena Asesores. Preparamos tu espacio Syntia con tus datos y lo conectamos a lo que ya gestionamos en Odoo.",
      cta: { label: "Solicitar alta a tu asesor", href: "https://www.tenaasesores.es" },
    },
    {
      number: "02",
      title: "Accedes a tu espacio",
      description:
        "Recibes tus credenciales y entras al portal. Documentación y trámites visibles desde el primer día, sin depender del portal básico de Odoo.",
    },
    {
      number: "03",
      title: "Consultas con contexto",
      description:
        "Sube documentos, sigue gestiones y habla con tu asesor con la información suficiente para saber dónde está cada cosa.",
    },
  ],
} as const

export const finalCta = {
  title: "Accede a tu espacio Syntia",
  subtitle:
    "Syntia es el portal de cliente de Tena Asesores. Si ya eres cliente, entra. Si aún no, solicita el alta a tu asesor y empieza a ver tu asesoría con la claridad que necesitas.",
  primary: "Acceso a la plataforma",
  secondary: "Solicitar alta",
} as const

export const footer = {
  description:
    "Syntia es un producto de Tena Asesores: una capa sobre Odoo pensada para el portal de cliente, con la información y el seguimiento que el portal nativo deja incompletos.",
  columns: [
    {
      heading: "Plataforma",
      links: [
        { label: "Acceso a la plataforma", href: "https://app.syntia.es" },
        { label: "Cómo funciona", href: "#como-funciona" },
      ],
    },
    {
      heading: "Contacto",
      links: [
        { label: "Tena Asesores", href: "https://www.tenaasesores.es" },
        { label: "hola@syntia.es", href: "mailto:hola@syntia.es" },
      ],
    },
  ],
} as const
