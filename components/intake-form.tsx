"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  type FormData,
  defaultFormData,
  primaryGoals,
  symptomOptions,
  activityLevels,
  dietaryOptions,
  sleepQualities,
} from "@/lib/form-types"

const STEPS = ["Basic Info", "Symptoms", "Lifestyle"]

export function IntakeForm() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState<FormData>(defaultFormData)

  const progressValue = ((step + 1) / STEPS.length) * 100

  function updateField<K extends keyof FormData>(key: K, value: FormData[K]) {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  function toggleArrayItem(key: "symptoms" | "dietaryRestrictions", item: string) {
    setFormData((prev) => {
      const arr = prev[key]
      return {
        ...prev,
        [key]: arr.includes(item)
          ? arr.filter((i) => i !== item)
          : [...arr, item],
      }
    })
  }

  function handleNext() {
    if (step < STEPS.length - 1) {
      setStep(step + 1)
    }
  }

  function handleBack() {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  function handleSubmit() {
    // Store form data in sessionStorage for the results page
    sessionStorage.setItem("bloomhealth-form", JSON.stringify(formData))
    router.push("/results")
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      {/* Step indicator */}
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between">
          {STEPS.map((name, i) => (
            <div
              key={name}
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                i <= step ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                  i < step
                    ? "bg-primary text-primary-foreground"
                    : i === step
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {i + 1}
              </div>
              <span className="hidden sm:inline">{name}</span>
            </div>
          ))}
        </div>
        <Progress value={progressValue} className="h-2" />
      </div>

      {/* Form card */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
        {/* Step 1: Basic Info */}
        {step === 0 && (
          <div className="space-y-6">
            <div>
              <h2 className="mb-1 text-2xl font-bold text-foreground">
                Tell us about yourself
              </h2>
              <p className="text-muted-foreground">
                Basic information helps us personalize your plan.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="e.g. 28"
                  value={formData.age}
                  onChange={(e) => updateField("age", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">{"Height (cm)"}</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="e.g. 165"
                  value={formData.height}
                  onChange={(e) => updateField("height", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">{"Weight (kg)"}</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="e.g. 68"
                  value={formData.weight}
                  onChange={(e) => updateField("weight", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Primary Goal</Label>
                <Select
                  value={formData.primaryGoal}
                  onValueChange={(v) => updateField("primaryGoal", v)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a goal" />
                  </SelectTrigger>
                  <SelectContent>
                    {primaryGoals.map((goal) => (
                      <SelectItem key={goal} value={goal}>
                        {goal}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Symptoms */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="mb-1 text-2xl font-bold text-foreground">
                Select your symptoms
              </h2>
              <p className="text-muted-foreground">
                Choose all that apply so we can address them in your plan.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {symptomOptions.map((symptom) => (
                <label
                  key={symptom}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all ${
                    formData.symptoms.includes(symptom)
                      ? "border-primary bg-primary/5"
                      : "border-border bg-background hover:border-primary/30"
                  }`}
                >
                  <Checkbox
                    checked={formData.symptoms.includes(symptom)}
                    onCheckedChange={() => toggleArrayItem("symptoms", symptom)}
                  />
                  <span className="text-sm font-medium text-foreground">
                    {symptom}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Lifestyle */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="mb-1 text-2xl font-bold text-foreground">
                Your lifestyle
              </h2>
              <p className="text-muted-foreground">
                Help us understand your daily habits to create a realistic plan.
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Activity Level</Label>
                <Select
                  value={formData.activityLevel}
                  onValueChange={(v) => updateField("activityLevel", v)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your activity level" />
                  </SelectTrigger>
                  <SelectContent>
                    {activityLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Dietary Restrictions</Label>
                <div className="grid gap-3 sm:grid-cols-2">
                  {dietaryOptions.map((option) => (
                    <label
                      key={option}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all ${
                        formData.dietaryRestrictions.includes(option)
                          ? "border-primary bg-primary/5"
                          : "border-border bg-background hover:border-primary/30"
                      }`}
                    >
                      <Checkbox
                        checked={formData.dietaryRestrictions.includes(option)}
                        onCheckedChange={() =>
                          toggleArrayItem("dietaryRestrictions", option)
                        }
                      />
                      <span className="text-sm font-medium text-foreground">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label>Sleep Quality</Label>
                <RadioGroup
                  value={formData.sleepQuality}
                  onValueChange={(v) => updateField("sleepQuality", v)}
                  className="flex flex-wrap gap-4"
                >
                  {sleepQualities.map((quality) => (
                    <label
                      key={quality}
                      className={`flex cursor-pointer items-center gap-2 rounded-xl border px-5 py-3 transition-all ${
                        formData.sleepQuality === quality
                          ? "border-primary bg-primary/5"
                          : "border-border bg-background hover:border-primary/30"
                      }`}
                    >
                      <RadioGroupItem value={quality} />
                      <span className="text-sm font-medium text-foreground">
                        {quality}
                      </span>
                    </label>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          <button
            type="button"
            onClick={handleBack}
            disabled={step === 0}
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-card px-5 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          {step < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90"
            >
              <Sparkles className="h-4 w-4" />
              Generate My Plan
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
