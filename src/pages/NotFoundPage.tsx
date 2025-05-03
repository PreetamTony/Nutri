import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="mb-8">
          <div className="relative inline-block">
            <span className="text-8xl font-bold text-primary-500">404</span>
            <span className="absolute top-0 -right-6 text-8xl font-bold text-primary-200">!</span>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-neutral-900 mb-4">Page Not Found</h1>
        <p className="text-neutral-600 mb-8 max-w-md mx-auto">
          We couldn't find the page you were looking for. It might have been moved or doesn't exist.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/"
            className="bg-primary-500 hover:bg-primary-600 text-white py-2 px-6 rounded-md transition duration-200 inline-flex items-center justify-center"
          >
            <Home className="h-5 w-5 mr-2" />
            Go to Homepage
          </Link>
          <button
            onClick={() => window.history.back()}
            className="bg-neutral-200 hover:bg-neutral-300 text-neutral-700 py-2 px-6 rounded-md transition duration-200 inline-flex items-center justify-center"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;