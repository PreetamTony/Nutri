import React, { useState } from 'react';
import { CheckCircle2, XCircle, Info, Sparkles } from 'lucide-react';
import { callNutriBotLLMFeedback } from '../lib/llm-feedback';

// Example Indian food pairings for nutrient synergy
const PAIRS = [
  {
    id: 1,
    foodA: 'Palak (Spinach)',
    foodB: 'Amla (Indian Gooseberry)',
    correct: true,
    reason: 'Vitamin C in amla boosts iron absorption from spinach.',
  },
  {
    id: 2,
    foodA: 'Rice',
    foodB: 'Curd (Yogurt)',
    correct: true,
    reason: 'Probiotics in curd improve digestion and nutrient absorption from rice.',
  },
  {
    id: 3,
    foodA: 'Chana (Chickpeas)',
    foodB: 'Lemon',
    correct: true,
    reason: 'Vitamin C in lemon increases iron absorption from chickpeas.',
  },
  {
    id: 4,
    foodA: 'Paneer',
    foodB: 'Spinach',
    correct: false,
    reason: 'Calcium in paneer can inhibit iron absorption from spinach if eaten together in excess.',
  },
  {
    id: 5,
    foodA: 'Turmeric',
    foodB: 'Black Pepper',
    correct: true,
    reason: 'Piperine in black pepper enhances absorption of curcumin from turmeric.',
  },
  {
    id: 6,
    foodA: 'Tomato',
    foodB: 'Cucumber',
    correct: false,
    reason: 'Cucumber can reduce vitamin C absorption from tomatoes when eaten together in large amounts.',
  },
];

function shuffle(arr: typeof PAIRS) {
  return arr
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);
}

const FoodPairingChallenge: React.FC = () => {
  const [llmFeedback, setLlmFeedback] = useState<string>('');
  const [llmLoading, setLlmLoading] = useState(false);
  const [questions, setQuestions] = useState(() => shuffle(PAIRS));
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selected, setSelected] = useState<null | boolean>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleChoice = (isPair: boolean) => {
    if (showAnswer) return;
    setSelected(isPair);
    setShowAnswer(true);
    if (isPair === questions[current].correct) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    setShowAnswer(false);
    setSelected(null);
    setShowInfo(false);
    if (current + 1 < questions.length) {
      setCurrent((c) => c + 1);
    } else {
      setCompleted(true);
    }
  };

  const restart = () => {
    setQuestions(shuffle(PAIRS));
    setCurrent(0);
    setScore(0);
    setShowAnswer(false);
    setSelected(null);
    setShowInfo(false);
    setCompleted(false);
  };

  if (completed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2 text-primary-700">Challenge Complete!</h2>
        <p className="text-lg mb-4">Your Score: <span className="font-semibold">{score} / {questions.length}</span></p>
        <button onClick={restart} className="glass-button px-6 py-2 rounded-lg text-primary-600 font-medium border border-primary-200 shadow hover:bg-primary-100">Play Again</button>
      </div>
    );
  }

  const q = questions[current];

  // LLM prompt for the current question
  const llmPrompt = `Is pairing "${q.foodA}" with "${q.foodB}" a good idea for nutrient synergy in Indian meals? Explain the science in simple terms for a layperson.`;

  const handleLlmFeedback = async () => {
    setLlmLoading(true);
    setLlmFeedback('');
    try {
      // You can replace this with a real LLM API call
      const feedback = await callNutriBotLLMFeedback([
        { name: q.foodA, type: '', price: 0 },
        { name: q.foodB, type: '', price: 0 },
      ]);
      setLlmFeedback(feedback);
    } catch (e) {
      setLlmFeedback('Sorry, NutriBot could not provide feedback at this time.');
    }
    setLlmLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-12 bg-white/80 rounded-xl shadow-lg p-8 border border-primary-100">
      <div className="flex items-center mb-6">
        <img src="https://i.postimg.cc/WzfKp2mL/image.png" alt="NutriBot" className="w-14 h-14 rounded-full border-4 border-primary-400 shadow bg-white mr-4" />
        <div>
          <h2 className="text-xl font-semibold text-primary-700 mb-1">Food Pairing Challenge</h2>
          <p className="text-primary-500 text-sm">Pair foods for better nutrient absorption!</p>
        </div>
      </div>
      <div className="mb-4 text-neutral-800 text-lg">
        <span className="font-semibold">Q{current + 1}:</span> Can you pair <span className="text-primary-600 font-semibold">{q.foodA}</span> with <span className="text-primary-600 font-semibold">{q.foodB}</span> for better nutrition?
      </div>
      <div className="flex gap-6 mb-6">
        <button
          className={`px-6 py-2 rounded-lg font-medium border transition-all duration-200 ${selected === true ? (q.correct ? 'bg-green-100 text-green-700 border-green-400' : 'bg-red-100 text-red-700 border-red-400') : 'bg-white border-primary-200 text-primary-700 hover:bg-primary-50'}`}
          onClick={() => handleChoice(true)}
          disabled={showAnswer}
        >
          Yes, it's a good pair
        </button>
        <button
          className={`px-6 py-2 rounded-lg font-medium border transition-all duration-200 ${selected === false ? (!q.correct ? 'bg-green-100 text-green-700 border-green-400' : 'bg-red-100 text-red-700 border-red-400') : 'bg-white border-primary-200 text-primary-700 hover:bg-primary-50'}`}
          onClick={() => handleChoice(false)}
          disabled={showAnswer}
        >
          No, it's not
        </button>
      </div>
      {showAnswer && (
        <div className={`rounded-lg p-4 mb-4 ${q.correct === selected ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'} border flex items-center gap-3`}>
          {q.correct === selected ? (
            <CheckCircle2 className="h-6 w-6 text-green-500" />
          ) : (
            <XCircle className="h-6 w-6 text-red-500" />
          )}
          <span className="font-semibold">{q.correct === selected ? 'Correct!' : 'Not quite.'}</span>
          <button className="ml-auto text-primary-500 hover:underline flex items-center gap-1" onClick={() => setShowInfo((v) => !v)}>
            <Info className="h-4 w-4" /> Why?
          </button>
        </div>
      )}
      {showInfo && (
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-2 text-primary-800 text-sm animate-fade-in">
          <strong>Explanation:</strong> {q.reason}
        </div>
      )}
      {showAnswer && (
        <div className="mb-4">
          <button
            onClick={handleLlmFeedback}
            className="flex items-center gap-2 px-4 py-2 rounded bg-primary-100 text-primary-700 font-semibold hover:bg-primary-200 transition disabled:opacity-60 text-xs sm:text-sm"
            disabled={llmLoading}
          >
            <Sparkles className="h-4 w-4" />
            {llmLoading ? 'NutriBot is thinking...' : 'Ask NutriBot for AI Feedback'}
          </button>
          {llmFeedback && (
            <div className="mt-3 p-3 rounded bg-neutral-50 border border-neutral-200 text-neutral-800 animate-fade-in text-sm">
              <strong>NutriBot:</strong> {llmFeedback}
            </div>
          )}
        </div>
      )}
      <div className="flex justify-between items-center mt-6">
        <span className="text-sm text-neutral-500">Score: {score}</span>
        {showAnswer && (
          <button
            onClick={handleNext}
            className="glass-button px-5 py-2 rounded-lg text-primary-600 font-medium border border-primary-200 shadow hover:bg-primary-100"
          >
            {current + 1 < questions.length ? 'Next' : 'Finish'}
          </button>
        )}
      </div>
    </div>
  );
};

export default FoodPairingChallenge;
