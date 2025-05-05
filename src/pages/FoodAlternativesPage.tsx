import { motion } from 'framer-motion';
import { Rabbit, Search, Sparkles } from 'lucide-react';
import React, { useState } from 'react';
import { getHealthyAlternatives, HealthyAlternative } from '../lib/groq-api';

const AVATAR_SRC = 'https://i.postimg.cc/WzfKp2mL/image.png';

const FoodAlternativesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<HealthyAlternative | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      const res = await getHealthyAlternatives(searchQuery.trim());
      setResult(res);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch alternatives.');
    } finally {
      setIsSearching(false);
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
                    <h1 className="text-2xl font-semibold tracking-tight">Food Alternatives</h1>
                    <p className="text-primary-100 text-sm">Find healthier alternatives to your favorite foods</p>
                  </div>
                </div>
                <Rabbit className="h-10 w-10 text-white opacity-80" />
              </div>
              <div className="absolute right-6 top-6 opacity-10 pointer-events-none select-none">
                
              </div>
            </div>
            
            <div className="p-6">
              <div className="max-w-xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-lg font-semibold text-neutral-800 mb-2">
                    Enter a food to find healthier alternatives
                  </h2>
                  <p className="text-neutral-600">
                    Discover nutritious substitutes for foods that better align with your dietary goals
                  </p>
                </div>
                
                <form onSubmit={handleSearch} className="mb-8">
                  <div className="flex">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="E.g., White bread, Ice cream, Potato chips..."
                      className="flex-1 border rounded-l-lg border-neutral-300 py-3 px-4 focus:outline-none focus:ring-1 focus:ring-primary-400"
                    />
                    <button
                      type="submit"
                      className="bg-primary-500 hover:bg-primary-600 text-white py-3 px-6 rounded-r-lg transition duration-200 disabled:bg-neutral-300 flex items-center"
                      disabled={isSearching || !searchQuery.trim()}
                    >
                      {isSearching ? (
                        <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                      ) : (
                        <Search size={20} />
                      )}
                    </button>
                  </div>
                </form>

                {isSearching ? (
                  <div className="bg-neutral-50 p-8 rounded-lg border border-neutral-200 text-center">
                    <div className="animate-spin h-10 w-10 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4" />
                    <h3 className="font-medium text-lg text-neutral-700">Searching...</h3>
                    <p className="text-neutral-600 mt-2">Looking for healthy alternatives...</p>
                  </div>
                ) : error ? (
                  <div className="bg-red-50 p-8 rounded-lg border border-red-200 text-center">
                    <Rabbit className="h-12 w-12 mx-auto mb-4 text-red-300" />
                    <h3 className="font-medium text-lg text-red-700 mb-2">Error</h3>
                    <p className="text-red-600 mt-2">{error}</p>
                  </div>
                ) : result ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200 mb-6 flex gap-4 items-start">
                      <div className="bg-white rounded-lg w-16 h-16 flex items-center justify-center flex-shrink-0 border border-neutral-200">
                        <Sparkles className="text-primary-400 h-8 w-8" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-neutral-800 text-lg mb-1">{result.original}</h3>
                        <p className="text-sm text-neutral-500 mt-1 mb-2">Here are some healthier alternatives you can try:</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {result.alternatives.map((alt, idx) => (
                        <div key={alt.name + idx} className="bg-white rounded-lg border border-neutral-200 p-4 flex gap-4 items-start">
                          <div className="bg-primary-50 rounded-lg w-16 h-16 flex items-center justify-center flex-shrink-0 border border-primary-100">
                            <Sparkles className="text-primary-400 h-8 w-8" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium text-neutral-800 text-base">{alt.name}</h4>
                            </div>
                            <p className="text-sm text-neutral-600 mt-1 mb-2">{alt.nutritionFacts}</p>
                            <ul className="list-disc ml-5 text-xs text-neutral-700 mb-2">
                              {alt.benefits.map((b, bidx) => (
                                <li key={bidx}>{b}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <div className="bg-neutral-50 p-8 rounded-lg border border-neutral-200 text-center">
                    <Rabbit className="h-12 w-12 mx-auto mb-4 text-neutral-300" />
                    <h3 className="font-medium text-lg text-neutral-700">No Alternatives Yet</h3>
                    <p className="text-neutral-600 mt-2">Search for a food item to discover healthier alternatives</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow-md border border-neutral-200">
            <h2 className="text-xl font-semibold text-neutral-800 mb-4">Popular Food Alternatives</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <button className="text-left p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition duration-200">
                Rice → Cauliflower rice
              </button>
              <button className="text-left p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition duration-200">
                Potato chips → Kale chips
              </button>
              <button className="text-left p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition duration-200">
                Sour cream → Greek yogurt
              </button>
              <button className="text-left p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition duration-200">
                Pasta → Zucchini noodles
              </button>
              <button className="text-left p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition duration-200">
                Milk chocolate → Dark chocolate
              </button>
              <button className="text-left p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition duration-200">
                Soda → Sparkling water
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FoodAlternativesPage;