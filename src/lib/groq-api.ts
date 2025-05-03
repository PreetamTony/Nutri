// This API key will be loaded from .env
// In a production environment, this should be handled securely
// and not exposed in the frontend

export type NutritionAnalysisResult = {
  calories: string;
  macronutrients: {
    carbohydrates: string;
    protein: string;
    fat: string;
  };
  micronutrients: string[];
  analysis: string;
  suggestions: string[];
};

export type HealthyAlternative = {
  original: string;
  alternatives: {
    name: string;
    benefits: string[];
    nutritionFacts: string;
  }[];
};

export const analyzeNutrition = async (
  mealDescription: string
): Promise<NutritionAnalysisResult> => {
  try {
    const apiKey = import.meta.env.VITE_GROQ_API_KEY;
    if (!apiKey) {
      throw new Error("Groq API key is not available. Please add it to your .env file as VITE_GROQ_API_KEY.");
    }

    const systemPrompt = `You are a nutrition expert. Analyze the given meal and provide a detailed breakdown of its nutritional content. Respond with a JSON object containing:
    {
      "calories": "estimated calories",
      "macronutrients": {
        "carbohydrates": "amount with percentage of meal",
        "protein": "amount with percentage of meal",
        "fat": "amount with percentage of meal"
      },
      "micronutrients": ["list of key vitamins and minerals"],
      "analysis": "brief analysis of the nutritional value",
      "suggestions": ["2-3 suggestions for improvement"]
    }`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gemma2-9b-it",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Analyze this meal: ${mealDescription}` },
        ],
        temperature: 0.5,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage = errorData?.error?.message || 'Unknown error occurred';
      console.error('API Error:', errorData);
      throw new Error(`Failed to analyze nutrition: ${errorMessage}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Parse the JSON response
    try {
      // Find JSON object in the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Could not parse JSON from response");
      }
    } catch (e) {
      console.error("Error parsing JSON:", e);
      throw new Error("Failed to parse nutrition analysis results");
    }
  } catch (error) {
    console.error("Error analyzing nutrition:", error);
    throw error;
  }
};

export const getHealthyAlternatives = async (
  food: string
): Promise<HealthyAlternative> => {
  try {
    const apiKey = import.meta.env.VITE_GROQ_API_KEY;
    if (!apiKey) {
      throw new Error("Groq API key is not available. Please add it to your .env file as VITE_GROQ_API_KEY.");
    }

    const systemPrompt = `You are a nutrition expert. Provide healthy alternatives to the processed food item mentioned by the user. Respond with a JSON object containing:
    {
      "original": "original food item",
      "alternatives": [
        {
          "name": "healthy alternative 1",
          "benefits": ["benefit 1", "benefit 2"],
          "nutritionFacts": "key nutrition facts"
        },
        {
          "name": "healthy alternative 2",
          "benefits": ["benefit 1", "benefit 2"],
          "nutritionFacts": "key nutrition facts"
        },
        {
          "name": "healthy alternative 3",
          "benefits": ["benefit 1", "benefit 2"],
          "nutritionFacts": "key nutrition facts"
        }
      ]
    }`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gemma2-9b-it",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Provide healthy alternatives for: ${food}` },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage = errorData?.error?.message || 'Unknown error occurred';
      console.error('API Error:', errorData);
      throw new Error(`Failed to get healthy alternatives: ${errorMessage}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Parse the JSON response
    try {
      // Find JSON object in the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Could not parse JSON from response");
      }
    } catch (e) {
      console.error("Error parsing JSON:", e);
      throw new Error("Failed to parse healthy alternatives results");
    }
  } catch (error) {
    console.error("Error getting healthy alternatives:", error);
    throw error;
  }
};

export const chatWithNutritionAssistant = async (
  message: string
): Promise<string> => {
  try {
    const apiKey = import.meta.env.VITE_GROQ_API_KEY;
    if (!apiKey) {
      throw new Error("Groq API key is not available. Please add it to your .env file as VITE_GROQ_API_KEY.");
    }

    const systemPrompt = `You are a knowledgeable nutrition assistant AI. 
    Provide helpful, evidence-based answers to questions about nutrition, diet, and food. 
    Keep responses concise and easy to understand. 
    If you're unsure about something, acknowledge it and suggest consulting a professional. 
    Focus on providing general nutrition information rather than personalized medical advice.`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gemma2-9b-it",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage = errorData?.error?.message || 'Unknown error occurred';
      console.error('API Error:', errorData);
      throw new Error(`Failed to chat with nutrition assistant: ${errorMessage}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error chatting with nutrition assistant:", error);
    throw error;
  }
};

export type MealPlan = {
  dailyPlans: {
    day: string;
    meals: {
      type: string;
      name: string;
      calories: string;
      macros: {
        protein: string;
        carbs: string;
        fats: string;
      };
      recipe?: string;
    }[];
    totalCalories: string;
  }[];
  weeklyNotes: string[];
  dietaryFocus: string;
};

export type Recipe = {
  name: string;
  ingredients: string[];
  instructions: string[];
  nutritionInfo: {
    calories: string;
    protein: string;
    carbs: string;
    fats: string;
  };
  cookingTime: string;
  difficulty: string;
  tips: string[];
};

