import React, { useState } from "react";
import "./footer.css";
import logo from "../../assets/pnglogo.png";
import facebook from "../../assets/facebook-circle-logo-24.png";
import twitter from "../../assets/twitter-logo-24.png";
import instagram from "../../assets/instagram-logo-24.png";
import trademark from "../../assets/fssai8862.jpg";
import veg from "../../assets/th.jpeg";
import Contact from "./contact us/Contact";
import { Link } from "react-router-dom";

const Footer = () => {

  const [showContact, setShowContact] = useState(false);

  const handleCloseContact = () => setShowContact(false);
  const handleShowContact = () => setShowContact(true);

  return (
    <>
      <div className="footer">
        <div className="sec-1">
          <Link to="/" >
            <img src={logo} alt="logo" className="footer-logo" />
          </Link>
          <div className="social-logo">
            <img className="facebook" src={facebook} alt="logo" />
            <img className="twitter" src={twitter} alt="logo" />
            <img className="instagram" src={instagram} alt="logo" />
          </div>
        </div>
        <div className="sec-2">
          <h3>About Us</h3>
          <div className="menu"></div>
        </div>
        <div className="sec-3">
          <h3>Policies</h3>
          <div className="menu">
            <Link className="link-text" to="/terms">
              Terms and Conditions
            </Link>
            <Link className="link-text" to="/productinfo">
              Product Information
            </Link>
            <Link className="link-text">Privacy Policies</Link>
            <Link className="link-text">Return and Refund Policies</Link>
            <Link className="link-text">Shipping Policies</Link>
          </div>
        </div>
        <div className="sec-4">
          <h3>Contact Us</h3>
          <div className="address">
            <Link
              className="link-text contact-Btn"
              variant="light"
              onClick={handleShowContact}
            >
              Contact Us
            </Link>
            <Contact show={showContact} onHide={handleCloseContact} />
            <Link
  className="link-text"
  to="#"
  onClick={() =>
    window.open(
      "https://maps.app.goo.gl/ZjLvR6hkfiwx3XCn8",
      "_blank",
      "noopener,noreferrer"
    )
  }
>
  C-507, <br /> near Lalwani Telecom, Block B, <br /> New Sabzi Mandi, Azadpur, Delhi, 110033
</Link>

            <Link className="link-text" to="tel:+919911719993">
              9911719993
            </Link>
          </div>
        </div>
        <div className="sec-5">
          <h3>Certifications</h3>
          <div className="trademarks">
            <img className="trademark" src={trademark} alt="trademark" />
            <img className="veg" src={veg} alt="veg" />
          </div>
        </div>
      </div>
      <div className="copy">
        Copyright ©2024 All rights reserved | Fruitporium.com
      </div>
    </>
  );
};

export default Footer;
