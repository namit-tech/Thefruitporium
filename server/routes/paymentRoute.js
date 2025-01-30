// routes/paymentRoutes.js
const express = require("express");
const router = express.Router();
const paymentController = require("../controller/paymentController");

router.post("/:id", paymentController.createPaymentLink);  // Create payment link
router.get("/", paymentController.updatePaymentInformation);  // Update payment information

module.exports = router;
