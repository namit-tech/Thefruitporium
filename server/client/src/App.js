// import React, { useState, useEffect } from "react";
// import SwiperSlider from "./components/coursel/SwipeSlider";
// import "./App.css";
// import NavBar from "./components/navbar/Navbar";
// import Listing from "./components/Listings/Listing";
// import CardData from "./components/Cards/CardData";
// import Footer from "./components/Footer/Footer";
// import Fruits from "./components/fruits/Fruits";
// import "boxicons/css/boxicons.min.css";
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   useLocation,
// } from "react-router-dom";
// import Description from "./components/Cards/desciption page/Description";
// import ProductInfo from "./components/Footer/Product Info/ProductInfo";
// import Terms from "./components/Footer/Terms and Conditions/Terms";
// import logovideo from "../src/assets/animationnew.mp4";
// import AdminPanel from "./components/Admin/AdminPanel";

// function App() {
//   // State to control video visibility
//   const [videoEnded, setVideoEnded] = useState(false);

//   // Function to scroll to top on route change
//   const ScrollToTop = () => {
//     const { pathname } = useLocation();

//     useEffect(() => {
//       window.scrollTo(0, 0);
//     }, [pathname]);

//     return null;
//   };

//   // Automatically hide video after a few seconds or when it ends
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setVideoEnded(true);
//     }, 4000); // Fallback in case video fails to end

//     return () => clearTimeout(timer); // Cleanup timer
//   }, []);

//   const handleVideoEnd = () => {
//     setVideoEnded(true); // Video has finished, hide it
//   };

//   return (
//     <>
//       <div className="main-class">
//         Video container
//         <div
//           id="video-container"
//           className={`video-overlay ${videoEnded ? "video-fade" : ""}`}
//         >
//           <video id="intro-video" autoPlay muted onEnded={handleVideoEnd}>
//             <source src={logovideo} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//         </div>

//         {/* Main content of your website */}
//         <Router>
//         <Routes>
//         <Route path="/admin" element={<AdminPanel />} />
//       </Routes>
//           <ScrollToTop />
//           <div className={videoEnded ? "content-visible" : "content-hidden"}>
//             <NavBar />
//             <div className="sticky-nav"></div>
//             <Routes>
//               <Route
//                 path="/"
//                 element={
//                   <>
//                     <SwiperSlider />
//                   </>
//                 }
//               />
//             </Routes>
//             <Listing />
//             <div>
//               <Routes>
//                 <Route
//                   path="/terms"
//                   element={
//                     <>
//                       <Terms />
//                     </>
//                   }
//                 />
//                 <Route
//                   path="/productinfo"
//                   element={
//                     <>
//                       <ProductInfo />
//                     </>
//                   }
//                 />
//               </Routes>
//             </div>
//             <div>
//               <Routes>
//                 <Route
//                   path="/"
//                   element={
//                     <>
//                       <CardData />
//                     </>
//                   }
//                 />
//                 <Route path="/fruits" element={<Fruits />} />
//               </Routes>
//               <Routes>
//                 <Route path="/description" element={<Description />} />
//               </Routes>
//             </div>
//           </div>
//           <Footer />
//         </Router>
//       </div>
//     </>
//   );
// }

// export default App;

// import React, { useState, useEffect } from "react";
// import SwiperSlider from "./components/coursel/SwipeSlider";
// import "./App.css";
// import NavBar from "./components/navbar/Navbar";
// import Listing from "./components/Listings/Listing";
// import CardData from "./components/Cards/CardData";
// import Footer from "./components/Footer/Footer";
// import "boxicons/css/boxicons.min.css";
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   useLocation,
// } from "react-router-dom";
// import Description from "./components/Cards/desciption page/Description";
// import ProductInfo from "./components/Footer/Product Info/ProductInfo";
// import Terms from "./components/Footer/Terms and Conditions/Terms";
// import logovideo from "../src/assets/RENDER.mp4";
// import AdminPanel from "./components/Admin/AdminPanel";
// import CategoryPage from "./components/Listings/CategoryPage/CategoryPage";
// import Banner from "./components/coursel/Banner/Banner";
// import CartPage from "./components/Cart/CartPage";
// import SearchResult from "./components/navbar/SearchResult/SearchResult";
// import Address from "./components/order/Address/Address";
// import Payment from "./components/order/payment/Payment";
// import { ToastContainer } from "react-toastify";
// import AdminDashboard from "./components/Admin/AdminDashboard";
// import AdminProductsEdit from "./components/Admin/Products/AdminProductsEdit";

