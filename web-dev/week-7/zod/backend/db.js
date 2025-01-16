import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

const todoSchema = new Schema({
  title: String,
  done: { type: Boolean, default: false },
  user: { type: mongoose.Types.ObjectId, ref: "User" },
});

const User = mongoose.model("User", userSchema);
const Todo = mongoose.model("Todo", todoSchema);

const connectToDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://itsjayeshrathi:lnFyBo1UTrCTlvBk@cluster.bxpqt.mongodb.net/mongo",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

connectToDB();

export { User, Todo };
