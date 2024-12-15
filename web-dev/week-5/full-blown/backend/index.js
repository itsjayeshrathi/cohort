const express = require("express");
const app = express();
app.use(express.json());
app.get("/sum", (req, res) => {
  let a = parseInt(req.body.a);
  let b = parseInt(req.body.b);
  res.status(200).json({
    ans: a + b,
  });
});
app.listen(3000);
