# Syntia — Landing

Landing page oficial de **Syntia**, la plataforma de gestión digital de [tenaasesores](https://www.tenaasesores.es).

> Repositorio privado de uso interno. Código, diseño, textos y marca son propiedad de Tena Asesores / Syntia; su uso está restringido a personas autorizadas por escrito según [LICENSE](LICENSE).

> Stack: **Next.js 16** (App Router) · React 19 · TypeScript · Tailwind CSS 4 · pnpm

## Requisitos

- Node.js **20+** (ver `.nvmrc`)
- [pnpm](https://pnpm.io/) **11+** (recomendado: la versión fijada en `packageManager`)

> pnpm 11 exige declarar builds nativos en `pnpm-workspace.yaml` (`allowBuilds`). Ya está configurado para `sharp` y `unrs-resolver`.

## Arranque local

```bash
pnpm install
pnpm dev
```

Abre [http://localhost:3002](http://localhost:3002).

## Scripts

| Comando | Descripción |
| --- | --- |
| `pnpm dev` | Servidor de desarrollo |
| `pnpm build` | Build de producción |
| `pnpm start` | Sirve el build (`next start`) |
| `pnpm lint` | ESLint (Next core-web-vitals) |
| `pnpm typecheck` | Comprobación de tipos (`tsc --noEmit`) |

## Producción

```bash
pnpm install --frozen-lockfile
pnpm build
pnpm start
```

Despliegue: **Vercel**. Analytics (`@vercel/analytics`) solo se carga en `NODE_ENV=production`.

### Checklist pre-deploy

1. Revisar URLs y textos en [`content/site.ts`](content/site.ts)
2. Confirmar assets de marca en `public/brand/`
3. `pnpm lint` y `pnpm build` sin errores
4. Comprobar SEO: `/robots.txt`, `/sitemap.xml`, Open Graph

## Estructura

```
app/                 # App Router (layout, página, robots, sitemap)
components/site/     # Secciones de la landing
components/ui/       # Primitivos UI (shadcn / Base UI)
content/site.ts      # Copy, nav y URLs (fuente de verdad de contenido)
public/brand/        # Logo, favicons, manifest
```

## Contenido y marca

Todo el copy editable vive en `content/site.ts` (`site`, `hero`, `platform`, `howItWorks`, `finalCta`, `footer`). Los colores corporativos están documentados en `app/globals.css`.

## Licencia y propiedad

Software propietario. **Todos los derechos reservados** © 2026 Tena Asesores / Syntia.

No se concede ninguna licencia al público: queda prohibido copiar, bifurcar (fork), modificar, redistribuir o reutilizar el código, el diseño, los textos o los elementos de marca sin autorización escrita. Ver [LICENSE](LICENSE) para los términos completos.
