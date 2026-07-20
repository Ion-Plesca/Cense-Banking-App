import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Settings.css";

export default function PrivacyDataPage() {
  const navigate = useNavigate();

  // Data for mapping headings and content
  const sections = [
    {
      title: "Data We Collect",
      content: "We may collect basic account information (name, username, profile photo), app usage statistics, and device information to improve your experience."
    },
    {
      title: "How We Use Your Data",
      content: "Your information is used to personalize your experience, provide core app functionality, and improve features. We do not share your data with third parties for advertising purposes without your consent."
    },
    {
      title: "Your Privacy Choices",
      content: "You can update your profile information, delete your account, and manage your data preferences through your account settings. We respect your right to control your personal information."
    },
    {
      title: "Security",
      content: "We implement industry-standard security measures to protect your data, including encrypted storage and secure connections."
    },
    {
      title: "Contact Us",
      content: "If you have questions about your privacy or how your data is used, you can contact our support team through the app or email us at support@example.com."
    }
  ];

  return (
    <div className="settings-container">
      <main className="main">
        <button className="back-btn-fixed" onClick={() => navigate(-1)}>⬅</button>

        <h1>Privacy & Data</h1>
        <p className="subtitle">
          Understand how your data is collected, stored, and used in our app.
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
