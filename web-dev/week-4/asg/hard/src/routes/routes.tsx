const { Router } = require("express");
import user from "./user.routes.js";
import todo from "./todo.routes.js";
const router = Router();
router.use("/user", user);
router.use("/todo", todo);
module.exports = router;
