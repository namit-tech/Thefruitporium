import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AdminDashboard from "../../AdminDashboard";
import anaar from "../../../../assets/anaar.JPG";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import "./adminorderdetails.css";
import AdminNavbar from "../../Navbar/AdminNavbar";

// const apiUrl = "http://localhost:5000";

const AdminOrderDetails = () => {
  const { id } = useParams();
  console.log("Fetching details for order:", id);
  const [orderDetails, setOrderDetails] = useState(null); // Start with null
  console.log("orderdetails", orderDetails);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/orders/${id}`);
        setOrderDetails(response.data);
        console.log("res order", response.data);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
  }, [id]);

  // If orderDetails is not available yet, return loading message
  if (!orderDetails) {
    return <div>Loading...</div>;
  }

  const products = orderDetails.products || [];

  const printOrderDetails = () => {
    const printContent = document.getElementById("order-details").innerHTML;
    const printWindow = window.open("", "_blank", "width=800,height=600");
    printWindow.document.write("<html><head><title>Order Details</title><style>");
    printWindow.document.write(`
      body {
        font-family: Arial, sans-serif;
        margin: 20px;
      }
      h4 {
        font-size: 20px;
        margin-bottom: 10px;
      }
      .order-head-print, .order-details-info, .payment-order-pricing, .customer-order-info {
        margin-bottom: 20px;
      }
      .mail-phone p {
        display: inline-block;
        margin-left: 10px;
      }
      .gray-span p {
        color: gray;
      }
      @media print {
        .order-head-print button {
          display: none;
        }
      }
    `);
    printWindow.document.write("</style></head><body>");
    printWindow.document.write(printContent);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <>
      <AdminDashboard />
      <AdminNavbar/>
      <div className="order-head-print">
        <p>Order: {orderDetails._id}</p>
        <button onClick={printOrderDetails}>Print</button>
      </div>
      <div id="order-details">
        <div className="order-details-info">
          <h4>Products Ordered</h4>
          {products.length > 0 ? (
            products.map((product) => (
              <div className="details-info" key={product.prodId}>
                <div className="order-product-info">
                  <img src={anaar} alt={product.pName} />
                  <p>{product.pName}</p>
                </div>
                <div className="price-qty">
                  <p>{product.price}</p>
                  <p>Qty: {product.quantity}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No products available</p> // Show a message if products array is empty
          )}
        </div>
        <div className="payment-order-pricing">
          <div className="payment-order-head">
            <h4>Payment</h4>
            <p>{orderDetails.status}</p>
          </div>
          <div className="text-amount gray-span">
            <p>Subtotal</p>
            <p>{orderDetails.totalPrice}</p>
          </div>
          <div className="text-amount gray-span">
            <p>Shipping</p>
            <p>{orderDetails.shipping}</p>
          </div>
          <div className="text-amount gray-span">
            <p>Total</p>
            <p>{orderDetails.totalPrice}</p>
          </div>
          <hr />
          <div className="text-amount">
            <p>Customer Payment</p>
            <p>{orderDetails.totalPrice}</p>
          </div>
        </div>
        <div className="customer-order-info">
          <h4>Customer</h4>
          <div className="customer-name">
            <p>{orderDetails.uEmail}</p>
            <p>{orderDetails.uPhone}</p>
          </div>
          <hr />
          <div className="mail-phone">
            <FontAwesomeIcon icon={faEnvelope} />
            <p>{orderDetails.uEmail}</p>
          </div>
          <div className="mail-phone">
            <FontAwesomeIcon icon={faPhone} />
            <p>{orderDetails.uPhone}</p>
          </div>
          <hr />
          <h4>Shipping Address</h4>
          <p>{orderDetails.uAddress}</p>
        </div>
      </div>
    </>
  );
};

export default AdminOrderDetails;
