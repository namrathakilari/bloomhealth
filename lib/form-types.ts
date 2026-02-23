export interface FormData {
  // Step 1: Basic Info
  age: string
  height: string
  weight: string
  primaryGoal: string

  // Step 2: Symptoms
  symptoms: string[]

  // Step 3: Lifestyle
  activityLevel: string
  dietaryRestrictions: string[]
  sleepQuality: string
}

export const defaultFormData: FormData = {
  age: "",
  height: "",
  weight: "",
  primaryGoal: "",
  symptoms: [],
  activityLevel: "",
  dietaryRestrictions: [],
  sleepQuality: "",
}

export const primaryGoals = [
  "Weight Management",
  "Fertility Support",
  "Mood & Mental Health",
  "Symptom Relief",
]

export const symptomOptions = [
  "Irregular periods",
  "Fatigue",
  "Acne",
  "Hair thinning",
  "Bloating",
  "Mood swings",
  "Weight gain",
  "Sugar cravings",
]

export const activityLevels = [
  "Sedentary",
  "Lightly Active",
  "Moderately Active",
  "Very Active",
]

export const dietaryOptions = [
  "Vegetarian",
  "Vegan",
  "Gluten-free",
  "Dairy-free",
]

export const sleepQualities = ["Poor", "Average", "Good"]
