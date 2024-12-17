const express = require("express");
const dotenv = require("dotenv");
const user = require("./src/routes/user.routes.js");
const todo = require("./src/routes/todo.routes.js");
const userMiddleware = require("./src/middleware/user.middleware.js");
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get("/healthy", (req, res) => res.send("I am Healthy"));

//  start writing your routes here
// app.use(userMiddleware);
app.use("/user", user);
app.use("/todo", todo);

app.listen(port, () =>
  console.log(`server is running at http://localhost:${port}`)
);
