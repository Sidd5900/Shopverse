const router = require("express").Router();
const Product = require("../models/Product");
const bcrypt = require("bcrypt");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");

// Create a product
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// Update a product
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  const product_id = req.params.id;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      product_id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(201).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// Delete a Product
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  const product_id = req.params.id;

  try {
    const deletedProduct = await Product.findByIdAndDelete(product_id);
    res.status(201).json(deletedProduct);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// Get a Products's details
router.get("/:id", async (req, res) => {
  const product_id = req.params.id;

  try {
    const product = await Product.findById(product_id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// Get all Products's details
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = router;
