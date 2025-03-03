import React, { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import { loginUser } from "./api";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showSignUpButton, setShowSignUpButton] = useState(true);
  const [showBackToLoginButton, setShowBackToLoginButton] = useState(true);

  const handleRegisterSuccess = async (username, password) => {
    try {
      await loginUser(username, password);
      setIsLoggedIn(true);
      setShowSignUpButton(false);
    } catch (err) {
      alert("Login after registration failed.");
      setShowBackToLoginButton(true); 
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowRegister(false);
    setShowSignUpButton(true);
    setShowBackToLoginButton(true);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowSignUpButton(false);
  };

  const handleLoginClick = (showSignUp = false) => {
    setShowSignUpButton(showSignUp);
  };

  const handleShowRegister = () => {
    setShowRegister(true);
    setShowBackToLoginButton(true);
  };

  const handleHideRegister = () => {
    setShowRegister(false);
    setShowBackToLoginButton(true); 
  };

  const handleRegisterClick = (showBackToLogin = false) => {
    setShowBackToLoginButton(showBackToLogin);
  };

  return (
    <div>
      <h1>My Full-Stack App</h1>
      {!isLoggedIn ? (
        <div>
          {!showRegister ? (
            <div>
              <Login onLogin={handleLogin} onLoginClick={handleLoginClick} />
              {showSignUpButton && (
                <>
                  <p>Don't have an account?</p>
                  <button onClick={handleShowRegister}>Sign Up</button>
                </>
              )}
            </div>
          ) : (
            <div>
              <Register onRegisterSuccess={handleRegisterSuccess} onRegisterClick={handleRegisterClick} />
              {showBackToLoginButton && (
                <button onClick={handleHideRegister}>Back to Login</button>
              )}
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