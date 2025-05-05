import { motion } from 'framer-motion';
import { ChevronDown, MenuIcon, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Chat', path: '/chat' },
    { name: 'Meal Analyzer', path: '/meal-analyzer' },
    { name: 'Scan Food', path: '/scan-food' },
    { name: 'Recipe Generator', path: '/recipe-generator' },
    { name: 'BMI Calculator', path: '/bmi-calculator' },
    { name: 'Meal Planner', path: '/meal-planner' },
    { name: 'Food Alternatives', path: '/food-alternatives' },
    { name: 'Speech Model', path: '/speech-model' },
    { name: 'Games', path: '/games' },
    { name: 'Yoga Assistant', path: '/yoga-assistant' },
    { name: 'Community', path: '/community' },
    { name: 'NutriX Talks', path: '/nutrix-talks' },
    { name: 'Research Papers', path: '/research-papers' },
  ];



  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled || location.pathname !== '/' 
          ? 'bg-white shadow-md py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 mr-8">
            <img src="https://i.postimg.cc/WzfKp2mL/image.png" alt="Zestly Logo" className="h-8 w-8 rounded object-cover" />
            <span className="text-xl font-display font-bold text-primary-500">Zestly</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium px-3 py-2 rounded-md transition duration-200 ${
                    location.pathname === item.path
                      ? 'text-primary-500 bg-primary-50'
                      : 'text-neutral-700 hover:text-primary-500 hover:bg-primary-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}

            </div>
            
            <div className="flex items-center space-x-4 pl-4 border-l border-neutral-200">
              {currentUser ? (
                <div className="relative">
                  <button
                    onClick={toggleMenu}
                    className="flex items-center space-x-2 text-sm font-medium text-neutral-700 hover:text-primary-500"
                  >
                    <span>Account</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  
                  {isOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-neutral-700 hover:bg-primary-50"
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-primary-50"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/login"
                    className="text-sm font-medium text-neutral-700 hover:text-primary-500 px-3 py-2"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    className="text-sm font-medium bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md transition duration-200"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button 
            className="lg:hidden text-neutral-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="lg:hidden bg-white shadow-md"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === item.path
                    ? 'text-primary-500 bg-primary-50'
                    : 'text-neutral-700 hover:text-primary-500 hover:bg-primary-50'
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}


            {currentUser ? (
              <>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:text-primary-500 hover:bg-primary-50"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:text-primary-500 hover:bg-primary-50"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="pt-4 pb-3 border-t border-neutral-200">
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:text-primary-500 hover:bg-primary-50"
                  onClick={() => setMenuOpen(false)}
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 mt-1 rounded-md text-base font-medium bg-primary-500 hover:bg-primary-600 text-white"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
