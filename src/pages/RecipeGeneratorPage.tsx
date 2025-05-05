import { motion } from 'framer-motion';
import { Check, ChefHat, Clock, Plus, Salad, X } from 'lucide-react';
import React, { useState } from 'react';
import { generateRecipesFromIngredients, Recipe } from '../lib/groq-api';

const AVATAR_SRC = 'https://i.postimg.cc/WzfKp2mL/image.png';

const RecipeGeneratorPage: React.FC = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [currentIngredient, setCurrentIngredient] = useState('');
  const [dietaryFilters, setDietaryFilters] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);

  const dietaryOptions = [
    'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 
    'Low-Carb', 'High-Protein', 'Quick (under 30 min)'
  ];

  const addIngredient = () => {
    if (currentIngredient.trim() && !ingredients.includes(currentIngredient.trim())) {
      setIngredients([...ingredients, currentIngredient.trim()]);
      setCurrentIngredient('');
    }
  };

  const removeIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter(i => i !== ingredient));
  };

  const toggleDietaryFilter = (filter: string) => {
    if (dietaryFilters.includes(filter)) {
      setDietaryFilters(dietaryFilters.filter(f => f !== filter));
    } else {
      setDietaryFilters([...dietaryFilters, filter]);
    }
  };

  const handleGenerateRecipes = async () => {
    setError(null);
    if (ingredients.length === 0) return;
    setIsGenerating(true);
    try {
      const result = await generateRecipesFromIngredients(ingredients, {
        dietaryRestrictions: dietaryFilters.length > 0 ? dietaryFilters : undefined,
      });
      setRecipes(result);
    } catch (err: any) {
      setError(err.message || 'Failed to generate recipes.');
      setRecipes([]);
    } finally {
      setIsGenerating(false);
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
                    <h1 className="text-2xl font-semibold tracking-tight">Recipe Generator</h1>
                    <p className="text-primary-100 text-sm">Turn your available ingredients into delicious meals</p>
                  </div>
                </div>
                <ChefHat className="h-10 w-10 text-white opacity-80" />
              </div>
              <div className="absolute right-6 top-6 opacity-10 pointer-events-none select-none">
                
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-lg font-semibold text-neutral-800 mb-4">Enter Your Ingredients</h2>
                  
                  <div className="space-y-4">
                    <div className="flex">
                      <input
                        type="text"
                        value={currentIngredient}
                        onChange={(e) => setCurrentIngredient(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addIngredient()}
                        placeholder="Enter an ingredient..."
                        className="flex-1 border rounded-l-lg border-neutral-300 py-3 px-4 focus:outline-none focus:ring-1 focus:ring-primary-400"
                      />
                      <button
                        onClick={addIngredient}
                        className="bg-primary-500 hover:bg-primary-600 text-white py-3 px-4 rounded-r-lg transition duration-200 disabled:bg-neutral-300"
                        disabled={!currentIngredient.trim()}
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                    
                    {ingredients.length > 0 && (
                      <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                        <h3 className="text-sm font-medium text-neutral-700 mb-2">Your Ingredients:</h3>
                        <div className="flex flex-wrap gap-2">
                          {ingredients.map((ingredient, index) => (
                            <div
                              key={index}
                              className="bg-white px-3 py-1 rounded-full border border-neutral-300 text-sm flex items-center"
                            >
                              {ingredient}
                              <button
                                onClick={() => removeIngredient(ingredient)}
                                className="ml-2 text-neutral-400 hover:text-neutral-700"
                              >
                                <X size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-6">
                    <h3 className="text-sm font-medium text-neutral-700 mb-2">Dietary Preferences & Filters:</h3>
                    <div className="flex flex-wrap gap-2">
                      {dietaryOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => toggleDietaryFilter(option)}
                          className={`px-3 py-1 rounded-full text-sm flex items-center transition-colors ${
                            dietaryFilters.includes(option)
                              ? 'bg-primary-100 text-primary-700 border border-primary-300'
                              : 'bg-neutral-100 text-neutral-700 border border-neutral-200 hover:bg-neutral-200'
                          }`}
                        >
                          {dietaryFilters.includes(option) && (
                            <Check size={14} className="mr-1" />
                          )}
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      onClick={handleGenerateRecipes}
                      disabled={ingredients.length === 0 || isGenerating}
                      className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-md transition duration-200 font-medium flex items-center justify-center disabled:bg-primary-300"
                    >
                      {isGenerating ? (
                        <>
                          <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                          Generating recipes...
                        </>
                      ) : (
                        <>
                          <ChefHat className="h-5 w-5 mr-2" />
                          Generate Recipes
                        </>
                      )}
                    </button>
                  </div>
                </div>
                
                <div>
                  {isGenerating ? (
                    <div className="bg-neutral-50 rounded-lg p-6 border border-neutral-200 h-full flex items-center justify-center">
                      <div className="text-center text-neutral-500">
                        <div className="animate-spin h-10 w-10 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4" />
                        <p className="text-lg font-medium">Generating recipes...</p>
                        <p className="mt-1">Please wait while we create delicious recipes for you.</p>
                      </div>
                    </div>
                  ) : error ? (
                    <div className="bg-red-50 rounded-lg p-6 border border-red-200 h-full flex items-center justify-center">
                      <div className="text-center text-red-500">
                        <p className="text-lg font-medium mb-2">Error</p>
                        <p>{error}</p>
                      </div>
                    </div>
                  ) : recipes.length > 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg font-semibold text-neutral-800">Generated Recipes</h3>
                      {recipes.map((recipe, idx) => (
                        <div
                          key={recipe.name + idx}
                          className="bg-white rounded-lg border border-neutral-200 overflow-hidden hover:shadow-md transition-shadow"
                        >
                          <div className="aspect-video bg-neutral-200 overflow-hidden">
                            {/* Show a fallback if no image is provided */}
                            {recipe.image ? (
                              <img
                                src={recipe.image}
                                alt={recipe.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <Salad className="h-16 w-16 text-neutral-300 mx-auto my-8" />
                            )}
                          </div>
                          <div className="p-4">
                            <h4 className="font-medium text-lg text-neutral-800">{recipe.name}</h4>
                            <div className="flex items-center text-sm text-neutral-500 mt-2 space-x-4">
                              <div className="flex items-center">
                                <Clock size={14} className="mr-1" />
                                {recipe.cookingTime}
                              </div>
                              <div>{recipe.difficulty}</div>
                            </div>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {recipe.tips && recipe.tips.map((tip, tipIdx) => (
                                <span
                                  key={tipIdx}
                                  className="px-2 py-1 rounded-full bg-primary-50 text-primary-600 text-xs"
                                >
                                  {tip}
                                </span>
                              ))}
                            </div>
                            <div className="mt-4">
                              <p className="font-semibold text-neutral-700 mb-1">Ingredients:</p>
                              <ul className="list-disc ml-5 text-sm text-neutral-700">
                                {recipe.ingredients.map((ing, ingIdx) => (
                                  <li key={ingIdx}>{ing}</li>
                                ))}
                              </ul>
                            </div>
                            <div className="mt-4">
                              <p className="font-semibold text-neutral-700 mb-1">Instructions:</p>
                              <ol className="list-decimal ml-5 text-sm text-neutral-700">
                                {recipe.instructions.map((step, stepIdx) => (
                                  <li key={stepIdx}>{step}</li>
                                ))}
                              </ol>
                            </div>
                            {recipe.nutritionInfo && (
                              <div className="mt-4">
                                <p className="font-semibold text-neutral-700 mb-1">Nutrition Info:</p>
                                <ul className="list-disc ml-5 text-sm text-neutral-700">
                                  <li>Calories: {recipe.nutritionInfo.calories}</li>
                                  <li>Protein: {recipe.nutritionInfo.protein}</li>
                                  <li>Carbs: {recipe.nutritionInfo.carbs}</li>
                                  <li>Fats: {recipe.nutritionInfo.fats}</li>
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  ) : (
                    <div className="bg-neutral-50 rounded-lg p-6 border border-neutral-200 h-full flex items-center justify-center">
                      <div className="text-center text-neutral-500">
                        <Salad className="h-12 w-12 mx-auto mb-4 text-neutral-300" />
                        <p className="text-lg font-medium">No Recipes Yet</p>
                        <p className="mt-1">Add ingredients and generate to see recipes</p>
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

export default RecipeGeneratorPage;