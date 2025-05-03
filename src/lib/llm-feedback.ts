import axios from 'axios';

/**
 * Type for Groq/OpenAI-style chat messages
 */
export type ChatCompletionRequestMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

/**
 * Calls the Groq LLM API to get feedback on selected food items.
 * @param selectedItems Array of selected food items (name, type, price)
 * @param prompt Optional custom prompt (for food pairing, etc)
 */
export async function callNutriBotLLMFeedback(
  selectedItems: Array<{ name: string; type?: string; price?: number }>,
  prompt?: string
): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY || (import.meta.env && import.meta.env.VITE_GROQ_API_KEY);
  const apiUrl = process.env.GROQ_API_URL || (import.meta.env && import.meta.env.VITE_GROQ_API_URL) || 'https://api.groq.com/openai/v1/chat/completions';
  if (!apiKey) return 'Error: GROQ_API_KEY is not set. Please set the API key in your environment variables.';

  let userPrompt = prompt;
  if (!userPrompt) {
    if (!selectedItems.length) return 'Please select some items to get feedback.';
    userPrompt = `Here is a list of foods: ${selectedItems.map(i => i.name).join(', ')}. Give feedback on the healthiness and suggest improvements for a balanced Indian diet.`;
  }

  const messages: ChatCompletionRequestMessage[] = [
    { role: 'system', content: 'You are NutriBot, a nutrition expert for Indian meals. Give concise, actionable, and positive feedback.' },
    { role: 'user', content: userPrompt },
  ];

  try {
    const response = await axios.post(apiUrl, {
      model: 'mixtral-8x7b-32768',
      messages,
      max_tokens: 180,
      temperature: 0.7,
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });
    const data = response.data;
    if (!data.choices || !data.choices[0] || !data.choices[0].message || !data.choices[0].message.content) {
      console.error('Groq API response missing choices or message:', data);
      return 'NutriBot could not provide feedback because the AI service did not return a valid response.';
    }
    return data.choices[0].message.content.trim();
  } catch (error: any) {
    console.error('NutriBot LLM API call failed:', error);
    if (axios.isAxiosError(error)) {
      const apiErrorMsg = error.response?.data?.error?.message || error.message || 'Unknown error';
      return `NutriBot error: ${error.response?.status} ${error.response?.statusText}. ${apiErrorMsg}`;
    }
    return 'NutriBot failed to connect to the AI service.';
  }
}

