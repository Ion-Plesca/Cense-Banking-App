import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css"; // you will create this

function Navbar() {
  return (
    <nav className="nav-container">
      <button className="menu-icon">
        ☰
      </button>

      <div className="nav-logo">
        <span className="logo-c">C</span>
        <span className="logo-ense">ense</span>
      </div>

      <div className="nav-links">
        <Link to="/tracker" className="nav-btn">Tracker</Link>
        <Link to="/predictions" className="nav-btn">Predictions</Link>
        <Link to="/suggestions" className="nav-btn">Suggestions</Link>
        <Link to="/expenses" className="nav-btn ">Expenses</Link>
        <Link to="/settings" className="nav-btn">Settings</Link>
      </div>

      <div className="nav-profile">
        <div className="profile-circle"></div>
      </div>
    </nav>
  );
}

export default Navbar;
