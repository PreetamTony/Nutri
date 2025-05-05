import axios from 'axios';

// Groq API service for AI chat functionality
export const groqService = {
  getChatCompletion: async (messages: any[], userQuery: string) => {
    try {
      const response = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          model: 'llama3-8b-8192',
          messages: [
            { 
              role: 'system', 
              content: 'You are Zestly, an AI nutrition assistant. Provide helpful, accurate nutrition advice. Focus on being supportive, educational, and motivational. Keep responses concise and relevant to nutrition, diet, and healthy eating habits. Always suggest evidence-based information.'
            },
            ...messages,
            { role: 'user', content: userQuery }
          ],
          temperature: 0.7,
          max_tokens: 1024
        },
        {
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Error calling Groq API:', error);
      throw new Error('Failed to get AI response');
    }
  }
};

// Nutritionix API service for food information
export const nutritionService = {
  getFoodInfo: async (query: string) => {
    try {
      const response = await axios.post(
        'https://trackapi.nutritionix.com/v2/natural/nutrients',
        {
          query
        },
        {
          headers: {
            'x-app-id': '123456', // Replace with actual app id in production
            'x-app-key': '789abcdef', // Replace with actual app key in production
            'Content-Type': 'application/json'
          }
        }
      );
      
      return response.data;
    } catch (error) {
      console.error('Error fetching nutrition info:', error);
      throw new Error('Failed to get food information');
    }
  },
  
  searchFood: async (query: string) => {
    try {
      const response = await axios.get(
        `https://api.nutritionix.com/v1_1/search/${query}`,
        {
          params: {
            appId: '123456', // Replace with actual app id in production
            appKey: '789abcdef', // Replace with actual app key in production
            results: '0:10',
            fields: 'item_name,brand_name,nf_calories,nf_total_fat,nf_protein,nf_total_carbohydrate,nf_serving_size_qty,nf_serving_size_unit'
          }
        }
      );
      
      return response.data;
    } catch (error) {
      console.error('Error searching food:', error);
      throw new Error('Failed to search for food');
    }
  }
};

// RapidAPI service for food barcode scanning
export const barcodeService = {
  getProductByBarcode: async (barcode: string) => {
    try {
      const response = await axios.get(
        `https://barcodes-lookup.p.rapidapi.com/v3/barcode/product?barcode=${barcode}`,
        {
          headers: {
            'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
            'X-RapidAPI-Host': 'barcodes-lookup.p.rapidapi.com'
          }
        }
      );
      
      return response.data;
    } catch (error) {
      console.error('Error fetching barcode info:', error);
      throw new Error('Failed to get product information');
    }
  }
};

// Recipe service for generating recipes
export const recipeService = {
  getRecipesByIngredients: async (ingredients: string[], diet?: string, intolerance?: string) => {
    try {
      // This would ideally be a call to a real recipe API
      // For demo purposes, we'll just return mock data
      return mockRecipeData;
    } catch (error) {
      console.error('Error generating recipes:', error);
      throw new Error('Failed to generate recipes');
    }
  }
};

// Mock recipe data
const mockRecipeData = [
  {
    id: '1',
    name: 'Vegetable Stir Fry',
    description: 'A quick and healthy vegetable stir fry with a savory sauce.',
    ingredients: [
      { id: '1', name: 'Bell pepper', quantity: 1, unit: 'medium' },
      { id: '2', name: 'Broccoli', quantity: 1, unit: 'cup' },
      { id: '3', name: 'Carrots', quantity: 2, unit: 'medium' },
      { id: '4', name: 'Soy sauce', quantity: 2, unit: 'tbsp' },
      { id: '5', name: 'Garlic', quantity: 2, unit: 'cloves' }
    ],
    instructions: [
      'Chop all vegetables into bite-sized pieces.',
      'Heat oil in a wok or large pan over medium-high heat.',
      'Add garlic and stir for 30 seconds.',
      'Add vegetables and stir fry for 5-7 minutes until tender-crisp.',
      'Add soy sauce and stir to combine.',
      'Serve hot over rice or noodles.'
    ],
    preparationTime: 10,
    cookingTime: 10,
    servings: 2,
    calories: 120,
    protein: 5,
    carbs: 15,
    fat: 5,
    image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tags: ['vegetarian', 'quick', 'healthy', 'low-calorie']
  },
  {
    id: '2',
    name: 'Quinoa Salad',
    description: 'A nutritious quinoa salad with fresh vegetables and herbs.',
    ingredients: [
      { id: '1', name: 'Quinoa', quantity: 1, unit: 'cup' },
      { id: '2', name: 'Cucumber', quantity: 1, unit: 'medium' },
      { id: '3', name: 'Cherry tomatoes', quantity: 1, unit: 'cup' },
      { id: '4', name: 'Red onion', quantity: 0.5, unit: 'medium' },
      { id: '5', name: 'Lemon juice', quantity: 2, unit: 'tbsp' },
      { id: '6', name: 'Olive oil', quantity: 1, unit: 'tbsp' }
    ],
    instructions: [
      'Cook quinoa according to package instructions and let cool.',
      'Dice cucumber, halve tomatoes, and finely chop red onion.',
      'Combine quinoa and vegetables in a large bowl.',
      'Whisk together lemon juice, olive oil, salt, and pepper.',
      'Pour dressing over salad and toss to combine.',
      'Chill for 30 minutes before serving.'
    ],
    preparationTime: 15,
    cookingTime: 20,
    servings: 4,
    calories: 220,
    protein: 6,
    carbs: 35,
    fat: 6,
    image: 'https://images.pexels.com/photos/1213710/pexels-photo-1213710.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tags: ['vegetarian', 'gluten-free', 'meal-prep', 'high-fiber']
  }
];