// function App() {
//   const [videoEnded, setVideoEnded] = useState(false);
//   const isAuthenticated = localStorage.getItem("adminToken"); // Check if the admin is logged in

//   const ScrollToTop = () => {
//     const { pathname } = useLocation();

//     useEffect(() => {
//       window.scrollTo(0, 0);
//     }, [pathname]);

//     return null;
//   };

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setVideoEnded(true);
//     }, 8000);

//     return () => clearTimeout(timer);
//   }, []);

//   const handleVideoEnd = () => {
//     setVideoEnded(true); // Video has finished, hide it
//   };

//   // Main Content Render
//   const MainContent = () => {
//     const location = useLocation(); // useLocation must be inside Router

//     return (
//       <>
//         {/* Only render NavBar and Footer for main website routes */}
//         {location.pathname !== "/admin" && (
//           <>
//             <NavBar />
//             <div className="sticky-nav"></div>
//           </>
//         )}

//         <Routes>
//           <Route
//             path="/"
//             element={
//               <>
//                 <SwiperSlider />
//                 <Banner />
//                 <Listing />
//                 <CardData />
//               </>
//             }
//           />
//           <Route path="/category/:categoryName" element={<CategoryPage />} />
//           <Route path="/searchresult" element={<SearchResult />} />
//           <Route path="/description/:id" element={<Description />} />
//           <Route path="/cartpage" element={<CartPage />} />
//           <Route path="/address" element={<Address />} />
//           <Route path="/payment" element={<Payment />} />
//           <Route path="/terms" element={<Terms />} />
//           <Route path="/productinfo" element={<ProductInfo />} />
//         </Routes>

//         {/* Only render Footer for main website routes */}
//         {location.pathname !== "/admin" && <Footer />}
//       </>
//     );
//   };

//   // Admin Content Render (without NavBar and Footer)
//   const AdminContent = () => {
//     return (
//       <>
//         <div className="admin-layout">
//           {/* if(isloggedIn){<AdminDashboard />} else{<AdminPanel />} */}
//           <div className="admin-content">
//             <Routes>
//               <Route path="/admin" element={<AdminPanel />} />
//               <Route path="/admin/dashboard" element={<AdminDashboard />} />
//               <Route
//                 path="/admin/products/edit"
//                 element={<AdminProductsEdit />}
//               />
//             </Routes>
//           </div>
//         </div>
//       </>
//     );
//   };

//   return (
//     <>
//       <div className="main-class">
//         <Router>
//           <ScrollToTop />
//           <div className={videoEnded ? "content-visible" : "content-hidden"}>
//             {/* Render admin content or main content based on route */}
//             {window.location.pathname.startsWith("/admin") ? (
//               <AdminContent />
//             ) : (
//               <MainContent />
//             )}
//           </div>
//         </Router>
//       </div>
//       <ToastContainer
//         style={{
//           position: "absolute",
//           top: "320px", // Adjust as needed
//           left: "500px", // Adjust as needed
//         }}
//       />
//     </>
//   );
// }

