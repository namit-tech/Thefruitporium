const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  payment_id: {
    type: String,
    required: true,
  },
  order_id: {
    type: String,
    required: true,
  },
  signature: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Payment", paymentSchema);
