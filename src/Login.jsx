import React, { useState } from "react";
import axios from "axios";

export default function LoginPage() {
  const [gmail, setGmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);

  const backendUrl = "https://eco-pay-8.onrender.com/api/otp";

  const sendOtp = async () => {
    try {
      const response = await axios.post(`${backendUrl}/send`, { gmail, phone });
      console.log("OTP Response:", response.data);
      alert("OTP sent successfully!");
      setStep(2);
    } catch (err) {
      console.error("OTP Error:", err.response?.data || err.message);
      alert(`Failed to send OTP: ${err.response?.data?.message || err.message}`);
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await axios.post(`${backendUrl}/verify`, { phone, code: otp });
      if (res.data.success) {
        alert("Login successful!");
      } else {
        alert("Invalid OTP");
      }
    } catch (err) {
      alert("Verification failed");
    }
  };

  return (
    <div className="login-container">
      {step === 1 && (
        <div className="login-form">
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Gmail"
            value={gmail}
            onChange={(e) => setGmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button onClick={sendOtp}>Send OTP</button>
        </div>
      )}

      {step === 2 && (
        <div className="otp-form">
          <h2>Enter OTP</h2>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={verifyOtp}>Verify OTP</button>
        </div>
      )}
    </div>
  );
}
