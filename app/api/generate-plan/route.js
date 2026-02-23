import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request) {
  try {
    const formData = await request.json();

    const prompt = `You are a PCOS health specialist. Based on the following health data, generate a personalized weekly plan. Return ONLY valid JSON, no extra text.

User data:
- Age: ${formData.age}
- Height: ${formData.height}cm, Weight: ${formData.weight}kg
- Primary Goal: ${formData.goal}
- Symptoms: ${formData.symptoms.join(", ")}
- Activity Level: ${formData.activityLevel}
- Dietary Restrictions: ${formData.dietaryRestrictions.join(", ") || "None"}
- Sleep Quality: ${formData.sleepQuality}

Return this exact JSON structure:
{
  "exercisePlan": {
    "summary": "2 sentence summary of why this plan suits her",
    "weeklySchedule": [
      {"day": "Monday", "workout": "workout name", "duration": "30 mins", "reason": "why this helps her PCOS"}
    ]
  },
  "mealPlan": {
    "summary": "2 sentence summary of the diet approach",
    "days": [
      {"day": "Monday", "breakfast": "meal", "lunch": "meal", "dinner": "meal", "snack": "snack"}
    ]
  },
  "mentalWellness": {
    "summary": "2 sentence summary",
    "dailyPractices": ["practice 1", "practice 2", "practice 3"],
    "journalPrompt": "A thoughtful journal prompt",
    "affirmation": "A warm daily affirmation"
  }
}`;

    const message = await client.messages.create({
      model: "claude-opus-4-6",
      max_tokens: 4000,
      messages: [{ role: "user", content: prompt }],
    });

    const responseText = message.content[0].text;
    const cleanedResponse = responseText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    const plan = JSON.parse(cleanedResponse);

    return Response.json({ success: true, plan });
  } catch (error) {
    console.error("Error:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
