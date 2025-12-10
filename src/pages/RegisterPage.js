import React, { useState } from "react";
import API from "../api";
import { Link, useNavigate } from "react-router-dom";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/users/register", { username, email, password });
      // Registration succeeded; show message and send user back to login page
      alert(res.data.message || "Registered successfully. Please log in.");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="login-page">
      <img src="/images/logo.png" alt="logo" className="top-stripe-logo" />
      <div className="top-stripe-text">Welcome to Cense</div>
      <div className="page-container">
        <h2>Create Account</h2>

        <form className="auth-form" onSubmit={handleRegister}>
          <input
            className="auth-input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <br />
          <br />
          <input
            className="auth-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <br />
          <input
            className="auth-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <br />
          <button className="auth-button" type="submit">Register</button>
        </form>

        <p className="mt-10">
          Already have an account? {" "}
          <Link to="/">Back to Login</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;