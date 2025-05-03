import React, { useState } from 'react';
import { signup, googleLogin } from '../services/authService';
import { useNavigate } from 'react-router-dom';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    try {
      await signup(email, password);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 1200);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleSignup = async () => {
    setError(null);
    try {
      await googleLogin();
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-primary-50 px-4">
  <div className="relative w-full max-w-md rounded-3xl shadow-2xl bg-white/70 backdrop-blur-lg border border-primary-100 p-10 sm:p-12 flex flex-col gap-4">
    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gradient-to-br from-primary-200 via-primary-400 to-green-300 rounded-full p-2 shadow-lg animate-fade-in z-10">
      <svg className="h-14 w-14 text-white drop-shadow-lg" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M12 21c-4.97 0-9-3.58-9-8 0-2.13 1.06-4.08 2.8-5.47C7.5 5.09 9.62 3 12 3s4.5 2.09 6.2 4.53C19.94 8.92 21 10.87 21 13c0 4.42-4.03 8-9 8Zm0-11.5A2.5 2.5 0 1 0 12 15a2.5 2.5 0 0 0 0-5Z"/></svg>
    </div>
    <div className="text-center mt-6 mb-8">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-700 mb-1 tracking-tight drop-shadow">Create Your <span className="text-green-600">NutriBot</span> Account</h2>
      <p className="text-base text-neutral-600">Join us to start your personalized nutrition journey</p>
    </div>
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
      {success && <div className="bg-green-100 text-green-700 text-sm rounded px-3 py-2 mb-2 animate-fade-in">Signup successful! Redirecting...</div>}
      <button type="submit" className="btn btn-primary w-full mt-1">Sign Up</button>
    </form>
    <div className="relative flex items-center my-4">
      <div className="flex-grow border-t border-gray-200"></div>
      <span className="mx-2 text-gray-400 text-xs font-medium">OR</span>
      <div className="flex-grow border-t border-gray-200"></div>
    </div>
    <button
      onClick={handleGoogleSignup}
      className="flex items-center justify-center gap-2 w-full py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 shadow transition font-medium text-gray-700 focus:ring-2 focus:ring-primary-200"
    >
      <svg className="w-5 h-5" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M24 9.5c3.54 0 6.34 1.53 7.8 2.82l5.74-5.74C33.47 3.62 28.97 1.5 24 1.5 14.98 1.5 7.09 7.96 3.91 16.05l6.81 5.29C12.18 15.04 17.61 9.5 24 9.5z"/><path fill="#34A853" d="M46.13 24.5c0-1.63-.15-3.2-.42-4.7H24v9.11h12.42c-.54 2.84-2.16 5.24-4.63 6.87l7.19 5.59C43.47 37.09 46.13 31.3 46.13 24.5z"/><path fill="#FBBC05" d="M10.72 28.14a14.7 14.7 0 010-8.28l-6.81-5.29a23.97 23.97 0 000 18.86l6.81-5.29z"/><path fill="#EA4335" d="M24 46.5c6.48 0 11.93-2.14 15.91-5.84l-7.19-5.59c-2.01 1.36-4.6 2.17-8.72 2.17-6.39 0-11.82-5.54-13.28-12.84l-6.81 5.29C7.09 41.04 14.98 46.5 24 46.5z"/></g></svg>
      Continue with Google
    </button>
    <div className="flex justify-center mt-2">
      <button onClick={() => navigate('/login')} className="text-primary-600 text-xs hover:underline">Already have an account? Login</button>
    </div>
  </div>
</div>
  );
};

export default Signup;
