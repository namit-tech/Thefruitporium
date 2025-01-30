const express = require("express");
const router = express.Router();
const user = require("../modals/user-modal");
const authMiddleware = require("../middlewares/Auth");

// Fetch saved addresses for the logged-in user
// router.get("/address", authMiddleware, async (req, res) => {
//   try {
//     const phoneNumber = req.user.uProfile.uPhone; // Access phone number from authenticated user's profile
//     console.log("phonenumber", phoneNumber);

//     // Find addresses associated with this phone number (uProfile.uPhone)
//     const addresses = await user.find({ "uProfile.uPhone": phoneNumber });
//     console.log("addressphnNo.", addresses);

//     res.json(addresses);
//   } catch (error) {
//     console.error("Error fetching addresses:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// // Save a new address for the logged-in user
// router.post("/address", authMiddleware, async (req, res) => {
//   try {
//     const {
//       apartmentName,
//       apartmentNumber,
//       area,
//       street,
//       pincode,
//       latitude,
//       longitude,
//     } = req.body;
//     console.log("adress", req.body);

//     const phoneNumber = req.user.uProfile.uPhone; // Get phone number from authenticated user

//     const newAddress = new Address({
//       phone: phoneNumber, // Save the phone number for the address
//       apartmentName,
//       apartmentNumber,
//       area,
//       street,
//       pincode,
//       latitude,
//       longitude,
//     });

//     await newAddress.save();
//     console.log("new adress", newAddress);

//     res.json({ message: "Address saved successfully", address: newAddress });
//   } catch (error) {
//     console.error("Error saving address:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// Fetch saved addresses for the logged-in user
router.get("/address", authMiddleware, async (req, res) => {
  try {
    const phoneNumber = req.user.uProfile.uPhone; // Access phone number from authenticated user's profile

    // Find the user by phone number and retrieve their addresses
    const userData = await user.findOne({ "uProfile.uPhone": phoneNumber });

    if (!userData || !userData.uAddress) {
      return res.status(404).json({ message: "No saved addresses found" });
    }

    res.json(userData.uAddress); // Send the address array back to the frontend
  } catch (error) {
    console.error("Error fetching addresses:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Save a new address for the logged-in user
router.post("/address", authMiddleware, async (req, res) => {
    try {
      // Destructuring the address fields from the request body
      const { uHouseNumber, uArea, uCity, uZipCode } = req.body;
  
      // Fetch phone number from the authenticated user (from the middleware)
      const phoneNumber = req.user.uProfile.uPhone;
      console.log("Posted phone number:", phoneNumber);
  
      // Validation to ensure address fields are provided
      if (!uHouseNumber || !uArea || !uCity || !uZipCode) {
        return res.status(400).json({ message: "All address fields are required" });
      }
  
      // Find the user by phone number and update their address
      const updatedUser = await user.findOneAndUpdate(
        { "uProfile.uPhone": phoneNumber },
        {
          $set: {
            "uAddress.uHouseNumber": uHouseNumber,
            "uAddress.uArea": uArea,
            "uAddress.uCity": uCity,
            "uAddress.uZipCode": uZipCode,
          },
        },
        { new: true } // This ensures that the updated document is returned
      );
  
      console.log("updated user", updatedUser);
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Send response with the updated address data
      res.json({
        message: "Address saved successfully",
        address: updatedUser.uAddress, // Send back the updated address object
      });
    } catch (error) {
      console.error("Error saving address:", error);
      res.status(500).json({ message: "Server Error" });
    }
  });
  

module.exports = router;
