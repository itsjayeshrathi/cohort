// You have to create a middleware for rate limiting a users request based on their username passed in the header
import express, { json } from "express";
const app = express();
app.use(json());
const users = {};
let request_count = 1;
// setInterval(() => {}, 1000);
app.use((req, res, next) => {
  let user_name = req.header.user;
  if (users["user_name"] && request_count >= 5) {
    users["user_name"] = 0;
    request_count = 1;
    return res.send("Wait before you send anymore request");
  } else {
    next();
  }
});
app.get("/", (req, res) => {
  let user_name = req.header.user;
  if (users["user_name"]) {
    console.log("here");
    request_count = request_count + 1;
    users["user_name"] = request_count;
  } else {
    console.log("here too");
    users["user_name"] = request_count;
  }
  res.send(`your request count is ${users["user_name"]}`);
});
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
