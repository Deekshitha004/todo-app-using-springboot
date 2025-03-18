import React, { useState, useContext } from 'react'; // Ensure useContext is imported
import { useNavigate } from 'react-router-dom';
import "../index.css"; 
import { AuthContext } from '../components/AuthContext';  // ✅ Import AuthContext correctly

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const authContext = useContext(AuthContext);  // Use the context
    const navigate = useNavigate();  // Hook for navigation

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(await authContext.login(username, password)) {  // ✅ Correct function call
            
        setTimeout(() => {
            //setIsAuthenticated(true) // ✅ Correct function call
            setUsername('')
            setPassword('');
            navigate(`/welcome/${username}`);
        }, 1000);
    } else {
          //setIsAuthenticated(false)  // ✅ Correct function call
          console.log('Authentication Failed');
          setErrorMessage('Invalid username or password.');
          return false;
      }
    
        
    };
    

    return (
        <div className='LoginPage'>
            <h1>Login Page</h1>
            
            <form onSubmit={handleSubmit}>
                <div className='LoginForm'>
                    <div className='form-group'>
                        <label>Username:</label>
                        <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>

                    <div className='form-group'>
                        <label>Password:</label>
                        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </div>

                {errorMessage && <p className="error-message">{errorMessage}</p>}

                <div className='submitbutton'>
                    <button type='submit'>Login</button>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
