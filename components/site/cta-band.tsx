import { ArrowRight } from "lucide-react"
import { MarketingButton } from "@/components/ui/marketing-button"
import { SectionShell } from "@/components/site/section-shell"
import { ProductOf } from "@/components/site/product-of"
import { finalCta, site } from "@/content/site"

export function CtaBand() {
  return (
    <section id="contacto" className="section-cta-brisa scroll-mt-16">
      <SectionShell innerClassName="flex flex-col justify-center py-16 text-center md:py-20">
        <div className="mx-auto max-w-4xl">
          <ProductOf
            labelClassName="text-accent-on-light"
            logoSrc="/brand/tenaasesores-light.webp"
          />
          <h2 className="section-cta-brisa-title section-title mt-5">
            {finalCta.title}
          </h2>
          <p className="section-cta-brisa-body section-subtitle mx-auto mt-5 mb-10 max-w-[50ch] text-pretty">
            {finalCta.subtitle}
          </p>
          <MarketingButton
            size="lg"
            marketingVariant="brisa"
            nativeButton={false}
            className="h-12 px-10 text-base"
            render={
              <a href={site.advisorUrl} target="_blank" rel="noopener noreferrer">
                {finalCta.primary}
                <ArrowRight className="ml-2 size-4" />
              </a>
            }
          />
        </div>
      </SectionShell>
    </section>
  )
}
