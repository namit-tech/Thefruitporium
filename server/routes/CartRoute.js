const express = require("express");
const Cart = require("../modals/cart-modal");
const Product = require("../modals/product-modal");
const User = require("../modals/user-modal");
const { isLoggedIn } = require("../middlewares/isLoggedIn");
const router = express.Router();


router.get("/cartpage", isLoggedIn, async (req, res) => {
  const userId = req.user.userId; // Get the user ID from the logged-in user
  console.log("userid:", userId);

  try {
    // Fetch the cart document for the user
    const cart = await Cart.findOne({ userId });
    console.log("Cart without populate:", cart);

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Populate the productId in the items of the cart
    const populatedCart = await Cart.findOne({ userId }).populate(
      "items.productId"
    );

    console.log("Populated cart:", populatedCart);

    // Check if there are no items in the cart
    if (!populatedCart.items.length) {
      return res.status(404).json({ message: "No items in the cart" });
    }

    // Enrich the cart items by adding product details
    const enrichedCart = populatedCart.items.map((item) => {
      const product = item.productId;
      return {
        ...item.toObject(),
        productDetails: product,
        quantity: item.quantity, // Include quantity here
      };
    });

    console.log("Enriched Cart:", enrichedCart);

    // Send the enriched cart items back as a response
    res.json({ items: enrichedCart });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// POST endpoint for syncing cart
router.post("/sync", isLoggedIn, async (req, res) => {
  const {cartItems} = req.body;
  console.log("cartitemsbackend", cartItems);

  const userId = req.user?.userId;

  // Check if userId exists
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  // Validate cartItems format
  if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
    return res.status(400).json({ error: "Cart items are required" });
  }

  try {
    // Log data for debugging
    console.log("User ID:", userId);
    console.log("Cart items:", cartItems);

    // Update or create the cart
    const updatedCart = await Cart.findOneAndUpdate(
      { userId },
      {
        items: cartItems.map((item) => ({
          ...item,
          quantity: item.quantity || 1, // Default to 1 if quantity is missing
        })),
      },
      { new: true, upsert: true }
    );

    console.log("Updated cart:", updatedCart);

    res.json(updatedCart);
  } catch (err) {
    console.error("Error in syncing cart:", err.message);
    res.status(500).json({ error: "Failed to sync cart" });
  }
});

// Fetch Cart
router.get("/cart", isLoggedIn, async (req, res) => {
  const userId = req.query.userId || req.user.userId;
  console.log("useridnumeric:", userId);
  try {
    const cart = await Cart.findOne({ userId });
    res.json(cart || { items: [] });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cart" });
  }
});

router.get("/:userId", isLoggedIn, async (req, res) => {
  const userId = req.user.userId;
  console.log("userid**", userId);
  try {
    let phoneNumber = req.headers["phone-number"];
    console.log("LoggedIn PhoneNumber:", phoneNumber);

    phoneNumber = phoneNumber.replace(/^(\+91)/, "");
    const user = await User.findOne({ "uProfile.uPhone": phoneNumber });

    if (!phoneNumber) {
      return res.status(400).json({ message: "Phone number is required" });
    }
    console.log("user", user);

    if (!User) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ userId: user.userId });
  } catch (error) {
    console.error("Error in /getuserid route:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
