import { SectionShell } from "@/components/site/section-shell"
import { howItWorks } from "@/content/site"

export function HowItWorks() {
  return (
    <SectionShell id="como-funciona" className="bg-section-dark py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <span className="badge-on-dark mx-auto">
          <span className="badge-label-on-dark">{howItWorks.badge}</span>
        </span>
        <h2 className="mt-5 text-3xl font-bold text-balance text-on-dark sm:text-4xl">
          {howItWorks.title[0]}{" "}
          <span className="text-primary">{howItWorks.title[1]}</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-pretty text-muted-on-dark sm:text-lg">
          {howItWorks.subtitle}
        </p>
      </div>

      <ol className="mt-14 grid gap-6 md:grid-cols-3">
        {howItWorks.steps.map((step) => (
          <li
            key={step.number}
            className="relative rounded-2xl border border-agua/30 bg-card/50 p-7"
          >
            <span
              aria-hidden
              className="font-sans text-4xl font-bold text-primary/25"
            >
              {step.number}
            </span>
            <h3 className="mt-3 mb-2 font-sans text-lg font-semibold text-on-dark">
              {step.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted-on-dark">
              {step.description}
            </p>
            {"cta" in step && step.cta ? (
              <a
                href={step.cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex text-sm font-semibold text-primary transition-colors hover:text-primary/80"
              >
                {step.cta.label}
              </a>
            ) : null}
          </li>
        ))}
      </ol>
    </SectionShell>
  )
}
