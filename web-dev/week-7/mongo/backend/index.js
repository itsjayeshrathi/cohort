import express from "express";
import jwt from "jsonwebtoken";
import { User, Todo } from "./db.js";
const JWT_SECRET = "itshidden";
const app = express();
app.use(express.json());
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = await User.create({
    name: name,
    email: email,
    password: password,
  });
  console.log(newUser);
  res.json({
    message: "User created.",
  });
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = User.findOne({ email: email, password: password });
  if (!user) {
    return res.json({
      message: "Incorrect Credantials.",
    });
  }
  const token = jwt.sign(
    {
      id: user._id,
    },
    JWT_SECRET
  );
  res.json({
    token: token,
    message: "You are logged in.",
  });
});
//auth middleware
app.use((req, res, next) => {
  const token = req.headers.token;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
});

app.post("/todo", async (req, res) => {
  const { title } = req.body;
  const user = req.user;
  console.log(user);
  const newTodo = await Todo.create({
    title: title,
    user: user,
  });
  res.json({
    message: "todo created",
    todo: newTodo,
  });
});
app.get("/todos", async (req, res) => {
  const user = req.user;
  const todos = await Todo.find({ user: user });
  res.json({
    message: "your todos",
    todos: todos,
  });
});
app.listen(3000);
