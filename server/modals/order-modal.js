// const mongoose = require("mongoose");

// const orderSchema = mongoose.Schema({
//         orderId: { type: String, required: [true, "orderId is required"] },
//         userId: { type: String, required: [true, "userId is required"] },
//         uEmail: { type: String, required: [true, "uEmail is required"] },
//         products: [
//           {
//             prodId: { type: String, required: [true, "_id is required"] },
//             pName: { type: String, required: [true, "pName is required"] },
//             quantity: { type: Number, required: [true, "quantity is required"] },
//             price: { type: Number, required: [true, "price is required"] },
//             image: { type: String, required: [true, "image is required"] },
//           },
//         ],
//         totalPrice: { type: Number, required: [true, "price is required"] },
//         transactionTime: { type: Date, default: new Date().toISOString() },
//     },
//     { collection: "Order", timestamps: true }
// )

// module.exports = mongoose.model("order", orderSchema);


const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    orderId: { type: String, required: [true, "orderId is required"] },
    userId: { type: String, required: [true, "userId is required"] },
    uEmail: { type: String, required: [true, "uEmail is required"] },
    uPhone: { type: String, required: [true, "uPhone is required"] },  // New field for phone number
    uAddress: { type: String, required: [true, "uAddress is required"] },  // New field for address
    products: [
      {
        prodId: { type: String, required: [true, "_id is required"] },
        pName: { type: String, required: [true, "pName is required"] },
        quantity: { type: Number, required: [true, "quantity is required"] },
        price: { type: Number, required: [true, "price is required"] },
        image: { type: String, required: [true, "image is required"] },
      },
    ],
    totalPrice: { type: Number, required: [true, "totalPrice is required"] },
    status: { type: String, enum: ["Pending", "Shipped", "Completed", "Cancelled"], default: "Pending" },  // New field for order status
    paymentMethod: { type: String, enum: ["Credit Card", "PayPal", "Bank Transfer", "Cash"], required: [true, "paymentMethod is required"] },  // New field for payment method
    transactionTime: { type: Date, default: new Date().toISOString() },
  },
  { collection: "Order", timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);



// rzp_live_ZijksfoZGq0YJ1