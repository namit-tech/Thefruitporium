// // Login.js
// import React, { useEffect, useState } from "react";
// import logo from "../../../assets/THE FRUITPORIUM LOGO.png";
// import Modal from "react-bootstrap/Modal";
// import Form from "react-bootstrap/Form";
// import InputGroup from "react-bootstrap/InputGroup";
// import { onAuthStateChanged } from "firebase/auth";
// import { initializeApp } from "firebase/app";
// import {
//   getAuth,
//   RecaptchaVerifier,
//   signInWithPhoneNumber,
// } from "firebase/auth";
// import axios from "axios";
// import "./login.css";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// const apiUrl = "http://localhost:5000/api";

// // Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAg7_XmFePaAAvZm2Jh1laXAQ5QrYJb-T8",
//   authDomain: "otp-project-72f3a.firebaseapp.com",
//   projectId: "otp-project-72f3a",
//   storageBucket: "otp-project-72f3a.appspot.com",
//   messagingSenderId: "1008869233794",
//   appId: "1:1008869233794:web:67a03850ab7d2756e0909b",
//   measurementId: "G-MLK26KLP3X",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// const Login = ({ setIsVerified, ...props }) => {
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [otp, setOtp] = useState("");
//   const [confirmationResult, setConfirmationResult] = useState(null);
//   const [otpSent, setOtpSent] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem("userToken");
//     if (token) {
//       setIsVerified(true);
//     } else {
//       setIsVerified(false);
//     }

//     onAuthStateChanged(auth, (user) => {
//       setIsVerified(!!user);
//     });
//   }, [setIsVerified]);

//   const toastOptions = {
//     hideProgressBar: false,
//     closeOnClick: true,
//     autoClose: 3000, // Close after 3 seconds
//     draggable: true,
//     theme: "light", // Light theme
//   };

//   const setupRecaptcha = () => {
//     window.recaptchaVerifier = new RecaptchaVerifier(
//       auth,
//       "recaptcha-container",
//       {
//         size: "invisible",
//         callback: (response) => {
//           // toast.success("recaptcha Verified" ,toastOptions)
//           console.log("Recaptcha verified");
//         },
//         "expired-callback": () => {
//           toast.error("Recaptcha expired, please try again", toastOptions);
//         },
//       },
//       auth
//     );
//   };

//   const handleSendOtp = async () => {
//     const fullPhoneNumber = `+91${phoneNumber}`;
//     if (!/^\+[1-9]\d{1,14}$/.test(fullPhoneNumber)) {
//       toast.error(
//         "Invalid phone number format. Please use the format +<country_code><phone_number>.",
//         toastOptions
//       );
//       return;
//     }

//     try {
//       const response = await axios.get(
//         `${apiUrl}/users/check-phone/${phoneNumber}`
//       );
//       console.log(response);

//       if (response.data.exists) {
//         // toast.error("", toastOptions);
//         setupRecaptcha();
//         const appVerifier = window.recaptchaVerifier;
//         const confirmationResult = await signInWithPhoneNumber(
//           auth,
//           fullPhoneNumber,
//           appVerifier
//         );
//         setConfirmationResult(confirmationResult);
//         setOtpSent(true);
//         toast.success("OTP sent successfully", toastOptions);
//         // console.log("OTP sent");
//       } else {
//         toast.warning(
//           "Phone number not found. Please sign up first.",
//           toastOptions
//         );
//       }
//     } catch (error) {
//       // console.log("Error checking phone number:", error);
//       toast.error("An error occurred. Please try again.", toastOptions);
//     }
//   };

//   const handleVerifyOtp = () => {
//     if (confirmationResult) {
//       confirmationResult
//         .confirm(otp)
//         .then((result) => {
//           const user = result.user;
//           toast.success("User logged in successfully", toastOptions);
//           // console.log("User logged in successfully:", user);
//           localStorage.setItem("userToken", user.accessToken);
//           localStorage.setItem("userPhone", user.phoneNumber);
//           setIsVerified(true);
//           props.onHide();

