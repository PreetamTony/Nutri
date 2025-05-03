import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, AlertCircle, CheckCircle, HelpCircle, Activity, Sparkles } from 'lucide-react';
import { getBMIInsightsAndSuggestions } from '@/lib/bmi-llm';

interface BMIResult {
  bmi: number;
  category: string;
  recommendations: string[];
  categoryColor: string;
  icon: React.ReactNode;
}

const BMICalculatorPage: React.FC = () => {
  const [height, setHeight] = useState<number | ''>('');
  const [weight, setWeight] = useState<number | ''>('');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [result, setResult] = useState<BMIResult | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [llmInsight, setLlmInsight] = useState<string>('');
  const [llmSuggestions, setLlmSuggestions] = useState<string[]>([]);
  const [loadingLlm, setLoadingLlm] = useState(false);
  const [llmError, setLlmError] = useState('');

  const calculateBMI = async () => {
    setLlmInsight('');
    setLlmSuggestions([]);
    setLlmError('');
    if (height === '' || weight === '') return;
    let bmiValue: number;
    if (unit === 'metric') {
      const heightInMeters = Number(height) / 100;
      bmiValue = Number(weight) / (heightInMeters * heightInMeters);
    } else {
      bmiValue = (Number(weight) * 703) / (Number(height) * Number(height));
    }
    bmiValue = parseFloat(bmiValue.toFixed(1));
    let category: string;
    let categoryColor: string;
    let icon: React.ReactNode;
    if (bmiValue < 18.5) {
      category = 'Underweight';
      categoryColor = 'text-blue-500';
      icon = <AlertCircle className="h-6 w-6 text-blue-500" />;
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      category = 'Healthy Weight';
      categoryColor = 'text-green-500';
      icon = <CheckCircle className="h-6 w-6 text-green-500" />;
    } else if (bmiValue >= 25 && bmiValue < 30) {
      category = 'Overweight';
      categoryColor = 'text-yellow-500';
      icon = <AlertCircle className="h-6 w-6 text-yellow-500" />;
    } else {
      category = 'Obesity';
      categoryColor = 'text-red-500';
      icon = <AlertCircle className="h-6 w-6 text-red-500" />;
    }
    setResult({
      bmi: bmiValue,
      category,
      recommendations: [],
      categoryColor,
      icon
    });
    setLoadingLlm(true);
    try {
      const llm = await getBMIInsightsAndSuggestions(bmiValue, category);
      setLlmInsight(llm.insight);
      setLlmSuggestions(llm.suggestions);
    } catch (e: any) {
      setLlmError('Could not get AI-powered insights.');
    }
    setLoadingLlm(false);
  };


  const resetForm = () => {
    setHeight('');
    setWeight('');
    setResult(null);
    setLlmInsight('');
    setLlmSuggestions([]);
    setLlmError('');
  };

  const toggleUnit = () => {
    if (unit === 'metric') {
      setUnit('imperial');
      // Convert values if they exist
      if (height !== '') {
        setHeight(parseFloat((Number(height) * 0.393701).toFixed(1)));
      }
      if (weight !== '') {
        setWeight(parseFloat((Number(weight) * 2.20462).toFixed(1)));
      }
    } else {
      setUnit('imperial');
      // Convert values if they exist
      if (height !== '') {
        setHeight(parseFloat((Number(height) * 2.54).toFixed(1)));
      }
      if (weight !== '') {
        setWeight(parseFloat((Number(weight) * 0.453592).toFixed(1)));
      }
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
            <div className="bg-primary-500 text-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-semibold">BMI Calculator</h1>
                  <p className="text-primary-100">Calculate your Body Mass Index and get personalized recommendations</p>
                </div>
                <Activity className="h-10 w-10 text-white opacity-80" />
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex justify-end mb-4">
                <button
                  onClick={toggleUnit}
                  className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 px-4 py-2 rounded-md transition duration-200 text-sm font-medium flex items-center"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  {unit === 'metric' ? 'Switch to Imperial' : 'Switch to Metric'}
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="height" className="block text-sm font-medium text-neutral-700 mb-1">
                        Height {unit === 'metric' ? '(cm)' : '(inches)'}
                      </label>
                      <input
                        id="height"
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value ? Number(e.target.value) : '')}
                        className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder={unit === 'metric' ? 'e.g., 170' : 'e.g., 67'}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="weight" className="block text-sm font-medium text-neutral-700 mb-1">
                        Weight {unit === 'metric' ? '(kg)' : '(lbs)'}
                      </label>
                      <input
                        id="weight"
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value ? Number(e.target.value) : '')}
                        className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder={unit === 'metric' ? 'e.g., 70' : 'e.g., 154'}
                      />
                    </div>
                   
                    <div className="flex space-x-4 pt-2">
                      <button
                        onClick={calculateBMI}
                        className="flex-1 bg-gradient-to-r from-primary-500 to-primary-400 hover:from-primary-600 hover:to-primary-500 text-white py-2 rounded-xl shadow-lg transition duration-200 font-semibold text-lg tracking-wide"
                        disabled={loadingLlm}
                      >
                        {loadingLlm ? (
                          <span className="flex items-center justify-center animate-pulse"><RefreshCw className="h-5 w-5 mr-2 animate-spin" /> Calculating...</span>
                        ) : (
                          'Calculate BMI'
                        )}
                      </button>
                      <button
                        onClick={resetForm}
                        className="flex-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 py-2 rounded-xl shadow transition duration-200 font-medium"
                        disabled={loadingLlm}
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <button
                      onClick={() => setShowInfo(!showInfo)}
                      className="text-primary-500 text-sm flex items-center"
                    >
                      <HelpCircle className="h-4 w-4 mr-1" />
                      {showInfo ? 'Hide BMI Information' : 'What is BMI?'}
                    </button>
                    
                    {showInfo && (
                      <div className="mt-3 p-4 bg-neutral-50 rounded-md text-sm text-neutral-700">
                        <p className="mb-2">
                          <strong>Body Mass Index (BMI)</strong> is a measure that uses your height and weight to work out if your weight is healthy.
                        </p>
                        <p className="mb-2">
                          BMI ranges are:
                        </p>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                          <li className="text-blue-500">Underweight = less than 18.5</li>
                          <li className="text-green-500">Normal weight = 18.5–24.9</li>
                          <li className="text-yellow-500">Overweight = 25–29.9</li>
                          <li className="text-red-500">Obesity = 30 or greater</li>
                        </ul>
                        <p className="mt-2 text-neutral-500 italic">
                          Note: BMI is a useful measurement for most people, but it does have limitations and may not be accurate for athletes, pregnant women, or the elderly.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                   {result ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="bg-gradient-to-br from-white via-primary-50 to-primary-100 rounded-3xl p-8 border border-primary-100 shadow-2xl backdrop-blur-xl"
                    >
                      <div className="text-center mb-6">
                        <h3 className="text-3xl font-extrabold text-neutral-900 tracking-tight">Your BMI Result</h3>
                        <div className="flex items-center justify-center mt-4">
                          <div className="w-36 h-36 rounded-full bg-gradient-to-br from-primary-100 to-primary-300 border-4 border-primary-400 flex items-center justify-center shadow-xl">
                            <div className="text-center">
                              <div className="text-4xl font-black text-primary-500 drop-shadow-lg">{result.bmi}</div>
                              <div className={`text-lg font-semibold ${result.categoryColor}`}>{result.category}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div className="flex items-start justify-center gap-3">
                          {result.icon}
                          <div>
                            <h4 className={`font-bold text-lg ${result.categoryColor}`}>You are in the {result.category} category</h4>
                            <p className="text-base text-neutral-600">
                              {result.category === 'Healthy Weight'
                                ? 'Great job maintaining a healthy weight!'
                                : 'This is based on your BMI calculation. Individual factors may vary.'}
                            </p>
                          </div>
                        </div>
                        <div className="mt-6">
                          {loadingLlm ? (
                            <div className="flex flex-col items-center gap-2 animate-pulse">
                              <Sparkles className="h-7 w-7 text-primary-400 animate-spin" />
                              <span className="text-primary-500 font-semibold">Getting personalized insights...</span>
                            </div>
                          ) : llmError ? (
                            <div className="bg-red-50 text-red-600 rounded-lg p-4 text-center font-medium border border-red-200">{llmError}</div>
                          ) : llmInsight ? (
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.6 }}
                              className="bg-white/90 rounded-xl shadow-lg border border-primary-100 p-6 mt-2"
                            >
                              <div className="flex items-center gap-2 mb-2">
                                <Sparkles className="h-5 w-5 text-primary-400" />
                                <span className="font-semibold text-primary-700">AI Insight</span>
                              </div>
                              <p className="text-neutral-800 text-base mb-2">{llmInsight}</p>
                              {llmSuggestions.length > 0 && (
                                <div className="mt-4">
                                  <h5 className="font-semibold text-neutral-800 mb-2">What can you do?</h5>
                                  <ul className="space-y-2">
                                    {llmSuggestions.map((s, i) => (
                                      <li key={i} className="flex items-start">
                                        <span className="text-primary-500 mr-2 mt-1">•</span>
                                        <span className="text-neutral-700">{s}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </motion.div>
                          ) : null}
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="h-full flex items-center justify-center bg-neutral-50 rounded-lg p-6 border border-neutral-200">
                      <div className="text-center text-neutral-500">
                        <Activity className="h-12 w-12 mx-auto mb-4 text-neutral-300" />
                        <p className="text-lg font-medium">Enter your height and weight</p>
                        <p className="mt-1">Your BMI results will appear here</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md border border-neutral-200">
            <h2 className="text-xl font-semibold text-neutral-800 mb-4">Healthy Weight Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-neutral-50 p-4 rounded-md">
                <h3 className="font-medium text-lg text-neutral-800 mb-2">Maintaining a Healthy Weight</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="text-primary-500 mt-1 mr-2">•</div>
                    <p className="text-neutral-700">Balance calories consumed with calories expended</p>
                  </li>
                  <li className="flex items-start">
                    <div className="text-primary-500 mt-1 mr-2">•</div>
                    <p className="text-neutral-700">Aim for at least 150 minutes of moderate exercise weekly</p>
                  </li>
                  <li className="flex items-start">
                    <div className="text-primary-500 mt-1 mr-2">•</div>
                    <p className="text-neutral-700">Choose nutrient-dense foods over empty calories</p>
                  </li>
                </ul>
              </div>
              
              <div className="bg-neutral-50 p-4 rounded-md">
                <h3 className="font-medium text-lg text-neutral-800 mb-2">Remember</h3>
                <p className="text-neutral-700">
                  BMI is just one measure of health. It's also important to consider factors like your muscle mass, distribution of fat, age, and activity level. For personalized advice, consult with a healthcare professional.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BMICalculatorPage;