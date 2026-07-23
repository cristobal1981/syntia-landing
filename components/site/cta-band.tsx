import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionShell } from "@/components/site/section-shell"
import { ProductOf } from "@/components/site/product-of"
import { finalCta, site } from "@/content/site"

export function CtaBand() {
  return (
    <SectionShell
      id="contacto"
      className="bg-brisa"
      innerClassName="py-20 text-center md:py-28"
    >
      <div className="mx-auto max-w-2xl">
        <ProductOf labelClassName="text-accent-on-light" />
        <h2 className="mt-4 text-3xl font-bold text-balance text-on-light sm:text-4xl md:text-5xl">
          {finalCta.title}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-pretty text-on-light-muted sm:text-lg">
          {finalCta.subtitle}
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            size="lg"
            nativeButton={false}
            className="h-12 bg-agua px-7 text-base font-semibold text-on-dark hover:bg-agua/90"
            render={
              <a href={site.appUrl} target="_blank" rel="noopener noreferrer">
                {finalCta.primary}
                <ArrowRight className="ml-2 size-4" />
              </a>
            }
          />
          <Button
            size="lg"
            variant="outline"
            nativeButton={false}
            className="h-12 border-on-light/20 bg-transparent px-7 text-base font-semibold text-on-light hover:bg-on-light/5 hover:text-accent-on-light"
            render={
              <a href={site.advisorUrl} target="_blank" rel="noopener noreferrer">
                {finalCta.secondary}
              </a>
            }
          />
        </div>
      </div>
    </SectionShell>
  )
}
