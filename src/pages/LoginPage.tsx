import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

// Avatar image (use NutriBot logo)
const AVATAR_SRC = 'https://i.postimg.cc/WzfKp2mL/image.png';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      setError('Failed to log in. Please check your credentials.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-gradient-to-br from-green-200 via-primary-50 to-white px-2 py-0 overflow-y-auto">
      <div className="relative w-full max-w-md mx-auto mt-16 mb-10">
        <div className="absolute -top-14 left-1/2 -translate-x-1/2 z-20">
          <div className="bg-gradient-to-br from-primary-400 via-green-300 to-white p-2 rounded-full shadow-lg animate-fade-in">
            <img
              src={AVATAR_SRC}
              alt="NutriBot Logo"
              className="h-20 w-20 rounded-full border-4 border-white shadow-xl object-cover bg-white animate-bounce-slow"
            />
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative w-full max-w-md rounded-3xl shadow-2xl bg-white/70 backdrop-blur-lg border border-primary-100 p-10 flex flex-col gap-4"
        >
        <div className="text-center mt-10 mb-8">
          <h1 className="text-4xl font-extrabold text-primary-700 mb-2 tracking-tight drop-shadow-xl">Welcome Back!</h1>
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-green-600 font-bold text-2xl">NutriBot</span>
            <span className="text-base text-primary-500 font-semibold bg-primary-100 px-3 py-1 rounded-full shadow">AI Nutrition</span>
          </div>
          <p className="text-base text-neutral-600">Fuel your best self. Log in to continue your nutrition journey.</p>
        </div>
        
        {error && (
          <div className="bg-error-100 border border-error-300 text-error-500 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-primary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 shadow-sm bg-white/90 placeholder:text-neutral-400"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="password" className="block text-sm font-medium text-neutral-700">
                Password
              </label>
              <Link to="/forgot-password" className="text-sm text-primary-600 hover:text-primary-500 font-semibold">
                Forgot password?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-primary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 shadow-sm bg-white/90 placeholder:text-neutral-400"
              placeholder="••••••••"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary-500 to-green-400 hover:from-primary-600 hover:to-green-500 text-white py-3 rounded-xl shadow-lg transition duration-200 font-bold tracking-wide text-lg disabled:bg-primary-300"
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </div>
        </form>
        
        <div className="relative flex items-center my-6">
          <div className="flex-grow border-t border-primary-100"></div>
          <span className="mx-2 text-primary-400 text-xs font-bold">OR</span>
          <div className="flex-grow border-t border-primary-100"></div>
        </div>
        <button
          type="button"
          onClick={async () => {
            try {
              setError('');
              setLoading(true);
              await googleLogin();
              navigate('/dashboard');
            } catch (err: any) {
              setError(err?.message || 'Google login failed');
            } finally {
              setLoading(false);
            }
          }}
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-primary-200 bg-white/90 hover:bg-primary-50 shadow-lg transition font-semibold text-primary-700 focus:ring-2 focus:ring-primary-200 mb-2 text-base"
          disabled={loading}
        >
          <svg className="w-5 h-5" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M24 9.5c3.54 0 6.34 1.53 7.8 2.82l5.74-5.74C33.47 3.62 28.97 1.5 24 1.5 14.98 1.5 7.09 7.96 3.91 16.05l6.81 5.29C12.18 15.04 17.61 9.5 24 9.5z"/><path fill="#34A853" d="M46.13 24.5c0-1.63-.15-3.2-.42-4.7H24v9.11h12.42c-.54 2.84-2.16 5.24-4.63 6.87l7.19 5.59C43.47 37.09 46.13 31.3 46.13 24.5z"/><path fill="#FBBC05" d="M10.72 28.14a14.7 14.7 0 010-8.28l-6.81-5.29a23.97 23.97 0 000 18.86l6.81-5.29z"/><path fill="#EA4335" d="M24 46.5c6.48 0 11.93-2.14 15.91-5.84l-7.19-5.59c-2.01 1.36-4.6 2.17-8.72 2.17-6.39 0-11.82-5.54-13.28-12.84l-6.81 5.29C7.09 41.04 14.98 46.5 24 46.5z"/></g></svg>
          Continue with Google
        </button>
        <div className="mt-6 text-center">
          <p className="text-neutral-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary-600 hover:text-primary-500 font-bold">
              Sign up
            </Link>
          </p>
        </div>
        <div className="mt-8 text-center text-neutral-500 text-sm italic px-2">
          <span className="block mb-1">“Every healthy choice is a victory. Start strong today!”</span>
          <span className="text-primary-500 font-semibold">Tip:</span> Hydrate well and add color to your plate for better nutrition.
        </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;