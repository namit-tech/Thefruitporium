// import React, { useEffect, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faAngleUp, faCircle } from "@fortawesome/free-solid-svg-icons";
// import fruitporiumlogo from "../../assets/fruitporiumonlylogo.png";
// import fruitporiumtext from "../../assets/fruitporiumtext.png";
// import "./admindashboard.css";
// import { useNavigate } from "react-router";

// const AdminDashboard = () => {
//   const [featuresOpen, setFeaturesOpen] = useState(false);
//   const [servicesOpen, setServicesOpen] = useState(false);
//   const navigate = useNavigate();

//   const toggleFeatures = () => {
//     setFeaturesOpen(!featuresOpen);
//     console.log("Features Open:", !featuresOpen);
//   };

//   const toggleServices = () => {
//     setServicesOpen(!servicesOpen);
//     console.log("Services Open:", !servicesOpen);
//   };

//   useEffect(() => {
//     const savedToken = localStorage.getItem("adminToken");
//     if (!savedToken) {
//       navigate("/admin");
//     }
//   }, [navigate]);

//   return (
//     <>
//       <nav className="sidebar-admin">
//         <div className="admin-imgtext">
//           <img className="logo-image" src={fruitporiumlogo} alt="" />
//           <img className="logo-text" src={fruitporiumtext} alt="" />
//         </div>
//         <ul>
//           <li className="active-admin"></li>
//           <li>
//             <a
//               href="#"
//               className="feat-btn-admin"
//               onClick={(e) => {
//                 e.preventDefault();
//                 toggleFeatures();
//               }}
//             >
//               Features{" "}
//               <FontAwesomeIcon
//                 icon={faAngleUp}
//                 className={`rotate ${featuresOpen ? "rotate-open" : ""}`}
//               />
//             </a>
//             <ul className={`feat-show-admin ${featuresOpen ? "show" : ""}`}>
//               <li>
//                 <a href="#">
//                   <FontAwesomeIcon icon={faCircle} className="bullet" />
//                   Pages
//                 </a>
//               </li>
//               <li>
//                 <a href="#">
//                   <FontAwesomeIcon icon={faCircle} className="bullet" />
//                   Pages
//                 </a>
//               </li>
//             </ul>
//           </li>
//           <li>
//             <a
//               href="#"
//               className="feat-btn-admin"
//               onClick={(e) => {
//                 e.preventDefault();
//                 toggleFeatures();
//               }}
//             >
//               Features{" "}
//               <FontAwesomeIcon
//                 icon={faAngleUp}
//                 className={`rotate ${featuresOpen ? "rotate-open" : ""}`}
//               />
//             </a>
//             <ul className={`feat-show-admin ${featuresOpen ? "show" : ""}`}>
//               <li>
//                 <a href="#">
//                   <FontAwesomeIcon icon={faCircle} className="bullet" />
//                   Pages
//                 </a>
//               </li>
//               <li>
//                 <a href="#">
//                   <FontAwesomeIcon icon={faCircle} className="bullet" />
//                   Pages
//                 </a>
//               </li>
//             </ul>
//           </li>
//           <li>
//             <a
//               href="#"
//               className="feat-btn-admin"
//               onClick={(e) => {
//                 e.preventDefault();
//                 toggleFeatures();
//               }}
//             >
//               Features{" "}
//               <FontAwesomeIcon
//                 icon={faAngleUp}
//                 className={`rotate ${featuresOpen ? "rotate-open" : ""}`}
//               />
//             </a>
//             <ul className={`feat-show-admin ${featuresOpen ? "show" : ""}`}>
//               <li>
//                 <a href="#">
//                   <FontAwesomeIcon icon={faCircle} className="bullet" />
//                   Pages
//                 </a>
//               </li>
//               <li>
//                 <a href="#">
//                   <FontAwesomeIcon icon={faCircle} className="bullet" />
//                   Pages
//                 </a>
//               </li>
//             </ul>
//           </li>
//         </ul>
//       </nav>
//     </>
//   );
// };

// export default AdminDashboard;

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleUp,
  faCircle,
  faBox,
  faCartShopping,
  faUserGroup,
  faUser,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import fruitporiumlogo from "../../assets/fruitporiumonlylogo.png";
import fruitporiumtext from "../../assets/fruitporiumtext.png";
import "./admindashboard.css";
import { Routes, useNavigate } from "react-router";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [dropdownStates, setDropdownStates] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const savedToken = localStorage.getItem("adminToken");
    if (!savedToken) {
      navigate("/admin");
    }
  }, [navigate]);

  const toggleDropdown = (key) => {
    setDropdownStates((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const optionsData = [
    {
      label: "Products",
      icon: faBox,
      options: [
        // { name: "Edit", path: "/admin/products/edit" },
        { name: "List", path: "/admin/products/list" },
        { name: "Create", path: "/admin/products/create" },
      ],
    },
    {
      label: "Orders",
      icon: faCartShopping,
      options: [
        { name: "List", path: "/admin/order/list" },
        { name: "Details", path: "/admin/order/details" },
      ],
    },
    {
      label: "Customers",
      icon: faUserGroup,
      options: [
        { name: "List", path: "/admin/customers/list" },
        { name: "Details", path: "/admin/customer/details" },
      ],
    },
    {
      label: "Account",
      icon: faUser,
      options: [{ name: "Settings", path: "/admin/account/settings" }],
    },
    {
      label: "Calendar",
      icon: faCalendar,
      options: [{ name: "View", path: "/admin/calender" }],
    },
  ];

  return (
    <>
      <div className="background-admin">
        <nav className="sidebar-admin">
          <Link to="/admin/overview">
            <div className="admin-imgtext">
              <img className="logo-image" src={fruitporiumlogo} alt="" />
              <img className="logo-text" src={fruitporiumtext} alt="" />
            </div>
          </Link>
          <Link to="/admin/overview" className="dashboard-head">
            <h2>DashBoard</h2>
          </Link>
          <ul>
            {optionsData.map((item, index) => (
              <li key={index}>
                <a
                  href="/"
                  className="feat-btn-admin"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleDropdown(item.label);
                  }}
                >
                  <FontAwesomeIcon icon={item.icon} className="label-icon" />{" "}
                  {item.label}
                  <FontAwesomeIcon
                    icon={faAngleUp}
                    className={`rotate ${
                      dropdownStates[item.label] ? "rotate-open" : ""
                    }`}
                  />
                </a>
                <ul
                  className={`feat-show-admin ${
                    dropdownStates[item.label] ? "show" : ""
                  }`}
                >
                  {item.options.map((option, idx) => (
                    <li key={idx}>
                      <a
                        href="/"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(option.path);
                        }}
                      >
                        <FontAwesomeIcon icon={faCircle} className="bullet" />
                        {option.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default AdminDashboard;
