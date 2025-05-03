// src/lib/bmi-llm.ts
import axios from 'axios';

const API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

export async function getBMIInsightsAndSuggestions(bmi: number, category: string): Promise<{ insight: string; suggestions: string[] }> {
  if (!API_KEY) {
    throw new Error('Groq API key is not available. Please add it to your .env file as VITE_GROQ_API_KEY.');
  }

  const systemPrompt = `You are a certified nutritionist AI. Given a user's BMI value and category, provide:\n1. A concise, evidence-based insight on what this BMI means for health.\n2. A list of 3-5 actionable, personalized suggestions/remedies to help the user (e.g., causes, remedies, lifestyle changes, or when to see a doctor).\nKeep it supportive, motivational, and easy to understand. Respond as JSON: { insight: string, suggestions: string[] }`;

  const userPrompt = `BMI: ${bmi}, Category: ${category}`;

  const response = await axios.post(
    API_URL,
    {
      model: 'llama3-8b-8192',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.6,
      max_tokens: 600,
    },
    {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  const content = response.data.choices[0].message.content;
  try {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    } else {
      throw new Error('Could not parse JSON from LLM response');
    }
  } catch (e) {
    throw new Error('Failed to parse LLM BMI insights');
  }
}
