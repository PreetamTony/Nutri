import { motion } from 'framer-motion';
import { Mic, MicOff, Send } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { groqService } from '../services/api';
import { ChatMessage } from '../types';

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hi! I\'m Zestly, your personal nutrition assistant. How can I help you with your nutrition goals today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // useEffect(() => {
//   scrollToBottom();
// }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Convert messages to the format expected by the API
      const formattedMessages = messages.map(msg => ({ 
        role: msg.role, 
        content: msg.content 
      }));
      
      const response = await groqService.getChatCompletion(formattedMessages, input);
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };
      
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error calling Groq API:', error);
      
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an issue processing your request. Please try again later.',
        timestamp: new Date()
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleListening = () => {
    // Speech recognition would be implemented here
    // For now, we'll just toggle the state
    setListening(!listening);
    
    if (!listening) {
      // This is where we would start speech recognition
      // For demo purposes, let's simulate receiving voice input
      setTimeout(() => {
        setInput('What are some healthy breakfast options?');
        setListening(false);
      }, 2000);
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 relative overflow-hidden">
      {/* Decorative animated blob */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[480px] h-[480px] bg-gradient-to-br from-primary-200 via-primary-100 to-white opacity-30 rounded-full blur-3xl -z-10 animate-pulse-slow" />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="backdrop-blur-lg bg-white/80 rounded-3xl shadow-2xl overflow-hidden border border-primary-100 glass-card"
          >
            <div className="bg-gradient-to-r from-primary-500 to-primary-400 text-white px-6 py-5 flex items-center gap-4 shadow-md">
              <span className="inline-flex items-center justify-center bg-white/20 rounded-full p-2 mr-2 shadow-lg">
  <img src="https://i.postimg.cc/WzfKp2mL/image.png" alt="Eatelligence Avatar" className="w-10 h-10 rounded-full object-cover border-2 border-primary-200 shadow" />
</span>
              <div>
                <h1 className="text-2xl font-extrabold drop-shadow tracking-tight">Zestly Chat Assistant</h1>
                <p className="text-primary-100 text-sm font-medium">Ask me anything about nutrition, diet plans, or healthy eating habits</p>
              </div>
            </div>
            
            <div className="h-[60vh] overflow-y-auto px-6 py-6 bg-gradient-to-br from-white/60 via-primary-50/60 to-primary-100/50">
              <div className="space-y-5">
                {messages.map((message, idx) => (
  <motion.div
    key={message.id}
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45, delay: idx * 0.05 }}
    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
  >
    <div
      className={`max-w-[80%] rounded-2xl p-4 shadow-xl backdrop-blur-md transition-transform duration-200 ${
        message.role === 'user'
          ? 'bg-gradient-to-br from-primary-500 to-primary-400 text-white rounded-tr-md'
          : 'bg-white/90 text-primary-900 border border-primary-100 rounded-tl-md'
      }`}
    >
      <div className="flex items-center gap-2 mb-1">
        {message.role === 'assistant' && (
          <img src="https://i.postimg.cc/WzfKp2mL/image.png" alt="Eatelligence Avatar" className="w-8 h-8 rounded-full object-cover border border-primary-200 shadow" />
        )}
        <p className="whitespace-pre-line leading-relaxed">{message.content}</p>
      </div>
      <div className={`text-xs mt-1 ${message.role === 'user' ? 'text-primary-100' : 'text-primary-400'}`}>
        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  </motion.div>
))}
                {isLoading && (
                  <motion.div
                    className="flex justify-start"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="bg-white/90 text-primary-900 rounded-2xl p-4 max-w-[80%] border border-primary-100 shadow animate-pulse">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
            
            <form onSubmit={handleSendMessage} className="px-6 py-4 border-t border-primary-100 bg-white/80 backdrop-blur-lg">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleListening}
                  className={`p-2 rounded-full shadow-lg transition-all duration-200 mr-2 focus:ring-2 focus:ring-primary-400 ${
                    listening
                      ? 'bg-error-400 text-white scale-110 animate-pulse'
                      : 'bg-primary-100 text-primary-600 hover:bg-primary-200 hover:scale-110'
                  }`}
                  aria-label={listening ? 'Stop listening' : 'Start voice input'}
                >
                  {listening ? <MicOff size={22} /> : <Mic size={22} />}
                </button>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Zestly something..."
                  className="flex-1 border-none rounded-full bg-white/70 shadow px-5 py-3 focus:outline-none focus:ring-2 focus:ring-primary-400 text-base transition"
                  disabled={isLoading || listening}
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-primary-500 to-primary-400 hover:from-primary-600 hover:to-primary-500 text-white py-3 px-6 rounded-full shadow-lg transition-all duration-200 disabled:bg-neutral-300 focus:ring-2 focus:ring-primary-400"
                  disabled={isLoading || !input.trim() || listening}
                  aria-label="Send message"
                >
                  <Send size={22} />
                </button>
              </div>
              <div className="mt-2 text-xs text-primary-500 flex items-center justify-between">
                <span>
                  {listening ? '🎤 Listening... Speak now' : 'Press the microphone icon to use voice input'}
                </span>
                <span className="italic opacity-70">Powered by Zestly AI🤖</span>
              </div>
            </form>
          </motion.div>
          
          <div className="mt-8 bg-white/60 backdrop-blur-2xl p-8 rounded-3xl shadow-xl border border-primary-100 glass-card">
  <h2 className="text-2xl font-bold text-primary-700 mb-6 flex items-center gap-3">
    <span className="inline-block w-3 h-3 rounded-full bg-gradient-to-r from-primary-400 to-primary-500 shadow"></span>
    Popular Nutrition Questions
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {suggestedQuestions.map((question, index) => (
      <button
        key={index}
        onClick={() => setInput(question)}
        className="text-left p-5 border border-primary-100 rounded-2xl bg-white/80 hover:bg-primary-50/90 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex items-center gap-3 group focus:ring-2 focus:ring-primary-300 focus:outline-none"
        tabIndex={0}
      >
        <span className="inline-block w-8 h-8 rounded-full overflow-hidden shadow group-hover:scale-110 transition-transform border-2 border-primary-100 bg-white">
  <img src="https://i.postimg.cc/WzfKp2mL/image.png" alt="Zestly Avatar" className="w-full h-full object-cover" />
</span>
        <span className="font-medium text-primary-900 group-hover:text-primary-700 transition-colors duration-200">{question}</span>
      </button>
    ))}
  </div>
</div>
        </div>
      </div>
    </div>
  );
};

const suggestedQuestions = [
  "What's a balanced breakfast for weight loss?",
  "How much protein should I eat daily?",
  "What are some healthy snack options?",
  "How can I reduce sugar cravings?",
  "What foods are good for gut health?",
  "How many calories should I eat to maintain weight?"
];

export default ChatPage;