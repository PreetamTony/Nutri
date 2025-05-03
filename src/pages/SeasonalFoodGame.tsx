import React, { useState } from 'react';
import axios from 'axios';
import { Leaf, Sparkles, Info, Star } from 'lucide-react';

const API_URL = import.meta.env.VITE_GROQ_API_URL || 'https://api.groq.com/openai/v1/chat/completions';
const API_KEY = import.meta.env.VITE_GROQ_API_KEY || '';

const SEASONS = [
  { label: 'Spring', value: 'spring' },
  { label: 'Summer', value: 'summer' },
  { label: 'Monsoon', value: 'monsoon' },
  { label: 'Autumn', value: 'autumn' },
  { label: 'Winter', value: 'winter' },
];

interface FoodItem {
  name: string;
  fact: string;
}

const SeasonalFoodGame: React.FC = () => {
  const [season, setSeason] = useState('summer');
  const [foodList, setFoodList] = useState<FoodItem[]>([]);
  const [guess, setGuess] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [revealed, setRevealed] = useState<FoodItem[]>([]);
  const [error, setError] = useState('');
  const [rawResponse, setRawResponse] = useState('');

  const fetchSeasonalFoods = async () => {
    setLoading(true);
    setError('');
    setFoodList([]);
    setRevealed([]);
    setFeedback('');
    setScore(0);
    try {
      const prompt = `List 8 popular fruits and vegetables in season in India during ${season}. For each, provide a fun nutrition fact. Respond as a JSON array of objects with 'name' and 'fact'.`;
      const response = await axios.post(
        API_URL,
        {
          model: 'llama3-8b-8192',
          messages: [
            { role: 'system', content: 'You are NutriBot, an expert on Indian seasonal foods and nutrition.' },
            { role: 'user', content: prompt },
          ],
          max_tokens: 512,
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
      let arr: FoodItem[] = [];
      setRawResponse('');
      try {
        const match = content.match(/\[.*\]/s);
        if (match) {
          let jsonStr = match[0];
          // Try to fix common LLM JSON issues
          jsonStr = jsonStr
            .replace(/,\s*([\]\}])/g, '$1') // Remove trailing commas
            .replace(/\'/g, '"'); // Replace single quotes with double quotes
          arr = JSON.parse(jsonStr);
        } else {
          throw new Error('No valid food JSON found.');
        }
      } catch (e) {
        console.error('NutriBot raw response:', content);
        setRawResponse(content || '');
        setError('NutriBot could not fetch seasonal foods. Try again!');
        setLoading(false);
        return;
      }
      setFoodList(arr);
    } catch (err) {
      setError('Failed to fetch foods. Please check your API key and try again.');
      console.error('SeasonalFoodGame API error:', err);
    }
    setLoading(false);
  };

  const handleGuess = () => {
    if (!guess.trim()) return;
    const normalized = guess.trim().toLowerCase();
    const found = foodList.find(item => item.name.toLowerCase() === normalized);
    if (found && !revealed.find(item => item.name === found.name)) {
      setRevealed([...revealed, found]);
      setScore(score + 1);
      setFeedback(`✅ Correct! ${found.name}: ${found.fact}`);
    } else if (found) {
      setFeedback('You already guessed this food!');
    } else {
      setFeedback('❌ Not in season or not on the list. Try again!');
    }
    setGuess('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-green-100 flex flex-col items-center py-10">
      <div className="bg-white/90 shadow-2xl rounded-2xl p-8 max-w-xl w-full border-t-8 border-green-400 animate-fade-in">
        <div className="flex items-center mb-6 gap-4">
          <Leaf className="h-12 w-12 text-green-500" />
          <h2 className="text-2xl font-bold text-green-700 mb-1 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-yellow-500" /> Seasonal Food Awareness Game
          </h2>
        </div>
        <div className="mb-4">
          <label className="font-semibold text-green-700 mr-2">Select Season:</label>
          <select
            value={season}
            onChange={e => setSeason(e.target.value)}
            className="border border-green-200 rounded-lg px-3 py-2 text-green-700 bg-white focus:outline-none focus:ring-2 focus:ring-green-300"
            disabled={loading}
          >
            {SEASONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
          <button
            onClick={fetchSeasonalFoods}
            className="ml-4 px-5 py-2 rounded bg-green-400 text-white font-semibold hover:bg-green-500 transition disabled:opacity-60"
            disabled={loading}
          >
            <Sparkles className="h-4 w-4 inline mr-1" /> Start
          </button>
        </div>
        {loading && <div className="text-green-600 text-sm flex items-center gap-2 mb-2 animate-pulse"><Sparkles className="h-4 w-4" /> NutriBot is preparing the seasonal food list...</div>}
        {error && <div className="text-red-600 text-sm mb-3 font-semibold">{error}</div>}
        {rawResponse && (
          <div className="mb-4 relative rounded-2xl bg-gradient-to-br from-yellow-50 to-green-50 border-2 border-green-200 shadow-lg flex flex-col items-start animate-fade-in overflow-hidden">
            <button
              className="absolute top-2 right-2 bg-green-200 hover:bg-green-300 text-green-800 rounded-full px-2 py-0.5 text-xs font-bold shadow-sm transition"
              aria-label="Dismiss raw response"
              onClick={() => setRawResponse('')}
            >✕</button>
            <div className="flex items-center gap-3 px-4 pt-4 pb-1">
              <img src="https://cdn-icons-png.flaticon.com/512/2726/2726015.png" alt="NutriBot" className="h-8 w-8 rounded-full border-2 border-green-300 bg-white" />
              <div>
                <div className="font-bold text-green-800 text-sm flex items-center gap-1">
                  NutriBot Debug Output
                  <span className="ml-1 text-xs bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded-full font-semibold">Beta</span>
                </div>
                <div className="text-green-700 text-xs mt-0.5">This is NutriBot's raw reply. If the game doesn't work, copy this and share it for support!</div>
              </div>
            </div>
            <pre className="bg-green-100/80 border border-green-200 rounded-xl text-xs text-green-900 p-4 mt-2 mx-4 mb-4 max-h-64 overflow-auto whitespace-pre-wrap break-words shadow-inner">
              {rawResponse}
            </pre>
          </div>
        )}
        {foodList.length > 0 && (
          <>
            <div className="mb-4 text-lg font-semibold text-green-700">Guess a fruit or vegetable in season:</div>
            <div className="flex gap-2 mb-6">
              <input
                type="text"
                className="border border-green-200 rounded-lg px-4 py-2 text-green-700 focus:outline-none focus:ring-2 focus:ring-green-300 bg-white"
                placeholder="Type your guess..."
                value={guess}
                onChange={e => setGuess(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleGuess()}
                disabled={loading || revealed.length === foodList.length}
              />
              <button
                onClick={handleGuess}
                className="px-5 py-2 rounded bg-green-400 text-white font-semibold hover:bg-green-500 transition disabled:opacity-60"
                disabled={loading || revealed.length === foodList.length}
              >Guess</button>
            </div>
            {feedback && <div className="mb-4 p-3 rounded bg-green-50 border border-green-200 text-green-800 animate-fade-in text-base">{feedback}</div>}
            <div className="mb-4">
              <div className="font-semibold text-green-700 mb-2">Revealed Seasonal Foods:</div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {revealed.map((item, i) => (
                  <li key={item.name} className="bg-white border border-green-200 rounded-lg p-3 flex gap-2 items-start shadow">
                    <Info className="h-4 w-4 text-green-400 mt-1" />
                    <div>
                      <span className="font-semibold text-green-800">{item.name}</span>
                      <div className="text-green-700 text-xs mt-1">{item.fact}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            {revealed.length === foodList.length && (
              <div className="text-center text-xl font-bold text-green-700 flex items-center justify-center gap-2 animate-fade-in">
                <Star className="h-7 w-7 text-yellow-400" />
                You found all seasonal foods! Score: {score} / {foodList.length}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SeasonalFoodGame;
