import express from "express";
import pool from "../db.js";
import twilio from "twilio";

const router = express.Router();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_SERVICE_SID; // Twilio Verify service
const client = twilio(accountSid, authToken);

// Send OTP
router.post("/send", async (req, res) => {
  const { phone, gmail } = req.body;
  try {
    await client.verify.v2.services(serviceSid).verifications.create({
      to: `+91${phone}`, // change for your country
      channel: "sms",
    });

    // Save phone + gmail to DB
    await pool.query(
      "INSERT INTO users (gmail, phone) VALUES ($1, $2) ON CONFLICT (phone) DO NOTHING",
      [gmail, phone]
    );

    res.json({ success: true, message: "OTP sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error sending OTP" });
  }
});

// Verify OTP
router.post("/verify", async (req, res) => {
  const { phone, code } = req.body;
  try {
    const verification = await client.verify.v2
      .services(serviceSid)
      .verificationChecks.create({ to: `+91${phone}`, code });

    if (verification.status === "approved") {
      // Mark verified in DB
      await pool.query(
        "UPDATE users SET verified = true WHERE phone = $1",
        [phone]
      );
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
