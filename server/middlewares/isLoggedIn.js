const userModel = require("../modals/user-modal");
const jwt = require("jsonwebtoken");
const Admin = require("../modals/owner-modal");
const mongoose = require("mongoose");

const isLoggedIn = async (req, res, next) => {
  try {
    let phoneNumber = req.cookies.phoneNumber || req.headers["phone-number"];
    console.log(
      "LoggedIn PhoneNumber Raw:",
      req.cookies.phoneNumber,
      req.headers["phone-number"]
    );

    if (!phoneNumber) {
      req.flash("error", "You need to log in first");
      return res.redirect("/");
    }

    phoneNumber = phoneNumber.replace(/^(\+91)/, "");
    const user = await userModel.findOne({ "uProfile.uPhone": phoneNumber });

    if (!user) {
      req.flash("error", "You need to log in first");
      return res.redirect("/");
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Error in isLoggedIn Middleware:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const verifyAdmin = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, "yourJwtToken"); // Use the correct secret key here
    const adminId = decoded.AdminId; // Ensure you're using the string adminId
    console.log("Decoded Admin ID:", decoded.AdminId);


    // Query the database using the string adminId
    const admin = await Admin.findOne({ AdminId: adminId });
    console.log("admin", admin);
    

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    req.adminId = admin._id; // Use the admin's _id for future use if needed
    next();
  } catch (err) {
    console.error("Error verifying admin token:", err);
    res.status(403).json({ message: "Forbidden" });
  }
};

module.exports = { isLoggedIn, verifyAdmin };
