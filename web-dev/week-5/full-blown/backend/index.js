const express = require("express");
const cors = require("cors");
const app = express();
app.use(
  cors({
    domains: ["http:locahost:3000"],
  })
);
app.use(express.json());
app.post("/sum", (req, res) => {
  let a = parseInt(req.body.a);
  let b = parseInt(req.body.b);
  return res.status(200).json({
    ans: a + b,
  });
});
app.listen(8000);
