// User related types
export interface User {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  dietaryPreferences: string[];
  allergies: string[];
  healthGoals: string[];
}

// Chat related types
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Meal plan related types
export interface MealPlan {
  id: string;
  userId: string;
  name: string;
  startDate: Date;
  endDate: Date;
  dietary: string[];
  meals: Meal[];
  createdAt: Date;
}

export interface Meal {
  id: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  recipes?: Recipe[];
  image?: string;
}

// Recipe related types
export interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string[];
  preparationTime: number;
  cookingTime: number;
  servings: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  image?: string;
  tags: string[];
}

export interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
}

// Food related types
export interface FoodItem {
  id: string;
  name: string;
  barcode?: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  serving: string;
  image?: string;
}

// BMI Calculator types
export interface BMIData {
  height: number;
  weight: number;
  bmi: number;
  category: string;
  recommendations: string[];
}

// Tracking related types
export interface NutritionLog {
  id: string;
  userId: string;
  date: Date;
  meals: Meal[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  waterIntake: number;
}

// Gamification types
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  criteria: string;
  earnedOn?: Date;
}

export interface Streak {
  currentStreak: number;
  longestStreak: number;
  lastLogDate: Date;
}