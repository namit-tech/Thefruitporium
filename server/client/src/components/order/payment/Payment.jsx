

import React, { useState, useEffect } from "react";
import "./payment.css";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;
// const apiUrl = "http://localhost:5000";

function Payment() {
  const [amount, setAmount] = useState(100); // Set the amount in INR
  const [customer, setCustomer] = useState(null); // State to store customer details
  const [cartItems, setCartItems] = useState([]); // State to store cart items
  console.log("amount", amount);

  // Fetch customer details when the component mounts
  useEffect(() => {
    const fetchCustomerDetails = async () => {
      const userPhone = localStorage.getItem("userPhone");
      console.log("localstorage", userPhone);
      try {
        // Adjust the API URL to fetch customer details based on a user ID or other criteria
        const response = await axios.get(
          `${apiUrl}/api/users/getcustomerdetails`,
          {
            headers: { "Phone-Number": userPhone },
          }
        );
        console.log("response payment", response.data);

        setCustomer(response.data);
      } catch (error) {
        console.error("Error fetching customer details:", error);
      }
    };

    const fetchCartItems = async () => {
      const userPhone = localStorage.getItem("userPhone");
      try {
        const response = await axios.get(
          `${apiUrl}/api/cart/cartpage`,
          {
            headers: {
              Authorization: `Bearer ${userPhone}`,
              "phone-number": userPhone,
            },
          }
        ); // Update the endpoint to fetch cart items
        setCartItems(response.data.items);
        console.log("response card data", response.data.items);

        // Calculate the total amount for the payment based on the cart
        const totalAmount = response.data.items.reduce((total, item) => {
          const itemPrice =
            item.productDetails?.by_size?.find(
              (sizeObj) => sizeObj.size === item.size
            )?.price || 0;
          return total + item.quantity * itemPrice;
        }, 0);
        setAmount(totalAmount); // Update the amount to the total cart value
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCustomerDetails();
    fetchCartItems();
  }, []);

  const handlePayment = async () => {
    if (!customer) {
      alert("Customer details not found.");
      return;
    }

    try {
      // 1. Create an order on the server-side
      const data = await axios.post(`${apiUrl}/api/create-order`, {
        amount,
      });
      console.log("amount data", data.data);

      const options = {
        key:process.env.REACT_APP_RAZOR_KEY, // Razorpay Key ID
        amount: amount * 100, // Convert amount to paise
        currency: "INR",
        name: "The Fruitporium",
        description: "Payment for your order",
        order_id: data.data.id, // Order ID from the server
        handler: function (response) {
          // Handle successful payment
          const { payment_id, order_id, signature } = response;

          // 2. Verify the payment on the server-side
          axios
            .post("/verify-payment", {
              payment_id,
              order_id,
              signature,
            })
            .then((res) => {
              alert("Payment Successful");
            })
            .catch((error) => {
              alert("Payment Verification Failed");
            });
        },
        prefill: {
          name: customer.uProfile.uName, // Customer's name from the fetched data
          email: customer.uCredentials.uEmail, // Customer's email from the fetched data
          contact: customer.uProfile.uPhone, // Customer's phone number from the fetched data
        },
        theme: {
          color: "#709f41", // Custom color for Razorpay button
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open(); // Open the Razorpay payment modal
    } catch (error) {
      console.error("Error creating payment order", error);
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => {
      // Add check for undefined `productDetails` and `by_size`
      const sizeDetails = item.size;
      console.log("sizedetailpayment", sizeDetails);

      const itemPrice = sizeDetails?.price || 0; // Default to 0 if no size details are found
      return sum + item.quantity * itemPrice;
    }, 0);
  };

  return (
    <div className="payment">
      <h1>Complete Your Payment</h1>

      <div className="order-summary">
        <h2>Order Summary</h2>
        <div className="order-details">
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => {
              // Safely access `productDetails` and `by_size`
              const sizeDetails = item.size;
              return (
                <div key={index} className="order-item">
                  <div>
                    {item.productDetails.Name || "Unnamed Product"} ({item.size}
                    )
                  </div>
                  <div>
                    {item.quantity} x Rs {sizeDetails?.price || "N/A"}
                  </div>
                </div>
              );
            })
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>

        <div className="subtotal">
          <p>Subtotal: Rs {calculateSubtotal()}</p>
          <p>Delivery: Rs 0</p>
        </div>

        <div className="total">
          <h3>Total: Rs {amount}</h3>
        </div>
      </div>

      <button className="paynow-btn" onClick={handlePayment}>
        Pay Now
      </button>
    </div>
  );
}

export default Payment;


