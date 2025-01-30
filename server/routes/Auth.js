const express = require("express");
const router = express.Router();
const Admin = require("../modals/owner-modal");
const { verifyAdmin } = require("../middlewares/isLoggedIn");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

// Function to generate JWT token
const generateToken = (AdminId) => {
  return jwt.sign({ AdminId }, "yourJwtToken", { expiresIn: "1h" }); // Replace 'yourSecretKey' with your own secret key
};

// Admin change password route
// Admin change password route
router.post("/admin/change-password", verifyAdmin, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const adminId = req.adminId; // Use adminId from the middleware

  try {
    const admin = await Admin.findById(adminId);

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect current password" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the password
    admin.password = hashedPassword;
    await admin.save();

    res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Admin login route
router.post("/admin/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("uesername", username);
  console.log("password", password);

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, admin.password);
    console.log("adminpassword", admin.password);
    console.log("adminpass", password);

    console.log("ismatch", isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Generate a token and send a response
    const token = generateToken(admin.AdminId); // Use the generateToken function
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Admin register route
router.post("/admin/register", async (req, res) => {
  const { username, password } = req.body;
  console.log("username", username);
  console.log("password", password);

  try {
    // Check if the admin already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: "Username already taken" });
    }

    const AdminId = uuidv4();
    const newAdmin = new Admin({
      AdminId,
      ...req.body,
    });
    console.log("newAdmin", newAdmin);

    await newAdmin.save();
    console.log("User saved:", newAdmin);
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    console.error("Error registering admin:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
