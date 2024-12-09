//  Create a middleware that logs all incoming requests to the console.
import express, { json } from "express";

const app = express();

app.use(json());

app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.status(200).send("Your request reached the server");
});

app.get("/log", (req, res) => {
  res.status(200).send("Your request reached the log route");
});
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
