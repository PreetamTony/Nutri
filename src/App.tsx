import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatButton from './components/ChatButton';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ChatPage from './pages/ChatPage';
import MealPlannerPage from './pages/MealPlannerPage';
import MealAnalyzerPage from './pages/MealAnalyzerPage';
import ScanFoodPage from './pages/ScanFoodPage';
import RecipeGeneratorPage from './pages/RecipeGeneratorPage';
import BMICalculatorPage from './pages/BMICalculatorPage';
import FoodAlternativesPage from './pages/FoodAlternativesPage';
import SpeechModelPage from './pages/SpeechModelPage';
import DashboardWrapper from './pages/DashboardWrapper';
import AboutPage from './pages/AboutPage';
import PrivacyPage from './pages/PrivacyPage';
import NotFoundPage from './pages/NotFoundPage';
import GamesHomePage from './pages/GamesHomePage';
import FoodPairingChallenge from './pages/FoodPairingChallenge';
import GroceryListChallenge from './pages/GroceryListChallenge';
import CookingShow from './pages/RecipeChallenge';
import QuizShow from './pages/QuizShow';
import SeasonalFoodGame from './pages/SeasonalFoodGame';
import VirtualFoodJourney from './pages/VirtualFoodJourney'; // Will be renamed to FoodJourney
import ResearchPapersPage from './pages/ResearchPapersPage';
import YogaAssistantPage from './pages/YogaAssistantPage';
import CommunityPage from './pages/CommunityPage';
import NutriXTalksPage from './pages/NutriXTalksPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-neutral-50">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/chat" element={
                <PrivateRoute>
                  <ChatPage />
                </PrivateRoute>
              } />
              <Route path="/meal-planner" element={
                <PrivateRoute>
                  <MealPlannerPage />
                </PrivateRoute>
              } />
              <Route path="/meal-analyzer" element={
                <PrivateRoute>
                  <MealAnalyzerPage />
                </PrivateRoute>
              } />
              <Route path="/scan-food" element={
                <PrivateRoute>
                  <ScanFoodPage />
                </PrivateRoute>
              } />
              <Route path="/recipe-generator" element={
                <PrivateRoute>
                  <RecipeGeneratorPage />
                </PrivateRoute>
              } />
              <Route path="/bmi-calculator" element={<BMICalculatorPage />} />
              <Route path="/food-alternatives" element={
                <PrivateRoute>
                  <FoodAlternativesPage />
                </PrivateRoute>
              } />
              <Route path="/speech-model" element={
                <PrivateRoute>
                  <SpeechModelPage />
                </PrivateRoute>
              } />
              <Route path="/dashboard" element={
                <PrivateRoute>
                  <DashboardWrapper />
                </PrivateRoute>
              } />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/games" element={<GamesHomePage />} />
              <Route path="/games/food-pairing" element={<FoodPairingChallenge />} />
              <Route path="/games/grocery-list" element={<GroceryListChallenge />} />
              <Route path="/games/cooking-show" element={<CookingShow />} />
              <Route path="/games/quiz-show" element={<QuizShow />} />
              <Route path="/games/seasonal-food" element={<SeasonalFoodGame />} />
              <Route path="/games/food-journey" element={<VirtualFoodJourney />} />
              <Route path="/research-papers" element={<ResearchPapersPage />} />
              <Route path="/yoga-assistant" element={<YogaAssistantPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/nutrix-talks" element={<NutriXTalksPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
          <ChatButton />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;