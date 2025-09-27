const Product = require("../models/Product");
const fs = require("fs");

// Create new product
exports.createProduct = async (req, res) => {
  try {
    const { productName, productNo } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newProduct = new Product({ productName, productNo, imageUrl });
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const { productName, productNo } = req.body;

    // Find product
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    // If new image uploaded, remove old one
    if (req.file) {
      if (product.imageUrl) {
        const oldPath = `.${product.imageUrl}`;
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      product.imageUrl = `/uploads/${req.file.filename}`;
    }

    // Update fields
    if (productName) product.productName = productName;
    if (productNo) product.productNo = productNo;

    await product.save();
    res.json(product);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    // Remove image file if exists
    if (product.imageUrl) {
      const filePath = `.${product.imageUrl}`;
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
