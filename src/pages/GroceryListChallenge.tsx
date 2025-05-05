import React, { useState } from 'react';
import { Info, IndianRupee } from 'lucide-react';
import { motion } from 'framer-motion';
import { callZestlyLLMFeedback } from '../lib/llm-feedback';

// Example food items (Indian, healthy, affordable)
const FOOD_ITEMS = [
  { id: 1, name: 'Brown Rice', price: 60, nutrition: 'High in fiber, complex carbs', good: true, type: 'Carb' },
  { id: 2, name: 'White Bread', price: 40, nutrition: 'Refined carbs, low fiber', good: false, type: 'Carb' },
  { id: 3, name: 'Moong Dal', price: 80, nutrition: 'High protein, affordable', good: true, type: 'Protein' },
  { id: 4, name: 'Potato Chips', price: 30, nutrition: 'High fat, low nutrients', good: false, type: 'Snack' },
  { id: 5, name: 'Spinach', price: 25, nutrition: 'Rich in iron, vitamins', good: true, type: 'Veg' },
  { id: 6, name: 'Paneer', price: 100, nutrition: 'Good protein, calcium', good: true, type: 'Protein' },
  { id: 7, name: 'Sugary Drinks', price: 50, nutrition: 'Empty calories, sugar', good: false, type: 'Drink' },
  { id: 8, name: 'Tomatoes', price: 35, nutrition: 'Vitamins, antioxidants', good: true, type: 'Veg' },
  { id: 9, name: 'Oats', price: 70, nutrition: 'Fiber, good carbs', good: true, type: 'Carb' },
  { id: 10, name: 'Bananas', price: 20, nutrition: 'Potassium, energy', good: true, type: 'Fruit' },
  { id: 11, name: 'Eggs (6 pc)', price: 60, nutrition: 'Complete protein, B12', good: true, type: 'Protein' },
  { id: 12, name: 'Apple', price: 30, nutrition: 'Fiber, vitamin C', good: true, type: 'Fruit' },
  { id: 13, name: 'Chicken Breast (250g)', price: 120, nutrition: 'Lean protein', good: true, type: 'Protein' },
  { id: 14, name: 'Samosa (2 pc)', price: 25, nutrition: 'Fried, high fat', good: false, type: 'Snack' },
  { id: 15, name: 'Milk (1L)', price: 50, nutrition: 'Calcium, protein', good: true, type: 'Drink' },
];

const getRandomBudget = () => Math.floor(Math.random() * 7) * 20 + 220;

