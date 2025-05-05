import React from 'react';
import { Link } from 'react-router-dom';
import { LinkedinIcon, GithubIcon, TwitterIcon, Apple } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Apple className="h-7 w-7 text-primary-400" />
              <span className="text-xl font-display font-bold text-white">Zestly</span>
            </div>
            <p className="text-neutral-400 max-w-xs">
              An AI-powered personal nutrition assistant designed to promote healthier eating habits, 
              especially for students and working individuals.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/in/preetamtonyj/" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white transition-colors">
                <LinkedinIcon size={20} />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white transition-colors">
                <GithubIcon size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white transition-colors">
                <TwitterIcon size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-neutral-400 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-neutral-400 hover:text-white transition-colors">About</Link>
              </li>
              <li>
                <Link to="/chat" className="text-neutral-400 hover:text-white transition-colors">Zestly Chat</Link>
              </li>
              <li>
                <Link to="/meal-planner" className="text-neutral-400 hover:text-white transition-colors">Meal Planner</Link>
              </li>
              <li>
                <Link to="/scan-food" className="text-neutral-400 hover:text-white transition-colors">Scan Food</Link>
              </li>
              <li>
                <Link to="/bmi-calculator" className="text-neutral-400 hover:text-white transition-colors">BMI Calculator</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-neutral-400 hover:text-white transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-neutral-400 hover:text-white transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link to="/cookies" className="text-neutral-400 hover:text-white transition-colors">Cookie Policy</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400 text-sm">
            &copy; {new Date().getFullYear()} Zestly. All rights reserved.
          </p>
          <p className="text-neutral-400 text-sm mt-2 md:mt-0">
            Built by Preetam Tony J ✨, with love for tech, health, and innovation ❤️
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
