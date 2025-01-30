const express = require("express");
const router = express.Router();
const speakeasy = require("speakeasy");
const QRCode = require("qrcode");

let tempSecret; // Store the temporary secret in memory
let userSecret; // Store the user's secret after verific

// Setup Google Authenticator
router.get("/setup-google-auth", async (req, res) => {
  tempSecret = speakeasy.generateSecret();
  const qrCode = await QRCode.toDataURL(tempSecret.otpauth_url);
  res.json({ qrCode });
});

// Verify Google Authenticator during setup
router.post("/check-google-auth", (req, res) => {
  const { token } = req.body;
  console.log("token", token);

  const verified = speakeasy.totp.verify({
    secret: tempSecret.base32,
    encoding: "base32",
    token,
  });
  console.log("check verify", verified);

  if (verified) {
    userSecret = tempSecret.base32;
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

// Check if Google Authenticator is enabled
router.get("/check-google-auth", (req, res) => {
  const enabled = !!userSecret;
  console.log("enabled", enabled);

  res.json({ enabled });
});


router.post("/google-login", (req, res) => {
  const { code } = req.body;
  console.log("code", code);

  const verified = speakeasy.totp.verify({
    secret: userSecret,
    encoding: "base32",
    token: code,
  }); 
  console.log("verified", verified);

  if (verified) {
    res.json({ success: true, token: "your-jwt-token" });
  } else {
    res.json({ success: false });
  }
});

module.exports = router;
