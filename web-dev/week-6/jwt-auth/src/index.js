import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();

app.use(express.json());

let userData = [];

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const existingUser = userData.find((user) => user.email === email);

  if (existingUser) {
    return res.status(403).json({
      message: "User already exists",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    email: email,
    password: hashedPassword,
  };
  userData.push(newUser);
  res.status(201).json({
    message: "User created successfully",
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = userData.find((user) => user.email === email);

  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (isPasswordValid) {
    const token = jwt.sign({ userId: user.email }, "your-secret-key", {
      expiresIn: "1h",
    });
    return res.status(200).json({
      message: "Login successful",
      token: token,
    });
  }

  return res.status(401).json({
    message: "Invalid credentials",
  });
});

app.use((req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "No token provided",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "your-secret-key");
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
});

app.get("/me", (req, res) => {
  console.log(req.user);
  const user = userData.find((user) => user.email === req.user.userId);

  return res.status(200).json({
    message: "Access granted",
    user: {
      email: user.email,
    },
  });
});

app.listen(3000, () => {
  console.log("app is listening on port 3000");
});
