import React, { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import { loginUser } from "./api";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleRegisterSuccess = async (username, password) => {
    try {
      await loginUser(username, password);
      setIsLoggedIn(true);
    } catch (err) {
      alert("Login after registration failed.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowRegister(false);
  };

  return (
    <div>
      <h1>My Full-Stack App</h1>
      {!isLoggedIn ? (
        <div>
          {!showRegister ? (
            <div>
              <Login onLogin={() => setIsLoggedIn(true)} />
                <p>Don't have an account ? </p>
              <button onClick={() => setShowRegister(true)}>Sign Up</button>
            </div>
          ) : (
            <div>
              <Register onRegisterSuccess={handleRegisterSuccess} />
              <button onClick={() => setShowRegister(false)}>Back to Login</button>
            </div>
          )}
        </div>
      ) : (
        <Dashboard onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;