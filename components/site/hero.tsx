import { ArrowRight } from "lucide-react"
import { MarketingButton } from "@/components/ui/marketing-button"
import { SectionShell } from "@/components/site/section-shell"
import { BrowserFrame } from "@/components/site/browser-frame"
import { ProductOf } from "@/components/site/product-of"
import { hero, site } from "@/content/site"

export function Hero() {
  return (
    <div className="bg-hero-surface pt-24 pb-16 md:pt-28 md:pb-24">
      <SectionShell>
        <div className="mx-auto max-w-3xl text-center">
          <ProductOf className="mb-1" />

          <h1 className="hero-display-title section-title mx-auto mt-4 mb-5 max-w-3xl leading-[1.1] text-on-dark">
            {hero.title.prefix}{" "}
            <span className="text-primary">{hero.title.highlight}</span>
          </h1>

          <p className="section-subtitle prose-width mx-auto mb-8 max-w-2xl text-base text-pretty text-muted-on-dark sm:text-lg">
            {hero.subtitle}
          </p>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <MarketingButton
              size="lg"
              nativeButton={false}
              className="h-12 px-7 text-base"
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
              className="h-12 border-agua/50 bg-transparent px-7 text-base"
              render={<a href="#como-funciona">{hero.ctaSecondary}</a>}
            />
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          <BrowserFrame
            url={hero.browserUrl}
            src={hero.screenshot}
            alt={hero.screenshotAlt}
            width={hero.screenshotWidth}
            height={hero.screenshotHeight}
            screen="Inicio"
            stand
            priority
          />
        </div>
      </SectionShell>
    </div>
  )
}
