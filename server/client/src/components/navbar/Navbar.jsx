import React, { useState, useEffect } from "react";
import "./navbar.css";
import Login from "./login/Login";
import logo from "../../assets/THE FRUITPORIUM LOGO.png";
import "boxicons/css/boxicons.min.css";
import { Button, Dropdown, Offcanvas } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Cart from "./Cart/Cart";
import Signup from "./signup/Signup";
import InputGroup from "react-bootstrap/InputGroup";
import LocationDropdown from "./Location/LocationDropwdown";
import axios from "axios";
import { getAuth, signOut } from "firebase/auth";

const NavBar = () => {
  const [modalShow, setModalShow] = useState(false);
  const [modalSignShow, setModalSignShow] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredB2b, setIsHoveredB2b] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  // const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [animationClass, setAnimationClass] = useState("fade-in");
  const [locationMessage, setLocationMessage] = useState("");
  const [isHoveredLocation, setIsHoveredLocation] = useState(false);
  const [productNames, setProductNames] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  // const [modalLoginShow, setModalLoginShow] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  // const apiUrl = "http://localhost:5000";
  // const handleOpenOffcanvas = () => setShowOffcanvas(true);
  // const handleCloseOffcanvas = () => setShowOffcanvas(false);

  const handleNavigation = () => {
    navigate("/listings", { replace: true });
  };

  useEffect(() => {
    const fetchProductNames = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/product-names`);
        setProductNames(res.data);
        setFilteredProducts(res.data);
      } catch (error) {
        console.error("Error fetching product names:", error);
      }
    };
    fetchProductNames();
  }, []);

  useEffect(() => {
    if (search && productNames.length > 0) {
      const results = productNames.filter(
        (product) =>
          product.Name &&
          product.Name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredProducts(results);
      console.log("Filtered results:", results);
    } else {
      setFilteredProducts(productNames);
    }
  }, [search, productNames]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchClick = () => {
    navigate("/searchresult", { state: { filteredProducts } });
  };

  const handleLogout = () => {
    setIsVerified(false);
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("User signed out successfully");
        // Remove user data from localStorage
        localStorage.removeItem("userToken");
        localStorage.removeItem("userPhone");
        setIsVerified(false);
        navigate("/");
      })
      .catch((error) => {
        console.log("Error signing out:", error);
      });
  };

  const successDropdown = {
    borderRadius: "5px",
    backgroundColor: isHoveredLocation ? "#709F41" : "#f2f2f2",
    color: isHoveredLocation ? "white" : "black",
    fontSize: "13px",
    height: "6vh",
    width: "6.5vw",
    border: "none",
  };

  const B2BDropdown = {
    borderRadius: "0px 5px 5px 0px",
    backgroundColor: isHoveredB2b ? "#709F41" : "white",
    color: isHoveredB2b ? "white" : "black",
    fontSize: "15px",
    marginTop: "17px",
    height: "6vh",
    width: "6vw",
    fontWeight: "500",
  };
  const myAccount = {
    borderRadius: "5px",
    backgroundColor: isHoveredB2b ? "#709F41" : "white",
    color: isHoveredB2b ? "white" : "black",
    fontSize: "15px",
    marginTop: "17px",
    height: "6vh",
    width: "7vw",
  };

  const B2CDropdown = {
    borderRadius: "5px 0px 0px 5px",
    backgroundColor: isHovered ? "#709F41" : "white",
    color: isHovered ? "white" : "black",
    fontSize: "15px",
    marginTop: "17px",
    height: "6vh",
    width: "6vw",
    fontWeight: "500",
  };

  const handleFocus = () => {
    setAnimationClass("fade-out");
    setIsFocused(true);
  };

  const handleBlur = () => {
    setAnimationClass("fade-in");
    setIsFocused(false);
  };

  const handleCategoryClick = () => {
    document.getElementById("search-input").focus();
  };

  const handleLocationChange = (message) => {
    setLocationMessage(message);
  };

  const placeholders = [
    "Search for apples...",
    "Search for oranges...",
    "Search for bananas...",
    "Search for mangoes...",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationClass("fade-out");
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
        setAnimationClass("fade-in");
      }, 500); // Duration of fade out
    }, 3000); // Change placeholder every 3 seconds

    return () => clearInterval(interval);
  }, [placeholders.length]);

  return (
    <>
      <div className="sticky">
        <nav>
          <div className="logo-text">
            <Link to="/">
              <img src={logo} alt="no icon" className="logo" />
            </Link>
          </div>
          {/* <i
            className="bx bx-menu hamburger-icon"
            onClick={handleOpenOffcanvas}
          ></i>
          <Offcanvas show={showOffcanvas} onHide={handleCloseOffcanvas}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body></Offcanvas.Body>
          </Offcanvas> */}

          <div className="delivery">
            <Dropdown>
              <Dropdown.Toggle
                id="dropdown-basic"
                style={successDropdown}
                onMouseEnter={() => setIsHoveredLocation(true)}
                onMouseLeave={() => setIsHoveredLocation(false)}
              >
                New Delhi
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <h1 className="location-head">Change the Location</h1>
                <div className="location-dropdown">
                  <LocationDropdown onLocationChange={handleLocationChange} />
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className="search-bar-container">
            <InputGroup className="custom-search-bar">
              {/* <Link to="/listings" className="category-dropdown">
                Categories
              </Link> */}
              <button onClick={handleNavigation} className="category-dropdown">
                Categories
              </button>
              <input
                id="search-input"
                placeholder={placeholders[currentIndex]}
                aria-label="Search"
                className={`search-input search-bar`}
                value={search}
                onChange={handleSearchChange}
              />
              <button className="search-button" onClick={handleSearchClick}>
                <i className="bx bx-search"></i>
              </button>
            </InputGroup>
          </div>

          <div className="number">
            <p>For Support?</p>
            <h5>+919911719993</h5>
          </div>
          <div className="buttn">
            <Dropdown>
              <Dropdown.Toggle
                id="dropdown-basic"
                variant="light"
                style={B2CDropdown}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                B2C
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setModalSignShow(true)}>
                  Sign up
                </Dropdown.Item>

                {!isVerified ? (
                  <Dropdown.Item onClick={() => setModalShow(true)}>
                    Login
                  </Dropdown.Item>
                ) : (
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      My Account
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item as={Link} to="/payment">
                        Orders
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="/cartpage">
                        My Cart
                      </Dropdown.Item>
                      <Dropdown.Item onClick={handleLogout}>
                        Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle
                id="dropdown-basic"
                variant="light"
                style={B2BDropdown}
                onMouseEnter={() => setIsHoveredB2b(true)}
                onMouseLeave={() => setIsHoveredB2b(false)}
              >
                B2B
              </Dropdown.Toggle>
            </Dropdown>
          </div>
          {!isVerified ? (
            <button className="user-login" onClick={() => setModalShow(true)}>
              <p>Login</p>
            </button>
          ) : (
            <Dropdown>
              <Dropdown.Toggle
                style={myAccount}
                className="user-login"
                id="dropdown-basic"
              >
                My Account
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/payment">
                  Orders
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/cartpage">
                  My Cart
                </Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
          <Link className="cart-link" to="/cartpage">
            <Cart />
          </Link>
        </nav>
      </div>
      <Signup show={modalSignShow} onHide={() => setModalSignShow(false)} />
      <Login
        show={modalShow}
        onHide={() => setModalShow(false)}
        setIsVerified={setIsVerified}
      />
    </>
  );
};

export default NavBar;

// import React, { useState, useEffect } from "react";
// import "./navbar.css";
// import Login from "./login/Login";
// import Signup from "./signup/Signup";
// import logo from "../../assets/THE FRUITPORIUM LOGO.png";
// import { Button, Dropdown, Offcanvas, InputGroup } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";
// import Cart from "./Cart/Cart";
// import LocationDropdown from "./Location/LocationDropwdown";
// import axios from "axios";

// const NavBar = () => {
//   const [modalShow, setModalShow] = useState(false);
//   const [modalSignShow, setModalSignShow] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);
//   const [isHoveredB2b, setIsHoveredB2b] = useState(false);
//   const [isVerified, setIsVerified] = useState(false);
//   const [isFocused, setIsFocused] = useState(false);
//   const [showOffcanvas, setShowOffcanvas] = useState(false);
//   const [animationClass, setAnimationClass] = useState("fade-in");
//   const [locationMessage, setLocationMessage] = useState("");
//   const [productNames, setProductNames] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [search, setSearch] = useState("");
//   const navigate = useNavigate(); // React Router hook for navigation
//   const [placeholders, setPlaceholders] = useState([
//     "Search for apples...",
//     "Search for oranges...",
//     "Search for bananas...",
//     "Search for mangoes...",
//   ]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const handleOpenOffcanvas = () => setShowOffcanvas(true);
//   const handleCloseOffcanvas = () => setShowOffcanvas(false);

//   useEffect(() => {
//     const fetchProductNames = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/product-names");
//         console.log("Fetched Products:", res.data);
//         setProductNames(res.data);
//         setFilteredProducts(res.data);
//       } catch (error) {
//         console.error("Error fetching product names:", error);
//       }
//     };
//     fetchProductNames();
//   }, []);

//   useEffect(() => {
//     if (search && productNames.length > 0) {
//       const results = productNames.filter(
//         (product) =>
//           product.Name &&
//           product.Name.toLowerCase().includes(search.toLowerCase())
//       );
//       setFilteredProducts(results);
//       console.log("Filtered results:", results);
//     } else {
//       setFilteredProducts(productNames);
//     }
//   }, [search, productNames]);

//   const handleSearchChange = (e) => {
//     setSearch(e.target.value);
//   };

//   const handleSearchClick = () => {
//     // Navigate to /searchresult with state
//     navigate("/searchresult", { state: { filteredProducts } });
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setAnimationClass("fade-out");
//       setTimeout(() => {
//         setCurrentIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
//         setAnimationClass("fade-in");
//       }, 500);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, [placeholders.length]);

//   // Styles
//   const dropdownStyles = (isHovered) => ({
//     borderRadius: "5px",
//     backgroundColor: isHovered ? "#709F41" : "#f2f2f2",
//     color: isHovered ? "white" : "black",
//     fontSize: "10px",
//     height: "4vh",
//     width: "5vw",
//     border: "none",
//   });

//   return (
//     <>
//       <div className="sticky">
//         <nav>
//           <div className="logo-text">
//             <Link to="/">
//               <img src={logo} alt="Fruitporium Logo" className="logo" />
//             </Link>
//           </div>

//           {/* Hamburger Menu */}
//           {/* <i
//             className="bx bx-menu hamburger-icon"
//             onClick={handleOpenOffcanvas}
//           ></i>
//           <Offcanvas show={showOffcanvas} onHide={handleCloseOffcanvas}>
//             <Offcanvas.Header closeButton />
//             <Offcanvas.Body />
//           </Offcanvas> */}

//           {/* Location Dropdown */}
//           <div className="delivery">
//             <Dropdown>
//               <Dropdown.Toggle
//                 id="dropdown-basic"
//                 style={dropdownStyles(false)}
//               >
//                 New Delhi
//               </Dropdown.Toggle>
//               <Dropdown.Menu>
//                 <h1 className="location-head">Change the Location</h1>
//                 <LocationDropdown onLocationChange={setLocationMessage} />
//               </Dropdown.Menu>
//             </Dropdown>
//           </div>

//           {/* Search Bar */}
//           <div className="search-bar-container">
//             <InputGroup className="custom-search-bar">
//               <Link to="#listing" className="category-dropdown">
//                 Categories
//               </Link>
//               <input
//                 id="search-input"
//                 placeholder={placeholders[currentIndex]}
//                 aria-label="Search"
//                 className={`search-input search-bar`}
//                 value={search}
//                 onChange={handleSearchChange}
//               />
//                  <button className="search-button" onClick={handleSearchClick}>
//         <i className="bx bx-search"></i>
//       </button>
//             </InputGroup>
//           </div>

//           <div className="number">
//             <p>For Support?</p>
//             <h5>+919911719993</h5>
//           </div>

//           {/* User Dropdown */}
//           <div className="buttn">
//             <Dropdown>
//               <Dropdown.Toggle
//                 id="dropdown-basic"
//                 style={dropdownStyles(isHovered)}
//                 onMouseEnter={() => setIsHovered(true)}
//                 onMouseLeave={() => setIsHovered(false)}
//               >
//                 B2C
//               </Dropdown.Toggle>
//               <Dropdown.Menu>
//                 <Dropdown.Item onClick={() => setModalSignShow(true)}>
//                   Sign up
//                 </Dropdown.Item>
//                 <Signup
//                   show={modalSignShow}
//                   onHide={() => setModalSignShow(false)}
//                 />
//                 {!isVerified ? (
//                   <Dropdown.Item onClick={() => setModalShow(true)}>
//                     Login
//                   </Dropdown.Item>
//                 ) : (
//                   <Dropdown>
//                     <Dropdown.Toggle variant="success" id="dropdown-basic">
//                       My Account
//                     </Dropdown.Toggle>
//                     <Dropdown.Menu>
//                       <Dropdown.Item>Orders</Dropdown.Item>
//                       <Dropdown.Item>My Cart</Dropdown.Item>
//                       <Dropdown.Item>Logout</Dropdown.Item>
//                     </Dropdown.Menu>
//                   </Dropdown>
//                 )}
//                 <Login show={modalShow} onHide={() => setModalShow(false)} />
//               </Dropdown.Menu>
//             </Dropdown>
//           </div>

//           {/* Cart Link */}
//           <Link className="cart-link" to="/cartpage">
//             <Cart />
//           </Link>
//         </nav>
//       </div>
//     </>
//   );
// };

// export default NavBar;
