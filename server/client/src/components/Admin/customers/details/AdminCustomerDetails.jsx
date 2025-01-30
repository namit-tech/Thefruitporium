import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./admincustomerdetails.css";
import AdminDashboard from "../../AdminDashboard";
import AdminNavbar from "../../Navbar/AdminNavbar";

// const apiUrl = "http://localhost:5000";

const AdminCustomerDetails = () => {
  const { id: userId } = useParams(); // Correctly extract the user ID from URL params
  console.log("Extracted User ID:", userId);
  
  const [customer, setCustomer] = useState(null); // State to hold customer data
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/${userId}`);
        setCustomer(response.data); // Set fetched customer data
      } catch (error) {
        console.error("Error fetching customer details:", error);
        setError("Failed to fetch customer details.");
      } finally {
        setLoading(false); // Stop loading after API call
      }
    };

    if (userId) {
      fetchCustomerDetails(); // Trigger fetch if userId is available
    }
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <AdminDashboard />
      <AdminNavbar />
      <div className="customer-details">
        <h3>{customer?.uProfile?.uName || "Customer Name"}</h3>
        <div className="customer-info">
          <div className="customer-data">
            <h6>Email</h6>
            <p>{customer?.uCredentials?.uEmail || "N/A"}</p>
          </div>
          <div className="customer-data">
            <h6>Phone</h6>
            <p>{customer?.uProfile?.uPhone || "N/A"}</p>
          </div>
          <div className="customer-data">
            <h6>Date of Birth</h6>
            <p>{customer?.uProfile?.uDOB || "N/A"}</p>
          </div>
          <div className="customer-delete">
            <button>
              <FontAwesomeIcon icon={faTrash} style={{ color: "red" }} />
              Delete
            </button>
          </div>
        </div>
      </div>
      <div className="customer-order-details">
        <div className="purchase-history">
          <h4>Purchase History</h4>
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Status</th>
                <th>Phone Number</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {customer?.purchaseHistory?.length > 0 ? (
                customer.purchaseHistory.map((history, index) => (
                  <tr key={index}>
                    <td>{history.productName || "N/A"}</td>
                    <td>{history.status || "N/A"}</td>
                    <td>{history.phoneNumber || "N/A"}</td>
                    <td>{history.date || "N/A"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No purchase history available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <h4>Addresses</h4>
        <div className="customer-addresses">
          <div className="delivery-billing">
            <h5>Billing Address</h5>
            <p>{customer?.uAddress?.uZipCode || "N/A"}</p>
          </div>
          <div className="delivery-billing">
            <h5>Shipping Address</h5>
            <p>{customer?.uAddress?.uHouseNumber || "N/A"}</p>
          </div>
        </div>
        <h4>Payment Methods</h4>
        <div className="customer-payment">
          {customer?.paymentMethods?.length > 0 ? (
            customer.paymentMethods.map((method, index) => (
              <div key={index} className="payment-method">
                <p>{method || "N/A"}</p>
                <hr />
              </div>
            ))
          ) : (
            <p>No payment methods available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminCustomerDetails;
