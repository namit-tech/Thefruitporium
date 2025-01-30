import React, { useEffect, useState } from "react";
import AdminDashboard from "../../AdminDashboard";
import "./admincustomerlist.css";
import { Pagination } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
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

const AdminCustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users`);
        console.log("reslist", response.data);
        
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchCustomers();
  }, []);

    const handleDelete = async (id) => {
      try {
        if (window.confirm("Do you want to delete this Customer Details?")) {
          await axios.delete(`${process.env.REACT_APP_API_URL}/api/users/${id}`);
          setCustomers(customers.filter((customer) => customer._id !== id));
        }
      } catch (error) {
        console.error("Error deleting product", error);
      }
    };

  let items = [];
  const totalPages = Math.ceil(customers.length / 5);
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

  // Filter customers based on search query
  const filteredCustomers = customers.filter((customer) => {
    return (
      customer.userId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (customer.uCredentials?.uEmail &&
        customer.uCredentials.uEmail
          .toLowerCase()
          .includes(searchQuery.toLowerCase())) ||
      (customer.uProfile?.uName &&
        customer.uProfile.uName.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  // Convert customers to CSV
  const downloadCSV = () => {
    const headers = ["User ID", "Name", "Email", "Phone", "City"];
    const rows = customers.map((customer) => [
      customer.userId,
      customer.uProfile?.uName || "",
      customer.uCredentials?.uEmail || "",
      customer.uProfile?.uPhone || "",
      customer.uAddress?.uCity || "",
    ]);
    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "customers.csv");
      link.click();
    }
  };

  // Print the customer table
  const printTable = () => {
    const content = document.getElementById("customers-table").innerHTML;
    const printWindow = window.open("", "_blank");
    printWindow.document.write("<html><head><title>Print</title><style>");
    printWindow.document.write(`@media print {.pen-trash { display: none; }}`);
    printWindow.document.write("</style></head><body>");
    printWindow.document.write(content);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <>
      <AdminDashboard />
      <AdminNavbar/>
      <div className="Product-list-table">
        <div className="list-head-btn">
          <h4>Customers</h4>
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
                placeholder="Search Customers"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Update search query
              />
              <FontAwesomeIcon icon={faMagnifyingGlass} className="input-icon" />
            </div>
          </div>
        </form>
        <div id="customers-table">
          <table className="styled-table">
            <thead>
              <tr>
                <th>Serial No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>City</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers
                .slice((activePage - 1) * 5, activePage * 5)
                .map((customer, index) => (
                  <tr key={customer._id}>
                    <td>{(activePage - 1) * 5 + index + 1}</td> {/* Serial No */}
                    <td>{customer.uProfile?.uName}</td>
                    <td>{customer.uCredentials?.uEmail}</td>
                    <td>{customer.uProfile?.uPhone}</td>
                    <td>{customer.uAddress?.uCity}</td>
                    <td>
                      <div className="pen-trash">
                        <Link to={`/admin/customer/details/${customer.userId}`}>
                          <FontAwesomeIcon icon={faEye} />
                        </Link>
                        <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(customer._id)} />
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

export default AdminCustomerList;
