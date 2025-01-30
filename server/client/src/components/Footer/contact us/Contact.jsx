import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./contact.css";

const Contact = ({ show, onHide }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/mail/send-mail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Send the form data
      });
      
      
      const result = await response.json();
      if (response.ok) {
        alert("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        onHide(); // Close modal after successful submission
      } else {
        alert(result.error || "Failed to send message.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <Modal
      className="custom-modal blurr-backdrop"
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="true"
    >
      <Modal.Body>
        <form className="main-section" onSubmit={handleSubmit}>
          <div className="section-1">
            <div className="part-1">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <input
              className="subject-input"
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
            <textarea
              className="textarea"
              rows="10"
              cols="50"
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button className="btn-form" type="submit">
              Send Message
            </button>
          </div>
          <div className="section-2">
            <h1>Contact Us</h1>
            <hr />
            <div className="location-contact">
              <ion-icon name="location-outline"></ion-icon>
              <p>C-507, New Sbzi Mandi, Azadpur, Delhi - 110033</p>
            </div>
            <div className="call">
              <ion-icon name="call-outline"></ion-icon>
              <p>+91-1234567890</p>
            </div>
            <div className="mail">
              <ion-icon name="mail-outline"></ion-icon>
              <p>fruitporuim@gmail.com</p>
            </div>
            <div className="website">
              <ion-icon name="globe-outline"></ion-icon>
              <p>thefruitporuim.com</p>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Contact;



// import React from "react";
// import logo from "../../../assets/Fruitporium.jpg";
// import Modal from "react-bootstrap/Modal";

// import Form from "react-bootstrap/Form";
// import InputGroup from "react-bootstrap/InputGroup";
// import "./login.css";

// const Login = (props) => {
//   const logos = {
//     width: "3.2vw",
//     height: "9vh",
//   };

//   const modalMain = {
//     display: "flex",
//     flexDirection: "column",
//     gap: "0px",
//     padding: "20px",
//     backgroundcolor: "black",
//   };

//   const loginInput = {
//     width: "15vw",
//     borderRadius: "20px",
//   };

//   return (
//     <Modal
//     className="blurr-backdrop"
//       style={{
//         width: "100vw",
//         height: "500px",
//         maxWidth: "100%",
//         maxHeight: "100%",
//         boxSizing: "border-box",
//         padding: "20px",
//         // marginLeft: "270px",
//       }}
//       {...props}
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//     >
//       <Modal.Header style={modalMain} className="modal-main">
//         <img style={logos} src={logo} alt="no logo" />
//         <p className="image-name">The Fruitporium</p>
//         <p className="tagline-login">Where Nature's Sweetest Gifts Gather</p>
//         <p className="login-text">Log in or Sign up</p>
//         <InputGroup className="mb-3" style={loginInput}>
//           <InputGroup.Text>+91</InputGroup.Text>
//           <Form.Control aria-label="Enter Mobile Number" />
//         </InputGroup>
//         <button className="btn-login">Continue</button>
//         <p className="tnc-login">
//           By continuing, you agree to our Terms of service & Privacy policy
//         </p>
//       </Modal.Header>
//     </Modal>
//   );
// };

// export default Login;
