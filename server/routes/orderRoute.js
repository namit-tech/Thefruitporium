const express = require("express");
const router = express.Router();
const razorpay = require("../config/RazorpayClient");
const Order = require("../modals/order-modal"); // Import the order schema

router.post("/create-order", async (req, res) => {
  const { amount } = req.body;
  console.log("amount", amount);

  if (!amount) {
    return res.status(400).json({ error: "Amount is required" });
  }

  try {
    const options = {
      amount: amount * 100, // Amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    console.log("options order", options);

    const order = await razorpay.orders.create(options);
    console.log("order", order);

    res.status(200).json(order);
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ error: "Failed to create Razorpay order" });
  }
});

// Route to save order details
router.post("/save-order", async (req, res) => {
  const { orderId, userId, uEmail, products, totalPrice } = req.body;

  if (!orderId || !userId || !uEmail || !products || !totalPrice) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const order = new Order({
      orderId,
      userId,
      uEmail,
      products,
      totalPrice,
    });

    await order.save();
    res.status(201).json({ message: "Order saved successfully", order });
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ error: "Failed to save order" });
  }
});

// Route to fetch user orders
router.get("/get-user-orders", async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const orders = await Order.find({ userId });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find(); // Fetch all orders from the database
    res.json(orders); // Send the orders as a response
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/orders/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract the _id from the URL parameters
    console.log("orderid", id);

    // Find the order by its _id
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order); // Send the order details as a response
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/orders/:id", async (req, res) => {
  try {
      const { id } = req.params;
      console.log("id del order", id);
      await Order.findByIdAndDelete(id);
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete product", error });
    }
})

module.exports = router;
