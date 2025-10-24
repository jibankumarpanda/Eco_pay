import React, { useState } from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import FeatureSection from "./FeatureSection";
import ImpactSection from "./ImpactSection";
import Login from "./Login";
import "./App.css";

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="app">
      <Navbar onLoginClick={() => setShowLogin(true)} />

      {showLogin ? (
        <Login onBack={() => setShowLogin(false)} />
      ) : (
        <>
          <HeroSection />
          <FeatureSection />
          <ImpactSection />
        </>
      )}
    </div>
  );
}

export default App;
