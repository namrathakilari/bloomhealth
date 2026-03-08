#  BloomHealth — Your Personal PCOS Health Plan

BloomHealth is an AI-powered web application that generates fully personalized health plans for women with PCOS (Polycystic Ovary Syndrome). Based on a user's health data, symptoms, and lifestyle, the app creates a custom exercise plan, 7-day meal plan, and mental wellness guide — all powered by Claude AI.

---

##  Features

- **Personalized Onboarding** — 3-step health intake form collecting symptoms, lifestyle, and goals
- **AI-Generated Exercise Plan** — Weekly workout schedule tailored to PCOS needs and activity level
- **Custom Meal Plan** — 7-day diet plan based on dietary restrictions and PCOS nutrition science
- **Mental Wellness Hub** — Daily practices, journal prompts, and affirmations
- **Beautiful UI** — Warm purple and pink design built with Tailwind CSS

---

##  Tech Stack

- **Frontend:** Next.js, Tailwind CSS
- **AI:** Claude API by Anthropic
- **Deployment:** Vercel

---

##  Live Demo

👉 [bloomhealth.vercel.app](https://bloomhealth.vercel.app)

---

##  How It Works

1. User fills in a 3-step health intake form
2. Data is sent to a Next.js API route
3. Claude AI generates a fully personalized PCOS health plan
4. Results are displayed across 3 tabs — Exercise, Meal Plan, and Mental Wellness

---

##  Running Locally

```bash
git clone https://github.com/namrathakilari/bloomhealth
cd bloomhealth
npm install
```

Create a `.env.local` file and add:

```
ANTHROPIC_API_KEY=your-api-key-here
```

Then run:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

##  Built By

Namratha Kilari
