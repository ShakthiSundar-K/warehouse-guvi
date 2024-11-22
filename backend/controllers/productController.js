const Product = require("../models/productModel");

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { productID, productName, description } = req.body;

    // Check if product already exists
    const existingProduct = await Product.findOne({ productID });
    if (existingProduct) {
      return res
        .status(400)
        .json({ message: "Product with this ID already exists" });
    }

    // Create new product
    const newProduct = new Product({ productID, productName, description });
    await newProduct.save();

    res
      .status(201)
      .json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Error creating product" });
  }
};

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products" });
  }
};
