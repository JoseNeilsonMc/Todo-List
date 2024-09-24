import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import googleLogo from '../../public/google-logo1.png';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/google';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isRegistering ? 'http://localhost:5000/auth/register' : 'http://localhost:5000/auth/login';
    setLoading(true);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Error during request');

      if (rememberMe) {
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
      }

      navigate('/todos');
    } catch (err) {
      setError(err.message || 'An error occurred. Try again.');
    } finally {
      setLoading(false);
    }
  };

  // Verifica se o formulário é válido
  const isFormValid = email.trim() !== '' && password.trim() !== '';

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white max-w-md p-10 rounded-lg shadow-lg">
        <h1 className="mb-4 text-2xl font-bold">{isRegistering ? 'Register' : 'Login'}</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 border border-gray-300 rounded"
            required
          />
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              name="showPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded pr-10"
              autoComplete="new-password"
              required
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-3">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <label className="flex items-center">
            <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
            <span className="ml-2">Remember Me</span>
          </label>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className={`bg-green-500 text-white py-2 rounded hover:bg-green-600 ${!isFormValid || loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!isFormValid || loading}
          >
            {loading ? 'Loading...' : isRegistering ? 'Register' : 'Login'}
          </button>
          {!isRegistering && (
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex items-center justify-center bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mt-4"
            >
              <img src={googleLogo} alt="Google" className="w-6 h-6 mr-2" />
              Login with Google
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-blue-500 underline mt-4"
          >
            {isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
