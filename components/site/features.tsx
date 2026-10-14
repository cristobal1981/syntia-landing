import { Check } from "lucide-react"
import { SectionShell } from "@/components/site/section-shell"
import { BrowserFrame } from "@/components/site/browser-frame"
import { PortalMock } from "@/components/site/mocks"
import { features, featuresSection, type Feature } from "@/content/site"
import { cn } from "@/lib/utils"

function FeatureRow({ feature, index }: { feature: Feature; index: number }) {
  const reversed = index % 2 === 1

  return (
    <SectionShell
      id={feature.anchor}
      className={cn(
        feature.compact ? "py-14 md:py-20" : "py-16 md:py-24",
        // Alternancia de fondo: noche plano / degradado agua
        reversed ? "bg-section-dark" : "bg-background",
      )}
    >
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <div
          className={cn(
            "lg:col-span-5",
            reversed ? "lg:order-2" : "lg:order-1",
            feature.compact && "lg:col-span-5",
          )}
        >
          <h3 className="section-title text-2xl leading-[1.1] text-on-dark sm:text-3xl md:text-4xl">
            {feature.title}
          </h3>
          <p className="section-subtitle mt-4 text-base text-pretty text-muted-on-dark sm:text-lg">
            {feature.description}
          </p>
          <ul className="mt-6 space-y-2.5">
            {feature.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3 text-sm text-on-dark sm:text-[0.95rem]">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        <div
          className={cn(
            "min-w-0 lg:col-span-7",
            reversed ? "lg:order-1" : "lg:order-2",
          )}
        >
          <BrowserFrame url={feature.browserUrl} label={feature.mockLabel} screen={feature.navLabel}>
            <PortalMock id={feature.mock} size={feature.compact ? "compact" : "default"} />
          </BrowserFrame>
        </div>
      </div>
    </SectionShell>
  )
}

export function Features() {
  return (
    <div id={featuresSection.id} className="scroll-mt-16">
      <SectionShell className="bg-background pt-20 pb-4 md:pt-28 md:pb-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="section-title text-3xl leading-[1.08] text-on-dark sm:text-4xl md:text-5xl">
            {featuresSection.title}
          </h2>
          <p className="section-subtitle mx-auto mt-5 max-w-[52ch] text-base text-pretty text-muted-on-dark sm:text-lg">
            {featuresSection.subtitle}
          </p>

          <nav aria-label={featuresSection.title} className="mt-8 flex flex-wrap justify-center gap-2">
            {features.map((feature) => (
              <a
                key={feature.id}
                href={`#${feature.anchor}`}
                className="rounded-full border border-agua/50 px-3.5 py-1.5 font-sans text-sm font-medium text-muted-on-dark transition-colors hover:border-primary hover:text-primary"
              >
                {feature.navLabel}
              </a>
            ))}
          </nav>
        </div>
      </SectionShell>

      {features.map((feature, index) => (
        <FeatureRow key={feature.id} feature={feature} index={index} />
      ))}
    </div>
  )
}