//           setPhoneNumber("");
//           setOtp("");
//           setConfirmationResult(null);
//           setOtpSent(false);
//         })
//         .catch((error) => {
//           // console.log("Error during confirmationResult.confirm", error);
//           toast.error(`Invalid OTP: ${error?.message || "Please try again."}`, toastOptions);
//         });
//     }
//   };

//   const logos = {
//     width: "9.5vw",
//     height: "15vh",
//     backgroundColor: "white",
//   };

//   const modalMain = {
//     display: "flex",
//     flexDirection: "column",
//     padding: "20px",
//   };

//   const loginInput = {
//     width: "15vw",
//     borderRadius: "20px",
//   };

//   return (
//     <>
//       <Modal
//         className="blurr-backdrop"
//         style={{
//           width: "100vw",
//           height: "500px",
//           maxWidth: "100%",
//           maxHeight: "100%",
//           boxSizing: "border-box",
//         }}
//         {...props}
//         aria-labelledby="contained-modal-title-vcenter"
//         centered
//       >
//         <Modal.Header style={modalMain} className="modal-main">
//           <img style={logos} src={logo} alt="no logo" />
//           <p className="tagline-login">Where Nature's Sweetest Gifts Gather</p>
//           <p className="login-text">Log in or Sign up</p>
//           {!otpSent ? (
//             <>
//               <InputGroup className="mb-3" style={loginInput}>
//                 <InputGroup.Text>+91</InputGroup.Text>
//                 <Form.Control
//                   aria-label="Enter Mobile Number"
//                   value={phoneNumber}
//                   onChange={(e) => setPhoneNumber(e.target.value)}
//                 />
//               </InputGroup>
//               <button className="btn-login" onClick={handleSendOtp}>
//                 Continue
//               </button>
//             </>
//           ) : (
//             // If OTP is sent and not logged in yet
//             <>
//               <InputGroup className="mb-3" style={loginInput}>
//                 <Form.Control
//                   aria-label="Enter OTP"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value)}
//                   placeholder="Enter OTP"
//                 />
//               </InputGroup>
//               <button className="btn-login" onClick={handleVerifyOtp}>
//                 Verify OTP
//               </button>
//             </>
//           )}
//           <p className="tnc-login">
//             By continuing, you agree to our Terms of service & Privacy policy
//           </p>
//           <div id="recaptcha-container"></div>
//           <p style={{ fontSize: "0.75rem", marginTop: "1rem", color: "white" }}>
//             This site is protected by reCAPTCHA and the Google
//             <a
//               href="https://policies.google.com/privacy"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               {" "}
//               Privacy Policy{" "}
//             </a>{" "}
//             and
//             <a
//               href="https://policies.google.com/terms"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               {" "}
//               Terms of Service{" "}
//             </a>{" "}
//             apply.
//           </p>
//         </Modal.Header>
//       </Modal>
//       <ToastContainer
//         style={{
//           position: "absolute",
//           top: "320px", // Adjust this value based on your layout
//           right: "20px",
//           zIndex: "9999",
//         }}
//       />
//     </>
//   );
// };

// export default Login;


