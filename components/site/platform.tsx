import { FileText, MessageSquare, Workflow } from "lucide-react"
import { SectionShell } from "@/components/site/section-shell"
import { BrowserFrame } from "@/components/site/browser-frame"
import { platform } from "@/content/site"

const icons = [Workflow, FileText, MessageSquare]

export function Platform() {
  return (
    <SectionShell id="plataforma" className="bg-section-dark py-20 md:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="text-3xl font-bold text-balance text-on-dark sm:text-4xl">
            {platform.title[0]} <span className="text-primary">{platform.title[1]}</span>
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-pretty text-muted-on-dark sm:text-lg">
            {platform.subtitle}
          </p>

          <ul className="mt-8 divide-y divide-agua/25 border-y border-agua/25">
            {platform.highlights.map((item, index) => {
              const Icon = icons[index]
              return (
                <li key={item.title} className="flex gap-4 py-5">
                  <span className="mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/12 text-primary">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-sans text-base font-semibold text-on-dark">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-on-dark">
                      {item.description}
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="lg:pl-4">
          <BrowserFrame
            url={platform.browserUrl}
            src={platform.screenshot}
            alt={platform.screenshotAlt}
            width={platform.screenshotWidth}
            height={platform.screenshotHeight}
            screen="Documentos"
          />
        </div>
      </div>
    </SectionShell>
  )
}
