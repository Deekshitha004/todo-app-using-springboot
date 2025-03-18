import { createContext, useState } from "react";
import { client } from '../api/ApiClient';
import authService from '../api/AuthenticationApiService'; // Import the default export

// Create authentication context
const AuthContext = createContext();

// Create provider component
const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [number, setNumber] = useState(0);
  const [username, setUsername] = useState('');
  const [token, setToken] = useState(null);

  async function login(username, password) {
    try {
      // Call the method from the imported service
      const response = await authService.executeJwtAuthentication(username, password);
      
      if (response.status === 200) {
        const jwtToken = 'Bearer ' + response.data.token;
        setIsAuthenticated(true);
        console.log('Authentication success');
        setUsername(username);
        setToken(jwtToken);
        
        client.interceptors.request.use(
          (config) => {
            console.log('intercepting and adding token');
            config.headers.Authorization = jwtToken; // Use the same variable name
            return config;
          }
        );
        return true;
      } else {
        logout();
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      logout();
      return false;
    }
  }

  function logout() {
    setIsAuthenticated(false);
    setToken(null);
    setUsername(null);
    console.log('Logged out');
  } 

  const valueToBePassed = { isAuthenticated, login, logout, username, token };

  return (
    <AuthContext.Provider value={valueToBePassed}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };