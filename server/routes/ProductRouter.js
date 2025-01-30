const express = require("express");
const router = express.Router();
const Product = require("../modals/product-modal"); // Ensure the path is correc

router.get("/products", async (req, res) => {
  const { category } = req.query; // Get category from query parameters
  try {
    let products = [];
    if (category) {
      // Find products where Category array includes the specified category
      products = await Product.find({ Category: category });
    } else {
      products = await Product.find(); // Fetch all products if no category specified
    }
    res.json(products); // Return filtered products
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products" });
  }
});

router.get("/product-names", async (req, res) => {
  try {
    // Fetch all product names and IDs
    const productNames = await Product.find();
    res.json(productNames); // Return the fetched data
  } catch (error) {
    console.error("Error fetching product names:", error);
    res.status(500).json({ message: "Error fetching product names" });
  }
});

// Fetch distinct categories from the product collection
router.get("/category", async (req, res) => {
  try {
    const categories = await Product.distinct("Category");
    res.json(categories); // Send distinct category names
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Error fetching categories" });
  }
});

router.get("/listing", async (req, res) => {
  try {
    let tab;
    tab = await Product.find(
      {},
      {
        Category: 2,
      }
    );
    res.json(tab);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products" });
  }
});

// Route to fetch product details by ID
router.get("/products/:id", async (req, res) => {
  const { id } = req.params; // Get the product ID from URL parameters
  try {
    const product = await Product.findById(id); // Fetch the product by ID
    // console.log("data by id", product);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product); // Return the product details
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Error fetching product" });
  }
});

router.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product", error });
  }
});

router.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    console.log("updated data", updatedData);

    if (!updatedData.Category) updatedData.Category = [];
    if (!updatedData.by_size) updatedData.by_size = [];

    const product = await Product.findOneAndUpdate({ _id: id }, updatedData, {
      new: true,
      runValidators: true,
    });

    console.log("after updated product", product);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);

    const updatedProduct = await Product.findById(id);
    console.log("Updated Product from DB:", updatedProduct);

  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Error updating product", error });
  }
});

router.post("/products/create-product", async (req, res) => {
  try {
    const {
      Sno,
      Name,
      Category,
      Description,
      Origin,
      Season,
      by_size,
      Prices_per_unit,
      Quantity,
      Shelf_Life,
      Cold_Storage,
      Nutrient_value,
      Storage_and_Uses,
      Proxy_Images_uploaded,
    } = req.body;

    const newProduct = new Product({
      Sno,
      Name,
      Category,
      Description,
      Origin,
      Season,
      by_size,
      Prices_per_unit,
      Quantity,
      Shelf_Life,
      Cold_Storage,
      Nutrient_value,
      Storage_and_Uses,
      Proxy_Images_uploaded,
    });

    await newProduct.save();
    res.status(201).json({ message: "Product created successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating product!" });
  }
});

module.exports = router;
