// You have to create a middleware for rate limiting a users request based on their username passed in the header
import express, { json } from "express";
const app = express();
app.use(json());

const users = {};

setInterval(() => {
  for (let user in users) {
    users[user].count = 0;
  }
}, 1000);

app.use((req, res, next) => {
  const username = req.headers.username;

  if (!username) {
    return res.status(400).json({ error: "Username header is required" });
  }

  if (!users[username]) {
    users[username] = {
      count: 0,
    };
  }

  if (users[username].count >= 5) {
    return res.status(429).json({
      error: "Rate limit exceeded. Please try again in a moment.",
    });
  }
  users[username].count++;
  next();
});

app.get("/", (req, res) => {
  const username = req.headers.username;
  res.json({
    message: "Request successful",
    requestCount: users[username].count,
  });
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
