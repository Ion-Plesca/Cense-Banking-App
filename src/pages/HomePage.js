import React from "react";
import "../styles/HomePage.css";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="home-wrap">
      <div className="home-inner">

        <div className="left">
          <h3 className="heading">A bit About Cense</h3>

          <div className="about-box">
            <p>Cense is a <strong>student budgeting</strong> application that combines</p>
            <p className="green">FINANCIAL</p>
            <p className="green">SUGGESTIONS</p>
            <p className="blue">Predictions</p>
            <p className="red">Trackers</p>
            <p className="yellow">Expenses</p>
            <p>all into one application.</p>
          </div>
        </div>

        <div className="divider"></div>

        <div className="right">
          <h3 className="heading">Testimonials</h3>

          <div className="t-card">
            <p className="quote">"Lifesaver"</p>
            <div className="pf blue"></div>
            <p className="name">Jessie</p>
            <p className="role">Commuting Student</p>
          </div>

          <div className="t-card">
            <p className="quote">"Amazing"</p>
            <div className="pf yellow"></div>
            <p className="name">Kelly</p>
            <p className="role">Renting Student</p>
          </div>

          <div className="t-card">
            <p className="quote">"Informative"</p>
            <div className="pf purple"></div>
            <p className="name">Daniel</p>
            <p className="role">Mature Student</p>
          </div>
        </div>

        <Link to="/settings" className="gear-link">
          <div className="gear">⚙️</div>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
