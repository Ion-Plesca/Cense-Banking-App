import React from "react";
import "../index.css";

// Simple header component — shows a logo image and optional nav area.
export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <div className="logo">
          {/* Load logo from public/images so you can replace it without rebuilding */}
          <img src="/images/logo.png" alt="logo" className="logo-img" />
        </div>
        {/* Optional nav area — add links or user menu here */}
        <nav className="site-nav">
          {/* <a href="#">Home</a> */}
        </nav>
      </div>
    </header>
  );
}
