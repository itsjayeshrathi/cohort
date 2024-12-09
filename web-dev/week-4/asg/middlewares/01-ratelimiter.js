// You have to create a middleware for rate limiting a users request based on their username passed in the header
import express from "express";
const app = express();
app.use(json());
const userNames = {};
const reqCount = 0;
const checker = setInterval(() => {
  if (reqCount > 5) {
    return res.send(`Wait before you send another request`);
  } else {
    return next();
  }
}, 1000);
app.use(checker());
app.get("/", (req, res) => {
  const name = req.headers.name;
  if (userNames.name) {
  
  } else {
    userNames = { ...userNames, name: reqCount };
  } 
});
export default app;
