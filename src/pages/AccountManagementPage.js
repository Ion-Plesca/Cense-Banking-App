import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Settings.css";

export default function AccountManagementPage() {
  const navigate = useNavigate();

  const sections = [
    {
      title: "Profile Information",
      content: "Update your name, username, profile picture, and other personal details to keep your account current."
    },
    {
      title: "Password & Security",
      content: "Change your password regularly, enable two-factor authentication, and manage security questions to keep your account safe."
    },
    {
      title: "Account Preferences",
      content: "Customize your notification settings, language preferences, and privacy options to fit your needs."
    },
    {
      title: "Deactivate or Delete Account",
      content: "You can temporarily deactivate your account or permanently delete it. Please note that deletion is irreversible."
    },
    {
      title: "Support",
      content: "For help with account issues, contact our support team through the app or email us at support@example.com."
    }
  ];

  return (
    <div className="settings-container">
      <main className="main">
        <button className="back-btn-fixed" onClick={() => navigate(-1)}>⬅</button>

        <h1>Account Management</h1>
        <p className="subtitle">
          Manage your account settings and personal information.
        </p>

        <div className="grid-container">
          {sections.map((section, index) => (
            <div key={index} className="grid-row">
              <div className="heading-card">
                <h2>{section.title}</h2>
              </div>
              <div className="privacy-card">
                <p>{section.content}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
