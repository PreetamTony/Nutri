import React, { useState } from 'react';
import axios from 'axios';
import { Sparkles, Star, ArrowRight, ArrowLeft, UserCircle } from 'lucide-react';

const API_URL = import.meta.env.VITE_GROQ_API_URL || 'https://api.groq.com/openai/v1/chat/completions';
const API_KEY = import.meta.env.VITE_GROQ_API_KEY || '';

const AGE_LEVELS = [
  { label: 'Child (6-12)', value: 'child' },
  { label: 'Teen (13-17)', value: 'teen' },
  { label: 'Adult (18-64)', value: 'adult' },
  { label: 'Senior (65+)', value: 'senior' },
];

interface QuizQuestion {
  question: string;
  options: string[];
  answer: string; // correct answer
  explanation: string;
}

const QuizShow: React.FC = () => {
  const [ageLevel, setAgeLevel] = useState('child');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [error, setError] = useState('');

  const fetchQuiz = async () => {
    setLoading(true);
    setError('');
    setQuestions([]);
    setShowResult(false);
    setCurrent(0);
    setScore(0);
    setSelected(null);
    try {
      const prompt = `Generate 5 multiple-choice questions about healthy eating habits for a ${ageLevel} in a JSON array. Each object should have: question, options (array), answer (correct option), explanation (short).`;
      const response = await axios.post(
        API_URL,
        {
          model: 'llama3-8b-8192',
          messages: [
            { role: 'system', content: 'You are NutriBot, a nutrition and quiz expert.' },
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
      // Try to parse the JSON array from the LLM response
      let questionsArr: QuizQuestion[] = [];
      try {
        const match = content.match(/\[.*\]/s);
        if (match) {
          questionsArr = JSON.parse(match[0]);
        } else {
          throw new Error('No valid quiz JSON found.');
        }
      } catch (e) {
        setError('NutriBot could not generate the quiz. Try again!');
        setLoading(false);
        return;
      }
      setQuestions(questionsArr);
    } catch (err) {
      setError('Failed to fetch quiz questions. Please check your API key and try again.');
      console.error('QuizShow API error:', err);
    }
    setLoading(false);
  };

  const normalize = (str: any) => (typeof str === 'string' ? str : String(str)).trim().toLowerCase().replace(/[.?!]$/, '');
  const handleSelect = (option: string) => {
    setSelected(option);
    const answer = questions[current].answer;
    if (
      normalize(option) === normalize(answer) ||
      normalize(answer).includes(normalize(option)) ||
      normalize(option).includes(normalize(answer))
    ) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    setSelected(null);
    if (current + 1 < questions.length) {
      setCurrent((c) => c + 1);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex flex-col items-center py-10">
      <div className="bg-white/90 shadow-2xl rounded-2xl p-8 max-w-xl w-full border-t-8 border-green-400 animate-fade-in">
        <div className="flex items-center mb-6 gap-4">
          <UserCircle className="h-12 w-12 text-primary-400" />
          <input
            type="text"
            className="border border-green-200 rounded-lg px-4 py-2 text-green-700 focus:outline-none focus:ring-2 focus:ring-green-300 bg-white"
            placeholder="Your Name"
            value={playerName}
            onChange={e => setPlayerName(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="mb-4">
          <label className="font-semibold text-green-700 mr-2">Select Age Group:</label>
          <select
            value={ageLevel}
            onChange={e => setAgeLevel(e.target.value)}
            className="border border-green-200 rounded-lg px-3 py-2 text-green-700 bg-white focus:outline-none focus:ring-2 focus:ring-green-300"
            disabled={loading}
          >
            {AGE_LEVELS.map(lvl => <option key={lvl.value} value={lvl.value}>{lvl.label}</option>)}
          </select>
          <button
            onClick={fetchQuiz}
            className="ml-4 px-5 py-2 rounded bg-green-400 text-white font-semibold hover:bg-green-500 transition disabled:opacity-60"
            disabled={loading || !playerName.trim()}
          >
            <Sparkles className="h-4 w-4 inline mr-1" /> Start Quiz
          </button>
        </div>
        {loading && <div className="text-green-600 text-sm flex items-center gap-2 mb-2 animate-pulse"><Sparkles className="h-4 w-4" /> NutriBot is preparing your quiz...</div>}
        {error && <div className="text-red-600 text-sm mb-3 font-semibold">{error}</div>}
        {questions.length > 0 && !showResult && (
          <div className="animate-fade-in">
            <div className="mb-6 text-lg font-bold text-green-700">Q{current + 1}: {questions[current].question}</div>
            <div className="flex flex-col gap-3 mb-4">
              {questions[current].options.map(option => (
                <button
                  key={option}
                  className={`px-4 py-2 rounded-lg font-medium border shadow transition-all duration-150 text-left ${selected === option
                    ? (option === questions[current].answer
                      ? 'bg-green-200 border-green-400 text-green-900 scale-105'
                      : 'bg-red-100 border-red-400 text-red-700 scale-105')
                    : 'bg-white border-green-200 text-green-700 hover:bg-green-50'}`}
                  onClick={() => handleSelect(option)}
                  disabled={!!selected}
                >
                  {option}
                </button>
              ))}
            </div>
            {selected && (
              <div className={`rounded-lg p-4 mb-4 border flex items-center gap-3 ${selected === questions[current].answer ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                <span className="font-semibold">{selected === questions[current].answer ? 'Correct!' : 'Oops!'}</span>
                <span className="ml-2 text-sm">{questions[current].explanation}</span>
                <button
                  className="ml-auto px-4 py-1 rounded bg-green-100 text-green-800 font-medium border-green-200 hover:bg-green-200"
                  onClick={handleNext}
                >
                  {current + 1 < questions.length ? <><ArrowRight className="inline h-4 w-4" /> Next</> : 'See Result'}
                </button>
              </div>
            )}
          </div>
        )}
        {showResult && (
          <div className="text-center animate-fade-in">
            <div className="text-2xl font-bold text-green-700 mb-2 flex items-center justify-center gap-2">
              <Star className="h-7 w-7 text-yellow-400" />
              {playerName}, your score: {score} / {questions.length}
            </div>
            <div className="mb-4 text-green-600">{score === questions.length
              ? 'Outstanding! You are a healthy eating expert!'
              : score >= Math.floor(questions.length * 0.7)
                ? 'Great job! Keep learning about nutrition.'
                : 'Keep practicing and you will master healthy eating habits!'}</div>
            <button
              onClick={fetchQuiz}
              className="px-6 py-2 rounded bg-green-400 text-white font-semibold hover:bg-green-500 transition mt-2"
            >
              <Sparkles className="h-4 w-4 inline mr-1" /> Try Another Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizShow;
