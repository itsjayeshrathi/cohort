const { Router } = require("express");
const { Todo } = require("../database");
const router = Router();

router.post("/", async (req, res) => {
  const { title, description } = req.body;
  try {
    const todo = await Todo.create({
      title,
      description,
      user: req.user._id,
    });
    return res.status(201).json({
      message: "Todo created successfully",
      todo: todo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error.",
      error: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      {
        _id: id,
        user: req.user._id,
      },
      {
        title,
        description,
      },
      {
        new: true,
      }
    );
    if (!updatedTodo) {
      return res.status(404).json({
        message: "Todo not found or don't have permission",
      });
    }
    return res.status(200).json({
      message: "Todo updated successfully",
      todo: updatedTodo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error.",
      error: error.message,
    });
  }
});

router.delete("/", (req, res) => {
  // Implement delete todo logic
});

router.delete("/:id", (req, res) => {
  // Implement delete todo by id logic
});

router.get("/", (req, res) => {
   try {
    
   } catch (error) {
     res.status(500).json({
      message: "Internal server error.",
      error: error.message,
    });
   }
});

router.get("/:id", (req, res) => {
  // Implement fetching todo by id logic
});

module.exports = router;
