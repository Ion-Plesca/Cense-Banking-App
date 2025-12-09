import React, { useState, useEffect } from "react";
import "../styles/Settings.css";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

export default function Settings() {
  const navigate = useNavigate();
  const user_id = localStorage.getItem("user_id");

  const [editing, setEditing] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);

  const [formData, setFormData] = useState({
    username: "",
  });

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await API.get(`/users/${user_id}`);
        const user = res.data;

        setFormData({
          username: user.username || "",
        });

        setProfilePicture(user.profile_picture || null);

      } catch (err) {
        console.error(err);
      }
    }

    loadUser();
  }, [user_id]);

    const getProfilePictureSrc = () => {
    if (!profilePicture) {
      return "/images/default-avatar.png";
    }

    if (profilePicture instanceof File) {
      return URL.createObjectURL(profilePicture);
    }

    const backendUrl = "http://localhost:5000";

    if (profilePicture.startsWith("http")) {
      return profilePicture;
    }

    return backendUrl + profilePicture;
  };

  function handleChangePhoto(e) {
    const file = e.target.files[0];
    if (!file) return;
    setProfilePicture(file);
  }

  function handleInputChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

async function handleSave() {
  try {
    const form = new FormData();
    form.append("username", formData.username);

    if (profilePicture instanceof File) {
      form.append("profile_picture", profilePicture);
    }

    const res = await API.put(`/settings/users/${user_id}`, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    localStorage.setItem("username", res.data.username);
    localStorage.setItem("profile_picture", res.data.profile_picture || "");

    setEditing(false);
    alert("Profile updated!");
  } catch (err) {
    console.error(err);
    alert("Failed to save");
  }
}


  return (
    <div className="settings-container">

      <nav className="sidebar">
        <div className="logo">
          <span className="big-c">C</span>ense
        </div>
        <Link to="/HomePage" className="nav-btn">Home</Link>
        <Link to="/expenses" className="nav-btn">Expenses</Link>
        <Link to="/tracker" className="nav-btn">Tracker</Link>
        <Link to="/predictions" className="nav-btn">Predictions</Link>
        <Link to="/suggestions" className="nav-btn">Suggestions</Link>
      </nav>

      <main className="main">

        <button className="back-btn-fixed" onClick={() => navigate(-1)}>
          ⬅
        </button>

        <aside className="side-links">
          <Link to="/settings/account-management">Account management</Link>
          <Link to="/settings/other-accounts">Other accounts</Link>
          <Link to="/settings/privacy-data">Privacy and data</Link>
        </aside>

        <h1>Profile – {formData.username}</h1>

        <div className="profile-card">

          {!editing && (
            <div className="profile-view">

                <img
                  src={getProfilePictureSrc()}
                  alt="Profile"
                  className="profile-placeholder"
                  style={{ width: "90px", height: "90px", borderRadius: "50%" }}
                />

              <h2 style={{ fontWeight: 700, marginTop: "10px" }}>
                {formData.username}
              </h2>

              <button
                className="save-btn"
                onClick={() => setEditing(true)}
                style={{ marginTop: "20px" }}
              >
                Edit Profile
              </button>
            </div>
          )}

          {editing && (
            <div className="profile-edit">

                <img
                  src={getProfilePictureSrc()}
                  alt="Profile"
                  className="profile-placeholder"
                  style={{ width: "90px", height: "90px", borderRadius: "50%" }}
                />

              <label className="change-btn" style={{ marginTop: "10px" }}>
                Change Photo
                <input type="file" hidden onChange={handleChangePhoto} />
              </label>

              <div className="form-group" style={{ marginTop: "20px" }}>
                <label>Username</label>
                <input
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </div>

              <button className="save-btn" onClick={handleSave}>
                Save Changes
              </button>

              <button
                className="cancel-btn"
                onClick={() => setEditing(false)}
                style={{ marginTop: "8px" }}
              >
                Cancel
              </button>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
