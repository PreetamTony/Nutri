import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, Upload, RefreshCw, Check, X, Scan } from 'lucide-react';

const ScanFoodPage: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [ocrResult, setOcrResult] = useState<string | null>(null);
  const [insights, setInsights] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const startScanning = async () => {
    setIsScanning(true);
    setScanComplete(false);
    setError(null);
    setOcrResult(null);

    try {
      if (!uploadedImage) {
        setError('No image selected.');
        setIsScanning(false);
        return;
      }
      const base64Data = uploadedImage.split(',')[1];
      // RapidAPI expects base64 string as 'base64', not 'base64image'
      const encodedParams = new URLSearchParams();
      encodedParams.set('base64', base64Data);
      encodedParams.set('language', 'eng');
      encodedParams.set('detectOrientation', 'true');

      // Use axios for the request
      // Dynamically import axios to avoid breaking builds if not installed
      const axios = (await import('axios')).default;
      const rapidApiKey = import.meta.env.VITE_RAPIDAPI_KEY;
      const rapidApiHost = import.meta.env.VITE_RAPIDAPI_HOST || 'ocr-extract-text.p.rapidapi.com';
      if (!rapidApiKey) {
        setError('RapidAPI key not found. Please set VITE_RAPIDAPI_KEY in your .env file.');
        setIsScanning(false);
        return;
      }

      // Always use the RapidAPI OCR endpoint; do not use VITE_OCR_API_URL
      const ocrResponse = await axios.post(
        'https://ocr-extract-text.p.rapidapi.com/ocr',
        encodedParams,
        {
          headers: {
            'X-RapidAPI-Key': rapidApiKey,
            'X-RapidAPI-Host': rapidApiHost,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );
      const data = ocrResponse.data;
      if (data?.text) {
        const ocrText = data.text.trim() || 'No text found.';
        setOcrResult(ocrText);
        // Step 2: Get LLM insights
        setIsScanning(true); // Keep loading for LLM
        try {
          const llmResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: 'llama3-8b-8192',
              messages: [
                {
                  role: 'system',
                  content: `You are a nutrition and food product expert. Analyze the following OCR result from a food label or package and provide detailed, actionable insights. Respond in clear, readable text. Include:
- Nutrition facts (calories, macros, additives, allergens, etc.)
- Health warnings or dietary cautions
- Ingredient quality (natural/processed, etc.)
- Suggestions for healthier alternatives if relevant
- Any other useful consumer advice.`
                },
                {
                  role: 'user',
                  content: ocrText
                }
              ],
              temperature: 0.6,
              max_tokens: 800,
            }),
          });
          if (!llmResponse.ok) {
            const errorData = await llmResponse.text();
            setError('Failed to get product insights.');
            setScanComplete(true);
            setIsScanning(false);
            return;
          }
          const llmData = await llmResponse.json();
          const llmContent = llmData.choices?.[0]?.message?.content?.trim();
          setInsights(llmContent || 'No insights found.');
        } catch (llmErr) {
          setInsights('Failed to get product insights.');
        }
        setScanComplete(true);
      } else {
        setError(data?.error || 'No text found.');
      }
    } catch (err: any) {
      setError('Failed to scan image. Please try again.');
    } finally {
      setIsScanning(false);
    }
  };


  const resetScan = () => {
    setUploadedImage(null);
    setScanComplete(false);
    setOcrResult(null);
    setInsights(null);
    setError(null);
  };


  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 relative overflow-hidden">
      {/* Decorative animated blob */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[420px] h-[420px] bg-gradient-to-br from-primary-200 via-primary-100 to-white opacity-30 rounded-full blur-3xl -z-10 animate-pulse-slow" />
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex flex-col gap-8">
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-primary-100 glass-card p-8">
                <div className="flex items-center gap-4 mb-6">
                  <span className="inline-flex items-center justify-center bg-white/40 rounded-full p-2 shadow-lg ">
                    <img src="https://i.postimg.cc/WzfKp2mL/image.png" alt="NutriBot Avatar" className="w-14 h-14 rounded-full object-cover border-2 border-primary-200 shadow animate-bounce-slow" />
                  </span>
                  <div>
                    <h2 className="text-2xl font-extrabold drop-shadow tracking-tight text-primary-700">NutriBot Food Scanner</h2>
                    <p className="text-primary-400 text-sm font-medium">Snap or upload a food label for instant nutrition AI insights</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <button
                    onClick={triggerFileInput}
                    className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 py-3 rounded-md transition duration-200 flex items-center justify-center"
                  >
                    <Upload className="h-5 w-5 mr-2" />
                    Upload Food Image
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <button className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-md transition duration-200 flex items-center justify-center">
                    <Camera className="h-5 w-5 mr-2" />
                    Take Photo
                  </button>
                  {uploadedImage && (
                    <div className="mt-4">
                      <div className="relative">
                        <img
                          src={uploadedImage}
                          alt="Uploaded food"
                          className="w-full h-auto rounded-lg border border-neutral-200"
                        />
                        <button
                          onClick={resetScan}
                          className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-neutral-100"
                        >
                          <X size={18} className="text-neutral-600" />
                        </button>
                      </div>
                      <div className="mt-4 flex space-x-3">
                        <button
                          onClick={startScanning}
                          disabled={isScanning}
                          className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-2 rounded-md transition duration-200 flex items-center justify-center disabled:bg-primary-300"
                        >
                          {isScanning ? (
                            <>
                              <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                              Scanning...
                            </>
                          ) : (
                            <>
                              <Scan className="h-4 w-4 mr-2" />
                              Scan Image
                            </>
                          )}
                        </button>
                        <button
                          onClick={resetScan}
                          className="flex-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 py-2 rounded-md transition duration-200 flex items-center justify-center"
                        >
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Reset
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-neutral-800 mb-3">Scan Tips</h3>
                  <ul className="space-y-2 text-neutral-600">
                    <li className="flex items-start">
                      <Check size={18} className="text-primary-500 mr-2 mt-0.5" />
                      Make sure the food label is clearly visible
                    </li>
                    <li className="flex items-start">
                      <Check size={18} className="text-primary-500 mr-2 mt-0.5" />
                      Ensure good lighting for better results
                    </li>
                    <li className="flex items-start">
                      <Check size={18} className="text-primary-500 mr-2 mt-0.5" />
                      Hold the camera steady when capturing
                    </li>
                    <li className="flex items-start">
                      <Check size={18} className="text-primary-500 mr-2 mt-0.5" />
                      For best results, scan barcodes directly
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              {scanComplete ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-neutral-50 rounded-3xl shadow-2xl border border-neutral-200 glass-card p-8 flex flex-col items-center"
                >
                  <span className="inline-flex items-center justify-center bg-white/40 rounded-full p-2 shadow-lg animate-fade-in -mt-20 mb-4">
                    <img src="https://i.postimg.cc/WzfKp2mL/image.png" alt="NutriBot Avatar" className="w-20 h-20 rounded-full object-cover border-2 border-primary-200 shadow " />
                  </span>
                  <h2 className="text-2xl font-extrabold drop-shadow tracking-tight text-primary-700 mb-6">Scan Results</h2>
                  {error ? (
                    <div className="text-red-600 text-center my-8">
                      <p className="font-semibold">{error}</p>
                    </div>
                  ) : (
                    <>
                      <div className="relative flex flex-col items-center gap-3 my-8 w-full">
                        
                        <div className="whitespace-pre-wrap text-neutral-700 bg-neutral-100 rounded-xl p-4 text-center min-h-[80px] border border-primary-50 shadow w-full">
                          <strong className="text-primary-500">Extracted Text</strong>
                          <br />
                          {ocrResult}
                        </div>
                        <p className="mt-1">Upload an image or take a photo to analyze</p>
                      </div>
                      <div className="relative flex flex-col items-center gap-3 my-8 w-full">
                        <span className="inline-block w-12 h-12 rounded-full overflow-hidden shadow border-2 border-blue-200 bg-white absolute -top-12 left-1/2 -translate-x-1/2 animate-fade-in">
                          <img src="https://i.postimg.cc/WzfKp2mL/image.png" alt="NutriBot Avatar" className="w-full h-full object-cover " />
                        </span>
                        <div className="whitespace-pre-wrap text-primary-900 bg-gradient-to-br from-blue-50 via-white to-blue-100 rounded-xl p-4 text-left min-h-[80px] border border-blue-200 shadow w-full">
                          <strong className="text-blue-600">NutriBot Insights</strong>
                          <br />
                          {isScanning && !insights ? (
                            <span className="text-blue-600">Analyzing product details...</span>
                          ) : insights ? insights : <span className="text-neutral-400">No insights available.</span>}
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              ) : (
                <div className="bg-neutral-50 rounded-lg p-6 border border-neutral-200 h-full flex items-center justify-center">
                  <div className="text-center text-neutral-500">
                    <Scan className="h-12 w-12 mx-auto mb-4 text-neutral-300" />
                    <p className="text-lg font-medium">No Scan Results Yet</p>
                    <p className="mt-1">Upload an image or take a photo to analyze</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ScanFoodPage;