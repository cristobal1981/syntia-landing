import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionShell } from "@/components/site/section-shell"
import { BrowserFrame } from "@/components/site/browser-frame"
import { ProductOf } from "@/components/site/product-of"
import { hero, site } from "@/content/site"

export function Hero() {
  return (
    <div className="bg-hero-surface pt-28 pb-16 md:pt-36 md:pb-24">
      <SectionShell>
        <div className="mx-auto max-w-3xl text-center">
          <ProductOf className="mb-1" />

          <h1 className="hero-display-title mx-auto mt-4 mb-5 max-w-3xl font-bold leading-[1.1] text-balance text-on-dark">
            {hero.title.prefix}{" "}
            <span className="text-primary">{hero.title.highlight}</span>
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-pretty text-muted-on-dark sm:text-lg">
            {hero.subtitle}
          </p>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              size="lg"
              nativeButton={false}
              className="h-12 bg-primary px-7 text-base font-semibold text-primary-foreground hover:bg-primary/85"
              render={
                <a href={site.appUrl} target="_blank" rel="noopener noreferrer">
                  {hero.ctaPrimary}
                  <ArrowRight className="ml-2 size-4" />
                </a>
              }
            />
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              className="h-12 border-agua/50 bg-transparent px-7 text-base font-semibold text-on-dark hover:bg-on-dark/5 hover:text-primary"
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
