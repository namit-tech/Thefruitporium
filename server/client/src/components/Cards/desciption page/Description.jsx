// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import image from "../../../assets/pineapple.JPG";
// import banana from "../../../assets/banana.JPG";
// import papaya from "../../../assets/papaya.JPG";
// import guarantee from "../../../assets/guarantee-certificate.png";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCheck } from "@fortawesome/free-solid-svg-icons";
// import "./description.css";

// const Description = () => {
//   const [currentImage, setCurrentImage] = useState(image);
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   console.log("desc prod", product);
//   const [isVisible, setIsVisible] = useState(false);
//   const [selectedSlab, setSelectedSlab] = useState(null);

//   const toggleVisibility = () => {
//     setIsVisible(!isVisible);
//   };

//   useEffect(() => {
//     const fetchProductDetails = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/products/${id}`);
//         setProduct(res.data);
//         console.log(res.data);
//       } catch (error) {
//         console.error("Error fetching product details:", error);
//       }
//     };
//     fetchProductDetails();
//   }, [id]);

//   useEffect(() => {
//     if (product && product.by_size && product.by_size.length > 0) {
//       setSelectedSlab(product.by_size[0]);
//     }
//   }, [product]);

//   useEffect(() => {
//     const magnifier = document.getElementById("magnifier");
//     const imgContainer = document.querySelector(".img-container");
//     const img = document.querySelector(".product-img");

//     if (!imgContainer || !magnifier || !img) return;

//     const moveMagnifier = (e) => {
//       const { left, top, width, height } = img.getBoundingClientRect();
//       const magnifierSize = magnifier.offsetWidth / 2;

//       let x = e.pageX - left - window.pageXOffset;
//       let y = e.pageY - top - window.pageYOffset;

//       x = Math.max(magnifierSize, Math.min(x, width - magnifierSize));
//       y = Math.max(magnifierSize, Math.min(y, height - magnifierSize));

//       magnifier.style.left = `${x - magnifierSize}px`;
//       magnifier.style.top = `${y - magnifierSize}px`;
//       magnifier.style.backgroundPosition = `-${x * 2 - magnifierSize}px -${
//         y * 2 - magnifierSize
//       }px`;
//     };

//     const showMagnifier = () => {
//       magnifier.style.display = "block";
//       magnifier.style.backgroundImage = `url(${img.src})`;
//       magnifier.style.backgroundSize = `${img.width * 2}px ${img.height * 2}px`;
//     };

//     const hideMagnifier = () => {
//       magnifier.style.display = "none";
//     };

//     imgContainer.addEventListener("mousemove", moveMagnifier);
//     imgContainer.addEventListener("mouseenter", showMagnifier);
//     imgContainer.addEventListener("mouseleave", hideMagnifier);

//     return () => {
//       imgContainer.removeEventListener("mousemove", moveMagnifier);
//       imgContainer.removeEventListener("mouseenter", showMagnifier);
//       imgContainer.removeEventListener("mouseleave", hideMagnifier);
//     };
//   }, [currentImage]);

//   if (!product) return <p>Loading...</p>;

//   const images = [image, banana, papaya];

//   return (
//     <>
//       <div className="desc-main">
//         <div className="img-sec">
//           <div className="img-container">
//             <img src={currentImage} alt="Product" className="product-img" />
//             <div className="magnifier-glass" id="magnifier"></div>
//           </div>
//           <div className="img-select">
//             {images.map((img, index) => (
//               <div className="img-item" key={index}>
//                 <img
//                   src={img}
//                   alt={`Thumbnail ${index + 1}`}
//                   onClick={() => setCurrentImage(img)}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="info-sec">
//           <p className="name">{product.Name}</p>
//           <p className="mrp">MRP:</p>
//           <p className="price">Discounted Price:</p>
//           <p className="tax">(Inclusive of all taxes)</p>
//           <div className="desc-btn">
//             <button className="add-btn">ADD</button>
//             <button className="save-btn">Save for Later</button>
//           </div>
//           <h3 className="head-size">Pack Sizes</h3>
//           <div className="packs">
//             {product.by_size.map((pack, index) => (
//               <button
//                 className={`size-1 slab ${
//                   selectedSlab && selectedSlab.size === pack.size
//                     ? "active"
//                     : ""
//                 }`}
//                 key={index}
//                 onClick={() => setSelectedSlab(pack)}
//               >
//                 <p>{pack.size}</p>
//                 <p>{pack.price}</p>
//                 <FontAwesomeIcon icon={faCheck} className="check-icon-desc" />
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//       <div className="desc-section">
//         <hr />
//         <h3 className="second-head">Why choose Fruitporium?</h3>
//         <div className="boxes">
//           {[...Array(4)].map((_, index) => (
//             <div className="box" key={index}>
//               <img src={guarantee} alt="Quality Guarantee" />
//               <h6>Quality</h6>
//               <p>You can trust</p>
//             </div>
//           ))}
//         </div>
//         <div className="desc-data">
//           <div>
//             <h5>About the product</h5>
//             <p>{product.Description}</p>
//           </div>
//           <hr className="desc-hr" />
//           <div>
//             <h5>Other Product Info</h5>
//             <button onClick={toggleVisibility}>{isVisible ? "-" : "+"}</button>
//             {isVisible && (
//               <div>
//                 <h6>Name:</h6>
//                 <p>{product.Name}</p>
//                 <h6>Category:</h6>
//                 <p>{product.Category?.join(", ")}</p>{" "}
//                 {/* Category is an array */}
//                 <h6>Country of Origin:</h6>
//                 <p>{product.Origin}</p>
//                 <h6>Benefits:</h6>
//                 <p>{product.Nutrient_value}</p>
//                 <h6>Unit:</h6>
//                 <p>{product.Quantity}</p>
//                 <h6>Shelf Life:</h6>
//                 <p>{product.Shelf_Life}</p>
//                 <h6>Storage and Uses:</h6>
//                 <p>{product.Storage_and_Uses}</p>
//                 <h6>Cold Storage:</h6>
//                 <p>{product.Cold_Storage}</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Description;


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import image from "../../../assets/pineapple.JPG";
import banana from "../../../assets/banana.JPG";
import papaya from "../../../assets/papaya.JPG";
import guarantee from "../../../assets/guarantee-certificate.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/reducer/cartReducer"; // Import addToCart action
import "./description.css";

