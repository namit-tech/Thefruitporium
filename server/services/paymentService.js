// services/paymentService.js
const razorpay = require("../config/RazorpayClient");
// const orderService = require("./orderService");

const createPaymentLink = async (orderId) => {
  try {
    const order = await orderService.findOrderById(orderId);  // Fetch order by ID
    
    const paymentLinkRequest = {
      amount: order.totalPrice * 100,  // Convert INR to paise
      currency: "INR",
      customer: {
        name: order.user.firstName + " " + order.user.lastName,  // Full name of customer
        contact: order.user.mobile,  // Customer phone number
        email: order.user.email,  // Customer email
      },
      notify: {
        sms: true,  // Send SMS notification
        email: true,  // Send email notification
      },
      reminder_enable: true,  // Enable reminders for payment
      callback_url: `${process.env.FRONTEND_URL}/payment/callback`,  // URL to redirect after payment
      callback_method: "get",  // Method to use for callback
    };

    const paymentLink = await razorpay.paymentLink.create(paymentLinkRequest);

    return {
      paymentLinkId: paymentLink.id,
      payment_link_url: paymentLink.short_url,  // Payment link URL
    };
  } catch (error) {
    throw new Error("Error creating payment link");
  }
};

const updatePaymentInformation = async (reqData) => {
  const paymentId = reqData.payment_id;
  const orderId = reqData.order_id;

  try {
    const order = await orderService.findOrderById(orderId);
    const payment = await razorpay.payments.fetch(paymentId);  // Fetch payment details by ID

    if (payment.status === "captured") {
      order.paymentDetails.paymentId = paymentId;
      order.paymentDetails.status = "COMPLETED";
      order.orderStatus = "PLACED";

      await order.save();  // Update order with payment details
    }

    return { message: "Your order is placed", success: true };
  } catch (error) {
    throw new Error("Error in updating payment information");
  }
};

module.exports = {
  createPaymentLink,
  updatePaymentInformation,
};
