import React from "react";
import "./productinfo.css";
import { Link } from "react-router-dom";

const ProductInfo = () => {
  return (
    <div className="main-product">
      <h1 className="product-head">Product Information</h1>
      <div className=" product-section product-1">
        <h3>Accuracy of Information</h3>
        <p>
          <span>Effort to Ensure Accuracy :</span> We strive to provide accurate
          and up-to-date information about our products, including descriptions,
          prices, availability, and nutritional content. However, we do not
          warrant that the product information is always accurate, complete,
          reliable, current, or error-free.
        </p>
        <p>
          <span>Typographical Errors :</span> In the event that a product is
          listed at an incorrect price or with incorrect information due to
          typographical errors or inaccuracies, we reserve the right to refuse
          or cancel any orders placed for the product.
        </p>
      </div>
      <div className=" product-section product-2">
        <h3>Product Descriptions</h3>
        <p>
          <span>Informational Purpose :</span> Product descriptions are provided
          for informational purposes only. While we make every effort to ensure
          the accuracy of descriptions, actual products may vary slightly due to
          changes in packaging, seasonal variations, and other factors.
        </p>
        <p>
          <span>Components and Ingredients :</span> Detailed information about
          the components of our products is provided to the best of our
          knowledge. However, the actual composition may vary slightly due to
          variations in sourcing and production.
        </p>
      </div>
      <div className=" product-section product-3">
        <h3>Nutritional Information</h3>
        <p>
          <span>Standard Calculations :</span> Nutritional information provided
          on our website is based on standard calculations and should be used as
          a general guide. These calculations may not always reflect the exact
          nutritional content of each individual product.
        </p>
        <p>
          <span>Healthcare professional Advice :</span> For specific dietary
          needs and concerns, we recommend consulting a healthcare professional.
          We do not guarantee that our products will meet your individual
          dietary requirements.
        </p>
      </div>
      <div className=" product-section product-4">
        <h3>Product Images</h3>
        <p>
          <span>SUbject to Availability :</span> All products are subject to
          availability. We make every effort to keep our inventory up-to-date,
          but we cannot guarantee that a product will be in stock at all times.
        </p>
        <p>
          <span>Notification of Out of Stock :</span> In the event that a
          product you ordered is out of stock, we will notify you as soon as
          possible and offer alternatives or a refund.
        </p>
      </div>
      <div className=" product-section product-5">
        <h3>Pricing Information</h3>
        <p>
          <span>Correct Pricing :</span> All prices are listed in ₹ (Rupee) and
          are subject to change without notice. Prices include applicable taxes
          but do not include shipping charges, which will be added to your total
          during checkout.
        </p>
        <p>
          <span>Promotions and Discounts :</span> We may offer promotions and
          discounts on certain products from time to time. These promotions are
          subject to change and may be withdrawn at any time without prior
          notice.
        </p>
      </div>
      <div className=" product-section product-6">
        <h3>Product Reviews</h3>
        <p>
          <span>Customer Reviews :</span> We welcome customer reviews and
          feedback on our products. Reviews reflect the opinions of individual
          customers and do not represent the views or opinions of{" "}
          <Link to="/">The Fruitporium</Link> !
        </p>
        <p>
          <span>Review Moderation :</span> We reserve the right to moderate and
          remove reviews that contain inappropriate language, spam, or content
          that does not comply with our guidelines.
        </p>
      </div>
      <div className=" product-section product-7">
        <h3>Storage and Handling Instructions</h3>
        <p>
          <span>Proper Storage :</span> We provide storage and handling
          instructions for our products to ensure their quality and freshness.
          Customers are responsible for following these instructions upon
          receipt of the products.
        </p>
        <p>
          <span>Shell Life :</span> The shelf life of our products may vary
          depending on the type of product and storage conditions. We provide
          estimated shelf life information, but we cannot guarantee the exact
          duration.
        </p>
      </div>
      <div className=" product-section product-8">
        <h3>Liability for product Use :</h3>
        <p>
          <span>Intended Use :</span> Our products are intended for consumption
          in accordance with the provided instructions. We are not liable for
          any adverse effects resulting from improper use or handling of the
          products.
        </p>
        <p>
          <span>Health and Safety :</span> If you experience any adverse
          reactions or health issues after consuming our products, please seek
          medical attention immediately and notify us.
        </p>
      </div>
    </div>
  );
};

export default ProductInfo;
