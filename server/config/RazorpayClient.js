const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.REACT_APP_RAZOR_KEY, // Ensure .env has RAZOR_KEY defined
  key_secret: process.env.RAZOR_SECRET, // Ensure .env has RAZOR_SECRET defined
});

module.exports = razorpay;