const GroceryListChallenge: React.FC = () => {
  const [selected, setSelected] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showInfoId, setShowInfoId] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filterType, setFilterType] = useState('');
  const [llmFeedback, setLlmFeedback] = useState('');
  const [llmLoading, setLlmLoading] = useState(false);
  const budget = getRandomBudget();

  // Filter and sort food items
  const filteredFoodItems = FOOD_ITEMS.filter(item => !filterType || item.type === filterType);
  const sortedFoodItems = [...filteredFoodItems].sort((a, b) => sortOrder === 'asc' ? a.price - b.price : b.price - a.price);

  const total = selected.reduce((acc, id) => acc + (FOOD_ITEMS.find(i => i.id === id)?.price || 0), 0);

  // Nutrition summary and healthy plate check
  const summary: Record<string, number> = {};
  selected.forEach(id => {
    const item = FOOD_ITEMS.find(i => i.id === id);
    if (item) {
      summary[item.type] = (summary[item.type] || 0) + 1;
    }
  });
  const hasProtein = !!summary['Protein'];
  const hasVeg = !!summary['Veg'];
  const hasCarb = !!summary['Carb'];
  const hasFruit = !!summary['Fruit'];
  const healthyPlate = hasProtein && hasVeg && hasCarb && hasFruit;

  const handleSelect = (id: number) => {
    if (completed) return;
    setSelected((prev) => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleSubmit = () => {
    setShowFeedback(true);
    // Calculate score: +1 for each healthy, affordable item, -1 for each unhealthy item
    let s = 0;
    selected.forEach(id => {
      const item = FOOD_ITEMS.find(i => i.id === id);
      if (item?.good) s++;
      if (item && !item.good) s--;
    });
    setScore(s);
    setCompleted(true);
  };

  const restart = () => {
    setSelected([]);
    setShowFeedback(false);
    setScore(0);
    setCompleted(false);
    setShowInfoId(null);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white rounded-2xl shadow-lg border border-neutral-200 overflow-hidden">
      {/* Header with Zestly avatar */}
      <div className="flex items-center gap-4 px-6 py-5 border-b border-neutral-100 bg-white">
        <img src="https://i.postimg.cc/WzfKp2mL/image.png" alt="Zestly" className="w-12 h-12 rounded-full border-2 border-primary-200 object-cover" />
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-primary-700">Zestly's Grocery List Challenge</h2>
          <p className="text-base text-neutral-500">Plan a healthy, balanced, and affordable shopping list!</p>
        </div>
      </div>
      <div className="px-5 py-6">
        {/* Budget and total */}
        <div className="flex flex-wrap items-center gap-4 mb-2">
          <div className="flex items-center gap-1 text-neutral-600">
            <IndianRupee className="h-4 w-4 text-primary-400" />
            <span className="font-medium">Budget: <span className="text-primary-600 font-bold">₹{budget}</span></span>
          </div>
          <span className={`ml-auto text-sm font-semibold ${total > budget ? 'text-red-600' : 'text-primary-600'}`}>Total: ₹{total}</span>
        </div>
        <div className="mb-2 text-xs text-neutral-400">Selected items: <span className="font-semibold text-primary-700">{selected.length}</span> / {FOOD_ITEMS.length}</div>
        {/* Sort/Filter Controls */}
        <div className="flex flex-wrap gap-3 mb-5 items-center">
          <label className="text-sm font-medium text-neutral-700">Filter by type:
            <select className="ml-2 border rounded px-2 py-1" value={filterType} onChange={e => setFilterType(e.target.value)}>
              <option value="">All</option>
              <option value="Protein">Protein</option>
              <option value="Veg">Veg</option>
              <option value="Carb">Carb</option>
              <option value="Fruit">Fruit</option>
              <option value="Drink">Drink</option>
            </select>
          </label>
          <label className="text-sm font-medium text-neutral-700 ml-4">Sort by price:
            <select className="ml-2 border rounded px-2 py-1" value={sortOrder} onChange={e => setSortOrder(e.target.value as 'asc' | 'desc')}>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </label>
        </div>
        {/* Table of food items */}
        <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.4}}>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-neutral-500 border-b border-neutral-200">
                  <th className="py-2 text-left font-normal">Select</th>
                  <th className="py-2 text-left font-normal">Item</th>
                  <th className="py-2 text-left font-normal">Type</th>
                  <th className="py-2 text-left font-normal">Nutrition</th>
                  <th className="py-2 text-left font-normal">Cost</th>
                  <th className="py-2 text-left font-normal">Info</th>
                </tr>
              </thead>
              <tbody>
                {sortedFoodItems.map((item, idx) => (
                  <tr key={item.id} className={
                    `${selected.includes(item.id)
                      ? (item.good ? 'bg-green-50' : 'bg-red-50')
                      : (idx % 2 === 0 ? 'bg-white' : 'bg-neutral-50')}
                     hover:bg-primary-50 transition`}
                  >
                    <td className="py-2 pr-2 text-center">
                      <input
                        type="checkbox"
                        checked={selected.includes(item.id)}
                        onChange={() => handleSelect(item.id)}
                        className="accent-primary-500"
                        disabled={completed}
                      />
                    </td>
                    <td className="py-2 pr-2 font-medium text-neutral-800">{item.name}</td>
                    <td className="py-2 pr-2">
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${item.type === 'Protein' ? 'bg-blue-50 text-blue-600' : item.type === 'Veg' ? 'bg-green-50 text-green-600' : item.type === 'Carb' ? 'bg-yellow-50 text-yellow-700' : item.type === 'Fruit' ? 'bg-pink-50 text-pink-600' : item.type === 'Drink' ? 'bg-cyan-50 text-cyan-600' : 'bg-neutral-100 text-neutral-600'}`}>{item.type}</span>
                    </td>
                    <td className="py-2 pr-2 text-neutral-600">{item.nutrition}</td>
                    <td className="py-2 pr-2 text-primary-700 font-semibold">₹{item.price}</td>
                    <td className="py-2 pr-2 text-center">
                      <button
                        className="text-primary-400 hover:text-primary-600"
                        onClick={e => { e.stopPropagation(); setShowInfoId(showInfoId === item.id ? null : item.id); }}
                        tabIndex={-1}
                        aria-label="Show nutrition info"
                      >
                        <Info className="h-4 w-4 inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
        {showInfoId && (
          <div className="mb-4 bg-primary-50 border border-primary-200 rounded-lg p-4 text-primary-800 text-sm animate-fade-in">
            <strong>Nutrition Info:</strong> {FOOD_ITEMS.find(i => i.id === showInfoId)?.nutrition}
          </div>
        )}

        <div className="mb-4">
          <div className="flex flex-wrap gap-3 items-center text-sm">
            <span className="font-semibold text-primary-700">Nutrition Summary:</span>
            <span className={`px-2 py-0.5 rounded-full font-medium text-xs ${hasProtein ? 'bg-blue-100 text-blue-700' : 'bg-blue-50 text-blue-400'}`}>Protein: {summary['Protein'] || 0}</span>
            <span className={`px-2 py-0.5 rounded-full font-medium text-xs ${hasVeg ? 'bg-green-100 text-green-700' : 'bg-green-50 text-green-400'}`}>Veg: {summary['Veg'] || 0}</span>
            <span className={`px-2 py-0.5 rounded-full font-medium text-xs ${hasCarb ? 'bg-yellow-100 text-yellow-700' : 'bg-yellow-50 text-yellow-400'}`}>Carb: {summary['Carb'] || 0}</span>
            <span className={`px-2 py-0.5 rounded-full font-medium text-xs ${hasFruit ? 'bg-pink-100 text-pink-700' : 'bg-pink-50 text-pink-400'}`}>Fruit: {summary['Fruit'] || 0}</span>
          </div>
          <div className="mt-2">
            {healthyPlate ? (
              <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold animate-bounce">🥳 Healthy Plate Achieved!</span>
            ) : (
              <span className="inline-block px-4 py-1 rounded-full bg-red-100 text-red-600 font-semibold">Try to include at least one protein, veg, carb, and fruit!</span>
            )}
          </div>        </div>
      </div>
      {!completed && (
        <button
          onClick={handleSubmit}
          className="w-full py-2 rounded-lg font-semibold text-base bg-primary-500 text-white shadow hover:bg-primary-600 transition"
          disabled={total > budget || selected.length === 0}
        >
          Submit Grocery List
        </button>
      )}
      {showFeedback && (
        <>
          <motion.div className="mt-7" initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5}}>
            <div className={`rounded-lg p-4 mb-4 flex items-center gap-3 ${score > 0 && total <= budget ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'} border`}>
              <span className="font-semibold">
                {score > 0 && total <= budget ? 'Great job! Your list is healthy and affordable.' : 'Let’s try for a healthier, budget-friendly list!'}
              </span>
            </div>
            {/* LLM Feedback Button and Output */}
            <div className="mb-4">
              <button
                className="px-4 py-2 rounded bg-primary-100 text-primary-700 font-semibold hover:bg-primary-200 transition disabled:opacity-60"
                disabled={llmLoading || selected.length === 0}
                onClick={async () => {
                  setLlmLoading(true);
                  setLlmFeedback('');
                  const items = selected.map(id => {
                    const item = FOOD_ITEMS.find(i => i.id === id);
                    return item ? {name: item.name, type: item.type, price: item.price} : null;
                  }).filter(Boolean) as {name: string, type: string, price: number}[];
                  const feedback = await callZestlyLLMFeedback(items);
                  setLlmFeedback(feedback);
                  setLlmLoading(false);
                }}
              >
                {llmLoading ? 'Getting Zestly Feedback...' : 'Get Zestly LLM Feedback'}
              </button>
              {llmFeedback && (
                <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.4}} className="mt-3 p-3 rounded bg-neutral-50 border border-neutral-200 text-neutral-800">
                  <strong>Zestly:</strong> {llmFeedback}
                </motion.div>
              )}
            </div>
            <div className="mb-4">
              <strong>Zestly says:</strong> {selected.map(id => {
                const item = FOOD_ITEMS.find(i => i.id === id);
                return item ? item.name : null;
              }).filter(Boolean).join(', ')}
            </div>
          </motion.div>
          <div className="mb-4">
              <span className="font-semibold text-primary-700">Your Grocery Summary:</span>
              <ul className="list-disc ml-6 mt-1 text-neutral-700">
                {selected.map(id => {
                  const item = FOOD_ITEMS.find(i => i.id === id);
                  if (!item) return null;
                  return (
                    <li key={id}>{item.name} <span className="text-xs text-neutral-500">({item.type}, ₹{item.price})</span></li>
                  );
                })}
              </ul>
              <div className="mt-2 text-sm text-neutral-500">Total Cost: <span className="font-semibold text-primary-700">₹{total}</span></div>
            </div>
            <button onClick={restart} className="w-full py-2 rounded-lg font-semibold text-base bg-primary-500 text-white shadow hover:bg-primary-600 transition mt-1">Play Again</button>
        </>
        
      )}
      {/* Healthy shopping tip */}
      <div className="mt-8 mb-2 px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-700 text-center text-sm shadow-sm">
        <span className="font-semibold">Tip:</span> For a healthy Indian thali, try to include a mix of protein, vegetables, whole grains, and fruit. Shopping smart helps your body and your wallet!
      </div>
    </div>
  );
};

export default GroceryListChallenge;
