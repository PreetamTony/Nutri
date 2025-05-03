import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Meal {
  id: string;
  name: string;
  time: string;
  calories: number;
  nutrients: {
    protein: number;
    carbs: number;
    fat: number;
  };
  createdAt: Date;
}

interface WaterIntake {
  id: string;
  amount: number;
  time: string;
  createdAt: Date;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  createdAt: Date;
  completed: boolean;
}

interface DashboardContextType {
  meals: Meal[];
  addMeal: (meal: Omit<Meal, 'id' | 'createdAt'>) => void;
  waterIntake: WaterIntake[];
  addWaterIntake: (amount: number, time: string) => void;
  achievements: Achievement[];
  dailyGoal: {
    calories: number;
    water: number;
  };
  streak: number;
  setStreak: (streak: number) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [waterIntake, setWaterIntake] = useState<WaterIntake[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [streak, setStreak] = useState<number>(4);

  const dailyGoal = {
    calories: 2000,
    water: 2000, // in milliliters
  };

  const addMeal = (meal: Omit<Meal, 'id' | 'createdAt'>) => {
    const newMeal = {
      ...meal,
      id: uuidv4(),
      createdAt: new Date(),
    };
    setMeals(prev => [newMeal, ...prev]);
    
    // Check for achievements
    checkMealAchievements(newMeal);
  };

  const addWaterIntake = (amount: number, time: string) => {
    const newIntake = {
      id: uuidv4(),
      amount,
      time,
      createdAt: new Date(),
    };
    setWaterIntake(prev => [newIntake, ...prev]);
    
    // Check for achievements
    checkWaterAchievements(amount);
  };

  const checkMealAchievements = (meal: Meal) => {
    const newAchievements: Achievement[] = [];
    
    // Check for high protein meal
    if (meal.nutrients.protein > 30) {
      newAchievements.push({
        id: uuidv4(),
        name: 'Protein Powerhouse',
        description: 'Logged a meal with over 30g of protein',
        icon: 'protein',
        createdAt: new Date(),
        completed: true,
      });
    }

    // Add more achievement checks as needed
    if (newAchievements.length > 0) {
      setAchievements(prev => [...prev, ...newAchievements]);
    }
  };

  const checkWaterAchievements = (amount: number) => {
    const newAchievements: Achievement[] = [];
    
    // Check for 1L water intake
    if (amount >= 1000) {
      newAchievements.push({
        id: uuidv4(),
        name: 'Hydration Hero',
        description: 'Drank 1L of water in a single session',
        icon: 'water',
        createdAt: new Date(),
        completed: true,
      });
    }

    if (newAchievements.length > 0) {
      setAchievements(prev => [...prev, ...newAchievements]);
    }
  };

  useEffect(() => {
    // Load data from localStorage
    const savedMeals = localStorage.getItem('nutriBotMeals');
    const savedWater = localStorage.getItem('nutriBotWater');
    const savedAchievements = localStorage.getItem('nutriBotAchievements');
    const savedStreak = localStorage.getItem('nutriBotStreak');

    if (savedMeals) setMeals(JSON.parse(savedMeals));
    if (savedWater) setWaterIntake(JSON.parse(savedWater));
    if (savedAchievements) setAchievements(JSON.parse(savedAchievements));
    if (savedStreak) setStreak(Number(savedStreak));
  }, []);

  useEffect(() => {
    // Save data to localStorage
    localStorage.setItem('nutriBotMeals', JSON.stringify(meals));
    localStorage.setItem('nutriBotWater', JSON.stringify(waterIntake));
    localStorage.setItem('nutriBotAchievements', JSON.stringify(achievements));
    localStorage.setItem('nutriBotStreak', JSON.stringify(streak));
  }, [meals, waterIntake, achievements, streak]);

  return (
    <DashboardContext.Provider
      value={{
        meals,
        addMeal,
        waterIntake,
        addWaterIntake,
        achievements,
        dailyGoal,
        streak,
        setStreak,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
