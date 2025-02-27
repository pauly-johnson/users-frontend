// src/App.js
import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <div>
            <h1>My Full-Stack App</h1>
            {!isLoggedIn ? (
                <div>
                    <Login onLogin={() => setIsLoggedIn(true)} />
                    <Register />
                </div>
            ) : (
                <Dashboard onLogout={() => setIsLoggedIn(false)} />
            )}
        </div>
    );
}

export default App;
