import express from "express";
import bcrypt from "bcrypt";
import jwt, { decode } from "jsonwebtoken";
import { z } from "zod";
import { User, Todo } from "./db.js";
const JWT_SECRET = "itshidden";
const app = express();
app.use(express.json());
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    console.log(newUser);
    res.json({
      message: "User created.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error.",
    });
  }
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.json({
        message: "Incorrect Credantials.",
      });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.json({
        message: "Incorrect Credantials.",
      });
    }
    console.log(user.id);
    const token = jwt.sign(
      {
        id: user._id.toString(),
      },
      JWT_SECRET
    );
    res.json({
      token: token,
      message: "You are logged in.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error.",
    });
  }
});
//auth middleware
app.use((req, res, next) => {
  const token = req.headers.token;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("jwt id", decoded, decoded.id);
    req.user = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
});

app.post("/todo", async (req, res) => {
  const { title } = req.body;
  const user = req.user;
  console.log(req.user);
  try {
    const newTodo = await Todo.create({
      title: title,
      user: user,
    });
    res.json({
      message: "todo created",
      todo: newTodo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error.",
    });
  }
});
app.get("/todos", async (req, res) => {
  const user = req.user;
  try {
    const todos = await Todo.find({ user: user });
    res.json({
      message: "your todos",
      todos: todos,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error.",
    });
  }
});
app.listen(3000);