import React, { useEffect, useState } from "react";
import logo from "../../../assets/THE FRUITPORIUM LOGO.png";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import axios from "axios";
import "./login.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const apiUrl = process.env.REACT_APP_API_URL;
// const apiUrl = "http://localhost:5000";
// console.log("login url", apiUrl);

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAg7_XmFePaAAvZm2Jh1laXAQ5QrYJb-T8",
  authDomain: "otp-project-72f3a.firebaseapp.com",
  projectId: "otp-project-72f3a",
  storageBucket: "otp-project-72f3a.appspot.com",
  messagingSenderId: "1008869233794",
  appId: "1:1008869233794:web:67a03850ab7d2756e0909b",
  measurementId: "G-MLK26KLP3X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Login = ({ setIsVerified, ...props }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [otpSent, setOtpSent] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setIsVerified(true);
    } else {
      setIsVerified(false);
    }

    onAuthStateChanged(auth, (user) => {
      setIsVerified(!!user);
    });
  }, [setIsVerified]);

  const toastOptions = {
    toastId: "otp-toast",  // Unique ID to prevent duplicate toasts
    hideProgressBar: false,
    closeOnClick: true,
    autoClose: 3000,
    draggable: true,
    theme: "light",
  };
  

  const setupRecaptcha = () => {
    if (window.recaptchaVerifier) return; // Prevent multiple initialization

    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          console.log("Recaptcha verified");
        },
        "expired-callback": () => {
          toast.error("Recaptcha expired, please try again", toastOptions);
        },
      },
      auth
    );
  };

  const handleSendOtp = async () => {
    const fullPhoneNumber = `+91${phoneNumber}`;
    if (!/^\+[1-9]\d{1,14}$/.test(fullPhoneNumber)) {
      toast.error(
        "Invalid phone number format. Please use the format +<country_code><phone_number>.",
        toastOptions
      );
      return;
    }

    try {
      const response = await axios.get(
        `${apiUrl}/api/users/check-phone/${phoneNumber}`
      );
      console.log(response);

      if (response.data.exists) {
        setupRecaptcha(); // Setup recaptcha only once
        const appVerifier = window.recaptchaVerifier;
        const confirmationResult = await signInWithPhoneNumber(
          auth,
          fullPhoneNumber,
          appVerifier
        );
        setConfirmationResult(confirmationResult);
        setOtpSent(true);
        toast.success("OTP sent successfully", toastOptions);
      } else {
        toast.warning(
          "Phone number not found. Please sign up first.",
          toastOptions
        );
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", toastOptions);
    }
  };

  const handleVerifyOtp = () => {
    if (confirmationResult) {
      confirmationResult
        .confirm(otp)
        .then((result) => {
          const user = result.user;
          toast.success("User logged in successfully", toastOptions);
          localStorage.setItem("userToken", user.accessToken);
          localStorage.setItem("userPhone", user.phoneNumber);
          setIsVerified(true);
          props.onHide();

          setPhoneNumber("");
          setOtp("");
          setConfirmationResult(null);
          setOtpSent(false);
        })
        .catch((error) => {
          toast.error(`Invalid OTP: ${error?.message || "Please try again."}`, toastOptions);
        });
    }
  };

  const logos = {
    width: "9.5vw",
    height: "15vh",
    backgroundColor: "white",
  };

  const modalMain = {
    display: "flex",
    flexDirection: "column",
    padding: "20px",
  };

  const loginInput = {
    width: "15vw",
    borderRadius: "20px",
  };

  return (
    <>
      <Modal
        className="blurr-backdrop"
        style={{
          width: "100vw",
          height: "500px",
          maxWidth: "100%",
          maxHeight: "100%",
          boxSizing: "border-box",
        }}
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header style={modalMain} className="modal-main">
          <img style={logos} src={logo} alt="no logo" />
          <p className="tagline-login">Where Nature's Sweetest Gifts Gather</p>
          <p className="login-text">Log in or Sign up</p>
          {!otpSent ? (
            <>
              <InputGroup className="mb-3" style={loginInput}>
                <InputGroup.Text>+91</InputGroup.Text>
                <Form.Control
                  aria-label="Enter Mobile Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </InputGroup>
              <button className="btn-login" onClick={handleSendOtp}>
                Continue
              </button>
            </>
          ) : (
            // If OTP is sent and not logged in yet
            <>
              <InputGroup className="mb-3" style={loginInput}>
                <Form.Control
                  aria-label="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                />
              </InputGroup>
              <button className="btn-login" onClick={handleVerifyOtp}>
                Verify OTP
              </button>
            </>
          )}
          <p className="tnc-login">
            By continuing, you agree to our Terms of service & Privacy policy
          </p>
          <div id="recaptcha-container"></div>
          <p style={{ fontSize: "0.75rem", marginTop: "1rem", color: "white" }}>
            This site is protected by reCAPTCHA and the Google
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              Privacy Policy{" "}
            </a>{" "}
            and
            <a
              href="https://policies.google.com/terms"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              Terms of Service{" "}
            </a>{" "}
            apply.
          </p>
        </Modal.Header>
      </Modal>
    </>
  );
};

export default Login;

