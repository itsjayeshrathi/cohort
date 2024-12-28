import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  editTodo,
  getTodoById,
  getTodos,
} from "../controllers/todo.controller.js";
const router = Router();
router.get("/toods", getTodos);
router.get("/todo/:id", getTodoById);
router.post("/create", createTodo);
router.put("/edit_todo/:id", editTodo);
router.delete("/delete/:id", deleteTodo);
export default router;
