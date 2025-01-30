import React from "react";
import "./adminprofile.css";
import AdminDashboard from "../../AdminDashboard";
import AdminNavbar from "../../Navbar/AdminNavbar";
import AdminAccount from "../AdminAccount";

const AdminProfile = () => {
  return (
    <>
      <AdminDashboard />
      <AdminNavbar />
      <AdminAccount />
      <div className="admin-profile-section">
        <h4>Personal Information</h4>
        <form action="">
          <div className="profile-form">
            <div className="profile-user-name">
              <label>First Name</label>
              <input type="text" placeholder="First Name" />
            </div>
            <div className="profile-user-name">
              <label>Last Name</label>
              <input type="text" placeholder="Last Name" />
            </div>
          </div>
          <div className="profile-user-name">
            <label htmlFor="">Email</label>
            <input type="text" placeholder="Email" />
          </div>
          <div className="profile-user-name">
            <label htmlFor="">Phone Number</label>
            <input type="text" placeholder="Phone Number" />
          </div>
          <h4 className="address-info-head">Address Information</h4>
          <div className="profile-form">
            <div className="profile-user-name">
              <label>Address</label>
              <input type="text" placeholder="Address" />
            </div>
            <div className="profile-user-name">
              <label>City</label>
              <input type="text" placeholder="City" />
            </div>
          </div>
          <button className="profile-button">Save</button>
        </form>
      </div>
    </>
  );
};

export default AdminProfile;
