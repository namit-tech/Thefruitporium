import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./adminpanellogin.css";
import googleimg from "../../../assets/google.png";
import adminlogo from "../../../assets/fruitporiumonlylogo.png";
import { toast } from "react-toastify";

// const apiUrl = "http://localhost:5000";

const AdminPanel = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false); // Toggle between login and register
  const [isGoogleAuthEnabled, setIsGoogleAuthEnabled] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const navigate = useNavigate();

  const toastOptions = {
    toastId: "admin-login",
    hideProgressBar: false,
    closeOnClick: true,
    autoClose: 3000,
    draggable: true,
    theme: "light",
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle login and register logic
  const handleManualLogin = async (e) => {
    e.preventDefault();
    try {
      let res;

      // Register new admin or login existing admin based on state
      if (isRegistering) {
        res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/admin/register`, formData);
        toast.success("Admin registered successfully!", toastOptions);
      } else {
        res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/admin/login`, formData);
        if (res.data.token) {
          localStorage.setItem("adminToken", res.data.token); // Store token in localStorage
          setIsLoggedIn(true);
          navigate("/admin/overview");
          toast.success("Login successful!", toastOptions);
        } else {
          toast.error("Invalid credentials", toastOptions);
          return;
        }
      }
    } catch (err) {
      toast.error("Error occurred", toastOptions);
    }
  };

  const checkGoogleAuthStatus = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/check-google-auth`);
      console.log("recheck", res);
      
      if (res.data.enabled) {
        setIsGoogleAuthEnabled(true);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error checking Google Authenticator status.");
    }
  };

  useEffect(() => {
    checkGoogleAuthStatus();
  }, []);

  const handleOtpSubmit = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/google-login`, {
        code: otp,
      });
  
      if (res.data.success && res.data.token) {
        localStorage.setItem("adminToken", res.data.token); // Store the token in localStorage
        setIsLoggedIn(true); // Update the logged-in state
        setIsOtpVerified(true); // Mark OTP as verified
        toast.success("OTP verified successfully!");
        navigate("/admin/overview"); // Redirect to admin dashboard
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error verifying OTP.");
    }
  };
  

  // Handle logout functionality
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("adminToken");
    navigate("/admin");
  };

  // Toggle between login and register forms
  const toggleForm = () => {
    setIsRegistering(!isRegistering);
  };

  if (isLoggedIn) {
    return (
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-login-page">
        <div className="admin-logo-head">
          <img src={adminlogo} alt="Admin Logo" />
          <h4>{isRegistering ? "Register New Admin" : "Welcome back!"}</h4>
          <p>
            {isRegistering
              ? "Create a new account"
              : "Please enter your credentials to sign in!"}
          </p>
        </div>

        {/* Manual login form */}
        <form onSubmit={handleManualLogin} className="admin-login-form">
          <div className="username-pass-admin">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              required
            />
          </div>
          <div className="username-pass-admin">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">{isRegistering ? "Register" : "Login"}</button>
          <p style={{ margin: "0" }}>OR</p>
          <p style={{ cursor: "pointer", color: "blue" }} onClick={toggleForm}>
            {isRegistering
              ? "Already have an account? Login"
              : "Create a new admin account"}
          </p>
        </form>
        {isGoogleAuthEnabled ? (
          <>
            <div className="otp-input">
              <label htmlFor="otp">Enter OTP from Google Authenticator</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
              />
              <button onClick={handleOtpSubmit}>Submit OTP</button>
            </div>
            {isOtpVerified && <p>Successfully logged in!</p>}
          </>
        ) : (
          <p>Google Authenticator is not enabled. Please enable it first.</p>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
