import React, { useState } from 'react';
import { loginUser } from '../api';

const Login = ({ onLogin, onLoginClick }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        onLoginClick(); 
        try {
            await loginUser(username, password);
            console.log('Login successful!');
            onLogin();  // Callback to update app state
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
            onLoginClick(true);
        }
    };

    return (
        <div>
            {isLoading ? (
                <p>Logging In...</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <input 
                        type="text" 
                        placeholder="Username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                    <button type="submit">Login</button>
                </form>
            )}
        </div>
    );
};

export default Login;