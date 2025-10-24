import express from "express";
import twilio from "twilio";

const router = express.Router();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_SERVICE_SID;

// Validate Twilio credentials
if (!accountSid || !authToken || !serviceSid) {
  console.error("Missing Twilio credentials in environment variables");
}

const client = twilio(accountSid, authToken);

// Send OTP
router.post("/send", async (req, res) => {
  const { phone, gmail } = req.body;
  
  // Validate input
  if (!phone || !gmail) {
    return res.status(400).json({ success: false, message: "Phone and email are required" });
  }
  try {
    // Send OTP via Twilio
    console.log(`Sending OTP to +91${phone}`);
    await client.verify.v2.services(serviceSid).verifications.create({
      to: `+91${phone}`,
      channel: "sms",
    });
    console.log("OTP sent successfully via Twilio");

    res.json({ success: true, message: "OTP sent successfully" });
  } catch (err) {
    console.error("Error sending OTP:", err.message);
    res.status(500).json({ 
      success: false, 
      message: "Error sending OTP",
      error: err.message 
    });
  }
});

// Verify OTP
router.post("/verify", async (req, res) => {
  const { phone, code } = req.body;
  
  // Validate input
  if (!phone || !code) {
    return res.status(400).json({ success: false, message: "Phone and code are required" });
  }
  try {
    const verification = await client.verify.v2
      .services(serviceSid)
      .verificationChecks.create({ to: `+91${phone}`, code });

    if (verification.status === "approved") {
      res.json({ success: true, message: "OTP verified successfully" });
    } else {
      res.status(400).json({ success: false, message: "Invalid OTP" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Verification failed" });
  }
});

export default router;
