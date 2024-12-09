//  Implement an authentication middleware that checks for a valid API key in the request headers.
import express, { json } from "express";
const app = express();
const VALID_API_KEY = "100xdevs_cohort3_super_secret_valid_api_key";

app.use(json());
app.use((req, res, next) => {
  const api_key = req.headers.api_key;
  if (api_key === VALID_API_KEY) {
    return next();
  }
  res.status(404).send(`your ${api_key} is not valid. Please try again`);
});
app.get("/", (req, res) => {
  res.send(`you got in`);
});
const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
