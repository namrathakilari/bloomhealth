import { Dumbbell, UtensilsCrossed, Brain } from "lucide-react"

const features = [
  {
    icon: Dumbbell,
    title: "Personalized Exercise",
    description:
      "Weekly workout schedules designed specifically for your activity level, symptoms, and goals.",
  },
  {
    icon: UtensilsCrossed,
    title: "Custom Meal Plans",
    description:
      "7-day meal plans with breakfast, lunch, dinner, and snacks tailored to your dietary needs.",
  },
  {
    icon: Brain,
    title: "Mental Wellness",
    description:
      "Daily practices, journal prompts, and affirmations to support your emotional wellbeing.",
  },
]

export function FeaturesSection() {
  return (
    <section className="border-t border-border bg-card py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-14 text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold text-foreground">
            A Holistic Approach to PCOS
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">
            Our personalized plans cover every aspect of your wellbeing, from
            physical fitness to nutrition and mental health.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group flex flex-col items-center rounded-2xl border border-border bg-background p-8 text-center transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/15">
                <feature.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mb-3 text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
