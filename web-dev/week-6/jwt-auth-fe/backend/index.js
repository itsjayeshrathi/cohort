import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
app.use(cors());
app.use(express.json());

let userData = [];
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
app.post("/signup", async (req, res) => {
  console.log("in signup");
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
  console.log(req.body);
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

const authMiddleware = (req, res, next) => {
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
};

app.use(authMiddleware);

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
