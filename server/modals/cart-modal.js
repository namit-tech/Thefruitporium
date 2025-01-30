const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      unique: true,
    },
    size: {
      type: String,
    },
    price: {
      type: Number,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1, // Default quantity is 1
    },
  },
  { _id: false } // Disable the creation of _id for each item in the array
);

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  items: [cartItemSchema], // Array of items in the cart
  createdAt: { type: Date, default: Date.now }, // Timestamp for cart creation
});

// Export the Cart model
module.exports = mongoose.model("Cart", cartSchema);

