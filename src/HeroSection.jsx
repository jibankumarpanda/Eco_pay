import React from "react";

const HeroSection = () => (
  <section className="hero-section">
    <div className="hero-content">
      <p className="hero-tagline">Sustainable</p>
      <h1>
        <strong>Blockchain Payments</strong> for a Greener Future
      </h1>
      <p className="hero-description">
        Celo EcoPay combines the power of Celo's carbon-negative blockchain with
        easy payment solutions, helping you make eco-friendly financial choices
        every day.
      </p>
      <div className="hero-actions">
        <button className="btn btn-primary">Download App</button>
        <button className="btn btn-secondary">
          <span className="watch-icon"></span> Watch Demo
        </button>
      </div>
      <div className="hero-users">
        <div className="avatars-placeholder">👥</div>
        Joined by 10,000+ eco-conscious users
      </div>
    </div>
    <div className="hero-image-container">
      <div className="hero-image-placeholder"></div>
    </div>
  </section>
);

export default HeroSection;
