import React, { useEffect, useState } from "react";
import AdminDashboard from "../../AdminDashboard";
import "./adminproductsedit.css";
import sampleImage from "../../../../assets/product-6.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router";
import axios from "axios";
import AdminNavbar from "../../Navbar/AdminNavbar";

// const apiUrl = "http://localhost:5000";

const AdminProductsEdit = () => {
  const { id } = useParams();
  console.log("id", id);
  const [product, setProduct] = useState({
    by_size: [],
    Category: [],
  });
  const [newCategory, setNewCategory] = useState("");
  const [isAddingNewCategory, setIsAddingNewCategory] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetchProductDetails();
  }, [id]);

  console.log("products", product);

  const [selectedImage, setSelectedImage] = useState(sampleImage);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setSelectedImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSizeInputChange = (index, field, value) => {
    const updatedBySize = [...product.by_size];
    updatedBySize[index][field] = value;
    setProduct((prevState) => ({
      ...prevState,
      by_size: updatedBySize,
    }));
  };

  const handleNewCategoryChange = (e) => setNewCategory(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if a new category was added
    if (newCategory && !product.Category.includes(newCategory)) {
      // Add the new category to the existing categories
      product.Category.push(newCategory);
    }

    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/products/${id}`, product);
      if (response.status === 200) {
        alert("Product updated successfully!");
      }
    } catch (error) {
      console.error("Error updating product data:", error);
      alert("Error updating product.");
    }
  };

  return (
    <div className="edit-div">
      <AdminDashboard />
      <AdminNavbar />
      <h3 className="Edit-head">Edit Products</h3>
      <div className="Product-edit-info">
        <h4>Basic Information</h4>
        <form onSubmit={handleSubmit}>
          <div className="basic-info-edit">
            <label htmlFor="Name">Product Name</label>
            <input
              type="text"
              id="Sno."
              name="Sno."
              placeholder="Sno."
              value={product.Sno}
              onChange={handleInputChange}
            />
            <label htmlFor="Name">Product Name</label>
            <input
              type="text"
              id="Name"
              name="Name"
              placeholder="Name"
              value={product.Name}
              onChange={handleInputChange}
            />
            <label htmlFor="Category">Category</label>
            <div className="category-option-input">
              {isAddingNewCategory ? (
                <div>
                  <input
                    className="category-input"
                    type="text"
                    value={newCategory}
                    onChange={handleNewCategoryChange}
                    placeholder="Enter new category"
                  />
                </div>
              ) : (
                <select
                  id="productCategory"
                  name="Category"
                  className="category-input"
                  value={product.Category}
                  onChange={handleInputChange}
                >
                  {Array.isArray(product.Category) &&
                    product.Category.map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                </select>
              )}
              <button
                type="button"
                className="category-button"
                onClick={() => setIsAddingNewCategory((prev) => !prev)}
              >
                {isAddingNewCategory ? "Cancel" : "Add New Category"}
              </button>
            </div>

            <label htmlFor="Description">Description</label>
            <textarea
              id="Description"
              name="Description"
              value={product.Description}
              onChange={handleInputChange}
              rows="4"
              placeholder="Enter product description here..."
            />

            <label htmlFor="Origin">Country Of Origin</label>
            <input
              type="text"
              id="Origin"
              name="Origin"
              placeholder="Origin"
              value={product.Origin}
              onChange={handleInputChange}
            />
            <label htmlFor="Nutrient Value & Health Benefits">
              Nutrient Value & Health Benefits
            </label>
            <input
              type="text"
              id="Nutrient Value & Health Benefits"
              name="Nutrient Value & Health Benefits"
              value={product.Nutrient_value}
              onChange={handleInputChange}
            />
            <label htmlFor="Storage and Uses">Storage and Uses</label>
            <input
              type="text"
              id="Storage and Uses"
              name="Storage and Uses"
              value={product.Storage_and_Uses}
              onChange={handleInputChange}
            />
            <label htmlFor="Prices (approx) / Units">
              Prices (approx) / Units
            </label>
            <input
              type="text"
              id="Prices (approx) / Units"
              name="Prices (approx) / Units"
              value={product.Prices_per_unit}
              onChange={handleInputChange}
            />
            <label htmlFor="Shelf Life">Shelf Life</label>
            <input
              type="text"
              id="Shelf Life"
              name="Shelf Life"
              placeholder="Shelf Life"
              value={product.Shelf_Life}
              onChange={handleInputChange}
            />
            <label htmlFor="Cold Storage required or not">
              Cold Storage required or not
            </label>
            <input
              type="text"
              id="Cold Storage required or not"
              name="Cold Storage required or not"
              value={product.Cold_Storage}
              onChange={handleInputChange}
            />
          </div>
          <button className="create-btn" type="submit">
            Save
          </button>
        </form>
      </div>

      <div className="Product-edit-image">
        <h4>Product Image</h4>
        <p>Choose a product photo up to 5 photos here.</p>
        <div className="image-edit-sec">
          {["image1", "image2", "image3"].map((image, idx) => (
            <div key={idx} className="image-edit">
              <img src={sampleImage} alt={`sample-${image}`} />
            </div>
          ))}
          <div className="image-edit">
            <img src={selectedImage} alt="Selected" />
          </div>

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
        <h4>Pricing</h4>
        <form onSubmit={handleSubmit}>
          <div className="size-info-edit">
            {product.by_size.map((sizeInfo, index) => (
              <div key={index} className="size-info">
                <label htmlFor={`price-${sizeInfo.size}`}>
                  {sizeInfo.size} Price
                </label>
                <input
                  type="text"
                  id={`price-${sizeInfo.size}`}
                  placeholder="Amount"
                  value={sizeInfo.price}
                  onChange={(e) =>
                    handleSizeInputChange(index, "price", e.target.value)
                  }
                />

                <label htmlFor={`discount-${sizeInfo.size}`}>
                  {sizeInfo.size} Discount Price
                </label>
                <input
                  type="text"
                  id={`discount-${sizeInfo.size}`}
                  placeholder="Discount Price"
                  value={sizeInfo.pDiscount}
                  onChange={(e) =>
                    handleSizeInputChange(index, "pDiscount", e.target.value)
                  }
                />

                <label htmlFor={`weight-${sizeInfo.size}`}>
                  {sizeInfo.size} Weight
                </label>
                <select
                  id={`weight-${sizeInfo.size}`}
                  value={sizeInfo.size}
                  onChange={(e) =>
                    handleSizeInputChange(index, "size", e.target.value)
                  }
                >
                  <option value="500 gm">500 gm</option>
                  <option value="1 kg">1 Kg</option>
                  <option value="2 kg">2 Kg</option>
                </select>
              </div>
            ))}
          </div>
        </form>
      </div>
      <div className="bottom-button">
        <div className="create-discard">
          <button className="discard-btn">
            <FontAwesomeIcon icon={faTrash} style={{ color: "red" }} />
            Discard
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProductsEdit;

// import React, { useState } from "react";
// import AdminDashboard from "../../AdminDashboard";
// import "./adminproductcreate.css";
// import sampleImage from "../../../../assets/product-6.jpg";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTractor, faTrash } from "@fortawesome/free-solid-svg-icons";
// import axios from "axios";
// const apiUrl = "http://localhost:5000";

// const AdminProductCreate = () => {
//   const [product, setProduct] = useState({
//     Sno: "",
//     Name: "",
//     Category: "",
//     Description: "",
//     Origin: "",
//     Season: "",
//     by_size: [
//       {
//         size: "",
//         price: "",
//         pDiscount: "",
//       },
//     ],
//     Prices_per_unit: "",
//     Quantity: "",
//     Shelf_Life: "",
//     Cold_Storage: "",
//     Nutrient_value: "",
//     Storage_and_Uses: "",
//     Proxy_Images_uploaded: "",
//   });
//   const [selectedImage, setSelectedImage] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name.startsWith("by_size")) {
//       const index = parseInt(name.split("-")[1]);
//       const updatedBySize = [...product.by_size];
//       updatedBySize[index][name.split("-")[0]] = value;
//       setProduct((prevProduct) => ({
//         ...prevProduct,
//         by_size: updatedBySize,
//       }));
//     } else {
//       setProduct((prevProduct) => ({
//         ...prevProduct,
//         [name]: value,
//       }));
//     }
//   };

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setProduct({ ...product, Proxy_Images_uploaded: file });
//       setSelectedImage(URL.createObjectURL(file));
//     }
//   };

//   const handleAddSize = () => {
//     setProduct((prevProduct) => ({
//       ...prevProduct,
//       by_size: [...prevProduct.by_size, { size: "", price: "", pDiscount: "" }],
//     }));
//   };

//   const handleRemoveSize = (index) => {
//     const updatedBySize = product.by_size.filter((_, i) => i !== index);
//     setProduct((prevProduct) => ({
//       ...prevProduct,
//       by_size: updatedBySize,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(`${apiUrl}/api/products/create-product`, product);
//       console.log('Product added:', response.data);
//     } catch (error) {
//       console.error('Error adding product:', error);
//     }
//   };

//   return (
//     <div className="edit-div">
//       <AdminDashboard />
//       <h3 className="Edit-head">Create Products</h3>
//       <div className="Product-edit-info">
//         <h4>Basic Information</h4>
//         <form onSubmit={handleSubmit}>
//           <div className="basic-info-edit">
//             <label htmlFor="Name">Product Name</label>
//             <input
//               type="text"
//               name="Sno"
//               value={product.Sno}
//               onChange={handleChange}
//               placeholder="Sno"
//             />
//             <label htmlFor="Name">Product Name</label>
//             <input
//               type="text"
//               name="Name"
//               value={product.Name}
//               onChange={handleChange}
//               placeholder="Product Name"
//             />
//             <label htmlFor="Category">Category</label>
//             <select
//               id="productCategory"
//               name="Category"
//               value={product.Category}
//               onChange={handleChange}
//             >
//               <option value="fruits">Fruits</option>
//               <option value="vegetables">Vegetables</option>
//             </select>
//             <label htmlFor="Description">Description</label>
//             <input
//               type="text"
//               name="Description"
//               value={product.Description}
//               onChange={handleChange}
//               placeholder="Description"
//             />
//             <label htmlFor="Origin">Country Of Origin</label>
//             <input
//               type="text"
//               name="Origin"
//               value={product.Origin}
//               onChange={handleChange}
//               placeholder="Origin"
//             />
//             <label htmlFor="Season">Season</label>
//             <input
//               type="text"
//               name="Season"
//               value={product.Season}
//               onChange={handleChange}
//               placeholder="Season"
//             />
//             <label htmlFor="Prices_per_unit">Price per Unit</label>
//             <input
//               type="text"
//               name="Prices_per_unit"
//               value={product.Prices_per_unit}
//               onChange={handleChange}
//               placeholder="Price per Unit"
//             />
//             <label htmlFor="Quantity">Quantity</label>
//             <input
//               type="text"
//               name="Quantity"
//               value={product.Quantity}
//               onChange={handleChange}
//               placeholder="Quantity"
//             />
//             <label htmlFor="Shelf_Life">Shelf Life</label>
//             <input
//               type="text"
//               name="Shelf_Life"
//               value={product.Shelf_Life}
//               onChange={handleChange}
//               placeholder="Shelf Life"
//             />
//             <label htmlFor="Cold_Storage">Cold Storage</label>
//             <input
//               type="text"
//               name="Cold_Storage"
//               value={product.Cold_Storage}
//               onChange={handleChange}
//               placeholder="Cold Storage"
//             />
//             <label htmlFor="Nutrient_value">Nutrient Value</label>
//             <input
//               type="text"
//               name="Nutrient_value"
//               value={product.Nutrient_value}
//               onChange={handleChange}
//               placeholder="Nutrient Value"
//             />
//             <label htmlFor="Storage_and_Uses">Storage and Uses</label>
//             <input
//               type="text"
//               name="Storage_and_Uses"
//               value={product.Storage_and_Uses}
//               onChange={handleChange}
//               placeholder="Storage and Uses"
//             />
//           </div>

//           <div className="Product-edit-size">
//             <h4>Size Details</h4>
//             {product.by_size.map((size, index) => (
//               <div key={index} className="size-info-edit">
//                 <label htmlFor={`by_size-${index}-size`}>Size</label>
//                 <input
//                   type="text"
//                   name={`by_size-${index}-size`}
//                   value={size.size}
//                   onChange={handleChange}
//                   placeholder="Size"
//                 />
//                 <label htmlFor={`by_size-${index}-price`}>Price</label>
//                 <input
//                   type="text"
//                   name={`by_size-${index}-price`}
//                   value={size.price}
//                   onChange={handleChange}
//                   placeholder="Price"
//                 />
//                 <label htmlFor={`by_size-${index}-pDiscount`}>Discount Price</label>
//                 <input
//                   type="text"
//                   name={`by_size-${index}-pDiscount`}
//                   value={size.pDiscount}
//                   onChange={handleChange}
//                   placeholder="Discount Price"
//                 />
//                 <button type="button" onClick={() => handleRemoveSize(index)}>
//                   Remove Size
//                 </button>
//               </div>
//             ))}
//             <button type="button" onClick={handleAddSize}>
//               Add Size
//             </button>
//           </div>

//           <div className="Product-edit-image">
//             <h4>Product Image</h4>
//             <p>Choose a product photo (up to 5 photos here).</p>
//             <div className="image-edit-sec">
//               <div className="image-edit">
//                 <img src={sampleImage} alt="Sample" />
//               </div>
//               {selectedImage && (
//                 <div className="image-edit">
//                   <img src={selectedImage} alt="Selected" />
//                 </div>
//               )}
//               <label className="image-outline" htmlFor="imageUpload">
//                 Click to Browse Image
//               </label>
//               <input
//                 type="file"
//                 id="imageUpload"
//                 style={{ display: "none" }}
//                 accept="image/*"
//                 onChange={handleImageChange}
//               />
//             </div>
//             <p>
//               Image formats: .jpg, .jpeg, .png, preferred size: 1:1, file size
//               is restricted to a maximum of 500kb.
//             </p>
//           </div>

//           <div className="bottom-button">
//             <div className="create-discard">
//               <button className="discard-btn">
//                 <FontAwesomeIcon icon={faTrash} style={{ color: "red" }} />
//                 Discard
//               </button>
//               <button type="submit" className="create-btn">
//                 Create Product
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AdminProductCreate;
