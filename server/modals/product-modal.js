const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    Sno: { type: Number, required: true },
    Name: { type: String, required: true },
    Category: { type: [String], required: true },
    Description: { type: String, required: true },
    Origin: { type: String, required: true },
    Season: { type: String },
    by_size: [
      {
        size: { type: String, required: true },
        price: { type: Number, required: true },
        pDiscount: { type: Number, required: true },
      },
    ],
    Quantity: { type: String, required: true },
    Prices_per_unit: { type: String },
    Shelf_Life: { type: String },
    Cold_Storage: { type: String },
    Nutrient_value: { type: String },
    Storage_and_Uses: { type: String },
    Proxy_Images_uploaded: { type: String },
    Photoshoot_done: { type: String },
  },
  { collection: "Products", timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
