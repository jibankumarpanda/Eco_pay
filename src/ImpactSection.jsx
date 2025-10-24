import React from "react";

const StatCard = ({ value, label }) => (
  <div className="stat-card">
    <div className="stat-value">{value}</div>
    <div className="stat-label">{label}</div>
  </div>
);

const ImpactSection = () => (
  <section className="impact-section">
    <h2 className="impact-title">Eco Impact Stats</h2>
    <div className="stats-container">
      <StatCard value="75,000+" label="Trees planted" />
      <StatCard value="125 tons" label="CO2 offset monthly" />
      <StatCard value="99.9%" label="Energy reduction" />
      <StatCard value="$2.5M" label="To eco projects" />
    </div>
    <a href="#" className="view-report-link">
      △ View Full Impact Report
    </a>
  </section>
);

export default ImpactSection;
