import React from "react";

const Navbar = ({ onLoginClick }) => (
  <header className="navbar">
    <div className="navbar-logo">
      <span className="logo-icon">🌿</span>
      <span className="logo-text">Celo EcoPay</span>
    </div>
    <nav className="navbar-links">
      <a href="#features">Features</a>
      <a href="#how-it-works">How it Works</a>
      <a href="#ecosystem">Ecosystem</a>
      <a href="#faq">FAQ</a>
    </nav>
    <div className="navbar-actions">
      <a href="#" className="nav-log-in" onClick={(e) => { e.preventDefault(); onLoginClick(); }}>
        Log In
      </a>
      <button className="nav-get-started">Get Started</button>
    </div>
  </header>
);

export default Navbar;
