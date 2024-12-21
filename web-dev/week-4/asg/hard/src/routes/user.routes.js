const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = Router();
const userMiddleware = require("../middleware/user.middleware");
const { User } = require("../database");

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.status(409).json({
        message: "User already exists with this email.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    const accessToken = generateAccessToken(newUser);
    const refreshToken = generateRefreshToken(newUser);
    res.status(201).json({
      message: "You registered successfully.",
      tokens: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error.",
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "You are not a registered user.",
      });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
      await User.findByIdAndUpdate(user._id, {
        tokens: {
          accessToken,
          refreshToken,
        },
      });
      return res.status(200).json({
        message: "You are logged in successfully.",
        user: {
          id: user._id,
          email: user.email,
        },
      });
    }
    return res.status(401).json({
      message: "Invalid email or password",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error.",
    });
  }
});

router.get("/todos", userMiddleware, (req, res) => {
  // Implement logic for getting todos for a user
});

router.post("/logout", userMiddleware, (req, res) => {
  // Implement logout logic
});

module.exports = router;
