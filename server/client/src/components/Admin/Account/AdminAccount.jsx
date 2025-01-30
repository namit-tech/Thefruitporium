import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faFileInvoiceDollar, faLock } from "@fortawesome/free-solid-svg-icons";
import AdminDashboard from "../AdminDashboard";
import AdminNavbar from "../Navbar/AdminNavbar";
import AdminProfile from "./Profile/AdminProfile";
import AdminSecurity from "./Security/AdminSecurity";
import AdminBilling from "./Billing/AdminBilling";
import "./adminaccount.css";

const AdminAccount = () => {
  const Accountoption = [
    { label: "Profile", icon: faCircleUser, path: "/admin/account/settings/profile" },
    { label: "Security", icon: faLock, path: "/admin/account/settings/security" },
    { label: "Billing", icon: faFileInvoiceDollar, path: "/admin/account/settings/billing" },
  ];

  return (
    <>
      <AdminDashboard />
      <AdminNavbar />
      <h4 className="settings-head">Settings</h4>
      <div className="admin-container">
        <div className="account-sidebar">
          {Accountoption.map((item, index) => (
            <Link to={item.path} key={index} className="account-option">
              <FontAwesomeIcon icon={item.icon} className="account-icon" />
              <p>{item.label}</p>
            </Link>
          ))}
        </div>
        <div className="account-details">
          <Routes>
            <Route path="/admin/account/settings/profile" element={<AdminProfile />} />
            <Route path="/admin/account/settings/security" element={<AdminSecurity />} />
            <Route path="/admin/account/settings/billing" element={<AdminBilling />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default AdminAccount;



// import React from "react";
// import { NavLink, Outlet } from "react-router-dom";
// import "./adminaccount.css";
// import AdminDashboard from "../AdminDashboard";
// import { faCircleUser, faFileInvoiceDollar, faLock } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import AdminNavbar from "../Navbar/AdminNavbar";

// const AdminAccount = () => {
//   const Accountoption = [
//     { label: "Profile", icon: faCircleUser, path: "profile" },
//     { label: "Security", icon: faLock, path: "security" },
//     { label: "Billing", icon: faFileInvoiceDollar, path: "billing" },
//   ];

//   return (
//     <>
//       <AdminDashboard />
//       <AdminNavbar />
//       <h4 className="settings-head">Settings</h4>
//       <div className="admin-container">
//         <div className="account-sidebar">
//           {Accountoption.map((item, index) => (
//             <NavLink
//               key={index}
//               to={item.path}
//               className={({ isActive }) => `account-option ${isActive ? "active" : ""}`}
//             >
//               <FontAwesomeIcon icon={item.icon} className="account-icon" />
//               <p>{item.label}</p>
//             </NavLink>
//           ))}
//         </div>
//         <div className="account-details">
//           {/* Nested routes rendered here */}
//           <Outlet />
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminAccount;




