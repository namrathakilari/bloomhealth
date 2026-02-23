import { Navbar } from "@/components/navbar"
import { IntakeForm } from "@/components/intake-form"

export default function IntakePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 flex-col px-4 py-10 md:py-16">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-foreground">
            Let&#39;s Build Your Plan
          </h1>
          <p className="text-muted-foreground">
            Answer a few questions so we can create your personalized PCOS health plan.
          </p>
        </div>
        <IntakeForm />
      </main>
    </div>
  )
}
