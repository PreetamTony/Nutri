import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { generateMealPlan, type MealPlan } from "@/lib/groq-api";
import { Loader2, Utensils } from "lucide-react";

export default function MealPlannerPage() {
  const dietTypes = [
    { value: "balanced", label: "Balanced" },
    { value: "vegetarian", label: "Vegetarian" },
    { value: "vegan", label: "Vegan" },
    { value: "paleo", label: "Paleo" },
    { value: "keto", label: "Keto" },
    { value: "mediterranean", label: "Mediterranean" },
  ];

  const dietaryRestrictions = [
    { id: "gluten-free", label: "Gluten-Free" },
    { id: "dairy-free", label: "Dairy-Free" },
    { id: "nut-free", label: "Nut-Free" },
    { id: "soy-free", label: "Soy-Free" },
    { id: "egg-free", label: "Egg-Free" },
  ];

  const goals = [
    { value: "weight-loss", label: "Weight Loss" },
    { value: "muscle-gain", label: "Muscle Gain" },
    { value: "maintenance", label: "Maintenance" },
    { value: "energy-boost", label: "Energy Boost" },
    { value: "heart-health", label: "Heart Health" },
  ];

  const [preferences, setPreferences] = useState({
    days: 7,
    dietaryRestrictions: [] as string[],
    calorieGoal: "2000",
    cuisine: "",
    mealTypes: [] as string[],
    dietaryFocus: "balanced",
    goal: "maintenance",
  });
  const [loading, setLoading] = useState(false);
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [apiMessage, setApiMessage] = useState<string | null>(null);

  const handleGenerateMealPlan = async () => {
    setLoading(true);
    setError(null);
    setApiMessage(null);
    if (Number(preferences.calorieGoal) < 1200) {
      setError("Calorie goal must be at least 1200 for safety.");
      setLoading(false);
      return;
    }
    try {
      // Prepare options matching the generateMealPlan API
      const plan = await generateMealPlan({
        days: preferences.days,
        dietaryRestrictions: preferences.dietaryRestrictions,
        calorieGoal: preferences.calorieGoal,
        cuisine: preferences.cuisine,
        mealTypes: preferences.mealTypes,
        dietaryFocus: preferences.dietaryFocus,
      });
      setMealPlan(plan);
    } catch (err: any) {
      // If the backend returns a specific message, show it to the user
      if (err.message) {
        setApiMessage(err.message);
      } else {
        setError("Failed to generate meal plan. Please try again.");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-neutral-200 mb-8">
            <div className="bg-primary-500 text-white p-6 relative">
              <div className="flex items-center gap-4">
                <img src="https://i.postimg.cc/WzfKp2mL/image.png" alt="Zestly" className="w-16 h-16 rounded-full border-4 border-primary-400 shadow-xl bg-white object-cover mr-2 ring-4 ring-primary-200 animate-pulse-slow" />
                <div>
                  <h1 className="text-2xl font-semibold tracking-tight">Meal Planner</h1>
                  <p className="text-primary-100 text-sm">Create your personalized meal plan based on your preferences and goals.</p>
                </div>
              </div>
              <div className="absolute right-6 top-6 opacity-10 pointer-events-none select-none">
                
              </div>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="shadow-xl border-primary-100 bg-white/80 backdrop-blur-xl">
              <CardHeader>
                <CardTitle>Your Preferences</CardTitle>
                <CardDescription>
                  Configure your meal plan preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Diet Type</Label>
                    <select
                      value={preferences.dietaryFocus}
                      onChange={e => setPreferences({ ...preferences, dietaryFocus: e.target.value })}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:outline-none"
                    >
                      {dietTypes.map((diet: { value: string; label: string }) => (
                        <option key={diet.value} value={diet.value}>
                          {diet.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label>Daily Calories Target</Label>
                    <Input
                      type="number"
                      value={preferences.calorieGoal}
                      onChange={(e) => setPreferences({ ...preferences, calorieGoal: e.target.value })}
                      min={1200}
                      max={10000}
                    />
                    {Number(preferences.calorieGoal) < 1200 && (
                      <div className="text-red-500 text-xs mt-1">
                        Calorie goal must be at least 1200 for safety.
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Dietary Restrictions</Label>
                    <div className="grid gap-2">
                      {dietaryRestrictions.map((restriction: { id: string; label: string }) => (
                        <div key={restriction.id} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={restriction.id}
                            checked={preferences.dietaryRestrictions.includes(restriction.id)}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              setPreferences((prev) => {
                                const dietaryRestrictions = checked
                                  ? [...prev.dietaryRestrictions, restriction.id]
                                  : prev.dietaryRestrictions.filter((id) => id !== restriction.id);
                                return { ...prev, dietaryRestrictions };
                              });
                            }}
                          />
                          <Label htmlFor={restriction.id}>{restriction.label}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Goal</Label>
                    <select
                      value={preferences.goal}
                      onChange={e => setPreferences({ ...preferences, goal: e.target.value })}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:outline-none"
                    >
                      {goals.map((goal: { value: string; label: string }) => (
                        <option key={goal.value} value={goal.value}>
                          {goal.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Button
                    onClick={handleGenerateMealPlan}
                    disabled={loading}
                    className="w-full"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating Plan...
                      </>
                    ) : (
                      <>
                        <Utensils className="mr-2 h-4 w-4" />
                        Generate Meal Plan
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-xl border-primary-100 bg-white/80 backdrop-blur-xl">
              <CardHeader>
                <CardTitle>Your Meal Plan</CardTitle>
                <CardDescription>
                  Weekly meal plan based on your preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] pr-4">
                  {apiMessage && !mealPlan && (
                    <div className="mb-4 border-yellow-400 bg-yellow-50 text-yellow-800 rounded-md">
                      <Alert variant="warning">
                        <AlertDescription>{apiMessage}</AlertDescription>
                      </Alert>
                    </div>
                  )}
                  {mealPlan ? (
                    <div className="space-y-6">
                      <div className="rounded-lg border bg-card p-4">
                        <h3 className="font-semibold">Dietary Focus</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {mealPlan.dietaryFocus}
                        </p>
                      </div>
                      {mealPlan.dailyPlans.map((day: import("@/lib/groq-api").DailyPlan, index: number) => (
                        <div key={index} className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold">{day.day}</h3>
                            <Badge variant="secondary">
                              {day.totalCalories} calories
                            </Badge>
                          </div>
                          <div className="space-y-3">
                            {day.meals.map((meal: import("@/lib/groq-api").Meal, mealIndex: number) => (
                              <div
                                key={mealIndex}
                                className="rounded-lg border bg-card p-4 space-y-2"
                              >
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium">{meal.type}</h4>
                                  <span className="text-sm text-muted-foreground">
                                    {meal.calories}
                                  </span>
                                </div>
                                <p className="text-sm">{meal.name}</p>
                                <div className="flex gap-2 text-xs">
                                  <Badge variant="outline">
                                    Protein: {meal.macros.protein}
                                  </Badge>
                                  <Badge variant="outline">
                                    Carbs: {meal.macros.carbs}
                                  </Badge>
                                  <Badge variant="outline">
                                    Fats: {meal.macros.fats}
                                  </Badge>
                                </div>
                                {meal.recipe && (
                                  <p className="text-xs text-muted-foreground mt-2">
                                    {meal.recipe}
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                      <div className="space-y-2">
                        <h3 className="font-semibold">Weekly Notes</h3>
                        <ul className="list-disc pl-4 space-y-1">
                          {mealPlan.weeklyNotes.map((note: string, index: number) => (
                            <li key={index} className="text-sm text-muted-foreground">
                              {note}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    (!apiMessage || apiMessage.length === 0) ? (
                      <div className="flex flex-col items-center justify-center h-[500px] text-center">
                        <Utensils className="h-12 w-12 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">
                          Configure your preferences and generate a meal plan to see your personalized recommendations.
                        </p>
                      </div>
                    ) : null
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}