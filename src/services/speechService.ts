import axios from 'axios';

const GROQ_API_URL = 'https://api.groq.com/openai/v1';
const headers = {
  'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
  'Content-Type': 'application/json'
};

export async function transcribeAudio(audioBlob: Blob, language: string): Promise<string> {
  const formData = new FormData();
  formData.append('file', audioBlob, 'audio.wav');
  formData.append('model', 'whisper-large-v3');
  formData.append('language', language);

  try {
    const response = await axios.post(
      `${GROQ_API_URL}/audio/transcriptions`,
      formData,
      {
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
        },
      }
    );
    return response.data.text;
  } catch (error) {
    console.error('Transcription error:', error);
    throw new Error('Failed to transcribe audio');
  }
}

export async function generateResponse(text: string, language: string): Promise<string> {
  // Choose prompt based on language
  let systemPrompt = '';
  switch (language) {
    case 'ta':
      systemPrompt = 'You are a helpful Tamil language assistant. Always respond in Tamil language only. If someone greets with "வணக்கம்", respond with "வணக்கம்! எவ்வளவு உதவி வேண்டும்?". Keep responses concise and natural.';
      break;
    case 'hi':
      systemPrompt = 'You are a helpful Hindi language assistant. Always respond in Hindi language only. Keep responses concise and natural.';
      break;
    case 'ml':
      systemPrompt = 'You are a helpful Malayalam language assistant. Always respond in Malayalam language only. Keep responses concise and natural.';
      break;
    case 'en':
    default:
      systemPrompt = 'You are a helpful English language assistant. Always respond in English. Keep responses concise and natural.';
  }

  try {
    const response = await axios.post(
      `${GROQ_API_URL}/chat/completions`,
      {
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: text
          }
        ],
        model: 'gemma2-9b-it',
        temperature: 0.7,
        max_tokens: 200,
      },
      { headers }
    );

    // Try to get the response content
    return response.data.choices[0]?.message?.content || 'Sorry, no response.';
  } catch (error) {
    console.error('Response generation error:', error);
    throw new Error('Failed to generate response');
  }
}
