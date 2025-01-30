import React from "react";
import "./terms.css";
import { Link } from "react-router-dom";

const Terms = () => {
  return (
    <div className="main-terms">
      <h1 className="terms-head">Terms and Conditions</h1>
      <div className="terms-1">
        <p>
          Welcome to "<Link to="/">The Fruitporium</Link>"!
        </p>
        <p>
          By accessing or using our website{" "}
          <Link to="/"> www.thefruitporium.com </Link>and purchasing fruits,
          vegetables, and dry fruits from us, you agree to comply with and be
          bound by these Terms and Conditions. If you do not agree with any part
          of these Terms, please do not use our website or purchase our
          products.
        </p>
      </div>
      <div className="terms-section terms-2">
        <h3>Product Information</h3>
        <p>
          <span>Accuracy of Information :</span>
          We strive to ensure that all product descriptions on our Site are
          accurate, complete, and up-to-date. This includes details such as
          product name, description, specifications, and prices. However, due to
          factors like changes in product availability or manufacturing, there
          may be occasional discrepancies. We do not warrant that the
          descriptions are entirely accurate, complete, reliable, current, or
          error-free.
        </p>
        <p>
          <span>Quality :</span> All products are sourced and handled with the
          utmost care to ensure freshness and quality. However, due to the
          perishable nature of fruits, vegetables, and dry fruits, there may be
          variations in quality and appearance.
        </p>
        <p>
          <span>Images :</span> Product images provided on our Site are for
          illustrative purposes only. While we aim to display products as
          accurately as possible, actual products may differ in appearance due
          to variations in color, size, and design. The images may not fully
          represent the product's quality, texture, or size.
        </p>
        <p>
          <span>Ingredients and Nutritional Information :</span> For fruits,
          vegetables, and dry fruits, we provide information on ingredients,
          nutritional values, and any relevant dietary information. This
          information is sourced from manufacturers or suppliers and is intended
          for general guidance. It is your responsibility to review ingredient
          lists and nutritional information to ensure they meet your dietary
          needs and preferences.
        </p>
        <p>
          <span>Product Sourcing :</span> We source our fruits, vegetables, and
          dry fruits from reputable suppliers who adhere to high standards of
          quality and freshness. We take measures to handle and store products
          properly to maintain their quality until they reach you.
        </p>
        <p>
          <span>Perishable Nature :</span> Given the perishable nature of fruits
          and vegetables, there may be some variations in freshness and quality
          based on factors such as seasonality and storage conditions. We do our
          best to ensure that products are delivered in the best possible
          condition.
        </p>
        <p>
          <span>Storage and Handling :</span> Products should be stored as per
          the recommendations provided on our Site or packaging. Proper storage
          helps in maintaining freshness and quality. We are not responsible for
          any deterioration in product quality due to improper handling or
          storage after delivery.
        </p>
        <p>
          <span>Expiration Dates :</span> For dry fruits and other products with
          shelf life, we strive to provide items that are well within their
          expiration dates. Expiration dates are clearly marked on the product
          packaging. It is your responsibility to use products before their
          expiration dates to ensure quality and safety.
        </p>
        <p>
          <span>Availability :</span> Products are subject to availability. We
          reserve the right to modify or discontinue products without prior
          notice. If a product you have ordered is unavailable, we will notify
          you as soon as possible and offer a suitable replacement or refund.
        </p>
        <p>
          <span>Customer Feedback :</span> We value customer feedback on our
          products. If you encounter any issues or have suggestions regarding
          product quality, please contact us. Your feedback helps us improve our
          offerings and service.
        </p>
      </div>
      <div className="terms-section terms-3">
        <h3>Orders and Payments</h3>
        <p>
          <span>Order Placement :</span> To place an order, you must provide
          accurate and complete information, including your shipping address,
          payment details, and any other relevant information. By placing an
          order, you make an offer to purchase the products in accordance with
          these Terms.
        </p>
        <p>
          <span>Order Confirmation :</span> After placing an order, you will
          receive an order confirmation Email/SMS. This confirmation does not
          constitute acceptance of the order. We reserve the right to accept or
          reject any order at our discretion.
        </p>
        <p>
          {" "}
          <span>Pricing and Payment :</span> All prices are listed in ₹ (Rupee)
          and include applicable taxes unless otherwise stated. We accept
          various payment methods as detailed on our Site. Payment must be made
          at the time of order placement. Prices may be subject to change
          without notice.
        </p>
        <p>
          <span>Fraud Prevention :</span> To prevent fraud, we may verify
          payment information and perform additional security checks. We reserve
          the right to cancel any order if we suspect fraudulent activity.
        </p>
      </div>
      <div className="terms-section terms-4">
        <h3>Delivery</h3>
        <p>
          <span>Shipping :</span> We offer delivery services within Delhi/NCR.
          Shipping costs and estimated delivery times are provided during the
          checkout process. Delivery times are estimates and may vary based on
          factors such as location, weather, and third-party carrier delays.
        </p>
        <p>
          <span>Service Availability</span> We offer a next-day delivery service
          for eligible orders placed by before 3p.m. Orders placed after this
          time or on weekends and public holidays will be processed on the next
          business day
        </p>
        <p>
          <span>Delivery Window :</span> Next-day delivery typically occurs
          within 6:00a.m - 02:00p.m. While we aim to deliver within this
          timeframe, exact delivery times cannot be guaranteed.
        </p>
        <p>
          <span>Delivery Charges :</span> Shipping fees are calculated based on
          your location and the weight of the products. Any applicable shipping
          charges will be displayed during checkout and are the responsibility
          of the customer.
        </p>
        <p>
          <span>Delivery Issues :</span> While we strive to ensure timely
          delivery, we are not responsible for delays caused by external factors
          such as weather, transportation strikes, or incorrect delivery
          information provided by the customer. In the event of a delivery
          issue, please contact us promptly.
        </p>
      </div>
      <div className="terms-section terms-5">
        <h3>Returns and Refunds</h3>
        <p>
          <span>Return Policy :</span> Due to the perishable nature of our
          products, returns are generally not accepted. If you receive a damaged
          or incorrect product, please contact us within 4-5 hours of delivery
          with photographic, videographic evidence and your order details. We
          will assess the situation and offer a replacement or refund if the
          issue is confirmed, but the product should be in its original
          condition as delivered.
        </p>
        <p>
          <span>Refunds :</span> Refunds, if approved, will be processed to the
          original payment method used for the purchase. Please allow 4-5
          business days for processing. Refunds are subject to our verification
          and approval processes.
        </p>
        <p>
          <span>Exchanges :</span> We do not offer exchanges for perishable
          products. Please review your order carefully before finalizing your
          purchase.
        </p>
      </div>
      <div className="terms-section terms-6">
        <h3>Customer Responsibility</h3>
        <p>
          <span>Information Accuracy :</span> You are responsible for providing
          accurate and complete information when placing an order. This includes
          shipping addresses, contact information, and payment details. We are
          not responsible for errors resulting from inaccurate information
          provided by you.
        </p>
        <p>
          <span>Product Inspection :</span> Upon delivery, you should inspect
          the products for any visible damage or discrepancies. Any issues
          should be reported to us immediately. Failure to report issues in a
          timely manner may affect your eligibility for a refund or replacement.
        </p>
      </div>
      <div className="terms-section terms-7">
        <h3>Liability</h3>
        <p>
          <span>Limitation of Liability :</span> To the fullest extent permitted
          by law, we are not liable for any indirect, incidental, special, or
          consequential damages arising from the use of our Site or products.
          Our liability for any direct damages is limited to the amount you paid
          for the affected product.
        </p>
        <p>
          <span>Product Safety :</span> While we take measures to ensure the
          safety and quality of our products, we do not warrant that our
          products are suitable for all uses or that they will meet your
          specific requirements. It is your responsibility to ensure that
          products are suitable for your needs.
        </p>
      </div>
      <div className="terms-section terms-8">
        <h3>Intellectual Property</h3>
        <p>
          <span>Ownership :</span> All content on our Site, including but not
          limited to text, images, logos, and graphics, is the property of{" "}
          <Link to="/"> The Fruitporium </Link> or its licensors. Unauthorized use of
          any content is prohibited. You may not reproduce, distribute, or
          create derivative works from our content without our express written
          permission.
        </p>
      </div>
      <div className="terms-section terms-9">
        <h3>Privacy :</h3>
        <p>
          <span>Data Collection :</span> We collect and use personal information
          in accordance with our Privacy Policy, which is incorporated into
          these Terms by reference. By using our Site, you consent to our
          collection and use of your personal information as described in our
          Privacy Policy.
        </p>
      </div>
      <div className="terms-section terms-10">
        <h3>Changes to Terms :</h3>
        <p>
          <span>Modifications :</span> We reserve the right to update or modify
          these Terms at any time. Any changes will be effective upon posting on
          our Site. Your continued use of our Site after such changes
          constitutes your acceptance of the revised Terms.
        </p>
      </div>
      <div className="terms-section  terms-11">
        <h3>Governing Law :</h3>
        <p>
          <span>Jurisdiction :</span> These Terms are governed by and construed
          in accordance with the laws of Indian Govt. Any disputes arising from
          or related to these Terms or your use of our Site will be subject to
          the exclusive jurisdiction of the courts of Indian Govt.
        </p>
      </div>
      <div className="Contact-info">
        <h3>Contact Information</h3>
        <p>
          If you have any questions or concerns about these Terms and
          Conditions, please contact us at:
        </p>
        <div>
          <span>Email:</span>
          <Link to="mailto:support@thefruitporium.com">
            {" "}
            support@thefruitporium.com{" "}
          </Link>
        </div>
        <div>
          <span>Phone :</span>
          <Link to="tel:+919911719993">9911719993</Link>
        </div>
        <div>
          <span>Address :</span>
          <Link to="https://www.google.com/maps?q=C-507, New Sabzi Mandi, Azadpur, Delhi-110033">
            C-507, New Sabzi Mandi, Azadpur, Delhi-110033
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Terms;
