// You have to create a middleware for logging the number of requests on a server
import express, { json } from "express";
const app = express();
app.use(json());
let requestCount = 0;
app.use((req, res, next) => {
  if (req) {
    console.log(`the method of reqest is ${req.method}`);
    requestCount = requestCount + 1;
  }
  next();
});
app.get("/", (req, res) => {
  res.status(200).send(`you reached get request.`);
});
app.get("/get-one", (req, res) => {
  res.status(200).send(`you reached get-one request.`);
});
app.get("/get-two", (req, res) => {
  res.status(200).send(`you reached get-two request.`);
});

app.get("/request-count", (req, res) => {
  res.send(`The total count of request is ${requestCount}`);
});
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
