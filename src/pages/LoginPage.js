import React, { useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/users/login", { email, password });
      const user = res.data.user;

      localStorage.setItem("user_id", user.user_id);
      localStorage.setItem("username", user.username || "");
      localStorage.setItem("profile_picture", user.profile_picture || "");

      alert(res.data.message);
      onLogin(user);

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-page">
      <img src="/images/logo.png" alt="logo" className="top-stripe-logo" />
      <div className="top-stripe-text">Welcome to Cense</div>

      <div className="page-container">
        <h2>Login</h2>

        <form className="auth-form" onSubmit={handleLogin}>
          <input
            className="auth-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <br /><br />

          <input
            className="auth-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <br /><br />

          <button className="auth-button" type="submit">Login</button>
        </form>

        <p className="mt-10">
          Don't have an account? <Link to="/register">Create one here</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
