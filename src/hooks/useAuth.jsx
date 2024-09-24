import { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);  

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:5000/auth/current_user', { withCredentials: true });
        setUser(response.data);
      } catch (error) {
        setUser(null);
        setAuthError('Failed to fetch user'); 
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = async (email, password) => {
    setLoading(true);  // Ativar o estado de loading
    try {
      const response = await axios.post('http://localhost:5000/auth/login', { email, password }, { withCredentials: true });
      setUser(response.data);
      setAuthError(null);  // Limpar erros se login for bem-sucedido
    } catch (error) {
      console.error('Login failed', error);
      setAuthError('Invalid email or password');  // Definir mensagem de erro para o usuário
    } finally {
      setLoading(false);  // Desativar o loading após a tentativa
    }
  };

  const logout = async () => {
    setLoading(true);  // Ativar o estado de loading durante o logout
    try {
      await axios.post('http://localhost:5000/auth/logout', {}, { withCredentials: true });
      setUser(null);
      setAuthError(null);
    } catch (error) {
      console.error('Logout failed', error);
      setAuthError('Error during logout');
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password) => {
    setLoading(true);  // Ativar o estado de loading
    try {
      const response = await axios.post('http://localhost:5000/auth/register', { email, password }, { withCredentials: true });
      setUser(response.data);
      setAuthError(null);  // Limpar qualquer erro anterior
    } catch (error) {
      console.error('Registration failed', error);
      setAuthError('Registration failed. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  const value = { user, setUser, loading, authError, login, logout, register };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <p>Loading...</p> : children}
      {authError && <p style={{ color: 'red' }}>{authError}</p>}  {/* Exibir erros de autenticação */}
    </AuthContext.Provider>
  );
};
