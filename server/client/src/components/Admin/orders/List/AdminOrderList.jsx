import React, { useState, useEffect } from "react";
import AdminDashboard from "../../AdminDashboard";
import "./adminorderlist.css";
import { Pagination } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBarsProgress,
  faBox,
  faCar,
  faCartShopping,
  faClipboardCheck,
  faClock,
  faCloudArrowDown,
  faEye,
  faMagnifyingGlass,
  faPrint,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link } from "react-router-dom";
import AdminNavbar from "../../Navbar/AdminNavbar";

// const apiUrl = "http://localhost:5000";

const AdminOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/orders`);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Do you want to delete this Order Detail?")) {
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/orders/${id}`);
        setOrders(orders.filter((order) => order._id !== id));
      }
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };
  let items = [];
  const totalPages = Math.ceil(orders.length / 5);
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === activePage}
        onClick={() => setActivePage(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  // Filter orders based on search query
  const filteredOrders = orders.filter((order) => {
    return (
      order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.uEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.status.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Convert orders to CSV
  const downloadCSV = () => {
    const headers = [
      "Order ID",
      "Date",
      "Customer",
      "Status",
      "Payment Method",
      "Total",
    ];
    const rows = orders.map((order) => [
      order.orderId,
      order.transactionTime,
      order.uEmail,
      order.status,
      order.paymentMethod,
      order.totalPrice,
    ]);
    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "orders.csv");
      link.click();
    }
  };

  // Print the order table
  const printTable = () => {
    const content = document.getElementById("orders-table").innerHTML;
    const printWindow = window.open("", "_blank");
    printWindow.document.write("<html><head><title>Print</title><style>");
    printWindow.document.write(`
      @media print {
        .pen-trash {
          display: none;
        }
      }
    `);
    printWindow.document.write("</style></head><body>");
    printWindow.document.write(content);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <>
      <AdminDashboard />
      <AdminNavbar />
      <div className="order-blocks">
        <div className="order-block-div">
          <div className="order-block-data">
            <div>
              <h6>Order Cancel</h6>
              <p>241</p>
            </div>
            <div>
              <FontAwesomeIcon
                icon={faCartShopping}
                className="order-block-icon"
              />
            </div>
          </div>
          <div className="order-block-data">
            <div>
              <h6>Order Shipped</h6>
              <p>241</p>
            </div>
            <div>
              <FontAwesomeIcon className="order-block-icon" icon={faBox} />
            </div>
          </div>
          <div className="order-block-data">
            <div>
              <h6>Order Delivering</h6>
              <p>241</p>
            </div>
            <div>
              <FontAwesomeIcon className="order-block-icon" icon={faCar} />
            </div>
          </div>
        </div>
        <div className="order-block-div">
          <div className="order-block-data">
            <div>
              <h6>Pending Payment</h6>
              <p>241</p>
            </div>
            <div>
              <FontAwesomeIcon className="order-block-icon" icon={faClock} />
            </div>
          </div>
          <div className="order-block-data">
            <div>
              <h6>Delivered</h6>
              <p>241</p>
            </div>
            <div>
              <FontAwesomeIcon
                className="order-block-icon"
                icon={faClipboardCheck}
              />
            </div>
          </div>
          <div className="order-block-data">
            <div>
              <h6>Inprogress</h6>
              <p>241</p>
            </div>
            <div>
              <FontAwesomeIcon
                className="order-block-icon"
                icon={faBarsProgress}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="Product-list-table">
        <div className="list-head-btn">
          <h4>Orders</h4>
          <div className="list-btns">
            <button className="export-btn-list" onClick={downloadCSV}>
              <FontAwesomeIcon icon={faCloudArrowDown} />
              Download
            </button>
            <button className="Add-btn-list" onClick={printTable}>
              <FontAwesomeIcon icon={faPrint} />
              Print
            </button>
          </div>
        </div>
        <form action="">
          <div className="list-search">
            <div className="input-with-icon">
              <input
                type="text"
                placeholder="Search Orders"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Update search query
              />
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="input-icon"
              />
            </div>
          </div>
        </form>
        <div id="orders-table">
          <table className="styled-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Status</th>
                <th>Payment Method</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders
                .slice((activePage - 1) * 5, activePage * 5)
                .map((order) => (
                  <tr key={order._id}>
                    <td>{order.orderId}</td>
                    <td>{order.transactionTime}</td>
                    <td>{order.uEmail}</td>
                    <td>{order.status}</td>
                    <td>{order.paymentMethod}</td>
                    <td>
                      <div className="pen-trash">
                        <Link to={`/admin/order/details/${order._id}`}>
                          <FontAwesomeIcon icon={faEye} />
                        </Link>
                        <FontAwesomeIcon
                          icon={faTrash}
                          onClick={() => handleDelete(order._id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <Pagination>{items}</Pagination>
      </div>
    </>
  );
};

export default AdminOrderList;
