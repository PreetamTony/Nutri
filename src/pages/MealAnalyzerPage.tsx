import { motion } from 'framer-motion';
import { ArrowRight, CameraIcon, PieChart, Search } from 'lucide-react';
import React, { useState } from 'react';
import { analyzeNutrition, NutritionAnalysisResult } from '../lib/groq-api';

const AVATAR_SRC = 'https://i.postimg.cc/WzfKp2mL/image.png';

const MealAnalyzerPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<NutritionAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    const saved = localStorage.getItem('recentMealSearches');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage when recentSearches changes
  React.useEffect(() => {
    localStorage.setItem('recentMealSearches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    const trimmed = searchQuery.trim();
    if (!trimmed) return;
    setIsLoading(true);
    try {
      const analysis = await analyzeNutrition(trimmed);
      setResult(analysis);
      setRecentSearches((prev) => {
        const updated = [trimmed, ...prev.filter((s) => s !== trimmed)].slice(0, 5);
        return updated;
      });
    } catch (err: any) {
      setError(err.message || 'Failed to analyze meal.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecentClick = async (item: string) => {
    setSearchQuery(item);
    setError(null);
    setResult(null);
    setIsLoading(true);
    try {
      const analysis = await analyzeNutrition(item);
      setResult(analysis);
      setRecentSearches((prev) => {
        const updated = [item, ...prev.filter((s) => s !== item)].slice(0, 5);
        return updated;
      });
    } catch (err: any) {
      setError(err.message || 'Failed to analyze meal.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-neutral-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-neutral-200">
            <div className="bg-primary-500 text-white p-6 relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img src={AVATAR_SRC} alt="Zestly" className="w-14 h-14 rounded-full border-4 border-white shadow-md bg-white object-cover mr-2" />
                  <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Meal Analyzer</h1>
                    <p className="text-primary-100 text-sm">Analyze the nutritional content of your meals</p>
                  </div>
                </div>
                <PieChart className="h-10 w-10 text-white opacity-80" />
              </div>
              <div className="absolute right-6 top-6 opacity-10 pointer-events-none select-none">
                
              </div>
            </div> 
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-lg font-semibold text-neutral-800 mb-4">Search Food Item</h2>
                  <form onSubmit={handleSearch}>
                    <div className="flex">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Enter food item or meal..."
                        className="flex-1 border rounded-l-lg border-neutral-300 py-3 px-4 focus:outline-none focus:ring-1 focus:ring-primary-400"
                      />
                      <button
                        type="submit"
                        className="bg-primary-500 hover:bg-primary-600 text-white py-3 px-6 rounded-r-lg transition duration-200 disabled:bg-neutral-300 flex items-center"
                        disabled={isLoading || !searchQuery.trim()}
                      >
                        {isLoading ? (
                          <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                        ) : (
                          <Search size={20} />
                        )}
                      </button>
                    </div>
                  </form>

                  <div className="mt-6">
                    <p className="text-neutral-600 mb-4">- OR -</p>
                    <button className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 py-3 rounded-md transition duration-200 flex items-center justify-center">
                      <CameraIcon className="h-5 w-5 mr-2" />
                      Take Photo of Your Meal
                    </button>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-neutral-800 mb-3 flex items-center gap-2">
                      <img src={AVATAR_SRC} alt="avatar" className="w-6 h-6 rounded-full border border-primary-200 shadow-sm" />
                      Recent Searches
                    </h3>
                    {recentSearches.length === 0 ? (
                      <div className="text-neutral-400 text-sm italic">No recent searches yet.</div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        {recentSearches.map((item, idx) => (
                          <button
                            key={item}
                            className="w-full text-left p-3 border border-neutral-200 rounded-lg bg-white hover:bg-primary-50 transition duration-200 flex items-center justify-between shadow-sm group"
                            onClick={() => handleRecentClick(item)}
                          >
                            <span className="flex items-center gap-2">
                              <img src={AVATAR_SRC} alt="avatar" className="w-5 h-5 rounded-full border border-primary-100 shadow" />
                              <span className="truncate max-w-xs group-hover:text-primary-700">{item}</span>
                            </span>
                            <ArrowRight size={16} className="text-neutral-400 group-hover:text-primary-500" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  {isLoading ? (
                    <div className="bg-neutral-50 rounded-lg p-6 border border-neutral-200 h-full flex items-center justify-center">
                      <div className="text-center text-neutral-500">
                        <div className="animate-spin h-10 w-10 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4" />
                        <p className="text-lg font-medium">Analyzing...</p>
                        <p className="mt-1">Please wait while we analyze your meal.</p>
                      </div>
                    </div>
                  ) : error ? (
                    <div className="bg-red-50 rounded-lg p-6 border border-red-200 h-full flex items-center justify-center">
                      <div className="text-center text-red-500">
                        <p className="text-lg font-medium mb-2">Error</p>
                        <p>{error}</p>
                      </div>
                    </div>
                  ) : result ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="bg-neutral-50 rounded-lg p-6 border border-neutral-200 h-full"
                    >
                      <h3 className="text-xl font-semibold text-neutral-800 mb-4">Nutrition Analysis</h3>
                      <div className="mb-4">
                        <p><span className="font-semibold">Calories:</span> {result.calories}</p>
                        <p className="mt-2 font-semibold">Macronutrients:</p>
                        <ul className="ml-4">
                          <li>Carbohydrates: {result.macronutrients.carbohydrates}</li>
                          <li>Protein: {result.macronutrients.protein}</li>
                          <li>Fat: {result.macronutrients.fat}</li>
                        </ul>
                        <p className="mt-2 font-semibold">Micronutrients:</p>
                        <ul className="ml-4">
                          {result.micronutrients.map((m, idx) => (
                            <li key={idx}>{m}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="mb-2">
                        <p className="font-semibold">Analysis:</p>
                        <p>{result.analysis}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Suggestions:</p>
                        <ul className="ml-4 list-disc">
                          {result.suggestions.map((s, idx) => (
                            <li key={idx}>{s}</li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="bg-neutral-50 rounded-lg p-6 border border-neutral-200 h-full flex items-center justify-center">
                      <div className="text-center text-neutral-500">
                        <Search className="h-12 w-12 mx-auto mb-4 text-neutral-300" />
                        <p className="text-lg font-medium">No Analysis Yet</p>
                        <p className="mt-1">Search for a food item or take a photo to analyze</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MealAnalyzerPage;