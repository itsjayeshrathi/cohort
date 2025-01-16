import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../utils/auth.js";
const signupUser = async (req, res) => {
  const { user_name, user_email, user_password } = req.body;
  try {
    const user = await User.findOne({ user_email: user_email });
    if (user) {
      return res.status(403).json({
        message: "User already exists in db.",
      });
    }
    const hashedPassword = await bcrypt.hash(user_password, 10);
    const newUser = await User.create({
      user_name: user_name,
      user_email: user_email,
      user_password: hashedPassword,
    });
    return res.status(201).json({
      message: "User created sucessfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error.",
    });
  }
};
const loginUser = async (req, res) => {
  const { user_email, user_password } = req.body;
  console.log("here", req.body);
  try {
    if (!user_email || !user_password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }
    const user = await User.findOne({ user_email: user_email });
    if (!user) {
      return res.status(404).json({
        message: "User doesn't exist in db",
      });
    }
    const isValidPassword = await bcrypt.compare(
      user_password,
      user.user_password
    );
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);
    console.log(accessToken, refreshToken);
    await User.findByIdAndUpdate(user._id, {
      token: refreshToken,
      is_active: true,
    });
    res.setHeader("Authorization", `Bearer ${accessToken}`);
    res.setHeader("x-refresh-token", refreshToken);
    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.user_email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error.",
    });
  }
};
const logoutUser = async (req, res) => {
  try {
    const userId = req.user.userId;
    await User.findByIdAndUpdate(userId, {
      token: null,
      is_active: false,
    });
    res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error.",
    });
  }
};
export { signupUser, loginUser, logoutUser };
