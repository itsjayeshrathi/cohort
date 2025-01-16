import { Router } from "express";
import todoRoutes from "./todo.routes.js";
import userRoutes from "./user.routes.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = Router();
router.use("/api/users", userRoutes);
router.use(authenticateToken);
router.use("/api/todos", todoRoutes);

export default router;
