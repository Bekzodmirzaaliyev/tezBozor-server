const express = require("express");
const router = express.Router();
const User = require("../module/usersModule");

// Register route
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    user = new User({
      name,
      email,
      password,
      phone,
    });

    await user.save();

    res.status(201).json({
      user,
    });
  } catch (e) {
    console.error("Error: ", e);
    res.status(500).json({ message: "Server error" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    if (!email || !password) {
      return res.status(400).json({
        message: "Email or password is empty",
      });
    }

    // Check if user exists
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json(user);
  } catch (e) {
    console.error("Error: ", e);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
