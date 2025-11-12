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
      alert(res.data.message);
      onLogin(res.data.user); 
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    // Use `page-container` class in CSS to control page background, padding and borders.
    // This page wraps the container in `.login-page` so public/styles/login.css
    // (loaded from public/index.html) applies the background + overlay only here.
    <div className="login-page">
      {/* small logo placed inside the yellow stripe at top-left */}
      <img src="/images/logo.png" alt="logo" className="top-stripe-logo" />
      <div className="top-stripe-text">Welcome to Cense</div>
      <div className="page-container">
      
      <h2>Login</h2>


      {/* FORM: style the form by targeting .auth-form or the input/button elements in CSS.
          To change input borders and button colors, edit `.auth-input`, `.auth-button` in CSS. */}
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
        Don't have an account?{" "}
        <Link to="/register">Create one here</Link>
      </p>
      </div>
    </div>
  );
}

export default LoginPage;
