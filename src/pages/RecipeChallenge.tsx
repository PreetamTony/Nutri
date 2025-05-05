import axios from 'axios';
import { Sparkles, Star, Trophy } from 'lucide-react';
import React, { useEffect, useState } from 'react';

// Only use Groq API variables from .env; all else is hardcoded
const CHALLENGE = 'Make a protein-packed breakfast';
const INGREDIENTS = [
  'Eggs', 'Oats', 'Spinach', 'Paneer', 'Milk', 'Almonds', 'Banana', 'Chickpeas',
  'Yogurt', 'Tomato', 'Onion', 'Cheese', 'Chicken', 'Tofu', 'Peanuts', 'Broccoli'
];
const Zestly_IMG = 'https://i.postimg.cc/WzfKp2mL/image.png';

const API_URL = import.meta.env.VITE_GROQ_API_URL || 'https://api.groq.com/openai/v1/chat/completions';
const API_KEY = import.meta.env.VITE_GROQ_API_KEY || '';


interface LeaderboardEntry {
  name: string;
  recipe: string[];
  score: number;
  feedback: string;
}

const RecipeChallenge: React.FC = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    // Load leaderboard from localStorage
    const data = localStorage.getItem('Zestly_leaderboard');
    if (data) setLeaderboard(JSON.parse(data));
  }, []);

  const handleIngredientClick = (ingredient: string) => {
    setSelected((prev) =>
      prev.includes(ingredient)
        ? prev.filter((i) => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  const handleSubmit = async () => {
    if (!playerName.trim() || selected.length === 0) return;
    setLoading(true);
    setFeedback('');
    setScore(null);
    try {
      const prompt = `You are Zestly, a nutrition expert. Rate this recipe for the challenge: '${CHALLENGE}'.\nIngredients: ${selected.join(", ")}.\nGive a healthiness score out of 10, a creativity score out of 10, and a short feedback.`;
      const response = await axios.post(
        API_URL,
        {
          model: 'llama3-8b-8192',
          messages: [
            { role: 'system', content: 'You are Zestly, a nutrition expert for Indian meals. Give concise, actionable, and positive feedback.' },
            { role: 'user', content: prompt },
          ],
          max_tokens: 180,
          temperature: 0.7,
        },
        {
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const data = response.data;
      let feedbackMsg = data.choices?.[0]?.message?.content?.trim() || '';
      // Extract scores if present
      let healthScore = null, creativityScore = null;
      const scoreMatch = feedbackMsg.match(/healthiness score\s*:?\s*(\d+)/i);
      if (scoreMatch) healthScore = parseInt(scoreMatch[1], 10);
      const creativityMatch = feedbackMsg.match(/creativity score\s*:?\s*(\d+)/i);
      if (creativityMatch) creativityScore = parseInt(creativityMatch[1], 10);
      let totalScore = null;
      if (healthScore !== null && creativityScore !== null) {
        totalScore = healthScore + creativityScore;
        setScore(totalScore);
      }
      setFeedback(feedbackMsg);
      // Update leaderboard
      const entry: LeaderboardEntry = {
        name: playerName,
        recipe: selected,
        score: totalScore || 0,
        feedback: feedbackMsg,
      };
      const updatedLeaderboard = [...leaderboard, entry]
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);
      setLeaderboard(updatedLeaderboard);
      localStorage.setItem('Zestly_leaderboard', JSON.stringify(updatedLeaderboard));
    } catch (error) {
      setFeedback('Zestly could not rate your recipe at this time. Please try again.');
      console.error('Zestly API error:', error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-200 flex flex-col items-center py-10">
      <div className="bg-white/90 shadow-xl rounded-2xl p-8 max-w-2xl w-full border-t-8 border-primary-400 animate-fade-in">
        <div className="flex items-center mb-6">
          <img src={Zestly_IMG} alt="Zestly" className="w-16 h-16 rounded-full border-4 border-primary-400 shadow bg-white mr-4" />
          <div>
            <h2 className="text-2xl font-bold text-primary-700 mb-1 flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-yellow-500" /> Zestly Cooking Show
            </h2>
            <p className="text-primary-500 text-sm">{CHALLENGE}</p>
          </div>
        </div>
        <div className="mb-4 text-neutral-800 text-lg">
          <span className="font-semibold">Choose your ingredients:</span>
        </div>
        <div className="flex flex-wrap gap-3 mb-6">
          {INGREDIENTS.map((ingredient) => (
            <button
              key={ingredient}
              className={`px-4 py-2 rounded-lg font-medium border shadow transition-all duration-150 ${selected.includes(ingredient) ? 'bg-primary-200 border-primary-400 text-primary-800 scale-105' : 'bg-white border-primary-200 text-primary-700 hover:bg-primary-50'}`}
              onClick={() => handleIngredientClick(ingredient)}
              disabled={loading}
            >
              {ingredient}
            </button>
          ))}
        </div>
        <div className="mb-4 flex flex-col sm:flex-row gap-3 items-center">
          <input
            type="text"
            className="border border-primary-200 rounded-lg px-4 py-2 text-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-300 bg-white w-full sm:w-1/2"
            placeholder="Your Name (Leaderboard)"
            value={playerName}
            onChange={e => setPlayerName(e.target.value)}
            disabled={loading}
          />
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-6 py-2 rounded bg-primary-400 text-white font-semibold hover:bg-primary-500 transition disabled:opacity-60"
            disabled={loading || !playerName.trim() || selected.length === 0}
          >
            <Trophy className="h-5 w-5" /> Submit Recipe
          </button>
        </div>
        {loading && (
          <div className="text-primary-600 text-sm flex items-center gap-2 mb-2 animate-pulse"><Sparkles className="h-4 w-4" /> Zestly is rating your recipe...</div>
        )}
        {feedback && (
          <div className="mt-3 p-4 rounded bg-primary-50 border border-primary-200 text-primary-800 animate-fade-in text-base">
            <strong>Zestly:</strong> {feedback}
            {score !== null && (
              <div className="mt-2 flex gap-2 items-center text-primary-700 font-semibold">
                <Star className="h-5 w-5 text-yellow-400" /> Score: {score} / 20
              </div>
            )}
          </div>
        )}
      </div>
      <div className="mt-10 max-w-2xl w-full bg-white/80 rounded-xl shadow-lg p-6 border border-primary-100 animate-fade-in">
        <h3 className="text-xl font-bold mb-4 text-primary-700 flex items-center gap-2"><Trophy className="h-5 w-5 text-yellow-500" /> Leaderboard</h3>
        <ol className="space-y-3">
          {leaderboard.length === 0 && <li className="text-primary-400">No recipes yet. Be the first!</li>}
          {leaderboard.map((entry, i) => (
            <li key={i} className="flex flex-col sm:flex-row sm:items-center gap-2 bg-primary-50 border border-primary-200 rounded-lg p-3">
              <div className="flex-1">
                <span className="font-semibold text-primary-700">{i + 1}. {entry.name}</span>
                <span className="ml-2 text-primary-600 text-sm">[{entry.recipe.join(', ')}]</span>
                <div className="text-primary-500 text-xs mt-1">{entry.feedback}</div>
              </div>
              <div className="flex items-center gap-1 text-primary-800 font-bold">
                <Star className="h-4 w-4 text-yellow-400" /> {entry.score} / 20
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default RecipeChallenge;
