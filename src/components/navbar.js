import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const username = localStorage.getItem("username");
  const profilePicture = localStorage.getItem("profile_picture");

  return (
    <nav className="nav-container">

      {/* LOGO */}
      <div className="nav-logo">
        <span className="logo-c">C</span>
        <span className="logo-ense">ense</span>
      </div>

      {/* LINKS */}
      <div className="nav-links">
        <Link to="/HomePage" className="nav-btn">Home</Link>
        <Link to="/tracker" className="nav-btn">Tracker</Link>
        <Link to="/predictions" className="nav-btn">Predictions</Link>
        <Link to="/suggestions" className="nav-btn">Suggestions</Link>
        <Link to="/expenses" className="nav-btn">Expenses</Link>
        <Link to="/settings" className="nav-btn">Settings</Link>
      </div>

      {/* PROFILE AREA */}
      <div className="nav-profile">

        {/* Profile Picture */}
        {profilePicture ? (
          <img 
            src={profilePicture}
            alt="avatar"
            className="nav-avatar"
          />
        ) : (
          <div className="profile-circle"></div>
        )}

        {/* Username */}
        <span className="nav-username">
          {username ? username : ""}
        </span>
      </div>

    </nav>
  );
}

export default Navbar;
