import { Header } from "@/components/site/header"
import { Hero } from "@/components/site/hero"
import { Platform } from "@/components/site/platform"
import { HowItWorks } from "@/components/site/how-it-works"
import { CtaBand } from "@/components/site/cta-band"
import { Footer } from "@/components/site/footer"

export default function HomePage() {
  return (
    <div className="min-h-dvh bg-background">
      <Header />
      <main>
        <Hero />
        <Platform />
        <HowItWorks />
        <CtaBand />
      </main>
      <Footer />
    </div>
  )
}
