const User = require("../modals/user-modal"); // Import user schema

const authMiddleware = async (req, res, next) => {
  try {
    // Fetch the phone number from cookies, headers, or localStorage equivalent
    let phoneNumber = req.cookies.phoneNumber || req.headers["phone-number"];
    console.log("*** Original Phone Number:", phoneNumber);

    if (!phoneNumber) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Normalize the phone number by removing '+91' prefix using replace
    phoneNumber = phoneNumber.replace(/^(\+91)/, ""); // Remove the "+91" prefix
    console.log("*** Normalized Phone Number:", phoneNumber);

    // Find user by normalized phone number in the database
    const user = await User.findOne({ "uProfile.uPhone": phoneNumber });

    console.log("User found:", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach the user object to the request for further use
    req.user = user;

    next();
  } catch (error) {
    console.error("Error in auth middleware:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = authMiddleware;
