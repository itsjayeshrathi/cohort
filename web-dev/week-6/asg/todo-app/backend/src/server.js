import express from "express";
import cors from "cors";
import "dotenv/config";
import { connecToDB } from "./config/db.config.js";
import routes from "../src/routes/routes.js";
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

connecToDB();
// refreshTokenCron.start();

app.use(routes);

app.listen(PORT, () => {
  console.log(`app is listening on ${PORT}`);
});
