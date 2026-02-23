"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Dumbbell, UtensilsCrossed, Brain, Clock, Loader2, BookOpen, Sun } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { FormData } from "@/lib/form-types"
import { generatePlan, type HealthPlan } from "@/lib/generate-plan"

export function ResultsDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [plan, setPlan] = useState<HealthPlan | null>(null)

  useEffect(() => {
    const stored = sessionStorage.getItem("bloomhealth-form")
    if (!stored) {
      router.push("/intake")
      return
    }

    // Simulate plan generation with a delay
    const timer = setTimeout(() => {
      const formData: FormData = JSON.parse(stored)
      const generated = generatePlan(formData)
      setPlan(generated)
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [router])

  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
        <div className="text-center">
          <h2 className="mb-2 text-xl font-bold text-foreground">
            Crafting Your Personal Plan
          </h2>
          <p className="text-muted-foreground">
            Analyzing your profile and building recommendations...
          </p>
        </div>
      </div>
    )
  }

  if (!plan) return null

  return (
    <div className="mx-auto w-full max-w-5xl">
      {/* Greeting */}
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-balance text-3xl font-bold text-foreground md:text-4xl">
          {"Your Personal PCOS Plan is Ready \uD83C\uDF38"}
        </h1>
        <p className="text-muted-foreground">
          Here is your customized exercise, meal, and mental wellness plan.
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="exercise" className="w-full">
        <TabsList className="mx-auto mb-6 grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="exercise" className="gap-1.5">
            <Dumbbell className="h-4 w-4" />
            <span className="hidden sm:inline">Exercise</span>
          </TabsTrigger>
          <TabsTrigger value="meal" className="gap-1.5">
            <UtensilsCrossed className="h-4 w-4" />
            <span className="hidden sm:inline">Meal Plan</span>
          </TabsTrigger>
          <TabsTrigger value="wellness" className="gap-1.5">
            <Brain className="h-4 w-4" />
            <span className="hidden sm:inline">Wellness</span>
          </TabsTrigger>
        </TabsList>

        {/* Exercise Tab */}
        <TabsContent value="exercise">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {plan.exercisePlan.map((day) => (
              <div
                key={day.day}
                className="group rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-md"
              >
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-bold text-foreground">{day.day}</h3>
                  <div className="flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                    <Clock className="h-3 w-3" />
                    {day.duration}
                  </div>
                </div>
                <p className="mb-2 text-sm font-semibold text-foreground">
                  {day.workout}
                </p>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {day.reason}
                </p>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Meal Plan Tab */}
        <TabsContent value="meal">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {plan.mealPlan.map((day) => (
              <div
                key={day.day}
                className="group rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-md"
              >
                <h3 className="mb-4 font-bold text-foreground">{day.day}</h3>
                <div className="space-y-3">
                  <MealItem label="Breakfast" value={day.breakfast} />
                  <MealItem label="Lunch" value={day.lunch} />
                  <MealItem label="Dinner" value={day.dinner} />
                  <MealItem label="Snack" value={day.snack} />
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Wellness Tab */}
        <TabsContent value="wellness">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Daily Practices */}
            <div className="rounded-2xl border border-border bg-card p-6 lg:col-span-2">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                  <Sun className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  Daily Practices
                </h3>
              </div>
              <ul className="space-y-3">
                {plan.wellness.dailyPractices.map((practice, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    <span className="text-sm leading-relaxed text-foreground">
                      {practice}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Side cards */}
            <div className="flex flex-col gap-6">
              {/* Journal Prompt */}
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15">
                    <BookOpen className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="font-bold text-foreground">Journal Prompt</h3>
                </div>
                <p className="text-sm italic leading-relaxed text-muted-foreground">
                  {`"${plan.wellness.journalPrompt}"`}
                </p>
              </div>

              {/* Affirmation */}
              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                    <span className="text-lg" role="img" aria-label="sparkles">
                      {"✨"}
                    </span>
                  </div>
                  <h3 className="font-bold text-foreground">
                    {"Today's Affirmation"}
                  </h3>
                </div>
                <p className="text-sm font-medium leading-relaxed text-foreground">
                  {`"${plan.wellness.affirmation}"`}
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function MealItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-xs font-semibold uppercase tracking-wider text-primary">
        {label}
      </span>
      <p className="mt-0.5 text-sm leading-relaxed text-foreground">{value}</p>
    </div>
  )
}
