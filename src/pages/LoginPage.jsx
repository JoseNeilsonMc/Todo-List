import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import googleLogo from '../../public/google-logo1.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/google';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isRegistering ? 'http://localhost:5000/auth/register' : 'http://localhost:5000/auth/login';

    if (isRegistering && !isStrongPassword(password)) {
      setError('A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma minúscula e um número.');
      return;
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (rememberMe) {
          localStorage.setItem('email', email);
          localStorage.setItem('password', password);
        }
        navigate('/todos');
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const isStrongPassword = (password) => {
    return /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password);
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setRememberMe(false);
    setError('');
  };

  const handleToggleFormType = () => {
    resetForm();
    setIsRegistering(!isRegistering);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center bg-white w-full max-w-md p-10 rounded-lg shadow-lg">
        <h1 className="mb-4 text-2xl font-bold text-gray-800">{isRegistering ? 'Register' : 'Login'}</h1>
        <p className="mb-6 text-gray-600">Please {isRegistering ? 'register' : 'login'} to continue</p>
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 border border-gray-300 rounded"
            required
          />
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded pr-10"
              required
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={handleTogglePassword}
              className="absolute inset-y-0 right-3 flex items-center text-gray-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4"
            />
            <label>Remember Me</label>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" className="py-3 bg-green-500 text-white rounded transition duration-300 hover:bg-green-600">
            {isRegistering ? 'Register' : 'Login'}
          </button>
          {!isRegistering && (
            <button type="button" onClick={handleGoogleLogin} className="flex items-center justify-center py-3 bg-blue-500 text-white rounded transition duration-300 hover:bg-blue-600 mt-4">
              <img src={googleLogo} alt="Google logo" className="mr-2 w-6 h-6 rounded-full" />
              Login with Google
            </button>
          )}
          <button type="button" onClick={handleToggleFormType} className="mt-4 text-blue-500 underline">
            {isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
