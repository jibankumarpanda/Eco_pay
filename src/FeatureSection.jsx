import React from "react";

const FeatureCard = ({ icon, title }) => (
  <div className="feature-card">
    <div className="feature-icon">{icon}</div>
    <p>{title}</p>
  </div>
);

const FeatureSection = () => (
  <section className="feature-section" id="features">
    <p className="section-title">SECTION</p>
    <h2>Feature Highlights</h2>
    <p className="section-subtitle">
      Discover how Celo EcoPay is transforming blockchain payments while
      protecting our planet
    </p>
    <div className="feature-grid">
      <FeatureCard icon="🗱" title="Carbon-Negative" />
      <FeatureCard icon="🗲" title="Micro-Payments" />
      <FeatureCard icon="⚡" title="Energy Efficient" />
    </div>
  </section>
);

export default FeatureSection;
