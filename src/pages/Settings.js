import React, { useState } from "react";
import "../styles/Settings.css";
import { Link } from "react-router-dom";   // side bar links
import Navbar from "../components/Navbar";

export default function Settings() {
  const [profileImg, setProfileImg] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "Kelly",
    surname: "Wilson",
    username: "kelly12345",
  });

  function handleChangePhoto(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setProfileImg(reader.result);
    reader.readAsDataURL(file);
  }

  function handleInputChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSave() {
    console.log("Saved:", formData, profileImg);
    alert("Profile updated!");
  }

  return (
    <div className="settings-container">
      <nav className="sidebar">
        <div className="logo">
          <span className="big-c">C</span>ense
        </div>

        {/* REPLACED BUTTONS WITH LINKS */}
        <Link to="/expenses" className="nav-btn">Expenses</Link>
        <Link to="/tracker" className="nav-btn">Tracker</Link>
        <Link to="/predictions" className="nav-btn">Predictions</Link>
        <Link to="/suggestions" className="nav-btn">Suggestions</Link>
      </nav>

      <main className="main">
        <h1>Edit Profile</h1>
        <p className="subtitle">
          Information you display here will be displayed on your profile.
        </p>

        <div className="profile-card">
          <h2>Photo</h2>

          <div className="photo-wrapper">
            <img
              src={profileImg || "/images/default-avatar.png"}
              className="profile-placeholder"
              alt="Profile"
            />

            <label className="change-btn">
              Change
              <input type="file" hidden onChange={handleChangePhoto} />
            </label>
          </div>

          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Surname</label>
            <input
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>

          <button className="save-btn" onClick={handleSave}>
            Save Changes
          </button>
        </div>

        <aside className="side-links">
          <a href="#">Edit Profile</a>
          <a href="#">Account management</a>
          <a href="#">Other accounts</a>
          <a href="#">Privacy and data</a>
        </aside>
      </main>
    </div>
  );
}
