import React from "react";
import "../styles/HomePage.css";
import { Link, Navigate } from "react-router-dom";
import backgroundImg from "../assets/background.jpg";
import "@fontsource/bangers";
import "@fontsource/luckiest-guy";
import "@fontsource/permanent-marker";
import "@fontsource/anton";



function HomePage({ user }) {
  if (!user?.user_id) {
    return <Navigate to="/login" />;
  }

  return (
    <div
      className="homepage"
      style={{
        backgroundImage: `url(${backgroundImg})`,
      }}
    >
      <div className="homepage-overlay"></div>

      <div className="homepage-content">
        <div className="hero-section">
          <h1 className="hero-title">Welcome to CENSE</h1>
          <p className="hero-subtitle">Smart Budgeting for Smart Students</p>
        </div>

        <div className="panel-grid">
          <div className="panel about-panel">
            <h2 className="panel-title">About Cense</h2>
            <p className="panel-text">
              Cense is a <strong>student budgeting</strong> application that combines:
            </p>

            <ul className="feature-list">
              <li className="f-red">Trackers</li>
              <li className="f-green">Predicitons</li>
              <li className="f-blue">Suggestions</li>
              <li className="f-yellow">Expense Management</li>
            </ul>

            <p className="panel-text">All in one easy-to-use platform.</p>
          </div>

          <div className="panel testimonials-panel">
            <h2 className="panel-title">Testimonials</h2>

            <div className="testimonial">
              <p className="quote">"Lifesaver"</p>
              <p className="t-name">Jessie — Commuting Student</p>
            </div>

            <div className="testimonial">
              <p className="quote">"Amazing"</p>
              <p className="t-name">Kelly — Renting Student</p>
            </div>

            <div className="testimonial">
              <p className="quote">"Informative"</p>
              <p className="t-name">Daniel — Mature Student</p>
            </div>
          </div>
        </div>

        <Link to="/settings" className="settings-fab">⚙️</Link>
      </div>
    </div>
  );
}

export default HomePage;
