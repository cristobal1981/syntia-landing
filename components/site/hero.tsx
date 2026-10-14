import { ArrowRight } from "lucide-react"
import { MarketingButton } from "@/components/ui/marketing-button"
import { SectionShell } from "@/components/site/section-shell"
import { BrowserFrame } from "@/components/site/browser-frame"
import { MockInicio } from "@/components/site/mocks"
import { ProductOf } from "@/components/site/product-of"
import { hero, site } from "@/content/site"

export function Hero() {
  return (
    <div className="bg-hero-surface pt-20 pb-10 md:pt-24 md:pb-16">
      <SectionShell>
        <div className="mx-auto max-w-3xl text-center">
          <ProductOf className="mb-1" />

          <h1 className="hero-display-title section-title mx-auto mt-3 mb-4 max-w-3xl leading-[1.1] text-on-dark">
            {hero.title}
          </h1>

          <p className="section-subtitle prose-width mx-auto mb-6 max-w-2xl text-base text-pretty text-muted-on-dark sm:text-lg">
            {hero.subtitle}
          </p>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <MarketingButton
              size="lg"
              nativeButton={false}
              className="h-11 px-7 text-base md:h-12"
              render={
                <a href={site.appUrl} target="_blank" rel="noopener noreferrer">
                  {hero.ctaPrimary}
                  <ArrowRight className="ml-2 size-4" />
                </a>
              }
            />
            <MarketingButton
              size="lg"
              variant="outline"
              marketingVariant="secondary"
              nativeButton={false}
              className="h-11 border-agua/50 bg-transparent px-7 text-base md:h-12"
              render={<a href={hero.ctaSecondaryHref}>{hero.ctaSecondary}</a>}
            />
          </div>
          <p className="mt-3 text-sm text-muted-on-dark">{hero.note}</p>
        </div>

        <div className="mx-auto mt-8 max-w-5xl md:mt-10">
          <BrowserFrame
            url={hero.browserUrl}
            label={hero.screenshotAlt}
            screen="Inicio"
            stand
          >
            <MockInicio size="hero" />
          </BrowserFrame>
        </div>
      </SectionShell>
    </div>
  )
}
