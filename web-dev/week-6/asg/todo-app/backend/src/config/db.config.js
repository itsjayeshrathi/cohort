import mongoose from "mongoose";
import "dotenv/config";

const DB_STRING = process.env.DB_STRING;

const connecToDB = async () => {
  console.log(DB_STRING);
  try {
    await mongoose.connect(DB_STRING);
    console.log("Successfully connected to database");
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
};

export { connecToDB };
