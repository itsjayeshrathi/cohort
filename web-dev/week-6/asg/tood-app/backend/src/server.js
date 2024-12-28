import express from "express";
import cors from "cors";
import "dotenv/config";
import { connecToDB } from "./config/db.config.js";

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

connecToDB();
refreshTokenCron.start();

app.get("/healthy", (req, res) => {
  res.send("<h1>reached here</h1>");
});

app.listen(PORT, () => {
  console.log(`app is listening on ${PORT}`);
});
