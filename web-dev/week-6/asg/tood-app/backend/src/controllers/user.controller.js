import User from "../models/user.model.js";
const signupUser = async (req, res) => {
  const { user_name, user_email, user_password } = req.body;
  try {
    const user = await User.findOne({ user_email: user_email });
    if (user) {
      return res.status(403).json({
        message: "User already exists in db.",
      });
    }
    const newUser = await User.create({
      user_name: user_name,
      user_email: user_email,
      user_password: user_password,
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
const loginUser = async (req, res) => {};
const logoutUser = async (req, res) => {};
