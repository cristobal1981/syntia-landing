import { ArrowRight } from "lucide-react"
import { MarketingButton } from "@/components/ui/marketing-button"
import { SectionShell } from "@/components/site/section-shell"
import { SappoNudge } from "@/components/site/sappo/sappo-nudge"
import { howItWorks, site } from "@/content/site"
import { cn } from "@/lib/utils"

export function HowItWorks() {
  return (
    <SectionShell id="como-funciona" className="bg-section-dark py-24 md:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="section-title text-[clamp(1.85rem,4vw,2.75rem)] leading-[1.08] text-on-dark">
          {howItWorks.title}
        </h2>
        <p className="section-subtitle prose-width mx-auto mt-5 max-w-[52ch] text-base text-pretty text-muted-on-dark sm:text-lg">
          {howItWorks.subtitle}
        </p>
      </div>

      <ol
        aria-label={howItWorks.badge}
        className="relative mx-auto mt-16 flex max-w-5xl flex-col md:mt-20 md:flex-row md:items-start md:justify-between"
      >
        {howItWorks.steps.map((step, index) => {
          const isLast = index === howItWorks.steps.length - 1

          return (
            <li
              key={step.number}
              className={cn(
                "how-step relative flex flex-1 flex-col items-center px-3 pb-12 text-center last:pb-0 md:pb-0",
              )}
              style={{ animationDelay: `${index * 90}ms` }}
            >
              {!isLast ? (
                <>
                  <span
                    className="absolute top-5 left-[calc(50%+1.35rem)] hidden h-px w-[calc(100%-2.7rem)] bg-gradient-to-r from-primary/50 via-agua/40 to-agua/20 md:block"
                    aria-hidden
                  />
                  <span
                    className="absolute top-11 bottom-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-primary/45 via-agua/35 to-transparent md:hidden"
                    aria-hidden
                  />
                </>
              ) : null}

              <span className="relative z-10 mb-5 flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background font-sans text-sm font-bold tracking-wide text-primary shadow-[0_8px_24px_-12px_rgba(1,222,162,0.55)]">
                {step.number}
              </span>

              <h3 className="section-title mb-2.5 text-lg text-on-dark md:text-xl">
                {step.title}
              </h3>
              <p className="max-w-[28ch] text-sm leading-relaxed text-muted-on-dark md:max-w-[32ch] md:text-[0.95rem]">
                {step.description}
              </p>
            </li>
          )
        })}
      </ol>

      <div className="mt-14 flex flex-col items-center gap-6 md:mt-16 md:gap-8">
        <SappoNudge />
        <MarketingButton
          size="lg"
          nativeButton={false}
          className="h-12 px-8 text-base"
          render={
            <a href={site.appUrl} target="_blank" rel="noopener noreferrer">
              {howItWorks.ctaPrimary}
              <ArrowRight className="ml-2 size-4" />
            </a>
          }
        />
      </div>
    </SectionShell>
  )
}
