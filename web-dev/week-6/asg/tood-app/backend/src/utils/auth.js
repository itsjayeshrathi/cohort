import jwt from "jsonwebtoken";
const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "24h",
  });
};

const verifyAccessToken = (userId) => {
  return jwt.verify({ userId }, process.env.ACCESS_TOKEN_SECRET);
};

const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.REFRESH_ACCESS_TOKEN);
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
