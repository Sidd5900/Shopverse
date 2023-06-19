const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");

// Update a user
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  const user_id = req.params.id;

  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    req.body.password = hash;
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      user_id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(201).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// Delete a user
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  const user_id = req.params.id;

  try {
    const deletedUser = await User.findByIdAndDelete(user_id);
    res.status(201).json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// Get a users's details
router.get("/:id", verifyTokenAndAdmin, async (req, res) => {
  const user_id = req.params.id;

  try {
    const user = await User.findById(user_id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// Get all users's details
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = router;
