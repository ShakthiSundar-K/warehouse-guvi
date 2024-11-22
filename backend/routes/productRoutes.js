const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Product CRUD operations
router.post("/create", productController.createProduct);
router.get("/", productController.getProducts);

module.exports = router;
