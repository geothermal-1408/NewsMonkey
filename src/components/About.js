import React from "react";

export default function About() {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>News Monkey</h1>
        <p>know what's going on Earth 🌏</p>
      </div>
      <div className="about-content">
        <div className="about-section">
          <p>Go through Different Genres of News and keep updated yourself</p>
        </div>

        <div className="about-section">
          <h2>Created By </h2>
          <div className="team">
            <div className="team-member">
              <img src="/newsmonkey_logo.jpg" alt="Team Member" />
              <h3>Savvy</h3>
              <p>Noob devloper</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
