import mongoose, { Mongoose, Schema } from "mongoose";

const todoSchema = new Schema(
  {
    todo_title: {
      type: String,
      required: true,
      trim: true,
    },
    todo_description: {
      type: String,
      required: true,
      trim: true,
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Todo = mongoose.model("Todo", todoSchema);
export default Todo;
