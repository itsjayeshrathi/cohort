import Todo from "../models/todo.model.js";

const getTodos = async (req, res) => {
  const user = req.user;
  try {
    const todos = await Todo.find({ user_id: user });
    return res.status(200).json({
      todos: todos,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error.",
    });
  }
};

const getTodoById = async (req, res) => {
  const todoId = req.params.id;
  try {
    const todo = await Todo.findById(todoId);
    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }
    return res.status(200).json({
      todo: todo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error.",
    });
  }
};

const createTodo = async (req, res) => {
  const { title, description } = req.body;
  const user = req.user;
  try {
    const newTodo = await Todo.create({
      title: title,
      description: description,
      user_id: user,
    });
    return res.status(201).json({
      message: "Todo created",
      todo: newTodo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error.",
    });
  }
};

const editTodo = async (req, res) => {
  const todoId = req.params.id;
  const { title, description } = req.body;
  const user = req.user;
  try {
    const todo = await Todo.findOne({ _id: todoId });
    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }
    const editedTodo = await Todo.findByIdAndUpdate(
      todoId,
      { title, description },
      { new: true }
    );
    return res.status(200).json({
      message: "Todo updated",
      todo: editedTodo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error.",
    });
  }
};

const deleteTodo = async (req, res) => {
  const todoId = req.params.id;
  try {
    const todo = await Todo.findById(todoId);
    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }
    await Todo.findByIdAndDelete(todoId);
    return res.status(200).json({
      message: "Todo deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error.",
    });
  }
};

export { getTodos, getTodoById, createTodo, editTodo, deleteTodo };