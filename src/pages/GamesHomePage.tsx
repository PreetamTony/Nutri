import React from 'react';
import { Map, Award, ShoppingCart, ChefHat, HelpCircle, Globe } from 'lucide-react';
import GamesHeader from '@/components/GamesHeader';
import GameCard from '@/components/GameCard';

const games = [
  {
    key: 'food-pairing',
    name: 'Food Pairing Challenge',
    icon: <Award className="h-8 w-8 text-primary-500" />,
    description: `Pair Indian foods for better nutrient absorption! For example, pair palak (spinach) with amla (Indian gooseberry) or lemon to boost iron absorption. Powered by NutriBot's LLM, get instant feedback and learn the science behind traditional Indian food pairings.`,
    path: '/games/food-pairing',
    llm: true,
  },
  {
    key: 'grocery-list',
    name: `NutriBot's Grocery List Challenge`,
    icon: <ShoppingCart className="h-8 w-8 text-primary-500" />,
    description: `Plan a healthy Indian grocery list within your budget! Choose from dal, vegetables, millets, and more. NutriBot guides you, explaining why certain items are better for your health and wallet. LLM-powered tips for Indian diets and regional preferences.`,
    path: '/games/grocery-list',
    llm: true,
  },
  {
    key: 'cooking-show',
    name: `NutriBot Cooking Show (Recipe Challenges)`,
    icon: <ChefHat className="h-8 w-8 text-primary-500" />,
    description: `Take on recipe challenges like "Protein-packed Indian breakfast" (think moong dal chilla, paneer bhurji, etc). Select ingredients, get NutriBot's LLM-powered feedback, and see your recipe ranked for health and creativity. Compete on the leaderboard!`,
    path: '/games/cooking-show',
    llm: true,
  },
  {
    key: 'quiz-show',
    name: 'Healthy Eating Habits Quiz Show',
    icon: <HelpCircle className="h-8 w-8 text-primary-500" />,
    description: `Answer fun, LLM-generated quizzes about Indian nutrition: sources of vitamin B12 for vegetarians, best foods for summer, and more. Progress through levels and reinforce your nutrition knowledge!`,
    path: '/games/quiz-show',
    llm: true,
  },
  {
    key: 'seasonal-food',
    name: 'Seasonal Food Awareness Game',
    icon: <Map className="h-8 w-8 text-primary-500" />,
    description: `Guess which fruits and vegetables are in season across Indian states. Earn points and learn about the nutritional benefits of local, seasonal produce. Interactive map and LLM-powered facts included!`,
    path: '/games/seasonal-food',
    llm: true,
  },
  {
    key: 'food-journey',
    name: 'Virtual Food Journey Around India & World',
    icon: <Globe className="h-8 w-8 text-primary-500" />,
    description: `Travel with NutriBot to Indian regions (Punjab, Kerala, Bengal, etc.) and global cuisines. Learn about traditional diets, their health benefits, and try healthy versions of classic dishes. Interactive map and LLM explanations for each cuisine!`,
    path: '/games/food-journey',
    llm: true,
  },
];

const GamesHomePage: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen bg-gradient-to-br from-white via-primary-50 to-primary-100">
      <div className="container mx-auto px-4 py-12 relative">
        <GamesHeader />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {games.map((game) => (
            <GameCard
              key={game.key}
              icon={game.icon}
              name={game.name}
              description={game.description}
              path={game.path}
              llm={game.llm}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamesHomePage;
