import express, { json } from "express";
const app = express();
app.use(json());
app.get("/add", (req, res) => {
  let a = parseInt(req.query.a);
  let b = parseInt(req.query.b);
  res.status(200).send(`The sum is ${a + b}`);
});
app.get("/subtract", (req, res) => {
  let a = parseInt(req.query.a);
  let b = parseInt(req.query.b);
  res.status(200).send(`The sum is ${a - b}`);
});
app.get("/multiply", (req, res) => {
  let a = parseInt(req.query.a);
  let b = parseInt(req.query.b);
  res.status(200).send(`The sum is ${a * b}`);
});
app.get("/divide", (req, res) => {
  let a = parseInt(req.query.a);
  let b = parseInt(req.query.b);
  res.status(200).send(`The sum is ${a / b}`);
});
app.listen(3000); 