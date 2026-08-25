import { BrandLogo } from "@/components/site/brand-logo"
import { ProductOf } from "@/components/site/product-of"
import { SectionShell } from "@/components/site/section-shell"
import { TextLink } from "@/components/ui/text-link"
import { footer, site } from "@/content/site"

export function Footer() {
  return (
    <footer className="border-t border-agua/30 bg-background">
      <SectionShell innerClassName="py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <BrandLogo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-on-dark">
              {footer.description}
            </p>
          </div>

          {footer.columns.map((column) => (
            <div key={column.heading}>
              <h3 className="mb-4 font-sans text-sm font-semibold text-on-dark">
                {column.heading}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <TextLink href={link.href} className="text-sm text-muted-on-dark">
                      {link.label}
                    </TextLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-2 border-t border-agua/30 pt-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-sm text-muted-on-dark">
            © {new Date().getFullYear()} {site.name} · tenaasesores. Todos los derechos
            reservados.
          </p>
          <ProductOf />
        </div>
      </SectionShell>
    </footer>
  )
}
