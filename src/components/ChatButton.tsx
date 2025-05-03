import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import ChatWidget from './ChatWidget';

const ChatButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-xl mb-4 w-72 sm:w-96 h-96 max-h-[80vh] overflow-hidden"
          >
            <div className="p-4 bg-primary-500 text-white flex justify-between items-center">
              <h3 className="font-medium">NutriBot Assistant</h3>
              <button onClick={toggleChat} className="text-white hover:bg-primary-600 rounded-full p-1">
                <X size={18} />
              </button>
            </div>
            <ChatWidget />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="bg-primary-500 hover:bg-primary-600 text-white rounded-full p-4 shadow-lg flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleChat}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>
    </div>
  );
};

export default ChatButton;