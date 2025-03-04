import React, { useState } from "react";
import { registerUser } from "../api";

const Register = ({ onRegisterSuccess, onRegisterClick }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    setIsLoading(true);
    onRegisterClick(); 
    try {
      await registerUser(username, email, password);
      alert("Registration successful!");
      setError("");
      onRegisterSuccess(username, password);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError("Username taken");
      } else {
        setError("Registration failed.");
        alert("Registration failed.");
      }
      setIsLoading(false);
      onRegisterClick(true);
    }
  };

  return (
    <div>
      {isLoading ? (
        <p>Registering Please Wait...</p>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <p style={{ color: "red" }}>{error}</p>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit">Register</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Register;
