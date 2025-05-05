import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, VolumeX, Volume2, MessageCircle, ClipboardCheck } from 'lucide-react';
import { transcribeAudio, generateResponse } from '../services/speechService';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'ta', label: 'Tamil' },
  { code: 'hi', label: 'Hindi' },
  { code: 'ml', label: 'Malayalam' },
];

const SpeechModelPage: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audioSupported, setAudioSupported] = useState(true);
  const [loadingTranscription, setLoadingTranscription] = useState(false);
  const [loadingResponse, setLoadingResponse] = useState(false);
  const [language, setLanguage] = useState('en');
  const [error, setError] = useState('');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Start/stop recording and handle audio
  const toggleListening = async () => {
    if (!isListening) {
      setTranscript('');
      setResponse('');
      setError('');
      setIsListening(true);
      audioChunksRef.current = [];
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          const mediaRecorder = new MediaRecorder(stream);
          mediaRecorderRef.current = mediaRecorder;
          mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) audioChunksRef.current.push(e.data);
          };
          mediaRecorder.onstop = async () => {
            setLoadingTranscription(true);
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
            try {
              const text = await transcribeAudio(audioBlob, language);
              setTranscript(text);
              setLoadingTranscription(false);
              setLoadingResponse(true);
              const resp = await generateResponse(text, language);
              setResponse(resp);
            } catch (err: any) {
              setError(err.message || 'Speech recognition failed');
              setTranscript('');
              setResponse('');
              setLoadingTranscription(false);
              setLoadingResponse(false);
            }
            setLoadingResponse(false);
          };
          mediaRecorder.start();
          setTimeout(() => {
            if (mediaRecorder.state !== 'inactive') {
              mediaRecorder.stop();
              setIsListening(false);
            }
          }, 4000); // 4 seconds max
        } catch (err) {
          setError('Microphone access denied or not supported.');
          setIsListening(false);
        }
      } else {
        setError('Audio recording not supported in this browser.');
        setIsListening(false);
      }
    } else {
      setIsListening(false);
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
    }
  };

  // Speak the response aloud using the Web Speech API
  const speakResponse = () => {
    if (!response) return;
    const synth = window.speechSynthesis;
    if (synth.speaking) {
      synth.cancel();
    }
    const utter = new window.SpeechSynthesisUtterance(response);
    // Try to select a voice matching the language
    const voices = synth.getVoices();
    let langCode = language;
    if (langCode === 'ta') langCode = 'ta-IN';
    if (langCode === 'hi') langCode = 'hi-IN';
    if (langCode === 'ml') langCode = 'ml-IN';
    if (langCode === 'en') langCode = 'en-US';
    const match = voices.find(v => v.lang === langCode || v.lang.startsWith(langCode.split('-')[0]));
    if (match) utter.voice = match;
    utter.lang = langCode;
    utter.onstart = () => setIsSpeaking(true);
    utter.onend = () => setIsSpeaking(false);
    synth.speak(utter);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const toggleSpeaking = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speakResponse();
    }
  };


  const copyToClipboard = () => {
    navigator.clipboard.writeText(response);
    // Would add a toast notification here in a real implementation
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 relative overflow-hidden">
      {/* Decorative animated blob */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[480px] h-[480px] bg-gradient-to-br from-primary-200 via-primary-100 to-white opacity-30 rounded-full blur-3xl -z-10 animate-pulse-slow" />
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-primary-100 glass-card">
            <div className="bg-gradient-to-r from-primary-500 to-primary-400 text-white px-6 py-5 flex items-center gap-4 shadow-md">
              <span className="inline-flex items-center justify-center bg-white/20 rounded-full p-2 mr-2 shadow-lg">
                <img src="https://i.postimg.cc/WzfKp2mL/image.png" alt="Zestly Avatar" className="w-10 h-10 rounded-full object-cover border-2 border-primary-200 shadow" />
              </span>
              <div>
                <h1 className="text-2xl font-extrabold drop-shadow tracking-tight">Zestly Speech Model</h1>
                <p className="text-primary-100 font-medium">Interact with Zestly using your voice</p>
              </div>
              <div className="ml-auto">
                <select
                  className="rounded-lg px-3 py-1 bg-white/80 text-primary-700 font-semibold border border-primary-200 focus:ring-2 focus:ring-primary-400 outline-none shadow"
                  value={language}
                  onChange={e => setLanguage(e.target.value)}
                  disabled={isListening || loadingTranscription || loadingResponse}
                  aria-label="Select language"
                >
                  {LANGUAGES.map(l => (
                    <option key={l.code} value={l.code}>{l.label}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="p-6">
              <div className="text-center mb-8">
                <h2 className="text-lg font-semibold text-neutral-800 mb-2">
                  Ask Zestly about nutrition using your voice
                </h2>
                <p className="text-neutral-600">
                  Press the microphone button and speak your nutrition questions clearly
                </p>
              </div>
              
              <div className="bg-white/70 backdrop-blur-md p-8 rounded-2xl border border-primary-100 mb-8 shadow-xl glass-card">
                <div className="flex justify-center mb-8">
                  <motion.button
                    onClick={toggleListening}
                    whileTap={{ scale: 0.95 }}
                    className={`w-28 h-28 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 border-4 border-white focus:ring-4 focus:ring-primary-300 ${
                      isListening || loadingTranscription || loadingResponse
                        ? 'bg-error-400 text-white animate-glow-mic cursor-not-allowed'
                        : 'bg-gradient-to-br from-primary-400 to-primary-500 text-white hover:from-primary-500 hover:to-primary-600'
                    }`}
                    style={{ boxShadow: isListening ? '0 0 40px 10px #f87171, 0 0 0 8px #fff' : undefined }}
                    disabled={loadingTranscription || loadingResponse}
                  >
                    {isListening ? (
                      <div className="relative">
                        <MicOff size={40} />
                        <div className="absolute inset-0 animate-ping rounded-full bg-error-300 opacity-60"></div>
                      </div>
                    ) : (
                      <Mic size={40} />
                    )}
                  </motion.button>
                </div>
                {error && (
                  <div className="mb-4 text-error-600 bg-error-50 border border-error-200 px-4 py-2 rounded-lg text-center animate-fade-in">
                    {error}
                  </div>
                )}
                {loadingTranscription && (
                  <div className="mb-4 text-primary-600 bg-primary-50 border border-primary-200 px-4 py-2 rounded-lg text-center animate-pulse">
                    Transcribing audio...
                  </div>
                )}
                {loadingResponse && (
                  <div className="mb-4 text-primary-600 bg-primary-50 border border-primary-200 px-4 py-2 rounded-lg text-center animate-pulse">
                    Generating response...
                  </div>
                )}
                
                <div className="text-center">
                  {isListening ? (
                    <div className="text-neutral-800 font-medium">
                      <div className="mb-2">Listening...</div>
                      <div className="flex justify-center gap-2 mt-2">
                        <div className="w-2 h-2 rounded-full bg-primary-400 animate-bounce"></div>
                        <div className="w-2 h-2 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-neutral-600">
                      {transcript ? 'Transcript:' : 'Tap the microphone to start speaking'}
                    </div>
                  )}
                </div>
                
                {transcript && (
                  <div className="mt-4 p-4 bg-white rounded-lg border border-neutral-200">
                    <p className="text-neutral-800">{transcript}</p>
                  </div>
                )}
              </div>
              
              {response && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-primary-50 p-6 rounded-lg border border-primary-200"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-medium text-neutral-800">Zestly's Response:</h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={toggleSpeaking}
                        className={`p-2 rounded-full ${
                          isSpeaking
                            ? 'bg-primary-100 text-primary-600'
                            : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                        }`}
                      >
                        {isSpeaking ? <Volume2 size={18} /> : <VolumeX size={18} />}
                      </button>
                      <button
                        onClick={copyToClipboard}
                        className="p-2 rounded-full bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                      >
                        <ClipboardCheck size={18} />
                      </button>
                    </div>
                  </div>
                  <p className="text-neutral-800">{response}</p>
                  {isSpeaking && (
                    <div className="mt-4 flex items-center text-primary-600 text-sm">
                      <Volume2 size={16} className="mr-2" />
                      Speaking response...
                    </div>
                  )}
                </motion.div>
              )}
              
              {!audioSupported && (
                <div className="mt-8 bg-error-50 border border-error-200 rounded-lg p-4 text-error-700 text-center">
                  <p>Speech recognition is not supported in your browser.</p>
                  <p className="mt-1 text-sm">Try using Chrome, Edge, or Safari.</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-8 bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-primary-100 glass-card">
            <h2 className="text-xl font-semibold text-primary-700 mb-6 flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-full bg-gradient-to-r from-primary-400 to-primary-500 shadow"></span>
              Sample Questions to Ask
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {["What foods are high in vitamin D?","How can I increase my daily protein intake?","What's a good post-workout snack?","What foods should I avoid before bedtime?"].map((q, i) => (
                <button
                  key={i}
                  className="text-left p-5 border border-primary-100 rounded-2xl bg-white/80 hover:bg-primary-50/90 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex items-center gap-3 group focus:ring-2 focus:ring-primary-300 focus:outline-none"
                  tabIndex={0}
                >
                  <span className="inline-block w-8 h-8 rounded-full overflow-hidden shadow group-hover:scale-110 transition-transform border-2 border-primary-100 bg-white">
                    <img src="https://i.postimg.cc/WzfKp2mL/image.png" alt="Zestly Avatar" className="w-full h-full object-cover" />
                  </span>
                  <span className="font-medium text-primary-900 group-hover:text-primary-700 transition-colors duration-200">{q}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SpeechModelPage;