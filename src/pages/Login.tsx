import React, { useState } from 'react';
import { login, googleLogin, resetPassword } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    try {
      await googleLogin();
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetMessage(null);
    try {
      await resetPassword(resetEmail);
      setResetMessage('Password reset email sent!');
    } catch (err: any) {
      setResetMessage((err as Error).message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary-50 to-white px-4">
  <div className="w-full max-w-sm bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-8 flex flex-col gap-4">
    <h2 className="text-3xl font-extrabold text-primary-700 mb-2 text-center tracking-tight">Sign In to NutriBot</h2>
    {!showReset ? (
      <>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="input input-bordered w-full"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="input input-bordered w-full"
            required
          />
          {error && <div className="bg-red-100 text-red-600 text-sm rounded px-3 py-2 mb-2 animate-shake">{error}</div>}
          <button type="submit" className="btn btn-primary w-full mt-1">Login</button>
        </form>
        <div className="relative flex items-center my-2">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="mx-2 text-gray-400 text-xs font-medium">OR</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>
        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-2 w-full py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 shadow transition font-medium text-gray-700 focus:ring-2 focus:ring-primary-200"
        >
          <svg className="w-5 h-5" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M24 9.5c3.54 0 6.34 1.53 7.8 2.82l5.74-5.74C33.47 3.62 28.97 1.5 24 1.5 14.98 1.5 7.09 7.96 3.91 16.05l6.81 5.29C12.18 15.04 17.61 9.5 24 9.5z"/><path fill="#34A853" d="M46.13 24.5c0-1.63-.15-3.2-.42-4.7H24v9.11h12.42c-.54 2.84-2.16 5.24-4.63 6.87l7.19 5.59C43.47 37.09 46.13 31.3 46.13 24.5z"/><path fill="#FBBC05" d="M10.72 28.14a14.7 14.7 0 010-8.28l-6.81-5.29a23.97 23.97 0 000 18.86l6.81-5.29z"/><path fill="#EA4335" d="M24 46.5c6.48 0 11.93-2.14 15.91-5.84l-7.19-5.59c-2.01 1.36-4.6 2.17-8.72 2.17-6.39 0-11.82-5.54-13.28-12.84l-6.81 5.29C7.09 41.04 14.98 46.5 24 46.5z"/></g></svg>
          Continue with Google
        </button>
        <div className="flex flex-col sm:flex-row justify-between items-center mt-2 gap-1">
          <button onClick={() => setShowReset(true)} className="text-blue-600 text-xs hover:underline">Forgot password?</button>
          <button onClick={() => navigate('/signup')} className="text-primary-600 text-xs hover:underline">Don't have an account? Sign up</button>
        </div>
      </>
    ) : (
      <form onSubmit={handleResetPassword} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Enter your email"
          value={resetEmail}
          onChange={e => setResetEmail(e.target.value)}
          className="input input-bordered w-full"
          required
        />
        {resetMessage && <div className="bg-green-100 text-green-700 text-sm rounded px-3 py-2 mb-2 animate-fade-in">{resetMessage}</div>}
        <button type="submit" className="btn btn-primary w-full">Send Reset Link</button>
        <button type="button" onClick={() => setShowReset(false)} className="text-primary-600 text-xs hover:underline">Back to Login</button>
      </form>
    )}
  </div>
</div>
  );
};

export default Login;
