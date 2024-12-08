import React, { useState, useEffect } from 'react';
import { Mail, Lock, User } from 'lucide-react';
import { loginUser, registerUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  // Login states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Signup states  
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupError, setSignupError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    
    try {
      const data = await loginUser(loginEmail, loginPassword.trim());
      localStorage.setItem('user', JSON.stringify(data));
      navigate('/');
    } catch (error) {
      setLoginError(error.message || 'Login failed. Please check your credentials.');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setSignupError('');

    if (!signupName || !signupEmail || !signupPassword) {
      setSignupError('All fields are required');
      return;
    }

    try {
      const data = await registerUser(signupName, signupEmail, signupPassword.trim());
      localStorage.setItem('user', JSON.stringify(data));
      navigate('/');
    } catch (error) {
      console.error('Signup error:', error);
      setSignupError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Login Section */}
      <div className="w-1/2 bg-white p-8 flex items-center justify-center">
        <div className="max-w-md w-full">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Welcome Back</h2>
          {loginError && <p className="text-red-500 mb-4">{loginError}</p>}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value.trim())}
                required
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Log In
            </button>
          </form>
        </div>
      </div>

      {/* Sign Up Section */}
      <div className="w-1/2 bg-blue-600 p-8 flex items-center justify-center">
        <div className="max-w-md w-full">
          <h2 className="text-3xl font-bold text-white mb-6">Create Account</h2>
          {signupError && <p className="text-red-500 bg-white rounded-lg p-2 mb-4">{signupError}</p>}
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Full Name"
                className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={signupName}
                onChange={(e) => setSignupName(e.target.value.trim())}
                required
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value.trim())}
                required
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-white text-blue-600 p-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;