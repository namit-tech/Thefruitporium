import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "./salesAdmin.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import anaar from "../../../assets/anaar.JPG";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Dropdown } from "react-bootstrap";
import {
  faEye,
  faGear,
  faMagnifyingGlass,
  faMoneyBillTrendUp,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AdminDashboard from "../AdminDashboard";
import AdminNavbar from "../Navbar/AdminNavbar";
import person from "../../../assets/images/person_1.jpg";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";

// const apiUrl = "http://localhost:5000";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SalesGraph = () => {
  const [customerCount, setCustomerCount] = useState(0); // State for customer count
  // Static sales data
  const salesData = [
    { _id: 1, totalSales: 1000 },
    { _id: 2, totalSales: 1500 },
    { _id: 3, totalSales: 2000 },
    { _id: 4, totalSales: 1500 },
    { _id: 5, totalSales: 3000 },
    { _id: 6, totalSales: 350 },
    { _id: 7, totalSales: 2000 },
    { _id: 8, totalSales: 4500 },
    { _id: 9, totalSales: 5000 },
    { _id: 10, totalSales: 9500 },
    { _id: 11, totalSales: 6000 },
    { _id: 12, totalSales: 6500 },
  ];

  const navigate = useNavigate();

  const chartData = {
    labels: salesData.map((item) => `Month ${item._id}`),
    datasets: [
      {
        label: "Sales",
        data: salesData.map((item) => item.totalSales),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/orders`);
        // Only show the latest 3 orders (adjust the logic as needed)
        setOrders(response.data.slice(0, 3)); // Shows only the first 3 orders
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    const fetchCustomerCount = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/impression`);
        console.log("impression", response.data);

        setCustomerCount(response.data.visitCount); // Assuming the API response has a `count` field
      } catch (error) {
        console.error("Error fetching customer count:", error);
      }
    };

    fetchCustomerCount();
  }, []);

  const [activeIndex, setActiveIndex] = useState(null);

  const handleActive = (index) => {
    setActiveIndex(index === activeIndex ? null : index); // Toggle the active state
  };

  const percentage = 66;

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin"); // Redirect to login page after logout
  };

  return (
    <>
      <AdminDashboard />
      <AdminNavbar />
      <div className="profits-sales">
        <div className="head-time">
          <h2>Overview</h2>
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic" className="dropdown-monthly">
              Monthly
            </Dropdown.Toggle>

            <Dropdown.Menu className="dropdown-menuMonthly">
              <Dropdown.Item href="#/action-1">Monthly</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Weekly</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Annually</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="profit-sales-container">
          {[
            { title: "Total profit", icon: faMoneyBillTrendUp },
            { title: "Total order", icon: faShoppingBag },
            { title: "Impression", icon: faEye, count: customerCount },
          ].map((item, index) => (
            <div
              key={index}
              className={`overview-data ${
                activeIndex === index ? "active" : ""
              }`}
              onClick={() => handleActive(index)}
            >
              <div className="data-align">
                <h5>{item.title}</h5>
                <FontAwesomeIcon icon={item.icon} className="data-align-icon" />
              </div>
              <p
                style={{
                  fontWeight: "700",
                  fontSize: "22px",
                  margin: "10px 0px",
                }}
              >
                {item.title === "Impression" ? item.count : "82,373"}
              </p>
              <p>+3.4%</p>
              <p style={{ color: "gray" }}>from last month</p>
            </div>
          ))}
        </div>
        <div>
          <Line data={chartData} />
        </div>
      </div>
      <div className="sales-target">
        <div className="sales-target-drop-div">
          <h3> Sales Target</h3>
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic" className="dropdown-monthly">
              Monthly
            </Dropdown.Toggle>

            <Dropdown.Menu className="dropdown-menuMonthly">
              <Dropdown.Item href="#/action-1">Monthly</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Weekly</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Annually</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="bar-text">
          <div className="span-unit-text">
            <p>
              {" "}
              <span>1.3K</span> /1.8K Units
            </p>
            <p>Made this month year</p>
          </div>
          <div className="progressbar">
            <CircularProgressbar value={percentage} text={`${percentage}%`} />
          </div>
        </div>
      </div>
      <div className="top-products">
        <div className="top-product-head">
          <h4>Top Product</h4>
          <Link to="/admin/products/list">
            <button>View All</button>
          </Link>
        </div>
        <div className="top-product-list">
          <div className="topProduct-img">
            <img src={anaar} alt="" />
            <div className="top-product-names">
              <h6>Product Name</h6>
              <p>Sold: 1200</p>
            </div>
          </div>
          <p className="top-product-percent">+15.2%</p>
        </div>
        <div className="top-product-list">
          <div className="topProduct-img">
            <img src={anaar} alt="" />
            <div className="top-product-names">
              <h6>Product Name</h6>
              <p>Sold: 1200</p>
            </div>
          </div>
          <p className="top-product-percent">+15.2%</p>
        </div>
        <div className="top-product-list">
          <div className="topProduct-img">
            <img src={anaar} alt="" />
            <div className="top-product-names">
              <h6>Product Name</h6>
              <p>Sold: 1200</p>
            </div>
          </div>
          <p className="top-product-percent">+15.2%</p>
        </div>
        <div className="top-product-list">
          <div className="topProduct-img">
            <img src={anaar} alt="" />
            <div className="top-product-names">
              <h6>Product Name</h6>
              <p>Sold: 1200</p>
            </div>
          </div>
          <p className="top-product-percent">+15.2%</p>
        </div>
      </div>
      <div className="Recent-orders">
        <div className="recent-order-head">
          <h4>Recent Orders</h4>
          <Link to="/admin/order/list">
            <button>View Orders</button>
          </Link>
        </div>
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Status</th>
              <th>Date</th>
              <th>Customer</th>
              <th>Amount Spent</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.orderId}</td>
                <td>{order.status}</td>
                <td>{order.transactionTime}</td>
                <td>{order.uEmail}</td>
                <td>{order.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SalesGraph;
