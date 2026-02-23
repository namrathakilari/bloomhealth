import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { Flower2 } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />

        {/* CTA Section */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-4 text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold text-foreground">
              Ready to Take Control of Your Health?
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-pretty text-muted-foreground">
              Answer a few simple questions and get your personalized PCOS health
              plan in minutes.
            </p>
            <Link
              href="/intake"
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-8 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30"
            >
              Get Started Now
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 text-center">
          <div className="flex items-center gap-2">
            <Flower2 className="h-5 w-5 text-primary" />
            <span className="font-semibold text-foreground">BloomHealth</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Empowering women to thrive with PCOS.
          </p>
        </div>
      </footer>
    </div>
  )
}
