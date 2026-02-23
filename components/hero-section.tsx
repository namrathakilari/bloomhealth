import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Heart, Sparkles, Leaf } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/5" />
        <div className="absolute top-1/2 -left-20 h-72 w-72 rounded-full bg-accent/10" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-12 px-4 py-20 lg:flex-row lg:py-28">
        {/* Left content */}
        <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            Personalized PCOS Support
          </div>

          <h1 className="mb-6 text-balance text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Your Personal
            <span className="block text-primary">PCOS Health Plan</span>
          </h1>

          <p className="mb-8 max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground">
            Get a personalized exercise, diet and mental wellness plan built
            around your body. Take control of your PCOS journey with science-backed recommendations.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/intake"
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-8 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30"
            >
              Get My Plan
              <ArrowRight className="h-4 w-4" />
            </Link>
            <div className="inline-flex h-12 items-center gap-2 rounded-xl border border-border bg-card px-6 text-sm text-muted-foreground">
              <Heart className="h-4 w-4 text-accent" />
              Trusted by 10,000+ women
            </div>
          </div>
        </div>

        {/* Right image */}
        <div className="relative flex flex-1 items-center justify-center">
          <div className="relative h-[340px] w-[340px] md:h-[420px] md:w-[420px] lg:h-[480px] lg:w-[480px]">
            <div className="absolute inset-0 rounded-full bg-secondary/60" />
            <Image
              src="/images/hero-illustration.jpg"
              alt="Wellness illustration showing a peaceful woman surrounded by botanicals"
              fill
              className="rounded-full object-cover"
              priority
            />
          </div>

          {/* Floating cards */}
          <div className="absolute -bottom-4 left-0 flex items-center gap-2 rounded-xl border border-border bg-card p-3 shadow-lg md:left-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Heart className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs font-medium text-foreground">Exercise Plan</p>
              <p className="text-xs text-muted-foreground">Tailored for you</p>
            </div>
          </div>

          <div className="absolute -top-2 right-0 flex items-center gap-2 rounded-xl border border-border bg-card p-3 shadow-lg md:right-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/15">
              <Leaf className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-xs font-medium text-foreground">Meal Plan</p>
              <p className="text-xs text-muted-foreground">Nutrition focused</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
