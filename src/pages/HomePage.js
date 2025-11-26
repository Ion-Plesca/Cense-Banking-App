import React from "react";
import "../styles/HomePage.css";
import { Link } from "react-router-dom";
import "../components/Navbar.js";


function HomePage() {
  return (
    <div className="homepage-container">

      <div className="homepage-content">

        {/* Left Section: About Cense */}
        <div className="about-section">
          <h3 className="section-heading">A bit About Cense</h3>

          <div className="about-box">
            <p>
              Cense is a <strong>student budgeting</strong> application that
              combines
            </p>
            <p className="green-text">FINANCIAL</p>
            <p className="green-text">SUGGESTIONS,</p>
            <p className="blue-text">Predictions,</p>
            <p className="red-text">Trackers</p>
            <p className="yellow-text">Expenses</p>
            <p>all into one application.</p>
          </div>
        </div>

        {/* Divider */}
        <div className="vertical-divider"></div>

        {/* Right Section: Testimonials */}
        <div className="testimonial-section">
          <h3 className="section-heading">Testimonials</h3>

          <div className="testimonial-card">
            <p className="quote">"Lifesaver"</p>
            <div className="testimonial-profile blue"></div>
            <p className="name">Jessie</p>
            <p className="role">Commuting Student</p>
          </div>

          <div className="testimonial-card">
            <p className="quote">"Amazing"</p>
            <div className="testimonial-profile yellow"></div>
            <p className="name">Kelly</p>
            <p className="role">Renting Student</p>
          </div>

          <div className="testimonial-card">
            <p className="quote">"Informative"</p>
            <div className="testimonial-profile purple"></div>
            <p className="name">Daniel</p>
            <p className="role">Mature Student</p>
          </div>
        </div>
      </div>

      {/* Bottom Settings Icon */}
<Link to="/settings" className="settings-link">
  <div className="settings-gear">⚙️</div>
</Link>

    </div>
  );
}

export default HomePage;
