import type { FormData } from "./form-types"

export interface DayExercise {
  day: string
  workout: string
  duration: string
  reason: string
}

export interface DayMeal {
  day: string
  breakfast: string
  lunch: string
  dinner: string
  snack: string
}

export interface WellnessPlan {
  dailyPractices: string[]
  journalPrompt: string
  affirmation: string
}

export interface HealthPlan {
  exercisePlan: DayExercise[]
  mealPlan: DayMeal[]
  wellness: WellnessPlan
}

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
]

export function generatePlan(formData: FormData): HealthPlan {
  const isActive =
    formData.activityLevel === "Moderately Active" ||
    formData.activityLevel === "Very Active"
  const isSedentary = formData.activityLevel === "Sedentary"
  const goalIsFertility = formData.primaryGoal === "Fertility Support"
  const goalIsWeight = formData.primaryGoal === "Weight Management"
  const goalIsMood = formData.primaryGoal === "Mood & Mental Health"

  const isVegetarian = formData.dietaryRestrictions.includes("Vegetarian")
  const isVegan = formData.dietaryRestrictions.includes("Vegan")
  const isGlutenFree = formData.dietaryRestrictions.includes("Gluten-free")
  const isDairyFree = formData.dietaryRestrictions.includes("Dairy-free")

  // Exercise Plan
  const exerciseOptions = {
    cardio: [
      { workout: "Brisk Walking", duration: "30 min", reason: "Low-impact cardio improves insulin sensitivity" },
      { workout: "Swimming", duration: "35 min", reason: "Full-body cardio without joint stress" },
      { workout: "Cycling", duration: "30 min", reason: "Steady-state cardio supports hormone balance" },
    ],
    strength: [
      { workout: "Full Body Strength Training", duration: "35 min", reason: "Builds lean muscle to boost metabolism" },
      { workout: "Lower Body Strength", duration: "30 min", reason: "Strengthens legs and glutes for hormonal health" },
      { workout: "Upper Body & Core", duration: "30 min", reason: "Improves posture and reduces inflammation" },
    ],
    gentle: [
      { workout: "Yoga Flow", duration: "40 min", reason: "Reduces cortisol and supports hormonal balance" },
      { workout: "Pilates", duration: "30 min", reason: "Core strengthening with low stress on the body" },
      { workout: "Restorative Stretching", duration: "25 min", reason: "Promotes recovery and reduces tension" },
    ],
    rest: [
      { workout: "Rest Day - Gentle Walk", duration: "20 min", reason: "Active recovery keeps joints mobile" },
      { workout: "Rest Day - Meditation & Stretching", duration: "15 min", reason: "Mental rest is essential for hormonal recovery" },
    ],
  }

  const exercisePlan: DayExercise[] = days.map((day, i) => {
    let category: "cardio" | "strength" | "gentle" | "rest"
    if (i === 6) {
      category = "rest"
    } else if (isSedentary) {
      category = i % 2 === 0 ? "gentle" : "cardio"
      if (i === 4) category = "rest"
    } else if (isActive) {
      const pattern: ("cardio" | "strength" | "gentle" | "rest")[] = [
        "strength", "cardio", "strength", "gentle", "cardio", "strength", "rest",
      ]
      category = pattern[i]
    } else {
      const pattern: ("cardio" | "strength" | "gentle" | "rest")[] = [
        "cardio", "strength", "gentle", "cardio", "strength", "rest", "rest",
      ]
      category = pattern[i]
    }

    if (goalIsFertility && category === "cardio" && i > 3) {
      category = "gentle"
    }

    const options = exerciseOptions[category]
    const chosen = options[i % options.length]

    return { day, ...chosen }
  })

  // Meal Plan
  const protein = isVegan ? "tofu" : isVegetarian ? "paneer" : "grilled chicken"
  const altProtein = isVegan ? "lentils" : isVegetarian ? "chickpeas" : "salmon"
  const grain = isGlutenFree ? "quinoa" : "whole wheat toast"
  const altGrain = isGlutenFree ? "brown rice" : "oats"
  const milk = isDairyFree || isVegan ? "almond milk" : "Greek yogurt"
  const snackBase = isDairyFree || isVegan ? "mixed nuts & dark chocolate" : "cottage cheese with berries"

  const mealTemplates = [
    {
      breakfast: `${milk} smoothie with spinach, banana & chia seeds`,
      lunch: `${protein} salad with avocado, ${grain} & olive oil dressing`,
      dinner: `Baked ${altProtein} with roasted vegetables & ${isGlutenFree ? "sweet potato" : "whole grain pasta"}`,
      snack: `${snackBase}`,
    },
    {
      breakfast: `Overnight ${altGrain} with ${isDairyFree || isVegan ? "coconut yogurt" : "Greek yogurt"}, walnuts & blueberries`,
      lunch: `${altProtein} bowl with ${isGlutenFree ? "quinoa" : "brown rice"}, roasted veggies & tahini`,
      dinner: `Stir-fried ${protein} with broccoli, bell peppers & ${isGlutenFree ? "rice noodles" : "whole wheat noodles"}`,
      snack: "Apple slices with almond butter",
    },
    {
      breakfast: `${isGlutenFree ? "Gluten-free" : "Whole grain"} ${grain} with avocado & ${isVegan ? "hemp seeds" : "poached eggs"}`,
      lunch: `Mediterranean ${protein} wrap${isGlutenFree ? " (lettuce wrap)" : ""} with hummus & vegetables`,
      dinner: `${altProtein} curry with ${isGlutenFree ? "cauliflower rice" : "basmati rice"} & spinach`,
      snack: `Trail mix with pumpkin seeds & dried cranberries`,
    },
    {
      breakfast: `${isDairyFree || isVegan ? "Coconut" : "Greek"} yogurt parfait with granola${isGlutenFree ? " (gluten-free)" : ""} & mixed berries`,
      lunch: `Roasted vegetable & ${altProtein} soup with ${isGlutenFree ? "rice crackers" : "crusty bread"}`,
      dinner: `Herb-crusted ${protein} with sweet potato mash & steamed green beans`,
      snack: `Celery sticks with ${isDairyFree ? "sunflower seed butter" : "cream cheese"} & walnuts`,
    },
    {
      breakfast: `Spinach & ${isVegan ? "mushroom" : "egg"} scramble with ${grain} & avocado`,
      lunch: `${protein} & vegetable ${isGlutenFree ? "rice" : "couscous"} bowl with lemon dressing`,
      dinner: `Stuffed bell peppers with ${altProtein}, ${isGlutenFree ? "quinoa" : "bulgur"} & tomato sauce`,
      snack: `${isDairyFree || isVegan ? "Roasted chickpeas" : "String cheese"} with a handful of almonds`,
    },
    {
      breakfast: `${isGlutenFree ? "Buckwheat" : "Whole wheat"} pancakes with fresh berries & ${isDairyFree || isVegan ? "maple syrup" : "honey"}`,
      lunch: `Asian-inspired ${protein} lettuce cups with mango & sesame dressing`,
      dinner: `Baked ${altProtein} with ${isGlutenFree ? "polenta" : "whole wheat pasta"} & roasted tomatoes`,
      snack: `Banana with ${isDairyFree ? "tahini" : "peanut butter"}`,
    },
    {
      breakfast: `Green smoothie bowl with ${milk}, kale, banana & ${isGlutenFree ? "gluten-free" : "regular"} granola`,
      lunch: `${altProtein} & avocado ${isGlutenFree ? "rice paper rolls" : "wrap"} with side salad`,
      dinner: `Slow-cooked ${protein} with root vegetables & fresh herbs`,
      snack: `Dark chocolate squares with mixed berries`,
    },
  ]

  const mealPlan: DayMeal[] = days.map((day, i) => ({
    day,
    ...mealTemplates[i],
  }))

  // Wellness Plan
  const practicesBase = [
    "10 minutes of morning meditation or deep breathing",
    "5-minute gratitude journaling before bed",
    "15 minutes of gentle stretching or yoga",
    "Drink at least 8 glasses of water throughout the day",
  ]

  if (goalIsMood) {
    practicesBase.push("Practice progressive muscle relaxation for 10 minutes")
    practicesBase.push("Spend 20 minutes outdoors in nature")
  } else if (goalIsWeight) {
    practicesBase.push("Track meals mindfully without calorie counting")
    practicesBase.push("Celebrate one non-scale victory daily")
  } else if (goalIsFertility) {
    practicesBase.push("Practice 10 minutes of fertility-focused visualization")
    practicesBase.push("Prioritize 8 hours of sleep each night")
  } else {
    practicesBase.push("Notice and write down 3 body-positive moments")
    practicesBase.push("Schedule 30 minutes of screen-free relaxation")
  }

  const journalPrompts = [
    "What are three things your body did for you today that you're grateful for?",
    "Describe a moment this week when you felt strong and capable.",
    "What does self-compassion look like for you on a hard day?",
    "Write a letter to your body, thanking it for all it does.",
    "What small win from today can you celebrate?",
  ]

  const affirmations = [
    "My body is resilient, and I am learning to work with it, not against it.",
    "I deserve to feel good, and I am taking steps every day to support my health.",
    "I am more than my diagnosis. I am strong, capable, and worthy of wellness.",
    "Every healthy choice I make is an act of love toward myself.",
    "I trust my body's ability to heal and find balance.",
  ]

  const randomPrompt =
    journalPrompts[Math.floor(Math.random() * journalPrompts.length)]
  const randomAffirmation =
    affirmations[Math.floor(Math.random() * affirmations.length)]

  return {
    exercisePlan,
    mealPlan,
    wellness: {
      dailyPractices: practicesBase,
      journalPrompt: randomPrompt,
      affirmation: randomAffirmation,
    },
  }
}
