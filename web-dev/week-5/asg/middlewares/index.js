const express = require("express");
const app = express();
let requestCount = 0;
app.use((req, res, next) => {
  requestCount = requestCount + 1;
  let timeStamp = new Date();
  console.log(req.method, req.url, timeStamp.toLocaleDateString());
  next();
});
app.get("/", (req, res) => {
  res.json({
    message: "you reached here ",
  });
});

app.get("/", (req, res) => {
  res.json({
    message: `Your request count is ${requestCount}`,
  });
});
app.listen(8000);
