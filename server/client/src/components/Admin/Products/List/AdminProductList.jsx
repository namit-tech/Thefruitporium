import * as XLSX from "xlsx";
import React, { useEffect, useState } from "react";
import AdminDashboard from "../../AdminDashboard";
import "./adminproductlist.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProgressBar from "react-bootstrap/ProgressBar";
import {
  faCloudArrowDown,
  faMagnifyingGlass,
  faPen,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { Dropdown } from "react-bootstrap";
import AdminNavbar from "../../Navbar/AdminNavbar";

// const apiUrl = "http://localhost:5000";

const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Default items per page

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/products`);
        setProducts(response.data);
        console.log("Admin product list", response.data);
      } catch (error) {
        console.error(error);
        console.warn("Data not found", error);
      }
    };
    fetchProducts();
  }, []);

  const handleExport = () => {
    const exportData = products.map((product) => ({
      Sno: product["Sno."],
      Name: product.Name,
      Category: product.Category.join(", "),
      Price: product.by_size
        .map((size) => `${size.size}: ${size.price}`)
        .join(", "),
      Quantity: product.quantity || "N/A",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
    XLSX.writeFile(workbook, "products_list.xlsx");
  };

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Do you want to delete this product?")) {
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/products/${id}`);
        setProducts(products.filter((product) => product._id !== id));
      }
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;

  const currentItems = filteredProducts.slice(offset, offset + itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleItemsPerPageChange = (size) => {
    setItemsPerPage(size); // Update items per page
    setCurrentPage(0); // Reset to the first page
  };


  return (
    <>
      <AdminDashboard />
      <AdminNavbar/>
      <div className="Product-list-table">
        <div className="list-head-btn">
          <h4>Products</h4>
          <div className="list-btns">
            <button className="export-btn-list" onClick={handleExport}>
              <FontAwesomeIcon icon={faCloudArrowDown} />
              Export
            </button>
            <Link
              to="/admin/products/create"
              style={{ textDecoration: "none" }}
            >
              <button className="Add-btn-list">
                <FontAwesomeIcon icon={faPlus} />
                Add Products
              </button>
            </Link>
          </div>
        </div>
        <form action="">
          <div className="list-search">
            <div className="input-with-icon">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="input-icon"
              />
            </div>
          </div>
        </form>
        <table className="styled-table">
          <thead>
            <tr>
              <th>Sno.</th>
              <th>Products</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Sales</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((product, index) => (
              <tr key={product._id}>
                <td>{offset + index + 1}</td>
                <td>{product.Name}</td>
                <td>{product.Category.join(", ")}</td>
                <td>
                  {product.by_size.map((size, idx) => (
                    <div key={idx}>
                      {size.size}: {size.price}
                    </div>
                  ))}
                </td>
                <td>{product.quantity}</td>
                <td>
                  <ProgressBar variant="success" now={40} />
                </td>
                <td>
                  <div className="pen-trash">
                    <Link to={`/admin/products/edit/${product._id}`}>
                      <FontAwesomeIcon icon={faPen} />
                    </Link>
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() => handleDelete(product._id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <ReactPaginate
            previousLabel={"Prev"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            previousLinkClassName={"pagination-link"}
            nextLinkClassName={"pagination-link"}
            activeClassName={"pagination-active"}
            disabledClassName={"pagination-disabled"}
          />
          <div className="pagination-settings">
            <Dropdown>
              <Dropdown.Toggle
                style={{
                  backgroundColor: "#e5e7eb",
                  color: "black",
                  border: "none",
                }}
                id="dropdown-basic"
              >
                {itemsPerPage} items per page
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {[5, 10, 15, 20, 50].map((size) => (
                  <Dropdown.Item
                    key={size}
                    onClick={() => handleItemsPerPageChange(size)}
                  >
                    {size} items
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProductList;
