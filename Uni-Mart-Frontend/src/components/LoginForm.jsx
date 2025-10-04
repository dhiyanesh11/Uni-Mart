import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { setIsAuthenticated } = useContext(AuthContext); // ✅ Access global auth state
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("Logging in...");

    try {
      const res = await fetch("http://localhost:8000/api/auth/token/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Login successful!");
        localStorage.setItem("authToken", data.auth_token);

        // ✅ Update navbar immediately
        setIsAuthenticated(true);

        // ✅ Redirect to homepage
        setTimeout(() => navigate("/"), 1000);
      } else {
        setMessage(data.non_field_errors || "Login failed");
      }
    } catch (error) {
      setMessage("An unexpected error occurred. Please try again later.");
      console.error("Login error:", error);
    }
  }

  return (
    <>
      <style>
        {`
        .auth-card-container {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          background-color: #f0f2f5;
          min-height: 100vh;
          padding-top: 10rem;
        }
        
        .auth-card {
          background-color: #fff;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.08);
          width: 100%;
          max-width: 400px;
        }

        .auth-card h2 {
          text-align: center;
          margin-bottom: 1.5rem;
          color: #333;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .auth-form label {
          margin-bottom: 0.5rem;
          color: #444;
          font-weight: 500;
        }

        .auth-form input {
          padding: 0.7rem;
          border: 1px solid #ccc;
          border-radius: 8px;
          margin-bottom: 1rem;
          font-size: 1rem;
          background-color: #fff;
          color: #333;
          box-sizing: border-box;
        }

        .auth-form button {
          margin-top: 0.5rem;
          padding: 0.8rem;
          background-color: #4a90e2;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
        }

        .auth-form button:hover {
          background-color: #3578d6;
        }

        .auth-form p {
          text-align: center;
          margin-top: 0.8rem;
          color: #333;
        }
        `}
      </style>

      <div className="auth-card-container">
        <div className="auth-card">
          <h2>Login</h2>
          <form className="auth-form" onSubmit={handleSubmit}>
            <label>Username</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label>Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Log In</button>
            {message && <p>{message}</p>}
          </form>
        </div>
      </div>
    </>
  );
}