// export default App;
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "boxicons/css/boxicons.min.css";
import "react-toastify/dist/ReactToastify.css";
import SwiperSlider from "./components/coursel/SwipeSlider";
import NavBar from "./components/navbar/Navbar";
import Listing from "./components/Listings/Listing";
import CardData from "./components/Cards/CardData";
import Footer from "./components/Footer/Footer";
import Description from "./components/Cards/desciption page/Description";
import ProductInfo from "./components/Footer/Product Info/ProductInfo";
import Terms from "./components/Footer/Terms and Conditions/Terms";
import AdminPanel from "./components/Admin/AdminPanelLogin/AdminPanel"; // Login Page
import CategoryPage from "./components/Listings/CategoryPage/CategoryPage";
import Banner from "./components/coursel/Banner/Banner";
import CartPage from "./components/Cart/CartPage";
import SearchResult from "./components/navbar/SearchResult/SearchResult";
import Address from "./components/order/Address/Address";
import Payment from "./components/order/payment/Payment";
import AdminDashboard from "./components/Admin/AdminDashboard"; // Admin Dashboard
import AdminProductsEdit from "./components/Admin/Products/edit/AdminProductsEdit"; // Edit Products
import SalesGraph from "./components/Admin/sales/SalesGraph";
import AdminProductList from "./components/Admin/Products/List/AdminProductList";
import AdminProductCreate from "./components/Admin/Products/create/AdminProductCreate";
import AdminOrderList from "./components/Admin/orders/List/AdminOrderList";
import AdminOrderDetails from "./components/Admin/orders/Details/AdminOrderDetails";
import AdminCustomerList from "./components/Admin/customers/list/AdminCustomerList";
import AdminCustomerDetails from "./components/Admin/customers/details/AdminCustomerDetails";
import AdminAccount from "./components/Admin/Account/AdminAccount";
import AdminNavbar from "./components/Admin/Navbar/AdminNavbar";
import AdminProfile from "./components/Admin/Account/Profile/AdminProfile";
import AdminSecurity from "./components/Admin/Account/Security/AdminSecurity";
import AdminBilling from "./components/Admin/Account/Billing/AdminBilling";
import AdminCalendar from "./components/Admin/calender/AdminCalender";
import axios from "axios";

function App() {
  const [videoEnded, setVideoEnded] = useState(false); // Video end state

  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setVideoEnded(true);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Get the current visit count from localStorage
    const visitCount = localStorage.getItem("visitCount");

    // Increment the visit count
    const newVisitCount = visitCount ? parseInt(visitCount) + 1 : 1;

    // Update the visit count in localStorage
    localStorage.setItem("visitCount", newVisitCount);

    // Send the visit count to the backend
    axios
      .post("http://localhost:5000/api/impression", {
        visitCount: newVisitCount,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error saving impression:", error);
      });
  }, []);

  // Private route for admin authentication

  // Main Content for Public Pages
  const MainContent = () => (
    <>
      <NavBar />
      <div className="sticky-nav"></div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <SwiperSlider />
              <Banner />
              <Listing />
              <CardData />
            </>
          }
        />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/searchresult" element={<SearchResult />} />
        <Route path="/description/:id" element={<Description />} />
        <Route path="/cartpage" element={<CartPage />} />
        <Route path="/address" element={<Address />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/productinfo" element={<ProductInfo />} />
      </Routes>
      <Footer />
    </>
  );

  const AdminContent = () => (
    <>
      <Routes>
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/overview" element={<SalesGraph />} />
        <Route path="/admin/products/list" element={<AdminProductList />} />
        <Route path="/admin/products/create" element={<AdminProductCreate />} />
        <Route path="/admin/order/list" element={<AdminOrderList />} />
        <Route
          path="/admin/order/details/:id"
          element={<AdminOrderDetails />}
        />
        <Route
          path="/admin/products/edit/:id"
          element={<AdminProductsEdit />}
        />
        <Route path="/admin/customers/list" element={<AdminCustomerList />} />
        <Route
          path="/admin/customer/details/:id"
          element={<AdminCustomerDetails />}
        />
        <Route path="/admin/account/settings" element={<AdminAccount />} />
        <Route
          path="/admin/account/settings/profile"
          element={<AdminProfile />}
        />
        <Route
          path="/admin/account/settings/security"
          element={<AdminSecurity />}
        />
        <Route
          path="/admin/account/settings/billing"
          element={<AdminBilling />}
        />
        <Route path="/admin/calender" element={<AdminCalendar />} />
      </Routes>
    </>
  );

  return (
    <div className="main-class">
      <Router>
        <ScrollToTop />
        <div className={videoEnded ? "content-visible" : "content-hidden"}>
          {window.location.pathname.startsWith("/admin") ? (
            <AdminContent />
          ) : (
            <MainContent />
          )}
        </div>
      </Router>
      <ToastContainer
        style={{
          position: "absolute",
          top: "320px",
          left: "500px",
        }}
      />
    </div>
  );
}

export default App;
