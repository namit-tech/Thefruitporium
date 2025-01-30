import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import logo from "../../../assets/THE FRUITPORIUM LOGO.png";
import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "./signup.css";
const apiUrl = process.env.REACT_APP_API_URL;
// const apiUrl = "http://localhost:5000";
console.log("signin url", apiUrl);


const Signup = ({ onHide, ...props }) => {
  const [formData, setFormData] = useState({
    uCredentials: { uEmail: "" },
    uProfile: { uName: "", uPhone: "" },
    uAddress: { uZipCode: "", uHouseNumber: "", uArea: "", uCity: "" },
  });

  const toastOptions = {
    hideProgressBar: false,
    closeOnClick: true,
    autoClose: 3000, // Close after 3 seconds
    draggable: true,
    theme: "light", // Light theme
  };

  // Update handleChange to handle nested objects
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Dynamically update the corresponding state field
    const [section, field] = name.split(".");
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { uCredentials, uProfile, uAddress } = formData;
  
      if (!uCredentials.uEmail || !uProfile.uName || !uProfile.uPhone  || !uAddress.uCity) {
        toast.warning("All fields are required", toastOptions);
        return;
      }
  
      const formattedData = {
        uCredentials: { uEmail: uCredentials.uEmail },
        uProfile: { uName: uProfile.uName, uPhone: uProfile.uPhone },
        uAddress: { uZipCode: uAddress.uZipCode, uHouseNumber: uAddress.uHouseNumber, uArea: uAddress.uArea, uCity: uAddress.uCity },
      };
  
      const response = await axios.post(`${apiUrl}/api/users/create`, formattedData);
      console.log("Response received:", response);
  
      setFormData({
        uCredentials: { uEmail: "" },
        uProfile: { uName: "", uPhone: "" },
        uAddress: { uZipCode: "", uHouseNumber: "", uArea: "", uCity: "" },
      });
      toast.success("Signup successful!", toastOptions);
    } catch (err) {
      console.log("Error:", err.response || err.message);
      if (err.response && err.response.status === 400) {
        toast.error(err.response.data.error || "Phone number already registered", toastOptions);
      } else {
        toast.error("Something went wrong", toastOptions);
      }
    }
  };
  

  return (
    <>
      <Modal
        className="signup-modal"
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={onHide} // Automatically triggers the onHide when clicking outside the modal
      >
        <Modal.Header className="signup-modal-header">
          <div className="form-container">
            <div className="form-header">
              <img src={logo} alt="Logo" className="form-logo" />
              <h6>Where Nature's Sweetest Gifts Gather</h6>
              <div className="icon-div">
                <FaInstagramSquare className="social-icon" />
                <FaFacebook className="social-icon" />
              </div>
            </div>
            <form onSubmit={handleSubmit} className="form-body">
              <div className="form-group">
                <input
                  className="form-input"
                  type="text"
                  name="uProfile.uName"
                  value={formData.uProfile.uName}
                  onChange={handleChange}
                  required
                />
                <label className="form-label">Name</label>
              </div>
              <div className="form-group">
                <input
                  className="form-input"
                  type="email"
                  name="uCredentials.uEmail"
                  value={formData.uCredentials.uEmail}
                  onChange={handleChange}
                  required
                />
                <label className="form-label">Email</label>
              </div>
              <div className="form-group">
                <input
                  className="form-input"
                  type="text"
                  name="uProfile.uPhone"
                  value={formData.uProfile.uPhone}
                  onChange={handleChange}
                  required
                />
                <label className="form-label">Phone</label>
              </div>
              <div className="form-group">
                <input
                  className="form-input"
                  type="text"
                  name="uAddress.uArea"
                  value={formData.uAddress.uArea}
                  onChange={handleChange}
                  required
                />
                <label className="form-label">Area</label>
              </div>
              <div className="form-group">
                <input
                  className="form-input"
                  type="text"
                  name="uAddress.uCity"
                  value={formData.uAddress.uCity}
                  onChange={handleChange}
                  required
                />
                <label className="form-label">City</label>
              </div>
              <button type="submit" className="form-submit-button">
                Submit
              </button>
            </form>
          </div>
        </Modal.Header>
      </Modal>
      <ToastContainer
        style={{
          position: "absolute",
          top: "320px", // Adjust as needed
          left: "500px", // Adjust as needed
        }}
      />
    </>
  );
};

export default Signup;

// import React, { useState } from "react";
// import logo from "../../../assets/THE FRUITPORIUM LOGO.png";
// import Modal from "react-bootstrap/Modal";
// import { FaInstagramSquare } from "react-icons/fa";
// import { FaFacebook } from "react-icons/fa";
// import "./signup.css";

// const Signup = ({ setIsVerified, ...props }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     zipcode: "",
//     houseno: "",
//     area: "",
//     city: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form Data Submitted: ", formData);
//   };

//   return (
//     <Modal
//       className="signup-modal"
//       {...props}
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//     >
//       <Modal.Header className="signup-modal-header">
//         <div className="form-container">
//           <div className="form-header">
//             <img src={logo} alt="Logo" className="form-logo" />
//             <h6>Where Nature's Sweetest Gifts Gather</h6>
//             <div className="icon-div">
//             <FaInstagramSquare className="social-icon" />
//             <FaFacebook className="social-icon" />
//             </div>
//           </div>
//           <form onSubmit={handleSubmit} className="form-body">
//             <div className="form-group">
//               <input
//                 className="form-input"
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//               />
//               <label className="form-label">Name</label>
//             </div>
//             <div className="form-group">
//               <input
//                 className="form-input"
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//               <label className="form-label">Email</label>
//             </div>
//             <div className="form-group">
//               <input
//                 className="form-input"
//                 type="text"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 required
//               />
//               <label className="form-label">Phone</label>
//             </div>

//             <div className="form-group">
//               <input
//                 className="form-input"
//                 type="text"
//                 name="area"
//                 value={formData.area}
//                 onChange={handleChange}
//                 required
//               />
//               <label className="form-label">Area</label>
//             </div>
//             <div className="form-group">
//               <input
//                 className="form-input"
//                 type="text"
//                 name="city"
//                 value={formData.city}
//                 onChange={handleChange}
//                 required
//               />
//               <label className="form-label">City</label>
//             </div>
//             <button type="submit" className="form-submit-button">
//               Submit
//             </button>
//           </form>
//         </div>
//       </Modal.Header>
//     </Modal>
//   );
// };

// export default Signup;
