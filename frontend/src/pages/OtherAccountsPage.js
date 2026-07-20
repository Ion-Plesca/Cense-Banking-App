import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Settings.css";

export default function OtherAccountsPage() {
  const navigate = useNavigate();

  const sections = [
    {
      title: "Linked Accounts",
      content: "Connect or disconnect accounts from other services such as Google, Facebook, or Apple for easy login and sharing."
    },
    {
      title: "Data Sharing Preferences",
      content: "Control what information is shared with linked accounts and third-party services."
    },
    {
      title: "Support",
      content: "Contact our support team for any questions regarding linked accounts or third-party access."
    }
  ];

  return (
    <div className="settings-container">
      <main className="main">
        <button className="back-btn-fixed" onClick={() => navigate(-1)}>⬅</button>

        <h1>Other Accounts</h1>
        <p className="subtitle">
          Manage connections with other services and apps.
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
