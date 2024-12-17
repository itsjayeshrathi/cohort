const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const mongo_url = process.env.MONGO_URL;
mongoose
  .connect(mongo_url)
  .then(() => console.log("Connected to mongodb"))
  .catch((err) => console.log("Mongo connection error", err));

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const TodoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
const Todo = mongoose.model("Todo", TodoSchema);

module.exports = {
  User,
  Todo,
};
