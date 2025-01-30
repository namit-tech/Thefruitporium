import React, { useState } from "react";
import axios from "axios";
import googleicon from "../../../../assets/google.png";
import "./adminsecurity.css";
import AdminDashboard from "../../AdminDashboard";
import AdminNavbar from "../../Navbar/AdminNavbar";
import AdminAccount from "../AdminAccount";
import { toast } from "react-toastify";

// const apiUrl = "http://localhost:5000";

const AdminSecurity = () => {
  const [qrCode, setQrCode] = useState("");
  const [googleAuthEnabled, setGoogleAuthEnabled] = useState(false);
  const [otp, setOtp] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const toastOptions = {
    toastId: "google-auth",
    hideProgressBar: false,
    closeOnClick: true,
    autoClose: 3000,
    draggable: true,
    theme: "light",
  };

  const enableGoogleAuth = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/setup-google-auth`);
      setQrCode(res.data.qrCode);
      toast.info("Scan the QR code using Google Authenticator.", toastOptions);
    } catch (err) {
      console.error(err);
      toast.error("Error enabling Google Authenticator.", toastOptions);
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/check-google-auth`, {
        token: otp,
      });
      if (res.data.success) {
        setGoogleAuthEnabled(true);
        setQrCode("");
        toast.success(
          "Google Authenticator enabled successfully!",
          toastOptions
        );
      } else {
        toast.error("Invalid OTP. Please try again.", toastOptions);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error verifying OTP.", toastOptions);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      toast.error("New passwords do not match", toastOptions);
      return;
    }

    const token = localStorage.getItem("adminToken"); // Get token from localStorage
    console.log("token", token);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/admin/change-password`,
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in the Authorization header
          },
        }
      );
      console.log("respass", res.data);

      if (res.data.success) {
        toast.success("Password updated successfully!", toastOptions);
      } else {
        toast.error("Incorrect current password", toastOptions);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error updating password", toastOptions);
    }
  };

  return (
    <>
      <AdminDashboard />
      <AdminNavbar />
      <AdminAccount />
      <div className="security-password">
        <h4>Password</h4>
        <p>
          Remember, your password is your digital key to your account. Keep it
          safe, keep it secure!
        </p>
        <form onSubmit={handlePasswordChange}>
          <div className="passwords">
            <div className="passwords-input">
              <label htmlFor="">Current Password</label>
              <input
                type="password"
                placeholder="Current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="passwords-input">
              <label htmlFor="">New Password</label>
              <input
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="passwords-input">
            <label htmlFor="">Confirm New Password</label>
            <input
              type="password"
              placeholder="Confirm New password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="Update-security-btn">
            Update
          </button>
        </form>

        <div className="factor-auth">
          <h4>Two-Factor Authentication</h4>
          <p>Enable two-step verification to safeguard your account!</p>
          {!googleAuthEnabled ? (
            <>
              <button className="auth-btn" onClick={enableGoogleAuth}>
                Enable Google Authenticator
              </button>
              {qrCode && (
                <div>
                  <p>Scan this QR code using Google Authenticator:</p>
                  <img src={qrCode} alt="QR Code" />
                  <div className="otp-input">
                    <label htmlFor="otp">Enter OTP</label>
                    <input
                      type="text"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                    <button onClick={verifyOtp}>Verify OTP</button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <p>Google Authenticator is enabled for your account.</p>
          )}
          <hr />
        </div>
      </div>
    </>
  );
};

export default AdminSecurity;
