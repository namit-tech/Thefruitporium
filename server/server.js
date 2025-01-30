// const express = require("express");
// const path = require("path");
// const app = express();
// const cookieParser = require("cookie-parser");
// const expressSession = require("express-session");
// const flash = require("connect-flash");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();
// const UserRouter = require("./routes/UserRouter");
// const AuthRouter = require("./routes/Auth");
// const ProductRouter = require("./routes/ProductRouter");
// const bodyParser = require("body-parser");

// // Middleware setup
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(cookieParser());
// app.use(
//   expressSession({
//     resave: false,
//     saveUninitialized: false,
//     secret: "secret key",
//   })
// );
// app.use(flash());

// // MongoDB connection
// const mongoURI = process.env.MONGO_URI;
// mongoose
//   .connect(mongoURI)
//   .then(() => console.log("MongoDB connected successfully"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// app.use("/api/users", UserRouter);
// app.use('/api/auth', AuthRouter);
// app.use("/api/", ProductRouter);

// app.use(express.static(path.join(__dirname, "../client/build"))); // Adjust the path to your build folder

// // The "catchall" handler: for any request that doesn't match one above, send back the React app.
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/build/index.html")); // Adjust the path to your build folder
// });

// // Start server
// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   console.log(`Server is running on port: ${port}`);
// });

const express = require("express");
const path = require("path");
const app = express();
const flash = require("connect-flash");
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3000", // Allow the frontend's origin explicitly
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Include OPTIONS for preflight
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "phone-number",
    "x-rtb-fingerprint-id",
  ], // Add custom headers here
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};
app.use(cors(corsOptions));

const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const mongoose = require("mongoose");
require("dotenv").config();
const UserRouter = require("./routes/UserRouter");
const AuthRouter = require("./routes/Auth");
const ProductRouter = require("./routes/ProductRouter");
const MailRouter = require("./routes/mail"); // Import MailRouter
const deliveryRoutes = require("./routes/deliveryRoute");
const cartRoutes = require("./routes/CartRoute");
const AddressRoutes = require("./routes/AddressRoute");
const orderRoutes = require("./routes/orderRoute");
const eventRoutes = require("./routes/calendarRoute");
const googleRoutes = require("./routes/GoogleRoute");
const impressionRoutes = require("./routes/impressionRoute");
const PaymentControl = require("./controller/paymentController");
const bodyParser = require("body-parser");
// const paymentRouter = require("./routes/paymentRoute");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: "secret key",
  })
);
app.use(flash());

// MongoDB connection
const mongoURI = process.env.MONGO_URI;
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Route handling
app.use("/api/users", UserRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/", ProductRouter);
app.use("/api/mail", MailRouter);
app.use("/api", deliveryRoutes);
app.use("/api", AddressRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/", orderRoutes);
app.use("/api", PaymentControl);
app.use("/api", eventRoutes);
app.use("/api", impressionRoutes);
app.use("/", googleRoutes);
// app.use("/api/payments", paymentRouter);

if (process.env.NODE_ENV === "production") {
  const path = require("path");
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Start server
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
