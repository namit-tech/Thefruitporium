// import React, { useEffect, useRef, useState } from "react";
// import "./listing.css"; // Ensure your CSS file is imported
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const Listing = () => {
//   const [products, setProducts] = useState([]); // State to hold all products
//   const [filteredCategories, setFilteredCategories] = useState([]); // State to hold filtered categories
//   const tabsBoxRef = useRef(null);

//   // Fetch product data from the backend
//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/listing/"); // Fetch product data
//       console.log(response.data, "$$$");
//       setProducts(response.data); // Set products to state
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   useEffect(() => {
//     fetchProducts(); // Fetch products initially
//   }, []);

//   useEffect(() => {
//     // Extract categories from products
//     const allCategories = products.flatMap((product) =>
//       product.Category.map((cat) => Object.values(cat).join(""))
//     );
//     console.log(allCategories);

//     // Remove duplicate categories using a Set
//     const uniqueCategories = [...new Set(allCategories)];

//     setFilteredCategories(uniqueCategories); // Update filtered categories
//   }, [products]);

//   const handleIcons = () => {
//     const tabsBox = tabsBoxRef.current;
//     const scrollVal = tabsBox.scrollLeft;
//     const maxScrollableWidth = tabsBox.scrollWidth - tabsBox.clientWidth;
//     const leftIcon = document.getElementById("left").parentElement;
//     const rightIcon = document.getElementById("right").parentElement;
//     leftIcon.style.display = scrollVal <= 0 ? "none" : "flex";
//     rightIcon.style.display =
//       maxScrollableWidth - scrollVal <= 1 ? "none" : "flex";
//   };

//   const scrollTabs = (direction) => {
//     const tabsBox = tabsBoxRef.current;
//     tabsBox.scrollLeft += direction === "left" ? -340 : 340;
//     handleIcons();
//   };

//   useEffect(() => {
//     handleIcons(); // Initial call to handle icons visibility
//   }, [filteredCategories]);

//   return (
//     <div className="categories">
//       <div className="category-head">
//         <h1>Featured Categories</h1>
//         <div className="icon-container">
//           <div className="icon" onClick={() => scrollTabs("left")}>
//             <FontAwesomeIcon id="left" icon={faAngleLeft} />
//           </div>
//           <div className="icon" onClick={() => scrollTabs("right")}>
//             <FontAwesomeIcon id="right" icon={faAngleRight} />
//           </div>
//         </div>
//       </div>
//       <div className="wrapper">
//         <ul className="tabs-box" ref={tabsBoxRef}>
//           {filteredCategories.map((category, index) => (
//             <Link
//               key={index}
//               to={`/category/${category}`}
//               className={`tab tab-${index + 1}`}
//             >
//               {category}
//               {/* Adding the plus animation elements */}
//               <div className="plus fade-horizontal"></div>
//               <div className="plus fade-vertical"></div>
//             </Link>

//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Listing;

import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import anaar from "../../assets/product-9.png";
import "./listing.css";
const apiUrl = process.env.REACT_APP_API_URL;
// const apiUrl = "http://localhost:5000";

const Listing = () => {
  const [filteredCategories, setFilteredCategories] = useState([]);
  const tabsBoxRef = useRef(null);

  // Fetch categories from the backend
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/category`);
      setFilteredCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories(); // Fetch categories when the component mounts
  }, []);

  const handleIcons = () => {
    const tabsBox = tabsBoxRef.current;
    const scrollVal = tabsBox.scrollLeft;
    const maxScrollableWidth = tabsBox.scrollWidth - tabsBox.clientWidth;
    const leftIcon = document.getElementById("left").parentElement;
    const rightIcon = document.getElementById("right").parentElement;
    leftIcon.style.display = scrollVal <= 0 ? "none" : "flex";
    rightIcon.style.display =
      maxScrollableWidth - scrollVal <= 1 ? "none" : "flex";
  };

  const scrollTabs = (direction) => {
    const tabsBox = tabsBoxRef.current;
    tabsBox.scrollLeft += direction === "left" ? -340 : 340;
    handleIcons();
  };

  useEffect(() => {
    handleIcons(); // Handle scroll icon visibility
  }, [filteredCategories]);

  return (
    <div className="categories">
      <div className="category-head">
        <h1>Featured Categories</h1>
        <div className="icon-container">
          <div className="icon" onClick={() => scrollTabs("left")}>
            <FontAwesomeIcon id="left" icon={faAngleLeft} />
          </div>
          <div className="icon" onClick={() => scrollTabs("right")}>
            <FontAwesomeIcon id="right" icon={faAngleRight} />
          </div>
        </div>
      </div>
      <div className="wrapper">
        <ul className="tabs-box" ref={tabsBoxRef}>
          {filteredCategories.map((category, index) => (
            <Link key={index} to={`/category/${category}`} className="tab">
              <div className="inner">
                <img src={anaar} alt="" />
                <span>{category}</span>
              </div>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Listing;

// import React, { useEffect, useRef, useState } from "react";
// import "./listing.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
// import { Link } from "react-router-dom";

// const Listing = () => {
//   const tabsBoxRef = useRef(null);
//   const cardRefs = useRef({});
//   const [isDragging, setIsDragging] = useState(false);

//   const handleIcons = () => {
//     const tabsBox = tabsBoxRef.current;
//     const scrollVal = tabsBox.scrollLeft;
//     const maxScrollableWidth = tabsBox.scrollWidth - tabsBox.clientWidth;
//     const leftIcon = document.getElementById("left").parentElement;
//     const rightIcon = document.getElementById("right").parentElement;
//     leftIcon.style.display = scrollVal <= "flex";
//     rightIcon.style.display =
//       maxScrollableWidth - scrollVal <= 1 ? "none" : "flex";
//   };

//   const scrollTabs = (direction) => {
//     const tabsBox = tabsBoxRef.current;
//     tabsBox.scrollLeft += direction === "left" ? -340 : 340;
//     handleIcons();
//   };

//   const handleMouseDown = () => {
//     setIsDragging(true);
//   };

//   const handleMouseMove = (e) => {
//     if (!isDragging) return;
//     const tabsBox = tabsBoxRef.current;
//     tabsBox.classList.add("dragging");
//     tabsBox.scrollLeft -= e.movementX;
//     handleIcons();
//   };

//   const handleMouseUp = () => {
//     if (isDragging) {
//       setIsDragging(false);
//       tabsBoxRef.current.classList.remove("dragging");
//     }
//   };

//   const handleWheel = (e) => {
//     e.preventDefault();
//     const tabsBox = tabsBoxRef.current;
//     const scrollAmount = e.deltaX || e.deltaY;
//     const adjustedScrollAmount = scrollAmount * 0.5;

//     tabsBox.scrollLeft += adjustedScrollAmount;
//     handleIcons();
//   };

//   const scrollToSection = (section) => {
//     const sectionRef = cardRefs.current[section];
//     if (sectionRef) {
//       sectionRef.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   useEffect(() => {
//     handleIcons(); // Initial call to handle icons visibility
//     const tabsBox = tabsBoxRef.current;
//     tabsBox.addEventListener("wheel", handleWheel, { passive: false });

//     document.addEventListener("mouseup", handleMouseUp);

//     return () => {
//       tabsBox.removeEventListener("wheel", handleWheel);
//       document.removeEventListener("mouseup", handleMouseUp);
//     };
//   }, [isDragging]);

//   return (
//     <>
//       <div className="categories">
//         <div className="category-head">
//           <h1>Featured Categories</h1>
//           <Link href="">Classic Fruits</Link>
//           <Link href="">Apple Farm</Link>
//           <Link href="">Mango Oasis</Link>
//           <div className="icon-container">
//             <div className="icon" onClick={() => scrollTabs("left")}>
//               <FontAwesomeIcon id="left" icon={faAngleLeft} />
//             </div>
//             <div className="icon" onClick={() => scrollTabs("right")}>
//               <FontAwesomeIcon id="right" icon={faAngleRight} />
//             </div>
//           </div>
//         </div>
//         <div className="wrapper">
//           <ul
//             className="tabs-box"
//             ref={tabsBoxRef}
//             onMouseDown={handleMouseDown}
//             onMouseMove={handleMouseMove}
//           >
//             <div>
//               <button
//                 className="tab tab-1"
//                 onClick={() => scrollToSection("section1")}
//               >
//                 Berries Hub
//                 <div className="plus fade-horizontal"></div>
//                 <div className="plus fade-vertical"></div>
//               </button>
//             </div>
//             <button
//               className="tab tab-4"
//               onClick={() => scrollToSection("section3")}
//             >
//               Apple Farm
//             </button>
//             <button
//               className="tab tab-4"
//               onClick={() => scrollToSection("section4")}
//             >
//               Juicy Indulgence
//             </button>
//             <button
//               className="tab tab-5"
//               onClick={() => scrollToSection("section5")}
//             >
//               Crazy Fussions
//             </button>
//             <button
//               className="tab tab-6"
//               onClick={() => scrollToSection("section6")}
//             >
//               Dried Fruits
//             </button>
//             <button
//               className="tab tab-7"
//               onClick={() => scrollToSection("section7")}
//             >
//               Grape Bliss
//             </button>
//             <button
//               className="tab tab-8"
//               onClick={() => scrollToSection("section8")}
//             >
//               Classic Fruits
//             </button>
//             <button
//               className="tab tab-9"
//               onClick={() => scrollToSection("section9")}
//             >
//               Classic Veggies
//             </button>
//             <button
//               className="tab tab-10"
//               onClick={() => scrollToSection("section10")}
//             >
//               Exotic Veggies
//             </button>
//             <button
//               className="tab tab-11"
//               onClick={() => scrollToSection("section11")}
//             >
//               Amber Spheres
//             </button>
//             <button
//               className="tab tab-12"
//               onClick={() => scrollToSection("section12")}
//             >
//               Elegant Greens
//             </button>
//             <button
//               className="tab tab-13"
//               onClick={() => scrollToSection("section13")}
//             >
//               Melon Delights
//             </button>
//             <button
//               className="tab tab-14"
//               onClick={() => scrollToSection("section14")}
//             >
//               Stone Fruits
//             </button>
//             <button
//               className="tab tab-15"
//               onClick={() => scrollToSection("section15")}
//             >
//               Herbs/Leafies
//             </button>
//             <button
//               className="tab tab-16"
//               onClick={() => scrollToSection("section16")}
//             >
//               Mango Oasis
//             </button>
//             <button
//               className="tab tab-17"
//               onClick={() => scrollToSection("section17")}
//             >
//               Organic Veggies
//             </button>
//             <button
//               className="tab tab-18"
//               onClick={() => scrollToSection("section18")}
//             >
//               Organic Fruits
//             </button>
//             <button
//               className="tab tab-19"
//               onClick={() => scrollToSection("section19")}
//             >
//               Seasonal Sensation
//             </button>
//           </ul>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Listing;
