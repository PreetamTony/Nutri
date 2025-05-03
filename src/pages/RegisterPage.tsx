import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

// Avatar image (use NutriBot logo)
const AVATAR_SRC = 'https://i.postimg.cc/WzfKp2mL/image.png';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup, googleLogin } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    try {
      setError('');
      setLoading(true);
      await signup(email, password, name);
      navigate('/dashboard');
    } catch (error) {
      setError('Failed to create an account. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      navigate('/dashboard');
    } catch (error) {
      setError('Failed to login with Google. Please try again.');
      console.error(error);
    }
  };
  
  return (
    <div className="min-h-[calc(100vh-120px)] flex flex-col items-center justify-start bg-gradient-to-br from-green-50 via-white to-primary-50 px-2 pt-0 pb-0 mt-24 mb-12">
      <div className="relative w-full max-w-sm mx-auto">
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10">
          <img
            src={AVATAR_SRC}
            alt="NutriBot Logo"
            className="h-14 w-14 rounded-full border-2 border-white shadow object-cover bg-white"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative w-full max-w-sm rounded-2xl shadow-xl bg-white/60 backdrop-blur-lg border border-primary-100 p-6 flex flex-col gap-4"
        >
        <div className="text-center mt-6 mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-primary-700 mb-1 tracking-tight drop-shadow">Create your <span className="text-green-600">NutriBot</span> account</h1>
          <p className="text-base text-neutral-600">Start your journey to healthier eating habits</p>
        </div>
        
        {error && (
          <div className="bg-error-100 border border-error-300 text-error-500 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 mb-1">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="••••••••"
            />
          </div>
          
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-500 hover:bg-primary-600 text-white py-2 rounded-md transition duration-200 font-medium disabled:bg-primary-300"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>
        </form>

        <div className="relative flex items-center my-6">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="mx-2 text-gray-400 text-xs font-medium">OR</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-2 w-full py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 shadow transition font-medium text-gray-700 focus:ring-2 focus:ring-primary-200 mb-2"
          disabled={loading}
        >
          <svg className="w-5 h-5" viewBox="0 0 48 48">
            <g>
              <path fill="#4285F4" d="M24 9.5c3.54 0 6.34 1.53 7.8 2.82l5.74-5.74C33.47 3.62 28.97 1.5 24 1.5 14.98 1.5 7.09 7.96 3.91 16.05l6.81 5.29C12.18 15.04 17.61 9.5 24 9.5z"/>
              <path fill="#34A853" d="M46.13 24.5c0-1.63-.15-3.2-.42-4.7H24v9.11h12.42c-.54 2.84-2.16 5.24-4.63 6.87l7.19 5.59C43.47 37.09 46.13 31.3 46.13 24.5z"/>
              <path fill="#FBBC05" d="M10.72 28.14a14.7 14.7 0 010-8.28l-6.81-5.29a23.97 23.97 0 000 18.86l6.81-5.29z"/>
              <path fill="#EA4335" d="M24 46.5c6.48 0 11.93-2.14 15.91-5.84l-7.19-5.59c-2.01 1.36-4.6 2.17-8.72 2.17-6.39 0-11.82-5.54-13.28-12.84l-6.81 5.29C7.09 41.04 14.98 46.5 24 46.5z"/>
            </g>
          </svg>
          Continue with Google
        </button>
        <div className="mt-6 text-center">
          <p className="text-neutral-600">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 hover:text-primary-500 font-medium">
              Log in
            </Link>
          </p>
        </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;