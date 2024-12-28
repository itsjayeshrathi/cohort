import jwt from "jsonwebtoken";
import "dotenv/config";

const generateAccessToken = (userId) => {
  console.log("in jwt 1");
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "24h",
  });
};

const verifyAccessToken = (userId) => {
  return jwt.verify({ userId }, process.env.ACCESS_TOKEN_SECRET);
};

const generateRefreshToken = (userId) => {
  console.log("in jwt 2");
  return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET);
};
const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
};

export {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
