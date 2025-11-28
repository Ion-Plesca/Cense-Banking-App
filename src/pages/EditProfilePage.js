import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Settings.css"; // reuse existing styles

export default function EditProfilePage() {
  const navigate = useNavigate();

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
      <main className="main">
        {/* Back button */}
        <button className="back-btn-fixed" onClick={() => navigate(-1)}>
          ⬅
        </button>

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
      </main>
    </div>
  );
}
