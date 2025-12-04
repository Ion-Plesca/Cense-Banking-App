import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

// ✅ Import your logo
import logo from "../assets/logo.png";

function Navbar() {
  const username = localStorage.getItem("username");
  const profilePicture = localStorage.getItem("profile_picture");

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <nav className="nav-container">

      {/* LOGO IMAGE */}
      <Link to="/homepage" className="nav-logo">
        <img src={logo} alt="Cense Logo" className="nav-logo-img" />
      </Link>

      {/* LINKS */}
      <div className="nav-links">
        <Link to="/homepage" className="nav-btn">Home</Link>
        <Link to="/tracker" className="nav-btn">Tracker</Link>
        <Link to="/predictions" className="nav-btn">Predictions</Link>
        <Link to="/suggestions" className="nav-btn">Suggestions</Link>
        <Link to="/expenses" className="nav-btn">Expenses</Link>
        <Link to="/settings" className="nav-btn">Settings</Link>
      </div>

      {/* PROFILE + LOGOUT */}
      <div className="nav-profile">

        {profilePicture ? (
          <img src={profilePicture} alt="avatar" className="nav-avatar" />
        ) : (
          <div className="profile-circle"></div>
        )}

        <span className="nav-username">{username || ""}</span>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>

      </div>
    </nav>
  );
}

export default Navbar;