const Description = () => {
  const [currentImage, setCurrentImage] = useState(image);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedSlab, setSelectedSlab] = useState(null);

  const dispatch = useDispatch(); // Initialize dispatch to call the action

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

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

  useEffect(() => {
    if (product && product.by_size && product.by_size.length > 0) {
      setSelectedSlab(product.by_size[0]); // Default to the first slab
    }
  }, [product]);

  const handleAddToCart = () => {
    if (selectedSlab) {
      // Dispatch the addToCart action with the required fields: productId, size, and price
      dispatch(addToCart({
        productId: product._id,
        size: selectedSlab.size,
        price: selectedSlab.price,
        quantity: 1,
      }));
    }
  };

  if (!product) return <p>Loading...</p>;

  const images = [image, banana, papaya];

  return (
    <>
      <div className="desc-main">
        <div className="img-sec">
          <div className="img-container">
            <img src={currentImage} alt="Product" className="product-img" />
            <div className="magnifier-glass" id="magnifier"></div>
          </div>
          <div className="img-select">
            {images.map((img, index) => (
              <div className="img-item" key={index}>
                <img
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => setCurrentImage(img)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="info-sec">
          <p className="name">{product.Name}</p>
          
          {/* MRP and Discounted Price dynamically showing based on selectedSlab */}
          <p className="mrp">
            MRP: {selectedSlab ? selectedSlab.price : "N/A"}
          </p>
          <p className="price">
            Discounted Price: {selectedSlab ? selectedSlab.pDiscount : "N/A"}
          </p>
          
          <p className="tax">(Inclusive of all taxes)</p>
          <div className="desc-btn">
            <button className="add-btn" onClick={handleAddToCart}>
              ADD
            </button>
            <button className="save-btn">Save for Later</button>
          </div>
          <h3 className="head-size">Pack Sizes</h3>
          <div className="packs">
            {product.by_size.map((pack, index) => (
              <button
                className={`size-1 slab ${
                  selectedSlab && selectedSlab.size === pack.size ? "active" : ""
                }`}
                key={index}
                onClick={() => setSelectedSlab(pack)}
              >
                <p>{pack.size}</p>
                <p>{pack.price}</p>
                <FontAwesomeIcon icon={faCheck} className="check-icon-desc" />
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="desc-section">
        <hr />
        <h3 className="second-head">Why choose Fruitporium?</h3>
        <div className="boxes">
          {[...Array(4)].map((_, index) => (
            <div className="box" key={index}>
              <img src={guarantee} alt="Quality Guarantee" />
              <h6>Quality</h6>
              <p>You can trust</p>
            </div>
          ))}
        </div>
        <div className="desc-data">
          <div>
            <h5>About the product</h5>
            <p>{product.Description}</p>
          </div>
          <hr className="desc-hr" />
          <div>
            <h5>Other Product Info</h5>
            <button onClick={toggleVisibility}>{isVisible ? "-" : "+"}</button>
            {isVisible && (
              <div>
                <h6>Name:</h6>
                <p>{product.Name}</p>
                <h6>Category:</h6>
                <p>{product.Category?.join(", ")}</p>
                <h6>Country of Origin:</h6>
                <p>{product.Origin}</p>
                <h6>Benefits:</h6>
                <p>{product.Nutrient_value}</p>
                <h6>Unit:</h6>
                <p>{product.Quantity}</p>
                <h6>Shelf Life:</h6>
                <p>{product.Shelf_Life}</p>
                <h6>Storage and Uses:</h6>
                <p>{product.Storage_and_Uses}</p>
                <h6>Cold Storage:</h6>
                <p>{product.Cold_Storage}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};


export default Description;

