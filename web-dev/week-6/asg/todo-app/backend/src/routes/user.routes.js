import { Router } from "express";
import {
  loginUser,
  logoutUser,
  signupUser,
} from "../controllers/user.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
const router = Router();
router.post("/login", loginUser);
router.post("/signup", signupUser);
router.post("/logout", authenticateToken, logoutUser);
export default router;