export const generateMealPlan = async (
  options: {
    days?: number;
    dietaryRestrictions?: string[];
    calorieGoal?: string;
    cuisine?: string;
    mealTypes?: string[];
    dietaryFocus?: string;
  } = {}
): Promise<MealPlan> => {
  try {
    const apiKey = import.meta.env.VITE_GROQ_API_KEY;
    if (!apiKey) {
      throw new Error("Groq API key is not available. Please add it to your .env file as VITE_GROQ_API_KEY.");
    }

    const systemPrompt = `You are an expert meal planner. Generate a weekly meal plan based on the user's preferences. Respond ONLY with a valid, complete JSON object (do NOT use markdown code blocks, do NOT include any commentary, explanation, or extra text). The JSON must match this TypeScript type exactly, with no trailing commas and no truncation:\n\n${JSON.stringify({
      dailyPlans: [
        {
          day: "string",
          meals: [
            {
              type: "string",
              name: "string",
              calories: "string",
              macros: { protein: "string", carbs: "string", fats: "string" },
              recipe: "string"
            }
          ],
          totalCalories: "string"
        }
      ],
      weeklyNotes: ["string"],
      dietaryFocus: "string"
    }, null, 2)}\n\nSTRICT INSTRUCTIONS:\n- Your response MUST be a valid JSON object and nothing else.\n- Do NOT use markdown code blocks.\n- Do NOT include any commentary or explanation.\n- Do NOT truncate your response.\n- The JSON must be valid and parseable by JSON.parse in JavaScript.\n- If you cannot generate a valid meal plan, respond with a valid JSON object with an 'error' property explaining why.`;

    const userPrompt = `Generate a meal plan for ${options.days || 7} days.\n${options.dietaryRestrictions ? `Dietary restrictions: ${options.dietaryRestrictions.join(', ')}` : ''}\n${options.calorieGoal ? `Calorie goal: ${options.calorieGoal}` : ''}\n${options.cuisine ? `Cuisine: ${options.cuisine}` : ''}\n${options.mealTypes ? `Meal types: ${options.mealTypes.join(', ')}` : ''}\n${options.dietaryFocus ? `Dietary focus: ${options.dietaryFocus}` : ''}`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gemma2-9b-it",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.6,
        max_tokens: 2048,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage = errorData?.error?.message || 'Unknown error occurred';
      console.error('API Error:', errorData);
      throw new Error(`Failed to generate meal plan: ${errorMessage}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    try {
      // Log the raw content for debugging
      console.log('Raw meal plan content:', content);

      // Try to extract JSON from a ```json ... ``` code block
      let jsonString = '';
      const codeBlockMatch = content.match(/```json\s*([\s\S]*?)```/i);
      if (codeBlockMatch && codeBlockMatch[1]) {
        jsonString = codeBlockMatch[1].trim();
      } else {
        // Fallback: Find first {...} block
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          jsonString = jsonMatch[0];
        }
      }
      if (jsonString) {
        // Check for obviously truncated JSON (missing closing brackets)
        const trimmed = jsonString.trim();
        const endsWithCurly = trimmed.endsWith('}');
        const endsWithSquare = trimmed.endsWith(']');
        // Heuristic: meal plan JSON should end with '}'
        if (!endsWithCurly) {
          console.error('Meal plan JSON appears truncated or incomplete. Raw JSON string:', jsonString);
          throw new Error('Meal plan generation failed: The response was incomplete or truncated. Please try again.');
        }
        try {
          return JSON.parse(jsonString);
        } catch (parseError) {
          console.error('JSON parse error. Problematic JSON string:', jsonString);
          throw new Error('Failed to parse meal plan results: Invalid JSON format. Try again or check the API/LLM settings.');
        }
      } else {
        // Instead of a generic error, throw the backend's message as the error
        console.error('No JSON found in response. Raw content:', content);
        throw new Error('Meal plan generation failed: No valid JSON found in the response.');
      }
    } catch (e) {
      console.error('Error parsing meal plan JSON:', e, '\nRaw content:', content);
      throw new Error('Failed to parse meal plan results');
    }
  } catch (error) {
    console.error("Error generating meal plan:", error);
    throw error;
  }
};

export const generateRecipesFromIngredients = async (
  ingredients: string[],
  preferences: {
    dietaryRestrictions?: string[];
    cuisine?: string;
    mealType?: string;
  } = {}
): Promise<Recipe[]> => {
  try {
    const apiKey = import.meta.env.VITE_GROQ_API_KEY;
    if (!apiKey) {
      throw new Error("Groq API key is not available. Please add it to your .env file as VITE_GROQ_API_KEY.");
    }

    const systemPrompt = `You are a creative chef specializing in healthy cooking. Generate recipes using the provided ingredients.
    The response should be a JSON array of recipe objects with the following structure:
    [
      {
        "name": "Recipe name",
        "ingredients": ["List of ingredients with quantities"],
        "instructions": ["Step by step cooking instructions"],
        "nutritionInfo": {
          "calories": "per serving",
          "protein": "grams",
          "carbs": "grams",
          "fats": "grams"
        },
        "cookingTime": "Total time",
        "difficulty": "Easy/Medium/Hard",
        "tips": ["Cooking tips and variations"]
      }
    ]`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gemma2-9b-it",
        messages: [
          { role: "system", content: systemPrompt },
          { 
            role: "user", 
            content: `Generate healthy recipes using these ingredients: ${ingredients.join(', ')}
              ${preferences.dietaryRestrictions ? `\nDietary restrictions: ${preferences.dietaryRestrictions.join(', ')}` : ''}
              ${preferences.cuisine ? `\nCuisine type: ${preferences.cuisine}` : ''}
              ${preferences.mealType ? `\nMeal type: ${preferences.mealType}` : ''}`
          },
        ],
        temperature: 0.7,
        max_tokens: 2048,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage = errorData?.error?.message || 'Unknown error occurred';
      console.error('API Error:', errorData);
      throw new Error(`Failed to generate recipes: ${errorMessage}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    try {
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Could not parse JSON from response");
      }
    } catch (e) {
      console.error("Error parsing JSON:", e);
      throw new Error("Failed to parse recipe results");
    }
  } catch (error) {
    console.error("Error generating recipes:", error);
    throw error;
  }
};
