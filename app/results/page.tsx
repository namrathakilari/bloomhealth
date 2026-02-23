import { Navbar } from "@/components/navbar"
import { ResultsDashboard } from "@/components/results-dashboard"

export default function ResultsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 px-4 py-10 md:py-16">
        <ResultsDashboard />
      </main>
    </div>
  )
}
