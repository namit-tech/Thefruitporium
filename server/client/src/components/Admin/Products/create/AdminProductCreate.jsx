import React, { useState } from "react";
import AdminDashboard from "../../AdminDashboard";
import "./adminproductcreate.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import sampleImage from "../../../../assets/product-6.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faMagnifyingGlass,
  faTractor,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Dropdown } from "react-bootstrap";
import person from "../../../../assets/images/person_1.jpg";
import { useNavigate } from "react-router";
import AdminNavbar from "../../Navbar/AdminNavbar";
// const apiUrl = "http://localhost:5000";

const AdminProductCreate = () => {
  const [product, setProduct] = useState({
    Sno: "",
    Name: "",
    Category: "",
    Description: "",
    Origin: "",
    Season: "",
    by_size: [
      {
        size: "",
        price: "",
        pDiscount: "",
      },
    ],
    Prices_per_unit: "",
    Quantity: "",
    Shelf_Life: "",
    Cold_Storage: "",
    Nutrient_value: "",
    Storage_and_Uses: "",
    Proxy_Images_uploaded: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("by_size")) {
      // Extract the index and field name from the dynamic name
      const [field, index, prop] = name.split("-");

      const updatedBySize = [...product.by_size];
      updatedBySize[index][prop] = value;

      setProduct((prevProduct) => ({
        ...prevProduct,
        by_size: updatedBySize,
      }));
    } else {
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
      }));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin"); // Redirect to login page after logout
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProduct({ ...product, Proxy_Images_uploaded: file });
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/products/create-product`,
        product
      );
      console.log("Product added:", response.data);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
  return (
    <>
      <div className="edit-div">
        <AdminDashboard />
        <AdminNavbar />
        <nav className="admin-navbar">
          <div className="navadmin-icon">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="search admin-icon"
            />
            <div>
              <FontAwesomeIcon icon={faGear} className="gear admin-icon" />
              <Dropdown>
                <Dropdown.Toggle
                  id="dropdown-custom-components" // Using the function to apply styles
                  className="custom-dropdown-toggle"
                >
                  <img src={person} alt="" className="accountimg-icon" />
                </Dropdown.Toggle>

                <Dropdown.Menu className="custom-dropdown-menu">
                  <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Settings</Dropdown.Item>
                  <Dropdown.Item href="/admin" onClick={handleLogout}>
                    Log out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          {/* <button onClick={handleLogout}>Logout</button> */}
        </nav>
        <h3 className="Edit-head">Create Products</h3>
        <div className="Product-edit-info">
          <h4>Basic Information</h4>
          <form onSubmit={handleSubmit}>
            <div className="basic-info-edit">
              <label htmlFor="Name">Product Name</label>
              <input
                type="text"
                name="Sno"
                value={product.Sno}
                onChange={handleChange}
                placeholder="Sno"
              />
              <label htmlFor="Name">Product Name</label>
              <input
                type="text"
                name="Name"
                value={product.Name}
                onChange={handleChange}
                placeholder="Product Name"
              />
              <label htmlFor="Category">Category</label>
              <input
                type="text"
                name="Category"
                value={product.Category}
                onChange={handleChange}
                placeholder="Category"
              />
              <label htmlFor="Description">Description</label>
              <input
                type="text"
                name="Description"
                value={product.Description}
                onChange={handleChange}
                placeholder="Description"
              />
              <label htmlFor="Origin">Country Of Origin</label>
              <input
                type="text"
                name="Origin"
                value={product.Origin}
                onChange={handleChange}
                placeholder="Origin"
              />
              <label htmlFor="Season">Season</label>
              <input
                type="text"
                name="Season"
                value={product.Season}
                onChange={handleChange}
                placeholder="Season"
              />
              <label htmlFor="Prices_per_unit">Price per Unit</label>
              <input
                type="text"
                name="Prices_per_unit"
                value={product.Prices_per_unit}
                onChange={handleChange}
                placeholder="Price per Unit"
              />
              <label htmlFor="Quantity">Quantity</label>
              <input
                type="text"
                name="Quantity"
                value={product.Quantity}
                onChange={handleChange}
                placeholder="Quantity"
              />
              <label htmlFor="Shelf_Life">Shelf Life</label>
              <input
                type="text"
                name="Shelf_Life"
                value={product.Shelf_Life}
                onChange={handleChange}
                placeholder="Shelf Life"
              />
              <label htmlFor="Cold_Storage">Cold Storage</label>
              <input
                type="text"
                name="Cold_Storage"
                value={product.Cold_Storage}
                onChange={handleChange}
                placeholder="Cold Storage"
              />
              <label htmlFor="Nutrient_value">Nutrient Value</label>
              <input
                type="text"
                name="Nutrient_value"
                value={product.Nutrient_value}
                onChange={handleChange}
                placeholder="Nutrient Value"
              />
              <label htmlFor="Storage_and_Uses">Storage and Uses</label>
              <input
                type="text"
                name="Storage_and_Uses"
                value={product.Storage_and_Uses}
                onChange={handleChange}
                placeholder="Storage and Uses"
              />
            </div>
          </form>
        </div>
        <div className="Product-edit-image">
          <h4>Product Image</h4>
          <p>Choose a product photo upto 5 photos here.</p>
          <div className="image-edit-sec">
            <div className="image-edit">
              <img src={sampleImage} alt="" />
            </div>
            <div className="image-edit">
              <img src={sampleImage} alt="" />
            </div>
            <div className="image-edit">
              <img src={sampleImage} alt="" />
            </div>
            {selectedImage && (
              <div className="image-edit">
                <img src={selectedImage} alt="Selected" />
              </div>
            )}
            <label className="image-outline" htmlFor="imageUpload">
              Click to Browse Image
            </label>
            <input
              type="file"
              id="imageUpload"
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <p>
            Image formats: .jpg, .jpeg, .png, preferred size: 1:1, file size is
            restricted to a maximum of 500kb.
          </p>
        </div>
        <div className="Product-edit-pricing">
          <h4>Size Details</h4>
          {product.by_size.map((size, index) => (
            <div key={index} className="size-info-edit">
              <form>
                <label htmlFor={`by_size-${index}-size`}>Size</label>
                <input
                  type="text"
                  name={`by_size-${index}-size`}
                  value={size.size}
                  onChange={handleChange}
                  placeholder="Size"
                />
                <label htmlFor={`by_size-${index}-price`}>Price</label>
                <input
                  type="text"
                  name={`by_size-${index}-price`}
                  value={size.price}
                  onChange={handleChange}
                  placeholder="Price"
                />
                <label htmlFor={`by_size-${index}-pDiscount`}>
                  Discount Price
                </label>
                <input
                  type="text"
                  name={`by_size-${index}-pDiscount`}
                  value={size.pDiscount}
                  onChange={handleChange}
                  placeholder="Discount Price"
                />
              </form>
            </div>
          ))}
        </div>
        <div className="bottom-button">
          <div className="create-discard">
            <button className="discard-btn">
              <FontAwesomeIcon icon={faTrash} style={{ color: "red" }} />
              Discard
            </button>
            <button className="create-btn" type="submit" onClick={handleSubmit}>
              Create
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProductCreate;
