import React, { useState } from 'react';
import axios from 'axios';
import { Globe, Plane, ChefHat, Sparkles } from 'lucide-react';

const API_URL = import.meta.env.VITE_GROQ_API_URL || 'https://api.groq.com/openai/v1/chat/completions';
const API_KEY = import.meta.env.VITE_GROQ_API_KEY || '';

const COUNTRIES = [
  { name: 'Italy', cuisine: 'Mediterranean' },
  { name: 'Japan', cuisine: 'Japanese' },
  { name: 'India', cuisine: 'Indian' },
  { name: 'Mexico', cuisine: 'Mexican' },
  { name: 'France', cuisine: 'French' },
  { name: 'Thailand', cuisine: 'Thai' },
  { name: 'Morocco', cuisine: 'Moroccan' },
  { name: 'Greece', cuisine: 'Greek' },
  { name: 'Ethiopia', cuisine: 'Ethiopian' },
];

interface JourneyStep {
  country: string;
  cuisine: string;
  dish: string;
  healthyVersion: string;
  nutritionFacts: string;
  funFact: string;
}

const VirtualFoodJourney: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [step, setStep] = useState<JourneyStep | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rawResponse, setRawResponse] = useState('');

  const fetchJourneyStep = async (country: string, cuisine: string) => {
    setLoading(true);
    setError('');
    setStep(null);
    setRawResponse('');
    try {
      const prompt = `You are NutriBot, a friendly nutritionist. For ${country}, describe one iconic healthy dish from its ${cuisine} cuisine. Give:
- Dish name
- A healthy version of the dish (with tips)
- Nutrition facts (short)
- One fun cultural or historical fact about the dish
Respond as a JSON object with keys: dish, healthyVersion, nutritionFacts, funFact.`;
      const response = await axios.post(
        API_URL,
        {
          model: 'llama3-8b-8192',
          messages: [
            { role: 'system', content: 'You are NutriBot, a global cuisine and nutrition expert.' },
            { role: 'user', content: prompt },
          ],
          max_tokens: 400,
          temperature: 0.7,
        },
        {
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const content = response.data.choices?.[0]?.message?.content;
      setRawResponse('');
      let stepObj: JourneyStep | null = null;
      try {
        const match = content.match(/\{[\s\S]*\}/);
        if (match) {
          let jsonStr = match[0]
            .replace(/,\s*([\}\]])/g, '$1')
            .replace(/\'/g, '"');
          stepObj = JSON.parse(jsonStr);
        } else {
          throw new Error('No valid JSON found.');
        }
      } catch (e) {
        setRawResponse(content || '');
        setError('NutriBot could not parse the dish info. Try again!');
        setLoading(false);
        return;
      }
      setStep({
        country,
        cuisine,
        ...stepObj,
      });
    } catch (err) {
      setError('Failed to fetch dish info. Please check your API key and try again.');
    }
    setLoading(false);
  };

  React.useEffect(() => {
    const { name, cuisine } = COUNTRIES[current];
    fetchJourneyStep(name, cuisine);
    // eslint-disable-next-line
  }, [current]);

  const nextCountry = () => setCurrent((c) => (c + 1) % COUNTRIES.length);
  const prevCountry = () => setCurrent((c) => (c - 1 + COUNTRIES.length) % COUNTRIES.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-yellow-50 to-green-100 flex flex-col items-center py-10">
      <div className="w-full max-w-2xl mb-8 flex flex-col items-center animate-fade-in">
        <div className="flex items-center gap-4 mb-4">
          <Plane className="h-10 w-10 text-blue-400 animate-float" />
          <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-700 drop-shadow flex items-center gap-3">
            <Globe className="h-8 w-8 text-green-500" />
            Food Journey
          </h1>
        </div>
        <p className="text-lg text-blue-800 font-semibold text-center max-w-lg">
          <Sparkles className="inline h-5 w-5 text-yellow-400 animate-bounce" />
          Travel the world with NutriBot and discover healthy global cuisines in the Food Journey!
        </p>
      </div>
      <div className="bg-white/90 shadow-2xl rounded-2xl p-8 max-w-xl w-full border-t-8 border-blue-400 animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <button
            className="px-4 py-2 rounded-lg bg-blue-100 text-blue-700 font-bold hover:bg-blue-200 transition"
            onClick={prevCountry}
            disabled={loading}
          >
            ◀ Prev
          </button>
          <div className="text-xl font-bold text-blue-800 flex items-center gap-2">
            <ChefHat className="h-6 w-6 text-yellow-500 animate-pulse" />
            {COUNTRIES[current].name} <span className="text-base text-green-600 font-semibold">({COUNTRIES[current].cuisine})</span>
          </div>
          <button
            className="px-4 py-2 rounded-lg bg-blue-100 text-blue-700 font-bold hover:bg-blue-200 transition"
            onClick={nextCountry}
            disabled={loading}
          >
            Next ▶
          </button>
        </div>
        {loading && <div className="text-blue-600 text-sm flex items-center gap-2 mb-2 animate-pulse"><Sparkles className="h-4 w-4" /> NutriBot is preparing your journey stop...</div>}
        {error && <div className="text-red-600 text-sm mb-3 font-semibold">{error}</div>}
        {rawResponse && (
          <div className="mb-4 relative rounded-2xl bg-gradient-to-br from-yellow-50 to-blue-50 border-2 border-blue-200 shadow-lg flex flex-col items-start animate-fade-in overflow-hidden">
            <button
              className="absolute top-2 right-2 bg-blue-200 hover:bg-blue-300 text-blue-800 rounded-full px-2 py-0.5 text-xs font-bold shadow-sm transition"
              aria-label="Dismiss raw response"
              onClick={() => setRawResponse('')}
            >✕</button>
            <div className="flex items-center gap-3 px-4 pt-4 pb-1">
              <img src="https://cdn-icons-png.flaticon.com/512/2726/2726015.png" alt="NutriBot" className="h-8 w-8 rounded-full border-2 border-blue-300 bg-white" />
              <div>
                <div className="font-bold text-blue-800 text-sm flex items-center gap-1">
                  NutriBot Debug Output
                  <span className="ml-1 text-xs bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded-full font-semibold">Beta</span>
                </div>
                <div className="text-blue-700 text-xs mt-0.5">This is NutriBot's raw reply. If the game doesn't work, copy this and share it for support!</div>
              </div>
            </div>
            <pre className="bg-blue-100/80 border border-blue-200 rounded-xl text-xs text-blue-900 p-4 mt-2 mx-4 mb-4 max-h-64 overflow-auto whitespace-pre-wrap break-words shadow-inner">
              {rawResponse}
            </pre>
          </div>
        )}
        {step && (
          <div className="flex flex-col gap-4 animate-fade-in">
            <div className="bg-gradient-to-br from-green-50 to-yellow-50 border-l-4 border-blue-300 rounded-xl p-4 shadow flex flex-col gap-2">
              <div className="text-lg font-bold text-green-800 flex items-center gap-2">
                <ChefHat className="h-5 w-5 text-yellow-500" /> {step.dish}
              </div>
              <div className="text-green-700 text-sm mb-1 italic">{step.nutritionFacts}</div>
              <div className="text-blue-800 text-base font-semibold">Healthy Version:</div>
              <div className="text-blue-700 text-sm mb-1">{step.healthyVersion}</div>
              <div className="text-blue-800 text-base font-semibold">Fun Fact:</div>
              <div className="text-blue-700 text-sm">{step.funFact}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VirtualFoodJourney;
