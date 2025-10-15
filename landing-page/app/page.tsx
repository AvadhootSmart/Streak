import { Hero } from "@/components/hero"
import { InstallSteps } from "@/components/install-steps"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <main className="flex min-h-[100dvh] flex-col">
      {/* Hero */}
      <Hero />

      {/* Install */}
      <section id="install" className="container mx-auto w-full max-w-5xl px-4 py-12 md:py-16">
        <InstallSteps />
      </section>

      {/* Footer */}
      <SiteFooter />
    </main>
  )
}
