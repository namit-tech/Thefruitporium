const express = require("express");
const router = express.Router();
const User = require("../modals/user-modal");
const isLoggedIn = require("../middlewares/isLoggedIn");
const { v4: uuidv4 } = require("uuid");

// Create a new user
router.post("/create", async (req, res) => {
  try {
    console.log("Received data:", req.body);
    const { uProfile } = req.body;

    // Check if phone number exists
    const existingUser = await User.findOne({
      "uProfile.uPhone": uProfile.uPhone,
    });
    if (existingUser) {
      return res.status(400).json({ error: "Phone number already registered" });
    }

    const userId = uuidv4();
    const newUser = new User({
      userId,
      ...req.body,
    });
    await newUser.save();
    console.log("User saved:", newUser);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error saving user:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Server-side route to fetch all users (customers)
router.get("/customers", async (req, res) => {
  try {
    // Find all users (customers)
    const users = await User.find().select(
      "userId uCredentials uProfile uAddress"
    ); // Select only relevant fields
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/getcustomerdetails", async (req, res) => {
  try {
    // Fetch user details based on the userPhone (from cookies)
    let phoneNumber = req.cookies.phoneNumber || req.headers["phone-number"];
    console.log("*** payemnt Phone Number:", phoneNumber);

    if (!phoneNumber) {
      return res
        .status(401)
        .json({ message: "User not logged in or no phone number found" });
    }
    phoneNumber = phoneNumber.replace(/^(\+91)/, ""); // Remove the "+91" prefix
    const userData = await User.findOne({ "uProfile.uPhone": phoneNumber });
    console.log("byPhone", User);

    if (!userData) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json(userData); // Send the user details as a response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Get a user by userId
router.get("/:userId", async (req, res) => {
  try {
    // Find user by userId
    const user = await User.findOne({ userId: req.params.userId });
    console.log("User fetched:", user);

    // If user not found, send a 404 response
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send the user data in response
    res.status(200).json(user);
  } catch (error) {
    // Send error response in case of server error
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("userid", id);
    const user = await User.findById(id);
    console.log("userdata", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user details" });
  }
});

// Update a user by userId
router.post("/:userId", async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { userId: req.params.userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id del", id);
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product", error });
  }
});

// Delete a user by userId
// router.delete("/:userId", async (req, res) => {
//   try {
//     const deletedUser = await User.findOneAndDelete({
//       userId: req.params.userId,
//     });
//     if (!deletedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.status(200).json({ message: "User deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
router.get("/check-phone/:uPhone", async (req, res) => {
  try {
    const { uPhone } = req.params; // Extract the phone number from URL parameters
    console.log("Checking phone number:", uPhone); // Log the phone number

    const user = await User.findOne({ "uProfile.uPhone": uPhone }); // Query the database for the phone number
    console.log("Found user:", user); // Log the result

    if (user) {
      return res.status(200).json({ exists: true });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// router.get("/getuserid", isLoggedIn, async (req, res) => {
//   try {
//     const userId = req.user?.userId;
//     if (!userId) {
//       return res.status(404).json({ message: "User ID not found" });
//     }
//     res.status(200).json({ userId });
//   } catch (error) {
//     console.error("Error in getUserId route:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

module.exports = router;
