import { NextResponse } from 'next/server';
import { Groq } from 'groq-sdk';
import { client } from '@/lib/sanity';

if (!process.env.GROQ_API_KEY) {
  console.error("Missing GROQ_API_KEY in environment variables!");
}

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(request) {
  try {
    const { goal, condition, calories } = await request.json();
    
   

    // Sanity CMS එකෙන් දත්ත ගැනීම
    const query = `*[_type == "recipe"]{
      "id": slug.current,
      title,
      calories,
      tags
    }`;
    const AVAILABLE_RECIPES = await client.fetch(query);
    console.log("Sanity Recipes Count:", AVAILABLE_RECIPES?.length || 0);

    // 🧠 1. SYSTEM PROMPT
    const systemPrompt = `You are an expert AI Nutritionist Agent. Your task is to create a highly optimized 3-day meal plan based on the user's constraints.
    
CRITICAL INSTRUCTION: You MUST strictly return only a valid JSON response matching the exact schema specified below. Do not include any conversational text before or after the JSON.

MATCHING ALGORITHM: Look at the "Available Blog Recipes from CMS" below. If any recipe matches the user's diet goal, calories, or tags, you MUST inject its exact "id" into the "recipeId" field (prefer using them for lunch or dinner). If no matching recipe is found from the CMS for a specific meal, set "recipeId" to null.

Available Blog Recipes from CMS: 
${JSON.stringify(AVAILABLE_RECIPES)}

Expected JSON Schema Format:
{
  "mealPlan": [
    {
      "day": "Day 1",
      "breakfast": { "meal": "Detailed meal description", "calories": 400 },
      "lunch": { "meal": "Detailed meal description or matching blog title", "calories": 500, "recipeId": "slug-id-or-null" },
      "dinner": { "meal": "Detailed meal description or matching blog title", "calories": 450, "recipeId": "slug-id-or-null" }
    },
    {
      "day": "Day 2",
      "breakfast": { "meal": "Detailed meal description", "calories": 420 },
      "lunch": { "meal": "Detailed meal description", "calories": 480, "recipeId": "slug-id-or-null" },
      "dinner": { "meal": "Detailed meal description", "calories": 460, "recipeId": "slug-id-or-null" }
    },
    {
      "day": "Day 3",
      "breakfast": { "meal": "Detailed meal description", "calories": 390 },
      "lunch": { "meal": "Detailed meal description", "calories": 510, "recipeId": "slug-id-or-null" },
      "dinner": { "meal": "Detailed meal description", "calories": 440, "recipeId": "slug-id-or-null" }
    }
  ],
  "nutritionistAdvice": "Provide short, professional, highly valuable nutritional advice tailored to their specific goal and condition."
}`;

    // 🧠 2. Groq Completion එක සිදු කිරීම
    const chatCompletion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Constraints -> Diet Goal: ${goal}, Health Condition: ${condition}, Daily Calorie Target: ${calories} kcal.` }
      ],
      temperature: 0.1,
      // 🌟 Llama එකෙන් Strict JSON එකක්ම බලෙන් ගන්න මෙන්න මේ config එක දානවා
      response_format: { type: "json_object" }
    });

    let responseText = chatCompletion.choices[0].message.content.trim();
    
    

    // 🌟 Markdown blocks අයින් කරන ආරක්ෂිත කොටස
    if (responseText.includes('```')) {
      const match = responseText.match(/```(?:json)?([\s\S]*?)```/);
      if (match && match[1]) {
        responseText = match[1].trim();
      } else {
        responseText = responseText.replace(/^```json|```$/g, '').trim();
      }
    }

    // 🌟 Bulletproof JSON Parsing
    try {
      const parsedData = JSON.parse(responseText);
      
      return NextResponse.json(parsedData);
    } catch (parseError) {
      
      
      return NextResponse.json({
        mealPlan: [
          {
            day: "Day 1",
            breakfast: { meal: "Oatmeal with berries and a scoop of protein powder", calories: 380 },
            lunch: { meal: "Grilled chicken breast with a large green salad", calories: 450, recipeId: null },
            dinner: { meal: "Baked salmon with steamed broccoli and quinoa", calories: 500, recipeId: null }
          }
        ],
        nutritionistAdvice: "Please try generating again. Ensure your API connection is stable."
      });
    }

  } catch (error) {
    
    
    return NextResponse.json(
      { error: error.message || "Failed to generate meal plan." }, 
      { status: 500 }
    );
  }
}
