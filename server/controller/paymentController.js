// controller/paymentController.js

const express = require("express");
const router = express.Router();
const paymentService = require("../services/paymentService");
const razorpay = require("../config/RazorpayClient");
const crypto = require("crypto");

router.post("/createPaymentLink", async (req, res) => {
  try {
    const paymentLink = await paymentService.createPaymentLink(req.params.id);  // Pass order ID
    return res.status(200).json(paymentLink);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.post("/updatePaymentInformation", async (req, res) => {
  try {
    const paymentLink = await paymentService.updatePaymentInformation(req.query);  // Pass payment data
    return res.status(200).json({ message: "Payment information updated", status: true });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.post("/verifyPayment",  async (req, res) => {
    const { payment_id, order_id, signature } = req.body;
  
    const body = `${order_id}|${payment_id}`;
    const expectedSignature = razorpay.crypto.createHmac('sha256', process.env.RAZOR_SECRET)
      .update(body)
      .digest('hex');
  
    if (expectedSignature === signature) {
      // Signature is valid, update payment information
      try {
        await paymentService.updatePaymentInformation(req.body);
        return res.status(200).json({ success: true });
      } catch (error) {
        return res.status(500).json({ success: false, message: 'Error updating payment info' });
      }
    } else {
      return res.status(400).json({ success: false, message: 'Invalid signature' });
    }
  });

  router.post("/verify-payment", async (req, res) => {
    const { payment_id, order_id, signature } = req.body;
  
    if (!payment_id || !order_id || !signature) {
      return res.status(400).json({ error: "All fields are required" });
    }
  
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZOR_SECRET)
      .update(`${order_id}|${payment_id}`)
      .digest("hex");
  
    if (generatedSignature !== signature) {
      return res.status(400).json({ error: "Payment verification failed" });
    }
  
    res.status(200).json({ message: "Payment verified successfully" });
  });
  

module.exports = router;
;
